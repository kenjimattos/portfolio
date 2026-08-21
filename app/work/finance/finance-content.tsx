"use client";

import { ReactNode } from "react";
import {
  CaseContact,
  CaseDesignLanguage,
  CaseEm,
  CaseEvidence,
  CaseFeature,
  CaseFeatures,
  CaseHero,
  CaseLayout,
  CaseResults,
  CaseShowcase,
  CaseStory,
  SectionEyebrow,
} from "@/components/case-study/case-layout";
import { SYNC_OUTCOMES } from "@/components/finance-demo/data";
import {
  ArchitectureMap,
  DocsShelf,
  IdentityDiagram,
  SlugPipeline,
  StateMachineTable,
  SymptomStrip,
  TestTable,
  type ArchNode,
  type DocCard,
  type PayloadSnapshot,
  type SlugStep,
  type TestFile,
} from "@/components/finance-demo/exhibits";
import { fraunces } from "@/components/finance-demo/fonts";
import { FinanceScreen } from "@/components/finance-demo/finance-frame";
import { CashFlowScreen } from "@/components/finance-demo/screens/cashflow";
import {
  BillAndInboxScreen,
  BillOnlyScreen,
  DashboardScreen,
  SplitScreen,
} from "@/components/finance-demo/screens/dashboard";
import { FaturaImportScreen } from "@/components/finance-demo/screens/fatura-import";
import { useLocale } from "@/lib/i18n";

const ACCENT = "#C2410C";
const ACCENT_INK = "#7C2D12";
const ACCENT_TINT = "#F6EFE7";

const PAD_X = "clamp(24px, 8vw, 180px)";
const PAD_SECTION = "clamp(60px, 10vw, 120px)";

/** Local section wrapper matching CaseLayout's own padding and scroll animation. */
function CaseSection({
  eyebrow,
  tinted,
  children,
}: {
  eyebrow: string;
  tinted?: boolean;
  children: ReactNode;
}) {
  return (
    <section
      className="animate-section w-full"
      style={{
        padding: `${PAD_SECTION} ${PAD_X}`,
        opacity: 0,
        backgroundColor: tinted ? "var(--case-tint)" : undefined,
      }}
    >
      <SectionEyebrow label={eyebrow} />
      {children}
    </section>
  );
}

function SectionHeadline({ children }: { children: ReactNode }) {
  return (
    <h2
      className="text-foreground font-bold line-clamp-none"
      style={{ fontSize: "clamp(26px, 3.2vw, 44px)", maxWidth: "900px" }}
    >
      {children}
    </h2>
  );
}

function Body({ children, wide }: { children: ReactNode; wide?: boolean }) {
  return (
    <p
      className="text-foreground leading-relaxed"
      style={{ fontSize: "clamp(15px, 1.4vw, 18px)", opacity: 0.7, maxWidth: wide ? "820px" : "700px" }}
    >
      {children}
    </p>
  );
}

function StepLabel({ children }: { children: ReactNode }) {
  return (
    <span
      className="font-mono uppercase tracking-widest block mb-2"
      style={{ fontSize: "clamp(10px, 0.9vw, 12px)", color: ACCENT_INK }}
    >
      {children}
    </span>
  );
}

function Screen({ children, path }: { children: ReactNode; path?: string }) {
  return <FinanceScreen path={path}>{children}</FinanceScreen>;
}

/* ----------------------------------- copy ------------------------------------ */

type Copy = {
  chips: string[];
  headline: ReactNode;
  subtitle: string;
  roleTags: string[];
  links: { label: string; href: string; hint: string }[];
  showcase: { label: string; note: string; caption: string };
  results: { items: { value: string; label: string }[]; statement: string; footnote: string };
  story: {
    eyebrow: string;
    headline: string;
    text: string;
    mediaCaption: string;
    personas: { label: string; title: string; text: string }[];
    cards: { number: string; title: string; text: string }[];
  };
  diagnosis: {
    eyebrow: string;
    headline: string;
    symptomLabel: string;
    symptomText: string;
    snapshots: PayloadSnapshot[];
    snapshotCaption: string;
    investigationLabel: string;
    investigationText: string;
    causeLabel: string;
    causeText: string;
    decisionLabel: string;
    decisionText: string;
    rejectedLabel: string;
    rejectedText: string;
    identity: {
      keyLabel: string;
      keyValue: string;
      keyNote: string;
      hashLabel: string;
      hashParts: string[];
      excludedLabel: string;
      excludedNote: string;
      attachedLabel: string;
      attached: string[];
    };
    machineLabel: string;
    machineHeaders: [string, string, string];
    resolvedLabel: string;
    resolvedText: string;
  };
  features: { eyebrow: string; intro: string; items: { title: string; text: string; secondary?: ReactNode }[] };
  tests: {
    eyebrow: string;
    headline: string;
    text: string;
    secondary: string;
    headers: [string, string, string];
    files: TestFile[];
  };
  docs: { eyebrow: string; headline: string; text: string; ruleLabel: string; items: DocCard[] };
  design: {
    intro: string;
    description: string;
    charset: string[];
    charsetCaption: string;
    paletteMeta: { category: string; name: string }[];
    statusLabel: string;
    statusPills: string[];
  };
  architecture: { eyebrow: string; text: string; nodes: ArchNode[] };
  slug: { steps: SlugStep[]; note: string };
  contact: { heading: string; text: string };
};

const COPY: Record<"en" | "pt", Copy> = {
  en: {
    chips: ["Personal finance · Open Finance", "Solo, from design to production", "132 tests · v1.9.2"],
    headline: (
      <>
        Finance: the credit-card bill that is still open, which no bank shows you,{" "}
        <CaseEm>rebuilt from a provider feed that kept changing under it</CaseEm>.
      </>
    ),
    subtitle:
      "A self-hosted spending manager for two people sharing three cards. It answers what the open bill costs today, who owes whom, and where the checking account lands on the 30th. I designed it, built it and operate it, and the part I defend hardest is not the product, it is the day transactions started changing value on their own.",
    roleTags: ["Product Design", "Front-end", "Back-end", "Data modeling", "Testing", "Deployment"],
    links: [
      {
        label: "Live demo",
        href: "https://finance-demo.up.railway.app/",
        hint: "log in with demo / demo, synthetic data, resets periodically",
      },
      {
        label: "Source on GitHub",
        href: "https://github.com/kenjimattos/finance",
        hint: "monorepo, docs/ and the test suite are public",
      },
    ],
    showcase: {
      label: "Recreation of the shipped app",
      note: "Rebuilt in React for this case study · fictional data",
      caption:
        "The Dashboard: open-bill headline, the split panel, the categories present in this cycle and the inbox where categorization happens.",
    },
    results: {
      items: [
        {
          value: "132",
          label:
            "tests across 8 files hold the business rules, and the suite finishes in about 0.4 second because the rules are pure functions",
        },
        {
          value: "6",
          label:
            "outcomes in the sync state machine decide whether a payload updates a row, mints a new one, or is suppressed and logged",
        },
        {
          value: "45",
          label:
            "days is the cutoff where a repost stops being a repost and becomes the provider re-dating a stale record into the open bill",
        },
        {
          value: "0",
          label:
            "uses of INSERT OR REPLACE on cache tables, because it deletes before it inserts and the delete cascades through every table holding user work",
        },
      ],
      statement:
        "The app has run on real cards since April 2026, and the diagnosis is what makes that possible. Transaction identity is local, so re-syncs, reconnections and recycled provider IDs no longer take a category, a split or a bill shift with them. What the provider does upstream stopped being something I have to watch.",
      footnote:
        "Figures read from the repository. Every screen on this page is a React recreation with fictional data; the live demo runs on a synthetic dataset.",
    },
    story: {
      eyebrow: "The bill you cannot see",
      headline: "Banks show what already closed. The bill you are living in is the one nobody renders.",
      text: "My partner and I share three cards on one account. The questions we actually had were how much the current cycle already costs, which of those purchases are hers, and whether the checking account survives the 15th once both bills land. The bank app answers none of them: it shows closed statements and a live balance, and the aggregator behind Open Finance does not return open bills at all. So the product is the workflow around the transactions, not the transactions themselves.",
      mediaCaption: "The open-bill headline: what the current cycle costs today, and against the previous one.",
      personas: [
        {
          label: "Who uses it",
          title: "Two people, three cards, one bill",
          text: "Each person categorizes with their own categories, marks a purchase as half-and-half or as hers, and reads the same bill from both sides. The split totals are what settle the month between us.",
        },
        {
          label: "Who operates it",
          title: "Me, on my own hardware",
          text: "There is no signup. A user is an environment variable and gets an isolated SQLite file, opened on first request and migrated automatically. That decision is what makes running it for two people cheap and running it for two thousand a different project.",
        },
      ],
      cards: [
        {
          number: "01",
          title: "Compute the bill window, do not fetch it",
          text: "The provider only returns closed bills, so the open window is reconstructed from each card's closing and due day, with one offset function that also walks backwards through history. I rejected the alternative of waiting for the bill to close, which is exactly the moment the number stops being useful.",
        },
        {
          number: "02",
          title: "The provider ID is an attribute, never the key",
          text: "Rows are keyed by a UUID minted here. I rejected keying on the provider ID, which is the obvious design and the one that silently corrupted data, because that ID is recycled across unrelated purchases.",
        },
        {
          number: "03",
          title: "User work lives in join tables",
          text: "Categories, splits, shifts and description overrides reference the local UUID from separate tables, so a full re-sync cannot wipe them. I rejected columns on the transaction row, which would tie every manual decision to the lifetime of a cached record.",
        },
        {
          number: "04",
          title: "Only categorized rows sum",
          text: "The absence of a category is the exclusion mechanism, so a fresh card starts at zero and grows as it is reviewed, and provider noise stays out by being left alone. I rejected an explicit ignore flag on everything, which is a second thing to maintain for the same effect.",
        },
      ],
    },
    diagnosis: {
      eyebrow: "Diagnosis",
      headline:
        "Transactions were changing value without explanation. I traced it to a provider that recycles transaction IDs.",
      symptomLabel: "Symptom",
      symptomText:
        "A bill total I had already reviewed moved between two syncs. Then a row I had categorized as Restaurantes and split with my partner appeared as a supermarket purchase for a different amount, carrying that category and that split with it. Nothing in the app had written to those rows.",
      snapshots: [
        {
          when: "sync, 12 aug",
          providerId: "provider_id 8f21c0…",
          description: "PADARIA ALVORADA",
          amount: "R$ 32,80",
          note: "Categorized as Restaurantes, marked half-and-half.",
        },
        {
          when: "sync, 14 aug",
          providerId: "provider_id 8f21c0…",
          description: "SUPERMERCADO ZONA SUL",
          amount: "R$ 412,90",
          note: "Same ID, unrelated purchase. The category and the split came along.",
          drifted: true,
        },
        {
          when: "sync, 15 aug",
          providerId: "provider_id 8f21c0…",
          description: "SUPERMERCADO ZONA SUL",
          amount: "R$ 386,90",
          note: "The amount moved again. The bill no longer reconciled against the statement.",
          drifted: true,
        },
      ],
      snapshotCaption:
        "One provider ID, three different purchases across four days. The payloads are the shape of the ones kept as fixtures in the test suite.",
      investigationLabel: "Investigation",
      investigationText:
        "I keep the full provider payload in raw_json on every row precisely so a question like this is answerable after the fact. I dumped the cache and diffed payloads across syncs, and found three separate behaviors, not one bug. One connector re-mints a new ID for the same purchase on every daily scrape. The provider reuses an old ID for an unrelated purchase. And in one case it half-rewrote a record in place, leaving the raw description and the amount matching the stored row while the display description named another merchant.",
      causeLabel: "Root cause",
      causeText:
        "The provider transaction ID is not an identity. It is a handle the provider is free to reissue, reuse and rewrite, and I had built the schema on the assumption that it was stable. Every corruption I saw followed from that one assumption.",
      decisionLabel: "Modeling decision",
      decisionText:
        "Identity became local. Every row is keyed by a UUID minted here, and the provider ID demoted to an ordinary column. Duplicates are detected by a SHA-256 of the date, the amount and the merchant slug, deliberately excluding the account ID so identity survives a reconnection that re-issues the whole history under new account and transaction IDs. On top of that, the engine picks one of six explicit outcomes per payload instead of upserting and hoping.",
      rejectedLabel: "What I rejected",
      rejectedText:
        "Keeping the provider ID as the primary key and reconciling with an upsert, which is what caused the corruption in the first place and would have hidden it again. And wiping the cache on every sync, which is correct on the provider data and destroys every categorization, split and shift the two of us had entered.",
      identity: {
        keyLabel: "Primary key",
        keyValue: "transactions.id = randomUUID()",
        keyNote:
          "Minted here, stable forever, and the only thing every table holding user work points at. The provider ID sits beside it as provider_transaction_id, and manual rows have none at all.",
        hashLabel: "Identity hash",
        hashParts: ["date", "amount", "merchant_slug"],
        excludedLabel: "account_id",
        excludedNote:
          "Excluded on purpose. A reconnection issues new account IDs for the same cards, so including it would make every reconnected purchase look new and duplicate five months of history.",
        attachedLabel: "Attached to the local UUID",
        attached: ["transaction_categories", "transaction_splits", "transaction_bill_overrides", "transaction_description_overrides", "bill_payment_tags"],
      },
      machineLabel: "The six outcomes",
      machineHeaders: ["Condition", "What the engine does", "Effect"],
      resolvedLabel: "Resolved",
      resolvedText:
        "The corrupted payloads from the incident are fixtures in syncCreditTransactions.test.ts, so the 19 tests there fail if any branch regresses. Anomalies are written to transaction_sync_conflicts as recycled or mutation-suppressed rather than resolved silently, and a row minted from a recycled ID is held out of automatic categorization so a person looks at it before it counts toward anything.",
    },
    features: {
      eyebrow: "Inside the product",
      intro:
        "Every screen below is recreated in React from the shipped app, same layout, same type, same burnt orange, with fictional purchases and people.",
      items: [
        {
          title: "The open bill, computed here",
          text: "The headline is the current cycle: total, variation against the previous one, closing and due dates, and arrows that walk the same window function backwards through history. When a merchant posts a purchase days late and it lands in the wrong cycle, the row menu shifts it by one bill in either direction.",
          secondary:
            "The shift is additive and capped at one cycle, so the same button that pushes a row forward is the one that restores it, and every shift offers an undo. The previous-cycle delta deliberately ignores shifts: the comparison is already approximate and chasing them across two cycles buys nothing.",
        },
        {
          title: "Categorization that learns from one correction",
          text: "Categorizing one purchase writes a rule keyed on a merchant slug, and the next sync applies it to every matching row. The slug is where the judgment lives: it has to collapse thousands of iFood restaurants into one merchant while keeping Uber trips and Uber Eats apart.",
          secondary:
            "A learned assignment never overwrites a manual one, enforced twice, by the query that only selects uncategorized rows and by an INSERT OR IGNORE behind it. Both layers are locked by tests, because a re-sync that reverted a manual correction would end the trust in the whole loop.",
        },
        {
          title: "Who owes what, per category and per installment",
          text: "A purchase is marked half-and-half or hers, and the bill totals both sides with a category breakdown and the installments still running. That is the section we actually read at the end of the month.",
        },
        {
          title: "A checking account that projects forward",
          text: "Past days come from real bank transactions, future days from recurring manual entries plus the credit-card bills about to be paid, with one running balance across the boundary. The balance is grounded on a user-confirmed anchor rather than the provider's live balance field, which oscillates.",
          secondary:
            "At each settled year end the anchor is rolled forward through that year's transactions and frozen, so the opening balance never depends on transactions the provider has since aged out. I rejected re-reading the live balance for that, since it is the unreliable number this mechanism exists to route around.",
        },
        {
          title: "Importing a bill from screenshots",
          text: "When the provider misses rows, the user photographs the issuer's app and a vision model reads the statement into structured rows: date, description, amount, card, installment. Everything comes back as a reviewable table before a single row is written.",
          secondary:
            "The model call is isolated behind one function so the parsing, the sign convention and the installment normalization stay pure and carry 18 tests with no network. Rows the issuer does not really bill, like the provider's own reconciliation entries, come back unchecked.",
        },
      ],
    },
    tests: {
      eyebrow: "What I test",
      headline: "The tests sit on the business rules, not on the components.",
      text: "A component test would tell me a row rendered. It would not tell me that a purchase made on the 6th belongs to the bill closing on the 7th, that a reconnection is not five months of duplicates, or that a learned rule left a manual correction alone. Those are the failures that cost money and trust, so those are the ones under test.",
      secondary:
        "The rules are pure functions on purpose, so the suite needs no database, no network and no browser. It runs with node --test and tsx, 132 tests across 8 files, finishing in about 0.4 second, which is what makes running it on every change a habit rather than a decision.",
      headers: ["File", "Tests", "What it locks"],
      files: [
        {
          file: "billWindow.test.ts",
          count: "35",
          locks: "closing and due day into a bill window at any offset, and the reverse lookup from a target month back to the offset that produces it",
        },
        {
          file: "merchantSlug.test.ts",
          count: "20",
          locks: "the normalization that keeps UBER TRIP and UBER EATS apart while collapsing every iFood restaurant into one merchant",
        },
        {
          file: "syncCreditTransactions.test.ts",
          count: "19",
          locks: "the six sync outcomes, with the corrupted payloads from the incident preserved as fixtures",
        },
        {
          file: "extractFatura.test.ts",
          count: "18",
          locks: "parsing, sign convention and installment normalization of the model output, with the network call left outside the pure function",
        },
        {
          file: "applyLearnedRules.test.ts",
          count: "14",
          locks: "the invariant that a learned rule never overwrites a manual categorization, at both layers that enforce it",
        },
        {
          file: "reconcileFatura.test.ts",
          count: "13",
          locks: "the tiered matching that pairs statement lines against app rows and separates a cent difference from a missing purchase",
        },
        {
          file: "yearEndAnchors.test.ts",
          count: "8",
          locks: "the year-end balance roll-forward, its settle buffer and its idempotency against an existing anchor",
        },
        {
          file: "pruneManualEntries.test.ts",
          count: "5",
          locks: "which projections real bank data has made obsolete, and the boundary month that is deliberately spared",
        },
      ],
    },
    docs: {
      eyebrow: "docs/ as a decision record",
      headline: "Three files exist because I got each of them wrong once.",
      text: "docs/ is not user documentation. It is where a decision and its reason are written down so I do not re-derive them six months later, and every rule in it is the residue of a bug. I write the entry when the fix lands, while the reason is still expensive knowledge.",
      ruleLabel: "The rule it carries",
      items: [
        {
          file: "docs/sync.md",
          title: "Identity, the bill engine and the learning loop",
          text: "The six sync outcomes in prose, the reconstruction of the open bill window from closing and due day, how a bill shift moves a row between neighboring cycles, and why only categorized rows sum.",
          rule: "All date math on yyyy-mm-dd strings in UTC. Local Date arithmetic breaks around daylight saving and quietly moves purchases between bills.",
        },
        {
          file: "docs/schema.md",
          title: "Five domains, deliberately not merged",
          text: "Which tables exist, why the credit cache, the bank cache, the configuration, the user work and the projections stay separate, and how append-only column migrations run on open.",
          rule: "INSERT OR REPLACE is banned on cache tables. It deletes before it inserts, and the delete cascades through every table holding user work.",
        },
        {
          file: "docs/pluggy.md",
          title: "Where the provider documentation was wrong",
          text: "A catalog of places the official docs disagreed with the data for these connectors: method names, pagination, sign conventions, an open-bill entity that does not exist, card numbers arriving in three shapes.",
          rule: "Key on the transaction type, never on the sign of the amount. The sign convention changes per connector; the type does not.",
        },
      ],
    },
    design: {
      intro:
        "The interface is built to be read like a printed financial page rather than a dashboard: warm paper, one burnt orange, no card shadows and no rounded corners. Numbers are the content, so type does most of the work.",
      description:
        "Fraunces carries every headline and every total, at 96px for the open bill, because a bill is a single number and the page should say so. JetBrains Mono carries currency and dates with tabular figures, so columns align down the ledger, and Inter is restricted to small metadata. Three typefaces, three jobs, no overlap.",
      charset: ["R$ 0123456789", "ABCDEFGHIJKLM", "abcdefghijklm"],
      charsetCaption: "Fraunces, the display serif",
      paletteMeta: [
        { category: "Surface", name: "Paper" },
        { category: "Ink", name: "Warm near-black" },
        { category: "Accent", name: "Burnt orange" },
        { category: "Semantic", name: "Olive" },
      ],
      statusLabel: "Delta convention: never a red number",
      statusPills: ["▲ ACIMA", "▼ ABAIXO", "SEM VARIAÇÃO"],
    },
    architecture: {
      eyebrow: "Architecture",
      text: "An npm-workspaces monorepo, TypeScript from the SQL boundary to the last component. The API is Express with Zod-validated configuration that fails fast on a missing variable; the web app is a React SPA. Persistence is one SQLite file per user, opened on the first request of a session and migrated on open, which makes user isolation a filesystem boundary instead of a WHERE clause I have to remember on every query.",
      nodes: [
        {
          name: "packages/api",
          role: "REST API, provider sync, SQLite cache",
          items: ["Express and Zod", "better-sqlite3", "pluggy-sdk", "Anthropic SDK for the vision import"],
        },
        {
          name: "packages/web",
          role: "SPA: Login, CashFlow, Overview, Dashboard",
          items: ["React and Vite", "Tailwind v4", "TanStack Query", "Motion, used sparingly"],
        },
        {
          name: "one file per user",
          role: "Isolation as a filesystem boundary",
          items: ["opened on first request", "migrated automatically on open", "injected into routes as req.db"],
        },
        {
          name: "Railway",
          role: "Production, demo and a preview per pull request",
          items: ["demo environment seeds five months of synthetic data", "each pull request clones it", "persistent volume for the databases"],
        },
      ],
    },
    slug: {
      steps: [
        { step: "Strip the processor prefix", input: "PAG*UBER *TRIP BR", output: "UBER *TRIP BR" },
        { step: "Qualifier after the star is kept when it means something", input: "UBER *TRIP BR", output: "UBER TRIP" },
        { step: "Short noise after the star is discarded", input: "IFOOD *RESTAURANTE A", output: "IFOOD RESTAURANTE" },
      ],
      note: "I rejected a regex per merchant, which does not survive the first unseen name, and the provider's own category field, which is coarse and does not know that this supermarket is Casa when the purchase is a drill.",
    },
    contact: {
      heading: "Want to walk through the sync engine?",
      text: "The state machine, why the hash excludes the account ID, and what the tests would catch if I broke it: happy to go through any of it line by line.",
    },
  },

  pt: {
    chips: ["Finanças pessoais · Open Finance", "Solo, do design à produção", "132 testes · v1.9.2"],
    headline: (
      <>
        Finance: a fatura em aberto, que banco nenhum mostra,{" "}
        <CaseEm>reconstruída a partir de um feed que mudava embaixo dela</CaseEm>.
      </>
    ),
    subtitle:
      "Um gestor de gastos self-hosted para duas pessoas que dividem três cartões. Ele responde quanto a fatura em aberto já custa hoje, quem deve o quê, e onde a conta corrente chega no dia 30. Eu desenhei, construí e opero, e a parte que defendo com mais convicção não é o produto, é o dia em que as transações começaram a mudar de valor sozinhas.",
    roleTags: ["Product Design", "Front-end", "Back-end", "Modelagem de dados", "Testes", "Deploy"],
    links: [
      {
        label: "Demo ao vivo",
        href: "https://finance-demo.up.railway.app/",
        hint: "entre com demo / demo, dados sintéticos, reseta periodicamente",
      },
      {
        label: "Código no GitHub",
        href: "https://github.com/kenjimattos/finance",
        hint: "monorepo, docs/ e a suíte de testes são públicos",
      },
    ],
    showcase: {
      label: "Recriação do app publicado",
      note: "Refeito em React para este case · dados fictícios",
      caption:
        "O Dashboard: manchete da fatura em aberto, o painel de divisão, as categorias presentes neste ciclo e o inbox onde a categorização acontece.",
    },
    results: {
      items: [
        {
          value: "132",
          label:
            "testes em 8 arquivos seguram a regra de negócio, e a suíte termina em cerca de 0,4 segundo porque as regras são funções puras",
        },
        {
          value: "6",
          label:
            "desfechos na máquina de estados do sync decidem se um payload atualiza uma linha, cunha outra, ou é suprimido e registrado",
        },
        {
          value: "45",
          label:
            "dias é o corte em que uma repostagem deixa de ser repostagem e vira o provedor redatando um registro velho para dentro da fatura aberta",
        },
        {
          value: "0",
          label:
            "usos de INSERT OR REPLACE nas tabelas de cache, porque ele apaga antes de inserir e o delete cascateia por toda tabela que guarda trabalho do usuário",
        },
      ],
      statement:
        "O app roda sobre cartões reais desde abril de 2026, e é o diagnóstico que torna isso possível. A identidade da transação é local, então ressincronizações, reconexões e IDs reciclados não levam mais junto uma categoria, uma divisão ou um shift de fatura. O que o provedor faz lá em cima deixou de ser algo que eu preciso vigiar.",
      footnote:
        "Números lidos do repositório. Todas as telas desta página são recriações em React com dados fictícios; a demo ao vivo roda sobre uma base sintética.",
    },
    story: {
      eyebrow: "A fatura que você não vê",
      headline: "Banco mostra o que já fechou. A fatura em que você está vivendo é a que ninguém desenha.",
      text: "Eu e minha companheira dividimos três cartões em uma conta. As perguntas que a gente realmente tinha eram quanto o ciclo atual já custa, quais daquelas compras são dela, e se a conta corrente sobrevive ao dia 15 quando as duas faturas caírem. O app do banco não responde nenhuma delas: mostra fatura fechada e saldo do momento, e o agregador de Open Finance simplesmente não devolve fatura em aberto. Então o produto é o fluxo em volta das transações, não as transações.",
      mediaCaption: "A manchete da fatura em aberto: quanto o ciclo atual custa hoje, e contra o anterior.",
      personas: [
        {
          label: "Quem usa",
          title: "Duas pessoas, três cartões, uma fatura",
          text: "Cada um categoriza com as próprias categorias, marca uma compra como meio a meio ou como dela, e lê a mesma fatura pelos dois lados. Os totais da divisão são o que acerta o mês entre nós.",
        },
        {
          label: "Quem opera",
          title: "Eu, no meu próprio servidor",
          text: "Não existe cadastro. Um usuário é uma variável de ambiente e recebe um arquivo SQLite isolado, aberto na primeira requisição e migrado automaticamente. Essa decisão é o que torna barato rodar isso para duas pessoas, e torna rodar para duas mil um outro projeto.",
        },
      ],
      cards: [
        {
          number: "01",
          title: "Calcular a janela da fatura, não buscá-la",
          text: "O provedor só devolve fatura fechada, então a janela aberta é reconstruída a partir do dia de fechamento e de vencimento de cada cartão, com uma função de offset que também caminha para trás no histórico. Rejeitei a alternativa de esperar a fatura fechar, que é exatamente quando o número deixa de servir.",
        },
        {
          number: "02",
          title: "O ID do provedor é atributo, nunca chave",
          text: "As linhas são chaveadas por um UUID cunhado aqui. Rejeitei chavear pelo ID do provedor, que é o desenho óbvio e é o que corrompeu dados em silêncio, porque esse ID é reciclado entre compras sem relação nenhuma.",
        },
        {
          number: "03",
          title: "Trabalho do usuário mora em tabelas de junção",
          text: "Categorias, divisões, shifts e overrides de descrição referenciam o UUID local a partir de tabelas separadas, então uma ressincronização completa não consegue apagá-los. Rejeitei colunas na própria linha da transação, que amarrariam toda decisão manual ao tempo de vida de um registro de cache.",
        },
        {
          number: "04",
          title: "Só linha categorizada soma",
          text: "A ausência de categoria é o mecanismo de exclusão, então um cartão novo começa em zero e cresce conforme é revisado, e o ruído do provedor fica de fora só por ser deixado em paz. Rejeitei uma flag de ignorar em tudo, que é mais uma coisa para manter pelo mesmo efeito.",
        },
      ],
    },
    diagnosis: {
      eyebrow: "Diagnóstico",
      headline:
        "Transações mudavam de valor sem explicação. Investiguei e cheguei a um provedor que recicla IDs de transação.",
      symptomLabel: "Sintoma",
      symptomText:
        "Um total de fatura que eu já tinha revisado mudou entre duas sincronizações. Depois, uma linha que eu havia categorizado como Restaurantes e dividido com a minha companheira apareceu como compra de supermercado, com outro valor, carregando aquela categoria e aquela divisão junto. Nada no app tinha escrito naquelas linhas.",
      snapshots: [
        {
          when: "sync, 12 ago",
          providerId: "provider_id 8f21c0…",
          description: "PADARIA ALVORADA",
          amount: "R$ 32,80",
          note: "Categorizada como Restaurantes, marcada meio a meio.",
        },
        {
          when: "sync, 14 ago",
          providerId: "provider_id 8f21c0…",
          description: "SUPERMERCADO ZONA SUL",
          amount: "R$ 412,90",
          note: "Mesmo ID, compra sem relação. A categoria e a divisão vieram junto.",
          drifted: true,
        },
        {
          when: "sync, 15 ago",
          providerId: "provider_id 8f21c0…",
          description: "SUPERMERCADO ZONA SUL",
          amount: "R$ 386,90",
          note: "O valor mudou de novo. A fatura parou de bater com o extrato.",
          drifted: true,
        },
      ],
      snapshotCaption:
        "Um ID do provedor, três compras diferentes em quatro dias. Os payloads têm a forma dos que ficaram guardados como fixtures na suíte de testes.",
      investigationLabel: "Investigação",
      investigationText:
        "Eu guardo o payload completo do provedor em raw_json em cada linha justamente para que uma pergunta dessas tenha resposta depois. Despejei o cache, comparei os payloads entre sincronizações e encontrei três comportamentos distintos, não um bug. Um conector recunha um ID novo para a mesma compra a cada varredura diária. O provedor reaproveita um ID antigo para uma compra sem relação. E, em um caso, reescreveu um registro pela metade: a descrição bruta e o valor continuavam batendo com a linha guardada, enquanto a descrição exibida nomeava outro estabelecimento.",
      causeLabel: "Causa raiz",
      causeText:
        "O ID de transação do provedor não é identidade. É um identificador que ele pode reemitir, reaproveitar e reescrever, e eu tinha construído o schema supondo que fosse estável. Toda corrupção que vi decorre dessa única suposição.",
      decisionLabel: "Decisão de modelagem",
      decisionText:
        "A identidade passou a ser local. Cada linha é chaveada por um UUID cunhado aqui, e o ID do provedor foi rebaixado a coluna comum. Duplicatas são detectadas por um SHA-256 da data, do valor e do slug do estabelecimento, excluindo de propósito o ID da conta, para que a identidade sobreviva a uma reconexão que reemite o histórico inteiro sob novos IDs de conta e de transação. Sobre isso, o motor escolhe um entre seis desfechos explícitos por payload, em vez de dar upsert e torcer.",
      rejectedLabel: "O que eu rejeitei",
      rejectedText:
        "Manter o ID do provedor como chave primária e reconciliar com upsert, que foi o que causou a corrupção e a esconderia de novo. E limpar o cache a cada sincronização, que é correto do lado do provedor e destrói toda categorização, divisão e shift que nós dois tínhamos lançado.",
      identity: {
        keyLabel: "Chave primária",
        keyValue: "transactions.id = randomUUID()",
        keyNote:
          "Cunhado aqui, estável para sempre, e a única coisa para a qual toda tabela de trabalho do usuário aponta. O ID do provedor fica ao lado, em provider_transaction_id, e linhas manuais não têm nenhum.",
        hashLabel: "Hash de identidade",
        hashParts: ["date", "amount", "merchant_slug"],
        excludedLabel: "account_id",
        excludedNote:
          "Excluído de propósito. Uma reconexão emite IDs de conta novos para os mesmos cartões, então incluí-lo faria toda compra reconectada parecer nova e duplicaria cinco meses de histórico.",
        attachedLabel: "Preso ao UUID local",
        attached: ["transaction_categories", "transaction_splits", "transaction_bill_overrides", "transaction_description_overrides", "bill_payment_tags"],
      },
      machineLabel: "Os seis desfechos",
      machineHeaders: ["Condição", "O que o motor faz", "Efeito"],
      resolvedLabel: "Resolvido",
      resolvedText:
        "Os payloads corrompidos do incidente viraram fixtures em syncCreditTransactions.test.ts, então os 19 testes de lá quebram se qualquer ramo regredir. Anomalias são gravadas em transaction_sync_conflicts como recycled ou mutation-suppressed em vez de resolvidas em silêncio, e uma linha cunhada a partir de ID reciclado fica fora da categorização automática até uma pessoa olhar para ela.",
    },
    features: {
      eyebrow: "Por dentro do produto",
      intro:
        "Todas as telas abaixo são recriadas em React a partir do app publicado, mesmo layout, mesma tipografia, mesmo laranja queimado, com compras e pessoas fictícias.",
      items: [
        {
          title: "A fatura em aberto, calculada aqui",
          text: "A manchete é o ciclo atual: total, variação contra o anterior, datas de fechamento e vencimento, e setas que caminham pela mesma função de janela para trás no histórico. Quando um estabelecimento lança a compra dias depois e ela cai no ciclo errado, o menu da linha desloca em uma fatura para qualquer lado.",
          secondary:
            "O deslocamento é aditivo e limitado a um ciclo, então o mesmo botão que empurra a linha para frente é o que a restaura, e todo shift oferece desfazer. O delta contra o ciclo anterior ignora shifts de propósito: a comparação já é aproximada e perseguir deslocamentos por dois ciclos não compra nada.",
        },
        {
          title: "Categorização que aprende com uma correção",
          text: "Categorizar uma compra grava uma regra chaveada por um slug de estabelecimento, e a próxima sincronização aplica a regra em toda linha correspondente. O slug é onde mora o julgamento: ele precisa colapsar milhares de restaurantes do iFood em um só estabelecimento e ainda manter corrida de Uber separada de Uber Eats.",
          secondary:
            "Uma atribuição aprendida nunca sobrescreve uma manual, o que é garantido duas vezes, pela query que só seleciona linhas sem categoria e por um INSERT OR IGNORE atrás dela. As duas camadas estão travadas por teste, porque uma ressincronização que revertesse uma correção manual acabaria com a confiança no ciclo inteiro.",
        },
        {
          title: "Quem deve o quê, por categoria e por parcela",
          text: "Uma compra é marcada como meio a meio ou como dela, e a fatura totaliza os dois lados, com quebra por categoria e as parcelas ainda correndo. É essa a seção que a gente de fato lê no fim do mês.",
        },
        {
          title: "Uma conta corrente que projeta para frente",
          text: "Os dias passados vêm de transações bancárias reais, os futuros vêm de lançamentos manuais recorrentes mais as faturas de cartão prestes a serem pagas, com um saldo corrente único atravessando a fronteira. O saldo é ancorado em um valor confirmado pelo usuário, e não no campo de saldo ao vivo do provedor, que oscila.",
          secondary:
            "A cada virada de ano já assentada, a âncora é rolada para frente pelas transações daquele ano e congelada, então o saldo inicial nunca depende de transações que o provedor já expirou. Rejeitei reler o saldo ao vivo para isso, já que ele é justamente o número não confiável que esse mecanismo existe para contornar.",
        },
        {
          title: "Importar fatura por screenshot",
          text: "Quando o provedor perde linhas, o usuário fotografa o app do emissor e um modelo com visão lê o extrato em linhas estruturadas: data, descrição, valor, cartão, parcela. Tudo volta como uma tabela de revisão antes de qualquer linha ser gravada.",
          secondary:
            "A chamada ao modelo fica isolada atrás de uma função, então o parsing, a convenção de sinal e a normalização de parcelas seguem puros e carregam 18 testes sem rede. Linhas que o emissor não cobra de fato, como os registros internos de conciliação do provedor, voltam desmarcadas.",
        },
      ],
    },
    tests: {
      eyebrow: "O que eu testo",
      headline: "Os testes ficam sobre a regra de negócio, não sobre o componente.",
      text: "Um teste de componente me diria que uma linha renderizou. Não me diria que uma compra feita no dia 6 pertence à fatura que fecha no dia 7, que uma reconexão não é cinco meses de duplicatas, ou que uma regra aprendida deixou uma correção manual em paz. Essas são as falhas que custam dinheiro e confiança, então são essas que estão sob teste.",
      secondary:
        "As regras são funções puras de propósito, então a suíte não precisa de banco, de rede nem de navegador. Ela roda com node --test e tsx, 132 testes em 8 arquivos, terminando em cerca de 0,4 segundo, que é o que faz rodar a cada mudança virar hábito em vez de decisão.",
      headers: ["Arquivo", "Testes", "O que ele trava"],
      files: [
        {
          file: "billWindow.test.ts",
          count: "35",
          locks: "dia de fechamento e vencimento virando janela de fatura em qualquer offset, e a busca inversa de um mês alvo até o offset que o produz",
        },
        {
          file: "merchantSlug.test.ts",
          count: "20",
          locks: "a normalização que mantém UBER TRIP e UBER EATS separados enquanto colapsa todo restaurante do iFood em um estabelecimento",
        },
        {
          file: "syncCreditTransactions.test.ts",
          count: "19",
          locks: "os seis desfechos do sync, com os payloads corrompidos do incidente preservados como fixtures",
        },
        {
          file: "extractFatura.test.ts",
          count: "18",
          locks: "parsing, convenção de sinal e normalização de parcelas da saída do modelo, com a chamada de rede fora da função pura",
        },
        {
          file: "applyLearnedRules.test.ts",
          count: "14",
          locks: "o invariante de que uma regra aprendida nunca sobrescreve categorização manual, nas duas camadas que garantem isso",
        },
        {
          file: "reconcileFatura.test.ts",
          count: "13",
          locks: "o pareamento em camadas entre linhas do extrato e linhas do app, separando diferença de centavos de compra ausente",
        },
        {
          file: "yearEndAnchors.test.ts",
          count: "8",
          locks: "o roll-forward do saldo na virada do ano, seu período de assentamento e sua idempotência diante de uma âncora existente",
        },
        {
          file: "pruneManualEntries.test.ts",
          count: "5",
          locks: "quais projeções o dado bancário real tornou obsoletas, e o mês de fronteira que é poupado de propósito",
        },
      ],
    },
    docs: {
      eyebrow: "docs/ como registro de decisão",
      headline: "Três arquivos existem porque eu errei cada um deles uma vez.",
      text: "docs/ não é documentação de usuário. É onde uma decisão e o motivo dela ficam escritos para eu não redescobrir os dois seis meses depois, e cada regra ali é resíduo de um bug. Escrevo a entrada quando a correção entra, enquanto o motivo ainda é conhecimento caro.",
      ruleLabel: "A regra que ele carrega",
      items: [
        {
          file: "docs/sync.md",
          title: "Identidade, motor de fatura e ciclo de aprendizado",
          text: "Os seis desfechos do sync em prosa, a reconstrução da janela da fatura aberta a partir do fechamento e do vencimento, como um shift move uma linha entre ciclos vizinhos, e por que só linha categorizada soma.",
          rule: "Toda aritmética de data sobre strings yyyy-mm-dd em UTC. Aritmética de Date local quebra no horário de verão e move compras de fatura em silêncio.",
        },
        {
          file: "docs/schema.md",
          title: "Cinco domínios, deliberadamente não fundidos",
          text: "Quais tabelas existem, por que cache de crédito, cache bancário, configuração, trabalho do usuário e projeções ficam separados, e como as migrações de coluna, sempre aditivas, rodam na abertura do arquivo.",
          rule: "INSERT OR REPLACE é proibido nas tabelas de cache. Ele apaga antes de inserir, e o delete cascateia por toda tabela que guarda trabalho do usuário.",
        },
        {
          file: "docs/pluggy.md",
          title: "Onde a documentação do provedor estava errada",
          text: "Um catálogo dos pontos em que a documentação oficial discordava do dado nestes conectores: nomes de método, paginação, convenção de sinal, uma entidade de fatura aberta que não existe, número de cartão chegando em três formatos.",
          rule: "Decida pelo tipo da transação, nunca pelo sinal do valor. A convenção de sinal muda por conector; o tipo não.",
        },
      ],
    },
    design: {
      intro:
        "A interface foi construída para ser lida como página impressa de caderno de economia, não como dashboard: papel quente, um laranja queimado, sem sombra de card e sem canto arredondado. Os números são o conteúdo, então a tipografia faz a maior parte do trabalho.",
      description:
        "A Fraunces carrega toda manchete e todo total, a 96px na fatura em aberto, porque uma fatura é um número só e a página deveria dizer isso. A JetBrains Mono carrega moeda e datas com figuras tabulares, para as colunas alinharem descendo o livro-caixa, e a Inter fica restrita a metadado pequeno. Três fontes, três funções, sem sobreposição.",
      charset: ["R$ 0123456789", "ABCDEFGHIJKLM", "abcdefghijklm"],
      charsetCaption: "Fraunces, a serifada de display",
      paletteMeta: [
        { category: "Superfície", name: "Papel" },
        { category: "Tinta", name: "Quase preto quente" },
        { category: "Acento", name: "Laranja queimado" },
        { category: "Semântica", name: "Oliva" },
      ],
      statusLabel: "Convenção de variação: nunca um número vermelho",
      statusPills: ["▲ ACIMA", "▼ ABAIXO", "SEM VARIAÇÃO"],
    },
    architecture: {
      eyebrow: "Arquitetura",
      text: "Um monorepo com npm workspaces, TypeScript da fronteira do SQL até o último componente. A API é Express com configuração validada por Zod que falha na largada se faltar variável; a web é uma SPA em React. A persistência é um arquivo SQLite por usuário, aberto na primeira requisição da sessão e migrado na abertura, o que transforma isolamento de usuário em fronteira de sistema de arquivos em vez de um WHERE que eu preciso lembrar em toda query.",
      nodes: [
        {
          name: "packages/api",
          role: "API REST, sync do provedor, cache SQLite",
          items: ["Express e Zod", "better-sqlite3", "pluggy-sdk", "SDK da Anthropic para a importação com visão"],
        },
        {
          name: "packages/web",
          role: "SPA: Login, CashFlow, Overview, Dashboard",
          items: ["React e Vite", "Tailwind v4", "TanStack Query", "Motion, com parcimônia"],
        },
        {
          name: "um arquivo por usuário",
          role: "Isolamento como fronteira de sistema de arquivos",
          items: ["aberto na primeira requisição", "migrado automaticamente na abertura", "injetado nas rotas como req.db"],
        },
        {
          name: "Railway",
          role: "Produção, demo e um preview por pull request",
          items: ["o ambiente de demo semeia cinco meses de dados sintéticos", "cada pull request clona esse ambiente", "volume persistente para os bancos"],
        },
      ],
    },
    slug: {
      steps: [
        { step: "Remove o prefixo do adquirente", input: "PAG*UBER *TRIP BR", output: "UBER *TRIP BR" },
        { step: "Qualificador depois do asterisco é mantido quando significa algo", input: "UBER *TRIP BR", output: "UBER TRIP" },
        { step: "Ruído curto depois do asterisco é descartado", input: "IFOOD *RESTAURANTE A", output: "IFOOD RESTAURANTE" },
      ],
      note: "Rejeitei um regex por estabelecimento, que não sobrevive ao primeiro nome inédito, e a categoria do próprio provedor, que é grossa e não sabe que este supermercado é Casa quando a compra é uma furadeira.",
    },
    contact: {
      heading: "Quer percorrer o motor de sincronização?",
      text: "A máquina de estados, por que o hash exclui o ID da conta, e o que os testes pegariam se eu quebrasse: fico feliz em passar linha por linha.",
    },
  },
};

/* --------------------------------- component --------------------------------- */

export function FinanceContent() {
  const locale = useLocale();
  const t = COPY[locale];

  const featureMedia: ReactNode[] = [
    <Screen key="bill" path="/dashboard">
      <BillAndInboxScreen />
    </Screen>,
    <SlugPipeline key="slug" steps={t.slug.steps} note={t.slug.note} />,
    <Screen key="split" path="/dashboard">
      <SplitScreen />
    </Screen>,
    <Screen key="cashflow" path="/">
      <CashFlowScreen />
    </Screen>,
    <Screen key="import" path="/dashboard">
      <FaturaImportScreen />
    </Screen>,
  ];

  const features: CaseFeature[] = t.features.items.map((item, i) => ({
    number: `0${i + 1}`,
    title: item.title,
    text: item.text,
    secondaryText: item.secondary,
    media: featureMedia[i],
  }));

  const d = t.diagnosis;

  return (
    <CaseLayout
      accent={ACCENT}
      accentInk={ACCENT_INK}
      accentTint={ACCENT_TINT}
      nextProject={{ href: "/work/houston", label: "Houston" }}
    >
      <CaseHero
        chips={t.chips}
        headline={t.headline}
        subtitle={t.subtitle}
        roleTags={t.roleTags}
        links={t.links}
      >
        <CaseShowcase label={t.showcase.label} note={t.showcase.note} caption={t.showcase.caption}>
          <Screen path="/dashboard">
            <DashboardScreen />
          </Screen>
        </CaseShowcase>
      </CaseHero>

      <CaseResults
        items={t.results.items}
        statement={t.results.statement}
        footnote={t.results.footnote}
      />

      <CaseStory
        eyebrow={t.story.eyebrow}
        headline={t.story.headline}
        text={t.story.text}
        media={
          <FinanceScreen path="/dashboard" designWidth={640} marginRule={false}>
            <BillOnlyScreen />
          </FinanceScreen>
        }
        imageCaption={t.story.mediaCaption}
        personas={t.story.personas}
        cards={t.story.cards}
      />

      {/* The diagnosis: symptom, investigation, root cause, decision, resolved. */}
      <CaseSection eyebrow={d.eyebrow}>
        <SectionHeadline>{d.headline}</SectionHeadline>

        <div className="mt-10 flex flex-col gap-6">
          <div>
            <StepLabel>{d.symptomLabel}</StepLabel>
            <Body wide>{d.symptomText}</Body>
          </div>
          <SymptomStrip caption={d.snapshotCaption} snapshots={d.snapshots} />
        </div>

        <div className="mt-14 grid gap-10" style={{ gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 320px), 1fr))" }}>
          <div>
            <StepLabel>{d.investigationLabel}</StepLabel>
            <Body>{d.investigationText}</Body>
          </div>
          <div>
            <StepLabel>{d.causeLabel}</StepLabel>
            <Body>{d.causeText}</Body>
          </div>
        </div>

        <div className="mt-14">
          <StepLabel>{d.decisionLabel}</StepLabel>
          <Body wide>{d.decisionText}</Body>
          <div className="mt-8">
            <IdentityDiagram {...d.identity} />
          </div>
          <div className="mt-8">
            <StepLabel>{d.rejectedLabel}</StepLabel>
            <Body wide>{d.rejectedText}</Body>
          </div>
        </div>

        <div className="mt-16">
          <StepLabel>{d.machineLabel}</StepLabel>
          <StateMachineTable outcomes={SYNC_OUTCOMES} locale={locale} headers={d.machineHeaders} />
        </div>

        <div className="mt-14">
          <StepLabel>{d.resolvedLabel}</StepLabel>
          <Body wide>{d.resolvedText}</Body>
        </div>
      </CaseSection>

      <CaseFeatures eyebrow={t.features.eyebrow} intro={t.features.intro} features={features} />

      <CaseSection eyebrow={t.tests.eyebrow} tinted>
        <SectionHeadline>{t.tests.headline}</SectionHeadline>
        <div className="mt-8 flex flex-col gap-5">
          <Body wide>{t.tests.text}</Body>
          <Body wide>{t.tests.secondary}</Body>
        </div>
        <div className="mt-12">
          <TestTable files={t.tests.files} headers={t.tests.headers} />
        </div>
      </CaseSection>

      <CaseSection eyebrow={t.docs.eyebrow}>
        <SectionHeadline>{t.docs.headline}</SectionHeadline>
        <div className="mt-8 mb-12">
          <Body wide>{t.docs.text}</Body>
        </div>
        <DocsShelf docs={t.docs.items} ruleLabel={t.docs.ruleLabel} />
      </CaseSection>

      <CaseDesignLanguage
        intro={t.design.intro}
        fontClassName={fraunces.variable}
        fontFamily="var(--font-fraunces), Times New Roman, serif"
        typefaceName="Fraunces"
        weights={[
          { label: "Regular", weight: 400 },
          { label: "SemiBold", weight: 600 },
          { label: "Black", weight: 900 },
        ]}
        description={t.design.description}
        charset={t.design.charset}
        charsetCaption={t.design.charsetCaption}
        palette={[
          {
            ...t.design.paletteMeta[0],
            hex: "#FBF8F4",
            rgb: "(251, 248, 244)",
            bg: "#FBF8F4",
            fg: "#1A1614",
            border: "#E4DDCF",
          },
          {
            ...t.design.paletteMeta[1],
            hex: "#1A1614",
            rgb: "(26, 22, 20)",
            bg: "#1A1614",
            fg: "#FBF8F4",
          },
          {
            ...t.design.paletteMeta[2],
            hex: "#C2410C",
            rgb: "(194, 65, 12)",
            bg: "#C2410C",
            fg: "#FBF8F4",
          },
          {
            ...t.design.paletteMeta[3],
            hex: "#4D7C0F",
            rgb: "(77, 124, 15)",
            bg: "#4D7C0F",
            fg: "#FBF8F4",
          },
        ]}
        statusPills={{
          label: t.design.statusLabel,
          pills: [
            { label: t.design.statusPills[0], cls: "bg-[#F6EFE7] text-[#C2410C] border-[#C2410C]/40" },
            { label: t.design.statusPills[1], cls: "bg-[#F6EFE7] text-[#4D7C0F] border-[#4D7C0F]/40" },
            { label: t.design.statusPills[2], cls: "bg-[#F6EFE7] text-[#6A615A] border-[#D9D0BD]" },
          ],
        }}
      />

      <CaseEvidence
        eyebrow={t.architecture.eyebrow}
        text={t.architecture.text}
        stack={[
          "TypeScript",
          "npm workspaces",
          "Express",
          "Zod",
          "SQLite · better-sqlite3",
          "React",
          "Vite",
          "Tailwind v4",
          "TanStack Query",
          "pluggy-sdk",
          "Anthropic SDK",
          "node --test",
          "Railway",
        ]}
      >
        <ArchitectureMap nodes={t.architecture.nodes} />
      </CaseEvidence>

      <CaseContact heading={t.contact.heading} text={t.contact.text} email="kenjimattos@gmail.com" />
    </CaseLayout>
  );
}
