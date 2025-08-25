"use client";

import { useContext, useEffect, useMemo, useRef, useState } from "react";
import { LanguageContext } from "@/app/context/LanguageContext";

/**
 * "Oči koje te prate" — interaktivna demonstracija reverzije dubine.
 * Ideja: "konkavne" oči (inverzna senka) + suptilna 3D rotacija
 * scene u smeru SUPROTNO od kretanja kursora/telefona → deluje kao da oči prate posmatrača.
 */

export default function Illusion() {
  const { language } = useContext(LanguageContext);
  const isSr = language === "sr";

  // jačina efekta (utiče na nagib i raspon svetlosnog "hotspota")
  const [strength, setStrength] = useState(60); // 20–120 preporučeno
  // da li tretiramo oči kao "konkavne" (inverzno ponašanje)
  const [concave, setConcave] = useState(true);

  // normalizovane komponente kretanja -1..1
  const [nx, setNx] = useState(0); // levo (-1) ↔ desno (+1)
  const [ny, setNy] = useState(0); // gore (-1) ↔ dole (+1)

  const boxRef = useRef<HTMLDivElement | null>(null);

  // izračunaj iz Nx/Ny transformacije i offsete za osvetljenje
  const { rx, ry, lightDx, lightDy } = useMemo(() => {
    // max nagib u stepenima (2°..16°)
    const maxDeg = 2 + (Math.min(120, Math.max(20, strength)) - 20) * (14 / 100);
    // svetlosni offset u px (8..36)
    const maxLight = 8 + (Math.min(120, Math.max(20, strength)) - 20) * (28 / 100);

    // konkavna “reverzija”: scena se naginje u SUPROTNOM smeru od kretanja
    const sign = concave ? -1 : 1;

    // rotacije (X = vertikalno, Y = horizontalno)
    const rx_ = sign * ny * maxDeg;
    const ry_ = sign * nx * maxDeg;

    // pomeraj “hotspota” osvetljenja u suprotnom smeru (pojačava konkavnost)
    const ldx = sign * -nx * maxLight;
    const ldy = sign * -ny * maxLight;

    return { rx: rx_, ry: ry_, lightDx: ldx, lightDy: ldy };
  }, [nx, ny, strength, concave]);

  // mišem / prstom — čitanje relativne pozicije unutar ploče
  useEffect(() => {
    const el = boxRef.current;
    if (!el) return;

    const onMove = (clientX: number, clientY: number) => {
      const rect = el.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      // normalizacija -1..1
      const nx_ = Math.max(-1, Math.min(1, (clientX - cx) / (rect.width / 2)));
      const ny_ = Math.max(-1, Math.min(1, (clientY - cy) / (rect.height / 2)));
      setNx(nx_);
      setNy(ny_);
    };

    const pointerMove = (e: PointerEvent) => onMove(e.clientX, e.clientY);
    const leave = () => {
      setNx(0);
      setNy(0);
    };

    el.addEventListener("pointermove", pointerMove);
    el.addEventListener("pointerleave", leave);

    return () => {
      el.removeEventListener("pointermove", pointerMove);
      el.removeEventListener("pointerleave", leave);
    };
  }, []);

  const t = {
    title: isSr ? "Oči koje te prate" : "Eyes That Follow You",
    lead: isSr
      ? "Pomeri se levo-desno ili gore-dole i posmatraj kako te oči 'prate'."
      : "Move left-right or up-down and watch the eyes ‘follow’ you.",
    strength: isSr ? "Jačina efekta" : "Effect strength",
    depth: isSr ? "Konkavno (reverzija dubine)" : "Concave (depth reversal)",
    reset: isSr ? "Reset" : "Reset",
    hint: isSr
      ? "Savjet: probaj sporije pomeranje i gledaj samo jednu zenicu."
      : "Tip: move slowly and focus on a single pupil.",
  };

  return (
    <div className="rounded-2xl bg-black/65 backdrop-blur-md text-white shadow-2xl ring-1 ring-white/10 p-6 sm:p-8 lg:p-10">
      <h2 className="text-xl sm:text-2xl font-bold tracking-tight">{t.title}</h2>
      <p className="mt-2 text-white/80">{t.lead}</p>

      {/* Ploča sa “maskom” */}
      <div className="mt-6 sm:mt-8 mx-auto w-full max-w-[880px]">
        <div
          ref={boxRef}
          className="
            group relative mx-auto
            rounded-xl ring-1 ring-white/10 shadow-lg overflow-hidden
            bg-gradient-to-b from-neutral-900 to-neutral-800
            will-change-transform
            flex items-center justify-center
          "
          style={{
            // široka i niska (lice u landscape-u), bez overflow-a na mobilnom
            width: "min(92vw, 880px)",
            height: "min(64vw, 360px)",
            perspective: "900px",
          }}
          aria-label={isSr ? "Konkavne oči — interaktivna iluzija" : "Concave eyes — interactive illusion"}
        >
          {/* “Mask” — nosni most i oči u jednom kontejneru koji se blago rotira */}
          <div
            className="relative w-[90%] max-w-[740px] h-[72%] rounded-3xl bg-neutral-700/20"
            style={{
              transform: `rotateX(${rx}deg) rotateY(${ry}deg)`,
              transformStyle: "preserve-3d",
              transition: "transform 80ms linear",
            }}
          >
            {/* Nosni most (suptilno) */}
            <div
              className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
              style={{
                width: "10%",
                height: "58%",
                borderRadius: "9999px",
                background:
                  "linear-gradient(180deg, rgba(255,255,255,0.08), rgba(0,0,0,0.15))",
                boxShadow: "inset 0 0 10px rgba(0,0,0,0.25)",
              }}
              aria-hidden
            />

            {/* Levo & desno oko */}
            <Eye
              side="left"
              lightDx={lightDx}
              lightDy={lightDy}
              concave={concave}
            />
            <Eye
              side="right"
              lightDx={lightDx}
              lightDy={lightDy}
              concave={concave}
            />
          </div>

          {/* Info bedž */}
          <div className="absolute left-1/2 -translate-x-1/2 bottom-3 text-xs sm:text-sm bg-black/55 text-white px-3 py-1 rounded-full">
            {t.hint}
          </div>
        </div>
      </div>

      {/* Kontrole */}
      <div className="mt-6 space-y-5">
        {/* Strength slider */}
        <div>
          <div className="flex items-center justify-between text-sm sm:text-base">
            <span className="text-white/90">{t.strength}</span>
            <span className="tabular-nums text-white/80">{strength}</span>
          </div>
          <input
            type="range"
            min={20}
            max={120}
            value={strength}
            onChange={(e) => setStrength(parseInt(e.target.value, 10))}
            className="mt-3 w-full accent-brand-235"
          />
        </div>

        {/* Concave toggle + Reset */}
        <div className="flex items-center gap-4 flex-wrap">
          <label className="inline-flex items-center gap-2 text-sm sm:text-base">
            <input
              type="checkbox"
              checked={concave}
              onChange={(e) => setConcave(e.target.checked)}
              className="size-4 accent-brand-235"
            />
            <span className="text-white/90">{t.depth}</span>
          </label>

          <button
            onClick={() => {
              setStrength(60);
              setConcave(true);
              setNx(0);
              setNy(0);
            }}
            className="rounded-full bg-white/80 text-primary px-4 py-2 font-semibold ring-1 ring-black/10 hover:bg-white transition"
          >
            {t.reset}
          </button>
        </div>
      </div>
    </div>
  );
}

function Eye({
  side,
  lightDx,
  lightDy,
  concave,
}: {
  side: "left" | "right";
  lightDx: number;
  lightDy: number;
  concave: boolean;
}) {
  // bazne pozicije očiju (simetrično)
  const baseLeft = side === "left" ? "28%" : "72%";

  // boje i senke oka: kombinujemo inverzni highlight (konkavno)
  const highlight = `radial-gradient(
    circle at calc(50% + ${lightDx}px) calc(50% + ${lightDy}px),
    rgba(255,255,255,${concave ? 0.28 : 0.08}) 0%,
    rgba(255,255,255,0.08) 22%,
    rgba(0,0,0,${concave ? 0.26 : 0.36}) 80%
  )`;

  return (
    <div
      className="absolute top-1/2 -translate-y-1/2"
      style={{ left: baseLeft, transform: "translate(-50%, -50%)" }}
      aria-hidden
    >
      {/* “udubljena” očna šupljina */}
      <div
        className="relative"
        style={{
          width: "clamp(90px, 18vw, 160px)",
          height: "clamp(90px, 18vw, 160px)",
          borderRadius: "50%",
          background: highlight,
          boxShadow:
            "inset 0 10px 25px rgba(0,0,0,0.35), inset 0 -8px 18px rgba(255,255,255,0.05)",
        }}
      >
        {/* beonjača */}
        <div
          className="absolute inset-0"
          style={{
            borderRadius: "50%",
            background:
              "radial-gradient(circle at 50% 60%, rgba(255,255,255,0.85), rgba(255,255,255,0.65) 40%, rgba(230,230,230,0.9) 70%, rgba(210,210,210,0.8))",
            mixBlendMode: "screen",
            opacity: 0.35,
          }}
        />

        {/* zenica (ne pomera se – mozak 'simulira' praćenje) */}
        <div
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
          style={{
            width: "28%",
            height: "28%",
            borderRadius: "50%",
            background:
              "radial-gradient(circle at 50% 45%, rgba(0,0,0,0.9), rgba(0,0,0,1) 70%)",
            boxShadow: "0 2px 8px rgba(0,0,0,0.55)",
          }}
        />
      </div>
    </div>
  );
}
