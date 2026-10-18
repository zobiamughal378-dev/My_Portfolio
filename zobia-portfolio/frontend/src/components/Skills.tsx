import Reveal from "./Reveal";
import SkillIcon from "./SkillIcon";
import SkillRadar from "./SkillRadar";
import { skillGroups } from "../data/skills";

export default function Skills() {
  return (
    <section id="skills" className="relative bg-navy/85 px-[6%] py-24">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_0%_50%,rgba(183,156,255,0.08),transparent_55%)]" />
      <div className="relative mx-auto max-w-[1100px]">
        <Reveal>
          <div className="mb-4 flex items-center gap-2 font-mono text-[0.7rem] uppercase tracking-[0.2em] text-accent">
            <span className="h-px w-8 bg-accent" />
            Technical Arsenal
          </div>
        </Reveal>
        <Reveal delay={0.05}>
          <h2 className="mb-14 text-[clamp(1.8rem,4vw,2.9rem)] font-extrabold">
            Tools I use to{" "}
            <span className="bg-gradient-to-r from-accent via-pink to-purple bg-clip-text text-transparent">
              ship real products
            </span>
            .
          </h2>
        </Reveal>

        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {skillGroups.map((g, gi) => (
            <Reveal key={g.label} delay={0.05 * gi} y={20}>
              <div className="h-full rounded-2xl border border-white/[0.06] bg-card p-6">
                <div
                  className="mb-5 font-mono text-[0.68rem] uppercase tracking-[0.18em]"
                  style={{ color: g.color }}
                >
                  {g.label}
                </div>
                <div className="grid grid-cols-4 gap-3">
                  {g.items.map((item) => (
                    <div
                      key={item.name}
                      className="flex flex-col items-center gap-1.5 text-center"
                      title={item.name}
                    >
                      <div
                        className={`flex items-center justify-center rounded-xl border border-white/[0.06] bg-white/[0.03] transition-all hover:-translate-y-0.5 hover:border-white/20 ${
                          item.big ? "h-14 w-14" : "h-12 w-12"
                        }`}
                        style={{ color: g.color }}
                      >
                        <SkillIcon icon={item.icon} size={item.big ? 26 : 22} />
                      </div>
                      <span className="line-clamp-1 text-[0.62rem] leading-tight text-muted">
                        {item.name.split(" ")[0].split("/")[0].split("·")[0]}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </Reveal>
          ))}

          <Reveal delay={0.05 * skillGroups.length} y={20}>
            <SkillRadar />
          </Reveal>
        </div>
      </div>
    </section>
  );
}
