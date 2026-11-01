import { cn } from "@/lib/cn";

const tones = {
  white: "bg-white",
  mist: "bg-mist",
  pale: "bg-pale",
  navy: "relative isolate bg-field-navy text-white",
};

export function Section({
  tone = "white",
  id,
  className,
  children,
}: {
  tone?: keyof typeof tones;
  id?: string;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <section id={id} className={cn("scroll-mt-24 py-20 md:py-28", tones[tone], className)}>
      {children}
    </section>
  );
}

export function SectionHeading({
  kicker,
  title,
  intro,
  light = false,
  as: Heading = "h2",
  className,
}: {
  kicker?: React.ReactNode;
  title: React.ReactNode;
  intro?: React.ReactNode;
  light?: boolean;
  as?: "h1" | "h2";
  className?: string;
}) {
  return (
    <div className={cn("max-w-[44rem]", className)}>
      {kicker && (
        <p className={cn("mb-4 text-14 font-medium", light ? "text-cream" : "text-ai")}>{kicker}</p>
      )}
      <Heading
        className={cn(
          "text-2rem leading-[1.12] font-semibold tracking-tight text-balance md:text-2.6rem",
          light ? "text-white" : "text-sg",
        )}
      >
        {title}
      </Heading>
      {intro && (
        <p className={cn("mt-5 text-17 leading-1.7", light ? "text-white/75" : "text-ink/65")}>
          {intro}
        </p>
      )}
    </div>
  );
}
