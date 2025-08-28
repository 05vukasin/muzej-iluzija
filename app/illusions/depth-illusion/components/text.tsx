"use client";

import Link from "next/link";
import { useContext } from "react";
import { LanguageContext } from "@/app/context/LanguageContext";
import Image from "next/image";

export default function TextBlock() {
  const { language } = useContext(LanguageContext);
  const isSr = language === "sr";

  const t = {
    cat: isSr ? "Iluzije prostora" : "Spatial Illusions",
    title: isSr ? "Iluzija dubine" : "Depth Illusion",
    intro: isSr
      ? "Monokularni tragovi dubine (preklapanje, relativna veličina, horizont) omogućavaju viralne fotke tipa „drži toranj“, „hvata avion“ ili – ovde – „jede Sunce“. Sve zavisi od poravnanja iz jednog ugla!"
      : "Monocular depth cues (overlap, relative size, horizon) enable viral photos like ‘holding the tower’, ‘catching a plane’, or—here—‘eating the Sun’. It’s all about alignment from one viewpoint!",
    needTitle: isSr ? "Šta ti je potrebno" : "What you need",
    needList: isSr
      ? [
          "Beli papir A4",
          "Olovka i flomasteri",
          "Makaze",
          "Okrugli predmet (čep/novčić/dugme)",
          "Tanka slamčica ili uska kartonska traka",
          "Telefon ili kamera (za fotografisanje)",
        ]
      : [
          "A4 white paper",
          "Pencil and markers",
          "Scissors",
          "A round object (cap/coin/button)",
          "A thin straw or narrow cardboard strip",
          "Phone or camera (for a photo)",
        ],
    makeTitle: isSr ? "Napravi iluziju" : "Build the illusion",
    makeSteps: isSr
      ? [
          "Nacrtaj pozadinu sa nebom i Suncem (ili zalepi okrugli predmet kao „Sunce“).",
          "Iseci „usta“ u profilu ili ruku i zalepi pri dnu papira, okrenuto ka Suncu.",
          "Zalepi tanku slamčicu kao rekvizit od „usta/ruke“ ka Suncu.",
          "Gledaj/ fotografiši iz jednog ugla tako da se elementi poravnaju — izgleda kao da „hvataš/ jedeš“ Sunce.",
        ]
      : [
          "Draw a sky background with the Sun (or stick a round object as the ‘Sun’).",
          "Cut a side-view mouth or a hand and stick it near the bottom, facing the Sun.",
          "Attach a thin straw as a prop from the mouth/hand towards the Sun.",
          "View/photograph from a single angle so the elements align—it will look like you ‘grab/eat’ the Sun.",
        ],
    moreTitle: isSr ? "Eksperimentiši dalje" : "Try more",
    moreList: isSr
      ? [
          "Menjaj veličinu Sunca — šta se dešava kada je mnogo veće ili manje?",
          "Probaj druge objekte: avion, lopta, Mesec…",
          "Umesto papira, koristi pravu ruku ispred zida i eksperimentiši sa pozicijom kamere.",
          "Igraj se senkama: može li senka „držati“ predmet?",
        ]
      : [
          "Change the Sun’s size—what happens if it’s much bigger or smaller?",
          "Try other objects: a plane, a ball, the Moon…",
          "Use a real hand in front of a wall and experiment with camera position.",
          "Play with shadows: can a shadow ‘hold’ an object?",
        ],
    whyTitle: isSr ? "Zašto se to dešava?" : "Why does it happen?",
    whyText: isSr
      ? "Mozak procenjuje dubinu preko monokularnih tragova (preklapanje, relativna veličina, horizont/perspektiva). Kada dve ravne slike poravnaš iz tačno jednog ugla, vizuelni sistem ih „spaja“ u istu 3D scenu — zato izgleda kao da dodiruješ ili „jedeš“ daleki objekat."
      : "The brain infers depth from monocular cues (overlap, relative size, horizon/perspective). When two flat elements are aligned from a specific viewpoint, the visual system fuses them into one 3D scene—so it looks like you touch or ‘eat’ a distant object.",
    back: isSr ? "Nazad na iluzije" : "Back to Illusions",
    ask: isSr ? "Pitaj nas bilo šta" : "Ask us anything",
  };

  return (
    <div className="rounded-2xl bg-black/65 backdrop-blur-md text-white shadow-2xl ring-1 ring-white/10 p-6 sm:p-8 lg:p-10">
      {/* Header (thumbnail gore desno, tekst se obavija) */}
      <div className="relative after:content-[''] after:block after:clear-both">
        <div
          className="
            relative float-right shrink-0 ml-4 mb-2
            w-24 h-24 sm:w-40 sm:h-40 md:w-48 md:h-48
            rounded-xl overflow-hidden ring-1 ring-white/15 shadow-xl
          "
        >
          <Image
            src="/images/illusions/depth-illusion.jpg"
            alt={isSr ? "Iluzija dubine — „jede Sunce“" : "Depth illusion — ‘eating the Sun’"}
            fill
            className="object-cover select-none"
            priority
          />
          <span className="pointer-events-none absolute inset-0 rounded-xl bg-[radial-gradient(circle_at_30%_25%,rgba(255,255,255,0.16),transparent_55%)]" />
        </div>

        <p className="text-xs uppercase tracking-wider text-white/70">{t.cat}</p>
        <h1 className="mt-1 text-2xl sm:text-3xl md:text-4xl font-black tracking-tight">
          {t.title} <span className="align-middle">🌅</span>
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
