// app/components/Loader.tsx
"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function Loader() {
  const [ended, setEnded] = useState(false);

  // Jedino što radimo je: blokiramo scroll dok je loader aktivan.
  useEffect(() => {
    if (!ended) {
      const html = document.documentElement;
      const body = document.body;

      const prevHtmlOverflow = html.style.overflow;
      const prevBodyOverflow = body.style.overflow;

      html.style.overflow = "hidden";
      body.style.overflow = "hidden";

      return () => {
        html.style.overflow = prevHtmlOverflow;
        body.style.overflow = prevBodyOverflow;
      };
    }
  }, [ended]);

  return (
    <AnimatePresence>
      {!ended && (
        <motion.div
          key="preloader"
          initial={{ opacity: 1 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.35 }}
          className="fixed inset-0 z-[9999] grid place-items-center bg-white"
          aria-label="Loading"
          role="dialog"
          aria-modal="true"
        >
          <video
            src="/loading.mp4"
            autoPlay
            muted
            controls={false}
            onEnded={() => setEnded(true)}
            className="
              w-[60vw] h-[60vw] object-contain rounded-2xl shadow-xl
              sm:w-auto sm:h-auto sm:max-h-[60vh]
            "
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
