"use client";

import Image from "next/image";
import Link from "next/link";
import { useContext } from "react";
import { LanguageContext } from "@/app/context/LanguageContext";

import { FaInstagram, FaFacebookF, FaYoutube } from "react-icons/fa";
import { SiTiktok } from "react-icons/si";
import { FiPhone, FiMail, FiMapPin } from "react-icons/fi";

import { CONTACT, SOCIAL_LINKS, HOURS, LOCATION, type SocialKind } from "@/app/data/site";

const ICONS: Record<SocialKind, React.ComponentType<{ className?: string }>> = {
  instagram: FaInstagram,
  facebook: FaFacebookF,
  tiktok: SiTiktok,
  youtube: FaYoutube,
};

const SOCIAL_LABEL: Record<SocialKind, string> = {
  instagram: "Instagram",
  facebook: "Facebook",
  tiktok: "TikTok",
  youtube: "YouTube",
};

export default function Footer() {
  const { language } = useContext(LanguageContext);
  const isSr = language === "sr";
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-black/10 bg-white/80 backdrop-blur-sm">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
        {/* 4 kolone */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          {/* 1) Brending + društvene mreže */}
          <div>
            <Link href="/#home" className="inline-flex items-center gap-3">
              <Image
                src="/images/logo-colors.png"
                alt="Iluzionarijum logo"
                width={160}
                height={48}
                className="h-10 w-auto object-contain"
                priority
              />
            </Link>
            <p className="mt-4 text-primary/70 text-sm leading-relaxed">
              {isSr
                ? "Interaktivne iluzije i vizuelne zagonetke za sve uzraste — na Zlatiboru i online."
                : "Interactive illusions and visual brain teasers for all ages — in Zlatibor and online."}
            </p>

            <div className="mt-5 flex items-center gap-3">
              {SOCIAL_LINKS.map(({ kind, href }) => {
                const Icon = ICONS[kind];
                const label = SOCIAL_LABEL[kind];
                return (
                  <a
                    key={kind}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={label}
                    title={label}
                    className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-black/10 bg-white/70 text-primary hover:bg-accent-1/60"
                  >
                    <Icon className="h-5 w-5" />
                    <span className="sr-only">{label}</span>
                  </a>
                );
              })}
            </div>
          </div>

          {/* 2) Brze veze */}
          <div>
            <h3 className="text-primary font-extrabold text-lg">
              {isSr ? "Brze veze" : "Quick links"}
            </h3>
            <ul className="mt-4 space-y-2 text-primary/80">
              <LiLink href="/#home" label={isSr ? "Početna" : "Home"} />
              <LiLink href="/#about" label={isSr ? "O nama" : "About"} />
              {/* prilagodi ovde stvarne rute u projektu */}
              <LiLink href="/illusions" label={isSr ? "Iluzije" : "Illusions"} />
              <LiLink href="/pricing" label={isSr ? "Cenovnik" : "Pricing"} />
              <LiLink href="/contact" label={isSr ? "Kontakt" : "Contact"} />
            </ul>
          </div>

          {/* 3) Radno vreme + lokacija */}
          <div>
            <h3 className="text-primary font-extrabold text-lg">
              {isSr ? "Radno vreme" : "Opening hours"}
            </h3>
            <ul className="mt-4 space-y-1.5 text-primary/80 text-sm">
              <li>
                {isSr ? "Ponedeljak – Petak" : "Mon–Fri"}:{" "}
                {HOURS.weekdays.open}–{HOURS.weekdays.close}
              </li>
              <li>
                {isSr ? "Subota – Nedelja" : "Sat–Sun"}:{" "}
                {HOURS.weekends.open}–{HOURS.weekends.close}
              </li>
              <li className="text-primary/60">
                {isSr
                  ? `Poslednji ulaz ${HOURS.lastEntryMinutesBeforeClose} min pre zatvaranja.`
                  : `Last entry ${HOURS.lastEntryMinutesBeforeClose} min before close.`}
              </li>
            </ul>

            <h3 className="mt-6 text-primary font-extrabold text-lg">
              {isSr ? "Lokacija" : "Location"}
            </h3>

            <address className="not-italic mt-3 text-primary/80 text-sm leading-relaxed">
              <a
                href={LOCATION.mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 hover:text-primary"
                title={isSr ? "Otvori na Google mapama" : "Open in Google Maps"}
              >
                <FiMapPin className="h-4 w-4" />
                <span className="underline decoration-dotted">
                  {LOCATION.name}
                </span>
              </a>
              <br />
              {LOCATION.addressLines.map((line) => (
                <span key={line}>
                  {line}
                  <br />
                </span>
              ))}
            </address>
          </div>

          {/* 4) Kontakt + “newsletter” */}
          <div>
            <h3 className="text-primary font-extrabold text-lg">
              {isSr ? "Kontakt" : "Contact"}
            </h3>
            <ul className="mt-4 space-y-2 text-primary/80 text-sm">
              <li className="flex items-center gap-2">
                <FiPhone className="h-4 w-4" />
                <a className="hover:text-primary" href={CONTACT.phoneHref}>
                  {CONTACT.phoneDisplay}
                </a>
              </li>
              <li className="flex items-center gap-2">
                <FiMail className="h-4 w-4" />
                <a className="hover:text-primary" href={`mailto:${CONTACT.email}`}>
                  {CONTACT.email}
                </a>
              </li>
            </ul>

            <h4 className="mt-6 text-primary font-bold">
              {isSr ? "Novosti i ponude" : "News & offers"}
            </h4>
            <form className="mt-3 flex items-center gap-2" onSubmit={(e) => e.preventDefault()}>
              <input
                type="email"
                required
                placeholder={isSr ? "Vaš email" : "Your email"}
                className="w-full rounded-xl border border-black/10 bg-white/70 px-3 py-2 text-sm text-primary outline-none focus:ring-2 focus:ring-accent-2/40"
              />
              <button
                type="submit"
                className="shrink-0 rounded-xl bg-accent-2 px-4 py-2 text-white text-sm font-semibold hover:brightness-110"
              >
                {isSr ? "Prijavi" : "Subscribe"}
              </button>
            </form>
            <p className="mt-2 text-xs text-primary/60">
              {isSr
                ? "Možete se odjaviti u svakom trenutku."
                : "You can unsubscribe at any time."}
            </p>
          </div>
        </div>

        {/* Donja traka */}
        <div className="mt-10 border-t border-black/10 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-primary/70">
            © {year} Iluzionarijum. {isSr ? "Sva prava zadržana." : "All rights reserved."}
          </p>
          <nav className="flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-primary/70">
            <Link className="hover:text-primary" href="/terms">
              {isSr ? "Uslovi korišćenja" : "Terms"}
            </Link>
            <Link className="hover:text-primary" href="/privacy">
              {isSr ? "Politika privatnosti" : "Privacy"}
            </Link>
            <Link className="hover:text-primary" href="/FAQ">
              {isSr ? "FAQ" : "FAQ"}
            </Link>
            <Link className="hover:text-primary" href="/sitemap">
              {isSr ? "Mapa sajta" : "Sitemap"}
            </Link>
          </nav>
        </div>
      </div>
    </footer>
  );
}

/* Helpers */
function LiLink({ href, label }: { href: string; label: string }) {
  return (
    <li>
      <Link href={href} className="hover:text-primary">
        {label}
      </Link>
    </li>
  );
}
