import "../globals.css";
import type { Viewport } from "next";
import type { ReactNode } from "react";
import { RootDocument } from "@/components/layout/RootDocument";

export const viewport: Viewport = { themeColor: "#0A0B0D", colorScheme: "dark" };

export default function Layout({ children }: { children: ReactNode }) {
  return <RootDocument locale="pt">{children}</RootDocument>;
}
