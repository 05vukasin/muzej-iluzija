"use client";

import Image from "next/image";
import { useContext, useMemo, useState } from "react";
import { LanguageContext } from "@/app/context/LanguageContext";

export default function Illusion() {
  const { language } = useContext(LanguageContext);
  const isSr = language === "sr";

  // kontrole
  const [temp, setTemp] = useState(0); // -100..100
  const [expo, setExpo] = useState(0); // -50..50
  const [splitOn, setSplitOn] = useState(false);
  const [splitPos, setSplitPos] = useState(50); // %

  const t = {
    title: isSr ? "Varljiva haljina" : "The Dress Illusion",
    lead: isSr
      ? "Kako pretpostavke o svetlu (hladno/toplo) menjaju doživljaj boje."
      : "How your light-source assumption (cool/warm) shifts perceived color.",
    presets: isSr ? "Pretpostavke" : "Presets",
    indoor: isSr ? "U radnji (hladno)" : "Indoors (cool)",
    outdoor: isSr ? "Napolju (toplo)" : "Outdoors (warm)",
    neutral: isSr ? "Neutralno" : "Neutral",
    temperature: isSr ? "Temperatura" : "Temperature",
    exposure: isSr ? "Ekspozicija" : "Exposure",
    compare: isSr ? "Poredi (split)" : "Compare (split)",
    position: isSr ? "Pozicija podele" : "Split position",
    note: isSr
      ? "Savjet: uključite „Poredi (split)“ i pomerajte vertikalnu podelu."
      : "Tip: enable “Compare (split)” and drag the vertical divider.",
  };

  // overlay boja i jačina (toplo=žuto, hladno=plavo)
  const { overlayColor, overlayOpacity } = useMemo(() => {
    const strength = Math.min(1, Math.abs(temp) / 100); // 0..1
    const opacity = 0.65 * strength;
    const color = temp >= 0 ? "rgba(90,140,255,1)" : "rgba(255,222,130,1)";
    return { overlayColor: color, overlayOpacity: opacity };
  }, [temp]);

  // filter ekspozicije
  const filterCSS = useMemo(() => {
    const b = 1 + expo / 100; // 0.5..1.5
    const c = 1 + expo / 200; // 0.75..1.25
    const s = 1 + Math.abs(expo) / 300; // 1..~1.17
    return `brightness(${b}) contrast(${c}) saturate(${s})`;
  }, [expo]);

  return (
    <div className="rounded-2xl bg-black/65 backdrop-blur-md text-white shadow-2xl ring-1 ring-white/10 p-6 sm:p-8 lg:p-10">
      <h2 className="text-xl sm:text-2xl font-bold tracking-tight">
        {t.title}
      </h2>
      <p className="mt-2 text-white/80">{t.lead}</p>

      {/* Telefoni: kolona; Desktop (lg+): slika levo, kontrole desno */}
      <div className="mt-6 sm:mt-8 grid gap-6 lg:grid-cols-2 lg:items-start">
        {/* LEVA KOLONA – SAMO SLIKA (sa interaktivnim overlay-em) */}
        <div className="w-full mx-auto max-w-[900px]">
          <div
            className="
                relative rounded-xl ring-1 ring-white/10 shadow-lg overflow-hidden
                bg-[#111]
                w-full aspect-[3/4]           /* telefon: 3:4 i zauzmi širinu kolone */
                lg:w-auto                     /* desktop: ne rastegni na 100% */
                lg:[--h:min(70vh,720px)]      /* cap visine na desktopu */
                lg:[height:var(--h)]          /* postavi visinu... */
                lg:[width:calc(var(--h)*0.75)]/* ...i iz nje izvedi širinu (3:4) */
            "
            style={{
              // portretni odnos bez tailwind plugin-a
              aspectRatio: "3 / 4",
              background: "#111",
            }}
          >
            {/* Original (uvek ispod) */}
            <Image
              src="/images/illusions/lying-dress.jpg"
              alt={isSr ? "Varljiva haljina" : "The Dress"}
              fill
              draggable={false}
              quality={90}
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover select-none"
              priority
            />

            {/* Prilagođena kopija + overlay (seče se po split-u) */}
            <div
              className="absolute inset-0"
              style={{
                width: splitOn ? `${splitPos}%` : "100%",
                overflow: "hidden",
                willChange: "transform",
              }}
              aria-hidden={!splitOn}
            >
              <Image
                src="/images/illusions/lying-dress.jpg"
                alt=""
                fill
                draggable={false}
                quality={90}
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover select-none"
                style={{ filter: filterCSS }}
                priority
              />
              <div
                className="absolute inset-0"
                style={{
                  backgroundColor: overlayColor,
                  opacity: overlayOpacity,
                  mixBlendMode: "color",
                }}
              />
            </div>

            {/* Divider kad je split aktivan */}
            {splitOn && (
              <div
                className="absolute top-0 bottom-0"
                style={{
                  left: `${splitPos}%`,
                  width: 2,
                  background:
                    "linear-gradient(to bottom, rgba(255,255,255,0.8), rgba(255,255,255,0.2))",
                  transform: "translateX(-1px)",
                }}
                aria-hidden
              />
            )}
          </div>
        </div>

        {/* DESNA KOLONA – PODEŠAVANJA (na telefonu ide ispod slike, kao i pre) */}
        <div className="grid gap-5">
          {/* Presets */}
          <div>
            <span className="block text-sm sm:text-base text-white/90">
              {t.presets}
            </span>
            <div className="mt-3 flex flex-wrap gap-2">
              <button
                onClick={() => {
                  setTemp(60);
                  setExpo(8);
                }}
                className="px-3 py-1.5 rounded-full border text-sm bg-white/70 text-primary border-black/10 hover:bg-accent-1/60"
              >
                {t.indoor}
              </button>
              <button
                onClick={() => {
                  setTemp(-60);
                  setExpo(-4);
                }}
                className="px-3 py-1.5 rounded-full border text-sm bg-white/70 text-primary border-black/10 hover:bg-accent-1/60"
              >
                {t.outdoor}
              </button>
              <button
                onClick={() => {
                  setTemp(0);
                  setExpo(0);
                }}
                className="px-3 py-1.5 rounded-full border text-sm bg-white/70 text-primary border-black/10 hover:bg-accent-1/60"
              >
                {t.neutral}
              </button>
            </div>
          </div>

          {/* Temperature */}
          <Control
            labelLeft={t.temperature}
            labelRight={`${temp > 0 ? "+" : ""}${temp}`}
            input={
              <input
                type="range"
                min={-100}
                max={100}
                value={temp}
                onChange={(e) => setTemp(parseInt(e.target.value, 10))}
                className="w-full accent-brand-235"
              />
            }
          />

          {/* Exposure */}
          <Control
            labelLeft={t.exposure}
            labelRight={`${expo > 0 ? "+" : ""}${expo}`}
            input={
              <input
                type="range"
                min={-50}
                max={50}
                value={expo}
                onChange={(e) => setExpo(parseInt(e.target.value, 10))}
                className="w-full accent-brand-235"
              />
            }
          />

          {/* Split view */}
          <label className="flex items-center gap-3 text-sm sm:text-base">
            <input
              type="checkbox"
              checked={splitOn}
              onChange={(e) => setSplitOn(e.target.checked)}
              className="size-4 accent-brand-235"
            />
            <span className="text-white/90">{t.compare}</span>
          </label>

          {splitOn && (
            <Control
              labelLeft={t.position}
              labelRight={`${splitPos}%`}
              input={
                <input
                  type="range"
                  min={0}
                  max={100}
                  value={splitPos}
                  onChange={(e) => setSplitPos(parseInt(e.target.value, 10))}
                  className="w-full accent-brand-235"
                />
              }
            />
          )}

          <p className="text-white/70 text-xs">{t.note}</p>
        </div>
      </div>
    </div>
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
