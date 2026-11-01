import { cn } from "@/lib/cn";

export const PRIVACY_EMAIL = "giacomo@studiogalilei.com";
export const GOOGLE_USER_DATA_POLICY =
  "https://developers.google.com/terms/api-services-user-data-policy";
export const GOOGLE_PERMISSIONS = "https://myaccount.google.com/permissions";

const link = "font-medium text-sg underline decoration-1 underline-offset-4 hover:decoration-2";

export function PrivacyEmail() {
  return (
    <a href={`mailto:${PRIVACY_EMAIL}`} className={link}>
      {PRIVACY_EMAIL}
    </a>
  );
}

export function ExternalLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <a href={href} target="_blank" rel="noopener noreferrer" className={link}>
      {children}
    </a>
  );
}

/** One numbered section of the notice. */
export function PrivacySection({
  id,
  n,
  label,
  title,
  children,
}: {
  id: string;
  n: string;
  label: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section
      id={id}
      className="scroll-mt-28 border-t border-sg/10 py-12 first:border-t-0 first:pt-0 md:py-14"
    >
      <p className="text-14 font-medium text-ai">
        {n} · {label}
      </p>
      <h2 className="mt-2 text-1.6rem leading-tight font-semibold -tracking-2 text-sg md:text-[1.9rem]">
        {title}
      </h2>
      <div className="mt-6 space-y-4 text-16 leading-[1.8] text-ink/75">{children}</div>
    </section>
  );
}

export function Bullets({ items, className }: { items: string[]; className?: string }) {
  return (
    <ul className={cn("space-y-3", className)}>
      {items.map((item) => (
        <li key={item} className="flex gap-3">
          <span aria-hidden="true" className="mt-[0.7em] size-1.5 flex-none rounded-full bg-sg" />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}
