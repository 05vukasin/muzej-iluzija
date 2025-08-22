// app/components/Loader.tsx
"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function Loader() {
  const [ended, setEnded] = useState(false);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;

    // iOS-friendly podešavanja PRE play()
    v.muted = true;
    v.setAttribute("muted", "");
    v.playsInline = true;
    v.setAttribute("playsinline", "");
    v.setAttribute("webkit-playsinline", "");

    const apply2x = () => {
      v.defaultPlaybackRate = 2;
      v.playbackRate = 2;
      (v as any).preservesPitch = false;
      (v as any).webkitPreservesPitch = false;
      (v as any).mozPreservesPitch = false;
    };

    const tryPlay = () => {
      apply2x();
      v.play().catch(() => {
        // ako iOS traži interakciju, rešićemo je u onPointerDown ispod
      });
    };

    const onMeta = () => {
      tryPlay();
    };

    const onEnded = () => setEnded(true);

    // start čim možemo
    if (v.readyState >= 1) onMeta();
    v.addEventListener("loadedmetadata", onMeta, { once: true });
    v.addEventListener("canplay", tryPlay);
    v.addEventListener("ratechange", apply2x);
    v.addEventListener("ended", onEnded, { once: true });

    return () => {
      v.removeEventListener("loadedmetadata", onMeta);
      v.removeEventListener("canplay", tryPlay);
      v.removeEventListener("ratechange", apply2x);
      v.removeEventListener("ended", onEnded);
    };
  }, []);

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
        >
          <video
            ref={videoRef}
            preload="auto"
            autoPlay
            muted
            playsInline
            controls={false}
            // manji kvadrat na telefonu; desktop ostaje max 60vh
            className="
              w-[64vw] h-[64vw] object-contain rounded-2xl shadow-xl
              sm:w-auto sm:h-auto sm:max-h-[60vh]
            "
            // ako autoplay ne krene na iOS-u, prvi dodir samo pokreće video (ne zatvara preloader)
            onPointerDown={() => {
              const v = videoRef.current;
              if (v && v.paused) {
                v.defaultPlaybackRate = 2;
                v.playbackRate = 2;
                v.play().catch(() => {});
              }
            }}
            // opciono: zabrani PiP i nepotrebne kontrole
            disablePictureInPicture
            controlsList="nodownload noplaybackrate noremoteplayback"
          >
            <source src="/loading.mp4" type="video/mp4" />
          </video>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
