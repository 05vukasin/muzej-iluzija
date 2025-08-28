"use client";

import Link from "next/link";
import { useContext } from "react";
import { LanguageContext } from "@/app/context/LanguageContext";

export default function TextBlock() {
  const { language } = useContext(LanguageContext);
  const isSr = language === "sr";

  const t = {
    cat: isSr ? "Iluzije prostora" : "Spatial Illusions",
    title: isSr ? "Iluzija perspektive" : "Perspective Illusion",
    intro: isSr
      ? "Dve identične figure, postavljene duž linija koje sugerišu dubinu, deluju različito velike! Mozak uzima tragove iz perspektive (konvergentne linije, „hodnik“) i pogrešno procenjuje stvarnu veličinu."
      : "Two identical figures placed along perspective cues can look different in size! The brain uses converging lines and ‘corridor’ context and misjudges true size.",
    needTitle: isSr ? "Šta ti je potrebno" : "What you need",
    needList: isSr
      ? [
          "Karton (ili čvršći papir)",
          "Lenjir i olovka",
          "Makaze",
          "Flomaster ili crni marker",
          "Lepljiva traka ili lepak",
          "Papir sa paralelnim/perspektivnim linijama (ili ih sam nacrtaj)",
        ]
      : [
          "Cardboard (or sturdy paper)",
          "Ruler and pencil",
          "Scissors",
          "Black marker",
          "Tape or glue",
          "Paper with parallel/perspective lines (or draw your own)",
        ],
    makeTitle: isSr ? "Napravi iluziju" : "Build the illusion",
    makeSteps: isSr
      ? [
          "Nacrtaj ili odštampaj dve identične figure (boje/šrafure po želji).",
          "Pažljivo ih iseci i, radi jasnoće, obeleži različitim bojama/šrafurama.",
          "Na podlozi nacrtaj linije koje se seku u daljini (nagib ~30–45°), kao „hodnik“.",
          "Postavi jednu figuru bliže, drugu dalje duž linija — uporedi! Dalja deluje većom, iako su iste.",
        ]
      : [
          "Draw/print two identical figures (color/hatching optional).",
          "Cut them out and mark them differently for clarity.",
          "On a base sheet, draw lines converging to a vanishing point (~30–45°), like a hallway.",
          "Place one figure closer and the other farther along the lines — compare! The farther one looks larger despite being identical.",
        ],
    moreTitle: isSr ? "Eksperimentiši dalje" : "Try more",
    moreList: isSr
      ? [
          "Zameni mesta figurama — efekat ostaje.",
          "Menjaj ugao konvergentnih linija (slab ugao → slabiji efekat).",
          "Dodaj još figura različitih boja i „stazu“ ka dubini.",
        ]
      : [
          "Swap figure positions — the effect persists.",
          "Vary the lines’ angle (shallower angle → weaker effect).",
          "Add more colored figures and a longer ‘path’ into depth.",
        ],
    whyTitle: isSr ? "Zašto se to dešava?" : "Why does it happen?",
    whyText: isSr
      ? "Vizuelni sistem koristi perspektivne tragove (konvergentne linije) da zaključi dubinu i relativnu veličinu. Kada su figure poravnate sa takvim tragovima, mozak pogrešno pripisuje veću veličinu objektu koji deluje „dalje u prostoru“, pa ga doživljava većim iako su fizički identični."
      : "The visual system relies on perspective cues (converging lines) to infer depth and relative size. When figures align with those cues, the brain attributes greater size to the one that appears ‘farther in space,’ perceiving it as larger even though the two are physically identical.",
    back: isSr ? "Nazad na iluzije" : "Back to Illusions",
    ask: isSr ? "Pitaj nas bilo šta" : "Ask us anything",
  };

  return (
    <div className="rounded-2xl bg-black/65 backdrop-blur-md text-white shadow-2xl ring-1 ring-white/10 p-6 sm:p-8 lg:p-10">
      {/* Header (CSS thumbnail top-right, text wraps) */}
      <div className="relative after:content-[''] after:block after:clear-both">
        {/* CSS thumbnail: „hodnik“ sa konvergencijom + dve identične figure */}
        <div
          className="
            relative float-right shrink-0 ml-4 mb-2
            w-24 h-24 sm:w-40 sm:h-28 md:w-48 md:h-32
            rounded-xl overflow-hidden ring-1 ring-white/15 shadow-xl
          "
          aria-hidden="true"
        >
          {/* zidovi (konvergencija ka centru) */}
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(180deg, rgba(255,255,255,0.12), rgba(255,255,255,0.04))",
            }}
          />
          <div
            className="absolute inset-0"
            style={{
              clipPath: "polygon(0% 100%, 40% 0%, 60% 0%, 100% 100%)",
              background:
                "repeating-linear-gradient(90deg, rgba(255,255,255,0.08) 0 2px, transparent 2px 10px)",
              transform: "translateZ(0)",
            }}
          />
          {/* pod — trapez sa „fugama“ */}
          <div
            className="absolute left-1/2 bottom-0 -translate-x-1/2"
            style={{
              width: "140%",
              height: "70%",
              clipPath: "polygon(0% 100%, 20% 0%, 80% 0%, 100% 100%)",
              background:
                "repeating-linear-gradient(0deg, rgba(255,255,255,0.18) 0 2px, transparent 2px 12px)",
              filter: "drop-shadow(0 8px 12px rgba(0,0,0,0.35))",
            }}
          />
          {/* dve identične figure */}
          <div
            className="absolute"
            style={{
              bottom: "14%",
              left: "30%",
              width: "16%",
              height: "28%",
              background:
                "repeating-linear-gradient(90deg, #60a5fa 0 3px, #3b82f6 3px 6px)",
              borderRadius: 4,
              boxShadow: "0 4px 8px rgba(0,0,0,.35)",
            }}
          />
          <div
            className="absolute"
            style={{
              bottom: "36%",
              right: "24%",
              width: "16%",
              height: "28%",
              background:
                "repeating-linear-gradient(90deg, #fbbf24 0 3px, #f59e0b 3px 6px)",
              borderRadius: 4,
              boxShadow: "0 4px 8px rgba(0,0,0,.35)",
            }}
          />
          <span className="pointer-events-none absolute inset-0 rounded-xl bg-[radial-gradient(circle_at_30%_25%,rgba(255,255,255,0.16),transparent_55%)]" />
        </div>

        <p className="text-xs uppercase tracking-wider text-white/70">
          {t.cat}
        </p>
        <h1 className="mt-1 text-2xl sm:text-3xl md:text-4xl font-black tracking-tight">
          {t.title} <span className="align-middle">👻</span>
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
