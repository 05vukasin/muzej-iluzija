"use client";

import type { Metadata } from "next";
import "./globals.css";
import Navbar from "./Navbar";
import { LanguageProvider } from "./context/LanguageContext"; // Novi import ✅

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <LanguageProvider>
      {" "}
      {/* Omotaj sve u LanguageProvider */}
      <html lang="sr" className="overflow-x-hidden">
        <body
          suppressHydrationWarning={true}
          className="bg-gray-100 text-gray-900 overflow-x-hidden"
        >
          <Navbar />
          <main className="w-full max-w-[100vw] overflow-x-hidden">
            {children}
          </main>
        </body>
      </html>
    </LanguageProvider>
  );
}
