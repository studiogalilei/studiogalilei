import { Booking } from "@/components/home/booking";
import { CaseStudies } from "@/components/home/case-studies";
import { ClientLogos } from "@/components/home/client-logos";
import { GoogleAdsSection } from "@/components/home/google-ads";
import { Hero } from "@/components/home/hero";
import { PartnerSection } from "@/components/home/partner-section";
import { ServicesGrid } from "@/components/home/services-grid";
import { CoffeeCta } from "@/components/sections/cta-band";
import { WorldMap } from "@/components/sections/world-map";
import { pageMetadata } from "@/lib/metadata";

export const generateMetadata = () => pageMetadata("home");

export default function HomePage() {
  return (
    <>
      <Hero />
      <ClientLogos />
      <ServicesGrid />
      <PartnerSection />
      <CaseStudies />
      <GoogleAdsSection />
      <CoffeeCta />
      <Booking />
      <WorldMap />
    </>
  );
}
