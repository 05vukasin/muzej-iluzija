"use client";

import { useContext, useEffect, useMemo, useRef, useState } from "react";
import { LanguageContext } from "@/app/context/LanguageContext";

type Choice = "A" | "B" | "C";

export default function Illusion() {
  const { language } = useContext(LanguageContext);
  const isSr = language === "sr";

  const t = {
    title: isSr ? "Konformizam — mini Asch test" : "Conformity — mini Asch test",
    lead: isSr
      ? "Koja linija (A, B ili C) je iste dužine kao referentna? Uključi/isključi „grupu koja greši“ i vidi da li će te povući većina."
      : "Which line (A, B, or C) matches the reference? Toggle “group is wrong” and see if the majority sways you.",
    groupWrongOn: isSr ? "Grupa greši (uključi/isključi)" : "Group is wrong (toggle)",
    groupWrongOff: isSr ? "Grupa tačna (uključi/isključi)" : "Group correct (toggle)",
    newTrial: isSr ? "Novi pokušaj" : "New trial",
    yourPick: isSr ? "Tvoj izbor" : "Your pick",
    groupPick: isSr ? "Grupa kaže" : "Group says",
    result: isSr ? "Rezultat" : "Result",
    correct: isSr ? "Tačno" : "Correct",
    wrong: isSr ? "Netačno" : "Wrong",
    conformed: isSr ? "Konformizam" : "Conformed",
    independent: isSr ? "Nezavisno" : "Independent",
    stats: isSr ? "Statistika" : "Stats",
    trials: isSr ? "Pokušaji" : "Trials",
    acc: isSr ? "Tačnost" : "Accuracy",
    confRate: isSr ? "Stopa konformizma" : "Conformity rate",
    hint: isSr ? "Klikni/tačni A, B ili C • Dugme menja stav grupe" : "Click/Tap A, B or C • Button toggles group stance",
    refLabel: isSr ? "REF" : "REF",
  };

  // Responsive wrapper
  const wrapRef = useRef<HTMLDivElement | null>(null);
  const [w, setW] = useState(740);
  const [h, setH] = useState(360);

  useEffect(() => {
    const el = wrapRef.current;
    if (!el) return;
    const ro = new ResizeObserver(([entry]) => {
      const cw = entry.contentRect.width;
      const smallN = cw < 560;
      const ch = smallN
        ? Math.min(Math.max(320, cw * 0.9), 560)
        : Math.min(Math.max(260, cw * 0.46), 480);
      setW(cw);
      setH(ch);
    });
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  const small = w < 560;

  // Layout za SVG (zavisi od w/h)
  const refX = Math.round(w * (small ? 0.14 : 0.18));
  const colX = (small ? [0.54, 0.74, 0.92] : [0.50, 0.67, 0.84]).map((p) => Math.round(w * p));
  const baseY = Math.round(h * (small ? 0.84 : 0.78));
  const topY = Math.round(h * (small ? 0.10 : 0.16));
  const maxHeight = Math.max(40, baseY - topY - 6); // sve visine moraju stati u ovaj raspon
  const strokeW = small ? 10 : 8;
  const fontSize = small ? 18 : 16;

  // ——— Trial generator unutar vidljivog raspona ———
  function makeTrialWithin(maxH: number) {
    const refH = randInt(Math.round(maxH * 0.45), Math.round(maxH * 0.85));
    const mkWrong = () => {
      // ±18–35% razlike, uz clamp da stane u platno i da se dovoljno razlikuje
      const dPct = randInt(18, 35) / 100;
      const sign: -1 | 1 = Math.random() < 0.5 ? -1 : 1;
      let h = Math.round(refH * (1 + sign * dPct));
      const minH = Math.round(maxH * 0.25);
      h = clamp(h, minH, maxH);
      // obavezno barem ~8% razlike od reference
      if (Math.abs(h - refH) < Math.round(maxH * 0.08)) {
        h = clamp(refH + sign * Math.round(maxH * 0.12), minH, maxH);
      }
      if (h === refH) h = clamp(h + (sign > 0 ? 10 : -10), minH, maxH);
      return h;
    };
    const wrong1 = mkWrong();
    let wrong2 = mkWrong();
    if (wrong2 === wrong1) wrong2 = mkWrong();

    const choices: Choice[] = ["A", "B", "C"];
    const correct = choices[randInt(0, 3)];
    const map: Record<Choice, number> = { A: 0, B: 0, C: 0 };
    const wrongs = choices.filter((c) => c !== correct);
    map[correct] = refH;
    map[wrongs[0]] = wrong1;
    map[wrongs[1]] = wrong2;

    return { refH, heights: map, correct };
  }

  // State
  const [trial, setTrial] = useState(() => makeTrialWithin(maxHeight));
  const [groupWrong, setGroupWrong] = useState(true);
  const [groupPick, setGroupPick] = useState<Choice>(() => {
    const all: Choice[] = ["A", "B", "C"];
    const wrongs = all.filter((c) => c !== trial.correct);
    return groupWrong ? pick(wrongs) : trial.correct;
  });
  const [yourPick, setYourPick] = useState<Choice | null>(null);

  // Stats: konformizam se računa samo kad je grupa pogrešna
  const [stats, setStats] = useState({ trials: 0, ok: 0, conformed: 0, trialsWrong: 0 });

  // Ako se promeni platno (w/h), generiši trial koji sigurno staje u platno
  useEffect(() => {
    setTrial(makeTrialWithin(maxHeight));
    setYourPick(null);
  }, [w, h]); // eslint-disable-line react-hooks/exhaustive-deps

  // Kad se promeni režim grupe ili trial, osveži izbor grupe i resetuj korisnikov izbor
  useEffect(() => {
    const all: Choice[] = ["A", "B", "C"];
    const wrongs = all.filter((c) => c !== trial.correct);
    setGroupPick(groupWrong ? pick(wrongs) : trial.correct);
    setYourPick(null);
  }, [groupWrong, trial]);

  const accuracy = useMemo(
    () => (stats.trials ? Math.round((stats.ok / stats.trials) * 100) : 0),
    [stats]
  );
  const confRate = useMemo(
    () => (stats.trialsWrong ? Math.round((stats.conformed / stats.trialsWrong) * 100) : 0),
    [stats]
  );

  const onNewTrial = () => setTrial(makeTrialWithin(maxHeight));

  const onPick = (c: Choice) => {
    if (yourPick) return; // jednom po pokušaju
    setYourPick(c);
    setStats((s) => ({
      trials: s.trials + 1,
      ok: s.ok + (c === trial.correct ? 1 : 0), // tačnost = poklapa se sa referentnom linijom
      conformed: s.conformed + (groupWrong && c === groupPick ? 1 : 0), // konformizam samo kad je grupa pogrešna
      trialsWrong: s.trialsWrong + (groupWrong ? 1 : 0),
    }));
  };

  // Helper za iscrtavanje jedne linije
  const Line = ({
    x,
    height,
    selected,
    label,
  }: {
    x: number;
    height: number;
    selected?: boolean;
    label: string;
  }) => {
    const y1 = baseY;
    const y0 = baseY - height; // sve visine već garantovano staju u platno
    return (
      <>
        <line
          x1={x}
          y1={y1}
          x2={x}
          y2={y0}
          stroke={selected ? "var(--brand-235,#840B55)" : "#111"}
          strokeWidth={strokeW}
          strokeLinecap="round"
        />
        <text
          x={x}
          y={y1 + (small ? 28 : 24)}
          textAnchor="middle"
          fontSize={fontSize}
          fill="#111"
          style={{ fontWeight: 700 }}
        >
          {label}
        </text>
      </>
    );
  };

  // “Glasovi” grupe iznad njihovog izbora
  const VoteChips = ({ x, y }: { x: number; y: number }) => {
    const N = small ? 5 : 6;
    const r = small ? 7 : 8;
    const gap = 4;
    const totalW = N * (r * 2) + (N - 1) * gap;
    const start = x - totalW / 2 + r;
    return (
      <>
        {Array.from({ length: N }).map((_, i) => (
          <circle
            key={i}
            cx={start + i * (2 * r + gap)}
            cy={y}
            r={r}
            fill="var(--brand-235,#840B55)"
            opacity={0.85}
          />
        ))}
      </>
    );
  };

  const allChoices: Choice[] = ["A", "B", "C"];
  const groupX = colX[allChoices.indexOf(groupPick)];

  // Široke tap-zone po koloni
  const hitW = Math.round(w * (small ? 0.26 : 0.18));
  const hitY = Math.max(0, topY - 12);
  const hitH = baseY - topY + (small ? 48 : 36);

  return (
    <div className="rounded-2xl bg-black/65 backdrop-blur-md text-white shadow-2xl ring-1 ring-white/10 p-6 sm:p-8 lg:p-10">
      <h2 className="text-xl sm:text-2xl font-bold tracking-tight">{t.title}</h2>
      <p className="mt-2 text-white/80">{t.lead}</p>

      <div ref={wrapRef} className="mt-6 sm:mt-8 mx-auto w-full max-w-[980px]">
        <div
          className="relative w-full rounded-xl ring-1 ring-white/10 shadow-lg bg-white overflow-hidden touch-manipulation"
          style={{ height: h }}
          aria-label={isSr ? "Asch linije — izaberi A/B/C" : "Asch lines — choose A/B/C"}
        >
          {/* hint */}
          <div className="absolute left-1/2 -translate-x-1/2 top-3 text-xs sm:text-sm px-3 py-1 rounded-full bg-black/50 text-white">
            {t.hint}
          </div>

          <svg viewBox={`0 0 ${w} ${h}`} width={w} height={h} className="absolute inset-0">
            {/* podloga */}
            <rect x="0" y="0" width={w} height={h} fill="#ffffff" />

            {/* “glasovi” grupe iznad njihovog izbora */}
            <VoteChips x={groupX} y={topY + 6} />

            {/* referentna linija */}
            <Line x={refX} height={trial.refH} label={t.refLabel} />

            {/* A/B/C linije */}
            <Line x={colX[0]} height={trial.heights.A} label="A" selected={yourPick === "A"} />
            <Line x={colX[1]} height={trial.heights.B} label="B" selected={yourPick === "B"} />
            <Line x={colX[2]} height={trial.heights.C} label="C" selected={yourPick === "C"} />

            {/* velike tap-zone po koloni */}
            <rect
              x={colX[0] - hitW / 2}
              y={hitY}
              width={hitW}
              height={hitH}
              fill="transparent"
              className="cursor-pointer"
              onClick={() => onPick("A")}
            />
            <rect
              x={colX[1] - hitW / 2}
              y={hitY}
              width={hitW}
              height={hitH}
              fill="transparent"
              className="cursor-pointer"
              onClick={() => onPick("B")}
            />
            <rect
              x={colX[2] - hitW / 2}
              y={hitY}
              width={hitW}
              height={hitH}
              fill="transparent"
              className="cursor-pointer"
              onClick={() => onPick("C")}
            />
          </svg>
        </div>

        {/* ABC dugmići — sada uvek vidljivi (i desktop i mobilni) */}
        <div className="mt-3 flex justify-center gap-2">
          {(["A", "B", "C"] as Choice[]).map((c) => (
            <button
              key={c}
              onClick={() => onPick(c)}
              disabled={!!yourPick}
              className={[
                "rounded-full px-4 py-2 font-semibold transition shadow-sm ring-1",
                yourPick === c ? "bg-brand-235 text-white" : "bg-white/85 text-primary hover:bg-white",
                yourPick ? "opacity-80" : "",
              ].join(" ")}
            >
              {c}
            </button>
          ))}
        </div>

        {/* Kontrole */}
        <div className="mt-4 grid gap-3 sm:grid-cols-3">
          <div className="flex items-center gap-2 sm:col-span-2">
            <button
              onClick={() => setGroupWrong((s) => !s)}
              className={[
                "rounded-full px-4 py-2 font-semibold transition shadow-sm ring-1",
                groupWrong
                  ? "bg-white/85 text-primary ring-black/10 hover:bg-white"
                  : "bg-brand-235 text-white ring-transparent hover:brightness-110",
              ].join(" ")}
            >
              {groupWrong ? t.groupWrongOn : t.groupWrongOff}
            </button>

            <button
              onClick={onNewTrial}
              className="rounded-full px-4 py-2 font-semibold transition shadow-sm ring-1 border border-white/20 bg-transparent hover:bg-white/10"
            >
              {t.newTrial}
            </button>
          </div>

          {/* Rezultat pokušaja */}
          <div className="sm:text-right">
            <div className="text-sm text-white/80">
              <span className="inline-block min-w-[110px]">{t.groupPick}:</span>{" "}
              <b className="text-white">{groupPick}</b>
            </div>
            <div className="text-sm text-white/80">
              <span className="inline-block min-w-[110px]">{t.yourPick}:</span>{" "}
              <b className={yourPick ? "text-white" : "text-white/60"}>{yourPick ?? "—"}</b>
            </div>
            {yourPick && (
              <div className="text-sm text-white/80">
                <span className="inline-block min-w-[110px]">{t.result}:</span>{" "}
                <b className={yourPick === trial.correct ? "text-emerald-400" : "text-red-400"}>
                  {yourPick === trial.correct ? t.correct : t.wrong}
                </b>{" "}
                •{" "}
                <b className={yourPick === groupPick ? "text-amber-300" : "text-sky-300"}>
                  {yourPick === groupPick ? t.conformed : t.independent}
                </b>
              </div>
            )}
          </div>
        </div>

        {/* Statistika */}
        <div className="mt-4 rounded-xl border border-white/10 bg-white/5 p-3 sm:p-4">
          <div className="font-semibold">{t.stats}</div>
          <div className="mt-2 grid grid-cols-2 sm:grid-cols-5 gap-2 text-sm">
            <div>
              <div className="text-white/70">{t.trials}</div>
              <div className="font-semibold">{stats.trials}</div>
            </div>
            <div>
              <div className="text-white/70">{t.acc}</div>
              <div className="font-semibold">{accuracy}%</div>
            </div>
            <div>
              <div className="text-white/70">{t.confRate}</div>
              <div className="font-semibold">{confRate}%</div>
            </div>
            <div>
              <div className="text-white/70">{isSr ? "Pokušaji (grupa greši)" : "Trials (group wrong)"}</div>
              <div className="font-semibold">{stats.trialsWrong}</div>
            </div>
            <div>
              <div className="text-white/70">{isSr ? "Tačni / Konform." : "Correct / Conform."}</div>
              <div className="font-semibold">
                {stats.ok} / {stats.conformed}
              </div>
            </div>
          </div>
        </div>

        <div className="mt-2 text-xs text-white/70">{t.hint}</div>
      </div>
    </div>
  );
}

/* Helpers */
function randInt(a: number, b: number) {
  return Math.floor(Math.random() * (b - a)) + a; // [a, b)
}
function clamp(x: number, lo: number, hi: number) {
  return Math.max(lo, Math.min(hi, x));
}
function pick<T>(arr: readonly T[]): T {
  return arr[randInt(0, arr.length)];
}
