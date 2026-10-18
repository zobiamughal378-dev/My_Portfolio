import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { FaGithub, FaLinkedin, FaEnvelope } from "react-icons/fa";
import { SiLeetcode } from "react-icons/si";
import WarriorPortrait from "./WarriorPortrait";
import SunRays from "./SunRays";
import Robot from "./Robot";
import CodeWindow from "./CodeWindow";

const roles = [
  "CS Student @ FAST-NUCES",
  "ICPC Regionalist",
  "Full-Stack Developer",
  "Java Developer",
  "Competitive Programmer",
  "AI/ML Enthusiast",
];

const SOCIALS = [
  { icon: FaGithub, href: "https://github.com/zobiamughal378-dev", label: "GitHub" },
  { icon: FaLinkedin, href: "https://linkedin.com/in/zobia-razzaq-ab1107398", label: "LinkedIn" },
  { icon: SiLeetcode, href: "https://leetcode.com/u/Zobia459/", label: "LeetCode" },
  { icon: FaEnvelope, href: "mailto:zobiamughal378@gmail.com", label: "Email" },
];

const CLOUDS = [
  { top: "58%", w: 520, h: 120, dur: 46, o: 0.28, c: "rgba(255,190,215,0.9)" },
  { top: "70%", w: 640, h: 150, dur: 60, o: 0.24, c: "rgba(190,215,255,0.9)" },
  { top: "46%", w: 420, h: 90, dur: 52, o: 0.2, c: "rgba(255,230,200,0.9)" },
  { top: "80%", w: 760, h: 170, dur: 70, o: 0.3, c: "rgba(255,170,200,0.9)" },
];

function AnimatedName({ start }: { start: boolean }) {
  const letter = (ch: string, i: number, cls: string, base: number, italic: boolean) => (
    <motion.span
      key={cls + i}
      initial={{ opacity: 0, y: 70, rotateX: -90, filter: "blur(10px)" }}
      animate={start ? { opacity: 1, y: 0, rotateX: 0, filter: "blur(0px)" } : {}}
      transition={{ delay: base + i * 0.08, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className="inline-block"
      style={{ transformOrigin: "50% 100%" }}
    >
      <span
        className={`inline-block ${cls} ${italic ? "italic" : ""}`}
        style={{ animationDelay: `${i * 0.14}s` }}
      >
        {ch}
      </span>
    </motion.span>
  );
  return (
    <div className="relative mb-2 inline-block max-w-full">
      <h1
        aria-label="Zobia Razzaq"
        className="relative z-10 flex max-w-full flex-wrap justify-center gap-x-[0.28em] font-display text-[clamp(2.7rem,4.1vw,4.2rem)] font-bold leading-[1.05] tracking-tight lg:justify-start"
        style={{ perspective: 800 }}
      >
        <span className="inline-flex" aria-hidden="true">
          {"Zobia".split("").map((c, i) => letter(c, i, "name-letter-a", 0.2, false))}
        </span>
        <span className="inline-flex" aria-hidden="true">
          {"Razzaq".split("").map((c, i) => letter(c, i, "name-letter-b", 0.6, true))}
        </span>
      </h1>
      {/* hand-drawn swash under the name */}
      <svg viewBox="0 0 400 24" className="relative -mt-1 h-5 w-full max-w-[420px]" aria-hidden="true" preserveAspectRatio="none">
        <defs>
          <linearGradient id="swash" x1="0" x2="1">
            <stop offset="0" stopColor="#ff9ec4" />
            <stop offset="0.5" stopColor="#ffd77a" />
            <stop offset="1" stopColor="#6fd3f0" />
          </linearGradient>
        </defs>
        <motion.path
          d="M4 14 C60 2 110 22 170 12 C230 2 280 22 340 10 C360 7 380 9 396 12"
          fill="none"
          stroke="url(#swash)"
          strokeWidth="4"
          strokeLinecap="round"
          initial={{ pathLength: 0 }}
          animate={start ? { pathLength: 1 } : {}}
          transition={{ delay: 1.5, duration: 1.1, ease: "easeInOut" }}
        />
      </svg>
    </div>
  );
}

export default function Hero({ start = true }: { start?: boolean }) {
  const [roleIndex, setRoleIndex] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setRoleIndex((i) => (i + 1) % roles.length), 2200);
    return () => clearInterval(id);
  }, []);

  const stars = useMemo(
    () =>
      Array.from({ length: 46 }, (_, i) => ({
        left: (i * 53.7) % 100,
        top: (i * 31.3) % 52,
        size: 1 + (i % 3),
        delay: (i % 9) * 0.45,
        dur: 2.4 + (i % 5) * 0.7,
      })),
    []
  );

  return (
    <section id="top" className="relative min-h-screen overflow-hidden pb-24 pt-28">
      {/* dreamy sunset sky */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "linear-gradient(180deg, #060b22 0%, #101a52 34%, #2d2a78 56%, #7b4a9a 74%, #e88fb0 90%, #ffc2a8 100%)",
        }}
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute bottom-[-8%] left-1/2 h-[46%] w-[90%] -translate-x-1/2"
      >
        <motion.div
          className="h-full w-full rounded-[50%] blur-[70px]"
          style={{ background: "radial-gradient(ellipse, rgba(255,214,170,0.85), rgba(255,158,196,0.35) 55%, transparent 75%)" }}
          animate={{ opacity: [0.7, 1, 0.7], scale: [1, 1.06, 1] }}
          transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>
      {stars.map((s, i) => (
        <span
          key={i}
          aria-hidden="true"
          className="pointer-events-none absolute rounded-full bg-white"
          style={{
            left: `${s.left}%`,
            top: `${s.top}%`,
            width: s.size,
            height: s.size,
            animation: `twinkle ${s.dur}s ease-in-out ${s.delay}s infinite`,
            boxShadow: "0 0 6px rgba(255,255,255,0.9)",
          }}
        />
      ))}
      {CLOUDS.map((c, i) => (
        <div
          key={i}
          aria-hidden="true"
          className="pointer-events-none absolute left-[10%] rounded-full blur-[48px]"
          style={{
            top: c.top,
            width: c.w,
            height: c.h,
            background: c.c,
            opacity: c.o,
            animation: `cloudDrift ${c.dur}s ease-in-out ${-i * 9}s infinite alternate`,
          }}
        />
      ))}
      <SunRays />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-44 bg-gradient-to-t from-bg to-transparent" />

      <div className="relative mx-auto grid max-w-[1500px] grid-cols-1 items-center gap-12 px-[5%] lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] xl:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)_minmax(0,0.9fr)] xl:gap-8">
        {/* ===== Warrior portrait ===== */}
        <div className="relative z-10 order-2 lg:order-1">
          <WarriorPortrait start={start} />
        </div>

        {/* ===== Copy ===== */}
        <div className="relative z-30 order-1 min-w-0 text-center lg:order-2 lg:text-left">
          <motion.div
            initial={{ opacity: 0 }}
            animate={start ? { opacity: 1 } : {}}
            transition={{ delay: 0.1, duration: 0.6 }}
            className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3 py-1 font-mono text-[11px] tracking-widest text-white/80 backdrop-blur"
          >
            <span className="h-2 w-2 animate-pulse rounded-full bg-pink" />
            PORTFOLIO · 2026
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={start ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.15, duration: 0.6 }}
            className="font-display text-3xl font-semibold italic text-pink md:text-4xl"
          >
            Hi, I'm
          </motion.div>
          <AnimatedName start={start} />

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={start ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 1.6, duration: 0.7 }}
            className="mx-auto mt-3 max-w-xl font-display text-2xl italic leading-snug text-white/90 md:text-[1.7rem] lg:mx-0"
          >
            Turning vision into reality with code and design.
          </motion.p>

          <div className="mt-4 h-7 font-mono text-sm text-accent">
            <span className="text-white/50">&gt;</span> {roles[roleIndex]}
            <span className="ml-1 inline-block h-4 w-2 animate-pulse bg-accent align-middle" />
          </div>

          <p className="mx-auto mt-5 max-w-xl leading-relaxed text-white/80 lg:mx-0">
            As a passionate CS student &amp; full-stack developer, I turn concepts into working code —
            from AI agents and algorithms to production-grade web apps.
          </p>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-4 lg:justify-start">
            <a
              href="#projects"
              className="group inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 font-semibold text-bg transition-colors hover:bg-pink"
            >
              View My Work
              <ArrowUpRight size={18} className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </a>
            <a
              href="#contact"
              className="inline-flex items-center gap-2 rounded-full border border-white/30 px-6 py-3 text-white transition-colors hover:border-accent hover:text-accent"
            >
              Let's Talk
              <ArrowUpRight size={18} />
            </a>

            {/* turning "Let's work together" badge */}
            <a href="#contact" aria-label="Let's work together" className="group relative hidden h-[92px] w-[92px] sm:block">
              <motion.svg
                viewBox="-50 -50 100 100"
                className="absolute inset-0 h-full w-full"
                animate={{ rotate: 360 }}
                transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
              >
                <defs>
                  <path id="lwt" d="M -34 0 a34 34 0 1 1 68 0 a34 34 0 1 1 -68 0" />
                </defs>
                <text fontSize="9.6" letterSpacing="2.4" fill="rgba(255,255,255,0.85)" fontFamily="JetBrains Mono, monospace">
                  <textPath href="#lwt">LET'S WORK TOGETHER · LET'S WORK TOGETHER ·</textPath>
                </text>
              </motion.svg>
              <span className="absolute inset-[26px] flex items-center justify-center rounded-full bg-butter text-bg transition-transform group-hover:scale-110">
                <ArrowUpRight size={20} />
              </span>
            </a>
          </div>

          <div className="mt-8 flex items-center justify-center gap-3 lg:justify-start">
            <span className="hidden h-px w-10 bg-white/30 sm:block" />
            {SOCIALS.map((s) => (
              <a
                key={s.label}
                href={s.href}
                target={s.href.startsWith("http") ? "_blank" : undefined}
                rel="noreferrer"
                aria-label={s.label}
                className="flex h-10 w-10 items-center justify-center rounded-full border border-white/20 bg-white/10 text-white backdrop-blur transition-all hover:-translate-y-1 hover:border-pink hover:bg-pink hover:text-bg"
              >
                <s.icon size={17} />
              </a>
            ))}
          </div>

          <div className="mt-6 font-mono text-xs text-white/55">
            FAST-NUCES Chiniot-Faisalabad · BS Computer Science · 2024–2028
          </div>
        </div>

        {/* ===== Robot + programming interface ===== */}
        <motion.div
          className="relative z-20 order-3 mx-auto w-full max-w-[420px] pb-4 lg:col-span-2 lg:max-w-[460px] xl:col-span-1"
          initial={{ opacity: 0, x: 40 }}
          animate={start ? { opacity: 1, x: 0 } : {}}
          transition={{ delay: 0.9, duration: 1, ease: [0.16, 1, 0.3, 1] }}
        >
          <CodeWindow />
          <div className="relative mt-3 flex h-[210px] items-end justify-end sm:h-[230px]">
            <div className="chip-float absolute left-0 top-2 rounded-xl border border-white/25 bg-white/10 px-3 py-1.5 font-mono text-sm text-cyan backdrop-blur" style={{ "--r": "-6deg" } as React.CSSProperties}>
              &lt;/&gt;
            </div>
            <div className="chip-float absolute left-[26%] top-[46%] rounded-xl border border-white/25 bg-white/10 px-3 py-1.5 font-mono text-sm text-pink backdrop-blur" style={{ "--r": "5deg", animationDelay: "-1.5s" } as React.CSSProperties}>
              {"{ }"}
            </div>
            <div className="chip-float absolute left-[6%] top-[68%] rounded-xl border border-white/25 bg-white/10 px-3 py-1.5 font-mono text-sm text-butter backdrop-blur" style={{ "--r": "-3deg", animationDelay: "-3s" } as React.CSSProperties}>
              AI
            </div>
            <div className="chip-float absolute right-[44%] top-0 rounded-xl border border-white/25 bg-white/10 px-3 py-1.5 font-mono text-sm text-purple backdrop-blur" style={{ "--r": "7deg", animationDelay: "-2s" } as React.CSSProperties}>
              API
            </div>
            <Robot className="w-[150px] sm:w-[170px]" />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
