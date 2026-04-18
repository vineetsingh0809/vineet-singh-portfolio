"use client";

import { motion } from "framer-motion";
import styles from "./ExperienceSection.module.css";

interface Job {
  company: string;
  role: string;
  period: string;
  location: string;
  description: string[];
  tech: string[];
}

const experience: Job[] = [
  {
    company: "AIS Technolabs Pvt Ltd",
    role: "Software Engineer",
    period: "Sep 2024 – Present",
    location: "Gurugram, India",
    description: [
      "Architected frontend of high-concurrency real-time apps including virtual betting platform and network monitoring dashboard",
      "Built dynamic dashboards improving decision-making speed by 25%",
      "Optimized performance via code splitting & lazy loading — 30% reduction in load times",
      "Reduced redundant API calls by 40% using Zustand & React Query",
    ],
    tech: ["React.js", "Next.js", "TypeScript", "Zustand", "React Query", "WebSockets"],
  },
  {
    company: "Freelance Frontend Developer",
    role: "Freelance Frontend Developer",
    period: "May 2024 – Aug 2024",
    location: "Remote",
    description: [
      "Built real-time betting platform UIs with React.js & Next.js",
      "Implemented WebSocket live updates reducing data latency by 45%",
      "Reduced redundant API calls by 35%",
    ],
    tech: ["React.js", "Next.js", "WebSockets", "TypeScript", "Tailwind CSS"],
  },
  {
    company: "AddWeb Solution Pvt Ltd",
    role: "Associate Software Engineer",
    period: "Sep 2022 – Apr 2024",
    location: "Ahmedabad, India",
    description: [
      "Built scalable e-commerce platform serving 5K+ users",
      "Developed interactive 3D shopping experience with React Native + Node.js",
    ],
    tech: ["React Native", "Node.js", "React.js", "Express.js", "MongoDB"],
  },
  {
    company: "MS Sales (Remote)",
    role: "React JS Developer",
    period: "Sep 2021 – Sep 2022",
    location: "Remote",
    description: [
      "Developed responsive product showcase with React.js",
      "Deployed on Vercel with reusable component architecture",
    ],
    tech: ["React.js", "Vercel", "JavaScript", "HTML5", "CSS3"],
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

function TimelineCard({ job }: { job: Job }) {
  return (
    <div className={styles.card}>
      <div className={styles.cardTopBar} />

      <div className={styles.cardHeader}>
        <h3 className={styles.cardRole}>{job.role}</h3>
        <div className={styles.cardMeta}>
          <span className={styles.cardCompany}>{job.company}</span>
          <span className={styles.cardSep}>·</span>
          <span className={styles.cardPeriod}>{job.period}</span>
        </div>
        <span className={styles.cardLocation}>📍 {job.location}</span>
      </div>

      <ul className={styles.bulletList}>
        {job.description.map((point, i) => (
          <li key={i} className={styles.bullet}>
            <span className={styles.bulletDot} />
            {point}
          </li>
        ))}
      </ul>

      <div className={styles.techChips}>
        {job.tech.map((t) => (
          <span key={t} className={styles.techChip}>{t}</span>
        ))}
      </div>
    </div>
  );
}

export default function ExperienceSection() {
  return (
    <section id="experience" className={styles.section}>
      <div className="section-container">
        {/* Header */}
        <motion.div {...fadeUp()}>
          <p className="section-label">Where I&apos;ve worked</p>
          <h2 className="section-title">Experience</h2>
          <div className="section-divider" />
        </motion.div>

        {/* Timeline */}
        <div className={styles.timelineWrap}>
          {/* Desktop vertical line */}
          <div className="timeline-line" />

          {experience.map((job, i) => {
            const isLeft = i % 2 === 0;
            return (
              <div key={job.company} className={styles.entryRow}>
                {/* Left side */}
                {isLeft ? (
                  <motion.div
                    className={styles.cardLeft}
                    initial={{ opacity: 0, x: -40 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: "-60px" }}
                    transition={{ duration: 0.6, delay: 0.1 + i * 0.1 }}
                  >
                    <TimelineCard job={job} />
                  </motion.div>
                ) : (
                  <div className={styles.entrySpacer} />
                )}

                {/* Center dot */}
                <div className={styles.dotCol}>
                  <div className={`timeline-dot ${i % 2 === 1 ? "timeline-dot-cyan" : ""}`} />
                  {i < experience.length - 1 && (
                    <div className={styles.connector} />
                  )}
                </div>

                {/* Right side */}
                {!isLeft ? (
                  <motion.div
                    className={styles.cardRight}
                    initial={{ opacity: 0, x: 40 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: "-60px" }}
                    transition={{ duration: 0.6, delay: 0.1 + i * 0.1 }}
                  >
                    <TimelineCard job={job} />
                  </motion.div>
                ) : (
                  <div className={styles.entrySpacer} />
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
