import { motion } from "framer-motion";

export default function Butterfly({
  size = 48,
  path,
  duration = 14,
}: {
  size?: number;
  path?: { x: number; y: number; rotate?: number }[];
  duration?: number;
}) {
  const defaultPath = [
    { x: 0, y: 0, rotate: 0 },
    { x: 60, y: -40, rotate: 15 },
    { x: 120, y: 10, rotate: -10 },
    { x: 70, y: 60, rotate: 10 },
    { x: 0, y: 20, rotate: -15 },
    { x: 0, y: 0, rotate: 0 },
  ];
  const motionPath = path ?? defaultPath;

  return (
    <motion.div
      className="pointer-events-none absolute"
      animate={{
        x: motionPath.map((p) => p.x),
        y: motionPath.map((p) => p.y),
        rotate: motionPath.map((p) => p.rotate ?? 0),
      }}
      transition={{ duration, repeat: Infinity, ease: "easeInOut" }}
    >
      <motion.div
        className="pointer-events-none absolute rounded-full blur-md"
        style={{ width: size * 1.6, height: size * 1.6, left: -size * 0.3, top: -size * 0.3 }}
        animate={{
          background: [
            "radial-gradient(circle, rgba(111,211,240,0.5), transparent 70%)",
            "radial-gradient(circle, rgba(255,158,196,0.5), transparent 70%)",
            "radial-gradient(circle, rgba(183,156,255,0.5), transparent 70%)",
            "radial-gradient(circle, rgba(79,195,217,0.5), transparent 70%)",
            "radial-gradient(circle, rgba(255,215,122,0.5), transparent 70%)",
            "radial-gradient(circle, rgba(111,211,240,0.5), transparent 70%)",
          ],
          opacity: [0.5, 0.8, 0.5],
        }}
        transition={{
          background: { duration: 6, repeat: Infinity, ease: "linear" },
          opacity: { duration: 2, repeat: Infinity, ease: "easeInOut" },
        }}
      />
      <motion.svg
        width={size}
        height={size}
        viewBox="0 0 64 64"
        className="relative drop-shadow-[0_0_10px_rgba(255,255,255,0.25)]"
        animate={{
          fill: ["#6fd3f0", "#ff9ec4", "#b79cff", "#4fc3d9", "#4ade80", "#6fd3f0"],
        }}
        transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
      >
        <motion.g
          animate={{ scaleX: [1, 0.7, 1] }}
          transition={{ duration: 0.55, repeat: Infinity, ease: "easeInOut" }}
          style={{ transformOrigin: "32px 32px" }}
        >
          {/* left wings */}
          <path d="M32 30C22 14 6 14 4 26C2 38 18 40 32 34Z" opacity="0.95" />
          <path d="M32 34C22 42 10 46 8 54C6 60 20 60 32 46Z" opacity="0.8" />
          {/* right wings */}
          <path d="M32 30C42 14 58 14 60 26C62 38 46 40 32 34Z" opacity="0.95" />
          <path d="M32 34C42 42 54 46 56 54C58 60 44 60 32 46Z" opacity="0.8" />
          {/* wing spot details */}
          <circle cx="16" cy="24" r="2.6" fill="#fff" opacity="0.85" />
          <circle cx="48" cy="24" r="2.6" fill="#fff" opacity="0.85" />
          <circle cx="18" cy="50" r="2" fill="#fff" opacity="0.7" />
          <circle cx="46" cy="50" r="2" fill="#fff" opacity="0.7" />
        </motion.g>
        {/* body */}
        <rect x="30" y="20" width="4" height="34" rx="2" fill="#1a1a1a" />
        <circle cx="32" cy="18" r="3" fill="#1a1a1a" />
        {/* antennae */}
        <path d="M31 19 Q27 13 24 12" stroke="#1a1a1a" strokeWidth="1.2" fill="none" />
        <path d="M33 19 Q37 13 40 12" stroke="#1a1a1a" strokeWidth="1.2" fill="none" />
      </motion.svg>
      {/* sparkle */}
      <motion.span
        className="absolute -right-1 -top-1 text-[0.7rem]"
        animate={{ opacity: [0, 1, 0], scale: [0.6, 1.1, 0.6] }}
        transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
      >
        ✨
      </motion.span>
    </motion.div>
  );
}
