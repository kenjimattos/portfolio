"use client";

import { ReactNode, useState } from "react";
import { geologica } from "./geologica";
import { ScaleBox } from "./scale-box";
import { DemoSidebar } from "./demo-sidebar";
import { SCREENS, type ScreenId } from "./screens";
import { cx } from "./ui";

const APP_WIDTH = 1440;
const APP_HEIGHT = 860;
const SCREEN_WIDTH = 1240;

function BrowserChrome({ path }: { path: string }) {
  return (
    <div className="flex items-center gap-4 border-b border-hst-border bg-white px-4 py-2.5 rounded-t-xl">
      <div className="flex gap-1.5" aria-hidden>
        <span className="h-3 w-3 rounded-full bg-[#FF5F57]" />
        <span className="h-3 w-3 rounded-full bg-[#FEBC2E]" />
        <span className="h-3 w-3 rounded-full bg-[#28C840]" />
      </div>
      <div className="flex-1 flex justify-center">
        <div className="flex h-7 w-full max-w-md items-center justify-center rounded-full bg-hst-bg px-4 text-xs text-hst-muted">
          app.houston.med.br{path}
        </div>
      </div>
      <div className="w-10" aria-hidden />
    </div>
  );
}

// Full recreated platform: browser chrome + sidebar + navigable screens.
export function HoustonApp({ initialScreen = "painel" }: { initialScreen?: ScreenId }) {
  const [screen, setScreen] = useState<ScreenId>(initialScreen);
  const [collapsed, setCollapsed] = useState(false);
  const { component: Screen, path } = SCREENS[screen];

  return (
    <div
      className={cx(
        geologica.variable,
        "hst-app overflow-hidden rounded-xl border border-hst-border bg-white shadow-[0_24px_60px_-24px_rgba(22,22,22,0.25)]"
      )}
      style={{ fontFamily: "var(--font-geologica), sans-serif" }}
    >
      <ScaleBox designWidth={APP_WIDTH}>
        <div className="font-extralight text-hst-fg antialiased">
          <BrowserChrome path={path} />
          <div className="flex" style={{ height: APP_HEIGHT }}>
            <DemoSidebar
              active={screen}
              onNavigate={setScreen}
              collapsed={collapsed}
              onToggleCollapsed={() => setCollapsed(!collapsed)}
            />
            <main className="flex-1 overflow-y-auto bg-hst-bg p-6">
              <Screen />
            </main>
          </div>
        </div>
      </ScaleBox>
    </div>
  );
}

// A compact recreated UI fragment (cards, modals, panels) — used inside
// split-layout feature sections where a full screen would be too large.
// `maxWidth` caps the rendered size (ScaleBox scales content down to fit),
// so fragments can appear smaller than real size and centered.
export function HoustonPanel({
  designWidth,
  maxWidth,
  children,
}: {
  designWidth: number;
  maxWidth?: number;
  children: ReactNode;
}) {
  return (
    <div
      className={cx(
        geologica.variable,
        "hst-app overflow-hidden rounded-xl border border-hst-border bg-hst-bg shadow-[0_20px_50px_-24px_rgba(22,22,22,0.22)]",
        maxWidth !== undefined && "mx-auto w-full"
      )}
      style={{ fontFamily: "var(--font-geologica), sans-serif", maxWidth }}
    >
      <ScaleBox designWidth={designWidth}>
        <div className="p-4 font-extralight text-hst-fg antialiased">{children}</div>
      </ScaleBox>
    </div>
  );
}

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
