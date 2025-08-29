"use client";

import { useContext, useEffect, useMemo, useRef, useState } from "react";
import { LanguageContext } from "@/app/context/LanguageContext";

export default function Illusion() {
  const { language } = useContext(LanguageContext);
  const isSr = language === "sr";

  const t = {
    title: isSr ? "Iluzija velikih/malih krugova" : "Ebbinghaus Illusion",
    lead: isSr
      ? "Oba ljubičasta kruga su iste veličine. Levo je okružen velikim sivim krugovima, desno malim sivim krugovima. Klikni dugme da ukloniš sive krugove i uporediš centralne."
      : "Both purple circles are equal. The left is surrounded by large gray circles, the right by small gray circles. Click the button to remove surrounds and compare centers.",
    btnHide: isSr ? "Ukloni sive krugove" : "Hide gray circles",
    btnShow: isSr ? "Vrati sive krugove" : "Show gray circles",
  };

  // Responsive canvas
  const wrapRef = useRef<HTMLDivElement | null>(null);
  const [w, setW] = useState(740);
  const [h, setH] = useState(420);
  useEffect(() => {
    const el = wrapRef.current;
    if (!el) return;
    const ro = new ResizeObserver(([entry]) => {
      const cw = entry.contentRect.width;
      const ch = Math.min(Math.max(300, cw * 0.56), 520);
      setW(cw);
      setH(ch);
    });
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  // Dimenzije (centralni manji; veliki sivi VEĆI; mali sivi BLIŽE)
  const dims = useMemo(() => {
    const small = w < 560;

    // Centralni ljubičasti — zadržan manji
    const C_R = Math.round(Math.min(40, Math.max(18, w * (small ? 0.045 : 0.04))));

    // VEĆI sivi (povećano!)
    const BIG_R = Math.round(C_R * (small ? 1.35 : 1.45));

    // Mali sivi (isti prečnik kao ranije) ali ćemo im smanjiti prsten da budu bliže
    const SMALL_R = Math.round(C_R * (small ? 0.44 : 0.46));

    const PADDING = Math.round(C_R * 0.8);

    // Prstenovi: veliki sivi standardno odmaknuti da ne diraju centralni,
    // mali sivi PUNO bliže (smanjen dodatni razmak).
    const ringBig = C_R + BIG_R + (small ? 6 : 8);
    const ringSmall = C_R + SMALL_R + (small ? 3 : 5);

    return { C_R, BIG_R, SMALL_R, PADDING, ringBig, ringSmall, small };
  }, [w]);

  const { C_R, BIG_R, SMALL_R, PADDING, ringBig, ringSmall, small } = dims;

  // Pozicije (ostavljam tvoje vrednosti)
  const centerY = Math.round(h * 0.5);
  const toPct = (px: number) => (px / w) * 100;
  const leftX = toPct(w * (small ? 0.25 : 0.25));
  const rightX = toPct(w * (small ? 0.75 : 0.75));
  const yPct = (centerY / h) * 100;

  // Vidljivost sivih krugova
  const [showSurround, setShowSurround] = useState(true);

  // Krug (bez outline-a) — ispravno: prečnik = 2 * r
  function Circle({
    x,
    y,
    r,
    fill,
    opacity = 1,
  }: {
    x: number;
    y: number;
    r: number;
    fill: string;
    opacity?: number;
  }) {
    const d = r * 1.8;
    return (
      <div
        className="absolute"
        style={{
          left: x,
          top: y,
          width: d,
          height: d,
          transform: "translate(-50%, -50%)",
          borderRadius: "9999px",
          background: fill,
          opacity,
          transition:
            "opacity 300ms ease, left 400ms cubic-bezier(.2,.8,.2,1), top 400ms cubic-bezier(.2,.8,.2,1)",
        }}
      />
    );
  }

  // Klaster (centralni + okolina)
  function Cluster({
    xPercent,
    yPercent,
    surroundR,
    ringR,
  }: {
    xPercent: number;
    yPercent: number;
    surroundR: number;
    ringR: number;
  }) {
    const xPx = (xPercent / 100) * w;
    const yPx = (yPercent / 100) * h;

    // 6 okružujućih
    const N = 6;
    const surround = Array.from({ length: N }, (_, i) => {
      const ang = (i / N) * Math.PI * 2;
      return {
        key: i,
        x: xPx + Math.cos(ang) * ringR,
        y: yPx + Math.sin(ang) * ringR,
      };
    });

    return (
      <>
        {surround.map((p) => (
          <Circle
            key={p.key}
            x={p.x}
            y={p.y}
            r={surroundR}
            fill="#d4d4d8" // siva iz teme
            opacity={showSurround ? 1 : 0}
          />
        ))}

        {/* Centralni ljubičasti — ista boja kao dugme */}
        <Circle
          x={xPx}
          y={yPx}
          r={C_R}
          fill={"var(--brand-235, #89cff0)"}
        />
      </>
    );
  }

  return (
    <div className="rounded-2xl bg-black/65 backdrop-blur-md text-white shadow-2xl ring-1 ring-white/10 p-6 sm:p-8 lg:p-10">
      <h2 className="text-xl sm:text-2xl font-bold tracking-tight">🔵 {t.title}</h2>
      <p className="mt-2 text-white/80">{t.lead}</p>

      <div ref={wrapRef} className="mt-6 sm:mt-8 mx-auto w-full max-w-[980px]">
        <div
          className="relative w-full rounded-xl ring-1 ring-white/10 shadow-lg bg-white overflow-hidden"
          style={{ height: h, padding: PADDING }}
          aria-label={isSr ? "Dva centralna kruga na sredini platna" : "Two center circles, middle of canvas"}
        >
          <div className="absolute inset-0">
            {/* Levo: VEĆI sivi okružujući */}
            <Cluster xPercent={leftX}  yPercent={yPct} surroundR={BIG_R}   ringR={ringBig} />
            {/* Desno: mali sivi — BLIŽE ljubičastom */}
            <Cluster xPercent={rightX} yPercent={yPct} surroundR={SMALL_R} ringR={ringSmall} />
          </div>
        </div>

        {/* Jedno dugme — posle prvog klika postaje belo (kao u tvom primeru) */}
        <div className="mt-4 flex justify-end">
          <button
            onClick={() => setShowSurround((s) => !s)}
            className={[
              "rounded-full px-4 py-2 font-semibold transition shadow-sm ring-1",
              showSurround
                ? "bg-brand-235 text-white ring-transparent hover:brightness-110"
                : "bg-white/85 text-primary ring-black/10 hover:bg-white",
            ].join(" ")}
          >
            {showSurround ? t.btnHide : t.btnShow}
          </button>
        </div>
      </div>
    </div>
  );
}
