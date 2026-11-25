import { redirect } from "next/navigation";
import { Suspense } from "react";
import { LandingPage, landingMetadata } from "@/components/landing/landing-page";
import { sectors } from "@/lib/landing/sectors";

const known = (slug: string) => sectors.some((s) => s.slug === slug);

export const ensureStatic = "navigation";

export function generateStaticParams() {
  return sectors.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps<"/[locale]/settori/[slug]">) {
  const { slug } = await params;
  return known(slug) ? landingMetadata(`/settori/${slug}`) : {};
}

export default function SectorPage({ params }: PageProps<"/[locale]/settori/[slug]">) {
  // the slug is URL data, so it is read inside a boundary (every industry is still prerendered)
  return (
    <Suspense>
      <SectorContent params={params} />
    </Suspense>
  );
}

async function SectorContent({ params }: Pick<PageProps<"/[locale]/settori/[slug]">, "params">) {
  const { slug } = await params;
  if (!known(slug)) redirect("/settori");
  return <LandingPage path={`/settori/${slug}`} />;
}
