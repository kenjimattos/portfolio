"use client";

import { useState, useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";

gsap.registerPlugin(ScrollTrigger, SplitText);

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
  });

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animate title
      gsap.from(titleRef.current, {
        y: 300,
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
          y: 300,
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

      // Split text into lines and animate
      if (textRef.current) {
        const split = new SplitText(textRef.current, { type: "lines" });

        gsap.from(split.lines, {
          y: 100,
          opacity: 0,
          duration: 0.6,
          stagger: 0.1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 55%",
            toggleActions: "play none none reverse",
          },
        });
      }

      // Animate button
      gsap.from(buttonRef.current, {
        y: 100,
        opacity: 0,
        duration: 0.6,
        delay: 0.3,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 70%",
          toggleActions: "play none none reverse",
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    console.log(formData);
  };

  return (
    <section ref={sectionRef} className="w-full py-[120px] flex flex-col items-center justify-center">
      {/* Container centralizado */}
      <div className="w-full max-w-[1200px] flex flex-col gap-[60px]">
        {/* Title */}
        <h2
          ref={titleRef}
          className="text-[96px] text-black font-extrabold leading-none"
          style={{ fontFamily: "var(--font-gabarito)" }}
        >
          GET IN TOUCH
        </h2>

        {/* Content row */}
        <div className="flex gap-[62px]">
          {/* Form */}
          <form ref={formRef} onSubmit={handleSubmit} className="flex flex-col gap-[17px] w-[539px] shrink-0">
            {/* Name */}
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full h-[40px] bg-[#d9d9d9] px-[10px] text-[16px] text-black font-light outline-none"
              style={{ fontFamily: "var(--font-gabarito)" }}
              placeholder="Name"
            />

            {/* Email */}
            <input
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="w-full h-[40px] bg-[#d9d9d9] px-[10px] text-[16px] text-black font-light outline-none"
              style={{ fontFamily: "var(--font-gabarito)" }}
              placeholder="Email"
            />

            {/* Message */}
            <textarea
              value={formData.message}
              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              className="w-full h-[242px] bg-[#d9d9d9] px-[11px] py-[16px] text-[16px] text-black font-light outline-none resize-none"
              style={{ fontFamily: "var(--font-gabarito)" }}
              placeholder="Message"
            />
          </form>

          {/* Right column - alinha com o campo de mensagem */}
          <div ref={rightColRef} className="flex flex-col justify-between w-[500px] h-[242px] self-end">
            <p
              ref={textRef}
              className="text-[32px] text-black font-light leading-[1.3em]"
              style={{ fontFamily: "var(--font-gabarito)" }}
            >
              Feel free to reach out for project, inquiries or just to say hi.
            </p>

            {/* Send Button */}
            <button
              ref={buttonRef}
              type="submit"
              onClick={handleSubmit}
              className="w-[150px] h-[51px] rounded-[2px] text-[#fffff9] text-[24px] text-center cursor-pointer hover:bg-[#333] transition-colors"
              style={{ fontFamily: "var(--font-gabarito)", backgroundColor: "var(--color-primary)" }}
            >
              Send
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
