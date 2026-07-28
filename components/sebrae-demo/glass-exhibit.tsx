// Material exhibit for the case's Design language section: the Figma-native
// Glass effect rebuilt in CSS, shown over color glows so the backdrop blur
// and the diagonal 1px stroke actually read. Two variants, real UI samples.

import { Search, ChevronDown } from "lucide-react";
import { oppFontVars } from "./fonts";
import { cx, FONT, IndicatorBar } from "./ui";

export function GlassExhibit() {
  return (
    <div
      className={cx(oppFontVars, "opp-app relative overflow-hidden rounded-lg")}
      style={{ backgroundColor: "#161726" }}
    >
      {/* color glows behind the panels — what the blur samples */}
      <div
        aria-hidden
        className="pointer-events-none absolute -left-10 -top-16 h-64 w-96 rounded-full"
        style={{
          background: "radial-gradient(ellipse, #D4FE0755 0%, transparent 65%)",
        }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -right-16 top-8 h-72 w-[28rem] rounded-full"
        style={{
          background: "radial-gradient(ellipse, #4b5fd666 0%, transparent 65%)",
        }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute bottom-[-40%] left-1/3 h-64 w-80 rounded-full"
        style={{
          background: "radial-gradient(ellipse, #F1463533 0%, transparent 65%)",
        }}
      />

      <div className="relative grid gap-8 p-10 text-white md:grid-cols-2">
        {/* variant 1 — glass */}
        <div className="flex flex-col gap-3">
          <div className="opp-glass rounded-2xl p-6">
            <span
              className="block uppercase"
              style={{ ...FONT.body, fontSize: 9, fontWeight: 600, opacity: 0.6 }}
            >
              Governança — indicadores do município
            </span>
            <div className="mt-4 flex items-center justify-between gap-8">
              <span style={{ ...FONT.body, fontSize: 13, fontWeight: 600 }}>
                IGM – Governança Municipal
              </span>
              <div className="flex flex-col items-end gap-1">
                <span style={{ ...FONT.body, fontSize: 17, fontWeight: 600 }}>6,38</span>
                <IndicatorBar fraction={0.51} zones={["< 5,01", "5,01 – 7,51", "≥ 7,51"]} />
              </div>
            </div>
          </div>
          <span
            className="font-mono"
            style={{ fontSize: "clamp(10px, 0.9vw, 11px)", color: "#fffff9", opacity: 0.45 }}
          >
            .glass — backdrop blur + inner bevel shadows
          </span>
        </div>

        {/* variant 2 — glass-bevel */}
        <div className="flex flex-col gap-3">
          <div className="flex h-full flex-col items-start justify-center gap-4">
            <div className="opp-glass opp-glass-bevel flex items-center gap-3 rounded-full px-2 py-2">
              <span
                className="rounded-full bg-opp-accent px-4 py-2 text-black"
                style={{ ...FONT.display, fontSize: 13 }}
              >
                Meu município
              </span>
              <span style={{ ...FONT.display, fontSize: 14 }}>João Pessoa</span>
              <Search className="size-4 text-white/70" />
              <ChevronDown className="mr-2 size-4 text-opp-accent" />
            </div>
            <div className="opp-glass opp-glass-bevel rounded-full px-5 py-2.5">
              <span style={{ ...FONT.body, fontSize: 12, fontWeight: 600 }}>
                CONTINUE A JORNADA
              </span>
            </div>
          </div>
          <span
            className="font-mono"
            style={{ fontSize: "clamp(10px, 0.9vw, 11px)", color: "#fffff9", opacity: 0.45 }}
          >
            .glass-bevel — metallic diagonal gradient, 1px stroke cut via mask-composite
          </span>
        </div>
      </div>
    </div>
  );
}
