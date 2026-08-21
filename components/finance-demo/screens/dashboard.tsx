// Static recreation of the Dashboard screen: BillHeader (cycle arrows, giant
// Fraunces total, delta, closing/due dates), the Divisão panel, the category
// tabs and the transaction inbox. Faithful to BillHeader.tsx, SplitSection.tsx,
// CategoryTabs.tsx and TransactionRow.tsx in the original repo.

import {
  BILL,
  BILL_CATEGORIES,
  HIDDEN_ROW,
  INBOX_ROWS,
  SPLIT,
  type Row,
  type SplitColumn,
} from "@/components/finance-demo/data";
import {
  CategoryTrigger,
  Delta,
  Eyebrow,
  FONT,
  GhostAction,
  Headline,
  MicroLabel,
  Money,
  Rule,
  cx,
} from "@/components/finance-demo/ui";

const PAGE = "px-20 py-10";

/* -------------------------------- bill header -------------------------------- */

export function BillHeader({ compact }: { compact?: boolean }) {
  return (
    <section>
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-3">
          <Eyebrow>←</Eyebrow>
          <Eyebrow>{BILL.title}</Eyebrow>
          <Eyebrow color="var(--color-fin-ink-faint)">→</Eyebrow>
        </div>
        <div className="flex items-center gap-6">
          <GhostAction>regras</GhostAction>
          <GhostAction>sincronizar ↻</GhostAction>
        </div>
      </div>

      <div className="mt-3">
        <Headline size={compact ? 72 : 96}>{BILL.total}</Headline>
      </div>

      <div
        className="mt-4 flex flex-wrap items-baseline gap-x-6 gap-y-1"
        style={{ ...FONT.body, fontSize: 14, color: "var(--color-fin-ink-muted)" }}
      >
        <span>
          {BILL.closingLabel}{" "}
          <span style={{ color: "var(--color-fin-ink-soft)" }}>{BILL.closingDate}</span>
        </span>
        <span>
          {BILL.dueLabel}{" "}
          <span style={{ color: "var(--color-fin-ink-soft)" }}>{BILL.dueDate}</span>
        </span>
        <span style={{ color: "var(--color-fin-ink-faint)" }}>{BILL.cardCount}</span>
        <Delta value={BILL.deltaValue} text={BILL.deltaText} />
      </div>
    </section>
  );
}

/* ---------------------------------- divisão ---------------------------------- */

export function SplitPanel() {
  return (
    <section className="mt-10 pt-6" style={{ borderTop: "1px solid var(--color-fin-rule)" }}>
      <div className="mb-6 flex items-center gap-2">
        <span
          className="inline-block h-1.5 w-1.5 rounded-full"
          style={{ backgroundColor: "var(--color-fin-accent)" }}
        />
        <Eyebrow color="var(--color-fin-accent)">divisão</Eyebrow>
      </div>

      <div className="flex flex-wrap items-baseline gap-x-10 gap-y-4">
        <div>
          <MicroLabel>meu</MicroLabel>
          <Headline size={44}>{SPLIT.mine}</Headline>
          <div className="mt-2">
            <Delta value={SPLIT.mineDelta} text={SPLIT.mineDeltaText} />
          </div>
        </div>
        <div>
          <MicroLabel>dela</MicroLabel>
          <Headline size={44} color="var(--color-fin-accent)">
            {SPLIT.theirs}
          </Headline>
          <div className="mt-2">
            <Delta value={SPLIT.theirsDelta} text={SPLIT.theirsDeltaText} />
          </div>
        </div>
      </div>

      <div className="mt-6 grid grid-cols-3 gap-6">
        {SPLIT.columns.map((col) => (
          <SplitColumnCard key={col.label} col={col} />
        ))}
      </div>
    </section>
  );
}

function SplitColumnCard({ col }: { col: SplitColumn }) {
  const accent = col.accent ? "var(--color-fin-accent)" : "var(--color-fin-ink)";
  return (
    <div className="p-6" style={{ border: "1px solid var(--color-fin-rule)" }}>
      <MicroLabel>{col.label}</MicroLabel>
      <div className="mt-1">
        <Headline size={28} color={accent}>
          {col.total}
        </Headline>
      </div>
      <div className="mt-2">
        <Delta value={col.delta} text={col.deltaText} />
      </div>
      <div className="mt-1" style={{ ...FONT.body, fontSize: 10, color: "var(--color-fin-ink-faint)" }}>
        {col.subtitle}
      </div>

      <ul className="mt-4 space-y-2.5">
        {col.categories.map((c) => (
          <li key={c.cat.name} className="flex items-baseline justify-between gap-4">
            <span style={{ ...FONT.body, fontSize: 12, color: "var(--color-fin-ink-soft)" }}>
              {c.cat.name}
            </span>
            <span className="flex shrink-0 items-baseline gap-1.5">
              <Money size={12} color={col.accent ? "var(--color-fin-accent)" : "var(--color-fin-ink-muted)"}>
                {c.total}
              </Money>
              {c.variation && (
                <Money size={10} color="var(--color-fin-ink-faint)">
                  {c.variation}
                </Money>
              )}
            </span>
          </li>
        ))}
      </ul>

      <div className="mt-4 pt-3" style={{ borderTop: "1px solid var(--color-fin-rule)" }}>
        <MicroLabel>parcelas</MicroLabel>
        <ul className="mt-2 space-y-2">
          {col.installments.map((inst) => (
            <li key={inst.description} className="flex items-baseline justify-between gap-3">
              <span
                className="truncate"
                style={{ ...FONT.body, fontSize: 12, color: "var(--color-fin-ink-soft)" }}
              >
                {inst.description}
              </span>
              <span className="flex shrink-0 items-baseline gap-2">
                <Money size={10} color="var(--color-fin-ink-faint)">
                  {inst.parcel}
                </Money>
                <Money size={12} color="var(--color-fin-ink-muted)">
                  {inst.amount}
                </Money>
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

/* -------------------------------- categorias --------------------------------- */

export function CategoryTabs() {
  return (
    <section className="mt-10 pt-6" style={{ borderTop: "1px solid var(--color-fin-rule)" }}>
      <div className="mb-3 flex items-center gap-2">
        <span
          className="inline-block h-1.5 w-1.5 rounded-full"
          style={{ backgroundColor: "var(--color-fin-accent)" }}
        />
        <Eyebrow color="var(--color-fin-accent)">categorias</Eyebrow>
        <Money size={10} color="var(--color-fin-ink-faint)">
          ({BILL_CATEGORIES.length})
        </Money>
      </div>
      <nav className="flex flex-wrap items-baseline gap-x-5 gap-y-2">
        <Tab label="Todas" active />
        {BILL_CATEGORIES.map((c) => (
          <Tab key={c.cat.name} label={c.cat.name} color={c.cat.color} />
        ))}
      </nav>
    </section>
  );
}

function Tab({ label, color, active }: { label: string; color?: string; active?: boolean }) {
  return (
    <span className="flex items-center gap-2 py-1">
      {color && (
        <span
          className="inline-block h-1.5 w-1.5 shrink-0 rounded-full"
          style={{ backgroundColor: color, opacity: active ? 1 : 0.55 }}
        />
      )}
      <span
        style={{
          ...FONT.body,
          fontSize: 13,
          color: active ? "var(--color-fin-ink)" : "var(--color-fin-ink-muted)",
          borderBottom: `1.5px solid ${active ? "var(--color-fin-accent)" : "transparent"}`,
          paddingBottom: 1,
        }}
      >
        {label}
      </span>
    </span>
  );
}

/* ----------------------------------- inbox ----------------------------------- */

export function TransactionInbox({ rows = INBOX_ROWS }: { rows?: Row[] }) {
  return (
    <section className="mt-8">
      <div className="flex items-baseline justify-between pb-2" style={{ borderBottom: "1px solid var(--color-fin-rule)" }}>
        <MicroLabel>lançamentos</MicroLabel>
        <MicroLabel>2 sem categoria</MicroLabel>
      </div>
      <div>
        {rows.map((row, i) => (
          <TransactionRow key={`${row.description}-${i}`} row={row} />
        ))}
      </div>
      <div className="mt-6 pt-4" style={{ borderTop: "1px solid var(--color-fin-rule)" }}>
        <div className="flex items-center gap-2">
          <MicroLabel>ocultas (1)</MicroLabel>
          <span style={{ ...FONT.body, fontSize: 10, color: "var(--color-fin-ink-faint)" }}>
            fora de todo total, reversível
          </span>
        </div>
        <TransactionRow row={HIDDEN_ROW} />
      </div>
    </section>
  );
}

export function TransactionRow({ row }: { row: Row }) {
  return (
    <div
      className="grid items-center gap-4 py-3"
      style={{
        gridTemplateColumns: "24px 56px 1fr auto 24px",
        opacity: row.hidden ? 0.45 : 1,
        backgroundColor: row.selected ? "var(--color-fin-tint)" : "transparent",
      }}
    >
      <span className="flex items-center justify-center">
        <span
          className="inline-block"
          style={{
            width: 14,
            height: 14,
            border: "1px solid var(--color-fin-shadow)",
            backgroundColor: row.selected ? "var(--color-fin-accent)" : "transparent",
          }}
        />
      </span>

      <Money size={12} color="var(--color-fin-ink-muted)" className="uppercase">
        {row.date}
      </Money>

      <div className="min-w-0">
        <div className="flex flex-row items-center gap-3">
          <span
            className="truncate"
            style={{ ...FONT.body, fontSize: 15, color: "var(--color-fin-ink)" }}
          >
            {row.description}
          </span>
          {row.installment && (
            <Money size={10} color="var(--color-fin-ink-faint)">
              {row.installment}
            </Money>
          )}
        </div>
        <div className="mt-1.5 flex items-center gap-2">
          <CategoryTrigger
            label={row.category?.name ?? "sem categoria"}
            color={row.category?.color}
          />
          {row.learned && (
            <span
              className="italic"
              style={{ ...FONT.body, fontSize: 10, color: "var(--color-fin-ink-faint)" }}
            >
              auto
            </span>
          )}
          {row.card && (
            <Money size={10} color="var(--color-fin-ink-faint)">
              {row.card}
            </Money>
          )}
          {row.manual && (
            <span
              className="italic"
              style={{ ...FONT.body, fontSize: 10, color: "var(--color-fin-accent)" }}
            >
              manual
            </span>
          )}
          {row.hidden && (
            <span
              className="italic"
              style={{ ...FONT.body, fontSize: 10, color: "var(--color-fin-ink-faint)" }}
            >
              oculta
            </span>
          )}
          {row.split && (
            <Money size={10} color="var(--color-fin-accent)">
              {row.split === "half" ? "½" : "→dela"}
            </Money>
          )}
        </div>
      </div>

      <Money
        size={15}
        color={row.refund ? "var(--color-fin-positive)" : "var(--color-fin-ink)"}
      >
        {row.refund ? "+" : "−"}
        {row.amount}
      </Money>

      <span
        className="text-center"
        style={{ ...FONT.body, fontSize: 14, color: "var(--color-fin-ink-faint)" }}
      >
        ⋯
      </span>
    </div>
  );
}

/* --------------------------------- composed ---------------------------------- */

export function DashboardScreen({ className }: { className?: string }) {
  return (
    <div className={cx(PAGE, className)}>
      <AccountTabs />
      <BillHeader />
      <SplitPanel />
      <CategoryTabs />
      <TransactionInbox />
    </div>
  );
}

/** Bill header plus the inbox, for feature slots that do not need Divisão. */
export function BillAndInboxScreen() {
  return (
    <div className={PAGE}>
      <BillHeader compact />
      <CategoryTabs />
      <TransactionInbox rows={INBOX_ROWS.slice(0, 6)} />
    </div>
  );
}

/** Just the bill headline, for narrow slots where a full screen would not read. */
export function BillOnlyScreen() {
  return (
    <div className="px-12 py-10">
      <BillHeader compact />
      <div className="mt-8 flex flex-wrap items-baseline gap-x-5 gap-y-2">
        {BILL_CATEGORIES.slice(0, 5).map((c, i) => (
          <Tab key={c.cat.name} label={c.cat.name} color={c.cat.color} active={i === 0} />
        ))}
      </div>
    </div>
  );
}

export function SplitScreen() {
  return (
    <div className={PAGE}>
      <SplitPanel />
    </div>
  );
}

function AccountTabs() {
  return (
    <nav className="mb-10 flex gap-1" style={{ borderBottom: "1px solid var(--color-fin-rule)" }}>
      {[
        { label: "Nubank", active: true },
        { label: "Itaú", active: false },
      ].map((tab) => (
        <span
          key={tab.label}
          className="px-4 py-3 uppercase"
          style={{
            ...FONT.body,
            fontSize: 14,
            fontWeight: 500,
            letterSpacing: "0.1em",
            marginBottom: -1,
            borderBottom: `2px solid ${tab.active ? "var(--color-fin-accent)" : "transparent"}`,
            color: tab.active ? "var(--color-fin-accent)" : "var(--color-fin-ink-muted)",
          }}
        >
          {tab.label}
        </span>
      ))}
    </nav>
  );
}

export { Rule };
