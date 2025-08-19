// app/components/IllusionSection.tsx
"use client";

import Image from "next/image";
import { useContext } from "react";
import { LanguageContext } from "@/app/context/LanguageContext";
import Pyramids from "./Pyramids";
import DecorShape from "./DecorShape";

export default function IllusionSection() {
  const { language } = useContext(LanguageContext);

  const title =
    language === "sr"
      ? "KAKO UOPŠTE NASTAJE ILUZIJA?"
      : "HOW DOES AN ILLUSION HAPPEN?";
  const body =
    language === "sr"
      ? `Zamisli da je svetlost poštar. Uleti kroz zenicu, prođe kroz providnu „lupu“ (sočivo) i padne na platno na pozadini oka — mrežnjaču. Tamo je dočekaju čepići (vide boje) i štapići (vide svetlo i tamu). Poštar zatim šalje električnu „poštu“ mozgu, ali mozak nema vremena da čita svako slovo. Umesto toga gleda naslove, preskače redove, a ostatak dopunjava maštom. Devet puta od deset pogodi, ali onaj deseti put… nastane iluzija!`
      : `Imagine light as a postman. It rushes through the pupil, passes the transparent “magnifier” (lens) and lands on the retina. Cones (colors) and rods (light/dark) receive it; the brain fills in the gaps—most of the time it’s right, but sometimes… an illusion appears!`;

  return (
    <section
      id="how-it-works"
      className="relative overflow-hidden"
      aria-labelledby="illusion-title"
    >
      {/* suptilan pattern u pozadini */}
      <div className="abs-pattern absolute inset-0 -z-10" aria-hidden="true" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
        <div className="grid md:grid-cols-2 items-center gap-10 lg:gap-14">
          {/* FOTO krug – na mobilnom gore, na desktopu desno */}
          <div className="order-1 md:order-2 justify-self-center md:justify-self-end">
            <div className="photo rounded-full overflow-hidden ring-4 ring-white/20 shadow-2xl">
              <Image
                src="/images/picture-2.jpg"
                alt={
                  language === "sr"
                    ? "Iluzija – ilustrativna fotografija"
                    : "Illusion – illustrative photo"
                }
                fill
                priority
                sizes="(max-width: 768px) 260px, (max-width: 1024px) 360px, 420px"
                className="object-cover"
              />
            </div>
          </div>

          {/* Tekst kartica – levo na desktopu, ispod na mobilnom */}
          <div className="order-2 md:order-1">
            <div className="rounded-2xl bg-black/65 backdrop-blur-md text-white shadow-2xl ring-1 ring-white/10 p-6 sm:p-8 lg:p-10">
              <h2
                id="illusion-title"
                className="text-2xl sm:text-3xl md:text-4xl font-black tracking-tight"
              >
                {title}
              </h2>
              <p className="mt-5 leading-relaxed text-base sm:text-lg text-white/90">
                {body}
              </p>
              <a
                href="/illusions"
                className="mt-7 inline-block rounded-full bg-brand-235 text-white px-6 py-3 font-semibold hover:brightness-110 transition"
              >
                {language === "sr" ? "Pogledaj iluzije" : "Explore illusions"}
              </a>
            </div>
          </div>
        </div>

       
      </div>

      <style jsx>{`
        /* Dimenzije foto-kruga po breakpointima */
        .photo {
          position: relative;
          width: 260px;
          height: 260px;
        }
        @media (min-width: 768px) {
          .photo {
            width: 360px;
            height: 360px;
          }
        }
        @media (min-width: 1024px) {
          .photo {
            width: 420px;
            height: 420px;
          }
        }
        /* blagi highlight preko slike */
        .photo::after {
          content: "";
          position: absolute;
          inset: 0;
          background: radial-gradient(
            circle at 30% 25%,
            rgba(255, 255, 255, 0.18),
            transparent 55%
          );
          pointer-events: none;
        }

        /* Uiverse pattern (smanjen intenzitet da tekst ostane čitak) */
        .abs-pattern {
          width: 100%;
          height: 100%;
          /* control ize */
          --u: 5px;
          --c1: #ededee;
          --c2: #000000;
          --c3: #1e1e1e;
          --gp: 50% / calc(var(--u) * 16.9) calc(var(--u) * 12.8);
          background: conic-gradient(
                from 122deg at 50% 85.15%,
                var(--c2) 0 58deg,
                var(--c3) 0 116deg,
                #fff0 0 100%
              )
              var(--gp),
            conic-gradient(
                from 122deg at 50% 72.5%,
                var(--c1) 0 116deg,
                #fff0 0 100%
              )
              var(--gp),
            conic-gradient(
                from 58deg at 82.85% 50%,
                var(--c3) 0 64deg,
                #fff0 0 100%
              )
              var(--gp),
            conic-gradient(
                from 58deg at 66.87% 50%,
                var(--c1) 0 64deg,
                var(--c2) 0 130deg,
                #fff0 0 100%
              )
              var(--gp),
            conic-gradient(
                from 238deg at 17.15% 50%,
                var(--c2) 0 64deg,
                #fff0 0 100%
              )
              var(--gp),
            conic-gradient(
                from 172deg at 33.13% 50%,
                var(--c3) 0 66deg,
                var(--c1) 0 130deg,
                #fff0 0 100%
              )
              var(--gp),
            linear-gradient(98deg, var(--c3) 0 15%, #fff0 calc(15% + 1px) 100%)
              var(--gp),
            linear-gradient(-98deg, var(--c2) 0 15%, #fff0 calc(15% + 1px) 100%)
              var(--gp),
            conic-gradient(
                from -58deg at 50.25% 14.85%,
                var(--c3) 0 58deg,
                var(--c2) 0 116deg,
                #fff0 0 100%
              )
              var(--gp),
            conic-gradient(
                from -58deg at 50% 28.125%,
                var(--c1) 0 116deg,
                #fff0 0 100%
              )
              var(--gp),
            linear-gradient(90deg, var(--c2) 0 50%, var(--c3) 0 100%) var(--gp);
        }
        @media (min-width: 768px) {
          .abs-pattern {
            --u: 8px;
          }
        }
      `}</style>
    </section>
  );
}
