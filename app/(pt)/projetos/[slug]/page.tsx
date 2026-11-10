import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CasePage } from "@/components/case/CasePage";
import { caseSlugs, getCase, getContent } from "@/lib/content";
import { caseMetadata } from "@/lib/seo";

export const dynamicParams = false;

export function generateStaticParams() {
  return caseSlugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const c = getCase("pt", slug);
  if (!c) return {};
  return caseMetadata(getContent("pt").site, c);
}

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const c = getCase("pt", slug);
  if (!c) notFound();
  return <CasePage content={getContent("pt")} c={c} />;
}
