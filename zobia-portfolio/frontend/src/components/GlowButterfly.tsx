import { motion } from "framer-motion";

const WING_FORE = "M2 0 C8 -26 40 -52 58 -36 C66 -26 48 -4 26 4 C14 8 6 6 2 0 Z";
const WING_HIND = "M2 2 C10 10 34 16 38 34 C40 46 18 42 10 28 C5 19 3 10 2 2 Z";

function Wings({ fill }: { fill: string }) {
  return (
    <>
      <path d={WING_FORE} fill={fill} stroke="rgba(255,255,255,0.9)" strokeWidth="0.9" />
      <path d={WING_HIND} fill={fill} stroke="rgba(255,255,255,0.9)" strokeWidth="0.9" />
      <path d="M4 0 C20 -14 36 -28 54 -34 M4 -1 C22 -6 40 -14 56 -26 M4 3 C16 8 28 16 34 32 M5 4 C14 10 22 22 22 36" stroke="rgba(150,190,235,0.7)" strokeWidth="0.6" fill="none" />
    </>
  );
}

/** Soft, glowing white butterfly (wings flap). Size comes from the parent box. */
export function GlowButterflySvg({ tint = "#cfe6ff", flap = 0.5 }: { tint?: string; flap?: number }) {
  return (
    <svg
      viewBox="-62 -52 124 104"
      className="h-full w-full overflow-visible"
      style={{ filter: "drop-shadow(0 0 5px rgba(255,255,255,0.9)) drop-shadow(0 0 14px rgba(150,205,255,0.65))" }}
    >
      <defs>
        <linearGradient id={`gb-${tint.slice(1)}`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#ffffff" stopOpacity="0.98" />
          <stop offset="1" stopColor={tint} stopOpacity="0.85" />
        </linearGradient>
      </defs>
      <motion.g
        animate={{ scaleX: [1, 0.22, 1] }}
        transition={{ duration: flap, repeat: Infinity, ease: "easeInOut" }}
        style={{ transformOrigin: "0px 0px" }}
      >
        <Wings fill={`url(#gb-${tint.slice(1)})`} />
        <g transform="scale(-1 1)">
          <Wings fill={`url(#gb-${tint.slice(1)})`} />
        </g>
      </motion.g>
      <ellipse cx="0" cy="2" rx="1.9" ry="15" fill="#d9ecff" />
      <path d="M0 -12 q-5 -11 -13 -14 M0 -12 q5 -11 13 -14" stroke="#d9ecff" strokeWidth="1.2" fill="none" strokeLinecap="round" />
    </svg>
  );
}

/** A butterfly that lazily wanders around its spot (use inside a relative box). */
export function HoverButterfly({
  className = "",
  size = 52,
  dx = 40,
  dy = 28,
  dur = 9,
  delay = 0,
  tint,
}: {
  className?: string;
  size?: number;
  dx?: number;
  dy?: number;
  dur?: number;
  delay?: number;
  tint?: string;
}) {
  return (
    <motion.div
      className={`pointer-events-none absolute ${className}`}
      style={{ width: size, height: size * 0.85 }}
      animate={{
        x: [0, dx, -dx * 0.4, dx * 0.7, 0],
        y: [0, -dy, dy * 0.3, -dy * 0.6, 0],
        rotate: [0, 14, -10, 8, 0],
      }}
      transition={{ duration: dur, repeat: Infinity, ease: "easeInOut", delay }}
      aria-hidden="true"
    >
      <GlowButterflySvg tint={tint} flap={0.42 + (size % 7) * 0.02} />
    </motion.div>
  );
}
