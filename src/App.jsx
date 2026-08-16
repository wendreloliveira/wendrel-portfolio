import Navbar from "./components/Navbar";
import FloatingWhatsapp from "./components/FloatingWhatsapp";
import Footer from "./components/Footer";
import Hero from "./sections/Hero";
import About from "./sections/About";
import Projects from "./sections/Projects";
import Timeline from "./sections/Timeline";
import Technologies from "./sections/Technologies";
import Contact from "./sections/Contact";

export default function App() {
  return (
    <div className="relative min-h-screen bg-base text-ink">
      <Navbar />
      <main>
        <Hero />
        <About />
        <Projects />
        <Timeline />
        <Technologies />
        <Contact />
      </main>
      <Footer />
      <FloatingWhatsapp />
    </div>
  );
}
