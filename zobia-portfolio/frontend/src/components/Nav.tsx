import { useEffect, useState } from "react";
import { motion } from "framer-motion";

const links = [
  { href: "#top", label: "Home" },
  { href: "#about", label: "About" },
  { href: "#skills", label: "Skills" },
  { href: "#projects", label: "Projects" },
  { href: "#certificates", label: "Certificates" },
  { href: "#experience", label: "Experience" },
  { href: "#hobbies", label: "Hobbies" },
  { href: "#/sketches", label: "Sketching" },
  { href: "#contact", label: "Contact" },
];

export default function Nav({ route = "home" }: { route?: "home" | "sketches" }) {
  const [active, setActive] = useState("");
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      const sections = links.map((l) => (l.href.startsWith("#/") ? null : document.querySelector(l.href)));
      let current = "";
      sections.forEach((s) => {
        if (s && window.scrollY >= (s as HTMLElement).offsetTop - 120) {
          current = "#" + s.id;
        }
      });
      setActive(current);
    };
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav className="fixed inset-x-0 top-0 z-[100] flex items-center justify-between border-b border-white/[0.06] bg-bg/80 px-[6%] py-4 backdrop-blur-md">
      <a href="#top" className="relative flex items-center gap-2.5">
        <span className="relative flex h-9 w-9 items-center justify-center">
          <motion.span
            className="pointer-events-none absolute -inset-2 rounded-full"
            animate={{ opacity: [0, 0, 0.9, 0], scale: [0.8, 0.8, 1.5, 1.8] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", repeatDelay: 2 }}
            style={{
              background: "radial-gradient(circle, rgba(255,215,0,0.9), transparent 70%)",
              filter: "blur(6px)",
            }}
          />
          <span className="relative z-10 flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-cyan to-pink font-display text-[0.8rem] font-extrabold text-white">
            ZR
          </span>
        </span>
        <span className="text-[0.95rem] font-bold text-white">Zobia Razzaq</span>
      </a>
      <div className="hidden gap-7 lg:flex">
        {links
          .filter((l) => l.href !== "#top")
          .map((l) => (
            <a
              key={l.href}
              href={l.href}
              className={`relative text-[0.82rem] font-semibold tracking-[0.02em] transition-colors ${
                (route === "sketches" ? l.href === "#/sketches" : active === l.href) ? "text-cyan" : "text-muted hover:text-white"
              }`}
            >
              {l.label}
            </a>
          ))}
      </div>
      <a
        href="#contact"
        className="hidden rounded-full bg-white px-5 py-2 text-[0.8rem] font-bold text-bg transition-transform hover:-translate-y-0.5 sm:block"
      >
        Hire Me
      </a>
      <button
        aria-label="Toggle menu"
        onClick={() => setOpen((o) => !o)}
        className="flex flex-col gap-1.5 lg:hidden"
      >
        <span className="h-[1.5px] w-6 bg-white" />
        <span className="h-[1.5px] w-6 bg-white" />
        <span className="h-[1.5px] w-4 bg-white" />
      </button>
      {open && (
        <div className="absolute left-0 right-0 top-full flex flex-col gap-4 border-b border-white/[0.06] bg-bg/95 px-[6%] py-6 backdrop-blur-md lg:hidden">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              className="text-sm font-semibold tracking-[0.06em] text-muted hover:text-cyan"
            >
              {l.label}
            </a>
          ))}
        </div>
      )}
    </nav>
  );
}
