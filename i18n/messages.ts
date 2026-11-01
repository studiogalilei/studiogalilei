import type { Locale } from "./routing";

// One JSON file per namespace and locale: messages/<locale>/<Namespace>.json
export const namespaces = [
  "Common",
  "Metadata",
  "Header",
  "Footer",
  "Home",
  "ContactForm",
  "WorldMap",
  "Booking",
  "About",
  "Services",
  "Service",
  "GoogleAds",
  "CaseStudies",
  "CaseTourOperator",
  "CaseDanInk",
  "CaseOnlySolutions",
  "Careers",
  "Contact",
  "Privacy",
  "TourOperator",
] as const;

export type Namespace = (typeof namespaces)[number];

export async function loadMessages(locale: Locale) {
  const entries = await Promise.all(
    namespaces.map(
      async (ns) => [ns, (await import(`../messages/${locale}/${ns}.json`)).default] as const,
    ),
  );
  return Object.fromEntries(entries) as Messages;
}

type Messages = { [N in Namespace]: Record<string, unknown> };
