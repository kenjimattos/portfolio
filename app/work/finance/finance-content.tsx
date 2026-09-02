"use client";

/* Finance — o quarto case no editorial de problema.
 *
 * A fronteira de atribuição é o que muda tudo aqui: não existe cliente nem
 * fundador, o problema é dele. Por isso o case não reivindica escala,
 * reivindica decisão, e a prova é pública (repo, testes, docs).
 *
 * A tese: os apps de banco mostram a fatura e os agregadores mostram a
 * despesa, mas quase nenhum liga as duas na data certa, porque arquivam a
 * compra de cartão pela data da transação. O dinheiro sai um mês depois, e o
 * fluxo de caixa nunca fecha.
 *
 * Cada decisão carrega a sua prova: as recriações do CashFlow, do saldo, da
 * conciliação, e o diagrama de identidade com a tira de sintomas.
 */

import { CSSProperties, ReactNode } from "react";
import {
  CaseCTA,
  CaseConstraints,
  CaseDecision,
  CaseDecisions,
  CaseEvidence,
  CaseFrontier,
  CaseHero,
  CaseIndex,
  CaseOutcome,
  CaseProof,
  CaseSection,
  CaseShell,
  type EvidenceItem,
  type Tension,
} from "@/components/case-study/case-editorial";
import {
  FinDsFoundation,
  FinDsSignature,
} from "@/components/finance-demo/design-system-exhibit";
import {
  IdentityDiagram,
  SymptomStrip,
  type PayloadSnapshot,
} from "@/components/finance-demo/exhibits";
import { FinanceScreen } from "@/components/finance-demo/finance-frame";
import { BalanceWalkScreen, CashFlowScreen } from "@/components/finance-demo/screens/cashflow";
import { ConciliacaoScreen } from "@/components/finance-demo/screens/conciliacao";
import { useLocale } from "@/lib/i18n";

/* Os exhibits do case nasceram sobre as variáveis do CaseLayout antigo. O
   editorial não as define, então a paleta do Finance entra aqui, uma vez. */
const EXHIBIT_VARS = {
  "--case-accent": "#C2410C",
  "--case-ink": "#7C2D12",
  "--case-tint": "#F6EFE7",
} as CSSProperties;

function Exhibit({ children }: { children: ReactNode }) {
  return <div style={EXHIBIT_VARS}>{children}</div>;
}

function Screen({ children, path }: { children: ReactNode; path?: string }) {
  return <FinanceScreen path={path}>{children}</FinanceScreen>;
}

/* ----------------------------------- copy ----------------------------------- */

type Panel = { label: string; chose: string; why?: string; authorship?: "own" | "assisted" };

type Decision = {
  id: string;
  tension: Tension;
  context?: string;
  design: Panel;
  code: Panel;
  cost: string;
  proofCaption: string;
};

type Copy = {
  kicker: [string, string];
  headline: string;
  turn: string;
  sub: string;
  coverAlt: string;
  shotTag: string;
  note: { cue: string; before: string; circled: string; after: string; href: string };
  role: { label: string; text: string; note: string };
  indexLabel: string;
  constraints: { label: string; text: string }[];
  decisionsHeading: string;
  decisionsNote: string;
  railLabel: string;
  costLabel: string;
  decisions: Decision[];
  ds: { typeRoles: [string, string, string]; foundation: string; signature: string };
  snapshots: PayloadSnapshot[];
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
  frontier: { label: string; text: string };
  outcome: {
    heading: string;
    measures: { value: string; label: string; mark?: boolean }[];
    gaps: { label: string; items: string[] };
  };
  evidence: { heading: string; items: EvidenceItem[] };
  cta: { label: string; heading: string; invite: string; action: string };
  next: string;
};

const ATTACHED = [
  "transaction_categories",
  "transaction_splits",
  "transaction_bill_overrides",
  "transaction_description_overrides",
  "bill_payment_tags",
];

const COPY: Record<"en" | "pt", Copy> = {
  en: {
    kicker: [
      "Finance · 2026 · self-hosted credit-card spending manager",
      "TypeScript · React · Express · SQLite · Open Finance (Pluggy) · Claude",
    ],
    headline:
      "Your bank app shows you the bill. None of them tell you whether the money will be in the account on the day it's due.",
    turn: "This one opens on that answer.",
    sub: "A spending manager for two people and three cards, where a card purchase enters the cash flow on the day the bill is paid, not the day it was made. The total agrees with the statement that arrives by email, and the balance agrees with the bank.",
    coverAlt: "The Finance app on a laptop",
    shotTag: "Screens recreated in React · fictional purchases and people",
    note: {
      cue: "Scroll",
      before: "The purchase is from May. The money leaves on",
      circled: "June 10",
      after: ".",
      href: "#d01",
    },
    role: {
      label: "My role",
      text: "Product, design, frontend, backend, database and operation: a personal project running on real cards since April 2026. The diagnosis of the recycled IDs, the local identity model and the schema decisions are mine, written down before any code. The code that executes them I built pairing with Claude: I specified the rule, reviewed what came back, and locked each one in a test. The 132 tests and the docs/ folder exist because I don't trust either half of that pair without proof.",
      note: "There is no client here and no founder. The problem is mine and my partner's, three cards on one account, and I'm the one who decided it deserved a product. That changes what this case can claim: nothing here is scope handed to me, so it doesn't claim size, it claims decisions. The code, the tests and the decision records are public, and that's what it should be judged on.",
    },
    indexLabel: "Decisions in this case",
    constraints: [
      {
        label: "Context",
        text: "Two people, three cards, one account. Bank apps show the bill, and money apps show the expense, but almost none of them connect the two on the right date: a card purchase is filed under the day it was made. May's spending lands in May, the money leaves in June, and the cash flow never reconciles. Meanwhile the statement says one number, the app says another, and the categories and installments get lost between them.",
      },
      {
        label: "Constraint",
        text: "One person, no deadline and no users beyond the two of us, on top of an Open Finance provider that does not return open bills, whose live balance field oscillates, and whose documentation disagrees with what its own data returns.",
      },
    ],
    decisionsHeading: "Decisions",
    decisionsNote: "Four of them, and only what has proof attached.",
    railLabel: "Jump to a decision",
    costLabel: "Cost",
    decisions: [
      {
        id: "d01",
        tension: { a: "The purchase date", b: "the date the money leaves" },
        context:
          "The question we actually ask isn't how much I spent, it's whether the account survives the month. And that only has an answer if a card expense shows up on the day the money leaves, not the day the purchase was made. That distance is a whole month: a purchase on May 20th, on a card closing on the 30th, is paid on June 10th. An app that files it under May describes the spending correctly and gets the cash wrong, which is the only thing the person needed to know.",
        design: {
          label: "Design",
          chose:
            "The cash flow is the app's landing screen, and a card expense enters it once, on the due date, for the full bill.",
          why: "That is how money actually leaves the account. Scattering the purchase across the days it was made is a description of consumption, not a projection of cash.",
        },
        code: {
          label: "Code",
          chose:
            "The same bill-window function that builds the bill screen builds the projection: past days are real bank transactions, future days are recurring entries plus the bills about to fall due, with one running balance crossing the boundary. A bill is only projected while its due date is still ahead of the last realized day; past that, the real bank outflow pays it, tagged as a bill payment.",
          why: "Two sources for the same disbursement is a double count, and that is exactly where these apps go wrong.",
          authorship: "assisted",
        },
        proofCaption:
          "The ledger, recreated: past days are the bank, future days are recurring entries and the bills about to fall due, and the running balance crosses the boundary without a seam. The bill is one line, on the day it is paid.",
        cost: "The window needs each card's closing and due day, and the provider returns neither. Somebody types them in once, and a wrong closing day quietly moves a purchase into the wrong month.",
      },
      {
        id: "d02",
        tension: { a: "The provider's ID", b: "local identity" },
        context:
          "In July 2026, a bill total I had already reviewed moved between two syncs. Then a row I had categorized as Restaurantes and split with my partner showed up as a supermarket purchase, for a different amount, carrying that category and that split with it. Nothing in the app had written to those rows. I keep the provider's full payload in raw_json precisely so a question like this is answerable after the fact: I dumped the cache, diffed payload against payload across syncs, and found three separate behaviors, not one bug. One connector re-mints a new ID for the same purchase on every daily scrape. The provider reuses an old ID for an entirely unrelated purchase. And in one case it half-rewrote a record in place, leaving the raw description and the amount matching the stored row while the display description named a different merchant.",
        design: {
          label: "Design",
          chose:
            "Identity becomes local, and everything a person typed hangs off it: category, split, bill shift and corrected description live in their own tables pointing at the UUID, never on the transaction row.",
          why: "The provider's ID is not an identity, it's a handle it is free to reissue, reuse and rewrite. The cache is its property and can be thrown away at any moment. What the two of us typed cannot.",
        },
        code: {
          label: "Code",
          chose:
            "Every row keyed by a UUID minted here; duplicates detected by a SHA-256 of date, amount and merchant slug, deliberately excluding the account ID. The engine picks one of six explicit outcomes per payload instead of upserting and hoping, and INSERT OR REPLACE is banned on every cache table.",
          why: "A reconnection issues new account and transaction IDs for the same cards, so the account ID in the hash would bring five months of history back as duplicates. And REPLACE deletes before it inserts, cascading through every table holding our work.",
          authorship: "assisted",
        },
        proofCaption:
          "One provider ID across four days, and what it carried: a category and a split that belonged to a bakery, landing on a supermarket. The payloads are the shape of the ones kept as fixtures in the test suite.",
        cost: "Five more tables and one more join on almost every read, and identity is now my code's responsibility instead of the provider's. Every anomaly becomes a row in the inbox waiting for a person, and that person is me: a row minted from a recycled ID is held out of automatic categorization on purpose.",
      },
      {
        id: "d03",
        tension: { a: "The balance the provider returns", b: "a balance somebody confirmed" },
        design: {
          label: "Design",
          chose:
            "The opening balance comes from an anchor a person confirmed on a known date, and everything else is a walk over the transactions from there.",
          why: "The provider's live balance field oscillates. Anchoring on it means building the entire projection on a number that changes on its own, and this is the projection that has to agree with the bank.",
        },
        code: {
          label: "Code",
          chose:
            "A single anchor serves every month, walking forward or backward from it. At each settled year end the anchor is rolled forward through that year's transactions and frozen as a December 31st anchor, derived from the previous one and never read from the live balance, with a buffer until January 15th so late December has posted.",
          why: "Without it, the day the provider ages out old transactions the walk loses its floor and the opening balance changes with nobody having touched anything.",
        },
        proofCaption:
          "The running balance, recreated: one confirmed anchor, a walk over the transactions, and a single boundary between what happened and what is projected.",
        cost: "The roll-forward carries any drift forward unchanged, so re-grounding against a real statement stays a deliberate manual action. I would rather have a number that only moves when a person says so.",
      },
      {
        id: "d04",
        tension: { a: "Trust my number", b: "check it against the statement" },
        context:
          "The open bill is computed here, and the whole cash flow leans on it. While the cycle is open there is nothing to check it against. When it closes, there is: the issuer prints the official version and sends the statement. That is the number my calculation has to answer to, and if it doesn't agree, everything the landing screen promised for the month was fiction.",
        design: {
          label: "Design",
          chose:
            "Reconciliation, not import: the app reads the closed statement and shows the difference against what it computed itself, in four buckets: matched, cent drift, missing in the app, only in the app.",
          why: "I want to find where I was wrong before I have to believe my own total. An importer would have hidden the disagreement by overwriting it.",
        },
        code: {
          label: "Code",
          chose:
            "The PDF text is extracted locally and only the text goes to the model, never the file. Matching is greedy in tiers, strictest first, with the amount as the anchor and date, installment and card breaking ties; a R$ 0,15 tolerance separates installment rounding from a purchase that is genuinely missing.",
          why: "The total that counts is the one printed in the issuer's own summary, not the sum of the lines the extraction managed to read. When those two disagree, the app says the reading failed instead of burying the failure inside the delta.",
          authorship: "assisted",
        },
        proofCaption:
          "The reconciliation, recreated: the total printed by the issuer against the one computed here, and the four buckets that explain the gap. The cent column is installment rounding; the missing column is the only one that costs money.",
        cost: "A scanned PDF has no text to extract and falls back to screenshot import, which sends images to the model and costs more. And every tier in the matcher is a judgment call that only tests keep honest: 13 of them here, 18 on the extraction.",
      },
    ],
    ds: {
      typeRoles: ["headlines & totals", "currency & dates", "metadata"],
      foundation:
        "Three typefaces, three jobs, no overlap: Fraunces on every headline and every total, JetBrains Mono on currency and dates with tabular figures so the ledger's columns align down the page, Inter restricted to small metadata. No card shadows, no rounded corners, and never a red number: variation is an arrow and a word. The page is meant to be read like a printed financial section, not scanned like a dashboard.",
      signature:
        "The signature piece, enlarged: the open bill total at 96px. A bill is one number, and the page should say so.",
    },
    snapshots: [
      {
        when: "sync, 12 jul",
        providerId: "provider_id 8f21c0…",
        description: "PADARIA ALVORADA",
        amount: "R$ 32,80",
        note: "Categorized as Restaurantes, marked half-and-half.",
      },
      {
        when: "sync, 14 jul",
        providerId: "provider_id 8f21c0…",
        description: "SUPERMERCADO ZONA SUL",
        amount: "R$ 412,90",
        note: "Same ID, unrelated purchase. The category and the split came along.",
        drifted: true,
      },
      {
        when: "sync, 15 jul",
        providerId: "provider_id 8f21c0…",
        description: "SUPERMERCADO ZONA SUL",
        amount: "R$ 386,90",
        note: "The amount moved again. The bill no longer agreed with the statement.",
        drifted: true,
      },
    ],
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
      attached: ATTACHED,
    },
    frontier: {
      label: "Where the line sits:",
      text: "the problem is mine, so there is no scope here that somebody else defined. What is not mine is the data: the provider decides what arrives and when, and it changes its mind. The line this case defends is the one between a feed I don't control and three numbers that have to agree with the world outside: the bill against the statement that arrives by email, the balance against the bank's, and the projection against what actually happens on the 30th.",
    },
    outcome: {
      heading: "Result",
      measures: [
        { value: "132", label: "tests on the business rules, 8 files, 0.38 s" },
        { value: "6", label: "explicit outcomes per payload in the sync engine" },
        { value: "apr 2026", label: "running on real cards ever since" },
        { value: "0", label: "uses of INSERT OR REPLACE on cache tables", mark: true },
      ],
      gaps: {
        label: "What wasn't measured, and what's missing",
        items: [
          "Users: there are two of us. This case doesn't claim scale, and making a user an environment variable closes that door on purpose.",
          "I never measured how much time it saves us in a month. What I claim is the decision and the test that holds it.",
          "The hosted demo runs on synthetic data and every screen on this page is a recreation. The real cards never appear anywhere.",
        ],
      },
    },
    evidence: {
      heading: "Evidence",
      items: [
        {
          kind: "link",
          label: "Live demo, log in with demo / demo",
          href: "https://finance-demo.up.railway.app/",
          note: "synthetic data, resets periodically",
        },
        {
          kind: "link",
          label: "Source on GitHub",
          href: "https://github.com/kenjimattos/finance",
          note: "monorepo, docs/ and the test suite are public",
        },
        {
          kind: "fact",
          label: "132 tests across 8 files, with the corrupted payloads from the incident kept as fixtures",
          note: "run with node --test, no database and no network",
        },
        {
          kind: "fact",
          label: "docs/sync.md, docs/schema.md and docs/pluggy.md: a decision and its reason, written when the fix landed",
          note: "pluggy.md catalogs where the provider's documentation was wrong",
        },
        {
          kind: "fact",
          label: "Every pull request boots a preview environment seeded with five months of synthetic data",
          note: "Railway, checked into railway.toml",
        },
      ],
    },
    cta: {
      label: "Contact",
      heading: "Want to walk through the cash-flow engine?",
      invite:
        "How a bill becomes one line on its due date, why the balance is anchored and not read, and what the tests would catch if I broke it: happy to go through any of it line by line.",
      action: "Get in touch",
    },
    next: "Houston",
  },

  pt: {
    kicker: [
      "Finance · 2026 · gestor de gastos de cartão self-hosted",
      "TypeScript · React · Express · SQLite · Open Finance (Pluggy) · Claude",
    ],
    headline:
      "O app do banco mostra a fatura. Nenhum deles diz se vai ter dinheiro na conta no dia de pagar ela.",
    turn: "Este abre nessa resposta.",
    sub: "Gestor de gastos para duas pessoas e três cartões, onde a compra de cartão entra no fluxo de caixa no dia em que a fatura é paga, não no dia em que ela foi feita. O total bate com o boleto que chega por e-mail, e o saldo bate com o do banco.",
    coverAlt: "O app Finance num laptop",
    shotTag: "Telas recriadas em React · compras e pessoas fictícias",
    note: {
      cue: "Role",
      before: "A compra é de maio. O dinheiro sai em",
      circled: "10 de junho",
      after: ".",
      href: "#d01",
    },
    role: {
      label: "Meu papel",
      text: "Produto, design, front-end, back-end, banco e operação: um projeto pessoal rodando em cartões reais desde abril de 2026. O diagnóstico dos IDs reciclados, a modelagem de identidade local e as decisões de schema são minhas, escritas antes de qualquer código. O código que executa isso construí em par com Claude: eu especificava a regra, revisava o que voltava e travava cada uma num teste. Os 132 testes e a pasta docs/ existem porque eu não confio em nenhuma das duas metades dessa dupla sem prova.",
      note: "Aqui não tem cliente nem fundador. O problema é meu e da minha companheira, três cartões numa conta só, e fui eu que decidi que ele merecia um produto. Isso muda o que o case pode reivindicar: nada aqui é escopo que alguém me deu, então ele não reivindica tamanho, reivindica decisão. O código, os testes e o registro das decisões estão públicos, e é por eles que ele deve ser julgado.",
    },
    indexLabel: "Decisões deste case",
    constraints: [
      {
        label: "Contexto",
        text: "Duas pessoas, três cartões, uma conta. Os apps de banco mostram a fatura, e os apps de gestão financeira mostram a despesa, mas quase nenhum liga as duas coisas na data certa: a compra de cartão fica arquivada no dia em que foi feita. O gasto de maio cai em maio, o dinheiro sai em junho, e o fluxo de caixa nunca fecha. Enquanto isso o boleto diz um valor, o app diz outro, e as categorias e as parcelas se perdem no meio.",
      },
      {
        label: "Restrição",
        text: "Uma pessoa, sem prazo e sem usuário além de nós dois, sobre um provedor de Open Finance que não devolve fatura aberta, cujo campo de saldo ao vivo oscila, e cuja documentação discorda do que os próprios dados devolvem.",
      },
    ],
    decisionsHeading: "Decisões",
    decisionsNote: "Quatro, e só o que tem prova anexada.",
    railLabel: "Ir para uma decisão",
    costLabel: "Custou",
    decisions: [
      {
        id: "d01",
        tension: { a: "A data da compra", b: "a data em que o dinheiro sai" },
        context:
          "A pergunta que a gente faz não é quanto gastei, é se a conta aguenta o mês. E ela só tem resposta se a despesa do cartão aparecer no dia em que o dinheiro sai, não no dia em que a compra foi feita. Essa distância é o mês inteiro: uma compra de 20 de maio, num cartão que fecha dia 30, é paga em 10 de junho. Um app que arquiva ela em maio descreve o consumo corretamente e erra o caixa, que é a única coisa que a pessoa precisava saber.",
        design: {
          label: "Design",
          chose:
            "O fluxo de caixa é a tela de abertura do app, e a despesa do cartão entra nele uma vez só, na data de vencimento, pelo valor da fatura inteira.",
          why: "É assim que o dinheiro sai da conta de verdade. Espalhar a compra pelos dias em que ela foi feita descreve o consumo, não projeta o caixa.",
        },
        code: {
          label: "Código",
          chose:
            "A mesma função de janela de fatura que monta a tela da fatura monta a projeção: o passado são transações reais do banco, o futuro são lançamentos recorrentes mais as faturas a vencer, com um saldo corrido atravessando a fronteira. A fatura só é projetada enquanto o vencimento está à frente do último dia realizado; passado isso, quem paga é a saída real do banco, marcada como pagamento de fatura.",
          why: "Duas fontes para o mesmo desembolso é valor dobrado, e é exatamente aí que esses apps erram.",
          authorship: "assisted",
        },
        proofCaption:
          "O extrato, recriado: os dias passados são o banco, os futuros são os lançamentos recorrentes e as faturas a vencer, e o saldo corrido atravessa a fronteira sem emenda. A fatura é uma linha só, no dia em que ela é paga.",
        cost: "A janela precisa do dia de fechamento e do dia de vencimento de cada cartão, e o provedor não devolve nenhum dos dois. Alguém digita uma vez, e um dia de fechamento errado move a compra de mês em silêncio.",
      },
      {
        id: "d02",
        tension: { a: "O ID do provedor", b: "identidade local" },
        context:
          "Em julho de 2026, um total de fatura que eu já tinha conferido mudou entre duas sincronizações. Depois uma linha que eu havia categorizado como Restaurantes e dividido com a minha companheira apareceu como compra de supermercado, por outro valor, carregando a categoria e a divisão junto. Nada no app tinha escrito naquelas linhas. Eu guardo o payload inteiro do provedor em raw_json justamente para uma pergunta dessas ter resposta depois: dei dump no cache, comparei payload a payload entre sincronizações e achei três comportamentos diferentes, não um bug. Um conector reemite um ID novo para a mesma compra a cada varredura diária. O provedor reaproveita um ID antigo para uma compra sem relação nenhuma. E num caso ele reescreveu metade de um registro no lugar, deixando descrição bruta e valor batendo com a linha guardada enquanto a descrição exibida nomeava outro comerciante.",
        design: {
          label: "Design",
          chose:
            "A identidade passa a ser local, e tudo que uma pessoa digitou pendura nela: categoria, divisão, empurrão de fatura e descrição corrigida vivem em tabelas próprias apontando para o UUID, nunca na linha da transação.",
          why: "O ID do provedor não é identidade, é uma alça que ele pode reemitir, reaproveitar e reescrever. O cache é dele e pode ser jogado fora a qualquer momento. O que nós dois digitamos, não.",
        },
        code: {
          label: "Código",
          chose:
            "Cada linha chaveada por um UUID gerado aqui; duplicata detectada por um SHA-256 de data, valor e slug do comerciante, excluindo o ID da conta de propósito. O motor escolhe um de seis desfechos explícitos por payload, em vez de dar upsert e torcer, e INSERT OR REPLACE está banido em toda tabela de cache.",
          why: "Uma reconexão emite conta e transação novas para os mesmos cartões, então o ID da conta no hash traria cinco meses de história de volta como duplicata. E REPLACE apaga antes de inserir, cascateando por todas as tabelas que guardam o nosso trabalho.",
          authorship: "assisted",
        },
        proofCaption:
          "Um ID do provedor ao longo de quatro dias, e o que ele carregou junto: uma categoria e uma divisão que eram de uma padaria, aterrissando num supermercado. Os payloads têm a forma dos que ficaram como fixtures na suíte de testes.",
        cost: "Cinco tabelas a mais e um join a mais em quase toda leitura, e a identidade virou responsabilidade do meu código em vez da do provedor. Toda anomalia vira uma linha no inbox esperando uma pessoa, e essa pessoa sou eu: linha nascida de ID reciclado fica de fora da categorização automática de propósito.",
      },
      {
        id: "d03",
        tension: { a: "O saldo que o provedor devolve", b: "um saldo que alguém confirmou" },
        design: {
          label: "Design",
          chose:
            "O saldo de abertura vem de uma âncora que uma pessoa confirmou numa data conhecida, e o resto é caminhada sobre as transações a partir dali.",
          why: "O campo de saldo ao vivo do provedor oscila. Ancorar nele é construir a projeção inteira sobre um número que muda sozinho, e é essa projeção que precisa bater com o banco.",
        },
        code: {
          label: "Código",
          chose:
            "Uma âncora só serve todos os meses, caminhando para a frente ou para trás a partir dela. No fim de cada ano fechado a âncora é rolada para a frente pelas transações daquele ano e congelada como âncora de 31 de dezembro, derivada da anterior e nunca lida do saldo ao vivo, com um buffer até 15 de janeiro para o fim de dezembro cair.",
          why: "Sem isso, no dia em que o provedor aposentar as transações antigas a caminhada perde o chão e o saldo de abertura muda sem ninguém ter mexido em nada.",
        },
        proofCaption:
          "O saldo corrido, recriado: uma âncora confirmada, uma caminhada sobre as transações, e uma fronteira única entre o que aconteceu e o que está projetado.",
        cost: "A rolagem carrega qualquer desvio para a frente sem corrigir, então re-ancorar contra um extrato de verdade continua sendo ação manual e deliberada. Eu prefiro um número que só se mexe quando uma pessoa manda.",
      },
      {
        id: "d04",
        tension: { a: "Confiar no meu número", b: "conferir contra o boleto" },
        context:
          "A fatura aberta é calculada aqui, e o fluxo de caixa inteiro se apoia nela. Enquanto o ciclo está aberto não existe contra o que conferir. Quando ele fecha, passa a existir: o emissor imprime a versão oficial e manda o boleto. É contra esse número que o meu cálculo tem que se explicar, e se ele não bater, tudo que a tela de abertura prometeu para o mês era ficção.",
        design: {
          label: "Design",
          chose:
            "Conciliação, não importação: o app lê a fatura fechada e mostra a diferença contra o que ele mesmo calculou, em quatro caixas: bateu, diferença de centavos, falta no app, só existe no app.",
          why: "Eu quero achar onde errei antes de precisar acreditar no meu próprio total. Um importador teria escondido a divergência sobrescrevendo ela.",
        },
        code: {
          label: "Código",
          chose:
            "O texto do PDF é extraído localmente e só o texto vai para o modelo, nunca o arquivo. O pareamento é guloso em camadas, do mais estrito ao mais frouxo, com o valor como âncora e data, parcela e cartão desempatando; uma tolerância de R$ 0,15 separa arredondamento de parcela de compra realmente faltando.",
          why: "O total que vale é o impresso no resumo do próprio emissor, não a soma das linhas que a extração conseguiu ler. Quando os dois discordam, o app avisa que a leitura falhou em vez de enterrar a falha dentro da diferença.",
          authorship: "assisted",
        },
        proofCaption:
          "A conciliação, recriada: o total impresso pelo emissor contra o calculado aqui, e as quatro caixas que explicam a diferença. A coluna de centavos é arredondamento de parcela; a de faltantes é a única que custa dinheiro.",
        cost: "PDF escaneado não tem texto para extrair e cai para a importação por screenshot, que manda imagem para o modelo e custa mais. E cada camada do pareador é um julgamento que só o teste mantém honesto: são 13 aqui e 18 na extração.",
      },
    ],
    ds: {
      typeRoles: ["títulos e totais", "moeda e datas", "metadados"],
      foundation:
        "Três fontes, três funções, nenhuma sobreposição: Fraunces em todo título e todo total, JetBrains Mono em moeda e data com figuras tabulares, para as colunas do extrato alinharem descendo a página, e Inter restrita a metadado pequeno. Sem sombra de card, sem canto arredondado, e nunca um número em vermelho: variação é seta e palavra. A página é para ser lida como caderno de economia impresso, não varrida como dashboard.",
      signature:
        "A peça de assinatura, ampliada: o total da fatura aberta a 96px. Uma fatura é um número só, e a página devia dizer isso.",
    },
    snapshots: [
      {
        when: "sync, 12 jul",
        providerId: "provider_id 8f21c0…",
        description: "PADARIA ALVORADA",
        amount: "R$ 32,80",
        note: "Categorizada como Restaurantes, marcada meio a meio.",
      },
      {
        when: "sync, 14 jul",
        providerId: "provider_id 8f21c0…",
        description: "SUPERMERCADO ZONA SUL",
        amount: "R$ 412,90",
        note: "Mesmo ID, compra sem relação. A categoria e a divisão vieram junto.",
        drifted: true,
      },
      {
        when: "sync, 15 jul",
        providerId: "provider_id 8f21c0…",
        description: "SUPERMERCADO ZONA SUL",
        amount: "R$ 386,90",
        note: "O valor mudou de novo. A fatura parou de bater com o boleto.",
        drifted: true,
      },
    ],
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
      attached: ATTACHED,
    },
    frontier: {
      label: "Onde fica a fronteira:",
      text: "o problema é meu, então não existe aqui escopo que outra pessoa definiu. O que não é meu é o dado: o provedor decide o que chega e quando, e muda de ideia. A fronteira que este case defende é a que separa um feed que eu não controlo de três números que precisam bater com o mundo lá fora: a fatura contra o boleto que chega por e-mail, o saldo contra o do banco, e a projeção contra o que realmente acontece no dia 30.",
    },
    outcome: {
      heading: "Resultado",
      measures: [
        { value: "132", label: "testes sobre a regra de negócio, 8 arquivos, 0,38 s" },
        { value: "6", label: "desfechos explícitos por payload no motor de sync" },
        { value: "abr 2026", label: "rodando em cartões reais desde então" },
        { value: "0", label: "usos de INSERT OR REPLACE em tabela de cache", mark: true },
      ],
      gaps: {
        label: "O que não foi medido, e o que falta",
        items: [
          "Usuários: somos dois. O case não afirma escala, e transformar usuário em variável de ambiente fecha essa porta de propósito.",
          "Nunca medi quanto tempo isso economiza por mês. O que afirmo é a decisão e o teste que a segura.",
          "O demo hospedado roda sobre dados sintéticos e toda tela desta página é recriação. Os cartões reais não aparecem em lugar nenhum.",
        ],
      },
    },
    evidence: {
      heading: "Evidência",
      items: [
        {
          kind: "link",
          label: "Demo no ar, entre com demo / demo",
          href: "https://finance-demo.up.railway.app/",
          note: "dados sintéticos, reseta periodicamente",
        },
        {
          kind: "link",
          label: "Código no GitHub",
          href: "https://github.com/kenjimattos/finance",
          note: "monorepo, docs/ e a suíte de testes são públicos",
        },
        {
          kind: "fact",
          label: "132 testes em 8 arquivos, com os payloads corrompidos do incidente guardados como fixtures",
          note: "rodam com node --test, sem banco e sem rede",
        },
        {
          kind: "fact",
          label: "docs/sync.md, docs/schema.md e docs/pluggy.md: a decisão e o motivo, escritos quando a correção entrou",
          note: "o pluggy.md cataloga onde a documentação do provedor estava errada",
        },
        {
          kind: "fact",
          label: "Cada pull request sobe um ambiente de preview com cinco meses de dados sintéticos",
          note: "Railway, versionado no railway.toml",
        },
      ],
    },
    cta: {
      label: "Contato",
      heading: "Quer entrar no motor do fluxo de caixa?",
      invite:
        "Como uma fatura vira uma linha só no dia do vencimento, por que o saldo é ancorado em vez de lido, e o que os testes pegariam se eu quebrasse: fico feliz em passar linha por linha.",
      action: "Fale comigo",
    },
    next: "Houston",
  },
};

/* --------------------------------- component --------------------------------- */

export function FinanceContent() {
  const t = COPY[useLocale()];

  /* O sistema é o que faz o extrato ser legível como página impressa, então
     ele entra na d01, junto da tela que ele sustenta: a fundação primeiro, a
     assinatura depois, e só então a prova da decisão. */
  const dsProof = (
    <>
      <CaseProof caption={t.ds.foundation}>
        <FinDsFoundation typeRoles={t.ds.typeRoles} />
      </CaseProof>
      <CaseProof caption={t.ds.signature}>
        <FinDsSignature />
      </CaseProof>
    </>
  );

  /* A prova entra dentro da decisão que ela prova. A d02 é a única com duas
     peças: a tira de sintomas é o que aconteceu, o diagrama é o que passou a
     valer depois. */
  const proofs: ReactNode[] = [
    <Screen key="cashflow" path="/">
      <CashFlowScreen />
    </Screen>,
    <Exhibit key="identity">
      <div className="flex flex-col gap-8">
        <SymptomStrip caption="" snapshots={t.snapshots} />
        <IdentityDiagram {...t.identity} />
      </div>
    </Exhibit>,
    <Screen key="balance" path="/">
      <BalanceWalkScreen />
    </Screen>,
    <Screen key="reconcile" path="/dashboard">
      <ConciliacaoScreen />
    </Screen>,
  ];

  return (
    <CaseShell nextProject={{ href: "/work/houston", label: t.next }}>
      <CaseHero
        kicker={t.kicker}
        headline={t.headline}
        turn={t.turn}
        sub={t.sub}
        cover={{
          src: "/img/work-finance.png",
          alt: t.coverAlt,
          zoom: 1.2,
          fx: "100%",
          fy: "35%",
        }}
        mediaTag={t.shotTag}
        note={t.note}
        role={t.role}
      >
        <CaseIndex label={t.indexLabel} items={t.decisions} />
      </CaseHero>

      <CaseConstraints rows={t.constraints} />

      <CaseSection heading={t.decisionsHeading} note={t.decisionsNote}>
        <CaseDecisions railLabel={t.railLabel} items={t.decisions}>
          {t.decisions.map((d, i) => (
            <CaseDecision
              key={d.id}
              id={d.id}
              number={String(i + 1).padStart(2, "0")}
              tension={d.tension}
              context={d.context}
              design={d.design}
              code={d.code}
              cost={d.cost}
              costLabel={t.costLabel}
            >
              {d.id === "d01" ? dsProof : null}
              {proofs[i] ? <CaseProof caption={d.proofCaption}>{proofs[i]}</CaseProof> : null}
            </CaseDecision>
          ))}
        </CaseDecisions>

        <CaseFrontier label={t.frontier.label} text={t.frontier.text} />
      </CaseSection>

      <CaseOutcome
        id="result"
        heading={t.outcome.heading}
        measures={t.outcome.measures}
        gaps={t.outcome.gaps}
      />

      <CaseEvidence id="evidence" heading={t.evidence.heading} items={t.evidence.items} />

      <CaseCTA
        label={t.cta.label}
        heading={t.cta.heading}
        invite={t.cta.invite}
        action={t.cta.action}
        email="kenjimattos@gmail.com"
      />
    </CaseShell>
  );
}
