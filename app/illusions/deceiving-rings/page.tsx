"use client";

import Link from "next/link";
import Illusion from "./components/illusion";
import TextBlock from "./components/text";
import { FiArrowLeft } from "react-icons/fi";

export default function TheRingsPage() {
  return (
    <section className="relative">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10 sm:py-14">
        <Link
          href="/illusions"
          aria-label="Back"
          title="Back"
          className="
            inline-flex h-10 w-10 items-center justify-center
            rounded-full bg-white/80 text-primary
            shadow-sm ring-1 ring-black/10
            hover:bg-white/95 hover:shadow-md
            focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-235/60
            transition mb-6
          "
        >
          <FiArrowLeft className="text-lg" aria-hidden="true" />
        </Link>

        <div className="grid gap-8">
          <Illusion />
          <TextBlock />
        </div>
      </div>
    </section>
  );
}
