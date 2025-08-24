"use client";

import Image from "next/image";
import Link from "next/link";
import { useContext } from "react";
import { LanguageContext } from "@/app/context/LanguageContext";

export default function TextBlock() {
  const { language } = useContext(LanguageContext);
  const isSr = language === "sr";

  const t = {
    cat: isSr ? "Iluzije boje i svetla" : "Color & Light",
    title: isSr ? "Kada svetlo vara tvoje oči" : "When Light Tricks Your Eyes",
    intro: isSr
      ? "Nauči kako kontekst utiče na percepciju svetline. Dva kvadrata mogu biti apsolutno iste boje, ali izgledaju svetlije ili tamnije zavisno od pozadine."
      : "Learn how context influences perceived lightness. Two identical squares can look lighter or darker depending on their background.",
    needTitle: isSr ? "Šta ti je potrebno" : "What you need",
    need: isSr
      ? [
          "Makaze",
          "Karton ili čvršći papir",
          "Slika sa svetlosnim gradijentom (tamno → svetlo)",
          "Jednobojni sivi kvadratići (identična nijansa)",
        ]
      : [
          "Scissors",
          "Cardstock or sturdy paper",
          "A lightness gradient image (dark → light)",
          "Uniform gray squares (identical shade)",
        ],
    stepsTitle: isSr ? "Napravi iluziju" : "Build the illusion",
    steps: isSr
      ? [
          "Odštampaj gradijent (tamno → svetlo).",
          "Iseci 2–3 siva kvadrata iste veličine/boje (npr. RGB 128,128,128).",
          "Zalepi jedan kvadrat na tamnu zonu, drugi na svetlu.",
          "Posmatraj: kvadrat na tamnoj pozadini izgleda svetlije, na svetloj tamnije.",
          "Proveri tako što prekriješ pozadinu oko kvadrata — videćeš da su identični.",
        ]
      : [
          "Print the gradient (dark → light).",
          "Cut 2–3 same-size gray squares (e.g., RGB 128,128,128).",
          "Place one square on the dark region, one on the light region.",
          "Observe: on dark background it looks lighter; on light background, darker.",
          "Verify by covering the background around each square — they are identical.",
        ],
    whyTitle: isSr ? "Zašto se to dešava?" : "Why does this happen?",
    whyText: isSr
      ? "Vizuelni sistem ne meri svetlinu apsolutno već relativno u odnosu na okolinu. Lokalna kontrastna adaptacija pokušava da izjednači osvetljenost scene, pa pogrešno proceni ton kvadrata."
      : "Your visual system encodes lightness relative to context. Local contrast adaptation tries to equalize scene brightness, biasing the perceived tone of the squares.",
    tryTitle: isSr ? "Eksperimentiši dalje" : "Try more",
    try: isSr
      ? [
          "Menjaj boju kvadrata (tamnije/svetlije sive).",
          "Pomeri kvadrate ka sredini ili rubovima gradijenta.",
          "Probaj druge gradijente (plava → bela, crvena → crna).",
          "Maskiraj okolinu — kad nestane kontekst, nestaje i iluzija.",
        ]
      : [
          "Change square shades (darker/lighter grays).",
          "Slide squares toward the center or edges of the gradient.",
          "Try different gradients (blue → white, red → black).",
          "Isolate surroundings — remove context and the illusion weakens.",
        ],
    back: isSr ? "Nazad na iluzije" : "Back to Illusions",
    ask: isSr ? "Pitaj nas bilo šta" : "Ask us anything",
  };

  return (
    <div className="rounded-2xl bg-black/65 backdrop-blur-md text-white shadow-2xl ring-1 ring-white/10 p-6 sm:p-8 lg:p-10">
      {/* Header */}
      <div className="flex items-start justify-between gap-5">
        <div className="flex-1">
          <p className="text-xs uppercase tracking-wider text-white/70">{t.cat}</p>
          <h1 className="mt-1 text-2xl sm:text-3xl md:text-4xl font-black tracking-tight">
            {t.title} <span className="align-middle">🔳</span>
          </h1>
          <p className="mt-3 text-white/90 leading-relaxed">{t.intro}</p>
        </div>

        {/* ilustracija desno (manja na mobilnom) */}
        <div className="relative shrink-0 rounded-xl overflow-hidden ring-1 ring-white/15 shadow-xl w-[90px] h-[90px] sm:w-[180px] sm:h-[120px]">
          <Image
            src="/images/illusions/light-tricks.jpg"
            alt={isSr ? "Kada svetlo vara tvoje oči" : "When Light Tricks Your Eyes"}
            fill
            className="object-cover"
            priority
          />
          <span className="pointer-events-none absolute inset-0 rounded-xl bg-[radial-gradient(circle_at_30%_25%,rgba(255,255,255,0.16),transparent_55%)]" />
        </div>
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

          <h3 className="mt-6 font-semibold">{t.stepsTitle}</h3>
          <ol className="mt-2 space-y-2 list-decimal list-inside text-white/90">
            {t.steps.map((s, i) => (
              <li key={i}>{s}</li>
            ))}
          </ol>
        </div>

        <div>
          <h2 className="text-xl font-semibold">{t.whyTitle}</h2>
          <p className="mt-2 text-white/90 leading-relaxed">{t.whyText}</p>

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
