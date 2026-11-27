import Image from "next/image";
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
        <div className="flex flex-col-reverse gap-8 lg:flex-row lg:items-center lg:gap-12">
          <SectionHeading kicker={t("kicker")} title={t("title")} intro={t("intro")} />
          {/* hand-drawn scene (Open Peeps, CC0): consultant and owner in front of the flow */}
          <Image
            src="/images/disegni/prima-ora.svg"
            alt=""
            width={1200}
            height={700}
            unoptimized
            className="w-full max-w-[22rem] lg:max-w-[26rem] lg:flex-1"
          />
        </div>
        <div className="mt-10 max-w-[52rem]">
          <BookingPicker locale={locale} labels={labels} />
        </div>
      </Container>
    </section>
  );
}
