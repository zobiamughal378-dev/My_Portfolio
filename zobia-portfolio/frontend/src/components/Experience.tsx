import Reveal from "./Reveal";
import { experience } from "../data/experience";

export default function Experience() {
  return (
    <section id="experience" className="relative bg-bg/85 px-[6%] py-24">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_80%_20%,rgba(183,156,255,0.07),transparent_55%)]" />
      <div className="relative mx-auto max-w-[900px]">
        <Reveal>
          <div className="mb-4 flex items-center gap-2 font-mono text-[0.7rem] uppercase tracking-[0.2em] text-accent">
            <span className="h-px w-8 bg-accent" />
            Journey
          </div>
        </Reveal>
        <Reveal delay={0.05}>
          <h2 className="mb-16 text-[clamp(1.8rem,4vw,2.9rem)] font-extrabold">
            Experience &amp;{" "}
            <span className="bg-gradient-to-r from-accent via-pink to-purple bg-clip-text text-transparent">
              Achievements
            </span>
          </h2>
        </Reveal>

        <div className="relative">
          {/* center line - desktop only */}
          <div className="pointer-events-none absolute bottom-4 left-1/2 top-4 hidden w-px -translate-x-1/2 bg-gradient-to-b from-accent/50 via-white/10 to-transparent md:block" />
          {/* left line - mobile */}
          <div className="pointer-events-none absolute bottom-4 left-[7px] top-4 w-px bg-gradient-to-b from-accent/50 via-white/10 to-transparent md:hidden" />

          <div className="flex flex-col gap-6 md:gap-10">
            {experience.map((e, i) => {
              const leftSide = i % 2 === 0;
              return (
                <Reveal key={e.role} delay={i * 0.08} y={24}>
                  <div className="relative grid grid-cols-1 items-center gap-4 pl-8 md:grid-cols-[1fr_auto_1fr] md:gap-8 md:pl-0">
                    {/* dot marker */}
                    <span className="absolute left-0 top-2 h-3.5 w-3.5 rounded-full border-2 border-bg bg-accent shadow-[0_0_0_4px_rgba(111,211,240,0.15)] md:left-1/2 md:top-1/2 md:-translate-x-1/2 md:-translate-y-1/2" />

                    {leftSide ? (
                      <>
                        <div className="hidden md:block" />
                        <div className="hidden md:block" />
                        <ExperienceCard e={e} />
                      </>
                    ) : (
                      <>
                        <ExperienceCard e={e} align="right" />
                        <div className="hidden md:block" />
                        <div className="hidden md:block" />
                      </>
                    )}
                    {/* mobile: always render once, override desktop split */}
                    <div className="md:hidden">
                      <ExperienceCardMobile e={e} />
                    </div>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

function ExperienceCard({
  e,
  align = "left",
}: {
  e: (typeof experience)[number];
  align?: "left" | "right";
}) {
  return (
    <div
      className={`hidden rounded-2xl border border-white/[0.07] bg-card p-6 md:block ${
        align === "right" ? "md:col-start-1" : "md:col-start-3"
      }`}
    >
      <div className="mb-2 flex items-center gap-2 font-mono text-[0.68rem] uppercase tracking-[0.08em] text-accent">
        <span>{e.icon}</span>
        {e.year}
      </div>
      <div className="mb-1 text-[1.02rem] font-bold">{e.role}</div>
      <div className="mb-3 text-[0.8rem] text-accent/80">{e.org}</div>
      <p className="text-[0.83rem] leading-[1.75] text-muted">{e.desc}</p>
    </div>
  );
}

function ExperienceCardMobile({ e }: { e: (typeof experience)[number] }) {
  return (
    <div className="rounded-2xl border border-white/[0.07] bg-card p-5">
      <div className="mb-2 flex items-center gap-2 font-mono text-[0.66rem] uppercase tracking-[0.08em] text-accent">
        <span>{e.icon}</span>
        {e.year}
      </div>
      <div className="mb-1 text-[0.95rem] font-bold">{e.role}</div>
      <div className="mb-2.5 text-[0.78rem] text-accent/80">{e.org}</div>
      <p className="text-[0.8rem] leading-[1.7] text-muted">{e.desc}</p>
    </div>
  );
}
