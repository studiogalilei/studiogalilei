import { Cog, Globe, Telescope } from "@/components/icons";

/** Icon for each principle of the Galilei method: observable, governable, replicable. */
export function PrincipleIcon({ index }: { index: number }) {
  if (index === 0)
    return (
      <Telescope size={22} strokeWidth={1.75} className="flex-none text-sg" aria-hidden="true" />
    );
  if (index === 1)
    return <Globe size={22} strokeWidth={1.75} className="flex-none text-sg" aria-hidden="true" />;
  if (index === 2)
    return (
      <span className="relative inline-block size-[22px] flex-none text-sg" aria-hidden="true">
        <Cog size={16} strokeWidth={1.9} className="absolute top-0 left-0" />
        <Cog size={12} strokeWidth={2.1} className="absolute right-0 bottom-0" />
      </span>
    );
  return null;
}
