"use client";

import { useContext, useState } from "react";
import { LanguageContext } from "@/app/context/LanguageContext";

export default function Illusion() {
  const { language } = useContext(LanguageContext);
  const isSr = language === "sr";

  const t = {
    title: isSr ? "Iluzija perspektive" : "Perspective Illusion",
    lead: isSr
      ? "Obe figure su identične visine, ali ‘dalja’ izgleda većom zbog tragova perspektive. Uključi linije (grid) da lakše uporediš visine."
      : "Both figures are identical in height, yet the ‘farther’ one looks bigger due to perspective cues. Turn on the grid to compare heights.",
    alt: isSr ? "Iluzija perspektive — GIF" : "Perspective illusion — GIF",
    show: isSr ? "Prikaži linije" : "Show grid",
    hide: isSr ? "Sakrij linije" : "Hide grid",
  };

  // Četiri vertikalne vodilice (procenti širine GIF-a). Slobodno promeni vrednosti.
  const guideXs = [0.18, 0.32, 0.68, 0.82]; // 18%, 32%, 68%, 82%

  const [showGrid, setShowGrid] = useState(false);

  return (
    <div className="rounded-2xl bg-black/65 backdrop-blur-md text-white shadow-2xl ring-1 ring-white/10 p-6 sm:p-8 lg:p-10">
      <h2 className="text-xl sm:text-2xl font-bold tracking-tight">👻 {t.title}</h2>
      <p className="mt-2 text-white/80">{t.lead}</p>

      <div className="mt-6 sm:mt-8 mx-auto w-full max-w-[900px]">
        {/* Wrapper: centriramo sadržaj; visina figure je automatska po visini GIF-a */}
        <div className="w-full flex justify-center">
          <figure
            className="
              relative inline-block overflow-hidden rounded-xl
              ring-1 ring-white/10 shadow-lg bg-black/80
            "
            aria-label={t.alt}
          >
            {/* GIF: na mobu 100% širine, na desktopu auto širina + max visina */}
            <img
              src="/images/illusions/perspective-illusion.gif"
              alt={t.alt}
              className="
                block h-auto w-full
                md:w-auto md:max-h-[520px]
                select-none pointer-events-none
              "
            />

            {/* Vertikalne linije — uvek iznad GIF-a */}
            {showGrid && (
              <div className="absolute inset-0 z-10 pointer-events-none">
                {guideXs.map((gx, i) => (
                  <div
                    key={i}
                    className="absolute top-0 bottom-0"
                    style={{ left: `${gx * 100}%` }}
                  >
                    {/* sama linija */}
                    <div
                      className="h-full w-[2px] mx-[-1px]"
                      style={{
                        background: "rgba(255,255,255,0.95)",
                        boxShadow:
                          "0 0 0 1px rgba(0,0,0,0.3), 0 0 8px rgba(0,0,0,0.25)",
                      }}
                    />
                    {/* male kapice gore/dole da bude jasnija visina */}
                    <div
                      className="absolute left-1/2 -translate-x-1/2 top-0 h-[10px] w-[8px] rounded-b"
                      style={{ background: "rgba(255,255,255,0.95)" }}
                    />
                    <div
                      className="absolute left-1/2 -translate-x-1/2 bottom-0 h-[10px] w-[8px] rounded-t"
                      style={{ background: "rgba(255,255,255,0.95)" }}
                    />
                  </div>
                ))}
              </div>
            )}
          </figure>
        </div>

        {/* Dugme: ljubičasto kada su linije isključene (poziv da ih uključiš),
           sivo kada su uključene (za isključivanje) */}
        <div className="mt-4 flex justify-center">
          <button
            onClick={() => setShowGrid((v) => !v)}
            className={[
              "rounded-full px-4 py-2 font-semibold shadow-sm border transition",
              showGrid
                ? "bg-white/70 text-primary border-black/10 hover:bg-white/80"
                : "bg-brand-235 text-white border-transparent hover:brightness-110",
            ].join(" ")}
          >
            {showGrid ? t.hide : t.show}
          </button>
        </div>
      </div>
    </div>
  );
}
