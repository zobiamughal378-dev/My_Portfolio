import { Megaphone, Palette } from "lucide-react";
import Reveal from "./Reveal";

const ROLES = [
  {
    icon: Palette,
    role: "Co-Head, Design",
    org: "Rung Society",
    tag: "Design",
    from: "from-pink/30",
    ring: "border-pink/60",
    chip: "bg-pink text-bg",
    delay: "0s",
  },
  {
    icon: Megaphone,
    role: "Marketing Head",
    org: "Career Connect Society",
    tag: "Marketing",
    from: "from-cyan/30",
    ring: "border-cyan/60",
    chip: "bg-cyan text-bg",
    delay: "-2.5s",
  },
];

export default function Currently() {
  return (
    <section id="currently" className="relative overflow-hidden px-[6%] py-24">
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-[420px] w-[720px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-pink/10 blur-[110px]" />
      <div className="relative mx-auto max-w-[1000px]">
        <Reveal>
          <div className="mb-4 flex items-center gap-2 font-mono text-[0.7rem] uppercase tracking-[0.2em] text-pink">
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-pink" />
            Currently
          </div>
        </Reveal>
        <Reveal delay={0.05}>
          <h2 className="mb-3 font-display text-[clamp(2rem,4.6vw,3.4rem)] font-bold leading-[1.1]">
            What I'm leading <span className="italic text-pink">right now</span>
          </h2>
        </Reveal>
        <Reveal delay={0.1}>
          <p className="mb-14 max-w-[520px] text-muted">
            Alongside my 3rd year of Computer Science, I take care of design and marketing for two
            societies at my university.
          </p>
        </Reveal>

        <div className="grid gap-10 sm:grid-cols-2">
          {ROLES.map((r, i) => (
            <Reveal key={r.org} delay={0.1 + i * 0.12} y={30}>
              <div className="relative mx-auto max-w-[380px] pt-10">
                {/* lanyard */}
                <span className="absolute left-1/2 top-0 h-10 w-[3px] -translate-x-1/2 bg-gradient-to-b from-white/10 to-white/50" />
                <div className="badge-swing" style={{ animationDelay: r.delay }}>
                  <div className={`relative overflow-hidden rounded-3xl border-2 ${r.ring} bg-card shadow-[0_30px_70px_rgba(0,0,0,0.45)]`}>
                    <span className="absolute left-1/2 top-3 h-3 w-14 -translate-x-1/2 rounded-full bg-bg ring-2 ring-white/20" />
                    <div className={`bg-gradient-to-b ${r.from} to-transparent px-7 pb-2 pt-10`}>
                      <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-2xl bg-white/90 text-bg shadow-lg">
                        <r.icon size={30} />
                      </div>
                    </div>
                    <div className="px-7 pb-8 text-center">
                      <span className={`mb-3 inline-block rounded-full px-3 py-1 font-mono text-[0.62rem] font-bold uppercase tracking-[0.18em] ${r.chip}`}>
                        {r.tag}
                      </span>
                      <div className="font-display text-[1.7rem] font-bold leading-tight">{r.role}</div>
                      <div className="mt-2 text-[1.05rem] text-white/85">{r.org}</div>
                      <div className="mt-5 flex items-center justify-center gap-2 border-t border-white/10 pt-4 font-mono text-[0.62rem] uppercase tracking-[0.2em] text-muted">
                        <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-300" />
                        Active · University society
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
