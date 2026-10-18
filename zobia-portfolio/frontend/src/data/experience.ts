export interface ExperienceItem {
  year: string;
  role: string;
  org: string;
  desc: string;
  icon: string;
}

export const experience: ExperienceItem[] = [
  {
    year: "Jun–Aug 2026",
    role: "Full Stack Developer Intern (Onsite)",
    org: "Hadi Textile Mills — IT Department · Supervisor: Zahid Sarfraz (Senior Software Developer)",
    desc: "Built a Cloud File Manager, a Netflix-style streaming UI (Reelix), a Weather App, a Feedback Hub clone, a Stopwatch, and a Calculator. Worked with Oracle 12c PL/SQL Developer for database logic and tested REST APIs using Postman. Also produced a multi-part corporate profile video using ffmpeg and AI voiceovers.",
    icon: "💼",
  },
  {
    year: "2026",
    role: "Graphic Head",
    org: "Amnesty International FAST Chapter",
    desc: "Leading graphic design and visual communication for the Amnesty International campus chapter at FAST-NUCES — campaign materials, event posters, and social media content.",
    icon: "🎨",
  },
  {
    year: "2026",
    role: "Vibe-a-thon Participant",
    org: "Google Developer Group — FAST NUCES CFD",
    desc: "Built innovative prototypes using Google AI Studio as part of the Vibe-a-thon — hands-on practice with AI-assisted rapid app building.",
    icon: "✨",
  },
  {
    year: "2026",
    role: "AI Hackathon Participant",
    org: "Build with AI — GDGoC FAST-NUCES Chiniot",
    desc: "Participated in an AI-focused hackathon, building and presenting an AI-based solution under competition conditions.",
    icon: "🤖",
  },
  {
    year: "2025",
    role: "ICPC Contestant — Fast Syntax Syndicate",
    org: "ICPC Asia-Topi Online Preliminary Contest · GIK Institute (representing NU-CFC)",
    desc: "Competed as a team in the ICPC Asia-Topi preliminary — solved algorithmic problems in graph theory, DP, and data structures under contest time pressure.",
    icon: "🏆",
  },
];
