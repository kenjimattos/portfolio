"use client";

/* O exhibit da decisão 03: o caminho do acesso antes e depois do pivot
 * RLS → BFF. Ele é peça do editorial, não da recriação — tinta sobre
 * papel, filete de 1px, rótulos em Martian Mono — porque o que ele prova
 * é uma decisão de arquitetura, e desenhá-lo na pele da plataforma
 * fingiria uma tela que nunca existiu. O único vermelho é o nó do
 * problema, pela mesma regra da página: vermelho é campo de resolução,
 * e aqui ele marca exatamente o que foi resolvido.
 */

import { ReactNode } from "react";
import { useLocale } from "@/lib/i18n";

const COPY = {
  en: {
    before: "Before",
    after: "After",
    browser: "Browser",
    browserBefore: "the user's session",
    browserAfter: "JWT with role claims",
    dataQuery: "data query",
    requestJwt: "request + JWT",
    serviceKey: "service key",
    rls: "Supabase · RLS",
    rlsSlow: "row by row, per query",
    rlsRest: ": 36 permissions × every visible row. Too slow to operate.",
    rlsLead: "policies evaluated ",
    bff: "BFF · Next API routes",
    bffDesc: "decides what each user sees; the filtering happens once, here",
    closed: "Supabase · closed",
    closedDesc:
      "roles and the 36 permissions still live in the database; no data query leaves the browser",
    login: "login",
    loginDesc:
      "Supabase Auth issues the JWT, with claims customized through an Auth Hook. It is the only path the browser takes to Supabase.",
  },
  pt: {
    before: "Antes",
    after: "Depois",
    browser: "Navegador",
    browserBefore: "sessão do usuário",
    browserAfter: "JWT com claims de cargo",
    dataQuery: "consulta de dados",
    requestJwt: "requisição + JWT",
    serviceKey: "chave de serviço",
    rls: "Supabase · RLS",
    rlsSlow: "linha a linha, por consulta",
    rlsRest: ": 36 permissões × cada linha visível. Lento demais para operar.",
    rlsLead: "policies avaliadas ",
    bff: "BFF · Next API routes",
    bffDesc: "decide o que cada usuário vê; o filtro acontece uma vez, aqui",
    closed: "Supabase · fechado",
    closedDesc:
      "cargos e as 36 permissões continuam no banco; nenhuma consulta de dados sai do navegador",
    login: "login",
    loginDesc:
      "O Supabase Auth emite o JWT, com claims customizadas via Auth Hook. É o único caminho que o navegador percorre até o Supabase.",
  },
} as const;

/* A seta é a mesma mão da caneta do site: um traço com leve curva, não
   um marker de biblioteca. Na coluna estreita ela some e sobra o rótulo,
   que já diz o que viaja por ali. */
function Arrow({ label }: { label: string }) {
  return (
    <div className="flex min-w-0 flex-col items-center justify-center px-1.5 py-1.5 md:min-w-24">
      <svg width="84" height="12" viewBox="0 0 84 12" aria-hidden className="hidden md:block">
        <path
          d="M2 6 C 30 5, 54 7, 76 6 M70 2 C 73 4, 76 5, 79 6 C 76 8, 73 9, 70 11"
          fill="none"
          stroke="var(--ink)"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
      <span className="meta dimmer mt-1.5 text-center text-[9px]">{label}</span>
    </div>
  );
}

function Node({
  name,
  desc,
  bad,
  grow,
}: {
  name: string;
  desc: ReactNode;
  bad?: boolean;
  grow?: boolean;
}) {
  return (
    <div
      className="min-w-[150px] border p-[14px_18px]"
      style={{ borderColor: bad ? "var(--red)" : "var(--ink)", flex: grow ? 1 : undefined }}
    >
      <div
        className="text-[17px] font-bold tracking-[-0.015em]"
        style={{ color: bad ? "var(--red)" : undefined }}
      >
        {name}
      </div>
      <div className="mt-1 text-xs leading-[1.4]" style={{ color: "var(--ink-55)" }}>
        {desc}
      </div>
    </div>
  );
}

function Row({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div className="grid grid-cols-1 gap-2 py-8 md:grid-cols-[96px_minmax(0,1fr)] md:gap-6">
      <div className="meta dimmer md:pt-4">{label}</div>
      <div className="min-w-0">{children}</div>
    </div>
  );
}

export function AccessExhibit() {
  const t = COPY[useLocale()];

  return (
    <div className="border-y border-ink">
      <Row label={t.before}>
        <div className="flex flex-col items-stretch md:flex-row">
          <Node name={t.browser} desc={t.browserBefore} />
          <Arrow label={t.dataQuery} />
          <Node
            name={t.rls}
            bad
            grow
            desc={
              <>
                {t.rlsLead}
                <span style={{ color: "var(--red)" }}>{t.rlsSlow}</span>
                {t.rlsRest}
              </>
            }
          />
        </div>
      </Row>

      <div className="border-t" style={{ borderColor: "var(--ink-12)" }}>
        <Row label={t.after}>
          <div className="flex flex-col items-stretch md:flex-row">
            <Node name={t.browser} desc={t.browserAfter} />
            <Arrow label={t.requestJwt} />
            <Node name={t.bff} desc={t.bffDesc} />
            <Arrow label={t.serviceKey} />
            <Node name={t.closed} desc={t.closedDesc} grow />
          </div>
          <div
            className="mt-4 flex items-baseline gap-3 border-t pt-3"
            style={{ borderColor: "var(--ink-12)" }}
          >
            <span className="meta dimmer text-[9px]">{t.login}</span>
            <span className="text-xs leading-[1.5]" style={{ color: "var(--ink-55)" }}>
              {t.loginDesc}
            </span>
          </div>
        </Row>
      </div>
    </div>
  );
}
