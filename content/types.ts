export type Locale = "pt" | "en";
export type Pillar = "negocio" | "produto" | "tecnologia";

/**
 * `pending`: information that still has to come from Leonardo. Rendered only in
 * development so gaps stay visible without ever reaching production.
 * `restricted`: internal detail that depends on authorization. Rendered only
 * when SHOW_RESTRICTED=1.
 */
export type Visibility = { pending?: string; restricted?: boolean };

export type CaseSlug = "telabrasil" | "cultbr" | "oraculo";
export type ExperienceId =
  | "telabrasil"
  | "cultbr"
  | "spte"
  | "apa"
  | "requiem"
  | "phicoding"
  | "selles";

/** An evidence reference: a case study page or an experience in the journey. */
export type EvidenceRef = { case: CaseSlug } | { exp: ExperienceId };

export type Link = { label: string; href: string };

export type Fact = { label: string; value: string };

export type ProofItem = {
  value: string;
  /** Numeric part animated by the count-up; omitted for non-numeric values. */
  count?: number;
  label: string;
  context: string;
  ref: EvidenceRef;
};

export type CycleRelation = {
  id: "np" | "pt" | "tn" | "center";
  from?: Pillar;
  to?: Pillar;
  title: string;
  description: string;
  example: string;
  ref: EvidenceRef;
};

export type ProcessStep = {
  id: string;
  title: string;
  summary: string;
  questions: string[];
  artifacts: string[];
  where: EvidenceRef[];
};

export type Experience = {
  id: ExperienceId;
  org: string;
  project?: string;
  role: string;
  /** YYYY-MM */
  start: string;
  /** YYYY-MM or "present" */
  end: string;
  lane: "nees" | "tech";
  pillars: Pillar[];
  summary: string;
  context?: string;
  contribution: string[];
  result: string;
  caseSlugs?: CaseSlug[];
  /** Has its own highlight section on the home page. */
  highlight?: boolean;
  pending?: string[];
};

export type SkillItem = { label: string; evidence: EvidenceRef[] };
export type SkillPillar = {
  pillar: Pillar;
  title: string;
  description: string;
  items: SkillItem[];
};

export type Decision = Visibility & {
  title: string;
  context: string;
  question: string;
  /** Only alternatives that are actually documented. */
  alternatives?: string[];
  choice: string;
  outcome: string;
};

export type WalkthroughStep = {
  id: string;
  label: string;
  title: string;
  body: string;
  /** Illustrative content shown in the simulated panel. */
  sample: { kind: "ticket" | "search" | "evidence" | "suggestion" | "human"; lines: string[] };
};

export type CaseSection = Visibility &
  (
    | { kind: "text"; id: string; title: string; paragraphs: string[] }
    | { kind: "split"; id: string; title: string; mine: string[]; team: string[] }
    | { kind: "artifacts"; id: string; title: string; intro: string; items: { name: string; why: string }[] }
    | { kind: "decisions"; id: string; title: string; intro?: string; items: Decision[] }
    | { kind: "walkthrough"; id: string; title: string; intro: string; disclaimer: string; steps: WalkthroughStep[] }
    | {
        kind: "results";
        id: string;
        title: string;
        items: (Visibility & { value?: string; label: string; note: string; scope: "individual" | "team" })[];
        footnote?: string;
      }
    | { kind: "bridge"; id: string; title: string; paragraphs: string[]; ref: EvidenceRef; cta: string }
    | {
        kind: "modules";
        id: string;
        title: string;
        intro: string;
        role: string;
        items: (Visibility & { name: string; description?: string })[];
      }
  );

export type CaseStudy = {
  slug: CaseSlug;
  index: string;
  title: string;
  chapter: string;
  problemType: string;
  question: string;
  summary: string;
  tag?: string;
  emphasis: Pillar[];
  highlight: { value: string; label: string };
  /** Real artwork for the home chapter; replaces the conceptual figure there. */
  cover?: { src: string; alt: string; width: number; height: number };
  /** Named deliverables worth surfacing on the home chapter. */
  features?: { label: string; items: string[] };
  meta: (Fact & Visibility)[];
  seoDescription: string;
  sections: CaseSection[];
};

export type SiteContent = {
  locale: Locale;
  htmlLang: string;
  ogLocale: string;
  meta: { title: string; description: string; keywords: string[] };
  skipLink: string;
  nav: {
    home: string;
    links: { id: string; label: string }[];
    contact: string;
    cv: string;
    cvAria: string;
    menu: string;
    close: string;
    language: string;
    languageName: string;
    otherLanguage: string;
  };
  sections: {
    projects: string;
    operations: string;
    process: string;
    journey: string;
    skills: string;
    about: string;
    contact: string;
  };
  hero: {
    status: string;
    name: string;
    identity: string;
    h1: { before: string; em: string; after: string };
    sub: string[];
    ctas: { projects: string; journey: string; contact: string };
    facts: Fact[];
    photoAlt: string;
  };
  cycle: {
    label: string;
    nodes: Record<Pillar, { label: string; short: string }>;
    center: string;
    hint: string;
    relations: CycleRelation[];
    see: string;
  };
  proof: { title: string; items: ProofItem[] };
  projects: {
    eyebrow: string;
    title: string;
    intro: string;
    read: string;
    questionLabel: string;
    conceptual: string;
  };
  operations: {
    eyebrow: string;
    title: string;
    intro: string;
    facts: Fact[];
    figureLabel: string;
    center: string;
    centerSub: string;
    didLabel: string;
    productLabel: string;
    phases: { id: string; name: string; did: string[]; skill: string; skillText: string }[];
    outcome: { title: string; text: string };
    takeaway: string;
    timelineLink: string;
  };
  process: {
    eyebrow: string;
    title: string;
    intro: string;
    note: string;
    questionsLabel: string;
    artifactsLabel: string;
    whereLabel: string;
    steps: ProcessStep[];
  };
  journey: {
    eyebrow: string;
    title: string;
    intro: string;
    lanes: Record<Experience["lane"], string>;
    present: string;
    chapters: { year: string; title: string }[];
    contextLabel: string;
    contributionLabel: string;
    resultLabel: string;
    caseLink: string;
    highlightLink: string;
    expand: string;
    collapse: string;
    overviewLabel: string;
  };
  skills: {
    eyebrow: string;
    title: string;
    intro: string;
    evidenceLabel: string;
    sourcesTitle: string;
    hint: string;
    caseKind: string;
    expKind: string;
    provenIn: string;
    provesCount: string;
    clear: string;
    open: string;
    pillars: SkillPillar[];
  };
  about: {
    eyebrow: string;
    title: string;
    paragraphs: string[];
    education: Fact[];
    photoAlt: string;
  };
  contact: {
    eyebrow: string;
    title: string;
    titleEm: string;
    sub: string;
    primary: string;
    secondary: string;
    mailSubject: string;
    valueTitle: string;
    values: { pillar: Pillar; title: string; text: string }[];
    emailLabel: string;
    copy: string;
    copied: string;
    linkedinLabel: string;
    cvLabel: string;
    githubLabel: string;
  };
  caseUi: {
    back: string;
    onThisPage: string;
    mine: string;
    team: string;
    expandAll: string;
    collapseAll: string;
    question: string;
    context: string;
    alternatives: string;
    choice: string;
    outcome: string;
    next: string;
    prev: string;
    step: string;
    nextCase: string;
    individual: string;
    team_scope: string;
    pending: string;
    restricted: string;
    conceptual: string;
  };
  footer: { line: string; top: string; built: string };
  notFound: { title: string; text: string; back: string };
};

export type LocaleContent = {
  site: SiteContent;
  experiences: Experience[];
  cases: CaseStudy[];
};
