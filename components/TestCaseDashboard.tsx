"use client";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useState } from "react";

const CASE_STUDIES = [
  {
    id: 1,
    title: "Course Recommendation Puzzle",
    description:
      'You are building an AI assistant for Coursefy. A student says: "I know a bit of Python and design, and I only have 5 hours this week. Which course should I start with?" You have access only to the course titles and estimated durations shown on the homepage.',
    hints: [
      "Think about how you would rank courses by relevance.",
      "Consider simple rules before complex algorithms.",
      "Explain how you would communicate trade‑offs to the student.",
    ],
  },
  {
    id: 2,
    title: "Onboarding Drop-off",
    description:
      "40% of new users leave before completing the first lesson. Analytics show a spike of exits on the Welcome screen and the first quiz. Diagnose possible reasons and propose at least two experiments to improve completion of the first lesson.",
    hints: [
      "Consider expectations and time to value.",
      "Think about clarity of next actions.",
      "What would you instrument (events, funnels)?",
    ],
  },
  {
    id: 3,
    title: "Feature Prioritization You have three feature requests You have three feature requests ",
    description:
      "You have three feature requests: dark mode, offline progress sync, and a community forum. Engineering can only ship one this quarter. How do you decide, and how do you communicate the decision to users who asked for the others?",
    hints: [
      "Define criteria (impact, effort, strategic fit).",
      "Consider how to say no clearly.",
      "Think about feedback loops for future prioritization.",
    ],
  },
];

export default function TestCaseDashboard() {
  const [showReview, setShowReview] = useState(false);
  const [caseIndex, setCaseIndex] = useState(0);

  const handleShowReview = () => {
    setShowReview(true);
  };

  const caseStudy = CASE_STUDIES[caseIndex];
  const canGoPrev = caseIndex > 0;
  const canGoNext = caseIndex < CASE_STUDIES.length - 1;

  return (
    <section className="py-16">
      <div className="mx-auto max-w-6xl px-4">
        <div className="mb-8 flex items-center justify-between gap-4">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-black">
              START NOW
            </p>
            <h2 className="mt-2 text-3xl font-extrabold text-black">
              Practice Interview Scenarios
            </h2>
            <p className="mt-2 max-w-xl text-sm leading-relaxed text-black/80">
              Read the case on the right, write your answer on the left, and
              then run a quick self‑check with our hints and solution notes.
            </p>
          </div>
        </div>

        <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)]">
          {/* Left: answer editor */}
          <div className="relative">
            <div className="absolute left-2 top-2 h-full w-full bg-black" />
            <div className="relative border-2 border-black bg-[#ffc928] p-5">
              <h3 className="mb-3 text-lg font-semibold text-black">
                Your Answer
              </h3>
              <label className="mb-2 block text-xs font-semibold uppercase tracking-[0.15em] text-black/70">
                Draft your solution
              </label>
              <textarea
                rows={8}
                className="mb-4 w-full border-2 border-black bg-white px-3 py-2 text-sm outline-none focus:bg-[#fff7d6]"
                placeholder="Write how you would approach this case..."
              />

              <div className="flex flex-wrap items-center gap-3">
                  {/* <input
                    type="text"
                    className="h-10 flex-1 min-w-[160px] border-2 border-black bg-white px-3 text-sm outline-none focus:bg-[#fff7d6]"
                    placeholder="Optional: key metric / final value"
                  /> */}
                <button
                  type="button"
                  onClick={handleShowReview}
                  className="inline-flex items-center justify-center border-2 border-black bg-[#29e3dd] px-6 py-2 text-sm font-semibold text-black shadow-[4px_4px_0_#000] transition hover:translate-y-0.5 hover:shadow-[2px_2px_0_#000]"
                >
                  Run Test
                </button>
              </div>
            </div>
          </div>

          {/* Right: case description + hints */}
          <div className="border-2 border-black bg-white p-5 shadow-[6px_6px_0_#000]">
          <div className="flex shrink-0 gap-1 mb-2">
                <button
                  type="button"
                  onClick={() => setCaseIndex((i) => Math.max(0, i - 1))}
                  disabled={!canGoPrev}
                  className="rounded   text-black transition hover:bg-[#ffe066] disabled:cursor-not-allowed disabled:opacity-50"
                  aria-label="Previous case"
                >
                  <ChevronLeft size={20} />
                </button>
                <span className="min-w-[4rem] text-center text-sm font-semibold text-black">
                  {caseIndex + 1} / {CASE_STUDIES.length}
                </span>
                <button
                  type="button"
                  onClick={() =>
                    setCaseIndex((i) =>
                      Math.min(CASE_STUDIES.length - 1, i + 1)
                    )
                  }
                  disabled={!canGoNext}
                  className="rounded  text-black transition  disabled:cursor-not-allowed disabled:opacity-50"
                  aria-label="Next case"
                >
                  <ChevronRight size={20} />
                </button>
              </div>
            <div className="mb-3 flex items-center justify-between gap-2">
              <h3 className="text-lg font-semibold text-black">
                Case {String(caseStudy.id).padStart(2, "0")} – {caseStudy.title}
              </h3>
             
            </div>
            <p className="mt-3 text-sm leading-relaxed text-black/85">
              {caseStudy.description}
            </p>

            <div className="mt-4 rounded-md border border-dashed border-black bg-[#fffbe6] p-3 text-sm">
              <p className="font-semibold text-black">Hints</p>
              <ul className="mt-1 list-disc pl-5 text-black/85">
                {caseStudy.hints.map((hint, i) => (
                  <li key={i}>{hint}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom evaluation strip */}
        {showReview && (
        <div className="mt-10 border-2 border-black bg-white px-6 py-5 shadow-[6px_6px_0_#000]">
          <div className="mb-3 flex items-center gap-2 text-black">
            <span className="flex gap-1">
              8/10
            </span>
            <span className="text-xs font-semibold uppercase tracking-[0.2em]">
              Review
            </span>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            <div>
              <h4 className="text-sm font-semibold text-black">
                Actual Answer
              </h4>
              <p className="mt-1 text-sm leading-relaxed text-black/80">
                This area can describe a strong reference solution or outline
                the key steps an ideal answer would include.
              </p>
            </div>

            <div>
              <h4 className="text-sm font-semibold text-black">
                Shortcomings
              </h4>
              <p className="mt-1 text-sm leading-relaxed text-black/80">
                Use this space to note what was missing from your attempt, such
                as edge cases, unclear communication, or missing constraints.
              </p>
            </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

