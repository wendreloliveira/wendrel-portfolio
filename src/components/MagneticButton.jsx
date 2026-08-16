import { useRef } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

/**
 * MagneticButton — the button drifts a few pixels toward the cursor while
 * hovered, then springs back. Kept subtle (small max offset, soft spring)
 * so it reads as polish, not a gimmick.
 */
export default function MagneticButton({ href, className = "", children, strength = 14 }) {
  const ref = useRef(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { damping: 18, stiffness: 200, mass: 0.4 });
  const springY = useSpring(y, { damping: 18, stiffness: 200, mass: 0.4 });

  const handleMouseMove = (e) => {
    const bounds = ref.current?.getBoundingClientRect();
    if (!bounds) return;
    const relX = e.clientX - bounds.left - bounds.width / 2;
    const relY = e.clientY - bounds.top - bounds.height / 2;
    x.set((relX / bounds.width) * strength);
    y.set((relY / bounds.height) * strength);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.a
      ref={ref}
      href={href}
      style={{ x: springX, y: springY }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      whileTap={{ scale: 0.97 }}
      className={className}
    >
      {children}
    </motion.a>
  );
}
