import { useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight, Download, X } from "lucide-react";

export default function SketchViewer({
  images,
  index,
  onChange,
  alts,
  showDownload = true,
}: {
  images: string[];
  index: number | null;
  onChange: (i: number | null) => void;
  alts?: string[];
  showDownload?: boolean;
}) {
  const n = images.length;
  useEffect(() => {
    if (index === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onChange(null);
      if (e.key === "ArrowRight") onChange((index + 1) % n);
      if (e.key === "ArrowLeft") onChange((index - 1 + n) % n);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [index, n, onChange]);

  return (
    <AnimatePresence>
      {index !== null && (
        <motion.div
          className="fixed inset-0 z-[600] flex items-center justify-center bg-black/90 p-4 backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => onChange(null)}
        >
          <button
            aria-label="Close"
            onClick={() => onChange(null)}
            className="absolute right-5 top-5 flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20"
          >
            <X size={18} />
          </button>
          <button
            aria-label="Previous"
            onClick={(e) => {
              e.stopPropagation();
              onChange((index - 1 + n) % n);
            }}
            className="absolute left-3 flex h-11 w-11 items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20 sm:left-6"
          >
            <ChevronLeft size={22} />
          </button>
          <div className="flex flex-col items-center" onClick={(e) => e.stopPropagation()}>
            <motion.img
              key={index}
              src={images[index]}
              alt={alts?.[index] ?? `Sketch ${index + 1}`}
              initial={{ scale: 0.94, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.25 }}
              className="max-h-[80vh] max-w-[84vw] rounded-xl bg-white object-contain"
            />
            <div className="mt-4 flex items-center gap-5">
              <span className="font-mono text-[0.7rem] tracking-widest text-white/60">
                {index + 1} / {n}
              </span>
              {alts?.[index] && <span className="text-[0.8rem] text-white/80">{alts[index]}</span>}
              {showDownload && (
                <a
                  href={images[index]}
                  download
                  className="inline-flex items-center gap-2 rounded-full bg-accent px-5 py-2 text-[0.8rem] font-bold text-black transition-transform hover:scale-105"
                >
                  <Download size={15} />
                  Download
                </a>
              )}
            </div>
          </div>
          <button
            aria-label="Next"
            onClick={(e) => {
              e.stopPropagation();
              onChange((index + 1) % n);
            }}
            className="absolute right-3 flex h-11 w-11 items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20 sm:right-6"
          >
            <ChevronRight size={22} />
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
