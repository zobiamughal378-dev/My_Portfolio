import { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion, LayoutGroup } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Reveal from "./Reveal";
import { projects, tagStyles, type ProjTag } from "../data/projects";
import ProjectMedia from "./ProjectMedia";
import TiltCard from "./TiltCard";

const filterOptions: { key: ProjTag | "all"; label: string }[] = [
  { key: "all", label: "All" },
  { key: "web", label: "Web" },
  { key: "ai", label: "AI" },
  { key: "sys", label: "Systems" },
  { key: "cpp", label: "C++" },
  { key: "db", label: "Database" },
  { key: "hw", label: "Hardware" },
];

const slideVariants = {
  enter: (dir: number) => ({ x: dir > 0 ? 60 : -60, opacity: 0 }),
  center: { x: 0, opacity: 1 },
  exit: (dir: number) => ({ x: dir > 0 ? -60 : 60, opacity: 0 }),
};

export default function Projects() {
  const [filter, setFilter] = useState<ProjTag | "all">("all");
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState(1);

  const filtered = useMemo(
    () => (filter === "all" ? projects : projects.filter((p) => p.tag === filter)),
    [filter]
  );

  useEffect(() => {
    setIndex(0);
  }, [filter]);

  const current = filtered[index];

  function go(dir: number) {
    if (filtered.length === 0) return;
    setDirection(dir);
    setIndex((i) => (i + dir + filtered.length) % filtered.length);
  }

  function jump(i: number) {
    setDirection(i > index ? 1 : -1);
    setIndex(i);
  }

  if (!current) return null;

  const style = tagStyles[current.tag];

  return (
    <section id="projects" className="relative bg-bg/85 px-[6%] py-24">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_50%_0%,rgba(111,211,240,0.05),transparent_60%)]" />
      <div className="relative mx-auto max-w-[1100px]">
        <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
          <div>
            <Reveal>
              <div className="mb-3 flex items-center gap-2 font-mono text-[0.7rem] uppercase tracking-[0.2em] text-accent">
                <span className="h-px w-8 bg-accent" />
                Featured Projects
              </div>
            </Reveal>
            <Reveal delay={0.05}>
              <h2 className="text-[clamp(1.8rem,4vw,2.6rem)] font-extrabold">
                What I've{" "}
                <span className="bg-gradient-to-r from-accent to-purple bg-clip-text text-transparent">
                  built
                </span>
                .
              </h2>
            </Reveal>
          </div>
          <Reveal delay={0.08}>
            <div className="flex items-center gap-3">
              <span className="font-mono text-[0.78rem] text-muted">
                {String(index + 1).padStart(2, "0")} / {filtered.length}
              </span>
              <button
                onClick={() => go(-1)}
                aria-label="Previous project"
                className="flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-card text-white transition-all hover:border-accent hover:text-accent"
              >
                <ChevronLeft size={18} />
              </button>
              <button
                onClick={() => go(1)}
                aria-label="Next project"
                className="flex h-9 w-9 items-center justify-center rounded-full bg-accent text-black transition-transform hover:scale-105"
              >
                <ChevronRight size={18} />
              </button>
            </div>
          </Reveal>
        </div>

        <Reveal delay={0.1}>
          <LayoutGroup id="project-filters">
            <div className="mb-8 flex flex-wrap gap-2">
              {filterOptions.map((opt) => {
                const active = filter === opt.key;
                return (
                  <button
                    key={opt.key}
                    onClick={() => setFilter(opt.key)}
                    className={`relative rounded-full px-4 py-2 text-[0.78rem] font-semibold transition-colors ${
                      active ? "text-white" : "text-muted hover:text-white"
                    }`}
                  >
                    {active && (
                      <motion.span
                        layoutId="filter-pill"
                        transition={{ type: "spring", stiffness: 400, damping: 32 }}
                        className="absolute inset-0 rounded-full bg-accent"
                      />
                    )}
                    <span className="relative">{opt.label}</span>
                  </button>
                );
              })}
            </div>
          </LayoutGroup>
        </Reveal>

        <div className="relative min-h-[380px] overflow-hidden rounded-3xl border border-white/[0.07] bg-card">
          <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              key={current.title}
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              className="grid gap-0 sm:grid-cols-2"
            >
              <div className="p-4 sm:p-5">
                <TiltCard maxTilt={6} className="group">
                  <ProjectMedia
                    screenshots={current.screenshots}
                    icon={current.icon}
                    seed={index}
                    color1={style.c1}
                    color2={style.c2}
                    index={index}
                    total={filtered.length}
                  />
                </TiltCard>
              </div>
              <div className="flex flex-col justify-center p-7 sm:p-9">
                <div className="mb-4 flex flex-wrap gap-2">
                  <span
                    className="rounded px-3 py-1 font-mono text-[0.65rem] font-semibold uppercase tracking-[0.06em]"
                    style={{ color: style.text, background: style.bg }}
                  >
                    {current.tagLabel}
                  </span>
                  {current.tagLabel2 && (
                    <span
                      className="rounded px-3 py-1 font-mono text-[0.65rem] font-semibold uppercase tracking-[0.06em]"
                      style={{ color: style.text, background: style.bg }}
                    >
                      {current.tagLabel2}
                    </span>
                  )}
                </div>
                <h3 className="mb-3 text-[1.5rem] font-extrabold leading-tight sm:text-[1.7rem]">
                  {current.title}
                </h3>
                <p className="mb-5 text-[0.9rem] leading-[1.8] text-muted">{current.desc}</p>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* filmstrip */}
        <div className="mt-6 flex gap-2.5 overflow-x-auto pb-3">
          {filtered.map((p, i) => {
            const s = tagStyles[p.tag];
            return (
              <button
                key={p.title}
                onClick={() => jump(i)}
                className={`relative flex h-[64px] w-[64px] flex-shrink-0 items-center justify-center overflow-hidden rounded-xl border-2 bg-black/30 text-[1.4rem] transition-all ${
                  i === index ? "border-accent" : "border-transparent opacity-50 hover:opacity-80"
                }`}
                style={{
                  background: p.screenshots
                    ? undefined
                    : `linear-gradient(135deg, ${s.c1}22, ${s.c2}11)`,
                }}
                aria-label={p.title}
                title={p.title}
              >
                {p.screenshots ? (
                  <img
                    src={p.screenshots[0]}
                    alt=""
                    className="h-full w-full object-cover object-top"
                  />
                ) : (
                  p.icon
                )}
              </button>
            );
          })}
        </div>
        <div className="h-[3px] w-full overflow-hidden rounded-full bg-white/[0.06]">
          <motion.div
            className="h-full rounded-full bg-accent"
            animate={{ width: `${((index + 1) / filtered.length) * 100}%` }}
            transition={{ duration: 0.3 }}
          />
        </div>
      </div>
    </section>
  );
}
