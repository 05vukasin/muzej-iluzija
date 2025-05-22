"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { useContext } from "react";
import { LanguageContext } from "../layout"; // Import konteksta

const backgroundImage = "/oko.jpg";

const Hero = () => {
  const { language } = useContext(LanguageContext); // Dobijamo jezik iz konteksta

  return (
    <section id="home" className="relative h-screen flex items-center justify-center text-center text-white">
      {/* Pozadinska slika */}
      <div className="absolute inset-0">
        <Image src={backgroundImage} alt="Dino Park" fill style={{ objectFit: "cover" }} quality={100} />
      </div>

      {/* Tekst sa senkom */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="relative z-10 px-6"
      >
       <h1 className="text-4xl md:text-6xl font-bold drop-shadow-[0_5px_15px_rgba(0,0,0,1)]">
  {language === "sr" ? "Dobrodošli u " : "Welcome to "}<br></br>
  <motion.span
    className="text-5xl md:text-7xl font-extrabold bg-gradient-to-r from-green-400 to-green-600 text-transparent bg-clip-text"
    initial={{ scale: 0.9 }}
    animate={{ scale: 1 }}
    transition={{ duration: 0.8, ease: "easeOut" }}
  >
    {language === "sr" ? "DINO PARK" : "DINO PARK"}
  </motion.span>
</h1>


<p className="mt-4 text-lg md:text-xl drop-shadow-[0_4px_10px_rgba(0,0,0,0.9)]">
  {language === "sr" ? "Najveći zabavno-edukativni park na Balkanu!" : "The largest educational and entertainment park in the Balkans!"}
</p>

       
        <motion.a
  href="shop"
  className="mt-5 inline-block bg-green-500 text-white font-bold py-3 px-6 text-2xl rounded-lg shadow-lg transition"
  animate={{ scale: [1, 1.1, 1] }} // Efekat laganog povećanja i smanjivanja
  transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }} // Polako menja veličinu u loop-u
>
  {language === "sr" ? "Shop" : "Shop"}
</motion.a>

      </motion.div>
    </section>
  );
};

export default Hero;
