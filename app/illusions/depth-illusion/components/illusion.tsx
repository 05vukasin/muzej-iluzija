"use client";

import Image from "next/image";
import { useContext } from "react";
import { LanguageContext } from "@/app/context/LanguageContext";

export default function Illusion() {
  const { language } = useContext(LanguageContext);
  const isSr = language === "sr";

  const t = {
    title: isSr ? "Iluzija dubine — galerija" : "Depth Illusion — Gallery",
    lead: isSr
      ? "Prisilna perspektiva: ljudi bliže kameri deluju mnogo veći, dok ogromni objekti u pozadini izgledaju maleni. Sve je u poravnanju iz jednog ugla!"
      : "Forced perspective: people closer to the camera look much larger, while huge background objects seem tiny. It’s all about alignment from a single viewpoint!",
    alt1: isSr ? "Perspektiva 1" : "Perspective 1",
    alt2: isSr ? "Perspektiva 2" : "Perspective 2",
    alt3: isSr ? "Perspektiva 3" : "Perspective 3",
    alt4: isSr ? "Perspektiva 4" : "Perspective 4",
  };

  return (
    <div className="rounded-2xl bg-black/65 backdrop-blur-md text-white shadow-2xl ring-1 ring-white/10 p-6 sm:p-8 lg:p-10">
      <h2 className="text-xl sm:text-2xl font-bold tracking-tight">🌅 {t.title}</h2>
      <p className="mt-2 text-white/80">{t.lead}</p>

      <div className="mt-6 sm:mt-8 mx-auto w-full max-w-[900px]">
        <figure
          className="
            relative overflow-hidden rounded-xl ring-1 ring-white/10 shadow-lg bg-black/50
          "
          aria-label={isSr ? "Galerija iluzije dubine" : "Depth illusion gallery"}
        >
          {/* 2×2 mreža: uvek dve kolone (i na telefonu) */}
          <div className="grid grid-cols-2 gap-2 sm:gap-3 p-2 sm:p-3">
            <div className="relative w-full aspect-[4/3] overflow-hidden rounded-lg">
              <Image
                src="/images/illusions/depth-illusion-1.jpg"
                alt={t.alt1}
                fill
                className="object-cover select-none"
                sizes="(max-width: 900px) 50vw, 450px"
                priority
              />
            </div>
            <div className="relative w-full aspect-[4/3] overflow-hidden rounded-lg">
              <Image
                src="/images/illusions/depth-illusion-2.jpg"
                alt={t.alt2}
                fill
                className="object-cover select-none"
                sizes="(max-width: 900px) 50vw, 450px"
              />
            </div>
            <div className="relative w-full aspect-[4/3] overflow-hidden rounded-lg">
              <Image
                src="/images/illusions/depth-illusion-3.jpg"
                alt={t.alt3}
                fill
                className="object-cover select-none"
                sizes="(max-width: 900px) 50vw, 450px"
              />
            </div>
            <div className="relative w-full aspect-[4/3] overflow-hidden rounded-lg">
              <Image
                src="/images/illusions/depth-illusion-4.jpg"
                alt={t.alt4}
                fill
                className="object-cover select-none"
                sizes="(max-width: 900px) 50vw, 450px"
              />
            </div>
          </div>

          <figcaption className="px-3 pb-3 text-center text-xs sm:text-sm text-white/80">
            {isSr
              ? "Bliže kameri = veće; dalje = manje. Veliki objekti u daljini deluju sićušno kada ih poravnaš s bližim subjektom."
              : "Closer to the camera = larger; farther = smaller. Huge distant objects look tiny when aligned with a nearer subject."}
          </figcaption>
        </figure>
      </div>
    </div>
  );
}
