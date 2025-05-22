"use client";

import { useContext } from "react";
import { LanguageContext } from "../layout"; // Import LanguageContext
import { motion } from "framer-motion";
import Image from "next/image";

const About = () => {
  const { language } = useContext(LanguageContext); // Dobijamo jezik iz globalnog konteksta

  return (
    <section id="about" className="relative bg-black text-white overflow-visible py-20">
      
      

      <div className="max-w-7xl mx-auto px-6 lg:flex lg:items-center relative z-10">
        {/* Tekst sa animacijom */}
        <motion.div
          className="lg:w-1/2"
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl font-bold text-green-400 drop-shadow-lg">
            {language === "sr" ? "O Dino Parku" : "About Dino Park"}
          </h2>
          <p className="text-lg mt-6 text-gray-300 leading-relaxed drop-shadow-lg">
            {language === "sr"
              ? "Smešten u srcu Zlatibora, Dino Park je najveće igralište za decu na planini. Uz interaktivne aktivnosti, avanture i edukativne programe, pruža nezaboravno iskustvo za sve generacije."
              : "Located in the heart of Zlatibor, Dino Park is the largest playground for children in the mountains. With interactive activities, adventures, and educational programs, it offers an unforgettable experience for all generations."}
          </p>
        </motion.div>

        {/* Slika sa efektima */}
        <motion.div
          className="lg:w-1/2 mt-10 lg:mt-0 flex justify-center lg:justify-end relative"
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}
        >
          <div className="relative w-full max-w-lg">
           
            {/* Pseudo-element za dodatni svetlosni efekat */}
            <div className="absolute -inset-10 bg-green-500 blur-[40px] opacity-50 rounded-lg z-0"></div>

            {/* Slika sada ima najveći z-index da ne bude pokrivena */}
            <Image
              src="/about-1.jpg"
              alt="Dino Park Zlatibor"
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
