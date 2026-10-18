import { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

interface Command {
  id: string;
  label: string;
  hint: string;
  icon: string;
  action: () => void;
}

export default function CommandPalette() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [activeIdx, setActiveIdx] = useState(0);

  const commands: Command[] = useMemo(
    () => [
      { id: "top", label: "Go to Home", hint: "Hero", icon: "🏠", action: () => scrollTo("top") },
      { id: "services", label: "Go to Services", hint: "What I build", icon: "🧩", action: () => scrollTo("services") },
      { id: "about", label: "Go to About", hint: "Bio & stats", icon: "👤", action: () => scrollTo("about") },
      { id: "skills", label: "Go to Skills", hint: "Tech stack", icon: "⚡", action: () => scrollTo("skills") },
      { id: "projects", label: "Go to Projects", hint: "Featured work", icon: "💻", action: () => scrollTo("projects") },
      { id: "certificates", label: "Go to Certificates", hint: "Achievements", icon: "🏆", action: () => scrollTo("certificates") },
      { id: "competitive", label: "Go to Competitive Programming", hint: "ICPC · LeetCode · Codeforces", icon: "🥇", action: () => scrollTo("competitive") },
      { id: "experience", label: "Go to Experience", hint: "Journey", icon: "💼", action: () => scrollTo("experience") },
      { id: "hobbies", label: "Go to Hobbies", hint: "Art & craft, vibecoding", icon: "🎨", action: () => scrollTo("hobbies") },
      { id: "sketching", label: "Open Sketch Vault", hint: "Preview & download sketches", icon: "✏️", action: () => { window.location.hash = "#/sketches"; } },
      { id: "nova", label: "Ask NOVA", hint: "AI chat assistant", icon: "🤖", action: () => window.dispatchEvent(new Event("nova:open")) },
      { id: "contact", label: "Go to Contact", hint: "Get in touch", icon: "✉️", action: () => scrollTo("contact") },
      { id: "email", label: "Email Zobia", hint: "zobiamughal378@gmail.com", icon: "📧", action: () => (window.location.href = "mailto:zobiamughal378@gmail.com") },
      { id: "github", label: "Open GitHub", hint: "External link", icon: "🐙", action: () => window.open("https://github.com/zobiamughal378-dev", "_blank") },
      { id: "linkedin", label: "Open LinkedIn", hint: "External link", icon: "💼", action: () => window.open("https://linkedin.com/in/zobia-razzaq-ab1107398", "_blank") },
      { id: "leetcode", label: "Open LeetCode", hint: "External link", icon: "⚡", action: () => window.open("https://leetcode.com/u/Zobia459/", "_blank") },
    ],
    []
  );

  function scrollTo(id: string) {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
    else window.location.hash = "#" + id; // on the sketchbook page: go home, then scroll
  }

  const filtered = commands.filter(
    (c) =>
      c.label.toLowerCase().includes(query.toLowerCase()) ||
      c.hint.toLowerCase().includes(query.toLowerCase())
  );

  useEffect(() => {
    function onKeyDown(e: KeyboardEvent) {
      const isMeta = e.metaKey || e.ctrlKey;
      if (isMeta && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setOpen((o) => !o);
        setQuery("");
        setActiveIdx(0);
        return;
      }
      if (!open) return;
      if (e.key === "Escape") setOpen(false);
      if (e.key === "ArrowDown") {
        e.preventDefault();
        setActiveIdx((i) => Math.min(i + 1, filtered.length - 1));
      }
      if (e.key === "ArrowUp") {
        e.preventDefault();
        setActiveIdx((i) => Math.max(i - 1, 0));
      }
      if (e.key === "Enter" && filtered[activeIdx]) {
        filtered[activeIdx].action();
        setOpen(false);
      }
    }
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open, filtered, activeIdx]);

  useEffect(() => {
    setActiveIdx(0);
  }, [query]);

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="fixed bottom-6 right-24 z-[150] hidden items-center gap-2 rounded-full border border-cyan/20 bg-card/90 px-4 py-2.5 font-mono text-[0.72rem] text-muted backdrop-blur-md transition-all hover:border-cyan hover:text-cyan sm:flex"
        aria-label="Open command palette"
      >
        <span>Quick nav</span>
        <kbd className="rounded border border-white/10 bg-white/5 px-1.5 py-0.5 text-[0.65rem]">
          ⌘K
        </kbd>
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[300] flex items-start justify-center bg-bg/80 px-4 pt-[12vh] backdrop-blur-sm"
            onClick={() => setOpen(false)}
          >
            <motion.div
              initial={{ opacity: 0, y: -16, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.98 }}
              transition={{ duration: 0.18, ease: [0.16, 1, 0.3, 1] }}
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-[560px] overflow-hidden rounded-2xl border border-cyan/15 bg-card shadow-[0_30px_80px_rgba(0,0,0,0.6)]"
            >
              <div className="flex items-center gap-3 border-b border-white/[0.06] px-5 py-4">
                <span className="text-cyan">⌘</span>
                <input
                  autoFocus
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Jump to a section, project, or link..."
                  className="w-full bg-transparent text-[0.92rem] text-white outline-none placeholder:text-muted/50"
                />
                <kbd className="rounded border border-white/10 bg-white/5 px-1.5 py-0.5 text-[0.65rem] text-muted">
                  ESC
                </kbd>
              </div>
              <div className="max-h-[340px] overflow-y-auto py-2">
                {filtered.length === 0 && (
                  <div className="px-5 py-8 text-center text-[0.85rem] text-muted">
                    No matches — try another search
                  </div>
                )}
                {filtered.map((c, i) => (
                  <button
                    key={c.id}
                    onMouseEnter={() => setActiveIdx(i)}
                    onClick={() => {
                      c.action();
                      setOpen(false);
                    }}
                    className={`flex w-full items-center gap-3.5 px-5 py-3 text-left transition-colors ${
                      i === activeIdx ? "bg-cyan/[0.08]" : ""
                    }`}
                  >
                    <span className="text-[1.1rem]">{c.icon}</span>
                    <div className="min-w-0 flex-1">
                      <div className="truncate text-[0.85rem] font-semibold text-white">
                        {c.label}
                      </div>
                      <div className="truncate text-[0.72rem] text-muted">{c.hint}</div>
                    </div>
                    {i === activeIdx && <span className="text-cyan">↵</span>}
                  </button>
                ))}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
