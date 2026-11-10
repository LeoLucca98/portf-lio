import type { Locale } from "@/content/types";
import { getContent } from "@/lib/content";
import { homeJsonLd, JsonLd } from "@/lib/seo";
import { ScrollThread } from "@/components/layout/ScrollThread";
import { AboutContact } from "@/components/sections/AboutContact";
import { Hero } from "@/components/sections/Hero";
import { JourneySection } from "@/components/sections/JourneySection";
import { Operations } from "@/components/sections/Operations";
import { ProcessSection } from "@/components/sections/ProcessSection";
import { Projects } from "@/components/sections/Projects";
import { Skills } from "@/components/sections/Skills";

export function HomePage({ locale }: { locale: Locale }) {
  const content = getContent(locale);
  return (
    <>
      <JsonLd data={homeJsonLd(content.site)} />
      <ScrollThread />
      <Hero content={content} />
      <Projects content={content} />
      <Operations content={content} />
      <ProcessSection content={content} />
      <JourneySection content={content} />
      <Skills content={content} />
      <AboutContact content={content} />
    </>
  );
}
