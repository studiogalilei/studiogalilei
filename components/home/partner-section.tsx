import { useTranslations } from "next-intl";
import {
  CalendarDays,
  Database,
  KeyRound,
  LayoutGrid,
  Scale,
  Target,
  Telescope,
  Users,
} from "@/components/icons";
import { ApplyCta } from "@/components/sections/apply-cta";
import { Container } from "@/components/ui/container";
import { Section, SectionHeading } from "@/components/ui/section";
import { cn } from "@/lib/cn";
import { PortalPreview } from "./portal-preview";

type Group = { kicker: string; items: { title: string; desc: string }[] };

// One icon per item, group by group; the last group is the dark one.
const ICONS = [
  [LayoutGrid, Target, Database],
  [Users, CalendarDays, Telescope],
  [KeyRound, Scale],
];

/** "What you get when you work with us": portal preview and what partners receive. */
export function PartnerSection() {
  const t = useTranslations("Home.partners");
  const groups = t.raw("groups") as Group[];
  return (
    <Section tone="mist">
      <Container>
        <div className="grid items-center gap-12 lg:grid-cols-[1fr_1.05fr] lg:gap-16">
          <div>
            <SectionHeading title={t("title")} intro={t("text")} />
          </div>
          <PortalPreview />
        </div>
        <div className="mt-14 grid gap-5 lg:grid-cols-3">
          {groups.map((group, gi) => {
            const dark = gi === groups.length - 1;
            return (
              <div
                key={group.kicker}
                className={cn(
                  "rounded-20 px-7 py-8 md:px-8",
                  dark
                    ? "relative isolate bg-field-navy text-white shadow-surface-dark"
                    : "border border-sg/10 bg-white",
                )}
              >
                <p className={cn("text-15 font-medium", dark ? "text-cream" : "text-ai")}>
                  {group.kicker}
                </p>
                <ul className={cn("mt-2 divide-y", dark ? "divide-white/15" : "divide-sg/10")}>
                  {group.items.map((item, ii) => {
                    const Icon = ICONS[gi]?.[ii];
                    return (
                      <li key={item.title} className="py-6 last:pb-0">
                        <h3
                          className={cn(
                            "flex items-center gap-3 text-18 font-semibold",
                            dark ? "text-white" : "text-sg",
                          )}
                        >
                          {Icon && (
                            <span
                              className={cn(
                                "grid size-9 flex-none place-items-center rounded-10",
                                dark ? "bg-white/12 text-white" : "bg-ai/10 text-ai",
                              )}
                            >
                              <Icon size={18} strokeWidth={2} aria-hidden="true" />
                            </span>
                          )}
                          {item.title}
                        </h3>
                        <p
                          className={cn(
                            "mt-2 text-15 leading-1.75",
                            dark ? "text-white/75" : "text-ink/60",
                          )}
                        >
                          {item.desc}
                        </p>
                      </li>
                    );
                  })}
                </ul>
              </div>
            );
          })}
        </div>
        <div className="mt-10 -mb-10 md:mt-14 md:-mb-14">
          <ApplyCta label={t("apply")} stamps />
        </div>
      </Container>
    </Section>
  );
}
