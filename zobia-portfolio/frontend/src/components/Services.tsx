import { motion } from "framer-motion";
import Reveal from "./Reveal";
import { services } from "../data/services";

export default function Services() {
  return (
    <section id="services" className="relative overflow-hidden bg-navy/85 px-[6%] py-24">
      <div className="pointer-events-none absolute left-1/2 top-0 h-[600px] w-[900px] -translate-x-1/2 -translate-y-1/3 rounded-full bg-blue/10 blur-[120px]" />
      <div className="pointer-events-none absolute -bottom-40 right-0 h-[500px] w-[500px] rounded-full bg-purple/10 blur-[120px]" />

      <div className="relative mx-auto max-w-[1100px]">
        <Reveal>
          <div className="mb-3 font-mono text-[0.7rem] uppercase tracking-[0.2em] text-cyan">
            What I Can Build
          </div>
        </Reveal>
        <Reveal delay={0.05}>
          <h2 className="mb-4 text-[clamp(2rem,4vw,3rem)] font-extrabold">
            End-to-End <span className="text-cyan">Development</span>
          </h2>
        </Reveal>
        <Reveal delay={0.08}>
          <p className="mb-14 max-w-[600px] text-[0.95rem] leading-[1.8] text-muted">
            From the first pixel to the last API endpoint — full-stack builds that look as good
            as they run.
          </p>
        </Reveal>

        <div className="grid auto-rows-[220px] grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {services.map((s, i) => (
            <Reveal
              key={s.title}
              delay={(i % 8) * 0.05}
              y={30}
              className={`${s.big ? "sm:col-span-2" : ""} h-full`}
            >
              <motion.div
                whileHover={{ y: -6 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                className="group relative flex h-full flex-col justify-between overflow-hidden rounded-2xl border border-white/[0.07] bg-card p-7"
                style={{
                  backgroundImage: `radial-gradient(120% 120% at 0% 0%, ${s.color1}14, transparent 55%)`,
                }}
              >
                {/* ghost number */}
                <span
                  className="pointer-events-none absolute -right-2 -top-6 select-none font-display text-[6rem] font-extrabold leading-none opacity-[0.05] transition-opacity duration-300 group-hover:opacity-[0.09]"
                  style={{ color: s.color1 }}
                >
                  {String(i + 1).padStart(2, "0")}
                </span>

                {/* border glow on hover */}
                <div
                  className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                  style={{
                    boxShadow: `inset 0 0 0 1px ${s.color1}55, 0 20px 50px -20px ${s.color1}40`,
                  }}
                />

                <div className="relative">
                  <div
                    className="mb-5 flex h-[52px] w-[52px] items-center justify-center rounded-[14px] text-[1.5rem]"
                    style={{
                      background: `linear-gradient(135deg, ${s.color1}25, ${s.color2}15)`,
                      boxShadow: `0 0 0 1px ${s.color1}25`,
                    }}
                  >
                    <span
                      className="drop-shadow-[0_0_12px_rgba(0,0,0,0.3)]"
                      style={{ filter: `drop-shadow(0 0 8px ${s.color1}60)` }}
                    >
                      {s.icon}
                    </span>
                  </div>
                  <h3
                    className={`mb-2.5 font-bold leading-tight ${
                      s.big ? "text-[1.25rem]" : "text-[1.02rem]"
                    }`}
                  >
                    {s.title}
                  </h3>
                  <p
                    className={`leading-[1.65] text-muted ${
                      s.big ? "text-[0.86rem]" : "text-[0.8rem]"
                    }`}
                  >
                    {s.desc}
                  </p>
                </div>

                <div
                  className="relative mt-4 h-[2px] w-8 rounded-full transition-all duration-300 group-hover:w-14"
                  style={{ background: `linear-gradient(90deg, ${s.color1}, ${s.color2})` }}
                />
              </motion.div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
