import { cn } from "@/lib/cn";
import { isLate, niceDate, status, type Project } from "./data";
import { Mark } from "./mark";

/*
 * Platform styling notes: the prototype ran on browser defaults (no Tailwind preflight, no
 * site base styles), so controls explicitly restore what it inherited — 14px Arial at 1.5
 * line height, its own focus ring — and phone layouts switch at its 720px breakpoint.
 */

/** Its own focus ring, over the site-wide (unlayered) :focus-visible rule. */
export const focusRing =
  "focus-visible:outline-3! focus-visible:outline-offset-2! focus-visible:outline-[#6c8dfb]!";

/** Buttons inherited the body font (14px, normal weight) and showed a pointer. */
export const buttonBase = cn(
  "cursor-pointer text-14 leading-normal font-normal disabled:cursor-not-allowed disabled:opacity-45",
  focusRing,
);

const icons = {
  building: (
    <path d="M4 21V5a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v16M2 21h20M8 7h1m3 0h1M8 11h1m3 0h1M8 15h1m3 0h1M17 11h3a2 2 0 0 1 2 2v8" />
  ),
  users: (
    <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2M9 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8m8-1a4 4 0 0 0-1-7.9M22 21v-2a4 4 0 0 0-3-3.87" />
  ),
  home: <path d="m3 10 9-7 9 7v11H3zM9 21v-7h6v7" />,
  folder: <path d="M3 5h6l2 2h10v12H3z" />,
  document: <path d="M7 2h7l5 5v15H7zM14 2v5h5M10 12h6m-6 4h6" />,
  check: <path d="m4 12 5 5L20 6" />,
  edit: <path d="m16 4 4 4-11 11H5v-4zM14 6l4 4" />,
  plus: <path d="M12 5v14M5 12h14" />,
  download: <path d="M12 3v12m-5-5 5 5 5-5M4 17v4h16v-4" />,
};

export type IconName = keyof typeof icons;

export function Icon({ name, className }: { name: IconName; className?: string }) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      {icons[name]}
    </svg>
  );
}

export function Brand({
  inverse = false,
  className,
  markClassName,
}: {
  inverse?: boolean;
  className?: string;
  markClassName?: string;
}) {
  return (
    <div
      className={cn(
        "flex items-center gap-[11px] text-17 font-bold tracking-[-.4px]",
        inverse ? "text-white" : "text-sg",
        className,
      )}
    >
      <Mark className={cn("h-10 w-[35px] flex-none", markClassName)} />
      <span>Studio Galilei</span>
    </div>
  );
}

const buttonVariants = {
  primary: "",
  outline: "bg-white text-sg hover:bg-[#f5f6fc]",
  // a neutral button keeps the primary hover background, as in the prototype
  neutral: "border-platform-line bg-white text-platform-ink hover:border-sg",
};

export function buttonClass(variant: keyof typeof buttonVariants = "primary", small = false) {
  return cn(
    buttonBase,
    "inline-flex min-h-10 items-center justify-center gap-[7px] rounded-lg border border-sg bg-sg px-3.5 py-2.5 leading-[1.2] font-bold text-white no-underline hover:bg-[#10258b] focus-visible:rounded-lg! [&_svg]:size-4",
    buttonVariants[variant],
    // (cn drops an earlier leading-* when a text-* size follows, so it is repeated here)
    small && "min-h-[33px] px-2.5 py-[7px] text-12 leading-[1.2]",
  );
}

export function Heading({
  title,
  subtitle,
  actions,
}: {
  title: string;
  subtitle?: string;
  actions?: React.ReactNode;
}) {
  return (
    <div className="mb-[27px] flex items-start justify-between gap-5 max-[721px]:flex-col max-[721px]:items-stretch">
      <div>
        <h1 className="mb-1.5 text-[clamp(25px,3vw,32px)] leading-[1.17] font-bold tracking-[-.8px]">
          {title}
        </h1>
        {subtitle && <p className="m-0 max-w-[780px] text-[#373b48]">{subtitle}</p>}
      </div>
      {actions && <div className="flex flex-wrap gap-2">{actions}</div>}
    </div>
  );
}

export function StatusPill({ project }: { project: Project }) {
  const s = status(project);
  return (
    <span
      className={cn(
        "inline-flex rounded-[20px] bg-[#ecf0ff] px-2.5 py-[5px] text-11 font-bold text-sg",
        s === "Completato" && "bg-[#e8f6ef] text-platform-green",
        s === "Da preparare" && "bg-[#fff5e2] text-[#815400]",
      )}
    >
      {s}
    </span>
  );
}

export function DateMark({ date }: { date: string | null | undefined }) {
  return (
    <span className={cn("font-bold text-sg", isLate(date) && "text-platform-danger")}>
      {niceDate(date)}
    </span>
  );
}

/** Small grey text (`.small` in the prototype). */
export const smallText = "text-12 text-platform-mid";
