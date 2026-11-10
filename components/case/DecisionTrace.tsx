"use client";

import { ChevronDown } from "lucide-react";
import { useState } from "react";
import type { Decision, SiteContent } from "@/content/types";

type Labels = Pick<SiteContent["caseUi"], "context" | "question" | "alternatives" | "choice" | "outcome" | "expandAll" | "collapseAll">;

/**
 * A decision as a trace: context and constraint, the question, documented
 * alternatives, the choice and its consequence. Each node carries the colour
 * of the side of the cycle it belongs to.
 */
export function DecisionTrace({ items, labels }: { items: Decision[]; labels: Labels }) {
  const [open, setOpen] = useState<Set<number>>(() => new Set([0]));
  const all = open.size === items.length;

  const toggle = (i: number) =>
    setOpen((prev) => {
      const n = new Set(prev);
      if (n.has(i)) n.delete(i);
      else n.add(i);
      return n;
    });

  return (
    <div>
      <div className="mb-4 flex justify-end">
        <button
          type="button"
          onClick={() => setOpen(all ? new Set() : new Set(items.map((_, i) => i)))}
          className="label rounded-full border border-line px-3 py-1.5 text-[0.72rem] text-muted transition-colors hover:border-line-strong hover:text-fg"
        >
          {all ? labels.collapseAll : labels.expandAll}
        </button>
      </div>
      <ol className="space-y-3" role="list">
        {items.map((d, i) => {
          const isOpen = open.has(i);
          return (
            <li key={d.title} className={`rounded-2xl border transition-colors duration-300 ${isOpen ? "border-line-strong bg-surface-1" : "border-line bg-transparent"}`}>
              <h3>
                <button
                  type="button"
                  aria-expanded={isOpen}
                  aria-controls={`decision-${i}`}
                  onClick={() => toggle(i)}
                  className="flex w-full items-center gap-4 px-5 py-4 text-left md:px-6"
                >
                  <span className="label w-6 shrink-0 text-[0.72rem] text-produto">{String(i + 1).padStart(2, "0")}</span>
                  <span className="flex-1">
                    <span className="block text-[1.08rem] font-medium tracking-tight">{d.title}</span>
                    <span className="em-serif mt-0.5 block text-[1.1rem] text-muted">{d.question}</span>
                  </span>
                  <ChevronDown size={18} strokeWidth={1.75} aria-hidden className={`shrink-0 text-muted transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`} />
                </button>
              </h3>
              <div id={`decision-${i}`} className="disclosure" data-open={isOpen}>
                <div inert={!isOpen}>
                  <ol className="relative px-5 pb-6 md:px-6" role="list">
                    <Node tone="var(--color-negocio)" label={labels.context}>
                      {d.context}
                    </Node>
                    {d.alternatives && d.alternatives.length > 0 && (
                      <Node tone="var(--color-muted)" label={labels.alternatives}>
                        <ul className="space-y-1.5" role="list">
                          {d.alternatives.map((a) => (
                            <li key={a} className="flex gap-2.5">
                              <span aria-hidden className="mt-[0.7em] h-px w-2.5 shrink-0 bg-faint" />
                              <span>{a}</span>
                            </li>
                          ))}
                        </ul>
                      </Node>
                    )}
                    <Node tone="var(--color-produto)" label={labels.choice} strong>
                      {d.choice}
                    </Node>
                    <Node tone="var(--color-tecnologia)" label={labels.outcome} last>
                      {d.outcome}
                    </Node>
                  </ol>
                </div>
              </div>
            </li>
          );
        })}
      </ol>
    </div>
  );
}

function Node({
  tone,
  label,
  children,
  strong,
  last,
}: {
  tone: string;
  label: string;
  children: React.ReactNode;
  strong?: boolean;
  last?: boolean;
}) {
  return (
    <li className="relative grid grid-cols-[2.5rem_1fr] pb-5 last:pb-0">
      {!last && <span aria-hidden className="absolute bottom-0 left-[0.69rem] top-5 w-px bg-line-strong" />}
      <span aria-hidden className="relative z-10 mt-1.5 flex h-3 w-3 items-center justify-center rounded-full border" style={{ borderColor: tone, background: strong ? tone : "var(--color-bg)" }} />
      <div>
        <p className="label text-[0.7rem]" style={{ color: tone }}>
          {label}
        </p>
        <div className={`mt-1 text-[0.97rem] leading-relaxed ${strong ? "text-fg" : "text-fg/80"}`}>{children}</div>
      </div>
    </li>
  );
}
