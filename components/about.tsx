"use client";

import Image from "next/image";
import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";

gsap.registerPlugin(ScrollTrigger, SplitText);

export const About = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const textRef = useRef<HTMLParagraphElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
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
          { y: 60 },
          { y: 0, duration: 0.4, delay: index * 0.05 }
        );

        // Saída: de posição original para cima
        tl.to(line, { y: -60, duration: 0.4, delay: index * 0.05 }, "+=0.2");
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
      imageTl.fromTo(imageRef.current, { y: 80 }, { y: 0, duration: 0.5 });

      // Saída: de posição original para cima
      imageTl.to(imageRef.current, { y: -80, duration: 0.5 }, "+=0.2");

      return () => {
        split.revert();
      };
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="w-full h-[660px] px-[120px] py-[112px] flex justify-center items-start gap-[60px] "
    >
      {/* Text */}
      <p
        ref={textRef}
        className="max-w-[782px] text-[38px] text-black font-black text-justify"
        style={{
          fontFamily: "var(--font-gabarito)",
          lineHeight: "1.68em",
        }}
      >
        I work at the intersection of design and front-end development, turning
        complex product requirements into clear, usable interfaces. With a
        background in UX/UI, motion design, and engineering, I focus on building
        thoughtful, well-crafted experiences that make real products easier to
        use.
      </p>

      {/* Image */}
      <div
        ref={imageRef}
        className="w-[360px] h-[418px] rounded-[10px] overflow-hidden shrink-0 mt-[10px]"
      >
        <Image
          src="/img/about-photo.png"
          alt="Kenji"
          width={360}
          height={418}
          className="object-cover"
        />
      </div>
    </section>
  );
};
