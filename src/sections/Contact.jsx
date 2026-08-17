import { HiArrowUpRight } from "react-icons/hi2";
import { HiOutlineMail } from "react-icons/hi";
import { FaWhatsapp, FaLinkedinIn, FaGithub } from "react-icons/fa";
import Reveal from "../components/Reveal";
import { profile } from "../lib/data";

const CHANNELS = [
  {
    label: "WhatsApp",
    handle: "Falar diretamente comigo",
    href: profile.whatsapp,
    Icon: FaWhatsapp,
    color: "#3ECF8E",
  },
  {
    label: "LinkedIn",
    handle: "/in/wendrel-oliveira",
    href: profile.linkedin,
    Icon: FaLinkedinIn,
    color: "#4C7CF7",
  },
  {
    label: "GitHub",
    handle: "/wendrel-oliveira",
    href: profile.github,
    Icon: FaGithub,
    color: "#F3F4F6",
  },
  {
    label: "Email",
    handle: profile.email,
    href: `mailto:${profile.email}`,
    Icon: HiOutlineMail,
    color: "#8B6BF2",
  },
];

export default function Contact() {
  return (
    <section className="relative overflow-hidden border-t border-base-border py-28">
      <div
        className="pointer-events-none absolute -bottom-32 left-1/2 h-[400px] w-[600px] -translate-x-1/2 rounded-full bg-signal-blue/10 blur-[130px]"
        aria-hidden="true"
      />
      <div className="relative mx-auto max-w-6xl px-6">
        <Reveal>
          <p className="mb-4 font-mono text-xs uppercase tracking-widest text-signal-blue">Contato</p>
        </Reveal>
        <Reveal delay={0.05}>
          <h2 className="max-w-2xl font-display text-3xl font-semibold tracking-tight text-ink sm:text-5xl">
            Vamos construir algo juntos?
          </h2>
        </Reveal>
        <Reveal delay={0.1}>
          <p className="mt-5 max-w-xl text-ink-muted">
            Aberto a conversar sobre projetos, hackathons ou oportunidades de estágio em
            desenvolvimento e dados. Escolha o canal que preferir.
          </p>
        </Reveal>

        <div className="mt-14 grid gap-4 sm:grid-cols-2">
          {CHANNELS.map((channel, i) => (
            <Reveal key={channel.label} delay={i * 0.06}>
              <a
                href={channel.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-4 rounded-2xl border border-base-border bg-base-surface/50 p-5 transition-all duration-300 hover:border-signal-blue/40 hover:bg-base-surface/80"
              >
                <span
                  className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-base-elevated"
                  style={{ color: channel.color }}
                >
                  <channel.Icon size={20} />
                </span>
                <span className="flex-1">
                  <span className="block text-sm font-medium text-ink">{channel.label}</span>
                  <span className="block text-xs text-ink-muted">{channel.handle}</span>
                </span>
                <HiArrowUpRight className="text-ink-faint transition-all duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-ink" />
              </a>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
