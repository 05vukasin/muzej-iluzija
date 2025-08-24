"use client";

import { useContext, useMemo, useState } from "react";
import { LanguageContext } from "@/app/context/LanguageContext";

/**
 * Interaktivna demonstracija lokalnog kontrasta svetline:
 * - Linearni gradijent od tamnog ka svetlom (podesiva "jačina" kontrasta)
 * - Dva identična siva kvadrata (podesiva svetlina)
 * - Po želji "maskiraj" okolinu svakog kvadrata da potvrdiš da su identični
 * - Pomeraj kvadrate duž ose X da vidiš kako kontekst menja percepciju
 */

export default function Illusion() {
  const { language } = useContext(LanguageContext);
  const isSr = language === "sr";

  // 0..100 (0 = bez kontrasta, 100 = maksimalan raspon)
  const [contrast, setContrast] = useState(100);
  // svetlina identičnih kvadrata, kao HSL L% (0..100)
  const [squareL, setSquareL] = useState(54);
  // položaj kvadrata: 0..100 – levo i desno simetrično oko centra
  const [offset, setOffset] = useState(28);
  // da li da "maskiramo" okolinu (isolation)
  const [isolate, setIsolate] = useState(false);

  // izračunaj krajnje vrednosti gradijenta oko srednje: 50% ± contrast/2
  const { leftStop, rightStop } = useMemo(() => {
    const half = Math.max(0, Math.min(100, contrast)) / 2;
    return { leftStop: 50 - half, rightStop: 50 + half };
  }, [contrast]);

  const t = {
    title: isSr ? "Kada svetlo vara tvoje oči" : "When Light Tricks Your Eyes",
    lead: isSr
      ? "Dva kvadrata su identične sive — ali izgledaju različito u zavisnosti od pozadine."
      : "Two squares are the same gray — yet look different depending on the background.",
    squaresLabel: isSr ? "Svetlina kvadrata" : "Square lightness",
    contrastLabel: isSr ? "Jačina gradijenta" : "Gradient strength",
    positionLabel: isSr ? "Položaj kvadrata" : "Square position",
    isolate: isSr ? "Izoluj (prekrij) okolinu" : "Isolate surroundings",
    note: isSr
      ? "Savet: Uključi „Izoluj“ da potvrdiš da su kvadrati zaista iste boje."
      : "Tip: Turn on “Isolate” to verify the squares are truly identical.",
    identical: isSr ? "Oba kvadrata: " : "Both squares: ",
    percent: isSr ? "%" : "%",
  };

  // pozicije (u %) levo/desno od centra, simetrično
  const leftX = 50 - offset;
  const rightX = 50 + offset;

  // CSS boje
  const bgCSS = `linear-gradient(to right, hsl(0 0% ${leftStop}% ) 0%, hsl(0 0% ${rightStop}% ) 100%)`;
  const squareCSS = `hsl(0 0% ${squareL}% )`;

  return (
    <div className="rounded-2xl bg-black/65 backdrop-blur-md text-white shadow-2xl ring-1 ring-white/10 p-6 sm:p-8 lg:p-10">
      <h2 className="text-xl sm:text-2xl font-bold tracking-tight">{t.title}</h2>
      <p className="mt-2 text-white/80">{t.lead}</p>

      {/* Ploča sa gradijentom */}
      <div className="mt-6 sm:mt-8 mx-auto w-full max-w-[860px]">
        <div
          className="
            relative rounded-xl ring-1 ring-white/10 shadow-lg overflow-hidden
            w-full
          "
          style={{
            // visina bez overflow-a na mobilnom
            height: "min(46vw, 300px)",
            backgroundImage: bgCSS,
          }}
          aria-label={isSr ? "Gradijent sa dva identična siva kvadrata" : "Gradient with two identical gray squares"}
        >
          {/* Sivi kvadrati */}
          <Square xPercent={leftX} color={squareCSS} isolate={isolate} />
          <Square xPercent={rightX} color={squareCSS} isolate={isolate} />

          {/* Info bedž */}
          <div className="absolute left-1/2 -translate-x-1/2 bottom-3 text-xs sm:text-sm bg-black/55 text-white px-3 py-1 rounded-full">
            {t.identical}
            {squareL}
            {t.percent}
          </div>
        </div>
      </div>

      {/* Kontrole */}
      <div className="mt-6 grid gap-5">
        {/* Svetlina kvadrata */}
        <Control
          labelLeft={t.squaresLabel}
          labelRight={`${squareL}${t.percent}`}
          input={
            <input
              type="range"
              min={0}
              max={100}
              value={squareL}
              onChange={(e) => setSquareL(parseInt(e.target.value, 10))}
              className="w-full accent-brand-235"
            />
          }
        />

        {/* Jačina gradijenta */}
        <Control
          labelLeft={t.contrastLabel}
          labelRight={`${contrast}%`}
          input={
            <input
              type="range"
              min={0}
              max={100}
              value={contrast}
              onChange={(e) => setContrast(parseInt(e.target.value, 10))}
              className="w-full accent-brand-235"
            />
          }
        />

        {/* Položaj kvadrata */}
        <Control
          labelLeft={t.positionLabel}
          labelRight={`${offset}%`}
          input={
            <input
              type="range"
              min={10}
              max={40}
              value={offset}
              onChange={(e) => setOffset(parseInt(e.target.value, 10))}
              className="w-full accent-brand-235"
            />
          }
        />

        {/* Izolacija okoline */}
        <label className="flex items-center gap-3 text-sm sm:text-base">
          <input
            type="checkbox"
            checked={isolate}
            onChange={(e) => setIsolate(e.target.checked)}
            className="size-4 accent-brand-235"
          />
          <span className="text-white/90">{t.isolate}</span>
        </label>

        <p className="text-white/70 text-xs">{t.note}</p>
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

function Square({
  xPercent,
  color,
  isolate,
}: {
  xPercent: number; // 0..100
  color: string;
  isolate: boolean;
}) {
  // veličina responsive, bez overflow-a
  const size = "clamp(32px, 8vw, 64px)";
  const maskPad = "clamp(6px, 1.5vw, 12px)";

  return (
    <div
      className="absolute top-1/2 -translate-y-1/2"
      style={{ left: `${xPercent}%`, transform: "translate(-50%, -50%)" }}
    >
      {/* maska koja prekriva okolinu (opciono) */}
      {isolate && (
        <div
          aria-hidden
          className="absolute inset-0 -z-[1] rounded-[10px]"
          style={{
            // pravougaonik koji je malo veći od kvadrata, neutralno siv
            width: `calc(${size} + ${maskPad} * 2)`,
            height: `calc(${size} + ${maskPad} * 2)`,
            left: `calc(-1 * ${maskPad})`,
            top: `calc(-1 * ${maskPad})`,
            background: "hsl(0 0% 50% / 0.85)",
            outline: "1px solid rgba(255,255,255,0.25)",
            boxShadow: "0 6px 18px rgba(0,0,0,0.25)",
          }}
        />
      )}

      {/* identičan sivi kvadrat */}
      <div
        style={{
          width: size,
          height: size,
          background: color,
          boxShadow: "0 2px 10px rgba(0,0,0,0.25), inset 0 0 0 1px rgba(255,255,255,0.06)",
        }}
        aria-label="Identičan sivi kvadrat"
      />
    </div>
  );
}
