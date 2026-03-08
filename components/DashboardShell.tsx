"use client";

import { useState } from "react";
import SubjectSidebar from "@/components/SubjectSidebar";

export default function DashboardShell({
  children,
}: {
  children: React.ReactNode;
}) {
  const [open, setOpen] = useState(true);

  return (
    <div className="fixed inset-0 flex flex-col bg-[#27e4d7] border-t-4 border-black lg:flex-row lg:items-stretch">
      <SubjectSidebar open={open} onClose={() => setOpen(false)} />
      <main className="flex-1 min-w-0 overflow-y-auto">
        {!open && (
          <button
            type="button"
            onClick={() => setOpen(true)}
            className="flex items-center gap-2  px-4 py-2 text-sm font-bold text-black"
            aria-label="Open menu"
          >
            <span aria-hidden>☰</span>
            {/* <span>Menu</span> */}
          </button>
        )}
        {children}
      </main>
    </div>
  );
}
