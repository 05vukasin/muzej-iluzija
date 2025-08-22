// app/components/Preloader.tsx
"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function Preloader() {
  const [pageLoaded, setPageLoaded] = useState(false);
  const [videoEnded, setVideoEnded] = useState(false);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  // 1) Stranica učitana
  useEffect(() => {
    const onLoad = () => setPageLoaded(true);
    if (document.readyState === "complete") onLoad();
    else window.addEventListener("load", onLoad, { once: true });
    return () => window.removeEventListener("load", onLoad);
  }, []);

  // 2) Robustno rukovanje videom
  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;

    // -- SIGURNOSNI TAJMER: ako ništa ne stigne, zatvori posle 6s
    const safety = setTimeout(() => setVideoEnded(true), 6000);

    const onLoadedMeta = () => {
      // Ugasiti safety – sad znamo trajanje
      clearTimeout(safety);

      const dur = Number.isFinite(v.duration) && v.duration > 0 ? v.duration : 3.5;

      // Fallback “završi posle trajanja + 150ms”
      const t1 = setTimeout(() => setVideoEnded(true), dur * 1000 + 150);

      // Dodatni “never stuck” fallback (npr. ended ne stigne) – 12s
      const t2 = setTimeout(() => setVideoEnded(true), 12000);

      // Probaj da pustiš
      v.play().catch(() => {
        // ako autoplay padne, i dalje imamo t1/t2
      });

      const onEnded = () => {
        setVideoEnded(true);
        clearTimeout(t1);
        clearTimeout(t2);
      };

      v.addEventListener("ended", onEnded, { once: true });

      // clean
      return () => {
        clearTimeout(t1);
        clearTimeout(t2);
        v.removeEventListener("ended", onEnded);
      };
    };

    const onErrorLike = () => {
      // Ako je greška/stall/abort – odmah skloni preloader
      setVideoEnded(true);
      clearTimeout(safety);
    };

    const onCanPlay = () => {
      // Na nekim iOS buildovima canplay dođe pre loadedmetadata
      // pa probaj play() i tu
      v.play().catch(() => {});
    };

    // Listeners
    v.addEventListener("loadedmetadata", onLoadedMeta, { once: true });
    v.addEventListener("canplay", onCanPlay);
    v.addEventListener("error", onErrorLike);
    v.addEventListener("stalled", onErrorLike);
    v.addEventListener("abort", onErrorLike);
    v.addEventListener("emptied", onErrorLike);

    // Ako je metadata već tu (keš), ručno okini
    if (v.readyState >= 1) {
      const cleanup = onLoadedMeta();
      // dodatno odmah probaj play
      v.play().catch(() => {});
      return () => {
        clearTimeout(safety);
        cleanup && cleanup();
        v.removeEventListener("canplay", onCanPlay);
        v.removeEventListener("error", onErrorLike);
        v.removeEventListener("stalled", onErrorLike);
        v.removeEventListener("abort", onErrorLike);
        v.removeEventListener("emptied", onErrorLike);
      };
    }

    // cleanup
    return () => {
      clearTimeout(safety);
      v.removeEventListener("loadedmetadata", onLoadedMeta);
      v.removeEventListener("canplay", onCanPlay);
      v.removeEventListener("error", onErrorLike);
      v.removeEventListener("stalled", onErrorLike);
      v.removeEventListener("abort", onErrorLike);
      v.removeEventListener("emptied", onErrorLike);
    };
  }, []);

  const canHide = pageLoaded && videoEnded;

  return (
    <AnimatePresence>
      {!canHide && (
        <motion.div
          key="preloader"
          initial={{ opacity: 1 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.35 }}
          className="fixed inset-0 z-[9999] grid place-items-center bg-white"
          // Tap anywhere to skip (korisno na iOS ako autoplay omane)
          onClick={() => setVideoEnded(true)}
        >
          <video
            ref={videoRef}
            // >>> KEŠ BUSTING: promeni verziju kad zameniš fajl istog imena
            src="/loading-animation.mp4?v=2" 
            className="max-h-[60vh] w-auto rounded-2xl shadow-xl"
            muted
            playsInline
            preload="auto"
            autoPlay
            // (opciono) poster da nema flash crnine
            // poster="/images/loading-poster.jpg"
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
