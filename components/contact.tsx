"use client";

import { useState, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { siteConfig } from "@/config/site";
import { prefersReducedMotion } from "@/lib/motion";
import { useLocale } from "@/lib/i18n";
import { Marked, PenMark } from "@/components/ui/marks";

gsap.registerPlugin(ScrollTrigger, useGSAP);

const COPY = {
  en: {
    heading: ["Let's", "talk"],
    note: "I usually reply within 24–48 hours.",
    name: "Name",
    namePlaceholder: "Your name",
    email: "Email",
    emailPlaceholder: "name@yourcompany.com",
    message: "Message",
    messagePlaceholder: "Tell me about your project...",
    sending: "Sending...",
    sent: "Message sent",
    tryAgain: "Try again",
    send: "Send message",
    successNote: "Thanks, your message is on its way. I'll get back to you soon.",
    errorNote: (email: string) =>
      `Something went wrong. Please try again, or email me directly at ${email}.`,
    pitch: "I'm available for freelance projects and full-time opportunities.",
  },
  pt: {
    heading: ["Vamos", "conversar"],
    note: "Costumo responder em 24–48 horas.",
    name: "Nome",
    namePlaceholder: "Seu nome",
    email: "E-mail",
    emailPlaceholder: "nome@suaempresa.com",
    message: "Mensagem",
    messagePlaceholder: "Me conte sobre o seu projeto...",
    sending: "Enviando...",
    sent: "Mensagem enviada",
    tryAgain: "Tentar de novo",
    send: "Enviar mensagem",
    successNote: "Obrigado, sua mensagem está a caminho. Respondo em breve.",
    errorNote: (email: string) =>
      `Algo deu errado. Tente de novo ou me escreva direto em ${email}.`,
    pitch: "Estou disponível para projetos freelance e oportunidades full-time.",
  },
} as const;

const socialLinks = [
  { name: "GitHub", href: siteConfig.profile.githubUrl },
  { name: "LinkedIn", href: siteConfig.profile.linkedinUrl },
  { name: siteConfig.profile.email, href: `mailto:${siteConfig.profile.email}` },
];

export const Contact = () => {
  const t = COPY[useLocale()];
  const sectionRef = useRef<HTMLElement>(null);
  const bodyRef = useRef<HTMLDivElement>(null);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
    website: "",
  });
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">(
    "idle"
  );

  useGSAP(
    () => {
      const parts = bodyRef.current?.children;
      if (!parts) return;

      if (prefersReducedMotion()) {
        gsap.set(parts, { opacity: 1, y: 0 });
        return;
      }

      gsap.fromTo(
        parts,
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.12,
          ease: "power3.out",
          scrollTrigger: {
            trigger: bodyRef.current,
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
        }
      );
    },
    { scope: sectionRef }
  );

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
    <section id="contact" ref={sectionRef}>
      <div className="wrap">
        <div className="ed-grid sec-head">
          <div className="num">
            <span className="meta dimmer">/04</span>
          </div>
          <div className="title">
            <h2>
              {t.heading[0]}
              <br />
              {t.heading[1]}
            </h2>
          </div>
          <div className="note">
            <p className="meta dim">{t.note}</p>
          </div>
        </div>

        <div
          className="ed-grid"
          ref={bodyRef}
          style={{ paddingBottom: "var(--s12)" }}
        >
          <div className="contact-left">
            <p className="contact-pitch">{t.pitch}</p>
            {/* A caneta é do gesto: a sublinha é escrita na linha em que o
                cursor está, e apagada quando ele sai. A linha ainda anda
                um pouco; o que não acontece é a fonte virar violeta —
                sublinhar e trocar a cor diria a mesma coisa duas vezes. */}
            <div className="contact-social">
              {socialLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  target={link.href.startsWith("mailto:") ? undefined : "_blank"}
                  rel="noopener noreferrer"
                >
                  <Marked kind="underline" pen="violet" on="hover">
                    {link.name}
                  </Marked>
                </a>
              ))}
            </div>
          </div>

          <form className="contact-form" onSubmit={handleSubmit}>
            {/* Honeypot */}
            <input
              type="text"
              name="website"
              value={formData.website}
              onChange={(e) =>
                setFormData({ ...formData, website: e.target.value })
              }
              className="hidden"
              tabIndex={-1}
              autoComplete="off"
              aria-hidden="true"
            />

            <div className="contact-field">
              <label className="meta dim" htmlFor="contact-name">
                {t.name}
              </label>
              <input
                id="contact-name"
                name="name"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder={t.namePlaceholder}
              />
            </div>

            <div className="contact-field">
              <label className="meta dim" htmlFor="contact-email">
                {t.email}
              </label>
              <input
                id="contact-email"
                name="email"
                type="email"
                required
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
                placeholder={t.emailPlaceholder}
              />
            </div>

            <div className="contact-field">
              <label className="meta dim" htmlFor="contact-message">
                {t.message}
              </label>
              <textarea
                id="contact-message"
                name="message"
                required
                value={formData.message}
                onChange={(e) =>
                  setFormData({ ...formData, message: e.target.value })
                }
                placeholder={t.messagePlaceholder}
              />
            </div>

            <button
              type="submit"
              className="contact-submit pen-btn pen-btn-self"
              data-size="lg"
              data-state={status}
              disabled={status === "loading"}
              style={{ opacity: status === "loading" ? 0.7 : 1 }}
            >
              {status === "loading"
                ? t.sending
                : status === "success"
                  ? t.sent
                  : status === "error"
                    ? t.tryAgain
                    : t.send}
              {/* Enviado, a caneta dá o visto, e ele é escrito na hora —
                  não é gesto do leitor, é resposta do sistema. A chave
                  força um traço novo a cada estado, senão o visto herdaria
                  o tracejado já apagado da seta. */}
              <PenMark
                key={status}
                kind={status === "success" ? "check" : "arrow"}
                on={status === "success" ? "mount" : "hover"}
              />
            </button>

            <p
              role="status"
              aria-live="polite"
              className="meta"
              style={{
                color: status === "error" ? "var(--red)" : "var(--ink-55)",
                opacity: status === "success" || status === "error" ? 1 : 0,
                minHeight: "1.5em",
                lineHeight: 1.5,
                textTransform: "none",
                letterSpacing: "0.02em",
              }}
            >
              {status === "success" && t.successNote}
              {status === "error" && t.errorNote(siteConfig.profile.email)}
            </p>
          </form>
        </div>
      </div>
    </section>
  );
};
