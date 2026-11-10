"use client";

import { Check, Copy } from "lucide-react";
import { useEffect, useState } from "react";

export function CopyEmail({ email, copy, copied }: { email: string; copy: string; copied: string }) {
  const [done, setDone] = useState(false);

  useEffect(() => {
    if (!done) return;
    const t = setTimeout(() => setDone(false), 2200);
    return () => clearTimeout(t);
  }, [done]);

  async function onCopy() {
    try {
      await navigator.clipboard.writeText(email);
    } catch {
      const ta = document.createElement("textarea");
      ta.value = email;
      document.body.appendChild(ta);
      ta.select();
      document.execCommand("copy");
      ta.remove();
    }
    setDone(true);
  }

  return (
    <>
      <button
        type="button"
        onClick={onCopy}
        className="group inline-flex h-10 shrink-0 items-center gap-2 rounded-full border border-line-strong px-4 text-sm text-muted transition-colors duration-200 hover:border-fg/40 hover:text-fg"
        aria-label={`${copy}: ${email}`}
        data-testid="copy-email"
      >
        <span className="relative h-4 w-4">
          <Copy
            size={16}
            strokeWidth={1.75}
            className={`absolute inset-0 transition-[opacity,transform] duration-200 ${done ? "scale-50 opacity-0" : "opacity-100"}`}
          />
          <Check
            size={16}
            strokeWidth={2}
            className={`absolute inset-0 text-tecnologia transition-[opacity,transform] duration-200 ${done ? "opacity-100" : "scale-50 opacity-0"}`}
          />
        </span>
        <span>{done ? copied : copy}</span>
      </button>
      <div aria-live="polite" className="sr-only">
        {done ? copied : ""}
      </div>
      {done && (
        <div
          aria-hidden
          className="toast-enter fixed bottom-6 left-1/2 z-[70] flex -translate-x-1/2 items-center gap-2 rounded-full border border-line-strong bg-surface-2 px-4 py-2.5 text-sm text-fg shadow-2xl"
          data-testid="toast"
        >
          <Check size={15} strokeWidth={2} className="text-tecnologia" /> {copied}
        </div>
      )}
    </>
  );
}
