"use client";

import { geologica } from "./geologica";
import { ScaleBox } from "./scale-box";
import { DemoSidebar } from "./demo-sidebar";
import { SCREENS, type ScreenId } from "./screens";
import { cx } from "./ui";

const SCREEN_WIDTH = 1240;

// A single recreated screen with the collapsed (icon-only) sidebar —
// used inside feature sections as a static snapshot of the module.
export function HoustonScreen({ screen }: { screen: ScreenId }) {
  const { component: Screen } = SCREENS[screen];

  return (
    <div
      className={cx(
        geologica.variable,
        "hst-app overflow-hidden rounded-xl border border-hst-border bg-white shadow-[0_20px_50px_-24px_rgba(22,22,22,0.22)]"
      )}
      style={{ fontFamily: "var(--font-geologica), sans-serif" }}
    >
      <ScaleBox designWidth={SCREEN_WIDTH}>
        <div className="flex items-stretch font-extralight text-hst-fg antialiased">
          <DemoSidebar active={screen} collapsed />
          <main className="min-w-0 flex-1 bg-hst-bg p-6">
            <Screen />
          </main>
        </div>
      </ScaleBox>
    </div>
  );
}
