"use client";

/* ── A nota sobre o masthead ───────────────────────────────────────────
   Uma tarja vermelha colada por cima do wordmark, no canto de baixo, com
   uma frase e um traço de caneta em volta de duas palavras. Ela existe
   por um motivo só: dizer que tem coisa embaixo e sair da frente.

   Três decisões:

   1. O gesto está no TRAÇO, não na letra. A tentativa anterior escrevia a
      correção em fonte manuscrita, e fonte manuscrita não é letra de
      alguém — é a letra de ninguém, e lê como clipart. Aqui a frase é a
      mesma tipografia do resto do site; o que é feito à mão é o círculo
      e a seta, que é o que um revisor faz de fato numa prova.

   2. O desenho acontece SOZINHO, na carga, não na rolagem. Uma pista de
      rolagem que só aparece depois de rolar chega tarde demais: o pulo
      da caneta é o que puxa o olho para baixo antes do primeiro gesto.

   3. A rolagem só leva embora. A nota sobe e some no primeiro terço do
      masthead preso — some antes de a costura vermelha chegar, senão
      seria tarja vermelha sobre campo vermelho. */

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { prefersReducedMotion } from "@/lib/motion";
import { useLocale } from "@/lib/i18n";

gsap.registerPlugin(ScrollTrigger, useGSAP);

/* As duas peles da nota. "stamp" é o carimbo vermelho da primeira versão —
   campo cheio, caneta de papel. "slip" é o recorte: um pedaço de papel
   pousado sobre a página impressa, tipografia em tinta e a marcação em
   vermelho, que é a caneta do revisor de verdade. Trocar aqui troca a
   peça inteira; as cores são variáveis do card, não valores soltos. */
const SKIN: "stamp" | "slip" = "slip";

const COPY = {
  en: {
    cue: "Scroll",
    before: "Everything down here already runs",
    circled: "in production",
    after: ".",
  },
  pt: {
    cue: "Role",
    before: "Tudo aqui embaixo já roda",
    circled: "em produção",
    after: ".",
  },
} as const;

/* O laço dá a volta e PASSA do ponto onde começou — quem circula uma
   palavra à mão nunca fecha a curva em cima do próprio começo. É esse
   excesso que separa o traço de uma elipse de software. */
const LOOP =
  "M150 10 C 96 1, 34 5, 16 22 C 1 37, 38 52, 100 54 C 162 56, 197 45, 192 27 C 188 13, 162 6, 126 7";

/* A seta é um traço só, com a ponta em V no fim do mesmo caminho. */
const ARROW = "M11 2 C 8 14, 14 24, 11 37 M3 27 C 6 32, 9 35, 11 39 C 13 34, 17 30, 20 26";

export const MastheadNote = () => {
  const t = COPY[useLocale()];
  const rootRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const root = rootRef.current;
      if (!root) return;

      /* Cada traço se mede sozinho: o dasharray é o comprimento real do
         path, então mexer na curva lá em cima não pede recalcular número
         nenhum aqui. */
      const strokes = root.querySelectorAll<SVGPathElement>("[data-draw]");
      const lengths = new Map<SVGPathElement, number>();
      strokes.forEach((path) => {
        const len = path.getTotalLength();
        lengths.set(path, len);
        path.style.strokeDasharray = `${len}`;
      });

      const reduced = prefersReducedMotion();

      strokes.forEach((path) => {
        path.style.strokeDashoffset = reduced ? "0" : `${lengths.get(path)}`;
      });

      /* A entrada mexe no CARD e a saída mexe na moldura, nunca no mesmo
         elemento: o scrub da saída e o tween de entrada escrevem as
         mesmas propriedades, e quem rolar no primeiro segundo veria a
         nota reaparecer. */
      const card = root.querySelector<HTMLElement>(".mnote-card");

      if (!reduced && card) {
        /* A tarja entra primeiro; a caneta vem depois de a página assentar.
           Sem essa pausa o desenho acontece enquanto o masthead ainda está
           se registrando, e as duas coisas competem. */
        gsap.from(card, { autoAlpha: 0, y: 18, duration: 0.5, ease: "power2.out", delay: 0.35 });
        gsap.to(strokes, {
          strokeDashoffset: 0,
          duration: 0.75,
          ease: "power1.inOut",
          stagger: 0.28,
          delay: 1.1,
        });
      }

      /* A saída é presa à rolagem: some no ritmo do gesto, e voltar ao
         topo traz a nota de volta. Vale também com movimento reduzido —
         aqui o deslocamento não é enfeite, é o que tira a tarja da
         frente do conteúdo. */
      gsap.to(root, {
        y: () => -Math.round(window.innerHeight * 0.42),
        autoAlpha: 0,
        ease: "none",
        scrollTrigger: {
          trigger: document.documentElement,
          start: "top top",
          end: () => window.innerHeight * 0.5,
          scrub: 0.3,
          invalidateOnRefresh: true,
        },
      });
    },
    { scope: rootRef }
  );

  return (
    <div className="mnote" ref={rootRef}>
      <a className="mnote-card" data-skin={SKIN} href="#work">
        <p className="mnote-line">
          {t.before}{" "}
          <span className="mnote-circled">
            {t.circled}
            <svg
              className="mnote-loop"
              viewBox="0 0 208 62"
              preserveAspectRatio="none"
              aria-hidden="true"
            >
              <path
                d={LOOP}
                data-draw
                fill="none"
                stroke="var(--pen)"
                strokeWidth="2"
                strokeLinecap="round"
                vectorEffect="non-scaling-stroke"
              />
            </svg>
          </span>
          {t.after}
        </p>

        {/* A seta vem DEPOIS da frase e aponta para baixo: no centro da
            tela ela não é decoração de canto, é a direção. */}
        <span className="mnote-cue meta">
          <svg className="mnote-arrow" viewBox="0 0 22 42" aria-hidden="true">
            <path
              d={ARROW}
              data-draw
              fill="none"
              stroke="var(--pen)"
              strokeWidth="2"
              strokeLinecap="round"
            />
          </svg>
          {t.cue}
        </span>
      </a>
    </div>
  );
};
