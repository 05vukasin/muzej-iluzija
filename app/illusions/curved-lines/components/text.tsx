"use client";

import Image from "next/image";
import Link from "next/link";
import { useContext } from "react";
import { LanguageContext } from "@/app/context/LanguageContext";

export default function TextBlock() {
  const { language } = useContext(LanguageContext);
  const isSr = language === "sr";

  const t = {
    cat: isSr ? "Iluzije oblika" : "Shape Illusions",
    title: isSr ? "Zakrivljene (ne)jednake linije" : "Curved (Un)equal Lines",
    intro: isSr
      ? "Otkrićeš kako kontekst i relativna pozicija menjaju percepciju dužine. Iako su dva zakrivljena oblika identična, jedan izgleda duži — tu mozak pada na test!"
      : "See how context and relative placement change perceived length. Although the two curved shapes are identical, one looks longer — that’s your brain being fooled!",
    needTitle: isSr ? "Šta ti je potrebno" : "What you need",
    needList: isSr
      ? ["Deblji papir ili karton", "Makaze", "Lenjir i olovka", "Crni flomaster"]
      : ["Thick paper or cardstock", "Scissors", "Ruler and pencil", "Black marker"],
    makeTitle: isSr ? "Napravi iluziju" : "Build the illusion",
    makeSteps: isSr
      ? [
          "Nacrtaj oblik polumeseca / zakrivljene trake: spoljni poluprečnik 7 cm, unutrašnji 5 cm, debljina 2 cm, isečeno otprilike trećinu do pola kruga.",
          "Iseci dva identična zakrivljena oblika.",
          "Postavi oblike jedan ispod drugog; donji blago pomeri udesno u odnosu na gornji. Oiviči konture crnim flomasterom.",
          "Posmatraj — donji će izgledati duže iako su potpuno isti!",
        ]
      : [
          "Draw a crescent/curved strip: outer radius 7 cm, inner radius 5 cm, thickness 2 cm, cut about one-third to half of a circle.",
          "Cut out two identical curved pieces.",
          "Place them one below the other; shift the lower one slightly to the right. Outline both with a black marker.",
          "Observe — the lower one appears longer even though they’re identical!",
        ],
    moreTitle: isSr ? "Eksperimentiši dalje" : "Try more",
    moreList: isSr
      ? [
          "Iseci treći oblik i koristi ga za direktno poređenje sa gornjim i donjim.",
          "Zameni redosled — da li sada gornji izgleda duži?",
          "Menjaj zakrivljenost (poluprečnike). Kada iluzija slabi ili nestaje?",
        ]
      : [
          "Cut a third piece and compare it directly with the upper and lower ones.",
          "Swap the order — does the top one now look longer?",
          "Vary curvature (radii). When does the illusion weaken or disappear?",
        ],
    whyTitle: isSr ? "Zašto se to dešava?" : "Why does it happen?",
    whyText: isSr
      ? "Mozak procenjuje dužinu po položaju krajeva i kontekstu, a ne samo po realnoj dužini luka. Mali pomak između identičnih zakrivljenih oblika menja „čitanje“ početka i kraja, pa jedan deluje duži iako nisu različiti."
      : "The brain judges length from endpoints and context rather than arc length alone. A slight offset between identical curved shapes changes how start and end points are read, so one appears longer despite being the same.",
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
            src="/images/illusions/curved-lines.jpg"
            alt={isSr ? "Zakrivljene (ne)jednake linije" : "Curved (Un)equal Lines"}
            fill
            className="object-cover select-none"
            priority
          />
          <span className="pointer-events-none absolute inset-0 rounded-xl bg-[radial-gradient(circle_at_30%_25%,rgba(255,255,255,0.16),transparent_55%)]" />
        </div>

        <p className="text-xs uppercase tracking-wider text-white/70">{t.cat}</p>
        <h1 className="mt-1 text-2xl sm:text-3xl md:text-4xl font-black tracking-tight">
          {t.title} <span className="align-middle">⌇</span>
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
