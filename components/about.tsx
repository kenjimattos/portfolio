"use client";

import Image from "next/image";
import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger, SplitText, useGSAP);

export const About = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const textRef = useRef<HTMLParagraphElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    // Valores responsivos baseados no viewport
    const vh = window.innerHeight;
    const textOffset = vh * 0.08;
    const imageOffset = vh * 0.1;

    // Split text into lines
    const split = new SplitText(textRef.current, { type: "lines" });

    // Timeline for text lines - entrada e saída
    split.lines.forEach((line, index) => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 70%",
          end: "bottom 30%",
          scrub: 0.5,
        },
      });

      // Entrada: de baixo para posição original
      tl.fromTo(
        line,
        { y: textOffset },
        { y: 0, duration: 0.4, delay: index * 0.05 }
      );

      // Saída: de posição original para cima
      tl.to(line, { y: -textOffset, duration: 0.4, delay: index * 0.05 }, "+=0.2");
    });

    // Timeline for image - entrada e saída
    const imageTl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top 70%",
        end: "bottom 30%",
        scrub: 0.5,
      },
    });

    // Entrada: de baixo para posição original
    imageTl.fromTo(imageRef.current, { y: imageOffset }, { y: 0, duration: 0.5 });

    // Saída: de posição original para cima
    imageTl.to(imageRef.current, { y: -imageOffset, duration: 0.5 }, "+=0.2");

    return () => {
      split.revert();
    };
  }, { scope: sectionRef });

  return (
    <section
      id="about"
      ref={sectionRef}
      className="section-pb w-full flex flex-col md:flex-row content-gap items-center"
    >
      {/* Text */}
      <p
        ref={textRef}
        className="w-full text-justify sm:text-left lg:text-justify"
        style={{
          fontSize: "clamp(20px, 2.4dvw, 45px)",
        }}
      >
        I work at the intersection of design and front-end development, 
        turning product requirements into clear, usable interfaces.
        <br/>
        <br/>
        With a background in UX/UI, motion design, and engineering,
        I focus on building thoughtful, well-crafted experiences that make real products easier to use.
      </p>

      {/* Image */}
      <div
        ref={imageRef}
        className="rounded-sm shrink-0 md:w-auto overflow-hidden"
      >
        <Image
          src="/img/about-photo.png"
          alt="Kenji"
          width={360}
          height={418}
        />
      </div>
    </section>
  );
};
