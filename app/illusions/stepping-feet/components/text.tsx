"use client";

import Image from "next/image";
import Link from "next/link";
import { useContext } from "react";
import { LanguageContext } from "@/app/context/LanguageContext";

export default function TextBlock() {
  const { language } = useContext(LanguageContext);
  const isSr = language === "sr";

  const t = {
    cat: isSr ? "Iluzije pokreta" : "Motion Illusions",
    title: isSr ? "Iluzija koračanja" : "Stepping Feet Illusion",
    intro: isSr
      ? "Dve trake iste brzine, boje i veličine mogu izgledati kao da se kreću različitim ritmom — kao da jedna „korača“, a druga klizi. Prostorni prekidi (rešetka/štrafte) varaju vizuelni sistem u percepciji ritma i brzine."
      : "Two bars with identical speed, color and size can appear to move at different rhythms — as if one ‘steps’ while the other glides. Spatial occlusions (grid/stripes) trick the visual system into perceiving different tempo and speed.",
    needTitle: isSr ? "Šta ti je potrebno" : "What you need",
    needList: isSr
      ? [
          "Karton (za okvir i „rešetku“)",
          "Papir u boji (žuti i plavi) ili flomasteri",
          "2 drvena štapića (ražnjići/slamke)",
          "Makaze, lepak",
          "Lenjir i olovka",
        ]
      : [
          "Cardboard (for the frame and ‘grid’)",
          "Colored paper (yellow & blue) or markers",
          "2 wooden sticks (skewers/straws)",
          "Scissors, glue",
          "Ruler and pencil",
        ],
    makeTitle: isSr ? "Napravi iluziju" : "Build the illusion",
    makeSteps: isSr
      ? [
          "Iseci osnovu od kartona i napravi horizontalni „prozor“ (15–20 cm).",
          "Napravi traku sa naizmeničnim žutim i plavim kvadratima (npr. 1×1 cm).",
          "Napravi rešetku: vertikalne trake (npr. 1 cm širine sa 1 cm razmaka).",
          "Postavi štraftastu traku iza rešetke i pomeraj je levo-desno kroz prozor.",
          "Spoj žutu i plavu traku na isti štapić: kretaće se jednako, ali izgledati različito.",
        ]
      : [
          "Cut a cardboard base and make a horizontal ‘window’ (15–20 cm).",
          "Create a strip with alternating yellow & blue squares (e.g., 1×1 cm).",
          "Make a grid: vertical slats (e.g., 1 cm wide with 1 cm gaps).",
          "Place the striped strip behind the grid and slide it left–right across the window.",
          "Mount both yellow & blue strips on the same stick: they move equally yet look different.",
        ],
    moreTitle: isSr ? "Eksperimentiši dalje" : "Try more",
    moreList: isSr
      ? [
          "Menjaj veličinu kvadrata i razmake rešetke — kad je efekat najjači?",
          "Probaj crno-bele štrafte ili druge boje.",
          "Okreći postavku horizontalno/vertikalno i uporedi utisak.",
          "Dodaj providnu foliju za stabilnost ili pogon motorčićem za ravnomerno kretanje.",
        ]
      : [
          "Vary square size and grid spacing — when is the effect strongest?",
          "Try black-and-white stripes or other colors.",
          "Rotate the setup horizontally/vertically and compare.",
          "Add a clear film for rigidity or motorized drive for constant motion.",
        ],
    whyTitle: isSr ? "Zašto se to dešava?" : "Why does it happen?",
    whyText: isSr
      ? "Trake se ispod rešetke vide u segmentima. Iako su realno iste brzine, mozak registruje promene boje/svetline samo između proreza rešetke, pa „sample-uje“ kretanje u različitim ritmovima. Zato jedna traka deluje kao da korača, a druga klizi — iako im je brzina ista."
      : "The bars are seen in segments beneath the grid. Although their physical speed is identical, the brain only samples changes in color/brightness between the slits, producing different perceived rhythms. One bar seems to ‘step’ while the other ‘glides’ — despite equal speed.",
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
            src="/images/illusions/stepping-feet.jpg"
            alt={isSr ? "Iluzija koračanja" : "Stepping Feet"}
            fill
            className="object-cover select-none"
            priority
          />
          <span className="pointer-events-none absolute inset-0 rounded-xl bg-[radial-gradient(circle_at_30%_25%,rgba(255,255,255,0.16),transparent_55%)]" />
        </div>

        <p className="text-xs uppercase tracking-wider text-white/70">{t.cat}</p>
        <h1 className="mt-1 text-2xl sm:text-3xl md:text-4xl font-black tracking-tight">
          {t.title} <span className="align-middle">🦶</span>
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
