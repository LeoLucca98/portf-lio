import { ImageResponse } from "next/og";

export const ogSize = { width: 1200, height: 630 };

export function ogImage({ kicker, title, subtitle }: { kicker: string; title: string; subtitle: string }) {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: 72,
          background: "radial-gradient(circle at 82% 12%, rgba(124,140,255,0.22), transparent 55%), #0A0B0D",
          color: "#EDEDEF",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
          <div
            style={{
              width: 56,
              height: 56,
              borderRadius: 14,
              border: "2px solid #353941",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 22,
              fontWeight: 600,
            }}
          >
            LL
          </div>
          <div style={{ display: "flex", fontSize: 22, letterSpacing: 4, color: "#9A9DA5", textTransform: "uppercase" }}>{kicker}</div>
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ fontSize: 76, fontWeight: 600, letterSpacing: -3, lineHeight: 1.02, maxWidth: 980 }}>{title}</div>
          <div style={{ marginTop: 28, fontSize: 30, color: "#9A9DA5", maxWidth: 940, lineHeight: 1.3 }}>{subtitle}</div>
        </div>
        <div style={{ display: "flex", gap: 14 }}>
          {["#E8B86A", "#7C8CFF", "#5ED1A4"].map((c) => (
            <div key={c} style={{ width: 120, height: 6, borderRadius: 3, background: c }} />
          ))}
        </div>
      </div>
    ),
    ogSize,
  );
}
