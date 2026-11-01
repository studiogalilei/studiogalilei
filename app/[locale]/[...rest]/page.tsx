import { redirect } from "next/navigation";

// Unknown addresses go to the home page, as on the original site.
export default function UnknownPage() {
  redirect("/");
}
