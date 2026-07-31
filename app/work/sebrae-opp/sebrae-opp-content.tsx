"use client";

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

const ACCENT = "#161726";
const ACCENT_INK = "#161726";
const ACCENT_TINT = "#EEEFF8";

const PAD_X = "clamp(24px, 8vw, 180px)";
const PAD_SECTION = "clamp(60px, 10vw, 120px)";

const RECREATION_CAPTION =
  "Static recreation in React — indicator values are real public data for João Pessoa";

const results = [
  {
    value: "223",
    label: "Municipalities of Paraíba — every one of them, in a single platform",
  },
  {
    value: "13",
    label: "Official data sources unified by a 12k-line Python ETL pipeline",
  },
  {
    value: "0",
    label: "Chart or map libraries — every visualization hand-built in SVG and CSS",
  },
  {
    value: "1",
    label: "Person end to end: data, database, API, frontend and design system",
  },
];

const approach = [
  {
    number: "01",
    title: "Refuse to lie",
    text: "Only indicators with officially published cutoffs get a traffic light — 6 of 22. Low-sample averages are suppressed, not displayed.",
  },
  {
    number: "02",
    title: "Rules live in the data",
    text: "Classification bands are stored per indicator in MongoDB and computed server-side — the ruler changes without a deploy.",
  },
  {
    number: "03",
    title: "Zero visualization libraries",
    text: "Choropleth map, gauges and progress bars are hand-built SVG/CSS — 7 runtime dependencies, full design-token control.",
  },
  {
    number: "04",
    title: "Three layers, one person",
    text: "Python ETL → MongoDB → Fastify API → React 19, designed and shipped solo in about three months.",
  },
];

const features: CaseFeature[] = [
  {
    number: "01",
    title: "Socioeconomic Panorama",
    text: "Twelve cards of economic fundamentals — PIB per capita, IDEB, GINI, formal wages, active companies — each with its variation and reference year, plus an AI-styled performance summary.",
    secondaryText: (
      <>
        <span
          className="font-mono uppercase tracking-widest block mb-2"
          style={{ fontSize: "clamp(10px, 0.9vw, 12px)", color: ACCENT_INK }}
        >
          Trade-off
        </span>
        Every variation renders in neutral white — never green or red. Without
        official metadata saying which direction is “better”, the product
        refuses to judge a number. The restraint is deliberate, and it is the
        same rule that governs the traffic lights.
      </>
    ),
    media: (
      <OppScreen path="/home — panorama socioeconômico">
        <PanoramaScreen />
      </OppScreen>
    ),
    caption: RECREATION_CAPTION,
  },
  {
    number: "02",
    title: "Strategic Risks",
    text: "Risks are not curated by hand: the platform extracts every indicator sitting in an alert or warning band for the selected municipality and sorts it by severity — the diagnosis becomes an agenda.",
    media: (
      <OppScreen path="/home — riscos estratégicos">
        <RiscosScreen />
      </OppScreen>
    ),
    caption: RECREATION_CAPTION,
  },
  {
    number: "03",
    title: "Project Formulator",
    text: "A ten-step guided writer — identification to governance — that turns diagnosis into a public project proposal, with per-municipality draft autosave and PDF export built on nothing but window.print.",
    media: (
      <OppScreen path="/home — formulador de projetos">
        <FormuladorScreen />
      </OppScreen>
    ),
    caption: "Static recreation in React — fictional draft content",
  },
  {
    number: "04",
    title: "One journey, four pillars",
    text: "The platform is organized as a journey: diagnose the business environment, map funding — R$ 4,1 bi in parliamentary amendments and public calls — build capacity with ~45 curated courses, then write the project.",
    secondaryText:
      "Each pillar is a plug-in panel behind a registry: adding a new mode is one component and one entry in an object.",
    layout: "split",
    media: (
      <div className="rounded-lg overflow-hidden">
        <Image
          quality={90}
          src="/img/sebrae/jornada.png"
          alt="Jornada do Município Empreendedor — the four-pillar navigation"
          width={1920}
          height={1200}
          className="w-full"
        />
      </div>
    ),
  },
];

export function SebraeOppContent() {
  return (
    <CaseLayout
      accent={ACCENT}
      accentInk={ACCENT_INK}
      accentTint={ACCENT_TINT}
      nextProject={{ href: "/work/houston", label: "Houston" }}
    >
      <CaseHero
        chips={["2025", "Gov-tech · Public data", "Solo, end to end"]}
        headline={
          <>
            Sebrae OPP: scattered public data turned into{" "}
            <CaseEm>decisions for 223 municipalities</CaseEm>.
          </>
        }
        subtitle="An intelligence platform for Sebrae Paraíba that consolidates a dozen official sources into diagnosis, funding, training and a guided project writer — for every city in the state."
        roleTags={["Product", "UI/UX Design", "Front-end", "Back-end", "Data Engineering", "Design System"]}
        links={[
          {
            label: "Open the live demo",
            href: "https://sebrae-12i10oz98-kenjimattos-1396s-projects.vercel.app/",
          },
          {
            label: "View on GitHub",
            href: "https://github.com/kenjimattos/sebrae-opp-snapshot",
          },
        ]}
      >
        <CaseShowcase
          label="Live recreation — the real screen"
          note="Rebuilt in React for this case study · João Pessoa's indicators are real public data"
          caption="All 223 municipalities drawn from real IBGE geometry as hand-written SVG — the product uses no map library, and neither does this recreation."
        >
          <OppScreen path="/home">
            <AgendasScreen />
          </OppScreen>
        </CaseShowcase>
      </CaseHero>

      <CaseResults
        items={results}
        statement="Built to be honest: an indicator only gets a traffic light when its official source publishes cutoffs; agendas get no aggregate color because no official band exists for one; low-sample averages are hidden instead of shown. Public data that refuses to lie pretty."
        footnote="Figures come from the real codebase and public documentation. Indicator values in the recreations are real public data for João Pessoa."
      />

      <CaseStory
        eyebrow="From thirteen portals to one answer"
        headline="Every indicator lived in a different portal, in a different format."
        text="RAIS, Receita Federal, Redesim, central bank tables, PNCP, IBGE, INEP — each with its own municipal code, its own layout, its own methodology. A small-town manager has no data team to reconcile them. OPP consolidates everything into one traceable model, organized around the Jornada do Município Empreendedor."
        image={{
          src: "/img/sebrae/challenge.png",
          alt: "Scattered public data sources — spreadsheets, portals, APIs, CSVs and PDF reports",
          width: 2420,
          height: 1460,
        }}
        imageCaption="One indicator, many homes: spreadsheets, portals, APIs, CSVs, PDFs"
        personas={[
          {
            label: "Primary user",
            title: "The municipal manager",
            text: "Mayors and economic development secretaries — most without any data team — who need to know where their city stands and what to do next. The platform reads like an answer, not like a database.",
          },
          {
            label: "Also served",
            title: "Sebrae analysts",
            text: "The people advising those managers across all 223 municipalities, who need indicators that are comparable between cities and traceable to official sources and methodologies.",
          },
        ]}
        cards={approach}
      />

      <CaseDesignLanguage
        intro="All design here is mine — ported from a Figma design system into a token-driven setup: 16 composite type styles, semantic colors, spacing and dark mode as CSS variables. Gov-tech rarely looks like this on purpose: dark navy, electric lime, and a glass effect rebuilt from Figma's native material with CSS masks."
        fontFamily="var(--font-monoblock), monospace"
        typefaceName="Monoblock"
        weights={[{ label: "Bold", weight: 700 }]}
        description="Three typefaces, three jobs: Monoblock carries display numbers, titles and every button; Epic Pro ExtraBold anchors headlines; Intel One Mono sets all body text at weight 300. A mono-first system that makes data feel like the interface's native language."
        charsetCaption="Monoblock · display & buttons — with Epic Pro for headings and Intel One Mono for body"
        palette={[
          {
            category: "Accent",
            name: "Electric Lime",
            hex: "#D4FE07",
            rgb: "(212, 254, 7)",
            bg: "#D4FE07",
            fg: "#161726",
          },
          {
            category: "Surface",
            name: "Deep Navy",
            hex: "#161726",
            rgb: "(22, 23, 38)",
            bg: "#161726",
            fg: "#FFFFFF",
          },
          {
            category: "Surface",
            name: "Panel",
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
              Glass — Figma&apos;s native material, rebuilt in CSS
            </span>
            <p
              className="text-foreground leading-relaxed mb-4"
              style={{ fontSize: "clamp(13px, 1.2vw, 15px)", opacity: 0.65, maxWidth: "620px" }}
            >
              The interface&apos;s surfaces use a glass material recreated from
              Figma&apos;s native effect: inner bevel shadows at a −45° light
              angle, backdrop blur, and a 1px diagonal stroke cut with
              mask-composite. No images, no libraries — it inherits the theme
              tokens like everything else.
            </p>
            <GlassExhibit />
          </div>
        }
        statusPills={{
          label: "Semáforo — official cutoffs only",
          pills: [
            { label: "SUCESSO", cls: "bg-[#161726] text-[#40E629] border-[#40E629]/50" },
            { label: "ATENÇÃO", cls: "bg-[#161726] text-[#F5E421] border-[#F5E421]/50" },
            { label: "ALERTA", cls: "bg-[#161726] text-[#F14635] border-[#F14635]/50" },
            { label: "SEM FAIXA OFICIAL", cls: "bg-[#161726] text-white/50 border-white/25" },
          ],
        }}
      />

      <CaseFeatures
        eyebrow="Inside the platform"
        intro="The screens below are recreated in React from the real product — dark theme, glass, hand-built visualizations — with João Pessoa's actual public indicators."
        features={features}
      />

      {/* --------------------------- behind the product --------------------------- */}
      <section
        className="animate-section w-full"
        style={{ padding: `${PAD_SECTION} ${PAD_X}`, opacity: 0 }}
      >
        <SectionEyebrow label="Behind the product" />
        <p
          className="text-foreground leading-relaxed mb-10"
          style={{ fontSize: "clamp(15px, 1.4vw, 18px)", opacity: 0.7, maxWidth: "740px" }}
        >
          The frontend is the visible tenth. Underneath: 27 Python ETL
          generators that tamed each source&apos;s quirks — RFB municipal codes
          that differ from IBGE&apos;s, company size living in a different table
          than the establishment — emitting idempotent MongoDB seeds, documented
          down to a per-source data dictionary for Sebrae&apos;s team to operate
          without me.
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
            bom/atenção/alerta — <span style={{ color: "#D4FE07" }}>não inventamos cortes</span>.”
          </p>
          <p
            className="mt-4"
            style={{ fontSize: "clamp(10px, 1vw, 12px)", color: "#fffff9", opacity: 0.4 }}
          >
            From the ETL&apos;s own docstrings — every source&apos;s gotchas documented in code
          </p>
        </div>

        <div className="mt-12">
          <span
            className="font-mono uppercase tracking-widest block mb-4"
            style={{ fontSize: "clamp(10px, 0.9vw, 12px)", color: ACCENT_INK }}
          >
            Stack
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

      <CaseContact
        heading="Want the full story behind OPP?"
        text="The ETL gotchas, the honesty rules, the hand-built map — happy to walk through any of it."
        email="kenjimattos@gmail.com"
      />
    </CaseLayout>
  );
}
