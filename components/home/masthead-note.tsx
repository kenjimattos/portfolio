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
import { Marked, PenMark } from "@/components/marks";

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

export const MastheadNote = () => {
  const t = COPY[useLocale()];
  const rootRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const root = rootRef.current;
      if (!root) return;

      const reduced = prefersReducedMotion();

      /* A entrada mexe no CARD e a saída mexe na moldura, nunca no mesmo
         elemento: o scrub da saída e o tween de entrada escrevem as
         mesmas propriedades, e quem rolar no primeiro segundo veria a
         nota reaparecer. */
      const card = root.querySelector<HTMLElement>(".mnote-card");

      if (!reduced && card) {
        /* A tarja entra primeiro; a caneta vem depois — o atraso dos
           traços é o `delay` de cada <PenMark> lá embaixo. Sem essa pausa
           o desenho acontece enquanto o masthead ainda está se
           registrando, e as duas coisas competem. */
        gsap.from(card, { autoAlpha: 0, y: 18, duration: 0.5, ease: "power2.out", delay: 0.35 });
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
          <Marked kind="loop" on="mount" delay={1.1}>
            {t.circled}
          </Marked>
          {t.after}
        </p>

        {/* A seta vem DEPOIS da frase e aponta para baixo: no centro da
            tela ela não é decoração de canto, é a direção. */}
        <span className="mnote-cue meta">
          <PenMark kind="arrow" on="mount" delay={1.55} />
          {t.cue}
        </span>
      </a>
    </div>
  );
};
