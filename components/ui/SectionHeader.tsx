import type { ReactNode } from "react";

type Props = { index: string; eyebrow: string; title: ReactNode; intro?: string; id?: string; aside?: ReactNode };

export function SectionHeader({ index, eyebrow, title, intro, id, aside }: Props) {
  return (
    <div className="grid gap-y-6 md:grid-cols-12 md:gap-x-6">
      <div className="md:col-span-4 lg:col-span-3" data-reveal>
        <p className="label flex items-center gap-3 text-muted">
          <span className="text-produto">{index}</span>
          <span className="h-px w-6 bg-line-strong" aria-hidden />
          {eyebrow}
        </p>
      </div>
      <div className="md:col-span-8 lg:col-span-9">
        <h2 id={id} className="max-w-[18ch] text-h2 font-medium" data-reveal style={{ ["--d" as string]: "60ms" }}>
          {title}
        </h2>
        {intro && (
          <p className="mt-6 max-w-[60ch] text-lg text-muted" data-reveal style={{ ["--d" as string]: "120ms" }}>
            {intro}
          </p>
        )}
        {aside}
      </div>
    </div>
  );
}
