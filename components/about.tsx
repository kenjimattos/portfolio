"use client";

import Image from "next/image";
import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { prefersReducedMotion } from "@/lib/motion";
import { useLocale } from "@/lib/i18n";

gsap.registerPlugin(ScrollTrigger, useGSAP);

const COPY = {
  en: {
    heading: "About",
    note: ["São Bernardo do Campo", "São Paulo, Brazil"],
    photoAlt: "Portrait of Kenji Mattos",
    bio: [
      "I build whole products. On my latest projects I owned everything: from the first Figma prototype to the React frontend, the PostgreSQL schema behind it, and the CI/CD pipeline that puts it in production.",
      "Most of my work lives in complex operational and financial domains: scheduling, attendance, payments, and multi-tenant access control. The hard part isn't the interface; it's encoding messy business rules into systems that stay reliable when real money and real people depend on them.",
      "I've also coordinated a small engineering team, setting code standards, review practices, and workflows as the system grew.",
    ],
  },
  pt: {
    heading: "Sobre",
    note: ["São Bernardo do Campo", "São Paulo, Brasil"],
    photoAlt: "Retrato de Kenji Mattos",
    bio: [
      "Eu construo produtos inteiros. Nos meus últimos projetos, fui responsável por tudo: do primeiro protótipo no Figma ao frontend em React, o schema PostgreSQL por trás e o pipeline de CI/CD que coloca tudo em produção.",
      "A maior parte do meu trabalho vive em domínios operacionais e financeiros complexos: escalas, presença, pagamentos e controle de acesso multi-tenant. A parte difícil não é a interface; é codificar regras de negócio bagunçadas em sistemas que continuam confiáveis quando dinheiro e pessoas de verdade dependem deles.",
      "Também coordenei um pequeno time de engenharia, definindo padrões de código, práticas de review e fluxos de trabalho conforme o sistema crescia.",
    ],
  },
} as const;

export const About = () => {
  const t = COPY[useLocale()];
  const sectionRef = useRef<HTMLElement>(null);
  const bodyRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const parts = bodyRef.current?.children;
      if (!parts) return;

      if (prefersReducedMotion()) {
        gsap.set(parts, { opacity: 1, y: 0 });
        return;
      }

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
        END TO END
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
              quality={85}
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 30vw"
            />
          </div>
          <div className="about-text">
            {t.bio.map((paragraph, i) => (
              <p key={i} className={i === 0 ? undefined : "dim"}>
                {paragraph}
              </p>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
