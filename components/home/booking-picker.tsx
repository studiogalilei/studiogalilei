"use client";

import { useEffect, useMemo, useState } from "react";
import { Link } from "@/i18n/navigation";
import { cn } from "@/lib/cn";

/*
 * The intro-call calendar, drawn by the site and fed by Cal.com's public API (slots and
 * bookings, no key needed). It replaced the embedded Google Calendar page when Workspace
 * moved to Business Starter (25/11/2026), and it does not embed Cal.com's own booking page:
 * the day that page broke, this one kept working.
 */

const API = "https://api.cal.com/v2";
const EVENT = { username: "studiogalilei", eventTypeSlug: "chiamata-conoscitiva" };
const DAYS_AHEAD = 28;

export type BookingLabels = {
  loading: string;
  error: string;
  retry: string;
  empty: string;
  pickDay: string;
  pickTime: string;
  timezone: string;
  name: string;
  email: string;
  website: string;
  optional: string;
  back: string;
  confirm: string;
  sending: string;
  taken: string;
  failed: string;
  doneTitle: string;
  doneText: string;
  another: string;
  chosen: string;
};

type Slots = Record<string, string[]>;
type Step = "pick" | "form" | "done";

function isoDay(d: Date) {
  return d.toISOString().slice(0, 10);
}

async function fetchSlots(timeZone: string): Promise<Slots> {
  const start = new Date();
  const end = new Date(start.getTime() + DAYS_AHEAD * 86_400_000);
  const q = new URLSearchParams({
    ...EVENT,
    start: isoDay(start),
    end: isoDay(end),
    timeZone,
  });
  const res = await fetch(`${API}/slots?${q}`, { headers: { "cal-api-version": "2024-09-04" } });
  if (!res.ok) throw new Error(String(res.status));
  const body = (await res.json()) as { data?: Record<string, { start: string }[]> };
  const out: Slots = {};
  for (const [day, list] of Object.entries(body.data ?? {})) {
    if (list.length) out[day] = list.map((s) => s.start);
  }
  return out;
}

export function BookingPicker({ locale, labels }: { locale: string; labels: BookingLabels }) {
  const timeZone = useMemo(
    () => Intl.DateTimeFormat().resolvedOptions().timeZone || "Europe/Rome",
    [],
  );
  const [slots, setSlots] = useState<Slots | null>(null);
  const [failed, setFailed] = useState(false);
  const [day, setDay] = useState<string | null>(null);
  const [time, setTime] = useState<string | null>(null);
  const [step, setStep] = useState<Step>("pick");
  const [sending, setSending] = useState(false);
  const [notice, setNotice] = useState("");

  // a new value reloads the times; state only changes once Cal.com answers
  const [reloads, setReloads] = useState(0);
  useEffect(() => {
    let alive = true;
    fetchSlots(timeZone)
      .then((s) => {
        if (!alive) return;
        setSlots(s);
        setDay((cur) => (cur && s[cur] ? cur : (Object.keys(s)[0] ?? null)));
      })
      .catch(() => {
        if (alive) setFailed(true);
      });
    return () => {
      alive = false;
    };
  }, [timeZone, reloads]);

  function load() {
    setFailed(false);
    setSlots(null);
    setReloads((n) => n + 1);
  }

  const fmtDay = useMemo(
    () =>
      new Intl.DateTimeFormat(locale, {
        weekday: "short",
        day: "numeric",
        month: "short",
        timeZone: "UTC",
      }),
    [locale],
  );
  const fmtLong = useMemo(
    () =>
      new Intl.DateTimeFormat(locale, {
        weekday: "long",
        day: "numeric",
        month: "long",
        hour: "2-digit",
        minute: "2-digit",
        timeZone,
      }),
    [locale, timeZone],
  );
  const fmtTime = useMemo(
    () => new Intl.DateTimeFormat(locale, { hour: "2-digit", minute: "2-digit", timeZone }),
    [locale, timeZone],
  );

  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!time || sending) return;
    const f = new FormData(e.currentTarget);
    const website = String(f.get("website") || "").trim();
    setSending(true);
    setNotice("");
    try {
      const res = await fetch(`${API}/bookings`, {
        method: "POST",
        headers: { "Content-Type": "application/json", "cal-api-version": "2024-08-13" },
        body: JSON.stringify({
          start: new Date(time).toISOString(),
          ...EVENT,
          attendee: {
            name: String(f.get("name") || "").trim(),
            email: String(f.get("email") || "").trim(),
            timeZone,
            language: locale === "en" ? "en" : "it",
          },
          ...(website ? { bookingFieldsResponses: { notes: website } } : {}),
        }),
      });
      if (res.ok) {
        setStep("done");
        document.getElementById("sg-prenota")?.scrollIntoView({ block: "start" });
        return;
      }
      // the time went in the meantime, or Cal.com said no: back to a fresh list of times
      setNotice(res.status === 400 || res.status === 409 ? labels.taken : labels.failed);
      setStep("pick");
      setTime(null);
      load();
    } catch {
      setNotice(labels.failed);
    } finally {
      setSending(false);
    }
  }

  const box = "rounded-18 border border-sg/10 bg-white p-6 shadow-surface-2 md:p-8";

  if (step === "done" && time) {
    return (
      <div className={cn(box, "text-center")} role="status">
        <p className="text-22 font-semibold text-sg">{labels.doneTitle}</p>
        <p className="mt-2 text-16 text-ink/80 first-letter:uppercase">
          {fmtLong.format(new Date(time))}
        </p>
        <p className="mx-auto mt-4 max-w-[30rem] text-15 leading-1.65 text-ink/70">
          {labels.doneText}
        </p>
      </div>
    );
  }

  if (failed) {
    return (
      <div className={cn(box, "text-center")}>
        <p className="text-15 text-ink/80">{labels.error}</p>
        <div className="mt-4 flex flex-wrap justify-center gap-3">
          <button
            type="button"
            onClick={load}
            className="rounded-10 bg-sg px-5 py-3 text-15 font-medium text-white hover:bg-sg-deep"
          >
            {labels.retry}
          </button>
          <Link
            href="/contatti"
            className="rounded-10 border border-sg/25 px-5 py-3 text-15 font-medium text-sg hover:border-sg/60"
          >
            {labels.another}
          </Link>
        </div>
      </div>
    );
  }

  if (!slots) {
    return (
      <div className={box} aria-busy="true">
        <p className="sr-only">{labels.loading}</p>
        <div className="flex gap-2 overflow-hidden">
          {Array.from({ length: 6 }, (_, i) => (
            <div key={i} className="h-16 w-20 shrink-0 animate-pulse rounded-11 bg-pale" />
          ))}
        </div>
        <div className="mt-6 grid grid-cols-3 gap-2 sm:grid-cols-5">
          {Array.from({ length: 5 }, (_, i) => (
            <div key={i} className="h-12 animate-pulse rounded-10 bg-pale" />
          ))}
        </div>
      </div>
    );
  }

  const days = Object.keys(slots);
  if (!days.length) {
    return (
      <div className={cn(box, "text-center")}>
        <p className="text-15 text-ink/80">{labels.empty}</p>
      </div>
    );
  }

  if (step === "form" && time) {
    return (
      <form onSubmit={submit} className={box}>
        <p className="text-14 font-medium text-ai">{labels.chosen}</p>
        <p className="mt-1 text-19 font-semibold text-sg first-letter:uppercase">
          {fmtLong.format(new Date(time))}
        </p>
        <div className="mt-6 grid gap-4 md:grid-cols-2">
          <Field label={labels.name} name="name" autoComplete="name" required />
          <Field label={labels.email} name="email" type="email" autoComplete="email" required />
          <div className="md:col-span-2">
            <Field
              label={`${labels.website} (${labels.optional})`}
              name="website"
              autoComplete="url"
              inputMode="url"
            />
          </div>
        </div>
        {notice && <p className="mt-4 text-14 text-mk">{notice}</p>}
        <div className="mt-6 flex flex-wrap items-center justify-between gap-3">
          <button
            type="button"
            onClick={() => setStep("pick")}
            className="text-15 font-medium text-sg underline decoration-1 underline-offset-4 hover:decoration-2"
          >
            {labels.back}
          </button>
          <button
            type="submit"
            disabled={sending}
            className="rounded-10 bg-sg px-6 py-3.5 text-15 font-medium text-white hover:bg-sg-deep disabled:cursor-not-allowed disabled:opacity-60"
          >
            {sending ? labels.sending : labels.confirm}
          </button>
        </div>
      </form>
    );
  }

  const times = day ? (slots[day] ?? []) : [];
  return (
    <div className={box}>
      <p className="text-14 font-medium text-ink/70">{labels.pickDay}</p>
      <div
        className="-mx-1 mt-3 flex gap-2 overflow-x-auto px-1 pb-2"
        role="listbox"
        aria-label={labels.pickDay}
      >
        {days.map((d) => {
          const [w, ...rest] = fmtDay.format(new Date(`${d}T12:00:00Z`)).split(" ");
          const on = d === day;
          return (
            <button
              key={d}
              type="button"
              role="option"
              aria-selected={on}
              onClick={() => {
                setDay(d);
                setNotice("");
              }}
              className={cn(
                "flex w-20 shrink-0 flex-col items-center rounded-11 border px-2 py-2.5 transition-colors",
                on
                  ? "border-sg bg-sg text-white"
                  : "border-line bg-white text-sg hover:border-sg/40",
              )}
            >
              <span className="text-12 capitalize opacity-80">{w.replace(/[.,]/g, "")}</span>
              <span className="text-15 font-semibold">{rest.join(" ")}</span>
            </button>
          );
        })}
      </div>
      <p className="mt-6 text-14 font-medium text-ink/70">{labels.pickTime}</p>
      <div className="mt-3 grid grid-cols-3 gap-2 sm:grid-cols-5">
        {times.map((t) => (
          <button
            key={t}
            type="button"
            onClick={() => {
              setTime(t);
              setStep("form");
              setNotice("");
            }}
            className="rounded-10 border border-sg/20 py-3 text-15 font-medium text-sg transition-colors hover:border-sg hover:bg-pale"
          >
            {fmtTime.format(new Date(t))}
          </button>
        ))}
      </div>
      {notice && <p className="mt-4 text-14 text-mk">{notice}</p>}
      <p className="mt-5 text-13 text-ink/55">
        {labels.timezone} {timeZone.replace(/_/g, " ")}
      </p>
    </div>
  );
}

function Field({ label, ...input }: { label: string } & React.ComponentProps<"input">) {
  return (
    <label className="block">
      <span className="text-14 font-medium text-ink/80">{label}</span>
      <input
        {...input}
        className="mt-1.5 block w-full rounded-10 border border-line bg-white px-4 py-3 text-16 text-ink focus:border-sg"
      />
    </label>
  );
}
