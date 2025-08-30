"use client";

import { useContext } from "react";
import { LanguageContext } from "@/app/context/LanguageContext";
import Cube from "@/app/components/cube";
import Link from "next/link";

export default function About() {
  const { language } = useContext(LanguageContext);

  const title = language === "sr" ? "KO SMO" : "WHO WE ARE";
  const p1 =
    language === "sr"
      ? "Iluzionarijum je jedinstvena atrakcija koja posetiocima nudi nezaboravno iskustvo ispunjeno igrom i otkrićima. Sa raznovrsnim interaktivnim postavkama, svako – od najmlađih do odraslih – može da se upusti u svet optičkih iluzija i zabavnih eksperimenata koji pomeraju granice percepcije."
      : "Iluzionarijum is a unique attraction offering an unforgettable experience of play and discovery. With diverse interactive exhibits, everyone—from kids to adults—can dive into a world of optical illusions and playful experiments that push the limits of perception.";
  const p2 =
    language === "sr"
      ? "Na prelepom Zlatiboru, istraživanje i zabava ne prestaju nakon obilaska postavke: u blizini su dodatne atrakcije i mogućnosti uživanja u prirodi. Avantura se nastavlja i na našem sajtu, gde vas čeka dodatni interaktivni svet iluzija."
      : "On beautiful Zlatibor, exploration and fun continue after the exhibits: nearby attractions and pristine nature await. The adventure also continues on our website with an extra interactive world of illusions.";
  const p3 =
    language === "sr"
      ? "Iluzionarijum je idealan za porodične izlete i školske posete, gde deca uče kroz igru. Prilagođen svim uzrastima, spaja zabavu i edukaciju u nezaboravno putovanje kroz svet iluzija."
      : "Iluzionarijum is ideal for family trips and school visits, where kids learn through play. For all ages, it blends fun and education into a memorable journey through illusions.";

  return (
    <section
      id="about"
      className="relative overflow-hidden bg-white"
      aria-labelledby="about-title"
    >
      {/* 3D kocke – donji desni ugao, iza sadržaja */}
      <div className="pointer-events-none absolute bottom-0 right-0 w-[45vw] max-w-[560px] h-[45vw] max-h-[560px]">
        <Cube scale={1.2} className="!pointer-events-none" />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 sm:py-24 min-h-[70vh] grid items-center">
        <div className="max-w-3xl">
          <h2
            id="about-title"
            className="text-3xl md:text-5xl font-black text-primary tracking-tight"
          >
            {title}
          </h2>
          <div className="mt-6 space-y-5 text-primary/80 leading-relaxed text-base md:text-lg">
            <p>{p1}</p>
            <p>{p2}</p>
            <p>{p3}</p>
          </div>

          <div className="mt-8">
            <Link href="/contact" legacyBehavior prefetch>
              <a
                href="/contact"
                className="inline-block rounded-full bg-brand-235 text-white px-6 py-3 font-semibold hover:brightness-110 transition"
              >
                {language === "sr" ? "Kontaktirajte nas" : "Contact us"}
              </a>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
