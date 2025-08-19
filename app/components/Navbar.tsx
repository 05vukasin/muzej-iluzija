// components/Navbar.tsx
"use client";

import { useEffect, useState, useContext } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { LanguageContext } from "@/app/context/LanguageContext";

const links = [
  { nameSr: "Početna", nameEn: "Home", href: "/#home" },
  { nameSr: "Kontakt", nameEn: "Contact", href: "/#contact" },
];

export default function Navbar() {
  const { language, setLanguage } = useContext(LanguageContext);
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "auto";
  }, [menuOpen]);

  const navigateTo = (href: string) => {
    router.push(href);
    setMenuOpen(false);
  };

  const changeLanguage = () => setLanguage(language === "sr" ? "en" : "sr");

  return (
    <header
      className={[
        "fixed top-0 left-0 w-full z-[60] transition-all", // ↑ header iznad slide-overa
        "backdrop-blur-xl border-b",
        scrolled
          ? "bg-white/80 border-black/10 shadow-md"
          : "bg-white/60 border-black/10",
      ].join(" ")}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-14 md:h-16 items-center justify-between">
          {/* Logo: manji na telefonu, veći na desktopu */}
          <button
            onClick={() => navigateTo("/#home")}
            aria-label="Go home"
            className="shrink-0"
          >
            <Image
              src="/images/logo-colors.png"
              alt="Logo"
              width={140}
              height={40}
              priority
              className="h-7 w-auto sm:h-8 md:h-12 object-contain transition-transform hover:scale-[1.03]"
            />
          </button>

          {/* Desktop meni */}
          <nav className="hidden md:flex items-center gap-8">
            {links.map((item) => (
              <button
                key={item.href}
                onClick={() => navigateTo(item.href)}
                className="group relative text-primary/90 hover:text-primary font-medium"
              >
                <span>{language === "sr" ? item.nameSr : item.nameEn}</span>
                <span className="pointer-events-none absolute -bottom-1 left-0 h-0.5 w-0 bg-accent-2 transition-all duration-300 group-hover:w-full" />
              </button>
            ))}
            {/* Jezik (desktop) */}
            <button
              onClick={changeLanguage}
              className="flex items-center gap-2 rounded-full border border-black/10 px-3 py-1 text-sm text-primary hover:bg-accent-1/40"
              aria-label="Toggle language"
            >
              <Image
                src={
                  language === "sr"
                    ? "/images/uk-flag.png"
                    : "/images/serbia-flag.png"
                }
                alt={language === "sr" ? "English" : "Srpski"}
                width={16}
                height={12}
                className="h-3 w-auto"
              />
              {language === "sr" ? "EN" : "SR"}
            </button>
          </nav>

          {/* Mobile: jezik + hamburger */}
          <div className="md:hidden flex items-center gap-2">
            {/* Jezik (mobilni) sa zastavom PNG */}
            <button
              onClick={changeLanguage}
              aria-label={
                language === "sr" ? "Switch to English" : "Prebaci na srpski"
              }
              className="flex items-center gap-1 rounded-full border border-black/10 bg-white/70 shadow-sm px-2.5 py-1.5"
              title={
                language === "sr" ? "Switch to English" : "Prebaci na srpski"
              }
            >
              <Image
                src={
                  language === "sr"
                    ? "/images/uk-flag.png"
                    : "/images/serbia-flag.png"
                }
                alt={language === "sr" ? "English" : "Srpski"}
                width={18}
                height={12}
                className="h-3.5 w-auto"
              />
              <span className="text-xs text-primary">
                {language === "sr" ? "EN" : "SR"}
              </span>
            </button>

            {/* SVG hamburger sa animacijom — uvek iznad slide-overa */}
            <label className="hamburger z-[70]" aria-label="Open menu">
              <input
                type="checkbox"
                checked={menuOpen}
                onChange={() => setMenuOpen((v) => !v)}
                aria-checked={menuOpen}
                aria-controls="mobile-menu"
                aria-expanded={menuOpen}
              />
              <svg viewBox="0 0 32 32">
                <path
                  className="line line-top-bottom"
                  d="M27 10 13 10C10.8 10 9 8.2 9 6 9 3.5 10.8 2 13 2 15.2 2 17 3.8 17 6L17 26C17 28.2 18.8 30 21 30 23.2 30 25 28.2 25 26 25 23.8 23.2 22 21 22L7 22"
                />
                <path className="line" d="M7 16 27 16" />
              </svg>
            </label>
          </div>
        </div>
      </div>

      {/* Mobile slide-over meni: FULL SCREEN, beo, centriran; ulazi s desna */}
      <AnimatePresence>
        {menuOpen && (
          <motion.aside
            id="mobile-menu"
            role="dialog"
            aria-modal="true"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ duration: 0.35, ease: "easeOut" }}
            className="fixed inset-0 w-screen h-screen z-[50] bg-white md:hidden"
          >
            <div className="mx-auto flex h-full max-w-7xl flex-col justify-between">
              {/* Linkovi sa border-bottom */}
              <div className="flex flex-col items-center justify-center flex-1 w-full px-6">
                {links.map((item, idx) => (
                  <button
                    key={item.href}
                    onClick={() => navigateTo(item.href)}
                    className={`w-full text-center text-2xl text-primary hover:text-accent-2 font-semibold py-4 
                ${idx < links.length ? "border-b border-gray-200" : ""}`}
                  >
                    {language === "sr" ? item.nameSr : item.nameEn}
                  </button>
                ))}

                {/* Jezik unutar menija */}
                <button
                  onClick={changeLanguage}
                  className="mt-6 flex items-center gap-2 rounded-full border border-black/10 px-4 py-2 text-primary hover:bg-accent-1/60"
                >
                  <Image
                    src={
                      language === "sr"
                        ? "/images/uk-flag.png"
                        : "/images/serbia-flag.png"
                    }
                    alt={language === "sr" ? "English" : "Srpski"}
                    width={20}
                    height={14}
                    className="h-3.5 w-auto"
                  />
                  {language === "sr" ? "SR → EN" : "EN → SR"}
                </button>
                {/* Linija + Logo na dnu */}
              </div>
              <div className="w-full border-t border-gray-300 py-4 pb-20 flex justify-center">
                <Image
                  src="/images/logo-colors.png"
                  alt="Logo footer"
                  width={200} // fallback vrednost
                  height={70}
                  className="w-[80%] max-w-[280px] h-auto object-contain"
                />
              </div>
            </div>
          </motion.aside>
        )}
      </AnimatePresence>

      {/* Scoped CSS za hamburger */}
      <style jsx>{`
        .hamburger {
          cursor: pointer;
          display: grid;
          place-items: center;
          height: 40px;
          width: 40px;
          border-radius: 9999px;
          border: 1px solid rgba(0, 0, 0, 0.1);
          background: rgba(255, 255, 255, 0.7);
          box-shadow: 0 1px 2px rgba(0, 0, 0, 0.06);
        }
        .hamburger input {
          display: none;
        }
        .hamburger svg {
          height: 1.9em;
          transition: transform 600ms cubic-bezier(0.4, 0, 0.2, 1);
        }
        .line {
          fill: none;
          stroke: var(--color-primary);
          stroke-linecap: round;
          stroke-linejoin: round;
          stroke-width: 3;
          transition: stroke-dasharray 600ms cubic-bezier(0.4, 0, 0.2, 1),
            stroke-dashoffset 600ms cubic-bezier(0.4, 0, 0.2, 1);
        }
        .line-top-bottom {
          stroke-dasharray: 12 63;
        }
        .hamburger input:checked + svg {
          transform: rotate(-45deg);
        }
        .hamburger input:checked + svg .line-top-bottom {
          stroke-dasharray: 20 300;
          stroke-dashoffset: -32.42;
        }
      `}</style>
    </header>
  );
}
