import Header from "../components/layout/Header";
import Hero from "../components/sections/Hero";
import About from "../components/sections/About";
import Projects from "../components/sections/Projects";
import Contact from "../components/sections/Contact";

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col relative w-full overflow-x-hidden pt-24">
      <Header />
      <Hero />
      <About />
      <Projects />
      <Contact />
    </main>
  );
}