// app/components/Loader.tsx
"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function Loader() {
  const [domReady, setDomReady] = useState(false);
  const [videoDone, setVideoDone] = useState(false);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  // 1) DOM spreman + kratki fallback
  useEffect(() => {
    const markReady = () => setDomReady(true);
    if (document.readyState === "interactive" || document.readyState === "complete") {
      markReady();
    } else {
      document.addEventListener("DOMContentLoaded", markReady, { once: true });
    }
    const domGuard = setTimeout(markReady, 1200);
    return () => {
      clearTimeout(domGuard);
      document.removeEventListener("DOMContentLoaded", markReady as any);
    };
  }, []);

  // 2) iOS-friendly video workflow + 2x playback
  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;

    // obavezno pre play()
    v.muted = true;
    v.setAttribute("muted", "");
    v.playsInline = true;
    v.setAttribute("playsinline", "");
    v.setAttribute("webkit-playsinline", "");

    // helper: postavi brzinu (neki iOS-ovi traže i defaultPlaybackRate)
    const apply2x = () => {
      v.defaultPlaybackRate = 2;
      v.playbackRate = 2;
      // bez potrebe, ali sigurnosti radi – ugasi pitch korekciju (muted je svakako)
      (v as any).preservesPitch = false;
      (v as any).webkitPreservesPitch = false;
      (v as any).mozPreservesPitch = false;
    };

    let endGuard: ReturnType<typeof setTimeout> | null = null;
    let hardGuard: ReturnType<typeof setTimeout> | null = null;

    const finish = () => {
      setVideoDone(true);
      if (endGuard) clearTimeout(endGuard);
      if (hardGuard) clearTimeout(hardGuard);
    };
    const fail = () => finish();

    const onMeta = () => {
      apply2x();

      // efektivno trajanje uz 2x
      const baseDur = Number.isFinite(v.duration) && v.duration > 0 ? v.duration : 3;
      const rate = v.playbackRate && isFinite(v.playbackRate) ? v.playbackRate : 2;
      const effective = baseDur / Math.max(rate, 0.1);

      // ako ended ne stigne
      endGuard = setTimeout(finish, effective * 1000 + 180);
      // tvrdi guard
      hardGuard = setTimeout(finish, 10000);

      // iOS ponekad želi play u sledećem frame-u
      requestAnimationFrame(() => v.play().catch(() => {}));

      v.addEventListener("ended", finish, { once: true });
      v.addEventListener("error", fail, { once: true });
      v.addEventListener("stalled", fail, { once: true });
      v.addEventListener("abort", fail, { once: true });
      v.addEventListener("emptied", fail, { once: true });
      v.addEventListener("suspend", fail, { once: true });
      v.addEventListener("ratechange", apply2x); // ako browser pokuša da resetuje
    };

    if (v.readyState >= 1) {
      onMeta();
    } else {
      const once = () => {
        v.removeEventListener("loadedmetadata", once);
        onMeta();
      };
      v.addEventListener("loadedmetadata", once);
    }

    // dodatno – čim može da svira, forsiraj brzinu i play
    const onCanPlay = () => {
      apply2x();
      v.play().catch(() => {});
    };
    v.addEventListener("canplay", onCanPlay);

    return () => {
      if (endGuard) clearTimeout(endGuard);
      if (hardGuard) clearTimeout(hardGuard);
      v.removeEventListener("canplay", onCanPlay);
    };
  }, []);

  const hide = domReady && videoDone;

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
          onClick={() => setVideoDone(true)} // tap-to-skip
        >
          {/* Manji kvadrat na telefonu; desktop ostaje max 60vh */}
          <video
            ref={videoRef}
            preload="auto"
            autoPlay
            muted
            playsInline
            controls={false}
            className="
              w-[68vw] h-[68vw] object-contain rounded-2xl shadow-xl
              sm:w-auto sm:h-auto sm:max-h-[60vh]
            "
          >
            {/* stari, stabilni fajl */}
            <source src="/loading.mp4" type="video/mp4" />
          </video>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
