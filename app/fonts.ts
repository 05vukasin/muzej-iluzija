// app/fonts.ts
import localFont from "next/font/local";

export const axiforma = localFont({
  display: "swap",
  variable: "--font-axiforma",
  src: [
    { path: "../public/fonts/Axiforma-Book.otf",    weight: "300", style: "normal" },
    { path: "../public/fonts/Axiforma-Regular.otf", weight: "400", style: "normal" },
    { path: "../public/fonts/Axiforma-Black.otf",   weight: "900", style: "normal" },
  ],
});
