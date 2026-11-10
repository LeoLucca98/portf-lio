import { showPending } from "@/lib/flags";

/** Development-only marker for information that must come from Leonardo. Never rendered in production. */
export function Pending({ children, label = "Pendente" }: { children: string; label?: string }) {
  if (!showPending) return null;
  return (
    <div className="my-4 rounded-xl border border-dashed border-negocio/50 bg-negocio/[0.04] px-4 py-3 text-sm text-negocio" data-pending>
      <span className="label mr-2">{label}</span>
      {children}
    </div>
  );
}
