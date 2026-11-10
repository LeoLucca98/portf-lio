"use client";

import { useState } from "react";
import type { SiteContent } from "@/content/types";

type Ops = SiteContent["operations"];

const C = { green: "#5ED1A4", iris: "#7C8CFF", line: "#353941", bg: "#0A0B0D", fg: "#EDEDEF" };
const R = 128;
const cx = 200;
const cy = 200;
// Clockwise from the top: prevent → detect → respond → consolidate → prevent.
const nodes = [
  { x: cx, y: cy - R },
  { x: cx + R, y: cy },
  { x: cx, y: cy + R },
  { x: cx - R, y: cy },
];
const d45 = R * Math.SQRT1_2;
const arrows = [
  { x: cx + d45, y: cy - d45, rot: 45 },
  { x: cx + d45, y: cy + d45, rot: 135 },
  { x: cx - d45, y: cy + d45, rot: 225 },
  { x: cx - d45, y: cy - d45, rot: 315 },
];
const arc = (i: number) => {
  const a = nodes[i]!;
  const b = nodes[(i + 1) % 4]!;
  return `M ${a.x} ${a.y} A ${R} ${R} 0 0 1 ${b.x} ${b.y}`;
};
// Each label sits just outside its own node, so it never collides with the loop.
const labelPos = nodes.map((n, i) => {
  const below = i !== 0;
  return {
    left: `${(n.x / 400) * 100}%`,
    top: `${((below ? n.y + 34 : n.y - 34) / 400) * 100}%`,
    // Side labels hang outwards so they never cross the loop.
    transform: !below ? "translate(-50%, -100%)" : i === 1 ? "translate(6%, 0)" : i === 3 ? "translate(-106%, 0)" : "translate(-50%, 0)",
  };
});

/**
 * The operational loop. The figure and the four phase cards share one
 * highlight: pointing at a card lights its step in the loop and vice versa.
 * Every card is always visible; the highlight only adds the relation.
 */
export function OpsLoop({ ops }: { ops: Ops }) {
  const [active, setActive] = useState<number | null>(null);

  return (
    <div className="grid gap-x-12 gap-y-12 lg:grid-cols-12">
      <figure className="fig relative mx-auto w-full max-w-[420px] px-10 sm:px-0 lg:sticky lg:top-[calc(var(--nav-h)+40px)] lg:col-span-5 lg:max-w-none lg:self-start" aria-label={ops.figureLabel}>
        <div className="relative aspect-square">
          <div
            aria-hidden
            className="absolute inset-[18%] rounded-full blur-3xl"
            style={{ background: "radial-gradient(closest-side, rgba(94,209,164,0.18), transparent)" }}
          />
          <svg viewBox="0 0 400 400" className="absolute inset-0 h-full w-full" role="img">
            <title>{ops.figureLabel}</title>
            <circle cx={cx} cy={cy} r={R - 58} fill="none" stroke={C.line} strokeDasharray="2 6" />
            {nodes.map((_, i) => {
              const on = active === null || active === (i + 1) % 4 || active === i;
              return (
                <path
                  key={`a${i}`}
                  data-draw
                  pathLength={1}
                  d={arc(i)}
                  fill="none"
                  stroke={C.green}
                  strokeWidth={active === (i + 1) % 4 ? 2.25 : 1.25}
                  strokeOpacity={on ? 0.85 : 0.25}
                  strokeLinecap="round"
                  style={{ ["--d" as string]: `${i * 220}ms`, transition: "stroke-opacity 300ms, stroke-width 300ms" }}
                />
              );
            })}
            {arrows.map((a, i) => (
              <g key={`r${i}`} transform={`translate(${a.x} ${a.y}) rotate(${a.rot})`} opacity={active === null || active === (i + 1) % 4 ? 0.9 : 0.3}>
                <path d="M-5 -5 L2 0 L-5 5" fill="none" stroke={C.green} strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" />
              </g>
            ))}
            {nodes.map((n, i) => {
              const on = active === i;
              return (
                <g
                  key={`n${i}`}
                  data-pop
                  style={{ ["--d" as string]: `${200 + i * 220}ms` }}
                  onMouseEnter={() => setActive(i)}
                  onMouseLeave={() => setActive(null)}
                  className="cursor-default"
                >
                  <circle cx={n.x} cy={n.y} r={on ? 26 : 22} fill={C.bg} stroke={C.green} strokeOpacity={on ? 1 : 0.55} style={{ transition: "all 300ms" }} />
                  <text x={n.x} y={n.y + 4} textAnchor="middle" fontSize="12" fontFamily="var(--font-geist-mono), monospace" fill={on ? C.green : C.fg}>
                    {String(i + 1).padStart(2, "0")}
                  </text>
                </g>
              );
            })}
          </svg>
          {ops.phases.map((p, i) => (
            <span
              key={p.id}
              aria-hidden
              className="label pointer-events-none absolute whitespace-nowrap text-[0.66rem] transition-colors duration-300 sm:text-[0.75rem]"
              style={{ ...labelPos[i], color: active === i ? C.green : "var(--color-muted)" }}
            >
              {p.name}
            </span>
          ))}
          <div aria-hidden className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center text-center">
            <span className="em-serif text-[1.15rem] leading-none text-fg sm:text-[1.6rem] md:text-[1.9rem]">{ops.center}</span>
            <span className="label mt-2 text-[0.7rem] text-faint">{ops.centerSub}</span>
          </div>
        </div>
      </figure>

      <ol className="grid gap-4 sm:grid-cols-2 lg:col-span-7" role="list">
        {ops.phases.map((p, i) => {
          const on = active === i;
          return (
            <li
              key={p.id}
              onMouseEnter={() => setActive(i)}
              onMouseLeave={() => setActive(null)}
              className="flex flex-col rounded-[22px] border bg-bg p-5 transition-[border-color,background-color] duration-300 md:p-6"
              style={{
                borderColor: on ? "rgba(94,209,164,0.55)" : "var(--color-line)",
                background: on ? "color-mix(in oklab, #5ED1A4 5%, #0A0B0D)" : undefined,
              }}
              data-reveal
            >
              <h3 className="label flex items-center gap-2 text-[0.75rem] text-tecnologia">
                <span aria-hidden>{String(i + 1).padStart(2, "0")}</span>
                <span className="h-px w-4 bg-tecnologia/50" aria-hidden />
                {p.name}
              </h3>
              <p className="label mt-5 text-[0.7rem] text-faint">{ops.didLabel}</p>
              <ul className="mt-2 space-y-1.5" role="list">
                {p.did.map((d) => (
                  <li key={d} className="text-[0.98rem] leading-snug text-fg">
                    {d}
                  </li>
                ))}
              </ul>
              <div className="mt-auto border-t border-line pt-4">
                <p className="label mt-1 text-[0.7rem] text-faint">{ops.productLabel}</p>
                <p className="mt-2 font-medium tracking-tight text-produto">{p.skill}</p>
                <p className="mt-1 text-[0.92rem] leading-relaxed text-muted">{p.skillText}</p>
              </div>
            </li>
          );
        })}
      </ol>
    </div>
  );
}
