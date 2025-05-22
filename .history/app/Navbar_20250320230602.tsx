"use client";

import { useEffect, useState, useContext } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { LanguageContext } from "./layout"; // Uvoz konteksta jezika

const Navbar = () => {
  const { language, setLanguage } = useContext(LanguageContext); // Dobijamo globalni jezik
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Dodajemo `overflow-hidden` na <body> kada je meni otvoren
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "auto";
  }, [menuOpen]);

  const changeLanguage = () => {
    setLanguage(language === "sr" ? "en" : "sr");
  };

  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        scrolled ? "bg-black/80 backdrop-blur-md shadow-lg" : "bg-black"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center py-4">
        {/* Logo */}
        <Link href="#home">
          <Image
            src="/logo.png"
            alt="DinoPark Logo"
            width={60}
            height={30}
            className="cursor-pointer transform transition duration-300 hover:scale-110"
          />
        </Link>

        {/* Desktop Menu */}
        <nav className="hidden md:flex space-x-8 text-white font-semibold text-lg ml-auto">
          {[
            { name: "O nama", id: "about" },
            { name: "Galerija", id: "gallery" },
            { name: "Kontakt", id: "contact" },
            { name: "Aktivnosti", id: "activities" },
          ].map((item, index) => (
            <a
              key={index}
              href={`#${item.id}`}
              className="relative group overflow-hidden"
            >
              <span className="group-hover:text-green-400 transition">
                {language === "sr"
                  ? item.name
                  : ["About", "Gallery", "Contact", "Activities"][index]}
              </span>
              <span className="absolute bottom-0 left-0 w-full h-0.5 bg-green-400 scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></span>
            </a>
          ))}
        </nav>

        {/* Language Toggle (samo za desktop) */}
        <div className="hidden md:flex ml-6 space-x-4">
          <button onClick={changeLanguage}>
            {language === "sr" ? (
              <Image
                src="/uk-flag.png"
                alt="EN"
                width={30}
                height={20}
                className="rounded shadow-md hover:opacity-80 transition"
              />
            ) : (
              <Image
                src="/serbia-flag.png"
                alt="SR"
                width={30}
                height={20}
                className="rounded shadow-md hover:opacity-80 transition"
              />
            )}
          </button>
        </div>

        {/* Mobile Menu Button (burger dugme) */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden text-white text-3xl z-100"
        >
          {menuOpen ? "✖" : "☰"}
        </button>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed top-0 left-0 w-full h-screen bg-black text-white flex flex-col items-center justify-center space-y-6 z-50 md:hidden"
        >
          {[
            { name: "O nama", id: "about" },
            { name: "Galerija", id: "gallery" },
            { name: "Kontakt", id: "contact" },
            { name: "Aktivnosti", id: "activities" },
          ].map((item, index) => (
            <a
              key={index}
              href={`#${item.id}`}
              className="text-xl hover:text-green-400 transition"
              onClick={() => setMenuOpen(false)} // Zatvori meni nakon klika
            >
              {language === "sr"
                ? item.name
                : ["About", "Gallery", "Contact", "Activities"][index]}
            </a>
          ))}

          {/* Language Toggle u mobilnom meniju */}
          <button onClick={changeLanguage} className="mt-4">
            {language === "sr" ? (
              <Image
                src="/uk-flag.png"
                alt="EN"
                width={30}
                height={20}
                className="rounded shadow-md hover:opacity-80 transition"
              />
            ) : (
              <Image
                src="/serbia-flag.png"
                alt="SR"
                width={30}
                height={20}
                className="rounded shadow-md hover:opacity-80 transition"
              />
            )}
          </button>
        </motion.div>
      )}
    </header>
  );
};

export default Navbar;
