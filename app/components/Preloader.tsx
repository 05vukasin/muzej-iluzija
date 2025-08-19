// app/components/Preloader.tsx
"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function Preloader() {
  const [pageLoaded, setPageLoaded] = useState(false);
  const [videoEnded, setVideoEnded] = useState(false);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  // Stranica učitana
  useEffect(() => {
    const onLoad = () => setPageLoaded(true);
    if (document.readyState === "complete") onLoad();
    else window.addEventListener("load", onLoad);
    return () => window.removeEventListener("load", onLoad);
  }, []);

  // Kada video učita metapodatke, postavi fallback da sigurno "završi"
  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;

    const onLoadedMeta = () => {
      // primarni fallback: ako 'ended' ne stigne, tretiraj kao završeno posle trajanja videa
      const dur = Number.isFinite(v.duration) ? v.duration : 3.5;
      const t1 = setTimeout(() => setVideoEnded(true), (dur * 1000) + 150);

      // krajnji fallback (nikad ne zaglavi): 12s
      const t2 = setTimeout(() => setVideoEnded(true), 12000);

      // počni reprodukciju (za iOS/Android uz muted + playsInline)
      v.play().catch(() => {
        // ako autoplay omane, svejedno ćemo se osloniti na fallback tajmere
      });

      // čišćenje
      const cleanup = () => {
        clearTimeout(t1);
        clearTimeout(t2);
      };
      v.addEventListener("ended", () => {
        setVideoEnded(true);
        cleanup();
      }, { once: true });

      // ako komponenta ode, skloni tajmere
      return cleanup;
    };

    // Ako su metapodaci već tu
    if (v.readyState >= 1) {
      const cleanup = onLoadedMeta();
      return cleanup;
    } else {
      v.addEventListener("loadedmetadata", onLoadedMeta, { once: true });
      return () => v.removeEventListener("loadedmetadata", onLoadedMeta);
    }
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
        >
          <video
            ref={videoRef}
            src="/loading.mp4"
            className="max-h-[60vh] w-auto rounded-2xl shadow-xl"
            muted
            playsInline
            // nema loop – želimo kraj da uhvatimo
            // autoPlay se pokušava u efektu; ipak ostavljamo i atribut:
            autoPlay
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
