// app/components/Preloader.tsx
"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function Preloader() {
  const [pageLoaded, setPageLoaded] = useState(false);
  const [videoDone, setVideoDone] = useState(false);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  // Ako menjaš fajl a zadržavaš ime – dodaj query da bustuješ keš
  const src = "/loading-animation.mp4?v=2";

  // 1) Stranica učitana
  useEffect(() => {
    const onLoad = () => setPageLoaded(true);
    if (document.readyState === "complete") onLoad();
    else window.addEventListener("load", onLoad, { once: true });
    return () => window.removeEventListener("load", onLoad);
  }, []);

  // 2) Robustno rukovanje videom (iOS-friendly)
  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;

    // iOS zahtevi
    v.muted = true;
    v.setAttribute("muted", "");
    v.playsInline = true;
    v.setAttribute("playsinline", "");
    v.setAttribute("webkit-playsinline", "");

    // Globalni guard – ako metadata nikad ne stignu
    const metadataGuard = setTimeout(() => setVideoDone(true), 4000);

    const onLoadedMeta = () => {
      clearTimeout(metadataGuard);

      const dur = Number.isFinite(v.duration) && v.duration > 0 ? v.duration : 3.5;

      // Ako ended ne dođe
      const endGuard = setTimeout(() => setVideoDone(true), dur * 1000 + 180);
      // Tvrdi guard da nikad ne zaglavi
      const hardGuard = setTimeout(() => setVideoDone(true), 12000);

      v.play().catch(() => {
        // iOS ponekad odbije autoplay; guardovi će odraditi posao
      });

      const finish = () => {
        setVideoDone(true);
        clearTimeout(endGuard);
        clearTimeout(hardGuard);
      };

      v.addEventListener("ended", finish, { once: true });

      const fail = () => finish();
      v.addEventListener("error", fail, { once: true });
      v.addEventListener("stalled", fail, { once: true });
      v.addEventListener("abort", fail, { once: true });
      v.addEventListener("emptied", fail, { once: true });
      v.addEventListener("suspend", fail, { once: true });

      return () => {
        v.removeEventListener("ended", finish);
        v.removeEventListener("error", fail);
        v.removeEventListener("stalled", fail);
        v.removeEventListener("abort", fail);
        v.removeEventListener("emptied", fail);
        v.removeEventListener("suspend", fail);
        clearTimeout(endGuard);
        clearTimeout(hardGuard);
      };
    };

    // Ako su metapodaci već tu (keš)
    if (v.readyState >= 1) {
      const cleanup = onLoadedMeta();
      return () => {
        clearTimeout(metadataGuard);
        cleanup && cleanup();
      };
    } else {
      v.addEventListener("loadedmetadata", onLoadedMeta, { once: true });
      return () => {
        clearTimeout(metadataGuard);
        v.removeEventListener("loadedmetadata", onLoadedMeta);
      };
    }
  }, [src]);

  const hide = pageLoaded && videoDone;

  return (
    <AnimatePresence>
      {!hide && (
        <motion.div
          key="preloader"
          initial={{ opacity: 1 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.35 }}
          className="fixed inset-0 z-[9999] grid place-items-center bg-white"
          onClick={() => setVideoDone(true)} // tap-to-skip kao fail-safe
        >
          {/* 
            MOBILNI: kvadrat ~78vw (manje od 100% širine)
            DESKTOP: kao i ranije – max 60vh, proporcija videa
          */}
          <video
            key={src} // remount kad promeniš ?v=
            ref={videoRef}
            src={src}
            preload="auto"
            muted
            playsInline
            autoPlay
            controls={false}
            className="
              w-[78vw] h-[78vw] object-contain rounded-2xl shadow-xl
              sm:w-auto sm:h-auto sm:max-h-[60vh]
            "
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
