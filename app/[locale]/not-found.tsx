import { ButtonLink } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { Link } from "@/i18n/navigation";

const links = [
  ["/servizi", "Servizi"],
  ["/settori", "Settori"],
  ["/domande", "Domande e risposte"],
  ["/casi-studio", "Casi studio"],
  ["/contatti", "Contatti"],
] as const;

export default function NotFound() {
  return (
    <main className="bg-white py-24 md:py-32">
      <Container>
        <p className="text-14 font-medium text-sand-ink">Errore 404</p>
        <h1 className="mt-3 max-w-[40rem] text-2.2rem leading-1.1 font-semibold -tracking-3 text-sg md:text-[3.2rem]">
          Questa pagina non esiste
        </h1>
        <p className="mt-5 max-w-[36rem] text-17 leading-1.7 text-ink/70">
          L&apos;indirizzo è sbagliato o la pagina è stata spostata. Da qui arrivi a tutto il resto.
        </p>
        <ButtonLink href="/" className="mt-8">
          Torna alla home
        </ButtonLink>
        <ul className="mt-10 flex flex-wrap gap-x-6 gap-y-3 text-16 font-medium">
          {links.map(([href, label]) => (
            <li key={href}>
              <Link
                href={href}
                className="text-sg underline decoration-1 underline-offset-4 hover:decoration-2"
              >
                {label}
              </Link>
            </li>
          ))}
        </ul>
      </Container>
    </main>
  );
}
