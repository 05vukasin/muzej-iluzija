"use client";

import { useContext } from "react";
import { LanguageContext } from "../layout"; // Import LanguageContext
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLocationDot, faPhone, faEnvelope, faClock } from "@fortawesome/free-solid-svg-icons";
import { motion } from "framer-motion";

const Contact = () => {
  const { language } = useContext(LanguageContext);

  return (
    <section id="contact" className="relative bg-black text-white overflow-visible py-20">
      {/* Glow efekat između sekcija */}
      <div className="absolute -top-20 left-1/2 transform -translate-x-1/2 w-[80%] h-32 bg-green-500 blur-3xl opacity-50 z-0"></div>

      <div className="max-w-7xl mx-auto px-6 lg:flex lg:items-center relative z-10">
        {/* Leva strana - Mapa sa efektom */}
        <motion.div
          className="lg:w-1/2 flex justify-center lg:justify-start relative"
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}
        >
          <div className="relative w-full max-w-lg">
            {/* Efekat osvetljenja iza mape */}
            <div className="absolute -inset-12 bg-green-500 blur-[80px] opacity-70 rounded-lg z-0"></div>

            {/* Google Mapa iframe */}
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2883.471030365058!2d19.70046917618036!3d43.72154087109892!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47582f8743086e23%3A0x7618ef358f86730b!2sDino%20Park!5e0!3m2!1sen!2srs!4v1742496914041!5m2!1sen!2srs"
              width="100%"
              height="300"
              style={{ border: "0" }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="rounded-lg shadow-xl relative z-10"
            ></iframe>
          </div>
        </motion.div>

        {/* Desna strana - Kontakt informacije */}
        <motion.div
          className="lg:w-1/2 mt-10 lg:mt-0"
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl font-bold text-green-400 drop-shadow-lg">
            {language === "sr" ? "Kontakt" : "Contact"}
          </h2>
          <p className="text-lg mt-4 text-gray-300 leading-relaxed">
            {language === "sr"
              ? "Posetite nas na Zlatiboru ili nas kontaktirajte putem telefona ili emaila. Radujemo se vašem dolasku!"
              : "Visit us at Zlatibor or contact us via phone or email. We look forward to your visit!"}
          </p>

          <ul className="mt-6 space-y-4 text-lg">
            <li className="flex items-center space-x-3">
              <FontAwesomeIcon icon={faLocationDot} className="text-green-400 text-2xl" />
              <span>Zlatibor, Srbija</span>
            </li>
            <li className="flex items-center space-x-3">
              <FontAwesomeIcon icon={faPhone} className="text-green-400 text-2xl" />
              <span>+381 60 123 4567</span>
            </li>
            <li className="flex items-center space-x-3">
              <FontAwesomeIcon icon={faEnvelope} className="text-green-400 text-2xl" />
              <span>info@dinopark.rs</span>
            </li>
            <li className="flex items-center space-x-3">
              <FontAwesomeIcon icon={faClock} className="text-green-400 text-2xl" />
              <span>
                {language === "sr"
                  ? "Radno vreme: 10:00 - 18:00 (Svaki dan)"
                  : "Working Hours: 10:00 AM - 6:00 PM (Every day)"}
              </span>
            </li>
          </ul>
        </motion.div>
      </div>
    </section>
  );
};

export default Contact;
