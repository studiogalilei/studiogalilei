"use client";

import { useEffect, useReducer, useRef, useState } from "react";
import { cn } from "@/lib/cn";
import {
  type Answers,
  type Question,
  SECTORS,
  optionsOf,
  sectorGroups,
  validate,
  visibleQuestions,
} from "./questions";
import { FORM_VERSION, retryQueuedApplications, submitApplication } from "./submit";

/*
 * Member Club application: one question per screen, rendered in a fixed-height box that
 * scrolls on its own (it used to be an iframe). Sizes that followed the iframe viewport now
 * follow the box through container units (cqw/cqh) and container queries.
 */

const LETTERS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const GUTTER = "px-[clamp(20px,5cqw,56px)]";
// the site-wide focus ring (unlayered, see globals.css) would also restyle the form's own fields
const NO_RING = "focus-visible:outline-none!";

type State = { index: number; answers: Answers; error: string; collected: string[] };
type Action =
  | { type: "set"; name: string; value: unknown }
  | { type: "next" }
  | { type: "back" }
  | { type: "error"; error: string };

/** The text fields of a screen, in page order. */
function textFields(q: Question): string[] {
  switch (q.kind) {
    case "group":
      return q.fields.map((f) => f.name);
    case "long":
      return [q.name];
    case "multi":
      return q.other ? [q.name + "_altro"] : [];
    case "portfolio":
      return ["portfolio_link", "sito"];
    default:
      return [];
  }
}

/**
 * Leaving a screen stores its text fields trimmed. The first time, they are added after every
 * answer given so far and in page order: the answers keep the order in which the original form
 * collected them, which is the order of the rows in the email copy.
 */
function collect(q: Question, state: State): Pick<State, "answers" | "collected"> {
  const answers = { ...state.answers };
  const collected = [...state.collected];
  for (const name of textFields(q)) {
    const value = typeof answers[name] === "string" ? (answers[name] as string).trim() : "";
    if (!collected.includes(name)) {
      delete answers[name];
      collected.push(name);
    }
    answers[name] = value;
  }
  return { answers, collected };
}

const isBlocked = (q: Question, answers: Answers) =>
  q.kind === "single" && !!q.block && answers[q.name] === q.block.value;

function reducer(state: State, action: Action): State {
  const list = visibleQuestions(state.answers);
  const q = list[Math.min(state.index, list.length - 1)];
  switch (action.type) {
    case "set": {
      if (action.value !== undefined)
        return { ...state, answers: { ...state.answers, [action.name]: action.value } };
      const answers = { ...state.answers };
      delete answers[action.name];
      return { ...state, answers, collected: state.collected.filter((n) => n !== action.name) };
    }
    case "error":
      return { ...state, error: action.error };
    case "back":
      return state.index > 0 ? { ...collect(q, state), index: state.index - 1, error: "" } : state;
    case "next": {
      // without a VAT number there is no going on (also from the keyboard)
      if (isBlocked(q, state.answers)) return state;
      const next = collect(q, state);
      const error = validate(q, next.answers);
      if (error) return { ...state, ...next, error };
      const last = visibleQuestions(next.answers).length - 1;
      return { ...next, error: "", index: Math.min(state.index + 1, last) };
    }
  }
}

const strings = (v: unknown) => (Array.isArray(v) ? (v as string[]) : []);

export function MemberClubForm() {
  const [{ index, answers, error }, dispatch] = useReducer(reducer, {
    index: 0,
    answers: { form_version: FORM_VERSION },
    error: "",
    collected: [],
  });
  const root = useRef<HTMLDivElement>(null);
  const [notice, setNotice] = useState<{ title: string; text: string; screen: number } | null>(
    null,
  );
  const [noticeUp, setNoticeUp] = useState(false);
  const [closingNote, setClosingNote] = useState<string | null>(null);
  const submitted = useRef(false);

  const list = visibleQuestions(answers);
  const position = Math.min(index, list.length - 1);
  const q = list[position];
  const blue = q.kind === "intro" || q.kind === "end";
  const blocked = isBlocked(q, answers);
  // a notice belongs to the screen that raised it: changing screen sends it away
  const noticeShown = noticeUp && notice?.screen === position;

  function showNotice(next: { title: string; text: string } | null) {
    setNoticeUp(false);
    if (!next) return;
    setNotice({ ...next, screen: position });
    requestAnimationFrame(() => setNoticeUp(true));
  }

  // the notice slides away, then leaves the DOM
  useEffect(() => {
    if (noticeShown || !notice) return;
    const t = setTimeout(() => setNotice(null), 260);
    return () => clearTimeout(t);
  }, [noticeShown, notice]);

  // applications saved on this device by a failed submission are retried when the form opens
  useEffect(() => {
    retryQueuedApplications();
  }, []);

  // new screen: focus the first field (not on narrow screens), send the application at the end
  const firstRender = useRef(true);
  useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false;
      return;
    }
    const box = root.current;
    if (!box) return;
    const field = box.querySelector<HTMLElement>("form input, form textarea");
    if (field && field.getClientRects().length && box.offsetWidth > 640) field.focus();
    // keyboard shortcuts keep working once the clicked button has left the page
    else if (!box.contains(document.activeElement)) box.focus({ preventScroll: true });
    if (q.kind === "end" && !submitted.current) {
      submitted.current = true;
      const { _files, ...rest } = answers;
      submitApplication(rest, (_files as File[]) ?? []).then(setClosingNote);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps -- runs once per screen
  }, [position]);

  function next() {
    if (blocked && q.kind === "single" && q.block) return showNotice(q.block);
    dispatch({ type: "next" });
  }

  function choose(value: string) {
    if (q.kind === "single") {
      dispatch({ type: "set", name: q.name, value });
      if (q.block) {
        const stop = value === q.block.value;
        showNotice(stop ? q.block : null);
        if (stop) return; // no automatic advance
      }
      setTimeout(() => dispatch({ type: "next" }), 220); // single choice: moves on by itself
      return;
    }
    if (q.kind !== "multi") return;
    const chosen = new Set(strings(answers[q.name]));
    if (chosen.has(value)) chosen.delete(value);
    else chosen.add(value);
    // the "none of these" options don't mix with the others
    if (q.exclusive) {
      if (q.exclusive.includes(value) && chosen.has(value)) {
        chosen.clear();
        chosen.add(value);
      } else if (!q.exclusive.includes(value)) q.exclusive.forEach((x) => chosen.delete(x));
    }
    dispatch({ type: "set", name: q.name, value: [...chosen] });
    if (q.other && !chosen.has("Altro"))
      dispatch({ type: "set", name: q.name + "_altro", value: undefined });
  }

  function onKeyDown(e: React.KeyboardEvent) {
    const tag = (document.activeElement as HTMLElement | null)?.tagName;
    if (e.key === "Enter" && !e.shiftKey && tag !== "TEXTAREA") {
      e.preventDefault();
      if (q.kind !== "end") next();
      return;
    }
    if ((q.kind === "single" || q.kind === "multi") && /^[a-z]$/i.test(e.key) && tag !== "INPUT") {
      const option = optionsOf(q, answers)[LETTERS.indexOf(e.key.toUpperCase())];
      if (option !== undefined) {
        e.preventDefault();
        choose(option);
      }
    }
  }

  return (
    <div
      ref={root}
      tabIndex={-1}
      onKeyDown={onKeyDown}
      className={cn(
        "@container-size relative h-[700px] overflow-hidden font-sans text-16 leading-[normal] font-normal text-black antialiased outline-none md:h-[760px]",
        NO_RING,
        blue ? "bg-sg" : "bg-white",
      )}
    >
      <div className="absolute inset-0 overflow-x-hidden overflow-y-auto">
        <div
          className={cn(
            "grid min-h-full place-items-center pt-[108px] pb-24 @max-[640px]:pt-28 @max-[640px]:pb-[104px]",
            GUTTER,
          )}
        >
          {/* centred as a grid item, the form is as wide as its content (up to 640px) */}
          <form noValidate autoComplete="on" onSubmit={(e) => e.preventDefault()}>
            <Screen
              key={position}
              q={q}
              position={position}
              answers={answers}
              error={error}
              closingNote={closingNote}
              set={(name, value) => dispatch({ type: "set", name, value })}
              setError={(e) => dispatch({ type: "error", error: e })}
              choose={choose}
            />
          </form>
        </div>
      </div>

      <div
        className={cn(
          "absolute inset-x-0 top-[84px] z-50 h-0.5",
          blue ? "bg-white/22" : "bg-[#E6E9F2]",
        )}
      >
        <i
          className={cn(
            "block h-full transition-[width] duration-[.34s] ease-[cubic-bezier(.22,.61,.36,1)]",
            blue ? "bg-white" : "bg-sg",
          )}
          style={{ width: `${(position / (list.length - 1)) * 100}%` }}
        />
      </div>

      <header
        className={cn(
          "absolute inset-x-0 top-0 z-40 flex h-[84px] items-center bg-sg",
          q.kind === "intro" ? "justify-center" : "justify-between",
          GUTTER,
        )}
      >
        <div className="flex items-center" aria-label="Studio Galilei">
          {/* eslint-disable-next-line @next/next/no-img-element -- fixed-size SVG mark */}
          <img
            src="/images/marchio-member-club.svg"
            alt="Studio Galilei"
            className="block h-[74px] w-auto"
          />
        </div>
        {!blue && (
          <div className="text-12 text-white tabular-nums">
            <b className="font-semibold">{position}</b> / <span>{list.length - 2}</span>
          </div>
        )}
      </header>

      {q.kind !== "end" && (
        <footer
          className={cn(
            "absolute inset-x-0 bottom-0 z-40 flex items-center gap-3.5 py-5",
            GUTTER,
            blue
              ? "bg-[linear-gradient(to_top,#061773_62%,rgba(6,23,115,0))]"
              : "bg-[linear-gradient(to_top,#fff_62%,rgba(255,255,255,0))]",
          )}
        >
          <button
            type="button"
            onClick={() => dispatch({ type: "back" })}
            className={cn(
              "cursor-pointer border-0 bg-transparent p-2 text-14 leading-[normal] font-normal",
              blue ? "text-white" : "text-sg",
              position === 0 && "invisible",
            )}
          >
            ← Indietro
          </button>
          <button
            type="button"
            onClick={next}
            disabled={blocked}
            className={cn(
              "order-2 cursor-pointer rounded-10 border-0 px-[26px] py-[13px] text-15 leading-[normal] font-semibold transition-[opacity,transform] duration-[.16s] hover:opacity-90 focus-visible:rounded-10! active:scale-[.985] disabled:cursor-not-allowed disabled:opacity-[.28] @max-[640px]:ml-auto",
              blue ? "bg-white text-sg" : "bg-sg text-white",
            )}
          >
            {q.kind === "intro" && q.next ? q.next : "Avanti"}
          </button>
          <span
            className={cn(
              "order-1 ml-auto text-12 @max-[640px]:hidden",
              blue ? "text-white" : "text-sg",
            )}
          >
            <Key>Invio</Key> avanti <Key>↑</Key>
            <Key>↓</Key> naviga
          </span>
        </footer>
      )}

      {notice && (
        <div
          role="status"
          className={cn(
            "pointer-events-none absolute inset-x-0 bottom-24 z-60 flex justify-center transition-[transform,opacity] duration-300 ease-[cubic-bezier(.22,.61,.36,1)] @max-[640px]:bottom-20",
            noticeShown ? "opacity-100" : "translate-y-[14px] opacity-0",
          )}
        >
          <div className="w-fit max-w-[min(400px,calc(100cqw-40px))] rounded-[9px] bg-sg px-[15px] py-[11px] text-white shadow-[0_6px_20px_rgba(6,23,115,.2)]">
            <b className="mb-0.5 block text-13 font-semibold">{notice.title}</b>
            <p className="text-12.5 leading-[1.45] opacity-85">{notice.text}</p>
          </div>
        </div>
      )}
    </div>
  );
}

function Key({ children }: { children: React.ReactNode }) {
  return (
    <kbd className="mx-0.5 rounded-[5px] border border-b-2 border-[#C9CEDF] px-1.5 py-0.5 font-sans text-11 leading-[normal]">
      {children}
    </kbd>
  );
}

// ---------------------------------------------------------------------------------------------

const help = "mb-[26px] max-w-[52ch] text-14.5 leading-[1.6]";
const label = "mb-[7px] block text-14 leading-[normal] font-semibold";
const input =
  "w-full border-0 border-b-[1.5px] border-[#C9CEDF] bg-transparent px-0.5 py-[9px] text-17 leading-[normal] font-normal text-black transition-[border-color] duration-[.34s] ease-[cubic-bezier(.22,.61,.36,1)] placeholder:text-[#9AA1B8] focus:border-b-sg focus:outline-0 focus-visible:rounded-none! focus-visible:outline-none!";
const choice =
  "group flex w-full cursor-pointer items-center gap-[13px] rounded-[11px] border-[1.5px] border-[#C9CEDF] bg-transparent px-4 py-3.5 text-left text-16 leading-[normal] font-normal text-black transition-[border-color,background,transform] duration-[.16s] hover:border-sg focus-visible:rounded-[11px]! active:scale-[.99] aria-pressed:border-sg aria-pressed:bg-[#F4F6FD]";
const keyCap =
  "grid h-[26px] flex-[0_0_26px] place-items-center rounded-md border-[1.5px] border-[#C9CEDF] text-12 font-semibold text-sg [transition:inherit] group-aria-pressed:border-sg group-aria-pressed:bg-sg group-aria-pressed:text-white";

type ScreenProps = {
  q: Question;
  position: number;
  answers: Answers;
  error: string;
  closingNote: string | null;
  set: (name: string, value: unknown) => void;
  setError: (error: string) => void;
  choose: (value: string) => void;
};

function Screen({ q, position, answers, error, closingNote, set, setError, choose }: ScreenProps) {
  const blue = q.kind === "intro" || q.kind === "end";
  const end = q.kind === "end";
  const text = (name: string) =>
    typeof answers[name] === "string" ? (answers[name] as string) : "";
  const Heading = blue ? "h1" : "h2";

  return (
    <section className={cn("block w-full max-w-[640px] animate-mc-enter", blue && "text-white")}>
      {!blue && (
        <div className="mb-3.5 text-13 font-semibold text-sg tabular-nums">
          {String(position).padStart(2, "0")}
        </div>
      )}
      {end && (
        <div className="mb-6 text-white">
          {/* eslint-disable-next-line @next/next/no-img-element -- fixed-size SVG mark */}
          <img
            src="/images/marchio-member-club.svg"
            alt="Studio Galilei"
            className="block h-[138px] w-auto origin-bottom-left animate-mc-bloom"
          />
        </div>
      )}
      <Heading
        className={
          blue
            ? cn(
                "mb-2.5 text-[clamp(23px,3.6cqw,32px)] leading-1.15 font-semibold -tracking-2",
                end && "animate-mc-title",
              )
            : "mb-3 text-[clamp(20px,3.2cqw,27px)] leading-tight font-semibold -tracking-1.5"
        }
      >
        {q.title.split("\n").map((line, i) => (
          <span key={i}>
            {i > 0 && <br />}
            {line}
          </span>
        ))}
      </Heading>
      {q.help && <p className={help}>{q.help}</p>}

      {(q.kind === "intro" || q.kind === "end") && (
        <div>
          {[...q.body, ...(end && closingNote ? [closingNote] : [])].map((p, i) => (
            <p
              key={p}
              className={cn(
                "mb-[9px] max-w-[56ch] text-13.5 leading-normal",
                end && "animate-mc-rise",
                i === q.body.length && "font-semibold",
              )}
              style={end && i < 2 ? { animationDelay: `${0.62 + i * 0.16}s` } : undefined}
            >
              {p}
            </p>
          ))}
        </div>
      )}

      {q.kind === "group" &&
        q.fields.map((f) => (
          <div key={f.name} className="mb-[18px]">
            <label className={label} htmlFor={f.name}>
              {f.label}
            </label>
            <input
              id={f.name}
              name={f.name}
              type={f.type}
              placeholder={f.placeholder}
              value={text(f.name)}
              min={f.type === "number" ? 0 : undefined}
              onChange={(e) => set(f.name, e.target.value)}
              className={input}
            />
          </div>
        ))}

      {q.kind === "sectors" && <Sectors answers={answers} set={set} />}

      {q.kind === "long" && (
        <LongAnswer
          name={q.name}
          rows={q.rows}
          value={text(q.name)}
          onChange={(v) => set(q.name, v)}
        />
      )}

      {(q.kind === "single" || q.kind === "multi") && (
        <Choices q={q} answers={answers} choose={choose} set={set} text={text} />
      )}

      {q.kind === "portfolio" && (
        <Portfolio answers={answers} set={set} setError={setError} text={text} />
      )}

      <p className="mt-2.5 min-h-[19px] text-13.5 text-mk">{error}</p>
    </section>
  );
}

function Choices({
  q,
  answers,
  choose,
  set,
  text,
}: {
  q: Extract<Question, { kind: "single" | "multi" }>;
  answers: Answers;
  choose: (value: string) => void;
  set: (name: string, value: unknown) => void;
  text: (name: string) => string;
}) {
  const chosen = q.kind === "multi" ? strings(answers[q.name]) : [answers[q.name]];
  const otherOpen = q.kind === "multi" && q.other && chosen.includes("Altro");
  const otherField = useRef<HTMLDivElement>(null);
  const mounted = useRef(false);

  // choosing "Altro" opens a free text field and brings it into view
  useEffect(() => {
    if (!mounted.current) {
      mounted.current = true;
      return;
    }
    if (!otherOpen) return;
    otherField.current?.querySelector("input")?.focus({ preventScroll: true });
    otherField.current?.scrollIntoView({ block: "center", behavior: "smooth" });
  }, [otherOpen]);

  return (
    <>
      {q.kind === "multi" && q.fixed && (
        <div className="mb-[9px] grid gap-[9px]">
          <div
            aria-disabled="true"
            className="flex w-full cursor-default items-center gap-[13px] rounded-[11px] border-[1.5px] border-sg bg-sg px-4 py-3.5 text-left text-16 font-semibold text-white"
          >
            <span className="grid h-[26px] flex-[0_0_26px] place-items-center rounded-md border-[1.5px] border-white bg-white text-12 font-semibold text-sg">
              ✓
            </span>
            {q.fixed}
            <em className="ml-auto text-12 font-normal not-italic opacity-75">
              specializzazione principale
            </em>
          </div>
        </div>
      )}
      <div
        role="group"
        className={cn(
          "grid gap-[9px]",
          q.columns === 2 && "grid-cols-[repeat(auto-fit,minmax(220px,1fr))]",
        )}
      >
        {optionsOf(q, answers).map((option, n) => (
          <button
            key={option}
            type="button"
            aria-pressed={chosen.includes(option)}
            onClick={() => choose(option)}
            className={choice}
          >
            <span className={keyCap}>{LETTERS[n] || "·"}</span>
            {option}
          </button>
        ))}
      </div>
      {q.kind === "multi" && (
        <p className={cn(help, "mt-3.5 mb-0 text-13 leading-[1.6]")}>Puoi sceglierne più di una.</p>
      )}
      {q.kind === "multi" && q.other && (
        <div ref={otherField} className="mt-[22px] mb-[18px]" hidden={!otherOpen}>
          <label className={label} htmlFor={`${q.name}_altro`}>
            Quali altri?
          </label>
          <input
            id={`${q.name}_altro`}
            name={`${q.name}_altro`}
            type="text"
            placeholder="Scrivili separati da una virgola"
            value={text(`${q.name}_altro`)}
            onChange={(e) => set(`${q.name}_altro`, e.target.value)}
            className={input}
          />
        </div>
      )}
    </>
  );
}

function LongAnswer({
  name,
  rows,
  value,
  onChange,
}: {
  name: string;
  rows: number;
  value: string;
  onChange: (value: string) => void;
}) {
  const lines = value.trim() ? value.trim().split(/\n/).length : 0;
  return (
    <div className="mb-[18px]">
      <textarea
        id={name}
        name={name}
        rows={rows}
        placeholder="Scrivi qui"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="min-h-[120px] w-full resize-none rounded-10 border-[1.5px] border-[#C9CEDF] bg-transparent p-3.5 text-17 leading-[1.6] font-normal text-black transition-[border-color] duration-[.34s] ease-[cubic-bezier(.22,.61,.36,1)] placeholder:text-[#9AA1B8] focus:border-sg focus:outline-0 focus-visible:rounded-10! focus-visible:outline-none!"
      />
      <div className="mt-1.5 text-right text-12 text-sg tabular-nums">
        <span>{lines}</span> / {rows} righe
      </div>
    </div>
  );
}

/** One screen: search on top, chosen tags, then every sub-sector grouped by sector. */
function Sectors({
  answers,
  set,
}: {
  answers: Answers;
  set: (name: string, value: unknown) => void;
}) {
  const [query, setQuery] = useState("");
  const plain = (t: string) => t.toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "");
  const filter = plain(query.trim());
  const chosen = SECTORS.flatMap(([, column, subs]) =>
    subs.filter((s) => strings(answers[column]).includes(s)).map((s) => ({ s, column })),
  );

  function toggle(column: string, sub: string) {
    const current = new Set(strings(answers[column]));
    if (current.has(sub)) current.delete(sub);
    else current.add(sub);
    const next = { ...answers, [column]: [...current] };
    set(column, [...current]);
    set("settori_macro", sectorGroups(next));
  }

  const groups = SECTORS.map(([group, column, subs]) => ({
    group,
    column,
    subs: subs.filter((o) => !filter || plain(o).includes(filter) || plain(group).includes(filter)),
  })).filter((g) => g.subs.length);

  return (
    <>
      <input
        id="cerca"
        type="text"
        placeholder="Cerca un settore: conce, dentist, e-commerce…"
        autoComplete="off"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className={cn(input, "mb-3.5 text-16 leading-[normal]")}
      />
      <div className="mb-[18px] flex min-h-[30px] flex-wrap gap-[7px]">
        {chosen.length ? (
          chosen.map(({ s, column }) => (
            <button
              key={s}
              type="button"
              onClick={() => toggle(column, s)}
              className="group inline-flex cursor-pointer items-center gap-[7px] rounded-[7px] border-0 bg-sg px-2.5 py-1.5 text-13 leading-[normal] font-semibold text-white focus-visible:rounded-[7px]!"
            >
              {s}
              <span aria-hidden="true" className="font-normal opacity-65 group-hover:opacity-100">
                ×
              </span>
            </button>
          ))
        ) : (
          <p className={cn(help, "m-0 text-13 leading-[1.6]")}>Nessuno scelto per ora.</p>
        )}
      </div>
      <div className="-mx-0.5 max-h-[46cqh] overflow-y-auto pr-1.5 [&::-webkit-scrollbar]:w-[5px] [&::-webkit-scrollbar-thumb]:rounded-[3px] [&::-webkit-scrollbar-thumb]:bg-[#C9CEDF]">
        {groups.length ? (
          groups.map(({ group, column, subs }) => (
            <div key={group} className="mb-4">
              <h3 className="mb-[7px] text-11.5 leading-[normal] font-semibold tracking-[.06em] text-sg uppercase">
                {group}
              </h3>
              <div className="flex flex-wrap gap-1.5">
                {subs.map((sub) => (
                  <button
                    key={sub}
                    type="button"
                    aria-pressed={strings(answers[column]).includes(sub)}
                    onClick={() => toggle(column, sub)}
                    className="cursor-pointer rounded-lg border-[1.5px] border-[#C9CEDF] bg-transparent px-3 py-[7px] text-13.5 leading-[normal] font-normal text-black transition-[border-color,background,color] duration-[.14s] hover:border-sg focus-visible:rounded-lg! aria-pressed:border-sg aria-pressed:bg-sg aria-pressed:font-semibold aria-pressed:text-white"
                  >
                    {sub}
                  </button>
                ))}
              </div>
            </div>
          ))
        ) : (
          <p className={help}>Nessun settore per «{query}». Prova con una parola più corta.</p>
        )}
      </div>
    </>
  );
}

/** Link and files are big and inviting: the portfolio is the first thing we look at. */
function Portfolio({
  answers,
  set,
  setError,
  text,
}: {
  answers: Answers;
  set: (name: string, value: unknown) => void;
  setError: (error: string) => void;
  text: (name: string) => string;
}) {
  const files = (answers._files as File[] | undefined) ?? [];
  const [over, setOver] = useState(false);

  function pick(list: FileList | null) {
    if (!list?.length) return;
    set("_files", [...list].slice(0, 3));
    setError("");
  }

  return (
    <>
      <div className="mb-[18px]">
        <label className={label} htmlFor="portfolio_link">
          Link al tuo portfolio
        </label>
        <input
          id="portfolio_link"
          name="portfolio_link"
          type="url"
          placeholder="https://"
          value={text("portfolio_link")}
          onChange={(e) => set("portfolio_link", e.target.value)}
          className={cn(input, "px-0.5 py-3 text-19 leading-[normal]")}
        />
      </div>
      <label
        htmlFor="portfolio_file"
        onDragEnter={(e) => (e.preventDefault(), setOver(true))}
        onDragOver={(e) => (e.preventDefault(), setOver(true))}
        onDragLeave={(e) => (e.preventDefault(), setOver(false))}
        onDrop={(e) => (e.preventDefault(), setOver(false), pick(e.dataTransfer.files))}
        className={cn(
          "mt-5 flex cursor-pointer flex-col items-center justify-center gap-[5px] rounded-14 border-[1.5px] border-dashed border-[#C9CEDF] px-6 py-[34px] text-center text-16 leading-[normal] font-normal text-sg transition-[border-color,background] duration-[.18s] hover:border-sg hover:bg-[#F4F6FD]",
          (over || files.length > 0) && "border-solid border-sg bg-[#F4F6FD]",
        )}
      >
        <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" className="mb-[3px] size-[26px]">
          <path
            d="M12 16V4m0 0L7.5 8.5M12 4l4.5 4.5M4 15v3a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-3"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
        <b className="text-15.5 font-semibold text-black">
          {files.length
            ? files.length === 1
              ? files[0].name
              : `${files.length} file scelti`
            : "Oppure carica dei file"}
        </b>
        <em className="text-12.5 text-sg not-italic">
          {files.length ? "clicca per cambiare" : "PDF o immagini, fino a 3, massimo 15 MB l'uno"}
        </em>
        <input
          id="portfolio_file"
          name="portfolio_file"
          type="file"
          accept=".pdf,image/*"
          multiple
          hidden
          onChange={(e) => pick(e.target.files)}
        />
      </label>
      <div className="mt-[26px] mb-[18px]">
        <label className={label} htmlFor="sito">
          Sito o profilo professionale (LinkedIn, Behance, GitHub…)
        </label>
        <input
          id="sito"
          name="sito"
          type="url"
          placeholder="https://"
          value={text("sito")}
          onChange={(e) => set("sito", e.target.value)}
          className={input}
        />
      </div>
    </>
  );
}
