"use client";

import { useContext } from "react";
import { LanguageContext } from "@/app/context/LanguageContext";

export default function Illusion() {
  const { language } = useContext(LanguageContext);
  const isSr = language === "sr";

  const t = {
    title: isSr ? "Varljivo prstenje" : "Deceiving Rings",
    lead: isSr
      ? "Dva (ili više) fizički spojena prstena, kada ih zavrtiš, deluju kao da se rotiraju nezavisno i lebde u vazduhu."
      : "Two (or more) physically linked rings can appear to spin independently and float when you rotate the structure.",
    alt: isSr ? "Iluzija varljivog prstenja" : "Deceiving rings illusion",
  };

  return (
    <div className="rounded-2xl bg-black/65 backdrop-blur-md text-white shadow-2xl ring-1 ring-white/10 p-6 sm:p-8 lg:p-10">
      {/* Naslov + opis */}
      <h2 className="text-xl sm:text-2xl font-bold tracking-tight">{t.title} 🔗</h2>
      <p className="mt-2 text-white/80">{t.lead}</p>

      {/* GIF */}
      <div className="mt-6 sm:mt-8 mx-auto w-full max-w-[900px]">
        <div
          className="
            relative overflow-hidden rounded-xl ring-1 ring-white/10 shadow-lg
            bg-black
            flex items-center justify-center
          "
          style={{ width: "100%" }}
          aria-label={t.alt}
        >
          {/* GIF iz /public/images/illusions */}
          <img
            src="/images/illusions/deceiving-rings.gif"
            alt={t.alt}
            className="block w-full h-auto max-h-[70vh] md:max-h-[60vh] select-none"
            draggable={false}
          />
        </div>
      </div>
    </div>
  );
}
