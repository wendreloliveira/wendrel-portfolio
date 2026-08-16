import { motion } from "framer-motion";
import { FaWhatsapp } from "react-icons/fa";
import { profile } from "../lib/data";

export default function FloatingWhatsapp() {
  return (
    <motion.a
      href={profile.whatsapp}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chamar no WhatsApp"
      initial={{ opacity: 0, scale: 0.6 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 1, duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
      whileHover={{ scale: 1.08 }}
      whileTap={{ scale: 0.96 }}
      className="fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-signal-green text-white shadow-soft"
    >
      <FaWhatsapp size={24} />
    </motion.a>
  );
}
