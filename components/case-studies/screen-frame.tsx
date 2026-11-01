"use client";

import { useEffect, useRef, useState } from "react";

export const SCREEN_WIDTH = 1100;
export const SCREEN_HEIGHT = 680;

/** Renders a fixed 1100×680 app mock-up scaled down to the available width. */
export function ScreenFrame({ label, children }: { label: string; children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(0.5);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new ResizeObserver(([entry]) =>
      setScale(entry.contentRect.width / SCREEN_WIDTH),
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      role="img"
      aria-label={label}
      className="relative w-full overflow-hidden bg-white"
      style={{ aspectRatio: `${SCREEN_WIDTH} / ${SCREEN_HEIGHT}` }}
    >
      <div
        aria-hidden="true"
        className="absolute top-0 left-0 origin-top-left"
        style={{ width: SCREEN_WIDTH, height: SCREEN_HEIGHT, transform: `scale(${scale})` }}
      >
        {children}
      </div>
    </div>
  );
}
