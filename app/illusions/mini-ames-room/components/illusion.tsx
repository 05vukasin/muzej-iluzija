"use client";

import { useContext, useEffect, useMemo, useRef, useState } from "react";
import { LanguageContext } from "@/app/context/LanguageContext";

/**
 * Mini Ames Room — interactive 2D demo
 * - SVG “room” built from trapezoids (floor, walls, back wall)
 * - Two identical figures placed in opposite back corners
 * - “Illusion” scales figures based on asymmetric room geometry (simulating fixed-camera view)
 * - “Reality” shows them truly identical
 * - Swap button to move figures between corners
 * - Mobile/desktop responsive, no overflow
 */

export default function Illusion() {
  const { language } = useContext(LanguageContext);
  const isSr = language === "sr";

  const t = {
    title: isSr ? "Mini Ejmsova soba" : "Mini Ames Room",
    lead: isSr
      ? "Dve identične figure deluju različito velike u ovom asimetričnom „prostoru“ — mozak veruje sobi više nego objektima."
      : "Two identical figures appear different in size inside this asymmetric ‘room’ — the brain trusts the room over the objects.",
    mode: isSr ? "Režim" : "Mode",
    illusion: isSr ? "Iluzija" : "Illusion",
    reality: isSr ? "Realnost" : "Reality",
    strength: isSr ? "Jačina efekta" : "Effect strength",
    swap: isSr ? "Zameni figure" : "Swap figures",
    hint: isSr
      ? "Gledaj pravo u „sobu“: iz ovog ugla deluje pravougaono, iako nije."
      : "Look straight into the ‘room’: from this view it seems rectangular, though it isn’t.",
  };

  // Responsive canvas
  const wrapRef = useRef<HTMLDivElement | null>(null);
  const [w, setW] = useState(900);
  const [h, setH] = useState(520);

  useEffect(() => {
    const el = wrapRef.current;
    if (!el) return;
    const ro = new ResizeObserver((entries) => {
      const r = entries[0].contentRect;
      // Height: comfortable on phone & smaller on desktop (no overflow)
      const hh = Math.max(260, Math.min(r.width * 0.58, 420));
      setW(r.width);
      setH(hh);
    });
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  // Controls
  const [mode, setMode] = useState<"illusion" | "reality">("illusion");
  const [strength, setStrength] = useState(70); // 0..100
  const [swap, setSwap] = useState(false);

  // Room geometry (in SVG pixels) — trapezoidal “Ames-like” layout
  const geom = useMemo(() => {
    const padX = w * 0.04;
    const frontW = w - padX * 2; // front opening
    const yFloorFront = h * 0.84;
    const yFloorBack = h * 0.52;

    // Make back edge skewed (Ames asymmetry)
    const xFrontL = padX;
    const xFrontR = padX + frontW;

    // Back edge is shorter and slanted
    const backInsetL = w * 0.20; // left retreats more
    const backInsetR = w * 0.06; // right retreats less
    const xBackL = xFrontL + backInsetL;
    const xBackR = xFrontR - backInsetR;

    // Back wall “heights” differ left vs right
    const backWallLeftTopY = yFloorBack - h * 0.34;  // taller on the left
    const backWallRightTopY = yFloorBack - h * 0.22; // shorter on the right

    return {
      floor: { xFL: xFrontL, yFF: yFloorFront, xFR: xFrontR, xBL: xBackL, xBR: xBackR, yFB: yFloorBack },
      backWall: {
        // Quad: (xBL, yFB) -> (xBR, yFB) -> (xBR, topR) -> (xBL, topL)
        xBL: xBackL,
        xBR: xBackR,
        yB: yFloorBack,
        topL: backWallLeftTopY,
        topR: backWallRightTopY,
      },
      // Side walls (quads) join front opening to back wall sides
      leftWall: {
        pts: [
          [xFrontL, yFloorFront],
          [xBackL, yFloorBack],
          [xBackL, backWallLeftTopY],
          [xFrontL, backWallLeftTopY + (yFloorFront - yFloorBack) * 0.62],
        ] as [number, number][],
      },
      rightWall: {
        pts: [
          [xBackR, yFloorBack],
          [xFrontR, yFloorFront],
          [xFrontR, backWallRightTopY + (yFloorFront - yFloorBack) * 0.62],
          [xBackR, backWallRightTopY],
        ] as [number, number][],
      },
    };
  }, [w, h]);

  // Figure screen positions (near back corners)
  const figPositions = useMemo(() => {
    const left = { x: geom.backWall.xBL + (w * 0.012), y: geom.backWall.yB - 2 };
    const right = { x: geom.backWall.xBR - (w * 0.012), y: geom.backWall.yB - 2 };
    return swap ? { A: right, B: left } : { A: left, B: right };
  }, [geom, w, swap]);

  // Figure base size & illusion scaling
  // Base pixel height of figures when "reality" (identical)
  const baseHeight = Math.max(38, Math.min(64, Math.round(h * 0.14)));
  const s = strength / 100; // 0..1

  // In illusion mode, make the figure on the "nearer" side (left) larger and the other smaller
  // We modulate by room asymmetry — a gentle but noticeable difference
  const scaleLeft = mode === "illusion" ? 1 + 0.55 * s : 1;
  const scaleRight = mode === "illusion" ? 1 - 0.35 * s : 1;

  const dimsA = swap
    ? { h: baseHeight * scaleRight, anchorY: figPositions.A.y }
    : { h: baseHeight * scaleLeft, anchorY: figPositions.A.y };
  const dimsB = swap
    ? { h: baseHeight * scaleLeft, anchorY: figPositions.B.y }
    : { h: baseHeight * scaleRight, anchorY: figPositions.B.y };

  // Helpers
  const poly = (pts: [number, number][]) => pts.map(([x, y]) => `${x},${y}`).join(" ");

  return (
    <div className="rounded-2xl bg-black/65 backdrop-blur-md text-white shadow-2xl ring-1 ring-white/10 p-6 sm:p-8 lg:p-10">
      <h2 className="text-xl sm:text-2xl font-bold tracking-tight">📦 {t.title}</h2>
      <p className="mt-2 text-white/80">{t.lead}</p>

      {/* Canvas */}
      <div className="mt-6 sm:mt-8 mx-auto w-full max-w-[900px]">
        <div
          ref={wrapRef}
          className="relative w-full overflow-hidden rounded-xl ring-1 ring-white/10 shadow-lg bg-neutral-200"
          style={{ height: h }}
          aria-label={isSr ? "Mini Ejmsova soba — interaktivni prikaz" : "Mini Ames Room — interactive view"}
        >
          <svg viewBox={`0 0 ${w} ${h}`} width={w} height={h} className="absolute inset-0 block">

            {/* FLOOR (trapezoid) */}
            <defs>
              <pattern id="floorGrid" width="22" height="22" patternUnits="userSpaceOnUse">
                <rect width="22" height="22" fill="#d9d9d9" />
                <path d="M 22 0 L 0 0 0 22" stroke="#b7b7b7" strokeWidth="1" />
              </pattern>
              <linearGradient id="wallShadeL" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stopColor="#efefef" />
                <stop offset="100%" stopColor="#d7d7d7" />
              </linearGradient>
              <linearGradient id="wallShadeR" x1="1" y1="0" x2="0" y2="0">
                <stop offset="0%" stopColor="#efefef" />
                <stop offset="100%" stopColor="#d7d7d7" />
              </linearGradient>
              <linearGradient id="backShade" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#f1f1f1" />
                <stop offset="100%" stopColor="#dbdbdb" />
              </linearGradient>
            </defs>

            {/* Side walls */}
            <polygon
              points={poly(geom.leftWall.pts)}
              fill="url(#wallShadeL)"
              stroke="#cfcfcf"
              strokeWidth="1"
            />
            <polygon
              points={poly(geom.rightWall.pts)}
              fill="url(#wallShadeR)"
              stroke="#cfcfcf"
              strokeWidth="1"
            />

            {/* Back wall */}
            <polygon
              points={poly([
                [geom.backWall.xBL, geom.backWall.yB],
                [geom.backWall.xBR, geom.backWall.yB],
                [geom.backWall.xBR, geom.backWall.topR],
                [geom.backWall.xBL, geom.backWall.topL],
              ])}
              fill="url(#backShade)"
              stroke="#cfcfcf"
              strokeWidth="1"
            />

            {/* Floor */}
            <polygon
              points={poly([
                [geom.floor.xFL, geom.floor.yFF],
                [geom.floor.xFR, geom.floor.yFF],
                [geom.floor.xBR, geom.floor.yFB],
                [geom.floor.xBL, geom.floor.yFB],
              ])}
              fill="url(#floorGrid)"
              stroke="#cfcfcf"
              strokeWidth="1"
            />

            {/* Floor perspective lines to sell depth */}
            {Array.from({ length: 10 }).map((_, i) => {
              const t = (i + 1) / 11;
              const xL = geom.floor.xFL + (geom.floor.xBL - geom.floor.xFL) * t;
              const xR = geom.floor.xFR + (geom.floor.xBR - geom.floor.xFR) * t;
              const y = geom.floor.yFF + (geom.floor.yFB - geom.floor.yFF) * t;
              return <line key={i} x1={xL} y1={y} x2={xR} y2={y} stroke="#bfbfbf" strokeWidth="1" />;
            })}

            {/* “Door”/frame lines */}
            <line
              x1={geom.floor.xFL}
              y1={geom.leftWall.pts[3][1]}
              x2={geom.floor.xFR}
              y2={geom.rightWall.pts[2][1]}
              stroke="#cfcfcf"
              strokeWidth="2"
            />

            {/* Figures */}
            <Figure
              x={figPositions.A.x}
              baseY={figPositions.A.y}
              heightPx={dimsA.h}
              label={isSr ? "A" : "A"}
            />
            <Figure
              x={figPositions.B.x}
              baseY={figPositions.B.y}
              heightPx={dimsB.h}
              label={isSr ? "B" : "B"}
            />

            {/* Hint badge */}
            <g>
              <rect
                x={w / 2 - 120}
                y={h - 38}
                width={240}
                height={26}
                rx={13}
                fill="rgba(0,0,0,0.5)"
              />
              <text
                x={w / 2}
                y={h - 20}
                fill="#fff"
                fontSize="12"
                textAnchor="middle"
                style={{ fontFamily: "system-ui, -apple-system, Segoe UI, Roboto, sans-serif" }}
              >
                {t.hint}
              </text>
            </g>
          </svg>
        </div>
      </div>

      {/* Controls */}
      <div className="mt-6 grid gap-5">
        {/* Mode + Swap */}
        <div className="flex flex-wrap items-center gap-3">
          <span className="text-sm sm:text-base text-white/90">{t.mode}:</span>
          <div className="flex gap-2">
            <button
              onClick={() => setMode("illusion")}
              className={[
                "px-3 py-1.5 rounded-full border text-sm transition",
                mode === "illusion"
                  ? "bg-brand-235 text-white border-brand-235"
                  : "bg-white/70 text-primary border-black/10 hover:bg-accent-1/60",
              ].join(" ")}
            >
              {t.illusion}
            </button>
            <button
              onClick={() => setMode("reality")}
              className={[
                "px-3 py-1.5 rounded-full border text-sm transition",
                mode === "reality"
                  ? "bg-brand-235 text-white border-brand-235"
                  : "bg-white/70 text-primary border-black/10 hover:bg-accent-1/60",
              ].join(" ")}
            >
              {t.reality}
            </button>
          </div>

          <button
            onClick={() => setSwap((s) => !s)}
            className="ml-auto rounded-full bg-white/85 text-primary px-4 py-1.5 font-semibold ring-1 ring-black/10 hover:bg-white transition"
          >
            {t.swap}
          </button>
        </div>

        {/* Strength */}
        <Control
          labelLeft={t.strength}
          labelRight={`${strength}%`}
          input={
            <input
              type="range"
              min={0}
              max={100}
              value={strength}
              onChange={(e) => setStrength(parseInt(e.target.value, 10))}
              className="w-full accent-brand-235"
              disabled={mode === "reality"}
            />
          }
        />
      </div>
    </div>
  );
}

/** Little stick-figure anchored by feet at (x, baseY) with total height = heightPx */
function Figure({
  x,
  baseY,
  heightPx,
  label,
}: {
  x: number;
  baseY: number;
  heightPx: number;
  label: string;
}) {
  const headR = heightPx * 0.16;
  const bodyH = heightPx * 0.54;
  const legH = heightPx * 0.30;
  const yHeadC = baseY - (legH + bodyH + headR);
  const yBodyTop = yHeadC + headR * 0.8;
  const yBodyBot = yBodyTop + bodyH;

  return (
    <g>
      {/* shadow on floor */}
      <ellipse cx={x} cy={baseY} rx={headR * 1.4} ry={headR * 0.4} fill="rgba(0,0,0,0.15)" />
      {/* head */}
      <circle cx={x} cy={yHeadC} r={headR} fill="#222" />
      {/* body */}
      <rect
        x={x - headR * 0.45}
        y={yBodyTop}
        width={headR * 0.9}
        height={bodyH}
        rx={headR * 0.18}
        fill="#2b2b2b"
      />
      {/* legs */}
      <rect x={x - headR * 0.9} y={yBodyBot} width={headR * 0.5} height={legH} rx={headR * 0.12} fill="#343434" />
      <rect x={x + headR * 0.4} y={yBodyBot} width={headR * 0.5} height={legH} rx={headR * 0.12} fill="#343434" />
      {/* label */}
      <text
        x={x}
        y={yHeadC - headR - 6}
        fill="#111"
        fontSize={Math.max(10, headR * 0.8)}
        textAnchor="middle"
        style={{ fontFamily: "system-ui, -apple-system, Segoe UI, Roboto, sans-serif" }}
      >
        {label}
      </text>
    </g>
  );
}

function Control({
  labelLeft,
  labelRight,
  input,
}: {
  labelLeft: string;
  labelRight: string;
  input: React.ReactNode;
}) {
  return (
    <div>
      <div className="flex items-center justify-between text-sm sm:text-base">
        <span className="text-white/90">{labelLeft}</span>
        <span className="tabular-nums text-white/80">{labelRight}</span>
      </div>
      <div className="mt-3">{input}</div>
    </div>
  );
}
