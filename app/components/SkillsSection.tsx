"use client";

import { motion } from "framer-motion";
import styles from "./SkillsSection.module.css";

const skillCategories = [
  {
    id: "frontend",
    label: "Frontend",
    accentClass: "accentPrimary" as const,
    skills: [
      { name: "React.js", icon: "⚛️" },
      { name: "Next.js", icon: "▲" },
      { name: "TypeScript", icon: "🔷" },
      { name: "JavaScript (ES6+)", icon: "✨" },
      { name: "HTML5", icon: "🧱" },
      { name: "CSS3", icon: "🎨" },
      { name: "Tailwind CSS", icon: "🌬️" },
    ],
  },
  {
    id: "state",
    label: "State Management",
    accentClass: "accentSecondary" as const,
    skills: [
      { name: "Redux Toolkit", icon: "🔄" },
      { name: "Zustand", icon: "🐻" },
      { name: "React Query", icon: "🔍" },
      { name: "RTK Query", icon: "⚡" },
    ],
  },
  {
    id: "backend",
    label: "Backend",
    accentClass: "accentPrimary" as const,
    skills: [
      { name: "Node.js", icon: "🟢" },
      { name: "Express.js", icon: "🚂" },
      { name: "REST APIs", icon: "🔗" },
      { name: "GraphQL", icon: "◈" },
      { name: "WebSockets", icon: "📡" },
    ],
  },
  {
    id: "devops",
    label: "DevOps & Tools",
    accentClass: "accentSecondary" as const,
    skills: [
      { name: "Git", icon: "🐙" },
      { name: "Docker", icon: "🐳" },
      { name: "AWS", icon: "☁️" },
      { name: "CI/CD", icon: "⚙️" },
      { name: "Webpack", icon: "📦" },
      { name: "Vite", icon: "⚡" },
      { name: "PM2", icon: "🚀" },
    ],
  },
  {
    id: "testing",
    label: "Testing & Quality",
    accentClass: "accentPrimary" as const,
    skills: [
      { name: "Jest", icon: "🃏" },
      { name: "React Testing Library", icon: "🐙" },
      { name: "Cypress", icon: "🌲" },
      { name: "Postman", icon: "🚀" },
      { name: "Storybook", icon: "📖" },
    ],
  },
  {
    id: "architecture",
    label: "Architecture",
    accentClass: "accentSecondary" as const,
    skills: [
      { name: "Component-Driven Dev", icon: "🏗️" },
      { name: "Micro-Frontend", icon: "🧩" },
      { name: "SSR/SSG", icon: "🖼️" },
      { name: "Code Splitting", icon: "✂️" },
      { name: "Lazy Loading", icon: "💤" },
    ],
  },
];

function fadeUp(delay = 0) {
  return {
    initial: { opacity: 0, y: 40 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: "-80px" },
    transition: { duration: 0.6, delay, ease: [0.25, 0.1, 0.25, 1] as [number, number, number, number] },
  };
}

export default function SkillsSection() {
  return (
    <section id="skills" className={styles.section}>
      <div className="section-container">
        {/* Header */}
        <motion.div {...fadeUp()}>
          <p className="section-label">What I know</p>
          <h2 className="section-title">Skills &amp; Technologies</h2>
          <div className="section-divider" />
        </motion.div>

        {/* Category blocks */}
        <div className={styles.categoryStack}>
          {skillCategories.map((cat, catIdx) => (
            <motion.div
              key={cat.id}
              {...fadeUp(0.1 + catIdx * 0.1)}
              className={`${styles.categoryCard} ${styles[cat.accentClass]}`}
            >
              {/* Category header */}
              <div className={styles.categoryHeader}>
                <span className={styles.categoryBadge}>
                  {cat.label}
                </span>
                <span className={styles.categoryCount}>
                  {cat.skills.length} technologies
                </span>
              </div>

              {/* Chips row */}
              <div className={styles.chipsRow}>
                {cat.skills.map((skill, i) => (
                  <motion.div
                    key={skill.name}
                    className={styles.skillChip}
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.3, delay: 0.2 + catIdx * 0.05 + i * 0.04 }}
                    whileHover={{ scale: 1.05, y: -2 }}
                  >
                    <span className={styles.skillIcon}>{skill.icon}</span>
                    {skill.name}
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
