// app/components/Pyramids.tsx
"use client";

import React from "react";

type Props = {
  /** Visina wrappera (npr. 420, "52vmin", "380px"). Podrazumevano: 420px */
  height?: number | string;
  /** Trajanje rotacije cele scene (sekunde). Default: 60 */
  sceneDuration?: number;
  /** Trajanje rotacije gornje piramide (sekunde). Default: 50 */
  topDuration?: number;
  /** Uključi/isključi pod (grid) */
  showFloor?: boolean;
  /** Dodatne klase za pozicioniranje (npr. absolute bottom-6 right-6) */
  className?: string;
};

export default function Pyramids({
  height = 420,
  sceneDuration = 60,
  topDuration = 50,
  showFloor = true,
  className = "",
}: Props) {
  const hCss = typeof height === "number" ? `${height}px` : height;

  return (
    <div
      className={`pyr3d ${className}`}
      style={
        {
          ["--h" as any]: hCss,                 // visina wrappera
          ["--u" as any]: "calc(var(--h) / 40)",// osnovna jedinica za skaliranje
          ["--durScene" as any]: `${sceneDuration}s`,
          ["--durTop" as any]: `${topDuration}s`,
        } as React.CSSProperties
      }
      aria-hidden="true"
    >
      <div className="scene">
        {showFloor && <div className="floor" />}
        <div className="pyramid bottom">
          <div></div><div></div><div></div><div></div>
        </div>
        <div className="pyramid top">
          <div></div><div></div><div></div><div></div>
        </div>
      </div>

      <style jsx>{`
        /* Wrapper – nema pozadine, sve lokalno */
        .pyr3d {
          position: relative;
          width: auto;
          height: var(--h);
          background: transparent;
          /* perspektiva je na wrapperu, ne na body */
          perspective: calc(var(--u) * 80); /* ~800px u originalu za h≈400 */
          perspective-origin: 50% 50%;
        }

        /* 3D samo unutar komponente */
        .pyr3d * {
          transform-style: preserve-3d;
          box-sizing: border-box;
        }

        .scene {
          position: relative;
          width: 100%;
          height: 100%;
          animation: sceneRotate var(--durScene) linear infinite;
          /* malo “dižemo” scenu kao u originalu (translateY 10em) */
          transform: translateY(calc(var(--u) * 10)) rotateX(-15deg);
        }

        @keyframes sceneRotate {
          from { transform: translateY(calc(var(--u) * 10)) rotateX(-15deg) rotateY(0deg); }
          to   { transform: translateY(calc(var(--u) * 10)) rotateX(-15deg) rotateY(-360deg); }
        }

        /* POD (grid) – ostaje u sceni, nema uticaja na stranu */
        .floor {
          position: absolute;
          inset: calc(var(--u) * -60);
          background-image:
            radial-gradient(closest-side, transparent, #000),
            repeating-radial-gradient(circle at calc(cos(0deg) * 25% + 50%) calc(sin(0deg) * 25% + 50%), transparent 0, #ffdddd22 1em, transparent 1em),
            repeating-radial-gradient(circle at calc(cos(72deg) * 25% + 50%) calc(sin(72deg) * 25% + 50%), transparent 0, #ffdddd22 1em, transparent 1em),
            repeating-radial-gradient(circle at calc(cos(144deg) * 25% + 50%) calc(sin(144deg) * 25% + 50%), transparent 0, #ffdddd22 1em, transparent 1em),
            repeating-radial-gradient(circle at calc(cos(216deg) * 25% + 50%) calc(sin(216deg) * 25% + 50%), transparent 0, #ffdddd22 1em, transparent 1em),
            repeating-radial-gradient(circle at calc(cos(288deg) * 25% + 50%) calc(sin(288deg) * 25% + 50%), transparent 0, #ffdddd22 1em, transparent 1em);
          background-size: auto;
          transform: rotateX(90deg);
          pointer-events: none;
        }

        /* Zajednička podesavanja za piramide i “ciglice” */
        .pyramid {
          --bricks:
            linear-gradient(155deg, brown 0.375em, transparent 0.375em) 0.625em 0.125em / 1em 1em,
            linear-gradient(155deg, brown 0.375em, transparent 0.375em) 0.125em 0.625em / 1em 1em,
            linear-gradient(335deg, maroon 0.375em, transparent 0.375em) 0 0.025em / 1em 1em,
            linear-gradient(335deg, maroon 0.375em, transparent 0.375em) 0.5em 0.525em / 1em 1em;
          position: absolute;
        }

        .pyramid div {
          position: absolute;
          bottom: 0;
          background: linear-gradient(10deg, #0007, #fff3), var(--bricks);
          background-color: sandybrown;
          transform-origin: bottom;
        }
        .pyramid div:nth-child(2) { --angle: 90deg; }
        .pyramid div:nth-child(3) { --angle: 180deg; }
        .pyramid div:nth-child(4) { --angle: 270deg; }

        /* Gornja piramida */
        .pyramid.top {
          transform: translateY(calc(var(--u) * -10));
          animation: topRotate var(--durTop) linear infinite;
        }
        .pyramid.top div {
          left: calc(var(--u) * -4.5);
          width: calc(var(--u) * 9);
          aspect-ratio: 1 / 1;
          transform: rotateY(var(--angle, 0))
            translateZ(calc(var(--u) * 4.5)) rotateX(30deg);
          clip-path: polygon(0 100%, 50% 0, 100% 100%);
        }
        @keyframes topRotate {
          from { transform: translateY(calc(var(--u) * -10)) rotateY(0deg); }
          to   { transform: translateY(calc(var(--u) * -10)) rotateY(-360deg); }
        }

        /* Donja piramida */
        .pyramid.bottom div {
          left: calc(var(--u) * -10);
          width: calc(var(--u) * 20);
          aspect-ratio: 2 / 1;
          transform: rotateY(var(--angle, 0))
            translateZ(calc(var(--u) * 10)) rotateX(30deg);
          clip-path: polygon(0 100%, 25% 0, 75% 0, 100% 100%);
        }
        .pyramid.bottom::before {
          content: "";
          position: absolute;
          inset: calc(var(--u) * -5);
          background: radial-gradient(#000a 75%, #fff3), var(--bricks);
          background-color: sandybrown;
          transform: rotateX(90deg) translateZ(calc(var(--u) * 8.66));
        }
        .pyramid.bottom::after {
          content: "";
          position: absolute;
          inset: calc(var(--u) * -11);
          background-color: #0009;
          transform: rotateX(90deg) translateZ(1px);
          filter: blur(calc(var(--u) * 1));
        }
      `}</style>
    </div>
  );
}
