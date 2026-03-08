"use client";

import { useState } from "react";

const SUBJECTS = [
  "Course Recommendation",
  "System Design Basics",
  "Arrays & Strings",
  "Algorithms & Complexity",
  "User Onboarding",
  "A/B Testing",
  "Metrics & Analytics",
  "API Design",
  "Data Modeling",
  "Product Strategy 2",
  "Course Recommendation 2",
  "System Design Basics 2",
  "Arrays & Strings",
  "Algorithms & Complexity 2",
  "User Onboarding 2",
  "A/B Testing 2",
  "Metrics & Analytics 2",
  "API Design 2",
  "Data Modeling 2",
  "Product Strategy 2",
];

type SubjectSidebarProps = {
  open: boolean;
  onClose: () => void;
};

export default function SubjectSidebar({ open, onClose }: SubjectSidebarProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedSubject, setSelectedSubject] = useState<string | null>(
    "Course Recommendation"
  );

  const filteredSubjects = SUBJECTS.filter((s) =>
    s.toLowerCase().includes(searchQuery.toLowerCase().trim())
  );

  if (!open) return null;

  return (
    <>
      {/* Backdrop on mobile: tap to close */}
      <button
        type="button"
        onClick={onClose}
        className="fixed inset-0 z-40 bg-black/40 lg:hidden"
        aria-label="Close menu"
      />
      <aside className="fixed inset-y-0 left-0 z-50 flex w-[min(20rem,85vw)] shrink-0 flex-col border-r-2 border-black bg-[#ffc928] lg:static lg:z-auto lg:h-full lg:w-64">
        <div className="flex items-center justify-between border-b-2 border-black p-4">
          <h2 className="text-sm font-bold uppercase tracking-[0.15em] text-black">
            Subjects
          </h2>
          <button
            type="button"
            onClick={onClose}
            className="rounded  m-1.5 text-black "
            aria-label="Close menu"
          >
            ×
          </button>
        </div>
        <div className="flex-1 overflow-y-auto p-4">
          <div className="mb-4">
            <input
              type="search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search subjects..."
              className="w-full border-2 border-black bg-white px-3 py-2 text-sm outline-none placeholder:text-black/50 focus:bg-[#fff7d6] focus:ring-2 focus:ring-black focus:ring-offset-2 focus:ring-offset-[#ffc928]"
              aria-label="Search subjects"
            />
          </div>
          <ul className="space-y-1 pr-1">
            {filteredSubjects.length === 0 ? (
              <li className="py-2 text-sm text-black/70">No subjects match.</li>
            ) : (
              filteredSubjects.map((subject) => (
                <li key={subject}>
                  <button
                    type="button"
                    onClick={() => setSelectedSubject(subject)}
                    className={`w-full rounded-md border-2 border-black px-3 py-2 text-left text-sm font-semibold transition shadow-[2px_2px_0_#000] hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-none ${
                      selectedSubject === subject
                        ? "bg-[#27e4d7] text-black"
                        : "bg-white text-black hover:bg-[#fff7d6]"
                    }`}
                  >
                    {subject}
                  </button>
                </li>
              ))
            )}
          </ul>
        </div>
      </aside>
    </>
  );
}
