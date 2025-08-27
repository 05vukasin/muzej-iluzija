"use client";

import { useContext, useEffect, useMemo, useRef, useState } from "react";
import { motion, useAnimationControls } from "framer-motion";
import { LanguageContext } from "@/app/context/LanguageContext";

export default function Illusion() {
  const { language } = useContext(LanguageContext);
  const isSr = language === "sr";

  const t = {
    title: isSr ? "Iluzija koračanja" : "Stepping Feet Illusion",
    lead: isSr
      ? "Dve trake iste brzine izgledaju kao da se kreću različitim ritmom — kao da jedna korača, a druga klizi."
      : "Two equal-speed bars appear to move at different rhythms — one ‘steps’ while the other glides.",
    speed: isSr ? "Brzina (po koraku)" : "Speed (per step)",
    pause: isSr ? "Pauza između koraka" : "Pause between steps",
    yellow: isSr ? "Tamnina žute" : "Yellow darkness",
    blue: isSr ? "Tamnina plave" : "Blue darkness",
    ms: "ms",
    s: isSr ? "s" : "s",
  };

  // Responsive širina platna
  const wrapRef = useRef<HTMLDivElement | null>(null);
  const [w, setW] = useState(640);
  useEffect(() => {
    const el = wrapRef.current;
    if (!el) return;
    const ro = new ResizeObserver(([entry]) => {
      setW(entry.contentRect.width);
    });
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  // Parametri iluzije
  const stripesCount = 30;
  const stripeW = w / stripesCount;
  const boxW = stripeW * 4;
  const step = stripeW * 2;
  const steps = Math.max(1, Math.floor((w - boxW) / step));

  // Kontrole
  const [durationPerStep, setDurationPerStep] = useState(1); // s
  const [pauseDuration, setPauseDuration] = useState(0);     // ms (po defaultu 0)
  const [yellowDarkness, setYellowDarkness] = useState(0);   // 0..1
  const [blueDarkness, setBlueDarkness] = useState(0.5);     // 0..1

  // Boje traka
  const yellowRGB = useMemo(() => {
    const v = Math.round(255 * (1 - yellowDarkness));
    return `rgb(${v}, ${v}, 0)`;
  }, [yellowDarkness]);

  const blueRGB = useMemo(() => {
    const v = Math.round(255 * (1 - blueDarkness));
    return `rgb(0, 0, ${v})`;
  }, [blueDarkness]);

  // Animacija
  const yellowCtrl = useAnimationControls();
  const blueCtrl = useAnimationControls();

  useEffect(() => {
    let cancelled = false;

    const animate = async (ctrl: any) => {
      while (!cancelled) {
        for (let i = 0; i <= steps; i++) {
          const x = i * step;
          await ctrl.start({
            x,
            transition: { duration: durationPerStep, ease: "linear" },
          });
          if (cancelled) return;
          if (pauseDuration > 0) {
            await new Promise((r) => setTimeout(r, pauseDuration));
            if (cancelled) return;
          }
        }
        ctrl.set({ x: 0 });
      }
    };

    animate(yellowCtrl);
    animate(blueCtrl);

    return () => {
      cancelled = true;
      yellowCtrl.stop();
      blueCtrl.stop();
    };
  }, [steps, step, durationPerStep, pauseDuration, yellowCtrl, blueCtrl]);

  // Dimenzije platna
  const canvasH = Math.round(w * 0.75);
  const barH = Math.max(6, Math.round(w * 0.06));

  return (
    <div className="rounded-2xl bg-black/65 backdrop-blur-md text-white shadow-2xl ring-1 ring-white/10 p-6 sm:p-8 lg:p-10">
      <h2 className="text-xl sm:text-2xl font-bold tracking-tight">🦶 {t.title}</h2>
      <p className="mt-2 text-white/80">{t.lead}</p>

      {/* Platno (čisto crno-belo) */}
      <div className="mt-6 sm:mt-8 mx-auto w-full max-w-[900px]">
        <div
          ref={wrapRef}
          className="relative mx-auto overflow-hidden rounded-xl ring-1 ring-white/10 shadow-lg bg-white"
          style={{ width: "100%", height: `${canvasH}px` }}
          aria-label={isSr ? "Iluzija koračanja" : "Stepping feet illusion"}
        >
          {/* Pozadinske vertikalne crno-bele pruge */}
          <div className="absolute inset-0 flex">
            {Array.from({ length: stripesCount }).map((_, i) => (
              <div
                key={i}
                style={{
                  width: `${100 / stripesCount}%`,
                  background: i % 2 === 0 ? "#fff" : "#000",
                }}
              />
            ))}
          </div>

          {/* Gornja (žuta) traka */}
          <motion.div
            className="absolute left-0"
            style={{
              top: Math.round(canvasH * 0.32),
              width: `${boxW}px`,
              height: `${barH}px`,
              background: yellowRGB,
            }}
            initial={{ x: 0 }}
            animate={yellowCtrl}
          />

          {/* Donja (plava) traka */}
          <motion.div
            className="absolute left-0"
            style={{
              top: Math.round(canvasH * 0.66),
              width: `${boxW}px`,
              height: `${barH}px`,
              background: blueRGB,
            }}
            initial={{ x: 0 }}
            animate={blueCtrl}
          />
        </div>
      </div>

      {/* Kontrole */}
      <div className="mt-6 grid gap-5">
        <Control
          labelLeft={t.speed}
          labelRight={`${durationPerStep}${t.s}`}
          input={
            <input
              type="range"
              min={0.2}
              max={2}
              step={0.1}
              value={durationPerStep}
              onChange={(e) => setDurationPerStep(Number(e.target.value))}
              className="w-full accent-brand-235"
            />
          }
        />

        <Control
          labelLeft={t.pause}
          labelRight={`${pauseDuration}${t.ms}`}
          input={
            <input
              type="range"
              min={0}
              max={1000}
              step={50}
              value={pauseDuration}
              onChange={(e) => setPauseDuration(Number(e.target.value))}
              className="w-full accent-brand-235"
            />
          }
        />

        <Control
          labelLeft={t.yellow}
          labelRight={`${Math.round(yellowDarkness * 100)}%`}
          input={
            <input
              type="range"
              min={0}
              max={1}
              step={0.01}
              value={yellowDarkness}
              onChange={(e) => setYellowDarkness(Number(e.target.value))}
              className="w-full accent-brand-235"
            />
          }
        />

        <Control
          labelLeft={t.blue}
          labelRight={`${Math.round(blueDarkness * 100)}%`}
          input={
            <input
              type="range"
              min={0}
              max={1}
              step={0.01}
              value={blueDarkness}
              onChange={(e) => setBlueDarkness(Number(e.target.value))}
              className="w-full accent-brand-235"
            />
          }
        />
      </div>
    </div>
  );
}

function Control({
  labelLeft,
  labelRight,
  input,
}: {
  labelLeft: string;
  labelRight: string;
  input: React.ReactNode;
}) {
  return (
    <div>
      <div className="flex items-center justify-between text-sm sm:text-base">
        <span className="text-white/90">{labelLeft}</span>
        <span className="tabular-nums text-white/80">{labelRight}</span>
      </div>
      <div className="mt-3">{input}</div>
    </div>
  );
}
