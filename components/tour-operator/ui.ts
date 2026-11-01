// Shared class lists of the tour operator landing page (/tour-operator).
// Breakpoints: max-tour-md = ≤ 1060px, max-lg = ≤ 1023px, max-tour-sm = ≤ 720px.
import { cn } from "@/lib/cn";

export const wrap = "mx-auto w-full max-w-[1200px] px-10 max-tour-sm:px-[18px]";

export const h2 =
  "text-2.6rem leading-1.1 font-semibold -tracking-3 text-sg max-tour-sm:text-[1.9rem] max-tour-sm:leading-1.15";

export const kicker =
  "mb-4 inline-flex items-center gap-2.5 text-14 font-medium text-ai max-tour-sm:mb-3 max-tour-sm:text-13.5";

export const lead =
  "max-w-[700px] text-17 leading-1.75 text-ink/70 max-tour-sm:text-16 max-tour-sm:leading-1.7";

/** Navy panel over the Venice photo (timeline, CTA band, final CTA). */
export const fieldNavy =
  "relative isolate bg-sg-deep bg-[radial-gradient(120%_80%_at_100%_0%,rgba(6,137,255,0.22),transparent_60%),linear-gradient(#040f4dc4,#040f4dc4),url(/images/tour-operator/band-bg.webp)] bg-cover bg-center bg-no-repeat text-white shadow-[inset_0_1px_#ffffff1a,0_0_0_1px_#ffffff0f,0_24px_48px_-16px_#01041e8c]";

export const section = "relative py-28 max-tour-sm:py-16";

/** Fades and rises into view (see effects.tsx); `delay` staggers siblings. */
export function reveal(delay: 0 | 1 | 2 | 3 = 0) {
  return cn(
    "[transform:translateY(18px)] opacity-0 [transition:opacity_.8s_ease,transform_.8s_cubic-bezier(.2,.7,.2,1)] data-in:[transform:none] data-in:opacity-100",
    delay === 1 && "[transition-delay:.08s]",
    delay === 2 && "[transition-delay:.16s]",
    delay === 3 && "[transition-delay:.24s]",
  );
}

export type ButtonKind = "whatsapp" | "email";
export type ButtonSize = "default" | "hero" | "pain" | "final" | "sticky";

const sizes: Record<ButtonSize, string> = {
  default:
    "min-h-16 gap-3 px-7 py-5 text-17 max-tour-sm:min-h-[60px] max-tour-sm:px-5 max-tour-sm:py-4 max-tour-sm:text-[16.5px] [&>svg]:size-6",
  hero: "min-h-[58px] gap-2.5 px-[22px] py-4 text-16 [&>svg]:size-[22px]",
  pain: "min-h-[54px] gap-3 px-[22px] py-3.5 text-15.5 [&>svg]:size-6",
  final:
    "min-h-[72px] gap-3 px-10 py-[22px] text-19 max-tour-sm:min-h-[62px] max-tour-sm:px-5 max-tour-sm:py-[18px] max-tour-sm:text-17 [&>svg]:size-6",
  sticky: "min-h-[52px] flex-1 gap-2 rounded-xl px-2.5 py-3 text-15.5 [&>svg]:size-5",
};

/**
 * Conversion buttons (the light travelling around the border is in contact-button.tsx).
 * `dark` is the translucent email button used on navy backgrounds.
 */
export function button({
  kind,
  size = "default",
  dark = false,
  lightGlow = false,
}: {
  kind: ButtonKind;
  size?: ButtonSize;
  dark?: boolean;
  lightGlow?: boolean;
}) {
  return cn(
    "relative inline-flex cursor-pointer items-center justify-center rounded-14 border-0 font-semibold whitespace-nowrap no-underline [transition:translate_.25s_cubic-bezier(.2,.7,.2,1),scale_.25s_cubic-bezier(.2,.7,.2,1),box-shadow_.25s_ease,background_.15s_ease] hover:-translate-y-0.5 focus-visible:rounded-14! focus-visible:outline-offset-4! focus-visible:outline-[#7cc4ff]! active:translate-y-0 active:scale-[.985] max-tour-sm:w-full [&>svg]:flex-none",
    "group/cta [--glow-2:#8fd0ff]",
    lightGlow && "[--glow-2:#3aa0ff]",
    kind === "whatsapp" &&
      "bg-[linear-gradient(180deg,#22b86a,#1daa61_60%,#189a57)] text-white shadow-[0_18px_40px_-14px_rgba(29,170,97,0.7),inset_0_1px_0_rgba(255,255,255,0.28)] hover:bg-[#178f51] hover:bg-none",
    kind === "email" &&
      !dark &&
      "bg-[linear-gradient(135deg,#0a2391_0%,#061773_45%,#040f4d_100%)] text-white shadow-[0_18px_40px_-14px_rgba(6,23,115,0.65),inset_0_1px_0_rgba(255,255,255,0.22)]",
    kind === "email" &&
      dark &&
      "bg-white/8 bg-none text-white shadow-[inset_0_0_0_1px_rgba(255,255,255,0.28),0_18px_40px_-18px_rgba(0,0,0,0.55)] backdrop-blur-[6px] hover:bg-white/14",
    sizes[size],
    // after the sizes: cn() would drop a line height followed by a font size
    "leading-[1.2]",
  );
}

/** Green "live" dot followed by a short reassurance line. */
export const ctaNote = "mt-4 flex items-center gap-2 text-14";
/** Green "live" dot: a ring pulses out of it. */
export const livePing =
  "relative after:absolute after:inset-0 after:animate-live-ping after:rounded-full after:bg-[#3bd47e]";

export const ctaDot = cn("size-2 flex-none rounded-full bg-[#3bd47e]", livePing);
