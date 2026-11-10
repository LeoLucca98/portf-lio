import type { ReactNode } from "react";
import type { Locale } from "@/content/types";
import { getContent } from "@/lib/content";
import { fontVariables } from "@/lib/fonts";
import { Footer } from "./Footer";
import { Nav } from "./Nav";
import { Providers } from "./Providers";
import { RevealObserver } from "./RevealObserver";

export function RootDocument({ locale, children }: { locale: Locale; children: ReactNode }) {
  const { site } = getContent(locale);
  return (
    <html lang={site.htmlLang} className={fontVariables} suppressHydrationWarning>
      <body id="top">
        <script dangerouslySetInnerHTML={{ __html: "document.documentElement.classList.add('js')" }} />
        <a
          href="#conteudo"
          className="fixed left-4 top-3 z-[60] -translate-y-20 rounded-full bg-fg px-4 py-2 text-sm font-medium text-ink transition-transform focus-visible:translate-y-0"
        >
          {site.skipLink}
        </a>
        <Providers>
          <Nav locale={locale} nav={site.nav} contactId={site.sections.contact} />
          <main id="conteudo" tabIndex={-1} className="outline-none">
            {children}
          </main>
          <Footer site={site} />
          <RevealObserver />
        </Providers>
      </body>
    </html>
  );
}
