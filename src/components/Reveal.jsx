import { motion } from "framer-motion";

/**
 * Reveal — wraps children with a fade + slide-up reveal, triggered once
 * when the element enters the viewport. `delay` lets siblings stagger.
 */
export default function Reveal({
  children,
  delay = 0,
  y = 24,
  duration = 0.6,
  className = "",
  as = "div",
}) {
  const Comp = motion[as] || motion.div;

  return (
    <Comp
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration, delay, ease: [0.16, 1, 0.3, 1] }}
      className={className}
    >
      {children}
    </Comp>
  );
}
