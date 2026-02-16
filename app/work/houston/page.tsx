"use client";

import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { ArrowLeft, ArrowUp, ExternalLink } from "lucide-react";

gsap.registerPlugin(ScrollTrigger, useGSAP);

const tags = ["Front-end", "Back-end", "Product", "Architecture", "Engineering"];

export default function HoustonPage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLElement>(null);
  const heroContentRef = useRef<HTMLDivElement>(null);
  const overviewRef = useRef<HTMLElement>(null);
  const challengeRef = useRef<HTMLElement>(null);
  const solutionRef = useRef<HTMLElement>(null);
  const featuresRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    // Hero animation
    const heroTl = gsap.timeline({ delay: 0.2 });
    const heroContent = heroContentRef.current;

    if (heroContent) {
      const h1 = heroContent.querySelector("h1");
      const heroSubtitle = heroContent.querySelector(".hero-subtitle");
      const heroImage = heroContent.querySelector(".hero-image");
      const heroRole = heroContent.querySelector(".hero-role");

      if (h1) {
        heroTl.fromTo(
          h1,
          { y: 60, opacity: 0 },
          { y: 0, opacity: 1, duration: 1, ease: "power3.out" }
        );
      }
      if (heroSubtitle) {
        heroTl.fromTo(
          heroSubtitle,
          { y: 40, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.8, ease: "power3.out" },
          "-=0.6"
        );
      }
      if (heroImage) {
        heroTl.fromTo(
          heroImage,
          { y: 80, opacity: 0, scale: 0.95 },
          { y: 0, opacity: 1, scale: 1, duration: 1.2, ease: "power3.out" },
          "-=0.5"
        );
      }
      if (heroRole) {
        heroTl.fromTo(
          heroRole,
          { y: 30, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.6, ease: "power3.out" },
          "-=0.8"
        );
      }
    }

    // Overview section animation
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

    // Challenge section animation
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

    // Solution section animation
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

    // Feature cards stagger animation
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

    // All other sections
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

  }, { scope: containerRef });

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div ref={containerRef} className="min-h-screen bg-background">
      {/* Fixed Header */}
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

      {/* Hero Section */}
      <section
        ref={heroRef}
        id="top"
        className="relative w-full overflow-hidden"
        style={{
          minHeight: "100vh",
          paddingTop: "clamp(100px, 12vw, 140px)",
          background: "linear-gradient(180deg, #F5EDFF 0%, #F5EDFF 70%, var(--background) 100%)",
        }}
      >
        {/* Decorative gradient mesh */}
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
          {/* Left side - Text content */}
          <div className="flex flex-col justify-center">
            {/* Title */}
            <h1
              className="text-foreground font-bold leading-none"
              style={{
                fontSize: "clamp(48px, 8vw, 100px)",
                opacity: 0,
              }}
            >
              Houston
            </h1>

            {/* Subtitle */}
            <p
              className="hero-subtitle text-foreground mt-6"
              style={{
                fontSize: "clamp(16px, 1.8vw, 22px)",
                maxWidth: "500px",
                opacity: 0.7,
              }}
            >
              A production-grade operational platform designed to manage
              medical shift operations at scale.
            </p>

            {/* My Role */}
            <div className="hero-role mt-8" style={{ opacity: 0 }}>
              <span
                className="text-foreground font-mono uppercase tracking-wider"
                style={{ fontSize: "clamp(11px, 1vw, 13px)", opacity: 0.5 }}
              >
                My Role
              </span>
              <div className="flex flex-wrap gap-2 mt-3">
                {tags.map((tag, index) => {
                  const tagColors = [
                    { border: "color-mix(in srgb, var(--color-accent-purple) 40%, transparent)", text: "var(--color-accent-purple)" },
                    { border: "color-mix(in srgb, var(--color-accent-cyan) 40%, transparent)", text: "var(--color-accent-cyan-dark)" },
                    { border: "color-mix(in srgb, var(--color-primary) 40%, transparent)", text: "var(--color-primary)" },
                  ];
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

          {/* Right side - Hero Image */}
          <div
            className="hero-image relative flex justify-center lg:justify-end"
            style={{ opacity: 0 }}
          >
            <Image
              src="/img/houston/hero-laptop.png"
              alt="Houston app screen"
              width={915}
              height={556}
              className="relative z-10"
              style={{
                maxWidth: "clamp(500px, 80vw, 900px)",
                height: "auto",
              }}
              priority
            />
          </div>
        </div>

        {/* Decorative corner */}
        <div
          className="absolute top-24 right-8 w-16 h-16 pointer-events-none hidden lg:block"
          style={{
            borderRight: "1px solid color-mix(in srgb, var(--color-accent-purple) 40%, transparent)",
            borderTop: "1px solid color-mix(in srgb, var(--color-accent-purple) 40%, transparent)",
          }}
        />
      </section>

      {/* Overview Section */}
      <section
        ref={overviewRef}
        className="w-full"
        style={{
          padding: "clamp(60px, 10vw, 120px) clamp(40px, 8vw, 180px)",
          opacity: 0,
        }}
      >
        {/* Section Header */}
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
              background: "linear-gradient(90deg, color-mix(in srgb, var(--color-accent-purple) 30%, transparent), transparent)",
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
          {/* Description */}
          <div className="flex flex-col gap-6">
            <p
              className="text-foreground leading-relaxed"
              style={{ fontSize: "clamp(18px, 2vw, 24px)" }}
            >
              I led the evolution of an internal support tool into a production-grade
              operational platform used to manage medical shift operations at scale.
            </p>
            <p
              className="text-foreground leading-relaxed"
              style={{ fontSize: "clamp(15px, 1.5vw, 18px)", opacity: 0.7 }}
            >
              Houston is a web application used by hospitals and staffing teams to plan schedules,
              manage candidates, control attendance, and handle payments in one place.
            </p>
          </div>
        </div>

        {/* Context */}
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
            The platform supports complex workflows while remaining efficient, reliable,
            and easy to operate on a daily basis.
          </p>
        </div>
      </section>

      {/* Challenge Section */}
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
          {/* Text */}
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
            <p
              className="text-foreground leading-relaxed"
              style={{ fontSize: "clamp(16px, 1.6vw, 20px)" }}
            >
              Houston started as a simple support tool for managing job postings and applications
              coming from the mobile app. As operations grew, this approach no longer scaled.
            </p>
            <p
              className="text-foreground leading-relaxed"
              style={{ fontSize: "clamp(15px, 1.4vw, 18px)", opacity: 0.7 }}
            >
              Hiring teams needed visibility, control, and automation across the entire lifecycle
              of medical shifts. The challenge was to transform an early tool into a robust,
              multi-tenant platform capable of handling real-world operational complexity
              without slowing teams down.
            </p>
          </div>

          {/* Old Version Image */}
          <div className="flex flex-col items-center gap-4">
            <div className="relative rounded-lg overflow-hidden">
              <Image
                src="/img/houston/first-version.png"
                alt="Houston first version"
                width={1210}
                height={730}
                style={{ maxWidth: "100%", height: "auto" }}
              />
            </div>
            <span
              className="text-foreground font-mono"
              style={{ fontSize: "clamp(11px, 1vw, 13px)", opacity: 0.5 }}
            >
              Previous version of Houston
            </span>
          </div>
        </div>
      </section>

      {/* Solution Image */}
      <section className="animate-section w-full" style={{ opacity: 0 }}>
        <Image
          className="w-full"
          src="/img/houston/solution.png"
          alt="Houston solution"
          width={2880}
          height={1520}
        />
      </section>

      {/* Solution Section */}
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
              background: "linear-gradient(90deg, color-mix(in srgb, var(--color-primary) 30%, transparent), transparent)",
              maxWidth: "300px",
            }}
          />
        </div>
        <p
          className="text-foreground leading-relaxed"
          style={{ fontSize: "clamp(18px, 2.2vw, 28px)" }}
        >
          A platform designed around operational clarity and scalability.
          Centralizing scheduling, applications, attendance validation, payments,
          and reporting into a single system.
        </p>
      </section>

      {/* Features Section */}
      <div
        ref={featuresRef}
        className="w-full"
        style={{ padding: "0 clamp(40px, 8vw, 180px)" }}
      >
        {/* Operational Dashboard Feature */}
        <section
          className="feature-card w-full mb-24"
          style={{ opacity: 0 }}
        >
          <div className="flex items-center gap-4 mb-8">
            <div className="feature-badge feature-badge--purple">01</div>
            <h3
              className="text-foreground font-semibold"
              style={{ fontSize: "clamp(20px, 2.5vw, 32px)" }}
            >
              Operational Dashboard
            </h3>
          </div>
          <p
            className="text-foreground leading-relaxed mb-8"
            style={{ fontSize: "clamp(15px, 1.4vw, 18px)", opacity: 0.7, maxWidth: "700px" }}
          >
            A real-time overview of open and filled shifts, pending applications,
            operational risk, and payroll totals, with global month-based filtering.
          </p>
          <div className="rounded-lg overflow-hidden">
            <Image
              src="/img/houston/dasboard.png"
              alt="Operational Dashboard"
              width={954}
              height={603}
              className="w-full"
            />
          </div>
        </section>

        {/* Schedule Builder Feature */}
        <section
          className="feature-card w-full mb-24"
          style={{ opacity: 0 }}
        >
          <div className="flex items-center gap-4 mb-8">
            <div className="feature-badge feature-badge--cyan">02</div>
            <h3
              className="text-foreground font-semibold"
              style={{ fontSize: "clamp(20px, 2.5vw, 32px)" }}
            >
              Schedule Builder
            </h3>
          </div>
          <p
            className="text-foreground leading-relaxed mb-8"
            style={{ fontSize: "clamp(15px, 1.4vw, 18px)", opacity: 0.7, maxWidth: "700px" }}
          >
            An interactive grid-based interface for creating and managing
            medical schedules. Supports drag and drop creation, resizing,
            duplication, conflict detection, and batch publishing of shifts.
          </p>
          <div className="relative">
            <Image
              src="/img/houston/schedule.png"
              alt="Schedule Builder"
              width={954}
              height={603}
              className="w-full rounded-lg"
            />
            <Image
              src="/img/houston/schedule.gif"
              alt="Schedule Builder animation"
              width={757}
              height={321}
              className="absolute w-[60%] h-auto"
              style={{
                borderRadius: "clamp(4px, 1vw, 10px)",
                borderWidth: "clamp(0.5px, 0.2vw, 2px)",
                borderStyle: "solid",
                borderColor: "#A369ED",
                right: "0",
                bottom: "clamp(40px, 60%, 80px)",
              }}
              unoptimized
            />
          </div>
        </section>

        {/* Job & Application Management Feature */}
        <section
          className="feature-card w-full mb-24"
          style={{ opacity: 0 }}
        >
          <div className="flex items-center gap-4 mb-8">
            <div className="feature-badge feature-badge--primary">03</div>
            <h3
              className="text-foreground font-semibold"
              style={{ fontSize: "clamp(20px, 2.5vw, 32px)" }}
            >
              Job & Application Management
            </h3>
          </div>
          <p
            className="text-foreground leading-relaxed mb-8"
            style={{ fontSize: "clamp(15px, 1.4vw, 18px)", opacity: 0.7, maxWidth: "700px" }}
          >
            Centralized management of job postings and applications with bulk actions,
            recurrence handling, and conflict validation.
          </p>
          <div className="rounded-lg overflow-hidden">
            <Image
              src="/img/houston/application.png"
              alt="Job & Application Management"
              width={1826}
              height={1360}
              className="w-full"
            />
          </div>
        </section>

        {/* Shift Calendar Feature */}
        <section
          className="feature-card w-full mb-24"
          style={{ opacity: 0 }}
        >
          <div className="flex items-center gap-4 mb-8">
            <div className="feature-badge feature-badge--purple">04</div>
            <h3
              className="text-foreground font-semibold"
              style={{ fontSize: "clamp(20px, 2.5vw, 32px)" }}
            >
              Shift Calendar
            </h3>
          </div>
          <p
            className="text-foreground leading-relaxed mb-8"
            style={{ fontSize: "clamp(15px, 1.4vw, 18px)", opacity: 0.7, maxWidth: "700px" }}
          >
            Custom calendar views for weekly, monthly, and daily management,
            with quick actions, candidate assignment, and status tracking.
          </p>
          <div className="rounded-lg overflow-hidden">
            <Image
              src="/img/houston/calendar.png"
              alt="Shift Calendar"
              width={1466}
              height={1020}
              className="w-full"
            />
          </div>
        </section>

        {/* Attendance & Payments Feature */}
        <section
          className="feature-card w-full mb-24"
          style={{ opacity: 0 }}
        >
          <div className="flex items-center gap-4 mb-8">
            <div className="feature-badge feature-badge--cyan">05</div>
            <h3
              className="text-foreground font-semibold"
              style={{ fontSize: "clamp(20px, 2.5vw, 32px)" }}
            >
              Attendance & Payments
            </h3>
          </div>
          <p
            className="text-foreground leading-relaxed mb-8"
            style={{ fontSize: "clamp(15px, 1.4vw, 18px)", opacity: 0.7, maxWidth: "700px" }}
          >
            Integrated check-in and check-out control with approval flows,
            payment authorization, and batch operations for large volumes of shifts.
          </p>
          <div className="rounded-lg overflow-hidden">
            <Image
              src="/img/houston/payments.png"
              alt="Attendance & Payments"
              width={954}
              height={603}
              className="w-full"
            />
          </div>
        </section>

        {/* Doctors & Teams Feature */}
        <section
          className="feature-card w-full mb-24"
          style={{ opacity: 0 }}
        >
          <div
            className="grid gap-8 items-center"
            style={{
              gridTemplateColumns: "1.2fr 1fr",
            }}
          >
            <div className="flex flex-col gap-6">
              <div className="flex items-center gap-4">
                <div className="feature-badge feature-badge--primary">06</div>
                <h3
                  className="text-foreground font-semibold"
                  style={{ fontSize: "clamp(20px, 2.5vw, 32px)" }}
                >
                  Doctors & Teams
                </h3>
              </div>
              <p
                className="text-foreground leading-relaxed"
                style={{ fontSize: "clamp(15px, 1.4vw, 18px)", opacity: 0.7 }}
              >
                Management of medical staff, teams, favorites, and pre-registered doctors,
                enabling faster assignments and better organization.
              </p>
              <div
                className="h-px"
                style={{
                  background: "linear-gradient(90deg, color-mix(in srgb, var(--color-primary) 40%, transparent), transparent)",
                  maxWidth: "200px",
                }}
              />
            </div>
            <div className="rounded-lg overflow-hidden">
              <Image
                src="/img/houston/teams.png"
                alt="Doctors & Teams"
                width={653}
                height={493}
                className="w-full"
              />
            </div>
          </div>
        </section>

        {/* Reports & Insights Feature */}
        <section
          className="feature-card w-full mb-24"
          style={{ opacity: 0 }}
        >
          <div
            className="grid gap-8 items-center"
            style={{
              gridTemplateColumns: "1fr 1.2fr",
            }}
          >
            <div className="flex flex-col gap-6">
              <div className="flex items-center gap-4">
                <div className="feature-badge feature-badge--purple">07</div>
                <h3
                  className="text-foreground font-semibold"
                  style={{ fontSize: "clamp(20px, 2.5vw, 32px)" }}
                >
                  Reports & Insights
                </h3>
              </div>
              <p
                className="text-foreground leading-relaxed"
                style={{ fontSize: "clamp(15px, 1.4vw, 18px)", opacity: 0.7 }}
              >
                Operational and financial reports covering payroll, productivity,
                schedules, and exports, with unified filtering across the platform.
              </p>
              <div
                className="h-px"
                style={{
                  background: "linear-gradient(90deg, color-mix(in srgb, var(--color-accent-purple) 40%, transparent), transparent)",
                  maxWidth: "200px",
                }}
              />
            </div>
            <div className="rounded-lg overflow-hidden">
              <Image
                src="/img/houston/reports.png"
                alt="Reports & Insights"
                width={1929}
                height={1873}
                className="w-full"
              />
            </div>
          </div>
        </section>

        {/* Access Control & Permissions Feature */}
        <section
          className="feature-card w-full mb-24"
          style={{ opacity: 0 }}
        >
          <div
            className="grid gap-8 items-center"
            style={{
              gridTemplateColumns: "1.2fr 1fr",
            }}
          >
            <div className="flex flex-col gap-6">
              <div className="flex items-center gap-4">
                <div className="feature-badge feature-badge--cyan">08</div>
                <h3
                  className="text-foreground font-semibold"
                  style={{ fontSize: "clamp(20px, 2.5vw, 32px)" }}
                >
                  Access Control & Permissions
                </h3>
              </div>
              <p
                className="text-foreground leading-relaxed"
                style={{ fontSize: "clamp(15px, 1.4vw, 18px)", opacity: 0.7 }}
              >
                As Houston evolved into a multi-tenant platform, access control became
                a core requirement. I led the implementation of role-based access control (RBAC)
                to manage permissions across schedules, applications, attendance, and payments.
              </p>
              <p
                className="text-foreground leading-relaxed"
                style={{ fontSize: "clamp(14px, 1.3vw, 16px)", opacity: 0.6 }}
              >
                Permissions are enforced consistently across frontend flows and backend validation,
                supporting multiple organizations and roles while keeping daily operations simple.
              </p>
              <div
                className="h-px"
                style={{
                  background: "linear-gradient(90deg, color-mix(in srgb, var(--color-accent-cyan) 40%, transparent), transparent)",
                  maxWidth: "200px",
                }}
              />
            </div>
            <div className="rounded-lg overflow-hidden">
              <Image
                src="/img/houston/access-control.png"
                alt="Access Control & Permissions"
                width={480}
                height={638}
                className="w-full"
              />
            </div>
          </div>
        </section>
      </div>

      {/* Implementation Section */}
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
              background: "linear-gradient(90deg, color-mix(in srgb, var(--color-accent-cyan) 30%, transparent), transparent)",
              maxWidth: "300px",
            }}
          />
        </div>

        {/* Implementation Steps */}
        <div className="flex flex-col gap-8">
          {[
            "Took ownership of the web platform's development and later coordinated a small team of three engineers",
            "Established workflows, code standards, and review practices as the system grew in complexity",
            "Implemented and refactored core business rules directly at the database level using PostgreSQL",
            "Managed the full lifecycle of database migrations, ensuring data consistency across environments",
            "Implemented a complete CI/CD pipeline to ensure reliability and fast iteration",
            "Designed frontend flows tightly coupled to backend validation rules, reducing errors and manual intervention",
            "Structured the system to support multi-tenant usage with role-based access control across teams",
          ].map((step, index) => (
            <div
              key={index}
              className="flex gap-4 items-start"
            >
              <span
                className="shrink-0 w-8 h-8 rounded-full flex items-center justify-center font-mono"
                style={{
                  backgroundColor: "color-mix(in srgb, var(--color-accent-cyan) 10%, transparent)",
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

        {/* Implementation Images */}
        <div className="mt-12 flex flex-col gap-8">
          <div className="rounded-lg overflow-hidden">
            <Image
              src="/img/houston/github.png"
              alt="GitHub code"
              width={1080}
              height={742}
              className="w-full"
            />
          </div>
          <div className="rounded-lg overflow-hidden">
            <Image
              src="/img/houston/database.png"
              alt="Database migrations"
              width={1080}
              height={796}
              className="w-full"
            />
          </div>
          <div className="rounded-lg overflow-hidden">
            <Image
              src="/img/houston/ci-cd.png"
              alt="CI/CD pipeline"
              width={1080}
              height={595}
              className="w-full"
            />
          </div>
        </div>
      </section>

      {/* Outcome Section */}
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
          Houston evolved into a production-grade operational platform used to manage
          the full lifecycle of medical shifts. The system reduced manual work,
          improved visibility for hiring teams, and supported the company&apos;s growth
          with a scalable and maintainable foundation.
        </p>
      </section>

      {/* Outcome Image */}
      <section
        className="animate-section w-full"
        style={{ padding: "0 clamp(8px, 1vw, 15px)", opacity: 0 }}
      >
        <div className="rounded-lg overflow-hidden">
          <Image
            className="w-full"
            src="/img/houston/outcome.png"
            alt="Houston outcome"
            width={1441}
            height={960}
          />
        </div>
      </section>

      {/* Footer Navigation */}
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
            href="/work/revoluna"
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
                Revoluna
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
