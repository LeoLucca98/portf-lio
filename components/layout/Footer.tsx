import { ArrowUp } from "lucide-react";
import type { SiteContent } from "@/content/types";
import { profile } from "@/content/profile";

export function Footer({ site }: { site: SiteContent }) {
  return (
    <footer className="border-t border-line">
      <div className="container-x flex flex-col gap-6 py-10 text-sm text-muted md:flex-row md:items-center md:justify-between">
        <div className="flex flex-col gap-1">
          <span className="text-fg">© {new Date().getFullYear()} {profile.name}</span>
          <span className="label text-faint">{site.footer.line}</span>
        </div>
        <p className="text-faint">{site.footer.built}</p>
        <a href="#top" className="group inline-flex items-center gap-2 self-start text-muted transition-colors hover:text-fg md:self-auto">
          {site.footer.top}
          <ArrowUp size={15} strokeWidth={1.75} className="transition-transform duration-200 group-hover:-translate-y-0.5" />
        </a>
      </div>
    </footer>
  );
}
