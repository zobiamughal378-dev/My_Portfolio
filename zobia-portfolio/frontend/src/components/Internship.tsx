import { useState } from "react";
import { motion } from "framer-motion";
import { Briefcase, CalendarDays, FileText, ShieldCheck, UserRound } from "lucide-react";
import Reveal from "./Reveal";
import SketchViewer from "./SketchViewer";

const DOCS = [
  { src: "/certificates/hadi-internship.jpg", alt: "Certificate of Internship — Hadi Textile" },
  { src: "/certificates/hadi-letter.jpg", alt: "Letter of appreciation — Hadi Textile" },
];

const FACTS = [
  { icon: Briefcase, label: "Role", value: "Full Stack Developer Intern" },
  { icon: CalendarDays, label: "Duration", value: "27 Jun – 26 Aug 2026" },
  { icon: ShieldCheck, label: "Type", value: "Paid, on-site" },
  { icon: UserRound, label: "Trainer", value: "Mr. Zahid Sarfraz" },
];

export default function Internship() {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <section id="internship" className="relative overflow-hidden bg-navy/80 px-[6%] py-24">
      <div className="pointer-events-none absolute -right-20 top-10 h-[420px] w-[420px] rounded-full bg-cyan/10 blur-[110px]" />
      <div className="relative mx-auto grid max-w-[1150px] items-center gap-14 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.05fr)]">
        {/* words */}
        <div className="min-w-0">
          <Reveal>
            <div className="mb-4 flex items-center gap-2 font-mono text-[0.7rem] uppercase tracking-[0.2em] text-accent">
              <span className="h-px w-8 bg-accent" />
              Internship
            </div>
          </Reveal>
          <Reveal delay={0.05}>
            <h2 className="mb-4 font-display text-[clamp(2rem,4.4vw,3.3rem)] font-bold leading-[1.1]">
              Full Stack intern at <span className="italic text-accent">Hadi Textile</span>
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mb-7 max-w-[520px] leading-relaxed text-muted">
              I spent two months learning front-end and back-end web development in a real company.
              Hadi Textile gave me a certificate of internship, and an appreciation letter from their
              HR manager when I finished.
            </p>
          </Reveal>

          <Reveal delay={0.14}>
            <div className="mb-7 grid grid-cols-1 gap-3 sm:grid-cols-2">
              {FACTS.map((f) => (
                <div key={f.label} className="flex items-center gap-3 rounded-xl border border-white/10 bg-card/80 px-4 py-3">
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-accent/15 text-accent">
                    <f.icon size={17} />
                  </span>
                  <div>
                    <div className="font-mono text-[0.6rem] uppercase tracking-[0.16em] text-muted">{f.label}</div>
                    <div className="text-[0.92rem] font-semibold">{f.value}</div>
                  </div>
                </div>
              ))}
            </div>
          </Reveal>

          <Reveal delay={0.18}>
            <div className="mb-8 border-l-2 border-pink pl-4 font-display text-[1.05rem] italic leading-relaxed text-white/85">
              "She demonstrated professionalism, dedication, responsibility and a strong willingness to learn."
              <div className="mt-2 font-mono text-[0.62rem] not-italic uppercase tracking-[0.18em] text-muted">
                — From the internship certificate
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.22}>
            <div className="flex flex-wrap gap-3">
              <button
                onClick={() => setOpen(1)}
                className="inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 font-semibold text-bg transition-colors hover:bg-pink"
              >
                <FileText size={17} />
                Read the appreciation letter
              </button>
              <button
                onClick={() => setOpen(0)}
                className="inline-flex items-center gap-2 rounded-full border border-white/30 px-6 py-3 transition-colors hover:border-accent hover:text-accent"
              >
                View the certificate
              </button>
            </div>
          </Reveal>
        </div>

        {/* the two documents, fanned out */}
        <div className="relative mx-auto h-[430px] w-full max-w-[560px] sm:h-[500px]" style={{ perspective: 1400 }}>
          <motion.button
            onClick={() => setOpen(0)}
            aria-label="Open the internship certificate"
            className="absolute left-0 top-6 w-[82%] overflow-hidden rounded-md bg-white shadow-[0_30px_70px_rgba(0,0,0,0.55)]"
            initial={{ opacity: 0, y: 50, rotate: -12 }}
            whileInView={{ opacity: 1, y: 0, rotate: -6 }}
            viewport={{ once: true, amount: 0.3 }}
            whileHover={{ y: -10, rotate: -3, scale: 1.03, zIndex: 20 }}
            transition={{ type: "spring", stiffness: 140, damping: 16 }}
          >
            <img src={DOCS[0].src} alt={DOCS[0].alt} loading="lazy" className="block h-auto w-full" />
          </motion.button>
          <motion.button
            onClick={() => setOpen(1)}
            aria-label="Open the appreciation letter"
            className="absolute bottom-0 right-0 w-[48%] overflow-hidden rounded-md bg-white shadow-[0_30px_70px_rgba(0,0,0,0.6)]"
            initial={{ opacity: 0, y: 70, rotate: 14 }}
            whileInView={{ opacity: 1, y: 0, rotate: 5 }}
            viewport={{ once: true, amount: 0.3 }}
            whileHover={{ y: -12, rotate: 1, scale: 1.05, zIndex: 20 }}
            transition={{ type: "spring", stiffness: 140, damping: 16, delay: 0.1 }}
          >
            <img src={DOCS[1].src} alt={DOCS[1].alt} loading="lazy" className="block h-auto w-full" />
          </motion.button>
          <span className="pointer-events-none absolute left-[10%] top-2 h-6 w-20 -rotate-6 bg-pink/70 shadow" />
          <span className="pointer-events-none absolute bottom-[40%] right-[3%] h-6 w-16 rotate-12 bg-butter/80 shadow" />
        </div>
      </div>

      <SketchViewer images={DOCS.map((d) => d.src)} alts={DOCS.map((d) => d.alt)} index={open} onChange={setOpen} showDownload={false} />
    </section>
  );
}
