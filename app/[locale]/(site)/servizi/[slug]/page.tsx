import { getTranslations } from "next-intl/server";
import { redirect } from "next/navigation";
import { Suspense } from "react";
import { LogoTree } from "@/components/logo";
import { CtaBand } from "@/components/sections/cta-band";
import { PageHero } from "@/components/sections/page-hero";
import { isServiceSlug, services } from "@/components/services/services";
import { ButtonLink } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { Link } from "@/i18n/navigation";
import { pageMetadata } from "@/lib/metadata";

type Feature = { title: string; desc: string };

export const ensureStatic = "navigation";

export function generateStaticParams() {
  return services.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps<"/[locale]/servizi/[slug]">) {
  const { slug } = await params;
  return pageMetadata(isServiceSlug(slug) ? slug : "services");
}

export default function ServicePage({ params }: PageProps<"/[locale]/servizi/[slug]">) {
  // the slug is URL data, so it is read inside a boundary (every known slug is still prerendered)
  return (
    <Suspense>
      <ServiceContent params={params} />
    </Suspense>
  );
}

async function ServiceContent({ params }: Pick<PageProps<"/[locale]/servizi/[slug]">, "params">) {
  const { slug } = await params;
  // unknown service addresses go to the home page, as on the original site
  if (!isServiceSlug(slug)) redirect("/");
  const t = await getTranslations("Service");
  const service = services.find((s) => s.slug === slug)!;
  const others = services.filter((s) => s.slug !== slug);
  const name = t(`${slug}.name`);
  const features = t.raw(`${slug}.features`) as Feature[];

  return (
    <>
      <PageHero
        crumbs={[
          { label: "Home", href: "/" },
          { label: t("services"), href: "/servizi" },
          { label: name },
        ]}
        kicker={name}
        accent={service.accent}
        title={t(`${slug}.tagline`)}
        intro={t(`${slug}.description`)}
      >
        <div className="flex flex-col items-start gap-8 md:items-end">
          <span
            className="hidden size-28 place-items-center rounded-22 text-white shadow-[0_30px_60px_-20px_rgba(1,4,30,.7)] md:grid"
            style={{ background: service.color }}
            aria-hidden="true"
          >
            <LogoTree className="h-16 w-auto" />
          </span>
          <ButtonLink href="/contatti" variant="light">
            {t("talkToUs")}
          </ButtonLink>
        </div>
      </PageHero>
      <Container className="relative z-2 -mt-18 md:-mt-22">
        <ul className="grid gap-px overflow-hidden rounded-18 bg-white shadow-surface-3 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature) => (
            <li key={feature.title} className="bg-white p-8">
              <span
                aria-hidden="true"
                className="block h-[3px] w-8 rounded-full"
                style={{ background: service.color }}
              />
              <h2 className="mt-5 text-18 font-semibold text-sg">{feature.title}</h2>
              <p className="mt-2 text-15 leading-1.7 text-ink/65">{feature.desc}</p>
            </li>
          ))}
        </ul>
      </Container>
      {slug === "marketing" && (
        <Container className="relative z-10 mt-6">
          <Link
            href="/servizi/google-ads"
            className="flex items-center justify-between gap-6 rounded-2xl bg-white p-7 shadow-surface-2 md:px-10"
          >
            <span className="flex items-center text-18 font-semibold text-sg">
              Google Ads
              <span className="ml-3 rounded-full bg-mk px-2 py-0.5 text-10 font-semibold text-white">
                {t("offer")}
              </span>
            </span>
            <span className="text-15 font-medium text-sg underline underline-offset-4">
              {t("googleAdsLink")}
            </span>
          </Link>
        </Container>
      )}
      <Section tone="white" className="pb-12 md:pb-16">
        <Container>
          <div className="grid gap-4 sm:grid-cols-2">
            {others.map((other) => (
              <Link
                key={other.slug}
                href={`/servizi/${other.slug}`}
                className="group flex items-center gap-5 rounded-14 bg-white p-6 shadow-surface-1"
              >
                <span
                  className="grid size-11 flex-none place-items-center rounded-10 text-white"
                  style={{ background: other.color }}
                >
                  <LogoTree className="h-6 w-auto" />
                </span>
                <span>
                  <span className="block text-17 font-semibold text-sg group-hover:underline">
                    {t(`${other.slug}.name`)}
                  </span>
                  <span className="mt-0.5 block text-14 text-ink/60">
                    {t(`${other.slug}.tagline`)}
                  </span>
                </span>
              </Link>
            ))}
          </div>
        </Container>
      </Section>
      <CtaBand title={t("ctaTitle")} text={t("ctaText")} label={t("contactUs")} />
    </>
  );
}
