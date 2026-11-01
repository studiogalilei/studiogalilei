import { useTranslations } from "next-intl";
import { ButtonLink } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { cn } from "@/lib/cn";

/** Navy rounded band with a short message and a light button. */
export function CtaBand({
  kicker,
  title,
  text,
  href = "/contatti",
  label,
  className = "bg-white",
}: {
  kicker?: React.ReactNode;
  title?: React.ReactNode;
  text?: React.ReactNode;
  href?: string;
  label: React.ReactNode;
  className?: string;
}) {
  return (
    <section className={cn("pt-4 pb-24 md:pb-32", className)}>
      <Container>
        <div className="relative isolate grid gap-8 overflow-hidden rounded-22 bg-field-navy px-8 py-12 shadow-surface-dark md:grid-cols-[1fr_auto] md:items-center md:px-14 md:py-16">
          <div className="max-w-[40rem]">
            {kicker && <p className="mb-3 text-14 font-medium text-cream">{kicker}</p>}
            {title && (
              <h2 className="text-1.75rem leading-1.15 font-semibold -tracking-2 text-balance text-white md:text-2.2rem">
                {title}
              </h2>
            )}
            {text &&
              (title ? (
                <p className="mt-4 text-16 leading-1.7 text-white/75">{text}</p>
              ) : (
                <p className="text-19 leading-[1.6] font-medium text-white/90 md:text-22">{text}</p>
              ))}
          </div>
          <ButtonLink href={href} variant="light">
            {label}
          </ButtonLink>
        </div>
      </Container>
    </section>
  );
}

/** "Caffè o videochiamata?" band, closing most pages. */
export function CoffeeCta({ className }: { className?: string }) {
  const t = useTranslations("Common");
  return (
    <CtaBand
      title={t("caffeOVideochiamata")}
      text={t("siamoQuiPerAscoltartiUnCaffeOUna")}
      label={t("scriviciAdesso")}
      className={className}
    />
  );
}
