"use client";

/* ── A caneta ──────────────────────────────────────────────────────────
   O vocabulário de marcação à mão do site, num lugar só. A nota sobre o
   masthead inventou o gesto; daqui para frente ele é uma peça, não um
   desenho avulso colado em cada seção.

   São quatro traços e nada além disso — laço, sublinha, seta e visto. A
   régua é simples: a caneta marca UMA coisa por seção, e marca a
   afirmação que o visitante deveria desconfiar. Marca de revisor
   repetida em tudo vira textura, e textura não afirma nada.

   A geometria mora em `lib/pen.ts`, porque é desenho e não componente:
   cada traço é um contorno PREENCHIDO, gerado no tamanho medido da
   palavra a partir de uma linha de centro mais um perfil de largura.
   Aqui mora só o resto — quando o traço é escrito, e o que o esconde
   antes disso. */

import { useId, useRef, type CSSProperties, type ReactNode } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { prefersReducedMotion } from "@/lib/motion";
import {
  ARROW_BOX,
  CHECK_BOX,
  arrow,
  check,
  loop,
  underline,
  type LoopVariant,
  type Stroke,
  type UnderlineVariant,
} from "@/lib/pen";

export type MarkKind = "loop" | "underline" | "arrow" | "check";
export type MarkVariant = LoopVariant | UnderlineVariant;

/* Quem estica e quem não estica. O laço e a sublinha são gerados na
   medida exata da palavra — é por isso que a espessura da caneta fica
   igual numa palavra curta e numa comprida, sem `non-scaling-stroke` e
   sem os remendos que ele obrigava. A seta e o visto têm caixa própria e
   entram inteiros na caixa que o CSS reservar, como sempre entraram. */
const NATURAL: Partial<Record<MarkKind, { w: number; h: number }>> = {
  arrow: ARROW_BOX,
  check: CHECK_BOX,
};

/* Quantos traços cada marcação tem. Precisa ser sabido ANTES de medir:
   os elementos nascem vazios no HTML e só recebem o desenho depois, já
   com a medida na mão — assim não existe um quadro em que a marcação
   aparece no tamanho errado. */
const PARTS: Record<MarkKind, (variant?: MarkVariant) => number> = {
  loop: () => 1,
  underline: (variant) => (variant === "a" ? 1 : 2),
  arrow: () => 3,
  check: () => 2,
};

/* A velocidade da escrita, por traço. Não é a mesma duração para todos
   de propósito: a sublinha é um caminho muito mais curto que o laço, e
   dar a ela o mesmo tempo dá uma caneta mais LENTA — o risco reto parece
   arrastado mesmo estando certo no relógio. O que precisa bater entre os
   traços é a velocidade, não a duração. */
const DURATION: Record<MarkKind, number> = {
  loop: 0.5,
  underline: 0.3,
  arrow: 0.42,
  check: 0.34,
};

export function PenMark({
  kind,
  className,
  /* Qual dos três laços, ou qual das duas sublinhas. Os três laços têm o
     mesmo peso e diferem só no caminho — a lente aberta à esquerda, a
     saída por baixo, o rabo cruzando —, então alternar entre eles não
     faz um parecer mais importante que o outro. */
  variant,
  /* A cor da caneta. Ela é herdada do contexto por padrão — é assim que
     as duas peles da nota trocam de tinta sem que a marcação saiba onde
     está —, e esta prop escreve a MESMA variável, para não existirem
     dois jeitos de dizer a mesma coisa. Serve para quem chama de um
     lugar onde o contexto não resolve: uma seta de papel dentro do campo
     vermelho do masthead, por exemplo. */
  pen,
  /* "scroll" é o normal: a caneta passa quando a marcação entra na tela.
     "mount" é para quem já nasce visível — a nota do masthead, que
     precisa desenhar ANTES do primeiro gesto de rolagem. "hover" é para
     marcação de gesto: a caneta escreve quando o cursor chega e desfaz
     quando ele sai. */
  on = "scroll",
  delay = 0,
}: {
  kind: MarkKind;
  className?: string;
  variant?: MarkVariant;
  pen?: "red" | "paper" | "ink" | "violet";
  on?: "scroll" | "mount" | "hover";
  delay?: number;
}) {
  const ref = useRef<SVGSVGElement>(null);
  const uid = useId().replace(/:/g, "");
  const natural = NATURAL[kind];
  const count = PARTS[kind](variant);

  useGSAP(
    () => {
      const svg = ref.current;
      if (!svg) return;

      const fills = Array.from(svg.querySelectorAll<SVGPathElement>("path[data-fill]"));
      const spines = Array.from(svg.querySelectorAll<SVGPathElement>("path[data-spine]"));
      const regions = Array.from(svg.querySelectorAll<SVGMaskElement>("mask"));
      const reduced = prefersReducedMotion();

      let cover: number[] = [];

      /* Desenhar é sempre no tamanho de agora. O traço só sabe a própria
         forma depois de saber a largura que coube na tela — e quando a
         janela muda, ou a fonte assenta e a palavra cresce, ele precisa
         ser desenhado de novo, não esticado. */
      const build = () => {
        const box = svg.getBoundingClientRect();
        const w = natural ? natural.w : Math.max(1, box.width);
        const h = natural ? natural.h : Math.max(1, box.height);

        if (!natural) svg.setAttribute("viewBox", `0 0 ${w} ${h}`);

        let parts: Stroke[];
        if (kind === "loop") parts = loop(w, h, (variant as LoopVariant) ?? "a");
        else if (kind === "underline") parts = underline(w, h, (variant as UnderlineVariant) ?? "b");
        else if (kind === "arrow") parts = arrow();
        else parts = check();

        cover = parts.map((part) => part.cover);

        parts.forEach((part, i) => {
          fills[i]?.setAttribute("d", part.d);
          spines[i]?.setAttribute("d", part.spine);
          spines[i]?.setAttribute("stroke-width", String(Math.ceil(part.cover)));
          /* A máscara precisa de folga: o rabo do laço sai da caixa, e
             uma região apertada cortaria justamente a parte que faz o
             traço parecer solto. */
          const mask = regions[i];
          if (mask) {
            mask.setAttribute("x", String(-w));
            mask.setAttribute("y", String(-h));
            mask.setAttribute("width", String(w * 3));
            mask.setAttribute("height", String(h * 3));
          }
        });
      };

      /* Esconder é empurrar a máscara para fora do caminho. O vão é o
         dobro do traço para que a segunda repetição do tracejado não
         espie no fim, e a folga extra tira a ponta ARREDONDADA da
         máscara de cima do começo do caminho — sem ela sobra um pingo de
         tinta visível no repouso. */
      const hide = () => {
        spines.forEach((spine, i) => {
          const len = spine.getTotalLength();
          spine.style.strokeDasharray = `${len} ${len * 2}`;
          spine.style.strokeDashoffset = `${len + (cover[i] ?? 2)}`;
        });
      };

      const reveal = () => {
        spines.forEach((spine) => {
          spine.style.strokeDasharray = "none";
          spine.style.strokeDashoffset = "";
        });
      };

      build();

      /* Sem animação não existe tracejado: o traço é o traço inteiro.
         Marcação de gesto é a exceção — ela precisa continuar sumindo
         quando o cursor sai, então segue medida e escondida, e aparece
         de uma vez em vez de ser escrita. */
      if (reduced && on !== "hover") {
        reveal();
        return;
      }

      hide();
      let drawn = false;

      const draw = () =>
        gsap.to(spines, {
          strokeDashoffset: 0,
          duration: DURATION[kind],
          ease: "power2.out",
          stagger: 0.07,
          delay,
          onComplete: () => {
            drawn = true;
            reveal();
          },
        });

      /* A palavra muda de tamanho depois de montada: a fonte assenta, a
         janela vira, o idioma troca. O traço é redesenhado na medida
         nova — e volta a se esconder se ainda não tiver sido escrito. */
      let observer: ResizeObserver | null = null;
      if (!natural && typeof ResizeObserver !== "undefined") {
        let first = true;
        observer = new ResizeObserver(() => {
          if (first) {
            first = false;
            return;
          }
          build();
          if (drawn || (reduced && on !== "hover")) reveal();
          else hide();
        });
        observer.observe(svg);
      }
      const stop = () => observer?.disconnect();

      if (on === "mount") {
        draw();
        return stop;
      }

      /* Marcação de gesto. O anfitrião é a linha inteira, não o traço:
         quem passa o mouse mira o projeto, não a seta de 22px. O foco de
         teclado conta como chegada, senão a seta só existiria para quem
         usa mouse. */
      if (on === "hover") {
        const host = svg.closest<HTMLElement>("a, button") ?? svg.parentElement;
        if (!host) return stop;

        /* A caneta em curso é guardada, e é ELA que morre na saída. Matar
           por alvo (`killTweensOf`) não alcançava este tween: ele nasce
           dentro de um ouvinte de evento, fora da execução do contexto do
           useGSAP, e sair antes do fim deixava o traço continuar sendo
           escrito por cima do valor que a saída acabara de gravar — a
           seta ficava pela metade na tela. */
        let pen: gsap.core.Tween | null = null;

        /* Quem manda é o `:hover` do próprio anfitrião, e não o tipo do
           ponteiro. No toque não existe "estar em cima", mas o navegador
           mantém um hover PEGAJOSO: a linha fica escura até você tocar em
           outra. A seta pertence a esse estado — enquanto o campo está
           escuro ela está lá, e sai junto quando o campo sai. Ler o
           `:hover` é o que faz as duas coisas serem a mesma coisa por
           construção, em vez de duas regras que precisam concordar. */
        let shown = false;

        const show = () => {
          if (shown) return;
          shown = true;
          pen?.kill();
          if (reduced) {
            reveal();
            return;
          }
          build();
          hide();
          pen = gsap.to(spines, {
            strokeDashoffset: 0,
            duration: DURATION[kind],
            ease: "power2.out",
            stagger: 0.07,
          });
        };

        /* A saída é um corte seco. Desenhar ao contrário parece a caneta
           sendo desfeita, e ninguém fica olhando o próprio gesto voltar:
           quem saiu já está mirando a linha seguinte, e a espera do
           recolhimento vira lentidão. */
        const clear = () => {
          if (!shown) return;
          shown = false;
          pen?.kill();
          pen = null;
          hide();
        };

        /* A rede de segurança: qualquer toque na página pode ter mudado o
           hover pegajoso desta linha sem que ela receba um evento
           próprio. Em vez de confiar no `pointerleave` chegar, pergunta-se
           ao navegador quem está em hover agora. */
        const sync = () => (host.matches(":hover") ? show() : clear());

        host.addEventListener("pointerenter", show);
        host.addEventListener("pointerleave", clear);
        host.addEventListener("focus", show);
        host.addEventListener("blur", clear);
        window.addEventListener("pointerup", sync);
        window.addEventListener("pointercancel", sync);

        return () => {
          stop();
          host.removeEventListener("pointerenter", show);
          host.removeEventListener("pointerleave", clear);
          host.removeEventListener("focus", show);
          host.removeEventListener("blur", clear);
          window.removeEventListener("pointerup", sync);
          window.removeEventListener("pointercancel", sync);
        };
      }

      /* Quem dispara é o IntersectionObserver, e não um ScrollTrigger.
         A diferença aparece no fim da página: um gatilho de rolagem
         posiciona o start em "o topo do elemento chega a x% da janela", e
         para uma marcação perto do rodapé essa posição de rolagem pode
         estar ALÉM do fim do documento — o start nunca é atingido e o
         traço fica pela metade para sempre. O observer só pergunta se o
         elemento está visível, que é literalmente a condição que a
         marcação quer. */
      const io = new IntersectionObserver(
        (entries) => {
          if (!entries.some((entry) => entry.isIntersecting)) return;
          io.disconnect();
          draw();
        },
        { rootMargin: "0px 0px -8% 0px" }
      );
      io.observe(svg);

      return () => {
        stop();
        io.disconnect();
      };
    },
    { scope: ref, dependencies: [kind, variant] }
  );

  return (
    <svg
      ref={ref}
      className={className ? `pen-mark ${className}` : "pen-mark"}
      data-kind={kind}
      viewBox={natural ? `0 0 ${natural.w} ${natural.h}` : "0 0 100 100"}
      style={pen ? ({ "--pen": `var(--${pen})` } as CSSProperties) : undefined}
      aria-hidden="true"
    >
      <defs>
        {Array.from({ length: count }, (_, i) => (
          <mask key={i} id={`${uid}-${i}`} maskUnits="userSpaceOnUse">
            {/* A máscara é a única coisa que a animação toca: ela anda
                pelo caminho e vai descobrindo o contorno. */}
            <path
              data-spine=""
              d=""
              fill="none"
              stroke="#fff"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </mask>
        ))}
      </defs>
      {Array.from({ length: count }, (_, i) => (
        <path
          key={i}
          data-fill=""
          d=""
          /* --pen é do contexto: dentro do carimbo vermelho a caneta é de
             papel, em qualquer outro lugar é vermelha. */
          fill="var(--pen, var(--red))"
          mask={`url(#${uid}-${i})`}
        />
      ))}
    </svg>
  );
}

/* Marcação em cima de um trecho de texto. O traço é irmão do texto, não
   filho: assim ele se estica pela medida da palavra sem herdar recorte
   nem cor dela. */
export function Marked({
  children,
  kind = "loop",
  variant,
  pen,
  on,
  delay,
}: {
  children: ReactNode;
  kind?: Extract<MarkKind, "loop" | "underline">;
  variant?: MarkVariant;
  pen?: "red" | "paper" | "ink" | "violet";
  on?: "scroll" | "mount" | "hover";
  delay?: number;
}) {
  return (
    <span className="marked">
      {children}
      <PenMark kind={kind} variant={variant} pen={pen} on={on} delay={delay} />
    </span>
  );
}
