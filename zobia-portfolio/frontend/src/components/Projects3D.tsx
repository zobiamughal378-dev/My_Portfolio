import { useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, animate, motion, useMotionValue, useTransform, type MotionValue } from "framer-motion";
import { ChevronLeft, ChevronRight, MousePointer2, X } from "lucide-react";
import Reveal from "./Reveal";
import { projects, type Project, type ProjTag } from "../data/projects";

const filterOptions: { key: ProjTag | "all"; label: string }[] = [
  { key: "all", label: "All" },
  { key: "web", label: "Web" },
  { key: "ai", label: "AI" },
  { key: "sys", label: "Systems" },
  { key: "cpp", label: "C++" },
  { key: "db", label: "Database" },
  { key: "hw", label: "Hardware" },
];

const BLOCKS = ["bg-pink", "bg-cyan", "bg-butter", "bg-purple"];

function Cover({ p, className = "" }: { p: Project; className?: string }) {
  const src = p.screenshots?.[0];
  return src ? (
    <img src={src} alt="" loading="lazy" draggable={false} className={`select-none object-cover object-top ${className}`} />
  ) : (
    <div className={`flex items-center justify-center bg-gradient-to-br from-pink/60 to-cyan/60 text-5xl ${className}`}>
      {p.icon}
    </div>
  );
}

function Card3D({
  p,
  i,
  step,
  radius,
  rot,
  w,
  h,
  onClick,
}: {
  p: Project;
  i: number;
  step: number;
  radius: number;
  rot: MotionValue<number>;
  w: number;
  h: number;
  onClick: () => void;
}) {
  const facing = useTransform(rot, (r) => {
    const a = ((((i * step + r) % 360) + 540) % 360) - 180;
    return Math.cos((a * Math.PI) / 180);
  });
  const opacity = useTransform(facing, (f) => Math.max(0.12, f * 0.95 + 0.1));
  const scale = useTransform(facing, (f) => 0.88 + Math.max(0, f) * 0.12);

  return (
    <motion.div
      className="absolute"
      style={{
        width: w,
        height: h,
        left: `calc(50% - ${w / 2}px)`,
        top: `calc(50% - ${h / 2}px)`,
        transform: `rotateY(${i * step}deg) translateZ(${radius}px)`,
        transformStyle: "preserve-3d",
      }}
    >
      <motion.button
        onClick={onClick}
        style={{ opacity, scale }}
        className="group relative block h-full w-full text-left"
        aria-label={`Open ${p.title}`}
      >
        <div className={`absolute inset-0 translate-x-2.5 translate-y-2.5 rounded-2xl ${BLOCKS[i % BLOCKS.length]}`} />
        <div className="absolute -inset-2 rounded-[1.2rem] border-2 border-white/30" />
        <div className="relative flex h-full flex-col overflow-hidden rounded-2xl bg-[#fff8fb] text-bg shadow-2xl">
          <Cover p={p} className="h-[52%] w-full" />
          <div className="flex flex-1 flex-col p-3.5">
            <div className="mb-1.5 flex flex-wrap gap-1.5">
              <span className="rounded-full bg-bg px-2 py-0.5 font-mono text-[0.58rem] uppercase tracking-wider text-cyan">
                {p.tagLabel}
              </span>
              {p.featured && (
                <span className="rounded-full bg-butter px-2 py-0.5 font-mono text-[0.58rem] uppercase tracking-wider text-bg">
                  Featured
                </span>
              )}
            </div>
            <div className="line-clamp-2 text-[0.95rem] font-extrabold leading-tight">{p.title}</div>
            <div className="mt-auto font-mono text-[0.6rem] uppercase tracking-[0.18em] text-bg/50">
              {String(i + 1).padStart(2, "0")}
            </div>
          </div>
        </div>
      </motion.button>
    </motion.div>
  );
}

function Gallery({ shots, title }: { shots: string[]; title: string }) {
  const [i, setI] = useState(0);
  const n = shots.length;
  return (
    <div>
      <div className="relative overflow-hidden rounded-xl border border-white/10 bg-black/40">
        <img src={shots[i]} alt={`${title} screenshot ${i + 1}`} className="aspect-[16/10] w-full object-contain" />
        {n > 1 && (
          <>
            <button
              aria-label="Previous screenshot"
              onClick={() => setI((i - 1 + n) % n)}
              className="absolute left-3 top-1/2 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full bg-black/60 text-white hover:bg-accent hover:text-black"
            >
              <ChevronLeft size={18} />
            </button>
            <button
              aria-label="Next screenshot"
              onClick={() => setI((i + 1) % n)}
              className="absolute right-3 top-1/2 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full bg-black/60 text-white hover:bg-accent hover:text-black"
            >
              <ChevronRight size={18} />
            </button>
          </>
        )}
      </div>
      {n > 1 && (
        <div className="mt-3 flex justify-center gap-1.5">
          {shots.map((s, k) => (
            <button
              key={s}
              aria-label={`Screenshot ${k + 1}`}
              onClick={() => setI(k)}
              className={`h-1.5 rounded-full transition-all ${k === i ? "w-6 bg-accent" : "w-1.5 bg-white/25"}`}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default function Projects3D() {
  const [filter, setFilter] = useState<ProjTag | "all">("all");
  const [active, setActive] = useState(0);
  const [open, setOpen] = useState<Project | null>(null);
  const [narrow, setNarrow] = useState(false);

  const list = useMemo(
    () => (filter === "all" ? projects : projects.filter((p) => p.tag === filter)),
    [filter]
  );
  const n = list.length;
  const step = 360 / n;
  const w = narrow ? 210 : 255;
  const h = narrow ? 290 : 340;
  const radius = Math.max(400, (w / 2 + 16) / Math.tan(Math.PI / Math.max(n, 2)));

  const rot = useMotionValue(0);
  const hovering = useRef(false);
  const lastTouch = useRef(0);
  const drag = useRef({ down: false, x: 0, start: 0, moved: false });

  useEffect(() => {
    const onResize = () => setNarrow(window.innerWidth < 640);
    onResize();
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  // reset when the filter changes
  useEffect(() => {
    rot.set(0);
    setActive(0);
  }, [filter, rot]);

  // keep "active" in sync with the rotation
  useEffect(() => {
    return rot.on("change", (v) => {
      const idx = ((Math.round(-v / step) % n) + n) % n;
      setActive(idx);
    });
  }, [rot, step, n]);

  // slow auto-rotation while idle
  useEffect(() => {
    let raf = 0;
    const tick = () => {
      if (!hovering.current && !drag.current.down && Date.now() - lastTouch.current > 2500 && !open) {
        rot.set(rot.get() - 0.1);
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [rot, open]);

  const snapTo = (index: number) => {
    lastTouch.current = Date.now();
    const cur = rot.get();
    const base = Math.round(-cur / step);
    // shortest way round
    let diff = index - (((base % n) + n) % n);
    if (diff > n / 2) diff -= n;
    if (diff < -n / 2) diff += n;
    animate(rot, -(base + diff) * step, { type: "spring", stiffness: 70, damping: 16 });
  };
  const goBy = (d: number) => {
    lastTouch.current = Date.now();
    const base = Math.round(-rot.get() / step);
    animate(rot, -(base + d) * step, { type: "spring", stiffness: 70, damping: 16 });
  };

  const onDown = (e: React.PointerEvent<HTMLDivElement>) => {
    drag.current = { down: true, x: e.clientX, start: rot.get(), moved: false };
    lastTouch.current = Date.now();
  };
  const onMove = (e: React.PointerEvent<HTMLDivElement>) => {
    const d = drag.current;
    if (!d.down) return;
    const dx = e.clientX - d.x;
    if (Math.abs(dx) > 5) d.moved = true;
    rot.set(d.start + dx * 0.3);
  };
  const onUp = () => {
    const d = drag.current;
    if (!d.down) return;
    d.down = false;
    lastTouch.current = Date.now();
    if (d.moved) animate(rot, Math.round(rot.get() / step) * step, { type: "spring", stiffness: 70, damping: 16 });
  };

  const current = list[active] ?? list[0];

  return (
    <section id="projects" className="relative overflow-hidden bg-bg/85 px-[6%] py-24">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_50%_45%,rgba(111,211,240,0.14),transparent_62%)]" />
      <div className="relative mx-auto max-w-[1200px]">
        <Reveal>
          <div className="mb-4 flex items-center gap-2 font-mono text-[0.7rem] uppercase tracking-[0.2em] text-accent">
            <span className="h-px w-8 bg-accent" />
            Featured Projects
          </div>
        </Reveal>
        <Reveal delay={0.05}>
          <h2 className="mb-8 text-[clamp(1.8rem,4vw,2.9rem)] font-extrabold">
            What I've{" "}
            <span className="bg-gradient-to-r from-accent via-pink to-butter bg-clip-text text-transparent">built</span>
          </h2>
        </Reveal>
        <Reveal delay={0.1}>
          <div className="mb-6 flex flex-wrap gap-2">
            {filterOptions.map((f) => (
              <button
                key={f.key}
                onClick={() => setFilter(f.key)}
                className={`rounded-full border px-4 py-1.5 font-mono text-[0.72rem] uppercase tracking-wider transition-colors ${
                  filter === f.key
                    ? "border-accent bg-accent text-bg"
                    : "border-white/15 text-white/70 hover:border-pink hover:text-pink"
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>
        </Reveal>

        {/* 3D cylinder */}
        <div
          className="relative mx-auto h-[400px] w-full cursor-grab touch-pan-y select-none active:cursor-grabbing sm:h-[470px]"
          style={{ perspective: 1900 }}
          onPointerDown={onDown}
          onPointerMove={onMove}
          onPointerUp={onUp}
          onPointerLeave={() => {
            hovering.current = false;
            onUp();
          }}
          onPointerEnter={() => (hovering.current = true)}
        >
          <motion.div
            className="absolute inset-0"
            style={{ rotateY: rot, z: -radius, transformStyle: "preserve-3d" }}
          >
            {list.map((p, i) => (
              <Card3D
                key={p.title}
                p={p}
                i={i}
                step={step}
                radius={radius}
                rot={rot}
                w={w}
                h={h}
                onClick={() => {
                  if (drag.current.moved) return;
                  if (i === active) setOpen(p);
                  else snapTo(i);
                }}
              />
            ))}
          </motion.div>
        </div>

        {/* controls + info */}
        <div className="mx-auto mt-4 flex max-w-[640px] flex-col items-center text-center">
          <div className="mb-5 flex items-center gap-4">
            <button
              onClick={() => goBy(-1)}
              aria-label="Previous project"
              className="flex h-11 w-11 items-center justify-center rounded-full border border-white/15 bg-card text-white transition-all hover:border-accent hover:text-accent"
            >
              <ChevronLeft size={20} />
            </button>
            <span className="font-mono text-[0.78rem] text-white/60">
              {String(active + 1).padStart(2, "0")} / {String(n).padStart(2, "0")}
            </span>
            <button
              onClick={() => goBy(1)}
              aria-label="Next project"
              className="flex h-11 w-11 items-center justify-center rounded-full bg-accent text-black transition-transform hover:scale-105"
            >
              <ChevronRight size={20} />
            </button>
          </div>

          <AnimatePresence mode="wait">
            {current && (
              <motion.div
                key={current.title}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.22 }}
              >
                <div className="mb-2 flex flex-wrap justify-center gap-2">
                  <span className="rounded-full border border-accent/40 bg-accent/10 px-3 py-0.5 font-mono text-[0.65rem] uppercase tracking-wider text-accent">
                    {current.tagLabel}
                  </span>
                  {current.tagLabel2 && (
                    <span className="rounded-full border border-pink/40 bg-pink/10 px-3 py-0.5 font-mono text-[0.65rem] uppercase tracking-wider text-pink">
                      {current.tagLabel2}
                    </span>
                  )}
                </div>
                <h3 className="mb-2 text-xl font-bold">{current.title}</h3>
                <p className="mb-4 line-clamp-3 text-[0.88rem] leading-relaxed text-white/70">{current.desc}</p>
                <button
                  onClick={() => setOpen(current)}
                  className="inline-flex items-center gap-2 rounded-full bg-white px-6 py-2.5 text-[0.85rem] font-bold text-bg transition-colors hover:bg-pink"
                >
                  View details
                  <ChevronRight size={16} />
                </button>
              </motion.div>
            )}
          </AnimatePresence>

          <div className="mt-6 inline-flex items-center gap-2 font-mono text-[0.62rem] uppercase tracking-[0.2em] text-white/35">
            <MousePointer2 size={12} /> Drag to spin the ring · click a card to bring it forward
          </div>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[600] flex items-end justify-center bg-black/80 p-0 backdrop-blur-sm sm:items-center sm:p-6"
            onClick={() => setOpen(null)}
            role="dialog"
            aria-modal="true"
            aria-label={open.title}
          >
            <motion.div
              initial={{ y: 40, scale: 0.96, rotateX: 8 }}
              animate={{ y: 0, scale: 1, rotateX: 0 }}
              exit={{ y: 30, scale: 0.97 }}
              transition={{ type: "spring", stiffness: 240, damping: 24 }}
              onClick={(e) => e.stopPropagation()}
              className="max-h-[92vh] w-full max-w-3xl overflow-y-auto rounded-t-3xl border border-white/10 bg-navy p-5 shadow-2xl sm:rounded-3xl sm:p-8"
            >
              <div className="mb-5 flex items-start justify-between gap-4">
                <div>
                  <div className="mb-2 flex flex-wrap gap-2">
                    <span className="rounded-full border border-accent/40 bg-accent/10 px-3 py-0.5 font-mono text-[0.65rem] uppercase tracking-wider text-accent">
                      {open.tagLabel}
                    </span>
                    {open.tagLabel2 && (
                      <span className="rounded-full border border-pink/40 bg-pink/10 px-3 py-0.5 font-mono text-[0.65rem] uppercase tracking-wider text-pink">
                        {open.tagLabel2}
                      </span>
                    )}
                  </div>
                  <h3 className="text-2xl font-extrabold">{open.title}</h3>
                </div>
                <button
                  onClick={() => setOpen(null)}
                  aria-label="Close"
                  className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20"
                >
                  <X size={18} />
                </button>
              </div>
              {open.screenshots && open.screenshots.length > 0 && (
                <Gallery key={open.title} shots={open.screenshots} title={open.title} />
              )}
              <p className="mt-6 leading-relaxed text-white/75">{open.desc}</p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
