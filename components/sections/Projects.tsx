import Image from "next/image";
import Link from "next/link";
import { ViewTransition } from "react";
import type { LocaleContent } from "@/content/types";
import { casePath } from "@/lib/i18n";
import { ConceptFigure } from "@/components/figures/Figures";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { PillarDot } from "@/components/ui/PillarDot";
import { SectionHeader } from "@/components/ui/SectionHeader";

export function Projects({ content }: { content: LocaleContent }) {
  const { site, cases } = content;
  const p = site.projects;
  return (
    <section id={site.sections.projects} aria-labelledby="projects-title" className="relative py-20 md:py-28">
      <div className="container-x">
        <SectionHeader index="01" eyebrow={p.eyebrow} title={p.title} intro={p.intro} id="projects-title" />

        <div className="mt-16 md:mt-20">
          {cases.map((c, i) => {
            const href = casePath(site.locale, c.slug);
            const flip = i % 2 === 1;
            const meta = [c.meta[0], c.meta[2]].filter((m): m is NonNullable<typeof m> => !!m?.value);
            return (
              <article key={c.slug} aria-labelledby={`case-${c.slug}`} className="border-t border-line py-16 md:py-24">
                {/* Chapter heading: what kind of problem, and the question it answers */}
                <div className="grid gap-y-8 lg:grid-cols-12 lg:gap-x-10">
                  <div className="lg:col-span-7">
                    <p className="label flex flex-wrap items-center gap-x-3 gap-y-2 text-[0.75rem] text-muted" data-reveal>
                      <span className="text-fg">{c.index}</span>
                      <span className="h-px w-6 bg-line-strong" aria-hidden />
                      <span>{c.problemType}</span>
                      <span className="flex gap-1" aria-hidden>
                        {c.emphasis.map((e) => (
                          <PillarDot key={e} pillar={e} />
                        ))}
                      </span>
                      {c.tag && (
                        <span className="rounded-full border border-produto/40 bg-produto/10 px-2.5 py-0.5 text-[0.7rem] text-produto">{c.tag}</span>
                      )}
                    </p>
                    <h3 id={`case-${c.slug}`} className="mt-6 text-h2 font-medium" data-reveal style={{ ["--d" as string]: "60ms" }}>
                      <ViewTransition name={`title-${c.slug}`} share="case-morph" default="none">
                        <Link href={href} className="transition-colors hover:text-white">
                          {c.title}
                        </Link>
                      </ViewTransition>
                    </h3>
                    <p className="em-serif mt-3 text-[1.9rem] leading-[1.1] text-fg/80 md:text-[2.5rem]" data-reveal style={{ ["--d" as string]: "100ms" }}>
                      {c.chapter}
                    </p>
                  </div>
                  <blockquote className="self-end border-l border-produto/60 pl-5 lg:col-span-5 lg:pb-2" data-reveal style={{ ["--d" as string]: "140ms" }}>
                    <p className="label text-[0.72rem] text-faint">{p.questionLabel}</p>
                    <p className="mt-3 text-[1.15rem] leading-snug text-fg md:text-[1.25rem]">{c.question}</p>
                  </blockquote>
                </div>

                {/* Illustration + the essentials */}
                <div className="mt-12 grid items-stretch gap-y-10 md:mt-14 lg:grid-cols-12 lg:gap-x-10">
                  <div className={`lg:col-span-8 ${flip ? "lg:order-2" : ""}`} data-reveal>
                    {c.cover ? (
                      <Link href={href} tabIndex={-1} className="group block">
                        <figure className="overflow-hidden rounded-[24px] border border-line bg-surface-1 transition-[transform,border-color] duration-500 ease-[var(--ease-out-soft)] group-hover:-translate-y-1 group-hover:border-line-strong">
                          <Image
                            src={c.cover.src}
                            alt={c.cover.alt}
                            width={c.cover.width}
                            height={c.cover.height}
                            sizes="(min-width: 1280px) 770px, (min-width: 1024px) 64vw, 100vw"
                            className="h-auto w-full"
                          />
                        </figure>
                      </Link>
                    ) : (
                      <Link href={href} tabIndex={-1} aria-hidden className="group block">
                        <ViewTransition name={`fig-${c.slug}`} share="case-morph" default="none">
                          <div className="transition-transform duration-500 ease-[var(--ease-out-soft)] group-hover:-translate-y-1">
                            <ConceptFigure slug={c.slug} locale={site.locale} badge={p.conceptual} />
                          </div>
                        </ViewTransition>
                      </Link>
                    )}
                  </div>

                  <div className={`flex flex-col lg:col-span-4 ${flip ? "lg:order-1" : ""}`} data-reveal style={{ ["--d" as string]: "120ms" }}>
                    <p className="text-[1.05rem] leading-relaxed text-fg/85">{c.summary}</p>

                    {c.features && (
                      <div className="mt-6">
                        <p className="label text-[0.7rem] text-faint">{c.features.label}</p>
                        <ul className="mt-2.5 flex flex-wrap gap-1.5" role="list">
                          {c.features.items.map((f) => (
                            <li key={f} className="rounded-full border border-produto/40 bg-produto/[0.08] px-3 py-1 text-[0.88rem] text-fg">
                              {f}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    <dl className="mt-8 grid grid-cols-2 gap-x-6 gap-y-4 border-t border-line pt-6">
                      {meta.map((m) => (
                        <div key={m.label}>
                          <dt className="label text-[0.7rem] text-faint">{m.label}</dt>
                          <dd className="mt-1 text-[0.95rem] leading-snug text-fg">{m.value}</dd>
                        </div>
                      ))}
                    </dl>

                    <div className="mt-auto pt-10">
                      <p className="text-[3.25rem] font-medium leading-none tracking-[-0.045em] md:text-6xl">{c.highlight.value}</p>
                      <p className="mt-2 text-[0.95rem] text-muted">{c.highlight.label}</p>
                      <div className="mt-8">
                        <ButtonLink href={href} className="w-full sm:w-auto" ariaLabel={`${p.read}: ${c.title}`}>
                          {p.read}
                        </ButtonLink>
                      </div>
                    </div>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
