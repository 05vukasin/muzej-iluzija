"use client";

import Link from "next/link";
import { useContext } from "react";
import { LanguageContext } from "@/app/context/LanguageContext";
import { CONTACT } from "../data/site";

export default function PrivacyPage() {
  const { language } = useContext(LanguageContext);
  const isSr = language === "sr";

  const email = CONTACT.email;

  const t = {
    cat: isSr ? "Pravna dokumenta" : "Legal",
    title: isSr ? "Politika privatnosti" : "Privacy Policy",
    updated: isSr ? "Ažurirano" : "Last updated",
    updatedDate: isSr ? "septembar 2025." : "September 2025",
    intro: isSr
      ? "Ova Politika privatnosti objašnjava koje podatke prikupljamo, zašto ih obrađujemo i koja su Vaša prava. Politika važi za sve posetioce sajta i kupce karata Iluzionarijuma."
      : "This Privacy Policy explains what data we collect, why we process it, and your rights. It applies to all website visitors and ticket buyers of Iluzionarijum.",
    quicknav: isSr ? "Brza navigacija" : "Quick navigation",
    sections: {
      what: isSr ? "Koje podatke prikupljamo" : "What data we collect",
      use: isSr ? "Kako koristimo podatke" : "How we use data",
      cookies: isSr ? "Kolačići i analitika" : "Cookies & analytics",
      share: isSr ? "Deljenje podataka" : "Sharing",
      rights: isSr ? "Vaša prava" : "Your rights",
      retention: isSr ? "Čuvanje podataka" : "Data retention",
      minors: isSr ? "Deca i maloletnici" : "Children & minors",
      changes: isSr ? "Izmene politike" : "Changes to this policy",
      contact: isSr ? "Kontakt" : "Contact",
    },
    whatList: isSr
      ? [
          "Podaci o kontaktu (ime i email) kada nam pišete ili se prijavite na novosti.",
          "Tehnički podaci: IP adresa, tip uređaja, pregledač, stranice koje posećujete (anonimizovana analitika).",
          "Podaci o kupovini/rezervaciji (ako ih izvršite): ime, email, vreme posete i osnovni podaci za naplatu preko obezbeđenog procesora plaćanja.",
        ]
      : [
          "Contact details (name and email) when you write to us or subscribe to news.",
          "Technical data: IP address, device/browser type, pages visited (anonymised analytics).",
          "Purchase/booking details (if applicable): name, email, visit time and basic billing info via a secure payment processor.",
        ],
    useList: isSr
      ? [
          "Pružanje usluge (odgovor na upit, rezervacija termina, izdavanje karata).",
          "Poboljšanje sajta i iskustva (merenjem posećenosti i performansi).",
          "Slanje novosti i ponuda uz Vašu saglasnost (uvek možete odjaviti).",
          "Ispunjavanje pravnih obaveza i sprečavanje zloupotreba.",
        ]
      : [
          "Providing services (responding to enquiries, booking visits, issuing tickets).",
          "Improving the website and experience (measuring traffic and performance).",
          "Sending news and offers with your consent (you can unsubscribe anytime).",
          "Complying with legal obligations and preventing abuse.",
        ],
    cookiesP1: isSr
      ? "Koristimo esencijalne kolačiće za funkcionisanje sajta, kao i analitičke kolačiće (npr. anonimizovana merenja posećenosti)."
      : "We use essential cookies for site functionality and analytics cookies (e.g., anonymised traffic measurement).",
    cookiesP2: isSr
      ? "U podešavanjima pregledača možete obrisati ili blokirati kolačiće. Imajte u vidu da pojedine funkcije sajta mogu ograničeno raditi bez kolačića."
      : "You can delete or block cookies via your browser settings. Some features may not work properly without cookies.",
    shareList: isSr
      ? [
          "Provajderi hostinga i analitike (obrađuju podatke u naše ime, uz ugovorne mere zaštite).",
          "Procesor plaćanja (ako kupujete online) — mi ne čuvamo Vaše podatke o platnim karticama.",
          "Organi vlasti kada smo na to zakonski obavezani.",
        ]
      : [
          "Hosting and analytics providers (processing data on our behalf under contractual safeguards).",
          "Payment processor (for online purchases) — we do not store your card details.",
          "Public authorities when legally required.",
        ],
    rightsList: isSr
      ? [
          "Pravo na pristup i kopiju Vaših podataka.",
          "Pravo na ispravku ili brisanje (u skladu sa zakonom).",
          "Pravo na ograničenje i prigovor na obradu.",
          "Pravo na prenosivost podataka (kada je primenljivo).",
          "Pravo da povučete saglasnost (npr. marketing) u svakom trenutku.",
        ]
      : [
          "Right to access and obtain a copy of your data.",
          "Right to rectification or erasure (as permitted by law).",
          "Right to restriction and to object to processing.",
          "Right to data portability (where applicable).",
          "Right to withdraw consent (e.g., marketing) at any time.",
        ],
    retention: isSr
      ? "Podatke čuvamo samo onoliko dugo koliko je potrebno za svrhe opisane u ovoj politici, osim ako je duže čuvanje propisano zakonom (npr. računovodstvena dokumentacija)."
      : "We keep data only as long as necessary for the purposes outlined here, unless longer retention is required by law (e.g., accounting records).",
    minors: isSr
      ? "Naše usluge namenjene su širokoj publici, ali ne prikupljamo svesno podatke dece bez saglasnosti roditelja/staratelja. Ako smatrate da nam je dete dostavilo podatke, kontaktirajte nas radi brisanja."
      : "Our services are for a general audience; we do not knowingly collect data from children without parental/guardian consent. If you believe a child provided data to us, contact us to delete it.",
    changes: isSr
      ? "Politiku privatnosti možemo povremeno ažurirati. Objavićemo izmenu i označiti datum ažuriranja iznad."
      : "We may update this policy from time to time. We will post changes and indicate the updated date above.",
    contact: isSr
      ? "Za pitanja o privatnosti ili ostvarivanje prava, pišite nam:"
      : "For privacy questions or to exercise your rights, contact:",
    back: isSr ? "Nazad na početnu" : "Back home",
  };

  const S = t.sections;

  return (
    <main className="px-4 sm:px-6 lg:px-8 py-10">
      <div className="mx-auto max-w-4xl">
        <div className="rounded-2xl bg-black/65 backdrop-blur-md text-white shadow-2xl ring-1 ring-white/10 p-6 sm:p-8 lg:p-10">
          {/* Header */}
          <p className="text-xs uppercase tracking-wider text-white/70">{t.cat}</p>
          <h1 className="mt-1 text-3xl md:text-4xl font-black tracking-tight">{t.title}</h1>
          <p className="mt-2 text-sm text-white/70">
            {t.updated}: {t.updatedDate}
          </p>
          <p className="mt-4 text-white/90 leading-relaxed">{t.intro}</p>

          {/* Quick nav */}
          <div className="mt-6 rounded-lg bg-white/5 ring-1 ring-white/10 p-4">
            <p className="font-semibold">{t.quicknav}</p>
            <nav className="mt-2 flex flex-wrap gap-x-4 gap-y-2 text-white/85 text-sm">
              <a href="#what" className="hover:underline">• {S.what}</a>
              <a href="#use" className="hover:underline">• {S.use}</a>
              <a href="#cookies" className="hover:underline">• {S.cookies}</a>
              <a href="#share" className="hover:underline">• {S.share}</a>
              <a href="#rights" className="hover:underline">• {S.rights}</a>
              <a href="#retention" className="hover:underline">• {S.retention}</a>
              <a href="#minors" className="hover:underline">• {S.minors}</a>
              <a href="#changes" className="hover:underline">• {S.changes}</a>
              <a href="#contact" className="hover:underline">• {S.contact}</a>
            </nav>
          </div>

          {/* Sections */}
          <section id="what" className="mt-8">
            <h2 className="text-xl font-bold">{S.what}</h2>
            <ul className="mt-3 space-y-2 text-white/90">
              {t.whatList.map((item, i) => (
                <li key={i} className="flex gap-3">
                  <span className="mt-2 inline-block h-1.5 w-1.5 rounded-full bg-brand-235" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </section>

          <section id="use" className="mt-8">
            <h2 className="text-xl font-bold">{S.use}</h2>
            <ul className="mt-3 space-y-2 text-white/90">
              {t.useList.map((item, i) => (
                <li key={i} className="flex gap-3">
                  <span className="mt-2 inline-block h-1.5 w-1.5 rounded-full bg-brand-235" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </section>

          <section id="cookies" className="mt-8">
            <h2 className="text-xl font-bold">{S.cookies}</h2>
            <p className="mt-3 text-white/90">{t.cookiesP1}</p>
            <p className="mt-2 text-white/90">{t.cookiesP2}</p>
          </section>

          <section id="share" className="mt-8">
            <h2 className="text-xl font-bold">{S.share}</h2>
            <ul className="mt-3 space-y-2 text-white/90">
              {t.shareList.map((item, i) => (
                <li key={i} className="flex gap-3">
                  <span className="mt-2 inline-block h-1.5 w-1.5 rounded-full bg-brand-235" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </section>

          <section id="rights" className="mt-8">
            <h2 className="text-xl font-bold">{S.rights}</h2>
            <p className="mt-3 text-white/90">
              {isSr
                ? "U skladu sa važećim propisima o zaštiti podataka (npr. GDPR kada je primenljiv), imate sledeća prava:"
                : "Under applicable data protection laws (e.g., GDPR where applicable), you have the following rights:"}
            </p>
            <ul className="mt-3 space-y-2 text-white/90">
              {t.rightsList.map((item, i) => (
                <li key={i} className="flex gap-3">
                  <span className="mt-2 inline-block h-1.5 w-1.5 rounded-full bg-brand-235" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </section>

          <section id="retention" className="mt-8">
            <h2 className="text-xl font-bold">{S.retention}</h2>
            <p className="mt-3 text-white/90">{t.retention}</p>
          </section>

          <section id="minors" className="mt-8">
            <h2 className="text-xl font-bold">{S.minors}</h2>
            <p className="mt-3 text-white/90">{t.minors}</p>
          </section>

          <section id="changes" className="mt-8">
            <h2 className="text-xl font-bold">{S.changes}</h2>
            <p className="mt-3 text-white/90">{t.changes}</p>
          </section>

          <section id="contact" className="mt-8">
            <h2 className="text-xl font-bold">{S.contact}</h2>
            <p className="mt-3 text-white/90">
              {t.contact}{" "}
              <a href={`mailto:${email}`} className="underline hover:no-underline">
                {email}
              </a>
            </p>
          </section>

          {/* CTA */}
          <div className="mt-10 flex flex-wrap items-center gap-3">
            <Link
              href="/"
              className="rounded-full bg-brand-235 text-white px-5 py-2.5 font-semibold hover:brightness-110 transition"
            >
              {t.back}
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
