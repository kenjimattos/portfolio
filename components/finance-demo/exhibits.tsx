"use client";

// Exhibits for the Finance case study. These are not recreations of the app —
// they are diagrams of the engineering decisions, drawn in the case's own
// visual language (portfolio type, case accent variables).

import { ReactNode } from "react";
import { type SyncOutcome } from "./data";

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
      <p className="font-mono" style={{ fontSize: "clamp(10px, 1vw, 12px)", opacity: 0.55 }}>
        {caption}
      </p>
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

/* ------------------------------ state machine -------------------------------- */

const TONE_COPY: Record<SyncOutcome["tone"], { en: string; pt: string }> = {
  keep: { en: "keep identity", pt: "mantém identidade" },
  mutate: { en: "update in place", pt: "atualiza no lugar" },
  mint: { en: "mint new row", pt: "cunha linha nova" },
  suppress: { en: "suppress + log", pt: "suprime e registra" },
};

export function StateMachineTable({
  outcomes,
  locale,
  headers,
}: {
  outcomes: SyncOutcome[];
  locale: "en" | "pt";
  headers: [string, string, string];
}) {
  return (
    <div className="flex flex-col">
      <div
        className="hidden md:grid gap-6 pb-3"
        style={{
          gridTemplateColumns: "48px 1fr 1fr 150px",
          borderBottom: `1px solid color-mix(in srgb, ${ACCENT} 30%, transparent)`,
        }}
      >
        <Label>#</Label>
        <Label>{headers[0]}</Label>
        <Label>{headers[1]}</Label>
        <Label>{headers[2]}</Label>
      </div>

      {outcomes.map((o) => (
        <div
          key={o.n}
          className="grid gap-3 md:gap-6 py-5"
          style={{
            gridTemplateColumns: "48px 1fr",
            borderBottom: "1px solid rgba(22, 22, 22, 0.08)",
          }}
        >
          <span className="font-mono" style={{ fontSize: "clamp(12px, 1.2vw, 14px)", color: ACCENT }}>
            {o.n}
          </span>
          <div
            className="grid gap-3 md:gap-6"
            style={{ gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 220px), 1fr))" }}
          >
            <span className="text-foreground" style={{ fontSize: "clamp(13px, 1.3vw, 15px)" }}>
              {o.condition[locale]}
            </span>
            <span className="text-foreground" style={{ fontSize: "clamp(13px, 1.3vw, 15px)", opacity: 0.7 }}>
              {o.action[locale]}
            </span>
            <span
              className="font-mono self-start rounded-full px-3 py-1"
              style={{
                fontSize: "clamp(10px, 1vw, 12px)",
                color: INK,
                backgroundColor: `color-mix(in srgb, ${ACCENT} 12%, transparent)`,
                border: `1px solid color-mix(in srgb, ${ACCENT} 28%, transparent)`,
                width: "fit-content",
              }}
            >
              {TONE_COPY[o.tone][locale]}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
}

/* ---------------------------------- tests ------------------------------------ */

export type TestFile = { file: string; count: string; locks: string };

export function TestTable({ files, headers }: { files: TestFile[]; headers: [string, string, string] }) {
  return (
    <div className="flex flex-col">
      <div
        className="hidden md:grid gap-6 pb-3"
        style={{
          gridTemplateColumns: "minmax(220px, 1fr) 90px 2fr",
          borderBottom: `1px solid color-mix(in srgb, ${ACCENT} 30%, transparent)`,
        }}
      >
        <Label>{headers[0]}</Label>
        <Label>{headers[1]}</Label>
        <Label>{headers[2]}</Label>
      </div>
      {files.map((f) => (
        <div
          key={f.file}
          className="grid gap-2 md:gap-6 py-4 items-baseline"
          style={{
            gridTemplateColumns: "minmax(180px, 1fr) 90px 2fr",
            borderBottom: "1px solid rgba(22, 22, 22, 0.08)",
          }}
        >
          <code className="font-mono" style={{ fontSize: "clamp(11px, 1.15vw, 13px)", color: INK }}>
            {f.file}
          </code>
          <span className="font-mono" style={{ fontSize: "clamp(11px, 1.15vw, 13px)", opacity: 0.55 }}>
            {f.count}
          </span>
          <span className="text-foreground" style={{ fontSize: "clamp(13px, 1.3vw, 15px)", opacity: 0.75 }}>
            {f.locks}
          </span>
        </div>
      ))}
    </div>
  );
}

/* ----------------------------------- docs ------------------------------------ */

export type DocCard = { file: string; title: string; text: string; rule: string };

export function DocsShelf({ docs, ruleLabel }: { docs: DocCard[]; ruleLabel: string }) {
  return (
    <div
      className="grid gap-6"
      style={{ gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 280px), 1fr))" }}
    >
      {docs.map((doc) => (
        <Panel key={doc.file} className="p-6 flex flex-col gap-4">
          <code className="font-mono" style={{ fontSize: "clamp(11px, 1.1vw, 13px)", color: ACCENT }}>
            {doc.file}
          </code>
          <h3 className="text-foreground font-semibold" style={{ fontSize: "clamp(16px, 1.5vw, 19px)" }}>
            {doc.title}
          </h3>
          <p className="text-foreground leading-relaxed" style={{ fontSize: "clamp(13px, 1.25vw, 15px)", opacity: 0.7 }}>
            {doc.text}
          </p>
          <div className="mt-auto pt-4" style={{ borderTop: `1px solid color-mix(in srgb, ${ACCENT} 18%, transparent)` }}>
            <Label>{ruleLabel}</Label>
            <p
              className="font-mono mt-2 text-foreground"
              style={{ fontSize: "clamp(11px, 1.1vw, 13px)", opacity: 0.8 }}
            >
              {doc.rule}
            </p>
          </div>
        </Panel>
      ))}
    </div>
  );
}

/* -------------------------------- architecture -------------------------------- */

export type ArchNode = { name: string; role: string; items: string[] };

export function ArchitectureMap({ nodes }: { nodes: ArchNode[] }) {
  return (
    <div
      className="grid gap-6"
      style={{ gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 250px), 1fr))" }}
    >
      {nodes.map((node) => (
        <Panel key={node.name} className="p-6 flex flex-col gap-3">
          <code className="font-mono" style={{ fontSize: "clamp(12px, 1.2vw, 14px)", color: ACCENT }}>
            {node.name}
          </code>
          <span className="text-foreground font-medium" style={{ fontSize: "clamp(14px, 1.35vw, 16px)" }}>
            {node.role}
          </span>
          <ul className="flex flex-col gap-1.5 mt-1">
            {node.items.map((item) => (
              <li
                key={item}
                className="text-foreground"
                style={{ fontSize: "clamp(12px, 1.2vw, 14px)", opacity: 0.65 }}
              >
                {item}
              </li>
            ))}
          </ul>
        </Panel>
      ))}
    </div>
  );
}

/* --------------------------------- slug pipe --------------------------------- */

export type SlugStep = { input: string; step: string; output: string };

/** The merchant-slug normalization, step by step, on two real-shaped strings. */
export function SlugPipeline({ steps, note }: { steps: SlugStep[]; note: string }) {
  return (
    <Panel className="p-6 flex flex-col gap-5">
      {steps.map((s) => (
        <div key={s.step} className="flex flex-col gap-2">
          <Label>{s.step}</Label>
          <div className="flex flex-wrap items-center gap-3">
            <code
              className="font-mono px-2 py-1 rounded-sm"
              style={{ fontSize: "clamp(11px, 1.1vw, 13px)", backgroundColor: TINT, color: INK }}
            >
              {s.input}
            </code>
            <span className="font-mono" style={{ fontSize: "12px", color: ACCENT }}>
              →
            </span>
            <code
              className="font-mono px-2 py-1 rounded-sm"
              style={{ fontSize: "clamp(11px, 1.1vw, 13px)", backgroundColor: TINT, color: INK }}
            >
              {s.output}
            </code>
          </div>
        </div>
      ))}
      <p
        className="text-foreground pt-4"
        style={{
          fontSize: "clamp(12px, 1.2vw, 14px)",
          opacity: 0.65,
          borderTop: `1px solid color-mix(in srgb, ${ACCENT} 18%, transparent)`,
        }}
      >
        {note}
      </p>
    </Panel>
  );
}
