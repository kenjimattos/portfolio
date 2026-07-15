"use client";

import { useRef, useEffect, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { prefersReducedMotion } from "@/lib/motion";

gsap.registerPlugin(ScrollTrigger, useGSAP);

export const Hero = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const nameTopRef = useRef<HTMLDivElement>(null);
  const nameBottomRef = useRef<HTMLDivElement>(null);
  const designerRef = useRef<HTMLSpanElement>(null);
  const developerRef = useRef<HTMLSpanElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);
  const noiseRef = useRef<HTMLDivElement>(null);
  const scrollIndicatorRef = useRef<HTMLDivElement>(null);
  const marqueeRef = useRef<HTMLDivElement>(null);
  const gradientRef = useRef<HTMLDivElement>(null);

  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({
        x: (e.clientX / window.innerWidth - 0.5) * 2,
        y: (e.clientY / window.innerHeight - 0.5) * 2,
      });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  useGSAP(() => {
    if (prefersReducedMotion()) {
      gsap.set(
        [
          gradientRef.current,
          nameTopRef.current,
          nameBottomRef.current,
          designerRef.current,
          developerRef.current,
          noiseRef.current,
          marqueeRef.current,
          scrollIndicatorRef.current,
        ],
        { opacity: 1, x: 0, y: 0 }
      );
      gsap.set(lineRef.current, { scaleX: 1 });
      return;
    }

    const tl = gsap.timeline({ delay: 0.3 });

    // Gradient mesh animation
    tl.fromTo(
      gradientRef.current,
      { opacity: 0, scale: 1.2 },
      { opacity: 1, scale: 1, duration: 2, ease: "power2.out" },
      0
    );

    // Name parts slide in from opposite sides
    tl.fromTo(
      nameTopRef.current,
      { x: "-100%", opacity: 0 },
      { x: "0%", opacity: 1, duration: 1.2, ease: "power4.out" },
      0.2
    )
    .fromTo(
      nameBottomRef.current,
      { x: "100%", opacity: 0 },
      { x: "0%", opacity: 1, duration: 1.2, ease: "power4.out" },
      0.3
    )
    // Diagonal line draws
    .fromTo(
      lineRef.current,
      { scaleX: 0 },
      { scaleX: 1, duration: 1, ease: "power3.out" },
      0.6
    )
    // Roles appear with stagger
    .fromTo(
      designerRef.current,
      { y: 40, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, ease: "power3.out" },
      0.8
    )
    .fromTo(
      developerRef.current,
      { y: 40, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, ease: "power3.out" },
      0.9
    )
    // Noise fades in
    .fromTo(
      noiseRef.current,
      { opacity: 0 },
      { opacity: 1, duration: 1.5 },
      0.5
    )
    // Marquee fades in
    .fromTo(
      marqueeRef.current,
      { opacity: 0 },
      { opacity: 1, duration: 0.8 },
      1
    )
    // Scroll indicator
    .fromTo(
      scrollIndicatorRef.current,
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.6 },
      1.2
    );

    // Marquee animation
    const marqueeContent = marqueeRef.current?.querySelector(".marquee-inner");
    if (marqueeContent) {
      gsap.to(marqueeContent, {
        xPercent: -50,
        duration: 30,
        ease: "none",
        repeat: -1,
      });
    }

    // Scroll indicator bounce
    const scrollLine = scrollIndicatorRef.current?.querySelector(".scroll-line");
    if (scrollLine) {
      gsap.to(scrollLine, {
        scaleY: 1.5,
        duration: 0.8,
        repeat: -1,
        yoyo: true,
        ease: "power1.inOut",
      });
    }

    // Parallax on scroll
    gsap.fromTo(
      nameTopRef.current,
      { x: "0%", opacity: 1 },
      {
        x: "-20%",
        opacity: 0.3,
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "bottom top",
          scrub: 1,
        },
      }
    );

    gsap.fromTo(
      nameBottomRef.current,
      { x: "0%", opacity: 1 },
      {
        x: "20%",
        opacity: 0.3,
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "bottom top",
          scrub: 1,
        },
      }
    );

  }, { scope: containerRef });

  const scrollToWork = () => {
    document.getElementById("work")?.scrollIntoView({ behavior: "smooth" });
  };

  const marqueeText = "PRODUCT ENGINEER • FULL-STACK • DESIGN SYSTEMS • REACT • POSTGRESQL • PRODUCT DESIGN • ";

  return (
    <div
      id="home"
      ref={containerRef}
      className="relative overflow-hidden"
      style={{ minHeight: "100dvh", backgroundColor: "#0a0a0a" }}
    >
      {/* Animated gradient mesh background */}
      <div
        ref={gradientRef}
        className="absolute inset-0 pointer-events-none"
        style={{
          opacity: 0,
          background: `
            radial-gradient(ellipse 80% 60% at ${50 + mousePos.x * 10}% ${40 + mousePos.y * 10}%, color-mix(in srgb, var(--color-primary) 15%, transparent) 0%, transparent 50%),
            radial-gradient(ellipse 60% 80% at ${80 + mousePos.x * 5}% ${60 + mousePos.y * 5}%, color-mix(in srgb, var(--color-accent-purple) 8%, transparent) 0%, transparent 50%),
            radial-gradient(ellipse 50% 50% at ${20 - mousePos.x * 5}% ${70 - mousePos.y * 5}%, color-mix(in srgb, var(--color-accent-cyan) 6%, transparent) 0%, transparent 50%)
          `,
          transition: "background 0.5s ease-out",
        }}
      />

      {/* Noise texture overlay */}
      <div
        ref={noiseRef}
        className="absolute inset-0 pointer-events-none"
        style={{
          opacity: 0,
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
          mixBlendMode: "overlay",
          filter: "contrast(150%) brightness(100%)",
        }}
      />

      {/* Subtle vignette */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: "radial-gradient(ellipse at center, transparent 40%, rgba(0,0,0,0.4) 100%)",
        }}
      />

      {/* Main content */}
      <div
        className="relative z-10 flex flex-col justify-center"
        style={{ minHeight: "100dvh", padding: "clamp(80px, 12vw, 140px) clamp(40px, 8vw, 180px)" }}
      >
        {/* Top section - KN */}
        <div
          ref={nameTopRef}
          className="flex items-end justify-between"
          style={{ opacity: 0 }}
        >
          <h1
            className="leading-none"
            style={{
              fontSize: "clamp(80px, 22vw, 320px)",
              letterSpacing: "-0.02em",
              fontFamily: "var(--font-gravitas)",
              color: "transparent",
              WebkitTextStroke: "1px rgba(255, 255, 249, 0.3)",
              textShadow: "0 0 80px color-mix(in srgb, var(--color-primary) 30%, transparent)",
            }}
          >
            kn
          </h1>
          <span
            ref={designerRef}
            className="font-light mb-4 hidden md:block"
            style={{
              fontSize: "clamp(14px, 1.5vw, 20px)",
              letterSpacing: "0.3em",
              textTransform: "uppercase",
              opacity: 0,
              writingMode: "vertical-rl",
              textOrientation: "mixed",
              color: "rgba(255, 255, 249, 0.5)",
            }}
          >
            Design
          </span>
        </div>

        {/* Center diagonal line */}
        <div className="relative my-4 md:my-8 flex items-center justify-center">
          <div
            ref={lineRef}
            className="origin-left"
            style={{
              width: "clamp(100px, 30vw, 400px)",
              height: "2px",
              background: "linear-gradient(90deg, var(--color-primary), var(--color-accent-purple))",
              transform: "scaleX(0) rotate(-5deg)",
              boxShadow: "0 0 20px color-mix(in srgb, var(--color-primary) 50%, transparent)",
            }}
          />
          {/* Mobile roles */}
          <div className="absolute left-0 right-0 flex justify-between md:hidden px-2">
            <span
              style={{ color: "rgba(255, 255, 249, 0.4)", fontSize: "12px", textTransform: "uppercase", letterSpacing: "0.2em" }}
            >
              Design
            </span>
            <span
              style={{ color: "rgba(255, 255, 249, 0.4)", fontSize: "12px", textTransform: "uppercase", letterSpacing: "0.2em" }}
            >
              Engineering
            </span>
          </div>
        </div>

        {/* Bottom section - JI */}
        <div
          ref={nameBottomRef}
          className="flex items-start justify-between"
          style={{ opacity: 0 }}
        >
          <span
            ref={developerRef}
            className="font-light mt-4 hidden md:block"
            style={{
              fontSize: "clamp(14px, 1.5vw, 20px)",
              letterSpacing: "0.3em",
              textTransform: "uppercase",
              opacity: 0,
              writingMode: "vertical-rl",
              textOrientation: "mixed",
              transform: "rotate(180deg)",
              color: "rgba(255, 255, 249, 0.5)",
            }}
          >
            Engineering
          </span>
          <h1
            className="leading-none text-right"
            style={{
              fontSize: "clamp(80px, 22vw, 320px)",
              letterSpacing: "-0.02em",
              fontFamily: "var(--font-gravitas)",
              color: "transparent",
              WebkitTextStroke: "1px rgba(255, 255, 249, 0.3)",
              textShadow: "0 0 80px color-mix(in srgb, var(--color-primary) 30%, transparent)",
            }}
          >
            ji<span style={{ color: "var(--color-primary)", WebkitTextStroke: "none", textShadow: "0 0 40px color-mix(in srgb, var(--color-primary) 80%, transparent)" }}>.</span>
          </h1>
        </div>

        {/* Tagline */}
        <div
          className="mt-8 md:mt-16 flex flex-col md:flex-row md:items-end md:justify-between gap-6"
        >
          <p
            style={{
              fontSize: "clamp(14px, 1.5vw, 18px)",
              lineHeight: 1.7,
              color: "rgba(255, 255, 249, 0.5)",
              maxWidth: "28rem",
            }}
          >
            I design, build, and ship products end to end — interface, business logic, database, and deploy.
          </p>
          <button
            onClick={scrollToWork}
            className="group flex items-center gap-4 transition-colors duration-300"
            style={{ fontSize: "clamp(13px, 1.2vw, 15px)", color: "rgba(255, 255, 249, 0.7)" }}
          >
            <span className="uppercase tracking-widest group-hover:text-primary transition-colors">View Work</span>
            <svg
              width="40"
              height="12"
              viewBox="0 0 40 12"
              fill="none"
              className="transition-transform duration-300 group-hover:translate-x-2"
            >
              <path
                d="M0 6H38M38 6L33 1M38 6L33 11"
                stroke="currentColor"
                strokeWidth="1.5"
                className="group-hover:stroke-primary transition-colors"
              />
            </svg>
          </button>
        </div>
      </div>

      {/* Bottom marquee */}
      <div
        ref={marqueeRef}
        className="absolute bottom-0 left-0 right-0 overflow-hidden"
        style={{
          borderTop: "1px solid rgba(255, 255, 249, 0.04)",
          opacity: 0,
        }}
      >
        <div className="py-4 marquee-inner whitespace-nowrap inline-block">
          <span
            className="font-medium"
            style={{
              fontSize: "clamp(12px, 1.2vw, 14px)",
              letterSpacing: "0.2em",
              color: "rgba(255, 255, 249, 0.1)",
            }}
          >
            {marqueeText.repeat(10)}
          </span>
        </div>
      </div>

      {/* Scroll indicator */}
      <div
        ref={scrollIndicatorRef}
        className="absolute left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 cursor-pointer"
        style={{ bottom: "clamp(60px, 8vw, 100px)", opacity: 0 }}
        onClick={scrollToWork}
      >
        <span
          className="uppercase tracking-widest"
          style={{ fontSize: "clamp(9px, 0.8vw, 11px)", color: "rgba(255, 255, 249, 0.3)" }}
        >
          Scroll
        </span>
        <div
          className="scroll-line w-px origin-top"
          style={{ height: "40px", backgroundColor: "rgba(255, 255, 249, 0.2)" }}
        />
      </div>

      {/* Corner decorations with glow */}
      <div
        className="absolute top-8 left-8 w-12 h-12 pointer-events-none hidden md:block"
        style={{
          borderLeft: "1px solid color-mix(in srgb, var(--color-primary) 30%, transparent)",
          borderTop: "1px solid color-mix(in srgb, var(--color-primary) 30%, transparent)",
          boxShadow: "-4px -4px 20px color-mix(in srgb, var(--color-primary) 10%, transparent)",
        }}
      />
      <div
        className="absolute bottom-8 right-8 w-12 h-12 pointer-events-none hidden md:block"
        style={{
          borderRight: "1px solid color-mix(in srgb, var(--color-accent-cyan) 30%, transparent)",
          borderBottom: "1px solid color-mix(in srgb, var(--color-accent-purple) 30%, transparent)",
          boxShadow: "4px 4px 20px color-mix(in srgb, var(--color-accent-purple) 10%, transparent)",
        }}
      />
    </div>
  );
};
