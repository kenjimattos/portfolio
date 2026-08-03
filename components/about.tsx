"use client";

import Image from "next/image";
import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { prefersReducedMotion } from "@/lib/motion";
import { useLocale } from "@/lib/i18n";

gsap.registerPlugin(ScrollTrigger, useGSAP);

const SKILL_ITEMS = [
  ["JavaScript", "TypeScript", "Python"],
  ["React", "Vite", "Next.js"],
  ["Tailwind CSS", "Bootstrap"],
  ["Git", "Figma", "Storybook"],
  ["Node.js", "Fastify", "PostgresSQL", "MongoDB"],
] as const;

const COPY = {
  en: {
    heading: "About Me",
    photoAlt: "Portrait of Kenji Mattos",
    bio1: "I build products end to end. On my latest projects I owned everything from the first Figma prototype to the React frontend, the PostgreSQL schema behind it, and the CI/CD pipeline that ships it — design, code, and deploy as one continuous job.",
    bio2: "Most of my work lives in complex operational and financial domains: scheduling, attendance, payments, and multi-tenant access control. The hard part isn't the interface — it's encoding messy business rules into systems that stay reliable when real money and real people depend on them.",
    bio3: "I've also coordinated a small engineering team, setting code standards, review practices, and workflows as the system grew. Today I work mostly with React, Next.js, Node.js, and PostgreSQL, turning manual operations into software.",
    categories: ["Languages", "Frontend", "Styling", "Tools", "Backend"],
  },
  pt: {
    heading: "Sobre mim",
    photoAlt: "Retrato de Kenji Mattos",
    bio1: "Eu construo produtos de ponta a ponta. Nos meus últimos projetos, fui responsável por tudo: do primeiro protótipo no Figma ao frontend em React, o schema PostgreSQL por trás e o pipeline de CI/CD que coloca tudo em produção — design, código e deploy como um trabalho contínuo.",
    bio2: "A maior parte do meu trabalho vive em domínios operacionais e financeiros complexos: escalas, presença, pagamentos e controle de acesso multi-tenant. A parte difícil não é a interface — é codificar regras de negócio bagunçadas em sistemas que continuam confiáveis quando dinheiro e pessoas de verdade dependem deles.",
    bio3: "Também coordenei um pequeno time de engenharia, definindo padrões de código, práticas de review e fluxos de trabalho conforme o sistema crescia. Hoje trabalho principalmente com React, Next.js, Node.js e PostgreSQL, transformando operações manuais em software.",
    categories: ["Linguagens", "Frontend", "Estilo", "Ferramentas", "Backend"],
  },
} as const;

export const About = () => {
  const t = COPY[useLocale()];
  const skills = SKILL_ITEMS.map((items, i) => ({
    category: t.categories[i],
    items,
  }));
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const skillsRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (prefersReducedMotion()) {
      gsap.set([headerRef.current, imageRef.current, contentRef.current], {
        opacity: 1,
        y: 0,
        scale: 1,
      });
      if (skillsRef.current) {
        gsap.set(skillsRef.current.children, { opacity: 1, x: 0 });
      }
      return;
    }

    // Header animation
    gsap.fromTo(
      headerRef.current,
      { opacity: 0, y: 60 },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: headerRef.current,
          start: "top 85%",
          toggleActions: "play none none reverse",
        },
      }
    );

    // Image reveal animation
    gsap.fromTo(
      imageRef.current,
      { opacity: 0, scale: 0.9, y: 40 },
      {
        opacity: 1,
        scale: 1,
        y: 0,
        duration: 1.2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: imageRef.current,
          start: "top 80%",
          toggleActions: "play none none reverse",
        },
      }
    );

    // Content animation
    gsap.fromTo(
      contentRef.current,
      { opacity: 0, y: 50 },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: contentRef.current,
          start: "top 80%",
          toggleActions: "play none none reverse",
        },
      }
    );

    // Skills staggered animation
    const skillCategories = skillsRef.current?.children;
    if (skillCategories) {
      gsap.fromTo(
        skillCategories,
        { opacity: 0, x: -30 },
        {
          opacity: 1,
          x: 0,
          duration: 0.8,
          stagger: 0.15,
          ease: "power3.out",
          scrollTrigger: {
            trigger: skillsRef.current,
            start: "top 80%",
            toggleActions: "play none none reverse",
          },
        }
      );
    }

  }, { scope: sectionRef });

  return (
    <section
      id="about"
      ref={sectionRef}
      className="w-full"
      style={{
        padding: "clamp(60px, 10vw, 120px) clamp(40px, 8vw, 180px)",
      }}
    >
      {/* Section Header */}
      <div
        ref={headerRef}
        className="flex items-center gap-4 mb-12"
        style={{ opacity: 0 }}
      >
        <h2
          className="text-foreground font-bold"
          style={{ fontSize: "clamp(24px, 3vw, 36px)" }}
        >
          {t.heading}
        </h2>
        <div
          className="flex-1 h-px bg-foreground"
          style={{ opacity: 0.1, maxWidth: "300px" }}
        />
      </div>

      {/* Main Content Grid */}
      <div
        className="grid gap-12 lg:gap-16"
        style={{
          gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 400px), 1fr))",
        }}
      >
        {/* Left Column - Image + Stats */}
        <div className="flex flex-col gap-8">
          {/* Photo with decorative elements */}
          <div
            ref={imageRef}
            className="relative"
            style={{ opacity: 0 }}
          >
            {/* Decorative border - cyan accent */}
            <div
              className="absolute rounded-sm pointer-events-none"
              style={{
                top: "16px",
                left: "16px",
                right: "-16px",
                bottom: "-16px",
                border: "2px solid color-mix(in srgb, var(--color-accent-cyan) 40%, transparent)",
                zIndex: 0,
              }}
            />
            {/* Image container */}
            <div
              className="relative rounded-sm overflow-hidden"
              style={{
                backgroundColor: "var(--color-foreground)",
                zIndex: 1,
              }}
            >
              <Image
                quality={90}
                src="/img/about-photo.png"
                alt={t.photoAlt}
                width={480}
                height={560}
                className="w-full h-auto object-cover"
              />
              {/* Overlay gradient - purple tint */}
              <div
                className="absolute inset-0 pointer-events-none"
                style={{
                  background: "linear-gradient(135deg, transparent 50%, color-mix(in srgb, var(--color-accent-purple) 15%, transparent) 100%)",
                }}
              />
            </div>
          </div>

        </div>

        {/* Right Column - Text + Skills */}
        <div className="flex flex-col gap-8">
          {/* Bio text */}
          <div
            ref={contentRef}
            className="flex flex-col gap-6"
            style={{ opacity: 0 }}
          >
            <p
              className="text-foreground leading-relaxed"
              style={{ fontSize: "clamp(16px, 1.8vw, 20px)" }}
            >
              {t.bio1}
            </p>
            <p
              className="text-foreground leading-relaxed"
              style={{
                fontSize: "clamp(16px, 1.8vw, 20px)",
                opacity: 0.8,
              }}
            >
              {t.bio2}
            </p>
            <p
              className="text-foreground leading-relaxed"
              style={{
                fontSize: "clamp(16px, 1.8vw, 20px)",
                opacity: 0.8,
              }}
            >
              {t.bio3}
            </p>
          </div>

          {/* Skills */}
          <div
            ref={skillsRef}
            className="flex flex-col gap-6 pt-4"
          >
            {skills.map((skillGroup, index) => (
              <div
                key={index}
                className="flex flex-col gap-2"
                style={{ opacity: 0 }}
              >
                <span
                  className="text-primary font-medium uppercase tracking-wider"
                  style={{ fontSize: "clamp(11px, 1vw, 13px)" }}
                >
                  {skillGroup.category}
                </span>
                <div className="flex flex-wrap gap-2">
                  {skillGroup.items.map((skill, skillIndex) => (
                    <span
                      key={skillIndex}
                      className="px-3 py-1 rounded-sm text-foreground"
                      style={{
                        fontSize: "clamp(13px, 1.2vw, 15px)",
                        backgroundColor: "rgba(22, 22, 22, 0.05)",
                        border: "1px solid rgba(22, 22, 22, 0.1)",
                      }}
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Code signature */}
          <div
            className="mt-4 p-4 rounded-sm font-mono"
            style={{
              backgroundColor: "var(--color-foreground)",
              color: "var(--color-background)",
              fontSize: "clamp(12px, 1.2vw, 14px)",
            }}
          >
            <span style={{ color: "rgba(255,255,249,0.5)" }}>{"// "}</span>
            <span style={{ color: "var(--color-accent-cyan)" }}>const</span>{" "}
            <span style={{ color: "#60a5fa" }}>kenji</span>{" "}
            <span style={{ color: "rgba(255,255,249,0.5)" }}>=</span>{" "}
            <span style={{ color: "#fbbf24" }}>{"{"}</span>{" "}
            <span style={{ color: "var(--color-accent-purple-light)" }}>code</span>
            <span style={{ color: "rgba(255,255,249,0.5)" }}>:</span>{" "}
            <span style={{ color: "var(--color-accent-cyan)" }}>&quot;clean&quot;</span>
            <span style={{ color: "rgba(255,255,249,0.5)" }}>,</span>{" "}
            <span style={{ color: "var(--color-accent-purple-light)" }}>design</span>
            <span style={{ color: "rgba(255,255,249,0.5)" }}>:</span>{" "}
            <span style={{ color: "var(--color-accent-cyan)" }}>&quot;thoughtful&quot;</span>{" "}
            <span style={{ color: "#fbbf24" }}>{"}"}</span>
            <span style={{ color: "rgba(255,255,249,0.5)" }}>;</span>
          </div>
        </div>
      </div>
    </section>
  );
};
