import Image from "next/image";
import { ArrowRight, ArrowUpRight, Download, Mail } from "lucide-react";
import type { LocaleContent } from "@/content/types";
import { profile } from "@/content/profile";
import { CopyEmail } from "@/components/ui/CopyEmail";
import { Pending } from "@/components/ui/Pending";
import { pillarColor } from "@/components/ui/PillarDot";

export function AboutContact({ content }: { content: LocaleContent }) {
  const { site } = content;
  const a = site.about;
  const c = site.contact;
  return (
    <>
      <section id={site.sections.about} aria-labelledby="about-title" className="relative py-20 md:py-28">
        <div className="container-x grid gap-y-12 md:grid-cols-12 md:gap-x-10">
          <div className="md:col-span-5 lg:col-span-4" data-reveal>
            <div className="relative overflow-hidden rounded-[24px] border border-line bg-surface-1">
              <Image
                src={profile.photo}
                alt={a.photoAlt}
                width={800}
                height={800}
                sizes="(min-width: 1024px) 380px, (min-width: 768px) 40vw, 100vw"
                className="aspect-[4/5] h-auto w-full object-cover object-[50%_30%] grayscale-[60%] contrast-[1.05]"
              />
              <div aria-hidden className="absolute inset-0 bg-gradient-to-t from-bg/70 via-transparent to-produto/10 mix-blend-normal" />
              <div aria-hidden className="absolute inset-0 shadow-[inset_0_0_0_1px_rgba(255,255,255,0.04)]" />
            </div>
          </div>
          <div className="md:col-span-7 lg:col-span-7 lg:col-start-6">
            <p className="label flex items-center gap-3 text-muted" data-reveal>
              <span className="text-produto">05</span>
              <span className="h-px w-6 bg-line-strong" aria-hidden />
              {a.eyebrow}
            </p>
            <h2 id="about-title" className="mt-6 text-h2 font-medium" data-reveal>
              {a.title}
            </h2>
            <div className="mt-8 max-w-[60ch] space-y-5 text-lg leading-relaxed text-fg/85">
              {a.paragraphs.map((p, i) => (
                <p key={i} data-reveal style={{ ["--d" as string]: `${60 + i * 50}ms` }} className={i === 1 ? "border-l border-produto/60 pl-5 text-fg" : ""}>
                  {p}
                </p>
              ))}
            </div>
            <dl className="mt-12 grid gap-px overflow-hidden rounded-2xl border border-line bg-line sm:grid-cols-3" data-reveal>
              {a.education.map((e) => (
                <div key={e.label} className="bg-bg p-4">
                  <dt className="label text-[0.72rem] text-faint">{e.label}</dt>
                  <dd className="mt-1.5 text-[0.9rem] leading-snug">{e.value}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </section>

      <section id={site.sections.contact} aria-labelledby="contact-title" className="relative isolate overflow-hidden border-t border-line pb-10 pt-20 md:pt-28">
        <div aria-hidden className="absolute inset-0 -z-10 bg-[radial-gradient(60%_50%_at_20%_30%,rgba(124,140,255,0.16),transparent_70%),radial-gradient(40%_40%_at_90%_80%,rgba(94,209,164,0.07),transparent_70%)]" />
        <div className="container-x">
          <p className="label flex items-center gap-3 text-muted" data-reveal>
            <span className="text-produto">06</span>
            <span className="h-px w-6 bg-line-strong" aria-hidden />
            {c.eyebrow}
          </p>

          <div className="mt-8 grid gap-y-14 lg:grid-cols-12 lg:gap-x-10">
            <div className="lg:col-span-7">
              <h2 id="contact-title" className="max-w-[15ch] text-[clamp(2.6rem,1.4rem+3.6vw,5rem)] font-medium leading-[0.98] tracking-[-0.045em]" data-reveal>
                {c.title} <span className="em-serif text-produto">{c.titleEm}</span>
              </h2>
              <p className="mt-8 max-w-[46ch] text-lg leading-relaxed text-fg/80" data-reveal style={{ ["--d" as string]: "80ms" }}>
                {c.sub}
              </p>

              <div className="mt-10 flex flex-wrap items-center gap-3" data-reveal style={{ ["--d" as string]: "140ms" }}>
                <a
                  href={`mailto:${profile.email}?subject=${encodeURIComponent(c.mailSubject)}`}
                  className="group inline-flex h-14 items-center gap-3 rounded-full bg-produto pl-7 pr-6 text-[1.02rem] font-medium text-ink shadow-[0_0_0_1px_rgba(124,140,255,0.45),0_14px_44px_-12px_rgba(124,140,255,0.75)] transition-[background-color,transform] duration-200 hover:bg-[#93a0ff] active:scale-[0.98]"
                >
                  <Mail size={18} strokeWidth={1.75} aria-hidden />
                  {c.primary}
                  <ArrowRight size={18} strokeWidth={1.75} className="arrow-shift" aria-hidden />
                </a>
                <a
                  href={profile.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex h-14 items-center gap-2.5 rounded-full border border-line-strong px-6 text-[1.02rem] text-fg transition-colors hover:border-fg/40 hover:bg-surface-2"
                >
                  {c.secondary}
                  <ArrowUpRight size={18} strokeWidth={1.75} className="arrow-shift arrow-shift-up" aria-hidden />
                </a>
              </div>

              <div className="mt-8 flex flex-wrap items-center gap-x-5 gap-y-3 text-[0.95rem]" data-reveal style={{ ["--d" as string]: "180ms" }}>
                <a href={`mailto:${profile.email}`} className="link-underline text-fg/90 hover:text-fg">
                  {profile.email}
                </a>
                <CopyEmail email={profile.email} copy={c.copy} copied={c.copied} />
                <a href={profile.cv} download className="group inline-flex items-center gap-2 text-muted transition-colors hover:text-fg">
                  <Download size={16} strokeWidth={1.75} className="transition-transform duration-200 group-hover:translate-y-0.5" aria-hidden />
                  {c.cvLabel}
                </a>
                {profile.github && (
                  <a href={profile.github} target="_blank" rel="noopener noreferrer" className="text-muted hover:text-fg">
                    {c.githubLabel}
                  </a>
                )}
              </div>
              {!profile.github && <Pending label={site.caseUi.pending}>GitHub: endereço ainda não informado (content/profile.ts).</Pending>}
            </div>

            <div className="lg:col-span-5" data-reveal style={{ ["--d" as string]: "120ms" }}>
              <div className="rounded-[24px] border border-line-strong/70 bg-surface-1/80 p-6 backdrop-blur-sm md:p-8">
                <p className="label text-[0.75rem] text-muted">{c.valueTitle}</p>
                <ol className="mt-6 space-y-6" role="list">
                  {c.values.map((v, i) => (
                    <li key={v.title} className="grid grid-cols-[1.75rem_1fr] gap-x-3">
                      <span className="label pt-1 text-[0.75rem]" style={{ color: pillarColor[v.pillar] }}>
                        0{i + 1}
                      </span>
                      <div>
                        <p className="text-[1.1rem] font-medium tracking-tight">{v.title}</p>
                        <p className="mt-1.5 text-[0.95rem] leading-relaxed text-muted">{v.text}</p>
                      </div>
                    </li>
                  ))}
                </ol>
              </div>
            </div>
          </div>

          {/* Signature: the name closes the page, the three colours close the loop */}
          <div aria-hidden className="mt-24 select-none overflow-hidden md:mt-32">
            <div className="flex gap-2">
              {(["negocio", "produto", "tecnologia"] as const).map((p) => (
                <span key={p} className="h-1 w-16 rounded-full md:w-24" style={{ background: pillarColor[p] }} />
              ))}
            </div>
            <p className="mt-6 whitespace-nowrap text-[clamp(2.6rem,10.6vw,9.75rem)] font-medium leading-[0.85] tracking-[-0.05em] text-[#1c1f25]">
              Leonardo Lucca
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
