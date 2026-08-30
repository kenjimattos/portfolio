"use client";

/* O case como editorial de problema.
 *
 * A espinha antiga contava o projeto inteiro (hero → showcase → results →
 * story → design language → features → evidence). Esta conta UM problema,
 * com dois ou três nós de decisão, e tem orçamento de leitura: o case não
 * compete com um artigo, compete com a próxima aba do recrutador.
 *
 * O componente que carrega a tese é o CaseDecision, com dois painéis lado
 * a lado: a escolha de design e a de implementação para o MESMO problema.
 * Duas regras estão embutidas nos tipos e não são negociáveis:
 *
 *   - `cost` é obrigatório. Se uma decisão não tem custo declarado, ou não
 *     era decisão, ou está sendo vendida.
 *   - `authorship: "assisted"` existe. Onde a implementação profunda foi
 *     escrita com IA, o selo diz. A decisão continua sendo sua.
 *
 * As recriações interativas não saem — mudam de lugar. Deixam de ser
 * vitrine no topo e passam a ser evidência DENTRO da decisão que provam.
 */

import { CSSProperties, ReactNode, useRef } from "react";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { prefersReducedMotion } from "@/lib/motion";
import { localeHref, useLocale } from "@/lib/i18n";
import { LangToggle } from "@/components/lang-toggle";
import { Footer } from "@/components/footer";
import { siteConfig } from "@/config/site";
import { Marked } from "@/components/marks";

gsap.registerPlugin(ScrollTrigger, useGSAP);

/* 56px de barra + o filete de 1px. */
const HEADER_HEIGHT = 57;

const CHROME = {
  en: { back: "← Work", next: "Next", assisted: "AI-assisted implementation" },
  pt: { back: "← Projetos", next: "Próximo", assisted: "Implementação assistida por IA" },
} as const;

/* --------------------------------- chrome --------------------------------- */

export function CaseShell({
  nextProject,
  children,
}: {
  nextProject: { href: string; label: string };
  children: ReactNode;
}) {
  const rootRef = useRef<HTMLDivElement>(null);
  const locale = useLocale();
  const chrome = CHROME[locale];
  const home = localeHref(locale, "/");

  useGSAP(
    () => {
      const root = rootRef.current;
      if (!root) return;

      const reveals = root.querySelectorAll<HTMLElement>(".case-reveal");
      const seams = root.querySelectorAll<HTMLElement>(".case-seam");
      const turn = root.querySelector<HTMLElement>("[data-case-turn]");
      const decisions = root.querySelectorAll<HTMLElement>(".case-decision");

      /* A trilha lateral não é decoração: é o que diz quantas decisões
         faltam. Ela funciona sem nenhuma animação, então liga primeiro,
         antes de qualquer verificação de movimento. */
      const railLinks = new Map<string, HTMLElement>();
      root.querySelectorAll<HTMLElement>("[data-rail]").forEach((link) => {
        const id = link.dataset.rail;
        if (id) railLinks.set(id, link);
      });

      decisions.forEach((decision) => {
        const link = railLinks.get(decision.id);
        if (!link) return;
        ScrollTrigger.create({
          trigger: decision,
          start: "top 45%",
          end: "bottom 45%",
          onToggle: ({ isActive }) => {
            if (isActive) link.setAttribute("data-active", "");
            else link.removeAttribute("data-active");
          },
        });
      });

      /* O topo da tela encosta no filete do kicker. É medido, não
         chutado: o kicker muda de altura com o idioma e com a quebra, e
         um valor fixo deixaria a tela cruzando o filete ou flutuando
         abaixo dele. Vale também com movimento reduzido. */
      const stageEl = root.querySelector<HTMLElement>(".case-hero-stage");
      const typeEl = root.querySelector<HTMLElement>(".case-hero-type");
      const kickerEl = root.querySelector<HTMLElement>(".case-hero-type .case-kicker");
      const placeMedia = () => {
        if (!stageEl || !typeEl || !kickerEl) return;
        const bottom = typeEl.offsetTop + kickerEl.offsetTop + kickerEl.offsetHeight;
        stageEl.style.setProperty("--media-top", `${Math.round(bottom)}px`);
      };
      placeMedia();

      /* Onde a fronteira para vem do CSS: a composição é dele, e o JS só
         precisa saber para onde animar. */
      const splitEnd = stageEl
        ? getComputedStyle(stageEl).getPropertyValue("--split-end").trim() || "44vw"
        : "44vw";

      /* Com movimento reduzido o hero não perde a composição, perde o
         movimento: a fronteira já nasce no lugar final. */
      if (prefersReducedMotion()) {
        if (stageEl && window.innerWidth >= 900) {
          stageEl.style.setProperty("--split", splitEnd);
        }
        return;
      }

      /* A virada da manchete: o problema está em tinta e a resolução chega
         em vermelho conforme a página desce. É rolagem, não tempo — a
         mesma gramática do masthead da home, sem o pin, porque aqui o
         visitante veio ler e não pode ficar preso. */
      const stage = stageEl;

      if (turn && stage) {
        /* A página fica presa até a virada terminar. Duas condições para
           prender: espaço (um palco mais alto que a viewport ficaria com o
           rodapé cortado durante o pin) e largura (no telefone o palco
           ocupa quase a tela inteira e prender vira armadilha). Sem elas a
           virada acontece assim mesmo, só sem segurar a página. */
        const fits = stage.offsetHeight + HEADER_HEIGHT + 24 < window.innerHeight;
        const canPin = fits && window.innerWidth >= 900;

        const subEl = root.querySelector<HTMLElement>(".case-sub");

        /* Uma fronteira só governa o hero inteiro: onde o campo escuro
           começa, onde a manchete troca de cor e quanto da tela já está
           descoberto. Por isso é uma variável na raiz do palco, e não
           três animações tentando concordar entre si. */
        gsap.set(turn, { "--head-clip": "100%", "--turn-clip": "100%", "--split": "100vw" });
        if (subEl) gsap.set(subEl, { opacity: 0 });

        const act = gsap.timeline({
          scrollTrigger: {
            /* Amarrado ao topo da página, e não à entrada do elemento na
               viewport: a manchete já está visível quando o visitante
               chega, então um gatilho de entrada nasceria concluído e a
               virada nunca aconteceria. */
            trigger: stage,
            start: `top ${HEADER_HEIGHT}px`,
            /* O quanto a página fica presa antes de voltar a rolar. São
               dois tempos dentro deste trecho (a manchete, depois a
               resposta), então ele precisa de mais fôlego do que uma
               animação só: com pouco curso, os dois se atropelam e a
               página escapa antes de a segunda metade ser lida. */
            end: "+=90%",
            pin: canPin,
            pinSpacing: canPin,
            anticipatePin: canPin ? 1 : 0,
            scrub: 0.4,
          },
        });

        /* Dois tempos, não um. Primeiro a página escreve o problema: a
           manchete entra pelo mesmo corte horizontal da virada, e o texto
           de apoio chega no fim dela. Só depois vem a resposta — a virada
           em vermelho e, junto com ela, o campo escuro avançando da borda
           com o produto dentro. Separar os tempos é o que faz a segunda
           metade ser uma resposta, e não mais um movimento acontecendo. */
        act.to(turn, { "--head-clip": "0%", ease: "none", duration: 0.45 }, 0);
        if (subEl) act.to(subEl, { opacity: 1, ease: "none", duration: 0.12 }, 0.36);
        act.to(turn, { "--turn-clip": "0%", ease: "none", duration: 0.5 }, 0.5);
        act.to(turn, { "--split": splitEnd, ease: "none", duration: 0.5 }, 0.5);
      }

      /* A costura entre os dois painéis se desenha de cima para baixo: ela
         é a divisão design/código, então é a única linha da página que
         merece ser vista acontecendo. */
      seams.forEach((seam) => {
        gsap.fromTo(
          seam,
          { scaleY: 0 },
          {
            scaleY: 1,
            duration: 0.8,
            ease: "power3.out",
            scrollTrigger: { trigger: seam, start: "top 82%", once: true },
          }
        );
      });

      gsap.set(reveals, { opacity: 0, y: 24 });
      reveals.forEach((el) => {
        gsap.to(el, {
          opacity: 1,
          y: 0,
          duration: 0.7,
          ease: "power3.out",
          scrollTrigger: { trigger: el, start: "top 88%", once: true },
        });
      });

      /* As recriações se redimensionam sozinhas depois de montar
         (ScaleBox), o que muda a altura do documento inteiro. Sem
         recalcular, as seções do fim nunca disparam. */
      let raf = 0;
      const ro = new ResizeObserver(() => {
        cancelAnimationFrame(raf);
        raf = requestAnimationFrame(() => {
          placeMedia();
          ScrollTrigger.refresh();
        });
      });
      ro.observe(document.body);

      return () => {
        cancelAnimationFrame(raf);
        ro.disconnect();
      };
    },
    { scope: rootRef }
  );

  return (
    <div ref={rootRef}>
      <header
        className="sticky top-0 z-50"
        style={{ background: "var(--paper)", borderBottom: "1px solid var(--ink)" }}
      >
        <div className="wrap flex items-center justify-between" style={{ height: 56 }}>
          <Link
            href={home}
            className="transition-colors hover:text-red"
            style={{
              fontWeight: 900,
              fontSize: 20,
              letterSpacing: "-0.04em",
              fontVariationSettings: '"wdth" 118',
              transitionDuration: "90ms",
            }}
          >
            {siteConfig.brand.logoText}
          </Link>

          <Link
            href={localeHref(locale, "/#work")}
            className="meta transition-colors hover:text-[var(--violet)]"
            style={{ transitionDuration: "90ms" }}
          >
            {chrome.back}
          </Link>

          <LangToggle />
        </div>
      </header>

      {children}

      <Link className="case-next" href={localeHref(locale, nextProject.href)}>
        <div className="wrap">
          <span className="meta dimmer">{chrome.next}</span>
          <div className="t" style={{ marginTop: 6 }}>
            <span>{nextProject.label}</span>
            <span className="arrow">→</span>
          </div>
        </div>
      </Link>

      <Footer />
    </div>
  );
}

/* ---------------------------------- hero ---------------------------------- */

export function CaseHero({
  kicker,
  headline,
  turn,
  sub,
  media,
  mediaWidth = 1280,
  mediaTag,
  role,
  children,
}: {
  kicker: [string, string];
  headline: string;
  turn: string;
  sub: string;
  /* O produto rodando, não uma foto dele. Entra numa laje que sangra pela
     borda direita da página e corta o que não couber: a tela não é uma
     miniatura emoldurada, é uma janela para dentro do sistema. */
  media?: ReactNode;
  /* Largura de projeto do conteúdo — ele é renderizado nessa medida e
     reduzido por --slab-scale, então a densidade é a real e o corte é
     honesto, em vez de espremer a tela inteira até virar ruído. */
  mediaWidth?: number;
  mediaTag?: string;
  role: { label: string; text: string; note?: string };
  children?: ReactNode;
}) {
  /* A manchete é escrita duas vezes, com o mesmo texto e a mesma quebra:
     a de baixo em tinta sobre o papel, a de cima em papel, recortada
     exatamente na fronteira do campo escuro. É o que faz uma linha só de
     texto mudar de cor no meio da palavra quando o campo passa por baixo
     dela. A virada continua vermelha nas duas, então ela atravessa a
     fronteira sem costura aparente. */
  const headlineLines = (
    <>
      {headline}{" "}
      <span className="case-turn">{turn}</span>
    </>
  );

  return (
    <section>
      {/* O palco. Ele é o campo inteiro, da borda esquerda à direita: é o
          que precisa caber na viewport enquanto a página fica presa, e é
          o que a fronteira `--split` divide em papel e tinta. */}
      <div className="case-hero-stage" data-case-turn>
        <div className="case-hero-dark" aria-hidden="true" />

        {media ? (
          <div className="case-hero-media" data-case-media>
            <div
              className="case-hero-media-inner"
              data-case-media-inner
              style={{ width: mediaWidth } as CSSProperties}
            >
              {media}
            </div>
            {mediaTag ? <span className="meta case-hero-media-tag">{mediaTag}</span> : null}
          </div>
        ) : null}

        <div className="wrap case-hero-type">
          <div className="case-kicker">
            <span className="meta">{kicker[0]}</span>
            <span className="meta dim">{kicker[1]}</span>
          </div>

          <div className="case-headline-stack">
            <h1 className="case-headline">{headlineLines}</h1>
            <h1 className="case-headline case-headline-over" aria-hidden="true">
              {headlineLines}
            </h1>
          </div>

          <p className="case-sub">{sub}</p>
        </div>
      </div>

      <div className="wrap">
        <div className="case-role">
          <div className="meta dimmer">{role.label}</div>
          <p>{role.text}</p>
          {role.note ? <p className="dim">{role.note}</p> : null}
        </div>

        {children}
      </div>
    </section>
  );
}

/* ------------------------------ tension label ------------------------------ */

export type Tension = { a: string; b: string };

function TensionText({ tension }: { tension: Tension }) {
  return (
    <>
      {tension.a} <span className="vs">vs.</span> {tension.b}
    </>
  );
}

export function CaseIndex({
  label,
  items,
}: {
  label: string;
  items: { id: string; tension: Tension }[];
}) {
  return (
    <nav className="case-index" aria-label={label}>
      {items.map((item, i) => (
        <a key={item.id} href={`#${item.id}`}>
          <span className="meta">{String(i + 1).padStart(2, "0")}</span>
          <span className="t">
            <TensionText tension={item.tension} />
          </span>
        </a>
      ))}
    </nav>
  );
}

/* ------------------------------- constraints ------------------------------- */

export function CaseConstraints({ rows }: { rows: { label: string; text: string }[] }) {
  return (
    <section className="wrap case-reveal">
      <div className="case-constraints">
        {rows.map((row) => (
          <div className="row" key={row.label}>
            <div className="meta">{row.label}</div>
            <p>{row.text}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

/* --------------------------------- section --------------------------------- */

export function CaseSection({
  id,
  heading,
  note,
  children,
}: {
  id?: string;
  heading: string;
  note?: string;
  children: ReactNode;
}) {
  return (
    <section id={id} className="wrap" style={{ marginTop: "var(--s12)" }}>
      <h2 style={{ fontSize: "clamp(34px, 5.4vw, 74px)" }}>{heading}</h2>
      {note ? (
        <p className="meta dim" style={{ marginTop: "var(--s2)", maxWidth: "64ch" }}>
          {note}
        </p>
      ) : null}
      {children}
    </section>
  );
}

/* -------------------------------- decisions -------------------------------- */

export function CaseDecisions({
  railLabel,
  items,
  children,
}: {
  railLabel: string;
  items: { id: string }[];
  children: ReactNode;
}) {
  return (
    <div className="case-decisions" style={{ marginTop: "var(--s6)" }}>
      <nav className="case-rail" aria-label={railLabel}>
        <ol>
          {items.map((item, i) => (
            <li key={item.id}>
              <a href={`#${item.id}`} data-rail={item.id}>
                <span className="meta">{String(i + 1).padStart(2, "0")}</span>
                <span className="tick" aria-hidden="true" />
              </a>
            </li>
          ))}
        </ol>
      </nav>
      <div>{children}</div>
    </div>
  );
}

export type CasePanel = {
  label: string;
  chose: string;
  why?: string;
  authorship?: "own" | "assisted";
};

export function CaseDecision({
  id,
  number,
  tension,
  design,
  code,
  cost,
  costLabel,
  children,
}: {
  id: string;
  number: string;
  tension: Tension;
  design: CasePanel;
  code: CasePanel;
  cost: string;
  costLabel: string;
  children?: ReactNode;
}) {
  const assisted = CHROME[useLocale()].assisted;

  const panel = (p: CasePanel) => (
    <div className="case-panel">
      <div className="meta dimmer">{p.label}</div>
      <p className="chose">{p.chose}</p>
      {p.why ? <p className="why">{p.why}</p> : null}
      {p.authorship === "assisted" ? <span className="case-assisted">{assisted}</span> : null}
    </div>
  );

  return (
    <article className="case-decision" id={id}>
      <div className="case-dec-head">
        <span className="case-dec-n">{number}</span>
        <h3 className="case-dec-t">
          <TensionText tension={tension} />
        </h3>
      </div>

      <div className="case-panels">
        <span className="case-seam" aria-hidden="true" />
        {panel(design)}
        {panel(code)}
      </div>

      {children}

      <div className="case-cost on-ink">
        <div className="meta dim">{costLabel}</div>
        <p>{cost}</p>
      </div>
    </article>
  );
}

export function CaseProof({ caption, children }: { caption: string; children: ReactNode }) {
  return (
    <figure className="case-proof case-reveal">
      {children}
      <figcaption className="meta dim">{caption}</figcaption>
    </figure>
  );
}

export function CaseFrontier({ label, text }: { label: string; text: string }) {
  return (
    <p className="case-frontier">
      <strong>{label}</strong> {text}
    </p>
  );
}

/* --------------------------------- outcome --------------------------------- */

export function CaseOutcome({
  id,
  heading,
  measures,
  gaps,
}: {
  id?: string;
  heading: string;
  /* `mark` circula UMA medida à mão. É a mesma caneta da home, e a
     regra é a mesma: marca-se o número de que o leitor duvidaria. */
  measures: { value: string; label: string; mark?: boolean }[];
  gaps: { label: string; items: string[] };
}) {
  return (
    <CaseSection id={id} heading={heading}>
      <div className="ed-grid case-measures case-reveal" style={{ marginTop: "var(--s6)" }}>
        {measures.map((m) => (
          <div className="case-measure" key={m.label}>
            <div className="n">
              {m.mark ? <Marked kind="loop">{m.value}</Marked> : m.value}
            </div>
            <div className="t">{m.label}</div>
          </div>
        ))}
      </div>

      <div className="case-gaps case-reveal">
        <div className="meta">{gaps.label}</div>
        <ul>
          {gaps.items.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </div>
    </CaseSection>
  );
}

/* -------------------------------- evidence -------------------------------- */

export type EvidenceItem =
  | { kind: "link"; label: string; href: string; note: string }
  | { kind: "fact"; label: string; note: string };

export function CaseEvidence({
  id,
  heading,
  items,
}: {
  id?: string;
  heading: string;
  items: EvidenceItem[];
}) {
  return (
    <CaseSection id={id} heading={heading}>
      <div className="case-evidence case-reveal" style={{ marginTop: "var(--s6)" }}>
        {items.map((item) =>
          item.kind === "link" ? (
            <a
              key={item.label}
              href={item.href}
              target={item.href.startsWith("http") ? "_blank" : undefined}
              rel={item.href.startsWith("http") ? "noopener noreferrer" : undefined}
            >
              <span>{item.label}</span>
              <span className="meta dimmer">{item.note}</span>
            </a>
          ) : (
            <div className="row" key={item.label}>
              <span>{item.label}</span>
              <span className="meta dimmer">{item.note}</span>
            </div>
          )
        )}
      </div>
    </CaseSection>
  );
}

/* ----------------------------------- cta ----------------------------------- */

export function CaseCTA({
  label,
  heading,
  invite,
  action,
  email,
}: {
  label: string;
  heading: string;
  invite: string;
  action: string;
  email: string;
}) {
  const locale = useLocale();
  return (
    <section id="case-cta" className="case-cta on-ink">
      <div className="wrap">
        <div className="meta" style={{ opacity: 0.85 }}>
          {label}
        </div>
        <h2 style={{ marginTop: "var(--s3)" }}>{heading}</h2>
        <p className="invite">{invite}</p>
        <div className="case-cta-actions">
          <Link className="btn-fill" href={localeHref(locale, "/#contact")}>
            {action} <span aria-hidden="true">↗</span>
          </Link>
          <a className="btn-ghost" href={`mailto:${email}`}>
            {email}
          </a>
        </div>
      </div>
    </section>
  );
}
