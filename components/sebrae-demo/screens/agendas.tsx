// Static recreation of the OPP main screen ("/home", Ambiente pillar, mode
// "Eixos prioritários") in the state municipality = João Pessoa. App shell
// (SideNav rail + CitySelector + ModeToggle) plus the SectionAgendas layout:
// glass panel with the agenda accordion on the left, Paraíba choropleth with
// the floating AgendaCard on the right. Faithful to SectionAgendas/AgendaList/
// AgendaExpandable/AgendaCard from the original repo — no interactivity by design.

import {
  Minus,
  Plus
} from "lucide-react";
import { FONT, AgendaIndicatorLine } from "@/components/sebrae-demo/ui";
import { ParaibaMap } from "@/components/sebrae-demo/paraiba-map";
import {
  AGENDAS,
  INDICATORS,
  MAP_TOOLTIP,
  MUNICIPIO_ID,
} from "@/components/sebrae-demo/data";
import { CitySelector } from "../components/cityselector";
import { ModeToggle } from "../components/modetoggle";

const GOVERNANCA_INDICATORS = INDICATORS.filter(
  (ind) => ind.agendaId === "governanca"
);

export function AgendasScreen() {
  return (
    <div className="flex items-start gap-6 px-16 py-10">

      {/* Main area */}
      <div className="flex min-w-0 flex-1 flex-col items-center gap-5">
        <CitySelector />
        <ModeToggle select={0} />

        <div className="flex w-full gap-6">
          {/* Left column: glass panel with heading + agenda accordion */}
          <div className="opp-glass flex w-[40%] shrink-0 flex-col gap-6 rounded-xl p-6">
            <div>
              <h1
                className="leading-none text-white"
                style={{ ...FONT.heading, fontSize: 40 }}
              >
                Indicadores
              </h1>
              <span
                className="text-white"
                style={{ ...FONT.body, fontSize: 14, fontWeight: 300 }}
              >
                para um município mais empreendedor
              </span>
            </div>

            <ul className="flex flex-col gap-4">
              {AGENDAS.map((agenda, i) => (
                <li key={agenda.id}>
                  <AgendaItem
                    title={agenda.name}
                    description={agenda.description}
                    expanded={i === 0}
                  />
                </li>
              ))}
            </ul>
          </div>

          {/* Right column: map + floating agenda card */}
          <div className="flex min-w-0 flex-1 flex-col gap-4">
            <div className="px-4">
              <ParaibaMap selectedId={MUNICIPIO_ID} tooltip={MAP_TOOLTIP} />
            </div>
            <AgendaCard />
          </div>
        </div>
      </div>
    </div>
  );
}

/* ------------------------------ agenda accordion ------------------------------ */

// AgendaExpandable, frozen: square-corner header with 1px white border,
// Monoblock uppercase title + 32px round toggle button; expanded items get the
// bordered description box below.
function AgendaItem({
  title,
  description,
  expanded,
}: {
  title: string;
  description: string;
  expanded: boolean;
}) {
  const ToggleIcon = expanded ? Minus : Plus;
  return (
    <div>
      <section
        className="flex items-center justify-between gap-4 border border-white p-3 text-left"
      >
        <p
          className="uppercase text-white"
          style={{ ...FONT.display, fontSize: 13, lineHeight: 1.35 }}
        >
          {title}
        </p>
        <span
          aria-hidden
          className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-opp-inactive/40 text-white"
        >
          <ToggleIcon size={16} />
        </span>
      </section>
      {expanded && (
        <div className="-mt-px border border-white p-3">
          <p
            className="text-white"
            style={{ ...FONT.body, fontSize: 12, fontWeight: 300, lineHeight: 1.5 }}
          >
            {description}
          </p>
        </div>
      )}
    </div>
  );
}

/* -------------------------------- agenda card --------------------------------- */

// Floating card under the map: Monoblock-style micro-title, white-bordered box
// with the 3 governança indicator lines split by dashed accent dividers, and
// the agenda description below.
function AgendaCard() {
  return (
    <div className="flex flex-col items-center">
      <div className="flex w-4/5 flex-col gap-2">
        <p
          className="uppercase text-white"
          style={{ ...FONT.body, fontSize: 8, fontWeight: 600, letterSpacing: "0.04em" }}
        >
          Governança — Indicadores do município
        </p>

        <div className="flex w-full flex-col border border-white p-3">
          {GOVERNANCA_INDICATORS.map((ind, i) => (
            <div key={ind.id} className="flex flex-col">
              <AgendaIndicatorLine
                label={ind.label}
                value={ind.value}
                fraction={ind.markerFraction}
                zones={ind.zones}
              />
              {i < GOVERNANCA_INDICATORS.length - 1 && (
                <hr className="my-2 border-dashed border-opp-accent" />
              )}
            </div>
          ))}
        </div>

        <p
          className="text-white/80"
          style={{ ...FONT.body, fontSize: 8, fontWeight: 300, lineHeight: 1.5 }}
        >
          {AGENDAS[0].description}
        </p>
      </div>
    </div>
  );
}
