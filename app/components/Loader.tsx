// app/components/Loader.tsx
"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function Loader() {
  const [pageReady, setPageReady] = useState(false); // kada se sajt potpuno učita (window.load)
  const [hidden, setHidden] = useState(false);       // kontrola prikaza loadera
  const videoRef = useRef<HTMLVideoElement | null>(null);

  /* 1) Page ready (čekamo window.load) */
  useEffect(() => {
    const markReady = () => setPageReady(true);
    if (document.readyState === "complete") {
      markReady();
    } else {
      window.addEventListener("load", markReady, { once: true });
      return () => window.removeEventListener("load", markReady);
    }
  }, []);

  /* 2) Blokiraj scroll dok je loader vidljiv */
  useEffect(() => {
    if (!hidden) {
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
  }, [hidden]);

  /* 3) Pokušaj da pustiš video čim je spreman (autoplay + muted + playsInline) */
  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;

    // iOS-friendly atributi (standardni, ne menjaju logiku)
    v.muted = true;
    v.playsInline = true;

    const tryPlay = () => v.play().catch(() => { /* ako traži interakciju, klik reši */ });

    if (v.readyState >= 1) {
      tryPlay();
    } else {
      const onMeta = () => {
        v.removeEventListener("loadedmetadata", onMeta);
        tryPlay();
      };
      v.addEventListener("loadedmetadata", onMeta);
      return () => v.removeEventListener("loadedmetadata", onMeta);
    }
  }, []);

  /* 4) Logika završetka i ponovnog puštanja */
  const handleEnded = () => {
    const v = videoRef.current;
    if (!v) return;

    if (pageReady) {
      // Stranica je spremna → sakrij loader
      setHidden(true);
    } else {
      // Stranica još nije spremna → pusti video ponovo od početka
      v.currentTime = 0;
      v.play().catch(() => {});
    }
  };

  /* 5) Klik ponašanje:
        - ako je pageReady → odmah skloni loader
        - ako nije → klik ne radi ništa (ili može da repokeša play ako je pauziran) */
  const handleClick = () => {
    const v = videoRef.current;
    if (pageReady) {
      setHidden(true);
    } else if (v && v.paused) {
      v.play().catch(() => {});
    }
  };

  return (
    <AnimatePresence>
      {!hidden && (
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
          onClick={handleClick}
        >
          <video
            ref={videoRef}
            src="/loading.mp4"
            autoPlay
            muted
            playsInline
            controls={false}
            onEnded={handleEnded}
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
