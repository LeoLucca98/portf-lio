import type { EvidenceRef, LocaleContent } from "@/content/types";
import { resolveRef } from "@/lib/content";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { SkillsMap, type Source } from "./SkillsMap";

const keyOf = (r: EvidenceRef) => ("case" in r ? `case:${r.case}` : `exp:${r.exp}`);

export function Skills({ content }: { content: LocaleContent }) {
  const { site, cases, experiences } = content;
  const s = site.skills;

  const groups = s.pillars.map((p) => ({
    pillar: p.pillar,
    title: p.title,
    description: p.description,
    skills: p.items.map((item, i) => ({ id: `${p.pillar}-${i}`, label: item.label, pillar: p.pillar, sources: item.evidence.map(keyOf) })),
  }));

  // Case studies first, then the other experiences, in a stable order.
  const used = new Set(groups.flatMap((g) => g.skills.flatMap((k) => k.sources)));
  const ordered: EvidenceRef[] = [
    ...cases.map((c) => ({ case: c.slug }) as EvidenceRef),
    ...(["phicoding", "selles", "spte", "apa", "requiem"] as const).map((exp) => ({ exp }) as EvidenceRef),
  ];
  const sources: Source[] = ordered
    .filter((r) => used.has(keyOf(r)))
    .map((r) => {
      const res = resolveRef(site.locale, r);
      const detail = "exp" in r ? (experiences.find((e) => e.id === r.exp)?.role ?? "") : "";
      return { key: keyOf(r), label: res.label, href: res.href, isCase: res.isCase, detail };
    });

  return (
    <section id={site.sections.skills} aria-labelledby="skills-title" className="relative border-t border-line bg-surface-1/40 py-20 md:py-28">
      <div className="container-x">
        <SectionHeader index="04" eyebrow={s.eyebrow} title={s.title} intro={s.intro} id="skills-title" />
        <div className="mt-14 md:mt-20">
          <SkillsMap groups={groups} sources={sources} s={s} />
        </div>
      </div>
    </section>
  );
}
