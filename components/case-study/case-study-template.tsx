"use client";

import { ReactNode, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { ArrowLeft, ArrowUp, ExternalLink } from "lucide-react";

gsap.registerPlugin(ScrollTrigger, useGSAP);

type ImageConfig = {
  src: string;
  alt: string;
  width: number;
  height: number;
  className?: string;
  style?: React.CSSProperties;
  priority?: boolean;
  unoptimized?: boolean;
};

type ChallengeImageConfig = ImageConfig & {
  caption: string;
};

type NextProjectConfig = {
  href: string;
  label: string;
};

type CaseStudyTemplateProps = {
  projectName: string;
  heroSubtitle: string;
  tags: string[];
  heroImage: ImageConfig;
  overviewIntro: string[];
  overviewContext: string;
  challengeText: string[];
  challengeImage: ChallengeImageConfig;
  solutionImage: ImageConfig;
  solutionText: string;
  features: ReactNode;
  preImplementation?: ReactNode;
  implementationSteps: string[];
  implementationMedia: ReactNode;
  outcomePrimary: string;
  outcomeSecondary?: string;
  postOutcome?: ReactNode;
  nextProject: NextProjectConfig;
};

const tagColors = [
  {
    border:
      "color-mix(in srgb, var(--color-accent-purple) 40%, transparent)",
    text: "var(--color-accent-purple)",
  },
  {
    border: "color-mix(in srgb, var(--color-accent-cyan) 40%, transparent)",
    text: "var(--color-accent-cyan-dark)",
  },
  {
    border: "color-mix(in srgb, var(--color-primary) 40%, transparent)",
    text: "var(--color-primary)",
  },
];

export function CaseStudyTemplate({
  projectName,
  heroSubtitle,
  tags,
  heroImage,
  overviewIntro,
  overviewContext,
  challengeText,
  challengeImage,
  solutionImage,
  solutionText,
  features,
  preImplementation,
  implementationSteps,
  implementationMedia,
  outcomePrimary,
  outcomeSecondary,
  postOutcome,
  nextProject,
}: CaseStudyTemplateProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const heroContentRef = useRef<HTMLDivElement>(null);
  const overviewRef = useRef<HTMLElement>(null);
  const challengeRef = useRef<HTMLElement>(null);
  const solutionRef = useRef<HTMLElement>(null);
  const featuresRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const heroTl = gsap.timeline({ delay: 0.2 });
      const heroContent = heroContentRef.current;

      if (heroContent) {
        const h1 = heroContent.querySelector("h1");
        const heroSubtitleEl = heroContent.querySelector(".hero-subtitle");
        const heroImageEl = heroContent.querySelector(".hero-image");
        const heroRoleEl = heroContent.querySelector(".hero-role");

        if (h1) {
          heroTl.fromTo(
            h1,
            { y: 60, opacity: 0 },
            { y: 0, opacity: 1, duration: 1, ease: "power3.out" }
          );
        }
        if (heroSubtitleEl) {
          heroTl.fromTo(
            heroSubtitleEl,
            { y: 40, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.8, ease: "power3.out" },
            "-=0.6"
          );
        }
        if (heroImageEl) {
          heroTl.fromTo(
            heroImageEl,
            { y: 80, opacity: 0, scale: 0.95 },
            { y: 0, opacity: 1, scale: 1, duration: 1.2, ease: "power3.out" },
            "-=0.5"
          );
        }
        if (heroRoleEl) {
          heroTl.fromTo(
            heroRoleEl,
            { y: 30, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.6, ease: "power3.out" },
            "-=0.8"
          );
        }
      }

      gsap.fromTo(
        overviewRef.current,
        { opacity: 0, y: 60 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: overviewRef.current,
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
        }
      );

      gsap.fromTo(
        challengeRef.current,
        { opacity: 0, y: 60 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: challengeRef.current,
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
        }
      );

      gsap.fromTo(
        solutionRef.current,
        { opacity: 0, y: 60 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: solutionRef.current,
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
        }
      );

      const featureCards = featuresRef.current?.querySelectorAll(".feature-card");
      if (featureCards) {
        featureCards.forEach((card) => {
          gsap.fromTo(
            card,
            { opacity: 0, y: 50 },
            {
              opacity: 1,
              y: 0,
              duration: 0.8,
              ease: "power3.out",
              scrollTrigger: {
                trigger: card,
                start: "top 85%",
                toggleActions: "play none none reverse",
              },
            }
          );
        });
      }

      const sections = containerRef.current?.querySelectorAll(".animate-section");
      sections?.forEach((section) => {
        gsap.fromTo(
          section,
          { opacity: 0, y: 50 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: "power3.out",
            scrollTrigger: {
              trigger: section,
              start: "top 85%",
              toggleActions: "play none none reverse",
            },
          }
        );
      });
    },
    { scope: containerRef }
  );

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div ref={containerRef} className="min-h-screen bg-background">
      <header
        className="fixed top-0 left-0 right-0 z-50 flex justify-between items-center"
        style={{
          padding: "clamp(16px, 3vw, 24px) clamp(40px, 8vw, 180px)",
          backgroundColor: "rgba(255, 255, 249, 0.9)",
          backdropFilter: "blur(12px)",
          borderBottom: "1px solid rgba(22, 22, 22, 0.06)",
        }}
      >
        <Link
          href="/"
          className="flex items-center gap-2 text-foreground hover:text-primary transition-colors duration-300 group"
          style={{ fontSize: "clamp(14px, 1.3vw, 16px)" }}
        >
          <ArrowLeft
            size={20}
            className="transition-transform duration-300 group-hover:-translate-x-1"
          />
          <span className="font-medium">Back</span>
        </Link>

        <Link
          href="/"
          className="text-foreground hover:text-primary transition-colors duration-300"
          style={{
            fontFamily: "var(--font-gravitas)",
            letterSpacing: "-0.11em",
            fontSize: "clamp(24px, 3vw, 32px)",
          }}
        >
          knji
        </Link>

        <button
          onClick={scrollToTop}
          className="flex items-center gap-2 text-foreground hover:text-primary transition-colors duration-300 group"
          style={{ fontSize: "clamp(14px, 1.3vw, 16px)" }}
        >
          <span className="font-medium">Top</span>
          <ArrowUp
            size={20}
            className="transition-transform duration-300 group-hover:-translate-y-1"
          />
        </button>
      </header>

      <section
        id="top"
        className="relative w-full overflow-hidden"
        style={{
          minHeight: "100vh",
          paddingTop: "clamp(100px, 12vw, 140px)",
          background:
            "linear-gradient(180deg, #F5EDFF 0%, #F5EDFF 70%, var(--background) 100%)",
        }}
      >
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: `
              radial-gradient(ellipse 60% 40% at 20% 30%, color-mix(in srgb, var(--color-accent-purple) 10%, transparent) 0%, transparent 50%),
              radial-gradient(ellipse 50% 50% at 80% 60%, color-mix(in srgb, var(--color-primary) 5%, transparent) 0%, transparent 50%)
            `,
          }}
        />

        <div
          ref={heroContentRef}
          className="relative z-10 grid lg:grid-cols-2 gap-8 lg:gap-12 items-center"
          style={{
            padding: "clamp(40px, 6vw, 80px) clamp(40px, 8vw, 180px)",
            minHeight: "calc(100vh - clamp(100px, 12vw, 140px))",
          }}
        >
          <div className="flex flex-col justify-center">
            <h1
              className="text-foreground font-bold leading-none"
              style={{
                fontSize: "clamp(48px, 8vw, 100px)",
                opacity: 0,
              }}
            >
              {projectName}
            </h1>

            <p
              className="hero-subtitle text-foreground mt-6"
              style={{
                fontSize: "clamp(16px, 1.8vw, 22px)",
                maxWidth: "500px",
                opacity: 0.7,
              }}
            >
              {heroSubtitle}
            </p>

            <div className="hero-role mt-8" style={{ opacity: 0 }}>
              <span
                className="text-foreground font-mono uppercase tracking-wider"
                style={{ fontSize: "clamp(11px, 1vw, 13px)", opacity: 0.5 }}
              >
                My Role
              </span>
              <div className="flex flex-wrap gap-2 mt-3">
                {tags.map((tag, index) => {
                  const color = tagColors[index % 3];
                  return (
                    <span
                      key={tag}
                      className="px-4 py-2 rounded-sm font-mono"
                      style={{
                        fontSize: "clamp(12px, 1.1vw, 14px)",
                        border: `1px solid ${color.border}`,
                        color: color.text,
                        backgroundColor: "rgba(255, 255, 249, 0.5)",
                      }}
                    >
                      {tag}
                    </span>
                  );
                })}
              </div>
            </div>
          </div>

          <div
            className="hero-image relative flex justify-center lg:justify-end"
            style={{ opacity: 0 }}
          >
            <Image
              src={heroImage.src}
              alt={heroImage.alt}
              width={heroImage.width}
              height={heroImage.height}
              className={heroImage.className ?? "relative z-10"}
              style={heroImage.style}
              priority={heroImage.priority}
              unoptimized={heroImage.unoptimized}
            />
          </div>
        </div>

        <div
          className="absolute top-24 right-8 w-16 h-16 pointer-events-none hidden lg:block"
          style={{
            borderRight:
              "1px solid color-mix(in srgb, var(--color-accent-purple) 40%, transparent)",
            borderTop:
              "1px solid color-mix(in srgb, var(--color-accent-purple) 40%, transparent)",
          }}
        />
      </section>

      <section
        ref={overviewRef}
        className="w-full"
        style={{
          padding: "clamp(60px, 10vw, 120px) clamp(40px, 8vw, 180px)",
          opacity: 0,
        }}
      >
        <div className="flex items-center gap-4 mb-12">
          <span
            className="font-mono"
            style={{ fontSize: "clamp(14px, 1.5vw, 18px)", color: "var(--color-accent-purple)" }}
          >
            01.
          </span>
          <h2
            className="text-foreground font-bold"
            style={{ fontSize: "clamp(24px, 3vw, 36px)" }}
          >
            Overview
          </h2>
          <div
            className="flex-1 h-px"
            style={{
              background:
                "linear-gradient(90deg, color-mix(in srgb, var(--color-accent-purple) 30%, transparent), transparent)",
              maxWidth: "300px",
            }}
          />
        </div>

        <div
          className="grid gap-12 lg:gap-16"
          style={{
            gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 400px), 1fr))",
          }}
        >
          <div className="flex flex-col gap-6">
            {overviewIntro.map((paragraph) => (
              <p
                key={paragraph}
                className="text-foreground leading-relaxed"
                style={{
                  fontSize: "clamp(18px, 2vw, 24px)",
                  opacity: paragraph === overviewIntro[0] ? 1 : 0.7,
                }}
              >
                {paragraph}
              </p>
            ))}
          </div>
        </div>

        <div
          className="mt-16 p-8 rounded-lg"
          style={{
            backgroundColor: "color-mix(in srgb, var(--color-accent-purple) 4%, transparent)",
            border: "1px solid color-mix(in srgb, var(--color-accent-purple) 15%, transparent)",
          }}
        >
          <p
            className="text-foreground leading-relaxed"
            style={{ fontSize: "clamp(15px, 1.4vw, 17px)", opacity: 0.8 }}
          >
            {overviewContext}
          </p>
        </div>
      </section>

      <section
        ref={challengeRef}
        className="w-full"
        style={{
          padding: "clamp(60px, 10vw, 120px) clamp(40px, 8vw, 180px)",
          backgroundColor: "#F5EDFF",
          opacity: 0,
        }}
      >
        <div
          className="grid gap-12 items-center"
          style={{
            gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 300px), 1fr))",
          }}
        >
          <div className="flex flex-col gap-6">
            <div className="flex items-center gap-4">
              <span
                className="font-mono"
                style={{ fontSize: "clamp(14px, 1.5vw, 18px)", color: "var(--color-accent-cyan)" }}
              >
                02.
              </span>
              <h2
                className="text-foreground font-bold"
                style={{ fontSize: "clamp(24px, 3vw, 36px)" }}
              >
                The Challenge
              </h2>
            </div>
            {challengeText.map((paragraph, index) => (
              <p
                key={paragraph}
                className="text-foreground leading-relaxed"
                style={{
                  fontSize:
                    index === 0
                      ? "clamp(16px, 1.6vw, 20px)"
                      : "clamp(15px, 1.4vw, 18px)",
                  opacity: index === 0 ? 1 : 0.7,
                }}
              >
                {paragraph}
              </p>
            ))}
          </div>

          <div className="flex flex-col items-center gap-4">
            <div className="relative rounded-lg overflow-hidden">
              <Image
                src={challengeImage.src}
                alt={challengeImage.alt}
                width={challengeImage.width}
                height={challengeImage.height}
                className={challengeImage.className}
                style={challengeImage.style}
                priority={challengeImage.priority}
                unoptimized={challengeImage.unoptimized}
              />
            </div>
            <span
              className="text-foreground font-mono"
              style={{ fontSize: "clamp(11px, 1vw, 13px)", opacity: 0.5 }}
            >
              {challengeImage.caption}
            </span>
          </div>
        </div>
      </section>

      <section className="animate-section w-full" style={{ opacity: 0 }}>
        <Image
          className={solutionImage.className ?? "w-full"}
          src={solutionImage.src}
          alt={solutionImage.alt}
          width={solutionImage.width}
          height={solutionImage.height}
          style={solutionImage.style}
          priority={solutionImage.priority}
          unoptimized={solutionImage.unoptimized}
        />
      </section>

      <section
        ref={solutionRef}
        className="w-full"
        style={{
          padding: "clamp(60px, 10vw, 120px) clamp(40px, 8vw, 180px)",
          opacity: 0,
        }}
      >
        <div className="flex items-center gap-4 mb-8">
          <span
            className="font-mono"
            style={{ fontSize: "clamp(14px, 1.5vw, 18px)", color: "var(--color-primary)" }}
          >
            03.
          </span>
          <h2
            className="text-foreground font-bold"
            style={{ fontSize: "clamp(24px, 3vw, 36px)" }}
          >
            The Solution
          </h2>
          <div
            className="flex-1 h-px"
            style={{
              background:
                "linear-gradient(90deg, color-mix(in srgb, var(--color-primary) 30%, transparent), transparent)",
              maxWidth: "300px",
            }}
          />
        </div>
        <p
          className="text-foreground leading-relaxed"
          style={{ fontSize: "clamp(18px, 2.2vw, 28px)" }}
        >
          {solutionText}
        </p>
      </section>

      <div
        ref={featuresRef}
        className="w-full"
        style={{ padding: "0 clamp(40px, 8vw, 180px)" }}
      >
        {features}
      </div>

      {preImplementation}

      <section
        className="animate-section w-full"
        style={{
          padding: "clamp(60px, 10vw, 120px) clamp(40px, 8vw, 180px)",
          opacity: 0,
        }}
      >
        <div className="flex items-center gap-4 mb-12">
          <span
            className="font-mono"
            style={{ fontSize: "clamp(14px, 1.5vw, 18px)", color: "var(--color-accent-cyan)" }}
          >
            04.
          </span>
          <h2
            className="text-foreground font-bold"
            style={{ fontSize: "clamp(24px, 3vw, 36px)" }}
          >
            Implementation
          </h2>
          <div
            className="flex-1 h-px"
            style={{
              background:
                "linear-gradient(90deg, color-mix(in srgb, var(--color-accent-cyan) 30%, transparent), transparent)",
              maxWidth: "300px",
            }}
          />
        </div>

        <div className="flex flex-col gap-8">
          {implementationSteps.map((step, index) => (
            <div key={step} className="flex gap-4 items-start">
              <span
                className="shrink-0 w-8 h-8 rounded-full flex items-center justify-center font-mono"
                style={{
                  backgroundColor:
                    "color-mix(in srgb, var(--color-accent-cyan) 10%, transparent)",
                  color: "var(--color-accent-cyan)",
                  fontSize: "14px",
                }}
              >
                {index + 1}
              </span>
              <p
                className="text-foreground pt-1"
                style={{ fontSize: "clamp(15px, 1.4vw, 18px)", opacity: 0.8 }}
              >
                {step}
              </p>
            </div>
          ))}
        </div>

        {implementationMedia}
      </section>

      <section
        className="animate-section w-full"
        style={{
          padding: "clamp(60px, 10vw, 120px) clamp(40px, 8vw, 180px)",
          backgroundColor: "#F5EDFF",
          opacity: 0,
        }}
      >
        <div className="flex items-center gap-4 mb-8">
          <span
            className="font-mono"
            style={{ fontSize: "clamp(14px, 1.5vw, 18px)", color: "var(--color-accent-purple)" }}
          >
            05.
          </span>
          <h2
            className="text-foreground font-bold"
            style={{ fontSize: "clamp(24px, 3vw, 36px)" }}
          >
            Outcome
          </h2>
        </div>
        <p
          className="text-foreground leading-relaxed"
          style={{ fontSize: "clamp(18px, 2.2vw, 28px)", maxWidth: "900px" }}
        >
          {outcomePrimary}
        </p>
        {outcomeSecondary && (
          <p
            className="text-foreground leading-relaxed mt-6"
            style={{ fontSize: "clamp(16px, 1.6vw, 20px)", opacity: 0.7, maxWidth: "800px" }}
          >
            {outcomeSecondary}
          </p>
        )}
      </section>

      {postOutcome}

      <footer
        className="w-full"
        style={{
          padding: "clamp(40px, 6vw, 80px) clamp(40px, 8vw, 180px)",
          borderTop: "1px solid rgba(22, 22, 22, 0.06)",
          marginTop: "clamp(60px, 10vw, 120px)",
        }}
      >
        <div className="flex justify-between items-center">
          <Link
            href="/"
            className="flex items-center gap-3 text-foreground hover:text-primary transition-all duration-300 group"
          >
            <ArrowLeft
              size={24}
              className="transition-transform duration-300 group-hover:-translate-x-2"
            />
            <div className="flex flex-col">
              <span
                className="font-mono uppercase tracking-wider"
                style={{ fontSize: "clamp(10px, 0.9vw, 12px)", opacity: 0.5 }}
              >
                Back to
              </span>
              <span
                className="font-medium"
                style={{ fontSize: "clamp(16px, 1.5vw, 20px)" }}
              >
                Home
              </span>
            </div>
          </Link>

          <Link
            href={nextProject.href}
            className="flex items-center gap-3 text-foreground hover:text-primary transition-all duration-300 group"
          >
            <div className="flex flex-col items-end">
              <span
                className="font-mono uppercase tracking-wider"
                style={{ fontSize: "clamp(10px, 0.9vw, 12px)", opacity: 0.5 }}
              >
                Next Project
              </span>
              <span
                className="font-medium"
                style={{ fontSize: "clamp(16px, 1.5vw, 20px)" }}
              >
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
