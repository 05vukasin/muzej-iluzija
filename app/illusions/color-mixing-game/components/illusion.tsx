"use client";

import { useContext, useMemo, useState } from "react";
import { LanguageContext } from "@/app/context/LanguageContext";

export default function Illusion() {
  const { language } = useContext(LanguageContext);
  const isSr = language === "sr";

  // Start na 1 -> 1× brzina (1s po krugu)
  const [slider, setSlider] = useState(10);

  const { duration, multiplier } = useMemo(() => {
    const BASE_PERIOD = 1.0;       // 1s po rotaciji (najsporije)
    const MAX_MULTIPLIER = 50;     // max 50× brže

    const t = (slider - 1) / 99;   // 0..1
    const factor = 1 + Math.pow(t, 1.6) * (MAX_MULTIPLIER - 1); // 1..MAX
    const period = BASE_PERIOD / factor;

    return { duration: period, multiplier: factor };
  }, [slider]);

  return (
    <div className="rounded-2xl bg-black/65 backdrop-blur-md text-white shadow-2xl ring-1 ring-white/10 p-6 sm:p-8 lg:p-10">
      <h2 className="text-xl sm:text-2xl font-bold tracking-tight">
        {isSr ? "Optičko mešanje: točak boja" : "Optical Mixing: Color Wheel"}
      </h2>

      <div
        className="mx-auto mt-6 sm:mt-8 wheel"
        style={{ ["--spinDur" as any]: `${duration}s` }}
        aria-label={isSr ? "Točak boja koji se rotira" : "Rotating color wheel"}
      />

      <div className="mt-6 sm:mt-8">
        <label className="flex items-center justify-between text-sm sm:text-base">
          <span className="text-white/90">
            {isSr ? "Brzina rotacije" : "Rotation speed"}
          </span>
          <span className="tabular-nums text-white/90">
            {Math.max(1, Math.round(multiplier))}×
          </span>
        </label>

        <input
          type="range"
          min={1}
          max={100}
          value={slider}
          onChange={(e) => setSlider(parseInt(e.target.value, 10))}
          className="mt-3 w-full accent-brand-235"
          aria-label={isSr ? "Podesi brzinu rotacije" : "Adjust rotation speed"}
        />

        <p className="mt-2 text-xs text-white/70">
          {isSr
            ? "Pomeraj klizač da usporiš ili ubrzaš rotaciju."
            : "Drag the slider to slow down or speed up the rotation."}
        </p>
      </div>

      <style jsx>{`
        .wheel {
          width: clamp(220px, 45vw, 420px);
          height: clamp(220px, 45vw, 420px);
          border-radius: 9999px;
          background: conic-gradient(
            #22c55e 0deg 120deg,
            #3b82f6 120deg 240deg,
            #ef4444 240deg 360deg
          );
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.25),
            inset 0 0 0 1px rgba(255, 255, 255, 0.06);
          animation: spin var(--spinDur) linear infinite;
          will-change: transform;
        }
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
}
