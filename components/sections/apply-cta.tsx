import { useTranslations } from "next-intl";
import { Search } from "@/components/icons";
import { Stamps } from "@/components/sections/stamps";
import { Link } from "@/i18n/navigation";
import { cn } from "@/lib/cn";

/** Big gradient button to the contact page, optionally surrounded by Studio Galilei stamps. */
export function ApplyCta({ label, stamps = false }: { label?: React.ReactNode; stamps?: boolean }) {
  const t = useTranslations("Common");
  return (
    <div className={cn("flex justify-center py-12 md:py-16", stamps && "relative")}>
      {stamps && <Stamps />}
      <Link
        href="/contatti"
        className={cn(
          "group relative inline-flex animate-beacon items-center gap-3.5 overflow-hidden rounded-2xl bg-[linear-gradient(135deg,#0A2391_0%,#061773_45%,#040F4D_100%)] px-8 py-6 text-center text-17 font-semibold text-white shadow-[0_18px_40px_-14px_rgba(6,23,115,.65),inset_0_1px_0_rgba(255,255,255,.22)] ring-1 ring-white/10 transition-transform duration-200 hover:-translate-y-0.5 hover:shadow-[0_24px_48px_-14px_rgba(6,23,115,.75),inset_0_1px_0_rgba(255,255,255,.28)] md:px-12 md:py-7 md:text-[20px]",
          stamps && "z-1",
        )}
      >
        <span
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 top-0 h-1/2 bg-gradient-to-b from-white/15 to-transparent"
        />
        <span
          aria-hidden="true"
          className="pointer-events-none absolute top-0 -left-1/3 h-full w-1/3 -skew-x-12 animate-sweep bg-white/15 blur-md transition-[left] duration-700 group-hover:left-[110%] group-hover:animate-none"
        />
        <Search
          size={24}
          strokeWidth={2.4}
          className="relative flex-none animate-nudge"
          aria-hidden="true"
        />
        <span className="relative">{label ?? t("scopriSePossiamoApplicarloAnche")}</span>
      </Link>
    </div>
  );
}
