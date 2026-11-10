import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { CaseSection, SiteContent, Locale } from "@/content/types";
import { isVisible, showPending } from "@/lib/flags";
import { resolveRef } from "@/lib/content";
import { Pending } from "@/components/ui/Pending";
import { DecisionTrace } from "./DecisionTrace";
import { TriageWalkthrough } from "./TriageWalkthrough";

export function visibleSections(sections: CaseSection[]) {
  return sections.filter((s) => isVisible(s as Parameters<typeof isVisible>[0]));
}

export function CaseBlocks({ sections, ui, locale }: { sections: CaseSection[]; ui: SiteContent["caseUi"]; locale: Locale }) {
  return (
    <div className="space-y-20 md:space-y-28">
      {visibleSections(sections).map((s) => (
        <section key={s.id} id={s.id} aria-labelledby={`${s.id}-h`} className="scroll-mt-28" data-reveal>
          <h2 id={`${s.id}-h`} className="flex items-center gap-3 text-h3 font-medium">
            {s.title}
            {s.restricted && <span className="label rounded-full border border-negocio/50 px-2 py-0.5 text-[0.7rem] text-negocio">{ui.restricted}</span>}
          </h2>
          {s.pending && showPending && <Pending label={ui.pending}>{s.pending}</Pending>}
          <div className="mt-7">
            <Block s={s} ui={ui} locale={locale} />
          </div>
        </section>
      ))}
    </div>
  );
}

function Block({ s, ui, locale }: { s: CaseSection; ui: SiteContent["caseUi"]; locale: Locale }) {
  switch (s.kind) {
    case "text":
      return (
        <div className="max-w-[62ch] space-y-5 text-lg leading-relaxed text-fg/85">
          {s.paragraphs.map((p) => (
            <p key={p}>{p}</p>
          ))}
        </div>
      );
    case "split":
      return (
        <div className="grid gap-4 md:grid-cols-[1.4fr_1fr]">
          <div className="rounded-2xl border border-produto/35 bg-produto/[0.04] p-6">
            <p className="label text-[0.72rem] text-produto">{ui.mine}</p>
            <ul className="mt-4 space-y-3" role="list">
              {s.mine.map((m) => (
                <li key={m} className="flex gap-3 text-[0.98rem] leading-relaxed text-fg">
                  <span aria-hidden className="mt-[0.7em] h-1.5 w-1.5 shrink-0 rounded-full bg-produto" />
                  {m}
                </li>
              ))}
            </ul>
          </div>
          <div className="rounded-2xl border border-line p-6">
            <p className="label text-[0.72rem] text-muted">{ui.team}</p>
            <ul className="mt-4 space-y-3" role="list">
              {s.team.map((t) => (
                <li key={t} className="flex gap-3 text-[0.95rem] leading-relaxed text-muted">
                  <span aria-hidden className="mt-[0.7em] h-1.5 w-1.5 shrink-0 rounded-full border border-faint" />
                  {t}
                </li>
              ))}
            </ul>
          </div>
        </div>
      );
    case "artifacts":
      return (
        <>
          <p className="max-w-[60ch] text-lg text-muted">{s.intro}</p>
          <ul className="mt-8 grid gap-px overflow-hidden rounded-2xl border border-line bg-line sm:grid-cols-2" role="list">
            {s.items.map((a) => (
              <li key={a.name} className="group bg-bg p-5 transition-colors duration-300 hover:bg-surface-1">
                <p className="font-medium tracking-tight text-fg">{a.name}</p>
                <p className="mt-1.5 text-[0.95rem] leading-relaxed text-muted">{a.why}</p>
              </li>
            ))}
          </ul>
        </>
      );
    case "decisions":
      return (
        <>
          {s.intro && <p className="mb-6 max-w-[60ch] text-lg text-muted">{s.intro}</p>}
          {s.items.length > 0 && (
            <DecisionTrace
              items={s.items.filter((d) => !d.restricted)}
              labels={{
                context: ui.context,
                question: ui.question,
                alternatives: ui.alternatives,
                choice: ui.choice,
                outcome: ui.outcome,
                expandAll: ui.expandAll,
                collapseAll: ui.collapseAll,
              }}
            />
          )}
        </>
      );
    case "walkthrough":
      return (
        <>
          <p className="mb-6 max-w-[60ch] text-lg text-muted">{s.intro}</p>
          <TriageWalkthrough steps={s.steps} disclaimer={s.disclaimer} labels={{ next: ui.next, prev: ui.prev, step: ui.step }} />
        </>
      );
    case "results": {
      const items = s.items.filter((i) => isVisible({ ...i, paragraphs: i.note ? undefined : [] }));
      return (
        <>
          <ul className="grid gap-4 sm:grid-cols-2" role="list">
            {items.map((r) =>
              r.pending && !r.note ? (
                <li key={r.label} className="sm:col-span-2">
                  <Pending label={ui.pending}>{`${r.label}: ${r.pending}`}</Pending>
                </li>
              ) : (
                <li key={r.label} className="flex flex-col rounded-2xl border border-line bg-surface-1 p-6">
                  <span
                    className={`label self-start rounded-full border px-2 py-0.5 text-[0.7rem] ${
                      r.scope === "individual" ? "border-produto/40 text-produto" : "border-line-strong text-muted"
                    }`}
                  >
                    {r.scope === "individual" ? ui.individual : ui.team_scope}
                  </span>
                  {r.value && <p className="mt-5 text-5xl font-medium leading-none tracking-[-0.04em]">{r.value}</p>}
                  <p className={`${r.value ? "mt-3" : "mt-5"} text-[1.05rem] font-medium tracking-tight`}>{r.label}</p>
                  <p className="mt-2 text-[0.93rem] leading-relaxed text-muted">{r.note}</p>
                </li>
              ),
            )}
          </ul>
          {s.footnote && <p className="mt-5 text-sm text-faint">{s.footnote}</p>}
        </>
      );
    }
    case "modules":
      return (
        <>
          <p className="max-w-[60ch] text-lg text-muted">{s.intro}</p>
          <ul className="mt-8 grid gap-4 sm:grid-cols-3" role="list" aria-label={s.role}>
            {s.items.map((m, i) => (
              <li key={m.name} className="relative flex flex-col overflow-hidden rounded-2xl border border-produto/30 bg-surface-1 p-6">
                <span aria-hidden className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-produto to-transparent" />
                <span className="label text-[0.72rem] text-produto">{String(i + 1).padStart(2, "0")}</span>
                <p className="mt-4 text-[1.4rem] font-medium leading-tight tracking-tight">{m.name}</p>
                {m.description && <p className="mt-2 text-[0.95rem] leading-relaxed text-muted">{m.description}</p>}
                {m.pending && !m.description && <Pending label={ui.pending}>{m.pending}</Pending>}
              </li>
            ))}
          </ul>
        </>
      );
    case "bridge": {
      const ref = resolveRef(locale, s.ref);
      return (
        <Link
          href={ref.href}
          className="group relative block overflow-hidden rounded-[24px] border border-produto/40 bg-gradient-to-br from-produto/[0.10] to-transparent p-7 transition-colors duration-300 hover:border-produto/70 md:p-9"
        >
          {s.paragraphs.map((p) => (
            <p key={p} className="max-w-[48ch] text-xl leading-snug text-fg md:text-2xl">
              {p}
            </p>
          ))}
          <span className="mt-6 inline-flex items-center gap-2 text-produto">
            {s.cta} <ArrowRight size={17} strokeWidth={1.75} className="arrow-shift" aria-hidden />
          </span>
        </Link>
      );
    }
  }
}
