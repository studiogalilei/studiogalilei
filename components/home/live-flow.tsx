"use client";

import { useEffect, useRef, useState } from "react";
import { useLocale } from "next-intl";
import { Check, FileText, Mail, MessageSquare, Search, UserRound } from "@/components/icons";
import { cn } from "@/lib/cn";
import { flowCopy } from "@/lib/home/live-flow";

/*
 * A living management system at work, in the hero: a request arrives, the system reads it,
 * prepares the work, a person approves and the rest goes out by itself. It plays one story
 * per kind of business, pauses off screen, and shows the finished state to anyone who asked
 * for reduced motion.
 */

/** how long each step stays on screen, in ms */
const DURATION = [1900, 2600, 2300, 2400, 3800];
/** the moment the approve button gets "pressed", in ms from the start of that step */
const PRESS_AT = 1300;
const ICONS = [Mail, Search, FileText, UserRound, MessageSquare];

export function LiveFlow() {
  const copy = flowCopy(useLocale());
  const [story, setStory] = useState(0);
  const [step, setStep] = useState(0);
  const [pressed, setPressed] = useState(false);
  const [visible, setVisible] = useState(true);
  const [still, setStill] = useState(false);
  const root = useRef<HTMLDivElement>(null);

  // reduced motion: no autoplay, every story shown finished
  useEffect(() => {
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => setStill(query.matches);
    sync();
    query.addEventListener("change", sync);
    return () => query.removeEventListener("change", sync);
  }, []);

  // pause while the hero is scrolled away
  useEffect(() => {
    const el = root.current;
    if (!el) return;
    const observer = new IntersectionObserver(([entry]) => setVisible(entry.isIntersecting), {
      threshold: 0.15,
    });
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (still || !visible) return;
    const timers: number[] = [];
    if (step === 3) timers.push(window.setTimeout(() => setPressed(true), PRESS_AT));
    timers.push(
      window.setTimeout(() => {
        if (step < 4) {
          setStep(step + 1);
        } else {
          setStory((story + 1) % copy.stories.length);
          setStep(0);
          setPressed(false);
        }
      }, DURATION[step]),
    );
    return () => timers.forEach((t) => window.clearTimeout(t));
  }, [step, story, still, visible, copy.stories.length]);

  const s = copy.stories[story];
  const current = still ? 4 : step;
  const approved = still || pressed || current > 3;
  const titles = copy.steps(s.approver);
  const status = copy.status(s.approver);

  const pick = (i: number) => {
    setStory(i);
    setStep(still ? 4 : 0);
    setPressed(false);
  };

  return (
    <div
      ref={root}
      className="w-full overflow-hidden rounded-18 bg-white text-ink shadow-[0_30px_80px_-20px_rgba(2,8,40,0.6)] ring-1 ring-white/10"
    >
      <p className="sr-only">{copy.description}</p>
      {/* window bar, with what the system is doing right now */}
      <div
        aria-hidden="true"
        className="flex items-center gap-3 border-b border-line bg-mist px-4 py-3"
      >
        <span className="flex gap-1.5">
          <span className="size-2.5 rounded-full bg-[#E3E6EE]" />
          <span className="size-2.5 rounded-full bg-[#E3E6EE]" />
          <span className="size-2.5 rounded-full bg-[#E3E6EE]" />
        </span>
        <span className="hidden text-12.5 font-semibold text-sg sm:inline">{copy.label}</span>
        <span className="ml-auto flex items-center gap-2 text-12 text-ink/55">
          <span className="relative flex size-2">
            {!still && current < 4 && (
              <span className="absolute inset-0 animate-live-ping rounded-full bg-ai" />
            )}
            <span
              className={cn("relative size-2 rounded-full", current === 4 ? "bg-sw" : "bg-ai")}
            />
          </span>
          <span key={`${story}-${current}`} className="animate-fade-up-fast whitespace-nowrap">
            {status[current]}
          </span>
        </span>
      </div>
      <div className="flex [scrollbar-width:none] gap-1.5 overflow-x-auto border-b border-line px-3 py-2">
        {copy.stories.map((st, i) => (
          <button
            key={st.tab}
            type="button"
            aria-pressed={i === story}
            onClick={() => pick(i)}
            className={cn(
              "flex-none rounded-[8px] px-3 py-1.5 text-12.5 font-medium whitespace-nowrap transition-colors",
              i === story ? "bg-sg text-white" : "text-ink/60 hover:bg-pale hover:text-sg",
            )}
          >
            {st.tab}
          </button>
        ))}
      </div>
      <div aria-hidden="true" className="px-3 pt-3 pb-3 sm:px-4">
        <ol className="flex h-[25.5rem] flex-col gap-1 sm:h-[24rem]">
          {titles.map((title, i) => {
            const Icon = ICONS[i];
            const done = i < current;
            const active = i === current;
            return (
              <li
                key={title}
                className={cn(
                  "rounded-[12px] px-2.5 py-2 transition-colors duration-300",
                  active && "bg-mist",
                )}
              >
                <div className="flex items-center gap-3">
                  <span
                    className={cn(
                      "relative grid size-7 flex-none place-items-center rounded-full transition-colors duration-300",
                      done && "bg-sg text-white",
                      active && "bg-ai text-white",
                      !done && !active && "bg-pale text-ink/35",
                    )}
                  >
                    {active && !still && i < 4 && (
                      <span className="absolute inset-0 animate-live-ping rounded-full bg-ai" />
                    )}
                    {done ? (
                      <Check size={14} strokeWidth={3} className="relative" />
                    ) : (
                      <Icon size={14} strokeWidth={2.2} className="relative" />
                    )}
                  </span>
                  <span className="min-w-0 flex-1">
                    <span
                      className={cn(
                        "block text-14 leading-tight font-semibold transition-colors duration-300",
                        done || active ? "text-sg" : "text-ink/35",
                      )}
                    >
                      {title}
                    </span>
                    {done && (
                      <span className="mt-0.5 block truncate text-12.5 text-ink/55">
                        {s.summaries[i]}
                      </span>
                    )}
                  </span>
                </div>
                {active && (
                  <div key={`${story}-${i}`} className="mt-2.5 animate-fade-up pl-10">
                    <Detail step={i} story={s} approved={approved} copy={copy} still={still} />
                  </div>
                )}
              </li>
            );
          })}
        </ol>
        <p className="mt-1 text-right text-11 text-ink/40">{copy.demo}</p>
      </div>
    </div>
  );
}

function Detail({
  step,
  story,
  approved,
  copy,
  still,
}: {
  step: number;
  story: ReturnType<typeof flowCopy>["stories"][number];
  approved: boolean;
  copy: ReturnType<typeof flowCopy>;
  still: boolean;
}) {
  const stagger = (i: number) => (still ? undefined : { animationDelay: `${150 + i * 260}ms` });
  const item = still ? "" : "animate-fade-up opacity-0 [animation-fill-mode:forwards]";

  if (step === 0)
    return (
      <div className="relative overflow-hidden rounded-10 border border-line bg-white p-3">
        <p className="text-11.5 font-medium text-ink/50">{story.incoming.from}</p>
        <p className="mt-1 text-13 leading-snug text-ink/85">{story.incoming.text}</p>
        {!still && (
          <span className="pointer-events-none absolute inset-y-0 -left-1/3 w-1/3 animate-sweep bg-gradient-to-r from-transparent via-ai/10 to-transparent" />
        )}
      </div>
    );

  if (step === 1)
    return (
      <ul className="flex flex-wrap gap-1.5">
        {story.chips.map((chip, i) => (
          <li
            key={chip}
            style={stagger(i)}
            className={cn(
              "rounded-[8px] border border-ai/25 bg-white px-2 py-1 text-12 font-medium text-sg",
              item,
            )}
          >
            {chip}
          </li>
        ))}
      </ul>
    );

  if (step === 2)
    return (
      <div className="rounded-10 border border-line bg-white p-3">
        <p className="text-12.5 font-semibold text-sg">{story.prepared.title}</p>
        <ul className="mt-1.5 space-y-1">
          {story.prepared.lines.map((line, i) => (
            <li
              key={line}
              style={stagger(i)}
              className={cn("flex gap-2 text-12.5 leading-snug text-ink/75", item)}
            >
              <FileText size={13} className="mt-[1px] flex-none text-ink/35" />
              {line}
            </li>
          ))}
        </ul>
        {!still && (
          <span className="mt-2.5 block h-1 overflow-hidden rounded-full bg-pale">
            <span
              className="block h-full origin-left scale-x-0 animate-progress rounded-full bg-ai"
              style={{ ["--progress-duration" as string]: "2s" }}
            />
          </span>
        )}
      </div>
    );

  if (step === 3)
    return (
      <div className="flex items-center gap-3 rounded-10 border border-line bg-white p-3">
        <span className="grid size-8 flex-none place-items-center rounded-full bg-sand text-13 font-semibold text-sand-ink">
          {story.approver[0]}
        </span>
        <span className="min-w-0 flex-1 text-12.5 leading-snug">
          <span className="block font-semibold text-sg">{story.approver}</span>
          <span className="block text-ink/55">{story.role}</span>
        </span>
        <span
          className={cn(
            "flex items-center gap-1.5 rounded-[8px] px-3 py-1.5 text-12.5 font-semibold transition-all duration-200",
            approved ? "scale-100 bg-sw text-white" : "bg-sg text-white",
          )}
        >
          {approved && <Check size={13} strokeWidth={3} />}
          {approved ? copy.approved : copy.approve}
        </span>
      </div>
    );

  return (
    <ul className="space-y-1.5">
      {story.sent.map((line, i) => (
        <li
          key={line}
          style={stagger(i)}
          className={cn("flex items-start gap-2 text-12.5 leading-snug text-ink/80", item)}
        >
          <span className="mt-[1px] grid size-4 flex-none place-items-center rounded-full bg-sw text-white">
            <Check size={10} strokeWidth={3.2} />
          </span>
          {line}
        </li>
      ))}
    </ul>
  );
}
