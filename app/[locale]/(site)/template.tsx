import { PageTransition } from "@/components/layout/page-transition";

// between two of the site's pages (the header and footer stay)
export default function SiteTemplate({ children }: { children: React.ReactNode }) {
  return <PageTransition>{children}</PageTransition>;
}
