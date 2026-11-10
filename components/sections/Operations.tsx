import Link from "next/link";
import { ArrowRight, ShieldCheck } from "lucide-react";
import type { LocaleContent } from "@/content/types";
import { OpsLoop } from "./OpsLoop";

export function Operations({ content }: { content: LocaleContent }) {
  const { site } = content;
  const o = site.operations;
  return (
    <section id={site.sections.operations} aria-labelledby="operations-title" className="relative pb-16 md:pb-20">
      <div className="container-x">
        <div className="relative isolate overflow-clip rounded-[32px] border border-tecnologia/20 bg-surface-1/60 px-5 py-14 sm:px-8 md:px-12 md:py-20">
          <div
            aria-hidden
            className="absolute inset-0 -z-10"
            style={{
              background:
                "radial-gradient(55% 45% at 85% 0%, rgba(94,209,164,0.12), transparent 70%), radial-gradient(40% 40% at 0% 100%, rgba(124,140,255,0.07), transparent 70%)",
            }}
          />
          <div aria-hidden className="dot-grid absolute inset-0 -z-10 opacity-40 [mask-image:linear-gradient(to_bottom,black,transparent_60%)]" />

          {/* Heading */}
          <div className="grid gap-y-8 lg:grid-cols-12 lg:gap-x-10">
            <div className="lg:col-span-7">
              <p className="label flex flex-wrap items-center gap-3 text-[0.75rem] text-muted" data-reveal>
                <span className="relative flex h-2 w-2" aria-hidden>
                  <span className="absolute inline-flex h-full w-full rounded-full bg-tecnologia opacity-60 motion-safe:animate-ping" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-tecnologia" />
                </span>
                {o.eyebrow}
              </p>
              <h2 id="operations-title" className="mt-6 max-w-[14ch] text-h2 font-medium" data-reveal style={{ ["--d" as string]: "60ms" }}>
                {o.title}
              </h2>
            </div>
            <div className="self-end lg:col-span-5" data-reveal style={{ ["--d" as string]: "120ms" }}>
              <p className="text-[1.05rem] leading-relaxed text-fg/85">{o.intro}</p>
            </div>
          </div>

          <dl className="mt-10 grid gap-px overflow-hidden rounded-2xl border border-line bg-line sm:grid-cols-3" data-reveal>
            {o.facts.map((f) => (
              <div key={f.label} className="bg-bg/80 p-4">
                <dt className="label text-[0.72rem] text-faint">{f.label}</dt>
                <dd className="mt-1.5 text-[0.95rem] leading-snug">{f.value}</dd>
              </div>
            ))}
          </dl>

          {/* The loop and what each step built */}
          <div className="mt-14 md:mt-16">
            <OpsLoop ops={o} />
          </div>

          {/* Outcome and takeaway */}
          <div className="mt-14 grid gap-y-8 border-t border-line pt-10 md:mt-16 lg:grid-cols-12 lg:gap-x-10">
            <div className="flex gap-4 lg:col-span-6" data-reveal>
              <span className="mt-1 flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-tecnologia/40 bg-tecnologia/10 text-tecnologia">
                <ShieldCheck size={20} strokeWidth={1.75} aria-hidden />
              </span>
              <div>
                <p className="text-[1.45rem] font-medium leading-snug tracking-tight md:text-[1.7rem]">{o.outcome.title}</p>
                <p className="mt-2 text-[0.98rem] text-muted">{o.outcome.text}</p>
              </div>
            </div>
            <div className="lg:col-span-6" data-reveal style={{ ["--d" as string]: "80ms" }}>
              <p className="em-serif text-[1.35rem] leading-snug text-fg/90 md:text-[1.5rem]">{o.takeaway}</p>
              <Link href="#exp-selles" className="group mt-5 inline-flex items-center gap-2 text-[0.95rem] text-tecnologia">
                <span className="link-underline">{o.timelineLink}</span>
                <ArrowRight size={16} strokeWidth={1.75} className="arrow-shift" aria-hidden />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
