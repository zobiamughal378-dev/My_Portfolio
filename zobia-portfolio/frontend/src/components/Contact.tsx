import { FaEnvelope, FaLinkedin, FaGithub } from "react-icons/fa";
import { ArrowUpRight } from "lucide-react";
import Reveal from "./Reveal";

const contactInfo = [
  { icon: FaEnvelope, label: "Email", value: "zobiamughal378@gmail.com", href: "mailto:zobiamughal378@gmail.com" },
  { icon: FaLinkedin, label: "LinkedIn", value: "zobia-razzaq", href: "https://linkedin.com/in/zobia-razzaq-ab1107398" },
  { icon: FaGithub, label: "GitHub", value: "zobiamughal378-dev", href: "https://github.com/zobiamughal378-dev" },
];

export default function Contact() {
  return (
    <section id="contact" className="relative bg-navy/85 px-[6%] py-24 text-center">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_50%_50%,rgba(111,211,240,0.06),transparent_55%)]" />
      <div className="relative mx-auto max-w-[600px]">
        <Reveal>
          <div className="mb-4 flex items-center justify-center gap-2 font-mono text-[0.7rem] uppercase tracking-[0.2em] text-accent">
            <span className="h-px w-8 bg-accent" />
            Let's Connect
          </div>
        </Reveal>
        <Reveal delay={0.05}>
          <h2 className="mb-5 text-[clamp(2rem,4.5vw,3.2rem)] font-extrabold leading-[1.1]">
            Let's build{" "}
            <span className="bg-gradient-to-r from-accent via-pink to-purple bg-clip-text text-transparent">
              something great
            </span>
            .
          </h2>
        </Reveal>
        <Reveal delay={0.1}>
          <p className="mb-12 leading-[1.8] text-muted">
            Open to internships, collaborations &amp; exciting projects. I'd love to hear from
            you!
          </p>
        </Reveal>

        <Reveal delay={0.15}>
          <div className="mb-12 flex flex-wrap justify-center gap-3.5">
            {contactInfo.map((c) => (
              <a
                key={c.label}
                href={c.href}
                target={c.href.startsWith("http") ? "_blank" : undefined}
                rel="noreferrer"
                className="flex items-center gap-2.5 rounded-[10px] border border-white/[0.08] bg-white/[0.04] px-5 py-3.5 text-[0.85rem] font-semibold tracking-[0.04em] transition-all hover:-translate-y-1 hover:border-accent hover:bg-accent/[0.08] hover:text-accent"
              >
                <span className="text-[1.1rem]">
                  <c.icon />
                </span>
                {c.label}
              </a>
            ))}
          </div>
        </Reveal>

        <Reveal delay={0.2}>
          <a
            href="mailto:zobiamughal378@gmail.com"
            className="inline-flex items-center gap-2 rounded-full bg-accent px-10 py-4 text-[0.9rem] font-bold tracking-[0.06em] text-bg transition-transform hover:-translate-y-1 hover:shadow-[0_20px_40px_rgba(111,211,240,0.3)]"
          >
            Send Me an Email
            <ArrowUpRight size={18} />
          </a>
        </Reveal>

        <Reveal delay={0.25}>
          <a
            href="mailto:zobiamughal378@gmail.com"
            className="mt-8 block font-mono text-[1rem] text-accent opacity-70 transition-opacity hover:opacity-100"
          >
            zobiamughal378@gmail.com
          </a>
        </Reveal>
      </div>
    </section>
  );
}
