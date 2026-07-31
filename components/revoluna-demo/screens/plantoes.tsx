// Static recreation of the Revoluna "Meus plantões" screen: the doctor's
// application pipeline — saved, under review and confirmed shifts.

import { ChevronDown, Clock, Heart, ThumbsUp, X } from "lucide-react";
import { CONFIRMED_SHIFTS } from "../data";
import { AppHeader, FONT, ScreenTitle, ShiftCard, TabBar, cx } from "../ui";

const TABS = [
  { label: "Salvos", Icon: Heart },
  { label: "Em análise", Icon: Clock },
  { label: "Confirmados", Icon: ThumbsUp, active: true },
];

export function PlantoesScreen() {
  return (
    <div className="flex h-full flex-col bg-white">
      <AppHeader />
      <ScreenTitle>Meus plantões</ScreenTitle>

      {/* status tabs */}
      <div className="flex items-start justify-between px-10 pt-5">
        {TABS.map(({ label, Icon, active }) => (
          <div key={label} className="flex flex-col items-center gap-1.5">
            <Icon
              size={22}
              strokeWidth={1.8}
              className={active ? "text-rev-tertiary" : "text-rev-text/70"}
            />
            <span
              className={cx(
                "pb-1",
                active
                  ? "border-b-2 border-rev-primary text-rev-text"
                  : "text-rev-text/70"
              )}
              style={{ ...FONT.body, fontSize: 13, fontWeight: active ? 500 : 400 }}
            >
              {label}
            </span>
          </div>
        ))}
      </div>

      {/* hospital filter */}
      <div className="flex items-center gap-2 px-5 pt-5">
        <div className="flex h-11 flex-1 items-center justify-between rounded-lg border border-rev-border px-4">
          <span className="text-rev-text/85" style={{ ...FONT.body, fontSize: 14 }}>
            Todos hospitais
          </span>
          <ChevronDown size={18} className="text-rev-primary" />
        </div>
        <div className="flex h-9 w-9 items-center justify-center rounded-md border border-rev-border">
          <X size={15} className="text-rev-muted" />
        </div>
      </div>

      {/* purple divider */}
      <div
        className="mt-4 h-1"
        style={{
          background:
            "linear-gradient(90deg, var(--color-rev-primary) 0%, var(--color-rev-secondary) 60%, transparent 100%)",
          opacity: 0.5,
        }}
      />

      <p className="px-5 pt-4 text-rev-primary" style={{ ...FONT.heading, fontSize: 14 }}>
        Filtrar por data
      </p>

      {/* confirmed shifts */}
      <div className="flex-1 overflow-hidden pt-1">
        {CONFIRMED_SHIFTS.map((shift) => (
          <ShiftCard key={shift.id} shift={shift} />
        ))}
      </div>

      <TabBar active="plantoes" />
    </div>
  );
}
