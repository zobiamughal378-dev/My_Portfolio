import SkillIcon from "./SkillIcon";
import { allToolsFlat } from "../data/skills";

export default function SkillsMarquee() {
  // duplicate the list so the loop is seamless
  const loop = [...allToolsFlat, ...allToolsFlat];

  return (
    <div className="relative overflow-hidden border-y border-white/[0.06] bg-navy py-5">
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24 bg-gradient-to-r from-navy to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24 bg-gradient-to-l from-navy to-transparent" />
      <div className="marquee-track flex w-max items-center gap-10">
        {loop.map((t, i) => (
          <span
            key={`${t.name}-${i}`}
            className="flex items-center gap-2 whitespace-nowrap text-[0.85rem] font-semibold text-white/80"
          >
            <span className="flex items-center justify-center text-accent">
              <SkillIcon icon={t.icon} size={16} />
            </span>
            {t.name}
            <span className="ml-4 text-accent/50">•</span>
          </span>
        ))}
      </div>
    </div>
  );
}
