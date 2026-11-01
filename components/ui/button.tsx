import { Link } from "@/i18n/navigation";
import { cn } from "@/lib/cn";

const variants = {
  primary: "bg-sg text-white hover:bg-sg-deep",
  light: "bg-white text-sg hover:bg-pale",
  "ghost-light": "border border-white/35 text-white hover:border-white/70 hover:bg-white/[0.06]",
  outline: "border border-sg/25 text-sg hover:border-sg/60",
};

export type ButtonVariant = keyof typeof variants;

const base =
  "inline-flex items-center justify-center rounded-10 px-6 py-3.5 text-15 font-medium transition-colors duration-150";

export function ButtonLink({
  href,
  variant = "primary",
  className,
  children,
}: {
  href: string;
  variant?: ButtonVariant;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <Link href={href} className={cn(base, variants[variant], className)}>
      {children}
    </Link>
  );
}

/** A `<button>` with the same look as the links, e.g. a form's submit button. */
export function Button({
  variant = "primary",
  className,
  type = "button",
  ...props
}: React.ComponentProps<"button"> & { variant?: ButtonVariant }) {
  return (
    <button
      type={type}
      className={cn(
        base,
        "disabled:cursor-not-allowed disabled:opacity-60",
        variants[variant],
        className,
      )}
      {...props}
    />
  );
}

export function DownloadLink({
  href,
  filename,
  variant = "primary",
  className,
  children,
}: {
  href: string;
  filename: string;
  variant?: ButtonVariant;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <a href={href} download={filename} className={cn(base, "gap-2", variants[variant], className)}>
      {children}
    </a>
  );
}
