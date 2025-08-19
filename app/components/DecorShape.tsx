// app/components/DecorShape.tsx
"use client";

import React from "react";

type Props = {
  height?: number | string;   // default 60vmin
  duration?: number;          // default 4s (uklj. pauze)
  className?: string;
  /** Ako želiš da se vide pomoćne linije (debug grid) */
  showGuides?: boolean;
};

export default function DecorShape({
  height = 60,
  duration = 4,
  className = "",
  showGuides = false,
}: Props) {
  const hCss = typeof height === "number" ? `${height}vmin` : height;

  return (
    <div
      className={`decor3d ${showGuides ? "with-guides" : ""} ${className}`}
      style={
        {
          ["--h" as any]: hCss,
          ["--u" as any]: `calc(var(--h) / 60)`,
          ["--dur" as any]: `${duration}s`,
        } as React.CSSProperties
      }
      aria-hidden="true"
    >
      <div className="content">
        <div className="shape">
          {Array.from({ length: 6 }).map((_, idx) => (
            <div key={idx} className={`cube step${idx + 1}`}>
              <div className="side" />
              <div className="side" />
              <div className="side" />
              <div className="side" />
              <div className="side" />
              <div className="side" />
            </div>
          ))}
        </div>
      </div>

      <style jsx>{`
        .decor3d { position: relative; width: var(--w, calc(var(--h) * 1.5)); height: var(--h); }
        .decor3d, .decor3d * { transform-style: preserve-3d; box-sizing: border-box; }

        .content {
          width: 100%; height: 100%;
          display: flex; justify-content: center; align-items: center;
          perspective: calc(var(--u) * 1500); perspective-origin: center;
          filter: drop-shadow(calc(var(--u) * -8) calc(var(--u) * 12) calc(var(--u) * 2) rgba(0,0,0,.12));
        }

        .shape { position: relative; top: calc(var(--u) * -15); animation: autoMove var(--dur) ease-in-out infinite both; }
        @keyframes autoMove {
          0%,12% { transform: rotateX(-35deg) rotateY(-45deg); }
          44%,56% { transform: rotateX(-20deg) rotateY(-125deg) translateZ(calc(var(--u) * -22)) translateY(calc(var(--u) * 5)); }
          88%,100% { transform: rotateX(-35deg) rotateY(-45deg); }
        }

        .cube { --width:10; --height:10; --depth:10; --hue:150; --sat:25%; width: calc(var(--width)*var(--u)); height: calc(var(--height)*var(--u)); position: absolute; }
        .side { position: absolute; top: 50%; left: 50%; width: 100%; height: 100%; }

        /* --- POMOĆNE LINIJE ISKLJUČENE PODRAZUMEVANO --- */
        .side::before, .side::after { content: none; }

        /* Ako želiš debug linije, dodaj prop showGuides ili klasu with-guides */
        .with-guides .side::before, .with-guides .side::after {
          content: "";
          position: absolute; inset: 0;
          background:
            repeating-conic-gradient(#0003 0%, #0000 .0003%, #0000 .0006%, #0000 .00099%),
            repeating-conic-gradient(#fff2 0%, #0000 .0005%, #0000 .0015%, #0000 .019%);
          background-size: 102% 102%;
        }
        .with-guides .side::after { filter: blur(2px); }

        .side:nth-of-type(1) { transform: translate3d(-50%,-50%, calc(var(--depth)*var(--u)*.5));  background: hsl(var(--hue), var(--sat), 40%); }
        .side:nth-of-type(2) { transform: translate3d(-50%,-50%, calc(var(--depth)*var(--u)*-.5)) rotateY(180deg); background: hsl(var(--hue), var(--sat), 30%); animation: light var(--dur) ease-in-out infinite alternate; }
        .side:nth-of-type(3) { width: calc(var(--depth)*var(--u)); transform: translate(-50%,-50%) rotateY(90deg)  translate3d(0,0, calc(var(--width)*var(--u)*.5)); background: hsl(var(--hue), var(--sat), 80%); animation: light var(--dur) ease-in-out infinite alternate-reverse; }
        .side:nth-of-type(4) { width: calc(var(--depth)*var(--u)); transform: translate(-50%,-50%) rotateY(-90deg) translate3d(0,0, calc(var(--width)*var(--u)*.5)); background: hsl(var(--hue), var(--sat), 70%); }
        .side:nth-of-type(5) { height: calc(var(--depth)*var(--u)); transform: translate(-50%,-50%) rotateX(90deg)  translate3d(0,0, calc(var(--height)*var(--u)*.5)); background: hsl(var(--hue), var(--sat), 60%); }
        .side:nth-of-type(6) { height: calc(var(--depth)*var(--u)); transform: translate(-50%,-50%) rotateX(-90deg) translate3d(0,0, calc(var(--height)*var(--u)*.5)); background: hsl(var(--hue), var(--sat), 60%); }

        @keyframes light { 0%{background:hsl(var(--hue),var(--sat),40%)} 100%{background:hsl(var(--hue),var(--sat),80%)} }

        .step1 { transform: translate3d(calc(var(--u)*-22),0,0); --width:22; }
        .step2 { transform: translate3d(calc(var(--u)*-22), calc(var(--u)*9.95), 0); --height:12; }
        .step3 { transform: translate3d(calc(var(--u)*5), 0, 0); --width:22; }
        .step4 { transform: translate3d(calc(var(--u)*17), 0, calc(var(--u)*10.85)); --depth:12; }
        .step5 { transform: translate3d(calc(var(--u)*17), 0, calc(var(--u)*32)); --depth:22; }
        .step6 { transform: translate3d(calc(var(--u)*17), calc(var(--u)*-11.85), calc(var(--u)*38)); --height:12; }

        .step3 .side:nth-of-type(1) { width: 53%; left: 26%; }
        .step4 .side:nth-of-type(2) { display: none; }
        .step5 .side:nth-of-type(5) { background: linear-gradient(180deg, hsl(var(--hue), var(--sat), 60%) 0 55%, transparent 55% 100%); }
        .step6 .side:nth-of-type(6) { display: none; }
        .step6 .side:nth-of-type(5) { clip-path: polygon(0 100%, 0 55%, 52% 55%, 52% 0, 100% 0, 100% 100%); }
        .step6 .side:nth-of-type(4) { clip-path: polygon(0 100%, 0 50%, 55% 55%, 55% 0, 100% 0, 100% 100%); }
        .step6 .side:nth-of-type(2) { clip-path: polygon(0 0, 47% 0, 47% 50%, 100% 50%, 100% 100%, 0 100%); }
      `}</style>
    </div>
  );
}
