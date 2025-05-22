import type { Metadata } from "next";
import "./globals.css";
import Navbar from "./Navbar";
import { LanguageProvider } from "./context/LanguageContext";
import ScrollToTop from "./ScrollToTop"; // ⬅️ Dodato
import Footer from "./components/Footer";

export const metadata: Metadata = {
  title: "Dino Park Zlatibor",
  description:
    "Zvanični sajt Dino Parka Zlatibor - edukacija, zabava, avantura",
  keywords: [
    "dino park",
    "zlatibor",
    "porodica",
    "aktivnosti",
    "deca",
    "zabava",
    "dinosaurusi",
  ],
  icons: {
    icon: "/logo.png",
    shortcut: "/logo.png",
    apple: "/logo.png",
  },
  openGraph: {
    title: "Dino Park Zlatibor",
    description:
      "Idealno mesto za porodicu i decu - istražite svet dinosaurusa!",
    type: "website",
    url: "https://www.dinopark.rs",
    images: [
      {
        url: "/logo.png",
        width: 1200,
        height: 630,
        alt: "Dino Park Open Graph Image",
      },
    ],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="sr" className="overflow-x-hidden">
      <body className="bg-gray-100 text-gray-900 overflow-x-hidden">
        <LanguageProvider>
          <Navbar />
          <ScrollToTop /> {/* ⬅️ Ubaceno ovde */}
          <main className="w-full max-w-[100vw] overflow-x-hidden">
            {children}
          </main>
        </LanguageProvider>
        <Footer />
      </body>
    </html>
  );
}
