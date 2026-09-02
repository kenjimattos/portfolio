// Primitives of the recreated OPP platform (dark theme), rebuilt on the
// portfolio's Tailwind v4 setup. Typography comes from the product's three
// typefaces via CSS vars set by the frame: --font-monoblock (display/titles/
// buttons), --font-epicpro (h1) and --font-intel (body).

import { ReactNode } from "react";
import type { StatusType } from "./data";

export function cx(...parts: Array<string | false | null | undefined>) {
  return parts.filter(Boolean).join(" ");
}

export const FONT = {
  display: { fontFamily: "var(--font-monoblock), monospace" },
  heading: { fontFamily: "var(--font-epicpro), sans-serif" },
  body: { fontFamily: "var(--font-intel), monospace" },
};

/* --------------------------------- surfaces --------------------------------- */

/* ---------------------------------- buttons ---------------------------------- */

export function OppButton({
  variant = "primary",
  className,
  children,
}: {
  variant?: "primary" | "secondary" | "tertiary" | "ghost";
  className?: string;
  children: ReactNode;
}) {
  return (
    <span
      className={cx(
        "inline-flex w-fit shrink-0 cursor-pointer items-center justify-center gap-2 rounded-full px-5 py-2.5 text-base",
        variant === "primary" && "bg-opp-accent text-black",
        variant === "secondary" && "bg-opp-bg text-white border border-white/15",
        variant === "tertiary" && "bg-opp-inactive/40 text-white",
        variant === "ghost" && "text-white border border-white/25",
        className
      )}
      style={FONT.display}
    >
      {children}
    </span>
  );
}

/* -------------------------------- status bits -------------------------------- */

export const STATUS_COLOR: Record<Exclude<StatusType, "none">, string> = {
  success: "#40E629",
  warning: "#F5E421",
  alert: "#F14635",
};

export function StatusDot({ status }: { status: Exclude<StatusType, "none"> }) {
  return (
    <span
      className="inline-block h-2 w-2 rounded-full"
      style={{ backgroundColor: STATUS_COLOR[status] }}
    />
  );
}

/* -------------------------------- IndicatorBar ------------------------------- */

const BAR_GRADIENT =
  "linear-gradient(to right, #F14635 0%, #F5E421 53.365%, #40E629 100%)";
const BAR_W = 180;

// The product's signature piece: a 180x4 traffic-light gauge whose square
// marker samples the gradient at its own position (same trick as the
// original — the marker carries the full gradient, offset by its fraction).
export function IndicatorBar({
  fraction,
  zones,
}: {
  fraction: number; // 0..1
  zones?: [string, string, string];
}) {
  const f = Math.min(1, Math.max(0, fraction));
  return (
    <div style={{ width: BAR_W }}>
      <div className="relative" style={{ height: 12 }}>
        <div
          className="absolute inset-x-0 top-1/2 -translate-y-1/2 rounded-full"
          style={{ height: 4, background: BAR_GRADIENT }}
        />
        <div
          className="absolute top-1/2 -translate-y-1/2"
          style={{
            left: `calc(${f * 100}% - 6px)`,
            width: 12,
            height: 12,
            borderRadius: 2,
            background: BAR_GRADIENT,
            backgroundSize: `${BAR_W}px 100%`,
            backgroundRepeat: "no-repeat",
            backgroundPositionX: `${-f * BAR_W + 6}px`,
            backgroundPositionY: "center",
            boxShadow:
              "0 0 0 1.5px rgba(255,255,255,0.9), 0 1px 2px rgba(0,0,0,0.35)",
          }}
        />
      </div>
      {zones && (
        <div
          className="mt-1 flex justify-between text-white/50"
          style={{ ...FONT.body, fontSize: 8, fontWeight: 300 }}
        >
          <span>{zones[0]}</span>
          <span>{zones[1]}</span>
          <span>{zones[2]}</span>
        </div>
      )}
    </div>
  );
}

/* ------------------------------ indicator line ------------------------------- */

export function AgendaIndicatorLine({
  label,
  value,
  fraction,
  zones,
}: {
  label: string;
  value: string;
  fraction?: number;
  zones?: [string, string, string];
}) {
  return (
    <div className="flex items-center justify-between gap-10">
      <span
        className="flex-1 text-white"
        style={{ ...FONT.body, fontSize: 13, fontWeight: 600 }}
      >
        {label}
      </span>
      <div className="flex flex-col items-end gap-1">
        <span
          className="text-white"
          style={{ ...FONT.body, fontSize: 17, fontWeight: 600 }}
        >
          {value}
        </span>
        {fraction !== undefined ? (
          <IndicatorBar fraction={fraction} zones={zones} />
        ) : (
          <div style={{ width: BAR_W }} className="invisible h-3" />
        )}
      </div>
    </div>
  );
}

/* --------------------------------- ProgressBar -------------------------------- */

export function OppProgressBar({ value }: { value: number }) {
  return (
    <div className="h-2 w-full overflow-hidden rounded-full bg-slate-800">
      <div
        className="h-full rounded-full bg-opp-accent"
        style={{ width: `${Math.min(100, Math.max(0, value))}%` }}
      />
    </div>
  );
}
