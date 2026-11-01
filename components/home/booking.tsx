import { useTranslations } from "next-intl";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section";

const CALENDAR =
  "https://calendar.google.com/calendar/appointments/schedules/AcZssZ3IEaJVbjMTE-_AwwhPk2C3G1ye1CePkAmbz1nfaqYOcFLdN2xdHYCWsLY6t6q1SuFZ8e2nCrxs";

/** "Book an intro call": the Google Calendar appointment page, embedded. */
export function Booking() {
  const t = useTranslations("Booking");
  return (
    <section
      id="sg-prenota"
      data-no-tilt
      aria-label={t("title")}
      className="bg-white pt-4 pb-20 md:pb-28"
    >
      <Container>
        <SectionHeading kicker={t("kicker")} title={t("title")} intro={t("intro")} />
        <div className="mt-10 overflow-hidden rounded-18 border border-sg/10 bg-white shadow-surface-2">
          <iframe
            src={`${CALENDAR}?gv=true`}
            title={t("title")}
            loading="lazy"
            className="block h-[760px] w-full border-0 max-md:h-[880px]"
          />
        </div>
        <p className="mt-4 text-right text-14">
          <a
            href={CALENDAR}
            target="_blank"
            rel="noopener"
            className="font-medium text-sg underline decoration-1 underline-offset-4 hover:decoration-2"
          >
            {t("openCalendar")}
          </a>
        </p>
      </Container>
    </section>
  );
}
