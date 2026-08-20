"use client";

import { useState, useRef } from "react";
import type { CSSProperties } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { Mail } from "lucide-react";
import { siteConfig } from "@/config/site";
import { prefersReducedMotion } from "@/lib/motion";
import { useLocale } from "@/lib/i18n";

gsap.registerPlugin(ScrollTrigger, useGSAP);

const COPY = {
  en: {
    heading: "Get In Touch",
    name: "Name",
    namePlaceholder: "John Doe",
    email: "Email",
    emailPlaceholder: "john@example.com",
    message: "Message",
    messagePlaceholder: "Tell me about your project...",
    sending: "Sending...",
    sent: "Message Sent!",
    tryAgain: "Try Again",
    send: "Send Message",
    successNote: "Thanks, your message is on its way. I'll get back to you soon.",
    errorNote: (email: string) =>
      `Something went wrong. Please try again, or email me directly at ${email}.`,
    pitch:
      "I'm currently available for freelance work and full-time opportunities. If you have a project in mind or just want to chat, feel free to reach out.",
    responseTime: "I typically respond within 24-48 hours.",
    location: "Location",
    locationValue: "São Bernardo do Campo, São Paulo, Brazil",
    connect: "Connect",
  },
  pt: {
    heading: "Vamos conversar",
    name: "Nome",
    namePlaceholder: "Maria Silva",
    email: "E-mail",
    emailPlaceholder: "maria@exemplo.com",
    message: "Mensagem",
    messagePlaceholder: "Me conte sobre o seu projeto...",
    sending: "Enviando...",
    sent: "Mensagem enviada!",
    tryAgain: "Tentar de novo",
    send: "Enviar mensagem",
    successNote: "Obrigado, sua mensagem está a caminho. Respondo em breve.",
    errorNote: (email: string) =>
      `Algo deu errado. Tente de novo ou me escreva direto em ${email}.`,
    pitch:
      "Estou disponível para projetos freelance e oportunidades full-time. Se você tem um projeto em mente ou só quer trocar uma ideia, me chama.",
    responseTime: "Costumo responder em 24–48 horas.",
    location: "Localização",
    locationValue: "São Bernardo do Campo, São Paulo, Brasil",
    connect: "Redes",
  },
} as const;

const socialLinks = [
  {
    name: "GitHub",
    href: siteConfig.profile.githubUrl,
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
      </svg>
    ),
  },
  {
    name: "LinkedIn",
    href: siteConfig.profile.linkedinUrl,
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
        <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
      </svg>
    ),
  },
  {
    name: "Email",
    href: `mailto:${siteConfig.profile.email}`,
    icon: <Mail strokeWidth={1.5} className="w-5 h-5" />
  },
];

export const Contact = () => {
  const t = COPY[useLocale()];
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const infoRef = useRef<HTMLDivElement>(null);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
    website: "",
  });
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [focusedField, setFocusedField] = useState<string | null>(null);

  useGSAP(() => {
    if (prefersReducedMotion()) {
      gsap.set([headerRef.current, contentRef.current, infoRef.current], {
        opacity: 1,
        x: 0,
        y: 0,
      });
      const formFields = formRef.current?.querySelectorAll(".form-field");
      if (formFields) {
        gsap.set(formFields, { opacity: 1, x: 0 });
      }
      return;
    }

    // Header animation
    gsap.fromTo(
      headerRef.current,
      { opacity: 0, y: 60 },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: headerRef.current,
          start: "top 85%",
          toggleActions: "play none none reverse",
        },
      }
    );

    // Content animation
    gsap.fromTo(
      contentRef.current,
      { opacity: 0, y: 50 },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: contentRef.current,
          start: "top 85%",
          toggleActions: "play none none reverse",
        },
      }
    );

    // Form fields animation
    const formFields = formRef.current?.querySelectorAll(".form-field");
    if (formFields) {
      gsap.fromTo(
        formFields,
        { opacity: 0, x: -30 },
        {
          opacity: 1,
          x: 0,
          duration: 0.8,
          stagger: 0.1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: formRef.current,
            start: "top 80%",
            toggleActions: "play none none reverse",
          },
        }
      );
    }

    // Info section animation
    gsap.fromTo(
      infoRef.current,
      { opacity: 0, x: 30 },
      {
        opacity: 1,
        x: 0,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: infoRef.current,
          start: "top 80%",
          toggleActions: "play none none reverse",
        },
      }
    );
  }, { scope: sectionRef });

  const isValidEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!isValidEmail(formData.email)) {
      setStatus("error");
      return;
    }

    setStatus("loading");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        setStatus("success");
        setFormData({ name: "", email: "", message: "", website: "" });
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  };

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="w-full"
      style={{
        padding: "clamp(60px, 10vw, 120px) clamp(40px, 8vw, 180px)",
      }}
    >
      {/* Section Header */}
      <div
        ref={headerRef}
        className="flex items-center gap-4 mb-16"
        style={{ opacity: 0 }}
      >
        <h2
          className="text-foreground font-bold"
          style={{ fontSize: "clamp(24px, 3vw, 36px)" }}
        >
          {t.heading}
        </h2>
        <div
          className="flex-1 h-px"
          style={{
            background: "linear-gradient(90deg, color-mix(in srgb, var(--color-accent-cyan) 30%, transparent), color-mix(in srgb, var(--color-accent-purple) 20%, transparent), transparent)",
            maxWidth: "300px"
          }}
        />
      </div>

      {/* Content */}
      <div
        ref={contentRef}
        className="grid lg:grid-cols-2 gap-16"
        style={{ opacity: 0 }}
      >
        {/* Left - Form */}
        <form
          ref={formRef}
          onSubmit={handleSubmit}
          className="flex flex-col gap-6"
        >
          {/* Honeypot */}
          <input
            type="text"
            name="website"
            value={formData.website}
            onChange={(e) => setFormData({ ...formData, website: e.target.value })}
            className="hidden"
            tabIndex={-1}
            autoComplete="off"
            aria-hidden="true"
          />

          {/* Name Field */}
          <div className="form-field flex flex-col gap-2" style={{ opacity: 0 }}>
            <label
              htmlFor="contact-name"
              className="text-foreground font-mono uppercase tracking-wider"
              style={{
                fontSize: "clamp(11px, 1vw, 13px)",
                opacity: focusedField === "name" ? 1 : 0.65,
                transition: "opacity 0.3s ease",
              }}
            >
              {t.name}
            </label>
            <input
              id="contact-name"
              name="name"
              type="text"
              autoComplete="name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              onFocus={() => setFocusedField("name")}
              onBlur={() => setFocusedField(null)}
              className="w-full bg-transparent text-foreground outline-none transition-all duration-300"
              style={{
                fontFamily: "var(--font-gabarito)",
                fontSize: "clamp(16px, 1.5vw, 20px)",
                padding: "12px 0",
                borderBottom: `1px solid ${focusedField === "name" ? "color-mix(in srgb, var(--color-accent-cyan) 80%, transparent)" : "rgba(22, 22, 22, 0.15)"}`,
              }}
              placeholder={t.namePlaceholder}
              required
            />
          </div>

          {/* Email Field */}
          <div className="form-field flex flex-col gap-2" style={{ opacity: 0 }}>
            <label
              htmlFor="contact-email"
              className="text-foreground font-mono uppercase tracking-wider"
              style={{
                fontSize: "clamp(11px, 1vw, 13px)",
                opacity: focusedField === "email" ? 1 : 0.65,
                transition: "opacity 0.3s ease",
              }}
            >
              {t.email}
            </label>
            <input
              id="contact-email"
              name="email"
              type="email"
              autoComplete="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              onFocus={() => setFocusedField("email")}
              onBlur={() => setFocusedField(null)}
              className="w-full bg-transparent text-foreground outline-none transition-all duration-300"
              style={{
                fontFamily: "var(--font-gabarito)",
                fontSize: "clamp(16px, 1.5vw, 20px)",
                padding: "12px 0",
                borderBottom: `1px solid ${focusedField === "email" ? "color-mix(in srgb, var(--color-accent-purple) 80%, transparent)" : "rgba(22, 22, 22, 0.15)"}`,
              }}
              placeholder={t.emailPlaceholder}
              required
            />
          </div>

          {/* Message Field */}
          <div className="form-field flex flex-col gap-2" style={{ opacity: 0 }}>
            <label
              htmlFor="contact-message"
              className="text-foreground font-mono uppercase tracking-wider"
              style={{
                fontSize: "clamp(11px, 1vw, 13px)",
                opacity: focusedField === "message" ? 1 : 0.65,
                transition: "opacity 0.3s ease",
              }}
            >
              {t.message}
            </label>
            <textarea
              id="contact-message"
              name="message"
              value={formData.message}
              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              onFocus={() => setFocusedField("message")}
              onBlur={() => setFocusedField(null)}
              className="w-full bg-transparent text-foreground outline-none resize-none transition-all duration-300"
              style={{
                fontFamily: "var(--font-gabarito)",
                fontSize: "clamp(16px, 1.5vw, 20px)",
                padding: "12px 0",
                minHeight: "150px",
                borderBottom: `1px solid ${focusedField === "message" ? "var(--color-primary)" : "rgba(22, 22, 22, 0.15)"}`,
                boxShadow: focusedField === "message" ? "0 4px 20px -8px rgba(0, 73, 255, 0.3)" : "none",
              }}
              placeholder={t.messagePlaceholder}
              required
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={status === "loading"}
            className="self-start mt-4 px-8 py-4 rounded-sm font-medium transition-all duration-300 flex items-center gap-3"
            style={{
              backgroundColor: status === "success" ? "#4ade80" : "var(--color-primary)",
              color: "var(--color-background)",
              fontSize: "clamp(14px, 1.3vw, 16px)",
              opacity: status === "loading" ? 0.7 : 1,
            }}
          >
            {status === "loading" && (
              <svg className="animate-spin w-5 h-5" viewBox="0 0 24 24" fill="none">
                <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeDasharray="32" strokeDashoffset="12" />
              </svg>
            )}
            {status === "success" && (
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M20 6L9 17l-5-5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            )}
            {status === "loading" ? t.sending : status === "success" ? t.sent : status === "error" ? t.tryAgain : t.send}
            {status === "idle" && (
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            )}
          </button>

          {/* Status message */}
          <p
            role="status"
            aria-live="polite"
            style={{
              fontSize: "clamp(13px, 1.2vw, 15px)",
              color: status === "error" ? "#dc2626" : "var(--color-foreground)",
              opacity: status === "success" || status === "error" ? 0.9 : 0,
              minHeight: "1.5em",
            }}
          >
            {status === "success" && t.successNote}
            {status === "error" && t.errorNote(siteConfig.profile.email)}
          </p>
        </form>

        {/* Right - Info */}
        <div
          ref={infoRef}
          className="flex flex-col justify-between gap-12"
          style={{ opacity: 0 }}
        >
          {/* Text */}
          <div className="flex flex-col gap-6">
            <p
              className="text-foreground leading-relaxed"
              style={{ fontSize: "clamp(18px, 2vw, 24px)" }}
            >
              {t.pitch}
            </p>
            <p
              className="text-foreground"
              style={{
                fontSize: "clamp(14px, 1.3vw, 16px)",
                opacity: 0.6,
              }}
            >
              {t.responseTime}
            </p>
          </div>

          {/* Contact Info */}
          <div className="flex flex-col gap-6">
            {/* Location */}
            <div className="flex flex-col gap-2">
              <span
                className="text-foreground font-mono uppercase tracking-wider"
                style={{ fontSize: "clamp(11px, 1vw, 13px)", opacity: 0.5 }}
              >
                {t.location}
              </span>
              <span
                className="text-foreground"
                style={{ fontSize: "clamp(16px, 1.5vw, 20px)" }}
              >
                {t.locationValue}
              </span>
            </div>

            {/* Social Links */}
            <div className="flex flex-col gap-3 mt-4">
              <span
                className="text-foreground font-mono uppercase tracking-wider"
                style={{ fontSize: "clamp(11px, 1vw, 13px)", opacity: 0.5 }}
              >
                {t.connect}
              </span>
              <div className="flex gap-4">
                {socialLinks.map((link, index) => {
                  const hoverColors = ["var(--color-accent-cyan)", "var(--color-accent-purple)", "var(--color-primary)"];
                  const hoverBorderColors = ["color-mix(in srgb, var(--color-accent-cyan) 40%, transparent)", "color-mix(in srgb, var(--color-accent-purple) 40%, transparent)", "color-mix(in srgb, var(--color-primary) 40%, transparent)"];
                  return (
                  <a
                    key={link.name}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="contact-social-link w-12 h-12 rounded-sm flex items-center justify-center text-foreground transition-all duration-300 group"
                    style={{
                      "--hover-color": hoverColors[index % 3],
                      "--hover-border-color": hoverBorderColors[index % 3],
                    } as CSSProperties}
                    aria-label={link.name}
                  >
                    {link.icon}
                  </a>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
