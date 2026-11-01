"use client";

import { cn } from "@/lib/cn";
import { EmailLink, WhatsAppLink } from "./context";
import { MailIcon, WhatsAppIcon } from "./icons";
import { button, type ButtonKind, type ButtonSize } from "./ui";

const ring = "[mask:linear-gradient(#000_0_0)_content-box_exclude,linear-gradient(#000_0_0)]";

/**
 * A light travelling around the border: a conic gradient on a square covering the button
 * spins (a compositor-only `rotate` animation) behind a mask that only shows the border.
 */
function Glow({ delay, halo, sticky }: { delay: boolean; halo?: boolean; sticky?: boolean }) {
  return (
    <span
      aria-hidden="true"
      className={cn(
        "pointer-events-none absolute",
        ring,
        halo
          ? "-inset-1 z-0 rounded-[18px] p-1 opacity-60 blur-[3px] motion-reduce:hidden"
          : "inset-0 z-2 rounded-[inherit] p-[1.2px] motion-reduce:bg-[linear-gradient(135deg,rgba(255,255,255,0.7),transparent_50%,rgba(143,208,255,0.6))]",
        halo && sticky && "rounded-2xl",
      )}
    >
      <span
        className={cn(
          "absolute top-1/2 left-1/2 aspect-square w-[120%] -translate-1/2 animate-glow bg-[conic-gradient(transparent_0deg,transparent_200deg,var(--glow-2)_250deg,#fff_318deg,var(--glow-2)_338deg,transparent_360deg)] group-hover/cta:[animation-duration:1.8s] motion-reduce:hidden",
          delay && "[animation-delay:-1.9s]",
        )}
      />
    </span>
  );
}

/** WhatsApp or email conversion button of the tour operator page. */
export function ContactButton({
  kind,
  label,
  pain,
  size = "default",
  dark,
  delayGlow = false,
  lightGlow,
}: {
  kind: ButtonKind;
  label: React.ReactNode;
  /** WhatsApp only: include the pain points picked in the checklist in the message. */
  pain?: boolean;
  size?: ButtonSize;
  dark?: boolean;
  delayGlow?: boolean;
  lightGlow?: boolean;
}) {
  const className = button({ kind, size, dark, lightGlow });
  const content = (
    <>
      <Glow delay={delayGlow} />
      {kind === "whatsapp" ? <WhatsAppIcon /> : <MailIcon />}
      <span>{label}</span>
      <Glow delay={delayGlow} halo sticky={size === "sticky"} />
    </>
  );
  return kind === "whatsapp" ? (
    <WhatsAppLink pain={pain} className={className}>
      {content}
    </WhatsAppLink>
  ) : (
    <EmailLink className={className}>{content}</EmailLink>
  );
}
