import { useState } from "react";
import { motion } from "framer-motion";
import { ChevronRight, Eye } from "lucide-react";
import Reveal from "./Reveal";
import TiltCard from "./TiltCard";
import PaintFlow from "./PaintFlow";
import SketchViewer from "./SketchViewer";
import { HoverButterfly } from "./GlowButterfly";
import { sketches } from "../data/hobbies";

const BIG = 0; // wide coloured sketch
const SMALL = 6; // pencil portrait

const HOBBIES = ["Pencil sketching", "Handmade art & craft", "Vibecoding"];

function PencilDrawing() {
  return (
    <div className="relative h-[180px] w-[200px]" aria-hidden="true">
      <svg viewBox="0 0 200 180" width="200" height="180" className="absolute left-0 top-0 overflow-visible">
        <defs>
          <linearGradient id="pd-grad" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="#ff9ec4" />
            <stop offset="0.5" stopColor="#ffd77a" />
            <stop offset="1" stopColor="#6fd3f0" />
          </linearGradient>
        </defs>
        <path
          className="draw-path"
          pathLength={1}
          d="M100 92 C84 44 28 30 26 74 C25 104 66 110 100 98 C78 118 56 146 80 158 C98 168 102 128 100 100 C98 128 102 168 120 158 C144 146 122 118 100 98 C134 110 175 104 174 74 C172 30 116 44 100 92 Z"
          fill="none"
          stroke="url(#pd-grad)"
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
      <svg viewBox="0 0 30 30" width="30" height="30" className="pencil absolute left-0 top-0">
        <path d="M2 26 L6 16 L22 2 L26 6 L12 22 Z" fill="#ffd77a" stroke="#0b1536" strokeWidth="1.2" strokeLinejoin="round" />
        <path d="M2 26 L6 16 L12 22 Z" fill="#f3d6b8" stroke="#0b1536" strokeWidth="1" strokeLinejoin="round" />
        <path d="M2 26 L4 21 L7 24 Z" fill="#0b1536" />
        <path d="M22 2 L26 6 L28.5 3.5 L24.5 -0.5 Z" fill="#ff9ec4" stroke="#0b1536" strokeWidth="1" strokeLinejoin="round" />
      </svg>
    </div>
  );
}

export default function SketchGallery() {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <section id="hobbies" className="relative overflow-hidden px-[6%] py-24">
      <PaintFlow />
      <div className="pointer-events-none absolute inset-0 bg-bg/25" />
      <div className="pointer-events-none absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-bg to-transparent" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-bg to-transparent" />

      <div className="relative mx-auto grid max-w-[1150px] items-center gap-14 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)]">
        {/* ---- words ---- */}
        <div className="min-w-0">
          <Reveal>
            <div className="mb-4 flex items-center gap-2 font-mono text-[0.7rem] uppercase tracking-[0.2em] text-butter">
              <span className="h-px w-8 bg-butter" />
              Beyond code
            </div>
          </Reveal>
          <Reveal delay={0.05}>
            <h2 className="mb-4 font-display text-[clamp(2.4rem,5.4vw,4.2rem)] font-bold italic leading-[1.05]">
              My <span className="text-pink">sketchbook</span>
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mb-6 max-w-[460px] leading-relaxed text-white/85">
              When I'm not writing code I draw. Here are two of my favourites, with the rest waiting in the
              Sketch Vault, where you can look closer and download them.
            </p>
          </Reveal>
          <Reveal delay={0.12}>
            <div className="mb-8 flex flex-wrap gap-2.5">
              {HOBBIES.map((h, k) => (
                <span
                  key={h}
                  className={`rounded-full border px-4 py-1.5 font-mono text-[0.72rem] uppercase tracking-[0.12em] backdrop-blur ${
                    [
                      "border-pink/60 bg-pink/15 text-pink",
                      "border-cyan/60 bg-cyan/15 text-cyan",
                      "border-butter/60 bg-butter/15 text-butter",
                    ][k]
                  }`}
                >
                  {h}
                </span>
              ))}
            </div>
          </Reveal>
          <Reveal delay={0.15}>
            <div className="mb-8 hidden sm:block">
              <PencilDrawing />
            </div>
          </Reveal>
          <Reveal delay={0.18}>
            <a
              href="#/sketches"
              className="group inline-flex items-center gap-2 rounded-full bg-white px-7 py-3.5 font-semibold text-bg transition-colors hover:bg-pink"
            >
              See all {sketches.length} sketches
              <ChevronRight size={18} className="transition-transform group-hover:translate-x-1" />
            </a>
          </Reveal>
        </div>

        {/* ---- the printed page ---- */}
        <motion.div
          className="relative mx-auto w-full max-w-[560px]"
          initial={{ opacity: 0, y: 60, rotate: 5 }}
          whileInView={{ opacity: 1, y: 0, rotate: -1.5 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
        >
          <TiltCard maxTilt={5} className="group">
            <div
              className="relative rounded-[6px] bg-[#fbf8f4] p-5 text-bg shadow-[0_40px_90px_rgba(0,0,0,0.5)] sm:p-7"
              style={{
                backgroundImage:
                  "radial-gradient(rgba(11,21,54,0.05) 1px, transparent 1px), linear-gradient(180deg, #fffdfa, #f6efe7)",
                backgroundSize: "6px 6px, 100% 100%",
              }}
            >
              {/* washi tape */}
              <span className="absolute -top-3 left-8 h-6 w-20 -rotate-6 bg-pink/70 shadow-sm" />
              <span className="absolute -top-3 right-8 h-6 w-20 rotate-6 bg-cyan/70 shadow-sm" />

              <div className="mb-4 flex items-center justify-between border-b border-bg/15 pb-2 font-mono text-[0.6rem] uppercase tracking-[0.22em] text-bg/55">
                <span>Sketchbook · vol. 01</span>
                <span>Zobia Razzaq</span>
              </div>

              <button
                onClick={() => setOpen(BIG)}
                aria-label="Open the first sketch"
                className="group/img relative block w-full overflow-hidden border border-bg/15 bg-white p-1.5"
              >
                <div className="aspect-[16/11] w-full">
                  <img src={sketches[BIG]} alt="Coloured character sketches" loading="lazy" className="h-full w-full object-contain" />
                </div>
                <span className="absolute inset-0 flex items-center justify-center bg-bg/35 opacity-0 transition-opacity duration-300 group-hover/img:opacity-100">
                  <span className="flex h-12 w-12 items-center justify-center rounded-full bg-white text-bg">
                    <Eye size={20} />
                  </span>
                </span>
              </button>
              <p className="mb-5 mt-2 font-display text-[0.85rem] italic text-bg/65">Fig. 01 — characters, in colour</p>

              <div className="grid grid-cols-[minmax(0,1fr)_minmax(0,0.9fr)] items-end gap-5">
                <div>
                  <p className="font-display text-[1.25rem] font-semibold italic leading-snug text-bg/80">
                    Drawn by hand, one line at a time.
                  </p>
                  <div className="mt-3 h-px w-16 bg-pink" />
                  <p className="mt-3 font-mono text-[0.6rem] uppercase tracking-[0.2em] text-bg/45">pencil · paper · patience</p>
                </div>
                <div>
                  <button
                    onClick={() => setOpen(SMALL)}
                    aria-label="Open the second sketch"
                    className="group/img relative block w-full overflow-hidden border border-bg/15 bg-white p-1.5"
                  >
                    <div className="aspect-[4/5] w-full">
                      <img src={sketches[SMALL]} alt="Pencil portrait sketch" loading="lazy" className="h-full w-full object-contain" />
                    </div>
                    <span className="absolute inset-0 flex items-center justify-center bg-bg/35 opacity-0 transition-opacity duration-300 group-hover/img:opacity-100">
                      <span className="flex h-11 w-11 items-center justify-center rounded-full bg-white text-bg">
                        <Eye size={18} />
                      </span>
                    </span>
                  </button>
                  <p className="mt-2 font-display text-[0.85rem] italic text-bg/65">Fig. 02 — portrait study</p>
                </div>
              </div>

              <div className="mt-5 text-center font-mono text-[0.6rem] tracking-[0.3em] text-bg/40">— 01 · 02 —</div>
            </div>
          </TiltCard>

          <HoverButterfly className="-left-6 top-[12%] z-20" size={54} dx={30} dy={26} dur={9} />
          <HoverButterfly className="-right-4 top-[40%] z-20" size={44} dx={-26} dy={22} dur={11} delay={1} tint="#e3d9ff" />
          <HoverButterfly className="left-[18%] -bottom-6 z-20" size={38} dx={26} dy={-18} dur={8} delay={0.5} tint="#d6f1ff" />
        </motion.div>
      </div>

      <SketchViewer images={sketches} index={open} onChange={setOpen} />
    </section>
  );
}
