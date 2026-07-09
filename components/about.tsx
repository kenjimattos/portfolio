"use client";

import Image from "next/image";
import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger, useGSAP);

const skills = [
  { category: "Languages", items: ["JavaScript", "TypeScript", "Python"] },
  { category: "Frontend", items: ["React", "Vite","Next.js"] },
  { category: "Styling", items: ["Tailwind CSS", "Bootstrap"] },
  { category: "Tools", items: ["Git", "Figma", "Storybook"] },
  { category: "Backend", items: ["Node.js", "Fastify", "PostgresSQL", "MongoDB"] },
];

export const About = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const skillsRef = useRef<HTMLDivElement>(null);

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
        <span
          className="text-primary font-mono"
          style={{ fontSize: "clamp(14px, 1.5vw, 18px)" }}
        >
          01.
        </span>
        <h2
          className="text-foreground font-bold"
          style={{ fontSize: "clamp(24px, 3vw, 36px)" }}
        >
          About Me
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
                src="/img/about-photo.png"
                alt="Kenji profile photo"
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
              I&apos;m passionate about building
              exceptional digital experiences. With a unique background spanning
              UX/UI design and software development, I bridge the gap between
              beautiful design and robust code.
            </p>
            <p
              className="text-foreground leading-relaxed"
              style={{
                fontSize: "clamp(16px, 1.8vw, 20px)",
                opacity: 0.8,
              }}
            >
              I specialize in translating complex requirements into intuitive,
              performant interfaces. Every line of code I write is crafted with
              attention to detail, accessibility, and user experience in mind.
            </p>
            <p
              className="text-foreground leading-relaxed"
              style={{
                fontSize: "clamp(16px, 1.8vw, 20px)",
                opacity: 0.8,
              }}
            >
              Currently focused on React ecosystem, modern CSS, and creating
              delightful micro-interactions that make products feel alive.
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
