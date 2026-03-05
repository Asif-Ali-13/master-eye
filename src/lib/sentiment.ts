import type { AudienceReview, OverallSentiment, SentimentSummary } from "./types";

interface ChatCompletionsResponse {
  candidates?: Array<{
    content?: {
      parts?: Array<{
        text?: string;
      }>;
    };
  }>;
}

interface GeminiErrorResponse {
  error?: {
    message?: string;
    code?: string;
    type?: string;
  };
}

interface GeminiModelsResponse {
  models?: Array<{
    name?: string;
    supportedGenerationMethods?: string[];
  }>;
}

type AiFailureCode =
  | "TEMPORARY_AI_FAILURE"
  | "GEMINI_QUOTA_EXCEEDED"
  | "GEMINI_AUTH_ERROR"
  | "GEMINI_MODEL_UNAVAILABLE"
  | "GEMINI_BAD_RESPONSE";

class AiSummaryError extends Error {
  code: AiFailureCode;

  constructor(code: AiFailureCode, message: string) {
    super(message);
    this.code = code;
  }
}

const DEFAULT_GEMINI_MODELS = [
  "gemini-2.0-flash-lite",
  "gemini-2.0-flash",
  "gemini-1.5-flash",
  "gemini-1.5-flash-8b",
];

export function classifyOverallSentimentFromScore(score: number): OverallSentiment {
  if (score > 0.25) return "positive";
  if (score < -0.25) return "negative";
  return "mixed";
}

export async function summarizeSentimentWithAI(
  movieTitle: string,
  reviews: AudienceReview[],
): Promise<SentimentSummary> {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    // Graceful fallback: simple heuristic summary when no AI key is configured
    const joined = reviews.map((r) => r.text).join(" ");
    const approxScore = naiveSentimentScore(joined);
    const overall = classifyOverallSentimentFromScore(approxScore);

    return {
      summary:
        "AI sentiment service is not configured. This is a simple heuristic summary based on the words used in reviews.",
      overall,
    };
  }

  const truncatedReviews = reviews.slice(0, 25);
  const reviewSnippets = truncatedReviews.map((r, idx) => `${idx + 1}. ${r.text.slice(0, 600)}`).join("\n");

  const prompt = `
You are an assistant analyzing audience sentiment for a movie.

Movie: "${movieTitle}"

Here are snippets from audience reviews:

${reviewSnippets}

Summarize the overall audience sentiment in 3–5 sentences and classify it as one of:
- "positive"
- "mixed"
- "negative"

Respond in valid JSON only, with this exact shape:
{
  "summary": "concise natural language overview",
  "overall": "positive" | "mixed" | "negative"
}
`;

  try {
    return await requestAiSummary(apiKey, prompt);
  } catch (err: unknown) {
    const joined = reviews.map((r) => r.text).join(" ");
    const approxScore = naiveSentimentScore(joined);
    const overall = classifyOverallSentimentFromScore(approxScore);
    const aiError = err instanceof AiSummaryError ? err : null;

    return {
      summary: buildHeuristicFallbackMessage(aiError),
      overall,
    };
  }
}

async function requestAiSummary(apiKey: string, prompt: string): Promise<SentimentSummary> {
  const preferredModel = process.env.GEMINI_MODEL?.trim() || "gemini-2.0-flash-lite";
  const models = await resolveCandidateModels(apiKey, preferredModel);

  let lastModelError: AiSummaryError | null = null;

  for (const model of models) {
    for (const apiVersion of ["v1beta", "v1"]) {
      const response = await fetch(
        `https://generativelanguage.googleapis.com/${apiVersion}/models/${encodeURIComponent(model)}:generateContent?key=${encodeURIComponent(apiKey)}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            contents: [{ role: "user", parts: [{ text: prompt }] }],
            generationConfig: {
              temperature: 0.4,
              responseMimeType: "application/json",
            },
          }),
        },
      );

      if (!response.ok) {
        const error = await parseGeminiError(response);
        const shouldTryNextApiVersion = error.code === "GEMINI_MODEL_UNAVAILABLE" && apiVersion === "v1beta";
        if (shouldTryNextApiVersion) {
          lastModelError = error;
          continue;
        }

        const shouldTryNextModel = error.code === "GEMINI_MODEL_UNAVAILABLE";
        if (shouldTryNextModel) {
          lastModelError = error;
          break;
        }

        throw error;
      }

      const data = (await response.json()) as ChatCompletionsResponse;
      const content = data.candidates?.[0]?.content?.parts?.map((part) => part.text ?? "").join("").trim();
      if (!content) {
        throw new AiSummaryError("GEMINI_BAD_RESPONSE", "AI response did not contain any content");
      }

      const parsed = parseAiSentimentJson(content);
      return {
        summary: parsed.summary.trim(),
        overall: parsed.overall,
      };
    }
  }

  if (lastModelError) {
    throw lastModelError;
  }
  throw new AiSummaryError("GEMINI_BAD_RESPONSE", "No AI model returned a valid sentiment response");
}

async function resolveCandidateModels(apiKey: string, preferredModel: string): Promise<string[]> {
  const preferred = normalizeGeminiModelName(preferredModel);
  const discoveredModels = await fetchAvailableGeminiModels(apiKey);
  const orderedDiscovered = rankGeminiModels(discoveredModels);

  return Array.from(new Set([preferred, ...orderedDiscovered, ...DEFAULT_GEMINI_MODELS])).filter(Boolean);
}

async function fetchAvailableGeminiModels(apiKey: string): Promise<string[]> {
  try {
    const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models?key=${encodeURIComponent(apiKey)}`);
    if (!response.ok) {
      return [];
    }

    const data = (await response.json()) as GeminiModelsResponse;
    return (data.models ?? [])
      .filter((model) => {
        const generationMethods = model.supportedGenerationMethods ?? [];
        return generationMethods.includes("generateContent");
      })
      .map((model) => normalizeGeminiModelName(model.name))
      .filter((name) => Boolean(name) && name.startsWith("gemini"));
  } catch {
    return [];
  }
}

function rankGeminiModels(models: string[]): string[] {
  const uniqueModels = Array.from(new Set(models));
  return uniqueModels.sort((left, right) => {
    const scoreDiff = getGeminiModelScore(right) - getGeminiModelScore(left);
    if (scoreDiff !== 0) return scoreDiff;
    return left.localeCompare(right);
  });
}

function getGeminiModelScore(model: string): number {
  const normalized = model.toLowerCase();
  if (normalized.includes("flash-lite")) return 40;
  if (normalized.includes("flash")) return 30;
  if (normalized.includes("pro")) return 20;
  return 10;
}

function normalizeGeminiModelName(model: string | undefined): string {
  if (!model) return "";
  return model.trim().replace(/^models\//, "");
}

function parseAiSentimentJson(content: string): { summary: string; overall: OverallSentiment } {
  let parsed: { summary: string; overall: OverallSentiment };

  try {
    parsed = JSON.parse(extractLikelyJson(content));
  } catch {
    throw new AiSummaryError("GEMINI_BAD_RESPONSE", "AI response was not valid JSON");
  }

  if (parsed.overall !== "positive" && parsed.overall !== "mixed" && parsed.overall !== "negative") {
    throw new AiSummaryError("GEMINI_BAD_RESPONSE", "AI response contained an unknown sentiment label");
  }
  if (typeof parsed.summary !== "string" || !parsed.summary.trim()) {
    throw new AiSummaryError("GEMINI_BAD_RESPONSE", "AI response did not contain a usable summary");
  }

  return parsed;
}

async function parseGeminiError(response: Response): Promise<AiSummaryError> {
  const status = response.status;
  let errorMessage = `Failed to call AI sentiment service (${status})`;

  try {
    const body = (await response.json()) as GeminiErrorResponse;
    if (typeof body.error?.message === "string" && body.error.message.trim()) {
      errorMessage = body.error.message.trim();
    }
  } catch {
    // Ignore parse failure and keep generic status-based message.
  }

  const lowerMessage = errorMessage.toLowerCase();

  if (
    status === 401 ||
    status === 403 ||
    lowerMessage.includes("invalid api key") ||
    lowerMessage.includes("permission denied")
  ) {
    return new AiSummaryError("GEMINI_AUTH_ERROR", errorMessage);
  }
  if (
    status === 429 &&
    (lowerMessage.includes("quota") ||
      lowerMessage.includes("billing") ||
      lowerMessage.includes("exceeded") ||
      lowerMessage.includes("resource_exhausted"))
  ) {
    return new AiSummaryError("GEMINI_QUOTA_EXCEEDED", errorMessage);
  }
  if (
    status === 404 ||
    (status === 400 &&
      (lowerMessage.includes("model") ||
        lowerMessage.includes("not found") ||
        lowerMessage.includes("unsupported") ||
        lowerMessage.includes("not available")))
  ) {
    return new AiSummaryError("GEMINI_MODEL_UNAVAILABLE", errorMessage);
  }
  if (status === 429 || status >= 500) {
    return new AiSummaryError("TEMPORARY_AI_FAILURE", errorMessage);
  }

  return new AiSummaryError("GEMINI_BAD_RESPONSE", errorMessage);
}

function buildHeuristicFallbackMessage(error: AiSummaryError | null): string {
  if (!error) {
    return "The AI sentiment service could not be reached. This summary is a simple heuristic estimate based on the words used in the available reviews.";
  }

  if (error.code === "GEMINI_QUOTA_EXCEEDED") {
    return "AI sentiment is unavailable because the Gemini API quota/billing limit was reached. This is a heuristic estimate from the available reviews.";
  }
  if (error.code === "GEMINI_AUTH_ERROR") {
    return "AI sentiment is unavailable because the Gemini API key is invalid or lacks permissions. This is a heuristic estimate from the available reviews.";
  }
  if (error.code === "GEMINI_MODEL_UNAVAILABLE") {
    return "AI sentiment is unavailable because the configured model is not accessible for this API key. This is a heuristic estimate from the available reviews.";
  }
  if (error.code === "TEMPORARY_AI_FAILURE") {
    return "The AI sentiment service is temporarily unavailable (rate limit or server error). This is a heuristic estimate from the available reviews.";
  }

  return "The AI sentiment service returned an invalid response. This is a heuristic estimate from the available reviews.";
}

function extractLikelyJson(content: string): string {
  const trimmed = content.trim();
  if (trimmed.startsWith("{") && trimmed.endsWith("}")) {
    return trimmed;
  }

  const fenced = trimmed.match(/```(?:json)?\s*([\s\S]*?)\s*```/i);
  if (fenced?.[1]) {
    return fenced[1].trim();
  }

  const firstBrace = trimmed.indexOf("{");
  const lastBrace = trimmed.lastIndexOf("}");
  if (firstBrace >= 0 && lastBrace > firstBrace) {
    return trimmed.slice(firstBrace, lastBrace + 1);
  }

  return trimmed;
}

const positiveWords = ["good", "great", "amazing", "excellent", "love", "loved", "fantastic", "wonderful", "best"];
const negativeWords = ["bad", "terrible", "awful", "boring", "worst", "hate", "hated", "disappointing", "poor"];

function naiveSentimentScore(text: string): number {
  if (!text) return 0;
  const lower = text.toLowerCase();

  let score = 0;
  for (const word of positiveWords) {
    const occurrences = lower.split(word).length - 1;
    score += occurrences;
  }
  for (const word of negativeWords) {
    const occurrences = lower.split(word).length - 1;
    score -= occurrences;
  }

  const lengthPenalty = Math.min(1, text.length / 1000);
  return (score / (positiveWords.length + negativeWords.length)) * lengthPenalty;
}
