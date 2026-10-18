/** Friendly floating robot. Clicking it opens the NOVA chat. */
export default function Robot({ className = "" }: { className?: string }) {
  return (
    <button
      type="button"
      onClick={() => window.dispatchEvent(new Event("nova:open"))}
      aria-label="Chat with NOVA, Zobia's AI assistant"
      className={`group relative block ${className}`}
    >
      {/* speech bubble */}
      <span className="absolute -left-2 -top-12 z-10 whitespace-nowrap rounded-2xl rounded-bl-sm bg-white px-3.5 py-2 text-[0.78rem] font-semibold text-bg shadow-xl transition-transform group-hover:scale-105">
        Hi! I'm NOVA <span aria-hidden="true">👋</span>
        <span className="block font-mono text-[0.58rem] font-normal uppercase tracking-widest text-bg/55">ask me anything</span>
      </span>

      <div className="robot-float">
        <svg viewBox="0 0 160 205" className="h-auto w-full overflow-visible" aria-hidden="true">
          <defs>
            <linearGradient id="rb-body" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0" stopColor="#ffffff" />
              <stop offset="1" stopColor="#cfe0ff" />
            </linearGradient>
            <radialGradient id="rb-eye" cx="0.5" cy="0.5" r="0.5">
              <stop offset="0" stopColor="#ffffff" />
              <stop offset="0.45" stopColor="#8be3ff" />
              <stop offset="1" stopColor="#6fd3f0" />
            </radialGradient>
          </defs>

          {/* hover glow under the robot */}
          <ellipse className="robot-jet" cx="80" cy="192" rx="26" ry="5.5" fill="rgba(111,211,240,0.6)" />
          <path d="M70 176 Q80 198 90 176 Z" fill="#ffd77a" opacity="0.85" className="glow-pulse" />

          {/* antenna */}
          <line x1="80" y1="36" x2="80" y2="20" stroke="#cfe0ff" strokeWidth="3" strokeLinecap="round" />
          <circle className="glow-pulse" cx="80" cy="15" r="6" fill="#ff9ec4" style={{ filter: "drop-shadow(0 0 8px #ff9ec4)" }} />

          {/* ears */}
          <rect x="19" y="62" width="11" height="28" rx="5" fill="#ff9ec4" />
          <rect x="130" y="62" width="11" height="28" rx="5" fill="#6fd3f0" />

          {/* head */}
          <rect x="29" y="35" width="102" height="82" rx="28" fill="url(#rb-body)" stroke="#ffffff" strokeWidth="2" />
          <rect x="41" y="48" width="78" height="52" rx="20" fill="#0b1536" />
          <rect x="45" y="52" width="70" height="14" rx="7" fill="rgba(255,255,255,0.08)" />
          {/* eyes */}
          <ellipse className="robot-eye" cx="62" cy="73" rx="7.5" ry="10" fill="url(#rb-eye)" style={{ filter: "drop-shadow(0 0 6px #6fd3f0)" }} />
          <ellipse className="robot-eye" cx="98" cy="73" rx="7.5" ry="10" fill="url(#rb-eye)" style={{ filter: "drop-shadow(0 0 6px #6fd3f0)" }} />
          <path d="M70 90 Q80 97 90 90" stroke="#ff9ec4" strokeWidth="2.6" fill="none" strokeLinecap="round" />
          <ellipse cx="50" cy="86" rx="5" ry="3" fill="#ff9ec4" opacity="0.55" />
          <ellipse cx="110" cy="86" rx="5" ry="3" fill="#ff9ec4" opacity="0.55" />

          {/* body */}
          <rect x="45" y="122" width="70" height="52" rx="22" fill="url(#rb-body)" stroke="#ffffff" strokeWidth="2" />
          <circle cx="80" cy="148" r="9" fill="#ffd77a" className="glow-pulse" style={{ filter: "drop-shadow(0 0 8px #ffd77a)" }} />
          <path d="M76 148 l3 3 l6 -7" stroke="#0b1536" strokeWidth="2.2" fill="none" strokeLinecap="round" strokeLinejoin="round" />
          <rect x="56" y="162" width="48" height="4" rx="2" fill="#cfe0ff" />

          {/* arms */}
          <path d="M46 134 C30 140 28 156 36 164" stroke="#e5eeff" strokeWidth="9" fill="none" strokeLinecap="round" />
          <circle cx="37" cy="165" r="7" fill="#ff9ec4" />
          <g className="robot-wave">
            <path d="M115 134 C132 130 142 114 140 100" stroke="#e5eeff" strokeWidth="9" fill="none" strokeLinecap="round" />
            <circle cx="140" cy="98" r="7.5" fill="#6fd3f0" />
          </g>
        </svg>
      </div>
    </button>
  );
}
