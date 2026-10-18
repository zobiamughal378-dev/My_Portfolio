import { useEffect, useRef } from "react";

type P = {
  x: number;
  y: number;
  tx: number;
  ty: number;
  vx: number;
  vy: number;
  size: number;
  hue: "green" | "white";
};

export default function ParticleName({
  text,
  width = 720,
  height = 150,
}: {
  text: string;
  width?: number;
  height?: number;
}) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const dpr = Math.min(2, window.devicePixelRatio || 1);
    canvas.width = width * dpr;
    canvas.height = height * dpr;
    ctx.scale(dpr, dpr);

    // 1. render text offscreen to sample target pixel positions
    const off = document.createElement("canvas");
    off.width = width;
    off.height = height;
    const octx = off.getContext("2d")!;
    octx.clearRect(0, 0, width, height);
    octx.fillStyle = "#fff";
    octx.textAlign = "center";
    octx.textBaseline = "middle";
    let fontSize = Math.floor(height * 0.62);
    octx.font = `800 ${fontSize}px Syne, sans-serif`;
    // shrink font until text fits width with some padding
    while (octx.measureText(text).width > width * 0.94 && fontSize > 10) {
      fontSize -= 2;
      octx.font = `800 ${fontSize}px Syne, sans-serif`;
    }
    octx.fillText(text, width / 2, height / 2 + height * 0.03);

    const imgData = octx.getImageData(0, 0, width, height).data;
    const targets: { x: number; y: number }[] = [];
    const step = 3;
    for (let y = 0; y < height; y += step) {
      for (let x = 0; x < width; x += step) {
        const idx = (y * width + x) * 4 + 3;
        if (imgData[idx] > 128) targets.push({ x, y });
      }
    }

    // 2. create particles starting from the 4 edges, one per target point
    const particles: P[] = targets.map((t) => {
      const side = Math.floor(Math.random() * 4);
      let x = 0,
        y = 0;
      if (side === 0) {
        x = Math.random() * width;
        y = -20 - Math.random() * 60;
      } else if (side === 1) {
        x = width + 20 + Math.random() * 60;
        y = Math.random() * height;
      } else if (side === 2) {
        x = Math.random() * width;
        y = height + 20 + Math.random() * 60;
      } else {
        x = -20 - Math.random() * 60;
        y = Math.random() * height;
      }
      return {
        x,
        y,
        tx: t.x,
        ty: t.y,
        vx: 0,
        vy: 0,
        size: 1.1 + Math.random() * 1.3,
        hue: Math.random() > 0.75 ? "white" : "green",
      };
    });

    let raf: number;
    let frame = 0;
    const tick = () => {
      raf = requestAnimationFrame(tick);
      frame++;
      ctx.clearRect(0, 0, width, height);

      const settleProgress = Math.min(1, frame / 70); // ease-in period
      const ease = 0.06 + settleProgress * 0.06;

      for (const p of particles) {
        const dx = p.tx - p.x;
        const dy = p.ty - p.y;
        p.vx += dx * ease * 0.14;
        p.vy += dy * ease * 0.14;
        p.vx *= 0.78;
        p.vy *= 0.78;
        p.x += p.vx;
        p.y += p.vy;

        // gentle idle shimmer once settled
        const dist = Math.hypot(dx, dy);
        const jitter = dist < 1.2 ? Math.sin(frame * 0.05 + p.tx * 0.1) * 0.25 : 0;

        ctx.beginPath();
        ctx.fillStyle =
          p.hue === "white"
            ? `rgba(255,255,255,${0.7 + jitter * 0.2})`
            : `rgba(111,211,240,${0.55 + jitter * 0.25})`;
        ctx.arc(p.x, p.y + jitter, p.size, 0, Math.PI * 2);
        ctx.fill();
      }
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [text, width, height]);

  return (
    <div className="relative" style={{ width: "100%", maxWidth: width }}>
      <canvas
        ref={canvasRef}
        style={{ width: "100%", height: "auto", aspectRatio: `${width}/${height}` }}
        aria-hidden="true"
      />
      <h1 className="sr-only">{text}</h1>
    </div>
  );
}
