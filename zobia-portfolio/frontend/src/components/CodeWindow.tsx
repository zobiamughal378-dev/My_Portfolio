import { useEffect, useMemo, useState } from "react";

type Seg = [string, string]; // [text, tailwind class]

const LINES: Seg[][] = [
  [["const ", "text-pink"], ["zobia", "text-cyan"], [" = {", "text-white/70"]],
  [["  role", "text-white/90"], [": ", "text-white/70"], ['"Full-Stack & AI"', "text-butter"], [",", "text-white/70"]],
  [["  skills", "text-white/90"], [": [", "text-white/70"], ['"React"', "text-butter"], [", ", "text-white/70"], ['"Python"', "text-butter"], [", ", "text-white/70"], ['"C++"', "text-butter"], ["],", "text-white/70"]],
  [["  coffee", "text-white/90"], [": ", "text-white/70"], ["Infinity", "text-purple"], [",", "text-white/70"]],
  [["  mission", "text-white/90"], [": ", "text-white/70"], ['"build cool things"', "text-butter"], [",", "text-white/70"]],
  [["};", "text-white/70"]],
  [["", ""]],
  [["zobia", "text-cyan"], [".", "text-white/70"], ["buildYourIdea", "text-purple"], ["();", "text-white/70"]],
  [["// ready to ship ✨", "italic text-white/40"]],
];

const TOTAL = LINES.reduce((n, l) => n + l.reduce((m, s) => m + s[0].length, 0) + 1, 0);

function useTyping() {
  const reduce = typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const [count, setCount] = useState(reduce ? TOTAL : 0);
  useEffect(() => {
    if (reduce) return;
    let id = 0;
    const tick = () => {
      setCount((c) => {
        if (c >= TOTAL + 55) return 0; // hold the finished code for a moment, then start again
        return c + 1;
      });
      id = window.setTimeout(tick, 42);
    };
    id = window.setTimeout(tick, 900);
    return () => clearTimeout(id);
  }, [reduce]);
  return count;
}

function Terminal() {
  const [phase, setPhase] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setPhase((p) => (p + 1) % 3), 1900);
    return () => clearInterval(id);
  }, []);
  return (
    <div className="mt-2.5 rounded-lg border border-white/10 bg-black/30 px-3 py-2 font-mono text-[0.68rem] leading-relaxed">
      <div className="text-white/70">
        <span className="text-pink">$</span> npm run build
      </div>
      <div className="h-4 text-white/60">
        {phase === 0 && <span className="animate-pulse">compiling…</span>}
        {phase === 1 && <span>bundling 128 modules…</span>}
        {phase === 2 && (
          <span className="text-emerald-300">
            ✓ compiled successfully <span className="text-white/40">in 1.2s</span>
          </span>
        )}
      </div>
    </div>
  );
}

export default function CodeWindow({ className = "" }: { className?: string }) {
  const count = useTyping();

  const { lines, caret } = useMemo(() => {
    let left = count;
    let caretLine = LINES.length - 1;
    let found = false;
    const out = LINES.map((line, li) => {
      const lineLen = line.reduce((m, s) => m + s[0].length, 0);
      if (!found && left >= 0 && left <= lineLen) {
        caretLine = li;
        found = true;
      }
      let remain = Math.max(0, Math.min(left, lineLen));
      const parts = line.map(([text, cls], si) => {
        const piece = text.slice(0, Math.max(0, remain));
        remain -= text.length;
        return (
          <span key={si} className={cls}>
            {piece}
          </span>
        );
      });
      left -= lineLen + 1;
      return parts;
    });
    return { lines: out, caret: caretLine };
  }, [count]);

  return (
    <div className={`relative ${className}`}>
      <div className="rounded-2xl bg-gradient-to-br from-pink via-cyan to-butter p-[1.5px] shadow-[0_30px_80px_rgba(0,0,0,0.5),0_0_50px_rgba(111,211,240,0.25)]">
        <div className="rounded-[calc(1rem-1px)] bg-[#0a1230]/92 p-3.5 backdrop-blur-xl">
          <div className="mb-3 flex items-center gap-2">
            <span className="h-2.5 w-2.5 rounded-full bg-pink" />
            <span className="h-2.5 w-2.5 rounded-full bg-butter" />
            <span className="h-2.5 w-2.5 rounded-full bg-emerald-300" />
            <span className="ml-3 rounded-md bg-white/10 px-2.5 py-0.5 font-mono text-[0.65rem] text-white/80">portfolio.ts</span>
            <span className="ml-auto flex items-center gap-1.5 font-mono text-[0.6rem] text-emerald-300">
              <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-300" /> live
            </span>
          </div>
          <div className="font-mono text-[0.72rem] leading-[1.7] sm:text-[0.76rem]">
            {lines.map((parts, i) => (
              <div key={i} className="flex min-h-[1.7em] gap-3">
                <span className="w-4 select-none text-right text-white/25">{i + 1}</span>
                <span className="whitespace-pre">
                  {parts}
                  {caret === i && <span className="ml-px inline-block h-[1.05em] w-[7px] translate-y-[2px] animate-pulse bg-white" />}
                </span>
              </div>
            ))}
          </div>
          <Terminal />
        </div>
      </div>
    </div>
  );
}
