import { ogImage, ogSize } from "@/lib/og";

export const alt = "Leonardo Lucca — Produto Digital, Engenharia de Requisitos e IA Aplicada";
export const size = ogSize;
export const contentType = "image/png";

export default function Image() {
  return ogImage({
    kicker: "Leonardo Lucca · Negócio · Produto · Tecnologia",
    title: "Entre o problema e o código, existe uma decisão de produto.",
    subtitle: "Produto digital, engenharia de requisitos e IA aplicada.",
  });
}
