"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";
import { Download, Menu, X } from "lucide-react";
import type { Locale, SiteContent } from "@/content/types";
import { profile } from "@/content/profile";
import { homePath, sectionHref, switchLocalePath } from "@/lib/i18n";

type Props = { locale: Locale; nav: SiteContent["nav"]; contactId: string };

const useIsoLayoutEffect = typeof window === "undefined" ? useEffect : useLayoutEffect;

export function Nav({ locale, nav, contactId }: Props) {
  const pathname = usePathname();
  const onHome = pathname === homePath(locale);
  const [active, setActive] = useState<string | null>(null);
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const listRef = useRef<HTMLUListElement>(null);
  const [pill, setPill] = useState<{ x: number; w: number } | null>(null);
  const menuButton = useRef<HTMLButtonElement>(null);
  const firstMenuLink = useRef<HTMLAnchorElement>(null);
  const other = switchLocalePath(pathname);
  const onCase = pathname.includes("/projetos/") || pathname.includes("/projects/");
  const current = onHome ? active : onCase ? (nav.links[0]?.id ?? null) : null;

  // Active section tracking (home only).
  useEffect(() => {
    if (!onHome) return;
    const ids = nav.links.map((l) => l.id);
    const els = ids.map((id) => document.getElementById(id)).filter((el): el is HTMLElement => !!el);
    const visible = new Map<string, number>();
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) visible.set(e.target.id, e.isIntersecting ? e.intersectionRatio : 0);
        let best: string | null = null;
        let bestRatio = 0;
        for (const id of ids) {
          const r = visible.get(id) ?? 0;
          if (r > bestRatio) {
            best = id;
            bestRatio = r;
          }
        }
        setActive(best);
      },
      { rootMargin: "-35% 0px -55% 0px", threshold: [0, 0.01, 0.25, 0.5, 1] },
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [onHome, nav.links, pathname]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const measure = useCallback(() => {
    const list = listRef.current;
    if (!list || !current) return setPill(null);
    const el = list.querySelector<HTMLElement>(`[data-id="${current}"]`);
    if (!el) return setPill(null);
    setPill({ x: el.offsetLeft, w: el.offsetWidth });
  }, [current]);

  useIsoLayoutEffect(() => {
    measure();
  }, [measure]);

  useEffect(() => {
    window.addEventListener("resize", measure);
    document.fonts?.ready.then(measure).catch(() => {});
    return () => window.removeEventListener("resize", measure);
  }, [measure]);

  // Mobile menu: scroll lock, Escape, focus handoff.
  useEffect(() => {
    if (!open) return;
    const trigger = menuButton.current;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    firstMenuLink.current?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
      trigger?.focus();
    };
  }, [open]);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 h-[var(--nav-h)] transition-[background-color,border-color,backdrop-filter] duration-300 ${
        scrolled || open
          ? "border-b border-line/80 bg-bg/90 backdrop-blur-xl supports-[backdrop-filter]:bg-bg/80"
          : "border-b border-transparent"
      }`}
    >
      <nav className="container-x flex h-full items-center justify-between gap-6" aria-label="Principal">
        <Link
          href={homePath(locale)}
          className="group flex items-center gap-3 rounded-md"
          aria-label={`${profile.name} — ${nav.home}`}
          onClick={() => setOpen(false)}
        >
          <Monogram />
          <span className="hidden text-[0.95rem] font-medium tracking-tight text-fg sm:inline">{profile.name}</span>
        </Link>

        <ul ref={listRef} className="relative hidden items-center lg:flex" role="list">
          {pill && (
            <span
              aria-hidden
              className="absolute top-1/2 h-8 rounded-full border border-line-strong bg-surface-2 transition-[transform,width] duration-[400ms] ease-[var(--ease-out-soft)] motion-reduce:transition-none"
              style={{ width: pill.w, transform: `translate(${pill.x}px, -50%)`, left: 0 }}
            />
          )}
          {nav.links.map((l) => (
            <li key={l.id}>
              <a
                data-id={l.id}
                href={sectionHref(locale, l.id, onHome)}
                aria-current={current === l.id ? "true" : undefined}
                className={`relative z-10 block rounded-full px-3.5 py-1.5 text-sm transition-colors duration-200 ${
                  current === l.id ? "text-fg" : "text-muted hover:text-fg"
                }`}
              >
                {l.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-1.5 sm:gap-2">
          <a
            href={other.href}
            hrefLang={other.locale === "pt" ? "pt-BR" : "en"}
            lang={other.locale === "pt" ? "pt-BR" : "en"}
            className="label hidden h-9 items-center rounded-full px-3 text-muted transition-colors hover:text-fg sm:inline-flex"
            aria-label={`${nav.language}: ${nav.otherLanguage}`}
          >
            <span className="text-fg">{nav.languageName}</span>
            <span className="mx-1.5 text-faint">/</span>
            {nav.otherLanguage}
          </a>
          <a
            href={profile.cv}
            download
            className="group hidden h-9 items-center gap-1.5 rounded-full px-3 text-sm text-muted transition-colors hover:text-fg md:inline-flex"
            aria-label={nav.cvAria}
          >
            <Download size={15} strokeWidth={1.75} className="transition-transform duration-200 group-hover:translate-y-0.5" />
            {nav.cv}
          </a>
          <a
            href={sectionHref(locale, contactId, onHome)}
            className="inline-flex h-9 items-center rounded-full bg-fg px-4 text-sm font-medium text-ink transition-[background-color,transform] duration-200 hover:bg-white active:scale-[0.97]"
          >
            {nav.contact}
          </a>
          <button
            ref={menuButton}
            type="button"
            className="inline-flex h-9 w-9 items-center justify-center rounded-full text-fg lg:hidden"
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? nav.close : nav.menu}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X size={20} strokeWidth={1.75} /> : <Menu size={20} strokeWidth={1.75} />}
          </button>
        </div>
      </nav>

      <div
        id="mobile-menu"
        hidden={!open}
        className="fixed inset-x-0 bottom-0 top-[var(--nav-h)] z-40 overflow-y-auto bg-bg lg:hidden"
      >
        <div className="container-x flex min-h-full flex-col justify-between pb-10 pt-8">
          <ul className="flex flex-col" role="list">
            {nav.links.map((l, i) => (
              <li key={l.id} className="border-b border-line">
                <a
                  ref={i === 0 ? firstMenuLink : undefined}
                  href={sectionHref(locale, l.id, onHome)}
                  onClick={() => setOpen(false)}
                  className="flex items-baseline justify-between py-5 text-[2rem] font-medium tracking-[-0.03em]"
                >
                  {l.label}
                  <span className="label text-faint">0{i + 1}</span>
                </a>
              </li>
            ))}
          </ul>
          <div className="mt-10 flex flex-wrap items-center gap-3">
            <a
              href={profile.cv}
              download
              className="inline-flex h-11 items-center gap-2 rounded-full border border-line-strong px-5 text-sm"
            >
              <Download size={16} strokeWidth={1.75} /> {nav.cvAria}
            </a>
            <a
              href={other.href}
              hrefLang={other.locale === "pt" ? "pt-BR" : "en"}
              className="label inline-flex h-11 items-center rounded-full border border-line-strong px-5 text-muted"
            >
              {nav.languageName} / {nav.otherLanguage}
            </a>
          </div>
        </div>
      </div>
    </header>
  );
}

function Monogram() {
  return (
    <span
      aria-hidden
      className="relative flex h-8 w-8 items-center justify-center rounded-[9px] border border-line-strong bg-surface-2 font-mono text-[0.7rem] font-medium tracking-tight text-fg transition-colors duration-200 group-hover:border-produto/60"
    >
      LL
      <span className="absolute -right-[3px] -top-[3px] h-1.5 w-1.5 rounded-full bg-produto" />
    </span>
  );
}
