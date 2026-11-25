import { LandingPage, landingMetadata } from "@/components/landing/landing-page";

const PATH = "/agenzie-partner";

export const generateMetadata = () => landingMetadata(PATH);

export default function Page() {
  return <LandingPage path={PATH} />;
}
