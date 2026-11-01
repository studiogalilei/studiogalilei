import { DanInkCase } from "@/components/case-studies/dan-ink/dan-ink-case";
import { pageMetadata } from "@/lib/metadata";

export const generateMetadata = () => pageMetadata("caseDanInk");

export default function DanInkPage() {
  return <DanInkCase />;
}
