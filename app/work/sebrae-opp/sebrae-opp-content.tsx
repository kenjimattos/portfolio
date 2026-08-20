"use client";

import { ReactNode } from "react";
import Image from "next/image";
import {
  CaseContact,
  CaseDesignLanguage,
  CaseEm,
  CaseFeature,
  CaseFeatures,
  CaseHero,
  CaseLayout,
  CaseResults,
  CaseShowcase,
  CaseStory,
  SectionEyebrow,
} from "@/components/case-study/case-layout";
import { OppScreen } from "@/components/sebrae-demo/opp-frame";
import { GlassExhibit } from "@/components/sebrae-demo/glass-exhibit";
import { AgendasScreen } from "@/components/sebrae-demo/screens/agendas";
import { PanoramaScreen } from "@/components/sebrae-demo/screens/panorama";
import { RiscosScreen } from "@/components/sebrae-demo/screens/riscos";
import { FormuladorScreen } from "@/components/sebrae-demo/screens/formulador";
import { useLocale } from "@/lib/i18n";

const ACCENT = "#161726";
const ACCENT_INK = "#161726";
const ACCENT_TINT = "#EEEFF8";

const PAD_X = "clamp(24px, 8vw, 180px)";
const PAD_SECTION = "clamp(60px, 10vw, 120px)";

function TradeOff({ label, children }: { label: string; children: ReactNode }) {
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

/* ----------------------------------- copy ------------------------------------ */

type FeatureCopy = {
  title: string;
  text: string;
  secondary?: ReactNode;
  caption?: string;
};

type Copy = {
  chips: string[];
  headline: ReactNode;
  subtitle: string;
  roleTags: string[];
  links: { label: string; href: string }[];
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
    charsetCaption: string;
    paletteMeta: { category: string; name: string }[];
    glassLabel: string;
    glassText: string;
    statusLabel: string;
    statusPills: string[];
  };
  features: { eyebrow: string; intro: string; items: FeatureCopy[] };
  behind: {
    eyebrow: string;
    text: string;
    quoteAttribution: string;
    stackLabel: string;
  };
  contact: { heading: string; text: string };
};

const COPY: Record<"en" | "pt", Copy> = {
  en: {
    chips: ["2026", "Gov-tech · Public data", "Solo, end to end"],
    headline: (
      <>
        Sebrae OPP: scattered public data turned into{" "}
        <CaseEm>decisions for 223 municipalities</CaseEm>.
      </>
    ),
    subtitle:
      "An intelligence platform for Sebrae Paraíba that consolidates a dozen official sources into diagnosis, funding, training and a guided project writer, for every city in the state.",
    roleTags: ["Product", "UI/UX Design", "Front-end", "Back-end", "Data Engineering", "Design System"],
    links: [
      {
        label: "Open the live demo",
        href: "https://sebrae-12i10oz98-kenjimattos-1396s-projects.vercel.app/",
      },
      { label: "View on GitHub", href: "https://github.com/kenjimattos/sebrae-opp-snapshot" },
    ],
    showcase: {
      label: "Live recreation: the real screen",
      note: "Rebuilt in React for this case study · João Pessoa's indicators are real public data",
      caption:
        "All 223 municipalities drawn from real IBGE geometry as hand-written SVG. The product uses no map library, and neither does this recreation.",
    },
    results: {
      items: [
        { value: "223", label: "Municipalities of Paraíba, every one of them in a single platform" },
        { value: "13", label: "Official data sources unified by a 12k-line Python ETL pipeline" },
        { value: "0", label: "Chart or map libraries: every visualization hand-built in SVG and CSS" },
        { value: "1", label: "Person end to end: data, database, API, frontend and design system" },
      ],
      statement:
        "Built to be honest: an indicator only gets a traffic light when its official source publishes cutoffs; agendas get no aggregate color because no official band exists for one; low-sample averages are hidden instead of shown. Public data that refuses to lie pretty.",
      footnote:
        "Figures come from the real codebase and public documentation. Indicator values in the recreations are real public data for João Pessoa.",
    },
    story: {
      eyebrow: "From thirteen portals to one answer",
      headline: "Every indicator lived in a different portal, in a different format.",
      text: "RAIS, Receita Federal, Redesim, central bank tables, PNCP, IBGE, INEP: each with its own municipal code, its own layout, its own methodology. A small-town manager has no data team to reconcile them. OPP consolidates everything into one traceable model, organized around the Jornada do Município Empreendedor.",
      imageAlt: "Scattered public data sources: spreadsheets, portals, APIs, CSVs and PDF reports",
      imageCaption: "One indicator, many homes: spreadsheets, portals, APIs, CSVs, PDFs",
      personas: [
        {
          label: "Primary user",
          title: "The municipal manager",
          text: "Mayors and economic development secretaries, most without any data team, who need to know where their city stands and what to do next. The platform reads like an answer, not like a database.",
        },
        {
          label: "Also served",
          title: "Sebrae analysts",
          text: "The people advising those managers across all 223 municipalities, who need indicators that are comparable between cities and traceable to official sources and methodologies.",
        },
      ],
      cards: [
        {
          number: "01",
          title: "Refuse to lie",
          text: "Only indicators with officially published cutoffs get a traffic light: 6 of 22. Low-sample averages are suppressed, not displayed.",
        },
        {
          number: "02",
          title: "Rules live in the data",
          text: "Classification bands are stored per indicator in MongoDB and computed server-side, so the ruler changes without a deploy.",
        },
        {
          number: "03",
          title: "Zero visualization libraries",
          text: "Choropleth map, gauges and progress bars are hand-built SVG/CSS: 7 runtime dependencies, full design-token control.",
        },
        {
          number: "04",
          title: "Three layers, one person",
          text: "Python ETL → MongoDB → Fastify API → React 19, designed and shipped solo in about three months.",
        },
      ],
    },
    design: {
      intro:
        "All design here is mine, ported from a Figma design system into a token-driven setup: 16 composite type styles, semantic colors, spacing and dark mode as CSS variables. Gov-tech rarely looks like this on purpose: dark navy, electric lime, and a glass effect rebuilt from Figma's native material with CSS masks.",
      description:
        "Three typefaces, three jobs: Monoblock carries display numbers, titles and every button; Epic Pro ExtraBold anchors headlines; Intel One Mono sets all body text at weight 300. A mono-first system that makes data feel like the interface's native language.",
      charsetCaption: "Monoblock · display & buttons, with Epic Pro for headings and Intel One Mono for body",
      paletteMeta: [
        { category: "Accent", name: "Electric Lime" },
        { category: "Surface", name: "Deep Navy" },
        { category: "Surface", name: "Panel" },
      ],
      glassLabel: "Glass: Figma's native material, rebuilt in CSS",
      glassText:
        "The interface's surfaces use a glass material recreated from Figma's native effect: inner bevel shadows at a −45° light angle, backdrop blur, and a 1px diagonal stroke cut with mask-composite. No images, no libraries: it inherits the theme tokens like everything else.",
      statusLabel: "Semáforo: official cutoffs only",
      statusPills: ["SUCESSO", "ATENÇÃO", "ALERTA", "SEM FAIXA OFICIAL"],
    },
    features: {
      eyebrow: "Inside the platform",
      intro:
        "The screens below are recreated in React from the real product (dark theme, glass, hand-built visualizations), with João Pessoa's actual public indicators.",
      items: [
        {
          title: "Socioeconomic Panorama",
          text: "Twelve cards of economic fundamentals (PIB per capita, IDEB, GINI, formal wages, active companies), each with its variation and reference year, plus an AI-styled performance summary.",
          secondary: (
            <TradeOff label="Trade-off">
              Every variation renders in neutral white, never green or red. Without official
              metadata saying which direction is “better”, the product refuses to judge a number.
              The restraint is deliberate, and it is the same rule that governs the traffic
              lights.
            </TradeOff>
          ),
          caption: "Static recreation in React; indicator values are real public data for João Pessoa",
        },
        {
          title: "Strategic Risks",
          text: "Risks are not curated by hand: the platform extracts every indicator sitting in an alert or warning band for the selected municipality and sorts it by severity: the diagnosis becomes an agenda.",
          caption: "Static recreation in React; indicator values are real public data for João Pessoa",
        },
        {
          title: "Project Formulator",
          text: "A ten-step guided writer, from identification to governance, that turns diagnosis into a public project proposal, with per-municipality draft autosave and PDF export built on nothing but window.print.",
          caption: "Static recreation in React; fictional draft content",
        },
        {
          title: "One journey, four pillars",
          text: "The platform is organized as a journey: diagnose the business environment, map funding (R$ 4,1 bi in parliamentary amendments and public calls), build capacity with ~45 curated courses, then write the project.",
          secondary:
            "Each pillar is a plug-in panel behind a registry: adding a new mode is one component and one entry in an object.",
        },
      ],
    },
    behind: {
      eyebrow: "Behind the product",
      text: "The frontend is the visible tenth. Underneath: 27 Python ETL generators that tamed each source's quirks (RFB municipal codes that differ from IBGE's, company size living in a different table than the establishment), emitting idempotent MongoDB seeds, documented down to a per-source data dictionary for Sebrae's team to operate without me.",
      quoteAttribution: "From the ETL's own docstrings: every source's gotchas documented in code",
      stackLabel: "Stack",
    },
    contact: {
      heading: "Want the full story behind OPP?",
      text: "The ETL gotchas, the honesty rules, the hand-built map: happy to walk through any of it.",
    },
  },

  pt: {
    chips: ["2026", "Gov-tech · Dados públicos", "Solo, de ponta a ponta"],
    headline: (
      <>
        Sebrae OPP: dados públicos dispersos transformados em{" "}
        <CaseEm>decisões para 223 municípios</CaseEm>.
      </>
    ),
    subtitle:
      "Uma plataforma de inteligência para o Sebrae Paraíba que consolida mais de uma dezena de fontes oficiais em diagnóstico, recursos, capacitação e um formulador guiado de projetos, para cada cidade do estado.",
    roleTags: ["Produto", "UI/UX Design", "Front-end", "Back-end", "Engenharia de Dados", "Design System"],
    links: [
      {
        label: "Abrir o demo ao vivo",
        href: "https://sebrae-12i10oz98-kenjimattos-1396s-projects.vercel.app/",
      },
      { label: "Ver no GitHub", href: "https://github.com/kenjimattos/sebrae-opp-snapshot" },
    ],
    showcase: {
      label: "Recriação ao vivo: a tela real",
      note: "Recriado em React para este case · os indicadores de João Pessoa são dados públicos reais",
      caption:
        "Os 223 municípios desenhados a partir da geometria real do IBGE como SVG escrito à mão. O produto não usa biblioteca de mapa, e esta recriação também não.",
    },
    results: {
      items: [
        { value: "223", label: "Municípios da Paraíba, todos eles em uma única plataforma" },
        { value: "13", label: "Fontes oficiais unificadas por um ETL em Python de 12 mil linhas" },
        { value: "0", label: "Bibliotecas de gráfico ou mapa: cada visualização feita à mão em SVG e CSS" },
        { value: "1", label: "Pessoa de ponta a ponta: dados, banco, API, frontend e design system" },
      ],
      statement:
        "Construído para ser honesto: um indicador só ganha semáforo quando a fonte oficial publica cortes; agendas não têm cor agregada porque não existe faixa oficial para isso; médias com amostra baixa são ocultadas em vez de exibidas. Dados públicos que se recusam a mentir bonito.",
      footnote:
        "Os números vêm do código real e da documentação pública. Os valores de indicadores nas recriações são dados públicos reais de João Pessoa.",
    },
    story: {
      eyebrow: "De treze portais para uma resposta",
      headline: "Cada indicador vivia em um portal diferente, num formato diferente.",
      text: "RAIS, Receita Federal, Redesim, tabelas do Banco Central, PNCP, IBGE, INEP: cada um com seu código de município, seu layout, sua metodologia. Um gestor de cidade pequena não tem equipe de dados para reconciliar tudo isso. O OPP consolida tudo em um modelo rastreável, organizado em torno da Jornada do Município Empreendedor.",
      imageAlt: "Fontes de dados públicos dispersas: planilhas, portais, APIs, CSVs e relatórios em PDF",
      imageCaption: "Um indicador, muitas casas: planilhas, portais, APIs, CSVs, PDFs",
      personas: [
        {
          label: "Usuário principal",
          title: "O gestor municipal",
          text: "Prefeitos e secretários de desenvolvimento econômico, a maioria sem qualquer equipe de dados, que precisam saber onde a cidade está e o que fazer em seguida. A plataforma se lê como uma resposta, não como um banco de dados.",
        },
        {
          label: "Também atende",
          title: "Analistas do Sebrae",
          text: "Quem assessora esses gestores nos 223 municípios e precisa de indicadores comparáveis entre cidades e rastreáveis até as fontes e metodologias oficiais.",
        },
      ],
      cards: [
        {
          number: "01",
          title: "Recusar a mentira",
          text: "Só indicadores com cortes oficialmente publicados ganham semáforo: 6 de 22. Médias com amostra baixa são suprimidas, não exibidas.",
        },
        {
          number: "02",
          title: "Regras vivem nos dados",
          text: "As faixas de classificação ficam por indicador no MongoDB e são computadas no servidor, e a régua muda sem deploy.",
        },
        {
          number: "03",
          title: "Zero bibliotecas de visualização",
          text: "Mapa coroplético, medidores e barras de progresso feitos à mão em SVG/CSS: 7 dependências de runtime, controle total dos tokens.",
        },
        {
          number: "04",
          title: "Três camadas, uma pessoa",
          text: "ETL em Python → MongoDB → API Fastify → React 19, desenhado e entregue solo em cerca de três meses.",
        },
      ],
    },
    design: {
      intro:
        "Todo o design aqui é meu, portado de um design system no Figma para uma configuração guiada por tokens: 16 estilos compostos de tipografia, cores semânticas, espaçamento e dark mode como variáveis CSS. Gov-tech raramente tem essa cara de propósito: azul profundo, lima elétrico e um efeito de vidro reconstruído do material nativo do Figma com máscaras CSS.",
      description:
        "Três fontes, três papéis: a Monoblock carrega números de display, títulos e todos os botões; a Epic Pro ExtraBold ancora manchetes; a Intel One Mono compõe todo o corpo em peso 300. Um sistema mono-first que faz dado parecer a língua nativa da interface.",
      charsetCaption: "Monoblock · display & botões, com Epic Pro nos títulos e Intel One Mono no corpo",
      paletteMeta: [
        { category: "Acento", name: "Lima elétrico" },
        { category: "Superfície", name: "Azul profundo" },
        { category: "Superfície", name: "Painel" },
      ],
      glassLabel: "Glass: o material nativo do Figma, reconstruído em CSS",
      glassText:
        "As superfícies da interface usam um material de vidro recriado do efeito nativo do Figma: sombras de bisel internas com luz a −45°, backdrop blur e um traço diagonal de 1px cortado com mask-composite. Sem imagens, sem bibliotecas: ele herda os tokens do tema como tudo o mais.",
      statusLabel: "Semáforo: apenas cortes oficiais",
      statusPills: ["SUCESSO", "ATENÇÃO", "ALERTA", "SEM FAIXA OFICIAL"],
    },
    features: {
      eyebrow: "Por dentro da plataforma",
      intro:
        "As telas abaixo são recriadas em React a partir do produto real (tema escuro, glass, visualizações feitas à mão), com os indicadores públicos reais de João Pessoa.",
      items: [
        {
          title: "Panorama socioeconômico",
          text: "Doze cards de fundamentos econômicos (PIB per capita, IDEB, GINI, remuneração formal, empresas ativas), cada um com sua variação e ano de referência, além de um resumo de desempenho em estilo IA.",
          secondary: (
            <TradeOff label="Trade-off">
              Toda variação é renderizada em branco neutro, nunca verde ou vermelho. Sem
              metadados oficiais dizendo qual direção é “melhor”, o produto se recusa a julgar um
              número. A contenção é deliberada, e é a mesma regra que governa os semáforos.
            </TradeOff>
          ),
          caption: "Recriação estática em React; os valores são dados públicos reais de João Pessoa",
        },
        {
          title: "Riscos estratégicos",
          text: "Os riscos não são curados à mão: a plataforma extrai todo indicador em faixa de alerta ou atenção do município selecionado e ordena por severidade: o diagnóstico vira agenda.",
          caption: "Recriação estática em React; os valores são dados públicos reais de João Pessoa",
        },
        {
          title: "Formulador de projetos",
          text: "Um redator guiado em dez etapas, da identificação à governança, que transforma diagnóstico em proposta de projeto público, com rascunho salvo por município e exportação em PDF construída apenas com window.print.",
          caption: "Recriação estática em React; conteúdo do rascunho fictício",
        },
        {
          title: "Uma jornada, quatro pilares",
          text: "A plataforma se organiza como uma jornada: diagnosticar o ambiente de negócios, mapear recursos (R$ 4,1 bi em emendas parlamentares e editais), capacitar com ~45 cursos curados e, então, escrever o projeto.",
          secondary:
            "Cada pilar é um painel plugável atrás de um registry: adicionar um novo modo é um componente e uma entrada em um objeto.",
        },
      ],
    },
    behind: {
      eyebrow: "Por trás do produto",
      text: "O frontend é o décimo visível. Por baixo: 27 geradores de ETL em Python que domaram as manhas de cada fonte (código de município da RFB diferente do IBGE, porte da empresa morando em outra tabela que não a do estabelecimento), emitindo seeds idempotentes no MongoDB, documentados até um dicionário de dados por fonte para a equipe do Sebrae operar sem mim.",
      quoteAttribution: "Das docstrings do próprio ETL: as manhas de cada fonte documentadas em código",
      stackLabel: "Stack",
    },
    contact: {
      heading: "Quer a história completa do OPP?",
      text: "As manhas do ETL, as regras de honestidade, o mapa feito à mão: fico feliz em detalhar qualquer parte.",
    },
  },
};

/* --------------------------------- component --------------------------------- */

export function SebraeOppContent() {
  const t = COPY[useLocale()];

  const featureMedia: (ReactNode | undefined)[] = [
    <OppScreen key="panorama" path="/home · panorama socioeconômico">
      <PanoramaScreen />
    </OppScreen>,
    <OppScreen key="riscos" path="/home · riscos estratégicos">
      <RiscosScreen />
    </OppScreen>,
    <OppScreen key="formulador" path="/home · formulador de projetos">
      <FormuladorScreen />
    </OppScreen>,
    <div key="jornada" className="rounded-lg overflow-hidden">
      <Image
        quality={90}
        src="/img/sebrae/jornada.png"
        alt="Jornada do Município Empreendedor: the four-pillar navigation"
        width={1920}
        height={1200}
        className="w-full"
      />
    </div>,
  ];

  const features: CaseFeature[] = t.features.items.map((item, i) => ({
    number: `0${i + 1}`,
    title: item.title,
    text: item.text,
    secondaryText: item.secondary,
    caption: item.caption,
    layout: i === 3 ? "split" : undefined,
    media: featureMedia[i],
  }));

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
        <CaseShowcase
          label={t.showcase.label}
          note={t.showcase.note}
          caption={t.showcase.caption}
        >
          <OppScreen path="/home">
            <AgendasScreen />
          </OppScreen>
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
          src: "/img/sebrae/challenge.png",
          alt: t.story.imageAlt,
          width: 2420,
          height: 1460,
        }}
        imageCaption={t.story.imageCaption}
        personas={t.story.personas}
        cards={t.story.cards}
      />

      <CaseDesignLanguage
        intro={t.design.intro}
        fontFamily="var(--font-monoblock), monospace"
        typefaceName="Monoblock"
        weights={[{ label: "Bold", weight: 700 }]}
        description={t.design.description}
        charsetCaption={t.design.charsetCaption}
        palette={[
          {
            ...t.design.paletteMeta[0],
            hex: "#D4FE07",
            rgb: "(212, 254, 7)",
            bg: "#D4FE07",
            fg: "#161726",
          },
          {
            ...t.design.paletteMeta[1],
            hex: "#161726",
            rgb: "(22, 23, 38)",
            bg: "#161726",
            fg: "#FFFFFF",
          },
          {
            ...t.design.paletteMeta[2],
            hex: "#1A1C31",
            rgb: "(26, 28, 49)",
            bg: "#1A1C31",
            fg: "#FFFFFF",
          },
        ]}
        extra={
          <div className="mt-10">
            <span
              className="font-mono uppercase tracking-widest block mb-2"
              style={{ fontSize: "clamp(10px, 0.9vw, 12px)", color: ACCENT_INK }}
            >
              {t.design.glassLabel}
            </span>
            <p
              className="text-foreground leading-relaxed mb-4"
              style={{ fontSize: "clamp(13px, 1.2vw, 15px)", opacity: 0.65, maxWidth: "620px" }}
            >
              {t.design.glassText}
            </p>
            <GlassExhibit />
          </div>
        }
        statusPills={{
          label: t.design.statusLabel,
          pills: [
            { label: t.design.statusPills[0], cls: "bg-[#161726] text-[#40E629] border-[#40E629]/50" },
            { label: t.design.statusPills[1], cls: "bg-[#161726] text-[#F5E421] border-[#F5E421]/50" },
            { label: t.design.statusPills[2], cls: "bg-[#161726] text-[#F14635] border-[#F14635]/50" },
            { label: t.design.statusPills[3], cls: "bg-[#161726] text-white/50 border-white/25" },
          ],
        }}
      />

      <CaseFeatures eyebrow={t.features.eyebrow} intro={t.features.intro} features={features} />

      {/* --------------------------- behind the product --------------------------- */}
      <section
        className="animate-section w-full"
        style={{ padding: `${PAD_SECTION} ${PAD_X}`, opacity: 0 }}
      >
        <SectionEyebrow label={t.behind.eyebrow} />
        <p
          className="text-foreground leading-relaxed mb-10"
          style={{ fontSize: "clamp(15px, 1.4vw, 18px)", opacity: 0.7, maxWidth: "740px" }}
        >
          {t.behind.text}
        </p>

        <div
          className="rounded-lg p-8 font-mono"
          style={{ backgroundColor: "#161726", maxWidth: "860px" }}
        >
          <p style={{ fontSize: "clamp(12px, 1.1vw, 14px)", color: "#D4FE07", opacity: 0.9 }}>
            # gerar_seed_negocios_rfb_lake.py
          </p>
          <p
            className="mt-3 leading-relaxed"
            style={{ fontSize: "clamp(12px, 1.1vw, 14px)", color: "#fffff9", opacity: 0.75 }}
          >
            “MUNICÍPIO é o CÓDIGO DA RFB, NÃO o IBGE (≠ RAIS!). [...] SEM
            threshold (semáforo): contagem bruta, sem faixa oficial
            bom/atenção/alerta: <span style={{ color: "#D4FE07" }}>não inventamos cortes</span>.”
          </p>
          <p
            className="mt-4"
            style={{ fontSize: "clamp(10px, 1vw, 12px)", color: "#fffff9", opacity: 0.4 }}
          >
            {t.behind.quoteAttribution}
          </p>
        </div>

        <div className="mt-12">
          <span
            className="font-mono uppercase tracking-widest block mb-4"
            style={{ fontSize: "clamp(10px, 0.9vw, 12px)", color: ACCENT_INK }}
          >
            {t.behind.stackLabel}
          </span>
          <div className="flex flex-wrap gap-2">
            {[
              "React 19",
              "TypeScript",
              "Vite",
              "Tailwind CSS",
              "Fastify",
              "MongoDB",
              "Python",
              "BigQuery",
              "Nginx",
            ].map((tech) => (
              <span
                key={tech}
                className="px-3 py-1.5 rounded-sm font-mono"
                style={{
                  fontSize: "clamp(11px, 1vw, 13px)",
                  border: `1px solid color-mix(in srgb, ${ACCENT} 30%, transparent)`,
                  color: ACCENT_INK,
                  backgroundColor: "rgba(255, 255, 249, 0.5)",
                }}
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
      </section>

      <CaseContact heading={t.contact.heading} text={t.contact.text} email="kenjimattos@gmail.com" />
    </CaseLayout>
  );
}
