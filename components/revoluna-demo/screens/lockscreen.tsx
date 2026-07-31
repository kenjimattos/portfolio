// Static recreation of the lock screen with Revoluna push notifications
// (Firebase Cloud Messaging): check-in reminder and shift-closed alert.

import { Camera, Flashlight, LockOpen } from "lucide-react";
import { LOCK_NOTIFICATIONS } from "../data";
import { FONT, RevLogo } from "../ui";

export function LockScreen() {
  return (
    <div
      className="relative flex h-full flex-col"
      style={{
        background:
          "linear-gradient(170deg, #5B2496 0%, #4A1D80 45%, #3A1566 100%)",
      }}
    >
      {/* lock + clock */}
      <div className="flex flex-col items-center pt-16 text-white">
        <LockOpen size={20} className="opacity-90" />
        <p
          className="mt-2"
          style={{ ...FONT.body, fontWeight: 250, fontSize: 76, lineHeight: 1.05 }}
        >
          19:00
        </p>
        <p style={{ ...FONT.body, fontSize: 16, opacity: 0.9 }}>
          quarta-feira, 02 de Julho
        </p>
      </div>

      {/* notifications */}
      <div className="mt-8 flex flex-col gap-2.5 px-3.5">
        {LOCK_NOTIFICATIONS.map((n) => (
          <div
            key={n.title}
            className="rounded-3xl bg-white/85 p-3.5 shadow-lg backdrop-blur-md"
          >
            <div className="flex items-start gap-3">
              <RevLogo size={38} />
              <div className="min-w-0 flex-1">
                <div className="flex items-baseline justify-between gap-2">
                  <span className="text-rev-text" style={{ ...FONT.display, fontSize: 14 }}>
                    {n.title}
                  </span>
                  <span className="shrink-0 text-rev-text/50" style={{ ...FONT.body, fontSize: 12 }}>
                    {n.when}
                  </span>
                </div>
                <p
                  className="mt-0.5 text-rev-text/85"
                  style={{ ...FONT.body, fontSize: 13, lineHeight: 1.35 }}
                >
                  {n.body}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* flashlight / camera */}
      <div className="absolute inset-x-0 bottom-12 flex items-center justify-between px-10">
        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white/15 backdrop-blur">
          <Flashlight size={20} className="text-white" />
        </div>
        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white/15 backdrop-blur">
          <Camera size={20} className="text-white" />
        </div>
      </div>
    </div>
  );
}
