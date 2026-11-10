import Link from "next/link";
import { ViewTransition } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import type { CaseStudy, LocaleContent } from "@/content/types";
import { casePath, sectionHref } from "@/lib/i18n";
import { showPending } from "@/lib/flags";
import { caseJsonLd, JsonLd } from "@/lib/seo";
import { ConceptFigure } from "@/components/figures/Figures";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { Pending } from "@/components/ui/Pending";
import { PillarDot } from "@/components/ui/PillarDot";
import { CaseBlocks, visibleSections } from "./CaseBlocks";
import { CaseIndex } from "./CaseIndex";

export function CasePage({ content, c }: { content: LocaleContent; c: CaseStudy }) {
  const { site, cases } = content;
  const ui = site.caseUi;
  const idx = cases.findIndex((x) => x.slug === c.slug);
  const next = cases[(idx + 1) % cases.length]!;
  const index = visibleSections(c.sections).map((s) => ({ id: s.id, title: s.title }));
  const meta = c.meta.filter((m) => m.value || (m.pending && showPending));

  return (
    <article>
      <JsonLd data={caseJsonLd(site, c)} />
      <header className="relative isolate overflow-hidden pt-[calc(var(--nav-h)+36px)] md:pt-[calc(var(--nav-h)+56px)]">
        <div className="ambient -z-10" />
        <div className="container-x">
          <Link href={sectionHref(site.locale, site.sections.projects, false)} className="group inline-flex items-center gap-2 text-sm text-muted transition-colors hover:text-fg">
            <ArrowLeft size={15} strokeWidth={1.75} className="transition-transform duration-200 group-hover:-translate-x-0.5" aria-hidden />
            {ui.back}
          </Link>

          <div className="mt-10 grid gap-y-10 lg:grid-cols-12 lg:gap-x-10">
            <div className="lg:col-span-7">
              <p className="rise label flex flex-wrap items-center gap-x-3 gap-y-2 text-muted">
                <span className="text-fg">{c.index}</span>
                <span className="h-px w-5 bg-line-strong" aria-hidden />
                {c.problemType}
                <span className="flex gap-1" aria-hidden>
                  {c.emphasis.map((e) => (
                    <PillarDot key={e} pillar={e} />
                  ))}
                </span>
                {c.tag && <span className="rounded-full border border-produto/40 bg-produto/10 px-2 py-0.5 text-[0.72rem] text-produto">{c.tag}</span>}
              </p>
              <h1 className="mt-6 text-display font-medium">
                <ViewTransition name={`title-${c.slug}`} share="case-morph" default="none">
                  <span className="inline-block">{c.title}</span>
                </ViewTransition>
              </h1>
              <p className="rise em-serif mt-4 text-[1.9rem] leading-tight text-fg/85 md:text-[2.4rem]" style={{ ["--d" as string]: "80ms" }}>
                {c.chapter}
              </p>
              <p className="rise mt-8 max-w-[58ch] text-lg leading-relaxed text-fg/85" style={{ ["--d" as string]: "140ms" }}>
                {c.summary}
              </p>
            </div>
            <div className="rise lg:col-span-5 lg:pt-2" style={{ ["--d" as string]: "200ms" }}>
              <blockquote className="border-l border-produto/60 pl-5">
                <p className="label text-[0.72rem] text-faint">{site.projects.questionLabel}</p>
                <p className="em-serif mt-2 text-[1.6rem] leading-snug text-fg">{c.question}</p>
              </blockquote>
              <dl className="mt-10 grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-line bg-line">
                {meta.map((m) => (
                  <div key={m.label} className="bg-bg p-4">
                    <dt className="label text-[0.7rem] text-faint">{m.label}</dt>
                    <dd className="mt-1.5 text-[0.92rem] leading-snug">{m.value || <Pending label={ui.pending}>{m.pending!}</Pending>}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>

          <div className="mt-14 md:mt-20">
            <ViewTransition name={`fig-${c.slug}`} share="case-morph" default="none">
              <div>
                <ConceptFigure slug={c.slug} locale={site.locale} badge={ui.conceptual} />
              </div>
            </ViewTransition>
          </div>
        </div>
      </header>

      <div className="container-x grid gap-x-10 py-20 md:py-28 lg:grid-cols-12">
        <aside className="hidden lg:col-span-3 lg:block">
          <CaseIndex items={index} label={ui.onThisPage} />
        </aside>
        <div className="lg:col-span-9 xl:col-span-8 xl:col-start-5">
          <CaseBlocks sections={c.sections} ui={ui} locale={site.locale} />
        </div>
      </div>

      <section aria-label={ui.nextCase} className="border-t border-line">
        <Link href={casePath(site.locale, next.slug)} className="group block">
          <div className="container-x grid items-end gap-6 py-16 md:grid-cols-12 md:py-24">
            <div className="md:col-span-8">
              <p className="label text-[0.72rem] text-faint">{ui.nextCase}</p>
              <p className="mt-4 text-h2 font-medium transition-colors group-hover:text-white">{next.title}</p>
              <p className="em-serif mt-2 text-2xl text-muted md:text-3xl">{next.chapter}</p>
            </div>
            <div className="flex md:col-span-4 md:justify-end">
              <span className="flex h-16 w-16 items-center justify-center rounded-full border border-line-strong transition-[background-color,border-color] duration-300 group-hover:border-produto group-hover:bg-produto group-hover:text-ink">
                <ArrowRight size={22} strokeWidth={1.5} className="arrow-shift" aria-hidden />
              </span>
            </div>
          </div>
        </Link>
      </section>

      <section className="border-t border-line">
        <div className="container-x flex flex-col items-start justify-between gap-6 py-14 md:flex-row md:items-center">
          <p className="max-w-[28ch] text-2xl font-medium leading-tight tracking-tight md:text-3xl">
            {site.contact.title} <span className="em-serif text-produto">{site.contact.titleEm}</span>
          </p>
          <ButtonLink href={sectionHref(site.locale, site.sections.contact, false)}>{site.nav.contact}</ButtonLink>
        </div>
      </section>
    </article>
  );
}
