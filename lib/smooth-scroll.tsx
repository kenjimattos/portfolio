"use client";

/* Rolagem suave da página inteira, e a âncora que o resto do site usa
   para navegar.

   O ponto delicado não é o Lenis em si, é a convivência dele com o
   ScrollTrigger: são dois relógios querendo mandar no mesmo scroll. A
   ligação tem três partes, e faltar qualquer uma delas dá tremor ou
   defasagem entre a página e a animação do masthead:

   1. Um relógio só. O `raf` do Lenis é chamado pelo ticker do GSAP, não
      por um requestAnimationFrame próprio — assim a interpolação da
      rolagem e os tweens são calculados no MESMO quadro.
   2. lagSmoothing desligado. O GSAP, por padrão, "engole" quadros longos
      fingindo que passou menos tempo, o que é bom para animações
      independentes e péssimo aqui: o Lenis perderia posição de scroll.
   3. ScrollTrigger.update a cada evento do Lenis. Sem isso o
      ScrollTrigger continua lendo o scroll no ritmo dele e a animação
      chega atrasada em relação à página.

   Com prefers-reduced-motion o Lenis nem é criado: a rolagem fica nativa
   e `scrollTo` cai no comportamento do navegador. */

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  type ReactNode,
} from "react";
import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { prefersReducedMotion } from "@/lib/motion";

gsap.registerPlugin(ScrollTrigger);

/* 56px de barra + o filete de 1px. */
const HEADER_HEIGHT = 57;

type ScrollTarget = number | string | HTMLElement;
type ScrollToOptions = { offset?: number };

const SmoothScrollContext = createContext<
  (target: ScrollTarget, options?: ScrollToOptions) => void
>((target) => {
  if (typeof target === "string") {
    document.querySelector(target)?.scrollIntoView({ behavior: "smooth" });
  }
});

export function SmoothScrollProvider({ children }: { children: ReactNode }) {
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    if (prefersReducedMotion()) return;

    const lenis = new Lenis({
      /* lerp em vez de duration: a rolagem persegue o alvo a uma fração
         fixa por quadro, então gestos curtos respondem na hora e gestos
         longos ganham inércia. 0.1 é o padrão da lib; 0.085 alonga um
         pouco o rastro sem dar aquela sensação de arrastar o mouse na
         lama que aparece abaixo de ~0.06. */
      lerp: 0.085,
      wheelMultiplier: 1,
      /* No touch a rolagem fica nativa: o gesto do dedo já tem inércia do
         sistema, e sobrepor a do Lenis briga com ela. */
      syncTouch: false,
      touchMultiplier: 1.6,
      autoRaf: false,
      /* O Lenis intercepta os links de âncora sozinho — o índice do
         masthead, o skip link. O deslocamento negativo desconta a altura
         do header sticky, senão a seção para embaixo dele. */
      anchors: { offset: -HEADER_HEIGHT },
    });
    lenisRef.current = lenis;

    const onScroll = () => ScrollTrigger.update();
    lenis.on("scroll", onScroll);

    const tick = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);

    return () => {
      lenis.off("scroll", onScroll);
      gsap.ticker.remove(tick);
      gsap.ticker.lagSmoothing(500, 33);
      lenis.destroy();
      lenisRef.current = null;
    };
  }, []);

  const scrollTo = useCallback(
    (target: ScrollTarget, options?: ScrollToOptions) => {
      const lenis = lenisRef.current;
      if (lenis) {
        lenis.scrollTo(target, { offset: options?.offset ?? -HEADER_HEIGHT });
        return;
      }
      const element =
        typeof target === "string" ? document.querySelector(target) : target;
      if (element instanceof HTMLElement) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    },
    []
  );

  return (
    <SmoothScrollContext.Provider value={scrollTo}>
      {children}
    </SmoothScrollContext.Provider>
  );
}

export function useScrollTo() {
  return useContext(SmoothScrollContext);
}
