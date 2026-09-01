// Design-system exhibit for decision 01 of the case: the foundation the
// screens obey, shown before the screens themselves. Two figures — the
// foundation (tokens, type, primitives) and the signature piece enlarged.
// Everything here renders the REAL primitives from ui.tsx over the real
// tokens from globals.css; nothing is an illustration.
//
// Cut rule (same as the CV): a primitive only enters the grid if it appears
// in a screen shown on this page. OppButton's `tertiary` variant and
// StatusDot exist in ui.tsx but no shown screen uses them, so they stay out.

import { ReactNode } from "react";
import { Search, ChevronDown } from "lucide-react";
import { oppFontVars } from "./fonts";
import {
  cx,
  FONT,
  OppButton,
  AgendaIndicatorLine,
  OppProgressBar,
  IndicatorBar,
} from "./ui";

/* The 8 color tokens, verbatim from --color-opp-* in globals.css. The dark
   ones get a hairline so they read against the panel they were made for. */
const TOKENS: { name: string; hex: string; dark?: boolean }[] = [
  { name: "opp-bg", hex: "#161726", dark: true },
  { name: "opp-surface", hex: "#1A1C31", dark: true },
  { name: "opp-surface2", hex: "#2C335D", dark: true },
  { name: "opp-accent", hex: "#D4FE07" },
  { name: "opp-success", hex: "#40E629" },
  { name: "opp-warning", hex: "#F5E421" },
  { name: "opp-alert", hex: "#F14635" },
  { name: "opp-inactive", hex: "#64748b", dark: true },
];

function Panel({ children }: { children: ReactNode }) {
  return (
    <div
      className={cx(
        oppFontVars,
        "opp-app relative overflow-hidden border border-[var(--ink)] bg-opp-bg text-white antialiased"
      )}
      style={FONT.body}
    >
      {/* color glows behind the glass — what the backdrop blur samples */}
      <div
        aria-hidden
        className="pointer-events-none absolute -left-12 -top-20 h-64 w-96 rounded-full"
        style={{ background: "radial-gradient(ellipse, #D4FE0733 0%, transparent 65%)" }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -right-16 bottom-[-30%] h-72 w-[28rem] rounded-full"
        style={{ background: "radial-gradient(ellipse, #4b5fd64d 0%, transparent 65%)" }}
      />
      <div className="relative">{children}</div>
    </div>
  );
}

/* A caption inside the panel, in the panel's own voice: tiny mono, dim. */
function CellLabel({ children }: { children: ReactNode }) {
  return (
    <span
      className="font-mono"
      style={{ fontSize: "clamp(10px, 0.9vw, 11px)", color: "#fffff9", opacity: 0.45 }}
    >
      {children}
    </span>
  );
}

/* ------------------------------- foundation -------------------------------- */

export function DsFoundation({
  typeRoles,
}: {
  /* Role of each family, in reading order: Monoblock, Epic Pro, Intel One
     Mono. Localized by the caller; the token names are code and stay as-is. */
  typeRoles: [string, string, string];
}) {
  return (
    <Panel>
      <div className="flex flex-col gap-8 p-8 md:p-10">
        {/* tokens */}
        <div className="grid grid-cols-4 gap-x-3 gap-y-4 md:grid-cols-8">
          {TOKENS.map((token) => (
            <div key={token.name} className="flex flex-col gap-1.5">
              <span
                className={cx("h-10 rounded-md", token.dark && "border border-white/15")}
                style={{ backgroundColor: token.hex }}
              />
              <span className="font-mono text-white/70" style={{ fontSize: 10 }}>
                {token.name}
              </span>
              <span className="font-mono text-white/40" style={{ fontSize: 10 }}>
                {token.hex}
              </span>
            </div>
          ))}
        </div>

        {/* type */}
        <div className="grid gap-6 md:grid-cols-3">
          {(
            [
              ["Monoblock", FONT.display, typeRoles[0]],
              ["Epic Pro", FONT.heading, typeRoles[1]],
              ["Intel One Mono", FONT.body, typeRoles[2]],
            ] as const
          ).map(([name, font, role]) => (
            <div key={name} className="flex flex-col gap-1">
              <span className="leading-none text-white" style={{ ...font, fontSize: 26 }}>
                {name}
              </span>
              <CellLabel>{role}</CellLabel>
            </div>
          ))}
        </div>

        {/* primitives — only what the shown screens use */}
        <div className="grid gap-x-4 gap-y-5 md:grid-cols-2">
          <div className="flex flex-col gap-2">
            <div className="opp-glass flex flex-wrap items-center gap-3 rounded-xl p-5">
              <OppButton variant="primary" className="text-xs">
                Avançar
              </OppButton>
              <OppButton variant="secondary" className="text-xs">
                Voltar
              </OppButton>
              <OppButton variant="ghost" className="text-xs">
                Panorama
              </OppButton>
            </div>
            <CellLabel>OppButton · primary / secondary / ghost</CellLabel>
          </div>

          <div className="flex flex-col gap-2">
            <div className="flex h-full items-center rounded-xl">
              <div className="opp-glass opp-glass-bevel inline-flex w-fit items-center gap-3 rounded-full py-1 pl-1 pr-4">
                <span
                  className="rounded-full bg-opp-accent px-4 py-2 text-black"
                  style={{ ...FONT.display, fontSize: 13 }}
                >
                  Meu município
                </span>
                <span style={{ ...FONT.display, fontSize: 14 }}>João Pessoa</span>
                <Search className="size-4 text-white/70" />
                <ChevronDown className="size-4 text-opp-accent" />
              </div>
            </div>
            <CellLabel>opp-glass · opp-glass-bevel</CellLabel>
          </div>

          <div className="flex flex-col gap-2">
            <div className="opp-glass rounded-xl p-5">
              <AgendaIndicatorLine
                label="IGM – Governança Municipal"
                value="6,38"
                fraction={0.51}
                zones={["< 5,01", "5,01 – 7,51", "≥ 7,51"]}
              />
            </div>
            <CellLabel>AgendaIndicatorLine + IndicatorBar</CellLabel>
          </div>

          <div className="flex flex-col gap-2">
            <div className="opp-glass flex h-full flex-col justify-center gap-3 rounded-xl p-5">
              <OppProgressBar value={37} />
            </div>
            <CellLabel>OppProgressBar</CellLabel>
          </div>
        </div>
      </div>
    </Panel>
  );
}

/* -------------------------------- signature -------------------------------- */

/* The IndicatorBar earns the only close-up: the real component, zoomed via
   transform — not redrawn larger — so what the reader inspects is exactly
   what ships in the screens above and below. */
export function DsSignature() {
  return (
    <Panel>
      <div className="flex justify-center px-8 py-12 md:py-16">
        <div className="flex h-16 items-center md:h-24">
          <div className="scale-[2] md:scale-[2.75]">
            <IndicatorBar fraction={0.51} zones={["< 5,01", "5,01 – 7,51", "≥ 7,51"]} />
          </div>
        </div>
      </div>
    </Panel>
  );
}
