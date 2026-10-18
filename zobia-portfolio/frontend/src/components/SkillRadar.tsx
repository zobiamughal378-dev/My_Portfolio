import { useEffect, useRef, useState } from "react";

const AXES = [
  { label: "Frontend", value: 85 },
  { label: "Backend", value: 80 },
  { label: "AI / ML", value: 78 },
  { label: "DSA", value: 90 },
  { label: "Systems", value: 75 },
  { label: "Design", value: 72 },
];

const SIZE = 280;
const CENTER = SIZE / 2;
const RADIUS = 100;

function point(index: number, total: number, value: number) {
  const angle = (Math.PI * 2 * index) / total - Math.PI / 2;
  const r = (value / 100) * RADIUS;
  return { x: CENTER + Math.cos(angle) * r, y: CENTER + Math.sin(angle) * r };
}

export default function SkillRadar() {
  const [progress, setProgress] = useState(0);
  const ref = useRef<SVGSVGElement | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          const start = performance.now();
          const tick = (now: number) => {
            const p = Math.min(1, (now - start) / 1100);
            setProgress(1 - Math.pow(1 - p, 3));
            if (p < 1) requestAnimationFrame(tick);
          };
          requestAnimationFrame(tick);
          obs.disconnect();
        }
      },
      { threshold: 0.3 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  const total = AXES.length;
  const dataPoints = AXES.map((a, i) => point(i, total, a.value * progress));
  const polygon = dataPoints.map((p) => `${p.x},${p.y}`).join(" ");

  const rings = [0.25, 0.5, 0.75, 1];

  return (
    <div className="flex flex-col items-center rounded-2xl border border-white/10 bg-card p-6">
      <div className="mb-4 font-mono text-[0.7rem] uppercase tracking-[0.2em] text-accent">
        Skill Radar
      </div>
      <svg ref={ref} viewBox={`0 0 ${SIZE} ${SIZE}`} width="100%" style={{ maxWidth: 300 }}>
        {rings.map((r) => (
          <polygon
            key={r}
            points={AXES.map((_, i) => {
              const p = point(i, total, 100 * r);
              return `${p.x},${p.y}`;
            }).join(" ")}
            fill="none"
            stroke="rgba(255,255,255,0.08)"
            strokeWidth={1}
          />
        ))}
        {AXES.map((_, i) => {
          const p = point(i, total, 100);
          return (
            <line
              key={i}
              x1={CENTER}
              y1={CENTER}
              x2={p.x}
              y2={p.y}
              stroke="rgba(255,255,255,0.08)"
              strokeWidth={1}
            />
          );
        })}
        <polygon
          points={polygon}
          fill="rgba(111,211,240,0.25)"
          stroke="#6fd3f0"
          strokeWidth={2}
          strokeLinejoin="round"
        />
        {dataPoints.map((p, i) => (
          <circle key={i} cx={p.x} cy={p.y} r={3} fill="#6fd3f0" />
        ))}
        {AXES.map((a, i) => {
          const p = point(i, total, 122);
          return (
            <text
              key={a.label}
              x={p.x}
              y={p.y}
              textAnchor="middle"
              dominantBaseline="middle"
              fontSize="9"
              fontFamily="JetBrains Mono, monospace"
              fill="rgba(255,255,255,0.6)"
            >
              {a.label}
            </text>
          );
        })}
      </svg>
    </div>
  );
}
