"use client";

/** In-page link that scrolls smoothly to its section. */
export function SmoothAnchor({
  target,
  className,
  children,
}: {
  target: string;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <a
      href={`#${target}`}
      onClick={(e) => {
        e.preventDefault();
        document.getElementById(target)?.scrollIntoView({ behavior: "smooth" });
      }}
      className={className}
    >
      {children}
    </a>
  );
}
