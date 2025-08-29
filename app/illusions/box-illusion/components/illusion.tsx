"use client";

import { useContext, useEffect, useMemo, useRef, useState } from "react";
import { LanguageContext } from "@/app/context/LanguageContext";

export default function Illusion() {
  const { language } = useContext(LanguageContext);
  const isSr = language === "sr";

  const t = {
    title: isSr ? "Iluzija kutija" : "Box Illusion",
    lead: isSr
      ? "Dve kutije izgledaju različitih proporcija, iako su im gornje stranice identične. Klikni „Uporedi“ da se obe zarotiraju tako da gledaš njihove gornje ploče, dužom stranicom jednu pored druge. Na mišu: pređi preko ili drži-pritegni i vuci. Na telefonu: dodirni i drži pa vuci."
      : "Two boxes look differently proportioned although their top faces are identical. Click “Compare” to rotate both so you view their top faces, long edges side-by-side. Mouse: hover or press & drag. Touch: press & drag.",
    btnCompareOn: isSr ? "Sakrij poređenje" : "Hide compare",
    btnCompareOff: isSr ? "Uporedi (top view)" : "Compare (top view)",
    hint: isSr
      ? "Miš: hover/drag • Telefon: pritisni i vuci"
      : "Mouse: hover/drag • Touch: press & drag",
  };

  // Responsive canvas
  const wrapRef = useRef<HTMLDivElement | null>(null);
  const [w, setW] = useState(740);
  const [h, setH] = useState(420);
  useEffect(() => {
    const el = wrapRef.current;
    if (!el) return;
    const ro = new ResizeObserver(([entry]) => {
      const cw = entry.contentRect.width;
      const ch = Math.min(Math.max(300, cw * 0.56), 520);
      setW(cw);
      setH(ch);
    });
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  // --- DIMENZIJE (izduženije i manje na užim ekranima) ---
  const dims = useMemo(() => {
    const small = w < 560; // prag za “manje ekrane”
    // šira ploča, plitkija visina i nešto uža “dubina” za izdužen izgled
    const targetW = Math.min(small ? 220 : 320, Math.max(small ? 100 : 160, w * (small ? 0.38 : 0.34)));
    const BOX_W = Math.round(targetW);                  // duža stranica top-ploče (horizontalna)
    const BOX_D = Math.round(BOX_W * (small ? 0.42 : 0.55)); // kraća stranica top-ploče (uža na small)
    const BOX_H = Math.round(BOX_W * (small ? 0.34 : 0.5));  // visina (pliće na small)
    const PERSPECTIVE = Math.round(Math.min(1200, Math.max(700, w * 1.2)));
    const gap = small ? 16 : 28; // manji razmak na malim ekranima
    return { BOX_W, BOX_D, BOX_H, PERSPECTIVE, gap, small };
  }, [w]);

  const { BOX_W, BOX_D, BOX_H, PERSPECTIVE, gap, small } = dims;

  // Početne poze (namerno različite, da “varaju”)
  const START_A = { rotX: -18, rotY: -18 };
  const START_B = { rotX: -10, rotY: 68 };

  // Compare poza: top view, duža stranica vodoravno (duža pored duže)
  const COMPARE_POSE = { rotX: -85, rotY: 0 };

  // Pozicioniranje (px -> u % širine)
  const centerY = Math.round(h * 0.56);
  const compareAXPx = w / 2 - (BOX_W / 2 + gap);
  const compareBXPx = w / 2 + (BOX_W / 2 + gap);
  const toPct = (px: number) => (px / w) * 100;

  const POS = {
    aX: small ? 30 : 32,
    bX: small ? 70 : 68,
    y: (centerY / h) * 100,
    compareAX: toPct(compareAXPx),
    compareBX: toPct(compareBXPx),
  };

  // Režim: compare ili ne
  const [compare, setCompare] = useState(false);

  // Tilt (hover/drag)
  const [tiltX, setTiltX] = useState(0); // rotX delta
  const [tiltY, setTiltY] = useState(0); // rotY delta
  const [isPressing, setIsPressing] = useState(false);
  const sceneRef = useRef<HTMLDivElement | null>(null);

  // Granice "nagiba"
  const MAX_TILT_X = small ? 18 : 22; // gore-dole
  const MAX_TILT_Y = small ? 22 : 28; // levo-desno

  // Helper: računa tilt iz pointer pozicije unutar scene
  const calcTilt = (clientX: number, clientY: number) => {
    const rect = sceneRef.current?.getBoundingClientRect();
    if (!rect) return { tx: 0, ty: 0 };
    const nx = (clientX - rect.left) / rect.width;  // 0..1
    const ny = (clientY - rect.top) / rect.height;  // 0..1
    const dx = (nx - 0.5) * 2; // -1..1
    const dy = (ny - 0.5) * 2; // -1..1
    return { tx: -dy * MAX_TILT_X, ty: dx * MAX_TILT_Y };
  };

  const onPointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    setIsPressing(true);
    // odmah primeni tilt i “uhvati” pointer da drag radi i van scene
    const { tx, ty } = calcTilt(e.clientX, e.clientY);
    setTiltX(tx);
    setTiltY(ty);
    try {
      e.currentTarget.setPointerCapture(e.pointerId);
    } catch {}
  };

  const onPointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    const isMouse = e.pointerType === "mouse";
    // Na mišu: i hover i drag; na touch/pen: samo dok je pritisnuto
    if (isMouse || isPressing) {
      const { tx, ty } = calcTilt(e.clientX, e.clientY);
      setTiltX(tx);
      setTiltY(ty);
    }
  };

  const onPointerUp = (e: React.PointerEvent<HTMLDivElement>) => {
    setIsPressing(false);
    try {
      e.currentTarget.releasePointerCapture(e.pointerId);
    } catch {}
    // glatki povratak
    setTiltX(0);
    setTiltY(0);
  };

  const onPointerCancel = (e: React.PointerEvent<HTMLDivElement>) => {
    setIsPressing(false);
    try {
      e.currentTarget.releasePointerCapture(e.pointerId);
    } catch {}
    setTiltX(0);
    setTiltY(0);
  };

  const onPointerLeave = (e: React.PointerEvent<HTMLDivElement>) => {
    // Na mišu: reset kad izađe kursor (ako nije pritisnuto)
    if (!isPressing) {
      setTiltX(0);
      setTiltY(0);
    }
  };

  // Pomoćna komponenta: 3D kutija (6 strana)
  function Box3D({
    xPercent,
    yPercent,
    baseRotX,
    baseRotY,
    color = "#60a5fa",
    label,
    onClick,
  }: {
    xPercent: number;
    yPercent: number;
    baseRotX: number;
    baseRotY: number;
    color?: string;
    label: string;
    onClick?: () => void;
  }) {
    const front = "#e5e7eb";
    const side = "#d4d4d8";
    const top = color;

    return (
      <div
        onClick={onClick}
        role="button"
        aria-label={isSr ? `Kutija ${label} — klikni za poređenje` : `Box ${label} — click to compare`}
        className="absolute select-none cursor-pointer"
        style={{
          left: `${xPercent}%`,
          top: `${yPercent}%`,
          transform: "translate(-50%, -50%)",
          perspective: `${PERSPECTIVE}px`,
          transition:
            "left 600ms cubic-bezier(.2,.8,.2,1), top 600ms cubic-bezier(.2,.8,.2,1)",
        }}
      >
        <div
          className="relative"
          style={{
            width: BOX_W,
            height: BOX_H,
            transformStyle: "preserve-3d",
            transform: `rotateX(${baseRotX + tiltX}deg) rotateY(${baseRotY + tiltY}deg)`,
            // malo duža tranzicija da “proguta” promenu režima i tilt-a
            transition: "transform 720ms cubic-bezier(.2,.8,.2,1)",
          }}
        >
          {/* TOP */}
          <div
            className="absolute left-1/2 top-1/2"
            style={{
              width: BOX_W,
              height: BOX_D,
              background: top,
              border: "2px solid #111",
              borderRadius: 6,
              transform: `translate(-50%,-50%) rotateX(90deg) translateZ(${BOX_H / 2}px)`,
            }}
          />
          {/* BOTTOM */}
          <div
            className="absolute left-1/2 top-1/2"
            style={{
              width: BOX_W,
              height: BOX_D,
              background: "#9ca3af",
              border: "2px solid #111",
              borderRadius: 6,
              transform: `translate(-50%,-50%) rotateX(-90deg) translateZ(${BOX_H / 2}px)`,
            }}
          />
          {/* FRONT */}
          <div
            className="absolute left-1/2 top-1/2"
            style={{
              width: BOX_W,
              height: BOX_H,
              background: front,
              border: "2px solid #111",
              borderRadius: 6,
              transform: `translate(-50%,-50%) translateZ(${BOX_D / 2}px)`,
            }}
          />
          {/* BACK */}
          <div
            className="absolute left-1/2 top-1/2"
            style={{
              width: BOX_W,
              height: BOX_H,
              background: "#cbd5e1",
              border: "2px solid #111",
              borderRadius: 6,
              transform: `translate(-50%,-50%) rotateY(180deg) translateZ(${BOX_D / 2}px)`,
            }}
          />
          {/* RIGHT */}
          <div
            className="absolute left-1/2 top-1/2"
            style={{
              width: BOX_D,
              height: BOX_H,
              background: side,
              border: "2px solid #111",
              borderRadius: 6,
              transform: `translate(-50%,-50%) rotateY(90deg) translateZ(${BOX_W / 2}px)`,
            }}
          />
          {/* LEFT */}
          <div
            className="absolute left-1/2 top-1/2"
            style={{
              width: BOX_D,
              height: BOX_H,
              background: "#e5e7eb",
              border: "2px solid #111",
              borderRadius: 6,
              transform: `translate(-50%,-50%) rotateY(-90deg) translateZ(${BOX_W / 2}px)`,
            }}
          />
        </div>

        <div className="text-center mt-2 text-sm font-semibold text-black/80">{label}</div>
      </div>
    );
  }

  // Poze po režimu (osnovna rotacija + zajednički tilt u Box3D)
  const aPose = compare
    ? { x: POS.compareAX, y: POS.y, baseRotX: COMPARE_POSE.rotX, baseRotY: COMPARE_POSE.rotY }
    : { x: POS.aX,       y: POS.y, baseRotX: START_A.rotX,       baseRotY: START_A.rotY };
  const bPose = compare
    ? { x: POS.compareBX, y: POS.y, baseRotX: COMPARE_POSE.rotX, baseRotY: COMPARE_POSE.rotY }
    : { x: POS.bX,        y: POS.y, baseRotX: START_B.rotX,      baseRotY: START_B.rotY };

  // Kada uključimo/isključimo compare, lagano resetuj tilt da tranzicija bude čistija
  useEffect(() => {
    // kratko “stišavanje” nagiba da prelaz izgleda čist
    setTiltX((t) => t * 0.5);
    setTiltY((t) => t * 0.5);
    const id = setTimeout(() => {
      setTiltX(0);
      setTiltY(0);
    }, 120);
    return () => clearTimeout(id);
  }, [compare]);

  return (
    <div className="rounded-2xl bg-black/65 backdrop-blur-md text-white shadow-2xl ring-1 ring-white/10 p-6 sm:p-8 lg:p-10">
      <h2 className="text-xl sm:text-2xl font-bold tracking-tight">📦 {t.title}</h2>
      <p className="mt-2 text-white/80">{t.lead}</p>

      <div ref={wrapRef} className="mt-6 sm:mt-8 mx-auto w-full max-w-[980px]">
        <div
          ref={sceneRef}
          className="relative w-full rounded-xl ring-1 ring-white/10 shadow-lg bg-white overflow-hidden touch-none"
          style={{ height: h }}
          aria-label={isSr ? "3D kutije — hover/drag; dugme za poređenje" : "3D boxes — hover/drag; compare button toggles top view"}
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={onPointerUp}
          onPointerCancel={onPointerCancel}
          onPointerLeave={onPointerLeave}
        >
          {/* hint */}
          <div className="absolute left-1/2 -translate-x-1/2 top-3 text-xs sm:text-sm px-3 py-1 rounded-full bg-black/50 text-white">
            {t.hint}
          </div>

          {/* SCENA */}
          <div
            className="absolute inset-0"
            style={{
              transformStyle: "preserve-3d",
              perspective: `${PERSPECTIVE}px`,
            }}
          >
            <Box3D
              xPercent={aPose.x}
              yPercent={aPose.y}
              baseRotX={aPose.baseRotX}
              baseRotY={aPose.baseRotY}
              color="#93c5fd"
              label="A"
              onClick={() => setCompare((s) => !s)}
            />
            <Box3D
              xPercent={bPose.x}
              yPercent={bPose.y}
              baseRotX={bPose.baseRotX}
              baseRotY={bPose.baseRotY}
              color="#86efac"
              label="B"
              onClick={() => setCompare((s) => !s)}
            />
          </div>
        </div>

        {/* Dugme za Compare ispod canvasa */}
        <div className="mt-4 flex justify-end">
          <button
            onClick={() => setCompare((s) => !s)}
            className={[
              "rounded-full px-4 py-2 font-semibold transition shadow-sm ring-1",
              compare
                ? "bg-white/85 text-primary ring-black/10 hover:bg-white"
                : "bg-brand-235 text-white ring-transparent hover:brightness-110",
            ].join(" ")}
          >
            {compare ? t.btnCompareOn : t.btnCompareOff}
          </button>
        </div>
      </div>
    </div>
  );
}
