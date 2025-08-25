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
    title: isSr ? "Oči koje te prate" : "Eyes That Follow You",
    intro: isSr
      ? "Iako oči uopšte nisu pokretne, imaćeš snažan utisak da te prate dok se krećeš levo, desno ili gore–dole. Iluzija koristi trik sa konkavnošću (obrnutom 3D dubinom) da prevari mozak."
      : "Even though the eyes don’t move, you’ll feel like they follow you as you move around. The illusion exploits concavity (reversed depth) to fool the brain.",
    needTitle: isSr ? "Šta ti je potrebno" : "What you need",
    need: isSr
      ? [
          "Odštampan lik sa izraženim očima (fotografija/ilustracija)",
          "Providna plastična flaša (1.5–2L), glatka",
          "Makaze ili skalpel",
          "Lepljiva traka ili lepak",
          "Papir za postavljanje",
        ]
      : [
          "A printed face with clear eyes (photo/illustration)",
          "A smooth plastic bottle (1.5–2L)",
          "Scissors or a craft knife",
          "Tape or glue",
          "Paper backing",
        ],
    makeTitle: isSr ? "Napravi iluziju" : "Build the illusion",
    makeSteps: isSr
      ? [
          "Izdvoji oči: iseci pravougaonik sa očima sa odštampanog lica.",
          "Pripremi konkavni komad plastike (unutrašnja strana flaše 'gleda' ka tebi).",
          "Zalepi papir sa očima s unutrašnje strane plastike, da prati udubljenje.",
          "Postavi na sto ili zid i fiksiraj trakom/lepkom.",
        ]
      : [
          "Cut out a rectangle containing the eyes from a printed face.",
          "Prepare a concave plastic piece (the bottle’s inside facing you).",
          "Tape the eyes to the inside so they follow the curvature.",
          "Place it upright on a table or wall and fix with tape/glue.",
        ],
    tryTitle: isSr ? "Eksperimentiši dalje" : "Try more",
    try: isSr
      ? [
          "Pomeri se levo–desno i gore–dole — da li te oči prate?",
          "Probaj fotografiju vs. crtež — da li je efekat jači kod jednog?",
          "Uključi druge: da li svi doživljavaju isti intenzitet iluzije?",
        ]
      : [
          "Move left–right and up–down — do the eyes follow you?",
          "Compare drawing vs. photo — which is stronger?",
          "Ask others: do they experience the illusion equally?",
        ],
    whyTitle: isSr ? "Zašto se to dešava?" : "Why does this happen?",
    whyText: isSr
      ? "Mozak očekuje ispupčena lica (to je ono što najčešće viđa), pa kod konkavne geometrije ‘prepravlja’ dubinu kao da je ispupčena. Uz fiksni pogled očiju, dobijaš utisak praćenja dok se ti krećeš — reverzija dubine."
      : "Your brain expects convex faces; with concave geometry it ‘flips’ depth to convex. With fixed gazing eyes, this produces a following effect as you move — a depth reversal.",
    back: isSr ? "Nazad na iluzije" : "Back to Illusions",
  };

  return (
    <div className="rounded-2xl bg-black/65 backdrop-blur-md text-white shadow-2xl ring-1 ring-white/10 p-6 sm:p-8 lg:p-10">
      {/* Header (slika u desnom ćošku, tekst wrap oko nje) */}
      <div className="relative after:content-[''] after:block after:clear-both">
        <div
          className="
            relative float-right shrink-0 ml-4 mb-2
            w-24 h-24 sm:w-40 sm:h-28 md:w-48 md:h-32
            rounded-xl overflow-hidden ring-1 ring-white/15 shadow-xl
          "
        >
          <Image
            src="/images/illusions/eyes-that-follow.jpg"
            alt={isSr ? "Oči koje te prate" : "Eyes that follow"}
            fill
            className="object-cover select-none"
            priority
          />
          <span className="pointer-events-none absolute inset-0 rounded-xl bg-[radial-gradient(circle_at_30%_25%,rgba(255,255,255,0.16),transparent_55%)]" />
        </div>

        <p className="text-xs uppercase tracking-wider text-white/70">{t.cat}</p>
        <h1 className="mt-1 text-2xl sm:text-3xl md:text-4xl font-black tracking-tight">
          {t.title} <span className="align-middle">👁️</span>
        </h1>
        <p className="mt-3 text-white/90 leading-relaxed">{t.intro}</p>
      </div>

      {/* Sadržaj */}
      <div className="mt-8 grid lg:grid-cols-2 gap-8">
        <div>
          <h2 className="text-xl font-semibold">{t.needTitle}</h2>
          <ul className="mt-3 space-y-2 text-white/90">
            {t.need.map((m, i) => (
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
          <h2 className="text-xl font-semibold">{t.whyTitle}</h2>
          <p className="mt-2 text-white/90 leading-relaxed">{t.whyText}</p>

          <h2 className="mt-6 text-xl font-semibold">{t.tryTitle}</h2>
          <ul className="mt-2 space-y-2 text-white/90">
            {t.try.map((m, i) => (
              <li key={i} className="flex gap-3">
                <span className="mt-2 inline-block h-1.5 w-1.5 rounded-full bg-brand-235" />
                <span>{m}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="mt-8">
        <Link
          href="/illusions"
          className="rounded-full bg-brand-235 text-white px-5 py-2.5 font-semibold hover:brightness-110 transition"
        >
          {t.back}
        </Link>
      </div>
    </div>
  );
}
