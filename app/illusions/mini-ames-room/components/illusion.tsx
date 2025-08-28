"use client";

import { useContext } from "react";
import { LanguageContext } from "@/app/context/LanguageContext";

export default function Illusion() {
  const { language } = useContext(LanguageContext);
  const isSr = language === "sr";

  const t = {
    title: isSr ? "Mini Ejmsova soba" : "Mini Ames Room",
    lead: isSr
      ? "Osobe na oba kraja sobe su ISTE veličine — samo je jedna bliže kameri, pa izgleda veća. Zbog posebne postavke i perspektive, taj razmak nije očigledan i mozak pogrešno zaključuje da je soba „normalna“."
      : "The people at both ends are the SAME size — one is simply closer to the camera, so they appear larger. The room’s special construction and perspective hide this distance, so your brain assumes a ‘normal’ room.",
    capLeft: isSr ? "Primer A: isti ljudi, različit izgled" : "Example A: same people, different appearance",
    capRight: isSr ? "Primer B: zamena strana daje isti efekat" : "Example B: swapping sides yields the same effect",
    explain: isSr
      ? "Objašnjenje: iskrivljena soba čini da bliži ugao deluje „manje blizu“, pa osoba izgleda veća iako su figure iste."
      : "Explanation: the skewed room makes the nearer corner look ‘not so near’, so a closer person appears larger even though both figures are identical.",
  };

  return (
    <div className="rounded-2xl bg-black/65 backdrop-blur-md text-white shadow-2xl ring-1 ring-white/10 p-6 sm:p-8 lg:p-10">
      <h2 className="text-xl sm:text-2xl font-bold tracking-tight">📦 {t.title}</h2>
      <p className="mt-2 text-white/80">{t.lead}</p>

      {/* Pair of GIFs — ALWAYS side-by-side (also on phones) */}
      <div className="mt-6 sm:mt-8 mx-auto w-full max-w-[1000px]">
        <div
          className="
            grid grid-cols-2 gap-3 sm:gap-4
            rounded-xl
          "
        >
          {/* Left GIF */}
          <figure className="rounded-xl overflow-hidden ring-1 ring-white/10 shadow-lg bg-black/20">
            {/* Using <img> for GIFs to preserve animation perfectly */}
            <img
              src="/images/illusions/mini-ames-room-1.gif"
              alt={isSr ? "Mini Ejmsova soba — primer A" : "Mini Ames Room — example A"}
              className="block w-full h-auto select-none"
              loading="eager"
              draggable={false}
            />
            <figcaption className="px-3 py-2 text-xs sm:text-sm text-white/80">{t.capLeft}</figcaption>
          </figure>

          {/* Right GIF */}
          <figure className="rounded-xl overflow-hidden ring-1 ring-white/10 shadow-lg bg-black/20">
            <img
              src="/images/illusions/mini-ames-room-2.gif"
              alt={isSr ? "Mini Ejmsova soba — primer B" : "Mini Ames Room — example B"}
              className="block w-full h-auto select-none"
              loading="eager"
              draggable={false}
            />
            <figcaption className="px-3 py-2 text-xs sm:text-sm text-white/80">{t.capRight}</figcaption>
          </figure>
        </div>

        {/* Explanation image — full width below the two GIFs */}
        <figure className="mt-4 sm:mt-6 rounded-xl overflow-hidden ring-1 ring-white/10 shadow-lg bg-black/20">
          <img
            src="/images/illusions/mini-ames-room-explained.gif"
            alt={isSr ? "Mini Ejmsova soba — objašnjenje perspektive" : "Mini Ames Room — perspective explanation"}
            className="block w-full h-auto select-none"
            loading="lazy"
            draggable={false}
          />
          <figcaption className="px-3 py-2 text-xs sm:text-sm text-white/80">{t.explain}</figcaption>
        </figure>
      </div>
    </div>
  );
}
