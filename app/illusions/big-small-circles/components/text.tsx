"use client";

import Image from "next/image";
import Link from "next/link";
import { useContext } from "react";
import { LanguageContext } from "@/app/context/LanguageContext";

export default function TextBlock() {
  const { language } = useContext(LanguageContext);
  const isSr = language === "sr";

  const t = {
    cat: isSr ? "Iluzije veličine" : "Size Illusions",
    title: isSr ? "Iluzija velikih/malih krugova" : "Ebbinghaus (Big/Small Circles) Illusion",
    intro: isSr
      ? "Dva kruga iste veličine mogu izgledati potpuno različito, u zavisnosti od toga koliko su veliki i blizu krugovi koji ih okružuju. Kontekst menja doživljaj veličine."
      : "Two equal circles can look very different depending on how big and how close their surrounding circles are. Context reshapes perceived size.",
    needTitle: isSr ? "Šta ti je potrebno" : "What you need",
    needList: isSr
      ? ["Papir", "Olovka ili flomaster", "Čašica (za krugove)", "Makaze (opciono)"]
      : ["Paper", "Pencil or marker", "Cup (to trace circles)", "Scissors (optional)"],
    makeTitle: isSr ? "Napravi iluziju" : "Build the illusion",
    makeSteps: isSr
      ? [
          "Nacrtaj dva identična centralna kruga (npr. prečnika 2 cm), udaljena oko 8 cm.",
          "Oko levog kruga nacrtaj 6 većih krugova (npr. prečnika 3 cm), ravnomerno raspoređenih oko njega.",
          "Oko desnog kruga nacrtaj 6 manjih krugova (npr. prečnika 0.8 cm), takođe oko njega.",
          "Uporedi centralne krugove: izgledaju različito, ali su isti!",
        ]
      : [
          "Draw two identical central circles (e.g., 2 cm diameter), ~8 cm apart.",
          "Around the left one, draw 6 larger circles (e.g., 3 cm) evenly spaced.",
          "Around the right one, draw 6 smaller circles (e.g., 0.8 cm) evenly spaced.",
          "Compare the centers: they look different—but they’re identical!",
        ],
    moreTitle: isSr ? "Eksperimentiši dalje" : "Try more",
    moreList: isSr
      ? [
          "Pomeraj okolne krugove bliže/dalje – menja li se efekat?",
          "Menjaj broj krugova u okruženju.",
          "Oboji elemente i posmatraj uticaj kontrasta.",
          "Iseci centralne krugove i preklopi ih – proveri da su isti.",
        ]
      : [
          "Move the surrounders closer/farther—does it change the effect?",
          "Vary the number of surrounding circles.",
          "Color the shapes to test contrast effects.",
          "Cut the central circles and overlay them to verify identity.",
        ],
    whyTitle: isSr ? "Zašto se to dešava?" : "Why does it happen?",
    whyText: isSr
      ? "Mozak procenjuje veličinu relativno, a ne apsolutno. Krug okružen manjim deluje veće, jer je u poređenju dominantan; okružen većim deluje manje. To je klasičan dokaz kontekstualne percepcije veličine."
      : "The brain judges size relatively, not absolutely. A circle near smaller items appears larger (it dominates); near larger items it appears smaller. This is a classic demonstration of context-driven size perception.",
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
            src="/images/illusions/big-small-circles.jpg"
            alt={isSr ? "Iluzija velikih/malih krugova" : "Ebbinghaus illusion"}
            fill
            className="object-cover select-none"
            priority
          />
          <span className="pointer-events-none absolute inset-0 rounded-xl bg-[radial-gradient(circle_at_30%_25%,rgba(255,255,255,0.16),transparent_55%)]" />
        </div>

        <p className="text-xs uppercase tracking-wider text-white/70">{t.cat}</p>
        <h1 className="mt-1 text-2xl sm:text-3xl md:text-4xl font-black tracking-tight">
          {t.title} <span className="align-middle">🔵</span>
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
