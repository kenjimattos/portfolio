// Static recreation of the OPP "Panorama Socioeconômico" mode (Ambiente tab):
// 12 economic-base indicator cards in a 4-column grid + the AI performance
// analysis panel in its completed state (typewriter caret kept blinking as a
// decorative touch). Faithful to ModeEconomics/EconomicsCard/EconomicsAnalysis
// from the original repo — no interactivity by design.

import { Plus, Sparkles } from "lucide-react";
import { FONT, OppButton } from "@/components/sebrae-demo/ui";
import { ECON_CARDS, IA_ANALYSIS_TEXT, type EconCard } from "@/components/sebrae-demo/data";
import { CitySelector } from "../components/cityselector";
import { ModeToggle } from "../components/modetoggle";

export function PanoramaScreen() {
  return (
    <div className="flex flex-col items-center gap-5 px-16 py-10">
      <style>{`@keyframes opp-caret { 50% { opacity: 0; } }`}</style>
        <CitySelector />
        <ModeToggle select={1} />

      {/* Economic-base cards — 4-column grid, square edges, hairline borders */}
      <div className="grid grid-cols-4 gap-2">
        {ECON_CARDS.map((card) => (
          <EconCardItem key={card.id} card={card} />
        ))}
      </div>

      {/* AI analysis — completed state, right-aligned below the grid */}
      <div className="opp-glass flex w-[100%] flex-col gap-3 self-end rounded-xl p-6">
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <Sparkles size={16} className="shrink-0 text-opp-accent" aria-hidden />
            <h4
              className="uppercase text-white"
              style={{ ...FONT.display, fontSize: 13 }}
            >
              Análise de desempenho do município
            </h4>
          </div>
          <OppButton variant="ghost" className="gap-1.5 px-4 py-1.5 text-[13px]">
            <Sparkles size={13} aria-hidden />
            Gerar novamente
          </OppButton>
        </div>
        <p
          className="text-white/85"
          style={{ ...FONT.body, fontSize: 13, fontWeight: 300, lineHeight: 1.6 }}
        >
          {IA_ANALYSIS_TEXT}
          {/* Typewriter caret — decorative blink, matches .typewriter-caret */}
          <span
            aria-hidden
            className="ml-1 inline-block bg-opp-accent align-middle"
            style={{ width: 2, height: "1em", animation: "opp-caret 0.9s step-end infinite" }}
          />
        </p>
      </div>
    </div>
  );
}

// One economic-base card. The variation is ALWAYS neutral (white/60) — the
// original product decision: these cards carry no traffic-light semantics.
function EconCardItem({ card }: { card: EconCard }) {
  return (
    <div className="flex flex-col justify-between gap-3 border border-white/15 p-3 rounded-md">
      <span
        className="mt-1 uppercase text-white"
        style={{ ...FONT.body, fontSize: 12, fontWeight: 300 }}
      >
        {card.label}
      </span>

      <div className="flex items-center justify-between gap-3">
        <span className="text-white" style={{ ...FONT.display, fontSize: 22 }}>
          {card.value}
        </span>
        {card.variation && (
          <span
            className="text-white/60"
            style={{ ...FONT.body, fontSize: 12, fontWeight: 600 }}
          >
            {card.variation}
          </span>
        )}
      </div>

      <div className="flex items-end justify-between gap-2">
        <p
          className="line-clamp-2 text-white/50"
          style={{ ...FONT.body, fontSize: 11, fontWeight: 300 }}
        >
          {card.description}
        </p>
        {/* Decorative expand affordance (IconButton xs in the original) */}
        <span
          aria-hidden
          className="flex h-4 w-4 shrink-0 items-center justify-center text-white/70"
        >
          <Plus size={16} />
        </span>
      </div>

      <span
        className="self-end text-right text-white/50"
        style={{ ...FONT.body, fontSize: 11, fontWeight: 300 }}
      >
        {card.referenceYear}
      </span>
    </div>
  );
}
