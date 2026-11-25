"use client";

import { useEffect, useState } from "react";
import { ButtonLink } from "@/components/ui/button";

/*
 * The side guide of a guided page: the stops of the page in order, the one being read lit up,
 * and the call button always in view. Desktop only; on a phone the page carries its own
 * invitations to book.
 */

export type GuideStop = { id: string; label: string };

export function GuideNav({ stops }: { stops: GuideStop[] }) {
  const [active, setActive] = useState(stops[0]?.id);

  useEffect(() => {
    // the stop being read: the last one whose start has passed a line a third down the screen
    let frame = 0;
    const update = () => {
      frame = 0;
      const line = window.innerHeight / 3;
      let current = stops[0]?.id;
      for (const stop of stops) {
        const el = document.getElementById(stop.id);
        if (el && el.getBoundingClientRect().top <= line) current = stop.id;
      }
      setActive(current);
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (frame) cancelAnimationFrame(frame);
    };
  }, [stops]);

  return (
    <nav aria-label="In questa pagina" className="sticky top-28">
      <p className="text-13 font-medium text-sand-ink">In questa pagina</p>
      <ol className="mt-4 space-y-1">
        {stops.map((stop, i) => {
          const on = stop.id === active;
          return (
            <li key={stop.id}>
              <a
                href={`#${stop.id}`}
                aria-current={on ? "location" : undefined}
                className={`flex items-center gap-3 rounded-10 px-3 py-2 text-15 transition-colors ${
                  on ? "bg-sand font-semibold text-sg" : "text-ink/60 hover:text-sg"
                }`}
              >
                <span
                  aria-hidden="true"
                  className={`grid size-6 flex-none place-items-center rounded-full text-12 font-semibold ${
                    on ? "bg-sg text-white" : "bg-mist text-ink/60"
                  }`}
                >
                  {i + 1}
                </span>
                {stop.label}
              </a>
            </li>
          );
        })}
      </ol>
      <div className="mt-6 rounded-14 bg-white p-5 shadow-surface-1">
        <p className="text-15 leading-1.65 font-medium text-sg">
          45 minuti per capire da dove partire nella tua azienda.
        </p>
        <ButtonLink
          href="/#sg-prenota"
          className="mt-4 w-full justify-center px-4 whitespace-nowrap"
        >
          Prenota una chiamata
        </ButtonLink>
      </div>
    </nav>
  );
}
