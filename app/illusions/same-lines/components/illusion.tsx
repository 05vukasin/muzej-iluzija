"use client";

import { useContext, useEffect, useRef, useState } from "react";
import { LanguageContext } from "@/app/context/LanguageContext";

export default function Illusion() {
  const { language } = useContext(LanguageContext);
  const isSr = language === "sr";

  const t = {
    title: isSr ? "Iste linije različite dužine" : "Equal Lines, Different Lengths",
    lead: isSr
      ? "Miler-Lajer: dve potpuno jednake linije deluju različite dužine zbog „strelica“ na krajevima. Uključi/isključi strelice i uporedi."
      : "Müller-Lyer: two identical lines look different in length because of end ‘arrows’. Toggle the arrows and compare.",
    toggleOn: isSr ? "Isključi strelice" : "Hide arrows",
    toggleOff: isSr ? "Uključi strelice" : "Show arrows",
  };

  // Responsive canvas
  const wrapRef = useRef<HTMLDivElement | null>(null);
  const [w, setW] = useState(700);
  const [h, setH] = useState(320);

  useEffect(() => {
    const el = wrapRef.current;
    if (!el) return;
    const ro = new ResizeObserver(([entry]) => {
      const cw = entry.contentRect.width;
      const ch = Math.min(Math.max(240, cw * 0.45), 380);
      setW(cw);
      setH(ch);
    });
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  // === GEOMETRY (linije su 50% širine canvasa, centrirane) ===
  const L = w * 0.5;             // 50% canvasa
  const cx = w / 2;
  const x0 = cx - L / 2;
  const x1 = cx + L / 2;

  const y1 = Math.round(h * 0.38);
  const y2 = Math.round(h * 0.62);

  // Arrows
const [showArrows, setShowArrows] = useState(true);
// duže strelice (sa ~14% dužine linije umesto 10%)
const arrowLen = Math.max(18, Math.round(L * 0.14));
const arrowDeg = 30;
const rad = (arrowDeg * Math.PI) / 180;
const ax = Math.cos(rad) * arrowLen;
const ay = Math.sin(rad) * arrowLen;


  const stroke = 6; // debljina "osnovne" linije

  return (
    <div className="rounded-2xl bg-black/65 backdrop-blur-md text-white shadow-2xl ring-1 ring-white/10 p-6 sm:p-8 lg:p-10">
      <h2 className="text-xl sm:text-2xl font-bold tracking-tight">➡️⬅️ {t.title}</h2>
      <p className="mt-2 text-white/80">{t.lead}</p>

      <div ref={wrapRef} className="mt-6 sm:mt-8 mx-auto w-full max-w-[900px]">
        <div
          className="relative w-full rounded-xl ring-1 ring-white/10 shadow-lg bg-white overflow-hidden"
          style={{ height: h }}
          aria-label={isSr ? "Miler-Lajer iluzija – dve iste linije" : "Müller-Lyer illusion – two identical lines"}
        >
          <svg viewBox={`0 0 ${w} ${h}`} width={w} height={h} className="absolute inset-0">
            <rect x="0" y="0" width={w} height={h} fill="#ffffff" />

            {/* GORNJA: strelice ka unutra  <——> */}
            <line x1={x0} y1={y1} x2={x1} y2={y1} stroke="#111" strokeWidth={stroke} strokeLinecap="round" />
            {showArrows && (
              <>
                {/* levo krilca (ka unutra) */}
                <line x1={x0} y1={y1} x2={x0 + ax} y2={y1 - ay} stroke="#111" strokeWidth={stroke} />
                <line x1={x0} y1={y1} x2={x0 + ax} y2={y1 + ay} stroke="#111" strokeWidth={stroke} />
                {/* desno krilca (ka unutra) */}
                <line x1={x1} y1={y1} x2={x1 - ax} y2={y1 - ay} stroke="#111" strokeWidth={stroke} />
                <line x1={x1} y1={y1} x2={x1 - ax} y2={y1 + ay} stroke="#111" strokeWidth={stroke} />
              </>
            )}

            {/* DONJA: strelice ka spolja  >——< */}
            <line x1={x0} y1={y2} x2={x1} y2={y2} stroke="#111" strokeWidth={stroke} strokeLinecap="round" />
            {showArrows && (
              <>
                {/* levo krilca (ka spolja) */}
                <line x1={x0} y1={y2} x2={x0 - ax} y2={y2 - ay} stroke="#111" strokeWidth={stroke} />
                <line x1={x0} y1={y2} x2={x0 - ax} y2={y2 + ay} stroke="#111" strokeWidth={stroke} />
                {/* desno krilca (ka spolja) */}
                <line x1={x1} y1={y2} x2={x1 + ax} y2={y2 - ay} stroke="#111" strokeWidth={stroke} />
                <line x1={x1} y1={y2} x2={x1 + ax} y2={y2 + ay} stroke="#111" strokeWidth={stroke} />
              </>
            )}
          </svg>
        </div>

        <div className="mt-4 flex justify-end">
          <button
            onClick={() => setShowArrows((s) => !s)}
            className={[
              "rounded-full px-4 py-2 font-semibold transition shadow-sm ring-1",
              showArrows
                ? "bg-brand-235 text-white ring-transparent hover:brightness-110"
                : "bg-white/85 text-primary ring-black/10 hover:bg-white",
            ].join(" ")}
          >
            {showArrows ? t.toggleOn : t.toggleOff}
          </button>
        </div>
      </div>
    </div>
  );
}
