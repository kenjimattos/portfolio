export const Hero = () => {
  return (
    <main className="flex min-h-screen flex-col items-center bg-white px-[119px] pt-[180px] pb-[65px] gap-[60px]">

      {/* Hero Animation Section */}
      <section className="relative w-[838px] h-[540px]">
        {/* "i am" text - top left */}
        <span
          className="absolute top-0 left-0 text-[25px] leading-[1em] text-[#171717]"
          style={{ fontFamily: "var(--font-gabarito)" }}
        >
          i am
        </span>

        {/* Group 3: "a" text with strikethrough - top right */}
        <div className="absolute top-0 right-0 w-[30px] h-[30px] flex items-center justify-center">
          <span
            className="relative text-[25px] leading-[1em] text-[#171717]"
            style={{ fontFamily: "var(--font-gabarito)" }}
          >
            a
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[30px] h-[4px] bg-[#171717]" />
          </span>
        </div>

        {/* Group 1: DESIGNER with strikethrough */}
        <div className="absolute top-[62px] left-0 w-[838px] h-[119px] flex items-center justify-center">
          <span
            className="text-[120px] leading-[1em] font-extrabold text-[#171717] text-center"
            style={{ fontFamily: "var(--font-gabarito)" }}
          >
            DESIGNER
          </span>
          <div className="absolute top-1/2 left-0 w-[838px] h-[11px] bg-[#171717] -translate-y-1/2" />
        </div>

        {/* Group 2: DEVELOPER with strikethrough */}
        <div className="absolute top-[240px] left-0 w-[838px] h-[119px] flex items-center justify-center">
          <span
            className="text-[120px] leading-[1em] font-extrabold text-[#171717] text-center"
            style={{ fontFamily: "var(--font-gabarito)" }}
          >
            DEVELOPER
          </span>
          <div className="absolute top-1/2 left-0 w-[838px] h-[11px] bg-[#171717] -translate-y-1/2" />
        </div>

        {/* EVERYTHING */}
        <div className="absolute top-[421px] left-0 w-[838px] h-[119px] flex items-center justify-center">
          <span
            className="text-[120px] leading-[1em] font-extrabold text-[#171717] text-center"
            style={{ fontFamily: "var(--font-gabarito)" }}
          >
            EVERYTHING
          </span>
        </div>
      </section>
    </main>
  );
};