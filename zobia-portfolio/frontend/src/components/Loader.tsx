import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

const messages = ["LOADING PORTFOLIO...", "COMPILING PROJECTS...", "INITIALIZING UI...", "READY"];
const COLORS = ["#6fd3f0", "#ff9ec4", "#b79cff", "#5b8cff", "#ffffff"];
const NAME = "ZOBIA RAZZAQ".split("");

interface P {
  x: number;
  y: number;
  vx: number;
  vy: number;
  r: number;
  c: string;
  life: number;
}

export default function Loader({ onDone }: { onDone: () => void }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [pct, setPct] = useState(0);
  const [ready, setReady] = useState(false);
  const [leaving, setLeaving] = useState(false);

  // particle blasts
  useEffect(() => {
    const canvas = canvasRef.current!;
    const ctx = canvas.getContext("2d")!;
    let w = (canvas.width = window.innerWidth);
    let h = (canvas.height = window.innerHeight);
    const parts: P[] = [];
    const blast = (n: number, power: number) => {
      for (let i = 0; i < n; i++) {
        const a = Math.random() * Math.PI * 2;
        const s = Math.random() * power + 1.5;
        parts.push({
          x: w / 2,
          y: h / 2,
          vx: Math.cos(a) * s,
          vy: Math.sin(a) * s,
          r: Math.random() * 2.4 + 0.7,
          c: COLORS[(Math.random() * COLORS.length) | 0],
          life: 1,
        });
      }
    };
    blast(280, 11);
    const again = setInterval(() => blast(60, 6), 900);
    let raf = 0;
    const draw = () => {
      ctx.fillStyle = "rgba(7,13,36,0.2)";
      ctx.fillRect(0, 0, w, h);
      for (let i = parts.length - 1; i >= 0; i--) {
        const p = parts[i];
        p.x += p.vx;
        p.y += p.vy;
        p.vx *= 0.975;
        p.vy *= 0.975;
        p.life *= 0.986;
        if (p.life < 0.02) {
          parts.splice(i, 1);
          continue;
        }
        ctx.globalAlpha = p.life;
        ctx.fillStyle = p.c;
        ctx.shadowBlur = 12;
        ctx.shadowColor = p.c;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.globalAlpha = 1;
      ctx.shadowBlur = 0;
      raf = requestAnimationFrame(draw);
    };
    draw();
    const onResize = () => {
      w = canvas.width = window.innerWidth;
      h = canvas.height = window.innerHeight;
    };
    window.addEventListener("resize", onResize);
    return () => {
      cancelAnimationFrame(raf);
      clearInterval(again);
      window.removeEventListener("resize", onResize);
    };
  }, []);

  // progress
  useEffect(() => {
    const iv = setInterval(() => {
      setPct((p) => {
        const next = Math.min(100, p + Math.random() * 5 + 2.5);
        if (next >= 100) {
          clearInterval(iv);
          setReady(true);
        }
        return next;
      });
    }, 60);
    return () => clearInterval(iv);
  }, []);

  const enter = () => {
    if (leaving) return;
    setLeaving(true);
    setTimeout(onDone, 950);
  };

  useEffect(() => {
    if (!ready) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Enter" || e.key === " ") enter();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ready, leaving]);

  const msgIndex = Math.min(3, Math.floor(pct / 26));

  return (
    <motion.div
      className="fixed inset-0 z-[9000] flex flex-col items-center justify-center bg-bg"
      animate={
        leaving
          ? { opacity: 0, scale: 1.8, filter: "blur(18px)" }
          : { opacity: 1, scale: 1, filter: "blur(0px)" }
      }
      transition={{ duration: 0.9, ease: [0.7, 0, 0.3, 1] }}
      style={{ pointerEvents: leaving ? "none" : "auto" }}
    >
      <canvas ref={canvasRef} className="absolute inset-0 h-full w-full" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_30%,rgba(7,13,36,0.85)_100%)]" />

      <div className="relative z-10 flex flex-col items-center px-6 text-center">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="mb-6 font-mono text-[0.7rem] tracking-[0.5em] text-cyan/80"
        >
          // SYSTEM BOOT
        </motion.div>

        <h1 className="flex flex-wrap justify-center font-display text-[clamp(2.2rem,8vw,5.5rem)] font-extrabold leading-none tracking-tight">
          {NAME.map((ch, i) => (
            <motion.span
              key={i}
              initial={{ opacity: 0, y: 40, rotateX: -90, filter: "blur(10px)" }}
              animate={{ opacity: 1, y: 0, rotateX: 0, filter: "blur(0px)" }}
              transition={{ delay: 0.35 + i * 0.07, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              className={`inline-block ${ch === " " ? "w-[0.35em]" : ""} ${
                i < 5
                  ? "bg-gradient-to-b from-white to-cyan bg-clip-text text-transparent"
                  : "bg-gradient-to-b from-white to-pink bg-clip-text text-transparent"
              }`}
              style={{ textShadow: "0 0 40px rgba(111,211,240,0.35)" }}
            >
              {ch === " " ? "\u00A0" : ch}
            </motion.span>
          ))}
        </h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.3 }}
          className="mt-4 font-mono text-[0.7rem] tracking-[0.35em] text-white/50 sm:text-xs"
        >
          FULL-STACK · AI/ML · COMPETITIVE PROGRAMMER
        </motion.p>

        {!ready ? (
          <div className="mt-12 w-[260px] sm:w-[340px]">
            <div className="mb-2 flex justify-between font-mono text-[0.68rem] text-white/50">
              <span className="animate-blink">{messages[msgIndex]}</span>
              <span className="text-cyan">{Math.round(pct)}%</span>
            </div>
            <div className="h-[3px] w-full overflow-hidden rounded bg-cyan/15">
              <div
                className="h-full rounded bg-gradient-to-r from-blue via-cyan to-pink transition-[width] duration-75"
                style={{ width: `${pct}%` }}
              />
            </div>
          </div>
        ) : (
          <motion.button
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ type: "spring", stiffness: 220, damping: 16 }}
            onClick={enter}
            className="relative mt-12 rounded-full border border-cyan bg-cyan/10 px-10 py-3.5 font-mono text-sm font-semibold tracking-[0.3em] text-cyan transition-colors hover:bg-cyan hover:text-black"
          >
            <span className="pointer-events-none absolute -inset-1 animate-ping rounded-full border border-cyan/40" />
            ENTER
          </motion.button>
        )}
      </div>
    </motion.div>
  );
}
