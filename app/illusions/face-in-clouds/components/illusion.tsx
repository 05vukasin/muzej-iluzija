"use client";

import Image from "next/image";
import { useContext } from "react";
import { LanguageContext } from "@/app/context/LanguageContext";

export default function Illusion() {
  const { language } = useContext(LanguageContext);
  const isSr = language === "sr";

  const t = {
    title: isSr ? "Lice u oblacima — galerija" : "Faces in Clouds — Gallery",
    lead: isSr
      ? "Pareidolija: mozak pronalazi poznate oblike (lica) u nasumičnim šarama, poput oblaka. Pogledaj primere i vidiš li i ti lica?"
      : "Pareidolia: your brain finds familiar shapes (faces) in random patterns like clouds. Check these examples—do you see the faces too?",
    alt1: isSr ? "Lice u oblacima 1" : "Face in clouds 1",
    alt2: isSr ? "Lice u oblacima 2" : "Face in clouds 2",
    alt3: isSr ? "Lice u oblacima 3" : "Face in clouds 3",
    alt4: isSr ? "Lice u oblacima 4" : "Face in clouds 4",
    captionSr:
      "Mozak traži obrasce: u oblacima često „vidimo“ lica i poznate oblike iako su to nasumične šare.",
    captionEn:
      "The brain seeks patterns: we often ‘see’ faces and familiar shapes in clouds even though they’re random.",
  };

  return (
    <div className="rounded-2xl bg-black/65 backdrop-blur-md text-white shadow-2xl ring-1 ring-white/10 p-6 sm:p-8 lg:p-10">
      <h2 className="text-xl sm:text-2xl font-bold tracking-tight">{t.title}</h2>
      <p className="mt-2 text-white/80">{t.lead}</p>

      <div className="mt-6 sm:mt-8 mx-auto w-full max-w-[900px]">
        <figure
          className="relative overflow-hidden rounded-xl ring-1 ring-white/10 shadow-lg bg-black/50"
          aria-label={isSr ? "Galerija pareidolije (lica u oblacima)" : "Pareidolia gallery (faces in clouds)"}
        >
          {/* 2×2 mreža */}
          <div className="grid grid-cols-2 gap-2 sm:gap-3 p-2 sm:p-3">
            <div className="relative w-full aspect-[4/3] overflow-hidden rounded-lg">
              <Image
                src="/images/illusions/face-1.jpg"
                alt={t.alt1}
                fill
                className="object-cover select-none"
                sizes="(max-width: 900px) 50vw, 450px"
                priority
              />
            </div>
            <div className="relative w-full aspect-[4/3] overflow-hidden rounded-lg">
              <Image
                src="/images/illusions/face-2.jpeg"
                alt={t.alt2}
                fill
                className="object-cover select-none"
                sizes="(max-width: 900px) 50vw, 450px"
              />
            </div>
            <div className="relative w-full aspect-[4/3] overflow-hidden rounded-lg">
              <Image
                src="/images/illusions/face-3.webp"
                alt={t.alt3}
                fill
                className="object-cover select-none"
                sizes="(max-width: 900px) 50vw, 450px"
              />
            </div>
            <div className="relative w-full aspect-[4/3] overflow-hidden rounded-lg">
              <Image
                src="/images/illusions/face-4.jpg"
                alt={t.alt4}
                fill
                className="object-cover select-none"
                sizes="(max-width: 900px) 50vw, 450px"
              />
            </div>
          </div>

          <figcaption className="px-3 pb-3 text-center text-xs sm:text-sm text-white/80">
            {isSr ? t.captionSr : t.captionEn}
          </figcaption>
        </figure>
      </div>
    </div>
  );
}
