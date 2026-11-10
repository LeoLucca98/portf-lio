import type { Metadata } from "next";
import { profile, siteUrl } from "@/content/profile";
import type { CaseStudy, Locale, SiteContent } from "@/content/types";
import { casePath, homePath } from "./i18n";

export function homeMetadata(site: SiteContent): Metadata {
  const path = homePath(site.locale);
  return {
    metadataBase: new URL(siteUrl),
    title: site.meta.title,
    description: site.meta.description,
    keywords: site.meta.keywords,
    authors: [{ name: profile.name, url: profile.linkedin }],
    alternates: { canonical: path, languages: { "pt-BR": "/", en: "/en", "x-default": "/" } },
    openGraph: {
      type: "profile",
      locale: site.ogLocale,
      url: path,
      siteName: profile.name,
      title: site.meta.title,
      description: site.meta.description,
      firstName: "Leonardo",
      lastName: "Lucca",
    },
    twitter: { card: "summary_large_image", title: site.meta.title, description: site.meta.description },
    robots: { index: true, follow: true },
  };
}

export function caseMetadata(site: SiteContent, c: CaseStudy): Metadata {
  const path = casePath(site.locale, c.slug);
  const title = `${c.title} — ${c.chapter} | ${profile.name}`;
  return {
    metadataBase: new URL(siteUrl),
    title,
    description: c.seoDescription,
    alternates: {
      canonical: path,
      languages: { "pt-BR": casePath("pt", c.slug), en: casePath("en", c.slug), "x-default": casePath("pt", c.slug) },
    },
    openGraph: { type: "article", locale: site.ogLocale, url: path, siteName: profile.name, title, description: c.seoDescription },
    twitter: { card: "summary_large_image", title, description: c.seoDescription },
  };
}

function personNode(locale: Locale) {
  return {
    "@type": "Person",
    "@id": `${siteUrl}/#person`,
    name: profile.name,
    alternateName: profile.fullName,
    url: siteUrl,
    image: `${siteUrl}${profile.photo}`,
    email: `mailto:${profile.email}`,
    jobTitle: locale === "pt" ? "Engenheiro de Requisitos" : "Requirements Engineer",
    description:
      locale === "pt"
        ? "Produto digital, engenharia de requisitos e IA aplicada. Graduação em Engenharia da Computação em andamento na UFAL, com conclusão prevista em 2028."
        : "Digital product, requirements engineering and applied AI. Computer Engineering undergraduate at UFAL, expected to graduate in 2028.",
    worksFor: {
      "@type": "Organization",
      name: "NEES — Núcleo de Excelência em Tecnologias Sociais",
      parentOrganization: { "@type": "CollegeOrUniversity", name: "Universidade Federal de Alagoas (UFAL)" },
    },
    // Degree in progress: affiliation, not alumniOf.
    affiliation: { "@type": "CollegeOrUniversity", name: "Universidade Federal de Alagoas (UFAL)" },
    address: { "@type": "PostalAddress", addressLocality: profile.city, addressRegion: profile.region, addressCountry: profile.country },
    knowsLanguage: ["pt-BR", "en"],
    knowsAbout: [
      "Product Ownership",
      "Product Discovery",
      "Requirements Engineering",
      "Backlog Management",
      "User Stories",
      "Behavior-Driven Development",
      "BPMN",
      "Retrieval-Augmented Generation",
      "Hybrid Search",
    ],
    sameAs: [profile.linkedin, ...(profile.github ? [profile.github] : [])],
  };
}

export function homeJsonLd(site: SiteContent) {
  return {
    "@context": "https://schema.org",
    "@graph": [
      personNode(site.locale),
      {
        "@type": "ProfilePage",
        "@id": `${siteUrl}${homePath(site.locale)}#page`,
        url: `${siteUrl}${homePath(site.locale)}`,
        name: site.meta.title,
        description: site.meta.description,
        inLanguage: site.htmlLang,
        mainEntity: { "@id": `${siteUrl}/#person` },
      },
    ],
  };
}

export function caseJsonLd(site: SiteContent, c: CaseStudy) {
  return {
    "@context": "https://schema.org",
    "@graph": [
      personNode(site.locale),
      {
        "@type": "Article",
        headline: `${c.title}: ${c.chapter}`,
        description: c.seoDescription,
        inLanguage: site.htmlLang,
        url: `${siteUrl}${casePath(site.locale, c.slug)}`,
        author: { "@id": `${siteUrl}/#person` },
        about: c.problemType,
      },
    ],
  };
}

export function JsonLd({ data }: { data: object }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }}
    />
  );
}
