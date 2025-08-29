"use client";

import Image from "next/image";
import Link from "next/link";
import { useContext } from "react";
import { LanguageContext } from "@/app/context/LanguageContext";

export default function TextBlock() {
  const { language } = useContext(LanguageContext);
  const isSr = language === "sr";

  const t = {
    cat: isSr ? "Kognitivne iluzije" : "Cognitive Illusions",
    title: isSr ? "Lice u oblacima (Pareidolija)" : "Face in the Clouds (Pareidolia)",
    intro: isSr
      ? "Pareidolija je pojava kada mozak prepoznaje poznate oblike — često lica — u nasumičnim šarama kao što su oblaci, stene ili mrlje. Uočićeš kako obični oblici „postaju“ lica, jer mozak traži prepoznatljive obrasce čak i tamo gde ih nema."
      : "Pareidolia is when your brain sees familiar shapes—often faces—in random patterns like clouds, rocks, or stains. You’ll notice ordinary shapes ‘turn into’ faces because the brain searches for recognizable patterns even where none exist.",
    needTitle: isSr ? "Šta ti je potrebno" : "What you need",
    needList: isSr
      ? ["Papir ili digitalni uređaj za crtanje", "Olovka/bojice/flomasteri (opciono)", "Fotografije ili slike oblaka (sopstvene ili sa interneta)"]
      : ["Paper or a digital drawing device", "Pencils/markers/crayons (optional)", "Photos or images of clouds (yours or from the web)"],
    makeTitle: isSr ? "Napravi iluziju" : "Build the illusion",
    makeSteps: isSr
      ? [
          "Pogledaj slike oblaka ili nacrtaj nasumične oblike na papiru.",
          "Pronađi i označi oblike koji liče na lice ili druge poznate figure.",
          "Podeli otkrića sa drugima i proveri da li vide isto.",
        ]
      : [
          "Look at cloud photos or draw random shapes on paper.",
          "Find and mark shapes that resemble a face or other familiar figures.",
          "Share your findings and see if others perceive the same thing.",
        ],
    moreTitle: isSr ? "Eksperimentiši dalje" : "Try more",
    moreList: isSr
      ? [
          "Organizuj takmičenje — ko najbrže ili najkreativnije pronađe lice?",
          "Fotografiši oblake u različitim vremenskim uslovima i traži različite slike.",
          "Isprobaj i druge nasumične šare: mrlje na zidu, teksture drveta, kamenje.",
        ]
      : [
          "Run a challenge—who finds faces fastest or most creatively?",
          "Shoot clouds in different weather and look for different images.",
          "Try other random patterns: wall stains, wood grain, stones.",
        ],
    whyTitle: isSr ? "Zašto se to dešava?" : "Why does it happen?",
    whyText: isSr
      ? "Mozak je izuzetno vešt u prepoznavanju obrazaca, posebno lica, jer je to ključno za društvenu interakciju i preživljavanje. Zato često „popunjava“ praznine i uočava poznate oblike u nasumičnim strukturama — stvara se iluzija lica u oblacima i sličnim šarama."
      : "The brain is highly tuned to detect patterns—especially faces—because it’s vital for social interaction and survival. It often ‘fills in’ gaps and perceives familiar forms in random structures, creating the illusion of faces in clouds and similar textures.",
    back: isSr ? "Nazad na iluzije" : "Back to Illusions",
    ask: isSr ? "Pitaj nas bilo šta" : "Ask us anything",
  };

  return (
    <div className="rounded-2xl bg-black/65 backdrop-blur-md text-white shadow-2xl ring-1 ring-white/10 p-6 sm:p-8 lg:p-10">
      {/* Header sa thumbnail-om desno */}
      <div className="relative after:content-[''] after:block after:clear-both">
        <div
          className="
            relative float-right shrink-0 ml-4 mb-2
            w-24 h-24 sm:w-40 sm:h-28 md:w-48 md:h-32
            rounded-xl overflow-hidden ring-1 ring-white/15 shadow-xl
          "
        >
          <Image
            src="/images/illusions/face-in-clouds.jpg"
            alt={isSr ? "Lice u oblacima (Pareidolija)" : "Face in the Clouds (Pareidolia)"}
            fill
            className="object-cover select-none"
            priority
          />
          <span className="pointer-events-none absolute inset-0 rounded-xl bg-[radial-gradient(circle_at_30%_25%,rgba(255,255,255,0.16),transparent_55%)]" />
        </div>

        <p className="text-xs uppercase tracking-wider text-white/70">{t.cat}</p>
        <h1 className="mt-1 text-2xl sm:text-3xl md:text-4xl font-black tracking-tight">
          {t.title} <span className="align-middle">☁️</span>
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
