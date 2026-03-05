import { load } from "cheerio";
import type { Cheerio, CheerioAPI } from "cheerio";
import type { AnyNode } from "domhandler";
import type { AudienceReview, MovieDetails } from "./types";

const OMDB_BASE_URL = "https://www.omdbapi.com/";
const IMDB_DESKTOP_REVIEWS_BASE_URL = "https://www.imdb.com/title/";
const IMDB_MOBILE_REVIEWS_BASE_URL = "https://m.imdb.com/title/";

interface OmdbMovieApiResponse {
  Response?: string;
  Error?: string;
  Title?: string;
  Year?: string;
  imdbRating?: string;
  Poster?: string;
  Plot?: string;
  Actors?: string;
}

export async function fetchMovieDetails(imdbId: string): Promise<MovieDetails> {
  const apiKey = process.env.OMDB_API_KEY;
  if (!apiKey) {
    throw new Error("Missing OMDB_API_KEY environment variable");
  }

  const url = `${OMDB_BASE_URL}?i=${encodeURIComponent(imdbId)}&plot=short&r=json&apikey=${apiKey}`;
  const res = await fetch(url);

  if (!res.ok) {
    throw new Error(`Failed to fetch movie details (${res.status})`);
  }

  const data = (await res.json()) as OmdbMovieApiResponse;

  if (data.Response === "False") {
    throw new Error(data.Error || "Movie not found");
  }

  return {
    imdbId,
    title: data.Title ?? "Unknown title",
    year: data.Year ?? "N/A",
    rating: data.imdbRating && data.imdbRating !== "N/A" ? data.imdbRating : null,
    posterUrl: data.Poster && data.Poster !== "N/A" ? data.Poster : null,
    plot: data.Plot && data.Plot !== "N/A" ? data.Plot : null,
    cast: typeof data.Actors === "string" ? data.Actors.split(",").map((a: string) => a.trim()) : [],
  };
}

export async function fetchImdbReviews(imdbId: string, maxReviews = 30): Promise<AudienceReview[]> {
  const encodedId = encodeURIComponent(imdbId);
  const desktopReviewsUrl = `${IMDB_DESKTOP_REVIEWS_BASE_URL}${encodedId}/reviews?sort=submissionDate&dir=desc&ratingFilter=0`;
  const mobileReviewsUrl = `${IMDB_MOBILE_REVIEWS_BASE_URL}${encodedId}/reviews`;

  const desktopRes = await fetch(desktopReviewsUrl, { headers: imdbHeaders() });
  const desktopHtml = await desktopRes.text();
  const desktopBlocked = desktopRes.status === 202 || !desktopRes.ok || isLikelyBotChallenge(desktopHtml);

  if (!desktopBlocked) {
    const desktopReviews = parseReviewsFromHtml(desktopHtml, maxReviews);
    if (desktopReviews.length > 0) {
      return desktopReviews;
    }
  }

  const mobileRes = await fetch(mobileReviewsUrl, { headers: imdbHeaders() });
  if (!mobileRes.ok) {
    throw new Error(`Failed to fetch IMDb reviews (${mobileRes.status})`);
  }

  const mobileHtml = await mobileRes.text();
  return parseReviewsFromHtml(mobileHtml, maxReviews);
}

function imdbHeaders(): HeadersInit {
  return {
    "User-Agent":
      "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0 Safari/537.36",
    Accept: "text/html,application/xhtml+xml",
    "Accept-Language": "en-US,en;q=0.9",
  };
}

function parseReviewsFromHtml(html: string, maxReviews: number): AudienceReview[] {
  const $ = load(html);
  const reviews: AudienceReview[] = [];

  const containers =
    $("[data-testid='review-card-parent']").length > 0
      ? $("[data-testid='review-card-parent']")
      : $("[data-testid='review-container']").length > 0
      ? $("[data-testid='review-container']")
      : $(".review-container").length > 0
      ? $(".review-container")
      : $(".lister-item-content").length > 0
      ? $(".lister-item-content")
      : $("article.user-review-item, article");

  containers
    .slice(0, maxReviews)
    .each((_idx, el) => {
      const container = $(el);

      const title = normalizeText(
        container.find("[data-testid='review-summary']").first().text() ||
          container.find(".title").first().text() ||
          container.find("[data-testid='review-title']").first().text() ||
          container.find("h2, h3, [role='heading']").first().text(),
      );

      const author = normalizeText(
        container.find("[data-testid='author-link']").first().text() ||
          container.find("[data-testid='reviews-author']").first().text() ||
          container.find(".display-name-link").first().text() ||
          container.find("[data-testid='author-name']").first().text() ||
          container.find("a[href*='/user/']").first().text(),
      );

      const text = normalizeText(
        container.find(".ipc-html-content-inner-div").first().text() ||
          container.find("[data-testid='review-overflow']").first().text() ||
          container.find(".text.show-more__control").first().text() ||
          container.find(".content .text").first().text() ||
          container.find("[data-testid='review-text']").first().text(),
      );

      const rating = extractRating(container, $);
      if (!text) return;

      reviews.push({
        author: author || null,
        title: title || null,
        text,
        rating,
      });
    });

  return reviews;
}

function normalizeText(value: string): string {
  return value.replace(/\s+/g, " ").trim();
}

function extractRating(container: Cheerio<AnyNode>, $: CheerioAPI): number | null {
  const directRatingText =
    normalizeText(container.find(".rating-other-user-rating span").first().text()) ||
    normalizeText(container.find("[data-testid='review-rating']").first().text());
  if (directRatingText) {
    const parsed = Number(directRatingText);
    return Number.isFinite(parsed) ? parsed : null;
  }

  const tenScale = container
    .find("span")
    .toArray()
    .map((node: AnyNode) => normalizeText($(node).text()))
    .find((text) => /^\d{1,2}\/10$/.test(text));

  if (!tenScale) return null;
  const match = tenScale.match(/^(\d{1,2})\/10$/);
  if (!match) return null;
  const parsed = Number(match[1]);
  return Number.isFinite(parsed) ? parsed : null;
}

function isLikelyBotChallenge(html: string): boolean {
  const lower = html.toLowerCase();
  return (
    lower.includes("request blocked") ||
    lower.includes("captcha") ||
    lower.includes("enable javascript") ||
    lower.includes("please verify you are a human")
  );
}
