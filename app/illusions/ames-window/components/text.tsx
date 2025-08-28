"use client";

import Image from "next/image";
import Link from "next/link";
import { useContext } from "react";
import { LanguageContext } from "@/app/context/LanguageContext";

export default function TextBlock() {
  const { language } = useContext(LanguageContext);
  const isSr = language === "sr";

  const t = {
    cat: isSr ? "Iluzije prostora" : "Space Illusions",
    title: isSr ? "Ejmsov prozor" : "Ames Window",
    intro: isSr
      ? "Trapezasti „prozor” koji se rotira izgleda kao da se samo njiše napred–nazad, umesto da se okreće u krug. Ako dodaš predmet kroz sredinu, deluje kao da prolazi kroz čvrstu površinu!"
      : "A rotating trapezoidal ‘window’ appears to rock back and forth rather than spin. Add an object through the middle and it can look like it passes through a solid surface!",
    needTitle: isSr ? "Šta ti je potrebno" : "What you need",
    needList: isSr
      ? [
          "Karton (ili deblji papir)",
          "Makaze",
          "Lenjir",
          "Lepak ili lepljiva traka",
          "Drveni štapić, čačkalica ili olovka",
          "Flomaster ili bojice",
          "Čiode ili igla (opciono, za rotaciju)",
        ]
      : [
          "Cardboard (or thick paper)",
          "Scissors",
          "Ruler",
          "Glue or tape",
          "Wooden stick, toothpick, or pencil",
          "Marker or colored pencils",
          "Pins/needle (optional, for rotation)",
        ],
    makeTitle: isSr ? "Napravi iluziju" : "Build the illusion",
    makeSteps: isSr
      ? [
          "Nacrtaj trapez: donja stranica 8 cm, gornja 4 cm, visina 12 cm.",
          "Unutar trapeza dodaj nekoliko horizontalnih „prečki”.",
          "Iseci trapez i ojačaj ga dodatnim slojem kartona.",
          "Zalepi trapez na štapić (kao zastavicu) ili probuši sredinu i provuci štapić.",
          "Za rotaciju: drži štapić i polako okreći ili ga ubodi u stiropor / okači na nit da se slobodno vrti.",
        ]
      : [
          "Draw a trapezoid: bottom 8 cm, top 4 cm, height 12 cm.",
          "Add horizontal “bars” inside the trapezoid.",
          "Cut it out and stiffen with an extra layer of cardboard.",
          "Attach it to a stick (like a flag) or pierce the center and thread the stick through.",
          "For rotation: twist the stick by hand, pin it into foam, or hang it on a thread to spin freely.",
        ],
    moreTitle: isSr ? "Eksperimentiši dalje" : "Try more",
    moreList: isSr
      ? [
          "Provedi olovku kroz „prozor” da izgleda kao da je presečena ili prolazi kroz čvrstu prepreku.",
          "Oboji različito obe strane trapeza — iluzija postaje jača.",
          "Probaj veće dimenzije i osvetljenje sa jedne strane.",
        ]
      : [
          "Pass a pencil through the “window” so it looks cut or passing through a solid barrier.",
          "Color the two faces differently — the illusion strengthens.",
          "Try larger sizes and one-sided lighting.",
        ],
    dimsTitle: isSr ? "Predložene mere (u cm)" : "Suggested dimensions (cm)",
    dims: isSr
      ? [
          "Donja stranica: 8",
          "Gornja stranica: 4",
          "Visina: 12",
          "Preporučeno: nacrtaj 3–5 horizontalnih prečki unutar trapeza",
        ]
      : [
          "Bottom edge: 8",
          "Top edge: 4",
          "Height: 12",
          "Tip: draw 3–5 horizontal bars inside the trapezoid",
        ],
    diagramAlt: isSr ? "Ejmsov prozor — dijagram" : "Ames window — diagram",
    whyTitle: isSr ? "Zašto se to dešava?" : "Why does it happen?",
    whyText: isSr
      ? "Mozak očekuje pravougaonik, ne trapez. Pri rotaciji trapeza, vizuelni sistem pogrešno tumači oblik i perspektivu kao njihanje napred–nazad. Dodatni objekat u sredini pojačava konflikt — deluje kao da prolazi kroz „fiksnu” površinu, iako se sve samo geometrijski vara u vidnom polju."
      : "Your brain expects a rectangle, not a trapezoid. As the trapezoid rotates, the visual system misreads shape and perspective as back-and-forth rocking. An extra object through the center heightens the conflict—it seems to pass through a ‘solid’ surface, though it’s all a geometric trick.",
    back: isSr ? "Nazad na iluzije" : "Back to Illusions",
    ask: isSr ? "Pitaj nas bilo šta" : "Ask us anything",
  };

  return (
    <div className="rounded-2xl bg-black/65 backdrop-blur-md text-white shadow-2xl ring-1 ring-white/10 p-6 sm:p-8 lg:p-10">
      {/* Header (CSS thumbnail at top-right, text wraps) */}
      <div className="relative after:content-[''] after:block after:clear-both">
        <div
          className="
    relative float-right shrink-0 ml-4 mb-2
    w-24 h-24 sm:w-40 sm:h-28 md:w-48 md:h-32
    rounded-xl overflow-hidden ring-1 ring-white/15 shadow-xl
  "
        >
          <Image
            src="/images/illusions/ames-window-cover.png"
            alt={isSr ? "Ejmsov prozor" : "Ames Window"}
            fill
            priority
            className="object-cover select-none"
            sizes="(max-width: 768px) 30vw, 192px"
          />
          <span className="pointer-events-none absolute inset-0 rounded-xl bg-[radial-gradient(circle_at_30%_25%,rgba(255,255,255,0.16),transparent_55%)]" />
        </div>

        <p className="text-xs uppercase tracking-wider text-white/70">
          {t.cat}
        </p>
        <h1 className="mt-1 text-2xl sm:text-3xl md:text-4xl font-black tracking-tight">
          {t.title} <span className="align-middle">⊞</span>
        </h1>
        <p className="mt-3 text-white/90 leading-relaxed">{t.intro}</p>
      </div>

      {/* Content */}
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

      {/* Dimensions + diagram — FULL card width */}
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

            {/* Diagram image */}
            <div className="relative w-full aspect-[4/3] rounded-md overflow-hidden ring-1 ring-white/10 bg-black/10">
              <Image
                src="/images/illusions/ames-window.png"
                alt={t.diagramAlt}
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
