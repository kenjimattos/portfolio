"use client";

import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export const Hero = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const hiRef = useRef<HTMLSpanElement>(null);
  const iAmARef = useRef<HTMLDivElement>(null);
  const iAmRef = useRef<HTMLSpanElement>(null);
  const aRef = useRef<HTMLDivElement>(null);
  const scrollIndicatorRef = useRef<HTMLDivElement>(null);
  const wordsContainerRef = useRef<HTMLElement>(null);
  const designerRef = useRef<HTMLDivElement>(null);
  const designerLineRef = useRef<HTMLDivElement>(null);
  const developerRef = useRef<HTMLDivElement>(null);
  const developerLineRef = useRef<HTMLDivElement>(null);
  const everythingRef = useRef<HTMLDivElement>(null);
  const aLineRef = useRef<HTMLDivElement>(null);
  const chevronRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Timeline principal
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "+=3000",
          scrub: 1,
          pin: true,
        },
      });

      // Estado inicial - palavras começam abaixo e fora da tela
      gsap.set([iAmARef.current,designerRef.current, developerRef.current, everythingRef.current], {
        y: 700,
      });
      gsap.set([designerLineRef.current, developerLineRef.current, aLineRef.current], {
        scaleX: 0,
      });

      // Fase 1: "hi, my name is kenji" sobe
      tl.to(hiRef.current, {
        y: -600,
        opacity: 0,
        duration: 1,
      })
      // Scroll indicator desaparece
      .to(scrollIndicatorRef.current, {
        opacity: 0,
        duration: 0.5,
      }, "<")

      // Fase 2: "i am a" sobe junto primeiro
      .to(iAmARef.current, {
        y: -280,
        duration: 1,
      }, "<0.3")

      // DESIGNER começa a subir junto com "i am a" (um pouco depois)
      .to(designerRef.current, {
        y: 0,
        duration: 1.5,
      }, "<0.2")

      // Fase 3: Depois "i am" e "a" se separam horizontalmente
      .to(iAmRef.current, {
        x: -320,
        duration: 1,
      }, "-=0.8")
      .to(aRef.current, {
        x: 320,
        duration: 1,
      }, "<")

      // Fase 5: DEVELOPER surge de baixo e DESIGNER é riscada
      .to(developerRef.current, {
        y: 0,
        duration: 1,
      })
      .to(designerLineRef.current, {
        scaleX: 1,
        duration: 0.5,
      }, "<0.3")

      // Fase 6: EVERYTHING surge de baixo, DEVELOPER é riscada e "a" ganha strikethrough
      .to(everythingRef.current, {
        y: 0,
        duration: 1,
      })
      .to(developerLineRef.current, {
        scaleX: 1,
        duration: 0.5,
      }, "<0.3")
      .to(aLineRef.current, {
        scaleX: 1,
        duration: 0.5,
      }, "<");

      // Animação em loop do chevron (bounce)
      gsap.to(chevronRef.current, {
        y: 8,
        duration: 0.6,
        repeat: -1,
        yoyo: true,
        ease: "power1.inOut",
      });

    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="min-h-screen overflow-hidden">
      {/* Tela inicial */}
      <div className="h-screen flex flex-col items-center justify-center relative">
        {/* "hi, my name is kenji" - separado */}
        <span
          ref={hiRef}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-[50px] text-[30px] leading-[1em] text-[#171717]"
          style={{ fontFamily: "var(--font-gabarito)" }}
        >
          hi, my name is kenji
        </span>

        {/* "i am a" container - para posicionar os elementos */}
        <div
          ref={iAmARef}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 translate-y-[10px] flex items-baseline gap-1"
        >
          <span
            ref={iAmRef}
            className="text-[30px] leading-[1em] text-[#171717]"
            style={{ fontFamily: "var(--font-gabarito)" }}
          >
            i am
          </span>
          <div
            ref={aRef}
            className="relative flex items-center justify-center"
          >
            <span
              className="text-[30px] leading-[1em] text-[#171717]"
              style={{ fontFamily: "var(--font-gabarito)" }}
            >
              a
            </span>
            <div
              ref={aLineRef}
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[30px] h-[4px] bg-[#171717] origin-center"
            />
          </div>
        </div>

        {/* Scroll indicator */}
        <div
          ref={scrollIndicatorRef}
          className="absolute bottom-[100px] flex flex-col items-center gap-4"
        >
          <span
            className="text-[25px] leading-[1em] text-[#171717]"
            style={{ fontFamily: "var(--font-gabarito)" }}
          >
            scroll to discover
          </span>
          <svg ref={chevronRef} width="12" height="6" viewBox="0 0 12 6" fill="none">
            <path d="M1 1L6 5L11 1" stroke="#000000" strokeWidth="2" />
          </svg>
        </div>

        {/* Seção de animação das palavras */}
        <section
          ref={wordsContainerRef}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[838px] h-[540px]"
        >
          {/* Group 1: DESIGNER with strikethrough */}
          <div
            ref={designerRef}
            className="absolute top-[62px] left-0 w-[838px] h-[119px] flex items-center justify-center"
          >
            <span
              className="text-[120px] leading-[1em] font-extrabold text-[#171717] text-center"
              style={{ fontFamily: "var(--font-gabarito)" }}
            >
              DESIGNER
            </span>
            <div
              ref={designerLineRef}
              className="absolute top-1/2 left-0 w-[838px] h-[11px] bg-[#171717] -translate-y-1/2 origin-left"
              style={{ backgroundColor: "var(--color-primary)" }}
            />
          </div>

          {/* Group 2: DEVELOPER with strikethrough */}
          <div
            ref={developerRef}
            className="absolute top-[240px] left-0 w-[838px] h-[119px] flex items-center justify-center"
          >
            <span
              className="text-[120px] leading-[1em] font-extrabold text-[#171717] text-center"
              style={{ fontFamily: "var(--font-gabarito)" }}
            >
              DEVELOPER
            </span>
            <div
              ref={developerLineRef}
              className="absolute top-1/2 left-0 w-[838px] h-[11px] -translate-y-1/2 origin-left"
              style={{ backgroundColor: "var(--color-primary)" }}
            />
          </div>

          {/* EVERYTHING */}
          <div
            ref={everythingRef}
            className="absolute top-[421px] left-0 w-[838px] h-[119px] flex items-center justify-center"
          >
            <span
              className="text-[120px] leading-[1em] font-extrabold text-[#171717] text-center"
              style={{ fontFamily: "var(--font-gabarito)" }}
            >
              EVERYTHING
            </span>
          </div>
        </section>
      </div>
    </div>
  );
};
