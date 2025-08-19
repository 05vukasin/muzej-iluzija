// app/components/WhatToExpect.tsx
"use client";

import Image from "next/image";
import { useContext } from "react";
import { LanguageContext } from "@/app/context/LanguageContext";

export default function WhatToExpect() {
  const { language } = useContext(LanguageContext);

  const title =
    language === "sr"
      ? "ŠTA TE SVE ČEKA U ILUZIONARIJUMU?"
      : "WHAT AWAITS YOU AT ILUZIONARIJUM?";

  const items =
    language === "sr"
      ? [
          {
            h: "Vrtoglava soba",
            p: "Zidovi kao da se okreću oko tebe i varaju osećaj ravnoteže. Savršen primer kako mozak veruje vizuelnim tragovima više nego osećaju u telu.",
          },
          {
            h: "Amesova soba",
            p: "U jednom uglu izgledaš kao džin, u drugom kao patuljak. Učiš kako perspektiva ume da prevari mozak čak i kada „vidi“ jasno.",
          },
          {
            h: "Tunel beskonačnih ogledala",
            p: "Svetla i odrazi se umnožavaju u nedogled – prostor izgleda kao mali svemir koji se širi u svim pravcima.",
          },
          {
            h: "Portret koji te prati pogledom",
            p: "Gde god da se pomeriš, oči na slici te „prate“. Idealno za objašnjenje kako mozak spaja plitku reljefnost i senke u osećaj prisustva.",
          },
          {
            h: "Moje boje nestaju",
            p: "Gledaj u tačku 30 sekundi – pa „puf“: slika gubi boju! Ćelije u oku se zamaraju, a mozak ostatak prizora popunjava iz sećanja.",
          },
        ]
      : [
          {
            h: "Vortex Room",
            p: "Walls feel like they spin around you and trick your balance. See how vision can overrule your inner sense of stability.",
          },
          {
            h: "Ames Room",
            p: "Look like a giant in one corner and tiny in the other. Learn how perspective can fool the brain even with a clear view.",
          },
          {
            h: "Infinity Mirror Tunnel",
            p: "Lights and reflections multiply forever—space seems to expand into a tiny universe.",
          },
          {
            h: "Portrait That Follows You",
            p: "Wherever you move, the eyes ‘follow’. A neat way to show how shadows and shallow relief create the feeling of presence.",
          },
          {
            h: "My Colors Disappear",
            p: "Stare at a dot for 30 seconds and—poof!—colors fade. Your eye cells tire, and the brain fills the rest from memory.",
          },
        ];

  return (
    <section id="what-to-expect" className="relative overflow-hidden" aria-labelledby="wte-title">
      <div className="abs-pattern absolute inset-0 -z-10" aria-hidden="true" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
        <div className="grid md:grid-cols-[1fr,1.2fr] items-center gap-10 lg:gap-14">
          {/* Slika (levo na desktopu, gore na mobilnom) */}
          <div className="order-1">
            <div className="image-wrap rounded-2xl overflow-hidden ring-1 ring-white/10 shadow-2xl">
              <Image
                src="/images/picture-3.jpg" // možeš zameniti konkretnom fotografijom
                alt={language === "sr" ? "Iluzije – postavka" : "Illusions – exhibit"}
                fill
                sizes="(max-width:768px) 100vw, (max-width:1024px) 46vw, 560px"
                className="object-cover"
                priority
              />
            </div>
          </div>

          {/* Kartica sa sadržajem */}
          <div className="order-2">
            <div className="rounded-2xl bg-black/65 backdrop-blur-md text-white shadow-2xl ring-1 ring-white/10 p-6 sm:p-8 lg:p-10">
              <h2 id="wte-title" className="text-2xl sm:text-3xl md:text-4xl font-black tracking-tight">
                {title}
              </h2>

              <ul className="mt-6 space-y-5">
                {items.map((it, i) => (
                  <li key={i} className="flex gap-3">
                    <span className="mt-1.5 inline-block h-2 w-2 shrink-0 rounded-full bg-brand-235" />
                    <div>
                      <p className="font-semibold">{it.h}</p>
                      <p className="text-white/90 leading-relaxed">{it.p}</p>
                    </div>
                  </li>
                ))}
              </ul>

              <a
                href="/illusions"
                className="mt-8 inline-block rounded-full bg-brand-235 text-white px-6 py-3 font-semibold hover:brightness-110 transition"
              >
                {language === "sr" ? "Pogledaj iluzije" : "Explore illusions"}
              </a>
            </div>
          </div>
        </div>
      </div>

    </section>
  );
}
