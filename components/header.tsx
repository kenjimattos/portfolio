export const Header = () => {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 flex justify-center-safe"
      style={{ padding: "clamp(10px, 2vw, 20px) clamp(10px, 4vw, 80px)" }}>
      <nav className="relative w-full max-w-[1200px] h-[60px]">
        <span
          className="absolute top-[5px] left-0 leading-[1em] text-[#171717] font-normal"
          style={{
            fontFamily: "var(--font-gravitas)",
            letterSpacing: "-0.11em",
            color: "var(--color-primary)",
            fontSize: "clamp(32px, 6vw, 64px)",
          }}
        >
          knji
        </span>
        <button className="absolute top-[4px] right-0">
          
            Contact
          
        </button>
      </nav>
    </header>
  );
};