// Static recreation of the Revoluna "Minhas escalas" screen: monthly
// calendar with shift markers and the selected day's team below —
// including which colleagues share the same duty.

import { CalendarPlus, ChevronDown, Users } from "lucide-react";
import { CAL_DAYS, CAL_MONTH, CAL_WEEKDAYS, DAY_SCHEDULE } from "../data";
import { AppHeader, FONT, ScreenTitle, TabBar, cx } from "../ui";

const DOT_COLOR = {
  purple: "var(--color-rev-primary)",
  red: "#EB0F67",
  yellow: "#EFC630",
} as const;

function Avatar({ name, hue }: { name: string; hue: string }) {
  const initials = name
    .split(" ")
    .map((p) => p[0])
    .join("");
  return (
    <div
      className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full text-white"
      style={{ background: hue, ...FONT.display, fontSize: 14 }}
      aria-hidden
    >
      {initials}
    </div>
  );
}

export function EscalasScreen() {
  return (
    <div className="flex h-full flex-col bg-white">
      <AppHeader />
      <ScreenTitle>Minhas escalas</ScreenTitle>

      {/* calendar */}
      <div className="px-5 pt-3">
        <p className="text-rev-text" style={{ ...FONT.heading, fontSize: 16 }}>
          {CAL_MONTH}
        </p>
        <div className="mt-3 grid grid-cols-7 gap-y-1.5">
          {CAL_WEEKDAYS.map((wd) => (
            <span
              key={wd}
              className="text-center text-rev-text/70"
              style={{ ...FONT.body, fontSize: 12 }}
            >
              {wd}
            </span>
          ))}
          {CAL_DAYS.map((d, i) => (
            <div key={i} className="flex flex-col items-center gap-0.5">
              <span
                className={cx(
                  "flex h-8 w-8 items-center justify-center rounded-full",
                  d.selected && "bg-rev-primary text-white",
                  !d.selected && (d.outside ? "text-rev-muted/50" : "text-rev-text")
                )}
                style={{ ...FONT.body, fontSize: 14 }}
              >
                {d.day}
              </span>
              <span
                className="h-1.25 w-1.25 rounded-full"
                style={{
                  backgroundColor: d.dot ? DOT_COLOR[d.dot] : "transparent",
                }}
                aria-hidden
              />
            </div>
          ))}
        </div>
        <div className="mt-1 flex justify-center">
          <ChevronDown size={18} className="rotate-180 text-rev-primary" />
        </div>
      </div>

      {/* purple divider */}
      <div
        className="mt-2 h-1"
        style={{
          background:
            "linear-gradient(90deg, transparent 0%, var(--color-rev-secondary) 40%, var(--color-rev-primary) 100%)",
          opacity: 0.45,
        }}
      />

      {/* selected day's schedule */}
      <div className="flex-1 px-5 pt-4">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-rev-text" style={{ ...FONT.display, fontSize: 17 }}>
              {DAY_SCHEDULE.hospital}
            </p>
            <p className="mt-0.5 text-rev-muted" style={{ ...FONT.body, fontSize: 13 }}>
              {DAY_SCHEDULE.sector}
            </p>
          </div>
          <Users size={20} className="text-rev-primary" />
        </div>

        <div className="mt-3 border-t border-rev-tint">
          {DAY_SCHEDULE.colleagues.map((c, i) => (
            <div key={c.name} className="flex items-center gap-4 border-b border-rev-tint py-3">
              <Avatar name={c.name} hue={c.hue} />
              <div className="flex flex-col text-rev-text/85" style={{ ...FONT.body, fontSize: 13 }}>
                <span>{c.start}</span>
                <span>{c.end}</span>
              </div>
              <span className="flex-1 text-rev-text" style={{ ...FONT.heading, fontSize: 16 }}>
                {c.name}
              </span>
              {i === DAY_SCHEDULE.colleagues.length - 1 && (
                <CalendarPlus size={20} className="text-rev-primary" strokeWidth={1.8} />
              )}
            </div>
          ))}
        </div>
      </div>

      <TabBar active="escalas" />
    </div>
  );
}
