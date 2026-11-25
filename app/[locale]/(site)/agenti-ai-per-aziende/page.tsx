import { LandingPage, landingMetadata } from "@/components/landing/landing-page";

const PATH = "/agenti-ai-per-aziende";

export const generateMetadata = () => landingMetadata(PATH);

export default function Page() {
  return <LandingPage path={PATH} />;
}
