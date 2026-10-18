import { SiLeetcode, SiCodeforces } from "react-icons/si";
import { FaTrophy } from "react-icons/fa";
import { ArrowUpRight } from "lucide-react";
import Reveal from "./Reveal";

export default function Competitive() {
  return (
    <section id="competitive" className="relative bg-navy/85 px-[6%] py-24">
      <div className="mx-auto max-w-[1100px]">
        <Reveal>
          <div className="mb-4 flex items-center gap-2 font-mono text-[0.7rem] uppercase tracking-[0.2em] text-accent">
            <span className="h-px w-8 bg-accent" />
            Problem Solving
          </div>
        </Reveal>
        <Reveal delay={0.05}>
          <h2 className="mb-14 text-[clamp(1.8rem,4vw,2.9rem)] font-extrabold">
            Competitive{" "}
            <span className="bg-gradient-to-r from-accent to-purple bg-clip-text text-transparent">
              Programming
            </span>
          </h2>
        </Reveal>

        <div className="grid gap-6 md:grid-cols-3">
          <Reveal delay={0.1} y={30}>
            <div className="relative h-full overflow-hidden rounded-2xl border border-white/[0.06] bg-card p-7 transition-all hover:-translate-y-1 hover:border-white/20">
              <div className="pointer-events-none absolute right-0 top-0 h-[100px] w-[100px] rounded-full bg-accent/10 blur-[40px]" />
              <div className="relative mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-white/[0.04] text-[1.3rem] text-[#ffa116]">
                <SiLeetcode />
              </div>
              <div className="mb-1 font-mono text-[0.68rem] uppercase tracking-[0.15em] text-accent">
                LeetCode
              </div>
              <div className="mb-2 text-[1.1rem] font-extrabold">Active Problem Solver</div>
              <div className="mb-4 font-mono text-[0.75rem] text-muted">
                leetcode.com/u/Zobia459
              </div>
              <p className="mb-5 text-[0.82rem] leading-[1.75] text-muted">
                Solving problems in C++ across arrays, strings, logic &amp; core algorithms —
                steady, consistent practice.
              </p>
              <a
                href="https://leetcode.com/u/Zobia459/"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 rounded-lg border border-white/10 px-4 py-2 text-[0.75rem] font-semibold text-white transition-all hover:border-accent hover:text-accent"
              >
                View Profile
                <ArrowUpRight size={14} />
              </a>
            </div>
          </Reveal>

          <Reveal delay={0.16} y={30}>
            <div className="relative h-full overflow-hidden rounded-2xl border border-white/[0.06] bg-card p-7 transition-all hover:-translate-y-1 hover:border-white/20">
              <div className="pointer-events-none absolute right-0 top-0 h-[100px] w-[100px] rounded-full bg-blue/10 blur-[40px]" />
              <div className="relative mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-white/[0.04] text-[1.3rem] text-[#4b83d4]">
                <SiCodeforces />
              </div>
              <div className="mb-1 font-mono text-[0.68rem] uppercase tracking-[0.15em] text-accent">
                Codeforces
              </div>
              <div className="mb-2 text-[1.1rem] font-extrabold">Active Member</div>
              <div className="mb-4 font-mono text-[0.75rem] text-muted">codeforces.com</div>
              <p className="text-[0.82rem] leading-[1.75] text-muted">
                Also solving problems on Codeforces — building up rating and contest experience
                alongside LeetCode practice.
              </p>
            </div>
          </Reveal>

          <Reveal delay={0.22} y={30}>
            <div className="relative h-full overflow-hidden rounded-2xl border border-white/[0.06] bg-card p-7 transition-all hover:-translate-y-1 hover:border-white/20">
              <div className="pointer-events-none absolute right-0 top-0 h-[100px] w-[100px] rounded-full bg-purple/10 blur-[40px]" />
              <div className="relative mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-white/[0.04] text-[1.2rem] text-accent">
                <FaTrophy />
              </div>
              <div className="mb-1 font-mono text-[0.68rem] uppercase tracking-[0.15em] text-accent">
                ICPC
              </div>
              <div className="mb-2 text-[1.1rem] font-extrabold">Team: Fast Syntax Syndicate</div>
              <div className="mb-4 font-mono text-[0.72rem] text-muted">
                Representing NU-CFC · Asia-Topi Prelims, GIK Institute
              </div>
              <p className="text-[0.82rem] leading-[1.75] text-muted">
                Competed as a team in the Asia-Topi preliminary — graph theory, DP, and data
                structures under contest pressure.
              </p>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
