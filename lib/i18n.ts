import type { CaseSlug, Locale } from "@/content/types";

export const locales: Locale[] = ["pt", "en"];

export function homePath(locale: Locale) {
  return locale === "pt" ? "/" : "/en";
}

export function casePath(locale: Locale, slug: CaseSlug) {
  return locale === "pt" ? `/projetos/${slug}` : `/en/projects/${slug}`;
}

export function sectionHref(locale: Locale, id: string, onHome: boolean) {
  if (onHome) return `#${id}`;
  return locale === "pt" ? `/#${id}` : `/en#${id}`;
}

/** Maps a pathname to its equivalent in the other locale. */
export function switchLocalePath(pathname: string): { locale: Locale; href: string } {
  const isEn = pathname === "/en" || pathname.startsWith("/en/");
  if (isEn) {
    const rest = pathname.replace(/^\/en/, "");
    const m = rest.match(/^\/projects\/([^/]+)/);
    return { locale: "pt", href: m ? `/projetos/${m[1]}` : "/" };
  }
  const m = pathname.match(/^\/projetos\/([^/]+)/);
  return { locale: "en", href: m ? `/en/projects/${m[1]}` : "/en" };
}
