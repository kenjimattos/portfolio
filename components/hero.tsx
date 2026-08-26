"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { siteConfig } from "@/config/site";
import { prefersReducedMotion } from "@/lib/motion";
import { useLocale } from "@/lib/i18n";

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
   margem da página sem nunca bater, e "quase alinhado" lê como erro.
   Full-bleed também evita ter que sangrar o campo vermelho para fora da
   caixa do svg, que era o que empurrava a largura da página no mobile. */
const VB_W = 1000;
/* O corpo não é escolhido, é calculado a partir da medida. Com textLength
   travado em 1000, o entreletra de cada linha é a sobra entre a largura
   natural da palavra e a medida, dividida pelos cinco vãos — e se a
   palavra nasce mais larga que a medida essa sobra fica NEGATIVA e as
   letras se montam umas sobre as outras. Foi o que aconteceu com o corpo
   herdado do esboço: medidas no Archivo em wdth 112 dão DESIGN 1047,
   SCHEMA 1190 e DEPLOY 1094 para cada 225 de corpo, ou seja, as três
   estouravam.
   186 é o maior corpo em que a palavra mais larga (SCHEMA) ainda cabe,
   com uma folga de segurança para o caso de a fonte cair no fallback. As
   outras duas ganham entreletra positivo — linhas justificadas têm
   espacejamento diferente entre si, e é isso que se vê aqui. */
const FONT_SIZE = 186;
const LINE_STEP = 158;
const FIRST_BASELINE = 143;
const VB_H = 480;
const CLIP_X = -50;
const CLIP_W = VB_W + 100;
const SEAM_REST = 394; // onde a costura descansa: corta DEPLOY pela metade
const SEAM_TOP = 20; // onde ela chega quando o masthead sai de cena
const SEAM_START = VB_H; // fora do quadro, antes da entrada
const WDTH_NARROW = 62;
const WDTH_WIDE = 112;

export const Hero = () => {
  const t = COPY[useLocale()];
  const sectionRef = useRef<HTMLElement>(null);
  const colophonRuleRef = useRef<HTMLDivElement>(null);
  const fieldTextRef = useRef<HTMLDivElement>(null);
  const aboveRef = useRef<SVGRectElement>(null);
  const belowRef = useRef<SVGRectElement>(null);
  const fieldRef = useRef<SVGRectElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);

  useGSAP(
    () => {
      const above = aboveRef.current;
      const below = belowRef.current;
      const field = fieldRef.current;
      if (!above || !below || !field) return;

      /* A costura é uma linha horizontal só. Acima dela o wordmark é tinta
         sobre papel; abaixo, papel sobre vermelho. Mover essa única linha
         é o que inverte as palavras — os dois clipes e o campo vermelho
         são recortados a partir dela, sempre juntos. */
      const setSeam = (y: number) => {
        above.setAttribute("height", String(y + 50));
        below.setAttribute("y", String(y));
        below.setAttribute("height", String(VB_H - y + 50));
        field.setAttribute("y", String(y));
        field.setAttribute("height", String(VB_H - y));
      };

      /* Enquanto a costura sobe, a palavra abre. Archivo é variável no eixo
         de largura e o textLength está travado na medida: quando a letra
         engorda, o entreletra se fecha na mesma proporção, e a linha fica
         alinhada nas duas margens do primeiro ao último quadro.
         É a tipografia que faz a animação, não uma máscara por cima dela.
         A largura vive numa variável por linha no <svg>: uma só escrita
         alcança as duas instâncias do wordmark, a de tinta e a de papel. */
      const setWidth = (i: number, w: number) =>
        svgRef.current?.style.setProperty(`--wd${i}`, String(w));

      if (prefersReducedMotion()) {
        setSeam(SEAM_REST);
        WORDS.forEach((_, i) => setWidth(i, WDTH_WIDE));
        gsap.set([colophonRuleRef.current, fieldTextRef.current], {
          opacity: 1,
          y: 0,
        });
        gsap.set(colophonRuleRef.current, { scaleX: 1 });
        return;
      }

      /* useGSAP roda antes da pintura, então o estado inicial estreito é
         aplicado sem piscar o estado final que veio do servidor. */
      setSeam(SEAM_START);
      WORDS.forEach((_, i) => setWidth(i, WDTH_NARROW));

      const seam = { y: SEAM_START };
      const tl = gsap.timeline({
        defaults: { ease: "expo.out" },
        onComplete: () => {
          /* Só depois que a entrada assenta a costura passa para o scroll.
             Antes disso as duas estariam escrevendo no mesmo rect. */
          ScrollTrigger.create({
            trigger: sectionRef.current,
            start: "top top",
            end: "bottom top",
            scrub: true,
            onUpdate: (self) => {
              setSeam(SEAM_REST - self.progress * (SEAM_REST - SEAM_TOP));
            },
          });
        },
      });

      // 1. a régua do colophon se abre
      tl.fromTo(
        colophonRuleRef.current,
        { scaleX: 0 },
        { scaleX: 1, duration: 0.9 },
        0
      );

      // 2. as três palavras abrem na medida, uma atrás da outra
      WORDS.forEach((_, i) => {
        const w = { v: WDTH_NARROW };
        tl.to(
          w,
          {
            v: WDTH_WIDE,
            duration: 1.5,
            onUpdate: () => setWidth(i, w.v),
          },
          0.25 + i * 0.13
        );
      });

      // 3. o chão vermelho sobe até a costura e inverte DEPLOY na passagem
      tl.to(
        seam,
        {
          y: SEAM_REST,
          duration: 1.2,
          onUpdate: () => setSeam(seam.y),
        },
        0.75
      );

      // 4. o texto assenta sobre o campo
      tl.fromTo(
        fieldTextRef.current,
        { opacity: 0, y: 18 },
        { opacity: 1, y: 0, duration: 0.8 },
        1.35
      );
    },
    { scope: sectionRef }
  );

  return (
    <section ref={sectionRef} className="relative">
      <div className="wrap">
        <div
          className="flex justify-between items-baseline flex-wrap relative"
          style={{
            gap: "var(--s3)",
            paddingTop: "var(--s4)",
            paddingBottom: "var(--s3)",
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
          <span className="meta dim">
            {t.role} · {t.place}
          </span>
          <div
            ref={colophonRuleRef}
            className="absolute left-0 right-0 bottom-0 origin-left"
            style={{ height: 1, background: "var(--ink)" }}
          />
        </div>
      </div>

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
          {/* O wordmark é definido UMA vez e instanciado duas. Duplicar os
              <text> no markup parece equivalente, mas com textLength +
              lengthAdjust as duas cópias podem resolver o entreletra em
              momentos diferentes do carregamento da fonte e sair
              desalinhadas — dá um fantasma na tela. Com <use> as duas
              instâncias são o mesmo elemento renderizado duas vezes. */}
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

          <clipPath id="masthead-above">
            <rect ref={aboveRef} x={CLIP_X} y="-50" width={CLIP_W} height={SEAM_REST + 50} />
          </clipPath>
          <clipPath id="masthead-below">
            <rect ref={belowRef} x={CLIP_X} y={SEAM_REST} width={CLIP_W} height={VB_H - SEAM_REST + 50} />
          </clipPath>
        </defs>

        <rect
          ref={fieldRef}
          x="0"
          y={SEAM_REST}
          width={VB_W}
          height={VB_H - SEAM_REST}
          fill="var(--red)"
        />

        {/* Tinta acima da costura, papel abaixo. Os clipes é que decidem
            o que se vê de cada instância. */}
        <g clipPath="url(#masthead-above)" fill="var(--ink)">
          <use href="#masthead-words" />
        </g>
        <g clipPath="url(#masthead-below)" fill="var(--paper)">
          <use href="#masthead-words" />
        </g>
      </svg>

      <div className="on-ink" style={{ background: "var(--red)", color: "var(--paper)" }}>
        <div className="wrap">
          <div
            ref={fieldTextRef}
            className="ed-grid items-start"
            style={{ paddingTop: "var(--s6)", paddingBottom: "var(--s8)" }}
          >
            <p className="masthead-tagline">{t.tagline}</p>
            <div className="masthead-index">
              <span className="meta" style={{ opacity: 0.85 }}>
                {t.indexLabel}
              </span>
              {t.index.map((item) => (
                <a key={item.href} href={item.href} className="masthead-index-link">
                  <span>{item.n}</span>
                  <span>{item.label}</span>
                  <span aria-hidden="true">→</span>
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
