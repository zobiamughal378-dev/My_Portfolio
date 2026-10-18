import Reveal from "./Reveal";
import Butterfly from "./Butterfly";

export default function Hobbies() {
  return (
    <section id="hobbies" className="relative overflow-hidden bg-navy/85 px-[6%] py-24">
      <div className="pointer-events-none absolute left-[10%] top-[10%]">
        <Butterfly size={40} duration={10} />
      </div>
      <div className="relative mx-auto max-w-[1000px]">
        <Reveal>
          <div className="mb-4 flex items-center gap-2 font-mono text-[0.7rem] uppercase tracking-[0.2em] text-accent">
            <span className="h-px w-8 bg-accent" />
            Beyond Code
          </div>
        </Reveal>
        <Reveal delay={0.05}>
          <h2 className="mb-10 max-w-[600px] text-[clamp(1.8rem,4vw,2.9rem)] font-extrabold leading-[1.15]">
            Hobbies &amp; Interests
          </h2>
        </Reveal>

        <div className="grid gap-6 md:grid-cols-2">
          <Reveal delay={0.1} y={20}>
            <div className="group overflow-hidden rounded-2xl border border-white/10 bg-card p-5 transition hover:-translate-y-1">
              <div className="aspect-[16/10] w-full overflow-hidden rounded-2xl border border-white/10 bg-white">
                <img
                  src="/hobbies/art-craft.jpg"
                  alt="Handmade art and craft"
                  className="h-full w-full object-contain"
                />
              </div>
              <div className="mt-4 font-mono text-[0.65rem] uppercase tracking-wider text-accent">
                Handmade
              </div>
              <div className="mt-1 text-[0.95rem] font-bold">Art &amp; Craft</div>
              <p className="mt-1 text-[0.82rem] leading-relaxed text-muted">
                Hands-on making — drawing, coloring, and craft projects for the joy of building
                something physical.
              </p>
            </div>
          </Reveal>

          <Reveal delay={0.16} y={20}>
            <div className="group overflow-hidden rounded-2xl border border-white/10 bg-card p-5 transition hover:-translate-y-1">
              <div className="aspect-[16/10] w-full overflow-hidden rounded-2xl border border-white/10 bg-black">
                <img
                  src="/hobbies/programming.jpg"
                  alt="Programming and vibecoding"
                  className="h-full w-full object-cover"
                />
              </div>
              <div className="mt-4 font-mono text-[0.65rem] uppercase tracking-wider text-accent">
                Vibecoding
              </div>
              <div className="mt-1 text-[0.95rem] font-bold">Programming</div>
              <p className="mt-1 text-[0.82rem] leading-relaxed text-muted">
                Also just... this. Building things end to end is the hobby as much as the job.
              </p>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
