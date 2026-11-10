import { ogImage, ogSize } from "@/lib/og";

export const alt = "Leonardo Lucca — Digital Product, Requirements Engineering and Applied AI";
export const size = ogSize;
export const contentType = "image/png";

export default function Image() {
  return ogImage({
    kicker: "Leonardo Lucca · Business · Product · Technology",
    title: "Between the problem and the code, there's a product decision.",
    subtitle: "Digital product, requirements engineering and applied AI.",
  });
}
