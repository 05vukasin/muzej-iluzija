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
    title: isSr ? "Stroopov efekat" : "Stroop Effect",
    intro: isSr
      ? "Stroopov efekat pokazuje kako se mozak zbunjuje kada se značenje reči i boja kojom je napisana ne slažu. Brže je pročitati reč nego imenovati boju njenog mastila — zato se reakcija usporava i greške rastu!"
      : "The Stroop effect shows how the brain gets confused when the word’s meaning and its ink color conflict. Reading is automatic; naming the ink color is slower and error-prone when they don’t match.",
    needTitle: isSr ? "Šta ti je potrebno" : "What you need",
    needList: isSr
      ? ["Papir", "Olovke/flomasteri u različitim bojama", "Sat ili štoperica"]
      : ["Paper", "Pens/markers in different colors", "Watch or stopwatch"],
    makeTitle: isSr ? "Napravi iluziju" : "Build the illusion",
    makeSteps: isSr
      ? [
          "Napiši imena boja: „CRVENA“, „ZELENA“, „PLAVA“, „ŽUTA“.",
          "Svaku reč oboji mastilom BOJE KOJA NE ODGOVARA reči (npr. „CRVENA“ napiši plavim).",
          "Napravi listu od 20–30 pomešanih primjera.",
          "Pokušaj što brže da imenuješ BOJU mastila, ne da pročitaš reč.",
        ]
      : [
          "Write color names: “RED”, “GREEN”, “BLUE”, “YELLOW”.",
          "Color each word with an ink that does NOT match its meaning (e.g., write “RED” in blue).",
          "Create a list of 20–30 mixed items.",
          "Name the INK color as fast as possible, don’t read the word.",
        ],
    moreTitle: isSr ? "Eksperimentiši dalje" : "Try more",
    moreList: isSr
      ? [
          "Organizuj takmičenje sa prijateljima — ko brže i tačnije?",
          "Meri vreme i broj grešaka; beleži napredak.",
          "Napravi dve liste: usklađene i neusklađene — uporedi rezultate.",
        ]
      : [
          "Race friends — who is fastest and most accurate?",
          "Track time and errors; log your progress.",
          "Create two lists: congruent vs. incongruent — compare results.",
        ],
    whyTitle: isSr ? "Zašto se to dešava?" : "Why does it happen?",
    whyText: isSr
      ? "Čitanje i prepoznavanje boje aktiviraju različite procese. Čitanje je automatizovano i „nadvlači“ pažnju; kada se značenje i boja ne slažu, mozgu treba dodatno vreme da potisne značenje reči i fokusira se na boju."
      : "Reading and color naming recruit different processes. Reading is automatic and competes for attention; when word and color conflict, the brain needs extra time to inhibit word meaning and focus on ink color.",
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
            src="/images/illusions/stroop-effect.jpg"
            alt={isSr ? "Stroopov efekat" : "Stroop effect"}
            fill
            className="object-cover select-none"
            priority
          />
          <span className="pointer-events-none absolute inset-0 rounded-xl bg-[radial-gradient(circle_at_30%_25%,rgba(255,255,255,0.16),transparent_55%)]" />
        </div>

        <p className="text-xs uppercase tracking-wider text-white/70">{t.cat}</p>
        <h1 className="mt-1 text-2xl sm:text-3xl md:text-4xl font-black tracking-tight">
          {t.title} <span className="align-middle">💯</span>
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
