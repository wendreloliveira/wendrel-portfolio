import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Reveal from "../components/Reveal";
import { timeline } from "../lib/data";

export default function Timeline() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 0.8", "end 0.5"],
  });
  const lineHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <section className="relative border-t border-base-border py-28">
      <div className="mx-auto max-w-4xl px-6">
        <Reveal>
          <p className="mb-4 font-mono text-xs uppercase tracking-widest text-signal-blue">Trajetória</p>
        </Reveal>
        <Reveal delay={0.05}>
          <h2 className="max-w-2xl font-display text-3xl font-semibold tracking-tight text-ink sm:text-4xl">
            Experiências &amp; marcos de 2025
          </h2>
        </Reveal>

        <div ref={containerRef} className="relative mt-16 pl-8">
          <div className="absolute left-[7px] top-1 h-full w-px bg-base-border" />
          <motion.div
            style={{ height: lineHeight }}
            className="absolute left-[7px] top-1 w-px bg-grad-signal"
          />

          <div className="flex flex-col gap-12">
            {timeline.map((item, i) => (
              <Reveal key={i} delay={i * 0.05} className="relative">
                <span className="absolute -left-8 top-1 flex h-4 w-4 items-center justify-center rounded-full border-2 border-base bg-signal-blue">
                  <span className="h-1.5 w-1.5 rounded-full bg-white" />
                </span>
                <span className="mb-1 block font-mono text-xs text-ink-faint">{item.year}</span>
                <h3 className="font-display text-lg font-medium text-ink">{item.title}</h3>
                <p className="mt-1.5 max-w-xl text-sm leading-relaxed text-ink-muted">{item.description}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
