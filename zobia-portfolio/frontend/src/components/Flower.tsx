import { motion, type Variants } from "framer-motion";

const petalV: Variants = {
  hidden: { scale: 0, opacity: 0 },
  show: { scale: 1, opacity: 1, transition: { type: "spring", stiffness: 130, damping: 11 } },
};

/** Flower drawn around (0,0), radius about 50 – use inside an <svg>. */
export function FlowerGroup({
  petals = 8,
  colors = ["#ff9ec4", "#ffc2dc"],
  center = "#ffd77a",
  delay = 0,
}: {
  petals?: number;
  colors?: [string, string] | string[];
  center?: string;
  delay?: number;
}) {
  return (
    <motion.g
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.3 }}
      variants={{ hidden: {}, show: { transition: { staggerChildren: 0.07, delayChildren: delay } } }}
    >
      {Array.from({ length: petals }, (_, i) => (
        <g key={i} transform={`rotate(${(i * 360) / petals})`}>
          <motion.ellipse
            cx="0"
            cy="-27"
            rx="13"
            ry="25"
            fill={colors[i % colors.length]}
            stroke="rgba(255,255,255,0.45)"
            strokeWidth="1"
            variants={petalV}
            style={{ transformOrigin: "0px 0px" }}
          />
        </g>
      ))}
      <motion.circle cx="0" cy="0" r="12" fill={center} variants={petalV} style={{ transformOrigin: "0px 0px" }} />
      <circle cx="-3" cy="-3" r="3" fill="#fff" opacity="0.7" />
    </motion.g>
  );
}

/** Stand-alone, slowly spinning flower. */
export default function Flower({
  size = 90,
  petals = 8,
  colors,
  center,
  delay = 0,
  className = "",
  duration = 40,
}: {
  size?: number;
  petals?: number;
  colors?: string[];
  center?: string;
  delay?: number;
  className?: string;
  duration?: number;
}) {
  return (
    <motion.svg
      viewBox="-55 -55 110 110"
      width={size}
      height={size}
      className={`pointer-events-none ${className}`}
      animate={{ rotate: 360 }}
      transition={{ duration, repeat: Infinity, ease: "linear" }}
      aria-hidden="true"
    >
      <FlowerGroup petals={petals} colors={colors} center={center} delay={delay} />
    </motion.svg>
  );
}

const STEMS = [
  { x: 90, h: 120, s: 0.8, c: ["#ff9ec4", "#ffc2dc"], p: 8 },
  { x: 230, h: 165, s: 1.05, c: ["#6fd3f0", "#bfeaf8"], p: 7 },
  { x: 380, h: 110, s: 0.75, c: ["#ffd77a", "#fff0b8"], p: 9 },
  { x: 540, h: 175, s: 1.15, c: ["#ff9ec4", "#fff"], p: 8 },
  { x: 700, h: 125, s: 0.85, c: ["#b79cff", "#dccfff"], p: 6 },
  { x: 850, h: 170, s: 1.05, c: ["#6fd3f0", "#ff9ec4"], p: 8 },
  { x: 1010, h: 115, s: 0.8, c: ["#ffd77a", "#ff9ec4"], p: 7 },
  { x: 1130, h: 150, s: 0.95, c: ["#ff9ec4", "#ffc2dc"], p: 8 },
];

/** Row of flowers whose stems grow and bloom when scrolled into view. */
export function FlowerGarden({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 1200 230"
      preserveAspectRatio="xMidYMax slice"
      className={`pointer-events-none w-full ${className}`}
      aria-hidden="true"
    >
      {STEMS.map((f, i) => {
        const top = 230 - f.h;
        const bend = i % 2 === 0 ? 22 : -22;
        return (
          <g key={f.x}>
            <motion.path
              d={`M ${f.x} 232 C ${f.x + bend} ${232 - f.h * 0.4}, ${f.x - bend} ${232 - f.h * 0.75}, ${f.x} ${top}`}
              fill="none"
              stroke="#7fd9c0"
              strokeWidth="4"
              strokeLinecap="round"
              initial={{ pathLength: 0 }}
              whileInView={{ pathLength: 1 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 1.4, delay: i * 0.12, ease: "easeOut" }}
            />
            <motion.path
              d={`M ${f.x} ${232 - f.h * 0.45} q ${bend > 0 ? 26 : -26} -22 ${bend > 0 ? 40 : -40} -4 q ${bend > 0 ? -22 : 22} 18 ${bend > 0 ? -40 : 40} 4`}
              fill="#7fd9c0"
              opacity="0.8"
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ delay: 0.9 + i * 0.12, type: "spring", stiffness: 120, damping: 12 }}
              style={{ transformOrigin: `${f.x}px ${232 - f.h * 0.45}px` }}
            />
            <g transform={`translate(${f.x} ${top}) scale(${f.s * 0.55})`}>
              <FlowerGroup petals={f.p} colors={f.c} delay={1.1 + i * 0.12} />
            </g>
          </g>
        );
      })}
    </svg>
  );
}
