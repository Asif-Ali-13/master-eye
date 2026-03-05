(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/Desktop/project/movie_insighter/src/app/page.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>Home
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$project$2f$movie_insighter$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/project/movie_insighter/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$project$2f$movie_insighter$2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/project/movie_insighter/node_modules/next/image.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$project$2f$movie_insighter$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/project/movie_insighter/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
function Home() {
    _s();
    const [imdbId, setImdbId] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$project$2f$movie_insighter$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("");
    const [touched, setTouched] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$project$2f$movie_insighter$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [fetchState, setFetchState] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$project$2f$movie_insighter$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("idle");
    const [error, setError] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$project$2f$movie_insighter$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [data, setData] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$project$2f$movie_insighter$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const isValidId = /^tt\d{7,9}$/.test(imdbId.trim());
    const showIdError = touched && imdbId.length > 0 && !isValidId;
    async function handleSubmit(e) {
        e.preventDefault();
        setTouched(true);
        setError(null);
        if (!isValidId) return;
        setFetchState("loading");
        setData(null);
        try {
            const res = await fetch("/api/movie", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    imdbId: imdbId.trim()
                })
            });
            const json = await res.json();
            if (!res.ok) {
                setError(json.error ?? "Something went wrong. Please try again.");
                setFetchState("error");
                return;
            }
            setData(json);
            setFetchState("done");
        } catch (err) {
            console.error(err);
            setError("Network error. Please check your connection and try again.");
            setFetchState("error");
        }
    }
    const sentimentColor = data?.sentiment.overall === "positive" ? "bg-emerald-500/15 text-emerald-200 border-emerald-500/40" : data?.sentiment.overall === "negative" ? "bg-rose-500/15 text-rose-200 border-rose-500/40" : "bg-amber-500/15 text-amber-200 border-amber-500/40";
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$project$2f$movie_insighter$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "min-h-screen bg-linear-to-br from-[#0b0b0d] via-[#161114] to-[#0b0b0d] text-slate-50",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$project$2f$movie_insighter$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "pointer-events-none fixed inset-0 overflow-hidden",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$project$2f$movie_insighter$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "absolute -left-32 top-10 h-72 w-72 rounded-full bg-[#d14836]/20 blur-3xl"
                    }, void 0, false, {
                        fileName: "[project]/Desktop/project/movie_insighter/src/app/page.tsx",
                        lineNumber: 63,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$project$2f$movie_insighter$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "absolute -right-32 bottom-10 h-72 w-72 rounded-full bg-[#ff8f6b]/15 blur-3xl"
                    }, void 0, false, {
                        fileName: "[project]/Desktop/project/movie_insighter/src/app/page.tsx",
                        lineNumber: 64,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/Desktop/project/movie_insighter/src/app/page.tsx",
                lineNumber: 62,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$project$2f$movie_insighter$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("main", {
                className: "relative z-10 mx-auto flex min-h-screen w-full max-w-6xl flex-col items-center px-4 pb-12 pt-8 sm:px-6 sm:pb-16 sm:pt-10 lg:px-8 lg:pt-16",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$project$2f$movie_insighter$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("header", {
                        className: "mb-8 flex w-full flex-col items-center gap-3 text-center sm:mb-12 sm:gap-5",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$project$2f$movie_insighter$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[11px] font-medium text-slate-100 shadow-lg shadow-[#d14836]/10 backdrop-blur sm:px-4 sm:text-xs",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$project$2f$movie_insighter$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "h-1.5 w-1.5 rounded-full bg-[#ff8f6b]"
                                    }, void 0, false, {
                                        fileName: "[project]/Desktop/project/movie_insighter/src/app/page.tsx",
                                        lineNumber: 70,
                                        columnNumber: 13
                                    }, this),
                                    "AI-powered sentiment lens for IMDb"
                                ]
                            }, void 0, true, {
                                fileName: "[project]/Desktop/project/movie_insighter/src/app/page.tsx",
                                lineNumber: 69,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$project$2f$movie_insighter$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                                className: "bg-linear-to-br from-white via-[#ffe4db] to-[#ff8f6b] bg-clip-text text-4xl font-semibold tracking-tight text-transparent sm:text-5xl lg:text-6xl",
                                children: "Movie Insighter"
                            }, void 0, false, {
                                fileName: "[project]/Desktop/project/movie_insighter/src/app/page.tsx",
                                lineNumber: 73,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$project$2f$movie_insighter$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "max-w-2xl text-base text-slate-300/90 sm:text-lg",
                                children: [
                                    "Drop in an IMDb ID like ",
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$project$2f$movie_insighter$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "font-mono text-[#ff8f6b]",
                                        children: "tt0133093"
                                    }, void 0, false, {
                                        fileName: "[project]/Desktop/project/movie_insighter/src/app/page.tsx",
                                        lineNumber: 77,
                                        columnNumber: 37
                                    }, this),
                                    " and get a rich snapshot of the movie's details, cast, and what audiences are really saying."
                                ]
                            }, void 0, true, {
                                fileName: "[project]/Desktop/project/movie_insighter/src/app/page.tsx",
                                lineNumber: 76,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/Desktop/project/movie_insighter/src/app/page.tsx",
                        lineNumber: 68,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$project$2f$movie_insighter$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                        className: "mb-8 w-full max-w-4xl sm:mb-10",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$project$2f$movie_insighter$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("form", {
                            onSubmit: handleSubmit,
                            className: "group relative overflow-hidden rounded-3xl border border-white/10 bg-linear-to-br from-[#1a1416]/90 via-[#120f11]/90 to-[#1a1416]/90 p-4 shadow-2xl shadow-[#d14836]/15 backdrop-blur-xl sm:p-6",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$project$2f$movie_insighter$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "pointer-events-none absolute inset-x-10 -top-24 h-36 bg-linear-to-b from-[#d14836]/25 to-transparent opacity-70 blur-3xl transition group-hover:opacity-90"
                                }, void 0, false, {
                                    fileName: "[project]/Desktop/project/movie_insighter/src/app/page.tsx",
                                    lineNumber: 87,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$project$2f$movie_insighter$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "relative",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$project$2f$movie_insighter$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex-1",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$project$2f$movie_insighter$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                htmlFor: "imdbId",
                                                className: "mb-2 block text-xs font-medium uppercase tracking-[0.18em] text-slate-300",
                                                children: "IMDb Movie ID"
                                            }, void 0, false, {
                                                fileName: "[project]/Desktop/project/movie_insighter/src/app/page.tsx",
                                                lineNumber: 91,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$project$2f$movie_insighter$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "flex flex-col gap-3 sm:flex-row sm:items-center",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$project$2f$movie_insighter$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "relative flex-1",
                                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$project$2f$movie_insighter$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                            id: "imdbId",
                                                            type: "text",
                                                            autoComplete: "off",
                                                            spellCheck: false,
                                                            placeholder: "tt0468569 for The Dark Knight",
                                                            value: imdbId,
                                                            onChange: (e)=>setImdbId(e.target.value),
                                                            onBlur: ()=>setTouched(true),
                                                            className: "h-11 w-full rounded-2xl border border-white/10 bg-white/5 pl-9 pr-3 text-sm font-mono tracking-wide text-slate-50 outline-none ring-0 transition focus:border-[#ff8f6b]/70 focus:bg-black/30 focus:ring-2 focus:ring-[#d14836]/40 disabled:cursor-not-allowed disabled:opacity-60"
                                                        }, void 0, false, {
                                                            fileName: "[project]/Desktop/project/movie_insighter/src/app/page.tsx",
                                                            lineNumber: 99,
                                                            columnNumber: 21
                                                        }, this)
                                                    }, void 0, false, {
                                                        fileName: "[project]/Desktop/project/movie_insighter/src/app/page.tsx",
                                                        lineNumber: 98,
                                                        columnNumber: 19
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$project$2f$movie_insighter$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                        type: "submit",
                                                        disabled: fetchState === "loading",
                                                        className: "relative inline-flex h-11 w-full shrink-0 items-center justify-center gap-2 rounded-2xl border border-[#ff8f6b]/60 bg-linear-to-r from-[#d14836] via-[#e76545] to-[#ff8f6b] px-5 text-xs font-semibold uppercase tracking-[0.18em] text-white shadow-lg shadow-[#d14836]/30 transition hover:from-[#c63f2f] hover:via-[#d6573b] hover:to-[#f07d58] hover:shadow-[#d14836]/40 disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto sm:px-6",
                                                        children: fetchState === "loading" ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$project$2f$movie_insighter$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$project$2f$movie_insighter$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$project$2f$movie_insighter$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                    className: "inline-flex h-4 w-4 items-center justify-center",
                                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$project$2f$movie_insighter$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                        className: "h-3 w-3 animate-spin rounded-full border border-white/40 border-t-white"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/Desktop/project/movie_insighter/src/app/page.tsx",
                                                                        lineNumber: 120,
                                                                        columnNumber: 27
                                                                    }, this)
                                                                }, void 0, false, {
                                                                    fileName: "[project]/Desktop/project/movie_insighter/src/app/page.tsx",
                                                                    lineNumber: 119,
                                                                    columnNumber: 25
                                                                }, this),
                                                                "Analyzing"
                                                            ]
                                                        }, void 0, true) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$project$2f$movie_insighter$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$project$2f$movie_insighter$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                                                            children: "Get Insights"
                                                        }, void 0, false)
                                                    }, void 0, false, {
                                                        fileName: "[project]/Desktop/project/movie_insighter/src/app/page.tsx",
                                                        lineNumber: 112,
                                                        columnNumber: 19
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/Desktop/project/movie_insighter/src/app/page.tsx",
                                                lineNumber: 97,
                                                columnNumber: 17
                                            }, this),
                                            showIdError && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$project$2f$movie_insighter$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: "mt-1.5 text-xs text-rose-300",
                                                children: [
                                                    "Please enter a valid IMDb ID like ",
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$project$2f$movie_insighter$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "font-mono",
                                                        children: "tt1234567"
                                                    }, void 0, false, {
                                                        fileName: "[project]/Desktop/project/movie_insighter/src/app/page.tsx",
                                                        lineNumber: 131,
                                                        columnNumber: 55
                                                    }, this),
                                                    "."
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/Desktop/project/movie_insighter/src/app/page.tsx",
                                                lineNumber: 130,
                                                columnNumber: 19
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/Desktop/project/movie_insighter/src/app/page.tsx",
                                        lineNumber: 90,
                                        columnNumber: 15
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/Desktop/project/movie_insighter/src/app/page.tsx",
                                    lineNumber: 89,
                                    columnNumber: 13
                                }, this),
                                error && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$project$2f$movie_insighter$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "mt-4 flex items-start gap-2 rounded-2xl border border-rose-500/40 bg-rose-500/10 px-3 py-2.5 text-xs text-rose-50",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$project$2f$movie_insighter$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "mt-0.5 h-1.5 w-1.5 rounded-full bg-rose-300"
                                        }, void 0, false, {
                                            fileName: "[project]/Desktop/project/movie_insighter/src/app/page.tsx",
                                            lineNumber: 139,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$project$2f$movie_insighter$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "leading-relaxed",
                                            children: error
                                        }, void 0, false, {
                                            fileName: "[project]/Desktop/project/movie_insighter/src/app/page.tsx",
                                            lineNumber: 140,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/Desktop/project/movie_insighter/src/app/page.tsx",
                                    lineNumber: 138,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/Desktop/project/movie_insighter/src/app/page.tsx",
                            lineNumber: 83,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/Desktop/project/movie_insighter/src/app/page.tsx",
                        lineNumber: 82,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$project$2f$movie_insighter$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                        className: "flex w-full flex-1 flex-col gap-6",
                        children: [
                            fetchState === "idle" && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$project$2f$movie_insighter$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "mx-auto max-w-xl rounded-3xl border border-dashed border-[#4a2d27] bg-[#1a1416]/80 px-5 py-7 text-center text-sm text-slate-300/85 shadow-inner shadow-black/60 sm:px-6 sm:py-8",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$project$2f$movie_insighter$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "mb-3 font-medium text-slate-100/95",
                                        children: "Ready when you are."
                                    }, void 0, false, {
                                        fileName: "[project]/Desktop/project/movie_insighter/src/app/page.tsx",
                                        lineNumber: 149,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$project$2f$movie_insighter$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        children: "Paste any public IMDb movie ID to see title, cast, release info, and an AI-powered read on how the audience feels about it."
                                    }, void 0, false, {
                                        fileName: "[project]/Desktop/project/movie_insighter/src/app/page.tsx",
                                        lineNumber: 150,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/Desktop/project/movie_insighter/src/app/page.tsx",
                                lineNumber: 148,
                                columnNumber: 13
                            }, this),
                            fetchState === "loading" && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$project$2f$movie_insighter$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "relative w-full rounded-3xl border border-white/10 bg-[#120f11]/80 px-4 py-6 shadow-inner shadow-[#d14836]/15 sm:px-6 sm:py-7",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$project$2f$movie_insighter$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "mb-4 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$project$2f$movie_insighter$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: "text-xs font-semibold uppercase tracking-[0.22em] text-slate-300",
                                                children: "Crunching the numbers"
                                            }, void 0, false, {
                                                fileName: "[project]/Desktop/project/movie_insighter/src/app/page.tsx",
                                                lineNumber: 160,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$project$2f$movie_insighter$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "flex items-center gap-2 text-[11px] text-slate-400",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$project$2f$movie_insighter$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "flex h-5 w-5 items-center justify-center rounded-full border border-[#ff8f6b]/40 bg-[#d14836]/10",
                                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$project$2f$movie_insighter$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            className: "h-2.5 w-2.5 animate-spin rounded-full border border-[#ff8f6b]/40 border-t-transparent"
                                                        }, void 0, false, {
                                                            fileName: "[project]/Desktop/project/movie_insighter/src/app/page.tsx",
                                                            lineNumber: 163,
                                                            columnNumber: 21
                                                        }, this)
                                                    }, void 0, false, {
                                                        fileName: "[project]/Desktop/project/movie_insighter/src/app/page.tsx",
                                                        lineNumber: 162,
                                                        columnNumber: 19
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$project$2f$movie_insighter$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        children: "Fetching metadata, reviews & sentiment"
                                                    }, void 0, false, {
                                                        fileName: "[project]/Desktop/project/movie_insighter/src/app/page.tsx",
                                                        lineNumber: 165,
                                                        columnNumber: 19
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/Desktop/project/movie_insighter/src/app/page.tsx",
                                                lineNumber: 161,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/Desktop/project/movie_insighter/src/app/page.tsx",
                                        lineNumber: 159,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$project$2f$movie_insighter$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "grid gap-4 lg:grid-cols-[minmax(0,1.4fr),minmax(0,1fr)]",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$project$2f$movie_insighter$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "flex flex-col gap-3",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$project$2f$movie_insighter$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "h-20 rounded-2xl bg-linear-to-r from-[#2a1e1d]/70 via-[#1c1414]/70 to-[#2a1e1d]/70",
                                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$project$2f$movie_insighter$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "h-full w-full animate-pulse rounded-2xl bg-linear-to-r from-[#2a1e1d]/80 via-[#1c1414]/80 to-[#2a1e1d]/80"
                                                        }, void 0, false, {
                                                            fileName: "[project]/Desktop/project/movie_insighter/src/app/page.tsx",
                                                            lineNumber: 171,
                                                            columnNumber: 21
                                                        }, this)
                                                    }, void 0, false, {
                                                        fileName: "[project]/Desktop/project/movie_insighter/src/app/page.tsx",
                                                        lineNumber: 170,
                                                        columnNumber: 19
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$project$2f$movie_insighter$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "grid grid-cols-3 gap-2",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$project$2f$movie_insighter$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                className: "h-16 rounded-2xl bg-[#1b1415]/90",
                                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$project$2f$movie_insighter$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                    className: "h-full w-full animate-pulse rounded-2xl bg-[#2a1e1d]/90"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/Desktop/project/movie_insighter/src/app/page.tsx",
                                                                    lineNumber: 175,
                                                                    columnNumber: 23
                                                                }, this)
                                                            }, void 0, false, {
                                                                fileName: "[project]/Desktop/project/movie_insighter/src/app/page.tsx",
                                                                lineNumber: 174,
                                                                columnNumber: 21
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$project$2f$movie_insighter$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                className: "h-16 rounded-2xl bg-[#1b1415]/90",
                                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$project$2f$movie_insighter$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                    className: "h-full w-full animate-pulse rounded-2xl bg-[#2a1e1d]/90"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/Desktop/project/movie_insighter/src/app/page.tsx",
                                                                    lineNumber: 178,
                                                                    columnNumber: 23
                                                                }, this)
                                                            }, void 0, false, {
                                                                fileName: "[project]/Desktop/project/movie_insighter/src/app/page.tsx",
                                                                lineNumber: 177,
                                                                columnNumber: 21
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$project$2f$movie_insighter$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                className: "h-16 rounded-2xl bg-[#1b1415]/90",
                                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$project$2f$movie_insighter$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                    className: "h-full w-full animate-pulse rounded-2xl bg-[#2a1e1d]/90"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/Desktop/project/movie_insighter/src/app/page.tsx",
                                                                    lineNumber: 181,
                                                                    columnNumber: 23
                                                                }, this)
                                                            }, void 0, false, {
                                                                fileName: "[project]/Desktop/project/movie_insighter/src/app/page.tsx",
                                                                lineNumber: 180,
                                                                columnNumber: 21
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/Desktop/project/movie_insighter/src/app/page.tsx",
                                                        lineNumber: 173,
                                                        columnNumber: 19
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/Desktop/project/movie_insighter/src/app/page.tsx",
                                                lineNumber: 169,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$project$2f$movie_insighter$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "flex flex-col gap-3",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$project$2f$movie_insighter$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "h-24 rounded-2xl bg-[#1b1415]/90",
                                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$project$2f$movie_insighter$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "h-full w-full animate-pulse rounded-2xl bg-[#2a1e1d]/95"
                                                        }, void 0, false, {
                                                            fileName: "[project]/Desktop/project/movie_insighter/src/app/page.tsx",
                                                            lineNumber: 187,
                                                            columnNumber: 21
                                                        }, this)
                                                    }, void 0, false, {
                                                        fileName: "[project]/Desktop/project/movie_insighter/src/app/page.tsx",
                                                        lineNumber: 186,
                                                        columnNumber: 19
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$project$2f$movie_insighter$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "h-16 rounded-2xl bg-[#1b1415]/90",
                                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$project$2f$movie_insighter$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "h-full w-full animate-pulse rounded-2xl bg-[#2a1e1d]/90"
                                                        }, void 0, false, {
                                                            fileName: "[project]/Desktop/project/movie_insighter/src/app/page.tsx",
                                                            lineNumber: 190,
                                                            columnNumber: 21
                                                        }, this)
                                                    }, void 0, false, {
                                                        fileName: "[project]/Desktop/project/movie_insighter/src/app/page.tsx",
                                                        lineNumber: 189,
                                                        columnNumber: 19
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/Desktop/project/movie_insighter/src/app/page.tsx",
                                                lineNumber: 185,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/Desktop/project/movie_insighter/src/app/page.tsx",
                                        lineNumber: 168,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/Desktop/project/movie_insighter/src/app/page.tsx",
                                lineNumber: 158,
                                columnNumber: 13
                            }, this),
                            data && fetchState === "done" && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$project$2f$movie_insighter$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "grid w-full gap-6 lg:grid-cols-[minmax(0,1.35fr),minmax(0,1fr)]",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$project$2f$movie_insighter$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("article", {
                                        className: "overflow-hidden rounded-3xl border border-white/10 bg-linear-to-br from-[#171214]/95 via-[#120f11]/95 to-[#171214]/95 shadow-2xl shadow-[#d14836]/20",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$project$2f$movie_insighter$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "flex flex-col gap-4 p-5 sm:p-6",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$project$2f$movie_insighter$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "flex flex-col gap-4 sm:flex-row sm:items-start sm:gap-5",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$project$2f$movie_insighter$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                className: "relative mx-auto h-64 w-44 overflow-hidden rounded-2xl border border-white/10 bg-black/60 shadow-lg shadow-black/60 sm:mx-0 sm:h-48 sm:w-32",
                                                                children: [
                                                                    data.movie.posterUrl ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$project$2f$movie_insighter$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$project$2f$movie_insighter$2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                                                        src: data.movie.posterUrl,
                                                                        alt: data.movie.title,
                                                                        fill: true,
                                                                        sizes: "160px",
                                                                        className: "object-cover object-center transition duration-500 ease-out hover:scale-105"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/Desktop/project/movie_insighter/src/app/page.tsx",
                                                                        lineNumber: 204,
                                                                        columnNumber: 25
                                                                    }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$project$2f$movie_insighter$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                        className: "flex h-full w-full items-center justify-center text-xs text-slate-500",
                                                                        children: "No poster"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/Desktop/project/movie_insighter/src/app/page.tsx",
                                                                        lineNumber: 212,
                                                                        columnNumber: 25
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$project$2f$movie_insighter$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                        className: "pointer-events-none absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/Desktop/project/movie_insighter/src/app/page.tsx",
                                                                        lineNumber: 214,
                                                                        columnNumber: 23
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$project$2f$movie_insighter$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                        className: "absolute left-2 top-2 rounded-full bg-black/70 px-2 py-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-slate-200 shadow",
                                                                        children: "IMDb"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/Desktop/project/movie_insighter/src/app/page.tsx",
                                                                        lineNumber: 215,
                                                                        columnNumber: 23
                                                                    }, this)
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/Desktop/project/movie_insighter/src/app/page.tsx",
                                                                lineNumber: 202,
                                                                columnNumber: 21
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$project$2f$movie_insighter$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                className: "flex-1",
                                                                children: [
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$project$2f$movie_insighter$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                                                        className: "text-center text-lg font-semibold tracking-tight text-slate-50 sm:text-left sm:text-xl",
                                                                        children: data.movie.title
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/Desktop/project/movie_insighter/src/app/page.tsx",
                                                                        lineNumber: 220,
                                                                        columnNumber: 23
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$project$2f$movie_insighter$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                        className: "mt-1 text-sm text-slate-300",
                                                                        children: [
                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$project$2f$movie_insighter$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                                className: "font-medium text-[#ff8f6b]",
                                                                                children: data.movie.year
                                                                            }, void 0, false, {
                                                                                fileName: "[project]/Desktop/project/movie_insighter/src/app/page.tsx",
                                                                                lineNumber: 224,
                                                                                columnNumber: 25
                                                                            }, this),
                                                                            data.movie.rating && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$project$2f$movie_insighter$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$project$2f$movie_insighter$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                                                                                children: [
                                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$project$2f$movie_insighter$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                                        className: "mx-2 text-slate-500",
                                                                                        children: "•"
                                                                                    }, void 0, false, {
                                                                                        fileName: "[project]/Desktop/project/movie_insighter/src/app/page.tsx",
                                                                                        lineNumber: 227,
                                                                                        columnNumber: 29
                                                                                    }, this),
                                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$project$2f$movie_insighter$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                                        className: "inline-flex items-center gap-1",
                                                                                        children: [
                                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$project$2f$movie_insighter$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                                                className: "h-1.5 w-1.5 rounded-full bg-[#ffb08f]"
                                                                                            }, void 0, false, {
                                                                                                fileName: "[project]/Desktop/project/movie_insighter/src/app/page.tsx",
                                                                                                lineNumber: 229,
                                                                                                columnNumber: 31
                                                                                            }, this),
                                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$project$2f$movie_insighter$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                                                className: "font-mono text-[#ffd2be]",
                                                                                                children: [
                                                                                                    data.movie.rating,
                                                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$project$2f$movie_insighter$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                                                        className: "text-xs text-slate-400",
                                                                                                        children: " / 10 IMDb"
                                                                                                    }, void 0, false, {
                                                                                                        fileName: "[project]/Desktop/project/movie_insighter/src/app/page.tsx",
                                                                                                        lineNumber: 232,
                                                                                                        columnNumber: 33
                                                                                                    }, this)
                                                                                                ]
                                                                                            }, void 0, true, {
                                                                                                fileName: "[project]/Desktop/project/movie_insighter/src/app/page.tsx",
                                                                                                lineNumber: 230,
                                                                                                columnNumber: 31
                                                                                            }, this)
                                                                                        ]
                                                                                    }, void 0, true, {
                                                                                        fileName: "[project]/Desktop/project/movie_insighter/src/app/page.tsx",
                                                                                        lineNumber: 228,
                                                                                        columnNumber: 29
                                                                                    }, this)
                                                                                ]
                                                                            }, void 0, true)
                                                                        ]
                                                                    }, void 0, true, {
                                                                        fileName: "[project]/Desktop/project/movie_insighter/src/app/page.tsx",
                                                                        lineNumber: 223,
                                                                        columnNumber: 23
                                                                    }, this),
                                                                    data.movie.plot && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$project$2f$movie_insighter$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                        className: "mt-3 text-sm leading-relaxed text-slate-200/90",
                                                                        children: data.movie.plot
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/Desktop/project/movie_insighter/src/app/page.tsx",
                                                                        lineNumber: 238,
                                                                        columnNumber: 43
                                                                    }, this)
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/Desktop/project/movie_insighter/src/app/page.tsx",
                                                                lineNumber: 219,
                                                                columnNumber: 21
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/Desktop/project/movie_insighter/src/app/page.tsx",
                                                        lineNumber: 201,
                                                        columnNumber: 19
                                                    }, this),
                                                    data.movie.cast.length > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$project$2f$movie_insighter$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "mt-1",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$project$2f$movie_insighter$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                className: "mb-1 text-[11px] font-semibold uppercase tracking-[0.22em] text-slate-400",
                                                                children: "Principal Cast"
                                                            }, void 0, false, {
                                                                fileName: "[project]/Desktop/project/movie_insighter/src/app/page.tsx",
                                                                lineNumber: 244,
                                                                columnNumber: 23
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$project$2f$movie_insighter$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                className: "no-scrollbar flex gap-1.5 overflow-x-auto pb-1",
                                                                children: data.movie.cast.map((actor)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$project$2f$movie_insighter$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                        className: "whitespace-nowrap rounded-full border border-white/10 bg-black/30 px-3 py-1 text-xs text-slate-100 shadow-sm shadow-black/40",
                                                                        children: actor
                                                                    }, actor, false, {
                                                                        fileName: "[project]/Desktop/project/movie_insighter/src/app/page.tsx",
                                                                        lineNumber: 247,
                                                                        columnNumber: 27
                                                                    }, this))
                                                            }, void 0, false, {
                                                                fileName: "[project]/Desktop/project/movie_insighter/src/app/page.tsx",
                                                                lineNumber: 245,
                                                                columnNumber: 23
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/Desktop/project/movie_insighter/src/app/page.tsx",
                                                        lineNumber: 243,
                                                        columnNumber: 21
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/Desktop/project/movie_insighter/src/app/page.tsx",
                                                lineNumber: 200,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$project$2f$movie_insighter$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "border-t border-white/5 bg-[#0f0c0d]/90 px-5 py-4 sm:px-6",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$project$2f$movie_insighter$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                        className: "mb-2 text-[11px] font-semibold uppercase tracking-[0.22em] text-slate-400",
                                                        children: "Audience voices"
                                                    }, void 0, false, {
                                                        fileName: "[project]/Desktop/project/movie_insighter/src/app/page.tsx",
                                                        lineNumber: 260,
                                                        columnNumber: 19
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$project$2f$movie_insighter$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "no-scrollbar flex gap-2 overflow-x-auto pb-1 text-xs text-slate-200/90",
                                                        children: [
                                                            data.reviews.slice(0, 3).map((review, idx)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$project$2f$movie_insighter$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                    className: "min-w-[78%] max-w-xs flex-1 rounded-2xl border border-white/8 bg-black/30 px-3 py-2 shadow-inner shadow-black/50 sm:min-w-[220px]",
                                                                    children: [
                                                                        review.title && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$project$2f$movie_insighter$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                            className: "mb-1.5 text-[11px] font-semibold text-slate-50",
                                                                            children: review.title
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/Desktop/project/movie_insighter/src/app/page.tsx",
                                                                            lineNumber: 267,
                                                                            columnNumber: 42
                                                                        }, this),
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$project$2f$movie_insighter$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                            className: "line-clamp-3 text-[11px] leading-relaxed text-slate-200/90",
                                                                            children: review.text
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/Desktop/project/movie_insighter/src/app/page.tsx",
                                                                            lineNumber: 268,
                                                                            columnNumber: 25
                                                                        }, this),
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$project$2f$movie_insighter$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                            className: "mt-2 flex items-center justify-between text-[10px] text-slate-400",
                                                                            children: [
                                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$project$2f$movie_insighter$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                                    children: review.author ?? "IMDb user"
                                                                                }, void 0, false, {
                                                                                    fileName: "[project]/Desktop/project/movie_insighter/src/app/page.tsx",
                                                                                    lineNumber: 270,
                                                                                    columnNumber: 27
                                                                                }, this),
                                                                                review.rating != null && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$project$2f$movie_insighter$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                                    className: "font-mono text-[#ffd2be]",
                                                                                    children: [
                                                                                        review.rating,
                                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$project$2f$movie_insighter$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                                            className: "text-[9px] text-slate-500",
                                                                                            children: " / 10"
                                                                                        }, void 0, false, {
                                                                                            fileName: "[project]/Desktop/project/movie_insighter/src/app/page.tsx",
                                                                                            lineNumber: 274,
                                                                                            columnNumber: 31
                                                                                        }, this)
                                                                                    ]
                                                                                }, void 0, true, {
                                                                                    fileName: "[project]/Desktop/project/movie_insighter/src/app/page.tsx",
                                                                                    lineNumber: 272,
                                                                                    columnNumber: 29
                                                                                }, this)
                                                                            ]
                                                                        }, void 0, true, {
                                                                            fileName: "[project]/Desktop/project/movie_insighter/src/app/page.tsx",
                                                                            lineNumber: 269,
                                                                            columnNumber: 25
                                                                        }, this)
                                                                    ]
                                                                }, `${review.author ?? "anon"}-${idx}`, true, {
                                                                    fileName: "[project]/Desktop/project/movie_insighter/src/app/page.tsx",
                                                                    lineNumber: 263,
                                                                    columnNumber: 23
                                                                }, this)),
                                                            data.reviews.length > 3 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$project$2f$movie_insighter$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                className: "flex min-w-[120px] items-center justify-center rounded-2xl border border-dashed border-[#4a2d27]/80 bg-black/20 px-3 py-2 text-[11px] text-slate-400",
                                                                children: [
                                                                    "+",
                                                                    data.reviews.length - 3,
                                                                    " more audience reviews analyzed"
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/Desktop/project/movie_insighter/src/app/page.tsx",
                                                                lineNumber: 281,
                                                                columnNumber: 23
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/Desktop/project/movie_insighter/src/app/page.tsx",
                                                        lineNumber: 261,
                                                        columnNumber: 19
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/Desktop/project/movie_insighter/src/app/page.tsx",
                                                lineNumber: 259,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/Desktop/project/movie_insighter/src/app/page.tsx",
                                        lineNumber: 199,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$project$2f$movie_insighter$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("aside", {
                                        className: "flex flex-col gap-4",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$project$2f$movie_insighter$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "relative overflow-hidden rounded-3xl border border-white/12 bg-linear-to-br from-[#161113] via-[#120f11] to-[#161113] p-5 shadow-xl shadow-[#d14836]/25",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$project$2f$movie_insighter$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(209,72,54,0.16),transparent_55%),radial-gradient(circle_at_bottom,rgba(255,143,107,0.16),transparent_55%)]"
                                                    }, void 0, false, {
                                                        fileName: "[project]/Desktop/project/movie_insighter/src/app/page.tsx",
                                                        lineNumber: 291,
                                                        columnNumber: 19
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$project$2f$movie_insighter$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "relative",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$project$2f$movie_insighter$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                className: "mb-3 flex items-center justify-between gap-3",
                                                                children: [
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$project$2f$movie_insighter$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                        className: "text-[11px] font-semibold uppercase tracking-[0.22em] text-slate-300",
                                                                        children: "AI sentiment summary"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/Desktop/project/movie_insighter/src/app/page.tsx",
                                                                        lineNumber: 294,
                                                                        columnNumber: 23
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$project$2f$movie_insighter$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                        className: `inline-flex items-center gap-2 rounded-full border px-2.5 py-1 ${sentimentColor}`,
                                                                        children: [
                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$project$2f$movie_insighter$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                                className: "h-1.5 w-1.5 rounded-full bg-current"
                                                                            }, void 0, false, {
                                                                                fileName: "[project]/Desktop/project/movie_insighter/src/app/page.tsx",
                                                                                lineNumber: 296,
                                                                                columnNumber: 25
                                                                            }, this),
                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$project$2f$movie_insighter$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                                className: "text-[10px] font-semibold uppercase tracking-[0.2em]",
                                                                                children: data.sentiment.overall
                                                                            }, void 0, false, {
                                                                                fileName: "[project]/Desktop/project/movie_insighter/src/app/page.tsx",
                                                                                lineNumber: 297,
                                                                                columnNumber: 25
                                                                            }, this)
                                                                        ]
                                                                    }, void 0, true, {
                                                                        fileName: "[project]/Desktop/project/movie_insighter/src/app/page.tsx",
                                                                        lineNumber: 295,
                                                                        columnNumber: 23
                                                                    }, this)
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/Desktop/project/movie_insighter/src/app/page.tsx",
                                                                lineNumber: 293,
                                                                columnNumber: 21
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$project$2f$movie_insighter$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                className: "text-sm leading-relaxed text-slate-100/95",
                                                                children: data.sentiment.summary
                                                            }, void 0, false, {
                                                                fileName: "[project]/Desktop/project/movie_insighter/src/app/page.tsx",
                                                                lineNumber: 300,
                                                                columnNumber: 21
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$project$2f$movie_insighter$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                className: "mt-3 text-[11px] text-slate-400",
                                                                children: [
                                                                    "Generated from ",
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$project$2f$movie_insighter$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                        className: "font-semibold text-slate-100",
                                                                        children: [
                                                                            data.reviews.length,
                                                                            " audience reviews"
                                                                        ]
                                                                    }, void 0, true, {
                                                                        fileName: "[project]/Desktop/project/movie_insighter/src/app/page.tsx",
                                                                        lineNumber: 302,
                                                                        columnNumber: 38
                                                                    }, this),
                                                                    ". AI may occasionally misread sarcasm or very short comments."
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/Desktop/project/movie_insighter/src/app/page.tsx",
                                                                lineNumber: 301,
                                                                columnNumber: 21
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/Desktop/project/movie_insighter/src/app/page.tsx",
                                                        lineNumber: 292,
                                                        columnNumber: 19
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/Desktop/project/movie_insighter/src/app/page.tsx",
                                                lineNumber: 290,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$project$2f$movie_insighter$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "rounded-3xl border border-[#3b2723] bg-[#120f11]/80 p-4 text-[11px] text-slate-400 shadow-inner shadow-black/70",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$project$2f$movie_insighter$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                        className: "mb-1 font-semibold text-slate-200",
                                                        children: "How it works"
                                                    }, void 0, false, {
                                                        fileName: "[project]/Desktop/project/movie_insighter/src/app/page.tsx",
                                                        lineNumber: 309,
                                                        columnNumber: 19
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$project$2f$movie_insighter$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                        className: "mb-2",
                                                        children: "We combine public metadata from the OMDb API with a snapshot of recent user reviews from IMDb, then ask an AI model to summarize how people feel about the movie overall."
                                                    }, void 0, false, {
                                                        fileName: "[project]/Desktop/project/movie_insighter/src/app/page.tsx",
                                                        lineNumber: 310,
                                                        columnNumber: 19
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$project$2f$movie_insighter$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                        children: "This tool is for educational and discovery purposes only. Always verify important decisions with the original sources."
                                                    }, void 0, false, {
                                                        fileName: "[project]/Desktop/project/movie_insighter/src/app/page.tsx",
                                                        lineNumber: 314,
                                                        columnNumber: 19
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/Desktop/project/movie_insighter/src/app/page.tsx",
                                                lineNumber: 308,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/Desktop/project/movie_insighter/src/app/page.tsx",
                                        lineNumber: 289,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/Desktop/project/movie_insighter/src/app/page.tsx",
                                lineNumber: 198,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/Desktop/project/movie_insighter/src/app/page.tsx",
                        lineNumber: 146,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/Desktop/project/movie_insighter/src/app/page.tsx",
                lineNumber: 67,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/Desktop/project/movie_insighter/src/app/page.tsx",
        lineNumber: 61,
        columnNumber: 5
    }, this);
}
_s(Home, "NbTWt5d9CCaxs7FtRSCSGXgodKE=");
_c = Home;
var _c;
__turbopack_context__.k.register(_c, "Home");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
]);

//# sourceMappingURL=Desktop_project_movie_insighter_src_app_page_tsx_88bcdbe5._.js.map