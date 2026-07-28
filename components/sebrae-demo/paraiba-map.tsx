// Static recreation of the hand-built SVG choropleth of Paraíba — all 223
// municipalities from the real IBGE geometry (simplified), no map library,
// exactly like the original product.

import { PARAIBA_PATHS, PARAIBA_VIEWBOX } from "./paraiba-paths";
import { FONT } from "./ui";

export function ParaibaMap({
  selectedId,
  tooltip,
}: {
  selectedId?: string;
  tooltip?: { id: string; name: string };
}) {
  // Selected/highlighted paths render last (SVG has no z-index).
  const sorted = [...PARAIBA_PATHS].sort((a, b) => {
    const za = a.id === selectedId ? 2 : a.id === tooltip?.id ? 1 : 0;
    const zb = b.id === selectedId ? 2 : b.id === tooltip?.id ? 1 : 0;
    return za - zb;
  });

  // Tooltip anchor: approximate centroid of the hovered municipality's path
  // bounding box, derived from its first "M x y" command.
  const tooltipPath = PARAIBA_PATHS.find((p) => p.id === tooltip?.id);
  const anchor = tooltipPath?.d.match(/^M([\d.]+) ([\d.]+)/);

  return (
    <div className="relative w-full">
      <svg viewBox={PARAIBA_VIEWBOX} className="block h-auto w-full">
        {sorted.map((m) => {
          const isSelected = m.id === selectedId;
          const isHovered = m.id === tooltip?.id;
          return (
            <path
              key={m.id}
              d={m.d}
              fill={isSelected || isHovered ? "#D4FE07" : "#1A1C31"}
              stroke={isSelected || isHovered ? "#D4FE07" : "#64748b"}
              strokeWidth={isSelected || isHovered ? 1.25 : 1}
              vectorEffect="non-scaling-stroke"
            />
          );
        })}
        {tooltip && anchor && (
          <foreignObject
            x={Number(anchor[1]) - 90}
            y={Number(anchor[2]) - 56}
            width={180}
            height={44}
            className="overflow-visible"
          >
            <div
              className="opp-glass opp-glass-bevel mx-auto w-fit whitespace-nowrap rounded-full px-4 py-2 text-white"
              style={{ ...FONT.body, fontSize: 12, fontWeight: 600 }}
            >
              {tooltip.name}
            </div>
          </foreignObject>
        )}
      </svg>
    </div>
  );
}
