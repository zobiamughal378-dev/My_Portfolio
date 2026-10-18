import { useEffect, useRef } from "react";

const COLORS = ["#ff9ec4", "#6fd3f0", "#ffd77a", "#b79cff", "#7ee8c8", "#ff7aa8", "#5b8cff", "#ffb88a"];

interface Blob {
  x: number;
  y: number;
  r: number;
  sx: number;
  sy: number;
  px: number;
  py: number;
  c: string;
}
interface Drop {
  x: number;
  y: number;
  vx: number;
  vy: number;
  r: number;
  c: string;
  life: number;
}

/**
 * Paint-splash background: big colour blobs that flow like liquid paint,
 * plus splashes that burst on their own, on mouse movement and on click.
 * Use inside a `relative overflow-hidden` section, or with `fixed` for a whole page.
 */
export default function PaintFlow({ fixed = false }: { fixed?: boolean }) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const blobRef = useRef<HTMLCanvasElement>(null);
  const splatRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const wrap = wrapRef.current!;
    const host = fixed ? wrap : wrap.parentElement!;
    const K = 0.5; // splash layer runs at half resolution to stay light
    const bc = blobRef.current!;
    const sc = splatRef.current!;
    const bctx = bc.getContext("2d")!;
    const sctx = sc.getContext("2d")!;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let w = 0;
    let h = 0;
    let visible = false;
    let raf = 0;
    let t = 0;
    let blobs: Blob[] = [];
    const drops: Drop[] = [];

    const resize = () => {
      w = host.clientWidth;
      h = host.clientHeight;
      bc.width = Math.max(1, Math.floor(w / 3));
      bc.height = Math.max(1, Math.floor(h / 3));
      sc.width = Math.max(1, Math.floor(w * K));
      sc.height = Math.max(1, Math.floor(h * K));
      blobs = COLORS.map((c, i) => ({
        x: (i + 0.5) / COLORS.length,
        y: Math.random(),
        r: 0.22 + Math.random() * 0.16,
        sx: 0.15 + Math.random() * 0.25,
        sy: 0.12 + Math.random() * 0.22,
        px: Math.random() * 6.28,
        py: Math.random() * 6.28,
        c,
      }));
    };

    const burst = (x: number, y: number, n: number, power: number) => {
      const c0 = COLORS[(Math.random() * COLORS.length) | 0];
      for (let i = 0; i < n; i++) {
        const a = Math.random() * Math.PI * 2;
        const s = Math.random() * power + 1;
        drops.push({
          x: x * K,
          y: y * K,
          vx: Math.cos(a) * s * K,
          vy: Math.sin(a) * s * K,
          r: (Math.random() * 7 + 2) * K,
          c: Math.random() < 0.65 ? c0 : COLORS[(Math.random() * COLORS.length) | 0],
          life: 1,
        });
      }
    };

    const frame = () => {
      raf = requestAnimationFrame(frame);
      if (!visible) return;
      t += 0.008;

      // flowing colour blobs (low-res, blurred by CSS)
      bctx.clearRect(0, 0, bc.width, bc.height);
      for (const b of blobs) {
        const cx = (b.x + Math.sin(t * b.sx * 6 + b.px) * 0.28) * bc.width;
        const cy = (b.y + Math.cos(t * b.sy * 6 + b.py) * 0.3) * bc.height;
        const r = b.r * Math.max(bc.width, bc.height) * (1 + 0.15 * Math.sin(t * 2 + b.px));
        const g = bctx.createRadialGradient(cx, cy, 0, cx, cy, r);
        g.addColorStop(0, b.c);
        g.addColorStop(1, "rgba(0,0,0,0)");
        bctx.globalAlpha = 0.85;
        bctx.fillStyle = g;
        bctx.beginPath();
        bctx.arc(cx, cy, r, 0, Math.PI * 2);
        bctx.fill();
      }

      // paint drops leave fading trails
      sctx.globalCompositeOperation = "destination-out";
      sctx.fillStyle = "rgba(0,0,0,0.035)";
      sctx.fillRect(0, 0, sc.width, sc.height);
      sctx.globalCompositeOperation = "source-over";
      for (let i = drops.length - 1; i >= 0; i--) {
        const d = drops[i];
        d.x += d.vx;
        d.y += d.vy;
        d.vx *= 0.955;
        d.vy *= 0.955;
        d.vy += 0.02;
        d.life *= 0.975;
        sctx.globalAlpha = Math.min(1, d.life * 1.4);
        sctx.fillStyle = d.c;
        sctx.beginPath();
        sctx.arc(d.x, d.y, d.r * (0.5 + d.life * 0.6), 0, Math.PI * 2);
        sctx.fill();
        if (d.life < 0.05) drops.splice(i, 1);
      }
      sctx.globalAlpha = 1;
    };

    let autoTimer = 0;
    const startAuto = () => {
      autoTimer = window.setInterval(() => {
        if (visible && !reduce) burst(Math.random() * w, Math.random() * h, 22, 7);
      }, 1700);
    };

    const events: Window | HTMLElement = fixed ? window : host;
    let lastMove = 0;
    const onMove = (e: PointerEvent) => {
      const now = performance.now();
      if (now - lastMove < 70) return;
      lastMove = now;
      const r = wrap.getBoundingClientRect();
      burst(e.clientX - r.left, e.clientY - r.top, 2, 2.2);
    };
    const onDown = (e: PointerEvent) => {
      const r = wrap.getBoundingClientRect();
      burst(e.clientX - r.left, e.clientY - r.top, 46, 9);
    };

    const io = new IntersectionObserver(([e]) => (visible = e.isIntersecting), { threshold: 0.05 });
    io.observe(host);
    const ro = new ResizeObserver(resize);
    ro.observe(host);

    resize();
    burst(w * 0.3, h * 0.4, 30, 8);
    burst(w * 0.7, h * 0.6, 30, 8);
    if (reduce) {
      visible = true;
      frame();
      cancelAnimationFrame(raf);
    } else {
      raf = requestAnimationFrame(frame);
      startAuto();
      events.addEventListener("pointermove", onMove as EventListener);
      events.addEventListener("pointerdown", onDown as EventListener);
    }
    return () => {
      cancelAnimationFrame(raf);
      clearInterval(autoTimer);
      io.disconnect();
      ro.disconnect();
      events.removeEventListener("pointermove", onMove as EventListener);
      events.removeEventListener("pointerdown", onDown as EventListener);
    };
  }, [fixed]);

  return (
    <div
      ref={wrapRef}
      aria-hidden="true"
      className={`pointer-events-none inset-0 overflow-hidden ${fixed ? "fixed z-0" : "absolute"}`}
    >
      <canvas
        ref={blobRef}
        className="absolute inset-0 h-full w-full opacity-70"
        style={{ filter: "blur(28px) saturate(1.5)", transform: "scale(1.15)" }}
      />
      <canvas ref={splatRef} className="absolute inset-0 h-full w-full opacity-90" />
    </div>
  );
}
