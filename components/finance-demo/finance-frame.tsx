"use client";

// Frame for the recreated Finance screens: light browser chrome over warm
// paper, plus the app's fixed left margin rule and paper grain.
// Screens are static recreations (no interactivity by design).

import { ReactNode } from "react";
import { ScaleBox } from "@/components/houston-demo/scale-box";
import { finFontVars } from "./fonts";
import { cx, FONT } from "./ui";

const SCREEN_WIDTH = 1180;

export function FinanceScreen({
  path = "/",
  designWidth = SCREEN_WIDTH,
  marginRule = true,
  children,
}: {
  path?: string;
  designWidth?: number;
  /** The app's decorative vertical rule at left: 48px. Off for cropped views. */
  marginRule?: boolean;
  children: ReactNode;
}) {
  return (
    <div
      className={cx(
        finFontVars,
        "fin-app overflow-hidden rounded-lg border border-[color:var(--color-fin-rule)] shadow-[0_24px_60px_-30px_rgba(26,22,20,0.45)]"
      )}
    >
      <ScaleBox designWidth={designWidth}>
        <div
          className="fin-grain relative antialiased"
          style={{ backgroundColor: "var(--color-fin-paper)", color: "var(--color-fin-ink)", ...FONT.body }}
        >
          {/* browser chrome (paper) */}
          <div
            className="relative z-10 flex items-center gap-4 px-4 py-2.5"
            style={{
              backgroundColor: "var(--color-fin-tint)",
              borderBottom: "1px solid var(--color-fin-rule)",
            }}
          >
            <div className="flex gap-1.5" aria-hidden>
              <span className="h-3 w-3 rounded-full bg-[#FF5F57]" />
              <span className="h-3 w-3 rounded-full bg-[#FEBC2E]" />
              <span className="h-3 w-3 rounded-full bg-[#28C840]" />
            </div>
            <div className="flex flex-1 justify-center">
              <div
                className="flex h-7 w-full max-w-md items-center justify-center rounded-full px-4"
                style={{
                  backgroundColor: "var(--color-fin-paper)",
                  color: "var(--color-fin-ink-faint)",
                  fontSize: 12,
                }}
              >
                finance-demo.up.railway.app{path}
              </div>
            </div>
            <div className="w-10" aria-hidden />
          </div>

          <div className="relative">
            {marginRule && (
              <div
                aria-hidden
                className="absolute top-0 bottom-0"
                style={{ left: 48, width: 1, backgroundColor: "var(--color-fin-rule)" }}
              />
            )}
            {children}
          </div>
        </div>
      </ScaleBox>
    </div>
  );
}
