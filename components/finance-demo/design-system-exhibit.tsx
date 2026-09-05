"use client";

/* Exhibit de design system da decisão 04, na mesma gramática do Sebrae e do
 * Revoluna: a fundação (tokens, tipo, primitivos) e a peça-assinatura em
 * close.
 *
 * Tudo aqui renderiza os primitivos REAIS de ui.tsx sobre os tokens reais de
 * globals.css; nada é ilustração. Regra de corte, a mesma dos outros dois: um
 * primitivo só entra se aparece numa tela mostrada nesta página.
 *
 * O painel é claro, como o app: papel quente, um laranja queimado, sem sombra
 * de card e sem canto arredondado.
 */

import { ReactNode } from "react";
import { useLocale } from "@/lib/i18n";
import { BILL, CATEGORIES } from "./data";
import { finFontVars } from "./fonts";
import {
  CategoryTrigger,
  cx,
  Delta,
  Eyebrow,
  FONT,
  GhostAction,
  Headline,
  MicroLabel,
  Money,
  Rule,
} from "./ui";

const LABELS = {
  en: {
    headline: "Headline · every total in Fraunces, the page's one loud voice",
    money: "Money · JetBrains Mono with tabular figures, so columns align",
    delta: "Delta · an arrow and a word, never a red number",
    category: "CategoryTrigger · the category is a color, the absence of one is the filter",
    eyebrow: "Eyebrow and MicroLabel · Inter, restricted to small metadata",
    action: "GhostAction and Rule · the chrome stays out of the numbers' way",
    signature: "The open bill, at the size the app prints it",
  },
  pt: {
    headline: "Headline · todo total em Fraunces, a única voz alta da página",
    money: "Money · JetBrains Mono com figuras tabulares, para as colunas alinharem",
    delta: "Delta · uma seta e uma palavra, nunca um número vermelho",
    category: "CategoryTrigger · a categoria é uma cor, e a ausência dela é o filtro",
    eyebrow: "Eyebrow e MicroLabel · Inter, restrita a metadado pequeno",
    action: "GhostAction e Rule · a moldura sai da frente dos números",
    signature: "A fatura em aberto, no tamanho em que o app a imprime",
  },
} as const;

/* Os tokens, verbatim de --color-fin-* no globals.css. Os claros ganham um
   fio para ler contra o papel em que nasceram. */
const TOKENS: { name: string; hex: string; light?: boolean }[] = [
  { name: "fin-paper", hex: "#FBF8F4", light: true },
  { name: "fin-tint", hex: "#F5EFE6", light: true },
  { name: "fin-rule", hex: "#E4DDCF", light: true },
  { name: "fin-ink", hex: "#1A1614" },
  { name: "fin-accent", hex: "#C2410C" },
  { name: "fin-positive", hex: "#4D7C0F" },
];

function Panel({ children }: { children: ReactNode }) {
  return (
    <div
      className={cx(finFontVars, "fin-app fin-grain relative overflow-hidden antialiased")}
      style={{
        border: "1px solid var(--color-fin-ink)",
        backgroundColor: "var(--color-fin-paper)",
        color: "var(--color-fin-ink)",
        ...FONT.body,
      }}
    >
      {children}
    </div>
  );
}

/* A legenda dentro do painel, na voz do próprio app: mono, miúda, cinza. */
function CellLabel({ children }: { children: ReactNode }) {
  return (
    <span
      style={{ ...FONT.mono, fontSize: 11, color: "var(--color-fin-ink-muted)" }}
    >
      {children}
    </span>
  );
}

function Cell({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div className="flex flex-col gap-2">
      <div
        className="flex min-h-24 flex-col justify-center gap-3 p-5"
        style={{ border: "1px solid var(--color-fin-rule)" }}
      >
        {children}
      </div>
      <CellLabel>{label}</CellLabel>
    </div>
  );
}

/* ------------------------------- foundation -------------------------------- */

export function FinDsFoundation({
  typeRoles,
}: {
  /* O papel de cada fonte, na ordem Fraunces / JetBrains Mono / Inter.
     Localizado por quem chama; os nomes de token são código e ficam. */
  typeRoles: [string, string, string];
}) {
  const t = LABELS[useLocale()];

  return (
    <Panel>
      <div className="flex flex-col gap-8 p-8 md:p-10">
        {/* tokens */}
        <div className="grid grid-cols-3 gap-x-3 gap-y-4 md:grid-cols-6">
          {TOKENS.map((token) => (
            <div key={token.name} className="flex flex-col gap-1.5">
              <span
                className="h-10"
                style={{
                  backgroundColor: token.hex,
                  border: token.light ? "1px solid var(--color-fin-rule)" : undefined,
                }}
              />
              <span style={{ ...FONT.mono, fontSize: 10, color: "var(--color-fin-ink-soft)" }}>
                {token.name}
              </span>
              <span style={{ ...FONT.mono, fontSize: 10, color: "var(--color-fin-ink-faint)" }}>
                {token.hex}
              </span>
            </div>
          ))}
        </div>

        {/* tipo: três fontes, três funções, nenhuma sobreposição */}
        <div className="grid gap-6 md:grid-cols-3">
          {(
            [
              ["Fraunces", FONT.display, typeRoles[0]],
              ["JetBrains Mono", FONT.mono, typeRoles[1]],
              ["Inter", FONT.body, typeRoles[2]],
            ] as const
          ).map(([name, font, role]) => (
            <div key={name} className="flex flex-col gap-1">
              <span className="leading-none" style={{ ...font, fontSize: 26 }}>
                {name}
              </span>
              <CellLabel>{role}</CellLabel>
            </div>
          ))}
        </div>

        {/* primitivos, só o que as telas mostradas usam */}
        <div className="grid items-start gap-x-8 gap-y-5 md:grid-cols-2 xl:grid-cols-3">
          <Cell label={t.headline}>
            <Headline size={44}>R$ 4.812,73</Headline>
          </Cell>

          <Cell label={t.money}>
            <div className="flex flex-col gap-1 text-right" style={{ width: 120 }}>
              <Money size={14}>R$ 1.284,40</Money>
              <Money size={14}>R$ 96,00</Money>
              <Money size={14}>R$ 12.400,00</Money>
            </div>
          </Cell>

          <Cell label={t.delta}>
            <Delta value={386.2} text="R$ 386,20" />
            <Delta value={-68.3} text="R$ 68,30" />
          </Cell>

          <Cell label={t.category}>
            <div className="flex flex-wrap gap-2">
              <CategoryTrigger label={CATEGORIES.mercado.name} color={CATEGORIES.mercado.color} />
              <CategoryTrigger
                label={CATEGORIES.restaurantes.name}
                color={CATEGORIES.restaurantes.color}
              />
              <CategoryTrigger label={CATEGORIES.viagem.name} color={CATEGORIES.viagem.color} />
              <CategoryTrigger label="sem categoria" />
            </div>
          </Cell>

          <Cell label={t.eyebrow}>
            <Eyebrow>fatura em aberto</Eyebrow>
            <MicroLabel>descrição · valor · saldo</MicroLabel>
          </Cell>

          <Cell label={t.action}>
            <div className="flex items-center gap-6">
              <GhostAction>regras</GhostAction>
              <GhostAction>sincronizar ↻</GhostAction>
            </div>
            <Rule />
          </Cell>
        </div>
      </div>
    </Panel>
  );
}
