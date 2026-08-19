import Navbar from "./components/Navbar";
import FloatingWhatsapp from "./components/FloatingWhatsapp";
import Footer from "./components/Footer";
import Deferred from "./components/Deferred";
import Hero from "./sections/Hero";
import About from "./sections/About";
import { GraphProvider } from "./context/GraphContext";
import { InspectProvider } from "./context/InspectProvider";

export default function App() {
  return (
    <InspectProvider>
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

            GraphProvider envolve as quatro por simplicidade de ordem/JSX, mas
            só Projects e Technologies de fato consomem o contexto — Timeline e
            Contact não chamam useTechGraph, então não re-renderizam por causa
            dele.
          */}
          <GraphProvider>
            <Deferred
              id="projetos"
              anchorIds={["projetos", "empregaai", "naboa", "risk", "dkastro", "vassvegas", "clinicai"]}
              rootMargin="800px 0px"
              minHeightClassName="min-h-[8520px] sm:min-h-[7200px] lg:min-h-[7790px]"
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
          </GraphProvider>
        </main>
        <Footer />
        <FloatingWhatsapp />
      </div>
    </InspectProvider>
  );
}
