"use client";

import Image from "next/image";
import { useState } from "react";
import type { MovieInsightsResponse } from "@/lib/types";

type FetchState = "idle" | "loading" | "done" | "error";

export default function Home() {
  const [imdbId, setImdbId] = useState("");
  const [touched, setTouched] = useState(false);
  const [fetchState, setFetchState] = useState<FetchState>("idle");
  const [error, setError] = useState<string | null>(null);
  const [data, setData] = useState<MovieInsightsResponse | null>(null);

  const isValidId = /^tt\d{7,9}$/.test(imdbId.trim());
  const showIdError = touched && imdbId.length > 0 && !isValidId;

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setTouched(true);
    setError(null);

    if (!isValidId) return;

    setFetchState("loading");
    setData(null);

    try {
      const res = await fetch("/api/movie", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ imdbId: imdbId.trim() }),
      });

      const json = await res.json();

      if (!res.ok) {
        setError(json.error ?? "Something went wrong. Please try again.");
        setFetchState("error");
        return;
      }

      setData(json as MovieInsightsResponse);
      setFetchState("done");
    } catch (err) {
      console.error(err);
      setError("Network error. Please check your connection and try again.");
      setFetchState("error");
    }
  }

  const sentimentColor =
    data?.sentiment.overall === "positive"
      ? "bg-emerald-500/15 text-emerald-200 border-emerald-500/40"
      : data?.sentiment.overall === "negative"
        ? "bg-rose-500/15 text-rose-200 border-rose-500/40"
        : "bg-amber-500/15 text-amber-200 border-amber-500/40";

  return (
    <div className="min-h-screen bg-linear-to-br from-[#0b0b0d] via-[#161114] to-[#0b0b0d] text-slate-50">
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="absolute -left-32 top-10 h-72 w-72 rounded-full bg-[#d14836]/20 blur-3xl" />
        <div className="absolute -right-32 bottom-10 h-72 w-72 rounded-full bg-[#ff8f6b]/15 blur-3xl" />
      </div>

      <main className="relative z-10 mx-auto flex min-h-screen w-full max-w-6xl flex-col items-center px-4 pb-12 pt-8 sm:px-6 sm:pb-16 sm:pt-10 lg:px-8 lg:pt-16">
        <header className="mb-8 flex w-full flex-col items-center gap-3 text-center sm:mb-12 sm:gap-5">
          <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[11px] font-medium text-slate-100 shadow-lg shadow-[#d14836]/10 backdrop-blur sm:px-4 sm:text-xs">
            <span className="h-1.5 w-1.5 rounded-full bg-[#ff8f6b]" />
            AI-powered sentiment lens for IMDb
          </div>
          <h1 className="bg-linear-to-br from-white via-[#ffe4db] to-[#ff8f6b] bg-clip-text text-4xl font-semibold tracking-tight text-transparent sm:text-5xl lg:text-6xl">
            Movie Insighter
          </h1>
          <p className="max-w-2xl text-base text-slate-300/90 sm:text-lg">
            Drop in an IMDb ID like <span className="font-mono text-[#ff8f6b]">tt0133093</span> and get a rich
            snapshot of the movie&apos;s details, cast, and what audiences are really saying.
          </p>
        </header>

        <section className="mb-8 w-full max-w-4xl sm:mb-10">
          <form
            onSubmit={handleSubmit}
            className="group relative overflow-hidden rounded-3xl border border-white/10 bg-linear-to-br from-[#1a1416]/90 via-[#120f11]/90 to-[#1a1416]/90 p-4 shadow-2xl shadow-[#d14836]/15 backdrop-blur-xl sm:p-6"
          >
            <div className="pointer-events-none absolute inset-x-10 -top-24 h-36 bg-linear-to-b from-[#d14836]/25 to-transparent opacity-70 blur-3xl transition group-hover:opacity-90" />

            <div className="relative">
              <div className="flex-1">
                <label
                  htmlFor="imdbId"
                  className="mb-2 block text-xs font-medium uppercase tracking-[0.18em] text-slate-300"
                >
                  IMDb Movie ID
                </label>
                <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
                  <div className="relative flex-1">
                    <input
                      id="imdbId"
                      type="text"
                      autoComplete="off"
                      spellCheck={false}
                      placeholder="tt0468569 for The Dark Knight"
                      value={imdbId}
                      onChange={(e) => setImdbId(e.target.value)}
                      onBlur={() => setTouched(true)}
                      className="h-11 w-full rounded-2xl border border-white/10 bg-white/5 pl-9 pr-3 text-sm font-mono tracking-wide text-slate-50 outline-none ring-0 transition focus:border-[#ff8f6b]/70 focus:bg-black/30 focus:ring-2 focus:ring-[#d14836]/40 disabled:cursor-not-allowed disabled:opacity-60"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={fetchState === "loading"}
                    className="relative inline-flex h-11 w-full shrink-0 items-center justify-center gap-2 rounded-2xl border border-[#ff8f6b]/60 bg-linear-to-r from-[#d14836] via-[#e76545] to-[#ff8f6b] px-5 text-xs font-semibold uppercase tracking-[0.18em] text-white shadow-lg shadow-[#d14836]/30 transition hover:from-[#c63f2f] hover:via-[#d6573b] hover:to-[#f07d58] hover:shadow-[#d14836]/40 disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto sm:px-6"
                  >
                    {fetchState === "loading" ? (
                      <>
                        <span className="inline-flex h-4 w-4 items-center justify-center">
                          <span className="h-3 w-3 animate-spin rounded-full border border-white/40 border-t-white" />
                        </span>
                        Analyzing
                      </>
                    ) : (
                      <>Get Insights</>
                    )}
                  </button>
                </div>
                {showIdError && (
                  <p className="mt-1.5 text-xs text-rose-300">
                    Please enter a valid IMDb ID like <span className="font-mono">tt1234567</span>.
                  </p>
                )}
              </div>
            </div>

            {error && (
              <div className="mt-4 flex items-start gap-2 rounded-2xl border border-rose-500/40 bg-rose-500/10 px-3 py-2.5 text-xs text-rose-50">
                <div className="mt-0.5 h-1.5 w-1.5 rounded-full bg-rose-300" />
                <p className="leading-relaxed">{error}</p>
              </div>
            )}
          </form>
        </section>

        <section className="flex w-full flex-1 flex-col gap-6">
          {fetchState === "idle" && (
            <div className="mx-auto max-w-xl rounded-3xl border border-dashed border-[#4a2d27] bg-[#1a1416]/80 px-5 py-7 text-center text-sm text-slate-300/85 shadow-inner shadow-black/60 sm:px-6 sm:py-8">
              <p className="mb-3 font-medium text-slate-100/95">Ready when you are.</p>
              <p>
                Paste any public IMDb movie ID to see title, cast, release info, and an AI-powered read on how the
                audience feels about it.
              </p>
            </div>
          )}

          {fetchState === "loading" && (
            <div className="relative w-full rounded-3xl border border-white/10 bg-[#120f11]/80 px-4 py-6 shadow-inner shadow-[#d14836]/15 sm:px-6 sm:py-7">
              <div className="mb-4 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                <p className="text-xs font-semibold uppercase tracking-[0.22em] text-slate-300">Crunching the numbers</p>
                <div className="flex items-center gap-2 text-[11px] text-slate-400">
                  <div className="flex h-5 w-5 items-center justify-center rounded-full border border-[#ff8f6b]/40 bg-[#d14836]/10">
                    <span className="h-2.5 w-2.5 animate-spin rounded-full border border-[#ff8f6b]/40 border-t-transparent" />
                  </div>
                  <span>Fetching metadata, reviews &amp; sentiment</span>
                </div>
              </div>
              <div className="grid gap-4 lg:grid-cols-[minmax(0,1.4fr),minmax(0,1fr)]">
                <div className="flex flex-col gap-3">
                  <div className="h-20 rounded-2xl bg-linear-to-r from-[#2a1e1d]/70 via-[#1c1414]/70 to-[#2a1e1d]/70">
                    <div className="h-full w-full animate-pulse rounded-2xl bg-linear-to-r from-[#2a1e1d]/80 via-[#1c1414]/80 to-[#2a1e1d]/80" />
                  </div>
                  <div className="grid grid-cols-3 gap-2">
                    <div className="h-16 rounded-2xl bg-[#1b1415]/90">
                      <div className="h-full w-full animate-pulse rounded-2xl bg-[#2a1e1d]/90" />
                    </div>
                    <div className="h-16 rounded-2xl bg-[#1b1415]/90">
                      <div className="h-full w-full animate-pulse rounded-2xl bg-[#2a1e1d]/90" />
                    </div>
                    <div className="h-16 rounded-2xl bg-[#1b1415]/90">
                      <div className="h-full w-full animate-pulse rounded-2xl bg-[#2a1e1d]/90" />
                    </div>
                  </div>
                </div>
                <div className="flex flex-col gap-3">
                  <div className="h-24 rounded-2xl bg-[#1b1415]/90">
                    <div className="h-full w-full animate-pulse rounded-2xl bg-[#2a1e1d]/95" />
                  </div>
                  <div className="h-16 rounded-2xl bg-[#1b1415]/90">
                    <div className="h-full w-full animate-pulse rounded-2xl bg-[#2a1e1d]/90" />
                  </div>
                </div>
              </div>
            </div>
          )}

          {data && fetchState === "done" && (
            <div className="grid w-full gap-6 lg:grid-cols-[minmax(0,1.35fr),minmax(0,1fr)]">
              <article className="overflow-hidden rounded-3xl border border-white/10 bg-linear-to-br from-[#171214]/95 via-[#120f11]/95 to-[#171214]/95 shadow-2xl shadow-[#d14836]/20">
                <div className="flex flex-col gap-4 p-5 sm:p-6">
                  <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:gap-5">
                    <div className="relative mx-auto h-64 w-44 overflow-hidden rounded-2xl border border-white/10 bg-black/60 shadow-lg shadow-black/60 sm:mx-0 sm:h-48 sm:w-32">
                      {data.movie.posterUrl ? (
                        <Image
                          src={data.movie.posterUrl}
                          alt={data.movie.title}
                          fill
                          sizes="160px"
                          className="object-cover object-center transition duration-500 ease-out hover:scale-105"
                        />
                      ) : (
                        <div className="flex h-full w-full items-center justify-center text-xs text-slate-500">No poster</div>
                      )}
                      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
                      <div className="absolute left-2 top-2 rounded-full bg-black/70 px-2 py-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-slate-200 shadow">
                        IMDb
                      </div>
                    </div>
                    <div className="flex-1">
                      <h2 className="text-center text-lg font-semibold tracking-tight text-slate-50 sm:text-left sm:text-xl">
                        {data.movie.title}
                      </h2>
                      <p className="mt-1 text-sm text-slate-300">
                        <span className="font-medium text-[#ff8f6b]">{data.movie.year}</span>
                        {data.movie.rating && (
                          <>
                            <span className="mx-2 text-slate-500">•</span>
                            <span className="inline-flex items-center gap-1">
                              <span className="h-1.5 w-1.5 rounded-full bg-[#ffb08f]" />
                              <span className="font-mono text-[#ffd2be]">
                                {data.movie.rating}
                                <span className="text-xs text-slate-400"> / 10 IMDb</span>
                              </span>
                            </span>
                          </>
                        )}
                      </p>
                      {data.movie.plot && <p className="mt-3 text-sm leading-relaxed text-slate-200/90">{data.movie.plot}</p>}
                    </div>
                  </div>

                  {data.movie.cast.length > 0 && (
                    <div className="mt-1">
                      <p className="mb-1 text-[11px] font-semibold uppercase tracking-[0.22em] text-slate-400">Principal Cast</p>
                      <div className="no-scrollbar flex gap-1.5 overflow-x-auto pb-1">
                        {data.movie.cast.map((actor) => (
                          <div
                            key={actor}
                            className="whitespace-nowrap rounded-full border border-white/10 bg-black/30 px-3 py-1 text-xs text-slate-100 shadow-sm shadow-black/40"
                          >
                            {actor}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                <div className="border-t border-white/5 bg-[#0f0c0d]/90 px-5 py-4 sm:px-6">
                  <p className="mb-2 text-[11px] font-semibold uppercase tracking-[0.22em] text-slate-400">Audience voices</p>
                  <div className="no-scrollbar flex gap-2 overflow-x-auto pb-1 text-xs text-slate-200/90">
                    {data.reviews.slice(0, 3).map((review, idx) => (
                      <div
                        key={`${review.author ?? "anon"}-${idx}`}
                        className="min-w-[78%] max-w-xs flex-1 rounded-2xl border border-white/8 bg-black/30 px-3 py-2 shadow-inner shadow-black/50 sm:min-w-[220px]"
                      >
                        {review.title && <p className="mb-1.5 text-[11px] font-semibold text-slate-50">{review.title}</p>}
                        <p className="line-clamp-3 text-[11px] leading-relaxed text-slate-200/90">{review.text}</p>
                        <div className="mt-2 flex items-center justify-between text-[10px] text-slate-400">
                          <span>{review.author ?? "IMDb user"}</span>
                          {review.rating != null && (
                            <span className="font-mono text-[#ffd2be]">
                              {review.rating}
                              <span className="text-[9px] text-slate-500"> / 10</span>
                            </span>
                          )}
                        </div>
                      </div>
                    ))}
                    {data.reviews.length > 3 && (
                      <div className="flex min-w-[120px] items-center justify-center rounded-2xl border border-dashed border-[#4a2d27]/80 bg-black/20 px-3 py-2 text-[11px] text-slate-400">
                        +{data.reviews.length - 3} more audience reviews analyzed
                      </div>
                    )}
                  </div>
                </div>
              </article>

              <aside className="flex flex-col gap-4">
                <div className="relative overflow-hidden rounded-3xl border border-white/12 bg-linear-to-br from-[#161113] via-[#120f11] to-[#161113] p-5 shadow-xl shadow-[#d14836]/25">
                  <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(209,72,54,0.16),transparent_55%),radial-gradient(circle_at_bottom,rgba(255,143,107,0.16),transparent_55%)]" />
                  <div className="relative">
                    <div className="mb-3 flex items-center justify-between gap-3">
                      <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-slate-300">AI sentiment summary</p>
                      <div className={`inline-flex items-center gap-2 rounded-full border px-2.5 py-1 ${sentimentColor}`}>
                        <span className="h-1.5 w-1.5 rounded-full bg-current" />
                        <span className="text-[10px] font-semibold uppercase tracking-[0.2em]">{data.sentiment.overall}</span>
                      </div>
                    </div>
                    <p className="text-sm leading-relaxed text-slate-100/95">{data.sentiment.summary}</p>
                    <p className="mt-3 text-[11px] text-slate-400">
                      Generated from <span className="font-semibold text-slate-100">{data.reviews.length} audience reviews</span>. AI
                      may occasionally misread sarcasm or very short comments.
                    </p>
                  </div>
                </div>

                <div className="rounded-3xl border border-[#3b2723] bg-[#120f11]/80 p-4 text-[11px] text-slate-400 shadow-inner shadow-black/70">
                  <p className="mb-1 font-semibold text-slate-200">How it works</p>
                  <p className="mb-2">
                    We combine public metadata from the OMDb API with a snapshot of recent user reviews from IMDb, then ask an AI
                    model to summarize how people feel about the movie overall.
                  </p>
                  <p>
                    This tool is for educational and discovery purposes only. Always verify important decisions with the original
                    sources.
                  </p>
                </div>
              </aside>
            </div>
          )}
        </section>
      </main>
    </div>
  );
}
