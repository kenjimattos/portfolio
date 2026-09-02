"use client";

// Exhibits for the Finance case study. These are not recreations of the app —
// they are diagrams of the engineering decisions, drawn in the case's own
// visual language (portfolio type, case accent variables).

import { ReactNode } from "react";

const ACCENT = "var(--case-accent)";
const INK = "var(--case-ink)";
const TINT = "var(--case-tint)";

function Panel({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <div
      className={className}
      style={{
        border: `1px solid color-mix(in srgb, ${ACCENT} 22%, transparent)`,
        backgroundColor: "rgba(255, 255, 249, 0.6)",
        borderRadius: "8px",
      }}
    >
      {children}
    </div>
  );
}

function Label({ children }: { children: ReactNode }) {
  return (
    <span
      className="font-mono uppercase tracking-widest"
      style={{ fontSize: "clamp(9px, 0.85vw, 11px)", color: INK }}
    >
      {children}
    </span>
  );
}

/* ------------------------------- the symptom -------------------------------- */

export type PayloadSnapshot = {
  when: string;
  providerId: string;
  description: string;
  amount: string;
  note: string;
  drifted?: boolean;
};

/** Three sync passes, one provider ID, content that keeps changing under it. */
export function SymptomStrip({
  caption,
  snapshots,
}: {
  caption: string;
  snapshots: PayloadSnapshot[];
}) {
  return (
    <div className="flex flex-col gap-4">
      <div
        className="grid gap-4"
        style={{ gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 240px), 1fr))" }}
      >
        {snapshots.map((snap) => (
          <Panel key={snap.when} className="p-5 flex flex-col gap-3">
            <div className="flex items-center justify-between gap-3">
              <Label>{snap.when}</Label>
              {snap.drifted && (
                <span
                  className="font-mono rounded-full px-2 py-0.5"
                  style={{
                    fontSize: "10px",
                    backgroundColor: `color-mix(in srgb, ${ACCENT} 14%, transparent)`,
                    color: INK,
                  }}
                >
                  drift
                </span>
              )}
            </div>
            <code
              className="font-mono block truncate"
              style={{ fontSize: "clamp(10px, 1vw, 12px)", color: ACCENT }}
            >
              {snap.providerId}
            </code>
            <div className="flex flex-col gap-1">
              <span
                className="text-foreground font-medium truncate"
                style={{ fontSize: "clamp(13px, 1.3vw, 15px)" }}
              >
                {snap.description}
              </span>
              <span className="font-mono text-foreground" style={{ fontSize: "clamp(12px, 1.2vw, 14px)", opacity: 0.75 }}>
                {snap.amount}
              </span>
            </div>
            <p className="text-foreground" style={{ fontSize: "clamp(11px, 1.1vw, 13px)", opacity: 0.6 }}>
              {snap.note}
            </p>
          </Panel>
        ))}
      </div>
      {caption ? (
        <p className="font-mono" style={{ fontSize: "clamp(10px, 1vw, 12px)", opacity: 0.55 }}>
          {caption}
        </p>
      ) : null}
    </div>
  );
}

/* ------------------------------ identity model ------------------------------- */

export function IdentityDiagram({
  keyLabel,
  keyValue,
  keyNote,
  hashLabel,
  hashParts,
  excludedLabel,
  excludedNote,
  attachedLabel,
  attached,
}: {
  keyLabel: string;
  keyValue: string;
  keyNote: string;
  hashLabel: string;
  hashParts: string[];
  excludedLabel: string;
  excludedNote: string;
  attachedLabel: string;
  attached: string[];
}) {
  return (
    <div
      className="grid gap-6"
      style={{ gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 280px), 1fr))" }}
    >
      <Panel className="p-6 flex flex-col gap-4">
        <Label>{keyLabel}</Label>
        <code
          className="font-mono block"
          style={{ fontSize: "clamp(12px, 1.3vw, 15px)", color: ACCENT, wordBreak: "break-all" }}
        >
          {keyValue}
        </code>
        <p className="text-foreground" style={{ fontSize: "clamp(12px, 1.2vw, 14px)", opacity: 0.65 }}>
          {keyNote}
        </p>
        <div className="pt-4" style={{ borderTop: `1px solid color-mix(in srgb, ${ACCENT} 18%, transparent)` }}>
          <Label>{attachedLabel}</Label>
          <div className="flex flex-wrap gap-2 mt-3">
            {attached.map((item) => (
              <span
                key={item}
                className="font-mono px-2.5 py-1 rounded-sm"
                style={{
                  fontSize: "clamp(10px, 1vw, 12px)",
                  border: `1px solid color-mix(in srgb, ${ACCENT} 30%, transparent)`,
                  color: INK,
                }}
              >
                {item}
              </span>
            ))}
          </div>
        </div>
      </Panel>

      <Panel className="p-6 flex flex-col gap-4">
        <Label>{hashLabel}</Label>
        <div className="flex flex-wrap items-center gap-2">
          <code className="font-mono" style={{ fontSize: "clamp(12px, 1.2vw, 14px)", color: ACCENT }}>
            sha256(
          </code>
          {hashParts.map((part, i) => (
            <span key={part} className="flex items-center gap-2">
              <code
                className="font-mono px-2 py-1 rounded-sm"
                style={{
                  fontSize: "clamp(11px, 1.1vw, 13px)",
                  backgroundColor: TINT,
                  color: INK,
                }}
              >
                {part}
              </code>
              {i < hashParts.length - 1 && (
                <span className="font-mono" style={{ fontSize: "12px", opacity: 0.5 }}>
                  +
                </span>
              )}
            </span>
          ))}
          <code className="font-mono" style={{ fontSize: "clamp(12px, 1.2vw, 14px)", color: ACCENT }}>
            )
          </code>
        </div>
        <div className="flex items-center gap-3">
          <code
            className="font-mono px-2 py-1 rounded-sm"
            style={{
              fontSize: "clamp(11px, 1.1vw, 13px)",
              textDecoration: "line-through",
              opacity: 0.5,
              border: "1px solid rgba(22,22,22,0.15)",
            }}
          >
            {excludedLabel}
          </code>
        </div>
        <p className="text-foreground" style={{ fontSize: "clamp(12px, 1.2vw, 14px)", opacity: 0.65 }}>
          {excludedNote}
        </p>
      </Panel>
    </div>
  );
}
