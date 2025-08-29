"use client";

import Image from "next/image";
import { useContext, useState } from "react";
import { LanguageContext } from "@/app/context/LanguageContext";

export default function Illusion() {
  const { language } = useContext(LanguageContext);
  const isSr = language === "sr";

  const t = {
    title: isSr ? "Margaret Tačer iluzija" : "Thatcher Effect",
    lead: isSr
      ? "Klikni/dodirni sliku da je okreneš naopačke. U uspravnom položaju obrnuti delovi lica deluju čudno, a kada okreneš celo lice — efekat slabi."
      : "Click/tap the image to flip it upside down. Upright, inverted facial parts look odd; flip the whole face and the effect weakens.",
    btnFlip: isSr ? "Okreni naopačke" : "Turn upside down",
    btnUpright: isSr ? "Vrati uspravno" : "Return upright",
  };

  const [flipped, setFlipped] = useState(false);

  // Ako ti je fajl pod drugim imenom, promeni putanju ispod:
  const IMG_SRC = "/images/illusions/thatcher-effect.webp";

  return (
    <div className="rounded-2xl bg-black/65 backdrop-blur-md text-white shadow-2xl ring-1 ring-white/10 p-6 sm:p-8 lg:p-10">
      <h2 className="text-xl sm:text-2xl font-bold tracking-tight">{t.title}</h2>
      <p className="mt-2 text-white/80">{t.lead}</p>

      {/* Samo slika u svom ramu (bez belog canvasa) */}
      <div className="mt-6 sm:mt-8 mx-auto w-full max-w-[820px]">
        <figure
          role="button"
          aria-pressed={flipped}
          aria-label={isSr ? "Okreni sliku" : "Flip image"}
          onClick={() => setFlipped((s) => !s)}
          className="relative rounded-xl overflow-hidden ring-1 ring-white/10 shadow-lg cursor-pointer select-none"
        >
          {/* Koristimo width/height da Image čuva odnos stranica i lepo stane u ram */}
          <Image
            src={IMG_SRC}
            alt={isSr ? "Lice za Thatcher iluziju" : "Face for Thatcher effect"}
            width={1200}
            height={1500}
            priority
            draggable={false}
            sizes="(max-width: 820px) 100vw, 820px"
            className="w-full h-auto block max-w-250"
            // Rotacija direktno na slici (bez croppinga, bez razvlačenja)
            style={{
              transform: `rotate(${flipped ? 180 : 0}deg)`,
              transformOrigin: "50% 50%",
              transition: "transform 720ms cubic-bezier(.2,.8,.2,1)",
            }}
          />
        </figure>

        {/* Dugme — postaje belo kada je flip aktivan */}
        <div className="mt-4 flex justify-end">
          <button
            onClick={() => setFlipped((s) => !s)}
            className={[
              "rounded-full px-4 py-2 font-semibold transition shadow-sm ring-1",
              flipped
                ? "bg-white/85 text-primary ring-black/10 hover:bg-white"
                : "bg-brand-235 text-white ring-transparent hover:brightness-110",
            ].join(" ")}
          >
            {flipped ? t.btnUpright : t.btnFlip}
          </button>
        </div>
      </div>
    </div>
  );
}
