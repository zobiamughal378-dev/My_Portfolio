import Reveal from "./Reveal";
import TiltCard from "./TiltCard";
import CountUp from "./CountUp";
import { projects } from "../data/projects";
import { certificates } from "../data/certificates";

export default function About() {
  return (
    <section id="about" className="relative overflow-hidden bg-bg/85 px-[6%] py-24">
      <div className="pointer-events-none absolute right-0 top-0 h-[500px] w-[500px] rounded-full bg-pink/10 blur-[120px]" />
      <div className="relative mx-auto max-w-[1100px]">
        <Reveal>
          <div className="mb-4 flex items-center gap-2 font-mono text-[0.7rem] uppercase tracking-[0.2em] text-accent">
            <span className="h-px w-8 bg-accent" />
            About Me
          </div>
        </Reveal>
        <Reveal delay={0.05}>
          <h2 className="mb-10 max-w-[720px] text-[clamp(1.8rem,4vw,2.9rem)] font-extrabold leading-[1.15]">
            A builder obsessed with{" "}
            <span className="bg-gradient-to-r from-accent to-pink bg-clip-text text-transparent">
              code,
            </span>{" "}
            <span className="bg-gradient-to-r from-pink to-purple bg-clip-text text-transparent">
              algorithms
            </span>{" "}
            &amp;{" "}
            <span className="bg-gradient-to-r from-purple to-blue bg-clip-text text-transparent">
              clean UI
            </span>
            .
          </h2>
        </Reveal>

        {/* Bento grid */}
        <div className="grid grid-cols-2 gap-4 lg:auto-rows-[150px] lg:grid-cols-4">
          {/* Bio — big cell */}
          <Reveal delay={0.1} y={16} className="col-span-2 lg:col-span-2 lg:row-span-3">
            <TiltCard maxTilt={5} className="group h-full">
              <div className="relative h-full overflow-hidden rounded-2xl border border-white/[0.07] bg-card p-6">
                <div className="pointer-events-none absolute -left-8 -top-8 h-32 w-32 rounded-full bg-accent/10 blur-2xl" />
                <div className="relative space-y-3 text-[0.9rem] leading-[1.8] text-muted">
                  <p>
                    I'm <strong className="text-white">Zobia Razzaq</strong>, a{" "}
                    <strong className="text-white">3rd-year Computer Science student</strong> at{" "}
                    <span className="text-accent">FAST-NUCES Chiniot-Faisalabad</span> with a passion
                    for problem-solving. I believe coding is about finding creative solutions to
                    real-world challenges.
                  </p>
                  <p>
                    I recently completed a paid 9-week{" "}
                    <strong className="text-white">Full Stack Internship at Hadi Textiles</strong>,
                    building REST API apps with React, TypeScript, Node.js and Express: a Weather
                    App, Reelix, an authenticated AI Chat app, and a Cloud File Manager with Oracle
                    DB (PL/SQL), JWT auth and an admin panel.
                  </p>
                  <p>
                    I competed in <strong className="text-white">ICPC Asia-Topi 2025</strong> with
                    team Fast Syntax Syndicate, and joined the GDG Vibe-a-thon and Build with AI
                    Hackathon. I'm active on <strong className="text-white">LeetCode</strong> (C++)
                    &amp; <strong className="text-white">Codeforces</strong>.
                  </p>
                  <p>
                    Outside of code I sketch and do graphic design. I learn by doing, and I'm open
                    to internships and collaborations.
                  </p>
                </div>
              </div>
            </TiltCard>
          </Reveal>

          {/* Portrait cell */}
          <Reveal delay={0.14} y={16} className="col-span-2 h-[400px] lg:col-span-1 lg:row-span-3 lg:h-auto">
            <TiltCard maxTilt={8} className="group h-full">
              <div className="relative h-full overflow-hidden rounded-2xl border border-white/[0.07] bg-card">
                <img
                  src="/photo/zobia-warrior.jpg"
                  alt="Zobia Razzaq"
                  className="h-full w-full object-cover object-top"
                />
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                <div className="absolute bottom-3 left-3 font-mono text-[0.65rem] uppercase tracking-[0.15em] text-white/80">
                  Chiniot, Pakistan
                </div>
              </div>
            </TiltCard>
          </Reveal>

          {/* Stat: Projects */}
          <Reveal delay={0.18} y={20} className="min-h-[140px] lg:col-start-4 lg:row-start-1">
            <TiltCard maxTilt={10} className="group h-full">
              <div className="relative h-full overflow-hidden rounded-2xl border border-white/[0.07] bg-card p-5">
                <div className="pointer-events-none absolute -right-4 -top-4 h-16 w-16 rounded-full bg-accent/10 blur-xl" />
                <div className="relative mb-1 text-[1.3rem]">💻</div>
                <div className="relative font-display text-[1.9rem] font-extrabold leading-none">
                  <CountUp to={projects.length} suffix="+" />
                </div>
                <div className="relative mt-2 font-mono text-[0.68rem] uppercase tracking-[0.1em] text-muted">
                  Projects
                </div>
              </div>
            </TiltCard>
          </Reveal>

          {/* Stat: Certificates */}
          <Reveal delay={0.22} y={20} className="min-h-[140px] lg:col-start-4 lg:row-start-2">
            <TiltCard maxTilt={10} className="group h-full">
              <div className="relative h-full overflow-hidden rounded-2xl border border-white/[0.07] bg-card p-5">
                <div className="pointer-events-none absolute -right-4 -top-4 h-16 w-16 rounded-full bg-pink/10 blur-xl" />
                <div className="relative mb-1 text-[1.3rem]">🏆</div>
                <div className="relative font-display text-[1.9rem] font-extrabold leading-none">
                  <CountUp to={certificates.length} />
                </div>
                <div className="relative mt-2 font-mono text-[0.68rem] uppercase tracking-[0.1em] text-muted">
                  Certificates
                </div>
              </div>
            </TiltCard>
          </Reveal>

          {/* Year */}
          <Reveal delay={0.3} y={20} className="col-span-2 min-h-[120px] lg:col-span-1 lg:col-start-4 lg:row-start-3">
            <TiltCard maxTilt={10} className="group h-full">
              <div className="relative h-full overflow-hidden rounded-2xl border border-white/[0.07] bg-card p-5">
                <div className="pointer-events-none absolute -right-4 -top-4 h-16 w-16 rounded-full bg-butter/15 blur-xl" />
                <div className="relative mb-1 text-[1.3rem]">📚</div>
                <div className="relative font-display text-[1.9rem] font-extrabold leading-none">3rd</div>
                <div className="relative mt-2 font-mono text-[0.68rem] uppercase tracking-[0.1em] text-muted">
                  Year · BS CS
                </div>
              </div>
            </TiltCard>
          </Reveal>

          {/* Competitive programming highlight — wide cell */}
          <Reveal delay={0.26} y={20} className="col-span-2 min-h-[110px] lg:col-span-2 lg:row-start-4">
            <TiltCard maxTilt={6} className="group h-full">
              <div className="relative flex h-full items-center gap-4 overflow-hidden rounded-2xl border border-white/[0.07] bg-gradient-to-br from-card to-navy p-6">
                <div className="pointer-events-none absolute -left-6 -bottom-6 h-24 w-24 rounded-full bg-purple/15 blur-2xl" />
                <div className="relative text-[1.6rem]">🧩</div>
                <div className="relative">
                  <div className="font-display text-[1rem] font-bold text-white">
                    Competitive Programmer
                  </div>
                  <div className="mt-1 font-mono text-[0.7rem] leading-relaxed text-muted">
                    Solving DSA problems on LeetCode &amp; Codeforces
                  </div>
                </div>
              </div>
            </TiltCard>
          </Reveal>

          {/* Education */}
          <Reveal delay={0.34} y={20} className="col-span-2 min-h-[110px] lg:col-span-2 lg:row-start-4">
            <TiltCard maxTilt={10} className="group h-full">
              <div className="relative h-full overflow-hidden rounded-2xl border border-white/[0.07] bg-card p-6">
                <div className="pointer-events-none absolute -right-4 -bottom-4 h-16 w-16 rounded-full bg-blue/10 blur-xl" />
                <div className="relative mb-2 text-[1.3rem]">🎓</div>
                <div className="relative font-display text-[1.1rem] font-extrabold leading-tight">
                  BS CS
                </div>
                <div className="relative mt-1 font-mono text-[0.65rem] uppercase tracking-[0.1em] text-muted">
                  FAST-NUCES · 2024–2028
                </div>
              </div>
            </TiltCard>
          </Reveal>
        </div>
      </div>
    </section>
  );
}