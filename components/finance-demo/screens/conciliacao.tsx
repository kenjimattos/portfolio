// Static recreation of the reconciliation report: the total printed by the
// issuer against the total computed here, and the three lists that explain the
// gap (missing in the app, cent drift, only in the app), with the matched count
// closing it. Faithful to components/FaturaReconcile.tsx in the original repo,
// in its post-report state: the hard-shadowed panel, the three-up totals row,
// the eyebrow-headed sections and the accent buttons.

import { RECONCILE, type ReconcileRow } from "@/components/finance-demo/data";
import { Eyebrow, FONT, Headline, MicroLabel, Money } from "@/components/finance-demo/ui";

const ROW_BORDER = "1px solid color-mix(in srgb, var(--color-fin-ink) 20%, transparent)";

export function ConciliacaoScreen() {
  const r = RECONCILE;

  return (
    <div className="px-16 py-10">
      <div
        className="relative px-8 py-7"
        style={{
          border: "1px solid var(--color-fin-ink)",
          backgroundColor: "var(--color-fin-paper)",
          boxShadow: "8px 8px 0 0 var(--color-fin-ink)",
        }}
      >
        <span
          className="absolute"
          style={{ ...FONT.mono, fontSize: 16, right: 20, top: 16, color: "var(--color-fin-ink-muted)" }}
        >
          ✕
        </span>

        <div className="flex items-baseline justify-between pr-8">
          <Eyebrow>conciliar fatura</Eyebrow>
          <MicroLabel>{r.bill}</MicroLabel>
        </div>
        <div className="mt-1.5">
          <Headline size={34}>PDF × app</Headline>
        </div>
        <p
          className="mt-3"
          style={{ ...FONT.body, fontSize: 13, maxWidth: "58ch", color: "var(--color-fin-ink-muted)" }}
        >
          As linhas do PDF da fatura fechada comparadas com o que o app tem nesta fatura: o
          que falta pode ser inserido, e diferenças de centavos em parcelas podem ser
          corrigidas.
        </p>

        {/* totais — o número impresso pelo emissor contra o calculado aqui */}
        <div className="mt-6 grid grid-cols-3 gap-2 p-3" style={{ border: ROW_BORDER }}>
          <Total label="fatura (pdf)" value={r.statementTotal} />
          <Total label="app" value={r.appTotal} />
          <Total label="diferença" value={r.delta} accent />
        </div>

        {/* faltando no app */}
        <Section
          label={`faltando no app (${r.missing.length})`}
          action={`Inserir ${r.missing.length}`}
          primary
        >
          {r.missing.map((row) => (
            <Line key={row.description} row={row}>
              <span
                className="inline-flex shrink-0 items-center justify-center"
                style={{
                  width: 13,
                  height: 13,
                  border: "1px solid var(--color-fin-shadow)",
                  backgroundColor: "var(--color-fin-accent)",
                  color: "var(--color-fin-paper)",
                  fontSize: 9,
                  lineHeight: 1,
                }}
              >
                ✓
              </span>
            </Line>
          ))}
          <Foot>Inseridas entram sem categoria, e só somam na fatura depois de categorizadas.</Foot>
        </Section>

        {/* centavos divergentes */}
        <Section label={`centavos divergentes (${r.drift.length})`} action="Corrigir 1">
          {r.drift.map((row) => (
            <Line key={row.description} row={row} />
          ))}
          <Foot>
            Arredondamento de parcela. Linhas do Pluggy não são editáveis, a divergência é só
            informativa.
          </Foot>
        </Section>

        {/* só no app */}
        <Section label={`só no app (${r.onlyInApp.length})`}>
          {r.onlyInApp.map((row) => (
            <Line key={row.description} row={row} faded />
          ))}
          <Foot>Estão no app mas não no PDF: confira se são duplicadas ou de outro ciclo.</Foot>
        </Section>

        <div className="mt-6 flex items-center justify-between">
          <Money size={12} color="var(--color-fin-ink-muted)">
            {r.matched}
          </Money>
          <span style={{ ...FONT.mono, fontSize: 12, color: "var(--color-fin-ink-muted)" }}>
            ← outro PDF
          </span>
        </div>
      </div>
    </div>
  );
}

function Total({ label, value, accent }: { label: string; value: string; accent?: boolean }) {
  return (
    <div className="flex flex-col gap-1">
      <Eyebrow>{label}</Eyebrow>
      <Money size={14} color={accent ? "var(--color-fin-accent)" : "var(--color-fin-ink)"}>
        {value}
      </Money>
    </div>
  );
}

function Section({
  label,
  action,
  primary,
  children,
}: {
  label: string;
  action?: string;
  primary?: boolean;
  children: React.ReactNode;
}) {
  return (
    <section className="mt-6">
      <div className="mb-2 flex items-baseline justify-between">
        <Eyebrow>{label}</Eyebrow>
        {action && (
          <span
            className="px-4 py-1.5"
            style={{
              ...FONT.mono,
              fontSize: 11,
              backgroundColor: primary ? "var(--color-fin-accent)" : "transparent",
              border: primary ? "1px solid var(--color-fin-accent)" : "1px solid var(--color-fin-ink)",
              color: primary ? "var(--color-fin-paper)" : "var(--color-fin-ink)",
            }}
          >
            {action}
          </span>
        )}
      </div>
      <div className="flex flex-col gap-1">{children}</div>
    </section>
  );
}

function Line({
  row,
  faded,
  children,
}: {
  row: ReconcileRow;
  faded?: boolean;
  children?: React.ReactNode;
}) {
  return (
    <div
      className="flex items-center gap-3 px-3 py-2"
      style={{
        border: faded
          ? "1px solid color-mix(in srgb, var(--color-fin-ink) 10%, transparent)"
          : ROW_BORDER,
        opacity: faded ? 0.7 : 1,
      }}
    >
      {children}
      <Money size={11} color="var(--color-fin-ink-muted)" className="w-11 shrink-0">
        {row.date}
      </Money>
      <span
        className="min-w-0 flex-1 truncate"
        style={{ ...FONT.body, fontSize: 13, color: "var(--color-fin-ink)" }}
      >
        {row.description}
        {row.installment && (
          <span style={{ ...FONT.mono, fontSize: 11, marginLeft: 6, color: "var(--color-fin-ink-faint)" }}>
            {row.installment}
          </span>
        )}
      </span>
      {row.card && (
        <Money size={11} color="var(--color-fin-ink-faint)">
          {row.card}
        </Money>
      )}
      {row.source && (
        <MicroLabel>{row.source}</MicroLabel>
      )}
      {row.from ? (
        <Money size={11} color="var(--color-fin-ink-muted)">
          {row.from} → {row.amount}
        </Money>
      ) : (
        <Money size={13} color="var(--color-fin-ink)">
          {row.amount}
        </Money>
      )}
    </div>
  );
}

function Foot({ children }: { children: React.ReactNode }) {
  return (
    <p className="mt-1" style={{ ...FONT.body, fontSize: 11, color: "var(--color-fin-ink-faint)" }}>
      {children}
    </p>
  );
}
