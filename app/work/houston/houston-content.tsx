"use client";

/* Houston — o segundo case no editorial de problema.
 *
 * A atribuição está na primeira dobra, como no Sebrae: a demanda era dos
 * fundadores e o prazo era da reunião; o que o case reivindica é
 * transformar demanda em produto rodando em produção, sem quebrar a
 * operação. Onde a implementação profunda foi escrita com IA, o selo
 * diz (d01 e d03) — e a d03 abre com o erro admitido, porque é a
 * decisão que o Kenji defende inteira.
 *
 * O hero usa a imagem de capa do projeto em vez da recriação viva: a
 * capa é clara, então o véu é o curto (data-cover) e a manchete ainda
 * troca de tinta por papel na fronteira. As recriações continuam sendo
 * a prova — dentro das decisões que provam.
 */

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
import { HoustonScreen } from "@/components/houston-demo/houston-frame";
import { AccessControlEmbed } from "@/components/houston-demo/embeds/access-control";
import { AccessExhibit } from "@/components/houston-demo/access-exhibit";
import { SystemSpecimen } from "@/components/houston-demo/system-specimen";
import { geologica } from "@/components/houston-demo/geologica";
import { cx } from "@/components/houston-demo/ui";
import { useLocale } from "@/lib/i18n";

const DEMO_URL = "https://houston-demo.vercel.app/";
const REPO_URL = "https://github.com/kenjimattos/houston-III-demo";

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

const COPY: Record<"en" | "pt", Copy> = {
  en: {
    kicker: [
      "Houston · 2025 · medical shift operations platform",
      "React · TypeScript · Next.js · Supabase · PostgreSQL",
    ],
    headline: "The people scheduling 2,000 doctors had, at best, a spreadsheet.",
    turn: "Today they run a platform.",
    sub: "From internal tool to multi-tenant platform: schedules, applications and access for 2,000+ doctors, designed directly in code.",
    coverAlt: "The Houston control panel on a laptop",
    shotTag: "Platform dashboard · fictional data",
    /* A frase é a afirmação mais difícil de acreditar do case — e a prova
       dela é a decisão 02, para onde a nota aponta. */
    note: {
      cue: "Scroll",
      before: "36 permissions, 4 roles and",
      circled: "no permissions screen",
      after: ".",
      href: "#d02",
    },
    role: {
      label: "My role",
      text: "Product, design, frontend, backend and database: a year and a half on the project, most of it alone; for four months, coordinating a contracted developer through issues, PRs and a kanban flow on GitHub Projects, with the CI/CD built side by side. I defined the type, spacing, widths and color hierarchy over retokenized shadcn/ui primitives, and designed the flows directly in code, against the live operation. The custom calendar and the schedule grid were born almost entirely from generative AI: I specified, reviewed and tested, with adjustments by the developer through the issues and PR flow. I built the access redesign, from RLS to the BFF, pairing with Claude. The decisions are mine.",
      note: "The demand wasn't mine. It came from the founders, with an investor or client set to see the feature working, in meetings that appeared without warning. What was mine was turning demand into product running in production, racing the clock, without breaking the operation. Every decision below is of that kind.",
    },
    indexLabel: "Decisions in this case",
    constraints: [
      {
        label: "Context",
        text: "2,000+ doctors across hospitals and groups, multi-tenant, and a primary user, the escalista, the person who builds the shift schedule, coming from a spreadsheet at best.",
      },
      {
        label: "Constraint",
        text: "Founder demands with a meeting for a deadline: the feature an investor needed to see had to be live and working, and the meetings appeared without warning. One person for most of it; a contracted developer for four months.",
      },
    ],
    decisionsHeading: "Decisions",
    decisionsNote: "Four of them, and only what has proof attached.",
    railLabel: "Jump to a decision",
    costLabel: "Cost",
    decisions: [
      {
        id: "d01",
        tension: { a: "Off-the-shelf library", b: "the escalista's screen" },
        design: {
          label: "Design",
          chose: "Rebuild the calendar when the library became the bottleneck, not before.",
          why: "Grouping shifts by time, status colors and per-shift actions didn't fit the ready-made model. The library was the right call until it wasn't.",
        },
        code: {
          label: "Code",
          chose: "A custom calendar in React, no view library: grouping by time, status language and per-shift actions.",
          why: "Fewer views than the library, full control over the screen the escalista lives in.",
          authorship: "assisted",
        },
        proofCaption:
          "The custom calendar, recreated: shifts grouped by time, status colors, per-shift actions. None of it fit the library this screen started on.",
        cost: "More code to own, and every new view is ours to build.",
      },
      {
        id: "d02",
        tension: { a: "Configurable", b: "operable" },
        design: {
          label: "Design",
          chose: "No permissions screen: a manager assigns a role, never a checkbox matrix.",
          why: "Editing permissions was more engineering than the manager needed, and room to compromise sensitive data. I chose to protect the user from the mistake.",
        },
        code: {
          label: "Code",
          chose: "4 fixed roles with 36 permissions predefined in the database; the frontend hides what the role can't do, the BFF decides.",
          why: "Changing a permission is a product decision: a database change by PR, with a Supabase preview, homologation, then a release to production.",
        },
        proofCaption:
          "The access modal, recreated: a role, not a checkbox matrix. The permissions screen doesn't exist on purpose.",
        cost: "A permission change is never one click. At the time, I trusted that path to no one but myself.",
      },
      {
        id: "d03",
        tension: { a: "Permissions in the database", b: "permissions in the BFF" },
        context:
          "The RBAC was implemented by the contracted developer under my supervision, from my specification, over about two months. Once done, the system couldn't take the complexity and became too slow to operate. When the developer's contract came to an end, the feature the founders needed was sitting in homologation, not working, and I was alone with it. In days, the diagnosis: Supabase RLS was checking row by row what each user could see.",
        design: {
          label: "Design",
          chose: "Keep the roles and the 36 permissions exactly as specified: the problem wasn't the access model, it was where it ran.",
          why: "I didn't foresee that RLS wouldn't take the complexity; the mistake was mine, and the specification survived it.",
        },
        code: {
          label: "Code",
          chose: "Supabase closed behind a service key; the BFF in Next API routes decides what each user sees, with the user's information in the JWT. In days, RLS was out of the path.",
          why: "The slowness was row-by-row checking in the database. The filtering now happens once, in the BFF, and load time plummeted.",
          authorship: "assisted",
        },
        proofCaption:
          "The access path, redrawn: no data query leaves the browser. Supabase Auth issues the JWT, with claims customized through an Auth Hook; the data sits behind a service key, and the BFF decides.",
        cost: "The database is no longer the last line of defense: the BFF is what guarantees access now, and that responsibility lives in code we maintain.",
      },
      {
        id: "d04",
        tension: { a: "Design tool", b: "straight to code" },
        design: {
          label: "Design",
          chose: "No Figma: flows and screens designed directly in code, against the live operation.",
          why: "Features had meeting deadlines. Coherence came from the system: type, spacing, widths and color hierarchy defined once.",
        },
        code: {
          label: "Code",
          chose: "shadcn/ui primitives copied into the repo and retokenized; no bold anywhere in the product, hierarchy from size and color.",
          why: "A single variable typeface, Geologica; thin weights keep dense screens light.",
        },
        proofCaption:
          "The system that kept code-first design coherent: one variable typeface, three weights, no bold anywhere; hierarchy from size and color.",
        cost: "No explorable artifact outside the product, and a harder onboarding for the next designer.",
      },
    ],
    frontier: {
      label: "Where the line sits:",
      text: "the demand was the founders' and the deadline was the meeting's. Deciding what became platform and what stayed locked in the database was mine.",
    },
    outcome: {
      heading: "Result",
      measures: [
        { value: "0 → 1", label: "internal tool to a platform in production" },
        { value: "2,000+", label: "doctors registered and managed" },
        { value: "36", label: "permissions across 4 roles, specified by me" },
        { value: "0", label: "permissions screens", mark: true },
      ],
      gaps: {
        label: "What wasn't measured, and what's missing",
        items: [
          "Business impact (time per schedule, errors avoided): I never measured it. What I claim is scope and scale, not outcome numbers.",
          "The platform is internal and the production code is private. The proof here is the recreation, and only what it can reproduce.",
        ],
      },
    },
    evidence: {
      heading: "Evidence",
      items: [
        { kind: "link", label: "Live recreation", href: DEMO_URL, note: "vercel.app ↗" },
        {
          kind: "link",
          label: "Recreation repository",
          href: REPO_URL,
          note: "houston-III-demo ↗",
        },
        {
          kind: "fact",
          label: "Versioned PostgreSQL migrations and CI/CD on every release",
          note: "from the real platform",
        },
        {
          kind: "fact",
          label:
            "Database versioned through GitHub: every PR spins a Supabase preview; homologation and production ship by release",
          note: "versioning and rollback for the database",
        },
        {
          kind: "fact",
          label: "All data in the recreation is fictional",
          note: "the production code is private",
        },
      ],
    },
    cta: {
      label: "Contact",
      heading: "Want the full story behind Houston?",
      invite:
        "The access redesign, the custom calendar, the roles model: happy to walk through any of it.",
      action: "Get in touch",
    },
    next: "Revoluna",
  },

  pt: {
    kicker: [
      "Houston · 2025 · plataforma de operação de plantões médicos",
      "React · TypeScript · Next.js · Supabase · PostgreSQL",
    ],
    headline: "Quem escala 2.000 médicos tinha, na melhor das hipóteses, uma planilha.",
    turn: "Hoje opera uma plataforma.",
    sub: "De ferramenta interna a plataforma multi-tenant: escalas, candidaturas e acesso para mais de 2.000 médicos, desenhada direto no código.",
    coverAlt: "O Painel de Controle do Houston num notebook",
    shotTag: "Painel da plataforma · dados fictícios",
    note: {
      cue: "Role",
      before: "36 permissões, 4 cargos e",
      circled: "nenhuma tela de permissões",
      after: ".",
      href: "#d02",
    },
    role: {
      label: "Meu papel",
      text: "Produto, design, frontend, backend e banco: um ano e meio no projeto, a maior parte sozinho; por quatro meses, coordenando um desenvolvedor contratado por issues, PRs e kanban no GitHub Projects, com o CI/CD montado lado a lado. Defini fontes, espaçamentos, larguras e hierarquia de cores sobre primitivos do shadcn/ui retokenizados, e desenhei os fluxos direto no código, contra a operação ao vivo. O calendário próprio e a grade de escala nasceram quase integralmente com IA generativa: eu especificava, revisava e testava, com ajustes do desenvolvedor no fluxo de issues e PRs. O redesenho do acesso, do RLS para o BFF, construí em par com Claude. As decisões são minhas.",
      note: "A demanda não era minha. Ela chegava dos fundadores, com investidor ou cliente marcado para ver a feature funcionando, em reuniões que apareciam sem aviso. O que era meu era transformar demanda em produto rodando em produção, correndo contra o relógio, sem quebrar a operação. É desse tipo toda decisão abaixo.",
    },
    indexLabel: "Decisões deste case",
    constraints: [
      {
        label: "Contexto",
        text: "Mais de 2.000 médicos entre hospitais e grupos, multi-tenant, e uma usuária primária, a escalista, que na melhor das hipóteses vinha de uma planilha.",
      },
      {
        label: "Restrição",
        text: "Demandas dos fundadores com prazo de reunião: a feature que o investidor precisava ver tinha que estar no ar, funcionando, e as reuniões apareciam sem aviso. Uma pessoa na maior parte do tempo; um desenvolvedor contratado por quatro meses.",
      },
    ],
    decisionsHeading: "Decisões",
    decisionsNote: "Quatro, e só o que tem prova anexada.",
    railLabel: "Ir para uma decisão",
    costLabel: "Custou",
    decisions: [
      {
        id: "d01",
        tension: { a: "Biblioteca pronta", b: "a tela da escalista" },
        design: {
          label: "Design",
          chose: "Reconstruir o calendário quando a biblioteca virou o gargalo, e não antes.",
          why: "Agrupar plantões por horário, cores de status e ações por plantão não cabiam no modelo pronto. A biblioteca foi a escolha certa até deixar de ser.",
        },
        code: {
          label: "Código",
          chose: "Calendário próprio em React, sem biblioteca de visões: agrupamento por horário, linguagem de status e ações por plantão.",
          why: "Menos visões que a biblioteca, controle total sobre a tela em que a escalista passa o dia.",
          authorship: "assisted",
        },
        proofCaption:
          "O calendário próprio, recriado: plantões agrupados por horário, cores de status, ações por plantão. Nada disso cabia na biblioteca em que esta tela começou.",
        cost: "Mais código para manter, e cada visão nova é nossa para construir.",
      },
      {
        id: "d02",
        tension: { a: "Configurável", b: "operável" },
        design: {
          label: "Design",
          chose: "Nenhuma tela de permissões: o gestor atribui um cargo, nunca uma matriz de checkboxes.",
          why: "Editar permissão era mais engenharia do que o gestor precisava, e margem para comprometer dado sensível. Escolhi proteger o usuário do erro.",
        },
        code: {
          label: "Código",
          chose: "4 cargos fixos com 36 permissões predefinidas no banco; o front esconde o que o cargo não pode, o BFF decide.",
          why: "Mudar permissão é decisão de produto: alteração no banco por PR, com preview do Supabase, homologação e release para produção.",
        },
        proofCaption:
          "O modal de acesso, recriado: um cargo, não uma matriz de checkboxes. A tela de permissões não existe de propósito.",
        cost: "Mudança de permissão nunca é um clique. Na época, eu só confiava esse caminho a mim mesmo.",
      },
      {
        id: "d03",
        tension: { a: "Permissão no banco", b: "permissão no BFF" },
        context:
          "O RBAC foi implementado pelo desenvolvedor contratado sob minha supervisão, a partir da minha especificação, em cerca de dois meses. Pronto, o sistema não comportou a complexidade e ficou lento demais para operar. Quando o contrato do desenvolvedor chegou ao fim, a feature de que os founders precisavam estava em homologação, sem funcionar, e eu estava sozinho com ela. Em dias, o diagnóstico: o RLS do Supabase verificava linha a linha o que o usuário podia ver.",
        design: {
          label: "Design",
          chose: "Manter os cargos e as 36 permissões exatamente como especificados: o problema não era o modelo de acesso, era onde ele rodava.",
          why: "Não previ que o RLS não aguentaria a complexidade; o erro foi meu, e a especificação sobreviveu a ele.",
        },
        code: {
          label: "Código",
          chose: "Supabase fechado atrás de chave de serviço; o BFF em Next API routes decide o que cada usuário vê, com as informações do usuário no JWT. Em dias, o RLS saiu do caminho.",
          why: "A lentidão era verificação linha a linha no banco. O filtro passou a ser feito uma vez, no BFF, e o tempo de carregamento despencou.",
          authorship: "assisted",
        },
        proofCaption:
          "O caminho do acesso, redesenhado: nenhuma consulta de dados sai do navegador. O Supabase Auth emite o JWT, com claims customizadas via Auth Hook; os dados ficam atrás de chave de serviço, e o BFF decide.",
        cost: "O banco deixou de ser a última linha de defesa: quem garante o acesso agora é o BFF, e essa responsabilidade é do código que mantemos.",
      },
      {
        id: "d04",
        tension: { a: "Ferramenta de design", b: "código direto" },
        design: {
          label: "Design",
          chose: "Nenhum Figma: fluxos e telas desenhados direto no código, contra a operação ao vivo.",
          why: "A feature tinha prazo de reunião. A coerência vinha do sistema: fontes, espaçamentos, larguras e hierarquia de cores definidos uma vez.",
        },
        code: {
          label: "Código",
          chose: "Primitivos do shadcn/ui copiados para o repositório e retokenizados; sem bold no produto inteiro, hierarquia por tamanho e cor.",
          why: "Uma única fonte variável, a Geologica; pesos finos mantêm leves as telas densas.",
        },
        proofCaption:
          "O sistema que manteve o design direto no código coerente: uma fonte variável, três pesos, nenhum bold; hierarquia por tamanho e cor.",
        cost: "Nenhum artefato explorável fora do produto, e onboarding mais difícil para o próximo designer.",
      },
    ],
    frontier: {
      label: "Onde fica a fronteira:",
      text: "a demanda era dos fundadores e o prazo era da reunião. Decidir o que virava plataforma e o que ficava travado no banco foi meu.",
    },
    outcome: {
      heading: "Resultado",
      measures: [
        { value: "0 → 1", label: "de ferramenta interna a plataforma em produção" },
        { value: "2.000+", label: "médicos cadastrados e geridos" },
        { value: "36", label: "permissões em 4 cargos, especificadas por mim" },
        { value: "0", label: "telas de permissões", mark: true },
      ],
      gaps: {
        label: "O que não foi medido, e o que falta",
        items: [
          "Impacto de negócio (tempo por escala, erro evitado): nunca medi. O que afirmo é escopo e escala, não número de resultado.",
          "A plataforma é interna e o código de produção é privado. A prova aqui é a recriação, e só o que ela consegue reproduzir.",
        ],
      },
    },
    evidence: {
      heading: "Evidência",
      items: [
        { kind: "link", label: "Recriação no ar", href: DEMO_URL, note: "vercel.app ↗" },
        {
          kind: "link",
          label: "Repositório da recriação",
          href: REPO_URL,
          note: "houston-III-demo ↗",
        },
        {
          kind: "fact",
          label: "Migrations PostgreSQL versionadas e CI/CD em cada release",
          note: "da plataforma real",
        },
        {
          kind: "fact",
          label:
            "Banco versionado pelo GitHub: cada PR cria um preview do Supabase; homologação e produção saem por release",
          note: "versionamento e rollback do banco",
        },
        {
          kind: "fact",
          label: "Todos os dados da recriação são fictícios",
          note: "o código de produção é privado",
        },
      ],
    },
    cta: {
      label: "Contato",
      heading: "Quer a história completa do Houston?",
      invite:
        "O redesenho do acesso, o calendário próprio, o modelo de cargos: fico feliz em detalhar qualquer parte.",
      action: "Fale comigo",
    },
    next: "Revoluna",
  },
};

/* --------------------------------- component --------------------------------- */

export function HoustonContent() {
  const t = COPY[useLocale()];

  /* A prova entra dentro da decisão que ela prova. As duas primeiras são
     as recriações que já existiam; as duas últimas são peças novas — o
     exhibit de arquitetura da d03 e o specimen do sistema da d04. */
  const proofs = [
    <HoustonScreen key="escala" screen="escala" />,
    <div
      key="access"
      className={cx(geologica.variable, "hst-app mx-auto w-full max-w-140 antialiased")}
      style={{ fontFamily: "var(--font-geologica), sans-serif" }}
    >
      <AccessControlEmbed />
    </div>,
    <AccessExhibit key="exhibit" />,
    <SystemSpecimen key="specimen" />,
  ];

  return (
    <CaseShell nextProject={{ href: "/work/revoluna", label: t.next }}>
      <CaseHero
        kicker={t.kicker}
        headline={t.headline}
        turn={t.turn}
        sub={t.sub}
        /* A capa do projeto, com o enquadramento da lista de trabalhos.
           A recriação viva não sai do case — desce para as decisões,
           onde ela é prova e não vitrine. */
        cover={{
          src: "/img/work-houston.png",
          alt: t.coverAlt,
          zoom: 1.02,
          fx: "62%",
          fy: "48%",
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
              <CaseProof caption={d.proofCaption}>{proofs[i]}</CaseProof>
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
