import { useLocale } from "next-intl";
import { ArrowUpRight, Check, MessageSquare, UserRound } from "@/components/icons";
import { Container } from "@/components/ui/container";
import { Link } from "@/i18n/navigation";
import { cn } from "@/lib/cn";

/*
 * Second section of the home: why AI pays off inside the management system rather than in a
 * chat on the side. The thesis is shown, not claimed: two small pictures of the same job,
 * then the study that says why most AI pilots return nothing.
 */

const COPY = {
  it: {
    kicker: "Il metodo Galilei",
    title: "Perché l'AI rende di più dentro il gestionale",
    body: [
      "Molte aziende provano l'AI con una chat a parte. Si copia un testo, si chiede una risposta e si incolla il risultato da un'altra parte. Per le domande funziona, per il lavoro di tutti i giorni molto meno, perché a fare da ponte tra un programma e l'altro resta sempre una persona.",
      "L'AI rende di più dove passano già richieste, ordini e documenti, perché lì trova i dati in ordine e può preparare il lavoro senza che nessuno glieli copi. Per questo partiamo dal gestionale: prima mettiamo in ordine i passaggi, poi l'AI lavora dentro quei passaggi, e una persona del tuo team approva quello che conta.",
    ],
    side: {
      title: "L'AI in una chat a parte",
      steps: [
        "La richiesta arriva per mail",
        "Qualcuno la copia nella chat",
        "Qualcuno incolla la risposta nel gestionale",
        "Qualcuno avvisa i colleghi",
      ],
    },
    inside: {
      title: "L'AI dentro il gestionale",
      steps: [
        "La richiesta arriva nel gestionale",
        "Il sistema la legge e prepara il lavoro",
        "Una persona controlla e approva",
        "Promemoria e avvisi partono da soli",
      ],
    },
    who: { person: "una persona", system: "il sistema", mail: "la mail" },
    stat: "dei progetti pilota di AI generativa nelle aziende non ha portato un ritorno misurabile. Lo studio indica come causa il collegamento con il lavoro di tutti i giorni, non il modello.",
    source: "MIT NANDA, 2025",
    link: "Leggi il metodo Galilei",
  },
  en: {
    kicker: "The Galilei method",
    title: "Why AI pays off more inside the management system",
    body: [
      "Many companies try AI in a chat on the side. You copy a text, ask for an answer and paste the result somewhere else. It works for questions, much less for everyday work, because a person is still the bridge between one program and the next.",
      "AI pays off where requests, orders and documents already pass, because there it finds the data in order and can prepare the work without anyone copying it over. That is why we start from the management system: first we put the steps in order, then the AI works inside those steps, and someone on your team approves what matters.",
    ],
    side: {
      title: "AI in a chat on the side",
      steps: [
        "The request arrives by email",
        "Someone copies it into the chat",
        "Someone pastes the answer into the system",
        "Someone tells the colleagues",
      ],
    },
    inside: {
      title: "AI inside the management system",
      steps: [
        "The request arrives in the system",
        "The system reads it and prepares the work",
        "A person checks and approves",
        "Reminders and notices go out on their own",
      ],
    },
    who: { person: "a person", system: "the system", mail: "email" },
    stat: "of generative AI pilots in companies brought no measurable return. The study points to the link with everyday work as the cause, not the model.",
    source: "MIT NANDA, 2025",
    link: "Read the Galilei method",
  },
};

export function AiInside() {
  const t = COPY[useLocale() === "en" ? "en" : "it"];
  return (
    <section className="bg-white py-20 md:py-28">
      <Container>
        <div className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)] lg:gap-16">
          <div className="max-w-[36rem]">
            <p className="text-14 font-semibold text-sand-ink">{t.kicker}</p>
            <h2 className="mt-3 text-[2rem] leading-1.15 font-semibold -tracking-2 text-balance text-sg md:text-[2.6rem]">
              {t.title}
            </h2>
            {t.body.map((p) => (
              <p key={p} className="mt-5 text-17 leading-1.75 text-ink/75">
                {p}
              </p>
            ))}
            <div className="mt-8 rounded-18 bg-sand p-6">
              <p className="text-15 leading-1.7 text-ink/80">
                <span className="mr-1.5 text-[1.9rem] leading-none font-semibold -tracking-2 text-sg">
                  95%
                </span>
                {t.stat}
              </p>
              <p className="mt-3 flex flex-wrap items-center justify-between gap-3 text-13 text-ink/55">
                {t.source}
                <Link
                  href="/metodo"
                  className="inline-flex items-center gap-1 font-medium text-sg underline decoration-1 underline-offset-4 hover:decoration-2"
                >
                  {t.link}
                  <ArrowUpRight size={14} aria-hidden="true" />
                </Link>
              </p>
            </div>
          </div>
          <div className="grid gap-4 self-center sm:grid-cols-2">
            <Lane
              title={t.side.title}
              steps={t.side.steps}
              who={(i) => (i === 0 ? t.who.mail : t.who.person)}
              muted
            />
            <Lane
              title={t.inside.title}
              steps={t.inside.steps}
              who={(i) => (i === 2 ? t.who.person : t.who.system)}
            />
          </div>
        </div>
      </Container>
    </section>
  );
}

/** One way of doing the same job: four steps, each marked with who does it. */
function Lane({
  title,
  steps,
  who,
  muted = false,
}: {
  title: string;
  steps: string[];
  who: (i: number) => string;
  muted?: boolean;
}) {
  return (
    <div
      className={cn(
        "rounded-18 p-5 md:p-6",
        muted ? "bg-mist ring-1 ring-line" : "bg-sg text-white shadow-surface-3",
      )}
    >
      <p className={cn("text-15 font-semibold", muted ? "text-ink/70" : "text-white")}>{title}</p>
      <ol className="relative mt-5 space-y-4">
        {/* the line the work travels along; it moves only where the system carries it */}
        <span
          aria-hidden="true"
          className={cn(
            "absolute top-3 bottom-3 left-[13px] w-px",
            muted
              ? "bg-[repeating-linear-gradient(to_bottom,var(--color-line)_0_4px,transparent_4px_8px)]"
              : "animate-flow-line bg-[repeating-linear-gradient(to_bottom,rgba(235,220,190,0.75)_0_4px,transparent_4px_8px)] bg-[length:1px_16px] motion-reduce:animate-none",
          )}
        />
        {steps.map((step, i) => {
          const person = muted ? i > 0 : i === 2;
          return (
            <li key={step} className="relative flex gap-3">
              <span
                className={cn(
                  "grid size-[27px] flex-none place-items-center rounded-full",
                  muted
                    ? "bg-white text-ink/45 ring-1 ring-line"
                    : person
                      ? "bg-cream text-sg"
                      : "bg-white/12 text-cream ring-1 ring-white/20",
                )}
              >
                {person ? (
                  <UserRound size={13} strokeWidth={2.2} aria-hidden="true" />
                ) : i === steps.length - 1 ? (
                  <Check size={13} strokeWidth={2.6} aria-hidden="true" />
                ) : (
                  <MessageSquare size={13} strokeWidth={2.2} aria-hidden="true" />
                )}
              </span>
              <span>
                <span
                  className={cn("block text-14 leading-snug", muted ? "text-ink/75" : "text-white")}
                >
                  {step}
                </span>
                <span
                  className={cn(
                    "mt-0.5 block text-12 font-medium",
                    muted ? "text-ink/40" : person ? "text-cream" : "text-white/50",
                  )}
                >
                  {who(i)}
                </span>
              </span>
            </li>
          );
        })}
      </ol>
    </div>
  );
}
