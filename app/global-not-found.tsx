import "./globals.css";
import type { Metadata } from "next";
import Link from "next/link";
import { fontVariables } from "@/lib/fonts";
import { siteUrl } from "@/content/profile";
import { site as pt } from "@/content/pt/site";
import { site as en } from "@/content/en/site";

export const metadata: Metadata = { metadataBase: new URL(siteUrl), title: "404 — Leonardo Lucca", robots: { index: false } };

export default function GlobalNotFound() {
  return (
    <html lang="pt-BR" className={fontVariables}>
      <body>
        <main className="relative isolate flex min-h-svh items-center overflow-hidden">
          <div className="ambient -z-10" />
          <div className="container-x">
            <p className="label text-produto">404</p>
            <h1 className="mt-6 max-w-[14ch] text-display font-medium">{pt.notFound.title}</h1>
            <p className="mt-6 max-w-[48ch] text-lg text-muted">{pt.notFound.text}</p>
            <div className="mt-10 flex flex-wrap gap-3">
              <Link href="/" className="inline-flex h-12 items-center rounded-full bg-produto px-6 font-medium text-ink">
                {pt.notFound.back}
              </Link>
              <Link href="/en" lang="en" className="inline-flex h-12 items-center rounded-full border border-line-strong px-6 text-fg">
                {en.notFound.back} (EN)
              </Link>
            </div>
          </div>
        </main>
      </body>
    </html>
  );
}
