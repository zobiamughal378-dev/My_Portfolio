import { motion } from "framer-motion";

const blobPaths = [
  "M45.7,-58.4C58.9,-49.6,69.2,-35.6,72.9,-20.1C76.6,-4.6,73.7,12.4,66.1,26.8C58.5,41.2,46.2,53,31.9,60.6C17.6,68.2,1.3,71.6,-15.2,69.7C-31.7,67.8,-48.4,60.6,-59.5,47.9C-70.6,35.2,-76.1,17.6,-75.6,0.5C-75.1,-16.6,-68.6,-33.2,-57.2,-42.6C-45.8,-52,-29.5,-54.2,-14.4,-60.1C0.7,-66,15.6,-75.6,29.9,-73.5C44.2,-71.4,57.9,-57.6,45.7,-58.4Z",
  "M42.1,-54.5C53.4,-45.9,60.3,-31.5,63.8,-16.3C67.3,-1.1,67.4,15,61.2,28.6C55,42.2,42.5,53.3,28.1,59.8C13.7,66.3,-2.6,68.2,-18.5,64.6C-34.4,61,-49.9,51.9,-59.4,38.4C-68.9,24.9,-72.4,7,-69.8,-9.6C-67.2,-26.2,-58.5,-41.5,-45.9,-50.3C-33.3,-59.1,-16.7,-61.4,-0.4,-60.9C15.9,-60.4,30.8,-63.1,42.1,-54.5Z",
];

export default function ProjectIllustration({
  icon,
  seed,
  color1,
  color2,
  large,
  index,
  total,
}: {
  icon: string;
  seed: number;
  color1: string;
  color2: string;
  large?: boolean;
  index?: number;
  total?: number;
}) {
  const path = blobPaths[seed % blobPaths.length];
  const gradId = `pg-${seed}`;
  const meshId = `mesh-${seed}`;
  const hasSidebar = seed % 2 === 0;

  return (
    <div
      className={`relative w-full overflow-hidden rounded-xl border border-white/[0.06] bg-[#070d24] ${
        large ? "h-[220px] sm:h-[280px]" : "h-[92px]"
      }`}
    >
      {large && (
        <>
          {/* fake browser chrome */}
          <div className="absolute inset-x-0 top-0 z-20 flex items-center gap-1.5 border-b border-white/[0.06] bg-white/[0.02] px-3 py-2">
            <span className="h-2 w-2 rounded-full bg-white/15" />
            <span className="h-2 w-2 rounded-full bg-white/15" />
            <span className="h-2 w-2 rounded-full bg-white/15" />
            <span className="ml-2 h-3.5 flex-1 max-w-[160px] rounded bg-white/[0.04]" />
          </div>

          {/* mock UI: optional sidebar */}
          {hasSidebar && (
            <div className="absolute bottom-0 left-0 top-[30px] z-10 w-[26%] border-r border-white/[0.05] bg-white/[0.015] p-2.5">
              {[0.9, 0.7, 0.8, 0.5, 0.75].map((w, i) => (
                <div
                  key={i}
                  className="mb-2 h-2 rounded-full bg-white/[0.06]"
                  style={{ width: `${w * 100}%` }}
                />
              ))}
            </div>
          )}

          {/* mock content blocks bottom corner */}
          <div
            className={`absolute bottom-4 z-10 flex gap-1.5 ${hasSidebar ? "left-[30%]" : "left-4"}`}
          >
            <div className="h-8 w-14 rounded-md border border-white/[0.06] bg-white/[0.03]" />
            <div className="h-8 w-14 rounded-md border border-white/[0.06] bg-white/[0.03]" />
          </div>
        </>
      )}

      {/* subtle grid */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.035) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.035) 1px, transparent 1px)",
          backgroundSize: "22px 22px",
        }}
      />

      {/* mesh gradient wash */}
      <svg className="absolute inset-0 h-full w-full" preserveAspectRatio="xMidYMid slice">
        <defs>
          <radialGradient id={meshId} cx="20%" cy="20%" r="80%">
            <stop offset="0%" stopColor={color1} stopOpacity="0.35" />
            <stop offset="100%" stopColor={color1} stopOpacity="0" />
          </radialGradient>
          <radialGradient id={`${meshId}-2`} cx="85%" cy="80%" r="70%">
            <stop offset="0%" stopColor={color2} stopOpacity="0.3" />
            <stop offset="100%" stopColor={color2} stopOpacity="0" />
          </radialGradient>
        </defs>
        <rect width="100%" height="100%" fill={`url(#${meshId})`} />
        <rect width="100%" height="100%" fill={`url(#${meshId}-2)`} />
      </svg>

      {/* rotating blob behind icon */}
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
        className="absolute inset-0 flex items-center justify-center"
      >
        <svg
          viewBox="-80 -80 160 160"
          className={`opacity-90 ${large ? "h-[220px] w-[220px]" : "h-[140px] w-[140px]"}`}
        >
          <defs>
            <linearGradient id={gradId} x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor={color1} />
              <stop offset="100%" stopColor={color2} />
            </linearGradient>
          </defs>
          <path d={path} fill={`url(#${gradId})`} opacity={0.5} />
        </svg>
      </motion.div>

      {/* glow orb accent */}
      <div
        className="pointer-events-none absolute h-24 w-24 rounded-full blur-2xl"
        style={{ background: color2, opacity: 0.25, top: "10%", right: "8%" }}
      />

      {/* centerpiece icon in a rounded "app icon" card */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div
          className={`flex items-center justify-center rounded-2xl border border-white/10 shadow-2xl backdrop-blur-sm ${
            large ? "h-24 w-24" : "h-12 w-12"
          }`}
          style={{ background: `linear-gradient(135deg, ${color1}30, ${color2}20)` }}
        >
          <span
            className={`drop-shadow-[0_8px_20px_rgba(0,0,0,0.5)] ${
              large ? "text-[3.2rem]" : "text-[1.6rem]"
            }`}
          >
            {icon}
          </span>
        </div>
      </div>

      <div className="shine pointer-events-none absolute inset-0 opacity-40" />

      {large && index !== undefined && total !== undefined && (
        <span className="absolute bottom-3 right-4 z-20 font-mono text-[0.62rem] uppercase tracking-[0.1em] text-white/50">
          Project / {String(index + 1).padStart(2, "0")}
        </span>
      )}
    </div>
  );
}
