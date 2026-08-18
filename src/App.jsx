import Navbar from "./components/Navbar";
import FloatingWhatsapp from "./components/FloatingWhatsapp";
import Footer from "./components/Footer";
import Deferred from "./components/Deferred";
import Hero from "./sections/Hero";
import About from "./sections/About";

export default function App() {
  return (
    <div className="relative min-h-screen bg-base text-ink">
      <Navbar />
      <main>
        <Hero />
        <About />
        {/*
          Abaixo da dobra: o wrapper com o id real fica sempre no DOM (anchors
          do Navbar e do Terminal continuam funcionando), mas o código e o
          componente só carregam quando a seção se aproxima da viewport.
          Projects é o candidato mais pesado — rootMargin maior, começa a
          carregar bem antes de entrar na tela. anchorIds cobre os cases
          individuais e os projetos secundários (só existem no DOM depois
          que Projects monta) — "open <slug>" no Terminal precisa poder
          acordar essa seção mesmo mirando um id que ainda não existe.
        */}
        <Deferred
          id="projetos"
          anchorIds={["projetos", "empregaai", "risk", "dkastro", "vassvegas", "clinicai", "piemp"]}
          rootMargin="800px 0px"
          minHeightClassName="min-h-[7013px] sm:min-h-[6200px] lg:min-h-[5935px]"
          importer={() => import("./sections/Projects")}
        />
        <Deferred
          id="timeline"
          rootMargin="400px 0px"
          minHeightClassName="min-h-[1184px] lg:min-h-[982px]"
          importer={() => import("./sections/Timeline")}
        />
        <Deferred
          id="tecnologias"
          rootMargin="400px 0px"
          minHeightClassName="min-h-[2181px] lg:min-h-[1318px]"
          importer={() => import("./sections/Technologies")}
        />
        <Deferred
          id="contato"
          rootMargin="400px 0px"
          minHeightClassName="min-h-[891px] lg:min-h-[616px]"
          importer={() => import("./sections/Contact")}
        />
      </main>
      <Footer />
      <FloatingWhatsapp />
    </div>
  );
}
