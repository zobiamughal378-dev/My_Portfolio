import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowLeft, Download, Eye } from "lucide-react";
import TiltCard from "./TiltCard";
import PaintFlow from "./PaintFlow";
import SketchViewer from "./SketchViewer";
import Flower, { FlowerGarden } from "./Flower";
import { sketches } from "../data/hobbies";

// same collage look as the home-page sketch section, repeated for any number of sketches
const PATTERN = [
  { span: "md:col-span-7", ratio: "aspect-[16/11]", block: "bg-pink", frame: "border-cyan", rot: -2 },
  { span: "md:col-span-5", ratio: "aspect-[4/5]", block: "bg-cyan", frame: "border-pink", rot: 2 },
  { span: "md:col-span-4", ratio: "aspect-[4/5]", block: "bg-butter", frame: "border-pink", rot: 1.5 },
  { span: "md:col-span-4", ratio: "aspect-[4/5]", block: "bg-purple", frame: "border-butter", rot: -1.5 },
  { span: "md:col-span-4", ratio: "aspect-[4/5]", block: "bg-pink", frame: "border-cyan", rot: 2.5 },
  { span: "md:col-span-6", ratio: "aspect-[4/3]", block: "bg-cyan", frame: "border-butter", rot: -1 },
  { span: "md:col-span-6", ratio: "aspect-[4/3]", block: "bg-butter", frame: "border-purple", rot: 1 },
];

export default function SketchesPage() {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <>
      {/* paint flows behind the whole page */}
      <PaintFlow fixed />
      <div className="pointer-events-none fixed inset-0 z-0 bg-bg/35" />

      <main className="relative z-10 min-h-screen overflow-hidden px-[6%] pb-0 pt-32">
        <Flower size={120} className="absolute -left-10 top-28 opacity-90" colors={["#ff9ec4", "#fff"]} />
        <Flower size={84} className="absolute right-[5%] top-44 opacity-90" colors={["#6fd3f0", "#dff3ff"]} petals={6} duration={30} />

        <div className="relative mx-auto max-w-[1100px]">
          <a
            href="#top"
            className="mb-8 inline-flex items-center gap-2 rounded-full border border-white/20 bg-bg/60 px-4 py-2 font-mono text-[0.72rem] uppercase tracking-[0.15em] text-white backdrop-blur transition-colors hover:border-pink hover:text-pink"
          >
            <ArrowLeft size={15} />
            Back to portfolio
          </a>

          <div className="mb-4 flex items-center gap-2 font-mono text-[0.7rem] uppercase tracking-[0.2em] text-butter">
            <span className="h-px w-8 bg-butter" />
            Sketch Vault
          </div>
          <h1 className="relative mb-4 inline-block text-[clamp(2.2rem,6vw,4rem)] font-extrabold leading-[1.05]">
            <motion.span
              aria-hidden="true"
              className="absolute -bottom-1 left-0 right-0 h-[42%] origin-left bg-cyan/70"
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 0.9, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            />
            <span className="relative font-display italic">My sketches &amp; artwork</span>
          </h1>
          <p className="mb-3 max-w-[560px] text-[0.95rem] leading-relaxed text-white/85">
            Pencil portraits and characters, all drawn by me. Click anywhere on the background to
            splash colour, tap a sketch to look closer, or download your favourites.
          </p>
          <p className="mb-14 font-mono text-[0.7rem] uppercase tracking-[0.2em] text-white/60">
            {sketches.length} artworks
          </p>

          <div className="grid grid-cols-1 gap-x-8 gap-y-16 md:grid-cols-12">
            {sketches.map((src, i) => {
              const s = PATTERN[i % PATTERN.length];
              return (
                <motion.div
                  key={src}
                  className={`${s.span} relative`}
                  initial={{ opacity: 0, y: 60, rotate: s.rot * 3 }}
                  whileInView={{ opacity: 1, y: 0, rotate: s.rot }}
                  viewport={{ once: true, amount: 0.15 }}
                  transition={{ duration: 0.9, delay: (i % 3) * 0.1, ease: [0.16, 1, 0.3, 1] }}
                >
                  <TiltCard maxTilt={7} className="group">
                    <div className={`absolute inset-0 translate-x-3 translate-y-3 rounded-sm ${s.block} opacity-90`} />
                    <div className={`absolute -inset-2.5 rounded-sm border-2 ${s.frame}`} />
                    <button
                      onClick={() => setOpen(i)}
                      aria-label={`Open sketch ${i + 1}`}
                      className={`relative block w-full overflow-hidden rounded-sm bg-white p-2 shadow-2xl ${s.ratio}`}
                    >
                      <img src={src} alt={`Sketch ${i + 1}`} loading="lazy" className="h-full w-full object-contain" />
                      <span className="absolute inset-0 flex items-center justify-center bg-bg/40 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                        <span className="flex h-12 w-12 items-center justify-center rounded-full bg-white text-bg">
                          <Eye size={20} />
                        </span>
                      </span>
                    </button>
                    <div className="relative mt-4 flex items-center justify-between gap-3">
                      <span className="font-mono text-[0.68rem] uppercase tracking-[0.2em] text-white/80">
                        {String(i + 1).padStart(2, "0")} · artwork
                      </span>
                      <a
                        href={src}
                        download
                        className="inline-flex items-center gap-1.5 rounded-full bg-white px-3.5 py-1.5 text-[0.75rem] font-bold text-bg transition-colors hover:bg-pink"
                      >
                        <Download size={14} />
                        Download
                      </a>
                    </div>
                  </TiltCard>
                </motion.div>
              );
            })}
          </div>
        </div>

        <div className="relative -mb-1 mt-16">
          <FlowerGarden />
        </div>
      </main>

      <SketchViewer images={sketches} index={open} onChange={setOpen} />
    </>
  );
}
