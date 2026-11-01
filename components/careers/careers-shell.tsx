"use client";

import { useState } from "react";
import { Link } from "@/i18n/navigation";
import { Container } from "@/components/ui/container";
import { cn } from "@/lib/cn";

/**
 * "Lavora con noi" opens straight on the Member Club form; the link under it reveals the
 * full presentation page (intro, map, values and call to action).
 */
export function CareersShell({
  intro,
  values,
  form,
  formLabel,
  showPageLabel,
}: {
  intro: React.ReactNode;
  values: React.ReactNode;
  form: React.ReactNode;
  formLabel: string;
  showPageLabel: string;
}) {
  const [formOnly, setFormOnly] = useState(true);
  return (
    <>
      {!formOnly && intro}
      <section className={cn("bg-white", formOnly ? "pt-10 pb-14" : "pb-20 md:pb-28")}>
        <Container>
          {!formOnly && values}
          {/* the form used to be an iframe, which kept the pointer away from the card tilt */}
          <div
            id="candidatura"
            data-no-tilt
            role="region"
            aria-label={formLabel}
            className={cn(
              "mx-auto max-w-[56rem] scroll-mt-24 overflow-hidden rounded-18 bg-white shadow-surface-3",
              !formOnly && "mt-8",
            )}
          >
            {form}
          </div>
          {formOnly && (
            <p className="mt-[22px] text-center text-15 font-semibold">
              <Link
                href="/lavora-con-noi"
                onClick={(e) => {
                  e.preventDefault();
                  setFormOnly(false);
                  window.scrollTo(0, 0);
                }}
                className="text-sg underline underline-offset-4"
              >
                {showPageLabel}
              </Link>
            </p>
          )}
        </Container>
      </section>
    </>
  );
}

/** The brush arrow scrolls smoothly down to the form. */
export function ScrollToFormButton({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={() => document.getElementById("candidatura")?.scrollIntoView({ behavior: "smooth" })}
      aria-label={label}
      className="mt-5 block text-sg transition-transform hover:translate-y-1"
    >
      {children}
    </button>
  );
}
