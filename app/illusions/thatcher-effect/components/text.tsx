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
    title: isSr ? "Margaret Tačer iluzija" : "Thatcher Effect",
    intro: isSr
      ? "Ova iluzija pokazuje kako mozak obrađuje lice kao celinu. Kada je lice uspravno, delovi okrenuti naopačke (oči/usta) deluju čudno i uznemirujuće. Ali kada celo lice okreneš naopačke, isti ti delovi iznenada deluju „normalnije“ — iako su identični!"
      : "This illusion reveals how the brain processes faces holistically. When a face is upright, flipped parts (eyes/mouth) look odd and disturbing. Turn the whole face upside down and those same parts can look ‘normal’—even though nothing changed!",
    needTitle: isSr ? "Šta ti je potrebno" : "What you need",
    needList: isSr
      ? ["Papir", "Olovka, flomaster ili bojice", "Fotografija bilo kog lica (poznata ličnost ili neko tvoj)", "Makaze (opciono)"]
      : ["Paper", "Pencil/marker or crayons", "A face photo (celebrity or someone you know)", "Scissors (optional)"],
    makeTitle: isSr ? "Napravi iluziju" : "Build the illusion",
    makeSteps: isSr
      ? [
          "Izaberi ili nacrtaj lice na papiru.",
          "Obriši ili iseci oči i usta i okreni ih naopačke (npr. i oči i usta okreni na 180°).",
          "Zalepi ili nacrtaj ove obrnute delove nazad na lice na originalnim mestima.",
          "Posmatraj lice uspravno — delovaće čudno, neprirodno i uznemirujuće.",
          "Okreni celo lice naopačke — iluzija slabi i lice deluje gotovo normalno.",
        ]
      : [
          "Choose or draw a face on paper.",
          "Erase or cut out the eyes and mouth and flip them upside down (rotate 180°).",
          "Paste or redraw these inverted parts back in their original locations.",
          "View the face upright — it looks strange, unnatural, even disturbing.",
          "Turn the whole face upside down — the illusion fades and it looks almost normal.",
        ],
    moreTitle: isSr ? "Eksperimentiši dalje" : "Try more",
    moreList: isSr
      ? [
          "Probaj različita lica: poznate ličnosti, crteže ili crtane junake.",
          "Organizuj takmičenje — ko najbrže uoči šta nije u redu na obrnutoj slici?",
          "Menjaj samo oči, samo usta ili i druge delove lica i posmatraj kako utiče na efekat.",
        ]
      : [
          "Try different faces: celebrities, drawings, or cartoons.",
          "Make it a challenge — who spots what’s wrong fastest on the inverted face?",
          "Flip only the eyes, only the mouth, or other parts to see how the effect changes.",
        ],
    whyTitle: isSr ? "Zašto se to dešava?" : "Why does it happen?",
    whyText: isSr
      ? "Mozak lica obrađuje celovito, posebno kada je lice uspravno. Obrnuti detalji remete tu „celinu“, pa izgledaju pogrešno. U obrnutom položaju mozak se manje oslanja na fine odnose delova, pa iluzija slabi."
      : "The brain processes faces holistically, especially when upright. Inverted parts disrupt that gestalt and look wrong. When the whole face is inverted, the brain relies less on fine part relations, so the illusion weakens.",
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
            src="/images/illusions/thatcher-effect.webp"
            alt={isSr ? "Margaret Tačer iluzija" : "Thatcher effect"}
            fill
            className="object-cover select-none"
            priority
          />
          <span className="pointer-events-none absolute inset-0 rounded-xl bg-[radial-gradient(circle_at_30%_25%,rgba(255,255,255,0.16),transparent_55%)]" />
        </div>

        <p className="text-xs uppercase tracking-wider text-white/70">{t.cat}</p>
        <h1 className="mt-1 text-2xl sm:text-3xl md:text-4xl font-black tracking-tight">
          {t.title} <span className="align-middle">🙃</span>
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
