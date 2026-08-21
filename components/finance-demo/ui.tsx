// Primitives of the recreated Finance app, rebuilt on the portfolio's
// Tailwind v4 setup. The original is an editorial / financial-press layout:
// warm paper, warm near-black ink, one burnt-orange accent, no card shadows
// and no rounded corners. Type comes from CSS vars set by the frame:
// --font-fraunces (display), --font-jetbrains (numbers), --font-inter-fin (UI).

import { ReactNode } from "react";

export function cx(...parts: Array<string | false | null | undefined>) {
  return parts.filter(Boolean).join(" ");
}

export const FONT = {
  display: { fontFamily: "var(--font-fraunces), Times New Roman, serif" },
  mono: { fontFamily: "var(--font-jetbrains), monospace", fontVariantNumeric: "tabular-nums" },
  body: { fontFamily: "var(--font-inter-fin), system-ui, sans-serif" },
} as const;

/* --------------------------------- text bits -------------------------------- */

/** The app's `.eyebrow`: uppercase Inter, 11px, wide tracking, muted ink. */
export function Eyebrow({
  children,
  className,
  color,
}: {
  children: ReactNode;
  className?: string;
  color?: string;
}) {
  return (
    <span
      className={cx("uppercase", className)}
      style={{
        ...FONT.body,
        fontSize: 11,
        fontWeight: 500,
        letterSpacing: "0.14em",
        color: color ?? "var(--color-fin-ink-muted)",
      }}
    >
      {children}
    </span>
  );
}

/** Column header / micro-label: 10px uppercase Inter in the faintest ink. */
export function MicroLabel({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <span
      className={cx("uppercase", className)}
      style={{
        ...FONT.body,
        fontSize: 10,
        letterSpacing: "0.14em",
        color: "var(--color-fin-ink-faint)",
      }}
    >
      {children}
    </span>
  );
}

export function Money({
  children,
  size = 15,
  color = "var(--color-fin-ink)",
  className,
}: {
  children: ReactNode;
  size?: number;
  color?: string;
  className?: string;
}) {
  return (
    <span className={className} style={{ ...FONT.mono, fontSize: size, color }}>
      {children}
    </span>
  );
}

/** The giant Fraunces number the app uses for bill and share totals. */
export function Headline({
  children,
  size,
  color = "var(--color-fin-ink)",
}: {
  children: ReactNode;
  size: number;
  color?: string;
}) {
  return (
    <div
      style={{
        ...FONT.display,
        fontSize: size,
        lineHeight: 1,
        letterSpacing: "-0.025em",
        color,
      }}
    >
      {children}
    </div>
  );
}

/* ---------------------------------- rules ----------------------------------- */

export function Rule({ className }: { className?: string }) {
  return (
    <div
      className={cx("w-full", className)}
      style={{ height: 1, backgroundColor: "var(--color-fin-rule)" }}
    />
  );
}

/* --------------------------------- fragments -------------------------------- */

/** Category pill trigger as it renders inside a transaction row. */
export function CategoryTrigger({ label, color }: { label: string; color?: string }) {
  const uncategorized = !color;
  return (
    <span
      className="inline-flex items-center gap-1.5"
      style={{
        ...FONT.body,
        fontSize: 11,
        padding: "2px 8px",
        border: `1px solid ${uncategorized ? "var(--color-fin-rule)" : color}`,
        color: uncategorized ? "var(--color-fin-ink-faint)" : color,
        backgroundColor: uncategorized ? "transparent" : `color-mix(in srgb, ${color} 8%, transparent)`,
      }}
    >
      {!uncategorized && (
        <span
          className="inline-block rounded-full"
          style={{ width: 5, height: 5, backgroundColor: color }}
        />
      )}
      {label}
    </span>
  );
}

/** "▲ R$ 386,20 vs anterior" — accent when higher, olive when lower. */
export function Delta({ value, text }: { value: number; text: string }) {
  const higher = value > 0;
  return (
    <div
      className="flex items-center gap-1.5"
      style={{ ...FONT.body, fontSize: 12, color: "var(--color-fin-ink-muted)" }}
    >
      <span
        style={{
          ...FONT.mono,
          color: higher ? "var(--color-fin-accent)" : "var(--color-fin-positive)",
        }}
      >
        {higher ? "▲" : "▼"}
      </span>
      <span>
        {text} <span style={{ color: "var(--color-fin-ink-faint)" }}>vs anterior</span>
      </span>
    </div>
  );
}

/** Small ghost button: uppercase Inter in muted ink, as in the bill header. */
export function GhostAction({ children }: { children: ReactNode }) {
  return (
    <span
      className="uppercase"
      style={{
        ...FONT.body,
        fontSize: 12,
        letterSpacing: "0.14em",
        color: "var(--color-fin-ink-muted)",
      }}
    >
      {children}
    </span>
  );
}
