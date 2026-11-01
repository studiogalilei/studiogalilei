"use client";

/**
 * Links inside go to the booking calendar further down the page instead of navigating away
 * (they keep pointing at /contatti if the calendar isn't there).
 */
export function ScrollToBooking({ children }: { children: React.ReactNode }) {
  return (
    <span
      className="contents"
      onClickCapture={(e) => {
        const target = document.getElementById("sg-prenota");
        if (!target || !(e.target as Element).closest("a")) return;
        e.preventDefault();
        e.stopPropagation();
        const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
        target.scrollIntoView({ behavior: reduce ? "auto" : "smooth", block: "start" });
      }}
    >
      {children}
    </span>
  );
}
