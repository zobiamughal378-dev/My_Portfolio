import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Bot, Send, X } from "lucide-react";
import { projects } from "../data/projects";
import { skillGroups } from "../data/skills";
import { experience } from "../data/experience";
import { certificates } from "../data/certificates";

type Msg = { from: "bot" | "user"; text: string };

const EMAIL = "zobiamughal378@gmail.com";
const STOP = new Set([
  "system", "management", "project", "projects", "game", "games", "app", "the", "and", "with",
  "tell", "about", "what", "which", "does", "have", "show", "your", "her", "any", "clone", "based",
]);

const tokens = (s: string) =>
  s.toLowerCase().replace(/[^a-z0-9+#.\s]/g, " ").split(/\s+/).filter(Boolean);

function findProject(words: string[]) {
  let best: (typeof projects)[number] | null = null;
  let bestScore = 0;
  for (const p of projects) {
    const tw = tokens(p.title).filter((w) => w.length > 2 && !STOP.has(w));
    const score = tw.filter((w) => words.includes(w)).length;
    if (score > bestScore) {
      best = p;
      bestScore = score;
    }
  }
  return best;
}

function reply(input: string): string {
  const words = tokens(input);
  const m = words.join(" ");
  const has = (...k: string[]) => k.some((x) => (x.length <= 4 ? words.includes(x) : m.includes(x)));

  if (words.length === 0) return "Type a question and I'll do my best. Try 'projects', 'skills' or 'how to hire Zobia'.";

  if (/^(hi|hello|hey|salam|assalam|aoa|yo)\b/.test(m) || has("assalam"))
    return "Hey! I'm NOVA, Zobia's assistant. Ask me about her projects, skills, experience, ICPC, sketches, or how to get in touch.";
  if (has("thank", "shukria", "thanks")) return "Anytime! Anything else you'd like to know about Zobia?";

  const proj = findProject(words);
  if (proj) {
    return `${proj.title} (${proj.tagLabel}${proj.tagLabel2 ? " · " + proj.tagLabel2 : ""}): ${proj.desc}`;
  }

  if (has("society", "societies", "rung", "connect", "marketing", "cohead", "co-head", "currently", "leading"))
    return "Right now Zobia is Co-Head of Design at the Rung Society and Marketing Head at Career Connect Society at her university.";
  if (has("hire", "contact", "email", "reach", "available", "job", "intern", "freelance", "collab"))
    return `Zobia is open to internships, collaborations and interesting projects. Email her at ${EMAIL}, or use the Contact section for LinkedIn and GitHub.`;
  if (has("linkedin", "github", "social", "profile"))
    return "LinkedIn: linkedin.com/in/zobia-razzaq-ab1107398 · GitHub: github.com/zobiamughal378-dev · LeetCode: leetcode.com/u/Zobia459";
  if (has("hadi", "textile", "internship", "experience")) {
    const e = experience[0];
    return `${e.role} at ${e.org} (${e.year}). ${e.desc} She received a certificate of internship and an appreciation letter from Hadi Textile.`;
  }
  if (has("icpc", "competitive", "leetcode", "codeforces", "contest"))
    return "Zobia competed in ICPC Asia-Topi 2025 (GIK Institute) with team Fast Syntax Syndicate, representing NU-CFC, and practises on LeetCode and Codeforces in C++.";
  if (has("certificate", "award", "achievement", "hackathon"))
    return `She has ${certificates.length} certificates, including ${certificates
      .slice(0, 3)
      .map((c) => c.title)
      .join(", ")}. See the Certificates section for the 3D gallery.`;
  if (has("sketch", "draw", "art", "paint", "vault"))
    return "Zobia draws pencil portraits and character sketches. Open the Sketching page from the menu to preview and download them.";
  if (has("study", "university", "fast", "nuces", "education", "semester", "degree", "cgpa"))
    return "She is a 3rd-year BS Computer Science student at FAST-NUCES Chiniot-Faisalabad (2024–2028). She has studied DLD, COAL, DSA, Automata, Databases, OS and AI.";

  // specific technology
  for (const g of skillGroups) {
    const hit = g.items.find((it) => words.includes(it.name.toLowerCase()));
    if (hit) return `Yes, ${hit.name} is part of Zobia's toolkit (${g.label}).`;
  }
  if (has("skill", "tech", "stack", "language", "tool", "know", "use"))
    return skillGroups
      .map((g) => `${g.label}: ${g.items.slice(0, 5).map((i) => i.name).join(", ")}`)
      .join(" | ");
  if (has("project", "built", "build", "made", "portfolio")) {
    const top = projects.filter((p) => p.featured).slice(0, 4);
    const list = (top.length ? top : projects.slice(0, 4)).map((p) => p.title).join(", ");
    return `She has ${projects.length} projects across web, AI, systems, C++, databases and hardware. Highlights: ${list}. Ask me about any of them by name.`;
  }
  if (has("who", "zobia", "about", "yourself", "you")) {
    return "Zobia Razzaq is a CS student at FAST-NUCES, a full-stack and AI developer, ICPC participant, and Graphic Head of the Amnesty International FAST chapter. I'm NOVA, her assistant.";
  }
  return "I'm not sure about that one. I can talk about Zobia's projects, skills, experience, ICPC, certificates, sketches or how to contact her.";
}

async function askAI(history: Msg[], text: string): Promise<string | null> {
  try {
    const ctrl = new AbortController();
    const timer = setTimeout(() => ctrl.abort(), 25000);
    const payload = [...history, { from: "user" as const, text }]
      .slice(-10)
      .map((m) => ({ role: m.from === "user" ? "user" : "assistant", content: m.text }));
    const r = await fetch("/api/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ messages: payload }),
      signal: ctrl.signal,
    });
    clearTimeout(timer);
    if (!r.ok) return null;
    const d = (await r.json()) as { reply?: unknown };
    return typeof d.reply === "string" && d.reply.trim() ? d.reply.trim() : null;
  } catch {
    return null;
  }
}

const chips = ["Her projects", "Skills", "ICPC", "Sketches", "Hire Zobia"];

export default function NovaBot() {
  const [open, setOpen] = useState(false);
  const [typing, setTyping] = useState(false);
  const [live, setLive] = useState(false);
  const [input, setInput] = useState("");
  const [msgs, setMsgs] = useState<Msg[]>([
    { from: "bot", text: "NOVA online. I'm Zobia's assistant. Ask me about her projects, skills, ICPC or how to hire her." },
  ]);
  const endRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onOpen = () => setOpen(true);
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("nova:open", onOpen);
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("nova:open", onOpen);
      window.removeEventListener("keydown", onKey);
    };
  }, []);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth", block: "end" });
  }, [msgs, typing, open]);

  async function send(text: string) {
    const t = text.trim();
    if (!t || typing) return;
    const history = msgs;
    setMsgs((m) => [...m, { from: "user", text: t }]);
    setInput("");
    setTyping(true);
    const started = Date.now();
    const ai = await askAI(history, t);
    // keep the typing dots visible for a natural beat
    const wait = Math.max(0, 600 - (Date.now() - started));
    if (wait) await new Promise((res) => setTimeout(res, wait));
    setLive(ai !== null);
    setMsgs((m) => [...m, { from: "bot", text: ai ?? reply(t) }]);
    setTyping(false);
  }

  return (
    <>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 24, scale: 0.94 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 24, scale: 0.94 }}
            transition={{ type: "spring", stiffness: 260, damping: 24 }}
            className="fixed bottom-24 right-4 z-[400] flex h-[min(70vh,520px)] w-[min(92vw,380px)] flex-col overflow-hidden rounded-2xl border border-accent/30 bg-bg/95 shadow-[0_30px_80px_rgba(0,0,0,0.7),0_0_40px_rgba(111,211,240,0.15)] backdrop-blur-xl sm:right-6"
            role="dialog"
            aria-label="NOVA chat assistant"
          >
            <div className="flex items-center justify-between border-b border-white/10 bg-gradient-to-r from-accent/15 to-purple/15 px-4 py-3">
              <div className="flex items-center gap-3">
                <span className="relative flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-cyan to-purple text-black">
                  <Bot size={18} />
                  <span className="absolute -right-0.5 -top-0.5 h-2.5 w-2.5 rounded-full border-2 border-bg bg-emerald-400" />
                </span>
                <div>
                  <div className="text-sm font-bold">NOVA</div>
                  <div className="font-mono text-[0.6rem] uppercase tracking-[0.15em] text-accent">
                    {live ? "AI assistant · live" : "Zobia's assistant · online"}
                  </div>
                </div>
              </div>
              <button
                aria-label="Close chat"
                onClick={() => setOpen(false)}
                className="flex h-8 w-8 items-center justify-center rounded-full text-white/70 hover:bg-white/10 hover:text-white"
              >
                <X size={16} />
              </button>
            </div>

            <div className="flex-1 space-y-3 overflow-y-auto px-4 py-4">
              {msgs.map((m, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex ${m.from === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`max-w-[85%] rounded-2xl px-3.5 py-2.5 text-[0.85rem] leading-relaxed ${
                      m.from === "user"
                        ? "rounded-br-sm bg-accent text-black"
                        : "rounded-bl-sm border border-white/10 bg-card text-white/90"
                    }`}
                  >
                    {m.text}
                  </div>
                </motion.div>
              ))}
              {typing && (
                <div className="flex justify-start">
                  <div className="flex gap-1.5 rounded-2xl rounded-bl-sm border border-white/10 bg-card px-4 py-3">
                    {[0, 1, 2].map((d) => (
                      <motion.span
                        key={d}
                        className="h-1.5 w-1.5 rounded-full bg-accent"
                        animate={{ y: [0, -4, 0], opacity: [0.4, 1, 0.4] }}
                        transition={{ duration: 0.8, repeat: Infinity, delay: d * 0.15 }}
                      />
                    ))}
                  </div>
                </div>
              )}
              <div ref={endRef} />
            </div>

            <div className="flex flex-wrap gap-1.5 px-4 pb-2">
              {chips.map((c) => (
                <button
                  key={c}
                  onClick={() => send(c)}
                  className="rounded-full border border-white/15 px-3 py-1 text-[0.72rem] text-white/70 transition-colors hover:border-accent hover:text-accent"
                >
                  {c}
                </button>
              ))}
            </div>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                send(input);
              }}
              className="flex items-center gap-2 border-t border-white/10 p-3"
            >
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask about Zobia..."
                aria-label="Message"
                className="min-w-0 flex-1 rounded-full border border-white/10 bg-card px-4 py-2.5 text-[0.85rem] text-white outline-none placeholder:text-white/30 focus:border-accent/60"
              />
              <button
                type="submit"
                aria-label="Send"
                className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-accent text-black transition-transform hover:scale-105"
              >
                <Send size={16} />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      <button
        onClick={() => setOpen((o) => !o)}
        aria-label={open ? "Close NOVA chat" : "Open NOVA chat"}
        className="fixed bottom-6 right-4 z-[400] flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-cyan to-purple text-black shadow-[0_10px_40px_rgba(111,211,240,0.4)] transition-transform hover:scale-110 sm:right-6"
      >
        {!open && <span className="pointer-events-none absolute inset-0 animate-ping rounded-full bg-cyan/30" />}
        {open ? <X size={22} /> : <Bot size={24} />}
      </button>
    </>
  );
}
