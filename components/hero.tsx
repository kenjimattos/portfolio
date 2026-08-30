"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { siteConfig } from "@/config/site";
import { prefersReducedMotion } from "@/lib/motion";
import { useLocale } from "@/lib/i18n";
import { PenMark } from "@/components/ui/marks";

gsap.registerPlugin(ScrollTrigger, useGSAP);

const COPY = {
  en: {
    role: "Software engineer and designer",
    place: "São Bernardo do Campo, São Paulo, Brazil",
    tagline:
      "I design, build, and put into production: interface, business logic, database, and deploy.",
    indexLabel: "Index",
    index: [
      { n: "/01", label: "Work", href: "#work" },
      { n: "/02", label: "About", href: "#about" },
      { n: "/03", label: "Contact", href: "#contact" },
    ],
  },
  pt: {
    role: "Engenheiro de software e Designer",
    place: "São Bernardo do Campo, São Paulo, Brasil",
    tagline:
      "Eu projeto, construo e coloco em produção: interface, regra de negócio, banco e deploy.",
    indexLabel: "Índice",
    index: [
      { n: "/01", label: "Projetos", href: "#work" },
      { n: "/02", label: "Sobre", href: "#about" },
      { n: "/03", label: "Contato", href: "#contact" },
    ],
  },
} as const;

const WORDS = ["DESIGN", "SCHEMA", "DEPLOY"] as const;

/* Geometria do wordmark, em unidades do viewBox. O <svg> é full-bleed e o
   texto ocupa a largura inteira dele: as três palavras encostam nas duas
   bordas da tela, enquanto o colophon, a lista e todo o resto ficam
   dentro da margem. É a única relação honesta entre os dois — com o
   wordmark recuado por uma fração fixa do viewBox ele quase batia na
   margem da página sem nunca bater, e "quase alinhado" lê como erro. */
const VB_W = 1000;
/* O corpo não é escolhido, é calculado a partir da medida. Com textLength
   travado em 1000, o entreletra de cada linha é a sobra entre a largura
   natural da palavra e a medida, dividida pelos cinco vãos — e se a
   palavra nasce mais larga que a medida essa sobra fica NEGATIVA e as
   letras se montam umas sobre as outras. Medidas no Archivo em wdth 112:
   DESIGN 1047, SCHEMA 1190 e DEPLOY 1094 para cada 225 de corpo. 186 é o
   maior corpo em que a palavra mais larga ainda cabe, com folga para o
   caso de a fonte cair no fallback. As outras duas ganham entreletra
   positivo — linhas justificadas têm espacejamento diferente entre si. */
const FONT_SIZE = 186;
const LINE_STEP = 158;
const FIRST_BASELINE = 143;
const VB_H = 480;
const CLIP_X = -50;
const CLIP_W = VB_W + 100;

/* O quadro de partida do eixo de largura. 62 (o extremo) deixava o
   wordmark ilegível empilhado com o desalinho — e são essas três palavras
   que dizem o que o site é. 96 lê como linha ainda não assentada. */
const WDTH_OPEN = 96;
const WDTH_WIDE = 112;

const PAPER = "#F5F5F5";
const INK = "#0A0303";
const RED = "#F40035";

/* ── Fora de registro ──────────────────────────────────────────────────
   O wordmark inteiro é fatiado em sete tiras horizontais e cada tira
   entra deslocada na horizontal — tudo em tinta sobre papel, sem uma gota
   de vermelho. É uma chapa só, impressa torta: não é cor errada, é o
   registro quebrado.

   Os cortes caem DENTRO do corpo das letras, não nos vãos entre as
   linhas: uma tira que corta o branco entre DESIGN e SCHEMA não desloca
   nada visível e o erro se perde. Os deslocamentos alternam de lado, para
   ler como registro torto e não como uma coisa só empurrada.

   O scroll é quem corrige: cada tira volta ao eixo, uma de cada vez.
   Depois o vermelho sobe do rodapé e toma o masthead inteiro — campo
   vermelho, letras de papel, colophon incluído. */
const STRIPS = [
  { y0: 0, y1: 62, dx: -86 },
  { y0: 62, y1: 118, dx: 44 },
  { y0: 118, y1: 186, dx: -30 },
  { y0: 186, y1: 248, dx: 96 },
  { y0: 248, y1: 320, dx: -58 },
  { y0: 320, y1: 396, dx: 68 },
  { y0: 396, y1: VB_H, dx: -40 },
];

/* A costura começa fora do quadro, embaixo (nenhum vermelho no wordmark)
   e termina acima do topo, com o campo cobrindo tudo. */
const SEAM_START = VB_H;
const SEAM_END = -10;

/* A partitura. Cada ato tem sua fatia do percurso e sua própria curva —
   e o percurso aqui é a rolagem com a seção presa, então uma posição de
   scroll sempre dá o mesmo quadro, para frente e para trás. */
const SEGMENTS = {
  width: { from: 0, to: 0.4, stagger: 0.02 },
  register: { from: 0, to: 0.3, stagger: 0.038 },
  seam: { from: 0.54, to: 0.9 },
  /* O chão do colophon vira vermelho logo DEPOIS de a costura passar o
     topo do wordmark, e vira rápido: o vermelho do <svg> e o do fundo da
     seção são pinturas diferentes, então enquanto os dois não baterem no
     mesmo valor existe um degrau visível entre a tarja e o wordmark. Uma
     rampa curta reduz esse degrau a um piscar. */
  ground: { from: 0.89, to: 0.94 },
};

/* Quanto a seção fica presa: pouco mais de uma tela de rolagem. É o preço
   de "a página não rola enquanto a animação não termina". */
const PIN_LENGTH = "+=110%";

const clamp01 = (v: number) => (v < 0 ? 0 : v > 1 ? 1 : v);
const span = (p: number, from: number, to: number) =>
  clamp01((p - from) / (to - from));
const expoOut = (t: number) => (t >= 1 ? 1 : 1 - Math.pow(2, -10 * t));
const powInOut = (t: number) =>
  t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2;

/* Mistura de duas cores em hexadecimal. O chão e a tinta do colophon
   trocam de valor no fim, e um crossfade de dois elementos empilhados
   custaria mais DOM do que esta conta. */
const mix = (from: string, to: string, t: number) => {
  const channel = (hex: string, i: number) =>
    parseInt(hex.slice(1 + i * 2, 3 + i * 2), 16);
  const at = (i: number) =>
    Math.round(channel(from, i) + (channel(to, i) - channel(from, i)) * t);
  return `rgb(${at(0)} ${at(1)} ${at(2)})`;
};

export const Hero = () => {
  const t = COPY[useLocale()];
  const sectionRef = useRef<HTMLElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);
  const aboveRef = useRef<SVGRectElement>(null);
  const belowRef = useRef<SVGRectElement>(null);
  const fieldRef = useRef<SVGRectElement>(null);
  const stripRefs = useRef<(SVGGElement | null)[]>([]);

  useGSAP(
    () => {
      const section = sectionRef.current;
      const above = aboveRef.current;
      const below = belowRef.current;
      const field = fieldRef.current;
      if (!section || !above || !below || !field) return;

      const setWidth = (i: number, w: number) =>
        svgRef.current?.style.setProperty(`--wd${i}`, String(w));

      /* Um quadro é: onde está cada tira, onde está a costura e de que cor
         está o chão. As tiras são as MESMAS instâncias dos dois lados da
         costura — o grupo de chapas é definido uma vez e usado duas vezes,
         em tinta acima e em papel abaixo —, então deslocamento e inversão
         não têm como sair de sincronia. */
      const apply = (strips: number[], seam: number, ground: number) => {
        strips.forEach((dx, k) => {
          stripRefs.current[k]?.setAttribute("transform", `translate(${dx} 0)`);
        });

        above.setAttribute("height", String(Math.max(0, seam - CLIP_X)));
        below.setAttribute("y", String(seam));
        below.setAttribute("height", String(Math.max(0, VB_H + 50 - seam)));
        field.setAttribute("y", String(seam));
        field.setAttribute("height", String(Math.max(0, VB_H + 50 - seam)));

        /* O chão esmaece de papel para vermelho, mas a tinta do colophon
           VIRA de uma vez, perto do fim: interpolada junto ela passaria
           por um cinza médio sobre rosa, que é o único momento ilegível
           da sequência inteira. Tinta sobre rosa e tinta sobre vermelho
           leem bem; o meio do caminho entre as duas cores, não. */
        section.style.setProperty("--mh-ground", mix(PAPER, RED, ground));
        section.style.setProperty("--mh-ink", ground >= 0.85 ? PAPER : INK);
      };

      if (prefersReducedMotion()) {
        apply(
          STRIPS.map(() => 0),
          SEAM_START,
          0
        );
        WORDS.forEach((_, i) => setWidth(i, WDTH_WIDE));
        return;
      }

      const applyProgress = (p: number) => {
        WORDS.forEach((_, i) => {
          const s = SEGMENTS.width;
          const open = expoOut(
            span(p, s.from + i * s.stagger, s.to + i * s.stagger)
          );
          setWidth(i, WDTH_OPEN + (WDTH_WIDE - WDTH_OPEN) * open);
        });

        const r = SEGMENTS.register;
        const strips = STRIPS.map((strip, k) => {
          const registered = expoOut(
            span(p, r.from + k * r.stagger, r.to + k * r.stagger)
          );
          return strip.dx * (1 - registered);
        });

        const seam =
          SEAM_START +
          (SEAM_END - SEAM_START) *
            powInOut(span(p, SEGMENTS.seam.from, SEGMENTS.seam.to));

        apply(strips, seam, span(p, SEGMENTS.ground.from, SEGMENTS.ground.to));
      };

      /* useGSAP roda antes da pintura, então o quadro zero — o wordmark
         fora de registro — entra sem piscar o estado limpo que veio do
         servidor. */
      applyProgress(0);

      /* A seção fica presa até a animação acabar: é o pedido literal de
         que a página não role no meio dela. pinSpacing reserva a rolagem
         gasta, então nada abaixo se desloca de lugar. */
      ScrollTrigger.create({
        trigger: section,
        /* Trava logo ABAIXO do header, não no topo da janela: o header é
           sticky com 56px + o filete de 1px, e prender a seção em "top
           top" enfiaria o colophon debaixo dele. */
        start: "top 57px",
        end: PIN_LENGTH,
        pin: true,
        pinSpacing: true,
        anticipatePin: 1,
        /* Um respiro de inércia por cima da rolagem já interpolada do
           Lenis: dá peso às chapas sem descolar a animação do gesto. */
        scrub: 0.35,
        onUpdate: (self) => applyProgress(self.progress),
      });
    },
    { scope: sectionRef }
  );

  return (
    <section
      ref={sectionRef}
      className="relative"
      style={{ background: "var(--mh-ground, var(--paper))" }}
    >
      <div className="wrap">
        <div
          className="flex justify-between items-baseline flex-wrap relative"
          style={{
            gap: "var(--s3)",
            paddingTop: "var(--s4)",
            paddingBottom: "var(--s3)",
            color: "var(--mh-ink, var(--ink))",
          }}
        >
          <span
            style={{
              fontSize: "clamp(17px, 1.7vw, 22px)",
              fontWeight: 800,
              letterSpacing: "-0.02em",
              fontVariationSettings: '"wdth" 108',
            }}
          >
            {siteConfig.brand.ownerName}
          </span>
          <span className="meta" style={{ opacity: 0.55 }}>
            {t.role} · {t.place}
          </span>
          <div
            className="absolute left-0 right-0 bottom-0"
            style={{ height: 1, background: "var(--mh-ink, var(--ink))" }}
          />
        </div>
      </div>

      {/* O markup nasce no estado limpo — tiras no eixo, nenhum vermelho.
          É o que o servidor manda e o que fica se o JS não rodar; o
          desalinho é aplicado depois, antes da primeira pintura. */}
      <svg
        ref={svgRef}
        className="block w-full h-auto"
        style={
          {
            marginTop: "var(--s4)",
            "--wd0": WDTH_WIDE,
            "--wd1": WDTH_WIDE,
            "--wd2": WDTH_WIDE,
          } as React.CSSProperties
        }
        viewBox={`0 0 ${VB_W} ${VB_H}`}
        role="img"
        aria-label={WORDS.join(", ").toLowerCase()}
      >
        <defs>
          {/* O wordmark é definido UMA vez e instanciado muitas. Duplicar
              os <text> no markup parece equivalente, mas com textLength +
              lengthAdjust as cópias podem resolver o entreletra em
              momentos diferentes do carregamento da fonte e sair
              desalinhadas — dá um fantasma na tela. */}
          <g id="masthead-words">
            {WORDS.map((word, i) => (
              <text
                key={word}
                x="0"
                y={FIRST_BASELINE + i * LINE_STEP}
                fontSize={FONT_SIZE}
                textLength={VB_W}
                lengthAdjust="spacing"
                style={{
                  fontFamily: "var(--font-archivo), Arial, sans-serif",
                  fontWeight: 900,
                  fontVariationSettings: `"wdth" var(--wd${i}, ${WDTH_WIDE})`,
                }}
              >
                {word}
              </text>
            ))}
          </g>

          {STRIPS.map((strip, k) => (
            <clipPath key={k} id={`masthead-strip-${k}`}>
              {/* Meio ponto de sobra em cima e embaixo: tiras vizinhas se
                  sobrepõem em vez de se encostar, senão o antialiasing
                  abre um fio claro atravessando as letras em cada corte. */}
              <rect
                x={CLIP_X}
                width={CLIP_W}
                y={strip.y0 - 0.5}
                height={strip.y1 - strip.y0 + 1}
              />
            </clipPath>
          ))}

          <g id="masthead-plates">
            {STRIPS.map((_, k) => (
              <g
                key={k}
                ref={(el) => {
                  stripRefs.current[k] = el;
                }}
                clipPath={`url(#masthead-strip-${k})`}
              >
                <use href="#masthead-words" />
              </g>
            ))}
          </g>

          <clipPath id="masthead-above">
            <rect
              ref={aboveRef}
              x={CLIP_X}
              width={CLIP_W}
              y={CLIP_X}
              height={SEAM_START - CLIP_X}
            />
          </clipPath>
          <clipPath id="masthead-below">
            <rect
              ref={belowRef}
              x={CLIP_X}
              width={CLIP_W}
              y={SEAM_START}
              height="0"
            />
          </clipPath>
        </defs>

        {/* Acima da costura, tinta sobre papel. Abaixo, papel sobre o campo
            vermelho. As duas usam o MESMO grupo de chapas. */}
        <g clipPath="url(#masthead-above)" fill="var(--ink)">
          <use href="#masthead-plates" />
        </g>
        <rect
          ref={fieldRef}
          x={CLIP_X}
          width={CLIP_W}
          y={SEAM_START}
          height="0"
          fill="var(--red)"
        />
        <g clipPath="url(#masthead-below)" fill="var(--paper)">
          <use href="#masthead-plates" />
        </g>
      </svg>

      <div className="on-ink" style={{ background: "var(--red)", color: "var(--paper)" }}>
        <div className="wrap">
          <div
            className="ed-grid items-start"
            style={{ paddingTop: "var(--s6)", paddingBottom: "var(--s8)" }}
          >
            <p className="masthead-tagline">{t.tagline}</p>
            <div className="masthead-index">
              <span className="meta" style={{ opacity: 0.85 }}>
                {t.indexLabel}
              </span>
              {/* A seta é a mesma caneta das marcações, escrita quando o
                  cursor chega. Aqui ela é de papel: o campo é vermelho, e
                  a caneta vermelha do padrão sumiria dentro dele. */}
              {t.index.map((item) => (
                <a key={item.href} href={item.href} className="masthead-index-link">
                  <span>{item.n}</span>
                  <span>{item.label}</span>
                  <PenMark kind="arrow" pen="paper" on="hover" />
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
