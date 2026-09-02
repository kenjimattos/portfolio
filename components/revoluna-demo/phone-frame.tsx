"use client";

// iPhone-style frame for the recreated Revoluna screens: titanium bezel,
// dynamic island, status bar and home indicator. Screens are static
// recreations rendered at a fixed design width and auto-scaled.

import { ReactNode } from "react";
import { ScaleBox } from "@/components/houston-demo/scale-box";
import { geologica } from "@/components/houston-demo/geologica";
import { cx } from "./ui";

// iPhone 14 Pro logical points.
export const PHONE_WIDTH = 393;
export const PHONE_HEIGHT = 852;

export function StatusBar({ time, dark }: { time: string; dark?: boolean }) {
  const fg = dark ? "#ffffff" : "#111111";
  return (
    <div
      className="pointer-events-none absolute inset-x-0 top-0 z-40 flex items-center justify-between px-8 pt-4"
      aria-hidden
    >
      <span
        style={{
          color: fg,
          fontSize: 15,
          fontWeight: 600,
          fontFamily:
            "-apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
          letterSpacing: "-0.2px",
        }}
      >
        {time}
      </span>
      <div className="flex items-center gap-1.5">
        {/* signal */}
        <svg width="17" height="11" viewBox="0 0 17 11" fill={fg} aria-hidden>
          <rect x="0" y="7" width="3" height="4" rx="0.8" />
          <rect x="4.5" y="5" width="3" height="6" rx="0.8" />
          <rect x="9" y="2.5" width="3" height="8.5" rx="0.8" />
          <rect x="13.5" y="0" width="3" height="11" rx="0.8" />
        </svg>
        {/* wifi */}
        <svg width="16" height="11" viewBox="0 0 16 11" fill={fg} aria-hidden>
          <path d="M8 9.2a1.4 1.4 0 1 0 0 2.8 1.4 1.4 0 0 0 0-2.8Z" />
          <path d="M8 5.6c1.5 0 2.9.6 3.9 1.6l-1.3 1.3A3.7 3.7 0 0 0 8 7.4c-1 0-2 .4-2.6 1.1L4.1 7.2c1-1 2.4-1.6 3.9-1.6Z" />
          <path d="M8 2c2.5 0 4.8 1 6.5 2.6l-1.3 1.3A7.2 7.2 0 0 0 8 3.8c-2 0-3.8.8-5.2 2.1L1.5 4.6A9.2 9.2 0 0 1 8 2Z" />
        </svg>
        {/* battery */}
        <svg width="25" height="12" viewBox="0 0 25 12" aria-hidden>
          <rect x="0.5" y="0.5" width="21" height="11" rx="3.5" stroke={fg} opacity="0.4" fill="none" />
          <rect x="2" y="2" width="18" height="8" rx="2" fill={fg} />
          <path d="M23 4v4c1-.3 1.6-1 1.6-2S24 4.3 23 4Z" fill={fg} opacity="0.4" />
        </svg>
      </div>
    </div>
  );
}

export function PhoneFrame({
  time = "9:41",
  darkStatusBar,
  children,
}: {
  time?: string;
  /** light glyphs for screens with a dark background behind the status bar */
  darkStatusBar?: boolean;
  children: ReactNode;
}) {
  // Breathing room inside the ScaleBox so the bezel shadow isn't clipped
  // by its overflow-hidden (which produced a hard-edged shadow band).
  const SHADOW_X = 20;
  const SHADOW_BOTTOM = 44;
  return (
    <div
      className={cx(geologica.variable, "rev-app relative w-full antialiased")}
      style={{ fontFamily: "var(--font-geologica), sans-serif" }}
    >
      <ScaleBox designWidth={PHONE_WIDTH + 24 + SHADOW_X * 2}>
        <div style={{ padding: `4px ${SHADOW_X}px ${SHADOW_BOTTOM}px` }}>
        {/* titanium bezel */}
        <div
          className="rounded-[58px] p-0.75"
          style={{
            background:
              "linear-gradient(145deg, #d8d8dc 0%, #9a9aa0 30%, #e6e6ea 55%, #8e8e94 80%, #cfcfd4 100%)",
            boxShadow: "0 18px 38px -20px rgba(22, 22, 22, 0.45)",
          }}
        >
          <div className="rounded-[55px] bg-[#111114] p-2.25">
            <div
              className="relative overflow-hidden rounded-[46px] bg-white"
              style={{ width: PHONE_WIDTH, height: PHONE_HEIGHT }}
            >
              <StatusBar time={time} dark={darkStatusBar} />
              {/* dynamic island */}
              <div
                className="pointer-events-none absolute left-1/2 top-3 z-40 h-8.5 w-30 -translate-x-1/2 rounded-full bg-[#0a0a0c]"
                aria-hidden
              />
              {/* screen content */}
              <div className="absolute inset-0 overflow-hidden">{children}</div>
              {/* home indicator */}
              <div
                className="pointer-events-none absolute bottom-2 left-1/2 z-40 h-1.25 w-33.5 -translate-x-1/2 rounded-full"
                style={{ backgroundColor: darkStatusBar ? "rgba(255,255,255,0.85)" : "rgba(17,17,17,0.85)" }}
                aria-hidden
              />
            </div>
          </div>
        </div>
        </div>
      </ScaleBox>
    </div>
  );
}
