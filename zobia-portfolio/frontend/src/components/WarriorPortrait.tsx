import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import Embers from "./Embers";
import Flower from "./Flower";
import { HoverButterfly } from "./GlowButterfly";

// arch with softly rounded bottom corners (matches rounded-t-[999px] rounded-b-[28px])
const ARCH = "M1 372 L1 150 A149 149 0 0 1 299 150 L299 372 Q299 399 272 399 L28 399 Q1 399 1 372 Z";
const CLIP = "M0 0.93 L0 0.375 A0.5 0.375 0 0 1 1 0.375 L1 0.93 Q1 1 0.907 1 L0.093 1 Q0 1 0 0.93 Z";
const RING_TEXT = "CODE ✦ DESIGN ✦ ALGORITHMS ✦ AI ✦ ICPC ✦ ART ✦ ";

export default function WarriorPortrait({ start }: { start: boolean }) {
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const smx = useSpring(mx, { stiffness: 70, damping: 16 });
  const smy = useSpring(my, { stiffness: 70, damping: 16 });
  const rotY = useTransform(smx, [-0.5, 0.5], [-10, 10]);
  const rotX = useTransform(smy, [-0.5, 0.5], [8, -8]);
  const auraX = useTransform(smx, [-0.5, 0.5], [14, -14]);

  return (
    <div
      className="relative mx-auto w-full max-w-[400px]"
      onMouseMove={(e) => {
        const r = e.currentTarget.getBoundingClientRect();
        mx.set((e.clientX - r.left) / r.width - 0.5);
        my.set((e.clientY - r.top) / r.height - 0.5);
      }}
      onMouseLeave={() => {
        mx.set(0);
        my.set(0);
      }}
    >
      <motion.div
        className="relative pb-10 pt-6"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={start ? { opacity: 1, scale: 1 } : {}}
        transition={{ delay: 0.3, duration: 1, ease: [0.16, 1, 0.3, 1] }}
        style={{ perspective: 1200 }}
      >
        {/* aura: slowly turning blurred colour wheel */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute left-1/2 top-[46%] h-[112%] w-[112%] -translate-x-1/2 -translate-y-1/2"
        >
          <motion.div
            className="h-full w-full rounded-full opacity-70 blur-[46px]"
            style={{
              x: auraX,
              background: "conic-gradient(from 0deg, #ff9ec4, #ffd77a, #6fd3f0, #b79cff, #ff9ec4)",
            }}
            animate={{ rotate: 360, scale: [1, 1.07, 1] }}
            transition={{
              rotate: { duration: 22, repeat: Infinity, ease: "linear" },
              scale: { duration: 5, repeat: Infinity, ease: "easeInOut" },
            }}
          />
        </div>

        {/* energy pulses */}
        {[0, 1.6, 3.2].map((d) => (
          <div
            key={d}
            aria-hidden="true"
            className="pointer-events-none absolute left-1/2 top-[46%] h-[70%] w-[70%] -translate-x-1/2 -translate-y-1/2"
          >
            <motion.div
              className="h-full w-full rounded-full border border-white/50"
              animate={{ scale: [0.85, 1.7], opacity: [0.55, 0] }}
              transition={{ duration: 4.8, repeat: Infinity, ease: "easeOut", delay: d }}
            />
          </div>
        ))}

        {/* rune ring with turning text */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute left-1/2 top-[46%] h-[118%] w-[118%] -translate-x-1/2 -translate-y-1/2"
        >
        <motion.svg
          viewBox="-200 -200 400 400"
          className="h-full w-full"
          animate={{ rotate: 360 }}
          transition={{ duration: 80, repeat: Infinity, ease: "linear" }}
        >
          <defs>
            <path id="wp-ring" d="M -172 0 a172 172 0 1 1 344 0 a172 172 0 1 1 -344 0" />
          </defs>
          <circle r="192" fill="none" stroke="rgba(255,255,255,0.28)" strokeWidth="1" />
          <circle r="150" fill="none" stroke="rgba(255,158,196,0.4)" strokeWidth="1" strokeDasharray="3 9" />
          <text fontSize="15" letterSpacing="7" fill="rgba(255,255,255,0.78)" fontFamily="JetBrains Mono, monospace">
            <textPath href="#wp-ring">{RING_TEXT.repeat(2)}</textPath>
          </text>
        </motion.svg>
        </div>

        {/* sword-light slashes */}
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
          <div className="absolute left-0 top-[34%] h-full w-full -rotate-[28deg]">
            <div className="slash h-[3px] w-full bg-gradient-to-r from-transparent via-white to-transparent shadow-[0_0_18px_6px_rgba(255,255,255,0.55)]" />
          </div>
          <div className="absolute left-0 top-[60%] h-full w-full rotate-[24deg]">
            <div
              className="slash h-[2px] w-full bg-gradient-to-r from-transparent via-pink to-transparent shadow-[0_0_16px_5px_rgba(255,158,196,0.6)]"
              style={{ animationDelay: "-3s" }}
            />
          </div>
        </div>

        <Embers className="absolute -inset-x-10 -inset-y-2 z-[5] h-[calc(100%+1rem)] w-[calc(100%+5rem)]" />

        {/* portrait in an ornate arch */}
        <motion.div
          className="relative z-10 mx-auto aspect-[3/4] w-[80%]"
          style={{ rotateX: rotX, rotateY: rotY, transformStyle: "preserve-3d" }}
        >
          <svg width="0" height="0" className="absolute" aria-hidden="true">
            <defs>
              <clipPath id="wp-clip" clipPathUnits="objectBoundingBox">
                <path d={CLIP} />
              </clipPath>
            </defs>
          </svg>
          <div
            className="absolute inset-0 translate-x-3 translate-y-3 bg-gradient-to-b from-pink/80 to-purple/80 opacity-80"
            style={{ clipPath: "url(#wp-clip)" }}
          />
          <div className="float-y absolute inset-0" style={{ filter: "drop-shadow(0 28px 34px rgba(0,0,0,0.5))" }}>
            <div className="absolute inset-0 overflow-hidden bg-navy" style={{ clipPath: "url(#wp-clip)" }}>
              <img src="/photo/zobia-warrior.jpg" alt="Zobia Razzaq" className="h-full w-full object-cover object-top" />
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-bg/55 via-transparent to-transparent" />
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-pink/20 via-transparent to-cyan/25 mix-blend-soft-light" />
              <div className="shine pointer-events-none absolute inset-y-0 left-0 w-1/3 bg-gradient-to-r from-transparent via-white/35 to-transparent" />
            </div>

            {/* frame: gold-to-pink line, with sparks running around it */}
            <svg viewBox="0 0 300 400" className="pointer-events-none absolute inset-0 h-full w-full overflow-visible" aria-hidden="true">
              <defs>
                <linearGradient id="wp-grad" x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0" stopColor="#ffd77a" />
                  <stop offset="0.5" stopColor="#ff9ec4" />
                  <stop offset="1" stopColor="#6fd3f0" />
                </linearGradient>
              </defs>
              <path d={ARCH} fill="none" stroke="url(#wp-grad)" strokeWidth="3.5" />
              <path d={ARCH} fill="none" stroke="rgba(255,255,255,0.35)" strokeWidth="1" style={{ transformOrigin: "150px 200px", transform: "scale(0.955)" }} />
              {[0, 500].map((o) => (
                <motion.path
                  key={o}
                  d={ARCH}
                  fill="none"
                  stroke="#fff"
                  strokeWidth="5"
                  strokeLinecap="round"
                  pathLength={1000}
                  strokeDasharray="60 940"
                  style={{ filter: "drop-shadow(0 0 6px #fff) drop-shadow(0 0 12px #ff9ec4)" }}
                  initial={{ strokeDashoffset: -o }}
                  animate={{ strokeDashoffset: -o - 1000 }}
                  transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
                />
              ))}
              {[
                [150, 1],
                [1, 392],
                [299, 392],
              ].map(([cx, cy], i) => (
                <g key={i} transform={`translate(${cx} ${cy}) rotate(45)`}>
                  <rect x="-6" y="-6" width="12" height="12" fill="#ffd77a" stroke="#fff" strokeWidth="1.5" style={{ filter: "drop-shadow(0 0 6px #ffd77a)" }} />
                </g>
              ))}
            </svg>
          </div>
        </motion.div>

        {/* title ribbon */}
        <div className="absolute bottom-0 left-1/2 z-20 -translate-x-1/2">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={start ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 1.4, duration: 0.7 }}
          >
          <div
            className="flex items-center gap-3 whitespace-nowrap bg-gradient-to-r from-butter via-pink to-butter px-10 py-2 text-bg shadow-xl"
            style={{ clipPath: "polygon(0 0, 100% 0, 94% 50%, 100% 100%, 0 100%, 6% 50%)" }}
          >
            <span className="font-display text-lg font-bold italic">Code Warrior</span>
            <span className="font-mono text-[10px] tracking-widest">LVL 04</span>
          </div>
          </motion.div>
        </div>

        <Flower size={74} className="absolute -left-3 top-2 z-30" colors={["#ff9ec4", "#fff"]} />
        <Flower size={54} className="absolute -right-2 bottom-16 z-30" colors={["#6fd3f0", "#dff3ff"]} petals={6} duration={30} />
        <HoverButterfly className="-left-6 top-[34%] z-30" size={50} dx={30} dy={24} dur={8} />
        <HoverButterfly className="right-[-6%] top-[8%] z-30" size={44} dx={-26} dy={20} dur={10} delay={1.2} tint="#e3d9ff" />
        <HoverButterfly className="right-[4%] top-[58%] z-30" size={36} dx={-22} dy={18} dur={7} delay={0.6} tint="#d6f1ff" />
      </motion.div>
    </div>
  );
}
