// Fictional data for the recreated Finance screens. Shapes mirror the real
// API responses (bill breakdown, transaction rows, cash-flow days, extracted
// fatura rows); merchants, amounts and people are invented.

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

export const BILL_CATEGORIES: Array<{ cat: Category; total: string; variation: string | null }> = [
  { cat: CATEGORIES.mercado, total: "R$ 1.284,40", variation: "+R$ 96" },
  { cat: CATEGORIES.restaurantes, total: "R$ 842,15", variation: "−R$ 41" },
  { cat: CATEGORIES.compras, total: "R$ 731,08", variation: "+R$ 210" },
  { cat: CATEGORIES.transporte, total: "R$ 512,60", variation: null },
  { cat: CATEGORIES.casa, total: "R$ 402,35", variation: "+R$ 187" },
  { cat: CATEGORIES.viagem, total: "R$ 421,30", variation: "novo" },
  { cat: CATEGORIES.assinaturas, total: "R$ 127,60", variation: null },
  { cat: CATEGORIES.saude, total: "R$ 118,90", variation: "−R$ 22" },
  { cat: CATEGORIES.lazer, total: "R$ 96,00", variation: "+R$ 54" },
];

/* ------------------------------- transactions ------------------------------- */

export type Row = {
  date: string;
  description: string;
  amount: string;
  category?: Category;
  /** rendered as the small italic "auto" hint next to a learned assignment */
  learned?: boolean;
  card?: string;
  installment?: string;
  split?: "half" | "theirs";
  manual?: boolean;
  hidden?: boolean;
  refund?: boolean;
  selected?: boolean;
};

export const INBOX_ROWS: Row[] = [
  {
    date: "03 set",
    description: "RESTAURANTE NOVO SABOR",
    amount: "R$ 87,50",
    card: "····5241",
  },
  {
    date: "03 set",
    description: "PET SHOP AMIGO FIEL",
    amount: "R$ 134,20",
    card: "····5241",
  },
  {
    date: "02 set",
    description: "SUPERMERCADO ZONA SUL",
    amount: "R$ 386,90",
    category: CATEGORIES.mercado,
    learned: true,
    card: "····5241",
    split: "half",
  },
  {
    date: "02 set",
    description: "IFOOD *IFD",
    amount: "R$ 64,30",
    category: CATEGORIES.restaurantes,
    learned: true,
    card: "····5241",
  },
  {
    date: "01 set",
    description: "APPLE STORE",
    amount: "R$ 291,58",
    category: CATEGORIES.compras,
    learned: true,
    card: "····5241",
    installment: "5/12",
  },
  {
    date: "01 set",
    description: "GOL LINHAS AEREAS",
    amount: "R$ 421,30",
    category: CATEGORIES.viagem,
    card: "····5241",
    installment: "3/6",
    split: "half",
  },
  {
    date: "31 ago",
    description: "SEPHORA",
    amount: "R$ 189,00",
    category: CATEGORIES.compras,
    learned: true,
    card: "····0193",
    split: "theirs",
  },
  {
    date: "30 ago",
    description: "UBER *TRIP",
    amount: "R$ 27,40",
    category: CATEGORIES.transporte,
    learned: true,
    card: "····5241",
  },
  {
    date: "29 ago",
    description: "ESTORNO LOJAS RENNER",
    amount: "R$ 118,00",
    category: CATEGORIES.compras,
    card: "····0193",
    refund: true,
  },
  {
    date: "28 ago",
    description: "PADARIA ALVORADA",
    amount: "R$ 32,80",
    category: CATEGORIES.restaurantes,
    learned: true,
    card: "····5241",
  },
];

export const HIDDEN_ROW: Row = {
  date: "27 ago",
  description: "MERCADOLIVRE*MERCADOLIVRE",
  amount: "R$ 214,90",
  card: "····8830",
  hidden: true,
};

/* ---------------------------------- split ----------------------------------- */

export type SplitColumn = {
  label: string;
  total: string;
  delta: number;
  deltaText: string;
  subtitle: string;
  accent?: boolean;
  categories: Array<{ cat: Category; total: string; variation: string | null }>;
  installments: Array<{ description: string; parcel: string; amount: string }>;
};

export const SPLIT: {
  mine: string;
  mineDelta: number;
  mineDeltaText: string;
  theirs: string;
  theirsDelta: number;
  theirsDeltaText: string;
  count: string;
  columns: SplitColumn[];
} = {
  mine: "R$ 3.118,41",
  mineDelta: 214.9,
  mineDeltaText: "R$ 214,90",
  theirs: "R$ 1.694,32",
  theirsDelta: 171.3,
  theirsDeltaText: "R$ 171,30",
  count: "18 transações divididas",
  columns: [
    {
      label: "½ meio a meio",
      total: "R$ 1.402,85",
      delta: 96.4,
      deltaText: "R$ 96,40",
      subtitle: "11 transações · ela deve R$ 701,42",
      categories: [
        { cat: CATEGORIES.mercado, total: "R$ 684,20", variation: "+R$ 96" },
        { cat: CATEGORIES.viagem, total: "R$ 421,30", variation: "novo" },
        { cat: CATEGORIES.restaurantes, total: "R$ 210,45", variation: "−R$ 18" },
        { cat: CATEGORIES.casa, total: "R$ 86,90", variation: null },
      ],
      installments: [
        { description: "GOL LINHAS AEREAS", parcel: "3/6", amount: "R$ 421,30" },
        { description: "MAGAZINE LUIZA", parcel: "6/8", amount: "R$ 187,45" },
      ],
    },
    {
      label: "dela",
      total: "R$ 993,11",
      delta: 122.6,
      deltaText: "R$ 122,60",
      subtitle: "7 transações · cartão ····0193",
      accent: true,
      categories: [
        { cat: CATEGORIES.compras, total: "R$ 742,11", variation: "+R$ 148" },
        { cat: CATEGORIES.saude, total: "R$ 138,00", variation: null },
        { cat: CATEGORIES.lazer, total: "R$ 113,00", variation: "novo" },
      ],
      installments: [{ description: "TOK STOK", parcel: "9/10", amount: "R$ 214,90" }],
    },
    {
      label: "meu",
      total: "R$ 2.416,77",
      delta: -68.3,
      deltaText: "R$ 68,30",
      subtitle: "41 transações",
      categories: [
        { cat: CATEGORIES.mercado, total: "R$ 600,20", variation: "−R$ 30" },
        { cat: CATEGORIES.restaurantes, total: "R$ 631,70", variation: "−R$ 23" },
        { cat: CATEGORIES.transporte, total: "R$ 512,60", variation: null },
        { cat: CATEGORIES.compras, total: "R$ 380,69", variation: "+R$ 62" },
      ],
      installments: [
        { description: "APPLE STORE", parcel: "5/12", amount: "R$ 291,58" },
        { description: "DECATHLON", parcel: "3/3", amount: "R$ 156,63" },
      ],
    },
  ],
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

/* ----------------------------- fatura screenshot ---------------------------- */

export type ExtractedRow = {
  date: string;
  description: string;
  amount: string;
  card: string;
  installment?: string;
  refund?: boolean;
  excluded?: boolean;
  shift?: string;
};

export const EXTRACTED_ROWS: ExtractedRow[] = [
  { date: "18 ago", description: "SUPERMERCADO ZONA SUL", amount: "R$ 412,90", card: "····5241" },
  { date: "19 ago", description: "POSTO SHELL", amount: "R$ 260,00", card: "····5241" },
  { date: "20 ago", description: "APPLE STORE", amount: "R$ 291,58", card: "····5241", installment: "5/12" },
  { date: "21 ago", description: "ESTORNO DROGARIA PACHECO", amount: "R$ 74,20", card: "····5241", refund: true },
  { date: "06 set", description: "LEROY MERLIN", amount: "R$ 318,40", card: "····5241", shift: "+1" },
  { date: "22 ago", description: "PAGAMENTO RECEBIDO", amount: "R$ 4.402,11", card: "·", excluded: true },
];

/* ------------------------- the Pluggy identity engine ----------------------- */

export type SyncOutcome = {
  n: string;
  condition: { en: string; pt: string };
  action: { en: string; pt: string };
  tone: "keep" | "mutate" | "mint" | "suppress";
};

export const SYNC_OUTCOMES: SyncOutcome[] = [
  {
    n: "01",
    condition: {
      en: "Provider ID known, identity hash matches a sibling row",
      pt: "ID do provedor conhecido, hash de identidade bate com uma linha irmã",
    },
    action: {
      en: "Update status, bill and raw payload only. Category, split and overrides stay attached.",
      pt: "Atualiza só status, fatura e payload bruto. Categoria, divisão e overrides seguem presos à linha.",
    },
    tone: "keep",
  },
  {
    n: "02",
    condition: {
      en: "Provider ID known, chimera payload (raw description and amount match, display name is another merchant)",
      pt: "ID do provedor conhecido, payload quimera (descrição bruta e valor batem, o nome exibido é de outro estabelecimento)",
    },
    action: {
      en: "Suppress the mutation, keep the row untouched, log it once as mutation-suppressed.",
      pt: "Suprime a mutação, mantém a linha intacta, registra uma vez como mutation-suppressed.",
    },
    tone: "suppress",
  },
  {
    n: "03",
    condition: {
      en: "Provider ID known, same amount and slug, date moved by 45 days or less",
      pt: "ID do provedor conhecido, mesmo valor e mesmo slug, data movida em até 45 dias",
    },
    action: {
      en: "Repost: PENDING became POSTED. Move the date in place and recompute the bill shift.",
      pt: "Repostagem: PENDING virou POSTED. Move a data no lugar e recalcula o shift de fatura.",
    },
    tone: "mutate",
  },
  {
    n: "04",
    condition: {
      en: "Provider ID known, materially different content",
      pt: "ID do provedor conhecido, conteúdo materialmente diferente",
    },
    action: {
      en: "Recycled ID: keep the old row with its user work, mint a new UUID, write an audit row, hold the new row out of auto-categorization.",
      pt: "ID reciclado: mantém a linha antiga com o trabalho do usuário, cunha um UUID novo, grava auditoria e deixa a nova fora da categorização automática.",
    },
    tone: "mint",
  },
  {
    n: "05",
    condition: {
      en: "Provider ID unknown, hash matches a row with the same full timestamp",
      pt: "ID do provedor desconhecido, hash bate com linha de timestamp idêntico",
    },
    action: {
      en: "Re-served purchase after a reconnection: adopt the new provider ID on the existing row.",
      pt: "Compra reentregue após reconexão: adota o novo ID do provedor na linha existente.",
    },
    tone: "mutate",
  },
  {
    n: "06",
    condition: {
      en: "Provider ID unknown, no hash match",
      pt: "ID do provedor desconhecido, nenhum hash correspondente",
    },
    action: { en: "Genuinely new purchase: insert with a fresh local UUID.", pt: "Compra realmente nova: insere com um UUID local novo." },
    tone: "keep",
  },
];
