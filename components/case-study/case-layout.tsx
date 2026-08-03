"use client";

// Composable case-study layout — the structure born in the Houston redesign.
// CaseLayout owns the chrome (header/footer), the accent CSS variables and
// all scroll animations; section components compose freely as children.
// Legacy cases still use case-study-template.tsx until they migrate.

import { CSSProperties, ReactNode, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { ArrowLeft, ArrowUp, ExternalLink, MousePointerClick } from "lucide-react";
import { prefersReducedMotion } from "@/lib/motion";
import { localeHref, useLocale } from "@/lib/i18n";
import { LangToggle } from "@/components/lang-toggle";

gsap.registerPlugin(ScrollTrigger, useGSAP);

const CHROME_COPY = {
  en: { back: "Back", top: "Top", backTo: "Back to", home: "Home", next: "Next Project" },
  pt: { back: "Voltar", top: "Topo", backTo: "Voltar para", home: "Início", next: "Próximo projeto" },
} as const;

// Locale-aware defaults for section labels; explicit props still override.
const SECTION_DEFAULTS = {
  en: {
    results: "Results",
    role: "My Role",
    design: "Design language",
    contact: "Contact",
    cta: "Get in touch",
  },
  pt: {
    results: "Resultados",
    role: "Minha função",
    design: "Linguagem de design",
    contact: "Contato",
    cta: "Fale comigo",
  },
} as const;

const PAD_X = "clamp(24px, 8vw, 180px)";
const PAD_SECTION = "clamp(60px, 10vw, 120px)";

const ACCENT = "var(--case-accent)";
const INK = "var(--case-ink)";
const TINT = "var(--case-tint)";

/* --------------------------------- helpers --------------------------------- */

export function CaseEm({ children }: { children: ReactNode }) {
  return <span style={{ color: INK}}>{children}</span>;
}

export function SectionEyebrow({ label }: { label: string }) {
  return (
    <div
      className="flex items-center gap-3 mb-8"
      style={{ borderLeft: `2px solid ${ACCENT}`, paddingLeft: "16px" }}
    >
      <span
        className="font-mono uppercase tracking-widest"
        style={{ fontSize: "clamp(11px, 1vw, 13px)", color: INK }}
      >
        {label}
      </span>
    </div>
  );
}

export type CaseImage = {
  src: string;
  alt: string;
  width: number;
  height: number;
};

/* ---------------------------------- layout ---------------------------------- */

type NextProject = { href: string; label: string };

export function CaseLayout({
  accent,
  accentInk,
  accentTint,
  nextProject,
  children,
}: {
  accent: string;
  accentInk: string;
  accentTint: string;
  nextProject: NextProject;
  children: ReactNode;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const locale = useLocale();
  const chrome = CHROME_COPY[locale];
  const home = localeHref(locale, "/");

  useGSAP(
    () => {
      const sections = containerRef.current?.querySelectorAll(".animate-section");
      const heroItems = containerRef.current?.querySelectorAll(".hero-stagger");

      if (prefersReducedMotion()) {
        if (heroItems) gsap.set(heroItems, { opacity: 1, y: 0 });
        if (sections) gsap.set(sections, { opacity: 1, y: 0 });
        return;
      }

      const mm = gsap.matchMedia();

      mm.add("(min-width: 769px)", () => {
        if (heroItems) {
          gsap.fromTo(
            heroItems,
            { y: 50, opacity: 0 },
            { y: 0, opacity: 1, duration: 1, ease: "power3.out", stagger: 0.12, delay: 0.2 }
          );
        }

        sections?.forEach((section) => {
          gsap.fromTo(
            section,
            { opacity: 0, y: 50 },
            {
              opacity: 1,
              y: 0,
              duration: 0.9,
              ease: "power3.out",
              scrollTrigger: {
                trigger: section,
                start: "top 85%",
                toggleActions: "play none none reverse",
              },
            }
          );
        });
      });

      // Mobile: sections contain heavy recreated-app subtrees, so transforms
      // and replayed tweens jank. Fade only, shorter, and animate once.
      mm.add("(max-width: 768px)", () => {
        if (heroItems) {
          gsap.fromTo(
            heroItems,
            { opacity: 0 },
            { opacity: 1, duration: 0.5, ease: "power2.out", stagger: 0.08, delay: 0.15 }
          );
        }

        sections?.forEach((section) => {
          gsap.fromTo(
            section,
            { opacity: 0 },
            {
              opacity: 1,
              duration: 0.5,
              ease: "power2.out",
              scrollTrigger: {
                trigger: section,
                start: "top 90%",
                once: true,
              },
            }
          );
        });
      });

      // The embedded app recreations rescale themselves after mount (ScaleBox),
      // shifting the whole page — recompute trigger positions when the
      // document height changes, or late sections never fire.
      let raf = 0;
      const ro = new ResizeObserver(() => {
        cancelAnimationFrame(raf);
        raf = requestAnimationFrame(() => ScrollTrigger.refresh());
      });
      ro.observe(document.body);

      return () => {
        cancelAnimationFrame(raf);
        ro.disconnect();
      };
    },
    { scope: containerRef }
  );

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div
      ref={containerRef}
      className="min-h-screen bg-background"
      style={
        {
          "--case-accent": accent,
          "--case-ink": accentInk,
          "--case-tint": accentTint,
        } as CSSProperties
      }
    >
      <header
        className="fixed top-0 left-0 right-0 z-50 flex justify-between items-center"
        style={{
          padding: `clamp(16px, 3vw, 24px) ${PAD_X}`,
          backgroundColor: "rgba(255, 255, 249, 0.9)",
          backdropFilter: "blur(12px)",
          borderBottom: "1px solid rgba(22, 22, 22, 0.06)",
        }}
      >
        <Link
          href={home}
          className="flex items-center gap-2 text-foreground hover:text-primary transition-colors duration-300 group"
          style={{ fontSize: "clamp(14px, 1.3vw, 16px)" }}
        >
          <ArrowLeft
            size={20}
            className="transition-transform duration-300 group-hover:-translate-x-1"
          />
          <span className="font-medium">{chrome.back}</span>
        </Link>

        <Link
          href={home}
          className="text-foreground hover:text-primary transition-colors duration-300"
          style={{
            fontFamily: "var(--font-gravitas)",
            letterSpacing: "-0.11em",
            fontSize: "clamp(24px, 3vw, 32px)",
          }}
        >
          knji
        </Link>

        <div className="flex items-center gap-4">
          <LangToggle />
          <button
            onClick={scrollToTop}
            className="hidden sm:flex items-center gap-2 text-foreground hover:text-primary transition-colors duration-300 group"
            style={{ fontSize: "clamp(14px, 1.3vw, 16px)" }}
          >
            <span className="font-medium">{chrome.top}</span>
            <ArrowUp
              size={20}
              className="transition-transform duration-300 group-hover:-translate-y-1"
            />
          </button>
        </div>
      </header>

      {children}

      <footer
        className="w-full"
        style={{
          padding: `clamp(40px, 6vw, 80px) ${PAD_X}`,
          borderTop: "1px solid rgba(22, 22, 22, 0.06)",
          marginTop: "clamp(60px, 10vw, 120px)",
        }}
      >
        <div className="flex justify-between items-center">
          <Link
            href={home}
            className="flex items-center gap-3 text-foreground hover:text-primary transition-all duration-300 group"
          >
            <ArrowLeft
              size={24}
              className="transition-transform duration-300 group-hover:-translate-x-2"
            />
            <div className="flex flex-col">
              <span
                className="font-mono uppercase tracking-wider"
                style={{ fontSize: "clamp(10px, 0.9vw, 12px)", opacity: 0.65 }}
              >
                {chrome.backTo}
              </span>
              <span className="font-medium" style={{ fontSize: "clamp(16px, 1.5vw, 20px)" }}>
                {chrome.home}
              </span>
            </div>
          </Link>

          <Link
            href={localeHref(locale, nextProject.href)}
            className="flex items-center gap-3 text-foreground hover:text-primary transition-all duration-300 group"
          >
            <div className="flex flex-col items-end">
              <span
                className="font-mono uppercase tracking-wider"
                style={{ fontSize: "clamp(10px, 0.9vw, 12px)", opacity: 0.65 }}
              >
                {chrome.next}
              </span>
              <span className="font-medium" style={{ fontSize: "clamp(16px, 1.5vw, 20px)" }}>
                {nextProject.label}
              </span>
            </div>
            <ExternalLink
              size={24}
              className="transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1"
            />
          </Link>
        </div>
      </footer>
    </div>
  );
}

/* ----------------------------------- hero ----------------------------------- */

export function CaseHero({
  chips,
  headline,
  subtitle,
  roleLabel,
  roleTags,
  links,
  children,
}: {
  chips: string[];
  headline: ReactNode;
  subtitle: string;
  roleLabel?: string;
  roleTags: string[];
  links?: { label: string; href: string; hint?: string }[];
  /** Showcase block (e.g. <CaseShowcase>) rendered inside the hero gradient */
  children?: ReactNode;
}) {
  const defaults = SECTION_DEFAULTS[useLocale()];
  roleLabel ??= defaults.role;
  return (
    <section
      id="top"
      className="relative w-full overflow-hidden"
      style={{
        paddingTop: "clamp(120px, 14vw, 180px)",
        background: `linear-gradient(180deg, ${TINT} 0%, ${TINT} 60%, var(--background) 100%)`,
      }}
    >
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `
            radial-gradient(ellipse 60% 40% at 20% 20%, color-mix(in srgb, ${ACCENT} 12%, transparent) 0%, transparent 55%),
            radial-gradient(ellipse 50% 50% at 85% 45%, color-mix(in srgb, ${ACCENT} 6%, transparent) 0%, transparent 50%)
          `,
        }}
      />

      <div className="relative z-10" style={{ padding: `0 ${PAD_X}` }}>
        <div className="hero-stagger flex flex-wrap items-center gap-2" style={{ opacity: 0 }}>
          {chips.map((chip) => (
            <span
              key={chip}
              className="font-mono uppercase tracking-wider rounded-full"
              style={{
                fontSize: "clamp(10px, 0.9vw, 12px)",
                padding: "6px 14px",
                border: `1px solid color-mix(in srgb, ${ACCENT} 35%, transparent)`,
                color: INK,
                backgroundColor: "rgba(255, 255, 249, 0.6)",
              }}
            >
              {chip}
            </span>
          ))}
        </div>

        <h1
          className="hero-stagger text-foreground font-bold mt-8"
          style={{
            fontSize: "clamp(38px, 5.8vw, 82px)",
            lineHeight: 1.05,
            maxWidth: "1100px",
            opacity: 0,
          }}
        >
          {headline}
        </h1>

        <p
          className="hero-stagger text-foreground mt-8"
          style={{ fontSize: "clamp(16px, 1.8vw, 22px)", maxWidth: "640px", opacity: 0 }}
        >
          {subtitle}
        </p>

        <div className="hero-stagger mt-8" style={{ opacity: 0 }}>
          <span
            className="text-foreground font-mono uppercase tracking-wider"
            style={{ fontSize: "clamp(11px, 1vw, 13px)", opacity: 0.65 }}
          >
            {roleLabel}
          </span>
          <div className="flex flex-wrap gap-2 mt-3">
            {roleTags.map((tag) => (
              <span
                key={tag}
                className="px-4 py-2 rounded-sm font-mono"
                style={{
                  fontSize: "clamp(12px, 1.1vw, 14px)",
                  border: `1px solid color-mix(in srgb, ${ACCENT} 40%, transparent)`,
                  color: INK,
                  backgroundColor: "rgba(255, 255, 249, 0.5)",
                }}
              >
                {tag}
              </span>
            ))}
          </div>

          {links && links.length > 0 && (
            <div className="flex flex-wrap gap-x-10 gap-y-4 mt-8">
              {links.map((link) => (
                <div key={link.href} className="flex flex-col gap-1.5">
                  <a
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group/link flex items-center gap-2 font-medium transition-opacity duration-300 hover:opacity-70"
                    style={{ fontSize: "clamp(14px, 1.3vw, 16px)", color: INK }}
                  >
                    <span>{link.label}</span>
                    <ExternalLink
                      size={17}
                      className="transition-transform duration-300 group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5"
                    />
                  </a>
                  {link.hint && (
                    <span
                      className="font-mono"
                      style={{ fontSize: "clamp(11px, 1vw, 12px)", color: "var(--foreground)", opacity: 0.55 }}
                    >
                      {link.hint}
                    </span>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {children}
    </section>
  );
}

export function CaseShowcase({
  label,
  note,
  caption,
  children,
}: {
  label: string;
  note?: string;
  caption?: string;
  children: ReactNode;
}) {
  return (
    <div
      className="hero-stagger relative z-10"
      style={{ padding: `clamp(40px, 6vw, 72px) ${PAD_X} clamp(48px, 7vw, 96px)`, opacity: 0 }}
    >
      <div className="flex flex-wrap items-center justify-between gap-4 mb-5">
        <div className="flex items-center gap-3">
          <MousePointerClick size={18} style={{ color: INK }} />
          <span
            className="font-mono uppercase tracking-widest"
            style={{ fontSize: "clamp(10px, 1vw, 12px)", color: INK }}
          >
            {label}
          </span>
        </div>
        {note && (
          <span
            className="font-mono"
            style={{ fontSize: "clamp(10px, 1vw, 12px)", color: "var(--foreground)", opacity: 0.55 }}
          >
            {note}
          </span>
        )}
      </div>
      {children}
      {caption && (
        <p className="mt-4 font-mono" style={{ fontSize: "clamp(10px, 1vw, 12px)", opacity: 0.55 }}>
          {caption}
        </p>
      )}
    </div>
  );
}

/* ---------------------------------- results ---------------------------------- */

export function CaseResults({
  label,
  items,
  statement,
  footnote,
}: {
  label?: string;
  items: { value: string; label: string }[];
  statement?: string;
  footnote?: string;
}) {
  label ??= SECTION_DEFAULTS[useLocale()].results;
  return (
    <section
      className="animate-section w-full"
      style={{ padding: `clamp(24px, 4vw, 48px) ${PAD_X}`, opacity: 0 }}
    >
      <div
        className="rounded-lg"
        style={{ backgroundColor: "#161616", padding: "clamp(32px, 4.5vw, 64px)" }}
      >
        <span
          className="font-mono uppercase tracking-widest block mb-10"
          style={{ fontSize: "clamp(10px, 1vw, 12px)", color: ACCENT }}
        >
          {label}
        </span>
        <div
          className="grid gap-10"
          style={{ gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 200px), 1fr))" }}
        >
          {items.map((r) => (
            <div key={r.value} className="flex flex-col gap-3">
              <span
                className="font-bold leading-none"
                style={{ fontSize: "clamp(32px, 4vw, 56px)", color: "#fffff9" }}
              >
                {r.value}
              </span>
              <span
                style={{
                  fontSize: "clamp(13px, 1.2vw, 15px)",
                  color: "#fffff9",
                  opacity: 0.65,
                  maxWidth: "260px",
                }}
              >
                {r.label}
              </span>
            </div>
          ))}
        </div>
        {(statement || footnote) && (
          <div className="mt-12 pt-8" style={{ borderTop: "1px solid rgba(255, 255, 249, 0.12)" }}>
            {statement && (
              <p
                className="leading-relaxed"
                style={{ fontSize: "clamp(17px, 1.9vw, 26px)", color: "#fffff9", maxWidth: "900px" }}
              >
                {statement}
              </p>
            )}
            {footnote && (
              <p
                className="font-mono mt-8"
                style={{ fontSize: "clamp(10px, 1vw, 12px)", color: "#fffff9", opacity: 0.45 }}
              >
                {footnote}
              </p>
            )}
          </div>
        )}
      </div>
    </section>
  );
}

/* ----------------------------------- story ----------------------------------- */

export function CaseStory({
  eyebrow,
  headline,
  text,
  image,
  imageCaption,
  personas,
  cards,
}: {
  eyebrow: string;
  headline: string;
  text: string;
  image: CaseImage;
  imageCaption?: string;
  /** Who the product serves — rendered between the story and the cards */
  personas?: { label: string; title: string; text: string }[];
  cards?: { number: string; title: string; text: string }[];
}) {
  return (
    <section
      className="animate-section w-full"
      style={{ padding: `${PAD_SECTION} ${PAD_X}`, backgroundColor: TINT, opacity: 0 }}
    >
      <div
        className="grid gap-12 items-center"
        style={{ gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 300px), 1fr))" }}
      >
        <div className="flex flex-col gap-6">
          <SectionEyebrow label={eyebrow} />
          <h2
            className="text-foreground font-bold line-clamp-none"
            style={{ fontSize: "clamp(26px, 3.2vw, 44px)" }}
          >
            {headline}
          </h2>
          <p
            className="text-foreground leading-relaxed"
            style={{ fontSize: "clamp(15px, 1.4vw, 18px)", opacity: 0.7 }}
          >
            {text}
          </p>
        </div>

        <div className="flex flex-col items-center gap-4">
          <div className="relative rounded-lg overflow-hidden">
            <Image
              quality={90}
              src={image.src}
              alt={image.alt}
              width={image.width}
              height={image.height}
              style={{ maxWidth: "100%", height: "auto" }}
            />
          </div>
          {imageCaption && (
            <span
              className="text-foreground font-mono"
              style={{ fontSize: "clamp(11px, 1vw, 13px)", opacity: 0.65 }}
            >
              {imageCaption}
            </span>
          )}
        </div>
      </div>

      {personas && personas.length > 0 && (
        <div
          className="grid gap-6 mt-14"
          style={{ gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 320px), 1fr))" }}
        >
          {personas.map((persona) => (
            <div
              key={persona.title}
              className="rounded-lg p-7 flex flex-col gap-3"
              style={{
                borderLeft: `2px solid ${ACCENT}`,
                backgroundColor: "rgba(255, 255, 249, 0.6)",
              }}
            >
              <span
                className="font-mono uppercase tracking-widest"
                style={{ fontSize: "clamp(10px, 0.9vw, 12px)", color: INK }}
              >
                {persona.label}
              </span>
              <h3
                className="text-foreground font-semibold"
                style={{ fontSize: "clamp(17px, 1.6vw, 21px)" }}
              >
                {persona.title}
              </h3>
              <p
                className="text-foreground leading-relaxed"
                style={{ fontSize: "clamp(14px, 1.3vw, 16px)", opacity: 0.7 }}
              >
                {persona.text}
              </p>
            </div>
          ))}
        </div>
      )}

      {cards && cards.length > 0 && (
        <div
          className="grid gap-6 mt-14"
          style={{ gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 240px), 1fr))" }}
        >
          {cards.map((item) => (
            <div
              key={item.number}
              className="rounded-lg p-7 flex flex-col gap-4"
              style={{
                border: `1px solid color-mix(in srgb, ${ACCENT} 22%, transparent)`,
                backgroundColor: "rgba(255, 255, 249, 0.6)",
              }}
            >
              <span
                className="font-mono"
                style={{ fontSize: "clamp(13px, 1.2vw, 15px)", color: INK }}
              >
                {item.number}
              </span>
              <h3
                className="text-foreground font-semibold"
                style={{ fontSize: "clamp(17px, 1.6vw, 21px)" }}
              >
                {item.title}
              </h3>
              <p
                className="text-foreground leading-relaxed"
                style={{ fontSize: "clamp(14px, 1.3vw, 16px)", opacity: 0.7 }}
              >
                {item.text}
              </p>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}

/* ------------------------------ design language ------------------------------ */

export function CaseDesignLanguage({
  eyebrow,
  intro,
  fontClassName,
  fontFamily,
  typefaceName,
  weights,
  description,
  charset,
  charsetCaption,
  palette,
  supportPalette,
  statusPills,
  extra,
}: {
  eyebrow?: string;
  /** Lead statement rendered before the type specimen (e.g. design ownership) */
  intro?: string;
  /** next/font `.variable` class that makes the typeface available */
  fontClassName?: string;
  /** CSS font-family value used for the specimen */
  fontFamily: string;
  typefaceName: string;
  weights: { label: string; weight: number }[];
  description: string;
  charset?: string[];
  charsetCaption?: string;
  palette: {
    category: string;
    name: string;
    hex: string;
    rgb: string;
    bg: string;
    fg: string;
    border?: string;
  }[];
  supportPalette?: { label: string; text?: string; colors: string[] };
  statusPills?: { label: string; pills: { label: string; cls: string }[] };
  /** Free-form exhibit (e.g. a material/effect demo) rendered before the status pills */
  extra?: ReactNode;
}) {
  eyebrow ??= SECTION_DEFAULTS[useLocale()].design;
  return (
    <section
      className={`animate-section w-full ${fontClassName ?? ""}`}
      style={{ padding: `${PAD_SECTION} ${PAD_X}`, opacity: 0 }}
    >
      <div className="flex flex-wrap items-end justify-between gap-6">
        <SectionEyebrow label={eyebrow} />
        <div className="flex items-baseline gap-8" style={{ fontFamily }}>
          {weights.map((w) => (
            <span
              key={w.label}
              className="text-foreground"
              style={{ fontWeight: w.weight, fontSize: "clamp(14px, 1.4vw, 18px)" }}
            >
              {w.label}
            </span>
          ))}
        </div>
      </div>

      {intro && (
        <p
          className="text-foreground leading-relaxed mt-2"
          style={{ fontSize: "clamp(16px, 1.6vw, 21px)", maxWidth: "780px" }}
        >
          {intro}
        </p>
      )}

      <h2
        className="text-foreground mt-10 leading-none line-clamp-none"
        style={{
          fontFamily,
          fontWeight: 200,
          fontSize: "clamp(56px, 9vw, 140px)",
          letterSpacing: "-0.02em",
        }}
      >
        {typefaceName}
      </h2>

      <div
        className="grid gap-10 mt-10 items-start"
        style={{ gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 320px), 1fr))" }}
      >
        <p
          className="text-foreground leading-relaxed"
          style={{ fontSize: "clamp(15px, 1.4vw, 18px)", opacity: 0.7, maxWidth: "620px" }}
        >
          {description}
        </p>
        {charset && charset.length > 0 && (
          <div
            className="flex flex-col gap-2 text-foreground"
            style={{ fontFamily, fontWeight: 300, fontSize: "clamp(13px, 1.2vw, 16px)", opacity: 0.6 }}
          >
            {charset.map((line) => (
              <span key={line}>{line}</span>
            ))}
            {charsetCaption && (
              <span
                className="font-mono mt-2"
                style={{
                  fontFamily: "var(--font-gabarito), sans-serif",
                  fontSize: "clamp(10px, 1vw, 12px)",
                  opacity: 0.8,
                }}
              >
                {charsetCaption}
              </span>
            )}
          </div>
        )}
      </div>

      <div
        className="grid gap-6 mt-14"
        style={{ gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 240px), 1fr))" }}
      >
        {palette.map((c) => (
          <div
            key={c.name}
            className="rounded-lg p-6 flex flex-col justify-between"
            style={{
              backgroundColor: c.bg,
              color: c.fg,
              border: `1px solid ${c.border ?? "transparent"}`,
              minHeight: "220px",
            }}
          >
            <div className="flex flex-col gap-1">
              <span
                className="font-mono uppercase tracking-widest"
                style={{ fontSize: "clamp(10px, 0.9vw, 12px)", opacity: 0.7 }}
              >
                {c.category}
              </span>
              <span className="font-semibold" style={{ fontSize: "clamp(18px, 1.8vw, 24px)" }}>
                {c.name}
              </span>
            </div>
            <div
              className="flex flex-col gap-2 pt-4"
              style={{ borderTop: `1px solid color-mix(in srgb, ${c.fg} 20%, transparent)` }}
            >
              <div className="flex justify-between font-mono" style={{ fontSize: "clamp(11px, 1vw, 13px)" }}>
                <span style={{ opacity: 0.7 }}>HEX</span>
                <span>{c.hex}</span>
              </div>
              <div className="flex justify-between font-mono" style={{ fontSize: "clamp(11px, 1vw, 13px)" }}>
                <span style={{ opacity: 0.7 }}>RGB</span>
                <span>{c.rgb}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {supportPalette && (
        <div className="mt-10">
          <span
            className="font-mono uppercase tracking-widest block mb-2"
            style={{ fontSize: "clamp(10px, 0.9vw, 12px)", color: INK }}
          >
            {supportPalette.label}
          </span>
          {supportPalette.text && (
            <p
              className="text-foreground leading-relaxed mb-4"
              style={{ fontSize: "clamp(13px, 1.2vw, 15px)", opacity: 0.65, maxWidth: "620px" }}
            >
              {supportPalette.text}
            </p>
          )}
          <div className="flex flex-wrap gap-2">
            {supportPalette.colors.map((hex) => (
              <span
                key={hex}
                title={hex}
                className="rounded-md"
                style={{
                  width: "clamp(24px, 2.4vw, 36px)",
                  height: "clamp(24px, 2.4vw, 36px)",
                  backgroundColor: hex,
                  border: "1px solid rgba(22, 22, 22, 0.08)",
                }}
              />
            ))}
          </div>
        </div>
      )}

      {extra}

      {statusPills && (
        <div className="mt-10">
          <span
            className="font-mono uppercase tracking-widest block mb-4"
            style={{ fontSize: "clamp(10px, 0.9vw, 12px)", color: INK }}
          >
            {statusPills.label}
          </span>
          <div className="flex flex-wrap gap-2">
            {statusPills.pills.map((s) => (
              <span
                key={s.label}
                className={`inline-flex items-center rounded-full border px-3 py-1 font-mono ${s.cls}`}
                style={{ fontSize: "clamp(10px, 0.9vw, 12px)" }}
              >
                {s.label}
              </span>
            ))}
          </div>
        </div>
      )}
    </section>
  );
}

/* --------------------------------- features --------------------------------- */

export type CaseFeature = {
  number: string;
  title: string;
  text: string;
  secondaryText?: ReactNode;
  layout?: "split";
  media: ReactNode;
  caption?: string;
};

export function CaseFeatures({
  eyebrow,
  intro,
  features,
}: {
  eyebrow: string;
  intro?: string;
  features: CaseFeature[];
}) {
  return (
    <section className="w-full" style={{ padding: `0 ${PAD_X} clamp(20px, 4vw, 40px)` }}>
      <div className="animate-section" style={{ opacity: 0 }}>
        <SectionEyebrow label={eyebrow} />
        {intro && (
          <p
            className="text-foreground leading-relaxed mb-20"
            style={{ fontSize: "clamp(15px, 1.4vw, 18px)", opacity: 0.7, maxWidth: "700px" }}
          >
            {intro}
          </p>
        )}
      </div>

      {features.map((feature) => {
        const header = (
          <div className="flex items-center gap-4 mb-8">
            <div
              className="w-10 h-10 rounded-full flex items-center justify-center font-mono"
              style={{
                fontSize: "14px",
                backgroundColor: `color-mix(in srgb, ${ACCENT} 30%, transparent)`,
                border: `1px solid ${ACCENT}`,
                color: INK,
              }}
            >
              {feature.number}
            </div>
            <h3
              className="text-foreground font-semibold"
              style={{ fontSize: "clamp(20px, 2.5vw, 32px)" }}
            >
              {feature.title}
            </h3>
          </div>
        );

        const description = (
          <p
            className="text-foreground leading-relaxed"
            style={{ fontSize: "clamp(15px, 1.4vw, 18px)", opacity: 0.7, maxWidth: "700px" }}
          >
            {feature.text}
          </p>
        );

        if (feature.layout === "split") {
          return (
            <section
              key={feature.number}
              className="animate-section w-full mb-24"
              style={{ opacity: 0 }}
            >
              <div
                className="grid gap-8 items-center"
                style={{ gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 300px), 1fr))" }}
              >
                <div className="flex flex-col gap-6">
                  {header}
                  {description}
                  {feature.secondaryText && (
                    <p
                      className="text-foreground leading-relaxed"
                      style={{ fontSize: "clamp(14px, 1.3vw, 16px)", opacity: 0.6 }}
                    >
                      {feature.secondaryText}
                    </p>
                  )}
                  <div
                    className="h-px"
                    style={{
                      background: `linear-gradient(90deg, color-mix(in srgb, ${ACCENT} 40%, transparent), transparent)`,
                      maxWidth: "200px",
                    }}
                  />
                </div>
                {feature.media}
              </div>
            </section>
          );
        }

        return (
          <section
            key={feature.number}
            className="animate-section w-full mb-24"
            style={{ opacity: 0 }}
          >
            {header}
            <div className="mb-8">{description}</div>
            {feature.secondaryText && (
              <p
                className="text-foreground leading-relaxed mb-8"
                style={{ fontSize: "clamp(14px, 1.3vw, 16px)", opacity: 0.6, maxWidth: "700px" }}
              >
                {feature.secondaryText}
              </p>
            )}
            {feature.media}
            {feature.caption && (
              <p
                className="mt-3 font-mono"
                style={{ fontSize: "clamp(10px, 0.9vw, 11px)", opacity: 0.5 }}
              >
                {feature.caption}
              </p>
            )}
          </section>
        );
      })}
    </section>
  );
}

/* --------------------------------- evidence --------------------------------- */

export function CaseEvidence({
  eyebrow,
  text,
  items,
  stackLabel = "Stack",
  stack,
}: {
  eyebrow: string;
  text?: string;
  items: { image: CaseImage; caption: string }[];
  stackLabel?: string;
  stack?: string[];
}) {
  return (
    <section
      className="animate-section w-full"
      style={{ padding: `${PAD_SECTION} ${PAD_X}`, opacity: 0 }}
    >
      <SectionEyebrow label={eyebrow} />
      {text && (
        <p
          className="text-foreground leading-relaxed mb-10"
          style={{ fontSize: "clamp(15px, 1.4vw, 18px)", opacity: 0.7, maxWidth: "700px" }}
        >
          {text}
        </p>
      )}
      <div
        className="grid gap-6"
        style={{ gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 260px), 1fr))" }}
      >
        {items.map((item) => (
          <div key={item.caption} className="flex flex-col gap-3">
            <div className="rounded-lg overflow-hidden">
              <Image
                quality={90}
                src={item.image.src}
                alt={item.image.alt}
                width={item.image.width}
                height={item.image.height}
                className="w-full"
              />
            </div>
            <span
              className="font-mono"
              style={{ fontSize: "clamp(10px, 0.9vw, 12px)", opacity: 0.6 }}
            >
              {item.caption}
            </span>
          </div>
        ))}
      </div>

      {stack && stack.length > 0 && (
        <div className="mt-12">
          <span
            className="font-mono uppercase tracking-widest block mb-4"
            style={{ fontSize: "clamp(10px, 0.9vw, 12px)", color: INK }}
          >
            {stackLabel}
          </span>
          <div className="flex flex-wrap gap-2">
            {stack.map((tech) => (
              <span
                key={tech}
                className="px-3 py-1.5 rounded-sm font-mono"
                style={{
                  fontSize: "clamp(11px, 1vw, 13px)",
                  border: `1px solid color-mix(in srgb, ${ACCENT} 30%, transparent)`,
                  color: INK,
                  backgroundColor: "rgba(255, 255, 249, 0.5)",
                }}
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
      )}
    </section>
  );
}

/* ---------------------------------- contact ---------------------------------- */

export function CaseContact({
  eyebrow,
  heading,
  text,
  ctaLabel,
  ctaHref = "/#contact",
  email,
}: {
  eyebrow?: string;
  heading: string;
  text?: string;
  ctaLabel?: string;
  ctaHref?: string;
  email?: string;
}) {
  const locale = useLocale();
  const defaults = SECTION_DEFAULTS[locale];
  eyebrow ??= defaults.contact;
  ctaLabel ??= defaults.cta;
  ctaHref = localeHref(locale, ctaHref);
  return (
    <section
      className="animate-section w-full"
      style={{ padding: `${PAD_SECTION} ${PAD_X}`, backgroundColor: TINT, opacity: 0 }}
    >
      <SectionEyebrow label={eyebrow} />
      <h2
        className="text-foreground font-bold line-clamp-none"
        style={{ fontSize: "clamp(26px, 3.2vw, 44px)", maxWidth: "760px" }}
      >
        {heading}
      </h2>
      {text && (
        <p
          className="text-foreground leading-relaxed mt-4"
          style={{ fontSize: "clamp(15px, 1.4vw, 18px)", opacity: 0.7, maxWidth: "620px" }}
        >
          {text}
        </p>
      )}
      <div className="flex flex-wrap items-center gap-6 mt-8">
        <Link
          href={ctaHref}
          className="inline-flex items-center gap-2 rounded-sm font-medium transition-colors duration-300 hover:opacity-90"
          style={{
            fontSize: "clamp(14px, 1.3vw, 16px)",
            padding: "12px 28px",
            backgroundColor: INK,
            color: "#fffff9",
          }}
        >
          {ctaLabel}
          <ArrowUp size={16} className="rotate-45" />
        </Link>
        {email && (
          <a
            href={`mailto:${email}`}
            className="font-mono text-foreground transition-colors duration-300 hover:text-primary"
            style={{ fontSize: "clamp(13px, 1.2vw, 15px)", opacity: 0.8 }}
          >
            {email}
          </a>
        )}
      </div>
    </section>
  );
}
