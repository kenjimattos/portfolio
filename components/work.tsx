"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { siteConfig } from "@/config/site";
import { prefersReducedMotion } from "@/lib/motion";
import { localeHref, useLocale } from "@/lib/i18n";
import { PenMark } from "@/components/marks";

gsap.registerPlugin(ScrollTrigger, useGSAP);

/* As quatro telas são renders com fundo próprio e enquadramentos muito
   diferentes: notebook em ângulo, notebook pequeno e centrado, mão
   segurando um celular, recorte de dashboard. `zoom` e o ponto focal
   (`fx`/`fy`) puxam o assunto de cada uma para a mesma escala aparente
   dentro da janela 16:10, senão a régua da lista ficaria visualmente
   torta mesmo com todas as linhas do mesmo tamanho. */
const BASE_PROJECTS = [
  {
    id: "houston",
    name: "Houston",
    year: "2025",
    stack: "React · TypeScript · Supabase · shadcn/ui retokenizado",
    image: "/img/work-houston.png",
    href: "/work/houston",
    zoom: 1.18,
    fx: "62%",
    fy: "52%",
  },
  {
    id: "sebrae-opp",
    name: "Sebrae OPP",
    year: "2026",
    stack: "React 19 · TypeScript · Fastify · MongoDB · Python ETL",
    image: "/img/work-sebrae-opp.png",
    href: "/work/sebrae-opp",
    zoom: 2.05,
    fx: "70%",
    fy: "41%",
  },
  {
    id: "revoluna",
    name: "Revoluna",
    year: "2024",
    stack: "Figma · Flutter · FlutterFlow · Supabase · duas lojas em 2 meses",
    image: "/img/work-revoluna.png",
    href: "/work/revoluna",
    zoom: 1.22,
    fx: "66%",
    fy: "44%",
  },
  {
    id: "finance",
    name: "Finance",
    year: "2026",
    stack: "TypeScript · Express · SQLite · React",
    image: "/img/work-finance.png",
    href: "/work/finance",
    zoom: 1.04,
    fx: "56%",
    fy: "38%",
  },
] as const;

/* A manchete nomeia o problema, não o projeto. O nome vira metadado, ao
   lado do ano e da stack — é a regra da spec editorial dos cases. */
const COPY = {
  en: {
    heading: ["Problems", "solved"],
    note: "Design decisions and code decisions, side by side.",
    viewCase: "View case",
    github: "See more on GitHub",
    alt: (name: string) => `${name} interface`,
    projects: [
      {
        kind: "Web platform",
        head: "Registering a hospital took ten minutes, and the address came out wrong.",
        after: "Today it takes thirty seconds, and it doesn't.",
      },
      {
        kind: "Gov-tech",
        head: "Sebrae knew which platform needed to exist. What was missing was building it.",
        after:
          "Thirteen sources, 223 municipalities, from the ETL to the design system — in about three months.",
      },
      {
        kind: "Mobile app",
        head: "Shift check-in ran on trust.",
        after: "It now runs on a geofence — without treating the doctor as a suspect.",
      },
      {
        kind: "Personal project",
        head: "The provider reissued every ID on each reconnection.",
        after: "The entire history came back as if it were new.",
      },
    ],
  },
  pt: {
    heading: ["Problemas", "resolvidos"],
    note: "Decisões de design e de código lado a lado.",
    viewCase: "Ver case",
    github: "Ver mais no GitHub",
    alt: (name: string) => `Interface do ${name}`,
    projects: [
      {
        kind: "Plataforma web",
        head: "Cadastrar um hospital levava dez minutos e o endereço saía errado.",
        after: "Hoje leva trinta segundos e não sai.",
      },
      {
        kind: "Gov-tech",
        head: "O Sebrae sabia qual plataforma precisava existir. Faltava construí-la.",
        after:
          "Treze fontes, 223 municípios, do ETL ao design system — em cerca de três meses.",
      },
      {
        kind: "App mobile",
        head: "O check-in do plantão dependia de confiança.",
        after: "Passou a depender de geofence — sem transformar o médico em suspeito.",
      },
      {
        kind: "Projeto pessoal",
        head: "O provedor reemitia todos os IDs a cada reconexão.",
        after: "O histórico inteiro voltava como se fosse novo.",
      },
    ],
  },
} as const;

export const Work = () => {
  const locale = useLocale();
  const t = COPY[locale];
  const projects = BASE_PROJECTS.map((p, i) => ({ ...p, ...t.projects[i] }));
  const sectionRef = useRef<HTMLElement>(null);
  const listRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const rows = listRef.current?.children;
      if (!rows) return;

      if (prefersReducedMotion()) {
        gsap.set(rows, { opacity: 1, y: 0 });
        return;
      }

      /* A linha entra inteira, de baixo, curta. A lista não é um lugar
         para animação: o que precisa aparecer é a régua. */
      Array.from(rows).forEach((row) => {
        gsap.fromTo(
          row,
          { opacity: 0, y: 40 },
          {
            opacity: 1,
            y: 0,
            duration: 0.7,
            ease: "power3.out",
            scrollTrigger: {
              trigger: row,
              start: "top 88%",
              toggleActions: "play none none reverse",
            },
          }
        );
      });
    },
    { scope: sectionRef }
  );

  return (
    <section id="work" ref={sectionRef}>
      <div className="wrap">
        <div className="ed-grid sec-head">
          <div className="num">
            <span className="meta dimmer">/01</span>
          </div>
          <div className="title">
            <h2>
              {t.heading[0]}
              <br />
              {t.heading[1]}
            </h2>
          </div>
          <div className="note">
            <p className="meta dim">{t.note}</p>
          </div>
        </div>

        <div className="work-list" ref={listRef}>
          {projects.map((project, index) => (
            <Link
              key={project.id}
              href={localeHref(locale, project.href)}
              className="work-row"
              /* Ímpares com a tela à direita, pares à esquerda. */
              data-side={index % 2 === 1 ? "left" : "right"}
              style={{ opacity: 0 }}
            >
              <div className="ed-grid row-inner">
                <div className="wr-idx">
                  <span className="wr-num">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                </div>

                <div className="wr-copy">
                  <div className="wr-bar meta">
                    <span className="kind">{project.kind}</span>
                    <span className="name">{project.name}</span>
                    <span className="year">{project.year}</span>
                  </div>
                  <h3 className="wr-head">{project.head}</h3>
                  <p className="wr-after">{project.after}</p>
                  <div className="wr-foot">
                    <span className="meta wr-stack">{project.stack}</span>
                    {/* Mesmo recorte da nota do masthead: papel, filete de
                        tinta e a sombra dura. A seta é a mesma caneta, e
                        aponta sempre para a tela do projeto — nas linhas
                        invertidas o recorte inteiro espelha junto. A
                        caneta escreve a seta quando o cursor chega na
                        linha, e desfaz quando ele sai. */}
                    <span className="meta wr-go">
                      {t.viewCase}
                      <PenMark kind="arrow" on="hover" />
                    </span>
                  </div>
                </div>

                <div className="wr-shot">
                  <div
                    className="wr-window"
                    style={
                      {
                        "--z": project.zoom,
                        "--fx": project.fx,
                        "--fy": project.fy,
                      } as React.CSSProperties
                    }
                  >
                    <Image
                      src={project.image}
                      alt={t.alt(project.name)}
                      fill
                      quality={90}
                      className="object-cover"
                      sizes="(max-width: 900px) 100vw, 42vw"
                    />
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>

        <div style={{ paddingBlock: "var(--s6)" }}>
          <a
            href={siteConfig.profile.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="meta btn-line"
          >
            {t.github} &nbsp;↗
          </a>
        </div>
      </div>
    </section>
  );
};
