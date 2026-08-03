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
import { geologica } from "@/components/houston-demo/geologica";
import { PhoneFrame } from "@/components/revoluna-demo/phone-frame";
import { CheckinScreen } from "@/components/revoluna-demo/screens/checkin";
import { EscalasScreen } from "@/components/revoluna-demo/screens/escalas";
import { ExploreScreen } from "@/components/revoluna-demo/screens/explore";
import { LockScreen } from "@/components/revoluna-demo/screens/lockscreen";
import { PlantoesScreen } from "@/components/revoluna-demo/screens/plantoes";
import { VagaScreen } from "@/components/revoluna-demo/screens/vaga";
import { useLocale } from "@/lib/i18n";

const ACCENT = "#7E3CD0";
const ACCENT_INK = "#461A80";
const ACCENT_TINT = "#F5EDFF";

function TradeOff({ children }: { children: ReactNode }) {
  return (
    <>
      <span
        className="font-mono uppercase tracking-widest block mb-2"
        style={{ fontSize: "clamp(10px, 0.9vw, 12px)", color: ACCENT_INK }}
      >
        Trade-off
      </span>
      {children}
    </>
  );
}

function Phone({
  children,
  time,
  dark,
}: {
  children: React.ReactNode;
  time?: string;
  dark?: boolean;
}) {
  return (
    <div className="mx-auto w-full max-w-95">
      <PhoneFrame time={time} darkStatusBar={dark}>
        {children}
      </PhoneFrame>
    </div>
  );
}

/* ----------------------------------- copy ------------------------------------ */

type FeatureCopy = { title: string; text: string; secondary?: ReactNode };

type Copy = {
  chips: string[];
  headline: ReactNode;
  subtitle: string;
  roleTags: string[];
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
    statusLabel: string;
    statusPills: string[];
  };
  features: { eyebrow: string; intro: string; items: FeatureCopy[] };
  evidence: { eyebrow: string; text: string; captions: string[]; alts: string[] };
  contact: { heading: string; text: string };
};

const COPY: Record<"en" | "pt", Copy> = {
  en: {
    chips: ["Health-tech · Mobile", "Solo design → both stores", "v2.3.2 · 38 builds"],
    headline: (
      <>
        Revoluna: medical shifts out of WhatsApp chaos,{" "}
        <CaseEm>into an app doctors run their month on</CaseEm>.
      </>
    ),
    subtitle:
      "A marketplace and management app for medical shifts in Brazil. I redesigned the product and shipped the MVP myself — no-code where it's fast, custom Dart where it counts — through 38 releases on the App Store and Google Play.",
    roleTags: ["Product Design", "UI/UX Design", "Prototype", "Mobile", "Front-end", "Back-end"],
    showcase: {
      label: "Live recreation — the real screens",
      note: "Rebuilt in React for this case study · fictional data",
      caption:
        "Discovery, shift detail and schedule — the three screens a doctor lives in, recreated from the shipped app.",
    },
    results: {
      items: [
        { value: "38", label: "Releases shipped to the App Store and Google Play — v2.3.2 today" },
        { value: "100 m", label: "Geofence radius validating every check-in against the hospital" },
        { value: "27", label: "Custom Dart actions where no-code ended: geofence, deep links, push, OTP" },
        { value: "1", label: "Designer-engineer from the Figma redesign to store publishing" },
      ],
      statement:
        "The MVP replaced informal WhatsApp workflows with a structured, production-ready experience — doctors manage shifts, schedules and payments in one place, and every check-in carries geolocated proof of presence. Real usage validated the product and funded its next phase: a dedicated web platform for operations.",
      footnote:
        "Figures from the real codebase and changelog. All screens on this page are React recreations with fictional data.",
    },
    story: {
      eyebrow: "From WhatsApp groups to one app",
      headline: "Shifts lived in group chats — scattered, incomplete, impossible to track.",
      text: "Medical shifts in Brazil are shared through unstructured channels: information scattered across group chats, applications lost in threads, payments tracked from memory. Doctors juggled all of it by hand while hiring teams ran manual, error-prone workflows. I joined as a Product Designer to redesign the experience — and took ownership of shipping it, so the team could validate the product with real users instead of prototypes.",
      imageAlt: "Screenshot of the first version of the Revoluna app",
      imageCaption: "The product I inherited — the app's first version",
      personas: [
        {
          label: "Primary user",
          title: "The doctor on shift",
          text: "Finds opportunities, applies, proves presence and gets paid — often across several hospitals in the same week. The app turns that scatter into one structured routine, from discovery to check-out.",
        },
        {
          label: "Also served",
          title: "The hiring team",
          text: "Publishes shifts, reviews candidates and closes payroll. Geolocated check-in records replaced phone calls and spreadsheets as the source of truth for who actually worked.",
        },
      ],
      cards: [
        {
          number: "01",
          title: "Redesign, then validate",
          text: "A new design system in Figma, translated into a working MVP — decisions tested with doctors on real shifts, not with mockups.",
        },
        {
          number: "02",
          title: "No-code where it's fast, code where it counts",
          text: "FlutterFlow for screen velocity; 27 custom Dart actions and 5 custom widgets for what it can't do — geofencing, deep links, push, OTP, calendar.",
        },
        {
          number: "03",
          title: "Presence you can trust",
          text: "Check-in and check-out validated by a Haversine distance check within 100 m of the hospital — with geolocated records for payroll.",
        },
        {
          number: "04",
          title: "Own the shipping",
          text: "Store review cycles, versioned changelogs, 38 builds across both stores — the unglamorous half of mobile, done with discipline.",
        },
      ],
    },
    design: {
      intro:
        "The redesign replaced the inherited visual noise with a calm system: one typeface, one purple, generous white. All of it is mine — from the Figma component library to the shipped screens.",
      description:
        "One variable typeface does every job — a deliberate choice for a small product: fewer moving parts, one consistent rhythm, and Geologica's rounded warmth softens a clinical domain.",
      charsetCaption: "Geologica — the app's only typeface",
      paletteMeta: [
        { category: "Accent", name: "Revoluna Purple" },
        { category: "Accent", name: "Deep Purple" },
        { category: "Support", name: "Sky Cyan" },
        { category: "Surface", name: "Lavender Tint" },
      ],
      statusLabel: "System feedback — no clinical red/green",
      statusPills: ["SUCESSO", "ATENÇÃO", "ERRO"],
    },
    features: {
      eyebrow: "Inside the app",
      intro:
        "The screens below are recreated in React from the shipped app — same layout, same type, same purple — with fictional shifts and people.",
      items: [
        {
          title: "Structured discovery",
          text: "Doctors browse open shifts by specialty, sorted by publication, date, value, distance or upfront payment. Every card answers what a WhatsApp post never did: how much, which sector, how far, how fresh.",
        },
        {
          title: "The whole shift, before applying",
          text: "One sheet with everything that matters: schedule, sector, requirements, directions, payment terms and who is hiring — plus quick actions to save, share, add to the calendar or transfer the shift to a colleague.",
          secondary:
            "Deep links generated from the web admin or the app itself open this exact sheet in-app. Sharing still happens on WhatsApp — but the destination is structured now.",
        },
        {
          title: "A month at a glance",
          text: "A calendar of confirmed, pending and canceled shifts — and, for each day, the full team on duty. Doctors see which colleagues share the same shift before they even leave home.",
        },
        {
          title: "Check-in with proof",
          text: "Reminders guide doctors through check-in and check-out within defined time windows. Validation only completes within 100 meters of the hospital, giving payroll a geolocated record of every shift actually worked.",
          secondary: (
            <TradeOff>
              Presence is a single cached location fix and a Haversine check on the device — no
              continuous tracking. Doctors&apos; batteries and privacy outweighed a richer audit
              trail; and outside the time window the app asks for a written justification instead
              of hard-blocking the check-in.
            </TradeOff>
          ),
        },
        {
          title: "The app that comes to you",
          text: "Push notifications built on Firebase Cloud Messaging cover the whole lifecycle: application updates, schedule alerts, check-in and check-out reminders, and payment notices when a shift closes.",
        },
        {
          title: "An application pipeline",
          text: "Saved, under review, confirmed — every application has a visible status, filterable by hospital and date. The answer to “did they pick me?” stopped living in someone else's chat.",
        },
      ],
    },
    evidence: {
      eyebrow: "Design ownership",
      text: "The system existed in Figma before a line of the app was touched — components, tokens and every high-fidelity flow — and it kept both artifacts in sync until the stores had the real thing.",
      captions: [
        "Component library in Figma",
        "High-fidelity flows",
        "Live on the App Store and Google Play",
      ],
      alts: [
        "Revoluna component library in Figma",
        "Revoluna high-fidelity designs in Figma",
        "Revoluna listing on the App Store and Google Play",
      ],
    },
    contact: {
      heading: "Want the full story behind Revoluna?",
      text: "The geofence trade-offs, the no-code boundary, the store-publishing war stories — happy to walk through any of it.",
    },
  },

  pt: {
    chips: ["Health-tech · Mobile", "Design solo → as duas lojas", "v2.3.2 · 38 builds"],
    headline: (
      <>
        Revoluna: plantões médicos fora do caos do WhatsApp,{" "}
        <CaseEm>dentro de um app em que o médico organiza o mês</CaseEm>.
      </>
    ),
    subtitle:
      "Um marketplace e gestor de plantões médicos no Brasil. Eu redesenhei o produto e lancei o MVP sozinho — no-code onde é rápido, Dart customizado onde importa — ao longo de 38 releases na App Store e no Google Play.",
    roleTags: ["Product Design", "UI/UX Design", "Protótipo", "Mobile", "Front-end", "Back-end"],
    showcase: {
      label: "Recriação ao vivo — as telas reais",
      note: "Recriado em React para este case · dados fictícios",
      caption:
        "Descoberta, detalhe da vaga e agenda — as três telas em que o médico vive, recriadas do app publicado.",
    },
    results: {
      items: [
        { value: "38", label: "Releases publicados na App Store e no Google Play — v2.3.2 hoje" },
        { value: "100 m", label: "Raio do geofence que valida cada check-in contra o hospital" },
        { value: "27", label: "Custom actions em Dart onde o no-code acabou: geofence, deep links, push, OTP" },
        { value: "1", label: "Designer-engenheiro do redesign no Figma à publicação nas lojas" },
      ],
      statement:
        "O MVP substituiu fluxos informais de WhatsApp por uma experiência estruturada e pronta para produção — médicos gerenciam plantões, agenda e pagamentos em um só lugar, e cada check-in carrega prova de presença geolocalizada. O uso real validou o produto e financiou a fase seguinte: uma plataforma web dedicada à operação.",
      footnote:
        "Números do código e do changelog reais. Todas as telas desta página são recriações em React com dados fictícios.",
    },
    story: {
      eyebrow: "Dos grupos de WhatsApp para um app",
      headline: "Plantões viviam em grupos de chat — dispersos, incompletos, impossíveis de rastrear.",
      text: "Plantões médicos no Brasil circulam por canais desestruturados: informação espalhada em grupos, candidaturas perdidas em threads, pagamentos controlados de memória. Médicos faziam malabarismo com tudo isso na mão, enquanto as equipes de contratação rodavam fluxos manuais e sujeitos a erro. Entrei como Product Designer para redesenhar a experiência — e assumi a entrega, para que o time validasse o produto com usuários reais em vez de protótipos.",
      imageAlt: "Captura de tela da primeira versão do app Revoluna",
      imageCaption: "O produto que herdei — a primeira versão do app",
      personas: [
        {
          label: "Usuário principal",
          title: "O médico plantonista",
          text: "Encontra oportunidades, se candidata, comprova presença e recebe — muitas vezes em vários hospitais na mesma semana. O app transforma essa dispersão em uma rotina estruturada, da descoberta ao check-out.",
        },
        {
          label: "Também atende",
          title: "A equipe de contratação",
          text: "Publica plantões, avalia candidatos e fecha a folha. Registros de check-in geolocalizados substituíram telefonemas e planilhas como fonte de verdade sobre quem de fato trabalhou.",
        },
      ],
      cards: [
        {
          number: "01",
          title: "Redesenhar, depois validar",
          text: "Um novo design system no Figma, traduzido em um MVP funcional — decisões testadas com médicos em plantões reais, não com mockups.",
        },
        {
          number: "02",
          title: "No-code onde é rápido, código onde importa",
          text: "FlutterFlow para velocidade de tela; 27 custom actions em Dart e 5 widgets customizados para o que ele não faz — geofence, deep links, push, OTP, calendário.",
        },
        {
          number: "03",
          title: "Presença confiável",
          text: "Check-in e check-out validados por cálculo de Haversine num raio de 100 m do hospital — com registros geolocalizados para a folha.",
        },
        {
          number: "04",
          title: "Dono da entrega",
          text: "Ciclos de revisão das lojas, changelog versionado, 38 builds nas duas lojas — a metade sem glamour do mobile, feita com disciplina.",
        },
      ],
    },
    design: {
      intro:
        "O redesign trocou o ruído visual herdado por um sistema calmo: uma fonte, um roxo, branco generoso. Tudo é meu — da biblioteca de componentes no Figma às telas publicadas.",
      description:
        "Uma única fonte variável faz todos os papéis — escolha deliberada para um produto pequeno: menos partes móveis, um ritmo consistente, e o arredondado da Geologica suaviza um domínio clínico.",
      charsetCaption: "Geologica — a única fonte do app",
      paletteMeta: [
        { category: "Acento", name: "Roxo Revoluna" },
        { category: "Acento", name: "Roxo profundo" },
        { category: "Apoio", name: "Ciano céu" },
        { category: "Superfície", name: "Tom lavanda" },
      ],
      statusLabel: "Feedback do sistema — sem vermelho/verde clínico",
      statusPills: ["SUCESSO", "ATENÇÃO", "ERRO"],
    },
    features: {
      eyebrow: "Por dentro do app",
      intro:
        "As telas abaixo são recriadas em React a partir do app publicado — mesmo layout, mesma tipografia, mesmo roxo — com plantões e pessoas fictícios.",
      items: [
        {
          title: "Descoberta estruturada",
          text: "Médicos exploram plantões abertos por especialidade, ordenados por publicação, data, valor, distância ou pagamento à vista. Cada card responde o que um post de WhatsApp nunca respondeu: quanto paga, qual setor, a que distância, publicado quando.",
        },
        {
          title: "O plantão inteiro, antes de se candidatar",
          text: "Uma tela com tudo que importa: horário, setor, requisitos, como chegar, condições de pagamento e quem está contratando — mais ações rápidas para salvar, compartilhar, adicionar à agenda ou passar o plantão para um colega.",
          secondary:
            "Deep links gerados no admin web ou no próprio app abrem exatamente esta tela dentro do app. O compartilhamento continua no WhatsApp — mas o destino agora é estruturado.",
        },
        {
          title: "O mês inteiro de relance",
          text: "Um calendário de plantões confirmados, pendentes e cancelados — e, para cada dia, a equipe completa de plantão. O médico vê quais colegas dividem o plantão antes mesmo de sair de casa.",
        },
        {
          title: "Check-in com prova",
          text: "Lembretes guiam o check-in e o check-out dentro de janelas de tempo definidas. A validação só completa a menos de 100 metros do hospital, dando à folha um registro geolocalizado de cada plantão de fato trabalhado.",
          secondary: (
            <TradeOff>
              Presença é um único fix de localização em cache e um cálculo de Haversine no
              aparelho — sem rastreamento contínuo. A bateria e a privacidade dos médicos pesaram
              mais que uma auditoria mais rica; e fora da janela de tempo o app pede uma
              justificativa por escrito em vez de bloquear o check-in.
            </TradeOff>
          ),
        },
        {
          title: "O app que vai até você",
          text: "Notificações push com Firebase Cloud Messaging cobrem o ciclo inteiro: atualizações de candidatura, alertas de agenda, lembretes de check-in e check-out, e avisos de pagamento quando o plantão encerra.",
        },
        {
          title: "Um pipeline de candidaturas",
          text: "Salvos, em análise, confirmados — cada candidatura tem status visível, filtrável por hospital e data. A resposta para “será que me escolheram?” parou de morar no chat de outra pessoa.",
        },
      ],
    },
    evidence: {
      eyebrow: "Domínio do design",
      text: "O sistema existia no Figma antes de qualquer linha do app ser tocada — componentes, tokens e todos os fluxos em alta fidelidade — e os dois artefatos seguiram em sincronia até as lojas terem o produto real.",
      captions: [
        "Biblioteca de componentes no Figma",
        "Fluxos em alta fidelidade",
        "No ar na App Store e no Google Play",
      ],
      alts: [
        "Biblioteca de componentes da Revoluna no Figma",
        "Designs em alta fidelidade da Revoluna no Figma",
        "Revoluna publicado na App Store e no Google Play",
      ],
    },
    contact: {
      heading: "Quer a história completa da Revoluna?",
      text: "Os trade-offs do geofence, a fronteira do no-code, as histórias de guerra da publicação nas lojas — fico feliz em detalhar qualquer parte.",
    },
  },
};

/* --------------------------------- component --------------------------------- */

export function RevolunaContent() {
  const t = COPY[useLocale()];

  const featureMedia: ReactNode[] = [
    <Phone key="explore">
      <ExploreScreen />
    </Phone>,
    <Phone key="vaga">
      <VagaScreen />
    </Phone>,
    <Phone key="escalas" time="17:45">
      <EscalasScreen />
    </Phone>,
    <Phone key="checkin" time="19:44">
      <CheckinScreen />
    </Phone>,
    <Phone key="lock" time="19:00" dark>
      <LockScreen />
    </Phone>,
    <Phone key="plantoes" time="17:45">
      <PlantoesScreen />
    </Phone>,
  ];

  const features: CaseFeature[] = t.features.items.map((item, i) => ({
    number: `0${i + 1}`,
    title: item.title,
    text: item.text,
    secondaryText: item.secondary,
    layout: "split",
    media: featureMedia[i],
  }));

  return (
    <CaseLayout
      accent={ACCENT}
      accentInk={ACCENT_INK}
      accentTint={ACCENT_TINT}
      nextProject={{ href: "/work/sebrae-opp", label: "Sebrae OPP" }}
    >
      <CaseHero
        chips={t.chips}
        headline={t.headline}
        subtitle={t.subtitle}
        roleTags={t.roleTags}
      >
        <CaseShowcase
          label={t.showcase.label}
          note={t.showcase.note}
          caption={t.showcase.caption}
        >
          <div
            className="grid gap-8"
            style={{ gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 280px), 1fr))" }}
          >
            <Phone>
              <ExploreScreen />
            </Phone>
            <Phone>
              <VagaScreen />
            </Phone>
            <Phone time="17:45">
              <EscalasScreen />
            </Phone>
          </div>
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
          src: "/img/revoluna/first-version.png",
          alt: t.story.imageAlt,
          width: 269,
          height: 545,
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
        weights={[
          { label: "Regular", weight: 400 },
          { label: "Medium", weight: 500 },
          { label: "SemiBold", weight: 600 },
        ]}
        description={t.design.description}
        charsetCaption={t.design.charsetCaption}
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
            hex: "#461A80",
            rgb: "(70, 26, 128)",
            bg: "#461A80",
            fg: "#FFFFFF",
          },
          {
            ...t.design.paletteMeta[2],
            hex: "#0FADEB",
            rgb: "(15, 173, 235)",
            bg: "#0FADEB",
            fg: "#FFFFFF",
          },
          {
            ...t.design.paletteMeta[3],
            hex: "#F5EDFF",
            rgb: "(245, 237, 255)",
            bg: "#F5EDFF",
            fg: "#461A80",
          },
        ]}
        statusPills={{
          label: t.design.statusLabel,
          pills: [
            { label: t.design.statusPills[0], cls: "bg-[#F5EDFF] text-[#0FADEB] border-[#0FADEB]/50" },
            { label: t.design.statusPills[1], cls: "bg-[#F5EDFF] text-[#D66E97] border-[#EBA5C1]" },
            { label: t.design.statusPills[2], cls: "bg-[#F5EDFF] text-[#EB0F67] border-[#EB0F67]/50" },
          ],
        }}
      />

      <CaseFeatures eyebrow={t.features.eyebrow} intro={t.features.intro} features={features} />

      <CaseEvidence
        eyebrow={t.evidence.eyebrow}
        text={t.evidence.text}
        items={[
          {
            image: {
              src: "/img/revoluna/figma-components.png",
              alt: t.evidence.alts[0],
              width: 667,
              height: 959,
            },
            caption: t.evidence.captions[0],
          },
          {
            image: {
              src: "/img/revoluna/figma-design.png",
              alt: t.evidence.alts[1],
              width: 1361,
              height: 959,
            },
            caption: t.evidence.captions[1],
          },
          {
            image: {
              src: "/img/revoluna/store.png",
              alt: t.evidence.alts[2],
              width: 700,
              height: 740,
            },
            caption: t.evidence.captions[2],
          },
        ]}
        stack={[
          "Figma",
          "FlutterFlow",
          "Flutter · Dart",
          "Supabase",
          "Firebase Cloud Messaging",
          "Google Maps",
          "App Store Connect",
          "Google Play Console",
        ]}
      />

      <CaseContact heading={t.contact.heading} text={t.contact.text} email="kenjimattos@gmail.com" />
    </CaseLayout>
  );
}
