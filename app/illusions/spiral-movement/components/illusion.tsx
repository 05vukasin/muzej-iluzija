"use client";

import { useContext, useEffect, useMemo, useRef, useState } from "react";
import { LanguageContext } from "@/app/context/LanguageContext";
import NextImage from "next/image";

type Phase = "idle" | "adapt" | "test";

export default function Illusion() {
  const { language } = useContext(LanguageContext);
  const isSr = language === "sr";

  // Controls
  const [speed, setSpeed] = useState(35); // 1..100
  const [cw, setCw] = useState(false);
  const [secs, setSecs] = useState(20);   // 5..40
  const [phase, setPhase] = useState<Phase>("idle");
  const [left, setLeft] = useState(secs);

  const rafRef = useRef<number | null>(null);
  const toTestRef = useRef<number | null>(null);

  // map slider → rotation period (s)
  const { period, mult } = useMemo(() => {
    const minP = 0.35; // fastest
    const maxP = 4.5;  // slowest
    const t = (Math.max(1, Math.min(100, speed)) - 1) / 99; // 0..1
    const p = maxP - t * (maxP - minP);
    return { period: p, mult: maxP / p };
  }, [speed]);

  // keep countdown in sync if user changes duration while idle
  useEffect(() => {
    if (phase === "idle") setLeft(secs);
  }, [secs, phase]);

  // cleanup on unmount
  useEffect(() => {
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      if (toTestRef.current) clearTimeout(toTestRef.current);
    };
  }, []);

  const start = () => {
    if (phase !== "idle") return;
    setPhase("adapt");
    setLeft(secs);

    const startTs = performance.now();
    const durMs = secs * 1000;

    const tick = (now: number) => {
      const remain = Math.max(0, durMs - (now - startTs));
      setLeft(Math.ceil(remain / 1000));
      if (remain <= 0) {
        setPhase("test");
        toTestRef.current = window.setTimeout(reset, 6000);
        return;
      }
      rafRef.current = window.requestAnimationFrame(tick);
    };
    rafRef.current = window.requestAnimationFrame(tick);
  };

  const reset = () => {
    if (rafRef.current) cancelAnimationFrame(rafRef.current);
    if (toTestRef.current) clearTimeout(toTestRef.current);
    rafRef.current = null;
    toTestRef.current = null;
    setPhase("idle");
    setLeft(secs);
  };

  const t = {
    title: isSr ? "Spiralni pokreti" : "Spiral Motion",
    lead: isSr
      ? "Gledaj u tačku 20–30 sekundi, zatim pogledaj statičan prikaz – delovaće kao da se uvija!"
      : "Fixate the dot 20–30 seconds, then view the static panel—it will seem to warp!",
    speed: isSr ? "Brzina" : "Speed",
    dir: isSr ? "Smer" : "Direction",
    cw: isSr ? "u smeru kazaljke" : "clockwise",
    ccw: isSr ? "suprotno" : "counter-clockwise",
    duration: isSr ? "Trajanje" : "Duration",
    seconds: isSr ? "sekundi" : "seconds",
    start: isSr ? "Start" : "Start",
    again: isSr ? "Ponovi" : "Again",
    during: isSr ? "Fiksiraj pogled u centralnu tačku." : "Keep your eyes on the central dot.",
    testing: isSr ? "Sada posmatraj statičan panel." : "Now look at the static panel.",
  };

  return (
    <div className="rounded-2xl bg-black/65 backdrop-blur-md text-white shadow-2xl ring-1 ring-white/10 p-6 sm:p-8 lg:p-10">
      <h2 className="text-xl sm:text-2xl font-bold tracking-tight">{t.title} 🌀</h2>
      <p className="mt-2 text-white/80">{t.lead}</p>

      {/* Panels */}
      <div className="mt-6 sm:mt-8 mx-auto w-full max-w-[900px]">
        <div className="grid md:grid-cols-2 gap-4">
          {/* LEFT: Adaptation (spiral) */}
          <div
            className="relative overflow-hidden rounded-xl ring-1 ring-white/10 shadow-lg bg-black"
            style={{ width: "100%", aspectRatio: "1 / 1" }}
            aria-label={isSr ? "Rotirajuća spirala" : "Rotating spiral"}
          >
            {/* Oversized image behind the frame */}
            <div className="absolute inset-0">
              <NextImage
                src="/images/illusions/spiral-movement-illusion.jpg"
                alt={isSr ? "Spiralna ilustracija" : "Spiral illustration"}
                fill
                sizes="(max-width: 900px) 100vw, 450px"
                draggable={false}
                priority
                className="object-cover select-none pointer-events-none"
                style={{
                  transformOrigin: "50% 50%",
                  animation: `spinScaled var(--p) linear infinite`,
                  // @ts-ignore – CSS custom property for the period
                  ["--p" as any]: `${period}s`,
                  animationDirection: cw ? "normal" : "reverse",
                  opacity: phase === "test" ? 0 : 1,
                  transition: "opacity 160ms ease-out",
                }}
              />
              {/* soft vignette to hide any edges while rotating */}
              <div
                className="pointer-events-none absolute inset-0"
                style={{
                  background:
                    "radial-gradient(circle at 50% 50%, transparent 55%, rgba(0,0,0,0.45) 100%)",
                }}
              />
            </div>

            {/* fixation dot */}
            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-2 w-2 rounded-full bg-white/90 shadow-[0_0_0_2px_rgba(0,0,0,.5)]" />

            {/* overlay info */}
            <div className="absolute inset-x-0 bottom-3 flex flex-col items-center">
              {phase === "adapt" ? (
                <>
                  <div className="px-2 py-1 rounded bg-white/85 text-primary text-sm font-medium">
                    {t.during}
                  </div>
                  <div className="mt-2 text-white font-semibold bg-black/55 rounded-full px-3 py-1">
                    {left}s
                  </div>
                </>
              ) : phase === "test" ? (
                <div className="px-2 py-1 rounded bg-white/85 text-primary text-sm font-medium">
                  {t.testing}
                </div>
              ) : null}
            </div>
          </div>

          {/* RIGHT: Static test panel */}
          <div
            className="relative overflow-hidden rounded-xl ring-1 ring-white/10 shadow-lg bg-neutral-50 grid place-items-center"
            style={{ width: "100%", aspectRatio: "1 / 1" }}
            aria-label={isSr ? "Statični test panel" : "Static test panel"}
          >
            <svg
              viewBox="0 0 100 100"
              className="w-[80%] h-[80%] max-w-[520px] max-h-[520px]"
              style={{ opacity: phase === "test" ? 1 : 0.9, transition: "opacity 160ms ease-out" }}
              aria-hidden="true"
            >
              <defs>
                <radialGradient id="g" cx="50%" cy="50%" r="50%">
                  <stop offset="0%" stopColor="#ffffff" />
                  <stop offset="100%" stopColor="#e7e7e7" />
                </radialGradient>
              </defs>
              <rect x="0" y="0" width="100" height="100" fill="url(#g)" />
              <circle cx="35" cy="38" r="7" fill="#111" />
              <circle cx="65" cy="38" r="7" fill="#111" />
              <path d="M30 64 Q50 78 70 64" fill="none" stroke="#111" strokeWidth="4" strokeLinecap="round" />
            </svg>
            <div
              className="pointer-events-none absolute inset-0"
              style={{
                background:
                  "linear-gradient(transparent 23px, rgba(0,0,0,0.06) 24px), linear-gradient(90deg, transparent 23px, rgba(0,0,0,0.06) 24px)",
                backgroundSize: "24px 24px",
                mixBlendMode: "multiply",
                opacity: 0.25,
              }}
            />
          </div>
        </div>
      </div>

      {/* Controls */}
      <div className="mt-6 grid gap-5">
        {/* Row 1: Start/Again + Duration */}
        <div className="flex items-center gap-3 sm:gap-4">
          {phase === "idle" ? (
            <button
              onClick={start}
              className="inline-flex items-center gap-2 rounded-full bg-brand-235 text-white px-4 sm:px-5 py-2.5 font-semibold hover:brightness-110 shadow-sm"
            >
              <svg viewBox="0 0 16 16" className="h-4 w-4" fill="currentColor" aria-hidden>
                <path d="M5 3.5v9l8-4.5-8-4.5z" />
              </svg>
              {t.start}
            </button>
          ) : (
            <button
              onClick={reset}
              className="inline-flex items-center gap-2 rounded-full bg-white/85 text-primary px-4 sm:px-5 py-2.5 font-semibold ring-1 ring-black/10 hover:bg-white shadow-sm"
            >
              {t.again}
            </button>
          )}

          <div className="relative flex-1 min-w-0">
            <label htmlFor="dur" className="sr-only">
              {t.duration}
            </label>
            <input
              id="dur"
              type="range"
              min={5}
              max={40}
              step={1}
              value={secs}
              onChange={(e) => setSecs(parseInt(e.target.value, 10))}
              disabled={phase !== "idle"}
              className="w-full accent-brand-235 disabled:opacity-50"
            />
            <div className="pointer-events-none absolute -top-6 right-0 text-xs sm:text-sm text-white/80">
              {secs} {t.seconds}
            </div>
          </div>
        </div>

        {/* Row 2: Speed + Direction */}
        <div className="grid sm:grid-cols-2 gap-4">
          <Control
            labelLeft={t.speed}
            labelRight={`${Math.max(1, Math.round(mult))}×`}
            input={
              <input
                type="range"
                min={1}
                max={100}
                value={speed}
                onChange={(e) => setSpeed(parseInt(e.target.value, 10))}
                className="w-full accent-brand-235"
                disabled={phase === "test"}
              />
            }
          />
          <div className="flex items-end">
            <div className="w-full">
              <span className="block text-sm sm:text-base text-white/90">{t.dir}</span>
              <div className="mt-3 flex gap-2">
                <button
                  onClick={() => setCw(true)}
                  disabled={phase === "test"}
                  className={[
                    "px-3 py-1.5 rounded-full border text-sm transition",
                    cw ? "bg-brand-235 text-white border-brand-235" : "bg-white/70 text-primary border-black/10 hover:bg-accent-1/60",
                    phase === "test" ? "opacity-60 cursor-not-allowed" : "",
                  ].join(" ")}
                >
                  {t.cw}
                </button>
                <button
                  onClick={() => setCw(false)}
                  disabled={phase === "test"}
                  className={[
                    "px-3 py-1.5 rounded-full border text-sm transition",
                    !cw ? "bg-brand-235 text-white border-brand-235" : "bg-white/70 text-primary border-black/10 hover:bg-accent-1/60",
                    phase === "test" ? "opacity-60 cursor-not-allowed" : "",
                  ].join(" ")}
                >
                  {t.ccw}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Local keyframes */}
      <style jsx>{`
        @keyframes spinScaled {
          from { transform: rotate(0deg) scale(1.35); }
          to   { transform: rotate(360deg) scale(1.35); }
        }
      `}</style>
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
