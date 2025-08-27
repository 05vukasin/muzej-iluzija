"use client";

import { useContext, useEffect, useMemo, useRef, useState } from "react";
import { LanguageContext } from "@/app/context/LanguageContext";

type Pt = { x: number; y: number };

export default function Illusion() {
  const { language } = useContext(LanguageContext);
  const isSr = language === "sr";

  const t = {
    title: isSr ? "Iluzija lopte ispod linija" : "Sphere-Under-Lines Illusion",
    lead: isSr
  ? "Pomeraj loptu levo-desno i gore-dole. Nema stvarne lopte — samo 2D linije koje se lokalno izobličavaju oko centra; na ivici kruga izobličenje je nula."
  : "Drag the ball left–right and up–down. There’s no real sphere—just 2D lines locally warped around the center; at the circle’s edge the distortion is zero.",
  };

  // Responsive canvas
  const wrapRef = useRef<HTMLDivElement | null>(null);
  const [w, setW] = useState(640);
  const [h, setH] = useState(360);

  useEffect(() => {
    const el = wrapRef.current;
    if (!el) return;
    const ro = new ResizeObserver((entries) => {
      const r = entries[0].contentRect;
      // telefon: dovoljno visoko; desktop: niže (<= 380px)
      const height = Math.max(220, Math.min(r.width * 0.56, 380));
      setW(r.width);
      setH(height);
    });
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  // Dimenzije i početne pozicije
  const minDim = Math.min(w, h);
  const radius = Math.max(42, Math.round(minDim * 0.18));

  // target (cilj draga), glatko praćenje kruga i posebno glatko praćenje polja izobličenja
  const targetRef = useRef<{ cx: number; cy: number }>({
    cx: w * 0.2,
    cy: h * 0.25,
  });

  const [circle, setCircle] = useState<{ cx: number; cy: number; r: number }>({
    cx: w * 0.5,
    cy: h * 0.55,
    r: radius,
  });

  const [warp, setWarp] = useState<{ cx: number; cy: number; r: number }>({
    cx: w * 0.5,
    cy: h * 0.55,
    r: radius,
  });

  // prilagodi na resize
  useEffect(() => {
    setCircle((C) => ({
      cx: Math.max(0, Math.min(w, C.cx)),
      cy: Math.max(0, Math.min(h, C.cy)),
      r: radius,
    }));
    setWarp((W) => ({
      cx: Math.max(0, Math.min(w, W.cx)),
      cy: Math.max(0, Math.min(h, W.cy)),
      r: radius,
    }));
    targetRef.current = {
      cx: Math.max(0, Math.min(w, targetRef.current.cx)),
      cy: Math.max(0, Math.min(h, targetRef.current.cy)),
    };
  }, [w, h, radius]);

  // Glatko praćenje: krug (brže), izobličenje (sporije)
  useEffect(() => {
    let raf = 0;
    const tick = () => {
      const { cx: tx, cy: ty } = targetRef.current;

      setCircle((C) => {
        const kCircle = 0.35; // brže "sleđenje"
        const cx = C.cx + (tx - C.cx) * kCircle;
        const cy = C.cy + (ty - C.cy) * kCircle;
        return Math.hypot(tx - cx, ty - cy) < 0.4 ? { ...C, cx: tx, cy: ty } : { ...C, cx, cy };
      });

      setWarp((W) => {
        const kWarp = 0.14; // sporije (blaga animacija linija)
        const cx = W.cx + (tx - W.cx) * kWarp;
        const cy = W.cy + (ty - W.cy) * kWarp;
        return Math.hypot(tx - cx, ty - cy) < 0.4 ? { ...W, cx: tx, cy: ty } : { ...W, cx, cy };
      });

      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  // Drag preko KONTEJNERA (koordinate u odnosu na container — bez "bežanja")
  const draggingRef = useRef(false);
  const containerRef = useRef<HTMLDivElement | null>(null);

  const onPointerDownCircle = (e: React.PointerEvent) => {
    const container = containerRef.current;
    if (!container) return;
    container.setPointerCapture(e.pointerId);
    draggingRef.current = true;
    onPointerMoveContainer(e); // odmah postavi target
  };
  const onPointerUpContainer = (e: React.PointerEvent) => {
    const container = containerRef.current;
    if (container) container.releasePointerCapture(e.pointerId);
    draggingRef.current = false;
  };
  const onPointerMoveContainer = (e: React.PointerEvent) => {
    if (!draggingRef.current) return;
    const container = containerRef.current;
    if (!container) return;
    const rect = container.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const pad = 0;
    targetRef.current = {
      cx: Math.max(pad, Math.min(w - pad, x)),
      cy: Math.max(pad, Math.min(h - pad, y)),
    };
  };

  // Mreža: horizontalne linije
  const linesCount = 52;
  const samplesPerLine = 96;
  const strokeW = 1.6;

  // Glatko, bez oštrih ivica:
  // - samo VERTIKALNO pomeranje y koordinate (x ostaje isti)
  // - bump profil  f(u) = 4u(1-u)  (0 u centru i na ivici, max oko sredine)
  // - sve van kruga = 0
  const warpPoint = (p: Pt): Pt => {
    const { cx, cy, r } = warp;
    const dx = p.x - cx;
    const dy = p.y - cy;
    const d = Math.hypot(dx, dy);
    if (d >= r || d === 0) return p;

    const u = d / r;                // 0..1
    const bump = 4 * u * (1 - u);   // 0 na 0 i 1, max = 1 na u=0.5
    const strength = 0.22 * r;      // podesiva jačina
    const disp = bump * strength;

    // SAMO vertikalno (projekcija na y-radijalni smer):
    const uy = dy / d;              // komponenta ka centru po y
    const dyDisp = uy * disp;

    return { x: p.x, y: p.y + dyDisp };
  };

  const paths = useMemo(() => {
    const out: string[] = [];
    const dy = h / (linesCount - 1);

    for (let i = 0; i < linesCount; i++) {
      const baseY = i * dy;
      let dStr = "";
      for (let s = 0; s < samplesPerLine; s++) {
        const t = s / (samplesPerLine - 1);
        const x = t * w;
        const p = warpPoint({ x, y: baseY });
        dStr += s === 0 ? `M ${p.x.toFixed(2)} ${p.y.toFixed(2)}` : ` L ${p.x.toFixed(2)} ${p.y.toFixed(2)}`;
      }
      out.push(dStr);
    }
    return out;
  }, [w, h, linesCount, samplesPerLine, warp.cx, warp.cy, warp.r]);

  return (
    <div className="rounded-2xl bg-black/65 backdrop-blur-md text-white shadow-2xl ring-1 ring-white/10 p-6 sm:p-8 lg:p-10">
      <h2 className="text-xl sm:text-2xl font-bold tracking-tight">🔘 {t.title}</h2>
      <p className="mt-2 text-white/80">{t.lead}</p>

      <div className="mt-6 sm:mt-8 mx-auto w-full max-w-[900px]">
        <div
          ref={(el) => {
            wrapRef.current = el;
            containerRef.current = el;
          }}
          onPointerMove={onPointerMoveContainer}
          onPointerUp={onPointerUpContainer}
          onPointerCancel={onPointerUpContainer}
          className="relative w-full rounded-xl ring-1 ring-white/10 shadow-lg bg-white overflow-hidden touch-none"
          style={{ height: h }}
          aria-label={isSr ? "Interaktivna iluzija lopte ispod linija" : "Interactive sphere-under-lines illusion"}
        >
          {/* Krug (ispod linija) */}
          <div
            role="button"
            aria-label={isSr ? "Prevuci krug" : "Drag the circle"}
            onPointerDown={onPointerDownCircle}
            className="absolute z-10 cursor-grab active:cursor-grabbing"
            style={{
              left: circle.cx - circle.r,
              top: circle.cy - circle.r,
              width: circle.r * 2,
              height: circle.r * 2,
              borderRadius: "50%",
              background: "#ffffff",
              boxShadow: "0 2px 10px rgba(0,0,0,.25), inset 0 0 0 1px rgba(0,0,0,.08)",
            }}
          />

          {/* SVG linije (iznad kruga) */}
          <svg
            viewBox={`0 0 ${w} ${h}`}
            width={w}
            height={h}
            className="absolute inset-0 z-20 pointer-events-none"
            aria-hidden
          >
            <rect x="0" y="0" width={w} height={h} fill="#ffffff" />
            {paths.map((d, i) => (
              <path key={i} d={d} stroke="#111" strokeWidth={strokeW} fill="none" />
            ))}
          </svg>
        </div>
      </div>
    </div>
  );
}
