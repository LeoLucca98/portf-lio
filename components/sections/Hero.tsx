import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { LocaleContent } from "@/content/types";
import { profile } from "@/content/profile";
import { resolveRef } from "@/lib/content";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { CountUp } from "@/components/ui/CountUp";
import { SignalCycle } from "./SignalCycle";

export function Hero({ content }: { content: LocaleContent }) {
  const { site } = content;
  const { hero, cycle, sections } = site;
  const locale = site.locale;
  const links = Object.fromEntries(cycle.relations.map((r) => [r.id, resolveRef(locale, r.ref)])) as unknown as Parameters<
    typeof SignalCycle
  >[0]["links"];

  return (
    <section id="inicio" aria-labelledby="hero-title" className="relative isolate overflow-hidden pt-[calc(var(--nav-h)+40px)] md:pt-[calc(var(--nav-h)+44px)]">
      <div className="ambient -z-10" />

      <div className="container-x grid items-center gap-y-12 lg:grid-cols-12 lg:gap-x-6">
        <div className="lg:col-span-6">
          <a
            href={`#${sections.contact}`}
            className="rise group inline-flex items-center gap-2.5 rounded-full border border-tecnologia/30 bg-tecnologia/[0.07] py-1.5 pl-3 pr-3.5 text-[0.85rem] text-fg/90 transition-colors hover:border-tecnologia/60"
            style={{ ["--d" as string]: "0ms" }}
          >
            <span className="relative flex h-2 w-2" aria-hidden>
              <span className="absolute inline-flex h-full w-full rounded-full bg-tecnologia opacity-60 motion-safe:animate-ping" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-tecnologia" />
            </span>
            {hero.status}
            <ArrowRight size={14} strokeWidth={1.75} className="arrow-shift text-tecnologia" aria-hidden />
          </a>

          <div className="rise mt-7 flex items-center gap-4" style={{ ["--d" as string]: "60ms" }}>
            <Image
              src={profile.photo}
              alt={hero.photoAlt}
              width={128}
              height={128}
              priority
              className="h-14 w-14 rounded-full object-cover ring-1 ring-line-strong md:h-16 md:w-16"
            />
            <div className="flex min-w-0 flex-col">
              <span className="text-[1.65rem] font-medium leading-none tracking-[-0.03em] md:text-[2rem]">{hero.name}</span>
              <span className="mt-2 text-[0.92rem] leading-snug text-muted md:text-[0.98rem]">{hero.identity}</span>
            </div>
          </div>

          <h1 id="hero-title" className="mt-8 max-w-[16ch] text-[clamp(2.5rem,1.4rem+3.3vw,4.6rem)] font-medium leading-[0.99] tracking-[-0.045em] md:mt-10">
            {hero.h1.before}
            <span className="relative inline-block whitespace-nowrap">
              <span className="em-serif text-[1.1em] leading-none text-fg">{hero.h1.em}</span>
              <svg aria-hidden viewBox="0 0 200 12" preserveAspectRatio="none" className="absolute -bottom-[0.06em] left-0 h-[0.14em] w-full overflow-visible">
                <path d="M2 8 C 50 2, 120 2, 198 6" pathLength={1} fill="none" stroke="var(--color-produto)" strokeWidth={3} strokeLinecap="round" className="draw-underline" vectorEffect="non-scaling-stroke" />
              </svg>
            </span>
            {hero.h1.after}
          </h1>

          <div className="mt-6 max-w-[34rem] space-y-3">
            <p className="rise text-lg leading-relaxed text-fg/90 md:text-[1.2rem]" style={{ ["--d" as string]: "120ms" }}>
              {hero.sub[0]}
            </p>
            <p className="rise text-[1.02rem] leading-relaxed text-muted" style={{ ["--d" as string]: "200ms" }}>
              {hero.sub[1]}
            </p>
          </div>

          <div className="rise mt-7 flex flex-wrap items-center gap-x-2.5 gap-y-3" style={{ ["--d" as string]: "280ms" }}>
            <ButtonLink href={`#${sections.projects}`}>{hero.ctas.projects}</ButtonLink>
            <ButtonLink href={`#${sections.journey}`} variant="ghost" icon="none">
              {hero.ctas.journey}
            </ButtonLink>
            <a
              href={`#${sections.contact}`}
              className="group inline-flex h-12 items-center gap-1.5 pl-2 text-[0.95rem] text-muted transition-colors hover:text-fg"
            >
              <span className="link-underline">{hero.ctas.contact}</span>
            </a>
          </div>
        </div>

        <div className="rise lg:col-span-6" style={{ ["--d" as string]: "160ms" }}>
          <SignalCycle cycle={cycle} links={links} />
        </div>
      </div>

      {/* Quick facts: the 30-second read */}
      <div className="container-x mt-14 md:mt-16">
        <dl className="rise grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-line bg-line md:grid-cols-5" style={{ ["--d" as string]: "360ms" }}>
          {hero.facts.map((f, i) => (
            <div key={f.label} className={`bg-bg px-4 py-4 md:px-5 ${i === hero.facts.length - 1 ? "col-span-2 md:col-span-1" : ""}`}>
              <dt className="label text-[0.72rem] text-faint">{f.label}</dt>
              <dd className="mt-1.5 text-[0.95rem] leading-snug text-fg">{f.value}</dd>
            </div>
          ))}
        </dl>
      </div>

      <ProofBand content={content} />
    </section>
  );
}

function ProofBand({ content }: { content: LocaleContent }) {
  const { site } = content;
  return (
    <div className="container-x mt-20 pb-4 md:mt-24">
      <h2 className="label flex items-center gap-3 text-muted" data-reveal>
        <span className="h-px w-6 bg-line-strong" aria-hidden />
        {site.proof.title}
      </h2>
      <ul className="mt-8 grid gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4" role="list">
        {site.proof.items.map((p, i) => {
          const ref = resolveRef(site.locale, p.ref);
          return (
            <li key={p.label} data-reveal style={{ ["--d" as string]: `${i * 70}ms` }}>
              <Link href={ref.href} className="group block border-t border-line pt-5 transition-colors duration-300 hover:border-produto/70">
                <p className={`whitespace-nowrap font-medium leading-none tracking-[-0.04em] text-fg ${p.value.length > 4 ? "text-[2.1rem] xl:text-[2.4rem]" : "text-[2.5rem] lg:text-[2.6rem] xl:text-5xl"}`}>
                  <CountUp value={p.value} count={p.count} />
                </p>
                <p className="mt-3 text-[0.95rem] leading-snug text-fg/90">{p.label}</p>
                <p className="label mt-3 text-[0.72rem] leading-relaxed text-muted transition-colors group-hover:text-fg">
                  {p.context}
                  <ArrowRight size={12} strokeWidth={2} className="arrow-shift ml-1.5 inline-block align-[-1px]" aria-hidden />
                </p>
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
