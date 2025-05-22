import Hero from "./components/Hero";
import About from "./components/About";
import Contact from "./components/Contact";

export default function Home() {
  return (
    <main className="relative overflow-visible">
      <Hero />
      <About />
      <Contact />
    </main>
  );
}
