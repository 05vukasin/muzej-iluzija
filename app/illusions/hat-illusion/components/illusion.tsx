"use client";

import { useContext, useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { LanguageContext } from "@/app/context/LanguageContext";

export default function Illusion() {
  const { language } = useContext(LanguageContext);
  const isSr = language === "sr";

  const t = {
    title: isSr ? "Iluzija šešira (T-iluzija)" : "Hat Illusion (T-illusion)",
    lead: isSr
      ? "Horizontalna i vertikalna linija su iste dužine, ali u T rasporedu horizontala deluje kraće. Rasklopi figuru — linije se prikažu jedna pored druge u centru i vidi se da su iste."
      : "The horizontal and vertical are the same length, but in a T layout the horizontal looks shorter. Unfold — the lines sit side by side in the center and you’ll see they’re identical.",
    unfold: isSr ? "Rasklopi" : "Unfold",
    fold: isSr ? "Sastavi" : "Fold",
  };

  // Responsive canvas
  const wrapRef = useRef<HTMLDivElement | null>(null);
  const [w, setW] = useState(700);
  const [h, setH] = useState(360);

  useEffect(() => {
    const el = wrapRef.current;
    if (!el) return;
    const ro = new ResizeObserver(([entry]) => {
      const cw = entry.contentRect.width;
      const ch = Math.min(Math.max(260, cw * 0.48), 420);
      setW(cw);
      setH(ch);
    });
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  // Geometrija i pozicije
  const cx = w / 2;
  const midY = Math.round(h * 0.5);

  const yUpper = Math.round(h * 0.26); 

  // Dužina linije = 50% canvasa (po zahtevu)
  const L = Math.round(h * 0.5);

  // Horizontalna u T mora biti tačno na donjem kraju vertikalne → 75% visine
  const yT = Math.round(h * 0.75); // midY + L/2

  // Debljina linije
  const stroke = Math.max(8, Math.round(w * 0.014));

  // Raspored u rasklopljenom stanju: jedna levo (40%), druga desno (60%), obe u centru po visini
  const leftX = Math.round(w * 0.55);
  const rightX = Math.round(w * 0.55);

  const [open, setOpen] = useState(false);
  const tr = { type: "spring", stiffness: 240, damping: 28 };

  return (
    <div className="rounded-2xl bg-black/65 backdrop-blur-md text-white shadow-2xl ring-1 ring-white/10 p-6 sm:p-8 lg:p-10">
      <h2 className="text-xl sm:text-2xl font-bold tracking-tight">{t.title}</h2>
      <p className="mt-2 text-white/80">{t.lead}</p>

      <div ref={wrapRef} className="mt-6 sm:mt-8 mx-auto w-full max-w-[900px]">
        <div
          className="relative w-full rounded-xl ring-1 ring-white/10 shadow-lg bg-white overflow-hidden"
          style={{ height: h }}
          aria-label={isSr ? "T-iluzija — interaktivna demonstracija" : "T-illusion — interactive demo"}
        >
          <svg viewBox={`0 0 ${w} ${h}`} width={w} height={h} className="absolute inset-0">
            <rect x="0" y="0" width={w} height={h} fill="#fff" />

            {/* VERTIKALNA linija (u T je vertikalna; u rasklopljenom ostaje vertikalna desno) */}
            <motion.g
              initial={false}
              animate={{
                x: open ? rightX : cx,
                y: open ? midY : midY, // u T stoji centrirana po visini
                rotate: 0,
              }}
              transition={tr}
            >
              {/* crtamo centriran stub visine L */}
              <rect
                x={-stroke / 2}
                y={-L / 2}
                width={stroke}
                height={L}
                rx={stroke / 2}
                fill="#111"
              />
            </motion.g>

            {/* HORIZONTALNA linija (u T je horizontalna na y=75% visine; u rasklopljenom rotira u vertikalnu levo) */}
            <motion.g
              initial={false}
              animate={{
                x: open ? leftX : cx,
                y: open ? yUpper : yT,
                rotate: open ? 90 : 0,
              }}
              transition={tr}
              style={{
                transformBox: "fill-box",
                transformOrigin: "50% 50%",
              }}
            >
              {/* crtamo centrirani "štapić" dužine L; kad je rotate=0 → horizontalan, rotate=90 → vertikalan */}
              <rect
                x={-L / 2}
                y={-stroke / 2}
                width={L}
                height={stroke}
                rx={stroke / 2}
                fill="#111"
              />
            </motion.g>
          </svg>
        </div>

        <div className="mt-4 flex justify-end">
          <button
            onClick={() => setOpen((s) => !s)}
            className={[
              "rounded-full px-4 py-2 font-semibold transition shadow-sm ring-1",
              open
                ? "bg-white/85 text-primary ring-black/10 hover:bg-white"
                : "bg-brand-235 text-white ring-transparent hover:brightness-110",
            ].join(" ")}
          >
            {open ? t.fold : t.unfold}
          </button>
        </div>
      </div>
    </div>
  );
}
