"use client";

/* O specimen da decisão 04: o sistema que manteve o design direto no
 * código coerente, na versão enxuta do exhibit do Sebrae. Nada aqui é
 * ilustração — os pills de status e os botões são os componentes reais
 * da recriação, e os três pesos são a Geologica variável de verdade.
 * Por isso ele veste a pele da plataforma (hst-*), não a do editorial:
 * o que está em exibição é o produto.
 */

import { useLocale } from "@/lib/i18n";
import { geologica } from "./geologica";
import {
  cx,
  HButton,
  VagaStatusBadge,
  CandidaturaStatusBadge,
} from "./ui";

const COPY = {
  en: {
    typeLabel: "Geologica · variable typeface · three weights, no bold",
    w100: "100 · thin · big numbers and screen titles",
    w200: "200 · extralight · pills and dense cells",
    w400: "400 · regular · body and controls",
    sample100: "Escala",
    sample200: "July shifts",
    sample400: "Shift calendar by grid, doctor and status.",
    hierarchy: "Hierarchy from size and colour",
    bigNumber: "128 shifts",
    bigNumberSub: "published in July",
    status: "Status language",
    controls: "Controls · shadcn/ui retokenized",
    newShift: "New shift",
    exportPdf: "Export PDF",
    palette: "Primary palette",
  },
  pt: {
    typeLabel: "Geologica · fonte variável · três pesos, nenhum bold",
    w100: "100 · thin · números grandes e títulos de tela",
    w200: "200 · extralight · pills e células densas",
    w400: "400 · regular · corpo e controles",
    sample100: "Escala",
    sample200: "Plantões de julho",
    sample400: "Calendário de plantões por grade, médico e status.",
    hierarchy: "Hierarquia por tamanho e cor",
    bigNumber: "128 plantões",
    bigNumberSub: "publicados em julho",
    status: "Linguagem de status",
    controls: "Controles · shadcn/ui retokenizado",
    newShift: "Nova Vaga",
    exportPdf: "Exportar PDF",
    palette: "Paleta primária",
  },
} as const;

const PALETTE = [
  { hex: "#A369ED", role: "primary" },
  { hex: "#8C4DE0", role: "strong" },
  { hex: "#7E3CD0", role: "ink" },
  { hex: "#18181B", role: "fg" },
  { hex: "#71717A", role: "muted" },
  { hex: "#E4E4E7", role: "border" },
  { hex: "#F3F3F3", role: "bg" },
] as const;

function Label({ children }: { children: string }) {
  return <div className="meta text-[10px] text-hst-muted">{children}</div>;
}

function Weight({ sample, note, weight, size }: { sample: string; note: string; weight: number; size: number }) {
  return (
    <div className="flex flex-wrap items-baseline gap-x-6 gap-y-1.5">
      <span className="leading-none" style={{ fontWeight: weight, fontSize: size }}>
        {sample}
      </span>
      <Label>{note}</Label>
    </div>
  );
}

export function SystemSpecimen() {
  const t = COPY[useLocale()];

  return (
    <div
      className={cx(
        geologica.variable,
        "hst-app rounded-xl border border-hst-border bg-white p-6 text-hst-fg antialiased shadow-sm md:p-8"
      )}
      style={{ fontFamily: "var(--font-geologica), sans-serif" }}
    >
      <div className="grid grid-cols-1 gap-8 md:grid-cols-[minmax(0,7fr)_minmax(0,5fr)]">
        <div>
          <Label>{t.typeLabel}</Label>
          <div className="mt-3.5 flex flex-col gap-4">
            <Weight sample={t.sample100} note={t.w100} weight={100} size={64} />
            <Weight sample={t.sample200} note={t.w200} weight={200} size={40} />
            <Weight sample={t.sample400} note={t.w400} weight={400} size={17} />
          </div>
        </div>

        <div className="border-t border-hst-border pt-6 md:border-l md:border-t-0 md:pl-8 md:pt-0">
          <Label>{t.hierarchy}</Label>
          <div className="mt-3.5">
            <div className="text-3xl font-normal">{t.bigNumber}</div>
            <div className="mt-0.5 text-sm text-hst-muted">{t.bigNumberSub}</div>
          </div>

          <div className="mt-6 border-t border-hst-border pt-4">
            <Label>{t.status}</Label>
            <div className="mt-2.5 flex flex-wrap gap-2">
              <VagaStatusBadge status="aberta" />
              <VagaStatusBadge status="fechada" />
              <VagaStatusBadge status="urgente" />
              <VagaStatusBadge status="anunciada" />
            </div>
            <div className="mt-2 flex flex-wrap gap-2">
              <CandidaturaStatusBadge status="PENDENTE" />
              <CandidaturaStatusBadge status="APROVADO" />
              <CandidaturaStatusBadge status="REPROVADO" />
            </div>
          </div>

          <div className="mt-6 border-t border-hst-border pt-4">
            <Label>{t.controls}</Label>
            <div className="mt-3 flex flex-wrap items-center gap-2">
              <HButton size="sm" className="text-sm">
                {t.newShift}
              </HButton>
              <HButton variant="outline" size="sm" className="text-sm">
                {t.exportPdf}
              </HButton>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-6 border-t border-hst-border pt-4">
        <Label>{t.palette}</Label>
        <div className="mt-2.5 flex gap-2">
          {PALETTE.map((c) => (
            <div key={c.hex} className="min-w-0 flex-1">
              <div
                className="h-11 rounded-md border border-hst-border"
                style={{ background: c.hex }}
              />
              <div className="meta mt-1.5 truncate text-[9px] text-hst-muted">
                {c.hex} · {c.role}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
