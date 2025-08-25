"use client";

import { useContext } from "react";
import { LanguageContext } from "@/app/context/LanguageContext";

export default function Illusion() {
  const { language } = useContext(LanguageContext);
  const isSr = language === "sr";

  const t = {
    title: isSr ? "Oči koje te prate" : "Eyes That Follow You",
    lead: isSr
      ? "Dva GIF prikaza iluzije — posmatraj kako oči deluju da te prate."
      : "Two GIF demonstrations — watch the eyes appear to follow you.",
  };

  return (
    <div className="rounded-2xl bg-black/65 backdrop-blur-md text-white shadow-2xl ring-1 ring-white/10 p-6 sm:p-8 lg:p-10">
      <h2 className="text-xl sm:text-2xl font-bold tracking-tight">{t.title}</h2>
      <p className="mt-2 text-white/80">{t.lead}</p>

      {/* Dva GIF-a uvek u dve kolone; bez overflow-a */}
      <div className="mt-6 sm:mt-8 mx-auto w-full max-w-[980px]">
        <div className="grid grid-cols-2 gap-3 sm:gap-4">
          {/* Kartica #1 */}
          <div
            className="relative rounded-xl overflow-hidden ring-1 ring-white/10 shadow-lg bg-black"
            style={{ aspectRatio: "4 / 3" }}
          >
            <img
              src="/images/illusions/eyes-that-follow-1.gif"
              alt={isSr ? "Oči koje te prate — GIF 1" : "Eyes that follow — GIF 1"}
              className="absolute inset-0 w-full h-full object-contain select-none"
              loading="lazy"
              draggable={false}
            />
          </div>

          {/* Kartica #2 */}
          <div
            className="relative rounded-xl overflow-hidden ring-1 ring-white/10 shadow-lg bg-black"
            style={{ aspectRatio: "4 / 3" }}
          >
            <img
              src="/images/illusions/eyes-that-follow-2.gif"
              alt={isSr ? "Oči koje te prate — GIF 2" : "Eyes that follow — GIF 2"}
              className="absolute inset-0 w-full h-full object-contain select-none"
              loading="lazy"
              draggable={false}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
