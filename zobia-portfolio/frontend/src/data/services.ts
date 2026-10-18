export interface Service {
  icon: string;
  title: string;
  desc: string;
  big?: boolean;
  color1: string;
  color2: string;
}

export const services: Service[] = [
  {
    icon: "🧊",
    title: "3D & Interactive Websites",
    desc: "Immersive, motion-driven sites that feel alive — scroll-triggered animation, interactive elements, and depth that makes a portfolio or product page unforgettable.",
    big: true,
    color1: "#00d4ff",
    color2: "#1a6cf5",
  },
  {
    icon: "🤖",
    title: "AI-powered Web Experiences",
    desc: "Chat interfaces, AI image tools, and smart features baked directly into the product — not bolted on as an afterthought.",
    big: true,
    color1: "#b79cff",
    color2: "#f72585",
  },
  {
    icon: "🎨",
    title: "Modern Web Design & Development",
    desc: "Clean, current, on-brand — from first mockup to shipped site.",
    color1: "#f472b6",
    color2: "#fb923c",
  },
  {
    icon: "✨",
    title: "Creative UI/UX & Animations",
    desc: "Micro-interactions and motion that guide the eye, not distract it.",
    color1: "#facc15",
    color2: "#f97316",
  },
  {
    icon: "⚛️",
    title: "React / Next.js Development",
    desc: "Component-driven, type-safe, production-grade frontend architecture.",
    color1: "#60a5fa",
    color2: "#00d4ff",
  },
  {
    icon: "🧩",
    title: "Custom Web Applications",
    desc: "Dashboards, internal tools, and full products built to your exact spec.",
    color1: "#34d399",
    color2: "#059669",
  },
  {
    icon: "🗄️",
    title: "Backend & API Development",
    desc: "Node/Express services, REST APIs, and SQL/Firebase-backed data layers.",
    color1: "#4ade80",
    color2: "#00d4ff",
  },
  {
    icon: "📱",
    title: "Mobile Applications",
    desc: "Responsive-first builds and cross-platform app experiences.",
    color1: "#a78bfa",
    color2: "#60a5fa",
  },
];
