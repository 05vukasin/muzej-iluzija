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
    title: isSr ? "Konformizam (Ešov eksperiment)" : "Conformity (Asch Experiment)",
    intro: isSr
      ? "Ova iluzija nije optička već psihološka: procenu dužine linije može promeniti mišljenje drugih. Iako vidiš tačan odgovor, često ćeš se prikloniti grupi—čak i kad greši! Eksperiment pokazuje moć socijalnog pritiska nad percepcijom."
      : "This is a psychological, not optical illusion: judgments of line length shift under group influence. Even when you see the right answer, you may align with the group—even if it’s wrong! The experiment reveals the power of social pressure on perception.",
    needTitle: isSr ? "Šta ti je potrebno" : "What you need",
    needList: isSr
      ? [
          "Papir i olovka",
          "Lenjir",
          "Grupa učesnika (idealno 5+)",
          "Jedna osoba koja ne zna za eksperiment („testirana“)",
          "Linije A, B, C i jedna referentna linija",
        ]
      : [
          "Paper and pencil",
          "Ruler",
          "A group of participants (ideally 5+)",
          "One naive participant (not briefed)",
          "Lines A, B, C and a reference line",
        ],
    makeTitle: isSr ? "Napravi iluziju" : "Build the illusion",
    makeSteps: isSr
      ? [
          "Pripremi list sa jednom referentnom linijom i tri linije A, B, C (jedna mora biti iste dužine kao referentna).",
          "Okupi grupu; svi osim jedne osobe unapred se dogovore da daju pogrešan odgovor.",
          "Pitaj redom: koja linija (A, B ili C) je jednaka referentnoj? Testirana osoba odgovara poslednja.",
          "Posmatraj: da li će se prikloniti grupi iako je odgovor očigledno pogrešan?",
        ]
      : [
          "Prepare a sheet with one reference line and three lines A, B, C (one matches the reference).",
          "Assemble a group; all but one participant agree to give a wrong answer.",
          "Ask in turn: which line (A, B, or C) matches the reference? The naive participant answers last.",
          "Observe: will they side with the group even if the answer is clearly wrong?",
        ],
    moreTitle: isSr ? "Eksperimentiši dalje" : "Try more",
    moreList: isSr
      ? [
          "Menjaj broj onih koji daju pogrešan odgovor — da li veća većina pojačava konformizam?",
          "Testiraj različite osobe; da li su neke otpornije?",
          "Beleži rezultate i razloge: ko ostaje pri sopstvenom opažanju i zašto?",
        ]
      : [
          "Vary how many give the wrong answer—does a larger majority increase conformity?",
          "Test different people; are some more resistant?",
          "Log results and reasons: who sticks to their perception, and why?",
        ],
    whyTitle: isSr ? "Zašto se to dešava?" : "Why does it happen?",
    whyText: isSr
      ? "Ešov eksperiment pokazuje da percepcija nije samo vizuelna, već i socijalna. Ljudi često menjaju odgovor da bi se uklopili, iako veruju da grupa greši. Mozak visoko vrednuje socijalnu usklađenost pa i procena jednostavnih vizuelnih informacija biva podložna pritisku grupe."
      : "Asch’s experiment shows perception is social as well as visual. People often change their answers to fit in, even when they think the group is wrong. The brain highly values social alignment, so even simple visual judgments can bend to group pressure.",
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
            src="/images/illusions/conformity.jpg"
            alt={isSr ? "Konformizam (Ešov eksperiment)" : "Conformity (Asch experiment)"}
            fill
            className="object-cover select-none"
            priority
          />
          <span className="pointer-events-none absolute inset-0 rounded-xl bg-[radial-gradient(circle_at_30%_25%,rgba(255,255,255,0.16),transparent_55%)]" />
        </div>

        <p className="text-xs uppercase tracking-wider text-white/70">{t.cat}</p>
        <h1 className="mt-1 text-2xl sm:text-3xl md:text-4xl font-black tracking-tight">
          {t.title} <span className="align-middle">📊</span>
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
