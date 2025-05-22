"use client";

import { useContext } from "react";
import { LanguageContext } from "../context/LanguageContext";
import { motion } from "framer-motion";
import Image from "next/image";

const About = () => {
  const { language } = useContext(LanguageContext);

  return (
    <section
      id="about"
      className="relative bg-[var(--color-section)] text-white py-24 overflow-visible"
    >
      <div className="max-w-7xl mx-auto px-6 lg:flex lg:items-center relative z-10">
        {/* Tekst */}
        <motion.div
          className="lg:w-1/2"
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl text-gray-400 sm:text-5xl font-bold neon-title">
            {language === "sr" ? "O Muzeju Iluzija" : "About the Museum of Illusions"}
          </h2>
          <p className="text-lg mt-6 text-gray-900 leading-relaxed drop-shadow-lg">
            {language === "sr"
              ? "Muzej Iluzija je prostor gde se nauka susreće sa zabavom! Uronite u svet optičkih varki, interaktivnih soba i eksponata koji će vas navesti da preispitate stvarnost."
              : "The Museum of Illusions is where science meets fun! Step into a world of optical illusions, interactive rooms, and exhibits that will challenge your perception of reality."}
          </p>
        </motion.div>

        {/* Slika */}
        <motion.div
          className="lg:w-1/2 mt-10 lg:mt-0 flex justify-center lg:justify-end relative"
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}
        >
          <div className="relative w-full max-w-lg">
            <div className="absolute -inset-10 bg-[#892EFF] blur-[40px] opacity-40 rounded-lg z-0" />
            <Image
              src="/iluzija-1.jpg" // obavezno postavi sliku ovde
              alt="Muzej Iluzija"
              width={660}
              height={440}
              className="rounded-lg shadow-xl transform hover:scale-105 transition duration-500 relative z-10"
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default About;
