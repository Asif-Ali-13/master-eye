import { load } from "cheerio";
import type { AudienceReview, MovieDetails } from "./types";

const OMDB_BASE_URL = "https://www.omdbapi.com/";

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

  const data = (await res.json()) as any;

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
  const reviewsUrl = `https://www.imdb.com/title/${encodeURIComponent(imdbId)}/reviews?sort=submissionDate&dir=desc&ratingFilter=0`;

  const res = await fetch(reviewsUrl, {
    headers: {
      "User-Agent":
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0 Safari/537.36",
      Accept: "text/html,application/xhtml+xml",
    },
  });

  if (!res.ok) {
    throw new Error(`Failed to fetch IMDb reviews (${res.status})`);
  }

  const html = await res.text();
  const $ = load(html);

  const reviews: AudienceReview[] = [];

  // IMDb has changed review markup a few times. Try multiple known containers:
  const containers =
    $("[data-testid='review-container']").length > 0
      ? $("[data-testid='review-container']")
      : $(".review-container").length > 0
      ? $(".review-container")
      : $(".lister-item-content");

  containers
    .slice(0, maxReviews)
    .each((_idx, el) => {
      const container = $(el);

      const title =
        container.find(".title").first().text().trim() ||
        container.find("[data-testid='review-title']").first().text().trim() ||
        null;

      const author =
        container.find(".display-name-link").first().text().trim() ||
        container.find("[data-testid='author-name']").first().text().trim() ||
        null;

      const textCandidateA = container.find(".text.show-more__control").first().text().trim();
      const textCandidateB = container.find(".content .text").first().text().trim();
      const textCandidateC = container.find("[data-testid='review-text']").first().text().trim();
      const text = textCandidateA || textCandidateB || textCandidateC;

      const ratingText =
        container.find(".rating-other-user-rating span").first().text().trim() ||
        container.find("[data-testid='review-rating']").first().text().trim();
      const rating = ratingText ? Number(ratingText) || null : null;

      if (text) {
        reviews.push({
          author,
          title,
          text,
          rating,
        });
      }
    });

  return reviews;
}

