"use client";

/* ── A nota ────────────────────────────────────────────────────────────
   Um recorte de papel pousado por cima da página, com uma frase, um laço
   de caneta em volta de duas palavras e a seta apontando para onde o
   leitor deveria ir. Ela existe por um motivo só: dizer que tem coisa
   embaixo e sair da frente.

   Duas decisões que valem para qualquer colocação:

   1. O gesto está no TRAÇO, não na letra. A frase usa a mesma tipografia
      do resto do site; o que é feito à mão é o laço e a seta, que é o que
      um revisor faz numa prova. Fonte manuscrita não é a letra de
      alguém — é a letra de ninguém, e lê como clipart.

   2. A rolagem só leva embora. A nota sobe e apaga presa ao scrub, no
      primeiro meio-viewport, e voltar ao topo traz ela de volta. Vale
      também com movimento reduzido: aqui o deslocamento não é enfeite, é
      o que tira o recorte da frente do conteúdo.

   A nota pousa sempre no centro da tela, na home e no case: é o lugar de
   quem interrompe a leitura para dizer uma coisa só. O que muda de uma
   página para a outra é a frase. */

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { Marked, PenMark } from "@/components/ui/marks";

gsap.registerPlugin(ScrollTrigger, useGSAP);

/* As duas peles. "stamp" é o carimbo vermelho — campo cheio, caneta de
   papel. "slip" é o recorte: papel, tipografia em tinta e a marcação em
   vermelho, que é a caneta do revisor de verdade. As cores são variáveis
   do card, não valores soltos nas regras. */
const SKIN: "stamp" | "slip" = "slip";

export type NoteCopy = {
  cue: string;
  before: string;
  circled: string;
  after: string;
};

export function Note({
  cue,
  before,
  circled,
  after,
  href,
}: NoteCopy & { href: string }) {
  const rootRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const root = rootRef.current;
      if (!root) return;

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
      <a className="mnote-card" data-skin={SKIN} href={href}>
        <p className="mnote-line">
          {before} <Marked kind="loop" on="mount">{circled}</Marked>
          {after}
        </p>

        {/* A seta vem DEPOIS da frase e aponta para baixo: ela não é
            decoração de canto, é a direção. */}
        <span className="mnote-cue meta">
          <PenMark kind="arrow" on="mount" />
          {cue}
        </span>
      </a>
    </div>
  );
}
