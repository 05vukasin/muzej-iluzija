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
    title: isSr ? "Igra mešanja boja" : "Color Mixing Game",
    intro: isSr
      ? "U ovom eksperimentu porediš hemijsko i fizičko (optičko) mešanje boja. Kada boje pomešaš kao tempere — dobiješ novu boju na papiru. Kada se boje samo brzo smenjuju, oko i mozak ih „spajaju“ u drugačiju nijansu, bez stvarnog mešanja."
      : "Compare chemical versus physical (optical) color mixing. Paint mixing creates a new pigment, while fast alternation makes your eyes and brain ‘fuse’ colors into a different shade without actual mixing.",
    materialsTitle: isSr ? "Materijal" : "Materials",
    materials: isSr
      ? [
          "Bela podloga (karton ili čvršći papir)",
          "Tempere (npr. žuta i plava) ili kolaž papir",
          "Makaze, lepak",
          "Šestar ili okrugli predmet za crtanje kruga",
          "Slamčica / čačkalica / štapić ili olovka (osovina)",
          "Lenjir i olovka",
          "Selotejp",
        ]
      : [
          "White backing (cardstock or thick paper)",
          "Tempera paints (e.g., yellow & blue) or colored paper",
          "Scissors, glue",
          "Compass or circular object to trace",
          "Straw / toothpick / stick or pencil (axle)",
          "Ruler and pencil",
          "Tape",
        ],
    makeDiscs: isSr ? "Napravi dva točka (kruga)" : "Make two discs",
    makeDiscsSteps: isSr
      ? ["Nacrtaj dva kruga prečnika 10–15 cm.", "Pažljivo ih iseci."]
      : ["Draw two circles 10–15 cm in diameter.", "Cut them out carefully."],
    exp1: isSr
      ? "Eksperiment 1: Hemijsko mešanje boja"
      : "Experiment 1: Chemical mixing",
    exp1Steps: isSr
      ? [
          "Prvi krug podeli na dve polovine.",
          "Jednu polovinu oboji žutom, drugu plavom.",
          "Na sredini ih pomešaj četkicom.",
          "Posmatraj: najčešće dobijaš zelenu — nova boja nastala spajanjem pigmenata.",
        ]
      : [
          "Divide the first disc into halves.",
          "Paint one half yellow, the other blue.",
          "Blend at the boundary.",
          "Observe: usually green — a new pigment created by physical mixing.",
        ],
    exp2: isSr
      ? "Eksperiment 2: Fizičko (optičko) mešanje"
      : "Experiment 2: Physical (optical) mixing",
    exp2Steps: isSr
      ? [
          "Drugi krug podeli na 8–12 segmenata.",
          "Oboji segmente naizmenično žutom i plavom (ili nalepi papire).",
          "Probodi centar i dodaj osovinu.",
          "Zavrti brzo — često se javlja sivkasta nijansa umesto „čiste“ zelene.",
        ]
      : [
          "Divide the second disc into 8–12 slices.",
          "Alternate yellow/blue slices (or use paper).",
          "Pierce the center and add an axle.",
          "Spin fast — you’ll often see a grayish tone instead of “pure” green.",
        ],
    whyTitle: isSr ? "Zašto se to dešava?" : "Why does this happen?",
    whyText: isSr
      ? "Hemijski: pigmenti se fizički spoje pa svetlost potiče iz nove boje. Fizički: vizuelni sistem „prosečno“ spaja brze smene boja kroz vreme — zato nastaje drugačiji utisak."
      : "Chemical: pigments physically combine so reflected light comes from a new color. Physical: the visual system temporally averages rapidly alternating colors — producing a different percept.",
    tryMoreTitle: isSr ? "Eksperimentiši dalje" : "Try more",
    tryMore: isSr
      ? [
          "Crvena + zelena, plava + narandžasta, crna + bela.",
          "Menjaj broj segmenata i brzinu — više segmenata i brže okretanje pojačavaju efekat.",
          "Uporedi temperu naspram kolaž papira (pigment vs. optičko spajanje).",
        ]
      : [
          "Red + green, blue + orange, black + white.",
          "Change slices & speed — more slices and faster spin amplify the effect.",
          "Compare paint vs. paper (pigment vs. optical fusion).",
        ],
    back: isSr ? "← Nazad na iluzije" : "← Back to Illusions",
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
      src="/images/illusions/color-mixing.jpg"
      alt={isSr ? "Kada svetlo vara tvoje oči" : "When Light Tricks Your Eyes"}
      fill
      className="object-cover select-none"
      priority
    />
    <span className="pointer-events-none absolute inset-0 rounded-xl bg-[radial-gradient(circle_at_30%_25%,rgba(255,255,255,0.16),transparent_55%)]" />
  </div>

  <p className="text-xs uppercase tracking-wider text-white/70">{t.cat}</p>
  <h1 className="mt-1 text-2xl sm:text-3xl md:text-4xl font-black tracking-tight">
    {t.title} <span className="align-middle">🎨</span>
  </h1>
  <p className="mt-3 text-white/90 leading-relaxed">{t.intro}</p>
</div>

      {/* Sadržaj */}
      <div className="mt-8 grid lg:grid-cols-2 gap-8">
        {/* Materijali + izrada diskova */}
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

          <h3 className="mt-6 font-semibold">{t.makeDiscs}</h3>
          <ol className="mt-2 space-y-2 list-decimal list-inside text-white/90">
            {t.makeDiscsSteps.map((s, i) => (
              <li key={i}>{s}</li>
            ))}
          </ol>
        </div>

        {/* Dva eksperimenta */}
        <div>
          <h2 className="text-xl font-semibold">{t.exp1}</h2>
          <ol className="mt-2 space-y-2 list-decimal list-inside text-white/90">
            {t.exp1Steps.map((s, i) => (
              <li key={i}>{s}</li>
            ))}
          </ol>

          <h2 className="mt-6 text-xl font-semibold">{t.exp2}</h2>
          <ol className="mt-2 space-y-2 list-decimal list-inside text-white/90">
            {t.exp2Steps.map((s, i) => (
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
          {isSr ? "Nazad na iluzije" : "Back to Illusions"}
        </Link>
        <Link
          href="/contact"
          className="rounded-full border border-white/20 text-white px-5 py-2.5 hover:bg-white/10 transition"
        >
          {isSr ? "Pitaj nas bilo šta" : "Ask us anything"}
        </Link>
      </div>
    </div>
  );
}
