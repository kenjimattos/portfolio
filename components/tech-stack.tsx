"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { prefersReducedMotion } from "@/lib/motion";
import { useLocale } from "@/lib/i18n";

gsap.registerPlugin(ScrollTrigger, useGSAP);

/* Os ícones das marcas saíram: numa tabela eles competiriam com o nome da
   tecnologia sem acrescentar informação — a coluna já diz o que é. */
const TECH_BASE = [
  ["React", "Next.js", "Vite", "Tailwind CSS", "Bootstrap"],
  ["Node.js", "Fastify", "PostgreSQL", "MongoDB", "Python"],
  ["JavaScript", "TypeScript", "Git", "Figma", "Storybook"],
] as const;

const COPY = {
  en: {
    heading: "Stack",
    note: "What I use, and what I actually do with it.",
    columns: ["Category", "Technology", "Applied to"],
    categories: ["Frontend", "Backend & data", "Languages & tools"],
    descriptions: [
      [
        "Component architecture, hooks, state management",
        "SSR, SSG, App Router, API routes",
        "Fast dev server, optimized builds",
        "Utility-first, custom configs, plugins",
        "Responsive grids, component theming",
      ],
      [
        "REST APIs, serverless functions",
        "High-performance HTTP servers, plugins",
        "Relational modeling, queries, indexing",
        "Document stores, aggregation pipelines",
        "Scripting, automation, data handling",
      ],
      [
        "ES6+, async patterns, DOM APIs",
        "Type safety, generics, utility types",
        "Branching strategies, CI/CD workflows",
        "Design systems, prototyping, handoff",
        "Component docs, isolated development",
      ],
    ],
    philosophy: [
      "Real products are built where design meets the database.",
      "I own the whole path: Figma, frontend, backend, deploy.",
      "If it doesn't survive production, it doesn't count.",
    ],
  },
  pt: {
    heading: "Stack",
    note: "O que eu uso, e o que eu de fato faço com isso.",
    columns: ["Categoria", "Tecnologia", "Aplicado a"],
    categories: ["Frontend", "Backend & dados", "Linguagens & ferramentas"],
    descriptions: [
      [
        "Arquitetura de componentes, hooks, gestão de estado",
        "SSR, SSG, App Router, rotas de API",
        "Dev server rápido, builds otimizados",
        "Utility-first, configs customizadas, plugins",
        "Grids responsivos, temas de componentes",
      ],
      [
        "APIs REST, funções serverless",
        "Servidores HTTP de alta performance, plugins",
        "Modelagem relacional, queries, índices",
        "Documentos, pipelines de agregação",
        "Scripts, automação, tratamento de dados",
      ],
      [
        "ES6+, padrões assíncronos, APIs do DOM",
        "Tipagem segura, generics, utility types",
        "Estratégias de branch, fluxos de CI/CD",
        "Design systems, protótipos, handoff",
        "Docs de componentes, desenvolvimento isolado",
      ],
    ],
    philosophy: [
      "Produto de verdade nasce onde o design encontra o banco de dados.",
      "Eu cuido do caminho inteiro: Figma, frontend, backend, deploy.",
      "Se não sobrevive à produção, não conta.",
    ],
  },
} as const;

export const TechStack = () => {
  const t = COPY[useLocale()];
  const sectionRef = useRef<HTMLElement>(null);
  const tableRef = useRef<HTMLTableSectionElement>(null);

  const rows = TECH_BASE.flatMap((items, catIndex) =>
    items.map((name, i) => ({
      /* A categoria só é escrita na primeira linha do grupo; as seguintes
         levam a aspa de repetição, como numa tabela impressa. */
      category: i === 0 ? t.categories[catIndex] : "″",
      repeated: i !== 0,
      name,
      description: t.descriptions[catIndex][i],
    }))
  );

  useGSAP(
    () => {
      const trs = tableRef.current?.children;
      if (!trs) return;

      if (prefersReducedMotion()) {
        gsap.set(trs, { opacity: 1 });
        return;
      }

      gsap.fromTo(
        trs,
        { opacity: 0 },
        {
          opacity: 1,
          duration: 0.5,
          stagger: 0.04,
          ease: "none",
          scrollTrigger: {
            trigger: tableRef.current,
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
        }
      );
    },
    { scope: sectionRef }
  );

  return (
    <section id="stack" ref={sectionRef}>
      <div className="wrap">
        <div className="ed-grid sec-head">
          <div className="num">
            <span className="meta dimmer">/03</span>
          </div>
          <div className="title">
            <h2>{t.heading}</h2>
          </div>
          <div className="note">
            <p className="meta dim">{t.note}</p>
          </div>
        </div>

        <table className="stack-table">
          <thead>
            <tr>
              <th className="meta st-cat">{t.columns[0]}</th>
              <th className="meta st-name">{t.columns[1]}</th>
              <th className="meta st-desc">{t.columns[2]}</th>
            </tr>
          </thead>
          <tbody ref={tableRef}>
            {rows.map((row) => (
              <tr key={row.name}>
                <td className={`meta st-cat${row.repeated ? " dimmer" : ""}`}>
                  {row.category}
                </td>
                <td className="st-name">{row.name}</td>
                <td className="st-desc">{row.description}</td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="stack-creed">
          {t.philosophy.map((line) => (
            <p key={line} className="meta dim">
              {line}
            </p>
          ))}
        </div>
      </div>
    </section>
  );
};
