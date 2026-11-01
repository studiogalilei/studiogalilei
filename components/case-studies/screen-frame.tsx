/**
 * Renders a fixed 1100×680 app mock-up scaled down to the available width.
 *
 * The scale factor is the frame's width divided by 1100px, computed in CSS: `tan(atan2(a, b))`
 * turns the ratio of two lengths into a plain number (`100cqw` is the frame's width, since the
 * frame is the size container). No JavaScript, so the frame renders at its final size on the
 * server and never needs hydration.
 */
export function ScreenFrame({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div
      role="img"
      aria-label={label}
      className="@container relative aspect-[1100/680] w-full overflow-hidden bg-white"
    >
      <div
        aria-hidden="true"
        className="absolute top-0 left-0 h-[680px] w-[1100px] origin-top-left [transform:scale(tan(atan2(100cqw,1100px)))]"
      >
        {children}
      </div>
    </div>
  );
}
