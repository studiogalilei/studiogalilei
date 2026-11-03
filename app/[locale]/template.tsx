import { PageTransition } from "@/components/layout/page-transition";

// between the site's pages and the standalone ones (tour operator)
export default function LocaleTemplate({ children }: { children: React.ReactNode }) {
  return <PageTransition>{children}</PageTransition>;
}
