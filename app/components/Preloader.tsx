"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function Preloader() {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const done = () => setReady(true);
    // čim se sve asset-e učitaju
    window.addEventListener("load", done);
    // sigurnosni timeout (ako neki resurs visi)
    const t = setTimeout(done, 3500);
    return () => {
      window.removeEventListener("load", done);
      clearTimeout(t);
    };
  }, []);

  return (
    <AnimatePresence>
      {!ready && (
        <motion.div
          key="preloader"
          initial={{ opacity: 1 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4 }}
          className="fixed inset-0 z-[9999] grid place-items-center bg-white"
        >
          <video
            src="/loading.mp4"
            className="h-[40vh] w-auto rounded-2xl shadow-xl"
            autoPlay
            muted
            playsInline
            loop
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
