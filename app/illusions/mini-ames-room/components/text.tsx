"use client";

import Image from "next/image";
import Link from "next/link";
import { useContext } from "react";
import { LanguageContext } from "@/app/context/LanguageContext";

export default function TextBlock() {
  const { language } = useContext(LanguageContext);
  const isSr = language === "sr";

  const t = {
    cat: isSr ? "Iluzije prostora" : "Spatial Illusions",
    title: isSr ? "Mini Ejmsova soba" : "Mini Ames Room",
    intro: isSr
      ? "Dve iste figure deluju drastično različito po veličini kada se posmatraju kroz unapred određeni ugao. Iskrivljena geometrija sobe stvara savršenu perspektivnu obmanu — mozak „veruje“ prostoriji više nego stvarnim dimenzijama."
      : "Two identical figures look dramatically different in size when viewed from a fixed vantage point. A warped room geometry creates a perfect perspective trick—your brain trusts the room over the objects’ true size.",
    needTitle: isSr ? "Šta ti je potrebno" : "What you need",
    needList: isSr
      ? [
          "Karton (za zidove, pod i plafon)",
          "Makaze ili skalpel",
          "Lenjir i olovka",
          "Lepak ili selotejp",
          "Boje/papir u boji/flomasteri (dekor)",
          "Dve male identične figure (LEGO, Kinder, sl.)",
          "Kamera ili telefon (fiksni ugao posmatranja)",
        ]
      : [
          "Cardboard (walls, floor, ceiling)",
          "Scissors or craft knife",
          "Ruler and pencil",
          "Glue or tape",
          "Paint/colored paper/markers (decor)",
          "Two identical small figures (LEGO, toy, etc.)",
          "Camera or phone (fixed viewing angle)",
        ],
    makeTitle: isSr ? "Napravi iluziju" : "Build the illusion",
    makeSteps: isSr
      ? [
          "Iseci pod kao asimetričan trapez umesto pravougaonika (vidi predložene mere).",
          "Iseci leve/desne zidove kao trapeze različitih visina (bliži ugao niži/viši).",
          "Iseci zadnji zid kao iskrivljen trapez i spoji sa bočnim zidovima.",
          "Dodaj plafon istog oblika kao pod (obrnut nagib), zatvori kutiju spreda otvorenu.",
          "Oboji i dodaj linije poda/prozore/lajsne tako da iz fiksnog ugla deluje „pravilno“.",
          "Postavi kameru tačno na sredinu prednjeg otvora (~15 cm visine) i fiksiraj položaj.",
          "Stavi dve identične figure u suprotne zadnje uglove i posmatraj kroz kameru.",
        ]
      : [
          "Cut the floor as an asymmetric trapezoid (see suggested dimensions).",
          "Cut the left/right walls as trapezoids with different heights (near corner low/high).",
          "Cut the back wall as a skewed trapezoid and join to the side walls.",
          "Add a ceiling mirroring the floor (reversed tilt), leaving the front open.",
          "Paint and add floor lines/windows/moldings so it looks ‘normal’ from one view.",
          "Place the camera centered at the front opening (~15 cm high) and fix it.",
          "Put two identical figures in opposite back corners and view through the camera.",
        ],
    dimsTitle: isSr ? "Predložene mere (u cm)" : "Suggested dimensions (cm)",
    dims: isSr
      ? [
          "Prednji otvor (širina): 30",
          "Dubina sobe levo/desno: 15 / 15",
          "Pod (asimetričan trapez): levi prednji rub 10, desni prednji rub 20; zadnji uglovi po 30 od prednjih ivica",
          "Levi zid (trapez): visina bližeg ugla 12, visina zadnjeg 18; dužina 15",
          "Desni zid (trapez): visina bližeg ugla 18, visina zadnjeg 12; dužina 15",
          "Zadnji zid (iskrivljen trapez): leva ivica 18, desna ivica 12; širina 30",
          "Plafon: isti oblik kao pod, ali sa obrnutim nagibom",
        ]
      : [
          "Front opening (width): 30",
          "Room depth left/right: 15 / 15",
          "Floor (asymmetric trapezoid): left front edge 10, right front edge 20; back corners 30 from front edges",
          "Left wall (trapezoid): near height 12, far height 18; length 15",
          "Right wall (trapezoid): near height 18, far height 12; length 15",
          "Back wall (skewed trapezoid): left edge 18, right edge 12; width 30",
          "Ceiling: same shape as floor, reversed tilt",
        ],
    moreTitle: isSr ? "Eksperimentiši dalje" : "Try more",
    moreList: isSr
      ? [
          "Zameni figure — efekat „promene veličine“ se prenosi.",
          "Dodaj nameštaj/slike i posmatraj kako „menjaju“ proporcije po uglovima.",
          "Napravi prozor za gledanje (mali okvir) za još jači efekat.",
          "Snimaj figuru dok prelazi iz jednog ugla u drugi — deluje kao da „raste/smanjuje se“. ",
        ]
      : [
          "Swap the figures—the apparent ‘size change’ transfers.",
          "Add furniture/pictures and see how proportions ‘shift’ across corners.",
          "Make a viewing window (small frame) to strengthen the effect.",
          "Record a figure walking corner to corner—it seems to ‘grow/shrink’.",
        ],
    whyTitle: isSr ? "Zašto se to dešava?" : "Why does it happen?",
    whyText: isSr
      ? "Ejmsova soba namerno krši pravila prave perspektive. Iz tačno jedne tačke deluje regularno, pa mozak pretpostavlja paralelne zidove i prav uglove. Zbog te pogrešne pretpostavke objekti dalje izgledaju manji, iako su zapravo identične veličine."
      : "An Ames room deliberately breaks true perspective. From one fixed viewpoint it appears normal, so the brain assumes parallel walls and right angles. That false assumption makes distant objects look smaller—even though they’re identical in size.",
    modelAlt: isSr ? "Model Mini Ejmsove sobe — dijagram" : "Mini Ames Room model — diagram",
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
            src="/images/illusions/mini-ames-room.jpg"
            alt={isSr ? "Mini Ejmsova soba" : "Mini Ames Room"}
            fill
            className="object-cover select-none"
            priority
          />
          <span className="pointer-events-none absolute inset-0 rounded-xl bg-[radial-gradient(circle_at_30%_25%,rgba(255,255,255,0.16),transparent_55%)]" />
        </div>

        <p className="text-xs uppercase tracking-wider text-white/70">{t.cat}</p>
        <h1 className="mt-1 text-2xl sm:text-3xl md:text-4xl font-black tracking-tight">
          {t.title} <span className="align-middle">🏠</span>
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

      {/* Predložene mere + dijagram/model — PUNA širina kartice */}
      <div className="mt-8 w-full">
        <div className="rounded-lg bg-white/5 p-4 ring-1 ring-white/10">
          <p className="font-semibold">{t.dimsTitle}</p>
          <div className="mt-3 grid gap-4 md:grid-cols-2">
            <ul className="space-y-1 text-white/90">
              {t.dims.map((d, i) => (
                <li key={i} className="flex gap-3">
                  <span className="mt-2 inline-block h-1.5 w-1.5 rounded-full bg-white/40" />
                  <span>{d}</span>
                </li>
              ))}
            </ul>

            {/* Dijagram modela */}
            <div className="relative w-full aspect-[4/3] rounded-md overflow-hidden ring-1 ring-white/10 bg-black/10">
              <Image
                src="/images/illusions/mini-ames-room-model.png"
                alt={t.modelAlt}
                fill
                sizes="100vw"
                className="object-contain"
                priority
              />
            </div>
          </div>
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
