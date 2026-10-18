import { useEffect, useRef } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { GlowButterflySvg } from "./GlowButterfly";

const COLORS = ["255,255,255", "207,232,255", "255,200,225", "255,236,170"];

interface Fly {
  x: number;
  y: number;
  r: number;
  vy: number;
  sway: number;
  phase: number;
  speed: number;
  c: string;
}

/** Tiny glowing lights drifting upward and twinkling (nothing falls). */
function Fireflies() {
  const ref = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const canvas = ref.current!;
    const ctx = canvas.getContext("2d")!;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let w = 0;
    let h = 0;
    let flies: Fly[] = [];
    let t = 0;
    let raf = 0;
    const make = (fresh: boolean): Fly => ({
      x: Math.random() * w,
      y: fresh ? Math.random() * h : h + 10,
      r: Math.random() * 1.8 + 0.8,
      vy: Math.random() * 0.3 + 0.12,
      sway: Math.random() * 0.5 + 0.2,
      phase: Math.random() * 6.28,
      speed: Math.random() * 1.4 + 0.6,
      c: COLORS[(Math.random() * COLORS.length) | 0],
    });
    const resize = () => {
      w = canvas.width = window.innerWidth;
      h = canvas.height = window.innerHeight;
      flies = Array.from({ length: w < 640 ? 22 : 42 }, () => make(true));
    };
    const draw = () => {
      t += 0.016;
      ctx.clearRect(0, 0, w, h);
      for (const f of flies) {
        if (!reduce) {
          f.y -= f.vy;
          f.x += Math.sin(t * f.sway + f.phase) * 0.35;
          if (f.y < -10) Object.assign(f, make(false));
        }
        const a = 0.25 + 0.65 * Math.abs(Math.sin(t * f.speed + f.phase));
        ctx.beginPath();
        ctx.arc(f.x, f.y, f.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${f.c},${a})`;
        ctx.shadowBlur = 10;
        ctx.shadowColor = `rgba(${f.c},0.9)`;
        ctx.fill();
      }
      ctx.shadowBlur = 0;
      raf = requestAnimationFrame(draw);
    };
    resize();
    draw();
    window.addEventListener("resize", resize);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
    };
  }, []);
  return <canvas ref={ref} className="absolute inset-0 h-full w-full" />;
}

const FLIGHTS = [
  { top: 16, dur: 38, delay: 1, size: 52, dir: 1, tint: "#cfe6ff" },
  { top: 48, dur: 46, delay: 12, size: 40, dir: -1, tint: "#e3d9ff" },
  { top: 70, dur: 42, delay: 22, size: 34, dir: 1, tint: "#d6f1ff" },
];

function FlyingButterfly({ f }: { f: (typeof FLIGHTS)[number] }) {
  const from = f.dir === 1 ? "-12vw" : "112vw";
  const to = f.dir === 1 ? "112vw" : "-12vw";
  return (
    <motion.div
      className="absolute"
      style={{ top: `${f.top}%`, width: f.size, height: f.size * 0.85 }}
      initial={{ left: from }}
      animate={{ left: [from, to], y: [0, -70, 30, -90, 20, -50, 0], rotate: [0, 8, -8, 10, -6, 6, 0] }}
      transition={{
        left: { duration: f.dur, repeat: Infinity, ease: "linear", delay: f.delay },
        y: { duration: f.dur / 3, repeat: Infinity, ease: "easeInOut", delay: f.delay },
        rotate: { duration: f.dur / 4, repeat: Infinity, ease: "easeInOut", delay: f.delay },
      }}
    >
      <div style={{ transform: f.dir === 1 ? "none" : "scaleX(-1)" }} className="h-full w-full">
        <GlowButterflySvg tint={f.tint} />
      </div>
    </motion.div>
  );
}

/** One small butterfly that follows the mouse pointer, a little behind it. */
function CursorButterfly() {
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const sx = useSpring(x, { stiffness: 55, damping: 14, mass: 0.8 });
  const sy = useSpring(y, { stiffness: 55, damping: 14, mass: 0.8 });
  const rot = useMotionValue(0);
  const srot = useSpring(rot, { stiffness: 80, damping: 12 });
  const last = useRef({ x: 0, y: 0 });

  useEffect(() => {
    if (window.matchMedia("(pointer: coarse)").matches) return;
    const onMove = (e: PointerEvent) => {
      const dx = e.clientX - last.current.x;
      last.current = { x: e.clientX, y: e.clientY };
      x.set(e.clientX + 16);
      y.set(e.clientY + 14);
      rot.set(Math.max(-35, Math.min(35, dx * 1.2)));
    };
    window.addEventListener("pointermove", onMove);
    return () => window.removeEventListener("pointermove", onMove);
  }, [x, y, rot]);

  return (
    <motion.div
      className="fixed left-0 top-0 z-[450] h-[26px] w-[32px]"
      style={{ x: sx, y: sy, rotate: srot, translateX: "-50%", translateY: "-50%" }}
      aria-hidden="true"
    >
      <GlowButterflySvg tint="#ffd9ec" flap={0.38} />
    </motion.div>
  );
}

/** Fixed, click-through layer: fireflies + glowing white butterflies. */
export default function GardenSky() {
  return (
    <>
      <div aria-hidden="true" className="pointer-events-none fixed inset-0 z-[3] overflow-hidden">
        <Fireflies />
        {FLIGHTS.map((f, i) => (
          <FlyingButterfly key={i} f={f} />
        ))}
      </div>
      <div className="pointer-events-none">
        <CursorButterfly />
      </div>
    </>
  );
}
