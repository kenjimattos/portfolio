"use client";

/* Revoluna — o terceiro case no editorial de problema.
 *
 * A atribuição está na primeira dobra, como nos outros dois: o problema,
 * o modelo de negócio e a primeira versão do app são da Revoluna; o que
 * o case reivindica é o novo design e a entrega do MVP, uma pessoa, até as
 * duas lojas. A tensão que organiza tudo é a fronteira do no-code: o
 * FlutterFlow compra velocidade, e as 37 peças de Dart próprio (25 custom
 * actions, 9 custom functions, 3 widgets) marcam exatamente onde o produto
 * exigiu código. Números contados no repositório em 02/09/2026.
 *
 * O hero usa a imagem de capa do projeto, como no Houston. As recriações
 * de telefone não saem do case: descem para as decisões, onde cada tela
 * é prova da decisão que a produziu.
 */

import { ReactNode } from "react";
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
import { PhoneFrame } from "@/components/revoluna-demo/phone-frame";
import {
  RevDsFoundation
} from "@/components/revoluna-demo/design-system-exhibit";
import { CheckinScreen } from "@/components/revoluna-demo/screens/checkin";
import { EscalasScreen } from "@/components/revoluna-demo/screens/escalas";
import { ExploreScreen } from "@/components/revoluna-demo/screens/explore";
import { LockScreen } from "@/components/revoluna-demo/screens/lockscreen";
import { VagaScreen } from "@/components/revoluna-demo/screens/vaga";
import { WhatsAppScreen } from "@/components/revoluna-demo/screens/whatsapp";
import { useLocale } from "@/lib/i18n";

function Phone({
  children,
  time,
  dark,
}: {
  children: ReactNode;
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

/* O par de telas é UMA prova, não um telefone por painel: agrupado no
   centro, com o vão curto, para não espelhar a divisão design/código
   dos painéis acima. */
function PhonePair({ children }: { children: ReactNode }) {
  return (
    <div
      className="mx-auto grid w-full max-w-185 gap-x-6 gap-y-8"
      style={{ gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 280px), 1fr))" }}
    >
      {children}
    </div>
  );
}

const STORE_URL = "https://play.google.com/store/apps/details?id=com.mycompany.revoluna&hl=pt";

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
  role: { label: string; strong: string; text: string; note: string };
  indexLabel: string;
  constraints: { label: string; text: string }[];
  decisionsHeading: string;
  decisionsNote: string;
  railLabel: string;
  costLabel: string;
  decisions: Decision[];
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
      "Revoluna · 2024 · medical shift marketplace",
      "Flutter · Dart · FlutterFlow · Supabase · Firebase",
    ],
    headline: "A shift vacancy was a post lost in a WhatsApp group.",
    turn: "It became a product on both stores.",
    sub: "Marketplace and management for medical shifts: from the design system in Figma to a shipped MVP, 16 documented versions on the App Store and Google Play, one person.",
    coverAlt: "The Revoluna app screens on smartphones",
    shotTag: "App screens recreated in React · real hospitals, fictional shift data",
    /* A frase é a afirmação mais concreta do case, e a prova dela é a
       decisão 02, para onde a nota aponta. */
    note: {
      cue: "Scroll",
      before: "A check-in only counts within",
      circled: "100 meters",
      after: "of the hospital.",
      href: "#d02",
    },
    role: {
      label: "My role",
      strong: "Product design and app release:",
      text: "I built the product's design in Figma, component library, tokens and every high-fidelity flow, then built the MVP myself in FlutterFlow. The 25 custom actions, 9 custom functions and 3 widgets in Dart covered what the no-code couldn't: geofence, deep links, push, OTP, calendar. Some of those functions I wrote by hand; the rest I specified, reviewed and tested, written with generative AI. I published and maintained the app on both stores, 16 documented versions up to v2.3.2, with a changelog that records the commits behind each one.",
      note: "The product isn't mine. Revoluna existed before me: the problem, the business model and the app's first version belong to the founders. I joined as a Product Designer to build a new experience, and what I claim is the delivery: turning that new design into a shipped MVP that real doctors could validate on real shifts, one person, without stopping the operation. Every decision below is of that kind.",
    },
    indexLabel: "Decisions in this case",
    constraints: [
      {
        label: "Context",
        text: "Medical shifts in Brazil circulate through unstructured channels: vacancies in WhatsApp groups, applications lost in threads, payments tracked from memory, and doctors covering several hospitals in the same week.",
      },
      {
        label: "Constraint",
        text: "One person from design to store publishing, an MVP budget, and two app stores with a review cycle standing between every fix and the user.",
      },
    ],
    decisionsHeading: "Decisions",
    decisionsNote: "Four of them, and only what has proof attached.",
    railLabel: "Jump to a decision",
    costLabel: "Cost",
    decisions: [
      {
        id: "d01",
        tension: { a: "No-code speed", b: "what the product demands" },
        design: {
          label: "Design",
          chose: "FlutterFlow as the MVP's base: screen velocity to validate with doctors on real shifts, not with prototypes.",
          why: "In a one-person MVP, every week of handcrafted frontend was a week without validation.",
        },
        code: {
          label: "Code",
          chose: "25 custom actions, 9 custom functions and 3 widgets in Dart where the no-code ended: geofence, deep links, push, OTP, calendar.",
          why: "The boundary is explicit: what differentiates the product is code; what is an ordinary screen is not.",
          authorship: "assisted",
        },
        proofCaption:
          "The discovery screen, recreated: every card answers what the WhatsApp post never did: how much it pays, which sector, how far, published when. Built on top of the no-code, with what it does well.",
        cost: "FlutterFlow's ceiling and lock-in: the Dart code lives inside the platform, and whatever it won't do gracefully gets expensive.",
      },
      {
        id: "d02",
        tension: { a: "Proof of presence", b: "battery and privacy" },
        design: {
          label: "Design",
          chose: "Check-in and check-out inside time windows, validated against the hospital; outside the window the app asks for a written justification instead of blocking.",
          why: "The goal is a record payroll can trust, not surveilling doctors.",
        },
        code: {
          label: "Code",
          chose: "A single cached location fix and a Haversine check on the device, within a 100 m radius. No continuous tracking.",
          why: "The proof belongs to the moment of check-in; the rest of the shift is none of the app's business.",
        },
        proofCaption:
          "The reminder and the validation, recreated: the push opens the check-in window, and confirmation only completes within 100 m of the hospital. One location fix, no tracking.",
        cost: "A poorer audit trail than continuous tracking would give. The doctor's battery and privacy were worth it.",
      },
      {
        id: "d03",
        tension: { a: "Kill WhatsApp", b: "structure the destination" },
        design: {
          label: "Design",
          chose: "Sharing stays on WhatsApp: what changes is the destination. The link opens the full, structured shift inside the app.",
          why: "Fighting the channel where doctors already live was a losing fight; the app wins at the destination, not the origin.",
        },
        code: {
          label: "Code",
          chose: "Deep links generated in the web admin and in the app itself open the exact shift sheet; push over FCM covers the cycle from application to payment.",
          why: "The shift finds the doctor, instead of the doctor digging through threads.",
        },
        proofCaption:
          "Origin and destination, recreated: the shouted group post that answers nothing, and the structured shift the deep link opens: schedule, sector, requirements, payment, who is hiring. Same channel, new landing.",
        cost: "WhatsApp stays in the flow, and the product's first impression still happens in a chat I don't control.",
      },
      {
        id: "d04",
        tension: { a: "Inherit the look", b: "systematize first" },
        context:
          "I joined with the app already live in a first version. Building the new design wasn't aesthetics: it was removing the inherited noise and giving the product a system one person could keep coherent.",
        design: {
          label: "Design",
          chose: "The design built in full before the MVP: component library, tokens and high-fidelity flows in Figma; one typeface, one purple, and status feedback with no clinical red/green.",
          why: "In a clinical domain the app had to be calm; and in a one-person product, the system is what holds coherence.",
        },
        code: {
          label: "Code",
          chose: "The system translated into FlutterFlow and kept in sync with the Figma until the stores had the real product.",
          why: "Geologica does every job: fewer moving parts, one consistent rhythm.",
        },
        proofCaption:
          "",
        cost: "Weeks of Figma before any release, countless rounds of approval untill finally handoff.",
      },
    ],
    ds: {
      typeRoles: ["titles & values", "headings & buttons", "body & labels"],
      foundation:
        "6 color tokens, one typeface in three weights, and the primitives built on them: from everything the screens use, here's a selected part. UI conveys a lot of information in a clean and organized way, like an operating room.",
      signature:
        "The signature piece, enlarged: the shift card, the unit that answers what the WhatsApp post never did. The real component under zoom, not a redrawing.",
    },
    frontier: {
      label: "Where the line sits:",
      text: "the problem and the product are Revoluna's. Deciding where the no-code ended and the code began, and what proof of presence could demand from a doctor, was mine.",
    },
    outcome: {
      heading: "Result",
      measures: [
        { value: "16", label: "documented versions on both stores, up to v2.3.2" },
        { value: "37", label: "pieces of my own Dart: 25 actions, 9 functions, 3 widgets" },
        { value: "100 m", label: "radius validating every check-in against the hospital" },
        { value: "1", label: "person, from Figma to both stores", mark: true },
      ],
      gaps: {
        label: "What wasn't measured, and what's missing",
        items: [
          "Adoption and retention: the numbers exist, but they're the company's, not mine to publish. What I claim is scope and delivery.",
          "The FlutterFlow project and the Dart code are private. The proof here is the React recreation and the app on the stores.",
        ],
      },
    },
    evidence: {
      heading: "Evidence",
      items: [
        {
          kind: "link",
          label: "Published on the App Store and Google Play",
          href: STORE_URL,
          note: "16 documented versions · build 38 · v2.3.2",
        },
        {
          kind: "fact",
          label: "25 custom actions, 9 custom functions and 3 widgets in Dart",
          note: "geofence, deep links, push, OTP, calendar",
        },
        {
          kind: "link",
          label: "Design system in Figma before the app",
          href: "/work/revoluna/design-system",
          note: "components, tokens, high-fidelity flows",
        },
        {
          kind: "fact",
          label: "Every screen on this page is a React recreation",
          note: "real hospitals, fictional shift data; the production code is private",
        },
      ],
    },
    cta: {
      label: "Contact",
      heading: "Want the full story behind Revoluna?",
      invite:
        "The geofence trade-offs, the no-code boundary, the store-publishing war stories: happy to walk through any of it.",
      action: "Get in touch",
    },
    next: "Sebrae OPP",
  },

  pt: {
    kicker: [
      "Revoluna · 2024 · marketplace de plantões médicos",
      "Flutter · Dart · FlutterFlow · Supabase · Firebase",
    ],
    headline: "A vaga de plantão era um post perdido num grupo de WhatsApp.",
    turn: "Virou produto nas duas lojas.",
    sub: "Marketplace e gestão de plantões médicos: do design system no Figma ao MVP publicado, 16 versões documentadas na App Store e no Google Play, uma pessoa.",
    coverAlt: "As telas do app Revoluna em smartphones",
    shotTag: "Telas recriadas em React · hospitais reais, plantões fictícios",
    note: {
      cue: "Role",
      before: "O check-in só vale a menos de",
      circled: "100 metros",
      after: "do hospital.",
      href: "#d02",
    },
    role: {
      label: "Meu papel",
      strong: "Produto, design e lançamento do app:",
      text: "construí no Figma a biblioteca de componentes, tokens e todos os fluxos em alta fidelidade, e construí o MVP sozinho em FlutterFlow. As 25 custom actions, as 9 custom functions e os 3 widgets em Dart cobriram o que o no-code não fazia: geofence, deep links, push, OTP, calendário. Algumas dessas funções escrevi à mão; as demais especifiquei, revisei e testei, escritas com IA generativa. Publiquei e mantive o app nas duas lojas, 16 versões documentadas até a v2.3.2, com changelog registrando os commits de cada uma.",
      note: "O produto não é meu. A Revoluna existia antes de mim: o problema, o modelo de negócio e a primeira versão do app são dos fundadores. Entrei como Product Designer para construir uma experiência nova, e o que reivindico é a entrega: transformar esse novo design num MVP publicado, que médicos reais validaram em plantões reais, uma pessoa, sem parar a operação. É desse tipo toda decisão abaixo.",
    },
    indexLabel: "Decisões deste case",
    constraints: [
      {
        label: "Contexto",
        text: "Plantões médicos no Brasil circulam por canais desestruturados: vagas em grupos de WhatsApp, candidaturas perdidas em threads, pagamento controlado de memória, e médicos cobrindo vários hospitais na mesma semana.",
      },
      {
        label: "Restrição",
        text: "Uma pessoa do design à publicação, orçamento de MVP, e duas lojas com um ciclo de revisão entre cada correção e o usuário.",
      },
    ],
    decisionsHeading: "Decisões",
    decisionsNote: "Quatro, e só o que tem prova anexada.",
    railLabel: "Ir para uma decisão",
    costLabel: "Custou",
    decisions: [
      {
        id: "d01",
        tension: { a: "Velocidade do no-code", b: "o que o produto exige" },
        design: {
          label: "Design",
          chose: "FlutterFlow como base do MVP: velocidade de tela para validar com médicos em plantões reais, não com protótipos.",
          why: "Num MVP de uma pessoa, cada semana de frontend artesanal era uma semana sem validação.",
        },
        code: {
          label: "Código",
          chose: "25 custom actions, 9 custom functions e 3 widgets em Dart onde o no-code acabou: geofence, deep links, push, OTP, calendário.",
          why: "A fronteira é explícita: o que diferencia o produto é código; o que é tela comum, não.",
          authorship: "assisted",
        },
        proofCaption:
          "A tela de descoberta, recriada: cada card responde o que o post de WhatsApp nunca respondeu: quanto paga, qual setor, a que distância, publicado quando. Construída sobre o no-code, com o que ele faz bem.",
        cost: "O teto e o lock-in do FlutterFlow: o código em Dart vive dentro da plataforma, e o que ela não faz com elegância sai caro.",
      },
      {
        id: "d02",
        tension: { a: "Prova de presença", b: "bateria e privacidade" },
        design: {
          label: "Design",
          chose: "Check-in e check-out em janelas de tempo, validados contra o hospital; fora da janela, o app pede justificativa por escrito em vez de bloquear.",
          why: "O objetivo é um registro em que a folha confie, não vigiar médico.",
        },
        code: {
          label: "Código",
          chose: "Um único fix de localização em cache e o cálculo de Haversine no aparelho, num raio de 100 m. Nenhum rastreamento contínuo.",
          why: "A prova é do momento do check-in; o resto do plantão não é da conta do app.",
        },
        proofCaption:
          "O lembrete e a validação, recriados: o push abre a janela de check-in, e a confirmação só completa a menos de 100 m do hospital. Um fix de localização, nenhum rastreamento.",
        cost: "Trilha de auditoria mais pobre do que um rastreamento contínuo daria. A bateria e a privacidade do médico valeram isso.",
      },
      {
        id: "d03",
        tension: { a: "Matar o WhatsApp", b: "estruturar o destino" },
        design: {
          label: "Design",
          chose: "O compartilhamento continua no WhatsApp: o que muda é o destino. O link abre a vaga inteira, estruturada, dentro do app.",
          why: "Brigar com o canal onde os médicos já vivem era briga perdida; o app vence no destino, não na origem.",
        },
        code: {
          label: "Código",
          chose: "Deep links gerados no admin web e no próprio app abrem exatamente a tela da vaga; push por FCM cobre o ciclo da candidatura ao pagamento.",
          why: "O plantão encontra o médico, em vez de o médico garimpar threads.",
        },
        proofCaption:
          "A origem e o destino, recriados: o post gritado no grupo que não responde nada, e a vaga estruturada que o deep link abre: horário, setor, requisitos, pagamento, quem contrata. O mesmo canal, outro pouso.",
        cost: "O WhatsApp segue no fluxo, e a primeira impressão do produto continua acontecendo num chat que eu não controlo.",
      },
      {
        id: "d04",
        tension: { a: "Herdar o visual", b: "sistematizar antes" },
        context:
          "Entrei com o app já no ar numa primeira versão. Construir o design novo não era estética: era tirar o ruído herdado e dar ao produto um sistema que uma pessoa conseguisse manter coerente.",
        design: {
          label: "Design",
          chose: "O design construído por inteiro antes do MVP: biblioteca de componentes, tokens e fluxos em alta fidelidade no Figma; uma fonte, um roxo, e feedback de status sem vermelho/verde clínico.",
          why: "Num domínio clínico o app precisava ser calmo; e num produto de uma pessoa, o sistema é o que segura a coerência.",
        },
        code: {
          label: "Código",
          chose: "O sistema traduzido para o FlutterFlow e mantido em sincronia com o Figma até as lojas terem o produto real.",
          why: "A Geologica faz todos os papéis: menos partes móveis, um ritmo consistente.",
        },
        proofCaption:
          "O sistema em uso, recriado: uma fonte, um roxo, nenhum vermelho/verde clínico. O calendário do mês com a equipe de plantão de cada dia.",
        cost: "Semanas de Figma antes de qualquer release, inúmeras rodadas de aprovação até chegar à versão para handoff.",
      },
    ],
    ds: {
      typeRoles: ["títulos e valores", "headings e botões", "corpo e labels"],
      foundation:
        "6 tokens de cor, uma fonte em três pesos e os primitivos construídos sobre eles: de tudo que as telas usam, aqui uma parte seleta. A UI transmite muita informação de maneira limpa e organizada como um centro cirúrgico",
      signature:
        "A peça-assinatura, ampliada: o card de plantão, a unidade que responde o que o post de WhatsApp nunca respondeu. O componente real em zoom, não um redesenho.",
    },
    frontier: {
      label: "Onde fica a fronteira:",
      text: "o problema e o produto são da Revoluna. Decidir onde o no-code acabava e o código começava, e o que a prova de presença podia exigir do médico, foi meu.",
    },
    outcome: {
      heading: "Resultado",
      measures: [
        { value: "16", label: "versões documentadas nas duas lojas, até a v2.3.2" },
        { value: "37", label: "peças de Dart próprio: 25 actions, 9 functions, 3 widgets" },
        { value: "100 m", label: "raio que valida cada check-in contra o hospital" },
        { value: "1", label: "pessoa, do Figma às duas lojas", mark: true },
      ],
      gaps: {
        label: "O que não foi medido, e o que falta",
        items: [
          "Adoção e retenção: os números existem, mas são da empresa, não meus para publicar. O que afirmo é escopo e entrega.",
          "O projeto FlutterFlow e o código Dart são privados. A prova aqui é a recriação em React e o app nas lojas.",
        ],
      },
    },
    evidence: {
      heading: "Evidência",
      items: [
        {
          kind: "link",
          label: "Publicado na App Store e no Google Play",
          href: STORE_URL,
          note: "16 versões documentadas · build 38 · v2.3.2",
        },
        {
          kind: "fact",
          label: "25 custom actions, 9 custom functions e 3 widgets em Dart",
          note: "geofence, deep links, push, OTP, calendário",
        },
        {
          kind: "link",
          label: "Design system no Figma antes do app",
          href: "/pt/work/revoluna/design-system",
          note: "componentes, tokens, fluxos em alta fidelidade",
        },
        {
          kind: "fact",
          label: "Todas as telas desta página são recriações em React",
          note: "hospitais reais, plantões fictícios; o código de produção é privado",
        },
      ],
    },
    cta: {
      label: "Contato",
      heading: "Quer a história completa da Revoluna?",
      invite:
        "Os trade-offs do geofence, a fronteira do no-code, as histórias da publicação nas lojas: fico feliz em detalhar qualquer parte.",
      action: "Fale comigo",
    },
    next: "Sebrae OPP",
  },
};

/* --------------------------------- component --------------------------------- */

export function RevolunaContent() {
  const t = COPY[useLocale()];

  /* A d04 é sobre o sistema vir antes do app, então a prova dela é o
     próprio sistema, no mesmo arco do Sebrae: a fundação (tokens, tipo,
     primitivos), a peça-assinatura em close e, fechando, a tela — o
     calendário deixa de ser a prova e vira o finale, o sistema em uso. */
  const dsProof = (
    <>
      <CaseProof caption={t.ds.foundation}>
        <RevDsFoundation typeRoles={t.ds.typeRoles} />
      </CaseProof>
    </>
  );

  /* A prova entra dentro da decisão que ela prova. A d02 é a única com
     duas telas: o lembrete (push na tela bloqueada) e a validação são
     as duas metades da mesma decisão. */
  const proofs = [
    <PhonePair key="nocode">
      <Phone key="explore">
        <ExploreScreen />
      </Phone>
      <Phone key="escalas" time="17:45">
        <EscalasScreen />
      </Phone>
    </PhonePair>,
    <PhonePair key="checkin">
      <Phone time="19:00" dark>
        <LockScreen />
      </Phone>
      <Phone time="19:44">
        <CheckinScreen />
      </Phone>
    </PhonePair>,
    <PhonePair key="deeplink">
      {/* A origem e o destino, lado a lado: o link sai do grupo e
         aterrissa na vaga estruturada. */}
      <Phone key="whatsapp" time="18:55">
        <WhatsAppScreen />
      </Phone>
      <Phone key="vaga">
        <VagaScreen />
      </Phone>
    </PhonePair>,
  ];

  return (
    <CaseShell nextProject={{ href: "/work/sebrae-opp", label: t.next }}>
      <CaseHero
        kicker={t.kicker}
        headline={t.headline}
        turn={t.turn}
        sub={t.sub}
        /* A capa do projeto, com o enquadramento da lista de trabalhos.
           As recriações de telefone descem para as decisões, onde são
           prova e não vitrine. */
        cover={{
          src: "/img/work-revoluna.png",
          alt: t.coverAlt,
          zoom: 1,
          fx: "50%",
          fy: "50%",
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
              {d.id === "d04" ? dsProof : null}
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
