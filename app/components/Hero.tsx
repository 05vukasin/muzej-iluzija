"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { useContext } from "react";
import { LanguageContext } from "../context/LanguageContext";
import Lottie from "lottie-react";
import animationData from "@/public/dot.json"; // putanja iz public foldera

const backgroundImage = "/background.jpg";

const Hero = () => {
  const { language } = useContext(LanguageContext);

  return (
    <section
      id="home"
      className="relative h-screen flex items-center justify-center text-center text-white overflow-hidden"
    >
      {/* Pozadinska slika */}
      <div className="absolute inset-0 z-0">
        <Image
          src={backgroundImage}
          alt="Muzej Iluzija"
          fill
          style={{ objectFit: "cover" }}
          quality={100}
          priority
        />
        <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />
      </div>

      {/* 🎞️ Lottie animacija između pozadine i teksta */}
      <div className="absolute inset-0 z-10 pointer-events-none overflow-hidden">
        <div className="absolute w-[100%] h-[100%] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
          <Lottie
            animationData={animationData}
            loop
            autoplay
            className="w-full h-full"
          />
        </div>
      </div>

      {/* Tekst i dugme */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="relative z-20 px-6"
      >
        <h1 className="text-4xl md:text-6xl font-bold drop-shadow-[0_5px_15px_rgba(0,0,0,1)]">
          {language === "sr" ? "Dobrodošli u" : "Welcome to"}
          <br />
          <motion.span
            className="text-5xl md:text-7xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-[#892EFF] to-[#a566ff]"
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            {language === "sr" ? "Muzej Iluzija" : "Museum of Illusions"}
          </motion.span>
        </h1>

        <p className="mt-4 text-lg md:text-xl drop-shadow-[0_4px_10px_rgba(0,0,0,0.9)] max-w-2xl mx-auto">
          {language === "sr"
            ? "Interaktivni svet optičkih iluzija, zagonetki i vizuelne zabave!"
            : "An interactive world of optical illusions, brain teasers and visual wonder!"}
        </p>

        <motion.a
          href="/iluzije"
          className="mt-6 inline-block bg-[#892EFF] hover:bg-[#a566ff] transition text-white font-bold py-4 px-8 text-xl rounded-full shadow-[0_0_30px_#892EFF]"
          animate={{ scale: [1, 1.05, 1] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
        >
          {language === "sr" ? "Pogledaj iluzije" : "Explore Illusions"}
        </motion.a>
      </motion.div>
    </section>
  );
};

export default Hero;
