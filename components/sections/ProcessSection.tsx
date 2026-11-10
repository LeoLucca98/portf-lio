import type { LocaleContent } from "@/content/types";
import { resolveRef } from "@/lib/content";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { ProcessSteps } from "./Process";

export function ProcessSection({ content }: { content: LocaleContent }) {
  const { site } = content;
  const p = site.process;
  const steps = p.steps.map((s) => ({ ...s, whereResolved: s.where.map((w) => resolveRef(site.locale, w)) }));
  return (
    <section id={site.sections.process} aria-labelledby="process-title" className="relative border-t border-line bg-surface-1/40 py-20 md:py-28">
      <div className="container-x">
        <SectionHeader index="02" eyebrow={p.eyebrow} title={p.title} intro={p.intro} id="process-title" />
        <div className="mt-16 md:mt-24">
          <ProcessSteps
            steps={steps}
            labels={{ questions: p.questionsLabel, artifacts: p.artifactsLabel, where: p.whereLabel, note: p.note }}
          />
        </div>
      </div>
    </section>
  );
}
