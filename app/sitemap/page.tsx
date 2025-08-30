"use client";

import Link from "next/link";
import { useContext, useMemo } from "react";
import { LanguageContext } from "@/app/context/LanguageContext";

type Illusion = {
  slug: string;
  category: "color" | "motion" | "space" | "shape" | "cognitive";
  emoji: string;
  titleSr: string;
  titleEn: string;
  img: string;
};

/* ----- Spisak iluzija ----- */
const ILLUSIONS: readonly Illusion[] = [
  // Color & Light
  { slug: "color-mixing-game", category: "color", emoji: "🎨", titleSr: "Igra mešanja boja", titleEn: "Color Mixing Game", img: "/images/illusions/color-mixing.jpg" },
  { slug: "after-image", category: "color", emoji: "💡", titleSr: "Iluzija naknadne slike", titleEn: "Afterimage Illusion", img: "/images/illusions/after-image.jpg" },
  { slug: "light-tricks", category: "color", emoji: "🔳", titleSr: "Kada svetlo vara tvoje oči", titleEn: "When Light Tricks Your Eyes", img: "/images/illusions/light-tricks.jpg" },
  { slug: "lying-dress", category: "color", emoji: "👗", titleSr: "Varljiva haljina", titleEn: "The Dress Illusion", img: "/images/illusions/lying-dress.jpg" },

  // Motion
  { slug: "eyes-that-follow", category: "motion", emoji: "👁️", titleSr: "Oči koje te prate", titleEn: "Eyes That Follow You", img: "/images/illusions/eyes-that-follow.jpg" },
  { slug: "spiral-movement", category: "motion", emoji: "🌀", titleSr: "Spiralni pokreti", titleEn: "Spiral Motion", img: "/images/illusions/spiral-movement.jpg" },
  { slug: "deceiving-rings", category: "motion", emoji: "🔗", titleSr: "Varljivo prstenje", titleEn: "Deceiving Rings", img: "/images/illusions/deceiving-rings.jpg" },
  { slug: "stepping-feet", category: "motion", emoji: "🦶", titleSr: "Iluzija koračanja", titleEn: "Walking Illusion", img: "/images/illusions/stepping-feet.jpg" },
  { slug: "floating-circle", category: "motion", emoji: "🔘", titleSr: "Iluzija lebdećeg kruga", titleEn: "Floating Circle Illusion", img: "/images/illusions/floating-circle.jpg" },

  // Space
  { slug: "mini-ames-room", category: "space", emoji: "🏠", titleSr: "Mini Ejmsova soba", titleEn: "Mini Ames Room", img: "/images/illusions/mini-ames-room.jpg" },
  { slug: "ames-window", category: "space", emoji: "⊞", titleSr: "Ejmsov prozor", titleEn: "Ames Window", img: "/images/illusions/ames-window-cover.png" },
  { slug: "perspective-illusion", category: "space", emoji: "👻", titleSr: "Iluzija perspektive", titleEn: "Perspective Illusion", img: "/images/illusions/perspective-illusion.jpg" },
  { slug: "depth-illusion", category: "space", emoji: "🌅", titleSr: "Iluzija dubine", titleEn: "Depth Illusion", img: "/images/illusions/depth-illusion.jpg" },

  // Shape
  { slug: "curved-lines", category: "shape", emoji: "⌇", titleSr: "Zakrivljene (ne)jednake linije", titleEn: "Curved (Un)Equal Lines", img: "/images/illusions/curved-lines.jpg" },
  { slug: "same-lines", category: "shape", emoji: "➡️⬅️", titleSr: "Iste linije različite dužine", titleEn: "Same lines diferent length", img: "/images/illusions/same-lines.webp" },
  { slug: "hat-illusion", category: "shape", emoji: "🎩", titleSr: "Iluzija šešira", titleEn: "Hat Illusion", img: "/images/illusions/hat-illusion.jpg" },
  { slug: "box-illusion", category: "shape", emoji: "📦", titleSr: "Iluzija kutija", titleEn: "Box Illusion", img: "/images/illusions/box-illusion.jpg" },
  { slug: "big-small-circles", category: "shape", emoji: "🔵", titleSr: "Iluzija velikih malih krugova", titleEn: "Big & Small Circles Illusion", img: "/images/illusions/big-small-circles.jpg" },

  // Cognitive
  { slug: "stroop-effect", category: "cognitive", emoji: "💯", titleSr: "Stroopov efekat", titleEn: "Stroop Effect", img: "/images/illusions/stroop-effect.jpg" },
  { slug: "thatcher-effect", category: "cognitive", emoji: "🙃", titleSr: "Margaret Tačer iluzija", titleEn: "Thatcher Effect", img: "/images/illusions/thatcher-effect.webp" },
  { slug: "face-in-clouds", category: "cognitive", emoji: "☁️", titleSr: "Lice u oblacima", titleEn: "Face in the Clouds", img: "/images/illusions/face-in-clouds.jpg" },
  { slug: "impossible-shape", category: "cognitive", emoji: "⟁", titleSr: "Nemogući oblik", titleEn: "Impossible Shape", img: "/images/illusions/impossible-shape.jpg" },
  { slug: "conformity", category: "cognitive", emoji: "📊", titleSr: "Konformizam", titleEn: "Conformity", img: "/images/illusions/conformity.jpg" },
];

const CAT_LABEL: Record<Illusion["category"], { sr: string; en: string }> = {
  color: { sr: "Boje i svetlo", en: "Color & Light" },
  motion: { sr: "Pokret", en: "Motion" },
  space: { sr: "Prostor", en: "Space" },
  shape: { sr: "Oblik", en: "Shape" },
  cognitive: { sr: "Kognitivne", en: "Cognitive" },
};

export default function SitemapPage() {
  const { language } = useContext(LanguageContext);
  const isSr = language === "sr";

  const grouped = useMemo(() => {
    return ILLUSIONS.reduce<Record<string, Illusion[]>>((acc, it) => {
      (acc[it.category] ||= []).push(it);
      return acc;
    }, {});
  }, []);

  const t = {
    title: isSr ? "Mapa sajta" : "Sitemap",
    intro: isSr
      ? "Brzi pregled svih važnih stranica i svih iluzija na sajtu."
      : "Quick overview of all key pages and every illusion on the site.",
    main: isSr ? "Glavne stranice" : "Main pages",
    illusions: isSr ? "Sve iluzije" : "All illusions",
    home: isSr ? "Početna" : "Home",
    illusionsIndex: isSr ? "Iluzije (pregled)" : "Illusions (index)",
    pricing: isSr ? "Cenovnik" : "Pricing",
    contact: isSr ? "Kontakt" : "Contact",
  };

  // Kanonske rute (pratiš ono što koristiš u aplikaciji)
  const ROUTES = {
    home: "/",
    illusionsIndex: "/illusions",
    pricing: "/cenovnik",
    contact: "/contact",
    illusion: (slug: string) => `/illusions/${slug}`,
  };

  return (
    <main className="px-4 sm:px-6 lg:px-8 py-10">
      <div className="mx-auto max-w-5xl">
        <div className="rounded-2xl bg-black/65 backdrop-blur-md text-white shadow-2xl ring-1 ring-white/10 p-6 sm:p-8 lg:p-10">
          <h1 className="text-3xl md:text-4xl font-black tracking-tight">🗺️ {t.title}</h1>
          <p className="mt-3 text-white/85">{t.intro}</p>

          {/* Main pages */}
          <section className="mt-8">
            <h2 className="text-xl font-bold">{t.main}</h2>
            <ul className="mt-3 grid sm:grid-cols-2 lg:grid-cols-4 gap-3">
              <Li href={ROUTES.home} label={t.home} />
              <Li href={ROUTES.illusionsIndex} label={t.illusionsIndex} />
              <Li href={ROUTES.pricing} label={t.pricing} />
              <Li href={ROUTES.contact} label={t.contact} />
            </ul>
          </section>

          {/* Illusions grouped by category */}
          <section className="mt-10">
            <h2 className="text-xl font-bold">{t.illusions}</h2>
            <div className="mt-4 space-y-6">
              {Object.entries(grouped).map(([cat, items]) => (
                <div key={cat} className="rounded-xl bg-white/5 ring-1 ring-white/10 p-4">
                  <h3 className="text-lg font-semibold">
                    {CAT_LABEL[cat as Illusion["category"]][isSr ? "sr" : "en"]}
                  </h3>
                  <ul className="mt-3 grid sm:grid-cols-2 lg:grid-cols-3 gap-2">
                    {items.map((it) => (
                      <Li
                        key={it.slug}
                        href={ROUTES.illusion(it.slug)}
                        label={`${it.emoji} ${isSr ? it.titleSr : it.titleEn}`}
                      />
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}

function Li({ href, label }: { href: string; label: string }) {
  return (
    <li className="rounded-lg bg-white/5 hover:bg-white/10 transition ring-1 ring-white/10">
      <Link className="block px-4 py-2.5" href={href}>
        {label}
      </Link>
    </li>
  );
}
