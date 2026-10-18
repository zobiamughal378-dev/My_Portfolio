import { motion } from "framer-motion";
import { useState } from "react";

export default function KineticName({ text }: { text: string }) {
  const [hoverSeed, setHoverSeed] = useState(0);

  const letters = text.split("");

  return (
    <div
      className="flex flex-nowrap justify-center lg:justify-start"
      onMouseEnter={() => setHoverSeed((s) => s + 1)}
    >
      {letters.map((ch, i) => {
        const scatterX = ((((i * 37 + hoverSeed * 53) % 21) - 10) * 1.6);
        const scatterY = ((((i * 19 + hoverSeed * 29) % 17) - 8) * 1.4);
        const scatterR = (((i * 13 + hoverSeed * 7) % 25) - 12);
        return (
          <motion.span
            key={`${i}-${ch}`}
            className="kinetic-letter font-display font-extrabold"
            style={{
              color: i % 2 === 0 ? "#ffffff" : "#6fd3f0",
              textShadow: "0 0 40px rgba(111,211,240,0.35)",
              fontSize: "clamp(1.6rem, 6vw, 4.5rem)",
              lineHeight: 1,
            }}
            initial={{ opacity: 0, y: 60, scale: 0.4, rotate: -25 }}
            animate={{ opacity: 1, y: 0, scale: 1, rotate: 0 }}
            transition={{
              type: "spring",
              stiffness: 260,
              damping: 16,
              delay: i * 0.05,
            }}
            whileHover={{
              x: scatterX,
              y: scatterY,
              rotate: scatterR,
              scale: 1.15,
              transition: { type: "spring", stiffness: 300, damping: 10 },
            }}
          >
            {ch === " " ? "\u00A0" : ch}
          </motion.span>
        );
      })}
    </div>
  );
}
