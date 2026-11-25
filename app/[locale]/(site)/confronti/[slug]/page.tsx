import { notFound } from "next/navigation";
import { Suspense } from "react";
import { LandingPage, landingMetadata } from "@/components/landing/landing-page";
import { compares } from "@/lib/landing/compare";

const path = (slug: string) => `/confronti/${slug}`;
const known = (slug: string) => compares.some((c) => c.path === path(slug));

export const ensureStatic = "navigation";

export function generateStaticParams() {
  return compares.map((c) => ({ slug: c.path.split("/").pop()! }));
}

export async function generateMetadata({ params }: PageProps<"/[locale]/confronti/[slug]">) {
  const { slug } = await params;
  return known(slug) ? landingMetadata(path(slug)) : {};
}

export default function ComparePage({ params }: PageProps<"/[locale]/confronti/[slug]">) {
  return (
    <Suspense>
      <CompareContent params={params} />
    </Suspense>
  );
}

async function CompareContent({ params }: Pick<PageProps<"/[locale]/confronti/[slug]">, "params">) {
  const { slug } = await params;
  if (!known(slug)) notFound();
  return <LandingPage path={path(slug)} />;
}
