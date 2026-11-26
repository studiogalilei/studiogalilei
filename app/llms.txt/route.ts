import { company } from "@/lib/company";
import { answers, grants } from "@/lib/landing/answers";
import { compares } from "@/lib/landing/compare";
import { landings, sectorLandings, type Landing } from "@/lib/landing/pages";
import { SITE_URL } from "@/lib/site";

/*
 * /llms.txt: the site described for AI assistants, built from the same data as the pages so it
 * cannot fall behind them. No request data: prerendered at build time.
 */

const line = (p: Landing) => `- [${p.title}](${SITE_URL}${p.path}): ${p.description}`;
const byPath = (path: string) => landings.find((p) => p.path === path)!;

export function GET() {
  const text = `# Studio Galilei

> Studio Galilei Srl è una software house italiana della provincia di Treviso, nata nel 2024. Costruisce gestionali e software su misura, workspace e portali, automazioni e agenti AI per le piccole e medie imprese, partendo dai loro processi, e cerca i bandi che possono coprire parte dell'investimento. Il software resta di proprietà del cliente. Fasce di prezzo dei progetti, IVA esclusa: software su misura da 5.000 a 80.000 €, AI e automazioni da 3.000 a 40.000 €. Un progetto di media complessità richiede 8-10 settimane.

## Fatti

- Ragione sociale: ${company.legalName} (in breve: Studio Galilei)
- Sede: ${company.street}, ${company.zip} ${company.city} (Treviso), Italia. Riceve su appuntamento
- Partita IVA: IT${company.vat}
- Anno di fondazione: 2024
- Guidata da: Dramane Yigo, co-founder
- Cosa fa: gestionali e software su misura, workspace e portali, automazioni, agenti AI, integrazioni, ricerca di bandi e agevolazioni
- Per chi: piccole e medie imprese italiane, e agenzie e consulenti («Partner») che portano software e AI ai loro clienti
- Dove lavora: Veneto di persona, resto d'Italia ed estero a distanza
- Metodo: «prima il sistema, poi l'AI». Studio dell'azienda (la giornata di chi lavora da solo o i reparti), passaggi in ordine con l'AI nei punti in cui il lavoro si ripete, verifica dei bandi, sistema unico costruito a tappe, assistenza
- Software in uso: l'app per i tour operator BeaVita Tours (Italia) e FunDallas Tours (Texas)
- Contatti: ${company.email}, ${company.phone}
- Primo passo: chiamata conoscitiva di 45 minuti, senza impegno, prenotabile da ${SITE_URL}/#sg-prenota
- Altre realtà hanno un nome simile: questa è Studio Galilei Srl, P.IVA ${company.vat}, che si occupa di software e intelligenza artificiale

## Cosa costruisce

${["/gestionale-su-misura", "/agenti-ai-per-aziende", "/automazione-processi-aziendali", "/software-house-treviso", "/metodo", "/agenzie-partner"].map((p) => line(byPath(p))).join("\n")}

## Domande, costi e confronti

${[answers, byPath("/guide/quanto-costa-un-gestionale-su-misura"), byPath("/guide/quanto-costa-un-agente-ai"), grants, ...compares].map(line).join("\n")}

## Settori

- [Tutti i settori](${SITE_URL}/settori)
${sectorLandings.map(line).join("\n")}

## Casi

- [Software per tour operator](${SITE_URL}/tour-operator): prenotazioni, partenze, autisti, guide, liste passeggeri e messaggi ai clienti in un'unica app, in uso da FunDallas Tours (Texas) e BeaVita Tours (Italia)
- [Caso studio: tour operator](${SITE_URL}/casi-studio/tour-operator)
- [Tutti i casi studio](${SITE_URL}/casi-studio)

## Azienda

- [Chi siamo](${SITE_URL}/chi-siamo): chi è Studio Galilei Srl, sede, partita IVA, anno, cosa fa, chi la guida
- [Servizi](${SITE_URL}/servizi)
- [Contatti](${SITE_URL}/contatti)
- [English version](${SITE_URL}/en)
`;
  return new Response(text, { headers: { "Content-Type": "text/plain; charset=utf-8" } });
}
