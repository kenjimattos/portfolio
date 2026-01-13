"use client";

import { useState, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger, SplitText, useGSAP);

export const Contact = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const rightColRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLParagraphElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
    website: "", // honeypot field - bots will fill this
  });
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  useGSAP(() => {
    // Valores responsivos baseados no viewport
    const vh = window.innerHeight;
    const titleOffset = vh * 0.3;
    const formOffset = vh * 0.3;
    const textOffset = vh * 0.1;
    const isMobile = window.innerWidth < 640; // sm breakpoint

    // Animate title
    gsap.from(titleRef.current, {
      y: titleOffset,
      duration: 0.5,
      ease: "power3.out",
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top 70%",
        toggleActions: "play none none reverse",
      },
    });

    // Animate form inputs in cascade
    const formElements = formRef.current?.querySelectorAll("input, textarea");
    if (formElements) {
      gsap.from(formElements, {
        y: formOffset,
        duration: 0.5,
        stagger: 0.1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 60%",
          toggleActions: "play none none reverse",
        },
      });
    }

    // Referência ao textarea para usar como trigger no mobile
    const textarea = formRef.current?.querySelector("textarea");

    // Split text into lines and animate - começa invisível
    if (textRef.current) {
      const split = new SplitText(textRef.current, { type: "lines" });

      gsap.set(split.lines, { opacity: 0, y: textOffset });

      gsap.to(split.lines, {
        y: 0,
        opacity: 1,
        duration: 0.6,
        stagger: 0.1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: isMobile ? textarea : sectionRef.current,
          start: isMobile ? "top 70%" : "top 60%",
          toggleActions: "play none none reverse",
        },
      });
    }

    // Animate button - começa invisível
    gsap.set(buttonRef.current, { opacity: 0, y: textOffset });

    gsap.to(buttonRef.current, {
      y: 0,
      opacity: 1,
      duration: 0.6,
      ease: "power3.out",
      scrollTrigger: {
        trigger: isMobile ? textarea : sectionRef.current,
        start: isMobile ? "top 62%" : "top 60%",
        toggleActions: "play none none reverse",
      },
    });
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
      className="section-pb w-full flex flex-col items-center justify-center"
    >
      {/* Container centralizado */}
      <div
        className="w-full flex flex-col"
        style={{ gap: "clamp(30px, 5vw, 60px)" }}
      >
        {/* Title */}
        <h1
          ref={titleRef}
          className="font-extrabold"
          style={{ fontSize: "clamp(36px, 8vw, 96px)" }}
        >
          GET IN TOUCH
        </h1>

        {/* Content row */}
        <div
          className="flex flex-col sm:flex-row justify-between"
          style={{ gap: "clamp(30px, 5vw, 62px)" }}
        >
          {/* Form */}
          <form
            ref={formRef}
            onSubmit={handleSubmit}
            className="flex flex-col w-full sm:w-1/2 shrink-0"
            style={{ gap: "clamp(12px, 1.5vw, 17px)" }}
          >
            {/* Honeypot - invisible to users, bots will fill it */}
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

            {/* Name */}
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full bg-gray-300 outline-none"
              style={{
                fontFamily: "var(--font-gabarito)",
                height: "clamp(36px, 4vw, 40px)",
                padding: "0 clamp(8px, 1vw, 10px)",
                fontSize: "clamp(14px, 1.5vw, 16px)",
              }}
              placeholder="Name"
              required
            />

            {/* Email */}
            <input
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="w-full bg-gray-300 outline-none"
              style={{
                fontFamily: "var(--font-gabarito)",
                height: "clamp(36px, 4vw, 40px)",
                padding: "0 clamp(8px, 1vw, 10px)",
                fontSize: "clamp(14px, 1.5vw, 16px)",
              }}
              placeholder="Email"
              required
            />

            {/* Message */}
            <textarea
              value={formData.message}
              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              className="w-full bg-gray-300 outline-none resize-none"
              style={{
                fontFamily: "var(--font-gabarito)",
                height: "clamp(180px, 22vw, 242px)",
                padding: "clamp(12px, 1.5vw, 16px) clamp(8px, 1vw, 11px)",
                fontSize: "clamp(14px, 1.5vw, 16px)",
              }}
              placeholder="Message"
              required
            />
          </form>

          {/* Right column - alinha com o campo de mensagem */}
          <div
            ref={rightColRef}
            className="flex flex-col w-full sm:w-1/2 justify-start sm:justify-end content-gap"
          >
            <p
              ref={textRef}
              style={{ fontSize: "var(--font-medium)" }}
            >
              Feel free to reach out for project,
              <br />
              inquiries or just to say hi.
            </p>

            {/* Send Button */}
            <button
              className="btn-primary self-start"
              ref={buttonRef}
              type="submit"
              onClick={handleSubmit}
              disabled={status === "loading"}
            >
              {status === "loading" ? "Sending..." : status === "success" ? "Sent!" : status === "error" ? "Try again" : "Send"}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
