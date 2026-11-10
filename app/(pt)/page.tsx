import type { Metadata } from "next";
import { HomePage } from "@/components/pages/HomePage";
import { getContent } from "@/lib/content";
import { homeMetadata } from "@/lib/seo";

export const metadata: Metadata = homeMetadata(getContent("pt").site);

export default function Page() {
  return <HomePage locale="pt" />;
}
