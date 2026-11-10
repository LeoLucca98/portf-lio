"use client";

import Link from "next/link";
import { ArrowUpRight, X } from "lucide-react";
import { useEffect, useMemo, useRef, useState } from "react";
import type { Pillar, SiteContent } from "@/content/types";
import { pillarColor } from "@/components/ui/PillarDot";

export type Source = { key: string; label: string; href: string; isCase: boolean; detail: string };
type Skill = { id: string; label: string; pillar: Pillar; sources: string[] };
type Group = { pillar: Pillar; title: string; description: string; skills: Skill[] };

type Selection = { kind: "skill"; id: string } | { kind: "source"; key: string } | null;

/**
 * Skills and the projects that prove them, linked both ways. Selecting a skill
 * lights up its evidence; selecting a project lights up what it proves.
 */
export function SkillsMap({ groups, sources, s }: { groups: Group[]; sources: Source[]; s: SiteContent["skills"] }) {
  const [sel, setSel] = useState<Selection>(null);
  const [hover, setHover] = useState<Selection>(null);
  const active = hover ?? sel;
  const root = useRef<HTMLDivElement>(null);

  // The selection card floats on small screens; drop it once the map is out of view.
  useEffect(() => {
    const el = root.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => {
      if (e && !e.isIntersecting) setSel(null);
    });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const skills = useMemo(() => groups.flatMap((g) => g.skills), [groups]);
  const counts = useMemo(() => {
    const m = new Map<string, number>();
    skills.forEach((k) => k.sources.forEach((src) => m.set(src, (m.get(src) ?? 0) + 1)));
    return m;
  }, [skills]);
  const max = Math.max(...counts.values());

  const skillOn = (k: Skill) =>
    !active || (active.kind === "skill" ? active.id === k.id : k.sources.includes(active.key));
  const sourceOn = (src: Source) =>
    !active || (active.kind === "source" ? active.key === src.key : skills.find((k) => k.id === active.id)?.sources.includes(src.key));

  const toggle = (next: NonNullable<Selection>) =>
    setSel((cur) => (cur && JSON.stringify(cur) === JSON.stringify(next) ? null : next));

  const summary = (() => {
    if (!sel) return null;
    if (sel.kind === "skill") {
      const k = skills.find((x) => x.id === sel.id)!;
      const list = sources.filter((src) => k.sources.includes(src.key));
      return { title: k.label, color: pillarColor[k.pillar], text: `${s.provenIn}: ${list.map((l) => l.label).join(", ")}`, links: list };
    }
    const src = sources.find((x) => x.key === sel.key)!;
    return { title: src.label, color: "var(--color-fg)", text: `${counts.get(src.key) ?? 0} ${s.provesCount}`, links: [src] };
  })();

  return (
    <div ref={root} className="grid gap-x-10 gap-y-12 lg:grid-cols-12">
      <div className="space-y-4 lg:col-span-8">
        <p className="text-[0.95rem] text-muted lg:hidden">{s.hint}</p>
        {groups.map((g, gi) => (
          <div
            key={g.pillar}
            className="relative overflow-hidden rounded-[24px] border border-line bg-bg p-6 md:p-8"
            data-reveal
            style={{ ["--d" as string]: `${gi * 70}ms` }}
          >
            <span aria-hidden className="absolute inset-y-0 left-0 w-px" style={{ background: `linear-gradient(180deg, transparent, ${pillarColor[g.pillar]}, transparent)` }} />
            <div className="flex flex-wrap items-baseline gap-x-4 gap-y-1">
              <h3 className="flex items-center gap-3 text-[1.6rem] font-medium tracking-tight">
                <span aria-hidden className="h-2.5 w-2.5 rounded-full" style={{ background: pillarColor[g.pillar] }} />
                {g.title}
              </h3>
              <p className="em-serif text-[1.3rem] text-muted">{g.description}</p>
            </div>
            <ul className="mt-6 flex flex-wrap gap-2" role="list">
              {g.skills.map((k) => {
                const on = skillOn(k);
                const picked = sel?.kind === "skill" && sel.id === k.id;
                return (
                  <li key={k.id}>
                    <button
                      type="button"
                      aria-pressed={picked}
                      onClick={() => toggle({ kind: "skill", id: k.id })}
                      onMouseEnter={() => setHover({ kind: "skill", id: k.id })}
                      onMouseLeave={() => setHover(null)}
                      onFocus={() => setHover({ kind: "skill", id: k.id })}
                      onBlur={() => setHover(null)}
                      className="group inline-flex items-center gap-2.5 rounded-2xl border py-2 pl-3.5 pr-2.5 text-left text-[0.95rem] sm:rounded-full transition-[opacity,border-color,background-color,color] duration-300"
                      style={{
                        opacity: on ? 1 : 0.42,
                        borderColor: picked || (active && on) ? `color-mix(in oklab, ${pillarColor[g.pillar]} 65%, transparent)` : "var(--color-line-strong)",
                        background: picked ? `color-mix(in oklab, ${pillarColor[g.pillar]} 14%, transparent)` : active && on ? `color-mix(in oklab, ${pillarColor[g.pillar]} 7%, transparent)` : "transparent",
                      }}
                    >
                      <span className="text-fg">{k.label}</span>
                      <span
                        aria-hidden
                        className="flex h-5 min-w-5 items-center justify-center rounded-full px-1.5 font-mono text-[0.72rem] text-muted"
                        style={{ background: "var(--color-surface-3)" }}
                      >
                        {k.sources.length}
                      </span>
                      <span className="sr-only">
                        ({s.evidenceLabel}: {k.sources.length})
                      </span>
                    </button>
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
      </div>

      <div className="lg:col-span-4">
        <div className="lg:sticky lg:top-[calc(var(--nav-h)+32px)]">
          <div
            className={`mb-5 rounded-2xl border border-line bg-surface-1 p-4 lg:min-h-[6.5rem] ${summary ? "max-lg:fixed max-lg:inset-x-4 max-lg:bottom-4 max-lg:z-40 max-lg:border-line-strong max-lg:shadow-[0_20px_60px_-10px_rgba(0,0,0,0.9)]" : "max-lg:hidden"}`}
            aria-live="polite"
          >
            {summary ? (
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="font-medium tracking-tight" style={{ color: summary.color }}>
                    {summary.title}
                  </p>
                  <p className="mt-1 text-[0.92rem] leading-relaxed text-muted">{summary.text}</p>
                  <ul className="mt-3 flex flex-wrap gap-1.5" role="list">
                    {summary.links.map((l) => (
                      <li key={l.key}>
                        <Link
                          href={l.href}
                          className="inline-flex items-center gap-1 rounded-full border border-line-strong px-2.5 py-1 text-[0.85rem] text-fg transition-colors hover:border-fg/40"
                        >
                          {sel?.kind === "source" ? `${s.open} ${l.label}` : l.label}
                          <ArrowUpRight size={13} strokeWidth={1.75} aria-hidden />
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
                <button
                  type="button"
                  onClick={() => setSel(null)}
                  className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-muted hover:bg-surface-2 hover:text-fg"
                  aria-label={s.clear}
                >
                  <X size={15} strokeWidth={1.75} aria-hidden />
                </button>
              </div>
            ) : (
              <p className="text-[0.92rem] leading-relaxed text-muted">{s.hint}</p>
            )}
          </div>
          <p className="label text-[0.75rem] text-muted">{s.sourcesTitle}</p>
          <ul className="mt-4 divide-y divide-line border-y border-line" role="list">
            {sources.map((src) => {
              const on = sourceOn(src);
              const picked = sel?.kind === "source" && sel.key === src.key;
              const n = counts.get(src.key) ?? 0;
              return (
                <li
                  key={src.key}
                  className="flex items-center gap-2 transition-opacity duration-300"
                  style={{ opacity: on ? 1 : 0.42 }}
                  onMouseEnter={() => setHover({ kind: "source", key: src.key })}
                  onMouseLeave={() => setHover(null)}
                >
                  <button
                    type="button"
                    aria-pressed={picked}
                    onClick={() => toggle({ kind: "source", key: src.key })}
                    onFocus={() => setHover({ kind: "source", key: src.key })}
                    onBlur={() => setHover(null)}
                    className={`flex min-w-0 flex-1 flex-col gap-2 py-3 pl-3 text-left transition-colors ${picked ? "bg-surface-2" : "hover:bg-surface-1"}`}
                  >
                    <span className="flex items-baseline justify-between gap-3 pr-2">
                      <span className="truncate text-[1rem] font-medium tracking-tight text-fg">{src.label}</span>
                      <span className="label shrink-0 text-[0.7rem] text-faint">{src.isCase ? s.caseKind : s.expKind}</span>
                    </span>
                    <span className="flex items-center gap-3 pr-2">
                      <span aria-hidden className="relative h-[3px] flex-1 overflow-hidden rounded-full bg-line">
                        <span
                          className="absolute inset-y-0 left-0 rounded-full bg-gradient-to-r from-negocio via-produto to-tecnologia transition-[width] duration-500"
                          style={{ width: `${(n / max) * 100}%` }}
                        />
                      </span>
                      <span className="shrink-0 text-[0.8rem] text-muted">
                        {n} {s.provesCount}
                      </span>
                    </span>
                  </button>
                  <Link
                    href={src.href}
                    className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-muted transition-colors hover:bg-surface-2 hover:text-fg"
                    aria-label={`${s.open} ${src.label}`}
                  >
                    <ArrowUpRight size={16} strokeWidth={1.75} aria-hidden />
                  </Link>
                </li>
              );
            })}
          </ul>

        </div>
      </div>
    </div>
  );
}
