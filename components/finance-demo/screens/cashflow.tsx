// Static recreation of the CashFlow ledger: origem | dia | descrição | débito |
// crédito | saldo, past days tinted, the realized boundary marked by the accent
// dot, credit-card bills in accent, manual entries carrying the future.
// Faithful to screens/CashFlow.tsx in the original repo.

import { LEDGER_END_BALANCE, LEDGER_MONTH, LEDGER_ROWS, type LedgerRow } from "@/components/finance-demo/data";
import { FONT, Headline, MicroLabel, Money } from "@/components/finance-demo/ui";

const COLS = "80px 64px 1fr 110px 110px 100px";

export function CashFlowScreen() {
  return (
    <div className="px-20 py-10">
      <div className="mb-3 flex items-baseline justify-between">
        <Headline size={28}>{LEDGER_MONTH}</Headline>
        <Money size={14} color="var(--color-fin-ink-muted)">
          {LEDGER_END_BALANCE}
        </Money>
      </div>

      <div
        className="grid items-baseline gap-x-6 pb-2"
        style={{ gridTemplateColumns: COLS, borderBottom: "1px solid var(--color-fin-rule)" }}
      >
        <MicroLabel>origem</MicroLabel>
        <MicroLabel>dia</MicroLabel>
        <MicroLabel>descrição</MicroLabel>
        <MicroLabel className="text-right">débito</MicroLabel>
        <MicroLabel className="text-right">crédito</MicroLabel>
        <MicroLabel className="text-right">saldo</MicroLabel>
      </div>

      {LEDGER_ROWS.map((row, i) => (
        <LedgerLine key={`${row.description}-${i}`} row={row} />
      ))}

      <div className="mt-2 flex items-center gap-2 py-2">
        <span style={{ ...FONT.body, fontSize: 13, color: "var(--color-fin-ink-faint)" }}>
          + novo lançamento
        </span>
      </div>
    </div>
  );
}

function LedgerLine({ row }: { row: LedgerRow }) {
  const bullet = row.bill
    ? "var(--color-fin-accent)"
    : row.sourceColor ?? "var(--color-fin-ink-faint)";

  return (
    <div
      className="grid items-center gap-x-6"
      style={{
        gridTemplateColumns: COLS,
        paddingTop: 7,
        paddingBottom: 7,
        backgroundColor: row.past ? "var(--color-fin-tint)" : "transparent",
      }}
    >
      <div className="flex min-w-0 items-center gap-1.5">
        {(row.source || row.bill) && (
          <>
            <span
              className="inline-block shrink-0 rounded-full"
              style={{ width: 5, height: 5, backgroundColor: bullet }}
            />
            <span
              className="truncate"
              style={{
                ...FONT.body,
                fontSize: 10,
                color: row.bill ? "var(--color-fin-accent)" : "var(--color-fin-ink-faint)",
              }}
            >
              {row.source}
            </span>
          </>
        )}
      </div>

      <div className="flex items-center gap-1">
        <Money size={11} color="var(--color-fin-ink-muted)">
          {row.day}
        </Money>
        {row.today && (
          <span
            className="inline-block rounded-full"
            style={{ width: 5, height: 5, backgroundColor: "var(--color-fin-accent)" }}
          />
        )}
      </div>

      <div className="flex min-w-0 items-center gap-2">
        <span
          className="truncate"
          style={{ ...FONT.body, fontSize: 13, color: "var(--color-fin-ink)" }}
        >
          {row.description}
        </span>
        {row.manual && (
          <span
            className="shrink-0 italic"
            style={{ ...FONT.body, fontSize: 9, color: "var(--color-fin-accent)" }}
          >
            projeção
          </span>
        )}
      </div>

      <div className="text-right">
        {row.debit && (
          <Money size={13} color="var(--color-fin-ink)">
            {row.debit}
          </Money>
        )}
      </div>
      <div className="text-right">
        {row.credit && (
          <Money size={13} color="var(--color-fin-positive)">
            {row.credit}
          </Money>
        )}
      </div>
      <div className="text-right">
        {row.balance && (
          <Money size={11} color="var(--color-fin-ink-muted)">
            {row.balance}
          </Money>
        )}
      </div>
    </div>
  );
}
