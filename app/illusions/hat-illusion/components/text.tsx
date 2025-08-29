"use client";

import Image from "next/image";
import Link from "next/link";
import { useContext } from "react";
import { LanguageContext } from "@/app/context/LanguageContext";

export default function TextBlock() {
  const { language } = useContext(LanguageContext);
  const isSr = language === "sr";

  const t = {
    cat: isSr ? "Iluzije oblika" : "Shape Illusions",
    title: isSr ? "Iluzija šešira (T-iluzija)" : "Hat Illusion (T-Illusion)",
    intro: isSr
      ? "Dve linije iste dužine deluju različito kada formiraju slovo T: horizontalna izgleda kraće, iako su identične. Rasklapanjem figure vidi se da su linije zaista iste."
      : "Two lines of equal length look different when arranged as a T: the horizontal appears shorter, though they’re identical. Unfolding the figure reveals the lines are the same.",
    needTitle: isSr ? "Šta ti je potrebno" : "What you need",
    need: isSr
      ? ["Papir", "Lenjir", "Olovka ili flomaster", "Makaze (opciono)"]
      : ["Paper", "Ruler", "Pencil or marker", "Scissors (optional)"],
    buildTitle: isSr ? "Napravi iluziju" : "Build the illusion",
    build: isSr
      ? [
          "Nacrtaj horizontalnu liniju dužine ~6 cm.",
          "U njenom centru nacrtaj vertikalnu liniju iste dužine — dobijaš oblik slova T.",
          "Napravi još jednu T-formu: prvo vertikalna, zatim preko nje horizontalna.",
          "Uporedi dužine — iako su iste, horizontalna deluje kraće.",
        ]
      : [
          "Draw a horizontal line about 6 cm long.",
          "At its center, draw a vertical line of the same length to form a T.",
          "Make a second T: draw the vertical first, then the horizontal across it.",
          "Compare lengths — although identical, the horizontal looks shorter.",
        ],
    tryTitle: isSr ? "Eksperimentiši dalje" : "Try more",
    try: isSr
      ? [
          "Rotiraj celu figuru — menja li se efekat?",
          "Menjaj odnos dužina (npr. 6 cm i 8 cm) i uporedi utisak.",
          "Dodaj pozadinu ili senčenje i posmatraj promenu.",
          "Iseci i složi delove jedan preko drugog za proveru.",
          "Probaj varijantu sa cilindrom/„šeširom“: obod i visina mogu biti jednaki, a delovati različito.",
        ]
      : [
          "Rotate the whole figure — does the effect change?",
          "Vary the lengths (e.g., 6 cm vs 8 cm) and compare.",
          "Add background or shading and observe the change.",
          "Cut and overlay the parts to verify equality.",
          "Try the cylinder/‘hat’ variant: brim and height can be equal yet look different.",
        ],
    whyTitle: isSr ? "Zašto se to dešava?" : "Why does it happen?",
    why: isSr
      ? "T-iluzija pokazuje kontekstualnu procenu dužine. Presek i uglovi T-oblika navode mozak da vertikalnu liniju tumači kao „istaknutiju“, dok horizontalna deluje „ograničeno“ okvirom preseka — zato izgleda kraće iako nije."
      : "The T-illusion demonstrates contextual length judgment. The intersection and angles of the T make the vertical feel more ‘extended’ while the horizontal seems ‘bounded’ by the cross — so it appears shorter even though it isn’t.",
    back: isSr ? "Nazad na iluzije" : "Back to Illusions",
    ask: isSr ? "Pitaj nas bilo šta" : "Ask us anything",
  };

  return (
    <div className="rounded-2xl bg-black/65 backdrop-blur-md text-white shadow-2xl ring-1 ring-white/10 p-6 sm:p-8 lg:p-10">
      {/* Header (slika u desnom ćošku, tekst wrap oko nje) */}
      <div className="relative after:content-[''] after:block after:clear-both">
        {/* thumbnail desno gore */}
        <div
          className="
            relative float-right shrink-0 ml-4 mb-2
            w-24 h-24 sm:w-40 sm:h-28 md:w-48 md:h-32
            rounded-xl overflow-hidden ring-1 ring-white/15 shadow-xl
          "
        >
          <Image
            src="/images/illusions/hat-illusion.jpg"
            alt={isSr ? "Iluzija šešira (T-iluzija)" : "Hat illusion (T-illusion)"}
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
          {t.title} <span className="align-middle">🎩</span>
        </h1>
        <p className="mt-3 text-white/90 leading-relaxed">{t.intro}</p>
      </div>

      {/* Sadržaj */}
      <div className="mt-8 grid lg:grid-cols-2 gap-8">
        <div>
          <h2 className="text-xl font-semibold">{t.needTitle}</h2>
          <ul className="mt-3 space-y-2 text-white/90">
            {t.need.map((m, i) => (
              <li key={i} className="flex gap-3">
                <span className="mt-2 inline-block h-1.5 w-1.5 rounded-full bg-brand-235" />
                <span>{m}</span>
              </li>
            ))}
          </ul>

          <h3 className="mt-6 font-semibold">{t.buildTitle}</h3>
          <ol className="mt-2 space-y-2 list-decimal list-inside text-white/90">
            {t.build.map((s, i) => (
              <li key={i}>{s}</li>
            ))}
          </ol>
        </div>

        <div>
          <h2 className="text-xl font-semibold">{t.whyTitle}</h2>
          <p className="mt-2 text-white/90 leading-relaxed">{t.why}</p>

          <h2 className="mt-6 text-xl font-semibold">{t.tryTitle}</h2>
          <ul className="mt-2 space-y-2 text-white/90">
            {t.try.map((m, i) => (
              <li key={i} className="flex gap-3">
                <span className="mt-2 inline-block h-1.5 w-1.5 rounded-full bg-brand-235" />
                <span>{m}</span>
              </li>
            ))}
          </ul>
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
