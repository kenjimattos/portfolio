"use client";

/* Sebrae OPP — o primeiro case no editorial de problema.
 *
 * O recorte é deliberado e está na primeira linha da página, em três
 * atribuições: a concepção (que problema de política pública a plataforma
 * ataca, quais indicadores importam, a Jornada do Município Empreendedor)
 * é do Sebrae e da equipe; a linguagem visual é do Lucas Nicolov; o que o
 * case reivindica é o problema de entrega — transformar um Figma sem
 * estrutura de handoff num sistema em código e viabilizar a plataforma.
 * Ceder o crédito da concepção e do visual não enfraquece o case — um
 * leitor experiente desconfia de portfólio que reivindica tudo.
 */

import {
  CaseCTA,
  CaseConstraints,
  CaseDecision,
  CaseDecisions,
  CaseEvidence,
  CaseFrontier,
  CaseHero,
  CaseOutcome,
  CaseProof,
  CaseSection,
  CaseShell,
  type EvidenceItem,
  type Tension,
} from "@/components/case-study/case-editorial";
import { OppScreen } from "@/components/sebrae-demo/opp-frame";
import { DsFoundation, DsSignature } from "@/components/sebrae-demo/design-system-exhibit";
import { AgendasScreen } from "@/components/sebrae-demo/screens/agendas";
import { PanoramaScreen } from "@/components/sebrae-demo/screens/panorama";
import { FormuladorScreen } from "@/components/sebrae-demo/screens/formulador";
import { useLocale } from "@/lib/i18n";

const DEMO_URL = "https://sebrae-12i10oz98-kenjimattos-1396s-projects.vercel.app/";
const REPO_URL = "https://github.com/kenjimattos/sebrae-opp-snapshot";

/* ----------------------------------- copy ----------------------------------- */

type Panel = { label: string; chose: string; why?: string; authorship?: "own" | "assisted" };

type Decision = {
  id: string;
  tension: Tension;
  design: Panel;
  code: Panel;
  cost: string;
  proofCaption?: string;
};

type Copy = {
  kicker: [string, string];
  headline: string;
  turn: string;
  sub: string;
  shotAlt: string;
  coverAlt: string;
  note: { cue: string; before: string; circled: string; after: string; href: string };
  role: { label: string; strong: string; text: string; note: string };
  indexLabel: string;
  constraints: { label: string; text: string }[];
  decisionsHeading: string;
  decisionsNote: string;
  railLabel: string;
  costLabel: string;
  decisions: Decision[];
  /* A prova da decisão 01 é um arco em três figuras: fundação (tokens,
     tipo, primitivos), peça-assinatura ampliada e a tela como o sistema
     em uso. As duas primeiras têm legenda própria; a terceira usa o
     proofCaption da própria decisão. */
  ds: { typeRoles: [string, string, string]; foundation: string; signature: string };
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
      "Sebrae OPP · 2026 · public policy observatory",
      "React 19 · TypeScript · Fastify · MongoDB · Python ETL",
    ],
    headline: "Sebrae knew which platform had to exist.",
    turn: "It just hadn't been built.",
    sub: "Seventeen sources, 223 municipalities, from the ETL to the design system, in about three months.",
    shotAlt: "Live React recreation · João Pessoa's real public data",
    coverAlt: "The OPP indicators screen on a laptop",
    /* A frase é o arco do PROJETO: começou sem nada e terminou como
       plataforma, com dado oficial e um modelo dentro. O laço cai no fim
       da frase, no que ela tem de mais difícil de acreditar — e a prova
       disso é a decisão 04, onde o modelo redige o texto e todo número
       vem do banco. */
    note: {
      cue: "Scroll",
      before: "From absolute zero to a platform with official data and an",
      circled: "embedded LLM",
      after: ".",
      href: "#d01",
    },
    role: {
      label: "My role",
      strong: "Design system, frontend, API, data modelling and ETL:",
      text: "the whole delivery, one person, about three months. Design rebuilt for handoff, organizing components, defining the tokens for color, spacing, typography and radius implemented in Tailwind. Created paired with AI a custom SVG map, the collection modelling and the Python ETL pipeline that reconciles seventeen official sources.",
      note: "The conception and the visual language aren't mine. Which public-policy problem the platform attacks, which indicators matter, and the Jornada do Município Empreendedor came from Sebrae and from the team. The visual language is Lucas Nicolov's, who sat closer to clients and users: the visuals and the experience were his, and he tested the first version in person. The Figma was visual exploration, not a handoff spec. What I own is the delivery problem: turning that visual into a system, and making a platform of this scope viable without inventing data and without bloating the stack. Every decision below is of that kind.",
    },
    indexLabel: "Decisions in this case",
    constraints: [
      {
        label: "Context",
        text: "223 municipalities in Paraíba, 22 socioeconomic indicators, an end user with no data team.",
      },
      {
        label: "Constraint",
        text: "One person on development, about three months, seventeen official data sources, and not all of them identify a municipality by its IBGE code.",
      },
    ],
    decisionsHeading: "Decisions",
    decisionsNote: "Four of them, and only what has proof attached.",
    railLabel: "Jump to a decision",
    costLabel: "Cost",
    decisions: [
      {
        id: "d01",
        tension: { a: "Ship fast", b: "own the token" },
        design: {
          label: "Design",
          chose: "Systematize before the screens: custom tokens, typography and primitives. No chart library, no map library.",
          why: "So that every visualization would obey the design system instead of resisting it.",
        },
        code: {
          label: "Code",
          chose: "Tokens as CSS variables, primitives in Tailwind; the choropleth of all 223 municipalities in plain SVG, from the IBGE GeoJSON.",
          why: "Custom lon/lat projection instead of a map library. 7 runtime dependencies.",
          authorship: "assisted",
        },
        proofCaption:
          "The system in use: the 223 municipalities drawn as SVG, and every colour on the choropleth is one of the tokens above, not a library default. This recreation uses no map library either.",
        cost: "No map interactions for free, and maintaining the SVG is on me.",
      },
      {
        id: "d02",
        tension: { a: "Ruler in the code", b: "ruler in the data" },
        design: {
          label: "Design",
          chose: "An indicator's classification is content, not behaviour.",
          why: "Whoever understands public policy has to be able to move the band without asking me.",
        },
        code: {
          label: "Code",
          chose: "Bands stored per indicator in MongoDB, computed server-side.",
          why: "The ruler changes without a deploy.",
        },
        cost: "One more layer to read for whoever opens the repo.",
      },
      {
        id: "d03",
        tension: { a: "Fill the screen", b: "don't invent a cutoff" },
        design: {
          label: "Design",
          chose: "A traffic light only where the official source publishes bands: 6 of 22 indicators.",
          why: "An average with a sample smaller than 30 is hidden instead of shown.",
        },
        code: {
          label: "Code",
          chose: "The rule lives in the ETL and in the API, not in the component.",
          why: "The screen has no way around it.",
        },
        proofCaption:
          "Every variation renders neutral. With no official metadata saying which direction is better, the product declines to judge the number. It is the same rule that governs the traffic lights.",
        cost: "16 indicators with no quick read, and an empty cell exactly for the small town, which is who needs it most. I chose empty over wrong.",
      },
      {
        id: "d04",
        tension: { a: "A useful LLM", b: "an LLM that invents numbers" },
        design: {
          label: "Design",
          chose: "The policy writer drafts the text; the numbers come from the database.",
        },
        code: {
          label: "Code",
          chose: "Guardrails in the prompt and in how the payload is assembled.",
        },
        proofCaption:
          "Ten guided steps, from identification to governance. Every figure in the draft is read from the municipality's record, never written by the model.",
        cost: "Less fluid text. Not one invented number in a product built for public decisions.",
      },
    ],
    ds: {
      typeRoles: ["display & buttons", "h1", "body"],
      foundation:
        "8 color tokens, 3 typefaces and the primitives built on them: everything the screens on this page use. Nothing here is an illustration: these are the real components, rendered live.",
      signature:
        "The signature piece, enlarged: the square marker carries the bar's full gradient, offset by its own position: that's how it samples the exact colour of the value. The real component under zoom, not a redrawing.",
    },
    frontier: {
      label: "Where the line sits:",
      text: "the ruler belongs to the official source. Deciding not to invent a cutoff when it doesn't exist was mine, in the code.",
    },
    outcome: {
      heading: "Result",
      measures: [
        { value: "223", label: "municipalities, all of Paraíba" },
        { value: "22", label: "indicators unified" },
        { value: "17", label: "data sources reconciled" },
        { value: "0", label: "chart or map libraries at runtime", mark: true },
      ],
      gaps: {
        label: "What wasn't measured, and what's missing",
        items: [
          "Adoption, and effect on public decisions: I have no number for either.",
          "The repository has no tests, and the classification ruler is exactly what should be under test.",
        ],
      },
    },
    evidence: {
      heading: "Evidence",
      items: [
        { kind: "link", label: "Live platform", href: DEMO_URL, note: "vercel.app ↗" },
        {
          kind: "link",
          label: "Repository on GitHub",
          href: REPO_URL,
          note: "sebrae-opp-snapshot ↗",
        },
        {
          kind: "fact",
          label: "GeoJSON of the 223 municipalities",
          note: "IBGE, public source",
        },
        {
          kind: "fact",
          label: "Python ETL: 29 generators, one data dictionary per source",
          note: "so the team operates without me",
        },
      ],
    },
    cta: {
      label: "Contact",
      heading: "Want the full story behind OPP?",
      invite:
        "The ETL gotchas, the honesty rules, the plain-SVG map: happy to walk through any of it.",
      action: "Get in touch",
    },
    next: "Finance",
  },

  pt: {
    kicker: [
      "Sebrae OPP · 2026 · observatório de política pública",
      "React 19 · TypeScript · Fastify · MongoDB · ETL em Python",
    ],
    headline: "O Sebrae sabia qual plataforma precisava existir.",
    turn: "Faltava construí-la.",
    sub: "Dezessete fontes, 223 municípios, do ETL ao design system, em cerca de três meses.",
    shotAlt: "Recriação em React · dados públicos reais de João Pessoa",
    coverAlt: "A tela de indicadores do OPP num notebook",
    note: {
      cue: "Role",
      before: "Do zero absoluto a uma plataforma com dados oficiais e",
      circled: "LLM embarcada",
      after: ".",
      href: "#d01",
    },
    role: {
      label: "Meu papel",
      strong: "Design system, frontend, API, modelagem de dados e ETL:",
      text: "a entrega inteira, uma pessoa, cerca de três meses. Reconstruí o design para handoff, organizei os componentes e defini os tokens de cor, espaçamento, tipografia e raio, e implementei o sistema em Tailwind. Implementei  com IA a construção do mapa em SVG, a modelagem das coleções e o pipeline em Python.",
      note: "A concepção e a linguagem visual não são minhas. Que problema de política pública a plataforma ataca, quais indicadores importam e a Jornada do Município Empreendedor são do Sebrae e da equipe. A linguagem visual é do Lucas Nicolov, que ficava mais perto dos clientes e usuários: dele eram o visual e a experiência, e ele testou a primeira versão presencialmente. O Figma era exploração visual, não especificação de handoff. O que é meu é o problema de entrega: transformar esse visual num sistema, e viabilizar uma plataforma desse escopo sem inventar dado e sem inchar a stack. É desse tipo toda decisão abaixo.",
    },
    indexLabel: "Decisões deste case",
    constraints: [
      {
        label: "Contexto",
        text: "223 municípios da Paraíba, 22 indicadores socioeconômicos, usuário final sem time de dados.",
      },
      {
        label: "Restrição",
        text: "Uma pessoa no desenvolvimento, cerca de três meses, dezessete fontes de dados oficiais, e nem todas identificam o município pelo código do IBGE.",
      },
    ],
    decisionsHeading: "Decisões",
    decisionsNote: "Quatro, e só o que tem prova anexada.",
    railLabel: "Ir para uma decisão",
    costLabel: "Custou",
    decisions: [
      {
        id: "d01",
        tension: { a: "Entregar rápido", b: "controlar o token" },
        design: {
          label: "Design",
          chose: "Sistematizar antes das telas: tokens, tipografia e primitivos próprios. Nenhuma biblioteca de gráfico ou de mapa.",
          why: "Para que toda visualização obedecesse ao design system em vez de resistir a ele.",
        },
        code: {
          label: "Código",
          chose: "Tokens em variáveis CSS, primitivos em Tailwind; o coroplético dos 223 municípios em SVG puro, a partir do GeoJSON do IBGE.",
          why: "Projeção lon/lat própria em vez de biblioteca de mapa. 7 dependências de runtime.",
          authorship: "assisted",
        },
        proofCaption:
          "O sistema em uso: os 223 municípios desenhados em SVG, e cada cor do coroplético é um dos tokens acima, não um default de biblioteca. Esta recriação também não usa biblioteca de mapa.",
        cost: "Nenhuma interação de mapa de graça, e a manutenção do SVG é minha.",
      },
      {
        id: "d02",
        tension: { a: "Régua no código", b: "régua no dado" },
        design: {
          label: "Design",
          chose: "A classificação de cada indicador é conteúdo, não comportamento.",
          why: "Quem entende de política pública precisa poder mudar a faixa sem me pedir.",
        },
        code: {
          label: "Código",
          chose: "Faixas por indicador no MongoDB, computadas no servidor.",
          why: "A régua muda sem deploy.",
        },
        cost: "Uma camada a mais de leitura para quem abre o repo.",
      },
      {
        id: "d03",
        tension: { a: "Preencher a tela", b: "não inventar corte" },
        design: {
          label: "Design",
          chose: "Semáforo só onde a fonte oficial publica faixa: 6 de 22 indicadores.",
          why: "Média com amostra menor que 30 fica oculta em vez de exibida.",
        },
        code: {
          label: "Código",
          chose: "A regra vive no ETL e na API, não no componente.",
          why: "A tela não tem como contornar.",
        },
        proofCaption:
          "Toda variação é renderizada em tom neutro. Sem metadado oficial dizendo qual direção é melhor, o produto se recusa a julgar o número. É a mesma regra que governa os semáforos.",
        cost: "16 indicadores sem leitura rápida, e célula vazia justamente para a cidade pequena, que é quem mais precisa. Escolhi vazio a errado.",
      },
      {
        id: "d04",
        tension: { a: "LLM útil", b: "LLM que inventa número" },
        design: {
          label: "Design",
          chose: "O formulador redige o texto; os números vêm do banco.",
        },
        code: {
          label: "Código",
          chose: "Guardrails no prompt e na montagem do payload.",
        },
        proofCaption:
          "Dez etapas guiadas, da identificação à governança. Todo número do rascunho é lido do registro do município, nunca escrito pelo modelo.",
        cost: "Texto menos fluido. Nenhum número inventado num produto de decisão pública.",
      },
    ],
    ds: {
      typeRoles: ["display e botões", "h1", "corpo"],
      foundation:
        "8 tokens de cor, 3 famílias tipográficas e os primitivos construídos sobre eles: tudo que as telas desta página usam. Nada aqui é ilustração: são os componentes reais, renderizados ao vivo.",
      signature:
        "A peça-assinatura, ampliada: o marcador quadrado carrega o gradiente inteiro da barra, deslocado pela própria posição: é assim que ele amostra a cor exata do valor. O componente real em zoom, não um redesenho.",
    },
    frontier: {
      label: "Onde fica a fronteira:",
      text: "a régua é da fonte oficial. A decisão de não inventar corte quando ela não existe foi minha, no código.",
    },
    outcome: {
      heading: "Resultado",
      measures: [
        { value: "223", label: "municípios, a Paraíba inteira" },
        { value: "22", label: "indicadores unificados" },
        { value: "17", label: "fontes de dados reconciliadas" },
        { value: "0", label: "bibliotecas de gráfico ou mapa em runtime", mark: true },
      ],
      gaps: {
        label: "O que não foi medido, e o que falta",
        items: [
          "Adoção e efeito em decisão pública: não tenho número de nenhum dos dois.",
          "O repositório não tem teste, e a régua de classificação é exatamente o que deveria estar sob teste.",
        ],
      },
    },
    evidence: {
      heading: "Evidência",
      items: [
        { kind: "link", label: "Plataforma no ar", href: DEMO_URL, note: "vercel.app ↗" },
        {
          kind: "link",
          label: "Repositório no GitHub",
          href: REPO_URL,
          note: "sebrae-opp-snapshot ↗",
        },
        {
          kind: "fact",
          label: "GeoJSON dos 223 municípios",
          note: "IBGE, fonte pública",
        },
        {
          kind: "fact",
          label: "ETL em Python: 29 geradores, um dicionário de dados por fonte",
          note: "para a equipe operar sem mim",
        },
      ],
    },
    cta: {
      label: "Contato",
      heading: "Quer a história completa do OPP?",
      invite:
        "As manhas do ETL, as regras de honestidade, o mapa em SVG puro: fico feliz em detalhar qualquer parte.",
      action: "Fale comigo",
    },
    next: "Finance",
  },
};

/* --------------------------------- component --------------------------------- */

export function SebraeOppContent() {
  const t = COPY[useLocale()];

  /* A decisão 01 é sobre a visualização obedecer ao design system, então a
     prova dela é o próprio sistema, em arco: a fundação (tokens, tipo,
     primitivos), a peça-assinatura em close e, fechando, a tela — o mapa
     deixou de ser a prova e virou o finale, o sistema em uso, ao lado dos
     indicadores que ele colore. */
  const dsProof = (
    <>
      <CaseProof caption={t.ds.foundation}>
        <DsFoundation typeRoles={t.ds.typeRoles} />
      </CaseProof>
      <CaseProof caption={t.ds.signature}>
        <DsSignature />
      </CaseProof>
    </>
  );

  /* A prova entra dentro da decisão que ela prova, na ordem das decisões.
     A 02 não tem tela: é uma decisão de modelagem, e inventar uma
     ilustração para ela seria decoração. */
  const proofs = [
    <OppScreen key="agendas" path="/home" flat>
      <AgendasScreen />
    </OppScreen>,
    null,
    <OppScreen key="panorama" path="/home · panorama socioeconômico" flat>
      <PanoramaScreen />
    </OppScreen>,
    <OppScreen key="formulador" path="/home · formulador de projetos" flat>
      <FormuladorScreen />
    </OppScreen>,
  ];

  return (
    <CaseShell nextProject={{ href: "/work/finance", label: t.next }}>
      <CaseHero
        kicker={t.kicker}
        headline={t.headline}
        turn={t.turn}
        sub={t.sub}
        /* A capa do projeto, com o enquadramento da lista de trabalhos.
           A tela dentro dela ainda é a recriação em React com os dados
           reais de João Pessoa — composta sobre o mockup, não screenshot.
           A recriação viva não sai do case: desce para as decisões, onde
           ela é prova e não vitrine. */
        cover={{
          src: "/img/work-sebrae-opp.png",
          alt: t.coverAlt,
          zoom: 1,
          fx: "58%",
          fy: "50%",
        }}
        mediaTag={t.shotAlt}
        note={t.note}
        role={t.role}
      >
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
              design={d.design}
              code={d.code}
              cost={d.cost}
              costLabel={t.costLabel}
            >
              {d.id === "d01" ? dsProof : null}
              {d.proofCaption && proofs[i] ? (
                <CaseProof caption={d.proofCaption}>{proofs[i]}</CaseProof>
              ) : null}
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
