import { notFound } from "next/navigation";

// Unknown addresses answer 404 with the page in not-found.tsx (they used to redirect home,
// which search engines read as a broken page pretending to be a good one).
export default function UnknownPage() {
  notFound();
}
