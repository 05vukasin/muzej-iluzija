"use client";

import { useContext } from "react";
import Link from "next/link";
import { LanguageContext } from "@/app/context/LanguageContext";
import { CONTACT } from "@/app/data/site"; 

export default function FAQPage() {
  const { language } = useContext(LanguageContext);
  const isSr = language === "sr";

  const email = CONTACT.email;
  const phone = CONTACT.phoneDisplay;
  const phoneHref = CONTACT.phoneHref;

  const t = {
    cat: isSr ? "Pomoć i podrška" : "Help & Support",
    title: isSr ? "Česta pitanja" : "Frequently Asked Questions",
    updated: isSr ? "Ažurirano" : "Last updated",
    updatedDate: isSr ? "septembar 2025." : "September 2025",
    intro: isSr
      ? "Ovde su najčešća pitanja o ulaznicama, poseti, pravilima i pristupačnosti. Ako ne vidiš odgovor, piši nam — rado ćemo pomoći."
      : "Here are common questions about tickets, visits, policies, and accessibility. If you don’t see your answer, contact us — we’re happy to help.",
    quicknav: isSr ? "Brza navigacija" : "Quick navigation",
    back: isSr ? "Nazad na početnu" : "Back home",
    contact: isSr ? "Kontakt" : "Contact",

    sections: {
      visit: isSr ? "Planiranje posete" : "Planning your visit",
      tickets: isSr ? "Ulaznice i rezervacije" : "Tickets & reservations",
      accessibility: isSr ? "Pristupačnost" : "Accessibility",
      policies: isSr ? "Pravila i bezbednost" : "Policies & safety",
      online: isSr ? "Online sadržaj" : "Online content",
    },

    faqs: {
      visit: [
        {
          q: isSr ? "Gde se nalazite i kako da vas nađem?" : "Where are you located and how do I find you?",
          a: isSr
            ? "Na Zlatiboru, Miladina Pećinara bb (31315). Prati putokaze ka centru i Parking-kulama; Iluzionarijum je na par minuta hoda."
            : "In Zlatibor, Miladina Pećinara bb (31315). Follow signs to the center & Parking towers; Iluzionarijum is a short walk away.",
        },
        {
          q: isSr ? "Koliko traje obilazak?" : "How long does a visit take?",
          a: isSr
            ? "Prosečno 45–60 minuta, u zavisnosti od gužve i koliko se zadržiš na interaktivnim instalacijama."
            : "On average 45–60 minutes, depending on crowd levels and how long you engage with the exhibits.",
        },
        {
          q: isSr ? "Da li je potrebna unapred rezervacija?" : "Do I need to book in advance?",
          a: isSr
            ? "Preporučujemo online kupovinu/rezervaciju u sezoni i vikendom. Radnim danima uglavnom ima mesta i bez rezervacije."
            : "We recommend booking online during peak season and weekends. On weekdays, walk-ins are usually fine.",
        },
        {
          q: isSr ? "Da li imate parking?" : "Is parking available?",
          a: isSr
            ? "U blizini se nalaze javne garaže i parking-mesta. Preporučujemo da računaš par minuta pešačenja."
            : "Public garages and street parking are nearby. Expect a short walk to the venue.",
        },
      ],

      tickets: [
        {
          q: isSr ? "Kako kupujem ulaznice?" : "How do I buy tickets?",
          a: isSr
            ? "Online (preporučeno) ili na licu mesta karticom/gotovinom. Cene i popuste vidiš na stranici Cenovnik."
            : "Online (recommended) or on-site (card/cash). See prices and discounts on the Pricing page.",
        },
        {
          q: isSr ? "Da li imate porodične/grupne popuste?" : "Do you offer family/group discounts?",
          a: isSr
            ? "Da, nudimo porodične pakete i popuste za grupe (10+ posetilaca). Piši nam za organizovane posete i termine."
            : "Yes — family bundles and group discounts (10+). Contact us for school/camp bookings.",
        },
        {
          q: isSr ? "Mogu li da otkažem ili promenim termin?" : "Can I cancel or reschedule?",
          a: isSr
            ? "Moguće je u skladu sa uslovima prikazanim tokom kupovine. Ako zapne, javi nam se mejlom."
            : "Yes, per the conditions shown at checkout. If you need help, email us.",
        },
        {
          q: isSr ? "Da li vraćate novac?" : "Do you issue refunds?",
          a: isSr
            ? "Ako je predviđeno uslovima kupovine — povraćaj ide istim kanalom plaćanja. U suprotnom, nudimo zamenu termina."
            : "Where applicable per your purchase terms — refunds are issued to the original payment method. Otherwise, we offer rescheduling.",
        },
      ],

      accessibility: [
        {
          q: isSr ? "Da li je prostor pristupačan za kolica?" : "Is the venue wheelchair accessible?",
          a: isSr
            ? "Glavne prostorije su bez stepenika; osoblje pomaže oko rampi po potrebi. Ako imaš specifična pitanja — piši nam."
            : "Main areas are step-free; staff can assist with ramps if needed. For specific needs, please contact us.",
        },
        {
          q: isSr ? "Da li je sadržaj pogodan za decu?" : "Is it suitable for children?",
          a: isSr
            ? "Apsolutno — preporuka 5+ godina. Za mlađe, praćenje odrasle osobe je obavezno."
            : "Absolutely — recommended 5+. Younger children must be accompanied by an adult.",
        },
        {
          q: isSr ? "Da li postoje svetlosni/glasni efekti?" : "Are there intense light/sound effects?",
          a: isSr
            ? "Neke instalacije sadrže treperenje i glasnije efekte. Ako si osetljiv/a, pitaj osoblje da te uputi na blaže zone."
            : "Some exhibits include flicker and louder effects. If sensitive, ask staff to direct you to gentler areas.",
        },
      ],

      policies: [
        {
          q: isSr ? "Da li smem da fotografišem?" : "Can I take photos?",
          a: isSr
            ? "Da, za ličnu upotrebu. Molimo bez blica gde je označeno i poštuj privatnost ostalih posetilaca."
            : "Yes, for personal use. Please avoid flash where indicated and respect other visitors’ privacy.",
        },
        {
          q: isSr ? "Da li smem kućne ljubimce?" : "Are pets allowed?",
          a: isSr
            ? "Mali, mirni ljubimci u transporteru su dozvoljeni. Vodi psiće ne uvodimo zbog gužve i osetljive opreme."
            : "Small calm pets in carriers are allowed. Leashed pets are discouraged due to crowds and sensitive equipment.",
        },
        {
          q: isSr ? "Šta ako zakasnim?" : "What if I’m late?",
          a: isSr
            ? "Pokušaćemo da te ubacimo u sledeći slobodan slot; obilazak može biti skraćen u zavisnosti od gužve."
            : "We’ll try to slot you into the next available entry; your visit might be shortened depending on capacity.",
        },
        {
          q: isSr ? "Gde prijavljujem izgubljene stvari?" : "How do I report lost items?",
          a: isSr
            ? "Odmah se javi osoblju na info-pultu ili pošalji mejl na info@iluzionarijum.rs sa opisom predmeta i vremenom posete."
            : "Tell staff at the info desk or email info@iluzionarijum.rs with a description and your visit time.",
        },
      ],

      online: [
        {
          q: isSr ? "Da li imate online iluzije i materijale?" : "Do you offer online illusions/resources?",
          a: isSr
            ? "Da — pogledaј našu stranicu Iluzije. Redovno dodajemo nove interaktivne primere, GIF-ove i uputstva za eksperimente kod kuće."
            : "Yes — check our Illusions page. We regularly add new interactive demos, GIFs, and at-home experiments.",
        },
        {
          q: isSr ? "Mogu li da delim vaš sadržaj?" : "Can I share your content?",
          a: isSr
            ? "Slobodno podeli uz navođenje izvora i link ka našem sajtu. Za komercijalnu upotrebu, kontaktiraj nas."
            : "Feel free to share with attribution and a link to our site. For commercial use, please contact us.",
        },
      ],
    },
  };

  const S = t.sections;

  return (
    <main className="px-4 sm:px-6 lg:px-8 py-10">
      <div className="mx-auto max-w-4xl">
        <div className="rounded-2xl bg-black/65 backdrop-blur-md text-white shadow-2xl ring-1 ring-white/10 p-6 sm:p-8 lg:p-10">
          {/* Header */}
          <p className="text-xs uppercase tracking-wider text-white/70">{t.cat}</p>
          <h1 className="mt-1 text-3xl md:text-4xl font-black tracking-tight">🙋 {t.title}</h1>
          <p className="mt-2 text-sm text-white/70">
            {t.updated}: {t.updatedDate}
          </p>
          <p className="mt-4 text-white/90 leading-relaxed">{t.intro}</p>

          {/* Quick nav */}
          <div className="mt-6 rounded-lg bg-white/5 ring-1 ring-white/10 p-4">
            <p className="font-semibold">{t.quicknav}</p>
            <nav className="mt-2 flex flex-wrap gap-x-4 gap-y-2 text-white/85 text-sm">
              <a href="#visit" className="hover:underline">• {S.visit}</a>
              <a href="#tickets" className="hover:underline">• {S.tickets}</a>
              <a href="#accessibility" className="hover:underline">• {S.accessibility}</a>
              <a href="#policies" className="hover:underline">• {S.policies}</a>
              <a href="#online" className="hover:underline">• {S.online}</a>
            </nav>
          </div>

          {/* Sections */}
          <FAQSection id="visit" title={S.visit} items={t.faqs.visit} />
          <FAQSection id="tickets" title={S.tickets} items={t.faqs.tickets} />
          <FAQSection id="accessibility" title={S.accessibility} items={t.faqs.accessibility} />
          <FAQSection id="policies" title={S.policies} items={t.faqs.policies} />
          <FAQSection id="online" title={S.online} items={t.faqs.online} />

          {/* Contact */}
          <div className="mt-10 rounded-xl bg-white/5 ring-1 ring-white/10 p-4 sm:p-5">
            <h2 className="text-lg font-bold">{t.contact}</h2>
            <p className="mt-2 text-white/90">
              Email:{" "}
              <a href={`mailto:${email}`} className="underline hover:no-underline">
                {email}
              </a>{" "}
              · Tel:{" "}
              <a href={`tel:${phone.replace(/\s+/g, "")}`} className="underline hover:no-underline">
                {phone}
              </a>
            </p>
          </div>

          {/* CTA */}
          <div className="mt-8 flex flex-wrap items-center gap-3">
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

/* Helpers */
function FAQSection({
  id,
  title,
  items,
}: {
  id: string;
  title: string;
  items: { q: string; a: string }[];
}) {
  return (
    <section id={id} className="mt-8">
      <h2 className="text-xl font-bold">{title}</h2>
      <div className="mt-4 divide-y divide-white/10 rounded-xl ring-1 ring-white/10 bg-white/5">
        {items.map((it, i) => (
          <details
            key={i}
            className="group open:bg-white/5 open:shadow-inner"
          >
            <summary className="cursor-pointer list-none px-4 py-3 sm:px-5 sm:py-4 flex items-start justify-between gap-4">
              <span className="font-semibold text-white/95">{it.q}</span>
              <span className="mt-1 shrink-0 rounded-full bg-white/10 text-white/80 px-2 py-0.5 text-xs group-open:rotate-180 transition">
                ▾
              </span>
            </summary>
            <div className="px-4 pb-4 sm:px-5 sm:pb-5 text-white/90 leading-relaxed">
              {it.a}
            </div>
          </details>
        ))}
      </div>
    </section>
  );
}
