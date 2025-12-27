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
      "Web platform built to help hiring teams manage medical shift schedules and candidate workflows.",
    image: "/img/work-houston-47f1ad.png",
    href: "/work/houston",
  },
];

export const Work = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    // Animacao do titulo
    gsap.from(titleRef.current, {
      y: 400,
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
        y: 400,
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
      ref={sectionRef}
      className="w-full py-[110px] px-[10px]"
    >
      {/* Dark background container */}
      <div className="bg-[#161616] rounded-[10px] px-[110px] pt-[104px] pb-[120px]">
        {/* Title */}
        <h2
          ref={titleRef}
          className="text-[96px] leading-[1em] font-extrabold text-[#FFFFF9] mb-[96px]"
        >
          SELECTED WORK
        </h2>

        {/* Project cards */}
        <div
          ref={cardsRef}
          className="flex flex-col gap-[96px]"
        >
          {projects.map((project) => (
            <Link
              key={project.id}
              href={project.href}
              className="relative w-full h-[535px] rounded-[5px] overflow-hidden cursor-pointer group block"
              style={{
                backgroundImage: `url(${project.image})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            >
              {/* Content overlay */}
              <div className="absolute flex flex-col justify-start"
                style={{
                  padding: "clamp(15px, 3vw, 60px) clamp(15px, 3vw, 60px)",
                  maxWidth: "clamp(300px, 40%, 600px)",
                  gap: "clamp(10px, 1.5vw, 24px)",
                }}
              >
                <h2
                  className="text-[40px] leading-[1em] font-medium"
                  style={{ fontSize: "clamp(24px, 4vw, 40px)" }}
                >
                  {project.name}
                </h2>
                <p
                  className="text-[24px] leading-[1.2em] font-normal"
                  style={{ fontSize: "clamp(14px, 4vw, 24px)" }}
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
