import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";
import { siteConfig } from "@/config/site";

/* ── O cartão de compartilhamento ──────────────────────────────────────
   O que aparece no WhatsApp, no LinkedIn e no X é a primeira página do
   site que a pessoa vê — antes do site. Então ele não é um banner com o
   nome em cima de um gradiente: é o masthead, no mesmo sistema editorial
   da home. Papel, tinta, o filete do colophon e o campo vermelho no pé.

   O cartão anterior tinha ficado para trás do redesign: fundo escuro e os
   acentos azul/ciano/roxo que saíram do sistema quando a página virou
   papel e tinta. Compartilhar o link mostrava um site que não existe
   mais.
   -------------------------------------------------------------------- */

export const ogSize = { width: 1200, height: 630 };

const PAPER = "#F5F5F5";
const INK = "#1A1A1A";
const RED = "#F40035";
const INK_55 = "rgba(26, 26, 26, 0.55)";
const PAPER_65 = "rgba(245, 245, 245, 0.65)";

/* A margem da página em 1200px de largura: --margin é clamp(16px, 4vw,
   48px) e aqui bate no teto. A medida do cartão é a mesma que a do site
   nesta largura, então o wordmark justificado tem a mesma caixa. */
const MARGIN = 48;
const MEASURE = ogSize.width - MARGIN * 2;

/* As três faixas têm altura fixa, e não é preguiça: o corpo do wordmark é
   calculado a partir do espaço que sobra para ele (abaixo), então esse
   espaço precisa ser um número, não o resto de um layout que ainda vai
   acontecer. O pé cabe duas linhas de tagline; nenhuma das cinco páginas
   passa disso. */
const HEAD_H = 84;
const FOOT_H = 160;
/* A linha da stack e o filete que a separa do wordmark. Ela só existe nos
   cases: a home tem três palavras ocupando a caixa inteira, e nela o
   wordmark É o conteúdo. */
const STACK_H = 42;
/* O respiro do wordmark contra o filete e contra o campo vermelho. Sem
   ele as três linhas ocupam a caixa inteira e o pé do DEPLOY encosta no
   vermelho, que lê como corte, não como composição. */
const WORD_PAD = 22;
const wordHeight = (hasStack: boolean) =>
  ogSize.height - HEAD_H - FOOT_H - WORD_PAD * 2 - (hasStack ? STACK_H : 0);

/* O corpo não é escolhido, é calculado — mesma regra do masthead da home,
   por outro caminho. Lá o textLength trava a medida e o entreletra é a
   sobra; aqui o entreletra vem do space-between do flex, e o que eu
   preciso garantir é que a sobra nunca fique NEGATIVA (letras montadas
   umas sobre as outras) nem grande demais para a palavra ainda ler como
   palavra.

   0.95em por caractere é o passo que mantém isso: com a maiúscula do
   Archivo 900 medindo cerca de 0.70em, sobra um entreletra de ~0.25em em
   qualquer palavra, de FINANCE a REVOLUNA. O teto de altura entra quando
   são três linhas — aí a caixa é que manda, e o entreletra abre. */
const STEP = 0.95;
const LEADING = 0.9;

/* A maiúscula do Archivo 900 mede em torno disto, e é uma estimativa boa
   o bastante para saber se uma linha ainda cabe justificada. */
const CAP_EM = 0.7;

/* O piso da justificação. Uma linha curta demais para a medida não fica
   espacejada, fica DESMONTADA: "OPP" aberto em 1104px é O, P e P em três
   cantos, e ninguém lê uma palavra ali. Abaixo de 55% da medida a linha
   sai alinhada à esquerda com um entreletra fixo, que é o comportamento
   correto quando a palavra não tem corpo para preencher a coluna. */
const JUSTIFY_FLOOR = 0.55;

/* O Buffer do readFile pode ser uma fatia de um ArrayBuffer maior (o Node
   agrupa alocações pequenas), então passar `.buffer` direto entregaria ao
   Satori bytes que não são a fonte. A cópia pela fatia exata é o que
   sempre vale. */
const fontFile = async (name: string) => {
  const buf = await readFile(join(process.cwd(), "assets", "fonts", name));
  return buf.buffer.slice(
    buf.byteOffset,
    buf.byteOffset + buf.byteLength
  ) as ArrayBuffer;
};

/* Satori não enxerga as fontes que o next/font carregou no browser: o
   cartão é desenhado no servidor e precisa dos arquivos na mão. Ficam
   versionados em /assets para o build não depender do Google Fonts. */
let fontsPromise: Promise<
  { name: string; data: ArrayBuffer; weight: 400 | 500 | 900; style: "normal" }[]
> | null = null;

const loadFonts = () => {
  fontsPromise ??= Promise.all([
    fontFile("archivo-900.ttf"),
    fontFile("archivo-500.ttf"),
    fontFile("martian-mono-400.ttf"),
  ]).then(([black, medium, mono]) => [
    { name: "Archivo", data: black, weight: 900 as const, style: "normal" as const },
    { name: "Archivo", data: medium, weight: 500 as const, style: "normal" as const },
    { name: "Martian Mono", data: mono, weight: 400 as const, style: "normal" as const },
  ]);

  return fontsPromise;
};

type OgImageProps = {
  /* Uma palavra por linha, em caixa alta. O espaço é permitido e entra na
     conta como um caractere qualquer — "SEBRAE OPP" lê como duas palavras
     espacejadas, que é o comportamento certo em versalete solto. */
  lines: string[];
  tagline: string;
  /* A etiqueta do pé: "Portfolio" na home, o nome da seção nos cases. */
  kicker: string;
  /* O que o projeto é feito de, na linha de índice sob o wordmark. */
  stack?: string[];
};

/* O espaço tem que ser inquebrável: cada caractere é um filho do flex, e
   um espaço comum seria colapsado antes de virar um. */
const NBSP = " ";

export async function renderOgImage({
  lines,
  tagline,
  kicker,
  stack,
}: OgImageProps) {
  const longest = Math.max(...lines.map((line) => line.length));
  const fontSize = Math.min(
    MEASURE / (longest * STEP),
    wordHeight(Boolean(stack)) / lines.length / LEADING
  );

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          backgroundColor: PAPER,
          color: INK,
          fontFamily: "Archivo",
        }}
      >
        {/* O colophon: quem assina à esquerda, o que faz e de onde à
            direita, e o filete fechando — a mesma linha que abre a home. */}
        <div
          style={{
            height: HEAD_H,
            display: "flex",
            flexDirection: "column",
            justifyContent: "flex-end",
            padding: `0 ${MARGIN}px`,
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "baseline",
              justifyContent: "space-between",
              paddingBottom: 14,
            }}
          >
            <span style={{ fontSize: 24, fontWeight: 900, letterSpacing: "-0.02em" }}>
              {siteConfig.brand.ownerName}
            </span>
            <span
              style={{
                fontFamily: "Martian Mono",
                fontSize: 13,
                letterSpacing: "0.08em",
                color: INK_55,
              }}
            >
              SOFTWARE ENGINEER AND DESIGNER
            </span>
          </div>
          <div style={{ height: 1, backgroundColor: INK }} />
        </div>

        {/* O wordmark. Cada linha é uma caixa de medida fixa e as letras
            são empurradas para as duas bordas — é o justificado do
            masthead, feito com o que o Satori tem. */}
        <div
          style={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            padding: `${WORD_PAD}px ${MARGIN}px`,
          }}
        >
          <div
            style={{
              flex: 1,
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
            }}
          >
            {lines.map((line) => {
              const justified =
                line.length * CAP_EM * fontSize >= MEASURE * JUSTIFY_FLOOR;

              return (
                <div
                  key={line}
                  style={{
                    display: "flex",
                    justifyContent: justified ? "space-between" : "flex-start",
                    letterSpacing: justified ? 0 : "0.2em",
                    width: "100%",
                    height: fontSize * LEADING,
                    fontSize,
                    fontWeight: 900,
                    lineHeight: LEADING,
                  }}
                >
                  {[...line].map((char, i) => (
                    <span key={`${line}-${i}`}>{char === " " ? NBSP : char}</span>
                  ))}
                </div>
              );
            })}
          </div>

          {/* O segundo filete. Ele fecha o wordmark por baixo como o do
              colophon o abre por cima, e o que vai entre os dois é a peça. */}
          {stack ? (
            <div
              style={{
                height: STACK_H,
                display: "flex",
                flexDirection: "column",
                justifyContent: "flex-end",
              }}
            >
              <div style={{ height: 1, backgroundColor: INK, marginBottom: 13 }} />
              <div
                style={{
                  display: "flex",
                  fontFamily: "Martian Mono",
                  fontSize: 13,
                  letterSpacing: "0.08em",
                  color: INK_55,
                }}
              >
                {stack.map((item) => item.toUpperCase()).join("  \u00B7  ")}
              </div>
            </div>
          ) : null}
        </div>

        {/* O pé é o campo vermelho da home, sangrando nas três bordas: a
            tagline em papel e, embaixo, a etiqueta e o domínio. */}
        <div
          style={{
            height: FOOT_H,
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            backgroundColor: RED,
            color: PAPER,
            padding: `26px ${MARGIN}px 24px`,
          }}
        >
          <span style={{ fontSize: 23, fontWeight: 500, lineHeight: 1.3, maxWidth: 900 }}>
            {tagline}
          </span>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              fontFamily: "Martian Mono",
              fontSize: 13,
              letterSpacing: "0.08em",
              color: PAPER_65,
            }}
          >
            <span>{kicker.toUpperCase()}</span>
            <span>{new URL(siteConfig.url).host}</span>
          </div>
        </div>
      </div>
    ),
    { ...ogSize, fonts: await loadFonts() }
  );
}
