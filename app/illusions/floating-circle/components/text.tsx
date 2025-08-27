"use client";

import Image from "next/image";
import Link from "next/link";
import { useContext } from "react";
import { LanguageContext } from "@/app/context/LanguageContext";

export default function TextBlock() {
  const { language } = useContext(LanguageContext);
  const isSr = language === "sr";

  const t = {
    cat: isSr ? "Iluzije orijentacije" : "Orientation Illusions",
    title: isSr ? "Iluzija lebdećeg kruga" : "Floating Circle Illusion",
    intro: isSr
      ? "Krug, isečen iz istog šablona kao pozadina i samo rotiran, izgleda kao da lebdi iznad površine — iako je u istoj ravni."
      : "A circle cut from the same pattern as the background, merely rotated, appears to float above the surface — while actually lying flat.",
    needTitle: isSr ? "Šta ti je potrebno" : "What you need",
    needList: isSr
      ? [
          "Crno-beli šablon sa pravilnim šarama (linije / pravougaonici)",
          "Štampač ili papir + lenjir i crni flomaster",
          "Makaze",
          "Lepak (opciono) i karton (za čvrstu podlogu)",
        ]
      : [
          "Black–white pattern with regular stripes/rectangles",
          "Printer or paper + ruler + black marker",
          "Scissors",
          "Glue (optional) and cardboard (for a stiffer base)",
        ],
    makeTitle: isSr ? "Napravi iluziju" : "Build the illusion",
    makeSteps: isSr
      ? [
          "Odštampaj ili nacrtaj crno–beli šablon sa ravnim, jednako širokim linijama.",
          "Iseci krug iz drugog, identičnog šablona.",
          "Rotiraj krug za 90° (ili 45°) u odnosu na pozadinu.",
          "Položi ga na centar pozadine — efekat lebdenja će se pojaviti odmah.",
        ]
      : [
          "Print or draw a black–white pattern with straight, even stripes.",
          "Cut a circle from a second, identical pattern.",
          "Rotate the circle 90° (or 45°) relative to the background.",
          "Place it at the center — the floating effect appears immediately.",
        ],
    moreTitle: isSr ? "Eksperimentiši dalje" : "Try more",
    moreList: isSr
      ? [
          "Menjaj ugao rotacije (45°, 60°, 90°) i posmatraj promenu efekta.",
          "Pomeraj krug levo–desno i prati kako se osećaj „visine“ menja.",
          "Napravi više krugova različitih veličina i rasporedi ih po pozadini.",
          "Isprobaj i verzije u boji ili sa tanjim/debljim linijama.",
        ]
      : [
          "Vary the rotation angle (45°, 60°, 90°) and observe the change.",
          "Slide the circle sideways to modulate the depth impression.",
          "Use multiple circles of different sizes across the background.",
          "Try colored versions or thinner/thicker stripes.",
        ],
    whyTitle: isSr ? "Zašto se to dešava?" : "Why does it happen?",
    whyText: isSr
      ? "Različita orijentacija šara otežava „spajanje“ figure i pozadine. Vizuelni sistem ih tumači kao dva odvojena sloja — pozadinu i objekat iznad nje — pa krug doživljavaš kao da lebdi."
      : "The mismatched orientations prevent the visual system from fusing figure and background. It infers two layers—surface and object above—so the circle feels as if it’s floating.",
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
            src="/images/illusions/floating-circle.jpg"
            alt={isSr ? "Iluzija lebdećeg kruga" : "Floating Circle"}
            fill
            className="object-cover select-none"
            priority
          />
          <span className="pointer-events-none absolute inset-0 rounded-xl bg-[radial-gradient(circle_at_30%_25%,rgba(255,255,255,0.16),transparent_55%)]" />
        </div>

        <p className="text-xs uppercase tracking-wider text-white/70">{t.cat}</p>
        <h1 className="mt-1 text-2xl sm:text-3xl md:text-4xl font-black tracking-tight">
          {t.title} <span className="align-middle">🔘</span>
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
