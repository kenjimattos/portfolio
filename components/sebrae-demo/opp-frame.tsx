"use client";

// Frame for the recreated OPP screens: dark browser chrome + auto-scaling.
// Screens are static recreations (no interactivity by design).

import { ReactNode } from "react";
import { ScaleBox } from "@/components/houston-demo/scale-box";
import { oppFontVars } from "./fonts";
import { cx, FONT } from "./ui";

const SCREEN_WIDTH = 1280;

export function OppScreen({
  path,
  designWidth = SCREEN_WIDTH,
  flat = false,
  children,
}: {
  path: string;
  designWidth?: number;
  /* No case editorial a tela entra sem palco e sem sombra: o sistema é de
     filete e canto vivo, e uma janela flutuando seria moldura dentro de
     moldura. Os cases antigos continuam no tratamento macio. */
  flat?: boolean;
  children: ReactNode;
}) {
  return (
    <div
      className={cx(
        oppFontVars,
        "opp-app overflow-hidden",
        flat
          ? "border border-[var(--ink)]"
          : "rounded-xl border border-white/10 shadow-[0_24px_60px_-24px_rgba(22,23,38,0.55)]"
      )}
    >
      <ScaleBox designWidth={designWidth}>
        <div className="bg-opp-bg text-white antialiased" style={FONT.body}>
          {/* browser chrome (dark) */}
          <div className="flex items-center gap-4 border-b border-white/10 bg-opp-surface px-4 py-2.5">
            <div className="flex gap-1.5" aria-hidden>
              <span className="h-3 w-3 rounded-full bg-[#FF5F57]" />
              <span className="h-3 w-3 rounded-full bg-[#FEBC2E]" />
              <span className="h-3 w-3 rounded-full bg-[#28C840]" />
            </div>
            <div className="flex flex-1 justify-center">
              <div
                className="flex h-7 w-full max-w-md items-center justify-center rounded-full bg-opp-bg px-4 text-white/50"
                style={{ fontSize: 12 }}
              >
                opp.sebraepb.com.br{path}
              </div>
            </div>
            <div className="w-10" aria-hidden />
          </div>
          {children}
        </div>
      </ScaleBox>
    </div>
  );
}
