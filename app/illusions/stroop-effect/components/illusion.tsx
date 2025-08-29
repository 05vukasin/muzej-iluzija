"use client";

import { useContext, useEffect, useMemo, useRef, useState } from "react";
import { LanguageContext } from "@/app/context/LanguageContext";

type ColorKey = "RED" | "GREEN" | "BLUE" | "YELLOW";
type ColorItem = { key: ColorKey; name: string; hex: string };
type Mode = "incongruent" | "congruent" | "mixed";

export default function Illusion() {
  const { language } = useContext(LanguageContext);
  const isSr = language === "sr";

  const t = {
    title: isSr ? "Stroopov efekat — mini test" : "Stroop Effect — mini test",
    lead: isSr
      ? "Imenuj BOJU mastila što brže možeš (ne čitaj reč). Izaberi režim i pokreni 30-sekundni test."
      : "Name the INK color as fast as you can (don’t read the word). Pick a mode and start a 30-second test.",
    start: isSr ? "Pokreni" : "Start",
    stop: isSr ? "Zaustavi" : "Stop",
    reset: isSr ? "Resetuj" : "Reset",
    time: isSr ? "Vreme" : "Time",
    correct: isSr ? "Tačno" : "Correct",
    wrong: isSr ? "Greške" : "Errors",
    acc: isSr ? "Tačnost" : "Accuracy",
    avgRt: isSr ? "Prosečna reakcija" : "Avg. reaction",
    mode: isSr ? "Režim" : "Mode",
    mIncong: isSr ? "Neusklađeno" : "Incongruent",
    mCong: isSr ? "Usklađeno" : "Congruent",
    mMixed: isSr ? "Mešovito" : "Mixed",
    hint: isSr
      ? "Tip: Na tastaturi 1–4 biraju boje sa dugmadi."
      : "Tip: Use keys 1–4 to select button colors.",
  };

  // ——— VOKABULAR (tipovi široki, bez `as const`) ———
  const vocabSr: ColorItem[] = [
    { key: "RED", name: "CRVENA", hex: "#ef4444" },
    { key: "GREEN", name: "ZELENA", hex: "#22c55e" },
    { key: "BLUE", name: "PLAVA", hex: "#3b82f6" },
    { key: "YELLOW", name: "ŽUTA", hex: "#f59e0b" },
  ];
  const vocabEn: ColorItem[] = [
    { key: "RED", name: "RED", hex: "#ef4444" },
    { key: "GREEN", name: "GREEN", hex: "#22c55e" },
    { key: "BLUE", name: "BLUE", hex: "#3b82f6" },
    { key: "YELLOW", name: "YELLOW", hex: "#f59e0b" },
  ];

  const vocab: ColorItem[] = useMemo(() => (isSr ? vocabSr : vocabEn), [isSr]);

  // ——— STATE (eksplicitno tipiziran) ———
  const [mode, setMode] = useState<Mode>("incongruent");
  const [running, setRunning] = useState(false);
  const [timeLeft, setTimeLeft] = useState(30);
  const [word, setWord] = useState<ColorItem>(vocab[0]); // semantika (tekst)
  const [ink, setInk] = useState<ColorItem>(vocab[1]);   // mastilo (boja teksta)
  const [stats, setStats] = useState({ ok: 0, wrong: 0 });
  const [rts, setRts] = useState<number[]>([]);
  const trialStartRef = useRef<number | null>(null);

  // Ako se promeni jezik, resetuj trenutni stimulus da odgovara novom vokabularu
  useEffect(() => {
    setWord(vocab[0]);
    setInk(vocab[1]);
  }, [vocab]);

  // ——— Helpers ———
  const rand = (n: number) => Math.floor(Math.random() * n);
  const pick = <T,>(arr: readonly T[]): T => arr[rand(arr.length)];

  const nextTrial = () => {
    const w = pick(vocab); // reč (semantika)
    let i = pick(vocab);   // boja mastila
    if (mode === "incongruent") {
      while (i.key === w.key) i = pick(vocab); // garantuj konflikt
    } else if (mode === "congruent") {
      i = w;
    } else {
      // mixed
      if (Math.random() < 0.5) i = w;
      else while (i.key === w.key) i = pick(vocab);
    }
    setWord(w);
    setInk(i);
    trialStartRef.current = performance.now();
  };

  // Tajmer
  useEffect(() => {
    if (!running) return;
    const id = setInterval(() => {
      setTimeLeft((t) => {
        if (t <= 1) {
          clearInterval(id);
          setRunning(false);
          return 0;
        }
        return t - 1;
      });
    }, 1000);
    return () => clearInterval(id);
  }, [running]);

  const start = () => {
    setStats({ ok: 0, wrong: 0 });
    setRts([]);
    setTimeLeft(30);
    setRunning(true);
    nextTrial();
  };
  const stop = () => setRunning(false);
  const reset = () => {
    setRunning(false);
    setStats({ ok: 0, wrong: 0 });
    setRts([]);
    setTimeLeft(30);
    setWord(vocab[0]);
    setInk(vocab[1]);
    trialStartRef.current = null;
  };

  // Odgovor
  const answer = (key: ColorKey) => {
    if (!running) return;
    const now = performance.now();
    const rt = trialStartRef.current ? now - trialStartRef.current : null;
    setStats((s) => (key === ink.key ? { ...s, ok: s.ok + 1 } : { ...s, wrong: s.wrong + 1 }));
    if (rt != null) setRts((arr) => [...arr, rt]);
    nextTrial();
  };

  // Prečice 1–4
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const map: Record<string, number> = { "1": 0, "2": 1, "3": 2, "4": 3 };
      const idx = map[e.key];
      if (idx != null) answer(vocab[idx].key);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [vocab, running]);

  const accuracy = useMemo(() => {
    const total = stats.ok + stats.wrong;
    return total ? Math.round((stats.ok / total) * 100) : 0;
  }, [stats]);

  const avgRt = useMemo(() => {
    if (!rts.length) return 0;
    const sum = rts.reduce((a, b) => a + b, 0);
    return Math.round(sum / rts.length);
  }, [rts]);

  return (
    <div className="rounded-2xl bg-black/65 backdrop-blur-md text-white shadow-2xl ring-1 ring-white/10 p-6 sm:p-8 lg:p-10">
      <h2 className="text-xl sm:text-2xl font-bold tracking-tight">💯 {t.title}</h2>
      <p className="mt-2 text-white/80">{t.lead}</p>

      {/* Controls */}
      <div className="mt-5 flex flex-col md:flex-row items-stretch md:items-end gap-3">
        <div className="flex-1">
          <label className="block text-xs text-white/70 mb-1">{t.mode}</label>
          <select
            value={mode}
            onChange={(e) => setMode(e.target.value as Mode)}
            className="w-full rounded-lg bg-white/90 text-black px-3 py-2 ring-1 ring-black/10"
            disabled={running}
          >
            <option value="incongruent">{t.mIncong}</option>
            <option value="congruent">{t.mCong}</option>
            <option value="mixed">{t.mMixed}</option>
          </select>
        </div>

        <div className="flex gap-2">
          {!running ? (
            <button
              onClick={start}
              className="rounded-full px-4 py-2 font-semibold transition shadow-sm ring-1 bg-brand-235 text-white ring-transparent hover:brightness-110"
            >
              {t.start}
            </button>
          ) : (
            <button
              onClick={stop}
              className="rounded-full px-4 py-2 font-semibold transition shadow-sm ring-1 bg-white/85 text-primary ring-black/10 hover:bg-white"
            >
              {t.stop}
            </button>
          )}
          <button
            onClick={reset}
            className="rounded-full px-4 py-2 font-semibold transition shadow-sm ring-1 border border-white/20 bg-transparent hover:bg-white/10"
          >
            {t.reset}
          </button>
        </div>
      </div>

      {/* Arena */}
      <div className="mt-6 mx-auto w-full max-w-[980px]">
        <div
          className="relative w-full rounded-xl ring-1 ring-white/10 shadow-lg bg-white overflow-hidden"
          style={{ minHeight: 280 }}
          aria-live="polite"
        >
          {/* Scorebar */}
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 p-3 bg-black/5 text-black">
            <div className="text-sm"><span className="text-black/60">{t.time}:</span> <b>{timeLeft}s</b></div>
            <div className="text-sm"><span className="text-black/60">{t.correct}:</span> <b>{stats.ok}</b></div>
            <div className="text-sm"><span className="text-black/60">{t.wrong}:</span> <b className="text-red-600">{stats.wrong}</b></div>
            <div className="text-sm"><span className="text-black/60">{t.acc}:</span> <b>{accuracy}%</b></div>
            <div className="text-sm"><span className="text-black/60">{t.avgRt}:</span> <b>{avgRt} ms</b></div>
          </div>

          {/* Stimulus */}
          <div className="flex items-center justify-center py-8 sm:py-10">
            <div
              className="font-black tracking-tight"
              style={{
                fontSize: "clamp(36px, 8vw, 72px)",
                color: ink.hex,
              }}
            >
              {word.name}
            </div>
          </div>

          {/* Response buttons */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 px-4 pb-6">
            {vocab.map((c, idx) => (
              <button
                key={c.key}
                onClick={() => answer(c.key)}
                className="rounded-xl px-4 py-3 font-semibold text-white shadow-sm transition active:scale-[0.98] focus:outline-none focus:ring-2 focus:ring-black/20"
                style={{ background: c.hex }}
              >
                {c.name}
                <span className="ml-2 text-white/80 text-xs">[{idx + 1}]</span>
              </button>
            ))}
          </div>
        </div>

        <div className="mt-2 text-xs text-white/70">{t.hint}</div>
      </div>
    </div>
  );
}
