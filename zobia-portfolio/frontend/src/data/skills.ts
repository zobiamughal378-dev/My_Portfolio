export interface SkillItem {
  name: string;
  icon: string;
  big?: boolean;
}

export interface SkillGroup {
  label: string;
  color: string;
  items: SkillItem[];
}

export const skillGroups: SkillGroup[] = [
  {
    label: "Languages",
    color: "#6fd3f0",
    items: [
      { name: "C++", icon: "cplusplus", big: true },
      { name: "C", icon: "c" },
      { name: "Python", icon: "python", big: true },
      { name: "JavaScript", icon: "javascript" },
      { name: "Java", icon: "java", big: true },
      { name: "HTML5", icon: "html5" },
      { name: "CSS3", icon: "css3" },
      { name: "Bash", icon: "bash" },
    ],
  },
  {
    label: "Web & Backend",
    color: "#6fd3f0",
    items: [
      { name: "React", icon: "react", big: true },
      { name: "Node.js", icon: "nodejs", big: true },
      { name: "Express", icon: "express" },
      { name: "REST APIs", icon: "api" },
      { name: "Postman", icon: "postman" },
      { name: "Vite", icon: "vite" },
      { name: "Firebase", icon: "firebase" },
      { name: "Vercel", icon: "vercel" },
    ],
  },
  {
    label: "Database & Systems",
    color: "#4ade80",
    items: [
      { name: "Oracle 12c", icon: "database", big: true },
      { name: "PL/SQL", icon: "database" },
      { name: "PostgreSQL", icon: "postgresql" },
      { name: "MySQL", icon: "mysql" },
      { name: "MongoDB", icon: "mongodb" },
      { name: "SQLite", icon: "sqlite" },
    ],
  },
  {
    label: "AI & Algorithms",
    color: "#a78bfa",
    items: [
      { name: "OpenCV", icon: "opencv", big: true },
      { name: "NumPy", icon: "numpy" },
      { name: "Pandas", icon: "pandas" },
      { name: "TensorFlow", icon: "tensorflow", big: true },
      { name: "PyTorch", icon: "pytorch" },
      { name: "scikit-learn", icon: "sklearn" },
      { name: "BFS / DFS", icon: "sitemap" },
      { name: "A* Search", icon: "route" },
      { name: "Minimax", icon: "chess" },
      { name: "Propositional Logic", icon: "brain" },
      { name: "CSP · Backtracking", icon: "puzzle" },
      { name: "Utility Agents", icon: "robot" },
    ],
  },
  {
    label: "OS · Hardware · Tools",
    color: "#f472b6",
    items: [
      { name: "Linux", icon: "linux", big: true },
      { name: "Ubuntu", icon: "ubuntu" },
      { name: "Git", icon: "git" },
      { name: "GitHub", icon: "github", big: true },
      { name: "VS Code", icon: "vscode" },
      { name: "Arduino", icon: "arduino", big: true },
      { name: "MATLAB", icon: "matlab" },
      { name: "Figma", icon: "figma" },
    ],
  },
];

// Flat list used by the auto-scrolling marquee ticker
export const allToolsFlat: SkillItem[] = skillGroups.flatMap((g) => g.items);
