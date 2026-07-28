// Static recreation of the OPP "Riscos Estratégicos" mode (Ambiente tab):
// top-3 risks as severity "readout" cards. The status color tints the whole
// piece — radial glow, hero value rule, and pulsing live-signal dot — exactly
// like the original .risk-card CSS, here inlined so nothing global changes.

import { FONT, STATUS_COLOR } from "@/components/sebrae-demo/ui";
import { RISKS, type Risk } from "@/components/sebrae-demo/data";
import { CitySelector } from "../components/cityselector";
import { ModeToggle } from "../components/modetoggle";

export function RiscosScreen() {
  return (
    <div className="flex min-w-0 flex-1 flex-col items-center gap-5 px-16 py-10">
      <style>{`@keyframes opp-risk-pulse {
        0%, 100% { opacity: 1; transform: scale(1); }
        50%      { opacity: 0.4; transform: scale(0.82); }
      }`}</style>

      <CitySelector />
      <ModeToggle select={2} />

      <div className="grid grid-cols-3 items-stretch gap-3">
        {RISKS.map((risk) => (
          <RiskCard key={risk.indicatorLabel} risk={risk} />
        ))}
      </div>
    </div>
  );
}

function RiskCard({ risk }: { risk: Risk }) {
  const color = STATUS_COLOR[risk.severity];

  return (
    <article className="opp-glass relative flex h-full flex-col gap-5 overflow-hidden rounded-3xl p-10">
      {/* Radial glow anchored top-center, in the risk color, fading down */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 z-0 h-[48%]"
        style={{
          background: `radial-gradient(ellipse at top, ${color}42 0%, ${color}12 55%, transparent 80%)`,
          opacity: 0.85,
        }}
      />

      {/* Hero value + tinted rule fading at both ends */}
      <div className="relative z-[1] flex flex-col gap-3">
        <span
          className="self-center leading-none text-white"
          style={{ ...FONT.display, fontSize: 48 }}
        >
          {risk.value}
        </span>
        <hr
          className="border-none"
          style={{
            height: 1,
            background: `linear-gradient(90deg, transparent, ${color}99 50%, transparent)`,
          }}
        />
      </div>

      <span
        className="relative z-[1] uppercase tracking-wide text-white"
        style={{ ...FONT.body, fontSize: 13, fontWeight: 600 }}
      >
        {risk.indicatorLabel}
      </span>

      <p
        className="relative z-[1] text-white/70"
        style={{ ...FONT.body, fontSize: 13, fontWeight: 300, lineHeight: 1.55 }}
      >
        {risk.description}
      </p>

      {/* Severity (live signal) + context, anchored bottom-right */}
      <footer className="relative z-[1] mt-auto flex flex-col items-end gap-1.5 text-right">
        <span className="flex items-center gap-2">
          <span
            aria-hidden
            className="rounded-full"
            style={{
              width: 7,
              height: 7,
              backgroundColor: color,
              boxShadow: `0 0 9px ${color}`,
              animation: "opp-risk-pulse 2.2s ease-in-out infinite",
            }}
          />
          <span
            className="uppercase tracking-[0.18em]"
            style={{ ...FONT.body, fontSize: 12, fontWeight: 600, color }}
          >
            {risk.severityLabel}
          </span>
        </span>
        <p
          className="text-white/50"
          style={{ ...FONT.body, fontSize: 12, fontWeight: 300 }}
        >
          {risk.context}
        </p>
      </footer>
    </article>
  );
}
