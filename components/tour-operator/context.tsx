"use client";

import { useTranslations } from "next-intl";
import { createContext, use, useCallback, useEffect, useMemo, useRef, useState } from "react";
import { company } from "@/lib/company";

const PHONE = company.phoneHref.replace("+", "");
const REF_KEY = "sg_rq";
const REF_TTL = 120 * 864e5; // 120 days

type Lightbox = { src: string; width: number };

type TourState = {
  /** The page's own DOM: Next keeps a hidden copy of the page (other language) around. */
  root: React.RefObject<HTMLDivElement | null>;
  picked: boolean[];
  togglePain: (index: number) => void;
  caseIndex: number;
  openCase: (index: number) => void;
  lightbox: Lightbox | null;
  setLightbox: (lightbox: Lightbox | null) => void;
  whatsappHref: (withPain?: boolean) => string;
  mailHref: string;
};

const TourContext = createContext<TourState | null>(null);

export function useTour() {
  const state = use(TourContext);
  if (!state) throw new Error("useTour outside TourProvider");
  return state;
}

/**
 * A discreet source code (?c=CODE, also ?r= / ?ref=) is kept first-touch for 120 days,
 * removed from the address bar and added to messages as a neutral request reference.
 */
function readReferral() {
  const query = new URLSearchParams(location.search);
  const incoming = (query.get("c") || query.get("r") || query.get("ref") || "")
    .replace(/[^A-Za-z0-9]/g, "")
    .slice(0, 12)
    .toUpperCase();
  let code = "";
  try {
    const stored = JSON.parse(localStorage.getItem(REF_KEY) || "null");
    if (stored && Date.now() - stored.t < REF_TTL) code = stored.v;
    if (!code && incoming) {
      code = incoming;
      localStorage.setItem(REF_KEY, JSON.stringify({ v: code, t: Date.now() }));
    }
  } catch {
    code = code || incoming;
  }
  if (incoming) {
    ["c", "r", "ref"].forEach((k) => query.delete(k));
    const qs = query.toString();
    history.replaceState(
      history.state,
      "",
      location.pathname + (qs ? "?" + qs : "") + location.hash,
    );
  }
  return code ? "SG-" + code : "";
}

export function TourProvider({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) {
  const t = useTranslations("TourOperator");
  const root = useRef<HTMLDivElement>(null);
  const [picked, setPicked] = useState<boolean[]>([false, false, false, false, false]);
  const [caseIndex, setCaseIndex] = useState(0);
  const [lightbox, setLightbox] = useState<Lightbox | null>(null);
  const [refTag, setRefTag] = useState("");

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- reads browser-only storage once
    setRefTag(readReferral());
    if (location.hash === "#beavita") setCaseIndex(1);
  }, []);

  const togglePain = useCallback(
    (index: number) => setPicked((p) => p.map((v, i) => (i === index ? !v : v))),
    [],
  );

  const value = useMemo<TourState>(() => {
    const reference = refTag ? `\n\n${t("refLabel")}${refTag}` : "";
    const painTitles = picked.flatMap((on, i) => (on ? [`• ${t(`painTitle${i + 1}`)}`] : []));
    const painText = `${t("waPain")}\n${painTitles.join("\n")}\n\n${t("waPainEnd")}`;
    const whatsappHref = (withPain = painTitles.length > 0) =>
      `https://wa.me/${PHONE}?text=${encodeURIComponent((withPain ? painText : t("waDefault")) + reference)}`;
    const mailHref =
      `mailto:${company.email}?subject=${encodeURIComponent(t("mailSubject") + (refTag ? ` · ${refTag}` : ""))}` +
      `&body=${encodeURIComponent(t("mailBody") + reference)}`;
    return {
      root,
      picked,
      togglePain,
      caseIndex,
      openCase: setCaseIndex,
      lightbox,
      setLightbox,
      whatsappHref,
      mailHref,
    };
  }, [t, picked, togglePain, caseIndex, lightbox, refTag]);

  return (
    <TourContext value={value}>
      <div ref={root} className={className}>
        {children}
      </div>
    </TourContext>
  );
}

/** WhatsApp link whose message follows the language, the referral code and the picked pain points. */
export function WhatsAppLink({
  pain = false,
  className,
  children,
}: {
  pain?: boolean;
  className?: string;
  children: React.ReactNode;
}) {
  const { whatsappHref } = useTour();
  return (
    <a className={className} href={whatsappHref(pain || undefined)} target="_blank" rel="noopener">
      {children}
    </a>
  );
}

export function EmailLink({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) {
  const { mailHref } = useTour();
  return (
    <a className={className} href={mailHref}>
      {children}
    </a>
  );
}
