import { motion } from "framer-motion";

export default function SkillBar({ name, level, delay = 0 }) {
  return (
    <div>
      <div className="mb-2 flex items-baseline justify-between">
        <span className="text-sm font-medium text-ink">{name}</span>
        <span className="font-mono text-xs text-ink-faint">{level}%</span>
      </div>
      <div className="h-1.5 w-full overflow-hidden rounded-full bg-base-elevated">
        <motion.div
          initial={{ width: 0 }}
          whileInView={{ width: `${level}%` }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 1, delay, ease: [0.16, 1, 0.3, 1] }}
          className="h-full rounded-full bg-grad-signal"
        />
      </div>
    </div>
  );
}
