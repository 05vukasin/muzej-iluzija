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
    title: isSr ? "Varljiva haljina" : "The Dress Illusion",
    intro: isSr
      ? "Učiš kako percepcija boje zavisi od svetlosnog konteksta i nesvesnih pretpostavki o izvoru svetla. Neki vide haljinu crno–plavu, drugi zlatno–belu — i možeš manipulisati tim efektom."
      : "Learn how color perception depends on light context and unconscious assumptions. Some see the dress as black–blue, others as white–gold — and you can manipulate this effect.",
    needTitle: isSr ? "Šta ti je potrebno" : "What you need",
    needList: isSr
      ? [
          "Odštampana fotografija haljine (A5/A4, visoka rezolucija)",
          "Providne folije (plava, žuta, siva, roze, prozirna)",
          "Makaze",
          "Telefon sa blicem ili lampa",
        ]
      : [
          "Printed photo of the dress (A5/A4, high resolution)",
          "Transparent films (blue, yellow, gray, pink, clear)",
          "Scissors",
          "Phone with flash or a lamp",
        ],
    makeTitle: isSr ? "Napravi iluziju" : "Make the illusion",
    makeSteps: isSr
      ? [
          "Odštampaj sliku haljine i postavi je na ravnu površinu.",
          "Iseci folije u formatu koji prekrivaju celu sliku.",
          "Stavljaj različite filtere preko slike i posmatraj promenu boje.",
          "Isprobaj različita osvetljenja (dnevno, lampa, sa strane).",
          "Kombinuj dva filtera jedan preko drugog.",
        ]
      : [
          "Print the dress photo and place it on a flat surface.",
          "Cut films large enough to cover the whole image.",
          "Place different filters over the photo and observe color shifts.",
          "Try various lights (daylight, lamp, side lighting).",
          "Combine two films on top of each other.",
        ],
    moreTitle: isSr ? "Eksperimentiši dalje" : "Try more",
    moreList: isSr
      ? [
          "Daj više ljudi da posmatra istu scenu — uporedi doživljaje.",
          "Filtriraj samo deo slike i poredi „pre/posle“.",
          "Uradi digitalno: primeni filtere u aplikacijama (Instagram, Snapseed, Canva).",
          "Štampaj dve verzije (plavo–crna i zlatno–bela) i posmatraj promene pod filterima.",
        ]
      : [
          "Ask multiple people to view the same setup — compare perceptions.",
          "Filter only part of the image and compare “before/after”.",
          "Do a digital version: apply filters in apps (Instagram, Snapseed, Canva).",
          "Print both variants (black–blue and white–gold) and test under filters.",
        ],
    whyTitle: isSr ? "Zašto se to dešava?" : "Why does it happen?",
    whyText: isSr
      ? "Mozak pokušava da proceni izvor svetla: hladna LED osvetljenost (plav ton) ili toplo sunčevo svetlo (žut ton). Na osnovu pretpostavke kompenzuje boje da “ispravi” scenu — zato neki vide crno–plavo (odbacuje plavu), a drugi zlatno–belo (odbacuje žutu)."
      : "Your brain infers the light source: cool LEDs (bluish) or warm sunlight (yellowish). It then compensates to “correct” the scene — hence some see black–blue (discounting blue) while others see white–gold (discounting yellow).",
    back: isSr ? "Nazad na iluzije" : "Back to Illusions",
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
            src="/images/illusions/lying-dress.jpg"
            alt={isSr ? "Varljiva haljina" : "The Dress"}
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
          {t.title} <span className="align-middle">👗</span>
        </h1>
        <p className="mt-3 text-white/90 leading-relaxed">{t.intro}</p>
      </div>

      {/* Sadržaj */}
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
      <div className="mt-8">
        <Link
          href="/illusions"
          className="rounded-full bg-brand-235 text-white px-5 py-2.5 font-semibold hover:brightness-110 transition"
        >
          {t.back}
        </Link>
      </div>
    </div>
  );
}
