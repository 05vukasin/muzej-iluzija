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
    title: isSr ? "Varljivo prstenje" : "Deceptive Rings",
    intro: isSr
      ? "Fizički spojeni prstenovi, kada ih lagano zavrtiš ili okačiš na nit, deluju kao da se rotiraju nezavisno i lebde u prostoru. Iluzija zavisi od orijentacije, fiksacije i tragova na površini."
      : "Rings that are physically fixed can look like they freely counter-rotate and float when spun or hung on a thread. The illusion relies on orientation, fixation, and surface cues.",
    needTitle: isSr ? "Šta ti je potrebno" : "What you need",
    needList: isSr
      ? [
          "3+ plastičnih narukvica/obruča (slične veličine)",
          "Topli lepak ili čvrst lepak",
          "Igla + konac ili tanka nit (za kačenje, opciono)",
          "Marker (tragovi/tačkice, opciono)",
          "Lampa za senke (opciono)",
        ]
      : [
          "3+ plastic bangles/rings (similar size)",
          "Hot glue or strong adhesive",
          "Needle & thread or thin string (optional, to hang)",
          "Marker (dots/lines, optional)",
          "Lamp for shadow effects (optional)",
        ],
    makeTitle: isSr ? "Napravi iluziju" : "Make the illusion",
    makeSteps: isSr
      ? [
          "Uzalepi dva prstena pod oštrim uglom (≈60–90°) tako da se dodiruju u jednoj tački.",
          "Fiksiraj spojeve da konstrukcija bude stabilna.",
          "Drži za tačku spoja i lagano je rotiraj ili okači na nit i pusti da se okreće.",
          "Dodaj tragove markerom (linije/tačke) da naglasiš osećaj nezavisne rotacije.",
        ]
      : [
          "Glue two rings at a sharp angle (~60–90°), touching at one point.",
          "Reinforce the joint so the structure is rigid.",
          "Hold at the joint and spin gently, or hang it from a thread.",
          "Add marker cues (lines/dots) to enhance the sense of independent rotation.",
        ],
    moreTitle: isSr ? "Eksperimentiši dalje" : "Try more",
    moreList: isSr
      ? [
          "Poveži 3+ prstenova u lanac pod različitim uglovima.",
          "Menjaj ugao posmatranja: odozgo, sa strane, u pokretu.",
          "Okači ispod lampe i posmatraj senke – pojačavaju 3D osećaj.",
          "Snimaj iz raznih uglova – iluzija često deluje jače na videu.",
        ]
      : [
          "Link 3+ rings into a chain at different angles.",
          "Change viewpoint: top, side, walking around it.",
          "Hang it under a lamp—shadows strengthen the 3D feel.",
          "Record from different angles—video can look even more convincing.",
        ],
    whyTitle: isSr ? "Zašto se to dešava?" : "Why does it happen?",
    whyText: isSr
      ? "Vizuelni sistem pokušava da protumači složeno 3D kretanje. Tačka fiksacije na spoju je skrivena, pa mozak pretpostavlja da se svaki prsten rotira oko sopstvenog centra. Zato deluje kao da prstenovi lebde i okreću se nezavisno, iako se konstrukcija u stvari kreće kao jedno telo."
      : "Your visual system misinterprets the 3D motion. The fixed joint is hard to detect, so the brain assumes each ring spins about its own center. This yields an impression of floating, independent rotation, even though the whole structure moves as a single rigid body.",
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
            src="/images/illusions/deceiving-rings.jpg"
            alt={isSr ? "Varljivo prstenje" : "Deceptive Rings"}
            fill
            className="object-cover select-none"
            priority
          />
          <span className="pointer-events-none absolute inset-0 rounded-xl bg-[radial-gradient(circle_at_30%_25%,rgba(255,255,255,0.16),transparent_55%)]" />
        </div>

        <p className="text-xs uppercase tracking-wider text-white/70">{t.cat}</p>
        <h1 className="mt-1 text-2xl sm:text-3xl md:text-4xl font-black tracking-tight">
          {t.title} <span className="align-middle">🔗</span>
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
