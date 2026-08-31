/* ── O bico chanfrado ──────────────────────────────────────────────────
   A geometria da caneta do site: dado um tamanho em pixels, devolve o
   contorno de cada traço.

   O traço de espessura constante que existia aqui antes era uma borda,
   não um gesto. O que uma caneta de verdade faz é variar a espessura com
   a DIREÇÃO — a ponta é um retângulo achatado segurado num ângulo fixo,
   e por isso o mesmo gesto sai cheio na horizontal e fino nas viradas.
   Um parâmetro só (o ângulo do bico) explica isso, e é ele que faz os
   seis traços do site lerem como a mesma mão.

   A consequência é que um traço não é mais uma curva com `stroke-width`:
   é um contorno PREENCHIDO, gerado a partir de uma linha de centro mais
   um perfil de largura. E como o contorno é gerado no tamanho medido da
   palavra, some junto o `non-scaling-stroke` — e com ele a trinca de
   remendos que ele obrigava: medir o caminho no espaço da tela, o vão
   triplo do tracejado e a folga que escondia a ponta arredondada. */

const TAU = Math.PI * 2;
const rad = (deg: number) => (deg * Math.PI) / 180;

export type Nib = { min: number; max: number; angle: number };
export type Taper = { head?: number; tail?: number; headP?: number; tailP?: number };

/* O traço desenhado: o contorno que se pinta, a linha de centro que a
   animação percorre e a espessura que a máscara precisa ter para cobrir
   o contorno inteiro. */
export type Stroke = { d: string; spine: string; cover: number };

/* Meia-largura em função da direção do gesto. |sin| dá o máximo quando o
   traço corre perpendicular ao bico e o mínimo quando corre ao longo
   dele — que é literalmente o que uma ponta chata faz no papel. */
function nib(dir: number, { min, max, angle }: Nib) {
  return min + (max - min) * Math.abs(Math.sin(dir - angle));
}

/* A caneta encosta e levanta. Sem isso as pontas ficam com um corte reto
   de software; `p` acima de 1 adia a afinada (ponta agulha), abaixo de 1
   antecipa. */
const ease = (u: number, p: number) => (u <= 0 ? 0 : u >= 1 ? 1 : Math.pow(u, p));

function taper(t: number, { head = 0, tail = 0, headP = 1, tailP = 1 }: Taper = {}) {
  const a = head > 0 ? ease(t / head, headP) : 1;
  const b = tail > 0 ? ease((1 - t) / tail, tailP) : 1;
  return Math.min(a, b);
}

const round = (n: number) => Math.round(n * 100) / 100;

/* A caneta que se troca conforme o tamanho do que se marca.

   Espessura fixa em pixels é a verdade de UMA caneta, e foi o que
   consertou a marcação miúda: o laço em volta de uma palavra de corpo
   sai com o mesmo traço do laço em volta de outra. Mas ninguém circula
   um título de 120px com a mesma caneta que usa num parágrafo — troca
   por um marcador. Levado ao pé da letra, o modelo dava um fio de 2px em
   volta de um laço de 880px, que lê como risco perdido e não como marca.

   Então o peso cresce, mas MUITO menos que o tamanho: expoente 0,45, ou
   seja, marcação cinco vezes maior ganha só o dobro de tinta. E nunca
   encolhe abaixo de 1 — a calibragem miúda é o chão, não o meio da
   escala. `ref` é a altura em que cada traço foi calibrado, que é a
   altura da própria referência que o originou. */
function weight(h: number, ref: number) {
  return Math.min(3.2, Math.max(1, Math.pow(h / ref, 0.45)));
}


type Point = { x: number; y: number };

/* Contorno fechado a partir da linha de centro: vai por um lado e volta
   pelo outro. Com ~180 amostras o polígono é liso abaixo do pixel, e
   sair em retas evita o custo — e os nós — de ajustar béziers a uma
   curva que já está amostrada. */
function outline(
  center: (t: number) => Point,
  halfWidth: (t: number, dir: number) => number,
  steps = 180
): Stroke {
  const pts: { x: number; y: number; nx: number; ny: number }[] = [];
  for (let i = 0; i <= steps; i++) {
    const t = i / steps;
    const p = center(t);
    const d = 1e-4;
    const a = center(Math.max(0, t - d));
    const b = center(Math.min(1, t + d));
    const dir = Math.atan2(b.y - a.y, b.x - a.x);
    const hw = halfWidth(t, dir);
    pts.push({ x: p.x, y: p.y, nx: -Math.sin(dir) * hw, ny: Math.cos(dir) * hw });
  }

  const left = pts.map((p) => `${round(p.x + p.nx)} ${round(p.y + p.ny)}`);
  const right = pts.map((p) => `${round(p.x - p.nx)} ${round(p.y - p.ny)}`).reverse();

  return {
    d: `M${left[0]}L${left.slice(1).join("L")}L${right.join("L")}Z`,
    /* A linha de centro não aparece: é ela que a animação percorre,
       escondendo o preenchimento atrás de uma máscara que anda. Um
       contorno preenchido não tem comprimento para tracejar — quem tem
       comprimento é o gesto, e o gesto é a espinha. */
    spine: pts.map((p, i) => `${i ? "L" : "M"}${round(p.x)} ${round(p.y)}`).join(""),
    cover: Math.max(...pts.map((p) => Math.hypot(p.nx, p.ny))) * 2 + 1,
  };
}

/* ── O laço ────────────────────────────────────────────────────────────
   Uma volta e um pouco mais. Quem circula uma palavra à mão nunca fecha
   a curva em cima do próprio começo: o raio cresce ao longo do caminho,
   então a passada final corre por FORA da inicial em vez de repintá-la.

   E no fim a mão ESCAPA. Sem esse rabo o laço volta a ser uma elipse,
   obediente, parando exatamente sobre a curva; é a fuga, mais do que a
   espessura, que se lê como gesto. */
type LoopSpec = {
  fill: number;
  start: number;
  turns: number;
  growth: number;
  tilt: number;
  exit: { at: number; out: number };
  nib: Nib;
  taper: Taper;
};

/* O laço é uma ELIPSE, não uma volta qualquer: ele é achatado porque a
   mão corre na direção da leitura e só vira nas pontas. Deixado solto na
   caixa, um trecho de duas linhas — ou uma palavra curta — dá uma caixa
   quase quadrada, e o traço sai redondo: deixa de ser marca de revisor e
   vira um círculo desenhado em volta de alguma coisa.

   Então o raio horizontal tem um PISO em função do vertical. Quando a
   caixa é alta demais o laço ALARGA em vez de achatar — achatar seria
   deixar a última linha de fora, e um laço que não abraça o que marcou
   não marcou nada. Ele vaza para os lados, que é exatamente o que a mão
   faz no papel e o que o resto da marcação já assume. */
const FLAT = 1.75;

function drawLoop(w: number, h: number, o: LoopSpec): Stroke[] {
  const cx = w / 2;
  const cy = h / 2;
  const ry = (h / 2) * o.fill;
  const rx = Math.max((w / 2) * o.fill, ry * FLAT);
  const tilt = rad(o.tilt);
  const ct = Math.cos(tilt);
  const st = Math.sin(tilt);
  /* Nasce menor e termina maior; centrado na média, o laço fica no meio
     da caixa em vez de escorregar para um canto. */
  const mid = 1 + o.growth / 2;

  const center = (t: number) => {
    const a = rad(o.start) + t * o.turns * TAU;
    const u = t > o.exit.at ? (t - o.exit.at) / (1 - o.exit.at) : 0;
    const g = (1 + o.growth * t + o.exit.out * u * u) / mid;
    const x = Math.cos(a) * rx * g;
    const y = Math.sin(a) * ry * g;
    return { x: cx + x * ct - y * st, y: cy + x * st + y * ct };
  };

  const ink = weight(h, 62);
  return [outline(center, (t, dir) => nib(dir, o.nib) * ink * taper(t, o.taper))];
}

/* ── A sublinha ────────────────────────────────────────────────────────
   Um traço quase reto: só o desvio mínimo que impede de virar régua. */
type StrokeSpec = {
  y: number;
  x0?: number;
  x1?: number;
  bow: number;
  lift: number;
  nib: Nib;
  taper: Taper;
};

function drawStroke(w: number, h: number, o: StrokeSpec): Stroke {
  const y0 = h * o.y;
  const x0 = w * (o.x0 ?? 0);
  const x1 = w * (o.x1 ?? 1);

  const center = (t: number) => ({
    x: x0 + (x1 - x0) * t,
    y: y0 + Math.sin(t * Math.PI) * h * o.bow - t * t * h * o.lift,
  });

  const ink = weight(h, 14);
  return outline(center, (t, dir) => nib(dir, o.nib) * ink * taper(t, o.taper), 120);
}

/* Um traço entre dois pontos. É o tijolo de qualquer gesto que não corra
   na horizontal — as pernas de uma seta, os dois riscos de um visto. */
function drawLine(
  a: Point,
  b: Point,
  o: { bend?: number; nib: Nib; taper: Taper }
): Stroke {
  const dx = b.x - a.x;
  const dy = b.y - a.y;
  const center = (t: number) => {
    const bend = Math.sin(t * Math.PI) * (o.bend ?? 0);
    return { x: a.x + dx * t - dy * bend, y: a.y + dy * t + dx * bend };
  };
  return outline(center, (t, dir) => nib(dir, o.nib) * taper(t, o.taper), 80);
}

/* ── As variações ──────────────────────────────────────────────────────
   Três laços e duas sublinhas, para poder variar sem trocar de mão. O
   que separa os laços é o CAMINHO, não o peso: eles têm a mesma
   espessura de propósito, para que alternar entre eles não faça um
   parecer mais importante que o outro.

   A espessura é em PIXELS, e não numa fração da caixa. Uma caneta de
   verdade tem a ponta que tem: o laço em volta de uma palavra pequena e
   o laço em volta de um título saem com o mesmo traço, e é justamente
   isso que faz os dois parecerem a mesma mão. Amarrar a espessura à
   altura da caixa dava o contrário — quanto menor a marcação, mais
   fininha ela ficava, até virar fiapo. */
export type LoopVariant = "a" | "b" | "c";
export type UnderlineVariant = "a" | "b";

const LOOPS: Record<LoopVariant, LoopSpec> = {
  /* Chato e largo, as duas passadas abrindo numa lente à esquerda. */
  a: {
    fill: 0.88, start: 158, turns: 1.14, growth: 0.17, tilt: -3,
    exit: { at: 0.9, out: 0.1 },
    nib: { min: 0.63, max: 1.16, angle: rad(96) },
    taper: { head: 0.05, tail: 0.13, tailP: 0.7 },
  },
  /* Mais redondo, com a saída escapando por baixo à esquerda. */
  b: {
    fill: 0.82, start: 94, turns: 1.16, growth: 0.13, tilt: -4,
    exit: { at: 0.84, out: 0.22 },
    nib: { min: 0.72, max: 1.31, angle: rad(80) },
    taper: { head: 0.07, tail: 0.16, tailP: 0.85 },
  },
  /* Rápido, com o rabo comprido cruzando a própria volta. */
  c: {
    fill: 0.88, start: 48, turns: 1.24, growth: 0.05, tilt: 2,
    exit: { at: 0.8, out: 0.34 },
    nib: { min: 0.63, max: 1.01, angle: rad(100) },
    taper: { head: 0.04, tail: 0.2, tailP: 0.8 },
  },
};

const UNDERLINES: Record<UnderlineVariant, StrokeSpec[]> = {
  /* Uma passada em cunha: encosta com peso à esquerda e sai afinando num
     bico. Direcional — o olho anda com ela. */
  a: [
    {
      y: 0.44, bow: 0.045, lift: 0.12,
      nib: { min: 0.67, max: 1.3, angle: rad(84) },
      taper: { head: 0.02, tail: 0.5, headP: 0.4, tailP: 0.9 },
    },
  ],
  /* Duas passadas rentes que viram uma barra. Uma passada só é uma
     borda; duas são uma marcação. */
  b: [
    {
      y: 0.36, x1: 0.99, bow: 0.035, lift: 0.035,
      nib: { min: 0.46, max: 0.82, angle: rad(86) },
      taper: { head: 0.06, tail: 0.3, headP: 0.5, tailP: 1.1 },
    },
    {
      y: 0.6, x0: 0.015, bow: 0.028, lift: 0.02,
      nib: { min: 0.41, max: 0.72, angle: rad(86) },
      taper: { head: 0.09, tail: 0.34, headP: 0.5, tailP: 1.1 },
    },
  ],
};

export const loop = (w: number, h: number, variant: LoopVariant = "a") =>
  drawLoop(w, h, LOOPS[variant]);

export const underline = (w: number, h: number, variant: UnderlineVariant = "b") =>
  UNDERLINES[variant].map((spec) => drawStroke(w, h, spec));

/* ── A seta ────────────────────────────────────────────────────────────
   Três passadas de caneta, e não um ícone: o cabo desce, e as duas
   pernas descem depois dele. A ponta é onde as três se encontram, então
   é lá que a tinta se acumula — as pernas entram finas e saem cheias, o
   contrário do cabo.

   Ela é desenhada apontando para BAIXO, e quem escolhe a direção
   continua sendo o CSS que a gira. Mais encorpada que o laço de
   propósito: a seta é um sinal, não uma marcação, e um sinal que some
   vira ruído. */
export const ARROW_BOX = { w: 22, h: 30 };

export function arrow(): Stroke[] {
  const { w, h } = ARROW_BOX;
  const cx = w / 2;
  const pad = 1.8;
  const head = h * 0.42;
  const tip = h - pad;
  const base = tip - head;
  const span = head * 0.72;

  const cabo = drawLine(
    { x: cx, y: pad },
    { x: cx, y: tip - head * 0.12 },
    {
      bend: 0.02,
      nib: { min: 1.05, max: 1.35, angle: rad(8) },
      taper: { head: 0.14, tail: 0.06, headP: 0.5 },
    }
  );

  const perna = (dir: number) =>
    drawLine(
      { x: cx + span * dir, y: base },
      { x: cx, y: tip },
      {
        bend: 0.03 * dir,
        nib: { min: 0.9, max: 1.2, angle: rad(8) },
        /* Entra fina e sai cheia: o peso cresce até o encontro. */
        taper: { head: 0.34, tail: 0.02, headP: 0.85 },
      }
    );

  return [cabo, perna(-1), perna(1)];
}

/* ── O visto ───────────────────────────────────────────────────────────
   Desce curto, sobe longo e passa do fim, como quem confere uma linha e
   segue para a próxima. Duas passadas com o mesmo bico das outras, pelo
   mesmo motivo de sempre: é uma mão só. */
export const CHECK_BOX = { w: 26, h: 26 };

export function check(): Stroke[] {
  const pen = { min: 1, max: 1.35, angle: rad(30) };
  return [
    drawLine({ x: 3, y: 13 }, { x: 9.5, y: 21.5 }, {
      bend: 0.05,
      nib: pen,
      taper: { head: 0.22, tail: 0.04, headP: 0.6 },
    }),
    drawLine({ x: 9.5, y: 21.5 }, { x: 24, y: 2.5 }, {
      bend: 0.035,
      nib: pen,
      taper: { head: 0.04, tail: 0.3, tailP: 0.9 },
    }),
  ];
}
