"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import { useState } from "react";

export interface FlashcardItem {
  id: number | string;
  front: string;
  back: string;
}

interface FlashcardProps {
  cards: FlashcardItem[];
  className?: string;
}

export default function Flashcard({ cards, className = "" }: FlashcardProps) {
  const [index, setIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);

  if (cards.length === 0) {
    return (
      <div className={`rounded-lg border-2 border-black bg-[#fffbe6] p-8 text-center ${className}`}>
        <p className="text-sm text-black/70">No cards yet.</p>
      </div>
    );
  }

  const card = cards[index];
  const canGoPrev = index > 0;
  const canGoNext = index < cards.length - 1;

  const goPrev = () => {
    setIndex((i) => Math.max(0, i - 1));
    setIsFlipped(false);
  };

  const goNext = () => {
    setIndex((i) => Math.min(cards.length - 1, i + 1));
    setIsFlipped(false);
  };

  return (
    <div className={`flex w-full max-w-7xl flex-col gap-6 ${className}`}>
      {/* Card counter + nav */}
      <div className="flex w-full items-center justify-between">
        <button
          type="button"
          onClick={goPrev}
          disabled={!canGoPrev}
          className="rounded border-2 border-black bg-white p-2 text-black transition hover:bg-[#ffc928] disabled:cursor-not-allowed disabled:opacity-50"
          aria-label="Previous card"
        >
          <ChevronLeft size={24} />
        </button>
        <span className="text-sm font-semibold text-black">
          {index + 1} / {cards.length}
        </span>
        <button
          type="button"
          onClick={goNext}
          disabled={!canGoNext}
          className="rounded border-2 border-black bg-white p-2 text-black transition hover:bg-[#ffc928] disabled:cursor-not-allowed disabled:opacity-50"
          aria-label="Next card"
        >
          <ChevronRight size={24} />
        </button>
      </div>

      {/* Flip card - overflow-hidden to prevent content spilling onto header/tabs */}
      <div
        className="perspective-[1000px] w-full overflow-hidden"
        style={{ minHeight: "360px" }}
      >
        <button
          type="button"
          onClick={() => setIsFlipped((f) => !f)}
          className="relative h-full w-full cursor-pointer text-left"
          style={{ minHeight: "360px" }}
        >
          <div
            className={`relative h-full w-full transition-transform duration-500 [transform-style:preserve-3d] ${
              isFlipped ? "[transform:rotateY(180deg)]" : ""
            }`}
            style={{ minHeight: "360px" }}
          >
            {/* Front */}
            <div
              className="absolute inset-0 flex flex-col rounded-lg border-2 border-black bg-[#ffc928] p-6  [backface-visibility:hidden]"
              style={{ minHeight: "360px" }}
            >
              <p className="text-xs font-semibold uppercase tracking-wider text-black/60">
                Question
              </p>
              <p className="mt-2 text-lg font-semibold leading-snug text-black line-clamp-5">
                {card.front}
              </p>
              <p className="mt-auto pt-4 text-xs text-black/70">Click to flip</p>
            </div>

            {/* Back - scrollable so long content doesn't overflow */}
            <div
              className="absolute inset-0 flex flex-col overflow-hidden rounded-lg border-2 border-black bg-[#29e3dd]/90 p-6  [backface-visibility:hidden] [transform:rotateY(180deg)]"
              style={{ minHeight: "360px" }}
            >
              <p className="shrink-0 text-xs font-semibold uppercase tracking-wider text-black/60">
                Answer
              </p>
              <div className="mt-2 min-h-0 w-full flex-1 overflow-y-auto overflow-x-hidden">
                <p className="w-full text-base leading-relaxed text-black break-words whitespace-pre-wrap">
                  {card.back}
                </p>
              </div>
              <p className="mt-2 shrink-0 text-xs text-black/70">Click to flip back</p>
            </div>
          </div>
        </button>
      </div>
    </div>
  );
}
