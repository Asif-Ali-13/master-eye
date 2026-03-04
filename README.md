## Movie Insighter

Movie Insighter is a small web tool that lets you enter an IMDb movie ID (for example `tt0133093`) and get:

- **Movie details** – title, poster, year, IMDb rating, short plot
- **Cast snapshot** – principal cast list
- **Audience reviews** – a sample of public IMDb user reviews
- **AI insights** – a short natural-language summary of audience sentiment
- **Overall sentiment tag** – one of **positive / mixed / negative**

All of this is presented in a **responsive, modern, animated UI** built with Next.js, Tailwind and TypeScript.

---

## Setup instructions

### 1. Install dependencies

From the project root:

```bash
npm install
```

### 2. Environment variables

Create a `.env.local` file in the project root with:

```bash
OMDB_API_KEY=your_omdb_api_key_here
OPENAI_API_KEY=your_openai_key_here
```

- **`OMDB_API_KEY`** – required to fetch movie metadata (title, year, rating, poster, plot, cast) from the [OMDb API](https://www.omdbapi.com/).
- **`OPENAI_API_KEY`** – optional but recommended. Used to turn raw reviews into an AI-generated sentiment summary.
  - If this key is **not set**, the app will fall back to a simple word-based heuristic to classify sentiment and shows a note explaining that the summary is heuristic.

### 3. Run the development server

```bash
npm run dev
```

Visit `http://localhost:3000` and you should see the Movie Insighter UI.

### 4. Running tests

This project uses **Jest** for a minimal unit-test layer around sentiment classification logic.

```bash
npm test
```

---

## How it works

- **Input** – User enters an IMDb ID (for example `tt0468569`).
- **Backend API** – `POST /api/movie`:
  - Validates the ID format.
  - Fetches movie details from **OMDb** using `OMDB_API_KEY`.
  - Scrapes public IMDb user reviews via the HTML reviews page for that title.
  - Calls an AI model (via `OPENAI_API_KEY`) to synthesize:
    - **Summary**: 3–5 sentence natural-language overview of audience sentiment.
    - **Overall label**: one of `positive | mixed | negative`.
  - Returns structured JSON to the frontend containing movie details, sample reviews and sentiment insights.
- **Frontend UI** – the Next.js page:
  - Provides a single-input form for the IMDb ID with **inline validation**.
  - Shows **loading skeletons** while data is being fetched.
  - Renders a **card layout** with poster, title, year, IMDb rating, plot and key cast.
  - Renders sample audience review chips and the **AI sentiment tile** with a colored sentiment badge.

Error states (invalid ID, missing reviews, missing keys, network errors) are handled gracefully with clear, user-facing messages.

---

## Tech stack rationale

- **Next.js (App Router) + React + TypeScript**
  - Modern, opinionated React framework with good DX.
  - Simple to deploy (e.g. on Vercel) and to add an `/api` backend within the same codebase.
  - Strong typing via TypeScript helps keep the movie/review/sentiment models tidy and traceable.
- **Tailwind CSS**
  - Fast iteration on a **premium-feeling** visual design: gradients, glassmorphism, subtle animations, responsive layout.
  - Keeps styling co-located with components while remaining expressive.
- **Cheerio**
  - Lightweight HTML parser used to extract review content from public IMDb review pages on the server.
- **Jest**
  - Simple, familiar testing framework.
  - Currently used for a **small but concrete** unit test around sentiment classification logic to demonstrate testing practices.

---

## Assumptions

- **Public reviews only**: The app only works with movies that have public reviews on IMDb. If there are no accessible reviews, you&apos;ll see a clear error message.
- **API keys are provided by the user**: You will provide your own `OMDB_API_KEY` and `OPENAI_API_KEY` and are responsible for usage, cost and rate limiting.
- **Best-effort scraping**: IMDb does not provide a free, official public reviews API. The scraping logic is a best-effort HTML parser and may need periodic adjustment if IMDb changes its markup.
- **Non-production tool**: This is intended as a learning / demo project, not a production analytics tool. In particular:
  - There is no persistence layer or caching.
  - Rate limiting, retries and advanced observability have been kept intentionally simple.

---

## Notes on evaluation criteria

- **Functionality**
  - Single field for IMDb ID input.
  - Movie details: title, poster, year, rating, short plot.
  - Cast list, review snippets and sentiment summary + overall classification.
  - Handles obvious edge cases (invalid ID format, missing reviews, API/env errors) with user-friendly messaging.
- **Code quality**
  - Modular structure under `src/lib` for **IMDB/OMDb integration**, **sentiment logic**, and **shared types**.
  - Clear error handling paths and strongly-typed response model for the `/api/movie` endpoint.
  - Comments are limited to non-obvious logic and integration notes.
- **Deployment & usability**
  - Next.js app ready to deploy on platforms like Vercel.
  - UI is responsive, keyboard-friendly and works on both desktop and mobile.
  - Loading states and skeletons aim to make the experience feel smooth and premium.
- **Creativity & bonus**
  - Gradient background, glassmorphism panels, micro-copy and subtle animations to give a **modern, premium** look.
  - Heuristic fallback sentiment when no AI key is present, so the app remains usable in a constrained environment.

