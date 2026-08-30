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

import { useRef, type CSSProperties, type ReactNode } from "react";
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

/* A folga que esconde as pontas. Com `dasharray` e `dashoffset` iguais ao
   comprimento, o traço some — mas o começo do tracejado cai exatamente no
   começo do caminho, e a ponta ARREDONDADA da caneta continua pintando um
   pingo de tinta ali. Empurrar o tracejado alguns pixels a mais tira a
   ponta para fora do caminho, e o repouso fica limpo de verdade. */
const CAP_PAD = 4;

export function PenMark({
  kind,
  className,
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
     quando ele sai, e por isso é a única que precisa medir de novo a
     cada entrada. */
  on = "scroll",
  delay = 0,
}: {
  kind: MarkKind;
  className?: string;
  pen?: "red" | "paper" | "ink";
  on?: "scroll" | "mount" | "hover";
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

      /* Medir é sempre no tamanho de agora: o traço só sabe o próprio
         comprimento depois de saber a largura que coube na tela. */
      const hide = () => {
        const box = svg.getBoundingClientRect();
        const view = svg.viewBox.baseVal;
        const sx = view.width ? box.width / view.width : 1;
        const sy = view.height ? box.height / view.height : 1;
        paths.forEach((path) => {
          const len = screenLength(path, sx, sy) || path.getTotalLength();
          path.style.strokeDasharray = `${len}`;
          path.style.strokeDashoffset = `${len + CAP_PAD}`;
        });
      };

      /* Sem animação não existe tracejado: o traço é o traço inteiro.
         Marcação de gesto é a exceção — ela precisa continuar sumindo
         quando o cursor sai, então segue medida e escondida, e aparece
         de uma vez em vez de ser desenhada. */
      if (reduced && on !== "hover") {
        paths.forEach((path) => {
          path.style.strokeDasharray = "none";
        });
        return;
      }

      hide();

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

      /* Marcação de gesto. O anfitrião é a linha inteira, não o traço:
         quem passa o mouse mira o projeto, não a seta de 22px. O foco de
         teclado conta como chegada, senão a seta só existiria para quem
         usa mouse.

         Remede a cada entrada porque o `dasharray` daqui não pode ser
         apagado no fim — ele ainda precisa esconder o traço na saída —, e
         uma medida velha de antes de a janela mudar deixaria a seta com
         um buraco no fim. */
      if (on === "hover") {
        const host = svg.closest<HTMLElement>("a") ?? svg.parentElement;
        if (!host) return;

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
           escuro ela está lá, e ela sai junto quando o campo sai. Ler o
           `:hover` é o que faz as duas coisas serem a mesma coisa por
           construção, em vez de duas regras que precisam concordar.

           Foi por isso que perguntar `(hover: hover)` ou olhar
           `pointerType === "touch"` deu errado das duas vezes: as duas
           perguntas são sobre o DISPOSITIVO, e o que importa aqui é o
           estado de agora. */
        let shown = false;

        const show = () => {
          if (shown) return;
          shown = true;
          pen?.kill();
          if (reduced) {
            paths.forEach((path) => {
              path.style.strokeDasharray = "none";
            });
            return;
          }
          hide();
          pen = gsap.to(paths, {
            strokeDashoffset: 0,
            duration: 0.85,
            ease: "power1.inOut",
            stagger: 0.12,
          });
        };

        /* A saída é um corte seco. Desenhar ao contrário parece a caneta
           sendo desfeita, e ninguém fica olhando o próprio gesto voltar:
           quem saiu já está mirando a linha seguinte, e a espera do
           recolhimento vira lentidão. Some, e o `hide` ainda remede para
           a próxima entrada. */
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
      style={pen ? ({ "--pen": `var(--${pen})` } as CSSProperties) : undefined}
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
  pen,
  on,
  delay,
}: {
  children: ReactNode;
  kind?: Extract<MarkKind, "loop" | "underline">;
  pen?: "red" | "paper" | "ink";
  on?: "scroll" | "mount";
  delay?: number;
}) {
  return (
    <span className="marked">
      {children}
      <PenMark kind={kind} pen={pen} on={on} delay={delay} />
    </span>
  );
}
