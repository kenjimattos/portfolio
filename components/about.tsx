"use client";

import Image from "next/image";
import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { prefersReducedMotion } from "@/lib/motion";
import { useLocale } from "@/lib/i18n";
import { Marked } from "@/components/marks";

gsap.registerPlugin(ScrollTrigger, useGSAP);

const COPY = {
  en: {
    heading: "About",
    note: ["São Bernardo do Campo", "São Paulo, Brazil"],
    photoAlt: "Portrait of Kenji Mattos",
    /* A abertura é partida em três porque é ela que a caneta marca: o
       laço cai na afirmação que o resto da seção precisa sustentar. */
    lead: {
      before: "I build",
      marked: "whole products",
      after:
        ". On my latest projects I owned everything: from the first Figma prototype to the React frontend, the PostgreSQL schema behind it, and the CI/CD pipeline that puts it in production.",
    },
    bio: [
      "Most of my work lives in complex operational and financial domains: scheduling, attendance, payments, and multi-tenant access control. The hard part isn't the interface; it's encoding messy business rules into systems that stay reliable when real money and real people depend on them.",
      "I've also coordinated a small engineering team, setting code standards, review practices, and workflows as the system grew.",
    ],
  },
  pt: {
    heading: "Sobre",
    note: ["São Bernardo do Campo", "São Paulo, Brasil"],
    photoAlt: "Retrato de Kenji Mattos",
    lead: {
      before: "Eu construo",
      marked: "produtos inteiros",
      after:
        ". Nos meus últimos projetos, fui responsável por tudo: do primeiro protótipo no Figma ao frontend em React, o schema PostgreSQL por trás e o pipeline de CI/CD que coloca tudo em produção.",
    },
    bio: [
      "A maior parte do meu trabalho vive em domínios operacionais e financeiros complexos: escalas, presença, pagamentos e controle de acesso multi-tenant. A parte difícil não é a interface; é codificar regras de negócio bagunçadas em sistemas que continuam confiáveis quando dinheiro e pessoas de verdade dependem deles.",
      "Também coordenei um pequeno time de engenharia, definindo padrões de código, práticas de review e fluxos de trabalho conforme o sistema crescia.",
    ],
  },
} as const;

export const About = () => {
  const t = COPY[useLocale()];
  const sectionRef = useRef<HTMLElement>(null);
  const bodyRef = useRef<HTMLDivElement>(null);
  const colRefs = useRef<(HTMLSpanElement | null)[]>([]);

  useGSAP(
    () => {
      const parts = bodyRef.current?.children;
      const cols = colRefs.current.filter((el): el is HTMLSpanElement => !!el);
      if (!parts || cols.length === 0) return;

      const reduced = prefersReducedMotion();

      if (reduced) {
        gsap.set(parts, { opacity: 1, y: 0 });
      } else {
        gsap.fromTo(
          parts,
          { opacity: 0, y: 40 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            stagger: 0.12,
            ease: "power3.out",
            scrollTrigger: {
              trigger: bodyRef.current,
              start: "top 85%",
              toggleActions: "play none none reverse",
            },
          }
        );
      }

      /* A palavra vertical desce. As duas colunas caem de cima da faixa
         para o lugar, "END TO" primeiro e "END" atrás — o escalonamento é
         o que faz ler como duas peças sendo assentadas, e não como um
         bloco só entrando.

         A distância de partida é MEDIDA, não uma porcentagem chutada:
         cada coluna começa exatamente com o seu rodapé encostando na
         borda de cima da faixa, mais uma folga. Com porcentagem da
         própria altura as duas colunas têm tamanhos diferentes ("END TO"
         tem o dobro de "END"), e o valor que esconde uma deixa um fio da
         outra aparecendo no topo. offsetTop e offsetHeight não são
         afetados por transform, então dá para medir com a animação já
         aplicada — e remedir a cada refresh do ScrollTrigger, que é
         quando a fonte terminou de carregar ou a janela mudou.

         É fundo e fica ATRÁS do texto que o visitante está lendo, então a
         curva é toda de desaceleração: chega e para, sem quique. */
      const starts = cols.map(() => 0);
      const measure = () => {
        cols.forEach((col, i) => {
          starts[i] = -(col.offsetTop + col.offsetHeight + 16);
        });
      };
      measure();

      const drop = (t: number) => (t >= 1 ? 1 : 1 - Math.pow(2, -10 * t));
      const apply = (p: number) => {
        cols.forEach((col, i) => {
          const from = i * 0.15;
          const to = 0.4 + i * 0.15;
          const t = drop(Math.min(1, Math.max(0, (p - from) / (to - from))));
          col.style.transform = `translateY(${(starts[i] * (1 - t)).toFixed(2)}px)`;
        });
      };

      if (reduced) {
        cols.forEach((col) => {
          col.style.transform = "none";
        });
        return;
      }

      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: "top bottom",
        end: "bottom top",
        scrub: true,
        onRefresh: measure,
        onUpdate: (self) => apply(self.progress),
      });
    },
    { scope: sectionRef }
  );

  return (
    <section
      id="about"
      ref={sectionRef}
      className="about-band on-ink"
      style={{ marginTop: "var(--s16)" }}
    >
      <span className="about-vword" aria-hidden="true">
        {["END TO", "END"].map((part, i) => (
          <span
            key={part}
            className="about-vword-col"
            ref={(el) => {
              colRefs.current[i] = el;
            }}
          >
            {part}
          </span>
        ))}
      </span>

      <div className="wrap about-inner">
        <div className="ed-grid sec-head">
          <div className="num">
            <span className="meta dimmer">/02</span>
          </div>
          <div className="title">
            <h2 style={{ color: "var(--paper)" }}>{t.heading}</h2>
          </div>
          <div className="note">
            <p className="meta dim">
              {t.note[0]}
              <br />
              {t.note[1]}
            </p>
          </div>
        </div>

        <div className="ed-grid" ref={bodyRef} style={{ paddingBottom: "var(--s12)" }}>
          <div className="about-portrait">
            <Image
              src="/img/about-photo.png"
              alt={t.photoAlt}
              fill
              quality={90}
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 30vw"
            />
          </div>
          <div className="about-text">
            <p>
              {t.lead.before} <Marked kind="loop">{t.lead.marked}</Marked>
              {t.lead.after}
            </p>
            {t.bio.map((paragraph) => (
              <p key={paragraph} className="dim">
                {paragraph}
              </p>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
