import { motion } from "framer-motion";

// lens-flare orbs lying along the beam (distance from the sun, size, colour)
const FLARES = [
  { d: 34, s: 22, c: "rgba(255,230,170,0.55)" },
  { d: 52, s: 54, c: "rgba(255,158,196,0.30)" },
  { d: 66, s: 16, c: "rgba(255,255,255,0.65)" },
  { d: 80, s: 38, c: "rgba(111,211,240,0.30)" },
];
const BEAMS = [
  { rot: -14, w: 74, h: 120, delay: 0, c: "rgba(255,226,170,0.55)" },
  { rot: -2, w: 86, h: 150, delay: -2, c: "rgba(255,200,215,0.45)" },
  { rot: 11, w: 70, h: 110, delay: -4, c: "rgba(255,236,190,0.5)" },
  { rot: 24, w: 58, h: 90, delay: -1, c: "rgba(190,225,255,0.4)" },
];

/** Sun on the left edge: turning rays, breathing light shafts and lens flares. */
export default function SunRays() {
  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden mix-blend-screen">
      <div className="absolute -left-[17vw] top-[2%] h-[56vw] w-[56vw] max-h-[1100px] max-w-[1100px]">
        {/* long rays, turning slowly */}
        <motion.div
          className="absolute inset-0 rounded-full"
          style={{
            background: "repeating-conic-gradient(from 0deg, rgba(255,226,170,0.55) 0deg 2.6deg, transparent 2.6deg 13deg)",
            WebkitMaskImage: "radial-gradient(circle, #000 6%, transparent 70%)",
            maskImage: "radial-gradient(circle, #000 6%, transparent 70%)",
          }}
          animate={{ rotate: 360 }}
          transition={{ duration: 150, repeat: Infinity, ease: "linear" }}
        />
        <motion.div
          className="absolute inset-0 rounded-full"
          style={{
            background: "repeating-conic-gradient(from 6deg, rgba(255,158,196,0.42) 0deg 1.6deg, transparent 1.6deg 21deg)",
            WebkitMaskImage: "radial-gradient(circle, #000 6%, transparent 78%)",
            maskImage: "radial-gradient(circle, #000 6%, transparent 78%)",
          }}
          animate={{ rotate: -360 }}
          transition={{ duration: 230, repeat: Infinity, ease: "linear" }}
        />

        {/* big soft light shafts that breathe */}
        {BEAMS.map((b, i) => (
          <div
            key={i}
            className="beam absolute left-1/2 top-1/2 origin-left rounded-full blur-[18px]"
            style={{
              width: `${b.w}vw`,
              height: b.h,
              marginTop: -b.h / 2,
              transform: `rotate(${b.rot}deg)`,
              background: `linear-gradient(90deg, ${b.c}, transparent 85%)`,
              animationDelay: `${b.delay}s`,
            }}
          />
        ))}

        {/* the sun */}
        <div className="absolute left-1/2 top-1/2 h-[24%] w-[24%] -translate-x-1/2 -translate-y-1/2">
          <motion.div
            className="h-full w-full rounded-full"
            style={{
              background: "radial-gradient(circle, #fffbe8 0 26%, #ffe08a 42%, #ffb3c8 68%, rgba(255,158,196,0) 72%)",
              boxShadow: "0 0 140px 70px rgba(255,205,150,0.5), 0 0 320px 140px rgba(255,158,196,0.25)",
            }}
            animate={{ scale: [1, 1.08, 1] }}
            transition={{ duration: 5.5, repeat: Infinity, ease: "easeInOut" }}
          />
        </div>

        {/* lens flares along the 12° diagonal */}
        {FLARES.map((f, i) => {
          const a = (12 * Math.PI) / 180;
          return (
            <span
              key={i}
              className="glow-pulse absolute rounded-full"
              style={{
                left: `calc(${50 + f.d * Math.cos(a)}% - ${f.s / 2}px)`,
                top: `calc(${50 + f.d * Math.sin(a)}% - ${f.s / 2}px)`,
                width: f.s,
                height: f.s,
                background: `radial-gradient(circle, ${f.c}, transparent 70%)`,
                border: "1px solid rgba(255,255,255,0.18)",
                animationDelay: `${i * 0.5}s`,
              }}
            />
          );
        })}
      </div>
    </div>
  );
}
