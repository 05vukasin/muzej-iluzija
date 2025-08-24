"use client";

import { useContext, useEffect, useMemo, useRef, useState } from "react";
import { LanguageContext } from "@/app/context/LanguageContext";

type Phase = "idle" | "adapt" | "blank";

export default function Illusion() {
  const { language } = useContext(LanguageContext);
  const isSr = language === "sr";

  const [secs, setSecs] = useState(20);
  const [phase, setPhase] = useState<Phase>("idle");
  const [left, setLeft] = useState(secs);

  const rafRef = useRef<number | null>(null);
  const blankRef = useRef<number | null>(null);

  useEffect(() => {
    if (phase === "idle") setLeft(secs);
  }, [secs, phase]);

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
        setPhase("blank");
        blankRef.current = window.setTimeout(reset, 6000);
        return;
      }
      rafRef.current = window.requestAnimationFrame(tick);
    };
    rafRef.current = window.requestAnimationFrame(tick);
  };

  const reset = () => {
    if (rafRef.current) cancelAnimationFrame(rafRef.current);
    if (blankRef.current) clearTimeout(blankRef.current);
    rafRef.current = null;
    blankRef.current = null;
    setPhase("idle");
    setLeft(secs);
  };

  const t = useMemo(
    () => ({
      title: isSr ? "Naknadna slika (afterimage)" : "Afterimage Illusion",
      lead:
        phase === "adapt"
          ? isSr
            ? "Fiksiraj pogled u centralnu tačku 20–30 sekundi."
            : "Fixate the central dot for 20–30 seconds."
          : isSr
          ? "Klikni „Start“ i gledaj u tačku."
          : "Click “Start” and stare at the dot.",
      start: isSr ? "Start" : "Start",
      again: isSr ? "Ponovi" : "Again",
      seconds: isSr ? "sekundi" : "seconds",
      duration: isSr ? "Trajanje" : "Duration",
      shape: isSr ? "Oblik" : "Shape",
    }),
    [isSr, phase]
  );

  const [shape, setShape] = useState<"heart" | "cross" | "square" | "circle">(
    "heart"
  );

  return (
    <div className="rounded-2xl bg-black/65 backdrop-blur-md text-white shadow-2xl ring-1 ring-white/10 p-6 sm:p-8 lg:p-10">
      <h2 className="text-xl sm:text-2xl font-bold tracking-tight">
        {t.title}
      </h2>
      <p className="mt-2 text-white/80">{t.lead}</p>

      {/* KVADRAT – bez overflow-a na telefonu */}
      <div
        className={[
          "mt-6 sm:mt-8 mx-auto rounded-xl overflow-hidden ring-1 ring-white/10 shadow-lg",
          "relative flex items-center justify-center bg-white",
          "aspect-square", // uvek kvadrat
        ].join(" ")}
        style={{
          // malo manji na desktopu + sigurnih 84vw na mobilnom (bez horiz. overflow-a)
          width: "min(84vw, 500px)",
          maxWidth: "100%",
        }}
      >
        {/* Faza 1/2: silueta; Faza 3: ostaje čisto belo */}
        {phase !== "blank" && <Silhouette shape={shape} />}

        {/* manja tačka fiksacije, centrirana jer je parent relative */}
        <div className="absolute h-1.5 w-1.5 rounded-full bg-black/70" />

        {/* Overlay info */}
        <div className="absolute inset-x-0 bottom-3 flex flex-col items-center px-3">
          <>
            <div className="mt-2 text-white font-semibold bg-black/50 rounded-full px-3 py-1">
              {left}s
            </div>
          </>
        </div>
      </div>

      {/* Kontrole */}
      <div className="mt-6 space-y-5">
        {/* Red 1: Start/Again + slider za trajanje (zauzima ostatak širine) */}
        <div className="flex items-center gap-3 sm:gap-4">
          {phase === "idle" ? (
            <button
              onClick={start}
              className="inline-flex items-center gap-2 rounded-full bg-brand-235 text-white px-4 sm:px-5 py-2.5 font-semibold hover:brightness-110 shadow-sm"
            >
              {/* Play trougao */}
              <svg
                aria-hidden="true"
                viewBox="0 0 16 16"
                className="h-4 w-4"
                fill="currentColor"
              >
                <path d="M5 3.5v9l8-4.5-8-4.5z" />
              </svg>
              {t.start}
            </button>
          ) : (
            <button
              onClick={reset}
              className="inline-flex items-center gap-2 rounded-full bg-white/80 text-primary px-4 sm:px-5 py-2.5 font-semibold ring-1 ring-black/10 hover:bg-white shadow-sm"
            >
              {t.again}
            </button>
          )}

          {/* Slider zauzima ostatak reda */}
          <div className="relative flex-1 min-w-0">
            <label htmlFor="dur" className="sr-only">
              {t.duration}
            </label>
            <input
              id="dur"
              type="range"
              min={5}
              max={30}
              step={1}
              value={secs}
              onChange={(e) => setSecs(parseInt(e.target.value, 10))}
              disabled={phase !== "idle"}
              className="w-full accent-brand-235 disabled:opacity-50"
              aria-label={t.duration}
            />
            {/* Badge sa vremenom u desnom uglu iznad slidera */}
            <div className="pointer-events-none absolute -top-6 right-0 text-xs sm:text-sm text-white/80">
              {secs} {t.seconds}
            </div>
          </div>
        </div>

        {/* Red 2: Dugmići za oblike */}
        <div>
          <span className="block text-sm sm:text-base text-white/90">
            {t.shape}
          </span>
          <div className="mt-3 flex flex-wrap gap-2">
            {(["heart", "cross", "square", "circle"] as const).map((s) => (
              <button
                key={s}
                onClick={() => setShape(s)}
                disabled={phase !== "idle"}
                aria-pressed={shape === s}
                className={[
                  "px-3 py-1.5 rounded-full border text-sm transition",
                  shape === s
                    ? "bg-brand-235 text-white border-brand-235"
                    : "bg-white/70 text-primary border-black/10 hover:bg-accent-1/60",
                  phase !== "idle" ? "opacity-60 cursor-not-allowed" : "",
                ].join(" ")}
              >
                {s}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ——— Siluete ——— */

function Silhouette({
  shape,
}: {
  shape: "heart" | "cross" | "square" | "circle";
}) {
  // Manje siluete (70% kvadrata)
  const size = "40%";

  if (shape === "circle") {
    return (
      <div
        aria-hidden
        className="bg-black"
        style={{ width: size, height: size, borderRadius: "9999px" }}
      />
    );
  }
  if (shape === "square") {
    return (
      <div
        aria-hidden
        className="bg-black"
        style={{ width: size, height: size }}
      />
    );
  }
  if (shape === "cross") {
    return (
      <div
        aria-hidden
        className="relative"
        style={{ width: size, height: size }}
      >
        <div
          className="absolute inset-0 m-auto bg-black"
          style={{ width: "18%", height: "100%" }}
        />
        <div
          className="absolute inset-0 m-auto bg-black"
          style={{ width: "100%", height: "18%" }}
        />
      </div>
    );
  }
  // heart (SVG)
  return (
    <svg
      aria-hidden
      viewBox="0 0 100 100"
      style={{ width: size, height: size, display: "block" }}
    >
      <path
        d="M50 86 L16 52 A20 20 0 0 1 50 22 A20 20 0 0 1 84 52 Z"
        fill="black"
      />
    </svg>
  );
}
