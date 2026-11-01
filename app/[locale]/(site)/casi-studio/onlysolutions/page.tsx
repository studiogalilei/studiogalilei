import { OnlySolutionsCase } from "@/components/case-studies/onlysolutions/onlysolutions-case";
import { pageMetadata } from "@/lib/metadata";

export const generateMetadata = () => pageMetadata("caseOnlySolutions");

export default function OnlySolutionsPage() {
  return <OnlySolutionsCase />;
}
