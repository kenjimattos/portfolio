// Fictional data for the recreated Finance screens. Shapes mirror the real API
// responses (bill headline, cash-flow days, reconciliation report); merchants,
// amounts and people are invented.

export type Category = { name: string; color: string };

// The auto-assigned palette from services/categoryColors.ts, in order.
export const CATEGORIES = {
  mercado: { name: "Mercado", color: "#C2410C" },
  restaurantes: { name: "Restaurantes", color: "#4D7C0F" },
  transporte: { name: "Transporte", color: "#0F766E" },
  assinaturas: { name: "Assinaturas", color: "#7C3AED" },
  casa: { name: "Casa", color: "#B45309" },
  saude: { name: "Saúde", color: "#BE123C" },
  lazer: { name: "Lazer", color: "#1D4ED8" },
  compras: { name: "Compras", color: "#047857" },
  viagem: { name: "Viagem", color: "#A16207" },
} satisfies Record<string, Category>;

/* ---------------------------------- bill ----------------------------------- */

export const BILL = {
  title: "Fatura em aberto",
  total: "R$ 4.812,73",
  deltaValue: 386.2,
  deltaText: "R$ 386,20",
  closingLabel: "fecha em",
  closingDate: "07 de setembro",
  dueLabel: "vence em",
  dueDate: "15 de setembro",
  cardCount: "3 cartões",
};

/* -------------------------------- cash flow --------------------------------- */

export type LedgerRow = {
  source?: string;
  sourceColor?: string;
  day?: string;
  today?: boolean;
  description: string;
  debit?: string;
  credit?: string;
  balance?: string;
  past?: boolean;
  bill?: boolean;
  manual?: boolean;
};

export const LEDGER_MONTH = "setembro 2026";
export const LEDGER_END_BALANCE = "R$ 7.412,08";

export const LEDGER_ROWS: LedgerRow[] = [
  { source: "Nubank", sourceColor: "#7C3AED", day: "01 set", description: "SALARIO MENSAL", credit: "R$ 12.400,00", balance: "R$ 14.902,55", past: true },
  { source: "Itaú", sourceColor: "#0F766E", day: "02 set", description: "ALUGUEL", debit: "R$ 3.200,00", balance: "R$ 11.702,55", past: true },
  { source: "Nubank", sourceColor: "#7C3AED", day: "03 set", description: "CONDOMINIO EDIFICIO AURORA", debit: "R$ 780,00", past: true },
  { source: "Nubank", sourceColor: "#7C3AED", day: "", description: "ENERGIA ELETRICA", debit: "R$ 214,60", balance: "R$ 10.707,95", past: true, today: true },
  { day: "08 set", description: "INTERNET FIBRA", debit: "R$ 129,90", balance: "R$ 10.578,05", manual: true },
  { source: "fatura", bill: true, day: "10 set", description: "Fatura Nubank · setembro", debit: "R$ 4.812,73", balance: "R$ 5.765,32" },
  { day: "15 set", description: "ACADEMIA", debit: "R$ 149,90", manual: true },
  { source: "fatura", bill: true, day: "", description: "Fatura Itaú · setembro", debit: "R$ 1.183,44", balance: "R$ 4.431,98" },
  { day: "20 set", description: "FREELA DESIGN", credit: "R$ 3.200,00", balance: "R$ 7.631,98", manual: true },
  { day: "28 set", description: "PLANO DE SAUDE", debit: "R$ 219,90", balance: "R$ 7.412,08", manual: true },
];

/* ------------------------------ reconciliation ------------------------------ */

// The closed August bill of one card, as the issuer printed it, against what
// the app computed for the same window. Shapes mirror ReconcileResult in
// services/reconcileFatura.ts: matched, amountMismatches, missingInApp,
// onlyInApp. Amounts are invented; the arithmetic is consistent
// (5.198,63 − 356,40 faltando + 318,40 só no app = 5.160,63).

export type ReconcileRow = {
  date: string;
  description: string;
  amount: string;
  card?: string;
  installment?: string;
  /** cent drift: what the app has today → what the statement prints */
  from?: string;
  source?: string;
  checked?: boolean;
};

export const RECONCILE = {
  bill: "fatura de agosto · Nubank ····5241",
  statementTotal: "R$ 5.198,63",
  appTotal: "R$ 5.160,63",
  delta: "R$ 38,00",
  matched: "46 linhas conferem",
  missing: [
    { date: "19/08", description: "POSTO SHELL", amount: "R$ 260,00", card: "·5241", checked: true },
    { date: "24/08", description: "FARMACIA SAO JOAO", amount: "R$ 96,40", card: "·5241", checked: true },
  ] satisfies ReconcileRow[],
  drift: [
    {
      date: "20/08",
      description: "APPLE STORE",
      installment: "5/12",
      from: "R$ 291,58",
      amount: "R$ 291,60",
      source: "manual",
    },
    {
      date: "23/08",
      description: "MAGAZINE LUIZA",
      installment: "6/8",
      from: "R$ 187,45",
      amount: "R$ 187,43",
      source: "pluggy",
    },
  ] satisfies ReconcileRow[],
  onlyInApp: [
    { date: "06/09", description: "LEROY MERLIN", amount: "R$ 318,40", source: "manual" },
  ] satisfies ReconcileRow[],
};
