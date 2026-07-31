// Static recreation of the Revoluna check-in moment: a stylized street map
// with the 100 m geofence around the hospital and the success dialog on top.
// The map is hand-drawn SVG — no map library, matching the case's approach.

import { Check, X } from "lucide-react";
import { FONT } from "../ui";

function StreetMap() {
  return (
    <svg
      viewBox="0 0 393 852"
      className="absolute inset-0 h-full w-full"
      preserveAspectRatio="xMidYMid slice"
      aria-hidden
    >
      <rect width="393" height="852" fill="#F4F1EC" />
      {/* blocks */}
      {[
        [-30, 40, 150, 130],
        [150, 20, 170, 120],
        [340, 60, 140, 140],
        [-50, 210, 180, 150],
        [160, 180, 150, 160],
        [330, 240, 160, 130],
        [-20, 400, 160, 150],
        [170, 380, 170, 170],
        [360, 410, 130, 150],
        [-40, 590, 180, 160],
        [170, 590, 160, 150],
        [350, 600, 150, 160],
      ].map(([x, y, w, h], i) => (
        <rect key={i} x={x} y={y} width={w} height={h} rx="10" fill={i % 3 === 0 ? "#EAE6DE" : "#EFEBE3"} />
      ))}
      {/* green patch */}
      <rect x="200" y="640" width="150" height="140" rx="12" fill="#DCEBD3" />
      {/* streets */}
      {[170, 370, 570].map((y) => (
        <rect key={y} x="-10" y={y} width="420" height="16" fill="#ffffff" />
      ))}
      {[130, 330].map((x) => (
        <rect key={x} x={x} y="-10" width="16" height="880" fill="#ffffff" />
      ))}
      {/* diagonal avenue */}
      <path d="M -20 780 L 420 520" stroke="#FFE8A3" strokeWidth="22" fill="none" />
      <path d="M -20 780 L 420 520" stroke="#F6D678" strokeWidth="3" fill="none" />
      {/* street names */}
      <text x="40" y="182" fontSize="11" fill="#9A958C" fontFamily="var(--font-geologica), sans-serif">
        R. Santa Madalena
      </text>
      <text x="196" y="382" fontSize="11" fill="#9A958C" fontFamily="var(--font-geologica), sans-serif">
        R. Pio XII
      </text>
      <text x="250" y="600" fontSize="11" fill="#9A958C" fontFamily="var(--font-geologica), sans-serif" transform="rotate(-31 250 600)">
        Av. 23 de Maio
      </text>

      {/* 100 m geofence */}
      <circle cx="196" cy="330" r="120" fill="var(--color-rev-primary)" opacity="0.16" />
      <circle
        cx="196"
        cy="330"
        r="120"
        fill="none"
        stroke="var(--color-rev-primary)"
        strokeWidth="2.5"
        strokeDasharray="10 8"
      />
      {/* hospital marker */}
      <g transform="translate(196 330)">
        <path
          d="M0 -26 C 12 -26 20 -18 20 -7 C 20 6 0 22 0 22 C 0 22 -20 6 -20 -7 C -20 -18 -12 -26 0 -26 Z"
          fill="#E4405F"
        />
        <circle cx="0" cy="-8" r="9" fill="#ffffff" />
        <path d="M-4 -8 h8 M0 -12 v8" stroke="#E4405F" strokeWidth="2.6" />
      </g>
      {/* user location dot */}
      <circle cx="238" cy="392" r="10" fill="#4285F4" stroke="#ffffff" strokeWidth="3" />
    </svg>
  );
}

export function CheckinScreen() {
  return (
    <div className="relative h-full bg-white">
      <StreetMap />

      {/* distance chip */}
      <div
        className="absolute left-1/2 top-16 z-10 -translate-x-1/2 rounded-full bg-white px-4 py-2 text-rev-text shadow-md"
        style={{ ...FONT.body, fontSize: 12 }}
      >
        Você está a <span style={FONT.display}>62 m</span> do hospital
      </div>

      {/* dim + success dialog */}
      <div className="absolute inset-0 z-20 flex items-center justify-center bg-rev-text/30 px-8">
        <div className="relative w-full rounded-2xl bg-white px-6 pb-8 pt-7 text-center shadow-2xl">
          <X size={18} className="absolute right-4 top-4 text-rev-tertiary" />
          <p className="text-rev-text" style={{ ...FONT.heading, fontSize: 20 }}>
            Check-in realizado!
          </p>
          <div className="mt-6 flex justify-center">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-rev-primary">
              <Check size={34} className="text-white" strokeWidth={3} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
