"use client";

/* Exhibit de design system da decisão 04 do case: a fundação que as telas
 * obedecem, na mesma gramática do exhibit do Sebrae — a fundação (tokens,
 * tipo, primitivos) e a peça-assinatura em close.
 *
 * Tudo aqui renderiza os primitivos REAIS de ui.tsx sobre os tokens reais
 * de globals.css; nada é ilustração. Regra de corte (a mesma do Sebrae):
 * um primitivo só entra se aparece numa tela mostrada nesta página. O
 * variant `disabled` do RevButton existe em ui.tsx, mas nenhuma tela
 * mostrada o usa — fica de fora.
 *
 * O painel é claro, ao contrário do Sebrae: a tese do sistema é um app
 * calmo num domínio clínico, e o exhibit veste essa pele.
 */

import { ReactNode } from "react";
import { geologica } from "@/components/houston-demo/geologica";
import { useLocale } from "@/lib/i18n";
import {
  cx,
  FONT,
  HospitalAvatar,
  RevButton,
  TabBar,
  TurnoIcon,
  TURNOS,
  type Turno,
} from "./ui";
import { ComoChegarBody, VagaQuickActions, VagaAccordion, ShiftCard } from "./vaga-components";
import { SHIFTS } from "./data";
import { ExploreFilter } from "./screens/explore";

/* As legendas das células, nas duas línguas do site. Os nomes de
   componente e o vocabulário do app (turnos, labels de tela) são código
   e produto — ficam como são. */
const LABELS = {
  en: {
    button: "Button · state made obvious to the user",
    avatar: "HospitalAvatar · instant recognition of the shift's hospital",
    quickActions: "VagaQuickActions · the most-used actions one tap away",
    exploreFilter: "ExploreFilter · concise, accessible filtering and sorting",
    shiftCard: "ShiftCard · every important fact, organized",
    turno: "TurnoIcon · less cognitive load to read the shift's period",
    tabBar: "TabBar · active tab in purple, never red/green",
    accordion: "VagaAccordion · every shift detail, always uniform",
  },
  pt: {
    button: "Button · estado claro para o usuário",
    avatar: "HospitalAvatar · identificação rápida do local do plantão",
    quickActions: "VagaQuickActions · fácil acesso a ações mais usadas",
    exploreFilter: "ExploreFilter · filtragem e ordenação acessível e concisas",
    shiftCard: "ShiftCard · todas informações importantes de forma organizada",
    turno: "TurnoIcon · menos carga cognitiva para identificar o turno",
    tabBar: "TabBar · aba ativa em roxo, nunca em vermelho/verde",
    accordion: "VagaAccordion · todos detalhes do plantão sempre uniformes",
  },
} as const;

/* Os 6 tokens, verbatim de --color-rev-* no globals.css. Os claros ganham
   um fio para ler contra o painel branco em que nasceram. */
const TOKENS: { name: string; hex: string; light?: boolean }[] = [
  { name: "rev-primary", hex: "#A369ED" },
  { name: "rev-tint", hex: "#F5EDFF", light: true },
  { name: "rev-tertiary", hex: "#0FADEB" },
  { name: "rev-text", hex: "#1D1C1C" },
  { name: "rev-muted", hex: "#848484" },
  { name: "rev-border", hex: "#E5E5E5", light: true },
];

function Panel({ children }: { children: ReactNode }) {
  return (
    <div
      className={cx(
        geologica.variable,
        "rev-app relative overflow-hidden border border-ink bg-white text-rev-text antialiased"
      )}
      style={{ fontFamily: "var(--font-geologica), sans-serif" }}
    >
      {children}
    </div>
  );
}

/* A legenda dentro do painel, na voz do próprio app: mono, miúda, cinza. */
function CellLabel({ children }: { children: ReactNode }) {
  return (
    <span
      className="font-mono text-rev-muted"
      style={{ fontSize: "clamp(10px, 0.9vw, 11px)" }}
    >
      {children}
    </span>
  );
}

/* ------------------------------- foundation -------------------------------- */

export function RevDsFoundation({
  typeRoles,
}: {
  /* O papel de cada peso da Geologica, na ordem 600 / 500 / 400.
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
                className={cx("h-10 rounded-md", token.light && "border border-rev-border")}
                style={{ backgroundColor: token.hex }}
              />
              <span className="font-mono text-rev-text/70" style={{ fontSize: 10 }}>
                {token.name}
              </span>
              <span className="font-mono text-rev-muted" style={{ fontSize: 10 }}>
                {token.hex}
              </span>
            </div>
          ))}
        </div>

        {/* tipo: uma família, três pesos — a decisão é essa */}
        <div className="grid gap-6 md:grid-cols-3">
          {(
            [
              ["Geologica 600", FONT.display, typeRoles[0]],
              ["Geologica 500", FONT.heading, typeRoles[1]],
              ["Geologica 400", FONT.body, typeRoles[2]],
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

        {/* primitivos — só o que as telas mostradas usam, em três colunas:
           os controles, as unidades de conteúdo e, fechando, o acordeão
           da vaga inteiro. */}
        {/* Button    */}
        <div className="grid items-start gap-x-8 gap-y-5 lg:grid-cols-2 xl:grid-cols-3">
          <div className="flex flex-col gap-5 h-full">
            <div className="flex flex-col gap-2">
              <div className="flex flex-col items-center gap-4 rounded-xl border border-rev-border p-5">
                <RevButton className="w-full">Candidatar-se</RevButton>
                <RevButton className="w-full" variant="disabled">Candidatar-se</RevButton>
              </div>
              <CellLabel>{t.button}</CellLabel>
            </div>
            
          {/* Hospital Avatar */}
            <div className="flex flex-col gap-2">
              <div className="flex justify-center rounded-xl border border-rev-border p-3 w-full">
                <div className="flex items-center gap-2">
                  {SHIFTS.map((s) => (
                    <HospitalAvatar
                      key={s.id}
                      initials={s.initials}
                      rounded={10}
                    />
                  ))}
                </div>
              </div>
              <CellLabel>{t.avatar}</CellLabel>
            </div>

          {/* Quick Actions */}
            <div className="flex flex-col gap-2">
              <div className="rounded-xl border border-rev-border p-3 w-full">
                <VagaQuickActions />
              </div>
              <CellLabel>{t.quickActions}</CellLabel>
            </div>

          {/* Explore Filter */}
            <div className="flex flex-col gap-2">
              <div className="rounded-xl border border-rev-border p-3 w-full">
                <ExploreFilter />
              </div>
              <CellLabel>{t.exploreFilter}</CellLabel>
            </div>
          </div>

          <div className="flex flex-col gap-5 h-full justify-between">
            <div className="flex flex-col gap-2">
              <div className="rounded-xl border border-rev-border">
                <ShiftCard shift={SHIFTS[0]} />
              </div>
              <CellLabel>{t.shiftCard}</CellLabel>
            </div>

            {/* Turnos */}
            <div className="flex flex-col gap-2">
              <div className="flex w-full items-start justify-center gap-4 rounded-xl border border-rev-border p-4">
                {(Object.keys(TURNOS) as Turno[]).map((turno) => (
                  <div key={turno} className="flex w-13 flex-col items-center gap-1.5">
                    <TurnoIcon turno={turno} size={20} />
                    <span
                      className="text-center text-rev-text/70"
                      style={{ ...FONT.body, fontSize: 10, lineHeight: 1.2 }}
                    >
                      {TURNOS[turno].label}
                    </span>
                  </div>
                ))}
              </div>
              <CellLabel>{t.turno}</CellLabel>
            </div>
            
            {/* O TabBar real é absoluto no rodapé da tela; aqui ele ganha
                 um palco com a mesma altura para ser visto de perto. */}
            <div className="flex flex-col gap-2">
              <div className="flex flex-col gap-2 rounded-xl border border-rev-border bg-gray-50">
                <div className="relative h-20">
                  <TabBar active="home" />
                </div>
                <div className="relative h-20">
                  <TabBar active="explore" />
                </div>
                <div className="relative h-20">
                  <TabBar active="escalas" />
                </div>
                <div className="relative h-20">
                  <TabBar active="plantoes" />  
                </div>
              </div>
              <CellLabel>{t.tabBar}</CellLabel>
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <div className="rounded-xl border border-rev-border px-5 pb-1 [&>div:first-child]:border-t-0">
              <VagaAccordion label="Requisitos" />
              <VagaAccordion label="Como chegar?" open>
                <ComoChegarBody />
              </VagaAccordion>
              <VagaAccordion label="Sobre o pagamento" />
              <VagaAccordion label="Quem está contratando?" />
            </div>
            <CellLabel>{t.accordion}</CellLabel>
          </div>
        </div>
      </div>
    </Panel>
  );
}