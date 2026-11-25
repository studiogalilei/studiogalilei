import { LandingPage, landingMetadata } from "@/components/landing/landing-page";

const PATH = "/guide/bandi-software-ai";

export const generateMetadata = () => landingMetadata(PATH);

export default function Page() {
  return <LandingPage path={PATH} />;
}
