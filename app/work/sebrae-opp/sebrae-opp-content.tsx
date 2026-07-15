"use client";

import Image from "next/image";
import { CaseStudyTemplate } from "@/components/case-study/case-study-template";

const tags = ["Product", "Front-end", "Back-end", "Data", "Design System"];

const implementationSteps = [
  "Built the entire platform solo across three layers: React frontend, read-only Fastify API, and a Python ETL pipeline feeding MongoDB",
  "Ported the Figma design system into a token-driven Tailwind setup — typography, spacing, semantic colors, and dark mode as CSS variables",
  "Modeled the database with JSON Schema validators and indexes, supporting historical series per municipality, indicator, and year",
  "Wrote 31 Python ETL generators integrating BigQuery, government APIs, and public datasets into idempotent seed scripts",
  "Encoded the traffic-light classification policy so thresholds come only from officially published cutoffs, stored in the database — never hardcoded",
  "Handled statistical reliability at the API level, suppressing low-sample averages instead of displaying misleading numbers",
  "Documented everything for handoff: ETL runbooks, changelog, and a per-source data dictionary for Sebrae's team to operate and extend",
];

export function SebraeOppContent() {
  return (
    <CaseStudyTemplate
      projectName="Sebrae OPP"
      accentColor="#161726"
      accentTint="#EEEFF8"
      heroSubtitle="A public policy observatory that turns scattered government data into decisions for all 223 municipalities of Paraíba, Brazil."
      tags={tags}
      links={[
        {
          label: "View live demo",
          href: "https://sebrae-90w1y0a6d-kenjimattos-1396s-projects.vercel.app/",
        },
      ]}
      heroImage={{
        src: "/img/sebrae/hero.png",
        alt: "OPP main screen — indicator dashboard with the interactive Paraíba map and traffic-light indicator bars",
        width: 1920,
        height: 1200,
        className: "relative z-10 rounded-lg",
        style: {
          maxWidth: "clamp(500px, 80vw, 900px)",
          height: "auto",
        },
        priority: true,
      }}
      overviewIntro={[
        "I designed and built OPP — Observatório de Políticas Públicas — end to end for Sebrae Paraíba: a data platform that helps public managers understand and act on the reality of their municipalities.",
        "The platform consolidates socioeconomic indicators, priority agendas, strategic risks, and funding opportunities for all 223 municipalities of Paraíba into a single interface, organized around the Jornada do Município Empreendedor.",
      ]}
      overviewContext="Public data in Brazil is scattered across dozens of sources — IBGE, INEP, central bank datasets, ministry APIs, and Sebrae's own data lake. OPP unifies them under one consistent model, with every indicator traceable to its official source and methodology."
      challengeText={[
        "Municipal managers had no unified way to read their own city's data. Each indicator lived in a different portal, in a different format, with a different methodology — and comparing municipalities or tracking evolution over time was practically impossible.",
        "The challenge was to build a single trustworthy view without inventing judgments: an indicator can only be classified as good or bad when its own official source publishes cutoffs for it. That rule shaped the entire data model.",
      ]}
      challengeImage={{
        src: "/img/sebrae/challenge.png",
        alt: "Scattered public data sources — a RAIS spreadsheet, an IBGE portal page, a transparency portal table, a government API response, a central bank CSV, and an INEP PDF report, each in a different format",
        width: 2420,
        height: 1460,
        style: { maxWidth: "100%", height: "auto" },
        caption: "One indicator, many homes: spreadsheets, portals, APIs, CSVs, and PDF reports",
      }}
      solutionImage={{
        src: "/img/sebrae/solution.png",
        alt: "OPP screens in composition — indicator dashboard, business environment pillar, and project formulator",
        width: 2880,
        height: 1520,
      }}
      solutionText="A single platform organized around diagnosis and action: indicator dashboards and an interactive state map to understand each municipality, then resources, training, and a guided project formulator to act on what the data shows."
      features={
        <>
          <section className="feature-card w-full mb-24" style={{ opacity: 0 }}>
            <div className="flex items-center gap-4 mb-8">
              <div className="feature-badge feature-badge--purple">01</div>
              <h3
                className="text-foreground font-semibold"
                style={{ fontSize: "clamp(20px, 2.5vw, 32px)" }}
              >
                Indicator Dashboard
              </h3>
            </div>
            <p
              className="text-foreground leading-relaxed mb-8"
              style={{
                fontSize: "clamp(15px, 1.4vw, 18px)",
                opacity: 0.7,
                maxWidth: "700px",
              }}
            >
              Socioeconomic indicators presented as traffic-light cards. The classification is data-driven: each status comes from officially published cutoffs stored per indicator in the database — indicators without an official band simply show no judgment.
            </p>
            <Image
              src="/img/sebrae/panorama.png"
              alt="Socioeconomic panorama for Campina Grande — indicator cards with values, trends, and source years"
              width={1920}
              height={1200}
              className="w-full h-auto rounded-lg"
            />
          </section>

          <section className="feature-card w-full mb-24" style={{ opacity: 0 }}>
            <div className="flex items-center gap-4 mb-8">
              <div className="feature-badge feature-badge--cyan">02</div>
              <h3
                className="text-foreground font-semibold"
                style={{ fontSize: "clamp(20px, 2.5vw, 32px)" }}
              >
                Interactive State Map
              </h3>
            </div>
            <p
              className="text-foreground leading-relaxed mb-8"
              style={{
                fontSize: "clamp(15px, 1.4vw, 18px)",
                opacity: 0.7,
                maxWidth: "700px",
              }}
            >
              A choropleth map of Paraíba hand-built as SVG from IBGE GeoJSON — no map library. All 223 municipalities are selectable, with hover tooltips and coloring by the selected indicator.
            </p>
            <Image
              src="/img/sebrae/map.png"
              alt="Interactive SVG map of Paraíba with all 223 municipalities, showing a hover tooltip on Esperança"
              width={1920}
              height={1200}
              className="w-full h-auto rounded-lg"
            />
          </section>

          <section className="feature-card w-full mb-24" style={{ opacity: 0 }}>
            <div className="flex items-center gap-4 mb-8">
              <div className="feature-badge feature-badge--primary">03</div>
              <h3
                className="text-foreground font-semibold"
                style={{ fontSize: "clamp(20px, 2.5vw, 32px)" }}
              >
                Jornada do Município Empreendedor
              </h3>
            </div>
            <p
              className="text-foreground leading-relaxed mb-8"
              style={{
                fontSize: "clamp(15px, 1.4vw, 18px)",
                opacity: 0.7,
                maxWidth: "700px",
              }}
            >
              The platform&apos;s core navigation: four pillars covering environment (priority agendas, socioeconomic panorama, strategic risks), resources (funding and public calls), training (courses and best practices), and a project formulator.
            </p>
            <Image
              src="/img/sebrae/jornada.png"
              alt="Jornada do Município Empreendedor — side navigation with the four pillars and the priority axes of the business environment pillar"
              width={1920}
              height={1200}
              className="w-full h-auto rounded-lg"
            />
          </section>

          <section className="feature-card w-full mb-24" style={{ opacity: 0 }}>
            <div
              className="grid gap-8 items-center"
              style={{
                gridTemplateColumns: "1.2fr 1fr",
              }}
            >
              <div className="flex flex-col gap-6">
                <div className="flex items-center gap-4">
                  <div className="feature-badge feature-badge--purple">04</div>
                  <h3
                    className="text-foreground font-semibold"
                    style={{ fontSize: "clamp(20px, 2.5vw, 32px)" }}
                  >
                    Strategic Risks
                  </h3>
                </div>
                <p
                  className="text-foreground leading-relaxed"
                  style={{ fontSize: "clamp(15px, 1.4vw, 18px)", opacity: 0.7 }}
                >
                  Risks are not curated by hand: the platform automatically extracts every indicator in alert or warning state for the selected municipality and sorts them by severity, turning the diagnosis into an agenda.
                </p>
                <div
                  className="h-px"
                  style={{
                    background:
                      "linear-gradient(90deg, color-mix(in srgb, var(--color-accent-purple) 40%, transparent), transparent)",
                    maxWidth: "200px",
                  }}
                />
              </div>
              <Image
                src="/img/sebrae/riscos.png"
                alt="Strategic risks for João Pessoa — indicator cards in alert and warning states, sorted by severity"
                width={1600}
                height={1096}
                className="w-full h-auto rounded-lg"
              />
            </div>
          </section>

          <section className="feature-card w-full mb-24" style={{ opacity: 0 }}>
            <div
              className="grid gap-8 items-center"
              style={{
                gridTemplateColumns: "1fr 1.2fr",
              }}
            >
              <div className="flex flex-col gap-6">
                <div className="flex items-center gap-4">
                  <div className="feature-badge feature-badge--cyan">05</div>
                  <h3
                    className="text-foreground font-semibold"
                    style={{ fontSize: "clamp(20px, 2.5vw, 32px)" }}
                  >
                    Project Formulator
                  </h3>
                </div>
                <p
                  className="text-foreground leading-relaxed"
                  style={{ fontSize: "clamp(15px, 1.4vw, 18px)", opacity: 0.7 }}
                >
                  A ten-step guided wizard — from identification and justification to budget and governance — that helps managers turn diagnosis into public project proposals, with per-municipality draft autosave.
                </p>
                <div
                  className="h-px"
                  style={{
                    background:
                      "linear-gradient(90deg, color-mix(in srgb, var(--color-accent-cyan) 40%, transparent), transparent)",
                    maxWidth: "200px",
                  }}
                />
              </div>
              <Image
                src="/img/sebrae/formulador.png"
                alt="Project formulator — ten-step guided wizard with progress bar and the identification step open"
                width={1920}
                height={1200}
                className="w-full h-auto rounded-lg"
              />
            </div>
          </section>
        </>
      }
      implementationSteps={implementationSteps}
      outcomePrimary="OPP shipped as a complete platform: a React frontend, a read-only Fastify API, and a Python ETL pipeline feeding a fully documented MongoDB model — built solo in about three months and delivered to Sebrae Paraíba with runbooks and a per-source data dictionary for their team to operate and extend."
      nextProject={{ href: "/work/houston", label: "Houston" }}
    />
  );
}
