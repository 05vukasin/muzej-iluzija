// app/layout.tsx
import type { Metadata } from "next";
import "./globals.css";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Preloader from "./components/Preloader";
import { LanguageProvider } from "./context/LanguageContext";
import ScrollToTop from "./ScrollToTop";
import { axiforma } from "./fonts"; // import ostaje

export const metadata: Metadata = {
  title: "Iluzionarijum — Muzej iluzija Zlatibor",
  description:
    "Zvaničan sajt Iluzionarijuma na Zlatiboru — optičke iluzije, interaktivne instalacije, edukacija i zabava za celu porodicu.",
  icons: {
    icon: "/icon.svg",
    shortcut: "/icon.svg",
    apple: "/images/logo-colors.png",
  },
  openGraph: {
    title: "Iluzionarijum — Muzej iluzija Zlatibor",
    description: "Doživite svet optičkih iluzija i interaktivnih instalacija na Zlatiboru.",
    type: "website",
    images: [{ url: "/images/logo-colors.png", width: 1200, height: 630, alt: "Iluzionarijum" }],
    siteName: "Iluzionarijum",
  },
  twitter: {
    card: "summary_large_image",
    title: "Iluzionarijum — Muzej iluzija Zlatibor",
    description: "Optičke iluzije, interaktivne instalacije, edukacija i zabava.",
    images: ["/images/logo-colors.png"],
  },
  themeColor: "#ffffff",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="sr" className="overflow-x-hidden">
      {/* KLJUČNO: koristi axiforma.className umesto variable */}
      <body className={`${axiforma.className} bg-white text-primary overflow-x-hidden antialiased`}>
        <LanguageProvider>
          <Preloader />
          <Navbar />
          <ScrollToTop />
          <main className="pt-16 w-full max-w-[100vw] overflow-x-hidden">{children}</main>
          <Footer />
        </LanguageProvider>
      </body>
    </html>
  );
}
