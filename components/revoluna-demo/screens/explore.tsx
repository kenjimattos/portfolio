// Static recreation of the Revoluna "Explorar" screen: header, sort filters,
// specialty dropdown and the open-shift list. Purely decorative.

import {
  ArrowDown,
  BadgeDollarSign,
  Calendar,
  ChevronDown,
  CircleAlert,
  Clock,
  MapPin,
  X,
} from "lucide-react";
import { SHIFTS } from "../data";
import { AppHeader, FONT, ScreenTitle, TabBar } from "../ui";
import { ShiftCard } from "../vaga-components";

const FILTERS = [
  { label: "Publicação", Icon: Clock, active: true },
  { label: "Data", Icon: Calendar },
  { label: "Valor", Icon: BadgeDollarSign },
  { label: "Localidade", Icon: MapPin },
  { label: "À vista", Icon: CircleAlert },
];

export function ExploreFilter() {
  return (
    <>
    {/* sort / filter row */}
      <div className="flex items-start justify-between px-6 pt-4">
        {FILTERS.map(({ label, Icon, active }) => (
          <div key={label} className="flex flex-col items-center gap-1.5">
            <span className="relative text-rev-text">
              <Icon size={22} strokeWidth={1.8} className={active ? "text-rev-primary" : "text-rev-text/80"} />
              {active && (
                <ArrowDown size={11} strokeWidth={2.5} className="absolute -right-2.5 top-1 text-rev-primary" />
              )}
            </span>
            <span
              className={active ? "text-rev-primary" : "text-rev-text/80"}
              style={{ ...FONT.body, fontSize: 11 }}
            >
              {label}
            </span>
          </div>
        ))}
      </div>

      {/* specialty dropdown */}
      <div className="flex items-center gap-2 px-5 pt-4">
        <div className="flex h-11 flex-1 items-center justify-between rounded-lg border border-rev-border px-4">
          <span className="text-rev-text/85" style={{ ...FONT.body, fontSize: 14 }}>
            Todas especialidades
          </span>
          <ChevronDown size={18} className="text-rev-primary" />
        </div>
        <div className="flex h-9 w-9 items-center justify-center rounded-md border border-rev-border">
          <X size={15} className="text-rev-muted" />
        </div>
      </div>

      {/* purple divider */}
      <div
        className="mx-0 mt-4 h-1"
        style={{
          background:
            "linear-gradient(90deg, var(--color-rev-primary) 0%, var(--color-rev-secondary) 60%, transparent 100%)",
          opacity: 0.5,
        }}
      />
    </>
  );
}     

export function ExploreScreen() {
  return (
    <div className="flex h-full flex-col bg-white">
      <AppHeader />
      <ScreenTitle>Explorar</ScreenTitle>

      {/* filters */}
      <ExploreFilter />

      {/* shift list */}
      <div className="flex-1 overflow-hidden">
        {SHIFTS.map((shift) => (
          <ShiftCard key={shift.id} shift={shift} />
        ))}
      </div>

      <TabBar active="explore" />
    </div>
  );
}
