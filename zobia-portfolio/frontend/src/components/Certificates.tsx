import { useCallback, useEffect, useRef, useState, type CSSProperties } from "react";
import { AnimatePresence, motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import Reveal from "./Reveal";
import { certificates } from "../data/certificates";

const OFFSETS = [-2, -1, 0, 1, 2];
const reflect = {
  WebkitBoxReflect: "below 8px linear-gradient(transparent 72%, rgba(255,255,255,0.16))",
} as unknown as CSSProperties;

export default function Certificates() {
  const [index, setIndex] = useState(0);
  const [zoomed, setZoomed] = useState(false);
  const [paused, setPaused] = useState(false);
  const [narrow, setNarrow] = useState(false);
  const dragged = useRef(false);

  const n = certificates.length;
  const current = certificates[index];

  const go = useCallback((dir: number) => setIndex((i) => (i + dir + n) % n), [n]);

  // mouse-driven tilt of the whole stage
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const sx = useSpring(mx, { stiffness: 120, damping: 18 });
  const sy = useSpring(my, { stiffness: 120, damping: 18 });
  const stageRX = useTransform(sy, [-0.5, 0.5], [7, -7]);
  const stageRY = useTransform(sx, [-0.5, 0.5], [-9, 9]);

  useEffect(() => {
    const onResize = () => setNarrow(window.innerWidth < 640);
    onResize();
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  // autoplay
  useEffect(() => {
    if (paused || zoomed) return;
    const t = setInterval(() => go(1), 4500);
    return () => clearInterval(t);
  }, [paused, zoomed, go]);

  // keyboard
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (zoomed && e.key === "Escape") setZoomed(false);
      if (!zoomed && !paused) return;
      if (e.key === "ArrowRight") go(1);
      if (e.key === "ArrowLeft") go(-1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [zoomed, paused, go]);

  const spread = narrow ? 92 : 200;

  return (
    <section id="certificates" className="relative overflow-hidden bg-navy/85 px-[6%] py-24">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_50%_30%,rgba(111,211,240,0.10),transparent_60%)]" />
      <div className="relative mx-auto max-w-[1100px]">
        <Reveal>
          <div className="mb-4 flex items-center gap-2 font-mono text-[0.7rem] uppercase tracking-[0.2em] text-accent">
            <span className="h-px w-8 bg-accent" />
            Recognition
          </div>
        </Reveal>
        <Reveal delay={0.05}>
          <h2 className="mb-14 text-[clamp(1.8rem,4vw,2.9rem)] font-extrabold">
            Certificates &amp;{" "}
            <span className="bg-gradient-to-r from-accent via-pink to-purple bg-clip-text text-transparent">
              Achievements
            </span>
          </h2>
        </Reveal>

        {/* 3D coverflow stage */}
        <div
          className="relative mx-auto h-[300px] max-w-[980px] sm:h-[380px]"
          style={{ perspective: "1700px" }}
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => {
            setPaused(false);
            mx.set(0);
            my.set(0);
          }}
          onMouseMove={(e) => {
            const r = e.currentTarget.getBoundingClientRect();
            mx.set((e.clientX - r.left) / r.width - 0.5);
            my.set((e.clientY - r.top) / r.height - 0.5);
          }}
        >
          <div className="pointer-events-none absolute left-1/2 top-1/2 h-[280px] w-[280px] -translate-x-1/2 -translate-y-1/2 sm:h-[360px] sm:w-[360px]">
            <motion.div
              className="h-full w-full rounded-full blur-[80px]"
              animate={{ opacity: [0.35, 0.65, 0.35], scale: [1, 1.15, 1] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              style={{ background: "radial-gradient(circle, rgba(111,211,240,0.55), rgba(183,156,255,0.25) 55%, transparent 72%)" }}
            />
          </div>
          <motion.div
            className="absolute inset-0 flex items-center justify-center"
            style={{ rotateX: stageRX, rotateY: stageRY, transformStyle: "preserve-3d" }}
          >
            <motion.div
              className="absolute inset-0 flex cursor-grab items-center justify-center active:cursor-grabbing"
              style={{ transformStyle: "preserve-3d" }}
              drag="x"
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={0.25}
              onDragStart={() => (dragged.current = true)}
              onDragEnd={(_, info) => {
                if (info.offset.x < -60) go(1);
                else if (info.offset.x > 60) go(-1);
                setTimeout(() => (dragged.current = false), 60);
              }}
            >
              {OFFSETS.map((offset) => {
                const i = (index + offset + n) % n;
                const c = certificates[i];
                const isCenter = offset === 0;
                return (
                  <motion.button
                    key={c.title}
                    onClick={() => {
                      if (dragged.current) return;
                      if (isCenter) setZoomed(true);
                      else setIndex(i);
                    }}
                    animate={{
                      x: offset * spread,
                      z: -Math.abs(offset) * 120,
                      rotateY: offset * -30,
                      scale: isCenter ? 1 : 0.82,
                      opacity: isCenter ? 1 : Math.abs(offset) === 1 ? 0.6 : 0.25,
                      zIndex: 10 - Math.abs(offset),
                    }}
                    transition={{ type: "spring", stiffness: 190, damping: 24 }}
                    className={`absolute h-[190px] w-[270px] overflow-hidden rounded-2xl bg-white shadow-[0_30px_70px_rgba(0,0,0,0.6)] sm:h-[250px] sm:w-[360px] ${
                      isCenter
                        ? "border-2 border-accent shadow-[0_0_50px_rgba(111,211,240,0.35)]"
                        : "border border-white/10"
                    }`}
                    style={{ transformStyle: "preserve-3d", ...reflect }}
                    aria-label={c.title}
                  >
                    <img
                      src={c.image}
                      alt={c.title}
                      draggable={false}
                      className="pointer-events-none h-full w-full select-none object-contain"
                    />
                    {isCenter && (
                      <span className="pointer-events-none absolute inset-0 bg-gradient-to-tr from-transparent via-white/25 to-transparent opacity-0 transition-opacity duration-300 hover:opacity-100" />
                    )}
                  </motion.button>
                );
              })}
            </motion.div>
          </motion.div>
        </div>

        {/* controls */}
        <div className="mt-6 flex items-center justify-center gap-5">
          <button
            onClick={() => go(-1)}
            aria-label="Previous certificate"
            className="flex h-11 w-11 items-center justify-center rounded-full border border-white/15 bg-card text-white transition-all hover:border-accent hover:text-accent"
          >
            <ChevronLeft size={20} />
          </button>
          <div className="flex items-center gap-2">
            {certificates.map((c, i) => (
              <button
                key={c.title}
                aria-label={`Show ${c.title}`}
                onClick={() => setIndex(i)}
                className={`h-1.5 rounded-full transition-all ${
                  i === index ? "w-7 bg-accent" : "w-1.5 bg-white/25 hover:bg-white/50"
                }`}
              />
            ))}
          </div>
          <button
            onClick={() => go(1)}
            aria-label="Next certificate"
            className="flex h-11 w-11 items-center justify-center rounded-full bg-accent text-black transition-transform hover:scale-105"
          >
            <ChevronRight size={20} />
          </button>
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={current.title}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.25 }}
            className="mx-auto mt-8 max-w-[560px] text-center"
          >
            <div className="mb-1.5 font-mono text-[0.68rem] uppercase tracking-[0.08em] text-accent">
              {current.date}
            </div>
            <div className="mb-1.5 text-[1.2rem] font-bold">{current.title}</div>
            <div className="mb-2 text-[0.85rem] text-muted">{current.issuer}</div>
            <div className="font-mono text-[0.65rem] uppercase tracking-[0.18em] text-white/30">
              Click the center card to zoom · drag or use arrow keys
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      <AnimatePresence>
        {zoomed && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[600] flex items-center justify-center bg-black/90 p-6 backdrop-blur-sm"
            onClick={() => setZoomed(false)}
          >
            <button
              aria-label="Close"
              onClick={() => setZoomed(false)}
              className="absolute right-5 top-5 flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20"
            >
              <X size={18} />
            </button>
            <button
              aria-label="Previous"
              onClick={(e) => {
                e.stopPropagation();
                go(-1);
              }}
              className="absolute left-4 flex h-11 w-11 items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20"
            >
              <ChevronLeft size={22} />
            </button>
            <motion.img
              key={current.image}
              initial={{ opacity: 0, scale: 0.92, rotateX: 10 }}
              animate={{ opacity: 1, scale: 1, rotateX: 0 }}
              transition={{ duration: 0.3 }}
              src={current.image}
              alt={current.title}
              onClick={(e) => e.stopPropagation()}
              className="max-h-[86vh] max-w-[88vw] rounded-2xl border border-white/10 bg-white object-contain"
            />
            <button
              aria-label="Next"
              onClick={(e) => {
                e.stopPropagation();
                go(1);
              }}
              className="absolute right-4 flex h-11 w-11 items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20"
            >
              <ChevronRight size={22} />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
