import { landings, sectorLandings } from "@/lib/landing/pages";
import { SITE_URL } from "@/lib/site";

/*
 * /llms.txt: a plain summary of the site for AI assistants. Built from the same data as the
 * pages, so a text changed on a page never goes stale here.
 */

const url = (path: string) => `${SITE_URL}${path}`;
const line = (title: string, path: string, text?: string) =>
  `- [${title}](${url(path)})${text ? `: ${text}` : ""}`;

export function GET() {
  const body = [
    "# Studio Galilei",
    "",
    "> Studio Galilei Srl è una software house di Treviso (Italia), nata nel 2024. Costruisce gestionali vivi su misura per piccole e medie imprese: software che prepara il lavoro, cioè legge le richieste, compila i preventivi, aggiorna le commesse e manda i promemoria, mentre il team controlla e approva. Prima mette in ordine i passaggi dell'azienda, poi li fa girare con automazioni e agenti AI dentro il gestionale (il metodo «prima il sistema, poi l'AI»). Il software resta di proprietà del cliente. Fasce di prezzo dei progetti, IVA esclusa: gestionali e software su misura da 5.000 a 80.000 €, AI e automazioni da 3.000 a 40.000 €.",
    "",
    "Sede legale: Via Francesco Baracca 81, 31035 Crocetta del Montello (TV). Sede operativa a Treviso, su appuntamento. P.IVA IT05642810260. Contatti: dramane@studiogalilei.com, +39 371 116 9430. Chiamata conoscitiva di 45 minuti prenotabile da https://www.studiogalilei.com/#sg-prenota",
    "",
    "## Cosa facciamo",
    "",
    ...landings.map((l) => line(l.title, l.path, l.description)),
    "",
    "## Settori",
    "",
    line("Tutti i settori", "/settori"),
    ...sectorLandings.map((l) => line(l.title, l.path, l.description)),
    "",
    "## Casi",
    "",
    line(
      "Software per tour operator",
      "/tour-operator",
      "prenotazioni, partenze, autisti, guide, liste passeggeri e messaggi ai clienti in un'unica app, in uso da FunDallas Tours (Texas) e BeaVita Tours (Italia).",
    ),
    line("Caso studio tour operator", "/casi-studio/tour-operator"),
    line("Tutti i casi studio", "/casi-studio"),
    "",
    "## Azienda",
    "",
    line("Chi siamo", "/chi-siamo"),
    line("Servizi", "/servizi"),
    line("Contatti", "/contatti"),
    line("English version", "/en"),
    "",
  ].join("\n");
  return new Response(body, {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
}
