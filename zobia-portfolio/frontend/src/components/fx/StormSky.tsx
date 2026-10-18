import { useEffect, useState } from "react";

const CYCLE = 9000;
const RED_AT = 0.86;
const RED_HOLD = 1300;

const BirdGlyph = ({ size = 22, tint = "#1c2536" }: { size?: number; tint?: string }) => (
  <svg width={size} height={size * 0.6} viewBox="0 0 40 24" aria-hidden="true">
    <g className="bird-flap">
      <path d="M20 12 Q12 2 2 4 Q12 10 20 13 Z" fill={tint} />
      <path d="M20 12 Q28 2 38 4 Q28 10 20 13 Z" fill={tint} />
      <ellipse cx="20" cy="13.5" rx="4.5" ry="2.4" fill={tint} />
    </g>
  </svg>
);

const ButterflyGlyph = ({ size = 18 }: { size?: number }) => (
  <svg width={size} height={size * 0.8} viewBox="0 0 32 26" aria-hidden="true">
    <g className="butterfly-wing-l">
      <path d="M15 13 Q2 0 3 10 Q3 20 15 15 Z" fill="#ff7ab8" opacity="0.95" />
    </g>
    <g className="butterfly-wing-r">
      <path d="M17 13 Q30 0 29 10 Q29 20 17 15 Z" fill="#ff9ecb" opacity="0.95" />
    </g>
    <rect x="15" y="7" width="2" height="12" rx="1" fill="#2a1a2e" />
  </svg>
);

/**
 * StormSky — two quiet, fixed corner elements that never sit over content:
 * - bottom-left: Zobia's own photo, gently floating (animated)
 * - top-right: a real eagle, clearly bobbing/flying then perching still, plus a golden -> red color pulse
 */
export const StormSky = () => {
  const [redPhase, setRedPhase] = useState(false);

  useEffect(() => {
    let alive = true;
    let redTimeout: ReturnType<typeof setTimeout>;

    const schedule = () =>
      setTimeout(() => {
        if (!alive) return;
        setRedPhase(true);
        redTimeout = setTimeout(() => {
          if (!alive) return;
          setRedPhase(false);
          schedule();
        }, RED_HOLD);
      }, CYCLE * RED_AT);

    schedule();
    return () => {
      alive = false;
      clearTimeout(redTimeout);
    };
  }, []);

  return (
    <div className="fixed inset-0 z-[60] pointer-events-none overflow-hidden" aria-hidden="true">
      {/* Zobia's own photo: fixed bottom-left, gently floating */}
      <div className="self-float absolute bottom-2 left-2 h-[80px] w-[64px] sm:bottom-4 sm:left-4 sm:h-[150px] sm:w-[120px] lg:h-[190px] lg:w-[152px]">
        <img
          src="/photo/zobia.jpg"
          alt=""
          draggable="false"
          className="h-full w-full select-none rounded-2xl object-cover shadow-[0_0_28px_rgba(111,211,240,0.35)]"
          style={{ filter: "grayscale(0.15) contrast(1.08)" }}
        />
      </div>

      {/* Real eagle: clearly flies/bobs, then descends and perches still, then takes off again */}
      <div className="eagle-perch absolute right-2 top-[70px] h-[80px] w-[104px] sm:right-4 sm:top-[92px] sm:h-[120px] sm:w-[156px] lg:h-[150px] lg:w-[195px]">
        <img
          src="/eagle/eagle-real.png"
          alt=""
          draggable="false"
          className={`eagle-img h-full w-full select-none object-contain will-change-transform ${
            redPhase ? "eagle-red-img" : ""
          }`}
        />
      </div>

      {/* birds & butterflies drifting across, well clear of both corners */}
      {[
        { top: "38%", dur: "26s", delay: "-5s", kind: "bird" },
        { top: "58%", dur: "22s", delay: "-11s", kind: "butterfly" },
      ].map((c, i) => (
        <div
          key={i}
          className="bird absolute"
          style={{ top: c.top, animationDuration: c.dur, animationDelay: c.delay }}
        >
          {c.kind === "bird" ? (
            <BirdGlyph size={20 + (i % 3) * 4} />
          ) : (
            <ButterflyGlyph size={16 + (i % 2) * 5} />
          )}
        </div>
      ))}
    </div>
  );
};

export default StormSky;
