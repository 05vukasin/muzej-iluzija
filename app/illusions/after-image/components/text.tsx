"use client";

import Image from "next/image";
import Link from "next/link";
import { useContext } from "react";
import { LanguageContext } from "@/app/context/LanguageContext";

export default function TextBlock() {
  const { language } = useContext(LanguageContext);
  const isSr = language === "sr";

  const t = {
    cat: isSr ? "Iluzije boje i svetla" : "Color & Light",
    title: isSr
      ? "Iluzija naknadne slike – Tvoj mozak u boji"
      : "Afterimage – Your Brain in Color",
    intro: isSr
      ? "Ova iluzija pokazuje kako vizuelni sistem reaguje na produženu stimulaciju i „dopisuje“ ono što ne vidi. Kada dugo gledaš neki oblik, njegova „fantomska“ verzija može se pojaviti na beloj pozadini."
      : "This illusion shows how your visual system adapts to prolonged stimulation and ‘fills in’ what isn’t there. After staring at a shape, a ‘ghost’ version can appear on a white background.",
    materialsTitle: isSr ? "Šta ti je potrebno" : "What you need",
    materials: isSr
      ? [
          "Papir A4 ili ekran telefona/tableta",
          "Crni flomaster ili crna slika (može i odštampan simbol)",
          "Bela podloga (beli ekran/papir/zid)",
          "Tajmer ili sat (opciono)",
        ]
      : [
          "A4 paper or a phone/tablet screen",
          "Black marker or black image (printed symbol works too)",
          "White background (white screen/paper/wall)",
          "Timer or clock (optional)",
        ],
    makeTitle: isSr ? "Napravi iluziju" : "Make the illusion",
    makeSteps: isSr
      ? [
          "Pripremi crni oblik na belom (npr. krst, srce, kvadrat, lice…).",
          "Sedi udobno i fiksiraj pogled u centar 20–30 sekundi (ne trepći previše).",
          "Brzo pogledaj belu površinu – pojaviće se „fantomska“ silueta koja potom bledi.",
        ]
      : [
          "Prepare a black shape on white (e.g., cross, heart, square, face…).",
          "Sit comfortably and fixate the center for 20–30 seconds (limit blinking).",
          "Quickly look at a white surface — a ‘ghost’ image should appear, then fade.",
        ],
    whyTitle: isSr ? "Zašto se to dešava?" : "Why does this happen?",
    whyText: isSr
      ? "Dugim gledanjem, receptori u mrežnjači privremeno oslabe (adaptacija). Kada pređeš na belu površinu, mozak 'popunjava' slabiji signal — zato vidiš naknadnu sliku."
      : "Prolonged staring temporarily fatigues retinal receptors (adaptation). Switching to white makes the brain ‘fill in’ the weakened signal — hence the afterimage.",
    tryMoreTitle: isSr ? "Eksperimentiši dalje" : "Try more",
    tryMore: isSr
      ? [
          "Probaj negativ (belo na crnom), pa zatim gledaj u tamnu površinu.",
          "Isprobaj obojene parove (crveno–zeleno, plavo–žuto) i posmatraj komplementarne boje.",
          "Meri koliko dugo naknadna slika traje i uporedi sa drugarima.",
        ]
      : [
          "Try a negative (white on black), then look at a dark surface.",
          "Use color pairs (red–green, blue–yellow) and observe complementary afterimages.",
          "Measure how long the afterimage lasts and compare with friends.",
        ],
    back: isSr ? "Nazad na iluzije" : "Back to Illusions",
    ask: isSr ? "Pitaj nas bilo šta" : "Ask us anything",
  };

  return (
    <div className="rounded-2xl bg-black/65 backdrop-blur-md text-white shadow-2xl ring-1 ring-white/10 p-6 sm:p-8 lg:p-10">
      {/* Header (slika u desnom ćošku, tekst se wrap-uje oko nje) */}
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
            src="/images/illusions/after-image.jpg"
            alt={
              isSr
                ? "Kada svetlo vara tvoje oči"
                : "When Light Tricks Your Eyes"
            }
            fill
            className="object-cover select-none"
            priority
          />
          <span className="pointer-events-none absolute inset-0 rounded-xl bg-[radial-gradient(circle_at_30%_25%,rgba(255,255,255,0.16),transparent_55%)]" />
        </div>

        <p className="text-xs uppercase tracking-wider text-white/70">
          {t.cat}
        </p>
        <h1 className="mt-1 text-2xl sm:text-3xl md:text-4xl font-black tracking-tight">
          {t.title} <span className="align-middle">💡</span>
        </h1>
        <p className="mt-3 text-white/90 leading-relaxed">{t.intro}</p>
      </div>

      {/* Sadržaj */}
      <div className="mt-8 grid lg:grid-cols-2 gap-8">
        {/* Materijali */}
        <div>
          <h2 className="text-xl font-semibold">{t.materialsTitle}</h2>
          <ul className="mt-3 space-y-2 text-white/90">
            {t.materials.map((m, i) => (
              <li key={i} className="flex gap-3">
                <span className="mt-2 inline-block h-1.5 w-1.5 rounded-full bg-brand-235" />
                <span>{m}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Koraci */}
        <div>
          <h2 className="text-xl font-semibold">{t.makeTitle}</h2>
          <ol className="mt-2 space-y-2 list-decimal list-inside text-white/90">
            {t.makeSteps.map((s, i) => (
              <li key={i}>{s}</li>
            ))}
          </ol>
        </div>
      </div>

      {/* Objašnjenje + dalje ideje */}
      <div className="mt-8 grid lg:grid-cols-[1.2fr,0.8fr] gap-8">
        <div>
          <h2 className="text-xl font-semibold">{t.whyTitle}</h2>
          <p className="mt-2 text-white/90 leading-relaxed">{t.whyText}</p>
        </div>
        <div>
          <h2 className="text-xl font-semibold">{t.tryMoreTitle}</h2>
          <ul className="mt-2 space-y-2 text-white/90">
            {t.tryMore.map((m, i) => (
              <li key={i} className="flex gap-3">
                <span className="mt-2 inline-block h-1.5 w-1.5 rounded-full bg-brand-235" />
                <span>{m}</span>
              </li>
            ))}
          </ul>
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
