"use client";

import Link from "next/link";
import { useContext } from "react";
import { LanguageContext } from "@/app/context/LanguageContext";
import Image from "next/image";

export default function TextBlock() {
  const { language } = useContext(LanguageContext);
  const isSr = language === "sr";

  const t = {
    cat: isSr ? "Iluzije oblika" : "Shape Illusions",
    title: isSr
      ? "Iste linije različite dužine"
      : "Equal Lines, Different Lengths",
    intro: isSr
      ? "Dve potpuno jednake linije mogu delovati različite dužine samo zbog malih „strelica/krilaca“ na krajevima — klasična Miler-Lajerova iluzija."
      : "Two perfectly equal lines can look different in length just because of small end ‘wings’ — the classic Müller-Lyer illusion.",
    needTitle: isSr ? "Šta ti je potrebno" : "What you need",
    needList: isSr
      ? ["Papir", "Lenjir", "Olovka ili flomaster", "Makaze (opciono)"]
      : ["Paper", "Ruler", "Pencil or marker", "Scissors (optional)"],
    makeTitle: isSr ? "Napravi iluziju" : "Build the illusion",
    makeSteps: isSr
      ? [
          "Nacrtaj dve horizontalne, jednake linije (npr. 6 cm), jednu ispod druge.",
          "Na gornjoj dodaj strelice ka unutra:  <——> .",
          "Na donjoj dodaj strelice ka spolja:  >——< .",
          "Postavi linije jednu ispod druge i uporedi — donja će delovati duža, iako su identične.",
        ]
      : [
          "Draw two horizontal equal lines (e.g., 6 cm), one beneath the other.",
          "On the top line add inward wings:  <——> .",
          "On the bottom line add outward wings:  >——< .",
          "Stack and compare — the lower looks longer, though they’re identical.",
        ],
    moreTitle: isSr ? "Eksperimentiši dalje" : "Try more",
    moreList: isSr
      ? [
          "Menjaj dužinu linija (3 cm, 8 cm…).",
          "Probaj različite uglove „krilaca” (30°, 90°, 120°).",
          "Isprobaj i vertikalne linije.",
          "Prekrij „krilca” papirom — da li iluzija nestaje?",
        ]
      : [
          "Vary line lengths (3 cm, 8 cm…).",
          "Try different wing angles (30°, 90°, 120°).",
          "Test vertical versions too.",
          "Cover the wings with paper — does the illusion vanish?",
        ],
    whyTitle: isSr ? "Zašto se to dešava?" : "Why does it happen?",
    whyText: isSr
      ? "Mozak tumači „krilca” kao perspektivne tragove. Strelice ka unutra liče na ivice koje se udaljavaju, a strelice ka spolja na uglove koji se otvaraju ka posmatraču. Zbog tog konteksta linije deluju kao da su različite dužine, iako nisu."
      : "Your brain reads the ‘wings’ as perspective cues. Inward wings resemble receding edges, outward wings resemble corners opening toward you. That context skews perceived length even though the lines are identical.",
    back: isSr ? "Nazad na iluzije" : "Back to Illusions",
    ask: isSr ? "Pitaj nas bilo šta" : "Ask us anything",
  };

  return (
    <div className="rounded-2xl bg-black/65 backdrop-blur-md text-white shadow-2xl ring-1 ring-white/10 p-6 sm:p-8 lg:p-10">
      {/* Header (CSS thumbnail top-right, text wraps) */}
      <div className="relative after:content-[''] after:block after:clear-both">
        {/* CSS thumbnail (Müller-Lyer) */}
        <div
          className="
                    relative float-right shrink-0 ml-4 mb-2
                    w-24 h-24 sm:w-40 sm:h-40 md:w-48 md:h-48
                    rounded-xl overflow-hidden ring-1 ring-white/15 shadow-xl
                  "
        >
          <Image
            src="/images/illusions/same-lines.webp"
            alt={isSr ? "Spiralni pokreti" : "Spiral Motion"}
            fill
            className="object-cover select-none"
            priority
          />
          <span className="pointer-events-none absolute inset-0 rounded-xl bg-[radial-gradient(circle_at_30%_25%,rgba(255,255,255,0.16),transparent_55%)]" />
        </div>

        <p className="text-xs uppercase tracking-wider text-white/70">
          {t.cat}
        </p>
        <h1 className="mt-1 text-2xl sm:text-3xl md:text-4xl font-black tracking-tight">
          {t.title} <span className="align-middle">↔️</span>
        </h1>
        <p className="mt-3 text-white/90 leading-relaxed">{t.intro}</p>
      </div>

      {/* Content */}
      <div className="mt-8 grid lg:grid-cols-2 gap-8">
        <div>
          <h2 className="text-xl font-semibold">{t.needTitle}</h2>
          <ul className="mt-3 space-y-2 text-white/90">
            {t.needList.map((m, i) => (
              <li key={i} className="flex gap-3">
                <span className="mt-2 inline-block h-1.5 w-1.5 rounded-full bg-brand-235" />
                <span>{m}</span>
              </li>
            ))}
          </ul>

          <h3 className="mt-6 font-semibold">{t.makeTitle}</h3>
          <ol className="mt-2 space-y-2 list-decimal list-inside text-white/90">
            {t.makeSteps.map((s, i) => (
              <li key={i}>{s}</li>
            ))}
          </ol>
        </div>

        <div>
          <h2 className="text-xl font-semibold">{t.moreTitle}</h2>
          <ul className="mt-3 space-y-2 text-white/90">
            {t.moreList.map((m, i) => (
              <li key={i} className="flex gap-3">
                <span className="mt-2 inline-block h-1.5 w-1.5 rounded-full bg-brand-235" />
                <span>{m}</span>
              </li>
            ))}
          </ul>

          <h2 className="mt-6 text-xl font-semibold">{t.whyTitle}</h2>
          <p className="mt-2 text-white/90 leading-relaxed">{t.whyText}</p>
        </div>
      </div>

      {/* CTA */}
      <div className="mt-8 flex flex-wrap items-center gap-3">
        <Link
          href="/illusions"
          className="rounded-full bg-brand-235 text-white px-5 py-2.5 font-semibold hover:brightness-110 transition"
        >
          {t.back}
        </Link>
        <Link
          href="/contact"
          className="rounded-full border border-white/20 text-white px-5 py-2.5 hover:bg-white/10 transition"
        >
          {t.ask}
        </Link>
      </div>
    </div>
  );
}
