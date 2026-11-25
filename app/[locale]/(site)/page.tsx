import { AgenciesBand } from "@/components/home/agencies-band";
import { AiInside } from "@/components/home/ai-inside";
import { Booking } from "@/components/home/booking";
import { CaseStudies } from "@/components/home/case-studies";
import { ClientLogos } from "@/components/home/client-logos";
import { Hero } from "@/components/home/hero";
import { PartnerSection } from "@/components/home/partner-section";
import { ServicesGrid } from "@/components/home/services-grid";
import { ClientMessages } from "@/components/client-messages";
import { CoffeeCta } from "@/components/sections/cta-band";
import { WorldMap } from "@/components/sections/world-map";
import { pageMetadata } from "@/lib/metadata";

export const generateMetadata = () => pageMetadata("home");

export default function HomePage() {
  return (
    <ClientMessages namespaces={["Home.hero", "Home.portal"]}>
      <Hero />
      <ClientLogos />
      <AiInside />
      <ServicesGrid />
      <PartnerSection />
      <CaseStudies />
      <AgenciesBand />
      <CoffeeCta />
      <Booking />
      <WorldMap />
    </ClientMessages>
  );
}
