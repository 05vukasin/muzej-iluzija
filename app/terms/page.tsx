"use client";

import Link from "next/link";
import { useContext } from "react";
import { LanguageContext } from "@/app/context/LanguageContext";
import { CONTACT } from "@/app/data/site"; 

export default function TermsPage() {
  const { language } = useContext(LanguageContext);
  const isSr = language === "sr";

  const email = CONTACT.email;

  const t = {
    cat: isSr ? "Pravna dokumenta" : "Legal",
    title: isSr ? "Uslovi korišćenja" : "Terms of Service",
    updated: isSr ? "Ažurirano" : "Last updated",
    updatedDate: isSr ? "septembar 2025." : "September 2025",
    intro: isSr
      ? "Ovi Uslovi korišćenja predstavljaju pravno obavezujući sporazum između vas i Iluzionarijuma i primenjuju se na korišćenje našeg veb-sajta, online sadržaja i posete objektu. Korišćenjem sajta ili kupovinom/rezervacijom ulaznica prihvatate ove Uslove."
      : "These Terms of Service are a binding agreement between you and Iluzionarijum and apply to your use of our website, online content, and visits to our venue. By using the site or purchasing/booking tickets, you agree to these Terms.",
    quicknav: isSr ? "Brza navigacija" : "Quick navigation",
    sections: {
      scope: isSr ? "Opseg i prihvatanje" : "Scope & acceptance",
      changes: isSr ? "Izmene uslova" : "Changes to terms",
      tickets: isSr ? "Ulaznice i cene" : "Tickets & pricing",
      bookings: isSr ? "Rezervacije i otkazivanja" : "Bookings & cancellations",
      rules: isSr ? "Pravila posete i bezbednost" : "Venue rules & safety",
      minors: isSr ? "Uzrast i maloletnici" : "Age & minors",
      ip: isSr ? "Intelektualna svojina" : "Intellectual property",
      conduct: isSr ? "Prihvatljivo korišćenje" : "Acceptable use",
      third: isSr ? "Linkovi ka trećim stranama" : "Third-party links",
      disclaimers: isSr ? "Odricanje odgovornosti i ograničenja" : "Disclaimers & limitations",
      privacy: isSr ? "Privatnost" : "Privacy",
      law: isSr ? "Merodavno pravo i sporovi" : "Governing law & disputes",
      contact: isSr ? "Kontakt" : "Contact",
    },
    scopeList: isSr
      ? [
          "Ovi Uslovi važe za sajt, sadržaj, online kupovine/rezervacije i fizičke posete.",
          "Ako se ne slažete sa Uslovima, molimo da ne koristite sajt i ne vršite kupovine.",
          "Uslovi se primenjuju zajedno sa drugim pravilima objavljenim na sajtu (npr. Politika privatnosti).",
        ]
      : [
          "These Terms govern the website, content, online purchases/bookings, and in-venue visits.",
          "If you do not agree, please refrain from using the site and from making purchases.",
          "These Terms apply alongside other posted policies (e.g., Privacy Policy).",
        ],
    changesP:
      isSr
        ? "Možemo povremeno izmeniti Uslove. Izmene stupaju na snagu objavljivanjem na ovoj stranici, uz ažuriran datum. Nastavkom korišćenja prihvatate revidirane Uslove."
        : "We may update these Terms from time to time. Changes take effect upon posting here with an updated date. Continued use means you accept the revised Terms.",
    ticketsList: isSr
      ? [
          "Cene su prikazane u trenutku kupovine i mogu se menjati bez prethodne najave.",
          "Online plaćanja obavlja ovlašćeni procesor – Iluzionarijum ne čuva podatke o platnim karticama.",
          "Ulaznice su važeće za naznačeni datum/termin i ne mogu se preprodavati.",
        ]
      : [
          "Prices are shown at checkout and may change without prior notice.",
          "Online payments are processed by an authorized provider — we do not store card details.",
          "Tickets are valid for the indicated date/time and are non-transferable.",
        ],
    bookingsList: isSr
      ? [
          "Otkazivanje/izmena rezervacije mogući su u skladu sa informacijama datim tokom kupovine.",
          "Kašnjenja mogu dovesti do skraćenog obilaska ili premeštanja termina, u zavisnosti od raspoloživosti.",
          "Povraćaji sredstava, ako su primenljivi, sprovode se putem istog kanala plaćanja.",
        ]
      : [
          "Cancellation/changes are available per the conditions shown during purchase.",
          "Late arrivals may result in shortened visits or rescheduling subject to availability.",
          "Refunds, where applicable, are processed via the original payment method.",
        ],
    rulesList: isSr
      ? [
          "Pratite uputstva osoblja; zadržavamo pravo da odbijemo ulaz ili udaljimo posetioce koji krše pravila.",
          "Zabranjeno je ponašanje koje ugrožava bezbednost, imovinu ili druge posetioce.",
          "Određene instalacije mogu imati starosna/visinska ograničenja; pristup je na sopstvenu odgovornost.",
          "Fotografisanje je dozvoljeno za ličnu upotrebu, osim ako je drugačije naznačeno.",
        ]
      : [
          "Follow staff instructions; we may refuse entry or remove visitors who violate rules.",
          "No behavior that risks safety, property, or disturbs other visitors.",
          "Some installations may have age/height limits; entry at your own risk.",
          "Personal photography is allowed unless otherwise indicated.",
        ],
    minorsP:
      isSr
        ? "Deca i maloletnici trebalo bi da budu u pratnji roditelja/staratelja. Organizovane grupe moraju imati odgovorno lice punoletno."
        : "Children and minors should be accompanied by a parent/guardian. Organized groups must have an adult supervisor.",
    ipList: isSr
      ? [
          "Sadržaj sajta (tekstovi, grafika, fotografije, video, kod) zaštićen je pravima intelektualne svojine.",
          "Dozvoljeno je lično, nekomercijalno korišćenje; svako drugo korišćenje zahteva našu prethodnu pisanu saglasnost.",
        ]
      : [
          "Site content (texts, graphics, photos, video, code) is protected by IP rights.",
          "Personal, non-commercial use only; other uses require our prior written consent.",
        ],
    conductList: isSr
      ? [
          "Zabranjeno je narušavanje sigurnosti sistema, pokušaji neovlašćenog pristupa ili ometanje sajta.",
          "Ne šaljite nezakonit, uvredljiv, preteći ili obmanjujući sadržaj.",
          "Ne prenosite viruse, zlonamerni kod ili automatizovane skripte koje opterećuju sajt.",
        ]
      : [
          "Do not compromise security, attempt unauthorized access, or disrupt the site.",
          "Do not submit unlawful, offensive, threatening, or deceptive content.",
          "Do not transmit malware or use automated scripts to overload the site.",
        ],
    thirdP:
      isSr
        ? "Linkovi ka sajtovima trećih lica su radi pogodnosti. Ne snosimo odgovornost za njihov sadržaj ili prakse privatnosti."
        : "Third-party links are provided for convenience. We are not responsible for their content or privacy practices.",
    disclaimersList: isSr
      ? [
          "Sajt i sadržaj pružaju se „takvi kakvi jesu“, bez izričitih ili prećutnih garancija.",
          "U meri koju dozvoljava zakon, isključujemo odgovornost za indirektnu/posledičnu štetu, gubitak dobiti ili podataka.",
          "Ništa ovde ne utiče na prava potrošača koja se zakonom ne mogu isključiti.",
        ]
      : [
          "The site and content are provided “as is” without express or implied warranties.",
          "To the extent permitted by law, we exclude liability for indirect/consequential loss, lost profit or data.",
          "Nothing here affects consumer rights that cannot be excluded by law.",
        ],
    privacyP: isSr
      ? "Za informacije o tome kako prikupljamo i obrađujemo lične podatke, pogledajte našu "
      : "For details on how we collect and process personal data, see our ",
    lawP:
      isSr
        ? "Na ove Uslove primenjuje se pravo Republike Srbije. Za sporove su nadležni sudovi prema sedištu Iluzionarijuma, osim ako je obavezno drugačije propisano."
        : "These Terms are governed by the laws of the Republic of Serbia. Courts at Iluzionarijum’s seat have jurisdiction unless mandatory law provides otherwise.",
    contactP: isSr
      ? "Za pitanja u vezi sa ovim Uslovima, pišite nam:"
      : "For any questions about these Terms, contact us:",
    back: isSr ? "Nazad na početnu" : "Back home",
    privacy: isSr ? "Politika privatnosti" : "Privacy Policy",
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
              <a href="#scope" className="hover:underline">• {S.scope}</a>
              <a href="#changes" className="hover:underline">• {S.changes}</a>
              <a href="#tickets" className="hover:underline">• {S.tickets}</a>
              <a href="#bookings" className="hover:underline">• {S.bookings}</a>
              <a href="#rules" className="hover:underline">• {S.rules}</a>
              <a href="#minors" className="hover:underline">• {S.minors}</a>
              <a href="#ip" className="hover:underline">• {S.ip}</a>
              <a href="#conduct" className="hover:underline">• {S.conduct}</a>
              <a href="#third" className="hover:underline">• {S.third}</a>
              <a href="#disclaimers" className="hover:underline">• {S.disclaimers}</a>
              <a href="#privacy" className="hover:underline">• {S.privacy}</a>
              <a href="#law" className="hover:underline">• {S.law}</a>
              <a href="#contact" className="hover:underline">• {S.contact}</a>
            </nav>
          </div>

          {/* Sections */}
          <section id="scope" className="mt-8">
            <h2 className="text-xl font-bold">{S.scope}</h2>
            <ul className="mt-3 space-y-2 text-white/90">
              {t.scopeList.map((item, i) => (
                <li key={i} className="flex gap-3">
                  <span className="mt-2 inline-block h-1.5 w-1.5 rounded-full bg-brand-235" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </section>

          <section id="changes" className="mt-8">
            <h2 className="text-xl font-bold">{S.changes}</h2>
            <p className="mt-3 text-white/90">{t.changesP}</p>
          </section>

          <section id="tickets" className="mt-8">
            <h2 className="text-xl font-bold">{S.tickets}</h2>
            <ul className="mt-3 space-y-2 text-white/90">
              {t.ticketsList.map((item, i) => (
                <li key={i} className="flex gap-3">
                  <span className="mt-2 inline-block h-1.5 w-1.5 rounded-full bg-brand-235" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </section>

          <section id="bookings" className="mt-8">
            <h2 className="text-xl font-bold">{S.bookings}</h2>
            <ul className="mt-3 space-y-2 text-white/90">
              {t.bookingsList.map((item, i) => (
                <li key={i} className="flex gap-3">
                  <span className="mt-2 inline-block h-1.5 w-1.5 rounded-full bg-brand-235" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </section>

          <section id="rules" className="mt-8">
            <h2 className="text-xl font-bold">{S.rules}</h2>
            <ul className="mt-3 space-y-2 text-white/90">
              {t.rulesList.map((item, i) => (
                <li key={i} className="flex gap-3">
                  <span className="mt-2 inline-block h-1.5 w-1.5 rounded-full bg-brand-235" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </section>

          <section id="minors" className="mt-8">
            <h2 className="text-xl font-bold">{S.minors}</h2>
            <p className="mt-3 text-white/90">{t.minorsP}</p>
          </section>

          <section id="ip" className="mt-8">
            <h2 className="text-xl font-bold">{S.ip}</h2>
            <ul className="mt-3 space-y-2 text-white/90">
              {t.ipList.map((item, i) => (
                <li key={i} className="flex gap-3">
                  <span className="mt-2 inline-block h-1.5 w-1.5 rounded-full bg-brand-235" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </section>

          <section id="conduct" className="mt-8">
            <h2 className="text-xl font-bold">{S.conduct}</h2>
            <ul className="mt-3 space-y-2 text-white/90">
              {t.conductList.map((item, i) => (
                <li key={i} className="flex gap-3">
                  <span className="mt-2 inline-block h-1.5 w-1.5 rounded-full bg-brand-235" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </section>

          <section id="third" className="mt-8">
            <h2 className="text-xl font-bold">{S.third}</h2>
            <p className="mt-3 text-white/90">{t.thirdP}</p>
          </section>

          <section id="disclaimers" className="mt-8">
            <h2 className="text-xl font-bold">{S.disclaimers}</h2>
            <ul className="mt-3 space-y-2 text-white/90">
              {t.disclaimersList.map((item, i) => (
                <li key={i} className="flex gap-3">
                  <span className="mt-2 inline-block h-1.5 w-1.5 rounded-full bg-brand-235" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </section>

          <section id="privacy" className="mt-8">
            <h2 className="text-xl font-bold">{S.privacy}</h2>
            <p className="mt-3 text-white/90">
              {t.privacyP}
              <Link href="/privacy" className="underline hover:no-underline">
                {t.privacy}
              </Link>
              .
            </p>
          </section>

          <section id="law" className="mt-8">
            <h2 className="text-xl font-bold">{S.law}</h2>
            <p className="mt-3 text-white/90">{t.lawP}</p>
          </section>

          <section id="contact" className="mt-8">
            <h2 className="text-xl font-bold">{S.contact}</h2>
            <p className="mt-3 text-white/90">
              {t.contactP}{" "}
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
