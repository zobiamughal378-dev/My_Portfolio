import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import ProjectIllustration from "./ProjectIllustration";

export default function ProjectMedia({
  screenshots,
  icon,
  seed,
  color1,
  color2,
  index,
  total,
}: {
  screenshots?: string[];
  icon: string;
  seed: number;
  color1: string;
  color2: string;
  index: number;
  total: number;
}) {
  const [shotIndex, setShotIndex] = useState(0);

  useEffect(() => {
    setShotIndex(0);
    if (!screenshots || screenshots.length < 2) return;
    const id = setInterval(() => {
      setShotIndex((i) => (i + 1) % screenshots.length);
    }, 2600);
    return () => clearInterval(id);
  }, [screenshots]);

  if (!screenshots || screenshots.length === 0) {
    return (
      <ProjectIllustration
        icon={icon}
        seed={seed}
        color1={color1}
        color2={color2}
        large
        index={index}
        total={total}
      />
    );
  }

  return (
    <div className="relative h-[280px] w-full overflow-hidden rounded-xl border border-white/[0.06] bg-[#070d24] sm:h-[360px]">
      <div className="absolute inset-x-0 top-0 z-20 flex items-center gap-1.5 border-b border-white/[0.06] bg-white/[0.02] px-3 py-2">
        <span className="h-2 w-2 rounded-full bg-white/15" />
        <span className="h-2 w-2 rounded-full bg-white/15" />
        <span className="h-2 w-2 rounded-full bg-white/15" />
      </div>
      <AnimatePresence mode="wait">
        <motion.img
          key={screenshots[shotIndex]}
          src={screenshots[shotIndex]}
          alt=""
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="absolute inset-0 h-full w-full object-contain pt-[30px]"
        />
      </AnimatePresence>
      {screenshots.length > 1 && (
        <div className="absolute bottom-3 left-1/2 z-20 flex -translate-x-1/2 gap-1.5">
          {screenshots.map((_, i) => (
            <span
              key={i}
              className={`h-1.5 rounded-full transition-all ${
                i === shotIndex ? "w-4 bg-accent" : "w-1.5 bg-white/30"
              }`}
            />
          ))}
        </div>
      )}
      <span className="absolute bottom-3 right-4 z-20 font-mono text-[0.62rem] uppercase tracking-[0.1em] text-white/60">
        Project / {String(index + 1).padStart(2, "0")}
      </span>
    </div>
  );
}
