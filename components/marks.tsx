"use client";

/* ── A caneta ──────────────────────────────────────────────────────────
   O vocabulário de marcação à mão do site, num lugar só. A nota sobre o
   masthead inventou o gesto; daqui para frente ele é uma peça, não um
   desenho avulso colado em cada seção.

   São três traços e nada além disso — laço, sublinha e seta. A régua é
   simples: a caneta marca UMA coisa por seção, e marca a afirmação que
   o visitante deveria desconfiar. Marca de revisor repetida em tudo vira
   textura, e textura não afirma nada.

   Os traços são desenhados, não decorados: cada path se mede sozinho
   (`getTotalLength`) e entra quando fica visível, uma vez só. E
   `non-scaling-stroke` mantém a espessura da caneta constante mesmo com
   o viewBox esticado até a medida da palavra — sem isso, palavra curta
   sairia com traço gordo e palavra longa com traço fino, e a mão
   deixaria de ser a mesma mão. */

import { useRef, type ReactNode } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { prefersReducedMotion } from "@/lib/motion";

gsap.registerPlugin(useGSAP);

export type MarkKind = "loop" | "underline" | "arrow";

/* O laço dá a volta e PASSA do ponto onde começou — quem circula uma
   palavra à mão nunca fecha a curva em cima do próprio começo. É esse
   excesso que separa o traço de uma elipse de software. A sublinha vem
   em duas passadas, pelo mesmo motivo: uma passada só é uma borda. */
const MARKS: Record<MarkKind, { view: string; stretch: boolean; paths: string[] }> = {
  loop: {
    view: "0 0 208 62",
    stretch: true,
    paths: [
      "M150 10 C 96 1, 34 5, 16 22 C 1 37, 38 52, 100 54 C 162 56, 197 45, 192 27 C 188 13, 162 6, 126 7",
    ],
  },
  underline: {
    view: "0 0 208 24",
    stretch: true,
    paths: ["M4 8 C 58 1, 132 15, 205 4", "M13 18 C 68 12, 140 22, 195 13"],
  },
  arrow: {
    view: "0 0 22 42",
    stretch: false,
    paths: ["M11 2 C 8 14, 14 24, 11 37 M3 27 C 6 32, 9 35, 11 39 C 13 34, 17 30, 20 26"],
  },
};

/* O comprimento do traço COMO ELE É DESENHADO NA TELA.
   `getTotalLength()` responde em unidades do viewBox, e com
   `non-scaling-stroke` o tracejado é medido depois da transformação, no
   espaço da tela. Quando o viewBox é esticado até a medida da palavra os
   dois números deixam de bater: num laço de 208 unidades esticado para
   273px, o comprimento real é ~20% maior que o declarado, o `dasharray`
   fica CURTO e o último pedaço da curva nunca é pintado — o laço fecha
   com um buraco, por mais que a animação termine.

   Então o caminho é amostrado e somado no espaço da tela. Vale para
   qualquer proporção, inclusive a que ainda não existe: uma palavra
   nova, um idioma novo, uma janela de outro tamanho. */
function screenLength(path: SVGPathElement, sx: number, sy: number) {
  const len = path.getTotalLength();
  const steps = 160;
  let total = 0;
  let prev = path.getPointAtLength(0);
  for (let i = 1; i <= steps; i++) {
    const point = path.getPointAtLength((len * i) / steps);
    total += Math.hypot((point.x - prev.x) * sx, (point.y - prev.y) * sy);
    prev = point;
  }
  return total;
}

export function PenMark({
  kind,
  className,
  /* "scroll" é o normal: a caneta passa quando a marcação entra na tela.
     "mount" é para quem já nasce visível — a nota do masthead, que
     precisa desenhar ANTES do primeiro gesto de rolagem. */
  on = "scroll",
  delay = 0,
}: {
  kind: MarkKind;
  className?: string;
  on?: "scroll" | "mount";
  delay?: number;
}) {
  const ref = useRef<SVGSVGElement>(null);
  const mark = MARKS[kind];

  useGSAP(
    () => {
      const svg = ref.current;
      if (!svg) return;

      const paths = svg.querySelectorAll<SVGPathElement>("path");
      const reduced = prefersReducedMotion();

      /* Sem animação não existe tracejado: o traço é o traço inteiro. */
      if (reduced) {
        paths.forEach((path) => {
          path.style.strokeDasharray = "none";
        });
        return;
      }

      const box = svg.getBoundingClientRect();
      const view = svg.viewBox.baseVal;
      const sx = view.width ? box.width / view.width : 1;
      const sy = view.height ? box.height / view.height : 1;

      paths.forEach((path) => {
        const len = screenLength(path, sx, sy) || path.getTotalLength();
        path.style.strokeDasharray = `${len}`;
        path.style.strokeDashoffset = `${len}`;
      });

      const draw = () =>
        gsap.to(paths, {
          strokeDashoffset: 0,
          duration: 0.7,
          ease: "power1.inOut",
          stagger: 0.18,
          delay,
          /* Terminado o desenho o tracejado sai de cena. A medida foi
             feita para o tamanho de agora; se a janela mudar depois, um
             dasharray velho reabriria o buraco no fim da curva. */
          onComplete: () =>
            paths.forEach((path) => {
              path.style.strokeDasharray = "none";
              path.style.strokeDashoffset = "";
            }),
        });

      if (on === "mount") {
        draw();
        return;
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

      return () => io.disconnect();
    },
    { scope: ref }
  );

  return (
    <svg
      ref={ref}
      className={className ? `pen-mark ${className}` : "pen-mark"}
      data-kind={kind}
      viewBox={mark.view}
      preserveAspectRatio={mark.stretch ? "none" : undefined}
      aria-hidden="true"
    >
      {mark.paths.map((d) => (
        <path
          key={d}
          d={d}
          fill="none"
          /* --pen é do contexto: dentro do carimbo vermelho a caneta é de
             papel, em qualquer outro lugar é vermelha. */
          stroke="var(--pen, var(--red))"
          strokeWidth="2"
          strokeLinecap="round"
          vectorEffect="non-scaling-stroke"
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
  on,
  delay,
}: {
  children: ReactNode;
  kind?: Extract<MarkKind, "loop" | "underline">;
  on?: "scroll" | "mount";
  delay?: number;
}) {
  return (
    <span className="marked">
      {children}
      <PenMark kind={kind} on={on} delay={delay} />
    </span>
  );
}
