/** Hand-drawn arrow pointing down to the application form; also defines the #brush filter. */
export function BrushArrow() {
  return (
    <svg viewBox="0 0 80 120" width="66" height="99" fill="none" aria-hidden="true">
      <defs>
        <filter id="brush" x="-20%" y="-20%" width="140%" height="140%">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.9"
            numOctaves="2"
            seed="4"
            result="n"
          />
          <feDisplacementMap in="SourceGraphic" in2="n" scale="6" />
        </filter>
      </defs>
      <g filter="url(#brush)" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round">
        <path d="M41 8c-1.5 18 1.5 34-.5 52s1 26 0 40" strokeWidth="13" />
        <path d="M14 70c9 9 18 19 27 30 8-11 16-20 25-30" strokeWidth="13" />
        <path d="M43 14c-.5 14 .5 30-.8 46" strokeWidth="3" opacity=".55" />
      </g>
    </svg>
  );
}

/** Double brush stroke under a word (uses the #brush filter defined by BrushArrow). */
export function BrushUnderline({ children }: { children: React.ReactNode }) {
  return (
    <span className="relative inline-block">
      {children}
      <svg
        viewBox="0 0 200 24"
        preserveAspectRatio="none"
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-[0.4em] left-[-3%] h-[0.5em] w-[106%] overflow-visible text-sg"
        fill="none"
      >
        <g filter="url(#brush)" stroke="currentColor" strokeLinecap="round">
          <path d="M4 6c40-3 90-4 192-1" strokeWidth="7" />
          <path d="M10 18c45-3 100-3 182 0" strokeWidth="7" />
        </g>
      </svg>
    </span>
  );
}
