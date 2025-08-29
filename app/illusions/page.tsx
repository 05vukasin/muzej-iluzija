"use client";

import Link from "next/link";
import { useContext, useMemo, useState } from "react";
import { LanguageContext } from "@/app/context/LanguageContext";

/* ----- Tipovi ----- */
type CatId = "all" | "color" | "motion" | "space" | "shape" | "cognitive";

type Category = {
  id: CatId;
  name: { sr: string; en: string };
  emoji?: string; // opcioni emoji – zbog "Sve"
};

type Illusion = {
  slug: string;
  category: CatId;
  emoji: string;
  titleSr: string;
  titleEn: string;
  img?: string;
};

/* ----- Kategorije ----- */
const CATEGORIES: readonly Category[] = [
  { id: "all", name: { sr: "Sve", en: "All" } },
  {
    id: "color",
    name: { sr: "Iluzije boje i svetla", en: "Color & Light" },
    emoji: "🌈",
  },
  { id: "motion", name: { sr: "Iluzije pokreta", en: "Motion" }, emoji: "🏃‍♀️" },
  { id: "space", name: { sr: "Iluzije prostora", en: "Space" }, emoji: "📦" },
  { id: "shape", name: { sr: "Iluzije oblika", en: "Shape" }, emoji: "🗯️" },
  {
    id: "cognitive",
    name: { sr: "Kognitivne iluzije", en: "Cognitive" },
    emoji: "🧠",
  },
] as const;

/* ----- Spisak iluzija ----- */
const ILLUSIONS: readonly Illusion[] = [
  // Color & Light
  {
    slug: "color-mixing-game",
    category: "color",
    emoji: "🎨",
    titleSr: "Igra mešanja boja",
    titleEn: "Color Mixing Game",
    img: "/images/illusions/color-mixing.jpg",
  },
  {
    slug: "after-image",
    category: "color",
    emoji: "💡",
    titleSr: "Iluzija naknadne slike",
    titleEn: "Afterimage Illusion",
    img: "/images/illusions/after-image.jpg",
  },
  {
    slug: "light-tricks",
    category: "color",
    emoji: "🔳",
    titleSr: "Kada svetlo vara tvoje oči",
    titleEn: "When Light Tricks Your Eyes",
    img: "/images/illusions/light-tricks.jpg",
  },
  {
    slug: "lying-dress",
    category: "color",
    emoji: "👗",
    titleSr: "Varljiva haljina",
    titleEn: "The Dress Illusion",
    img: "/images/illusions/lying-dress.jpg",
  },

  // Motion
  {
    slug: "eyes-that-follow",
    category: "motion",
    emoji: "👁️",
    titleSr: "Oči koje te prate",
    titleEn: "Eyes That Follow You",
    img: "/images/illusions/eyes-that-follow.jpg",
  },
  {
    slug: "spiral-movement",
    category: "motion",
    emoji: "🌀",
    titleSr: "Spiralni pokreti",
    titleEn: "Spiral Motion",
    img: "/images/illusions/spiral-movement.jpg",
  },
  {
    slug: "deceiving-rings",
    category: "motion",
    emoji: "🔗",
    titleSr: "Varljivo prstenje",
    titleEn: "Deceiving Rings",
    img: "/images/illusions/deceiving-rings.jpg",
  },
  {
    slug: "stepping-feet",
    category: "motion",
    emoji: "🦶",
    titleSr: "Iluzija koračanja",
    titleEn: "Walking Illusion",
    img: "/images/illusions/stepping-feet.jpg",
  },
  {
    slug: "floating-circle",
    category: "motion",
    emoji: "🔘",
    titleSr: "Iluzija lebdećeg kruga",
    titleEn: "Floating Circle Illusion",
    img: "/images/illusions/floating-circle.jpg",
  },

  // Space
  {
    slug: "mini-ames-room",
    category: "space",
    emoji: "🏠",
    titleSr: "Mini Ejmsova soba",
    titleEn: "Mini Ames Room",
    img: "/images/illusions/mini-ames-room.jpg",
  },
  {
    slug: "ames-window",
    category: "space",
    emoji: "⊞",
    titleSr: "Ejmsov prozor",
    titleEn: "Ames Window",
    img: "/images/illusions/ames-window-cover.png",
  },
  {
    slug: "perspective-illusion",
    category: "space",
    emoji: "👻",
    titleSr: "Iluzija perspektive",
    titleEn: "Perspective Illusion",
    img: "/images/illusions/perspective-illusion.jpg",
  },
  {
    slug: "depth-illusion",
    category: "space",
    emoji: "🌅",
    titleSr: "Iluzija dubine",
    titleEn: "Depth Illusion",
    img: "/images/illusions/depth-illusion.jpg",
  },

  // Shape
  {
    slug: "curved-lines",
    category: "shape",
    emoji: "⌇",
    titleSr: "Zakrivljene (ne)jednake linije",
    titleEn: "Curved (Un)Equal Lines",
    img: "/images/illusions/curved-lines.jpg",
  },
  {
    slug: "same-lines",
    category:"shape",
    emoji:"➡️⬅️",
    titleSr:"Iste linije različite dužine",
    titleEn:"Same lines diferent length",
    img:"/images/illusions/same-lines.webp"
  },
  {
    slug: "hat-illusion",
    category: "shape",
    emoji: "🎩",
    titleSr: "Iluzija šešira",
    titleEn: "Hat Illusion",
    img: "/images/illusions/hat-illusion.jpg",
  },
  {
    slug: "box-illusion",
    category: "shape",
    emoji: "📦",
    titleSr: "Iluzija kutija",
    titleEn: "Box Illusion",
    img: "/images/illusions/box-illusion.jpg",
  },
  {
    slug: "big-small-circles",
    category: "shape",
    emoji: "🔵",
    titleSr: "Iluzija velikih malih krugova",
    titleEn: "Big & Small Circles Illusion",
    img: "/images/illusions/big-small-circles.jpg",
  },

  // Cognitive
  {
    slug: "stroop-effect",
    category: "cognitive",
    emoji: "💯",
    titleSr: "Stroopov efekat",
    titleEn: "Stroop Effect",
    img: "/images/illusions/stroop-effect.jpg",
  },
  {
    slug: "thatcher-effect",
    category: "cognitive",
    emoji: "🙃",
    titleSr: "Margaret Tačer iluzija",
    titleEn: "Thatcher Effect",
    img: "/images/illusions/thatcher-effect.webp",
  },
  {
    slug: "lice-u-oblacima",
    category: "cognitive",
    emoji: "☁️",
    titleSr: "Lice u oblacima",
    titleEn: "Face in the Clouds",
    img: "/images/illusions/oblaci.jpg",
  },
  {
    slug: "nemoguci-oblik",
    category: "cognitive",
    emoji: "⟁",
    titleSr: "Nemogući oblik",
    titleEn: "Impossible Shape",
    img: "/images/illusions/nemoguci.jpg",
  },
  {
    slug: "konformizam",
    category: "cognitive",
    emoji: "📊",
    titleSr: "Konformizam",
    titleEn: "Conformity",
    img: "/images/illusions/konformizam.jpg",
  },
] as const;

export default function IllusionsPage() {
  const { language } = useContext(LanguageContext);
  const isSr = language === "sr";

  const [q, setQ] = useState("");
  const [cat, setCat] = useState<CatId>("all");

  const filtered = useMemo(() => {
    const term = q.trim().toLowerCase();
    return ILLUSIONS.filter((it) => {
      const title = (isSr ? it.titleSr : it.titleEn).toLowerCase();
      const byCat = cat === "all" || it.category === cat;
      const byText = !term || title.includes(term);
      return byCat && byText;
    });
  }, [q, cat, isSr]);

  const t = {
    heading: isSr ? "Iluzije" : "Illusions",
    tagline: isSr
      ? "Istraži, filtriraj i testiraj – svaka kartica je mala laboratorija za percepciju. Klikom otvaraš detalje i uputstva."
      : "Explore, filter, and experiment—each card is a tiny lab for perception. Click to open details and instructions.",
    searchPlaceholder: isSr ? "Pretraži iluzije…" : "Search illusions…",
  };

  return (
    <section className="relative">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10 sm:py-14">
        {/* Header */}
        <header className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
          <div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-primary tracking-tight">
              {t.heading}
            </h1>
            <p className="mt-2 text-primary/70 max-w-2xl">{t.tagline}</p>
          </div>

          {/* Search */}
          <label className="relative w-full md:w-[380px]">
            <input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder={t.searchPlaceholder}
              className="w-full rounded-full border border-black/10 bg-white/70 backdrop-blur px-4 py-2.5 pr-10 text-primary shadow-sm outline-none focus:ring-2 focus:ring-brand-235/60"
            />
            <span className="pointer-events-none absolute right-3.5 top-1/2 -translate-y-1/2 text-primary/50">
              ⌕
            </span>
          </label>
        </header>

        {/* Kategorije */}
        <div className="mt-6 overflow-x-auto [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          <div className="flex gap-2.5 min-w-max">
            {CATEGORIES.map((c) => {
              const active = c.id === cat;
              const label = isSr ? c.name.sr : c.name.en;
              return (
                <button
                  key={c.id}
                  onClick={() => setCat(c.id)}
                  aria-pressed={active}
                  className={[
                    "whitespace-nowrap rounded-full border px-4 py-2 text-sm transition",
                    active
                      ? "bg-brand-235 text-white border-brand-235 shadow"
                      : "bg-white/70 border-black/10 hover:bg-accent-1/60 text-primary",
                  ].join(" ")}
                  title={label}
                >
                  {c.emoji ? `${c.emoji} ` : ""}
                  {label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Grid kartica */}
        <div className="mt-8 grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-5 lg:gap-6">
          {filtered.map((it) => (
            <IllusionCard key={it.slug} item={it} isSr={isSr} />
          ))}
          {filtered.length === 0 && (
            <p className="col-span-full text-center text-primary/60 py-16">
              {isSr ? `Nema rezultata za „${q}“.` : `No results for “${q}”.`}
            </p>
          )}
        </div>
      </div>

      {/* Scoped CSS za “cool” oblik i bordere */}
      <style jsx>{`
        .clip-hex {
          clip-path: polygon(
            8% 0%,
            92% 0%,
            100% 30%,
            92% 100%,
            8% 100%,
            0% 30%
          );
        }
      `}</style>
    </section>
  );
}

function IllusionCard({ item, isSr }: { item: Illusion; isSr: boolean }) {
  const title = isSr ? item.titleSr : item.titleEn;
  const catName = ((): string => {
    const c = CATEGORIES.find((x) => x.id === item.category)!;
    return isSr ? c.name.sr : c.name.en;
    // (c.emoji je opcioni, koristimo ga u watermarku ispod)
  })();

  return (
    <Link
      href={`/illusions/${item.slug}`}
      className="group block focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-235/70 rounded-3xl"
    >
      <div className="relative clip-hex overflow-hidden rounded-3xl ring-1 ring-black/10 bg-white/60 backdrop-blur shadow-md transition-transform duration-300 group-hover:-translate-y-0.5">
        {/* slika / gradijent */}
        <div className="relative h-48 sm:h-56 md:h-60">
          {item.img ? (
            <div
              className="absolute inset-0 bg-cover bg-center z-0"
              style={{ backgroundImage: `url(${item.img})` }}
              aria-hidden="true"
            />
          ) : (
            <div
              className="absolute inset-0 bg-gradient-to-br from-brand-235/25 via-brand-629/20 to-transparent z-0"
              aria-hidden="true"
            />
          )}

          {/* radial highlight */}
          <div
            className="absolute inset-0 z-10 bg-[radial-gradient(ellipse_at_30%_20%,rgba(255,255,255,.25),transparent_50%)]"
            aria-hidden="true"
          />

          {/* fade za čitljiv naslov */}
          <div
            className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-black/55 to-transparent z-10"
            aria-hidden="true"
          />

          {/* EMOJI IZNAD SVEGA */}
          <div className="absolute right-3 bottom-2 text-4xl z-20 opacity-100 [text-shadow:0_0_10px_rgba(255,255,255,0.65),0_0_20px_rgba(255,255,255,0.35)]">
            {item.emoji}
          </div>
        </div>

        {/* tekst */}
        <div className="relative px-4 pb-4 pt-3">
          <p className="text-sm text-primary/70">{catName}</p>
          <h3 className="mt-0.5 text-lg font-semibold text-primary leading-snug">
            {title}
          </h3>
        </div>

        {/* dekorativni border on hover */}
        <div className="pointer-events-none absolute inset-0 rounded-3xl ring-1 ring-transparent group-hover:ring-brand-235/50 transition" />
      </div>
    </Link>
  );
}
