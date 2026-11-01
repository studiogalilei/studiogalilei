import { useTranslations } from "next-intl";
import { ChevronRight } from "@/components/icons";
import { Container } from "@/components/ui/container";
import { Link } from "@/i18n/navigation";

export type Crumb = { label: string; href?: string };

/** Navy page header with breadcrumb, kicker, title and intro (all inner pages). */
export function PageHero({
  crumbs,
  kicker,
  title,
  intro,
  accent,
  children,
}: {
  crumbs?: Crumb[];
  kicker?: React.ReactNode;
  title: React.ReactNode;
  intro?: React.ReactNode;
  accent?: string;
  children?: React.ReactNode;
}) {
  const t = useTranslations("Common");
  return (
    <section className="relative isolate bg-field-navy pt-14 pb-32 text-white md:pt-20 md:pb-40">
      <Container>
        {crumbs && crumbs.length > 0 && (
          <nav aria-label={t("percorso")} className="mb-10 md:mb-14">
            <ol className="flex flex-wrap items-center gap-1.5 text-13 text-white/60">
              {crumbs.map((crumb, i) => (
                <li key={crumb.label} className="flex items-center gap-1.5">
                  {i > 0 && <ChevronRight size={13} aria-hidden="true" />}
                  {crumb.href ? (
                    <Link href={crumb.href} className="hover:text-white">
                      {crumb.label}
                    </Link>
                  ) : (
                    <span className="text-white/90" aria-current="page">
                      {crumb.label}
                    </span>
                  )}
                </li>
              ))}
            </ol>
          </nav>
        )}
        <div className="grid gap-12 md:grid-cols-[minmax(0,1fr)_auto] md:items-end">
          <div className="max-w-[46rem]">
            {kicker && (
              <p className="mb-4 text-14 font-medium" style={{ color: accent ?? "#EBDCBE" }}>
                {kicker}
              </p>
            )}
            <h1 className="text-2rem leading-[1.08] font-semibold -tracking-3 text-balance min-[380px]:text-2.4rem md:text-[3.4rem]">
              {title}
            </h1>
            {intro && (
              <p className="mt-6 max-w-[38rem] text-18 leading-1.7 text-white/75">{intro}</p>
            )}
          </div>
          {children}
        </div>
      </Container>
    </section>
  );
}
