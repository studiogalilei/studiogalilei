import { cn } from "@/lib/cn";

/** Navy square with a step number, for numbered lists. */
export function StepNumber({ n, className }: { n: number; className?: string }) {
  return (
    <span
      className={cn(
        "grid size-9 place-items-center rounded-10 bg-sg text-15 font-semibold text-white",
        className,
      )}
    >
      {n}
    </span>
  );
}
