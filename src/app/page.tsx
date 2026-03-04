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
      ? "bg-emerald-500/15 text-emerald-300 border-emerald-500/40"
      : data?.sentiment.overall === "negative"
      ? "bg-rose-500/15 text-rose-300 border-rose-500/40"
      : "bg-amber-500/15 text-amber-200 border-amber-500/40";

  return (
    <div className="min-h-screen bg-linear-to-br from-slate-950 via-slate-900 to-slate-950 text-slate-50">
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="absolute -left-32 top-10 h-72 w-72 rounded-full bg-emerald-500/15 blur-3xl" />
        <div className="absolute -right-32 bottom-10 h-72 w-72 rounded-full bg-sky-500/10 blur-3xl" />
      </div>

      <main className="relative z-10 mx-auto flex min-h-screen max-w-5xl flex-col items-center px-4 pb-16 pt-10 sm:px-6 lg:px-8 lg:pt-16">
        <header className="mb-10 flex w-full flex-col items-center gap-4 text-center sm:mb-12 sm:gap-5">
          <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1 text-xs font-medium text-slate-200 shadow-lg shadow-emerald-500/10 backdrop-blur">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
            AI-powered sentiment lens for IMDb
          </div>
          <h1 className="bg-linear-to-br from-slate-50 via-slate-200 to-emerald-300 bg-clip-text text-4xl font-semibold tracking-tight text-transparent sm:text-5xl lg:text-6xl">
            Movie Insighter
          </h1>
          <p className="max-w-2xl text-sm text-slate-300/80 sm:text-base">
            Drop in an IMDb ID like <span className="font-mono text-emerald-300/90">tt0133093</span> and get a rich
            snapshot of the movie&apos;s details, cast, and what audiences are really saying.
          </p>
        </header>

        <section className="mb-10 w-full max-w-3xl">
          <form
            onSubmit={handleSubmit}
            className="group relative overflow-hidden rounded-3xl border border-white/10 bg-linear-to-br from-slate-900/80 via-slate-950/80 to-slate-900/90 p-5 shadow-2xl shadow-emerald-500/10 backdrop-blur-xl sm:p-6"
          >
            <div className="pointer-events-none absolute inset-x-10 -top-24 h-36 bg-linear-to-b from-emerald-500/25 to-transparent opacity-60 blur-3xl transition group-hover:opacity-80" />

            <div className="relative flex flex-col gap-4 sm:flex-row sm:items-end sm:gap-3">
              <div className="flex-1">
                <label htmlFor="imdbId" className="mb-2 block text-xs font-medium uppercase tracking-[0.18em] text-slate-300">
                  IMDb Movie ID
                </label>
                <div className="relative">
                  <span className="pointer-events-none absolute inset-y-0 left-3.5 flex items-center font-mono text-[11px] text-slate-500/80">
                    tt
                  </span>
                  <input
                    id="imdbId"
                    type="text"
                    autoComplete="off"
                    spellCheck={false}
                    placeholder="0133093"
                    value={imdbId}
                    onChange={(e) => setImdbId(e.target.value)}
                    onBlur={() => setTouched(true)}
                    className="h-11 w-full rounded-2xl border border-white/10 bg-white/5 pl-9 pr-3 text-sm font-mono tracking-wide text-slate-50 outline-none ring-0 transition focus:border-emerald-400/70 focus:bg-slate-900/60 focus:ring-2 focus:ring-emerald-500/40 disabled:cursor-not-allowed disabled:opacity-60"
                  />
                  <div className="pointer-events-none absolute inset-y-px right-px flex items-center pr-2">
                    <div className="flex items-center gap-1 rounded-2xl bg-slate-900/80 px-2.5 py-1 text-[10px] font-medium text-slate-300 shadow-sm shadow-black/40">
                      <span className="inline-flex h-4 w-4 items-center justify-center rounded border border-white/10 bg-slate-800/80 text-[9px] font-semibold text-emerald-300">
                        ⏎
                      </span>
                      Analyze
                    </div>
                  </div>
                </div>
                <p className="mt-1.5 text-[11px] text-slate-400">
                  Example: <span className="font-mono text-slate-200">tt0468569</span> for{" "}
                  <span className="italic">The Dark Knight</span>.
                </p>
                {showIdError && (
                  <p className="mt-1.5 text-xs text-rose-300">
                    Please enter a valid IMDb ID like <span className="font-mono">tt1234567</span>.
                  </p>
                )}
              </div>

              <button
                type="submit"
                disabled={fetchState === "loading"}
                className="relative mt-2 inline-flex h-11 shrink-0 items-center justify-center gap-2 rounded-2xl border border-emerald-400/60 bg-linear-to-r from-emerald-500 via-emerald-400 to-sky-400 px-5 text-xs font-semibold uppercase tracking-[0.18em] text-slate-950 shadow-lg shadow-emerald-500/30 transition hover:from-emerald-400 hover:via-emerald-300 hover:to-sky-300 hover:shadow-emerald-400/40 disabled:cursor-not-allowed disabled:opacity-60 sm:mt-0 sm:px-6"
              >
                {fetchState === "loading" ? (
                  <>
                    <span className="inline-flex h-4 w-4 items-center justify-center">
                      <span className="h-3 w-3 animate-spin rounded-full border border-slate-900/40 border-t-slate-900" />
                    </span>
                    Analyzing
                  </>
                ) : (
                  <>Generate Insights</>
                )}
              </button>
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
            <div className="mx-auto max-w-xl rounded-3xl border border-dashed border-slate-700/80 bg-slate-900/70 px-6 py-8 text-center text-sm text-slate-300/85 shadow-inner shadow-black/60">
              <p className="mb-3 font-medium text-slate-100/95">Ready when you are.</p>
              <p>
                Paste any public IMDb movie ID to see title, cast, release info, and an AI-powered read on how the
                audience feels about it.
              </p>
            </div>
          )}

          {fetchState === "loading" && (
            <div className="relative w-full rounded-3xl border border-white/10 bg-slate-950/80 px-6 py-7 shadow-inner shadow-emerald-500/20">
              <div className="mb-4 flex items-center justify-between">
                <p className="text-xs font-semibold uppercase tracking-[0.22em] text-slate-300">
                  Crunching the numbers
                </p>
                <div className="flex items-center gap-2 text-[11px] text-slate-400">
                  <div className="flex h-5 w-5 items-center justify-center rounded-full border border-emerald-400/40 bg-emerald-500/10">
                    <span className="h-2.5 w-2.5 animate-spin rounded-full border border-emerald-400/40 border-t-transparent" />
                  </div>
                  <span>Fetching metadata, reviews &amp; sentiment</span>
                </div>
              </div>
              <div className="grid gap-4 md:grid-cols-[minmax(0,1.4fr),minmax(0,1fr)]">
                <div className="flex flex-col gap-3">
                  <div className="h-20 rounded-2xl bg-gradient-to-r from-slate-800/70 via-slate-900/70 to-slate-800/70">
                    <div className="h-full w-full animate-pulse rounded-2xl bg-gradient-to-r from-slate-800/80 via-slate-900/80 to-slate-800/80" />
                  </div>
                  <div className="grid grid-cols-3 gap-2">
                    <div className="h-16 rounded-2xl bg-slate-900/80">
                      <div className="h-full w-full animate-pulse rounded-2xl bg-slate-800/90" />
                    </div>
                    <div className="h-16 rounded-2xl bg-slate-900/80">
                      <div className="h-full w-full animate-pulse rounded-2xl bg-slate-800/90" />
                    </div>
                    <div className="h-16 rounded-2xl bg-slate-900/80">
                      <div className="h-full w-full animate-pulse rounded-2xl bg-slate-800/90" />
                    </div>
                  </div>
                </div>
                <div className="flex flex-col gap-3">
                  <div className="h-24 rounded-2xl bg-slate-900/90">
                    <div className="h-full w-full animate-pulse rounded-2xl bg-slate-800/95" />
                  </div>
                  <div className="h-16 rounded-2xl bg-slate-900/80">
                    <div className="h-full w-full animate-pulse rounded-2xl bg-slate-800/90" />
                  </div>
                </div>
              </div>
            </div>
          )}

          {data && fetchState === "done" && (
            <div className="grid w-full gap-6 md:grid-cols-[minmax(0,1.35fr),minmax(0,1fr)]">
              <article className="overflow-hidden rounded-3xl border border-white/10 bg-linear-to-br from-slate-950/95 via-slate-900/95 to-slate-950/95 shadow-2xl shadow-emerald-500/20">
                <div className="flex flex-col gap-4 p-5 sm:p-6">
                  <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:gap-5">
                    <div className="relative mx-auto h-44 w-32 overflow-hidden rounded-2xl border border-white/10 bg-slate-900 shadow-lg shadow-black/60 sm:mx-0 sm:h-48 sm:w-32">
                      {data.movie.posterUrl ? (
                        <Image
                          src={data.movie.posterUrl}
                          alt={data.movie.title}
                          fill
                          sizes="160px"
                          className="object-cover object-center transition duration-500 ease-out hover:scale-105"
                        />
                      ) : (
                        <div className="flex h-full w-full items-center justify-center text-xs text-slate-500">
                          No poster
                        </div>
                      )}
                      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
                      <div className="absolute left-2 top-2 rounded-full bg-slate-950/80 px-2 py-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-slate-200 shadow">
                        IMDb
                      </div>
                    </div>
                    <div className="flex-1">
                      <h2 className="text-lg font-semibold tracking-tight text-slate-50 sm:text-xl">
                        {data.movie.title}
                      </h2>
                      <p className="mt-1 text-sm text-slate-300">
                        <span className="font-medium text-emerald-300">{data.movie.year}</span>
                        {data.movie.rating && (
                          <>
                            <span className="mx-2 text-slate-500">•</span>
                            <span className="inline-flex items-center gap-1">
                              <span className="h-1.5 w-1.5 rounded-full bg-amber-300" />
                              <span className="font-mono text-amber-200">
                                {data.movie.rating}
                                <span className="text-xs text-slate-400"> / 10 IMDb</span>
                              </span>
                            </span>
                          </>
                        )}
                      </p>
                      {data.movie.plot && (
                        <p className="mt-3 text-sm leading-relaxed text-slate-200/90">{data.movie.plot}</p>
                      )}
                    </div>
                  </div>

                  {data.movie.cast.length > 0 && (
                    <div className="mt-1">
                      <p className="mb-1 text-[11px] font-semibold uppercase tracking-[0.22em] text-slate-400">
                        Principal Cast
                      </p>
                      <div className="no-scrollbar flex gap-1.5 overflow-x-auto pb-1">
                        {data.movie.cast.map((actor) => (
                          <div
                            key={actor}
                            className="whitespace-nowrap rounded-full border border-white/10 bg-slate-900/80 px-3 py-1 text-xs text-slate-100 shadow-sm shadow-black/40"
                          >
                            {actor}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                <div className="border-t border-white/5 bg-slate-950/90 px-5 py-4 sm:px-6">
                  <p className="mb-2 text-[11px] font-semibold uppercase tracking-[0.22em] text-slate-400">
                    Audience voices
                  </p>
                  <div className="no-scrollbar flex gap-2 overflow-x-auto pb-1 text-xs text-slate-200/90">
                    {data.reviews.slice(0, 3).map((review, idx) => (
                      <div
                        key={`${review.author ?? "anon"}-${idx}`}
                        className="min-w-[180px] max-w-xs flex-1 rounded-2xl border border-white/8 bg-slate-900/90 px-3 py-2 shadow-inner shadow-black/50"
                      >
                        {review.title && <p className="mb-1.5 text-[11px] font-semibold text-slate-50">{review.title}</p>}
                        <p className="line-clamp-3 text-[11px] leading-relaxed text-slate-200/90">{review.text}</p>
                        <div className="mt-2 flex items-center justify-between text-[10px] text-slate-400">
                          <span>{review.author ?? "IMDb user"}</span>
                          {review.rating != null && (
                            <span className="font-mono text-amber-300">
                              {review.rating}
                              <span className="text-[9px] text-slate-500"> / 10</span>
                            </span>
                          )}
                        </div>
                      </div>
                    ))}
                    {data.reviews.length > 3 && (
                      <div className="flex min-w-[120px] items-center justify-center rounded-2xl border border-dashed border-slate-600/80 bg-slate-950/60 px-3 py-2 text-[11px] text-slate-400">
                        +{data.reviews.length - 3} more audience reviews analyzed
                      </div>
                    )}
                  </div>
                </div>
              </article>

              <aside className="flex flex-col gap-4">
                <div className="relative overflow-hidden rounded-3xl border border-white/12 bg-linear-to-br from-slate-950 via-slate-900 to-slate-950 p-5 shadow-xl shadow-emerald-500/25">
                  <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(52,211,153,0.1),transparent_55%),radial-gradient(circle_at_bottom,rgba(56,189,248,0.18),transparent_55%)]" />
                  <div className="relative">
                    <div className="mb-3 flex items-center justify-between gap-3">
                      <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-slate-300">
                        AI sentiment summary
                      </p>
                      <div className={`inline-flex items-center gap-2 rounded-full border px-2.5 py-1 ${sentimentColor}`}>
                        <span className="h-1.5 w-1.5 rounded-full bg-current" />
                        <span className="text-[10px] font-semibold uppercase tracking-[0.2em]">
                          {data.sentiment.overall}
                        </span>
                      </div>
                    </div>
                    <p className="text-sm leading-relaxed text-slate-100/95">{data.sentiment.summary}</p>
                    <p className="mt-3 text-[11px] text-slate-400">
                      Generated from{" "}
                      <span className="font-semibold text-slate-100">{data.reviews.length} audience reviews</span>. AI
                      may occasionally misread sarcasm or very short comments.
                    </p>
                  </div>
                </div>

                <div className="rounded-3xl border border-slate-800 bg-slate-950/80 p-4 text-[11px] text-slate-400 shadow-inner shadow-black/70">
                  <p className="mb-1 font-semibold text-slate-200">How it works</p>
                  <p className="mb-2">
                    We combine public metadata from the OMDb API with a snapshot of recent user reviews from IMDb, then
                    ask an AI model to summarize how people feel about the movie overall.
                  </p>
                  <p>
                    This tool is for educational and discovery purposes only. Always verify important decisions with the
                    original sources.
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

