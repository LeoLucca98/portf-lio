"use client";

import { useEffect, useState } from "react";

export function CaseIndex({ items, label }: { items: { id: string; title: string }[]; label: string }) {
  const [active, setActive] = useState(items[0]?.id);

  useEffect(() => {
    const els = items.map((i) => document.getElementById(i.id)).filter((e): e is HTMLElement => !!e);
    const io = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((e) => e.isIntersecting).sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible[0]) setActive(visible[0].target.id);
      },
      { rootMargin: "-20% 0px -65% 0px" },
    );
    els.forEach((e) => io.observe(e));
    return () => io.disconnect();
  }, [items]);

  return (
    <nav aria-label={label} className="sticky top-[calc(var(--nav-h)+40px)]">
      <p className="label text-[0.72rem] text-faint">{label}</p>
      <ol className="mt-4 space-y-0.5 border-l border-line" role="list">
        {items.map((i) => {
          const on = active === i.id;
          return (
            <li key={i.id}>
              <a
                href={`#${i.id}`}
                aria-current={on ? "location" : undefined}
                className={`-ml-px block border-l py-1.5 pl-4 text-sm transition-colors duration-200 ${
                  on ? "border-produto text-fg" : "border-transparent text-faint hover:text-muted"
                }`}
              >
                {i.title}
              </a>
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
