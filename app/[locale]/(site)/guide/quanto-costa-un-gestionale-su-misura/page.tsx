import { LandingPage, landingMetadata } from "@/components/landing/landing-page";

const PATH = "/guide/quanto-costa-un-gestionale-su-misura";

export const generateMetadata = () => landingMetadata(PATH);

export default function Page() {
  return <LandingPage path={PATH} />;
}
