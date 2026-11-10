"use client";

import Link from "next/link";
import { ChevronDown } from "lucide-react";
import { useCallback, useEffect, useMemo, useState } from "react";
import type { Experience, SiteContent } from "@/content/types";
import { Pending } from "@/components/ui/Pending";
import { PillarDot, pillarColor } from "@/components/ui/PillarDot";

type Props = {
  experiences: (Experience & { caseLinks: { label: string; href: string }[] })[];
  j: SiteContent["journey"];
  pendingLabel: string;
  /** YYYY-MM of the build, used for "present". */
  now: string;
  locale: "pt" | "en";
  highlightId: string;
};

const START = "2024-01";
const toIndex = (ym: string) => {
  const [y, m] = ym.split("-").map(Number);
  return (y! - 2024) * 12 + (m! - 1);
};

function fmt(ym: string, locale: "pt" | "en", present: string) {
  if (ym === "present") return present;
  const [y, m] = ym.split("-");
  return locale === "pt" ? `${m}/${y}` : `${new Date(Number(y), Number(m) - 1).toLocaleString("en", { month: "short" })} ${y}`;
}

export function Journey({ experiences, j, pendingLabel, now, locale, highlightId }: Props) {
  const total = toIndex(now) - toIndex(START) + 1;
  const [open, setOpen] = useState<Set<string>>(() => new Set());
  const [hover, setHover] = useState<string | null>(null);

  const sorted = useMemo(
    () =>
      [...experiences].sort((a, b) => {
        const ea = a.end === "present" ? now : a.end;
        const eb = b.end === "present" ? now : b.end;
        return eb.localeCompare(ea) || b.start.localeCompare(a.start);
      }),
    [experiences, now],
  );

  // Assign rows inside each lane so overlapping experiences never collide.
  const rows = useMemo(() => {
    const out = new Map<string, { lane: Experience["lane"]; row: number }>();
    for (const lane of ["nees", "tech"] as const) {
      const ends: number[] = [];
      [...experiences]
        .filter((e) => e.lane === lane)
        .sort((a, b) => a.start.localeCompare(b.start))
        .forEach((e) => {
          const s = toIndex(e.start);
          const en = e.end === "present" ? toIndex(now) : toIndex(e.end);
          let row = ends.findIndex((x) => x < s);
          if (row === -1) row = ends.length;
          ends[row] = en;
          out.set(e.id, { lane, row });
        });
    }
    return out;
  }, [experiences, now]);

  const laneRows = (lane: Experience["lane"]) =>
    Math.max(...[...rows.values()].filter((r) => r.lane === lane).map((r) => r.row)) + 1;

  const openOnly = useCallback((id: string) => {
    setOpen((prev) => new Set(prev).add(id));
  }, []);

  useEffect(() => {
    const sync = () => {
      const m = window.location.hash.match(/^#exp-(.+)$/);
      if (m?.[1]) openOnly(m[1]);
    };
    // next/link updates the hash through pushState, which never fires hashchange.
    const onClick = (e: MouseEvent) => {
      const a = (e.target as Element | null)?.closest?.("a[href*='#exp-']");
      const m = a?.getAttribute("href")?.match(/#exp-(.+)$/);
      if (m?.[1]) openOnly(m[1]);
    };
    sync();
    window.addEventListener("hashchange", sync);
    document.addEventListener("click", onClick);
    return () => {
      window.removeEventListener("hashchange", sync);
      document.removeEventListener("click", onClick);
    };
  }, [openOnly]);

  const toggle = (id: string) =>
    setOpen((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });

  const focusFromBar = (id: string) => {
    openOnly(id);
    requestAnimationFrame(() => {
      const el = document.getElementById(`exp-${id}`);
      el?.scrollIntoView({ behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth", block: "center" });
      el?.querySelector<HTMLButtonElement>("button")?.focus({ preventScroll: true });
    });
  };

  const years = [2024, 2025, 2026];

  return (
    <div>
      {/* Overview: parallel lanes (desktop) */}
      <div className="hidden md:block" data-reveal>
        <div className="relative pl-[13rem]" role="group" aria-label={j.overviewLabel}>
          <div className="relative h-6">
            {years.map((y) => {
              const left = ((toIndex(`${y}-01`) - toIndex(START)) / total) * 100;
              return (
                <span key={y} className="label absolute top-0 text-[0.72rem] text-faint" style={{ left: `${left}%` }}>
                  {y}
                </span>
              );
            })}
            <span className="label absolute right-0 top-0 text-[0.72rem] text-produto">{j.present}</span>
          </div>

          {(["nees", "tech"] as const).map((lane) => {
            const n = laneRows(lane);
            return (
              <div key={lane} className="relative border-t border-line py-4">
                <p className="label absolute -left-[13rem] top-4 w-[12rem] text-[0.72rem] leading-relaxed text-muted">{j.lanes[lane]}</p>
                <div className="relative" style={{ height: n * 36 }}>
                  {years.map((y) => (
                    <span
                      key={y}
                      aria-hidden
                      className="absolute inset-y-0 w-px bg-line/70"
                      style={{ left: `${((toIndex(`${y}-01`) - toIndex(START)) / total) * 100}%` }}
                    />
                  ))}
                  {experiences
                    .filter((e) => e.lane === lane)
                    .map((e) => {
                      const s = toIndex(e.start) - toIndex(START);
                      const en = (e.end === "present" ? toIndex(now) : toIndex(e.end)) - toIndex(START) + 1;
                      const left = (s / total) * 100;
                      const width = ((en - s) / total) * 100;
                      const r = rows.get(e.id)!.row;
                      const short = en - s < 4;
                      const tiny = en - s < 2;
                      const name = e.project ?? e.org;
                      const on = hover === e.id || open.has(e.id);
                      const color = pillarColor[e.pillars[0]!];
                      return (
                        <button
                          key={e.id}
                          type="button"
                          onClick={() => focusFromBar(e.id)}
                          onMouseEnter={() => setHover(e.id)}
                          onMouseLeave={() => setHover(null)}
                          onFocus={() => setHover(e.id)}
                          onBlur={() => setHover(null)}
                          className="group absolute h-7 rounded-md text-left transition-[background-color,box-shadow] duration-300"
                          style={{
                            left: `${left}%`,
                            width: `${width}%`,
                            top: r * 36,
                            background: on ? `color-mix(in oklab, ${color} 26%, #16181C)` : `color-mix(in oklab, ${color} 12%, #111316)`,
                            boxShadow: `inset 2px 0 0 ${color}${on ? ", 0 0 0 1px " + color + "66" : ""}`,
                          }}
                          aria-label={`${name}, ${e.role}, ${fmt(e.start, locale, j.present)} – ${fmt(e.end, locale, j.present)}`}
                        >
                          <span
                            className={`absolute top-1/2 -translate-y-1/2 whitespace-nowrap font-medium ${tiny ? "left-full ml-2 text-[0.8rem] text-muted group-hover:text-fg" : short ? "left-2 text-[0.72rem] text-fg" : "left-3 text-[0.8rem] text-fg"}`}
                          >
                            {name}
                            {!short && e.end === "present" && <span className="label ml-2 text-[0.7rem] text-produto">{j.present}</span>}
                          </span>
                        </button>
                      );
                    })}
                </div>
              </div>
            );
          })}

          <div className="grid border-t border-line pt-6" style={{ gridTemplateColumns: `12fr 12fr ${total - 24}fr` }}>
            {j.chapters.map((c) => (
              <div key={c.year} className="pr-6">
                <p className="label text-[0.72rem] text-produto">{c.year}</p>
                <p className="mt-2 font-medium tracking-tight">{c.title}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Chapters on mobile */}
      <ol className="space-y-5 md:hidden" role="list">
        {j.chapters.map((c) => (
          <li key={c.year} className="flex gap-4" data-reveal>
            <span className="label pt-1 text-[0.72rem] text-produto">{c.year}</span>
            <p className="font-medium tracking-tight">{c.title}</p>
          </li>
        ))}
      </ol>

      {/* Every experience, always listed; details expand inline */}
      <ul className="mt-12 border-b border-line md:mt-16" role="list">
        {sorted.map((e) => {
          const isOpen = open.has(e.id);
          const on = hover === e.id;
          const s = toIndex(e.start) - toIndex(START);
          const en = (e.end === "present" ? toIndex(now) : toIndex(e.end)) - toIndex(START) + 1;
          return (
            <li
              key={e.id}
              id={`exp-${e.id}`}
              className="scroll-mt-28 border-t border-line"
              onMouseEnter={() => setHover(e.id)}
              onMouseLeave={() => setHover(null)}
            >
              <h3>
                <button
                  type="button"
                  aria-expanded={isOpen}
                  aria-controls={`exp-panel-${e.id}`}
                  onClick={() => toggle(e.id)}
                  className={`grid w-full grid-cols-[1fr_auto] items-start gap-x-4 gap-y-2 py-5 text-left transition-colors duration-200 md:grid-cols-[9.5rem_1fr_auto_auto] md:items-center md:gap-x-6 ${on ? "text-fg" : ""}`}
                >
                  <span className="label order-2 col-span-2 text-[0.72rem] text-muted md:order-none md:col-span-1">
                    {fmt(e.start, locale, j.present)} – {fmt(e.end, locale, j.present)}
                    {/* mini period bar */}
                    <span aria-hidden className="relative mt-2 block h-[3px] w-full max-w-[9rem] rounded-full bg-line md:hidden">
                      <span
                        className="absolute inset-y-0 rounded-full"
                        style={{ left: `${(s / total) * 100}%`, width: `${((en - s) / total) * 100}%`, background: pillarColor[e.pillars[0]!] }}
                      />
                    </span>
                  </span>
                  <span className="min-w-0">
                    <span className="block text-[1.12rem] font-medium leading-snug tracking-tight">
                      {e.org}
                      {e.project && <span className="text-muted"> · {e.project}</span>}
                    </span>
                    <span className="mt-0.5 block text-sm text-muted">{e.role}</span>
                  </span>
                  <span className="hidden gap-1 md:flex" aria-hidden>
                    {e.pillars.map((p) => (
                      <PillarDot key={p} pillar={p} />
                    ))}
                  </span>
                  <span className="flex h-8 w-8 items-center justify-center rounded-full border border-line text-muted">
                    <ChevronDown size={16} strokeWidth={1.75} className={`transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`} aria-hidden />
                    <span className="sr-only">{isOpen ? j.collapse : j.expand}</span>
                  </span>
                </button>
              </h3>
              <p className="-mt-2 pb-5 text-[0.95rem] text-fg/80 md:ml-[11rem] md:max-w-[60ch]">{e.summary}</p>

              <div id={`exp-panel-${e.id}`} className="disclosure" data-open={isOpen}>
                <div inert={!isOpen}>
                  <div className="grid gap-6 pb-8 md:ml-[11rem] md:grid-cols-2 md:gap-10">
                    <div className="space-y-5">
                      {e.context && (
                        <div>
                          <p className="label text-[0.72rem] text-faint">{j.contextLabel}</p>
                          <p className="mt-2 text-[0.95rem] text-muted">{e.context}</p>
                        </div>
                      )}
                      <div>
                        <p className="label text-[0.72rem] text-faint">{j.contributionLabel}</p>
                        <ul className="mt-2 space-y-2" role="list">
                          {e.contribution.map((c) => (
                            <li key={c} className="flex gap-3 text-[0.95rem] text-fg/85">
                              <span aria-hidden className="mt-[0.6rem] h-px w-3 shrink-0 bg-line-strong" />
                              {c}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                    <div className="space-y-5">
                      <div className="rounded-xl border border-line bg-surface-1 p-4">
                        <p className="label text-[0.72rem] text-tecnologia">{j.resultLabel}</p>
                        <p className="mt-2 text-[0.95rem] text-fg">{e.result}</p>
                      </div>
                      {e.highlight && (
                        <Link href={`#${highlightId}`} className="link-underline inline-block text-sm text-tecnologia">
                          {j.highlightLink} →
                        </Link>
                      )}
                      {e.caseLinks.length > 0 && (
                        <ul className="flex flex-wrap gap-x-5 gap-y-2" role="list">
                          {e.caseLinks.map((l) => (
                            <li key={l.href}>
                              <Link href={l.href} className="link-underline text-sm text-produto">
                                {j.caseLink}: {l.label} →
                              </Link>
                            </li>
                          ))}
                        </ul>
                      )}
                      {e.pending?.map((p) => (
                        <Pending key={p} label={pendingLabel}>
                          {p}
                        </Pending>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
