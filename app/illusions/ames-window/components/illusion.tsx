"use client";

import Image from "next/image";
import { useContext } from "react";
import { LanguageContext } from "@/app/context/LanguageContext";

export default function Illusion() {
  const { language } = useContext(LanguageContext);
  const isSr = language === "sr";

  const t = {
    title: isSr ? "Ejmsov prozor" : "Ames Window",
    lead: isSr
      ? "Trapezasti „prozor” koji se ravnomerno rotira izgleda kao da se samo njiše napred–nazad. GIF ispod sadrži i kratko objašnjenje zašto perspektiva vara oko."
      : "A rotating trapezoidal ‘window’ appears to rock back and forth. The GIF below also includes a quick sketch explaining how perspective tricks your eye.",
    alt: isSr
      ? "Ejmsov prozor – iluzija i skica objašnjenja"
      : "Ames window – illusion with explanatory sketch",
  };

  return (
    <div className="rounded-2xl bg-black/65 backdrop-blur-md text-white shadow-2xl ring-1 ring-white/10 p-6 sm:p-8 lg:p-10">
      <h2 className="text-xl sm:text-2xl font-bold tracking-tight">🪟 {t.title}</h2>
      <p className="mt-2 text-white/80">{t.lead}</p>

      <div className="mt-6 sm:mt-8 mx-auto w-full max-w-[900px]">
        {/* Wrapper nema fiksnu visinu — prilagođava se prirodnoj visini GIF-a */}
        <figure className="rounded-xl overflow-hidden ring-1 ring-white/10 shadow-lg bg-black/80">
          <Image
            src="/images/illusions/ames-window.gif"
            alt={t.alt}
            // Postavite ove dimenzije na stvarnu veličinu vašeg GIF-a ako je znate
            width={900}
            height={506}
            sizes="(max-width: 900px) 100vw, 900px"
            priority
            className="select-none pointer-events-none block"
            style={{ width: "100%", height: "auto" }}
          />
        </figure>
      </div>
    </div>
  );
}
