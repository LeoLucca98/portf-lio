import type { CSSProperties, ReactNode } from "react";
import type { CaseSlug, Locale } from "@/content/types";

const C = {
  negocio: "#E8B86A",
  produto: "#7C8CFF",
  tecnologia: "#5ED1A4",
  fg: "#EDEDEF",
  muted: "#9A9DA5",
  line: "#25282E",
  lineStrong: "#353941",
  surface: "#16181C",
  bg: "#0A0B0D",
};

const d = (ms: number) => ({ ["--d" as string]: `${ms}ms` }) as CSSProperties;
const from = (t: string, ms: number) => ({ ["--from" as string]: t, ["--d" as string]: `${ms}ms` }) as CSSProperties;

type Caption = { x: number; y: number; text: string; align?: "start" | "center" | "end"; tone?: keyof typeof C };

const captions: Record<CaseSlug, Record<Locale, Caption[]>> = {
  telabrasil: {
    pt: [
      { x: 100, y: 345, text: "necessidades", tone: "negocio" },
      { x: 320, y: 300, text: "histórias + critérios", tone: "produto" },
      { x: 440, y: 52, text: "homologação" },
      { x: 600, y: 300, text: "entregas validadas", align: "end", tone: "tecnologia" },
    ],
    en: [
      { x: 100, y: 345, text: "needs", tone: "negocio" },
      { x: 320, y: 300, text: "stories + criteria", tone: "produto" },
      { x: 440, y: 52, text: "acceptance" },
      { x: 600, y: 300, text: "validated deliveries", align: "end", tone: "tecnologia" },
    ],
  },
  cultbr: {
    pt: [
      { x: 88, y: 236, text: "relato" },
      { x: 330, y: 335, text: "regras e requisitos" },
      { x: 412, y: 254, text: "causa", align: "start", tone: "tecnologia" },
      { x: 562, y: 236, text: "correção validada", tone: "produto" },
      { x: 470, y: 30, text: "documentado para a próxima", tone: "muted" },
    ],
    en: [
      { x: 88, y: 236, text: "report" },
      { x: 330, y: 335, text: "rules and requirements" },
      { x: 412, y: 254, text: "root cause", align: "start", tone: "tecnologia" },
      { x: 562, y: 236, text: "validated fix", tone: "produto" },
      { x: 470, y: 30, text: "documented for next time", tone: "muted" },
    ],
  },
  oraculo: {
    pt: [
      { x: 70, y: 228, text: "relato" },
      { x: 150, y: 92, text: "lexical", tone: "negocio" },
      { x: 150, y: 290, text: "semântica", tone: "produto" },
      { x: 286, y: 340, text: "documentação dispersa", tone: "muted" },
      { x: 495, y: 136, text: "sugestão + fonte", tone: "produto" },
      { x: 620, y: 230, text: "pessoa valida", align: "end", tone: "tecnologia" },
    ],
    en: [
      { x: 70, y: 228, text: "report" },
      { x: 150, y: 92, text: "lexical", tone: "negocio" },
      { x: 150, y: 290, text: "semantic", tone: "produto" },
      { x: 286, y: 340, text: "scattered documentation", tone: "muted" },
      { x: 495, y: 136, text: "suggestion + source", tone: "produto" },
      { x: 620, y: 230, text: "a person validates", align: "end", tone: "tecnologia" },
    ],
  },
};

const titles: Record<CaseSlug, Record<Locale, string>> = {
  telabrasil: {
    pt: "Necessidades dispersas se organizam em histórias com critérios, passam pela homologação e viram entregas validadas.",
    en: "Scattered needs become stories with criteria, go through acceptance and turn into validated deliveries.",
  },
  cultbr: {
    pt: "Um relato é investigado contra várias regras até a causa aparecer; a correção é validada e o fluxo fica documentado.",
    en: "A report is checked against several rules until the cause shows up; the fix is validated and the flow gets documented.",
  },
  oraculo: {
    pt: "Um relato aciona buscas lexical e semântica na documentação; as evidências viram uma sugestão com fonte, que uma pessoa valida.",
    en: "A report triggers lexical and semantic searches over the documentation; the evidence becomes a sourced suggestion that a person validates.",
  },
};

export function ConceptFigure({
  slug,
  locale,
  badge,
  className = "",
}: {
  slug: CaseSlug;
  locale: Locale;
  badge: string;
  className?: string;
}) {
  const Svg = slug === "telabrasil" ? TelaBrasilSvg : slug === "cultbr" ? CultBRSvg : OraculoSvg;
  const caps = captions[slug][locale];
  return (
    <figure className={`fig relative overflow-hidden rounded-[24px] border border-line bg-surface-1 ${className}`}>
      <div aria-hidden className="dot-grid absolute inset-0 opacity-50 [mask-image:radial-gradient(80%_70%_at_50%_50%,black,transparent)]" />
      <div className="relative" style={{ aspectRatio: "640 / 360" }}>
        <Svg title={titles[slug][locale]} />
        {caps.map((c) => (
          <span
            key={c.text}
            aria-hidden
            className="label pointer-events-none absolute hidden whitespace-nowrap text-[0.66rem] sm:block lg:text-[0.72rem]"
            style={{
              left: `${(c.x / 640) * 100}%`,
              top: `${(c.y / 360) * 100}%`,
              transform: `translate(${c.align === "end" ? "-100%" : c.align === "start" ? "0" : "-50%"}, -50%)`,
              color: C[c.tone ?? "muted"],
            }}
          >
            {c.text}
          </span>
        ))}
      </div>
      <figcaption className="relative flex flex-wrap items-center justify-between gap-2 border-t border-line px-4 py-2.5">
        <span className="label text-[0.7rem] text-faint">{badge}</span>
        <ol className="flex flex-wrap gap-x-2 gap-y-1 sm:hidden" aria-hidden>
          {caps
            .filter((c) => c.tone !== "muted")
            .map((c, i) => (
              <li key={c.text} className="label text-[0.7rem]" style={{ color: C[c.tone ?? "muted"] }}>
                {i > 0 && <span className="mr-2 text-faint">→</span>}
                {c.text}
              </li>
            ))}
        </ol>
      </figcaption>
    </figure>
  );
}

function Frame({ title, children }: { title: string; children: ReactNode }) {
  return (
    <svg viewBox="0 0 640 360" className="absolute inset-0 h-full w-full" role="img">
      <title>{title}</title>
      {children}
    </svg>
  );
}

function Check({ x, y, s = 1, color = C.tecnologia }: { x: number; y: number; s?: number; color?: string }) {
  return (
    <path
      d={`M${x - 5 * s} ${y} L${x - 1.5 * s} ${y + 3.5 * s} L${x + 5 * s} ${y - 3.5 * s}`}
      fill="none"
      stroke={color}
      strokeWidth={1.75}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  );
}

/* ---------- TelaBrasil: need → story → acceptance → validated ---------- */
function TelaBrasilSvg({ title }: { title: string }) {
  const frags: [number, number][] = [
    [48, 78], [104, 122], [62, 178], [128, 232], [54, 286], [118, 60], [160, 168], [92, 318], [168, 286],
  ];
  const cards = [92, 140, 188, 236];
  const done = [100, 146, 192, 238];
  return (
    <Frame title={title}>
      {frags.map(([x, y], i) => {
        const ty = cards[i % 4]! + 17;
        return (
          <path
            key={`l${i}`}
            data-draw
            pathLength={1}
            d={`M${x} ${y} C ${(x + 250) / 2 + 20} ${y}, ${210} ${ty}, 250 ${ty}`}
            fill="none"
            stroke={C.negocio}
            strokeOpacity={0.28}
            strokeWidth={1}
            style={d(260 + i * 30)}
          />
        );
      })}
      {frags.map(([x, y], i) => (
        <rect key={`f${i}`} data-pop x={x - 5} y={y - 5} width={10} height={10} rx={2.5} fill={C.negocio} fillOpacity={0.45 + (i % 3) * 0.2} style={d(i * 35)} />
      ))}

      {cards.map((y, i) => (
        <g key={`c${i}`} data-move style={from("translateX(-28px)", 620 + i * 90)}>
          <rect x={250} y={y} width={140} height={34} rx={8} fill={C.surface} stroke={C.produto} strokeOpacity={0.55} />
          <circle cx={264} cy={y + 17} r={3} fill={C.produto} />
          <line x1={276} y1={y + 13} x2={360 - i * 8} y2={y + 13} stroke={C.fg} strokeOpacity={0.7} strokeWidth={2} strokeLinecap="round" />
          <line x1={276} y1={y + 22} x2={330 - i * 6} y2={y + 22} stroke={C.muted} strokeOpacity={0.6} strokeWidth={2} strokeLinecap="round" />
        </g>
      ))}

      {cards.map((y, i) => (
        <path key={`g${i}`} data-draw pathLength={1} d={`M390 ${y + 17} C 410 ${y + 17}, 410 180, 424 180`} fill="none" stroke={C.produto} strokeOpacity={0.4} style={d(1000 + i * 40)} />
      ))}
      <line data-draw pathLength={1} x1={440} y1={70} x2={440} y2={290} stroke={C.lineStrong} strokeWidth={1.5} strokeDasharray="0" style={d(900)} />
      <g data-pop style={d(1180)}>
        <circle cx={440} cy={180} r={16} fill={C.bg} stroke={C.tecnologia} strokeWidth={1.5} />
        <Check x={440} y={180} />
      </g>

      {done.map((y, i) => (
        <path key={`v${i}`} data-draw pathLength={1} d={`M456 180 C 468 180, 468 ${y + 15}, 484 ${y + 15}`} fill="none" stroke={C.tecnologia} strokeOpacity={0.45} style={d(1260 + i * 40)} />
      ))}
      {done.map((y, i) => (
        <g key={`d${i}`} data-move style={from("translateX(-18px)", 1340 + i * 90)}>
          <rect x={484} y={y} width={116} height={30} rx={8} fill={C.surface} stroke={C.tecnologia} strokeOpacity={0.5} />
          <Check x={500} y={y + 15} s={0.8} />
          <line x1={514} y1={y + 15} x2={578 - i * 7} y2={y + 15} stroke={C.fg} strokeOpacity={0.6} strokeWidth={2} strokeLinecap="round" />
        </g>
      ))}
    </Frame>
  );
}

/* ---------- CultBR: report → investigation → cause → validated fix ---------- */
function CultBRSvg({ title }: { title: string }) {
  const rules = [70, 140, 220, 290];
  const cause = 2;
  return (
    <Frame title={title}>
      <g data-pop style={d(0)}>
        <rect x={40} y={150} width={96} height={60} rx={10} fill={C.surface} stroke={C.lineStrong} />
        <circle cx={56} cy={166} r={3} fill={C.negocio} />
        <line x1={66} y1={166} x2={118} y2={166} stroke={C.fg} strokeOpacity={0.7} strokeWidth={2} strokeLinecap="round" />
        <line x1={52} y1={182} x2={122} y2={182} stroke={C.muted} strokeOpacity={0.5} strokeWidth={2} strokeLinecap="round" />
        <line x1={52} y1={194} x2={100} y2={194} stroke={C.muted} strokeOpacity={0.5} strokeWidth={2} strokeLinecap="round" />
      </g>

      {rules.map((y, i) => (
        <path key={`b${i}`} data-draw pathLength={1} d={`M136 180 C 220 180, 240 ${y}, 318 ${y}`} fill="none" stroke={C.muted} strokeOpacity={0.32} strokeWidth={1.25} style={d(220 + i * 130)} />
      ))}
      <path data-draw pathLength={1} d={`M136 180 C 220 180, 240 ${rules[cause]}, 318 ${rules[cause]}`} fill="none" stroke={C.tecnologia} strokeWidth={1.75} style={d(980)} />

      {rules.map((y, i) => (
        <g key={`r${i}`} data-pop style={d(420 + i * 130)}>
          <circle cx={330} cy={y} r={12} fill={C.bg} stroke={i === cause ? C.tecnologia : C.muted} strokeOpacity={i === cause ? 1 : 0.45} />
          <line x1={350} y1={y - 4} x2={398} y2={y - 4} stroke={C.muted} strokeOpacity={0.45} strokeWidth={2} strokeLinecap="round" />
          <line x1={350} y1={y + 4} x2={380} y2={y + 4} stroke={C.muted} strokeOpacity={0.3} strokeWidth={2} strokeLinecap="round" />
          {i !== cause && <line x1={325} y1={y} x2={335} y2={y} stroke={C.muted} strokeOpacity={0.6} strokeWidth={1.5} strokeLinecap="round" />}
        </g>
      ))}
      <g data-pop style={d(1120)}>
        <circle cx={330} cy={rules[cause]} r={21} fill="none" stroke={C.tecnologia} strokeOpacity={0.5} />
        <circle cx={330} cy={rules[cause]} r={4} fill={C.tecnologia} />
      </g>

      <path data-draw pathLength={1} d={`M410 ${rules[cause]} C 470 ${rules[cause]}, 470 180, 520 180`} fill="none" stroke={C.produto} strokeWidth={1.5} style={d(1260)} />
      <g data-pop style={d(1460)}>
        <rect x={520} y={150} width={84} height={60} rx={10} fill={C.surface} stroke={C.produto} strokeOpacity={0.7} />
        <Check x={538} y={170} color={C.produto} />
        <line x1={550} y1={170} x2={590} y2={170} stroke={C.fg} strokeOpacity={0.7} strokeWidth={2} strokeLinecap="round" />
        <line x1={532} y1={188} x2={584} y2={188} stroke={C.muted} strokeOpacity={0.5} strokeWidth={2} strokeLinecap="round" />
      </g>
      <path data-draw pathLength={1} d="M562 150 C 562 70, 420 44, 398 62" fill="none" stroke={C.produto} strokeOpacity={0.45} strokeDasharray="0" style={d(1650)} />
      <path data-pop d="M404 56 L397 62 L405 67" fill="none" stroke={C.produto} strokeOpacity={0.6} strokeWidth={1.5} strokeLinecap="round" style={d(2200)} />
    </Frame>
  );
}

/* ---------- Oráculo: report → hybrid search → evidence → suggestion → human ---------- */
function OraculoSvg({ title }: { title: string }) {
  const cell = (c: number, r: number) => ({ x: 220 + c * 44, y: 50 + r * 56 });
  const lexical: [number, number][] = [
    [1, 1],
    [2, 4],
  ];
  const semantic: [number, number][] = [
    [3, 2],
    [0, 3],
  ];
  const hits = [...lexical, ...semantic];
  const isHit = (c: number, r: number) => hits.some(([hc, hr]) => hc === c && hr === r);
  return (
    <Frame title={title}>
      {Array.from({ length: 20 }, (_, i) => {
        const c = i % 4;
        const r = Math.floor(i / 4);
        const { x, y } = cell(c, r);
        return (
          <rect key={i} data-pop x={x} y={y} width={30} height={20} rx={4} fill={C.surface} stroke={C.line} strokeWidth={1} style={d(80 + i * 22)} opacity={isHit(c, r) ? 1 : 0.8} />
        );
      })}

      <g data-pop style={d(0)}>
        <rect x={30} y={155} width={80} height={50} rx={10} fill={C.surface} stroke={C.lineStrong} />
        <line x1={44} y1={172} x2={96} y2={172} stroke={C.fg} strokeOpacity={0.7} strokeWidth={2} strokeLinecap="round" />
        <line x1={44} y1={186} x2={84} y2={186} stroke={C.muted} strokeOpacity={0.5} strokeWidth={2} strokeLinecap="round" />
      </g>

      {lexical.map(([c, r], i) => {
        const { x, y } = cell(c, r);
        return <path key={`lx${i}`} data-draw pathLength={1} d={`M110 180 L ${x} ${y + 10}`} fill="none" stroke={C.negocio} strokeWidth={1.5} style={d(700 + i * 120)} />;
      })}
      {semantic.map(([c, r], i) => {
        const { x, y } = cell(c, r);
        return (
          <path key={`sm${i}`} data-draw pathLength={1} d={`M110 180 Q ${(110 + x) / 2} ${Math.max(180, y + 10) + 56} ${x} ${y + 10}`} fill="none" stroke={C.produto} strokeWidth={1.5} strokeDasharray="0" style={d(820 + i * 120)} />
        );
      })}
      {hits.map(([c, r], i) => {
        const { x, y } = cell(c, r);
        const col = i < 2 ? C.negocio : C.produto;
        return (
          <g key={`h${i}`} data-pop style={d(1120 + i * 60)}>
            <rect x={x - 3} y={y - 3} width={36} height={26} rx={6} fill="none" stroke={col} strokeOpacity={0.9} />
            <line x1={x + 6} y1={y + 10} x2={x + 24} y2={y + 10} stroke={C.fg} strokeOpacity={0.85} strokeWidth={2} strokeLinecap="round" />
          </g>
        );
      })}

      {hits.map(([c, r], i) => {
        const { x, y } = cell(c, r);
        return <path key={`cv${i}`} data-draw pathLength={1} d={`M${x + 33} ${y + 10} C 400 ${y + 10}, 400 180, 440 180`} fill="none" stroke={C.fg} strokeOpacity={0.22} style={d(1340 + i * 50)} />;
      })}

      <g data-pop style={d(1560)}>
        <rect x={440} y={150} width={110} height={60} rx={10} fill={C.surface} stroke={C.produto} strokeOpacity={0.8} />
        <line x1={454} y1={168} x2={520} y2={168} stroke={C.fg} strokeOpacity={0.8} strokeWidth={2} strokeLinecap="round" />
        <rect x={454} y={182} width={26} height={14} rx={4} fill="none" stroke={C.negocio} strokeOpacity={0.8} />
        <rect x={486} y={182} width={26} height={14} rx={4} fill="none" stroke={C.produto} strokeOpacity={0.8} />
      </g>

      <line data-draw pathLength={1} x1={550} y1={180} x2={578} y2={180} stroke={C.tecnologia} strokeOpacity={0.6} strokeWidth={1.5} style={d(1720)} />
      <g data-pop style={d(1840)}>
        <circle cx={600} cy={180} r={21} fill={C.bg} stroke={C.tecnologia} strokeWidth={1.5} />
        <circle cx={600} cy={173} r={5} fill="none" stroke={C.fg} strokeOpacity={0.85} strokeWidth={1.5} />
        <path d="M590 190 C 592 182, 608 182, 610 190" fill="none" stroke={C.fg} strokeOpacity={0.85} strokeWidth={1.5} strokeLinecap="round" />
      </g>
      <g data-pop style={d(2040)}>
        <circle cx={615} cy={164} r={7} fill={C.tecnologia} />
        <Check x={615} y={164} s={0.6} color={C.bg} />
      </g>
    </Frame>
  );
}
