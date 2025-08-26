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
    title: isSr ? "Spiralni pokreti" : "Spiral Motion",
    intro: isSr
      ? "Nakon nekoliko sekundi gledanja u rotirajuću spiralu, statične slike deluju kao da se šire ili skupljaju — tipičan naknadni efekat pokreta (motion aftereffect)."
      : "After staring at a rotating spiral, static images appear to expand or contract — a classic motion aftereffect.",
    needTitle: isSr ? "Šta ti je potrebno" : "What you need",
    need: isSr
      ? [
          "Papir (A4 ili veći)",
          "Crni flomaster ili debela hemijska",
          "Makaze",
          "Lepljiva traka ili lepak",
          "Karton (za učvršćivanje)",
          "Čioda / drveni štapić / olovka za okretanje",
          "Slika lica ili jednostavna statična slika",
        ]
      : [
          "Paper (A4 or larger)",
          "Black marker / thick pen",
          "Scissors",
          "Tape or glue",
          "Cardboard backing",
          "Pin / stick / pencil to spin",
          "A face photo or any simple static image",
        ],
    buildTitle: isSr ? "Napravi iluziju" : "Build the illusion",
    build: isSr
      ? [
          "Nacrtaj spiralni oblik (ili odštampaj gotovu šaru).",
          "Zalepi spiralu na karton da bude čvrsta.",
          "Probodi centar i obezbedi da se lako okreće.",
          "Gledaj 20–30 sekundi u centar dok ravnomerno rotira.",
          "Odmah potom pogledaj statičnu sliku — delovaće kao da se uvija.",
        ]
      : [
          "Draw a spiral (or print a ready pattern).",
          "Mount it on cardboard for rigidity.",
          "Pierce the center so it spins freely.",
          "Fixate the center for 20–30 seconds during rotation.",
          "Then switch to a static picture—it will seem to warp.",
        ],
    tryTitle: isSr ? "Eksperimentiši dalje" : "Try more",
    try: isSr
      ? [
          "Okreći u suprotnom smeru i uporedi efekat.",
          "Produži vreme posmatranja — hoće li duže trajati?",
          "Menjaj brzinu rotacije.",
          "Proveri utisak na sopstvenim crtežima ili licu u ogledalu.",
        ]
      : [
          "Spin in the opposite direction and compare.",
          "Increase viewing time—does it last longer?",
          "Vary the rotation speed.",
          "Try it on your drawings or your face in a mirror.",
        ],
    whyTitle: isSr ? "Zašto se to dešava?" : "Why does it happen?",
    why: isSr
      ? "Neuroni za detekciju pokreta se privremeno zasite kontinuiranim smerom rotacije. Kada pređeš na statičnu sliku, sistem „očekuje“ obrnuti pokret, pa nastaje iluzorni osećaj uvijanja/širenja — naknadni efekat pokreta."
      : "Motion-sensitive neurons adapt to the continuous rotation. When you switch to a static image, the system ‘expects’ opposite motion, producing illusory warping/expansion—the motion aftereffect.",
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
            w-24 h-24 sm:w-40 sm:h-40 md:w-48 md:h-48
            rounded-xl overflow-hidden ring-1 ring-white/15 shadow-xl
          "
        >
          <Image
            src="/images/illusions/spiral-movement-illusion.jpg"
            alt={isSr ? "Spiralni pokreti" : "Spiral Motion"}
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
          {t.title} <span className="align-middle">🌀</span>
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

          <h3 className="mt-6 font-semibold">{t.buildTitle}</h3>
          <ol className="mt-2 space-y-2 list-decimal list-inside text-white/90">
            {t.build.map((s, i) => (
              <li key={i}>{s}</li>
            ))}
          </ol>
        </div>

        <div>
          <h2 className="text-xl font-semibold">{t.whyTitle}</h2>
          <p className="mt-2 text-white/90 leading-relaxed">{t.why}</p>

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
