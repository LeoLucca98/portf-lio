"use client";

import { AnimatePresence, m } from "motion/react";
import { ArrowLeft, ArrowRight, Check, FileText, Search, Sparkles, UserCheck, MessageSquare } from "lucide-react";
import { useRef, useState } from "react";
import type { WalkthroughStep } from "@/content/types";

const icons = {
  ticket: MessageSquare,
  search: Search,
  evidence: FileText,
  suggestion: Sparkles,
  human: UserCheck,
};

const tone = {
  ticket: "var(--color-negocio)",
  search: "var(--color-negocio)",
  evidence: "var(--color-produto)",
  suggestion: "var(--color-produto)",
  human: "var(--color-tecnologia)",
};

export function TriageWalkthrough({
  steps,
  disclaimer,
  labels,
}: {
  steps: WalkthroughStep[];
  disclaimer: string;
  labels: { next: string; prev: string; step: string };
}) {
  const [i, setI] = useState(0);
  const [dir, setDir] = useState(1);
  const live = useRef<HTMLDivElement>(null);
  const step = steps[i]!;
  const Icon = icons[step.sample.kind];

  const go = (n: number) => {
    if (n < 0 || n >= steps.length) return;
    setDir(n > i ? 1 : -1);
    setI(n);
  };

  return (
    <div className="overflow-hidden rounded-[24px] border border-line bg-surface-1">
      {/* Stepper */}
      <ol className="grid grid-cols-5 border-b border-line" role="list">
        {steps.map((s, n) => {
          const done = n < i;
          const on = n === i;
          return (
            <li key={s.id} className="relative">
              <button
                type="button"
                onClick={() => go(n)}
                aria-current={on ? "step" : undefined}
                className={`flex w-full flex-col items-start gap-2 px-3 py-3.5 text-left transition-colors duration-200 md:px-4 ${on ? "text-fg" : "text-faint hover:text-muted"}`}
              >
                <span
                  aria-hidden
                  className="flex h-5 w-5 items-center justify-center rounded-full border text-[0.7rem]"
                  style={{
                    borderColor: on || done ? tone[s.sample.kind] : "var(--color-line-strong)",
                    background: done ? tone[s.sample.kind] : "transparent",
                    color: done ? "var(--color-bg)" : "inherit",
                  }}
                >
                  {done ? <Check size={11} strokeWidth={3} /> : n + 1}
                </span>
                <span className="label hidden text-[0.7rem] sm:block">{s.label}</span>
                <span className="sr-only sm:hidden">{s.label}</span>
              </button>
              <span
                aria-hidden
                className="absolute inset-x-0 bottom-0 h-px origin-left transition-transform duration-500"
                style={{ background: tone[s.sample.kind], transform: `scaleX(${n <= i ? 1 : 0})` }}
              />
            </li>
          );
        })}
      </ol>

      <div className="grid md:grid-cols-[1fr_1.05fr]">
        <div className="p-6 md:p-8">
          <p className="label text-[0.72rem] text-faint">
            {labels.step} {i + 1}/{steps.length} · <span style={{ color: tone[step.sample.kind] }}>{step.label}</span>
          </p>
          <div ref={live} aria-live="polite" aria-atomic="true">
          <AnimatePresence mode="wait" initial={false} custom={dir}>
            <m.div
              key={step.id}
              custom={dir}
              initial={{ opacity: 0, x: dir * 16 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: dir * -16 }}
              transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
            >
              <h3 className="mt-3 text-[1.35rem] font-medium leading-snug tracking-tight">{step.title}</h3>
              <p className="mt-3 text-[0.98rem] leading-relaxed text-muted">{step.body}</p>
            </m.div>
          </AnimatePresence>
          </div>
          <div className="mt-8 flex items-center gap-2">
            <button
              type="button"
              onClick={() => go(i - 1)}
              disabled={i === 0}
              className="inline-flex h-10 items-center gap-2 rounded-full border border-line-strong px-4 text-sm text-fg transition-colors hover:bg-surface-2 disabled:cursor-not-allowed disabled:opacity-35"
            >
              <ArrowLeft size={15} strokeWidth={1.75} aria-hidden /> {labels.prev}
            </button>
            <button
              type="button"
              onClick={() => go(i + 1)}
              disabled={i === steps.length - 1}
              className="inline-flex h-10 items-center gap-2 rounded-full bg-produto px-4 text-sm font-medium text-ink transition-colors hover:bg-[#93a0ff] disabled:cursor-not-allowed disabled:opacity-35"
            >
              {labels.next} <ArrowRight size={15} strokeWidth={1.75} aria-hidden />
            </button>
          </div>
        </div>

        {/* Simulated panel */}
        <div className="relative border-t border-line bg-bg/60 p-6 md:border-l md:border-t-0 md:p-8">
          <div aria-hidden className="dot-grid absolute inset-0 opacity-40" />
          <div className="relative flex min-h-[13rem] flex-col justify-center">
            <AnimatePresence mode="wait" initial={false}>
              <m.div
                key={step.id}
                initial={{ opacity: 0, y: 8, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -6, scale: 0.98 }}
                transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                className="rounded-2xl border bg-surface-2 p-5"
                style={{ borderColor: `color-mix(in oklab, ${tone[step.sample.kind]} 45%, transparent)` }}
              >
                <div className="flex items-center gap-2.5">
                  <span className="flex h-7 w-7 items-center justify-center rounded-lg" style={{ background: `color-mix(in oklab, ${tone[step.sample.kind]} 18%, transparent)`, color: tone[step.sample.kind] }}>
                    <Icon size={15} strokeWidth={1.75} aria-hidden />
                  </span>
                  <span className="label text-[0.7rem] text-muted">{step.label}</span>
                </div>
                <ul className="mt-4 space-y-2.5" role="list">
                  {step.sample.lines.map((l, n) => (
                    <m.li
                      key={l}
                      initial={{ opacity: 0, x: -6 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.12 + n * 0.12, duration: 0.3 }}
                      className={`font-mono text-[0.82rem] leading-relaxed ${n === 0 ? "text-fg" : "text-muted"}`}
                    >
                      {l}
                    </m.li>
                  ))}
                </ul>
              </m.div>
            </AnimatePresence>
          </div>
          <p className="relative mt-5 text-[0.75rem] leading-relaxed text-faint">{disclaimer}</p>
        </div>
      </div>
    </div>
  );
}
