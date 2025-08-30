// app/components/Footer.tsx
"use client";

import Image from "next/image";
import Link from "next/link";
import { useContext } from "react";
import { LanguageContext } from "@/app/context/LanguageContext";

// React Icons
import { FaInstagram, FaFacebookF, FaYoutube } from "react-icons/fa";
import { SiTiktok } from "react-icons/si";
import { FiPhone, FiMail } from "react-icons/fi";

export default function Footer() {
  const { language } = useContext(LanguageContext);
  const t = (sr: string, en: string) => (language === "sr" ? sr : en);
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
              {t(
                "Interaktivne iluzije i vizuelne zagonetke za sve uzraste — na Zlatiboru i online.",
                "Interactive illusions and visual brain teasers for all ages — in Zlatibor and online."
              )}
            </p>

            <div className="mt-5 flex items-center gap-3">
              <SocialLink href="https://instagram.com/" label="Instagram">
                <FaInstagram className="h-5 w-5" />
              </SocialLink>
              <SocialLink href="https://facebook.com/" label="Facebook">
                <FaFacebookF className="h-5 w-5" />
              </SocialLink>
              <SocialLink href="https://tiktok.com/" label="TikTok">
                <SiTiktok className="h-5 w-5" />
              </SocialLink>
              <SocialLink href="https://youtube.com/" label="YouTube">
                <FaYoutube className="h-5 w-5" />
              </SocialLink>
            </div>
          </div>

          {/* 2) Brze veze */}
          <div>
            <h3 className="text-primary font-extrabold text-lg">
              {t("Brze veze", "Quick links")}
            </h3>
            <ul className="mt-4 space-y-2 text-primary/80">
              <LiLink href="/#home" label={t("Početna", "Home")} />
              <LiLink href="/#about" label={t("O nama", "About")} />
              <LiLink href="/iluzije" label={t("Iluzije", "Illusions")} />
              <LiLink href="/cenovnik" label={t("Cenovnik", "Pricing")} />
              <LiLink href="/contact" label={t("Kontakt", "Contact")} />
            </ul>
          </div>

          {/* 3) Radno vreme + lokacija */}
          <div>
            <h3 className="text-primary font-extrabold text-lg">
              {t("Radno vreme", "Opening hours")}
            </h3>
            <ul className="mt-4 space-y-1.5 text-primary/80 text-sm">
              <li>{t("Ponedeljak – Petak: 10:00–20:00", "Mon–Fri: 10:00–20:00")}</li>
              <li>{t("Subota – Nedelja: 10:00–21:00", "Sat–Sun: 10:00–21:00")}</li>
              <li className="text-primary/60">
                {t("Poslednji ulaz 45 min pre zatvaranja.", "Last entry 45 min before close.")}
              </li>
            </ul>

            <h3 className="mt-6 text-primary font-extrabold text-lg">
              {t("Lokacija", "Location")}
            </h3>
            <address className="not-italic mt-3 text-primary/80 text-sm leading-relaxed">
              Iluzionarijum Zlatibor<br />
              Miladina Pećinara bb, 31315 Zlatibor, Srbija
            </address>
          </div>

          {/* 4) Kontakt + “newsletter” */}
          <div>
            <h3 className="text-primary font-extrabold text-lg">
              {t("Kontakt", "Contact")}
            </h3>
            <ul className="mt-4 space-y-2 text-primary/80 text-sm">
              <li className="flex items-center gap-2">
                <FiPhone className="h-4 w-4" />
                <a className="hover:text-primary" href="tel:+381641234567">
                  +381 64 123 4567
                </a>
              </li>
              <li className="flex items-center gap-2">
                <FiMail className="h-4 w-4" />
                <a className="hover:text-primary" href="mailto:info@iluzionarijum.rs">
                  info@iluzionarijum.rs
                </a>
              </li>
            </ul>

            <h4 className="mt-6 text-primary font-bold">
              {t("Novosti i ponude", "News & offers")}
            </h4>
            <form className="mt-3 flex items-center gap-2" onSubmit={(e) => e.preventDefault()}>
              <input
                type="email"
                required
                placeholder={t("Vaš email", "Your email")}
                className="w-full rounded-xl border border-black/10 bg-white/70 px-3 py-2 text-sm text-primary outline-none focus:ring-2 focus:ring-accent-2/40"
              />
              <button
                type="submit"
                className="shrink-0 rounded-xl bg-accent-2 px-4 py-2 text-white text-sm font-semibold hover:brightness-110"
              >
                {t("Prijavi", "Subscribe")}
              </button>
            </form>
            <p className="mt-2 text-xs text-primary/60">
              {t("Možete se odjaviti u svakom trenutku.", "You can unsubscribe at any time.")}
            </p>
          </div>
        </div>

        {/* Donja traka */}
        <div className="mt-10 border-t border-black/10 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-primary/70">
            © {year} Iluzionarijum. {t("Sva prava zadržana.", "All rights reserved.")}
          </p>
          <nav className="flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-primary/70">
            <Link className="hover:text-primary" href="/terms">
              {t("Uslovi korišćenja", "Terms")}
            </Link>
            <Link className="hover:text-primary" href="/privacy">
              {t("Politika privatnosti", "Privacy")}
            </Link>
            <Link className="hover:text-primary" href="/FAQ">
              {t("FAQ", "FAQ")}
            </Link>
            <Link className="hover:text-primary" href="/sitemap">
              {t("Mapa sajta", "Sitemap")}
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

function SocialLink({
  href,
  label,
  children,
}: {
  href: string;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-black/10 bg-white/70 text-primary hover:bg-accent-1/60"
      title={label}
    >
      {children}
      <span className="sr-only">{label}</span>
    </a>
  );
}
