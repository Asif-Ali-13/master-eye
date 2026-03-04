import type { AudienceReview, OverallSentiment, SentimentSummary } from "./types";

export function classifyOverallSentimentFromScore(score: number): OverallSentiment {
  if (score > 0.25) return "positive";
  if (score < -0.25) return "negative";
  return "mixed";
}

export async function summarizeSentimentWithAI(
  movieTitle: string,
  reviews: AudienceReview[],
): Promise<SentimentSummary> {
  const apiKey = process.env.OPENAI_API_KEY;
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
  const reviewSnippets = truncatedReviews
    .map((r, idx) => `${idx + 1}. ${r.text.slice(0, 600)}`)
    .join("\n");

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
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: "gpt-4.1-mini",
        messages: [{ role: "user", content: prompt }],
        temperature: 0.4,
      }),
    });

    if (!response.ok) {
      // For rate limiting / temporary failures, fall back to heuristic instead of failing the whole request.
      if (response.status === 429 || response.status >= 500) {
        throw new Error("TEMPORARY_AI_FAILURE");
      }
      throw new Error(`Failed to call AI sentiment service (${response.status})`);
    }

    const data = (await response.json()) as any;
    const content: string | undefined = data.choices?.[0]?.message?.content;
    if (!content) {
      throw new Error("AI response did not contain any content");
    }

    let parsed: { summary: string; overall: OverallSentiment };
    try {
      parsed = JSON.parse(content);
    } catch {
      throw new Error("AI response was not valid JSON");
    }

    if (parsed.overall !== "positive" && parsed.overall !== "mixed" && parsed.overall !== "negative") {
      throw new Error("AI response contained an unknown sentiment label");
    }

    return {
      summary: parsed.summary,
      overall: parsed.overall,
    };
  } catch (err: any) {
    const joined = reviews.map((r) => r.text).join(" ");
    const approxScore = naiveSentimentScore(joined);
    const overall = classifyOverallSentimentFromScore(approxScore);

    const isRateOrServerIssue =
      err?.message === "TEMPORARY_AI_FAILURE" || typeof err?.message === "string"
        ? /429|5\d\d/.test(err.message)
        : false;

    return {
      summary: isRateOrServerIssue
        ? "The AI sentiment service is temporarily unavailable (rate limit or server error). This summary is a simple heuristic estimate based on the words used in the available reviews."
        : "The AI sentiment service could not be reached. This summary is a simple heuristic estimate based on the words used in the available reviews.",
      overall,
    };
  }
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

