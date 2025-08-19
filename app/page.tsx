import Hero from "./components/Hero";
import About from "./components/About";
import IllusionSection from "./components/IllusionSection";
import WhatToExpect from "./components/WhatToExpect";


export default function Home() {
  return (
    <main className="relative overflow-visible">
      <Hero />
      <About />
      <IllusionSection />
      <WhatToExpect />
    </main>
  );
}
