import { cases as casesPt } from "@/content/pt/cases";
import { experiences as expPt } from "@/content/pt/experiences";
import { site as sitePt } from "@/content/pt/site";
import { cases as casesEn } from "@/content/en/cases";
import { experiences as expEn } from "@/content/en/experiences";
import { site as siteEn } from "@/content/en/site";
import type { CaseSlug, EvidenceRef, LocaleContent, Locale } from "@/content/types";
import { casePath, homePath } from "./i18n";

const content: Record<Locale, LocaleContent> = {
  pt: { site: sitePt, experiences: expPt, cases: casesPt },
  en: { site: siteEn, experiences: expEn, cases: casesEn },
};

export function getContent(locale: Locale) {
  return content[locale];
}

export function getCase(locale: Locale, slug: string) {
  return content[locale].cases.find((c) => c.slug === slug);
}

export const caseSlugs: CaseSlug[] = ["telabrasil", "cultbr", "oraculo"];

export function resolveRef(locale: Locale, ref: EvidenceRef, onHome = true): { label: string; href: string; isCase: boolean } {
  const c = content[locale];
  if ("case" in ref) {
    const cs = c.cases.find((x) => x.slug === ref.case);
    return { label: cs?.title.replace(/ de Triagem| Triage/, "") ?? ref.case, href: casePath(locale, ref.case), isCase: true };
  }
  const exp = c.experiences.find((x) => x.id === ref.exp);
  const anchor = `#exp-${ref.exp}`;
  return {
    label: exp?.project ?? exp?.org ?? ref.exp,
    href: onHome ? anchor : `${homePath(locale)}${anchor}`,
    isCase: false,
  };
}
