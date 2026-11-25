import { useLocale, useTranslations } from "next-intl";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section";
import { BookingPicker, type BookingLabels } from "./booking-picker";

const LABELS: (keyof BookingLabels)[] = [
  "loading",
  "error",
  "retry",
  "empty",
  "pickDay",
  "pickTime",
  "timezone",
  "name",
  "email",
  "website",
  "optional",
  "back",
  "confirm",
  "sending",
  "taken",
  "failed",
  "doneTitle",
  "doneText",
  "another",
  "chosen",
];

/** "Book an intro call": our own calendar, fed by Cal.com (see booking-picker.tsx). */
export function Booking() {
  const t = useTranslations("Booking");
  const locale = useLocale();
  const labels = Object.fromEntries(LABELS.map((k) => [k, t(k)])) as BookingLabels;
  return (
    <section
      id="sg-prenota"
      data-no-tilt
      aria-label={t("title")}
      className="bg-white pt-4 pb-20 md:pb-28"
    >
      <Container>
        <SectionHeading kicker={t("kicker")} title={t("title")} intro={t("intro")} />
        <div className="mt-10 max-w-[52rem]">
          <BookingPicker locale={locale} labels={labels} />
        </div>
      </Container>
    </section>
  );
}
