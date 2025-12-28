"use client";

import Image from "next/image";
import { useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger, useGSAP);

const technologies = [
  { name: "Next.js", logo: "/img/next-logo.svg", width: 409, height: 82, isWide: true },
  { name: "React", logo: "/img/react-logo.svg", width: 140, height: 119 },
  { name: "TypeScript", logo: "/img/typescript-logo.svg", width: 130, height: 130 },
  { name: "Tailwind CSS", logo: "/img/tailwind-logo.svg", width: 150, height: 90 },
  { name: "Figma", logo: "/img/figma-logo.svg", width: 105, height: 150 },
  { name: "Node.js", logo: "/img/nodejs-logo.svg", width: 130, height: 130 },
  { name: "Git", logo: "/img/git-logo.svg", width: 120, height: 120 },
  { name: "PostgreSQL", logo: "/img/postgresql-logo.svg", width: 122, height: 122 },
  { name: "Vercel", logo: "/img/vercel-logo.svg", width: 130, height: 114 },
];

export const TechStack = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const logosRef = useRef<HTMLDivElement>(null);
  const [activeTech, setActiveTech] = useState<string | null>(null);

  const handleTouch = (techName: string) => {
    setActiveTech(activeTech === techName ? null : techName);
  };

  useGSAP(() => {
    // Valores responsivos baseados no viewport
    const vh = window.innerHeight;
    const titleOffset = vh * 0.4;
    const logoOffset = vh * 0.4;

    // Animação do título
    gsap.from(titleRef.current, {
      y: titleOffset,
      duration: 0.5,
      stagger: 0.1,
      ease: "power3.out",
      scrollTrigger: {
        trigger: titleRef.current,
        start: "top 120%",
        end: "top 50%",
        toggleActions: "play none none reverse",
      },
    });

    // Animação dos logos com stagger
    const logos = logosRef.current?.children;
    if (logos) {
      // Começa invisível
      gsap.set(logos, { opacity: 0, y: logoOffset });

      gsap.to(logos, {
        y: 0,
        opacity: 1,
        duration: 0.5,
        stagger: 0.1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: titleRef.current,
          start: "top 100%",
          end: "top 30%",
          toggleActions: "play none none reverse",
        },
      });
    }
  }, { scope: sectionRef });

  return (
    <section
      ref={sectionRef}
      className="w-full"
      style={{ padding: "clamp(60px, 10vw, 120px) clamp(20px, 5vw, 40px)" }}
    >
      {/* Title */}
      <h2
        ref={titleRef}
        className="leading-[1em] font-extrabold text-black text-center"
        style={{
          fontFamily: "var(--font-gabarito)",
          fontSize: "clamp(48px, 12vw, 132px)",
          marginBottom: "clamp(40px, 8vw, 90px)",
        }}
      >
        TECH STACK
      </h2>

      {/* Tech logos grid */}
      <div
        ref={logosRef}
        className="flex flex-wrap justify-center items-end max-w-[1186px] mx-auto"
        style={{ gap: "clamp(6px, 1vw, 9px)" }}
      >
        {technologies.map((tech) => {
          const isActive = activeTech === tech.name;
          return (
            <div
              key={tech.name}
              className={`relative flex items-center justify-center transition-colors duration-300 cursor-pointer group rounded-[5px] ${isActive ? "bg-primary" : "hover:bg-primary"}`}
              style={{
                width: tech.isWide ? "clamp(280px, 40vw, 469px)" : "clamp(140px, 20vw, 230px)",
                height: "clamp(140px, 20vw, 232px)",
                padding: tech.isWide ? "clamp(50px, 6vw, 75px) clamp(25px, 3vw, 30px)" : "clamp(35px, 4vw, 50px)",
              }}
              onTouchStart={() => handleTouch(tech.name)}
            >
              <Image
                src={tech.logo}
                alt={tech.name}
                width={tech.width}
                height={tech.height}
                className={`object-contain transition-all duration-300 max-w-full max-h-full ${isActive ? "brightness-0 invert" : "group-hover:brightness-0 group-hover:invert"}`}
              />
              {/* Tooltip */}
              <span
                className={`absolute left-1/2 -translate-x-1/2 bg-white text-[#161616] font-medium rounded transition-opacity duration-300 pointer-events-none whitespace-nowrap ${isActive ? "opacity-100" : "opacity-0 group-hover:opacity-100"}`}
                style={{
                  fontFamily: "var(--font-gabarito)",
                  fontSize: "clamp(10px, 1.5vw, 14px)",
                  padding: "clamp(4px, 0.8vw, 6px) clamp(8px, 1.2vw, 12px)",
                  bottom: "clamp(8px, 1.5vw, 16px)",
                }}
              >
                {tech.name}
              </span>
            </div>
          );
        })}
      </div>
    </section>
  );
};
