"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger, useGSAP);

const technologies = [
  {
    category: "Frontend",
    items: [
      { name: "React", icon: "⚛️", level: 95, description: "Component architecture, hooks, state management" },
      { name: "Next.js", icon: "▲", level: 90, description: "SSR, SSG, App Router, API routes" },
      { name: "TypeScript", icon: "TS", level: 92, description: "Type safety, generics, utility types" },
      { name: "Vue.js", icon: "🟢", level: 75, description: "Composition API, Vuex, Vue Router" },
    ],
  },
  {
    category: "Styling",
    items: [
      { name: "Tailwind CSS", icon: "🎨", level: 95, description: "Utility-first, custom configs, plugins" },
      { name: "CSS/SASS", icon: "✨", level: 90, description: "Animations, Grid, Flexbox, Variables" },
      { name: "Framer Motion", icon: "🎬", level: 85, description: "Complex animations, gestures, variants" },
      { name: "GSAP", icon: "🟩", level: 88, description: "ScrollTrigger, timelines, morphing" },
    ],
  },
  {
    category: "Tools & Others",
    items: [
      { name: "Git", icon: "📦", level: 90, description: "Branching strategies, CI/CD workflows" },
      { name: "Figma", icon: "🎯", level: 88, description: "Design systems, prototyping, handoff" },
      { name: "Node.js", icon: "🟢", level: 80, description: "REST APIs, Express, serverless" },
      { name: "Testing", icon: "🧪", level: 78, description: "Jest, React Testing Library, Cypress" },
    ],
  },
];

export const TechStack = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const categoriesRef = useRef<HTMLDivElement>(null);
  const marqueeRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
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

    // Categories stagger animation
    const categories = categoriesRef.current?.children;
    if (categories) {
      Array.from(categories).forEach((category) => {
        gsap.fromTo(
          category,
          { opacity: 0, y: 50 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: "power3.out",
            scrollTrigger: {
              trigger: category,
              start: "top 85%",
              toggleActions: "play none none reverse",
            },
          }
        );

        // Animate skill bars within each category
        const skillBars = category.querySelectorAll(".skill-bar-fill");
        gsap.fromTo(
          skillBars,
          { scaleX: 0 },
          {
            scaleX: 1,
            duration: 1,
            stagger: 0.1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: category,
              start: "top 80%",
              toggleActions: "play none none reverse",
            },
          }
        );
      });
    }

    // Marquee animation
    if (marqueeRef.current) {
      const marqueeContent = marqueeRef.current.querySelector(".marquee-content");
      if (marqueeContent) {
        gsap.to(marqueeContent, {
          xPercent: -50,
          duration: 20,
          ease: "none",
          repeat: -1,
        });
      }
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
          className="flex-1 h-px"
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
            <div className="flex items-center gap-3 pb-3 border-b border-foreground/10">
              <span
                className="font-mono"
                style={{
                  fontSize: "clamp(11px, 1vw, 13px)",
                  color: catIndex === 0 ? "var(--color-primary)" : catIndex === 1 ? "var(--color-accent-purple)" : "var(--color-accent-cyan)"
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
                  className="group cursor-default"
                >
                  {/* Skill Header */}
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-3">
                      <span
                        className="w-8 h-8 flex items-center justify-center rounded-sm bg-foreground/5 group-hover:bg-primary/10 transition-colors duration-300"
                        style={{ fontSize: "14px" }}
                      >
                        {tech.icon}
                      </span>
                      <span
                        className="text-foreground font-medium group-hover:text-primary transition-colors duration-300"
                        style={{ fontSize: "clamp(14px, 1.3vw, 16px)" }}
                      >
                        {tech.name}
                      </span>
                    </div>
                    <span
                      className="text-foreground font-mono"
                      style={{
                        fontSize: "clamp(12px, 1vw, 14px)",
                        opacity: 0.4,
                      }}
                    >
                      {tech.level}%
                    </span>
                  </div>

                  {/* Skill Bar */}
                  <div
                    className="relative h-1 rounded-full overflow-hidden"
                    style={{ backgroundColor: "rgba(22, 22, 22, 0.06)" }}
                  >
                    <div
                      className="skill-bar-fill absolute inset-y-0 left-0 rounded-full origin-left"
                      style={{
                        width: `${tech.level}%`,
                        background: catIndex === 0 ? "var(--color-primary)" : catIndex === 1 ? "linear-gradient(90deg, var(--color-accent-purple), var(--color-accent-purple-light))" : "linear-gradient(90deg, var(--color-accent-cyan), var(--color-accent-cyan-dark))",
                        transform: "scaleX(0)",
                      }}
                    />
                  </div>

                  {/* Skill Description */}
                  <p
                    className="mt-2 text-foreground"
                    style={{
                      fontSize: "clamp(12px, 1vw, 13px)",
                      opacity: 0.5,
                      lineHeight: 1.4,
                    }}
                  >
                    {tech.description}
                  </p>
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
        className="mt-16 rounded-lg overflow-hidden"
        style={{
          backgroundColor: "var(--color-foreground)",
          border: "1px solid rgba(255, 255, 249, 0.1)",
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
            <span style={{ color: "rgba(255,255,249,0.8)" }}>cat philosophy.txt</span>
          </div>
          <div className="leading-relaxed">
            <p className="mb-2" style={{ color: "rgba(255,255,249,0.7)" }}><span style={{ color: "var(--color-accent-purple-light)" }}>&gt;</span> Clean code is not written by following a set of rules.</p>
            <p className="mb-2" style={{ color: "rgba(255,255,249,0.7)" }}><span style={{ color: "var(--color-accent-cyan)" }}>&gt;</span> It comes from craftsmanship and attention to detail.</p>
            <p style={{ color: "rgba(255,255,249,0.7)" }}><span style={{ color: "var(--color-accent-purple-light)" }}>&gt;</span> I believe in building interfaces that are both beautiful and performant.</p>
          </div>
          <div className="flex gap-2 mt-4">
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
