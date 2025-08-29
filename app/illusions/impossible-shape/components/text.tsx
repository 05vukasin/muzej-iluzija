"use client";

import Image from "next/image";
import Link from "next/link";
import { useContext } from "react";
import { LanguageContext } from "@/app/context/LanguageContext";

export default function TextBlock() {
  const { language } = useContext(LanguageContext);
  const isSr = language === "sr";

  const t = {
    cat: isSr ? "Nemogući oblici" : "Impossible Shapes",
    title: isSr ? "Nemogući oblik — Penrouzov trougao" : "Impossible Shape — Penrose Triangle",
    intro: isSr
      ? "Penrouzov trougao izgleda kao 3D objekat sa ivicama koje se spajaju na načine koji u stvarnosti ne mogu da postoje. Tvoj mozak pokušava da sastavi konzistentan 3D oblik iz 2D tragova — i tu nastaje kontradikcija."
      : "The Penrose triangle looks like a 3D object whose edges connect in ways that are physically impossible. Your brain tries to assemble a consistent 3D shape from 2D cues—creating a contradiction.",
    needTitle: isSr ? "Šta ti je potrebno" : "What you need",
    needList: isSr
      ? [
          "Papir i olovka za skice",
          "Lenjir",
          "Makaze i lepak (za papirni model)",
          "Karton ili stiropor (opciono, za 3D model)",
          "Šrafciger, lepilo ili traka (za složenije 3D konstrukcije)",
        ]
      : [
          "Paper and pencil for sketches",
          "Ruler",
          "Scissors and glue (for a paper model)",
          "Cardboard or foam (optional, for a 3D build)",
          "Screwdriver, glue or tape (for more complex builds)",
        ],
    makeTitle: isSr ? "Napravi iluziju" : "Build the illusion",
    makeSteps: isSr
      ? [
          "Nacrtaj Penrouzov trougao: tri povezane trake koje formiraju trougao, ali sa „nemogućim“ spojnicama u 3D.",
          "Pogledaj tutorijale/video-inspiraciju i razumi principe pravljenja iluzije u 3D.",
          "Napravi model od papira ili kartona tako da iz jednog ugla deluje kao Penrouzov trougao.",
          "Posmatraj model iz odgovarajućeg ugla da bi iluzija „nemogućeg“ bila ubedljiva.",
        ]
      : [
          "Draw a Penrose triangle: three joined beams forming a triangle with impossible 3D junctions.",
          "Watch a tutorial/video for inspiration to grasp the 3D illusion principles.",
          "Build a paper/cardboard model that looks like a Penrose triangle from one viewpoint.",
          "View the model from the right angle to make the ‘impossible’ illusion convincing.",
        ],
    moreTitle: isSr ? "Eksperimentiši dalje" : "Try more",
    moreList: isSr
      ? [
          "Organizuj takmičenje u pravljenju nemogućih 3D oblika od različitih materijala.",
          "Pokušaj i druge nemoguće oblike (kvadrat, stepenice…).",
          "Snimi video/fotografije iz pravog ugla i podeli sa prijateljima da „razotkriju“ iluziju.",
        ]
      : [
          "Run a contest for building impossible 3D shapes with various materials.",
          "Try other impossible figures (square, stairs…).",
          "Record photos/videos from the key angle and let friends try to ‘debunk’ the illusion.",
        ],
    whyTitle: isSr ? "Zašto se to dešava?" : "Why does it happen?",
    whyText: isSr
      ? "Mozak tumači 2D tragove kroz pravila perspektive i povezanosti ivica da bi rekonstruisao 3D svet. Kod nemogućih oblika ta pravila su namerno „prekršena“, ali mozak svejedno pokušava da ih sastavi — rezultat je osećaj nemogućeg objekta."
      : "The brain interprets 2D cues via perspective and edge-connectivity rules to reconstruct 3D. Impossible shapes deliberately violate those rules, yet the brain still tries to reconcile them—producing the impression of an impossible object.",
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
            src="/images/illusions/impossible-shape.jpg"
            alt={isSr ? "Penrouzov trougao" : "Penrose triangle"}
            fill
            className="object-cover select-none"
            priority
          />
          <span className="pointer-events-none absolute inset-0 rounded-xl bg-[radial-gradient(circle_at_30%_25%,rgba(255,255,255,0.16),transparent_55%)]" />
        </div>

        <p className="text-xs uppercase tracking-wider text-white/70">{t.cat}</p>
        <h1 className="mt-1 text-2xl sm:text-3xl md:text-4xl font-black tracking-tight">
          {t.title} <span className="align-middle">⟁</span>
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
