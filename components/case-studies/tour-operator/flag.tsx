import { cn } from "@/lib/cn";

export type FlagCode = "tr" | "ch" | "nl" | "by" | "tx" | "it";

const belarusDiamonds = [0.6, 3.6, 6.6, 9.6, 12.6, 15.6];

/** Small flags of the places we have worked in. */
export function Flag({ code, className }: { code: FlagCode; className?: string }) {
  return (
    <svg
      viewBox="0 0 30 20"
      aria-hidden="true"
      className={cn(
        "block overflow-hidden rounded-[3px] shadow-[0_0_0_1px_rgba(6,23,115,.12),0_4px_10px_-4px_rgba(6,23,115,.35)]",
        className,
      )}
    >
      {code === "tr" && (
        <>
          <rect width="30" height="20" fill="#E30A17" />
          <circle cx="11" cy="10" r="5" fill="#fff" />
          <circle cx="12.25" cy="10" r="4" fill="#E30A17" />
          <polygon
            points="14.00,10.00 15.80,9.42 15.80,7.53 16.91,9.06 18.70,8.47 17.59,10.00 18.70,11.53 16.91,10.94 15.80,12.47 15.80,10.58"
            fill="#fff"
          />
        </>
      )}
      {code === "ch" && (
        <>
          <rect width="30" height="20" fill="#DA291C" />
          <rect x="13" y="4" width="4" height="12" fill="#fff" />
          <rect x="9" y="8" width="12" height="4" fill="#fff" />
        </>
      )}
      {code === "nl" && (
        <>
          <rect width="30" height="20" fill="#21468B" />
          <rect width="30" height="13.34" fill="#fff" />
          <rect width="30" height="6.67" fill="#AE1C28" />
        </>
      )}
      {code === "by" && (
        <>
          <rect width="30" height="20" fill="#4AA657" />
          <rect width="30" height="13.34" fill="#C8313E" />
          <rect width="3" height="20" fill="#fff" />
          {belarusDiamonds.map((y) => (
            <path
              key={y}
              d={`M1.5 ${y} L2.6 ${y + 1.2} L1.5 ${y + 2.4} L0.4 ${y + 1.2}Z`}
              fill="#C8313E"
            />
          ))}
        </>
      )}
      {code === "tx" && (
        <>
          <rect width="30" height="20" fill="#BF0A30" />
          <rect x="10" width="20" height="10" fill="#fff" />
          <rect width="10" height="20" fill="#002868" />
          <polygon
            points="5.00,6.60 5.76,8.95 8.23,8.95 6.24,10.40 7.00,12.75 5.00,11.30 3.00,12.75 3.76,10.40 1.77,8.95 4.24,8.95"
            fill="#fff"
          />
        </>
      )}
      {code === "it" && (
        <>
          <rect width="30" height="20" fill="#CE2B37" />
          <rect width="20" height="20" fill="#fff" />
          <rect width="10" height="20" fill="#009246" />
        </>
      )}
    </svg>
  );
}
