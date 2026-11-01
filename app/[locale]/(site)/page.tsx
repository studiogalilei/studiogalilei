import { pageMetadata } from "@/lib/metadata";

export const generateMetadata = () => pageMetadata("home");

export default function HomePage() {
  return <section className="h-[600px] bg-sg-deep" />;
}
