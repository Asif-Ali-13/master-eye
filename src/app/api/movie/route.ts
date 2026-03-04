import { NextRequest, NextResponse } from "next/server";
import { fetchImdbReviews, fetchMovieDetails } from "@/lib/imdb";
import { summarizeSentimentWithAI } from "@/lib/sentiment";
import type { MovieInsightsResponse } from "@/lib/types";

export async function POST(req: NextRequest) {
  try {
    const body = (await req.json().catch(() => ({}))) as { imdbId?: string };
    const imdbId = body.imdbId?.trim();

    if (!imdbId) {
      return NextResponse.json({ error: "IMDb ID is required" }, { status: 400 });
    }

    if (!/^tt\d{7,9}$/.test(imdbId)) {
      return NextResponse.json({ error: "Please provide a valid IMDb ID (e.g. tt0133093)" }, { status: 400 });
    }

    const [movie, reviews] = await Promise.all([fetchMovieDetails(imdbId), fetchImdbReviews(imdbId)]);

    const effectiveReviews =
      reviews.length > 0
        ? reviews
        : [
            {
              author: null,
              title: "Aggregate audience rating",
              text:
                movie.rating != null
                  ? `IMDb users collectively rate this movie ${movie.rating} out of 10.`
                  : "No individual user reviews were available for this title, but an aggregate rating may exist on IMDb.",
              rating: movie.rating != null ? Number(movie.rating) || null : null,
            },
          ];

    const sentiment = await summarizeSentimentWithAI(movie.title, effectiveReviews);

    const payload: MovieInsightsResponse = {
      movie,
      reviews,
      sentiment,
    };

    return NextResponse.json(payload, { status: 200 });
  } catch (error: any) {
    console.error("Error in /api/movie", error);

    const message =
      typeof error?.message === "string"
        ? error.message
        : "Something went wrong while fetching movie insights. Please try again.";

    return NextResponse.json({ error: message }, { status: 500 });
  }
}

