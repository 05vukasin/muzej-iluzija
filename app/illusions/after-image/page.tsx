"use client";

import Link from "next/link";
import Illusion from "./components/illusion";
import TextBlock from "./components/text";
import { FiArrowLeft } from "react-icons/fi";

export default function AfterimagePage() {
  return (
    <section className="relative">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10 sm:py-14">
        <Link
          href="/illusions"
          aria-label="Back"
          className="inline-flex items-center justify-center mb-6 h-10 w-10 rounded-full ring-1 ring-black/10 bg-white shadow-md text-primary hover:bg-accent-1/60 transition"
        >
          <FiArrowLeft className="text-xl" aria-hidden="true" />
        </Link>

        <div className="grid gap-8">
          <Illusion />
          <TextBlock />
        </div>
      </div>
    </section>
  );
}
