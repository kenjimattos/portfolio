export const Header = () => {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 flex justify-center py-[20px]">
      <nav className="relative w-full max-w-[1200px] h-[60px]">
        <span
          className="absolute top-[5px] left-0 text-[50px] leading-[1em] text-[#171717] font-normal"
          style={{
            fontFamily: "var(--font-gravitas)",
            letterSpacing: "-0.11em",
            color: "var(--color-primary)",
          }}
        >
          knji
        </span>
        <button className="absolute top-[4px] right-0 flex items-center justify-center text-white rounded-[2px] w-[150px] h-[51px]"
          style={{ backgroundColor: "var(--color-primary)" }}>
          <span
            className="text-[24px] leading-[1em]"
            style={{ fontFamily: "var(--font-gabarito)"
            }}
          >
            Contact
          </span>
        </button>
      </nav>
    </header>
  );
};