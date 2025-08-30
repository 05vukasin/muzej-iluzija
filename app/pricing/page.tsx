// app/cenovnik/page.tsx
"use client";

import { useContext } from "react";
import { LanguageContext } from "@/app/context/LanguageContext";
import Link from "next/link";

type Item = {
  key: string;
  sr: string;
  en: string;
  price?: number; // u dinarima; ako nema, ispisujemo "Besplatno/Free"
  free?: boolean;
};

export default function CenovnikPage() {
  const { language } = useContext(LanguageContext);
  const t = (sr: string, en: string) => (language === "sr" ? sr : en);

  // Sekcija: pojedinačne karte
  const individual: Item[] = [
    {
      key: "kids-0-3",
      sr: "Deca do 3 godine",
      en: "Children up to 3",
      free: true,
    },
    {
      key: "kids-3-16",
      sr: "Deca od 3 do 16 godina",
      en: "Children 3–16",
      price: 800,
    },
    { key: "adults", sr: "Odrasli", en: "Adults", price: 1400 },
    { key: "seniors", sr: "Penzioneri", en: "Seniors", price: 800 },
  ];

  // Sekcija: porodični paketi
  const family: Item[] = [
    {
      key: "1a1k",
      sr: "1 odrasla osoba + 1 dete",
      en: "1 adult + 1 child",
      price: 1900,
    },
    {
      key: "1a2k",
      sr: "1 odrasla osoba + 2 deteta",
      en: "1 adult + 2 children",
      price: 2300,
    },
    {
      key: "2a1k",
      sr: "2 odrasle osobe + 1 dete",
      en: "2 adults + 1 child",
      price: 2900,
    },
    {
      key: "2a2k",
      sr: "2 odrasle osobe + 2 deteta",
      en: "2 adults + 2 children",
      price: 2990,
    },
    {
      key: "2a3k",
      sr: "2 odrasle osobe + 3 deteta",
      en: "2 adults + 3 children",
      price: 3300,
    },
  ];

  // Sekcija: grupe
  const groups: Item[] = [
    {
      key: "group-kids-<7",
      sr: "Grupa dece (20+) do 7 godina",
      en: "Children group (20+) up to 7",
      price: 500,
    },
    {
      key: "group-kids-7-18",
      sr: "Grupa dece (20+) od 7 do 18 godina",
      en: "Children group (20+) 7–18",
      price: 500,
    },
  ];

  const formatPrice = (n?: number, free?: boolean) => {
    if (free) return t("Besplatno", "Free");
    if (typeof n !== "number") return "—";
    // RSD, bez decimala, sa razdvajanjem hiljada
    const formatted = new Intl.NumberFormat(
      language === "sr" ? "sr-RS" : "en-US",
      {
        maximumFractionDigits: 0,
      }
    ).format(n);
    return language === "sr" ? `${formatted} dinara` : `${formatted} RSD`;
  };

  return (
    <main className="min-h-screen bg-white">
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-20 md:pt-24 pb-12">
        <header className="mb-8 md:mb-12">
          <h1 className="text-3xl md:text-5xl font-black text-primary tracking-tight">
            {t("Cene ulaznica", "Ticket Prices")}
          </h1>
          <p className="mt-2 text-primary/70">
            {t(
              "Pogledajte cene pojedinačnih ulaznica, porodičnih i grupnih paketa.",
              "See prices for single tickets, family and group packages."
            )}
          </p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
          {/* Pojedinačne karte */}
          <PriceCard title={t("Pojedinačne karte", "Individual tickets")}>
            {individual.map((it) => (
              <PriceRow
                key={it.key}
                label={t(it.sr, it.en)}
                value={formatPrice(it.price, it.free)}
              />
            ))}
          </PriceCard>

          {/* Porodični paketi */}
          <PriceCard title={t("Porodični paketi", "Family packages")}>
            {family.map((it) => (
              <PriceRow
                key={it.key}
                label={t(it.sr, it.en)}
                value={formatPrice(it.price)}
              />
            ))}
          </PriceCard>

          {/* Grupe */}
          <PriceCard title={t("Grupe", "Groups")}>
            {groups.map((it) => (
              <PriceRow
                key={it.key}
                label={t(it.sr, it.en)}
                value={formatPrice(it.price)}
              />
            ))}
          </PriceCard>
        </div>

        {/* CTA: Kontakt */}
        <div className="mt-10">
          <Link href="/contact" legacyBehavior prefetch>
            <a
              href="/contact"
              className="inline-flex items-center gap-2 rounded-full bg-accent-2 px-6 py-3 text-white font-semibold hover:brightness-110 transition"
            >
              {t("Kontakt", "Contact")}
              <svg
                viewBox="0 0 24 24"
                className="h-5 w-5"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M7 17L17 7" />
                <path d="M7 7h10v10" />
              </svg>
            </a>
          </Link>

          <p className="mt-3 text-sm text-primary/60">
            {t(
              "Napomena: Cene su informativne i podložne promenama.",
              "Note: Prices are indicative and subject to change."
            )}
          </p>
        </div>
      </section>

      {/* (opciono) SEO JSON-LD kao katalog ponuda */}
      <script
        type="application/ld+json"
        // @ts-ignore
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "OfferCatalog",
            name: "Iluzionarijum – Cene ulaznica",
            itemListElement: [...individual, ...family, ...groups].map(
              (it) => ({
                "@type": "Offer",
                name: it.sr,
                priceCurrency: "RSD",
                price: it.free ? 0 : it.price ?? undefined,
                availability: "https://schema.org/InStock",
              })
            ),
          }),
        }}
      />
    </main>
  );
}

/* —————— UI delovi —————— */

function PriceCard({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="rounded-2xl border border-black/10 bg-white/80 backdrop-blur-sm shadow-sm p-6 md:p-8">
      <h2 className="text-xl md:text-2xl font-extrabold text-primary">
        {title}
      </h2>
      <div className="mt-5 divide-y divide-black/10">{children}</div>
    </div>
  );
}

function PriceRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="py-3 flex items-baseline justify-between gap-4">
      <span className="text-primary/80">{label}</span>
      <span className="font-semibold text-primary">{value}</span>
    </div>
  );
}
