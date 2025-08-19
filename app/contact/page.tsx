// app/contact/page.tsx
"use client";

import { useContext } from "react";
import { LanguageContext } from "@/app/context/LanguageContext";

export default function ContactPage() {
  const { language } = useContext(LanguageContext);
  const t = (sr: string, en: string) => (language === "sr" ? sr : en);

  // ↓ Izmeni po potrebi
  const phone = "+381 64 123 4567";
  const email = "info@iluzionarijum.rs";
  const address = "Zlatibor, Srbija";
  const mapQuery = "Iluzionarijum Zlatibor";

  // helpers
  const telHref = `tel:${phone.replace(/[\s()-]/g, "")}`;
  const mailHref = `mailto:${email}`;

  const mapEmbed = `https://www.google.com/maps?q=${encodeURIComponent(
    mapQuery
  )}&z=15&output=embed`;
  const mapLink = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
    mapQuery
  )}`;

  return (
    <main className="min-h-screen bg-white">
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-20 md:pt-24 pb-12">
        <header className="mb-8 md:mb-12">
          <h1 className="text-3xl md:text-5xl font-black text-primary tracking-tight">
            {t("Kontakt", "Contact")}
          </h1>
          <p className="mt-2 text-primary/70">
            {t(
              "Pozovite nas, pišite nam ili nas posetite – sve informacije su u nastavku.",
              "Call us, email us, or visit – all info below."
            )}
          </p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
          {/* MAPA */}
          <div className="w-full overflow-hidden rounded-2xl border border-black/10 shadow-sm">
            <div className="relative w-full aspect-[16/10] sm:aspect-[16/9]">
              <iframe
                src={mapEmbed}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="absolute inset-0 h-full w-full"
                aria-label={t("Mapa lokacije", "Location map")}
              />
            </div>
          </div>

          {/* INFO KARTICA */}
          <div className="w-full">
            <div className="rounded-2xl border border-black/10 bg-white/80 backdrop-blur-sm shadow-sm p-6 md:p-8">
              {/* Quick contacts na početku */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Telefon */}
                <a
                  href={telHref}
                  className="group flex items-center gap-3 rounded-xl border border-black/10 bg-white px-4 py-3 shadow-sm hover:shadow-md transition"
                  aria-label={t("Pozovi telefon", "Call phone")}
                >
                  <svg
                    viewBox="0 0 24 24"
                    className="h-5 w-5 text-accent-2 group-hover:scale-105 transition"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.61-3.07 19.5 19.5 0 0 1-6-6A19.79 19.79 0 0 1 2.08 4.18 2 2 0 0 1 4.06 2h3a2 2 0 0 1 2 1.72c.12.9.32 1.77.6 2.61a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.47-1.12a2 2 0 0 1 2.11-.45c.84.28 1.71.48 2.61.6A2 2 0 0 1 22 16.92z" />
                  </svg>
                  <div className="flex flex-col">
                    <span className="text-xs uppercase tracking-wide text-primary/60">
                      {t("Telefon", "Phone")}
                    </span>
                    <span className="font-semibold text-primary">{phone}</span>
                  </div>
                </a>

                {/* Email */}
                <a
                  href={mailHref}
                  className="group flex items-center gap-3 rounded-xl border border-black/10 bg-white px-4 py-3 shadow-sm hover:shadow-md transition"
                  aria-label={t("Pošalji email", "Send email")}
                >
                  <svg
                    viewBox="0 0 24 24"
                    className="h-5 w-5 text-accent-2 group-hover:scale-105 transition"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path d="M4 4h16v16H4z" />
                    <path d="M22 6l-10 7L2 6" />
                  </svg>
                  <div className="flex flex-col">
                    <span className="text-xs uppercase tracking-wide text-primary/60">
                      Email
                    </span>
                    <span className="font-semibold text-primary">{email}</span>
                  </div>
                </a>
              </div>

              {/* Adresa + dugme */}
              <div className="mt-6 pt-6 border-t border-black/10">
                <h2 className="text-xl md:text-2xl font-extrabold text-primary">
                  {t("Adresa", "Address")}
                </h2>
                <p className="mt-2 text-primary/80 text-base md:text-lg">
                  {address}
                </p>

                <a
                  href={mapLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-4 inline-flex items-center gap-2 rounded-full bg-accent-2 px-5 py-2.5 text-white font-semibold hover:brightness-110 transition"
                >
                  {t("Otvori u Google Mapama", "Open in Google Maps")}
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
              </div>
            </div>

            <p className="mt-3 text-sm text-primary/60">
              {t(
                "Ako koristite navigaciju, unesite tačan naziv ili adresu muzeja.",
                "If you use navigation, enter the exact venue name or address."
              )}
            </p>
          </div>
        </div>
      </section>

      {/* SEO JSON-LD */}
      <script
        type="application/ld+json"
        // @ts-ignore
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Museum",
            name: "Iluzionarijum",
            address: {
              "@type": "PostalAddress",
              addressLocality: "Zlatibor",
              addressCountry: "RS",
            },
            telephone: phone,
            email: email,
            url: "https://iluzionarijum.rs/contact",
          }),
        }}
      />
    </main>
  );
}
