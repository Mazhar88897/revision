"use client";
import { MessageSquare, Layers } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import Flashcard, { type FlashcardItem } from "./Flashcard";

type TabId = "flashcard" | "revision";

interface ChatMessage {
  role: "user" | "assistant";
  content: string;
}

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
    title: "Feature Prioritization",
    description:
      "You have three feature requests: dark mode, offline progress sync, and a community forum. Engineering can only ship one this quarter. How do you decide, and how do you communicate the decision to users who asked for the others?",
    hints: [
      "Define criteria (impact, effort, strategic fit).",
      "Consider how to say no clearly.",
      "Think about feedback loops for future prioritization.",
    ],
  },
];

const FLASHCARD_ITEMS: FlashcardItem[] = CASE_STUDIES.map((c) => ({
  id: c.id,
  front: c.title,
  back: [c.description, "", "Hints:", ...c.hints.map((h) => `• ${h}`)].join("\n"),
}));

export default function TestCaseDashboard() {
  const [activeTab, setActiveTab] = useState<TabId>("flashcard");
  const [revisionInput, setRevisionInput] = useState("");
  const [revisionMessages, setRevisionMessages] = useState<ChatMessage[]>([]);
  const [isRevisionLoading, setIsRevisionLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [revisionMessages, isRevisionLoading]);

  const handleRevisionSubmit = async () => {
    const trimmed = revisionInput.trim();
    if (!trimmed) return;
    setRevisionMessages((prev) => [...prev, { role: "user", content: trimmed }]);
    setRevisionInput("");
    setIsRevisionLoading(true);
    // TODO: Replace with your API call (e.g. OpenAI, custom backend)
    await new Promise((r) => setTimeout(r, 600));
    const mockResponse =
      "This is a placeholder response. Connect your assistant API (e.g. OpenAI) in handleRevisionSubmit to get real answers based on your course or revision content.";
    setRevisionMessages((prev) => [
      ...prev,
      { role: "assistant", content: mockResponse },
    ]);
    setIsRevisionLoading(false);
  };

  return (
    <section className="relative overflow-hidden py-6">
      <div className="relative mx-auto w-full max-w-7xl px-4">
        <div className="mb-8 flex items-center justify-between gap-4">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-black">
              START NOW
            </p>
            <h2 className="mt-2 text-3xl font-extrabold text-black">
              Practice Interview Scenarios
            </h2>
            <p className="mt-2 max-w-xl text-sm leading-relaxed text-black/80">
              {activeTab === "flashcard"
                ? "Read the case on the right, write your answer on the left"
                : "Ask anything about your revision. Type below and get guidance in the same dashboard."}
            </p>
          </div>
        </div>

        {/* Tabs */}
        <div className="mb-6 flex gap-1 ">
          <button
            type="button"
            onClick={() => setActiveTab("flashcard")}
            className={`inline-flex items-center gap-2  px-5 py-2.5 text-sm font-semibold transition ${
              activeTab === "flashcard"
                ? "bg-[#ffc928] text-black  border-b-2 border-black"
                : " text-black"
            }`}
          >
            <Layers size={18} />
            Flashcard
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("revision")}
            className={`inline-flex items-center gap-2  px-5 py-2.5 text-sm font-semibold transition ${
              activeTab === "revision"
                ? "bg-[#ffc928] text-black  border-b-2 border-black"
                : " text-black"
            }`}
          >
            <MessageSquare size={18} />
            Revision
          </button>
        </div>

        {activeTab === "flashcard" && (
          <div className="w-full py-4">
            <Flashcard cards={FLASHCARD_ITEMS} />
          </div>
        )}

        {/* Revision tab: assistant guide */}
        {activeTab === "revision" && (
          <div className="border-2 border-black bg-white shadow-[6px_6px_0_#000]">
            <div className="border-b-2 border-black bg-[#fffbe6] px-5 py-3">
              <h3 className="text-lg font-semibold text-black">
                Revision Assistant
              </h3>
              <p className="mt-1 text-sm text-black/80">
                Type your question or topic below and get guidance here.
              </p>
            </div>

            {/* Message list */}
            <div className="min-h-[280px] max-h-[400px] overflow-y-auto p-5 space-y-4">
              {revisionMessages.length === 0 && (
                <p className="text-sm text-black/60 italic">
                  No messages yet. Ask something to get started.
                </p>
              )}
              {revisionMessages.map((msg, i) => (
                <div
                  key={i}
                  className={`rounded-lg border-2 border-black p-3 ${
                    msg.role === "user"
                      ? "ml-4 bg-[#ffc928]"
                      : "mr-4 bg-[#29e3dd]/30"
                  }`}
                >
                  <span className="text-xs font-semibold uppercase tracking-wider text-black/70">
                    {msg.role === "user" ? "You" : "Assistant"}
                  </span>
                  <p className="mt-1 text-sm leading-relaxed text-black/90 whitespace-pre-wrap">
                    {msg.content}
                  </p>
                </div>
              ))}
              {isRevisionLoading && (
                <div className="rounded-lg border-2 border-black border-dashed p-3 mr-4 bg-[#29e3dd]/20">
                  <span className="text-xs font-semibold uppercase tracking-wider text-black/70">
                    Assistant
                  </span>
                  <p className="mt-1 text-sm text-black/70">Thinking...</p>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input area */}
            <div className="border-t-2 border-black p-4 bg-[#f8fafc]">
              <div className="flex gap-2">
                <textarea
                  value={revisionInput}
                  onChange={(e) => setRevisionInput(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && !e.shiftKey) {
                      e.preventDefault();
                      handleRevisionSubmit();
                    }
                  }}
                  rows={2}
                  placeholder="Ask about a topic, concept, or problem..."
                  className="flex-1 min-h-[80px] resize-y border-2 border-black bg-white px-3 py-2 text-sm outline-none focus:bg-[#fff7d6] focus:ring-2 focus:ring-[#ffc928]"
                  disabled={isRevisionLoading}
                />
                <button
                  type="button"
                  onClick={handleRevisionSubmit}
                  disabled={!revisionInput.trim() || isRevisionLoading}
                  className="self-end inline-flex items-center justify-center border-2 border-black bg-[#29e3dd] px-5 py-2 text-sm font-semibold text-black shadow-[4px_4px_0_#000] transition hover:translate-y-0.5 hover:shadow-[2px_2px_0_#000] disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-y-0 disabled:hover:shadow-[4px_4px_0_#000]"
                >
                  Send
                </button>
              </div>
              <p className="mt-2 text-xs text-black/60">
                Press Enter to send, Shift+Enter for new line.
              </p>
            </div>
          </div>
        )}

      </div>
    </section>
  );
}

