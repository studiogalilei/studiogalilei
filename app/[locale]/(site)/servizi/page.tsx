import { useTranslations } from "next-intl";
import { CoffeeCta } from "@/components/sections/cta-band";
import { Globe } from "@/components/services/globe";
import { Container } from "@/components/ui/container";
import { pageMetadata } from "@/lib/metadata";

export const generateMetadata = () => pageMetadata("services");

type CatalogGroup = { title: string; items: string[] };

export default function ServicesPage() {
  const t = useTranslations("Services");
  const catalog = t.raw("catalog") as CatalogGroup[];

  return (
    <>
      <section className="bg-white pt-20 pb-20 md:pt-28 md:pb-24">
        <Container>
          <h1 className="text-2.2rem leading-none font-semibold -tracking-3 text-sg md:text-2.8rem">
            {t("title")}
          </h1>
          <div className="mt-10 grid gap-16 md:mt-12 lg:grid-cols-[minmax(0,560px)_1fr] lg:gap-20">
            <ol className="max-w-[560px]">
              {catalog.map((group) => (
                <li key={group.title} className="border-t border-sg/12 pt-6 pb-8 last:border-b">
                  <h2 className="flex items-baseline gap-0 text-17 font-semibold text-sg">
                    {group.title}
                  </h2>
                  <ul className="mt-4 space-y-2">
                    {group.items.map((item) => (
                      <li key={item} className="text-15 leading-snug text-ink/65">
                        {item}
                      </li>
                    ))}
                  </ul>
                </li>
              ))}
            </ol>
            <div>
              <div className="lg:sticky lg:top-28">
                <Globe />
              </div>
            </div>
          </div>
        </Container>
      </section>
      <CoffeeCta />
    </>
  );
}
