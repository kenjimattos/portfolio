// Static recreation of the fatura screenshot import: the review table the user
// gets back after Claude reads the issuer's statement images. Every row is
// editable before it is committed as a manual transaction, and rows that are
// not real bill items come back unchecked. Faithful to FaturaImport.tsx.

import { EXTRACTED_ROWS, type ExtractedRow } from "@/components/finance-demo/data";
import { Eyebrow, FONT, MicroLabel, Money } from "@/components/finance-demo/ui";

export function FaturaImportScreen() {
  const included = EXTRACTED_ROWS.filter((r) => !r.excluded).length;

  return (
    <div className="px-16 py-10">
      <div className="flex items-baseline justify-between">
        <Eyebrow>importar fatura · screenshots</Eyebrow>
        <MicroLabel>fatura de agosto · Nubank</MicroLabel>
      </div>

      <div className="mt-5 flex gap-3">
        {["captura-1.png", "captura-2.png", "captura-3.png"].map((name) => (
          <div
            key={name}
            className="flex h-24 w-32 flex-col items-center justify-center gap-2"
            style={{ border: "1px solid var(--color-fin-rule)", backgroundColor: "var(--color-fin-tint)" }}
          >
            <span style={{ ...FONT.body, fontSize: 20, color: "var(--color-fin-ink-faint)" }}>▤</span>
            <Money size={10} color="var(--color-fin-ink-faint)">
              {name}
            </Money>
          </div>
        ))}
        <div
          className="flex h-24 flex-1 flex-col justify-center gap-1 px-5"
          style={{ border: "1px dashed var(--color-fin-rule)" }}
        >
          <span style={{ ...FONT.body, fontSize: 13, color: "var(--color-fin-ink-soft)" }}>
            6 linhas lidas, 5 prontas para revisão
          </span>
          <span style={{ ...FONT.body, fontSize: 11, color: "var(--color-fin-ink-faint)" }}>
            datas, valores, cartão e parcelas normalizados na janela 08/08 a 07/09
          </span>
        </div>
      </div>

      <div
        className="mt-8 grid gap-x-6 pb-2"
        style={{
          gridTemplateColumns: "28px 70px 1fr 80px 90px 120px",
          borderBottom: "1px solid var(--color-fin-rule)",
        }}
      >
        <MicroLabel>ok</MicroLabel>
        <MicroLabel>data</MicroLabel>
        <MicroLabel>descrição</MicroLabel>
        <MicroLabel>cartão</MicroLabel>
        <MicroLabel className="text-right">valor</MicroLabel>
        <MicroLabel className="text-right">ajuste</MicroLabel>
      </div>

      {EXTRACTED_ROWS.map((row) => (
        <ExtractedLine key={row.description} row={row} />
      ))}

      <div className="mt-6 flex items-center justify-between">
        <span style={{ ...FONT.body, fontSize: 13, color: "var(--color-fin-ink-muted)" }}>
          voltar
        </span>
        <span
          className="px-5 py-2"
          style={{
            ...FONT.mono,
            fontSize: 13,
            backgroundColor: "var(--color-fin-accent)",
            color: "var(--color-fin-paper)",
          }}
        >
          importar {included} lançamentos
        </span>
      </div>
    </div>
  );
}

function ExtractedLine({ row }: { row: ExtractedRow }) {
  return (
    <div
      className="grid items-center gap-x-6 py-3"
      style={{
        gridTemplateColumns: "28px 70px 1fr 80px 90px 120px",
        opacity: row.excluded ? 0.45 : 1,
      }}
    >
      <span
        className="inline-flex items-center justify-center"
        style={{
          width: 14,
          height: 14,
          border: "1px solid var(--color-fin-shadow)",
          backgroundColor: row.excluded ? "transparent" : "var(--color-fin-accent)",
          color: "var(--color-fin-paper)",
          fontSize: 10,
          lineHeight: 1,
        }}
      >
        {row.excluded ? "" : "✓"}
      </span>

      <Money size={11} color="var(--color-fin-ink-muted)" className="uppercase">
        {row.date}
      </Money>

      <div className="flex min-w-0 items-center gap-2">
        <span
          className="truncate"
          style={{ ...FONT.body, fontSize: 13, color: "var(--color-fin-ink)" }}
        >
          {row.description}
        </span>
        {row.installment && (
          <Money size={10} color="var(--color-fin-ink-faint)">
            {row.installment}
          </Money>
        )}
        {row.refund && (
          <span
            className="px-1.5"
            style={{
              ...FONT.body,
              fontSize: 9,
              border: "1px solid var(--color-fin-positive)",
              color: "var(--color-fin-positive)",
            }}
          >
            estorno
          </span>
        )}
        {row.excluded && (
          <span style={{ ...FONT.body, fontSize: 10, color: "var(--color-fin-ink-faint)" }}>
            registro interno do provedor, fora da fatura
          </span>
        )}
      </div>

      <Money size={11} color="var(--color-fin-ink-faint)">
        {row.card}
      </Money>

      <div className="text-right">
        <Money size={13} color={row.refund ? "var(--color-fin-positive)" : "var(--color-fin-ink)"}>
          {row.refund ? "+" : "−"}
          {row.amount}
        </Money>
      </div>

      <div className="text-right">
        {row.shift ? (
          <span style={{ ...FONT.body, fontSize: 10, color: "var(--color-fin-accent)" }}>
            nesta fatura (shift {row.shift})
          </span>
        ) : (
          <span />
        )}
      </div>
    </div>
  );
}
