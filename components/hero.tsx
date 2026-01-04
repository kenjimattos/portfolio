"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger, useGSAP);

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

  useGSAP(() => {
      // Valores responsivos baseados no viewport
      const vh = window.innerHeight;
      const vw = window.innerWidth;
      const initialY = vh * 0.75;
      const exitY = vh * -0.6;
      const separationX = Math.min(vw * 0.2, 320);
      const iAmAY = vh * -0.28;

      // Scroll distance proporcional ao viewport (menor em mobile)
      const scrollDistance = Math.max(vh * 2.5, 1500);

      // Timeline principal
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: `+=${scrollDistance}`,
          scrub: 1,
          pin: true,
        },
      });

      // Estado inicial - palavras começam abaixo e fora da tela
      gsap.set([iAmARef.current, designerRef.current, developerRef.current, everythingRef.current], {
        y: initialY,
      });
      gsap.set([designerLineRef.current, developerLineRef.current, aLineRef.current], {
        scaleX: 0,
      });

      // Fase 1: "hi, my name is kenji" sobe
      tl.to(hiRef.current, {
        y: exitY,
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
        y: iAmAY,
        duration: 1,
      }, "<0.3")

      // DESIGNER começa a subir junto com "i am a" (um pouco depois)
      .to(designerRef.current, {
        y: 0,
        duration: 1.5,
      }, "<0.2")

      // Fase 3: Depois "i am" e "a" se separam horizontalmente
      .to(iAmRef.current, {
        x: -separationX,
        duration: 1,
      }, "-=0.8")
      .to(aRef.current, {
        x: separationX,
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

  }, { scope: containerRef });

  return (
    <div id="home" ref={containerRef} className="overflow-hidden h-100dvh">
      {/* Tela inicial */}
      <div className="flex flex-col items-center justify-center relative" style={{ height: "100dvh", paddingTop: "clamp(60px, 10dvh, 100px)" }}>
        {/* "hi, my name is kenji" - separado */}
        <span
          ref={hiRef}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-[50px] leading-[1em] text-[#171717]"
          style={{ fontFamily: "var(--font-gabarito)", fontSize: "clamp(16px, 3vw, 30px)" }}
        >
          hi, my name is kenji
        </span>

        {/* "i am a" container - para posicionar os elementos */}
        <div
          ref={iAmARef}
          className="absolute top-96 left-1/2 -translate-x-1/2 flex items-baseline gap-3"
        >
          <span
            ref={iAmRef}
            className="leading-[1em] text-foreground"
            style={{ fontFamily: "var(--font-gabarito)", fontSize: "clamp(16px, 3vw, 30px)" }}
          >
            i am
          </span>
          <div
            ref={aRef}
            className="relative flex items-center justify-center"
          >
            <span
              className="leading-[1em] text-foreground"
              style={{ fontFamily: "var(--font-gabarito)", fontSize: "clamp(16px, 3vw, 30px)" }}
            >
             a
            </span>
            <div
              ref={aLineRef}
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-primary origin-center"
              style={{ width: "clamp(16px, 3vw, 30px)", height: "clamp(2px, 0.4vw, 4px)" }}
            />
          </div>
        </div>

        {/* Scroll indicator */}
        <div
          ref={scrollIndicatorRef}
          className="absolute flex flex-col items-center gap-2"
          style={{ bottom: "24px" }}
        >
          <span
            className="leading-[1em] text-foreground"
            style={{ fontFamily: "var(--font-gabarito)", fontSize: "clamp(14px, 2.5vw, 25px)" }}
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
          className="absolute left-1/2 w-[90vw] max-w-[838px]"
          style={{ aspectRatio: "838/540", top: "50%", transform: "translate(-50%, -50%)" }}
        >
          {/* Group 1: DESIGNER with strikethrough */}
          <div
            ref={designerRef}
            className="absolute left-0 w-full flex items-center justify-center"
            style={{ top: "11%", height: "22%" }}
          >
            <span
              className="leading-[1em] font-extrabold text-foreground text-center"
              style={{ fontFamily: "var(--font-gabarito)", fontSize: "clamp(48px, 10vw, 120px)" }}
            >
              DESIGNER
            </span>
            <div
              ref={designerLineRef}
              className="absolute top-1/2 left-0 w-full -translate-y-1/2 origin-left"
              style={{ backgroundColor: "var(--color-primary)", height: "clamp(4px, 1vw, 11px)" }}
            />
          </div>

          {/* Group 2: DEVELOPER with strikethrough */}
          <div
            ref={developerRef}
            className="absolute left-0 w-full flex items-center justify-center"
            style={{ top: "44%", height: "22%" }}
          >
            <span
              className="leading-[1em] font-extrabold text-foreground text-center"
              style={{ fontFamily: "var(--font-gabarito)", fontSize: "clamp(48px, 10vw, 120px)" }}
            >
              DEVELOPER
            </span>
            <div
              ref={developerLineRef}
              className="absolute top-1/2 left-0 w-full -translate-y-1/2 origin-left"
              style={{ backgroundColor: "var(--color-primary)", height: "clamp(4px, 1vw, 11px)" }}
            />
          </div>

          {/* EVERYTHING */}
          <div
            ref={everythingRef}
            className="absolute left-0 w-full flex items-center justify-center"
            style={{ top: "78%", height: "22%" }}
          >
            <span
              className="leading-[1em] font-extrabold text-foreground text-center"
              style={{ fontFamily: "var(--font-gabarito)", fontSize: "clamp(48px, 10vw, 120px)" }}
            >
              EVERYTHING
            </span>
          </div>
        </section>
      </div>
    </div>
  );
};
