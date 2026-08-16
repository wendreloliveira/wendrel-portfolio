import { motion } from "framer-motion";
import heroPhoto from "../assets/hero-photo.jpg";
import { profile } from "../lib/data";

export default function HeroProfileCard({ className = "" }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16, rotate: -2 }}
      animate={{ opacity: 1, y: 0, rotate: -3 }}
      transition={{ duration: 0.8, delay: 0.55, ease: [0.16, 1, 0.3, 1] }}
      whileHover={{ rotate: 0, scale: 1.03, y: -4 }}
      className={`w-40 shrink-0 animate-float rounded-2xl border border-base-border bg-base-surface/70 p-2.5 shadow-soft backdrop-blur-md sm:w-44 z-20 ${className}`}
      style={{ animationDuration: "7s" }}
    >
      <div className="overflow-hidden rounded-xl border border-base-border/60">
        <img
          src={heroPhoto}
          alt={`Foto de ${profile.name}`}
          className="aspect-[4/5] w-full object-cover"
          loading="eager"
        />
      </div>
      <div className="px-1 py-2">
        <p className="truncate text-xs font-medium text-ink">{profile.name}</p>
        <p className="mt-0.5 flex items-center gap-1.5 text-[11px] text-ink-muted">
          <span className="h-1.5 w-1.5 rounded-full bg-signal-green" />
          disponível
        </p>
      </div>
    </motion.div>
  );
}
