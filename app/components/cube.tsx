"use client";

import React from "react";
import "./cube.css";

type Props = {
  className?: string;
  /** Skala scene; podrazumevano 3 */
  scale?: number;
};

export default function Cube({ className = "", scale = 3 }: Props) {
  return (
    <div className={["cube-body", className].join(" ")}>
      <div
        className="scene"
        style={{ ["--scale" as any]: scale } as React.CSSProperties}
        aria-hidden="true"
      >
        {Array.from({ length: 8 }).map((_, i) => (
          <div key={i} className={`cube cube${i + 1}`}>
            <div className="cube__side" />
            <div className="cube__side" />
            <div className="cube__side" />
            <div className="cube__side" />
            <div className="cube__side" />
            <div className="ball" />
          </div>
        ))}
      </div>
    </div>
  );
}
