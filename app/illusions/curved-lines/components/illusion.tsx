"use client";

import { useContext, useEffect, useRef, useState } from "react";
import { LanguageContext } from "@/app/context/LanguageContext";

type DragState =
  | null
  | {
      which: "top" | "bottom";
      pointerId: number;
      dxPct: number;
      dyPct: number;
    };

export default function Illusion() {
  const { language } = useContext(LanguageContext);
  const isSr = language === "sr";

  const t = {
    title: isSr ? "Zakrivljene (ne)jednake linije" : "Curved (Un)equal Lines",
    lead: isSr
      ? "Prevuci i rotiraj oblike. Identični su — ali kada su jedan ispod drugog, donji često deluje duži. Sada možeš i da ih okreneš da bi ih precizno poravnao."
      : "Drag and rotate the shapes. They’re identical—yet stacked one under the other the lower often looks longer. You can rotate each piece to align them precisely.",
    controls: isSr ? "Početni položaji i rotacije" : "Starting positions & rotations",
    reset: isSr ? "Resetuj" : "Reset",
    top: isSr ? "Gornji" : "Top",
    bottom: isSr ? "Donji" : "Bottom",
    x: "X",
    y: "Y",
    rot: isSr ? "Rotacija" : "Rotation",
  };

  // Responsive canvas
  const wrapRef = useRef<HTMLDivElement | null>(null);
  const [w, setW] = useState(720);
  const [h, setH] = useState(360);

  useEffect(() => {
    const el = wrapRef.current;
    if (!el) return;
    const ro = new ResizeObserver(([entry]) => {
      const cw = entry.contentRect.width;
      const ch = Math.min(Math.max(280, cw * 0.5), 460);
      setW(cw);
      setH(ch);
    });
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  // Positions as percentages (stable across resizes)
  const [topX, setTopX] = useState(53);
  const [topY, setTopY] = useState(36);
  const [botX, setBotX] = useState(47);
  const [botY, setBotY] = useState(64);

  // Rotations (degrees)
  const [topRot, setTopRot] = useState(3);
  const [botRot, setBotRot] = useState(0);

  const reset = () => {
    setTopX(50);
    setTopY(36);
    setBotX(50);
    setBotY(64);
    setTopRot(0);
    setBotRot(0);
  };

  // Dragging
  const dragRef = useRef<DragState>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);

  const pctFromClient = (clientX: number, clientY: number) => {
    const rect = containerRef.current!.getBoundingClientRect();
    const xPct = ((clientX - rect.left) / rect.width) * 100;
    const yPct = ((clientY - rect.top) / rect.height) * 100;
    return { xPct, yPct };
    // note: rotacija ne utiče na drag – prevlačiš “centar” elementa
  };

  const onPointerDown =
    (which: "top" | "bottom") => (e: React.PointerEvent<HTMLDivElement>) => {
      const { xPct, yPct } = pctFromClient(e.clientX, e.clientY);
      const cx = which === "top" ? topX : botX;
      const cy = which === "top" ? topY : botY;
      dragRef.current = {
        which,
        pointerId: e.pointerId,
        dxPct: cx - xPct,
        dyPct: cy - yPct,
      };
      (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
    };

  const onPointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    const d = dragRef.current;
    if (!d) return;
    const { xPct, yPct } = pctFromClient(e.clientX, e.clientY);
    const nx = Math.max(0, Math.min(100, xPct + d.dxPct));
    const ny = Math.max(0, Math.min(100, yPct + d.dyPct));
    if (d.which === "top") {
      setTopX(nx);
      setTopY(ny);
    } else {
      setBotX(nx);
      setBotY(ny);
    }
  };

  const onPointerUp = (e: React.PointerEvent<HTMLDivElement>) => {
    const d = dragRef.current;
    if (d) {
      try {
        (e.currentTarget as HTMLElement).releasePointerCapture(d.pointerId);
      } catch {}
    }
    dragRef.current = null;
  };

  const imgBase =
    "absolute select-none pointer-events-auto cursor-grab active:cursor-grabbing";

  const maxImgW = Math.min(w * 0.82, 720);

  return (
    <div className="rounded-2xl bg-black/65 backdrop-blur-md text-white shadow-2xl ring-1 ring-white/10 p-6 sm:p-8 lg:p-10">
      <h2 className="text-xl sm:text-2xl font-bold tracking-tight">⌇ {t.title}</h2>
      <p className="mt-2 text-white/80">{t.lead}</p>

      <div ref={wrapRef} className="mt-6 sm:mt-8 mx-auto w-full max-w-[900px]">
        <div
          ref={containerRef}
          className="relative w-full rounded-xl ring-1 ring-white/10 shadow-lg bg-neutral-50 overflow-hidden touch-none"
          style={{ height: h }}
          onPointerMove={onPointerMove}
          onPointerUp={onPointerUp}
          onPointerCancel={onPointerUp}
          aria-label={
            isSr
              ? "Dva zakrivljena oblika – prevuci i rotiraj"
              : "Two curved shapes — drag and rotate"
          }
        >
          {/* TOP (plavi PNG) */}
          <div
            role="button"
            aria-label={isSr ? "Prevuci gornji oblik" : "Drag top shape"}
            className={imgBase}
            style={{
              left: `${topX}%`,
              top: `${topY}%`,
              transform: `translate(-50%, -50%) rotate(${topRot}deg)`,
              width: maxImgW,
            }}
            onPointerDown={onPointerDown("top")}
          >
            <img
              src="/images/illusions/curved-line.png"
              alt={isSr ? "Gornji zakrivljeni oblik" : "Top curved piece"}
              draggable={false}
              className="block w-full h-auto"
            />
          </div>

          {/* BOTTOM (iste slike, rekolorisano u crno) */}
          <div
            role="button"
            aria-label={isSr ? "Prevuci donji oblik" : "Drag bottom shape"}
            className={imgBase}
            style={{
              left: `${botX}%`,
              top: `${botY}%`,
              transform: `translate(-50%, -50%) rotate(${botRot}deg)`,
              width: maxImgW,
            }}
            onPointerDown={onPointerDown("bottom")}
          >
            <img
              src="/images/illusions/curved-line.png"
              alt={isSr ? "Donji zakrivljeni oblik" : "Bottom curved piece"}
              draggable={false}
              className="block w-full h-auto"
              style={{ filter: "grayscale(1) brightness(0)" }}
            />
          </div>
        </div>

        {/* Kontrole */}
        <div className="mt-6 grid gap-5">
          <p className="text-sm text-white/80">{t.controls}</p>

          <div className="grid sm:grid-cols-2 gap-6">
            {/* TOP controls */}
            <div>
              <p className="font-semibold mb-2">{t.top}</p>
              <label className="block text-sm text-white/90 mb-1">
                {t.x}: <span className="tabular-nums">{topX.toFixed(0)}%</span>
              </label>
              <input
                type="range"
                min={0}
                max={100}
                value={topX}
                onChange={(e) => setTopX(parseFloat(e.target.value))}
                className="w-full accent-brand-235"
              />
              <label className="block text-sm text-white/90 mt-3 mb-1">
                {t.y}: <span className="tabular-nums">{topY.toFixed(0)}%</span>
              </label>
              <input
                type="range"
                min={0}
                max={100}
                value={topY}
                onChange={(e) => setTopY(parseFloat(e.target.value))}
                className="w-full accent-brand-235"
              />
              <label className="block text-sm text-white/90 mt-3 mb-1">
                {t.rot}: <span className="tabular-nums">{topRot.toFixed(0)}°</span>
              </label>
              <input
                type="range"
                min={-180}
                max={180}
                step={1}
                value={topRot}
                onChange={(e) => setTopRot(parseFloat(e.target.value))}
                className="w-full accent-brand-235"
              />
            </div>

            {/* BOTTOM controls */}
            <div>
              <p className="font-semibold mb-2">{t.bottom}</p>
              <label className="block text-sm text-white/90 mb-1">
                {t.x}: <span className="tabular-nums">{botX.toFixed(0)}%</span>
              </label>
              <input
                type="range"
                min={0}
                max={100}
                value={botX}
                onChange={(e) => setBotX(parseFloat(e.target.value))}
                className="w-full accent-brand-235"
              />
              <label className="block text-sm text-white/90 mt-3 mb-1">
                {t.y}: <span className="tabular-nums">{botY.toFixed(0)}%</span>
              </label>
              <input
                type="range"
                min={0}
                max={100}
                value={botY}
                onChange={(e) => setBotY(parseFloat(e.target.value))}
                className="w-full accent-brand-235"
              />
              <label className="block text-sm text-white/90 mt-3 mb-1">
                {t.rot}: <span className="tabular-nums">{botRot.toFixed(0)}°</span>
              </label>
              <input
                type="range"
                min={-180}
                max={180}
                step={1}
                value={botRot}
                onChange={(e) => setBotRot(parseFloat(e.target.value))}
                className="w-full accent-brand-235"
              />
            </div>
          </div>

          <div className="flex justify-end">
            <button
              onClick={reset}
              className="rounded-full bg-white/85 text-primary px-4 py-2 font-semibold ring-1 ring-black/10 hover:bg-white"
            >
              {t.reset}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
