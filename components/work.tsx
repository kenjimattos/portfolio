"use client";

import Link from "next/link";
import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

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

  useEffect(() => {
    const ctx = gsap.context(() => {
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
    }, sectionRef);

    return () => ctx.revert();
  }, []);

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
          style={{ fontFamily: "var(--font-gabarito)" }}
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
              <div className="absolute inset-0 p-[60px] flex flex-col justify-start">
                <h3
                  className="text-[40px] leading-[1em] font-medium text-black mb-[21px]"
                  style={{ fontFamily: "var(--font-gabarito)" }}
                >
                  {project.name}
                </h3>
                <p
                  className="text-[24px] leading-[1.2em] font-normal text-black max-w-[414px]"
                  style={{ fontFamily: "var(--font-gabarito)" }}
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
