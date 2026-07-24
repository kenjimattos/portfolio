"use client";

import { ReactNode, useEffect, useRef, useState } from "react";

// Renders children at a fixed design width and scales them down to fit the
// container, preserving interactivity. Height follows the scaled content.
export function ScaleBox({ designWidth, children }: { designWidth: number; children: ReactNode }) {
  const outerRef = useRef<HTMLDivElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(1);
  const [height, setHeight] = useState<number | undefined>(undefined);

  useEffect(() => {
    const outer = outerRef.current;
    const inner = innerRef.current;
    if (!outer || !inner) return;

    const update = () => {
      // Scale up as well as down so the app always fills the container width
      // (no dead space on viewports wider than the design width).
      const s = outer.clientWidth / designWidth;
      setScale(s);
      setHeight(inner.offsetHeight * s);
    };

    update();
    const ro = new ResizeObserver(update);
    ro.observe(outer);
    ro.observe(inner);
    return () => ro.disconnect();
  }, [designWidth]);

  return (
    <div ref={outerRef} style={{ height }} className="w-full overflow-hidden">
      <div
        ref={innerRef}
        style={{ width: designWidth, transform: `scale(${scale})`, transformOrigin: "top left" }}
      >
        {children}
      </div>
    </div>
  );
}
