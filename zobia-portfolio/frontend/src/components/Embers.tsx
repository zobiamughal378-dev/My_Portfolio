import { useEffect, useRef } from "react";

const COLORS = ["255,205,150", "255,158,196", "255,255,255", "170,215,255", "255,236,170"];

interface E {
  x: number;
  y: number;
  vx: number;
  vy: number;
  r: number;
  life: number;
  decay: number;
  c: string;
  phase: number;
}

/** Glowing sparks that rise like an aura. Fills its (relative) parent. */
export default function Embers({ className = "" }: { className?: string }) {
  const ref = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const canvas = ref.current!;
    const host = canvas.parentElement!;
    const ctx = canvas.getContext("2d")!;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let w = 0;
    let h = 0;
    let visible = true;
    let raf = 0;
    let t = 0;
    const list: E[] = [];
    const spawn = (): E => ({
      x: w * (0.15 + Math.random() * 0.7),
      y: h * (0.78 + Math.random() * 0.2),
      vx: (Math.random() - 0.5) * 0.5,
      vy: -(Math.random() * 1.2 + 0.5),
      r: Math.random() * 2.4 + 0.8,
      life: 1,
      decay: Math.random() * 0.006 + 0.003,
      c: COLORS[(Math.random() * COLORS.length) | 0],
      phase: Math.random() * 6.28,
    });
    const resize = () => {
      w = canvas.width = host.clientWidth;
      h = canvas.height = host.clientHeight;
    };
    const frame = () => {
      raf = requestAnimationFrame(frame);
      if (!visible) return;
      t += 0.03;
      ctx.clearRect(0, 0, w, h);
      if (!reduce && list.length < 60 && Math.random() < 0.6) list.push(spawn());
      ctx.globalCompositeOperation = "lighter";
      for (let i = list.length - 1; i >= 0; i--) {
        const p = list[i];
        p.x += p.vx + Math.sin(t + p.phase) * 0.35;
        p.y += p.vy;
        p.life -= p.decay;
        if (p.life <= 0 || p.y < -10) {
          list.splice(i, 1);
          continue;
        }
        const a = p.life * (0.6 + 0.4 * Math.sin(t * 3 + p.phase));
        const g = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.r * 4);
        g.addColorStop(0, `rgba(${p.c},${a})`);
        g.addColorStop(1, `rgba(${p.c},0)`);
        ctx.fillStyle = g;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r * 4, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.globalCompositeOperation = "source-over";
    };
    const io = new IntersectionObserver(([e]) => (visible = e.isIntersecting), { threshold: 0 });
    io.observe(host);
    const ro = new ResizeObserver(resize);
    ro.observe(host);
    resize();
    raf = requestAnimationFrame(frame);
    return () => {
      cancelAnimationFrame(raf);
      io.disconnect();
      ro.disconnect();
    };
  }, []);
  return <canvas ref={ref} aria-hidden="true" className={`pointer-events-none ${className}`} />;
}
