import type { Pillar } from "@/content/types";

export const pillarColor: Record<Pillar, string> = {
  negocio: "var(--color-negocio)",
  produto: "var(--color-produto)",
  tecnologia: "var(--color-tecnologia)",
};

export function PillarDot({ pillar, className = "" }: { pillar: Pillar; className?: string }) {
  return <span aria-hidden className={`inline-block h-1.5 w-1.5 rounded-full ${className}`} style={{ background: pillarColor[pillar] }} />;
}
