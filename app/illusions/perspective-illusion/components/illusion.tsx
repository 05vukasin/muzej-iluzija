"use client";

import { useContext, useState } from "react";
import { LanguageContext } from "@/app/context/LanguageContext";

export default function Illusion() {
  const { language } = useContext(LanguageContext);
  const isSr = language === "sr";

  const t = {
    title: isSr ? "Iluzija perspektive" : "Perspective Illusion",
    lead: isSr
      ? "Obe figure su identične visine; tragovi perspektive čine da ‘dalja’ izgleda većom. Uključi ljubičaste vodoravne linije da lakše uporediš visine."
      : "Both figures are identical in height; perspective cues make the ‘farther’ one look bigger. Turn on the purple horizontal guides to compare heights.",
    alt: isSr ? "Iluzija perspektive — GIF" : "Perspective illusion — GIF",
    show: isSr ? "Prikaži linije" : "Show lines",
    hide: isSr ? "Sakrij linije" : "Hide lines",
  };

  // ČETIRI HORIZONTALNE VODILICE — vrednosti su procenat visine (0..1).
  // Slobodno promeni raspored po želji.
  const guideYs = [0.16, 0.37, 0.72, 0.93];

  const [showLines, setShowLines] = useState(false);

  return (
    <div className="rounded-2xl bg-black/65 backdrop-blur-md text-white shadow-2xl ring-1 ring-white/10 p-6 sm:p-8 lg:p-10">
      <h2 className="text-xl sm:text-2xl font-bold tracking-tight">👻 {t.title}</h2>
      <p className="mt-2 text-white/80">{t.lead}</p>

      <div className="mt-6 sm:mt-8 mx-auto w-full max-w-[900px]">
        <div className="w-full flex justify-center">
          <figure
            className="
              relative inline-block overflow-hidden rounded-xl
              ring-1 ring-white/10 shadow-lg bg-black/80
            "
            aria-label={t.alt}
          >
            {/* GIF:
               - Mobilni: w-full h-auto
               - Desktop: širina auto, max visina ograničena da ne bude prevelik */}
            <img
              src="/images/illusions/perspective-illusion.gif"
              alt={t.alt}
              className="
                block h-auto w-full
                md:w-auto md:max-h-[520px]
                select-none pointer-events-none
              "
            />

            {/* HORIZONTALNE LINIJE PREKO GIF-a */}
            {showLines && (
              <div className="absolute inset-0 z-10 pointer-events-none">
                {guideYs.map((gy, i) => (
                  <div
                    key={i}
                    className="absolute left-0 right-0"
                    style={{
                      top: `${gy * 100}%`,
                      height: "2px",
                      background: "rgb(168 85 247)", // purple-500
                    }}
                  />
                ))}
              </div>
            )}
          </figure>
        </div>

        {/* Toggle dugme:
            - Ljubičasto kada su linije ISKLJUČENE (poziv da ih uključiš)
            - Sivo kada su linije UKLJUČENE (za isključivanje) */}
        <div className="mt-4 flex justify-center">
          <button
            onClick={() => setShowLines((v) => !v)}
            className={[
              "rounded-full px-4 py-2 font-semibold shadow-sm border transition",
              showLines
                ? "bg-white/70 text-primary border-black/10 hover:bg-white/80"
                : "bg-brand-235 text-white border-transparent hover:brightness-110",
            ].join(" ")}
          >
            {showLines ? t.hide : t.show}
          </button>
        </div>
      </div>
    </div>
  );
}
