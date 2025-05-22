"use client";

import { useContext, useEffect, useState } from "react";
import { LanguageContext } from "../context/LanguageContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLocationDot, faPhone, faEnvelope, faClock } from "@fortawesome/free-solid-svg-icons";
import { motion } from "framer-motion";

const Contact = () => {
  const { language } = useContext(LanguageContext);

  type WeekSummary = Record<string, string>; // Mapa dana u nedelji sa radnim vremenima

  const [weekHours, setWeekHours] = useState<WeekSummary | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchHours = async () => {
      setLoading(true);
      try {
        const res = await fetch(
          `https://dinoparkwebshop-backend-1081514700612.us-central1.run.app/api/WorkingHours/week-summary`
        );
        const data: WeekSummary = await res.json();
        setWeekHours(data);
      } catch (error) {
        console.error("Greška pri učitavanju radnih vremena:", error);
      }
      setLoading(false);
    };

    fetchHours();
  }, []);

  const dayNamesSr: Record<string, string> = {
    Monday: "Ponedeljak",
    Tuesday: "Utorak",
    Wednesday: "Sreda",
    Thursday: "Četvrtak",
    Friday: "Petak",
    Saturday: "Subota",
    Sunday: "Nedelja",
  };

  const dayNamesEn: Record<string, string> = {
    Monday: "Monday",
    Tuesday: "Tuesday",
    Wednesday: "Wednesday",
    Thursday: "Thursday",
    Friday: "Friday",
    Saturday: "Saturday",
    Sunday: "Sunday",
  };

  return (
    <section id="contact" className="relative bg-black text-white overflow-visible py-20">
      <div className="absolute -top-20 left-1/2 transform -translate-x-1/2 w-[80%] h-32 bg-green-500 blur-3xl opacity-50 z-0"></div>

      <div className="max-w-7xl mx-auto px-6 lg:flex lg:items-center relative z-10">
        <motion.div
          className="lg:w-1/2 flex justify-center lg:justify-start relative"
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}
        >
          <div className="relative w-full max-w-lg">
            <div className="absolute -inset-12 bg-green-500 blur-[80px] opacity-70 rounded-lg z-0"></div>
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
              <span>Ulica Sportova bb, Zlatibor 31315</span>
            </li>
            <li className="flex items-center space-x-3">
              <FontAwesomeIcon icon={faPhone} className="text-green-400 text-2xl" />
              <span>+381 63 115 5825</span>
            </li>
            <li className="flex items-center space-x-3">
            <FontAwesomeIcon icon={faPhone} className="text-green-400 text-2xl" />
            <span>+381 (0)31 640 901</span>
            </li>
            <li className="flex items-center space-x-3">
              <FontAwesomeIcon icon={faEnvelope} className="text-green-400 text-2xl" />
              <span>info@dinopark.rs</span>
            </li>

            {/* Prikaz radnog vremena */}
            <li className="flex items-start space-x-3">
              <FontAwesomeIcon icon={faClock} className="text-green-400 text-2xl mt-1" />
              <div className="space-y-1">
                {loading ? (
                  <p className="text-sm text-gray-400">
                    {language === "sr" ? "Učitavanje radnog vremena..." : "Loading working hours..."}
                  </p>
                ) : weekHours ? (
                  Object.entries(weekHours).map(([day, time]) => {
                    const dayKey = day as keyof typeof dayNamesSr; // 🔥 TypeScript ispravka
                    return (
                      <p key={day} className="text-sm">
                        <strong>{language === "sr" ? dayNamesSr[dayKey] : dayNamesEn[dayKey]}:</strong>{" "}
                        {time.includes("Closed") ? (
                          <span className="text-red-500">{language === "sr" ? "Zatvoreno" : "Closed"}</span>
                        ) : (
                          time.replace("Open:", "").trim()
                        )}
                      </p>
                    );
                  })
                ) : (
                  <p className="text-sm text-gray-400">
                    {language === "sr" ? "Nema dostupnih podataka." : "No data available."}
                  </p>
                )}
              </div>
            </li>
          </ul>
        </motion.div>
      </div>
    </section>
  );
};

export default Contact;
