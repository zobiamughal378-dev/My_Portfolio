import { useEffect, useRef } from "react";

type Particle = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
  bright: boolean;
};

export const ParticleField = () => {
  const ref = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let w = 0,
      h = 0,
      particles: Particle[] = [];
    const mouse = { x: -9999, y: -9999 };

    const spawn = (): Particle => ({
      x: Math.random() * w,
      y: Math.random() * h,
      vx: 0,
      vy: 0,
      life: 60 + Math.random() * 240,
      bright: Math.random() > 0.92,
    });

    const resize = () => {
      w = canvas.width = window.innerWidth;
      h = canvas.height = window.innerHeight;
      const count = Math.min(1100, Math.floor((w * h) / 2600));
      particles = Array.from({ length: count }, spawn);
      ctx.fillStyle = "#050505";
      ctx.fillRect(0, 0, w, h);
    };
    resize();
    window.addEventListener("resize", resize);

    const onMove = (e: MouseEvent) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    };
    const onLeave = () => {
      mouse.x = -9999;
      mouse.y = -9999;
    };
    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseout", onLeave);

    let raf: number;
    let t = 0;
    const tick = () => {
      raf = requestAnimationFrame(tick);
      t += 0.0035;
      ctx.fillStyle = "rgba(5, 5, 5, 0.085)";
      ctx.fillRect(0, 0, w, h);

      for (const p of particles) {
        const a =
          Math.sin(p.x * 0.0021 + t * 2.1) +
          Math.cos(p.y * 0.0019 - t * 1.4) +
          Math.sin((p.x + p.y) * 0.0011 + t);
        const ang = a * Math.PI * 0.6;
        p.vx += Math.cos(ang) * 0.045;
        p.vy += Math.sin(ang) * 0.045;

        const dx = mouse.x - p.x;
        const dy = mouse.y - p.y;
        const d2 = dx * dx + dy * dy;
        if (d2 < 32400) {
          const d = Math.sqrt(d2) || 1;
          const f = (1 - d / 180) * 0.9;
          p.vx += (-dy / d) * f + (dx / d) * f * 0.25;
          p.vy += (dx / d) * f + (dy / d) * f * 0.25;
        }

        p.vx *= 0.94;
        p.vy *= 0.94;
        p.x += p.vx;
        p.y += p.vy;
        p.life--;

        if (p.life <= 0 || p.x < -20 || p.x > w + 20 || p.y < -20 || p.y > h + 20) {
          Object.assign(p, spawn());
          continue;
        }

        const speed = Math.min(1, (Math.abs(p.vx) + Math.abs(p.vy)) / 2.2);
        ctx.fillStyle = p.bright
          ? `rgba(255,255,255,${0.25 + speed * 0.55})`
          : `rgba(210,210,210,${0.05 + speed * 0.3})`;
        const s = p.bright ? 1.6 : 1.1;
        ctx.fillRect(p.x, p.y, s, s);
      }
    };
    raf = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseout", onLeave);
    };
  }, []);

  return (
    <canvas
      ref={ref}
      className="fixed inset-0 z-[-1] pointer-events-none opacity-70"
      aria-hidden="true"
    />
  );
};

export default ParticleField;
