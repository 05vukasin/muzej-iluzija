"use client";

import Image from "next/image";
import { useContext } from "react";
import { LanguageContext } from "@/app/context/LanguageContext";

export default function Illusion() {
  const { language } = useContext(LanguageContext);
  const isSr = language === "sr";

  const t = {
    title: isSr ? "Penrouzov trougao — animacija" : "Penrose Triangle — animation",
    lead: isSr
      ? "Pogledaj kako „trougao“ deluje konzistentno dok mozak pokušava da spoji nemoguće spojeve."
      : "Watch how the ‘triangle’ seems consistent while the brain tries to join impossible junctions.",
    alt: isSr ? "Animacija nemogućeg oblika (Penrouzov trougao)" : "Impossible shape animation (Penrose triangle)",
  };

  const IMG_SRC = "/images/illusions/impossible-shape.gif";

  return (
    <div className="rounded-2xl bg-black/65 backdrop-blur-md text-white shadow-2xl ring-1 ring-white/10 p-6 sm:p-8 lg:p-10">
      <h2 className="text-xl sm:text-2xl font-bold tracking-tight">{t.title}</h2>
      <p className="mt-2 text-white/80">{t.lead}</p>

      <div className="mt-6 sm:mt-8 mx-auto w-full max-w-[900px]">
        <figure
          className="relative mx-auto w-full max-w-[600px] overflow-hidden rounded-xl ring-1 ring-white/10 shadow-lg bg-black/50"
          aria-label={isSr ? "Animacija nemogućeg oblika" : "Impossible shape animation"}
        >
          <Image
            src={IMG_SRC}
            alt={t.alt}
            width={1200}
            height={1200}
            priority
            draggable={false}
            sizes="(max-width: 600px) 100vw, 600px"
            className="w-full h-auto block select-none"
          />

          <figcaption className="px-3 pb-3 text-center text-xs sm:text-sm text-white/80">
            {isSr
              ? "Nemoguć spoj ivica deluje ubedljivo jer mozak pokušava da ga „zatvori“ u konzistentan 3D objekat."
              : "The impossible edge junction looks credible because the brain tries to ‘close’ it into a consistent 3D object."}
          </figcaption>
        </figure>
      </div>
    </div>
  );
}
