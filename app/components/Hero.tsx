// app/components/Hero.tsx
"use client";

import Image from "next/image";
import { useContext } from "react";
import { LanguageContext } from "../context/LanguageContext";

const backgroundImage = "/images/picture-1.jpg";
const logo = "/images/logo-white.png";

export default function Hero() {
  const { language } = useContext(LanguageContext);

  return (
    <section
      id="home"
      className="relative grid min-h-[calc(100svh-4rem)] place-items-center overflow-hidden"
    >
      {/* Pozadina */}
      <div className="absolute inset-0 -z-10">
        <Image
          src={backgroundImage}
          alt={
            language === "sr"
              ? "Iluzionarijum pozadina"
              : "Iluzionarijum background"
          }
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
      </div>

      {/* Kartica */}
      <div className="px-4 w-full max-w-6xl mx-auto">
        <div className="cards mx-auto">
          <figure className="card">
            <figcaption className="card_title">
              {language === "sr"
                ? "Muzej iluzija na Zlatiboru"
                : "Museum of Illusions in Zlatibor"}
            </figcaption>

            {/* Logo centriran na sredinu kartice */}
            <div className="card_logo">
              <Image
                src={logo}
                alt="Iluzionarijum logo"
                width={520}
                height={520}
                priority
              />
            </div>

            <p className="card_body">
              {language === "sr"
                ? "Interaktivne instalacije, optičke iluzije i vizuelne zagonetke za celu porodicu."
                : "Interactive installations, optical illusions and visual brain teasers for all ages."}
            </p>

            <a href="/iluzije" className="card_btn">
              {language === "sr" ? "Pogledaj" : "Explore"}
            </a>
          </figure>
        </div>
      </div>

      <style jsx>{`
        .cards {
          display: grid;
          place-items: center;
          perspective: 1000px;
        }
        .card {
          width: min(94vw, 680px);
          height: clamp(220px, 52vw, 400px);
          background: rgba(10, 10, 10, 0.7);
          border-radius: 20px;
          position: relative;
          transform-style: preserve-3d;
          overflow: hidden;
          box-shadow: 0 25px 70px rgba(0, 0, 0, 0.45);
          transform: rotateY(14deg) rotateX(6deg);
          animation: swing 2.6s ease-in-out infinite alternate;
        }
        @keyframes swing {
          0% {
            transform: rotateY(14deg) rotateX(6deg) scale(1);
          }
          100% {
            transform: rotateY(20deg) rotateX(9deg) scale(1.03);
          }
        }

        .card::after {
          content: "";
          position: absolute;
          inset: 0;
          background: radial-gradient(
            120% 120% at 100% 0%,
            rgba(255, 255, 255, 0.12),
            transparent 70%
          );
          pointer-events: none;
          transform: translateZ(1px);
        }

        .card_title {
          position: absolute;
          left: 20px;
          right: 20px;
          top: 20px;
          font-weight: 900;
          font-size: clamp(28px, 5vw, 38px);
          line-height: 1.2;
          transform: translateZ(60px);
          text-align: center;
          background-image: linear-gradient(
            90deg,
            #ff0080,
            #7928ca,
            #2afadf,
            #009efd
          );
          background-size: 200% auto;
          -webkit-background-clip: text;
          background-clip: text;
          color: transparent;
          animation: gradient-move 4s linear infinite;
        }
        @keyframes gradient-move {
          to {
            background-position: 200% center;
          }
        }

        .card_logo {
          display: flex;
          padding-top:100px;
          justify-content: center;
          align-items: center;
          z-index: 2;
        }

        .card_logo img {
          width: 90% !important; /* 90% od širine kartice */
          height: auto !important; /* proporcionalno */
          max-width: none !important;
        }

        .card_body {
          position: absolute;
          left: 10px;
          right: 10px;
          bottom: 88px;
          color: #f0f0f0;
          font-weight: 300;
          font-size: clamp(15px, 3.5vw, 19px);
          line-height: 1.45;
          transform: translateZ(38px);
          text-shadow: 0 2px 10px rgba(0, 0, 0, 0.7);
          text-align: center;
        }

        .card_btn {
          position: absolute;
          left: 50%;
          bottom: 24px;
          transform: translateX(-50%) translateZ(70px);
          display: inline-block;
          padding: 12px 28px;
          border-radius: 9999px;
          background: linear-gradient(90deg, #ff0080, #7928ca);
          color: #fff;
          font-weight: 700;
          text-decoration: none;
          box-shadow: 0 12px 30px rgba(0, 0, 0, 0.45);
          transition: transform 0.15s ease, filter 0.2s ease;
        }
        .card_btn:hover {
          filter: brightness(1.08);
        }
        .card_btn:active {
          transform: translateX(-50%) translateZ(70px) scale(0.97);
        }

        /* mobilna prilagodljivost */
        @media (max-width: 640px) {
          .card {
            height: 300px;
            animation: swing 2.2s ease-in-out infinite alternate;
          }
          .card_logo img {
            width: 540px !important;
            height: auto !important;
          }
          .card_body {
            font-size: 15px;
            bottom: 76px;
          }
        }
      `}</style>
    </section>
  );
}
