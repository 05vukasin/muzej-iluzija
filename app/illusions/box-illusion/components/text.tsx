"use client";

import Image from "next/image";
import Link from "next/link";
import { useContext } from "react";
import { LanguageContext } from "@/app/context/LanguageContext";

export default function TextBlock() {
  const { language } = useContext(LanguageContext);
  const isSr = language === "sr";

  const t = {
    cat: isSr ? "Iluzije prostora" : "Spatial Illusions",
    title: isSr ? "Iluzija kutija" : "Box Illusion",
    intro: isSr
      ? "Dve kutije deluju različitih proporcija — jedna „kratka i široka“, druga „duga i uska“ — iako su im gornje stranice potpuno iste. Perspektivni tragovi i ugao gledanja menjaju doživljaj veličine."
      : "Two boxes appear to have very different proportions—one ‘short & wide,’ the other ‘long & narrow’—even though their top faces are identical. Perspective cues and viewing angle reshape our size perception.",
    needTitle: isSr ? "Šta ti je potrebno" : "What you need",
    needList: isSr
      ? ["Papir", "Lenjir", "Olovka ili flomaster", "Makaze (opciono)"]
      : ["Paper", "Ruler", "Pencil or marker", "Scissors (optional)"],
    makeTitle: isSr ? "Napravi iluziju" : "Build the illusion",
    makeSteps: isSr
      ? [
          "Nacrtaj pravougaonik 6×3 cm (gornja „ploča“ kutije A).",
          "Nacrtaj isti pravougaonik i zarotiraj ga ~45° (gornja „ploča“ kutije B).",
          "Docrtaj bočne stranice da A deluje „plitko i široko“, a B „duže i u perspektivi“.",
          "Postavi ih jednu pored druge i uporedi gornje stranice — identične su!",
        ]
      : [
          "Draw a 6×3 cm rectangle (top face of box A).",
          "Draw the same rectangle and rotate it ~45° (top face of box B).",
          "Add side faces so A looks ‘shallow & wide’ and B ‘longer in perspective’.",
          "Place them side by side and compare the top faces—they’re identical!",
        ],
    moreTitle: isSr ? "Eksperimentiši dalje" : "Try more",
    moreList: isSr
      ? [
          "Iseci gornje stranice i preklopi jednu preko druge za proveru.",
          "Dodaj senke i pozadinu — jača li se iluzija?",
          "Probaj trapeze umesto pravougaonika i uporedi utisak.",
        ]
      : [
          "Cut out the top faces and overlay to verify.",
          "Add shading and background—does the illusion grow stronger?",
          "Try trapezoids instead of rectangles and compare.",
        ],
    whyTitle: isSr ? "Zašto se to dešava?" : "Why does it happen?",
    whyText: isSr
      ? "Vizuelni sistem automatski „popravlja“ 3D scenu iz 2D tragova (nagib ivica, senke, perspektiva). Isti oblik u različitim prostornim kontekstima doživljavamo kao različitih proporcija, iako geometrijski nije."
      : "The visual system ‘corrects’ 3D from 2D cues (edge slant, shading, perspective). The same shape in different spatial contexts is perceived with different proportions, despite being geometrically identical.",
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
            src="/images/illusions/box-illusion.jpg"
            alt={isSr ? "Iluzija kutija" : "Box Illusion"}
            fill
            className="object-cover select-none"
            priority
          />
          <span className="pointer-events-none absolute inset-0 rounded-xl bg-[radial-gradient(circle_at_30%_25%,rgba(255,255,255,0.16),transparent_55%)]" />
        </div>

        <p className="text-xs uppercase tracking-wider text-white/70">{t.cat}</p>
        <h1 className="mt-1 text-2xl sm:text-3xl md:text-4xl font-black tracking-tight">
          {t.title} <span className="align-middle">📦</span>
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
