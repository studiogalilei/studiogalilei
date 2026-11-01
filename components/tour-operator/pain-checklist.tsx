"use client";

import { cn } from "@/lib/cn";
import { useTour, WhatsAppLink } from "./context";
import { CheckIcon, WhatsAppIcon } from "./icons";
import { button } from "./ui";

/**
 * "Tap the ones that sound familiar": picking at least two pain points reveals a WhatsApp
 * button that sends them, as picked, in the message.
 */
export function PainChecklist({
  label,
  items,
  cta,
  ctaButton,
}: {
  label: string;
  items: { title: string; text: string }[];
  cta: React.ReactNode;
  ctaButton: string;
}) {
  const { picked, togglePain } = useTour();
  const count = picked.filter(Boolean).length;
  return (
    <>
      <div className="flex items-center gap-3.5 px-4 pt-3.5 pb-4 text-13.5 text-ink/55">
        {label}
        <div className="h-1.5 flex-1 overflow-hidden rounded-md bg-pale">
          <div
            className="h-full rounded-md bg-[linear-gradient(90deg,var(--color-ai),var(--color-sg))] transition-[width] duration-500 ease-[cubic-bezier(.2,.7,.2,1)]"
            style={{ width: `${(count / items.length) * 100}%` }}
          />
        </div>
        <b className="min-w-[34px] text-right font-semibold text-sg">
          {`${count}/${items.length}`}
        </b>
      </div>
      <div>
        {items.map(({ title, text }, i) => (
          <button
            key={title}
            type="button"
            aria-pressed={picked[i]}
            onClick={() => togglePain(i)}
            className={cn(
              "group grid w-full cursor-pointer grid-cols-[32px_1fr] items-start gap-3.5 rounded-14 border-0 bg-transparent p-4 text-left text-15.5 leading-[1.6] font-normal text-ink/70 transition-[background,box-shadow,transform] duration-200 hover:bg-mist aria-pressed:bg-pale max-tour-sm:grid-cols-[28px_1fr] max-tour-sm:gap-3 max-tour-sm:px-3 max-tour-sm:py-[13px] max-tour-sm:text-15",
              i > 0 && "mt-0.5",
            )}
          >
            <span className="mt-px grid size-[26px] place-items-center rounded-lg border-[1.5px] border-sg/22 text-white transition-[background,border-color,transform] duration-200 group-aria-pressed:border-sg group-aria-pressed:bg-sg">
              <CheckIcon className="size-3.5 scale-[.4] opacity-0 [transition:opacity_.2s,scale_.25s_cubic-bezier(.2,.7,.2,1)] group-aria-pressed:scale-100 group-aria-pressed:opacity-100" />
            </span>
            <span>
              <b className="font-semibold text-sg">{title}</b> {text}
            </span>
          </button>
        ))}
      </div>
      <div
        className={cn(
          "grid grid-rows-[0fr] transition-[grid-template-rows] duration-[450ms] ease-[cubic-bezier(.2,.7,.2,1)]",
          count >= 2 && "grid-rows-[1fr]",
        )}
      >
        <div className="overflow-hidden">
          <div className="mx-0.5 mt-2.5 mb-1 flex flex-wrap items-center justify-between gap-x-[22px] gap-y-4 rounded-2xl bg-sg-deep p-[22px] text-white max-tour-sm:p-[18px]">
            <p className="max-w-[300px] text-15.5 leading-[1.5] [&_b]:block [&_b]:text-17 [&_b]:text-white">
              {cta}
            </p>
            <WhatsAppLink pain className={button({ kind: "whatsapp", size: "pain" })}>
              <WhatsAppIcon />
              <span>{ctaButton}</span>
            </WhatsAppLink>
          </div>
        </div>
      </div>
    </>
  );
}
