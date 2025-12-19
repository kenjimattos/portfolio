"use client";

import Image from "next/image";
import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

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

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animação do título
      gsap.from(titleRef.current, {
        y: 100,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: titleRef.current,
          start: "top 80%",
          end: "top 50%",
          toggleActions: "play none none reverse",
        },
      });

      // Animação dos logos com stagger
      const logos = logosRef.current?.children;
      if (logos) {
        gsap.from(logos, {
          y: 80,
          opacity: 0,
          duration: 0.8,
          stagger: 0.1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: logosRef.current,
            start: "top 75%",
            end: "top 40%",
            toggleActions: "play none none reverse",
          },
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="w-full min-h-screen bg-white py-[136px]">
      {/* Title */}
      <h2
        ref={titleRef}
        className="text-[132px] leading-[1em] font-extrabold text-black text-center mb-[90px]"
        style={{ fontFamily: "var(--font-gabarito)" }}
      >
        TECH STACK
      </h2>

      {/* Tech logos grid */}
      <div
        ref={logosRef}
        className="flex flex-wrap justify-center items-end gap-[9px] max-w-[1186px] mx-auto"
      >
        {technologies.map((tech) => (
          <div
            key={tech.name}
            className={`relative ${
              tech.isWide ? "w-[469px] h-[232px] py-[75px] px-[30px]" : "w-[230px] h-[230px]"
            } flex items-center justify-center transition-colors duration-300 cursor-pointer group hover:bg-[#161616]`}
            style={!tech.isWide ? { padding: "50px" } : undefined}
          >
            <Image
              src={tech.logo}
              alt={tech.name}
              width={tech.width}
              height={tech.height}
              className="object-contain transition-all duration-300 group-hover:brightness-0 group-hover:invert"
            />
            {/* Tooltip */}
            <span
              className="absolute bottom-4 left-1/2 -translate-x-1/2 px-3 py-1.5 bg-white text-[#161616] text-sm font-medium rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none whitespace-nowrap"
              style={{ fontFamily: "var(--font-gabarito)" }}
            >
              {tech.name}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
};
