"use client";

import Link from "next/link";
import { animate, useReducedMotion } from "motion/react";
import { ArrowRight } from "lucide-react";
import { useCallback, useEffect, useId, useRef, useState, type KeyboardEvent } from "react";
import type { CycleRelation, Pillar, SiteContent } from "@/content/types";

type Props = {
  cycle: SiteContent["cycle"];
  links: Record<CycleRelation["id"], { href: string; label: string }>;
};

const W = 520;
const H = 470;
const nodes: Record<Pillar, { x: number; y: number }> = {
  produto: { x: 260, y: 78 },
  negocio: { x: 86, y: 370 },
  tecnologia: { x: 434, y: 370 },
};
const center = { x: 260, y: 272 };

const edges: Record<"np" | "pt" | "tn", { d: string; from: Pillar; to: Pillar; mid: { x: number; y: number }; angle: number }> = {
  np: { d: "M86 370 Q 66 150 260 78", from: "negocio", to: "produto", mid: { x: 119.5, y: 187 }, angle: -55 },
  pt: { d: "M260 78 Q 454 150 434 370", from: "produto", to: "tecnologia", mid: { x: 400.5, y: 187 }, angle: 55 },
  tn: { d: "M434 370 Q 260 462 86 370", from: "tecnologia", to: "negocio", mid: { x: 260, y: 416 }, angle: 180 },
};

const color: Record<Pillar, string> = {
  negocio: "#E8B86A",
  produto: "#7C8CFF",
  tecnologia: "#5ED1A4",
};

const order: CycleRelation["id"][] = ["np", "pt", "tn", "center"];

export function SignalCycle({ cycle, links }: Props) {
  const uid = useId().replace(/:/g, "");
  const reduce = useReducedMotion();
  const [selected, setSelected] = useState<CycleRelation["id"]>("center");
  const [lit, setLit] = useState<CycleRelation["id"] | null>(null);
  const pathRefs = useRef<Record<string, SVGPathElement | null>>({});
  const spokeRefs = useRef<Record<string, SVGLineElement | null>>({});
  const pulseRefs = useRef<(SVGCircleElement | null)[]>([]);
  const running = useRef<{ stop: () => void }[]>([]);
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const introDone = useRef(false);

  const stopAll = () => {
    running.current.forEach((c) => c.stop());
    running.current = [];
    pulseRefs.current.forEach((p) => p?.setAttribute("opacity", "0"));
  };

  const runAlong = useCallback(
    (el: SVGGeometryElement | null, pulse: SVGCircleElement | null, duration: number, delay = 0) =>
      new Promise<void>((resolve) => {
        if (!el || !pulse) return resolve();
        const len = el.getTotalLength();
        const controls = animate(0, 1, {
          duration,
          delay,
          ease: [0.45, 0, 0.2, 1],
          onUpdate: (v) => {
            const p = el.getPointAtLength(v * len);
            pulse.setAttribute("cx", String(p.x));
            pulse.setAttribute("cy", String(p.y));
            pulse.setAttribute("opacity", String(Math.min(1, Math.sin(Math.PI * v) * 2.2)));
          },
          onComplete: () => {
            pulse.setAttribute("opacity", "0");
            resolve();
          },
        });
        running.current.push(controls);
      }),
    [],
  );

  const playRelation = useCallback(
    (id: CycleRelation["id"]) => {
      if (reduce) return;
      stopAll();
      if (id === "center") {
        (["negocio", "produto", "tecnologia"] as Pillar[]).forEach((p, i) => {
          void runAlong(spokeRefs.current[p] ?? null, pulseRefs.current[i] ?? null, 0.9);
        });
      } else {
        void runAlong(pathRefs.current[id] ?? null, pulseRefs.current[0] ?? null, 1.1);
      }
    },
    [reduce, runAlong],
  );

  // Intro: one pass around the cycle, then converge on the decision.
  useEffect(() => {
    if (reduce) return;
    let cancelled = false;
    const t = setTimeout(async () => {
      for (const id of ["np", "pt", "tn"] as const) {
        if (cancelled || introDone.current) return;
        setLit(id);
        await runAlong(pathRefs.current[id] ?? null, pulseRefs.current[0] ?? null, 0.85);
      }
      if (cancelled || introDone.current) return;
      setLit("center");
      await Promise.all(
        (["negocio", "produto", "tecnologia"] as Pillar[]).map((p, i) =>
          runAlong(spokeRefs.current[p] ?? null, pulseRefs.current[i] ?? null, 0.8),
        ),
      );
      introDone.current = true;
      if (!cancelled) setLit(null);
    }, 900);
    return () => {
      cancelled = true;
      clearTimeout(t);
      stopAll();
    };
  }, [reduce, runAlong]);

  const select = (id: CycleRelation["id"], play = true) => {
    if (!introDone.current) {
      introDone.current = true;
      stopAll();
    }
    setLit(null);
    if (id === selected) return;
    setSelected(id);
    if (play) playRelation(id);
  };

  const onTabKey = (e: KeyboardEvent<HTMLButtonElement>, i: number) => {
    let next = i;
    if (e.key === "ArrowRight" || e.key === "ArrowDown") next = (i + 1) % order.length;
    else if (e.key === "ArrowLeft" || e.key === "ArrowUp") next = (i - 1 + order.length) % order.length;
    else if (e.key === "Home") next = 0;
    else if (e.key === "End") next = order.length - 1;
    else return;
    e.preventDefault();
    const id = order[next]!;
    select(id);
    tabRefs.current[next]?.focus();
  };

  const focus = lit ?? selected;
  const rel = cycle.relations.find((r) => r.id === selected)!;
  const isEdgeActive = (id: string) => focus === id;
  const nodeActive = (p: Pillar) =>
    focus === "center" || (focus !== null && (edges[focus].from === p || edges[focus].to === p));

  const tabLabel = (r: CycleRelation) =>
    r.id === "center" ? cycle.center : `${cycle.nodes[r.from!].label} → ${cycle.nodes[r.to!].label}`;

  return (
    <figure className="relative" aria-label={cycle.label}>
      <div aria-hidden className="dot-grid absolute -inset-6 opacity-70 [mask-image:radial-gradient(60%_55%_at_50%_40%,black,transparent)]" />
      <div
        aria-hidden
        className="absolute left-1/2 top-[38%] h-[70%] w-[80%] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-70 blur-3xl"
        style={{ background: "radial-gradient(closest-side, rgba(124,140,255,0.22), rgba(124,140,255,0.04) 60%, transparent)" }}
      />

      <div className="relative px-6 pb-0 pt-9 sm:px-2 sm:pt-7">
      <div className="relative mx-auto w-full max-w-[520px]" style={{ aspectRatio: `${W} / ${H}` }}>
        <svg viewBox={`0 0 ${W} ${H}`} className="absolute inset-0 h-full w-full" aria-hidden>
          <defs>
            {(Object.keys(edges) as (keyof typeof edges)[]).map((k) => {
              const e = edges[k];
              const a = nodes[e.from];
              const b = nodes[e.to];
              return (
                <linearGradient key={k} id={`${uid}-g-${k}`} gradientUnits="userSpaceOnUse" x1={a.x} y1={a.y} x2={b.x} y2={b.y}>
                  <stop offset="0" stopColor={color[e.from]} />
                  <stop offset="1" stopColor={color[e.to]} />
                </linearGradient>
              );
            })}
            <radialGradient id={`${uid}-glow`}>
              <stop offset="0" stopColor="#7C8CFF" stopOpacity="0.55" />
              <stop offset="1" stopColor="#7C8CFF" stopOpacity="0" />
            </radialGradient>
            <filter id={`${uid}-blur`} x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur stdDeviation="3" />
            </filter>
          </defs>

          {/* Spokes: every relation feeds the decision */}
          {(Object.keys(nodes) as Pillar[]).map((p) => (
            <line
              key={p}
              ref={(el) => {
                spokeRefs.current[p] = el;
              }}
              x1={nodes[p].x}
              y1={nodes[p].y}
              x2={center.x}
              y2={center.y}
              stroke={color[p]}
              strokeWidth={1}
              strokeDasharray="2 5"
              style={{ transition: "opacity 300ms" }}
              opacity={focus === "center" ? 0.75 : 0.22}
            />
          ))}

          {(Object.keys(edges) as (keyof typeof edges)[]).map((k) => {
            const e = edges[k];
            const active = isEdgeActive(k);
            return (
              <g key={k} style={{ transition: "opacity 300ms" }} opacity={focus === null || active ? 1 : 0.32}>
                <path d={e.d} fill="none" stroke={`url(#${uid}-g-${k})`} strokeWidth={active ? 6 : 0} opacity={0.25} filter={`url(#${uid}-blur)`} />
                <path
                  ref={(el) => {
                    pathRefs.current[k] = el;
                  }}
                  d={e.d}
                  fill="none"
                  stroke={`url(#${uid}-g-${k})`}
                  strokeWidth={active ? 2 : 1.25}
                  strokeLinecap="round"
                  style={{ transition: "stroke-width 300ms" }}
                />
                <g transform={`translate(${e.mid.x} ${e.mid.y}) rotate(${e.angle})`}>
                  <path d="M-5 -5 L2 0 L-5 5" fill="none" stroke={color[e.to]} strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" />
                </g>
                {/* Generous pointer target */}
                <path
                  d={e.d}
                  fill="none"
                  stroke="transparent"
                  strokeWidth={30}
                  className="cursor-pointer"
                  onPointerEnter={(ev) => ev.pointerType === "mouse" && select(k)}
                  onClick={() => select(k)}
                />
              </g>
            );
          })}

          {/* Center: the decision */}
          <g
            className="cursor-pointer"
            onPointerEnter={(ev) => ev.pointerType === "mouse" && select("center")}
            onClick={() => select("center")}
          >
            <circle cx={center.x} cy={center.y} r={46} fill={`url(#${uid}-glow)`} opacity={focus === "center" ? 1 : 0.45} style={{ transition: "opacity 300ms" }} />
            <circle cx={center.x} cy={center.y} r={20} fill="#0A0B0D" stroke="#7C8CFF" strokeOpacity={focus === "center" ? 0.9 : 0.4} />
            <circle cx={center.x} cy={center.y} r={4} fill="#EDEDEF" />
          </g>

          {(Object.keys(nodes) as Pillar[]).map((p) => {
            const n = nodes[p];
            const on = nodeActive(p);
            return (
              <g key={p}>
                <circle cx={n.x} cy={n.y} r={22} fill="#0A0B0D" stroke={color[p]} strokeOpacity={on ? 0.85 : 0.35} style={{ transition: "stroke-opacity 300ms" }} />
                <circle cx={n.x} cy={n.y} r={on ? 7 : 5} fill={color[p]} style={{ transition: "r 300ms" }} />
              </g>
            );
          })}

          {[0, 1, 2].map((i) => (
            <circle
              key={i}
              ref={(el) => {
                pulseRefs.current[i] = el;
              }}
              r={4.5}
              cx={-20}
              cy={-20}
              fill="#EDEDEF"
              opacity={0}
              style={{ filter: "drop-shadow(0 0 6px rgba(237,237,239,0.9))" }}
            />
          ))}
        </svg>

        {/* HTML labels keep text crisp and legible at any size */}
        {(Object.keys(nodes) as Pillar[]).map((p) => {
          const n = nodes[p];
          const below = p !== "produto";
          return (
            <div
              key={p}
              aria-hidden
              className="pointer-events-none absolute flex -translate-x-1/2 flex-col items-center text-center"
              style={{
                left: `${(n.x / W) * 100}%`,
                top: below ? `${((n.y + 30) / H) * 100}%` : undefined,
                bottom: below ? undefined : `${((H - n.y + 30) / H) * 100}%`,
              }}
            >
              <span className="text-[1rem] font-medium tracking-tight text-fg sm:text-[1.12rem]">{cycle.nodes[p].label}</span>
              <span className="label mt-1 max-w-[7.5rem] text-[0.68rem] leading-snug text-muted sm:max-w-none sm:whitespace-nowrap sm:text-[0.72rem]">{cycle.nodes[p].short}</span>
            </div>
          );
        })}
        <div
          aria-hidden
          className="pointer-events-none absolute -translate-x-1/2 text-center"
          style={{ left: `${(center.x / W) * 100}%`, top: `${((center.y + 26) / H) * 100}%` }}
        >
          <span className="em-serif text-[1.35rem] text-fg">{cycle.center}</span>
        </div>
      </div>
      </div>

      <div className="relative -mt-2 rounded-[22px] border border-line-strong/70 bg-surface-1/85 px-5 pb-5 pt-4 shadow-[0_20px_60px_-30px_rgba(0,0,0,0.9)] backdrop-blur-md sm:px-6">
        <div role="tablist" aria-label={cycle.hint} className="-mx-1 flex flex-wrap gap-1.5">
          {order.map((id, i) => {
            const r = cycle.relations.find((x) => x.id === id)!;
            const on = selected === id;
            return (
              <button
                key={id}
                ref={(el) => {
                  tabRefs.current[i] = el;
                }}
                role="tab"
                id={`${uid}-tab-${id}`}
                aria-selected={on}
                aria-controls={`${uid}-panel`}
                tabIndex={on ? 0 : -1}
                onClick={() => select(id)}
                onKeyDown={(e) => onTabKey(e, i)}
                className={`label rounded-full border px-3 py-1.5 text-[0.7rem] transition-colors duration-200 ${
                  on ? "border-produto/60 bg-produto/10 text-fg" : "border-line text-muted hover:border-line-strong hover:text-fg"
                }`}
              >
                {tabLabel(r)}
              </button>
            );
          })}
        </div>
        <div
          id={`${uid}-panel`}
          role="tabpanel"
          aria-labelledby={`${uid}-tab-${selected}`}
          className="mt-4 min-h-[9rem] sm:min-h-[7.5rem]"
        >
          <div key={selected} className="rise" style={{ ["--d" as string]: "0ms" }}>
            <p className="text-[1.05rem] font-medium leading-snug tracking-tight text-fg">{rel.title}</p>
            <p className="mt-1.5 text-[0.95rem] leading-relaxed text-muted">{rel.description}</p>
            <Link
              href={links[selected].href}
              className="group mt-3 inline-flex items-center gap-1.5 text-[0.9rem] text-fg/90 hover:text-fg"
            >
              <span className="text-muted">{rel.example.split(":")[0]}:</span>
              <span className="link-underline">{rel.example.split(":").slice(1).join(":").trim()}</span>
              <ArrowRight size={14} strokeWidth={1.75} className="arrow-shift shrink-0 text-produto" aria-hidden />
            </Link>
          </div>
        </div>
      </div>
    </figure>
  );
}
