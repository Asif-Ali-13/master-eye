export type OverallSentiment = "positive" | "mixed" | "negative";

export interface MovieDetails {
  imdbId: string;
  title: string;
  year: string;
  rating: string | null;
  posterUrl: string | null;
  plot: string | null;
  cast: string[];
}

export interface AudienceReview {
  author: string | null;
  title: string | null;
  text: string;
  rating: number | null;
}

export interface SentimentSummary {
  summary: string;
  overall: OverallSentiment;
}

export interface MovieInsightsResponse {
  movie: MovieDetails;
  reviews: AudienceReview[];
  sentiment: SentimentSummary;
}

