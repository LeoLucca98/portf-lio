"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import type { Pillar, SiteContent } from "@/content/types";
import { pillarColor } from "@/components/ui/PillarDot";

type Step = SiteContent["process"]["steps"][number] & { whereResolved: { label: string; href: string }[] };

const stepPillar: Pillar[] = ["negocio", "negocio", "produto", "produto", "tecnologia"];

export function ProcessSteps({ steps, labels }: { steps: Step[]; labels: { questions: string; artifacts: string; where: string; note: string } }) {
  const [active, setActive] = useState(0);
  const refs = useRef<(HTMLElement | null)[]>([]);

  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) setActive(Number((e.target as HTMLElement).dataset.index));
        }
      },
      { rootMargin: "-45% 0px -50% 0px" },
    );
    refs.current.forEach((el) => el && io.observe(el));
    return () => io.disconnect();
  }, []);

  const n = steps.length;
  const top = 16;
  const gap = 64;
  const h = top * 2 + gap * (n - 1);

  return (
    <div className="grid gap-x-10 lg:grid-cols-12">
      {/* The cycle, unrolled into a line. Sticky on desktop. */}
      <div className="hidden lg:col-span-4 lg:block">
        <div className="sticky top-[calc(var(--nav-h)+56px)]">
          <div className="relative flex gap-5">
            <svg width="44" height={h} viewBox={`0 0 44 ${h}`} aria-hidden className="shrink-0 overflow-visible">
              <defs>
                <linearGradient id="process-line" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0" stopColor={pillarColor.negocio} />
                  <stop offset="0.55" stopColor={pillarColor.produto} />
                  <stop offset="1" stopColor={pillarColor.tecnologia} />
                </linearGradient>
              </defs>
              <line x1="14" y1={top} x2="14" y2={h - top} stroke="var(--color-line-strong)" strokeWidth="1" />
              <line
                x1="14"
                y1={top}
                x2="14"
                y2={top + gap * active}
                stroke="url(#process-line)"
                strokeWidth="1.5"
                style={{ transition: "all 500ms cubic-bezier(0.22,1,0.36,1)" }}
              />
              {/* The return path: validation feeds the next problem */}
              <path
                d={`M14 ${h - top} C 44 ${h - top}, 44 ${top}, 14 ${top}`}
                fill="none"
                stroke="var(--color-line-strong)"
                strokeDasharray="2 4"
              />
              {steps.map((s, i) => {
                const on = i <= active;
                return (
                  <circle
                    key={s.id}
                    cx="14"
                    cy={top + gap * i}
                    r={i === active ? 6 : 4}
                    fill={on ? pillarColor[stepPillar[i]!] : "var(--color-bg)"}
                    stroke={pillarColor[stepPillar[i]!]}
                    strokeOpacity={on ? 1 : 0.5}
                    style={{ transition: "all 400ms cubic-bezier(0.22,1,0.36,1)" }}
                  />
                );
              })}
            </svg>
            <ol className="flex flex-col" style={{ marginTop: top - 12 }}>
              {steps.map((s, i) => (
                <li key={s.id} style={{ height: gap }}>
                  <a
                    href={`#step-${s.id}`}
                    className={`block text-[0.98rem] leading-6 transition-colors duration-300 ${i === active ? "text-fg" : "text-faint hover:text-muted"}`}
                    aria-current={i === active ? "step" : undefined}
                  >
                    <span className="label mr-2 text-[0.72rem]">0{i + 1}</span>
                    {s.title}
                  </a>
                </li>
              ))}
            </ol>
          </div>
          <p className="mt-6 max-w-[30ch] text-sm text-faint">{labels.note}</p>
        </div>
      </div>

      <ol className="lg:col-span-8">
        {steps.map((s, i) => (
          <li
            key={s.id}
            id={`step-${s.id}`}
            ref={(el) => {
              refs.current[i] = el;
            }}
            data-index={i}
            className="scroll-mt-32 border-t border-line py-10 first:border-t-0 first:pt-0 md:py-14"
          >
            <article data-reveal>
              <div className="flex items-baseline gap-4">
                <span className="label text-[0.7rem]" style={{ color: pillarColor[stepPillar[i]!] }}>
                  0{i + 1}
                </span>
                <h3 className="text-h3 font-medium">{s.title}</h3>
              </div>
              <p className="mt-4 max-w-[52ch] text-lg text-fg/85">{s.summary}</p>

              <div className="mt-8 grid gap-8 md:grid-cols-[1.3fr_1fr]">
                <div>
                  <p className="label text-[0.72rem] text-faint">{labels.questions}</p>
                  <ul className="mt-3 space-y-2.5" role="list">
                    {s.questions.map((q) => (
                      <li key={q} className="em-serif text-[1.35rem] leading-snug text-fg/90">
                        {q}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="space-y-6">
                  <div>
                    <p className="label text-[0.72rem] text-faint">{labels.artifacts}</p>
                    <ul className="mt-3 flex flex-wrap gap-1.5" role="list">
                      {s.artifacts.map((a) => (
                        <li key={a} className="rounded-full border border-line px-2.5 py-1 text-[0.8rem] text-muted">
                          {a}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <p className="label text-[0.72rem] text-faint">{labels.where}</p>
                    <ul className="mt-2 flex flex-wrap gap-x-4 gap-y-1" role="list">
                      {s.whereResolved.map((w) => (
                        <li key={w.href}>
                          <Link href={w.href} className="link-underline text-sm text-fg/90 hover:text-fg">
                            {w.label}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </article>
          </li>
        ))}
        <li className="border-t border-line pt-8 lg:hidden">
          <p className="text-sm text-faint">{labels.note}</p>
        </li>
      </ol>
    </div>
  );
}
