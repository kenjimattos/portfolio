"use client";

import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { ArrowLeft, ArrowUp, ExternalLink } from "lucide-react";

gsap.registerPlugin(ScrollTrigger, useGSAP);

const tags = ["Design", "Prototype", "Front-end", "Back-end", "Mobile"];

export default function RevolunaPage() {
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
              Revoluna
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
              A mobile-first product designed to bring clarity and structure
              to medical shift management in Brazil.
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
              src="/img/revoluna/hero-phones.png"
              alt="Revoluna app screens"
              width={800}
              height={900}
              className="relative z-10"
              style={{
                maxHeight: "clamp(500px, 85vh, 800px)",
                width: "auto",
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
          {/* Role */}
          {/* <div className="flex flex-col gap-4">
            <span
              className="text-foreground font-mono uppercase tracking-wider"
              style={{ fontSize: "clamp(11px, 1vw, 13px)", opacity: 0.5 }}
            >
              My Role
            </span>
            <div className="flex flex-wrap gap-2">
              {tags.map((tag, index) => {
                const tagColors = [
                  { bg: "color-mix(in srgb, var(--color-accent-purple) 8%, transparent)", text: "var(--color-accent-purple)" },
                  { bg: "color-mix(in srgb, var(--color-accent-cyan) 8%, transparent)", text: "var(--color-accent-cyan)" },
                  { bg: "color-mix(in srgb, var(--color-primary) 8%, transparent)", text: "var(--color-primary)" },
                ];
                const color = tagColors[index % 3];
                return (
                  <span
                    key={tag}
                    className="px-3 py-1.5 rounded-sm font-medium"
                    style={{
                      fontSize: "clamp(13px, 1.2vw, 15px)",
                      backgroundColor: color.bg,
                      color: color.text,
                    }}
                  >
                    {tag}
                  </span>
                );
              })}
            </div>
          </div> */}

          {/* Description */}
          <div className="flex flex-col gap-6">
            <p
              className="text-foreground leading-relaxed"
              style={{ fontSize: "clamp(18px, 2vw, 24px)" }}
            >
              I joined the project as a Product Designer with the goal of redesigning the experience
              and helping the team validate the product in the real world.
            </p>
            <p
              className="text-foreground leading-relaxed"
              style={{ fontSize: "clamp(15px, 1.5vw, 18px)", opacity: 0.7 }}
            >
              Beyond design, I took ownership of shipping a functional MVP to the App Store and Google Play,
              enabling real usage, early traction, and product validation.
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
            Medical shifts in Brazil are usually shared through unstructured channels
            like WhatsApp groups. Information is scattered, incomplete, and difficult to track.
            Doctors struggle to manage applications, schedules, and payments,
            while hiring teams rely on manual workflows that are inefficient and error-prone.
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
              The challenge was to redesign the experience and expand the product beyond a
              simple listing, introducing features that could support real operational workflows and daily usage.
            </p>
          </div>

          {/* Old Version Image */}
          <div className="flex flex-col items-center gap-4">
            <div
              className="relative rounded-lg overflow-hidden"
            >
              <Image
                src="/img/revoluna/first-version.png"
                alt="Revoluna first version"
                width={269}
                height={545}
                style={{ maxWidth: "clamp(180px, 20vw, 269px)", height: "auto" }}
              />
            </div>
            <span
              className="text-foreground font-mono"
              style={{ fontSize: "clamp(11px, 1vw, 13px)", opacity: 0.5 }}
            >
              First version of the app
            </span>
          </div>
        </div>
      </section>

      {/* Solution Image */}
      <section className="animate-section w-full" style={{ opacity: 0 }}>
        <Image
          className="w-full"
          src="/img/revoluna/solution.png"
          alt="Revoluna solution"
          width={2880}
          height={1560}
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
          A redesigned mobile experience focused on organization, visibility, and control.
          The MVP introduced structured shift discovery, clearer scheduling, and automation
          of key operational steps that were previously manual.
        </p>
      </section>

      {/* Features Section */}
      <div
        ref={featuresRef}
        className="w-full"
        style={{ padding: "0 clamp(40px, 8vw, 180px)" }}
      >
        {/* Explore Feature */}
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
              Explore
            </h3>
          </div>
          <p
            className="text-foreground leading-relaxed mb-8"
            style={{ fontSize: "clamp(15px, 1.4vw, 18px)", opacity: 0.7, maxWidth: "700px" }}
          >
            Doctors can browse available shifts with clear details such as location, schedule, and payment, making it easier to find relevant opportunities quickly.
          </p>
          <div
            className="rounded-lg overflow-hidden"
          >
            <Image
              src="/img/revoluna/explore.png"
              alt="Explore feature"
              width={1055}
              height={621}
              className="w-full"
            />
          </div>
        </section>

        {/* Schedule Feature */}
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
            <Image
              src="/img/revoluna/schedule.png"
              alt="Schedule screen"
              width={439}
              height={598}
              className="rounded-lg"
              style={{
                maxWidth: "clamp(280px, 40vw, 500px)",
                height: "auto",
              }}
            />
            <div className="flex flex-col gap-6">
              <div className="flex items-center gap-4">
                <div className="feature-badge feature-badge--cyan">02</div>
                <h3
                  className="text-foreground font-semibold"
                  style={{ fontSize: "clamp(20px, 2.5vw, 32px)" }}
                >
                  My Schedule
                </h3>
              </div>
              <p
                className="text-foreground leading-relaxed"
                style={{ fontSize: "clamp(15px, 1.4vw, 18px)", opacity: 0.7 }}
              >
                A consolidated view of upcoming shifts, including visibility into when colleagues from the same hospital are also on duty.
              </p>
              <div
                className="h-px"
                style={{
                  background: "linear-gradient(90deg, color-mix(in srgb, var(--color-accent-cyan) 40%, transparent), transparent)",
                  maxWidth: "200px",
                }}
              />
            </div>
          </div>
        </section>

        {/* Notifications Feature */}
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
                <div className="feature-badge feature-badge--primary">03</div>
                <h3
                  className="text-foreground font-semibold"
                  style={{ fontSize: "clamp(20px, 2.5vw, 32px)" }}
                >
                  Notifications
                </h3>
              </div>
              <p
                className="text-foreground leading-relaxed"
                style={{ fontSize: "clamp(15px, 1.4vw, 18px)", opacity: 0.7 }}
              >
                Built with Firebase Cloud Messaging to support application updates, schedule alerts, and check-in and check-out reminders.
              </p>
              <div
                className="h-px"
                style={{
                  background: "linear-gradient(90deg, color-mix(in srgb, var(--color-primary) 40%, transparent), transparent)",
                  maxWidth: "200px",
                }}
              />
            </div>
            <Image
              src="/img/revoluna/notifications.png"
              alt="Notifications screen"
              width={845}
              height={1110}
              className="rounded-lg justify-self-end"
              style={{
                maxWidth: "clamp(280px, 40vw, 500px)",
                height: "auto",
              }}
            />
          </div>
        </section>

        {/* Transfer Feature */}
        <section
          className="feature-card w-full mb-24"
          style={{ opacity: 0 }}
        >
          <div
            className="grid gap-8 items-center"
            style={{
              gridTemplateColumns: "minmax(200px, 400px) 1fr",
            }}
          >
            <div className="flex flex-col gap-6">
              <div className="flex items-center gap-4">
                <div className="feature-badge feature-badge--purple">04</div>
                <h3
                  className="text-foreground font-semibold"
                  style={{ fontSize: "clamp(20px, 2.5vw, 32px)" }}
                >
                  Shift Transfer
                </h3>
              </div>
              <p
                className="text-foreground leading-relaxed"
                style={{ fontSize: "clamp(15px, 1.4vw, 18px)", opacity: 0.7 }}
              >
                Doctors can make a scheduled shift available so colleagues from the same group can take over when needed.
              </p>
            </div>
            <div className="rounded-lg overflow-hidden">
              <Image
                src="/img/revoluna/transfer.png"
                alt="Transfer feature"
                width={1081}
                height={1008}
                className="w-full"
              />
            </div>
          </div>
        </section>

        {/* Check-in/Check-out Feature */}
        <section
          className="feature-card w-full mb-24"
          style={{
            opacity: 0,
            marginRight: "calc(-1 * clamp(40px, 8vw, 180px))",
          }}
        >
          <div
            className="grid gap-8 items-center"
            style={{
              gridTemplateColumns: "1fr minmax(300px, 50%)",
            }}
          >
            <div className="flex flex-col gap-6">
              <div className="flex items-center gap-4">
                <div className="feature-badge feature-badge--cyan">05</div>
                <h3
                  className="text-foreground font-semibold"
                  style={{ fontSize: "clamp(20px, 2.5vw, 32px)" }}
                >
                  Check In-Out
                </h3>
              </div>
              <p
                className="text-foreground leading-relaxed"
                style={{ fontSize: "clamp(15px, 1.4vw, 18px)", opacity: 0.7 }}
              >
                Reminders guide doctors through check-in and check-out within defined time windows. Validation is completed only within a 100-meter radius of the hospital, ensuring payroll accuracy while minimizing battery usage.
              </p>
            </div>
            <div
              className="rounded-l-lg overflow-hidden flex justify-end"
              style={{
                maxHeight: "clamp(400px, 50vw, 700px)",
              }}
            >
              <Image
                src="/img/revoluna/checkin-checkout.png"
                alt="Check-in and Check-out screens"
                width={800}
                height={600}
                style={{
                  width: "100%",
                  height: "auto",
                  marginTop: "-30%"
                }}
              />
            </div>
          </div>
        </section>

        {/* Deep Linking Feature */}
        <section
          className="feature-card w-full mb-24"
          style={{
            opacity: 0,
            marginRight: "calc(-1 * clamp(40px, 8vw, 180px))",
          }}
        >
          <div
            className="grid gap-8 items-center"
            style={{
              gridTemplateColumns: "1fr minmax(300px, 50%)",
            }}
          >
            <div className="flex flex-col gap-6">
              <div className="flex items-center gap-4">
                <div className="feature-badge feature-badge--primary">06</div>
                <h3
                  className="text-foreground font-semibold"
                  style={{ fontSize: "clamp(20px, 2.5vw, 32px)" }}
                >
                  Deep Linking
                </h3>
              </div>
              <p
                className="text-foreground leading-relaxed"
                style={{ fontSize: "clamp(15px, 1.4vw, 18px)", opacity: 0.7 }}
              >
                Implemented deep links that route users directly to specific shift details inside the app. Links can be generated from both the web admin platform and the mobile app, enabling seamless sharing and improving discovery and conversion.
              </p>
            </div>
            <div
              className="rounded-l-lg overflow-hidden flex justify-end"
              style={{
                maxHeight: "clamp(400px, 50vw, 700px)",
              }}
            >
              <Image
                src="/img/revoluna/deeplink.png"
                alt="Deep linking screens"
                width={800}
                height={600}
                style={{
                  width: "100%",
                  height: "auto",
                }}
              />
            </div>
          </div>
        </section>
      </div>

      {/* Login and Subscription */}
      <section className="animate-section w-full" style={{ opacity: 0, padding: "0 clamp(8px, 1vw, 15px)" }}>
        <div className="rounded-lg overflow-hidden">
          <Image
            className="w-full"
            src="/img/revoluna/login-subscription.png"
            alt="Login and Subscription"
            width={1440}
            height={960}
          />
        </div>
      </section>

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
            "Led the product redesign from concept to high-fidelity prototypes in Figma",
            "Translated designs into a functional mobile MVP using FlutterFlow",
            "Implemented custom logic where no-code solutions were not sufficient, including check-in/check-out flows and deep linking",
            "Integrated REST APIs for user verification, shift discovery, applications, schedules, and payments",
            "Collaborated closely with product stakeholders to align business rules with user-facing flows",
            "Took ownership of publishing and maintaining the app on the App Store and Google Play",
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

        {/* Figma Images */}
        <div
          className="mt-12 grid gap-4"
          style={{
            gridTemplateColumns: "1fr 2fr",
          }}
        >
          <div className="rounded-lg overflow-hidden">
            <Image
              src="/img/revoluna/figma-components.png"
              alt="Figma components"
              width={667}
              height={959}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="rounded-lg overflow-hidden">
            <Image
              src="/img/revoluna/figma-design.png"
              alt="Figma design"
              width={1361}
              height={959}
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        {/* GitHub Image */}
        <div className="mt-8 rounded-lg overflow-hidden">
          <Image
            src="/img/revoluna/github.png"
            alt="GitHub code"
            width={2160}
            height={1484}
            className="w-full"
          />
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
          The mobile MVP replaced informal workflows with a structured, production-ready experience, allowing doctors to better manage shifts and payments while enabling the team to validate the product with real users.
        </p>
        <p
          className="text-foreground leading-relaxed mt-6"
          style={{ fontSize: "clamp(16px, 1.6vw, 20px)", opacity: 0.7, maxWidth: "800px" }}
        >
          The success of the MVP laid the foundation for the next phase of the product: the development of a dedicated web platform focused on scalability and operational management.
        </p>
      </section>

      {/* Final Images */}
      <section
        className="animate-section w-full grid gap-2"
        style={{
          margin: 0,
          gridTemplateColumns: "1fr 1fr",
          backgroundColor: "#F5EDFF",
          opacity: 0
        }}
      >
        <div className="rounded-lg overflow-hidden">
          <Image
            src="/img/revoluna/icon.png"
            alt="Icon"
            width={740}
            height={740}
            className="w-full h-full object-cover"
          />
        </div>
        <div className="rounded-lg overflow-hidden">
          <Image
            src="/img/revoluna/store.png"
            alt="Store"
            width={700}
            height={740}
            className="w-full h-full object-cover"
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
            href="/work/houston"
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
                Houston
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
