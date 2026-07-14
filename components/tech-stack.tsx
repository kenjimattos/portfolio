"use client";

import { useRef } from "react";
import type { IconType } from "react-icons";
import {
  SiJavascript,
  SiTypescript,
  SiPython,
  SiReact,
  SiVite,
  SiNextdotjs,
  SiTailwindcss,
  SiBootstrap,
  SiGit,
  SiFigma,
  SiStorybook,
  SiNodedotjs,
  SiFastify,
  SiPostgresql,
  SiMongodb,
} from "react-icons/si";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { TextPlugin } from "gsap/TextPlugin";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger, TextPlugin, useGSAP);

type Technology = {
  name: string;
  icon: IconType;
  color: string;
  description: string;
};

type TechnologyCategory = {
  category: string;
  items: Technology[];
};

const technologies: TechnologyCategory[] = [
  {
    category: "Frontend",
    items: [
      { name: "React", icon: SiReact, color: "#61DAFB", description: "Component architecture, hooks, state management" },
      { name: "Next.js", icon: SiNextdotjs, color: "var(--color-foreground)", description: "SSR, SSG, App Router, API routes" },
      { name: "Vite", icon: SiVite, color: "#646CFF", description: "Fast dev server, optimized builds" },
      { name: "Tailwind CSS", icon: SiTailwindcss, color: "#06B6D4", description: "Utility-first, custom configs, plugins" },
      { name: "Bootstrap", icon: SiBootstrap, color: "#7952B3", description: "Responsive grids, component theming" },
    ],
  },
  {
    category: "Backend & Data",
    items: [
      { name: "Node.js", icon: SiNodedotjs, color: "#5FA04E", description: "REST APIs, serverless functions" },
      { name: "Fastify", icon: SiFastify, color: "var(--color-foreground)", description: "High-performance HTTP servers, plugins" },
      { name: "PostgreSQL", icon: SiPostgresql, color: "#4169E1", description: "Relational modeling, queries, indexing" },
      { name: "MongoDB", icon: SiMongodb, color: "#47A248", description: "Document stores, aggregation pipelines" },
      { name: "Python", icon: SiPython, color: "#3776AB", description: "Scripting, automation, data handling" },
    ],
  },
  {
    category: "Languages & Tools",
    items: [
      { name: "JavaScript", icon: SiJavascript, color: "#F7DF1E", description: "ES6+, async patterns, DOM APIs" },
      { name: "TypeScript", icon: SiTypescript, color: "#3178C6", description: "Type safety, generics, utility types" },
      { name: "Git", icon: SiGit, color: "#F05032", description: "Branching strategies, CI/CD workflows" },
      { name: "Figma", icon: SiFigma, color: "#F24E1E", description: "Design systems, prototyping, handoff" },
      { name: "Storybook", icon: SiStorybook, color: "#FF4785", description: "Component docs, isolated development" },
    ],
  },
];

const categoryAccents = [
  "var(--color-primary)",
  "var(--color-accent-purple)",
  "var(--color-accent-cyan)",
];

export const TechStack = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const categoriesRef = useRef<HTMLDivElement>(null);
  const marqueeRef = useRef<HTMLDivElement>(null);
  const terminalRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    // Header: fade in, then draw the gradient line
    const headerTl = gsap.timeline({
      scrollTrigger: {
        trigger: headerRef.current,
        start: "top 85%",
        toggleActions: "play none none reverse",
      },
    });
    headerTl
      .fromTo(
        headerRef.current,
        { opacity: 0, y: 60 },
        { opacity: 1, y: 0, duration: 1, ease: "power3.out" }
      )
      .fromTo(
        ".header-line",
        { scaleX: 0 },
        { scaleX: 1, duration: 0.8, ease: "power3.inOut" },
        "-=0.5"
      );

    // Categories: each column cascades in — header slides, items rise, icons pop
    const categories = categoriesRef.current?.children;
    if (categories) {
      Array.from(categories).forEach((category, catIndex) => {
        const header = category.querySelector(".category-header");
        const items = category.querySelectorAll(".tech-item");
        const icons = category.querySelectorAll(".tech-icon");

        const tl = gsap.timeline({
          delay: catIndex * 0.15,
          scrollTrigger: {
            trigger: category,
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
        });
        tl.to(category, { opacity: 1, duration: 0.01 })
          .fromTo(
            header,
            { opacity: 0, x: -30 },
            { opacity: 1, x: 0, duration: 0.6, ease: "power3.out" }
          )
          .fromTo(
            items,
            { opacity: 0, y: 28 },
            { opacity: 1, y: 0, duration: 0.6, stagger: 0.09, ease: "power3.out", immediateRender: true },
            "-=0.3"
          )
          .fromTo(
            icons,
            { scale: 0, rotation: -20 },
            { scale: 1, rotation: 0, duration: 0.5, stagger: 0.09, ease: "back.out(2.2)", immediateRender: true },
            "<+=0.1"
          );
      });
    }

    // Marquee: base drift, speeding up and flipping direction with scroll velocity
    if (marqueeRef.current) {
      const marqueeContent = marqueeRef.current.querySelector(".marquee-content");
      if (marqueeContent) {
        const marqueeTween = gsap.to(marqueeContent, {
          xPercent: -50,
          duration: 20,
          ease: "none",
          repeat: -1,
        });

        ScrollTrigger.create({
          trigger: sectionRef.current,
          start: "top bottom",
          end: "bottom top",
          onUpdate: (self) => {
            const velocity = self.getVelocity();
            const boost = gsap.utils.clamp(1, 5, Math.abs(velocity) / 250);
            marqueeTween.timeScale(velocity < 0 ? -boost : boost);
            gsap.to(marqueeTween, {
              timeScale: velocity < 0 ? -1 : 1,
              duration: 1.2,
              ease: "power2.out",
              overwrite: true,
            });
          },
        });
      }
    }

    // Terminal: type the command, then print the output line by line
    if (terminalRef.current) {
      const terminalTl = gsap.timeline({
        scrollTrigger: {
          trigger: terminalRef.current,
          start: "top 75%",
          toggleActions: "play none none reverse",
        },
      });
      terminalTl
        .fromTo(
          terminalRef.current,
          { opacity: 0, y: 40 },
          { opacity: 1, y: 0, duration: 0.7, ease: "power3.out" }
        )
        .fromTo(
          ".terminal-command",
          { text: "" },
          { text: "cat philosophy.txt", duration: 0.9, ease: "none", immediateRender: true },
          "-=0.2"
        )
        .fromTo(
          ".terminal-line",
          { opacity: 0, x: -12 },
          { opacity: 1, x: 0, duration: 0.35, stagger: 0.3, ease: "power2.out", immediateRender: true },
          "+=0.2"
        )
        .fromTo(
          ".terminal-prompt",
          { opacity: 0 },
          { opacity: 1, duration: 0.3, immediateRender: true },
          "+=0.1"
        );
    }
  }, { scope: sectionRef });

  const allTechNames = technologies.flatMap((cat) => cat.items.map((item) => item.name));
  const marqueeText = [...allTechNames, ...allTechNames].join(" • ");

  return (
    <section
      id="tech"
      ref={sectionRef}
      className="w-full"
      style={{
        padding: "clamp(60px, 10vw, 120px) clamp(40px, 8vw, 180px)",
      }}
    >
      {/* Section Header */}
      <div
        ref={headerRef}
        className="flex items-center gap-4 mb-16"
        style={{ opacity: 0 }}
      >
        <span
          className="text-primary font-mono"
          style={{ fontSize: "clamp(14px, 1.5vw, 18px)" }}
        >
          03.
        </span>
        <h2
          className="text-foreground font-bold"
          style={{ fontSize: "clamp(24px, 3vw, 36px)" }}
        >
          Tech Stack
        </h2>
        <div
          className="header-line flex-1 h-px origin-left"
          style={{
            background: "linear-gradient(90deg, color-mix(in srgb, var(--color-accent-purple) 30%, transparent), color-mix(in srgb, var(--color-accent-cyan) 20%, transparent), transparent)",
            maxWidth: "300px"
          }}
        />
      </div>

      {/* Tech Categories */}
      <div
        ref={categoriesRef}
        className="grid gap-12 lg:gap-16"
        style={{
          gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 320px), 1fr))",
        }}
      >
        {technologies.map((category, catIndex) => (
          <div
            key={category.category}
            className="flex flex-col gap-6"
            style={{ opacity: 0 }}
          >
            {/* Category Header */}
            <div className="category-header flex items-center gap-3 pb-3 border-b border-foreground/10">
              <span
                className="font-mono"
                style={{
                  fontSize: "clamp(11px, 1vw, 13px)",
                  color: categoryAccents[catIndex % categoryAccents.length],
                }}
              >
                0{catIndex + 1}
              </span>
              <h3
                className="text-foreground font-semibold uppercase tracking-wider"
                style={{ fontSize: "clamp(13px, 1.2vw, 15px)" }}
              >
                {category.category}
              </h3>
            </div>

            {/* Skills List */}
            <div className="flex flex-col gap-5">
              {category.items.map((tech) => (
                <div
                  key={tech.name}
                  className="tech-item group flex items-start gap-3 cursor-default"
                >
                  <span
                    className="tech-icon w-9 h-9 shrink-0 flex items-center justify-center rounded-sm bg-foreground/5 group-hover:bg-foreground/10 group-hover:scale-110 group-hover:-rotate-6 transition-[background-color,scale,rotate] duration-300"
                    style={{ color: tech.color }}
                  >
                    <tech.icon size={18} aria-hidden />
                  </span>
                  <div className="flex flex-col gap-1">
                    <span
                      className="text-foreground font-medium group-hover:text-primary transition-colors duration-300"
                      style={{ fontSize: "clamp(14px, 1.3vw, 16px)" }}
                    >
                      {tech.name}
                    </span>
                    <p
                      className="text-foreground"
                      style={{
                        fontSize: "clamp(12px, 1vw, 13px)",
                        opacity: 0.5,
                        lineHeight: 1.4,
                      }}
                    >
                      {tech.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Marquee */}
      <div
        ref={marqueeRef}
        className="mt-20 overflow-hidden"
        style={{
          marginLeft: "calc(-1 * clamp(40px, 8vw, 180px))",
          marginRight: "calc(-1 * clamp(40px, 8vw, 180px))",
        }}
      >
        <div
          className="py-6"
          style={{
            borderTop: "1px solid rgba(22, 22, 22, 0.06)",
            borderBottom: "1px solid rgba(22, 22, 22, 0.06)",
          }}
        >
          <div className="marquee-content whitespace-nowrap inline-block">
            <span
              className="text-foreground font-medium"
              style={{
                fontSize: "clamp(14px, 1.5vw, 18px)",
                opacity: 0.15,
                letterSpacing: "0.1em",
              }}
            >
              {marqueeText} • {marqueeText}
            </span>
          </div>
        </div>
      </div>

      {/* Code Block - Terminal Style */}
      <div
        ref={terminalRef}
        className="mt-16 rounded-lg overflow-hidden"
        style={{
          backgroundColor: "var(--color-foreground)",
          border: "1px solid rgba(255, 255, 249, 0.1)",
          opacity: 0,
        }}
      >
        {/* Terminal Header */}
        <div
          className="flex items-center gap-2 px-4 py-3"
          style={{ borderBottom: "1px solid rgba(255, 255, 249, 0.06)" }}
        >
          <span className="w-3 h-3 rounded-full bg-red-500/80" />
          <span className="w-3 h-3 rounded-full bg-yellow-500/80" />
          <span className="w-3 h-3 rounded-full bg-green-500/80" />
          <span
            className="ml-4 text-background font-mono"
            style={{ fontSize: "clamp(11px, 1vw, 13px)", opacity: 0.5 }}
          >
            ~/kenji/skills
          </span>
        </div>

        {/* Terminal Content */}
        <div
          className="p-6 font-mono text-background"
          style={{ fontSize: "clamp(12px, 1.2vw, 14px)" }}
        >
          <div className="flex gap-2 mb-2">
            <span style={{ color: "var(--color-accent-cyan)" }}>$</span>
            <span className="terminal-command" style={{ color: "rgba(255,255,249,0.8)" }}>cat philosophy.txt</span>
          </div>
          <div className="leading-relaxed">
            <p className="terminal-line mb-2" style={{ color: "rgba(255,255,249,0.7)" }}><span style={{ color: "var(--color-accent-purple-light)" }}>&gt;</span> Real products are built where design meets the database.</p>
            <p className="terminal-line mb-2" style={{ color: "rgba(255,255,249,0.7)" }}><span style={{ color: "var(--color-accent-cyan)" }}>&gt;</span> I own the whole path: Figma, frontend, backend, deploy.</p>
            <p className="terminal-line" style={{ color: "rgba(255,255,249,0.7)" }}><span style={{ color: "var(--color-accent-purple-light)" }}>&gt;</span> If it doesn&apos;t survive production, it doesn&apos;t count.</p>
          </div>
          <div className="terminal-prompt flex gap-2 mt-4">
            <span style={{ color: "var(--color-accent-cyan)" }}>$</span>
            <span
              className="inline-block w-2 h-4 animate-pulse"
              style={{ animation: "pulse 1s infinite", backgroundColor: "var(--color-accent-purple)" }}
            />
          </div>
        </div>
      </div>
    </section>
  );
};
