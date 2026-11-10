import { getCase, caseSlugs } from "@/lib/content";
import { ogImage, ogSize } from "@/lib/og";

export const size = ogSize;
export const contentType = "image/png";
export const alt = "Leonardo Lucca";

export function generateStaticParams() {
  return caseSlugs.map((slug) => ({ slug }));
}

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const c = getCase("pt", slug)!;
  return ogImage({ kicker: `Leonardo Lucca · ${c.problemType}`, title: c.title, subtitle: c.chapter });
}
