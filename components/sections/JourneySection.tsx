import type { LocaleContent } from "@/content/types";
import { getCase } from "@/lib/content";
import { casePath } from "@/lib/i18n";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Journey } from "./Journey";

const buildMonth = () => {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}`;
};

export function JourneySection({ content }: { content: LocaleContent }) {
  const { site, experiences } = content;
  const j = site.journey;
  const withLinks = experiences.map((e) => ({
    ...e,
    caseLinks: (e.caseSlugs ?? []).map((slug) => ({ label: getCase(site.locale, slug)?.title ?? slug, href: casePath(site.locale, slug) })),
  }));
  return (
    <section id={site.sections.journey} aria-labelledby="journey-title" className="relative py-20 md:py-28">
      <div className="container-x">
        <SectionHeader index="03" eyebrow={j.eyebrow} title={j.title} intro={j.intro} id="journey-title" />
        <div className="mt-14 md:mt-20">
          <Journey experiences={withLinks} j={j} pendingLabel={site.caseUi.pending} now={buildMonth()} locale={site.locale} highlightId={site.sections.operations} />
        </div>
      </div>
    </section>
  );
}
