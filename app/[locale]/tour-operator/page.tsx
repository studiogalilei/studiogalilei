import type { Metadata, Viewport } from "next";
import { Cases } from "@/components/tour-operator/cases";
import { TourProvider } from "@/components/tour-operator/context";
import { Lightbox, StickyBar, TourEffects } from "@/components/tour-operator/effects";
import { TourHeader } from "@/components/tour-operator/header";
import { Hero } from "@/components/tour-operator/hero";
import {
  Band,
  Faq,
  Final,
  Modules,
  Pain,
  Steps,
  Strip,
  TourFooter,
} from "@/components/tour-operator/sections";

export const metadata: Metadata = {
  title: "Software for tour operators",
  description:
    "Custom software for tour operators: bookings, departures, drivers, guides, passenger lists and customer messages in one app. Live at FunDallas Tours (Texas) and BeaVita Tours (Italy).",
  robots: { index: false },
};

export const viewport: Viewport = { themeColor: "#040F4D", viewportFit: "cover" };

/** Landing page for tour operators, standalone (no site header and footer). */
export default function TourOperatorPage() {
  return (
    // the root layout's body styles are the main site's: keep the original's text rendering
    <TourProvider className="text-16 leading-[1.6] [text-rendering:auto]">
      <TourHeader />
      <Hero />
      <Strip />
      <Pain />
      <Cases />
      <Band />
      <Modules />
      <Steps />
      <Faq />
      <Final />
      <TourFooter />
      <Lightbox />
      <StickyBar />
      <TourEffects />
    </TourProvider>
  );
}
