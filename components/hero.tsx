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
      // Função clamp para limitar valores de animação
      const clamp = (min: number, val: number, max: number) => Math.min(Math.max(val, min), max);

      // Usar wordsContainer como referência para escalar uniformemente
      const wordsContainer = wordsContainerRef.current;
      if (!wordsContainer) return;

      const containerRect = wordsContainer.getBoundingClientRect();
      const refHeight = containerRect.height;
      const refWidth = containerRect.width;

      // Altura do viewport para garantir elementos fora da tela
      const viewportHeight = window.innerHeight;

      // initialY precisa ser maior que o viewport para ficar fora da tela
      const initialY = Math.max(viewportHeight, refHeight * 2);

      // Valores com limites mín/máx para escala controlada
      const exitY = clamp(-400, refHeight * -0.9, -250);
      const separationX = clamp(100, refWidth * 0.4, 500);

      // Scroll distance com limite
      const scrollDistance = clamp(1200, refHeight * 3.5, 2000);

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
        y: 0,
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
      <div className="flex flex-col items-center" style={{ height: "100dvh", paddingTop: "15dvh" }}>
        {/* "hi, my name is kenji" - separado */}
        <span
          ref={hiRef}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-12.5 leading-[1em] text-foreground"
          style={{ fontFamily: "var(--font-gabarito)", fontSize: "clamp(18px, 2vw, 24px)" }}
        >
          hi, my name is kenji
        </span>

        {/* Scroll indicator */}
        <div
          ref={scrollIndicatorRef}
          className="absolute flex flex-col items-center gap-2"
          style={{ bottom: "24px" }}
        >
          <span
            className="leading-[1em] text-foreground"
            style={{ fontFamily: "var(--font-gabarito)", fontSize: "clamp(14px, 1.5vw, 18px)" }}
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
          className="flex flex-col"
        >
          
        {/* "i am a" container - para posicionar os elementos */}
        <div
          ref={iAmARef}
          className="flex justify-center gap-3 pb-[5dvh]"
        >
          <span
            ref={iAmRef}
            style={{fontSize: "clamp(18px, 2vw, 24px)" }}
          >
            i am
          </span>
          <div
            ref={aRef}
            className="flex items-center justify-center"
          >
            <span
              style={{fontSize: "clamp(18px, 2vw, 24px)" }}
            >
             a
            </span>
            <div
              ref={aLineRef}
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-primary origin-center"
              style={{ width: "clamp(18px, 2vw, 24px)", height: "clamp(2px, 0.2vw, 3px)" }}
            />
          </div>
        </div>
          
          {/* Group 1: DESIGNER with strikethrough */}
          <div
            ref={designerRef}
            className="flex items-center justify-center"
          >
            <span
              className="font-extrabold text-foreground text-center"
              style={{fontSize: "clamp(60px, 8vw, 96px)" }}
            >
              DESIGNER
            </span>
            <div
              ref={designerLineRef}
              className="absolute origin-left"
              style={{ backgroundColor: "var(--color-primary)", width: "100%", height: "clamp(6px, 0.6vw, 8px)" }}
            />
          </div>

          {/* Group 2: DEVELOPER with strikethrough */}
          <div
            ref={developerRef}
            className="flex items-center justify-center"
          >
            <span
              className="font-extrabold text-foreground text-center"
              style={{ fontSize: "clamp(60px, 8vw, 96px)" }}
            >
              DEVELOPER
            </span>
            <div
              ref={developerLineRef}
              className="absolute top-1/2 w-120 origin-left"
              style={{ backgroundColor: "var(--color-primary)", width: "100%", height: "clamp(6px, 0.6vw, 8px)" }}
            />
          </div>

          {/* EVERYTHING */}
          <div
            ref={everythingRef}
            className="w-full flex items-center justify-center"
          >
            <span
              className="font-extrabold text-foreground text-center"
              style={{ fontSize: "clamp(60px, 8vw, 96px)" }}
            >
              EVERYTHING
            </span>
          </div>
        </section>
      </div>
    </div>
  );
};
