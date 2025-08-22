// app/components/Loader.tsx
"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function Loader() {
  const [ended, setEnded] = useState(false);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  // Blokiraj scroll dok je loader aktivan (radi i na iOS)
  useEffect(() => {
    if (ended) return;
    const html = document.documentElement;
    const body = document.body;

    const prevHtmlOverflow = html.style.overflow;
    const prevBodyOverflow = body.style.overflow;
    const prevBodyPosition = body.style.position;
    const prevBodyTop = body.style.top;
    const prevBodyWidth = body.style.width;
    const scrollY = window.scrollY;

    html.style.overflow = "hidden";
    body.style.overflow = "hidden";
    body.style.position = "fixed";
    body.style.top = `-${scrollY}px`;
    body.style.width = "100%";

    return () => {
      html.style.overflow = prevHtmlOverflow;
      body.style.overflow = prevBodyOverflow;
      body.style.position = prevBodyPosition;
      body.style.top = prevBodyTop;
      body.style.width = prevBodyWidth;
      window.scrollTo(0, scrollY);
    };
  }, [ended]);

  // iOS-friendly pokretanje videa + zaštite od zaglavljivanja
  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;

    // obavezno pre play()
    v.muted = true;
    v.setAttribute("muted", "");
    v.playsInline = true;
    v.setAttribute("playsinline", "");
    v.setAttribute("webkit-playsinline", "");

    let hardGuard: ReturnType<typeof setTimeout> | null = null;

    const finish = () => {
      setEnded(true);
      if (hardGuard) clearTimeout(hardGuard);
    };
    const fail = () => finish();

    const onMeta = () => {
      // tvrdi guard da se nikad ne zaglavi (ako fajl ne može da se pusti)
      hardGuard = setTimeout(finish, 12000);
      // iOS voli play u sledećem frame-u
      requestAnimationFrame(() => v.play().catch(() => {}));

      v.addEventListener("ended", finish, { once: true });
      v.addEventListener("error", fail, { once: true });
      v.addEventListener("stalled", fail, { once: true });
      v.addEventListener("abort", fail, { once: true });
      v.addEventListener("emptied", fail, { once: true });
      v.addEventListener("suspend", fail, { once: true });
    };

    if (v.readyState >= 1) {
      onMeta();
    } else {
      v.addEventListener("loadedmetadata", onMeta, { once: true });
    }

    return () => {
      if (hardGuard) clearTimeout(hardGuard);
      v.removeEventListener("loadedmetadata", onMeta);
      v.removeEventListener("ended", finish);
      v.removeEventListener("error", fail);
      v.removeEventListener("stalled", fail);
      v.removeEventListener("abort", fail);
      v.removeEventListener("emptied", fail);
      v.removeEventListener("suspend", fail);
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
          className="
            fixed inset-0 z-[9999] grid place-items-center bg-white
            overscroll-none touch-none
          "
          aria-label="Loading"
          role="dialog"
          aria-modal="true"
        >
          <video
            ref={videoRef}
            preload="auto"
            autoPlay
            muted
            playsInline
            controls={false}
            className="
              w-[60vw] h-[60vw] object-contain rounded-2xl shadow-xl
              sm:w-auto sm:h-auto sm:max-h-[60vh]
            "
            disablePictureInPicture
            controlsList="nodownload noplaybackrate noremoteplayback"
          >
            {/* Ako /loading.H264 nije upotrebljiv u browseru, pada na MP4 fallback */}
            
            <source src="/loading-animation.mp4" type="video/mp4" />
          </video>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
