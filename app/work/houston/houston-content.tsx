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
} from "@/components/case-study/case-layout";
import { HoustonApp, HoustonPanel, HoustonScreen } from "@/components/houston-demo/houston-frame";
import { TeamsEmbed } from "@/components/houston-demo/embeds/teams";
import { AccessControlEmbed } from "@/components/houston-demo/embeds/access-control";
import { ScheduleBuilderEmbed } from "@/components/houston-demo/embeds/schedule-builder";
import { geologica } from "@/components/houston-demo/geologica";
import { useLocale } from "@/lib/i18n";

const ACCENT = "#1555AD";
const ACCENT_INK = "#1a365d";
const ACCENT_TINT = "#EDF4FF";

function Labeled({ label, children }: { label: string; children: ReactNode }) {
  return (
    <>
      <span
        className="font-mono uppercase tracking-widest block mb-2"
        style={{ fontSize: "clamp(10px, 0.9vw, 12px)", color: ACCENT_INK }}
      >
        {label}
      </span>
      {children}
    </>
  );
}

function TradeOff({ children }: { children: ReactNode }) {
  return <Labeled label="Trade-off">{children}</Labeled>;
}

/* --------------------------- shared, non-text data --------------------------- */

const SUPPORT_COLORS = [
  "#3B82F6", "#EF4444", "#10B981", "#F59E0B", "#8B5CFF", "#EC4899", "#14B8A6", "#F97316",
  "#6366F1", "#EF4675", "#06B6D4", "#84CC16", "#A855F7", "#F43F5E", "#22D3EE", "#FBB040",
  "#8B5CF6", "#F87171", "#34D399", "#FBBF24", "#C084FC", "#FB7185", "#67E8F9", "#FCD34D",
  "#6D28D9", "#DC2626", "#059669", "#D97706", "#7C3AED", "#BE185D", "#0891B2", "#CA8A04",
];

const STATUS_PILL_CLS = [
  "bg-gray-50 text-gray-700 border-gray-200",
  "bg-orange-50 text-orange-700 border-orange-200",
  "bg-red-50 text-red-700 border-red-200",
  "bg-yellow-50 text-yellow-700 border-yellow-200",
  "bg-blue-50 text-blue-700 border-blue-200",
  "bg-green-50 text-green-700 border-green-200",
];

/* ----------------------------------- copy ------------------------------------ */

type FeatureCopy = {
  title: string;
  text: string;
  secondary?: ReactNode;
  caption?: string;
  mediaNote?: string;
};

type Copy = {
  chips: string[];
  headline: ReactNode;
  subtitle: string;
  roleTags: string[];
  links: { label: string; href: string; hint?: string }[];
  showcase: { label: string; note: string; caption: string };
  results: { items: { value: string; label: string }[]; statement: string; footnote: string };
  story: {
    eyebrow: string;
    headline: string;
    text: string;
    imageAlt: string;
    imageCaption: string;
    personas: { label: string; title: string; text: string }[];
    cards: { number: string; title: string; text: string }[];
  };
  design: {
    intro: string;
    description: string;
    paletteMeta: { category: string; name: string }[];
    support: { label: string; text: string };
    statusLabel: string;
    statusPills: string[];
    weights: { label: string; weight: number }[];
  };
  features: { eyebrow: string; intro: string; items: FeatureCopy[] };
  evidence: { eyebrow: string; text: string; captions: string[]; alts: string[] };
  contact: { heading: string; text: string };
};

const COPY: Record<"en" | "pt", Copy> = {
  en: {
    chips: ["2025", "Health operations", "SaaS platform"],
    headline: (
      <>
        Houston: from internal tool to the{" "}
        <CaseEm>platform running medical shifts</CaseEm> at scale.
      </>
    ),
    subtitle:
      "The web platform hospitals and staffing teams use to plan schedules, approve candidates, control attendance and handle payments, all in one place.",
    roleTags: ["UI/UX Design", "Front-end", "Back-end", "Product", "Architecture", "Engineering"],
    links: [
      {
        label: "Open the live demo",
        href: "https://houston-demo.vercel.app/",
        hint: "demo@houston.local · demo123456",
      },
      { label: "View on GitHub", href: "https://github.com/kenjimattos/houston-III-demo" },
    ],
    showcase: {
      label: "Live recreation — explore it",
      note: "Rebuilt in React for this case study · Brazilian product, UI in Portuguese · fictional data",
      caption:
        "Use the sidebar to move between modules: dashboard, schedule, jobs, payments and reports are fully navigable.",
    },
    results: {
      items: [
        { value: "0 → 1", label: "Internal tool rebuilt into a production-grade platform" },
        { value: "2,000+", label: "Doctors registered and managed through the platform" },
        { value: "8", label: "Core modules covering the full lifecycle of a medical shift" },
        { value: "36", label: "Granular permissions across 4 roles in the multi-tenant access model" },
      ],
      statement:
        "All of it built from zero, with no admin template and no off-the-shelf UI kit. Today Houston runs the entire lifecycle of a medical shift as the operation’s single source of truth, with an experience that outclasses the incumbent tools in its market. Judge that claim yourself in the recreation above.",
      footnote:
        "Scope and operational figures above come from the real platform. Data shown inside the recreation is fictional.",
    },
    story: {
      eyebrow: "From tool to platform",
      headline: "A platform designed around operational clarity and scalability.",
      text: "Houston began as a simple support tool for job postings coming from the mobile app. As the operation grew, hiring teams needed visibility, control and automation across the entire lifecycle of medical shifts, so it was rebuilt into the platform above.",
      imageAlt: "Screenshot of the first version of Houston, a simple support tool",
      imageCaption: "Where it started: the previous version of Houston",
      personas: [
        {
          label: "Primary user",
          title: "The escalista",
          text: "The person who finds doctors and fills the schedule, often with little formal training and even less tooling: spreadsheets at best, sometimes not even that, where every update risks a silent error. Houston is designed around them first: plain vocabulary, one obvious way to do each task, mistakes that are hard to make.",
        },
        {
          label: "Also served",
          title: "Coordinators & managers",
          text: "The people who run escalista teams need the opposite altitude: a managerial and financial view of the operation: dashboards, reports and payroll across hospitals and groups.",
        },
      ],
      cards: [
        {
          number: "01",
          title: "Operational clarity first",
          text: "One vocabulary across scheduling, applications, attendance and payments, so operators never relearn the interface.",
        },
        {
          number: "02",
          title: "Rules live in the database",
          text: "Core business rules enforced at the PostgreSQL level, with a managed migration lifecycle.",
        },
        {
          number: "03",
          title: "Multi-tenant by structure",
          text: "Permissions enforced in the frontend and revalidated on the backend, never one without the other.",
        },
        {
          number: "04",
          title: "A team, not a hero",
          text: "Standards, reviews and CI/CD let a team of three ship fast as complexity grew.",
        },
      ],
    },
    design: {
      intro:
        "All design here is mine, end to end, and it never passed through a design tool. Under real delivery pressure, flows and screens were designed directly in code and iterated against the live operation. The system below is what kept that fast process coherent.",
      description:
        "A single variable typeface carries the whole platform. Thin weights keep dense operational screens light; regular anchors headings and metrics. There is no bold anywhere: hierarchy comes from size and color.",
      paletteMeta: [
        { category: "Primary", name: "Purple" },
        { category: "Neutral", name: "App Background" },
        { category: "Neutral", name: "Ink" },
      ],
      support: {
        label: "Support palette",
        text: "32 colors available when creating a grade. Each schedule keeps its color across the calendar, shift views and reports, with diverse hues tuned to sit comfortably next to the primary purple.",
      },
      statusLabel: "Status language",
      statusPills: ["ABERTA", "FECHADA", "URGENTE", "PENDENTE", "AUTORIZADO", "PAGO"],
      weights: [
        { label: "Thin", weight: 100 },
        { label: "Regular", weight: 400 },
        { label: "Medium", weight: 500 },
      ],
    },
    features: {
      eyebrow: "Inside the platform",
      intro:
        "Each module below is the real screen, recreated in React with fictional data: sort tables, flip months, expand reports.",
      items: [
        {
          title: "Operational Dashboard",
          text: "A real-time overview of open and filled shifts, pending applications, operational risk, and payroll totals, with global month-based filtering.",
          caption: "Interactive recreation with fictional data",
        },
        {
          title: "Schedule Builder",
          text: "An interactive grid-based interface for creating and managing medical schedules. Supports drag and drop creation, resizing, duplication, conflict detection, and batch publishing of shifts.",
          caption:
            "Live recreation, replayed on a loop: drag to create, resize, conflict rejected, publish. Conflict detection is the real logic.",
        },
        {
          title: "Shift Calendar",
          text: "Custom calendar views for weekly, monthly, and daily management, with quick actions, candidate assignment, and status tracking.",
          secondary: (
            <TradeOff>
              The calendar began on an off-the-shelf library and outgrew it: grouping shifts by
              time, status colors and per-shift actions didn’t fit its model. I rebuilt it from
              scratch (more code to own, fewer views) in exchange for full control over the
              screen escalistas spend their day in.
            </TradeOff>
          ),
          caption: "Interactive recreation with fictional data",
        },
        {
          title: "Job & Application Management",
          text: "Centralized management of job postings and applications with bulk actions, recurrence handling, and conflict validation.",
          caption: "Interactive recreation with fictional data",
        },
        {
          title: "Attendance & Payments",
          text: "Integrated check-in and check-out control with approval flows, payment authorization, and batch operations for large volumes of shifts.",
          secondary: (
            <Labeled label="Team">
              This module was built by the engineer I supervised. I owned the interface design and
              the review, they wrote the implementation.
            </Labeled>
          ),
          caption: "Interactive recreation with fictional data",
        },
        {
          title: "Reports & Insights",
          text: "Operational and financial reports covering payroll, productivity, schedules, and exports, with unified filtering across the platform.",
          caption: "Interactive recreation with fictional data",
        },
        {
          title: "Doctors & Teams",
          text: "Management of medical staff, teams, favorites, and pre-registered doctors, enabling faster assignments and better organization.",
          mediaNote: "Interactive recreation: search, favorite, expand",
        },
        {
          title: "Access Control & Permissions",
          text: "Role-based access control governs permissions across schedules, applications, attendance, and payments, a requirement that became core as Houston turned multi-tenant.",
          secondary: (
            <TradeOff>
              Rather than a free-form permission editor, Houston ships four fixed roles with their
              36 permissions predefined at the database level. Operators assign a cargo, never a
              checkbox matrix. We traded configurability for lower cognitive load and a safer
              daily operation: that’s why the modal beside has no permissions screen.
            </TradeOff>
          ),
          mediaNote: "Interactive recreation with fictional data",
        },
      ],
    },
    evidence: {
      eyebrow: "Behind the product",
      text: "The work you can’t click: pull-request driven reviews, business rules and migrations managed at the PostgreSQL level, and a CI/CD pipeline behind every release.",
      captions: [
        "Code review culture on GitHub",
        "Versioned PostgreSQL migrations",
        "CI/CD on every release",
      ],
      alts: [
        "Houston codebase and pull requests on GitHub",
        "PostgreSQL database migration files for Houston",
        "Houston CI/CD pipeline runs",
      ],
    },
    contact: {
      heading: "Want the full story behind Houston?",
      text: "Architecture decisions, trade-offs and what shipped when: happy to walk through any of it.",
    },
  },

  pt: {
    chips: ["2025", "Operações de saúde", "Plataforma SaaS"],
    headline: (
      <>
        Houston: de ferramenta interna à{" "}
        <CaseEm>plataforma que roda plantões médicos</CaseEm> em escala.
      </>
    ),
    subtitle:
      "A plataforma web que hospitais e equipes de escala usam para planejar escalas, aprovar candidatos, controlar presença e cuidar dos pagamentos, tudo em um só lugar.",
    roleTags: ["UI/UX Design", "Front-end", "Back-end", "Produto", "Arquitetura", "Engenharia"],
    links: [
      {
        label: "Abrir o demo ao vivo",
        href: "https://houston-demo.vercel.app/",
        hint: "demo@houston.local · demo123456",
      },
      { label: "Ver no GitHub", href: "https://github.com/kenjimattos/houston-III-demo" },
    ],
    showcase: {
      label: "Recriação ao vivo: explore",
      note: "Recriado em React para este case · dados fictícios",
      caption:
        "Use a barra lateral para navegar entre os módulos: painel, escala, vagas, pagamentos e relatórios são totalmente navegáveis.",
    },
    results: {
      items: [
        { value: "0 → 1", label: "Ferramenta interna reconstruída em plataforma de nível de produção" },
        { value: "2.000+", label: "Médicos cadastrados e geridos pela plataforma" },
        { value: "8", label: "Módulos centrais cobrindo o ciclo completo de um plantão médico" },
        { value: "36", label: "Permissões granulares em 4 cargos no modelo de acesso multi-tenant" },
      ],
      statement:
        "Tudo construído do zero, sem template de admin e sem UI kit pronto. Hoje o Houston roda o ciclo de vida completo de um plantão médico como fonte única de verdade da operação, com uma experiência que supera as ferramentas estabelecidas do mercado. Julgue essa afirmação você mesmo na recriação acima.",
      footnote:
        "O escopo e os números operacionais acima vêm da plataforma real. Os dados exibidos na recriação são fictícios.",
    },
    story: {
      eyebrow: "De ferramenta a plataforma",
      headline: "Uma plataforma desenhada em torno de clareza operacional e escalabilidade.",
      text: "O Houston nasceu como uma ferramenta simples de apoio às vagas publicadas no app mobile. Com o crescimento da operação, as equipes de contratação passaram a precisar de visibilidade, controle e automação sobre todo o ciclo de vida dos plantões, e ele foi reconstruído na plataforma acima.",
      imageAlt: "Captura de tela da primeira versão do Houston, uma ferramenta simples de apoio",
      imageCaption: "Onde tudo começou: a versão anterior do Houston",
      personas: [
        {
          label: "Usuário principal",
          title: "O escalista",
          text: "A pessoa que encontra médicos e preenche a escala, muitas vezes com pouca formação e menos ferramenta ainda: planilha na melhor das hipóteses, às vezes nem isso, onde cada atualização é um risco de erro silencioso. O Houston é desenhado primeiro para ela: vocabulário simples, um jeito óbvio de fazer cada tarefa, erros difíceis de cometer.",
        },
        {
          label: "Também atende",
          title: "Coordenadores & gestores",
          text: "Quem gere os escalistas precisa da altitude oposta: uma visão gerencial e financeira da operação: dashboards, relatórios e folha de pagamento por hospital e por grupo.",
        },
      ],
      cards: [
        {
          number: "01",
          title: "Clareza operacional primeiro",
          text: "Um único vocabulário em escalas, candidaturas, presença e pagamentos, e o operador nunca reaprende a interface.",
        },
        {
          number: "02",
          title: "Regras vivem no banco",
          text: "Regras de negócio centrais aplicadas no PostgreSQL, com ciclo de migrations versionado.",
        },
        {
          number: "03",
          title: "Multi-tenant por estrutura",
          text: "Permissões aplicadas no frontend e revalidadas no backend, nunca uma sem a outra.",
        },
        {
          number: "04",
          title: "Um time, não um herói",
          text: "Padrões, reviews e CI/CD permitiram que um time de três entregasse rápido mesmo com a complexidade crescendo.",
        },
      ],
    },
    design: {
      intro:
        "Todo o design aqui é meu, de ponta a ponta, e nunca passou por uma ferramenta de design. Sob pressão real de entrega, fluxos e telas foram desenhados direto no código e iterados contra a operação ao vivo. O sistema abaixo é o que manteve esse processo rápido coerente.",
      description:
        "Uma única fonte variável carrega a plataforma inteira. Pesos finos mantêm leves as telas operacionais densas; o regular ancora títulos e métricas. Não existe bold em lugar nenhum: a hierarquia vem de tamanho e cor.",
      paletteMeta: [
        { category: "Primária", name: "Roxo" },
        { category: "Neutra", name: "Fundo do app" },
        { category: "Neutra", name: "Tinta" },
      ],
      support: {
        label: "Paleta de apoio: identidade das grades",
        text: "32 cores disponíveis ao criar uma grade. Cada escala mantém sua cor no calendário, nas visões de plantão e nos relatórios, com matizes diversos afinados para conviver com o roxo primário.",
      },
      statusLabel: "Linguagem de status: a paleta em uso",
      statusPills: ["ABERTA", "FECHADA", "URGENTE", "PENDENTE", "AUTORIZADO", "PAGO"],
      weights: [
        { label: "Thin", weight: 100 },
        { label: "Regular", weight: 400 },
        { label: "Medium", weight: 500 },
      ],
    },
    features: {
      eyebrow: "Por dentro da plataforma",
      intro:
        "Cada módulo abaixo é a tela real, recriada em React com dados fictícios: ordene tabelas, troque de mês, expanda relatórios.",
      items: [
        {
          title: "Painel operacional",
          text: "Uma visão em tempo real de vagas abertas e preenchidas, candidaturas pendentes, risco operacional e totais de folha, com filtro global por mês.",
          caption: "Recriação interativa com dados fictícios",
        },
        {
          title: "Criação de escalas",
          text: "Uma grade interativa para criar e gerenciar escalas médicas. Suporta criação por arrastar e soltar, redimensionamento, duplicação, detecção de conflitos e publicação em lote de plantões.",
          caption:
            "Recriação ao vivo, em loop: arrastar para criar, redimensionar, conflito rejeitado, publicar. A detecção de conflito é a lógica real.",
        },
        {
          title: "Calendário de plantões",
          text: "Visões de calendário customizadas (semanal, mensal e diária) com ações rápidas, atribuição de candidatos e acompanhamento de status.",
          secondary: (
            <TradeOff>
              O calendário começou numa biblioteca pronta e cresceu além dela: agrupar plantões
              por horário, cores de status e ações por plantão não cabiam no modelo. Reconstruí do
              zero (mais código para manter, menos visões) em troca de controle total sobre a
              tela em que o escalista passa o dia.
            </TradeOff>
          ),
          caption: "Recriação interativa com dados fictícios",
        },
        {
          title: "Gestão de vagas e candidaturas",
          text: "Gestão centralizada de vagas e candidaturas com ações em lote, tratamento de recorrência e validação de conflitos.",
          caption: "Recriação interativa com dados fictícios",
        },
        {
          title: "Presença e pagamentos",
          text: "Controle integrado de check-in e check-out com fluxos de aprovação, autorização de pagamento e operações em lote para grandes volumes de plantões.",
          secondary: (
            <Labeled label="Time">
              Este módulo foi desenvolvido pelo engenheiro que eu supervisionava. O design da
              interface e a revisão do código foram meus, a implementação foi dele.
            </Labeled>
          ),
          caption: "Recriação interativa com dados fictícios",
        },
        {
          title: "Relatórios e insights",
          text: "Relatórios operacionais e financeiros cobrindo folha, produtividade, escalas e exportações, com filtros unificados em toda a plataforma.",
          caption: "Recriação interativa com dados fictícios",
        },
        {
          title: "Médicos e equipes",
          text: "Gestão do corpo clínico, equipes, favoritos e médicos pré-cadastrados, acelerando atribuições e melhorando a organização.",
          mediaNote: "Recriação interativa: busque, favorite, expanda",
        },
        {
          title: "Controle de acesso e permissões",
          text: "Controle de acesso por cargo governa as permissões em escalas, candidaturas, presença e pagamentos, um requisito que virou central quando o Houston se tornou multi-tenant.",
          secondary: (
            <TradeOff>
              Em vez de um editor livre de permissões, o Houston entrega quatro cargos fixos com
              suas 36 permissões predefinidas no banco. O operador atribui um cargo, nunca uma
              matriz de checkboxes. Trocamos configurabilidade por menos carga cognitiva e uma
              operação diária mais segura: por isso o modal ao lado não tem tela de permissões.
            </TradeOff>
          ),
          mediaNote: "Recriação interativa com dados fictícios",
        },
      ],
    },
    evidence: {
      eyebrow: "Por trás do produto",
      text: "O trabalho que não dá para clicar: reviews guiados por pull request, regras de negócio e migrations geridas no PostgreSQL, e um pipeline de CI/CD por trás de cada release.",
      captions: [
        "Cultura de code review no GitHub",
        "Migrations PostgreSQL versionadas",
        "CI/CD em cada release",
      ],
      alts: [
        "Código e pull requests do Houston no GitHub",
        "Arquivos de migration PostgreSQL do Houston",
        "Execuções do pipeline de CI/CD do Houston",
      ],
    },
    contact: {
      heading: "Quer a história completa do Houston?",
      text: "Decisões de arquitetura, trade-offs e o que foi entregue quando: fico feliz em detalhar qualquer parte.",
    },
  },
};

/* --------------------------------- component --------------------------------- */

export function HoustonContent() {
  const t = COPY[useLocale()];

  const featureMedia: { media: (c: FeatureCopy) => ReactNode; layout?: "split" }[] = [
    { media: () => <HoustonScreen screen="painel" /> },
    {
      media: () => (
        <HoustonPanel designWidth={1140}>
          <ScheduleBuilderEmbed />
        </HoustonPanel>
      ),
    },
    { media: () => <HoustonScreen screen="escala" /> },
    { media: () => <HoustonScreen screen="vagas" /> },
    { media: () => <HoustonScreen screen="pagamentos" /> },
    { media: () => <HoustonScreen screen="relatorios" /> },
    {
      layout: "split",
      media: (c) => (
        <div className="flex flex-col gap-3">
          <HoustonPanel designWidth={660}>
            <TeamsEmbed />
          </HoustonPanel>
          <span className="font-mono" style={{ fontSize: "clamp(10px, 0.9vw, 11px)", opacity: 0.5 }}>
            {c.mediaNote}
          </span>
        </div>
      ),
    },
    {
      layout: "split",
      media: (c) => (
        <div className="mx-auto w-full flex flex-col gap-3" style={{ maxWidth: 390 }}>
          <HoustonPanel designWidth={500}>
            <AccessControlEmbed />
          </HoustonPanel>
          <span className="font-mono" style={{ fontSize: "clamp(10px, 0.9vw, 11px)", opacity: 0.5 }}>
            {c.mediaNote}
          </span>
        </div>
      ),
    },
  ];

  const features: CaseFeature[] = t.features.items.map((item, i) => ({
    number: `0${i + 1}`,
    title: item.title,
    text: item.text,
    secondaryText: item.secondary,
    caption: item.caption,
    layout: featureMedia[i].layout,
    media: featureMedia[i].media(item),
  }));

  return (
    <CaseLayout
      accent={ACCENT}
      accentInk={ACCENT_INK}
      accentTint={ACCENT_TINT}
      nextProject={{ href: "/work/revoluna", label: "Revoluna" }}
    >
      <CaseHero
        chips={t.chips}
        headline={t.headline}
        subtitle={t.subtitle}
        roleTags={t.roleTags}
        links={t.links}
      >
        <CaseShowcase
          label={t.showcase.label}
          note={t.showcase.note}
          caption={t.showcase.caption}
        >
          <HoustonApp initialScreen="painel" />
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
        image={{
          src: "/img/houston/first-version.png",
          alt: t.story.imageAlt,
          width: 1210,
          height: 730,
        }}
        imageCaption={t.story.imageCaption}
        personas={t.story.personas}
        cards={t.story.cards}
      />

      <CaseDesignLanguage
        intro={t.design.intro}
        fontClassName={geologica.variable}
        fontFamily="var(--font-geologica), sans-serif"
        typefaceName="Geologica"
        weights={t.design.weights}
        description={t.design.description}
        palette={[
          {
            ...t.design.paletteMeta[0],
            hex: "#A369ED",
            rgb: "(163, 105, 237)",
            bg: "#A369ED",
            fg: "#FFFFFF",
          },
          {
            ...t.design.paletteMeta[1],
            hex: "#F3F3F3",
            rgb: "(243, 243, 243)",
            bg: "#F3F3F3",
            fg: "#18181B",
            border: "rgba(22, 22, 22, 0.08)",
          },
          {
            ...t.design.paletteMeta[2],
            hex: "#18181B",
            rgb: "(24, 24, 27)",
            bg: "#18181B",
            fg: "#FFFFFF",
          },
        ]}
        supportPalette={{
          label: t.design.support.label,
          text: t.design.support.text,
          colors: SUPPORT_COLORS,
        }}
        statusPills={{
          label: t.design.statusLabel,
          pills: t.design.statusPills.map((label, i) => ({ label, cls: STATUS_PILL_CLS[i] })),
        }}
      />

      <CaseFeatures eyebrow={t.features.eyebrow} intro={t.features.intro} features={features} />

      <CaseEvidence
        eyebrow={t.evidence.eyebrow}
        text={t.evidence.text}
        items={[
          {
            image: {
              src: "/img/houston/github.png",
              alt: t.evidence.alts[0],
              width: 1080,
              height: 742,
            },
            caption: t.evidence.captions[0],
          },
          {
            image: {
              src: "/img/houston/database.png",
              alt: t.evidence.alts[1],
              width: 1080,
              height: 796,
            },
            caption: t.evidence.captions[1],
          },
          {
            image: {
              src: "/img/houston/ci-cd.png",
              alt: t.evidence.alts[2],
              width: 1080,
              height: 595,
            },
            caption: t.evidence.captions[2],
          },
        ]}
        stack={[
          "React",
          "TypeScript",
          "Next.js",
          "Tailwind CSS",
          "shadcn/ui",
          "Supabase",
          "PostgreSQL",
          "CI/CD",
        ]}
      />

      <CaseContact heading={t.contact.heading} text={t.contact.text} email="kenjimattos@gmail.com" />
    </CaseLayout>
  );
}
