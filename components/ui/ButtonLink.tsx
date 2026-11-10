import Link from "next/link";
import { ArrowRight, ArrowUpRight, Download } from "lucide-react";
import type { ReactNode } from "react";

type Variant = "primary" | "ghost" | "text";
type Props = {
  href: string;
  children: ReactNode;
  variant?: Variant;
  icon?: "arrow" | "external" | "download" | "none";
  className?: string;
  download?: boolean;
  external?: boolean;
  ariaLabel?: string;
};

const styles: Record<Variant, string> = {
  primary:
    "h-12 px-5 rounded-full bg-produto text-ink font-medium hover:bg-[#93a0ff] active:scale-[0.98] shadow-[0_0_0_1px_rgba(124,140,255,0.4),0_8px_30px_-10px_rgba(124,140,255,0.6)]",
  ghost:
    "h-12 px-5 rounded-full border border-line-strong text-fg hover:border-fg/40 hover:bg-surface-2 active:scale-[0.98]",
  text: "h-12 px-1 text-muted hover:text-fg",
};

export function ButtonLink({ href, children, variant = "primary", icon = "arrow", className = "", download, external, ariaLabel }: Props) {
  const Icon = icon === "external" ? ArrowUpRight : icon === "download" ? Download : icon === "arrow" ? ArrowRight : null;
  const cls = `group inline-flex items-center justify-center gap-2 text-[0.95rem] transition-[background-color,border-color,color,transform] duration-200 ${styles[variant]} ${className}`;
  const inner = (
    <>
      <span>{children}</span>
      {Icon && (
        <Icon
          aria-hidden
          size={17}
          strokeWidth={1.75}
          className={icon === "external" ? "arrow-shift arrow-shift-up" : icon === "download" ? "transition-transform duration-200 group-hover:translate-y-0.5" : "arrow-shift"}
        />
      )}
    </>
  );
  const isInternalRoute = href.startsWith("/") && !href.includes("#") && !download && !href.endsWith(".pdf");
  if (isInternalRoute) {
    return (
      <Link href={href} className={cls} aria-label={ariaLabel}>
        {inner}
      </Link>
    );
  }
  return (
    <a
      href={href}
      className={cls}
      aria-label={ariaLabel}
      download={download || undefined}
      target={external ? "_blank" : undefined}
      rel={external ? "noopener noreferrer" : undefined}
    >
      {inner}
    </a>
  );
}
