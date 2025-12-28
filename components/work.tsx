"use client";

import Link from "next/link";
import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger, useGSAP);

const projects = [
  {
    id: 1,
    name: "Revoluna",
    description:
      "A mobile-first product focused on clarity and control. Shift opportunities are organized, easy to find, and simple to manage.",
    image: "/img/work-revoluna-512d31.png",
    href: "/work/revoluna",
  },
  {
    id: 2,
    name: "Houston",
    description:
      "Web platform built to manage medical shift schedules and candidate workflows.",
    image: "/img/work-houston-47f1ad.png",
    href: "/work/houston",
  },
];

export const Work = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    // Valores responsivos baseados no viewport
    const vh = window.innerHeight;
    const animationOffset = vh * 0.4;

    // Animacao do titulo
    gsap.from(titleRef.current, {
      y: animationOffset,
      duration: 0.5,
      stagger: 0.2,
      ease: "power3.out",
      scrollTrigger: {
        trigger: titleRef.current,
        start: "top 120%",
        end: "top 50%",
        toggleActions: "play none none reverse",
      },
    });

    // Animacao dos cards com stagger
    const cards = cardsRef.current?.children;
    if (cards) {
      gsap.from(cards, {
        y: animationOffset,
        duration: 0.6,
        stagger: 0.2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: cardsRef.current,
          start: "top 70%",
          end: "top 40%",
          toggleActions: "play none none reverse",
        },
      });
    }
  }, { scope: sectionRef });

  return (
    <section
      id="work"
      ref={sectionRef}
      className="w-full"
      style={{ padding: "clamp(40px, 8vw, 110px) clamp(10px, 2vw, 10px)" }}
    >
      {/* Dark background container */}
      <div
        className="bg-foreground rounded-[10px]"
        style={{ padding: "clamp(40px, 8vw, 104px) clamp(20px, 8vw, 110px) clamp(60px, 10vw, 120px)" }}
      >
        {/* Title */}
        <h2
          ref={titleRef}
          className="leading-[1em] font-extrabold text-background"
          style={{ fontSize: "clamp(36px, 8vw, 96px)", marginBottom: "clamp(40px, 8vw, 96px)" }}
        >
          SELECTED WORK
        </h2>

        {/* Project cards */}
        <div
          ref={cardsRef}
          className="flex flex-col"
          style={{ gap: "clamp(40px, 8vw, 96px)" }}
        >
          {projects.map((project) => (
            <Link
              key={project.id}
              href={project.href}
              className="relative w-full rounded-[5px] overflow-hidden cursor-pointer group block bg-left"
              style={{
                backgroundImage: `url(${project.image})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                aspectRatio: "16/9",
              }}
            >
              {/* Content overlay */}
              <div className="absolute flex flex-col justify-start"
                style={{
                  padding: "clamp(12px, 3vw, 60px)",
                  maxWidth: "clamp(95px, 32vw, 600px)",
                  gap: "clamp(6px, 1.5vw, 24px)",
                }}
              >
                <h2
                  className="leading-[1em] font-medium"
                  style={{ fontSize: "clamp(20px, 4vw, 40px)" }}
                >
                  {project.name}
                </h2>
                <p
                  className="leading-[1.2em] font-normal"
                  style={{ fontSize: "clamp(12px, 2vw, 24px)",}}
                >
                  {project.description}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};
