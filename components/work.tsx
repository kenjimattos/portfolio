"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger, useGSAP);

const projects = [
  {
    id: 1,
    name: "Houston",
    role: "Frontend Development",
    year: "2024",
    description:
      "Web platform built to manage medical shift schedules and candidate workflows.",
    tags: ["React", "TypeScript", "Tailwind"],
    image: "/img/work-houston.png",
    href: "/work/houston",
    color: "#1a365d",
  },
  {
    id: 2,
    name: "Revoluna",
    role: "Mobile App Development",
    year: "2024",
    description:
      "A mobile-first product focused on clarity and control. Shift opportunities are organized, easy to find, and simple to manage.",
    tags: ["React Native", "TypeScript", "Motion"],
    image: "/img/work-revoluna.png",
    href: "/work/revoluna",
    color: "#4a1d6e",
  },
];

export const Work = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

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

    // Cards staggered animation
    const cards = cardsRef.current?.children;
    if (cards) {
      Array.from(cards).forEach((card) => {
        gsap.fromTo(
          card,
          { opacity: 0, y: 80 },
          {
            opacity: 1,
            y: 0,
            duration: 1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: card,
              start: "top 85%",
              toggleActions: "play none none reverse",
            },
          }
        );

        // Image parallax effect
        const image = card.querySelector(".project-image");
        if (image) {
          gsap.fromTo(
            image,
            { scale: 1.1 },
            {
              scale: 1,
              ease: "none",
              scrollTrigger: {
                trigger: card,
                start: "top bottom",
                end: "bottom top",
                scrub: 1,
              },
            }
          );
        }
      });
    }
  }, { scope: sectionRef });

  return (
    <section
      id="work"
      ref={sectionRef}
      className="w-full"
      style={{
        padding: "clamp(60px, 10vw, 120px) clamp(40px, 8vw, 180px)",
        backgroundColor: "var(--color-foreground)",
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
          02.
        </span>
        <h2
          className="text-background font-bold"
          style={{ fontSize: "clamp(24px, 3vw, 36px)" }}
        >
          Selected Work
        </h2>
        <div
          className="flex-1 h-px"
          style={{
            background: "linear-gradient(90deg, color-mix(in srgb, var(--color-accent-cyan) 40%, transparent), color-mix(in srgb, var(--color-accent-purple) 20%, transparent), transparent)",
            maxWidth: "300px"
          }}
        />
      </div>

      {/* Project Cards */}
      <div
        ref={cardsRef}
        className="flex flex-col"
        style={{ gap: "clamp(60px, 8vw, 100px)" }}
      >
        {projects.map((project, index) => (
          <Link
            key={project.id}
            href={project.href}
            className="group relative block"
          >
            {/* Card Container */}
            <div
              className="relative rounded-lg overflow-hidden"
              style={{
                backgroundColor: "rgba(255, 255, 249, 0.03)",
                border: "1px solid rgba(255, 255, 249, 0.06)",
              }}
            >
              {/* Top Bar - Project Info */}
              <div
                className="flex items-center justify-between px-6 py-4"
                style={{
                  borderBottom: "1px solid rgba(255, 255, 249, 0.06)",
                }}
              >
                <div className="flex items-center gap-4">
                  <span
                    className="text-background font-mono"
                    style={{
                      fontSize: "clamp(12px, 1vw, 14px)",
                      opacity: 0.4,
                    }}
                  >
                    0{index + 1}
                  </span>
                  <span
                    className="text-background font-medium"
                    style={{ fontSize: "clamp(14px, 1.2vw, 16px)" }}
                  >
                    {project.role}
                  </span>
                </div>
                <span
                  className="text-background font-mono"
                  style={{
                    fontSize: "clamp(12px, 1vw, 14px)",
                    opacity: 0.4,
                  }}
                >
                  {project.year}
                </span>
              </div>

              {/* Main Content */}
              <div
                className="grid lg:grid-cols-2 gap-8"
                style={{ padding: "clamp(24px, 4vw, 48px)" }}
              >
                {/* Left - Text Content */}
                <div className="flex flex-col justify-between gap-6 order-2 lg:order-1">
                  <div className="flex flex-col gap-4">
                    {/* Project Name */}
                    <h3
                      className="text-background font-bold leading-none"
                      style={{ fontSize: "clamp(36px, 5vw, 64px)" }}
                    >
                      {project.name}
                    </h3>

                    {/* Description */}
                    <p
                      className="text-background leading-relaxed"
                      style={{
                        fontSize: "clamp(14px, 1.4vw, 18px)",
                        opacity: 0.7,
                        maxWidth: "400px",
                      }}
                    >
                      {project.description}
                    </p>
                  </div>

                  {/* Tags + CTA */}
                  <div className="flex flex-col gap-6">
                    {/* Tech Tags */}
                    <div className="flex flex-wrap gap-2">
                      {project.tags.map((tag, tagIndex) => {
                        // Alternate tag colors: cyan, purple, blue
                        const tagColors = [
                          { border: "color-mix(in srgb, var(--color-accent-cyan) 30%, transparent)", text: "var(--color-accent-cyan)" },
                          { border: "color-mix(in srgb, var(--color-accent-purple) 30%, transparent)", text: "var(--color-accent-purple-light)" },
                          { border: "color-mix(in srgb, var(--color-primary) 30%, transparent)", text: "var(--color-primary)" },
                        ];
                        const tagColor = tagColors[tagIndex % 3];
                        return (
                        <span
                          key={tagIndex}
                          className="px-3 py-1 rounded-full font-mono"
                          style={{
                            fontSize: "clamp(11px, 1vw, 13px)",
                            backgroundColor: "rgba(255, 255, 249, 0.03)",
                            border: `1px solid ${tagColor.border}`,
                            color: tagColor.text,
                          }}
                        >
                          {tag}
                        </span>
                        );
                      })}
                    </div>

                    {/* View Project Link */}
                    <div className="flex items-center gap-2 group/link">
                      <span
                        className="text-primary font-medium transition-all duration-300 group-hover/link:tracking-wider"
                        style={{ fontSize: "clamp(13px, 1.2vw, 15px)" }}
                      >
                        View Case Study
                      </span>
                      <svg
                        width="20"
                        height="20"
                        viewBox="0 0 20 20"
                        fill="none"
                        className="transition-transform duration-300 group-hover:translate-x-1"
                      >
                        <path
                          d="M4 10H16M16 10L11 5M16 10L11 15"
                          stroke="var(--color-primary)"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </div>
                  </div>
                </div>

                {/* Right - Image */}
                <div
                  className="relative rounded-md overflow-hidden order-1 lg:order-2"
                  style={{ aspectRatio: "16/10" }}
                >
                  <Image
                    src={project.image}
                    alt={project.name}
                    fill
                    className="object-cover project-image transition-transform duration-700 group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                  {/* Subtle gradient overlay */}
                  <div
                    className="absolute inset-0 pointer-events-none transition-opacity duration-500 group-hover:opacity-0"
                    style={{
                      background: `linear-gradient(135deg, ${project.color}40 0%, transparent 60%)`,
                    }}
                  />
                </div>
              </div>

              {/* Hover Effect - Border Glow with gradient */}
              <div
                className="absolute inset-0 pointer-events-none rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                style={{
                  boxShadow: `inset 0 0 0 1px color-mix(in srgb, var(--color-accent-cyan) 50%, transparent), 0 0 40px -10px color-mix(in srgb, var(--color-accent-purple) 40%, transparent)`,
                }}
              />
            </div>
          </Link>
        ))}
      </div>

      {/* Bottom CTA */}
      <div
        className="flex justify-center mt-16"
        style={{ paddingTop: "clamp(20px, 4vw, 40px)" }}
      >
        <a
          href="https://github.com/kenji"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-3 text-background transition-all duration-300 hover:text-primary"
          style={{
            fontSize: "clamp(14px, 1.2vw, 16px)",
            opacity: 0.6,
          }}
        >
          <span>View more on GitHub</span>
          <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="currentColor"
          >
            <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
          </svg>
        </a>
      </div>
    </section>
  );
};
