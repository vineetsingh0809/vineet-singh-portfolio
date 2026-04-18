"use client";

import { motion, useInView } from "framer-motion";
import { Award, Coffee, Globe, User } from "lucide-react";
import { useRef } from "react";
import styles from "./AboutSection.module.css";

const techStack = [
  "React.js",
  "Next.js",
  "TypeScript",
  "JavaScript",
  "Redux Toolkit",
  "Zustand",
  "React Query",
  "Node.js",
  "Express.js",
  "Tailwind CSS",
  "WebSockets",
  "GraphQL",
  "Git",
  "Docker",
  "AWS",
];

const stats = [
  { icon: Award, value: "4.6+", label: "Years Exp." },
  { icon: Globe, value: "30%", label: "Load Opt." },
  { icon: Coffee, value: "40%", label: "API Opt." },
  { icon: User, value: "5K+", label: "Users Served" },
];

function fadeUp(delay = 0) {
  return {
    initial: { opacity: 0, y: 40 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: "-80px" },
    transition: {
      duration: 0.6,
      delay,
      ease: [0.25, 0.1, 0.25, 1] as [number, number, number, number],
    },
  };
}

export default function AboutSection() {
  const ref = useRef(null);
  useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="about" ref={ref} className={styles.section}>
      <div className="section-container">
        {/* Header */}
        <motion.div {...fadeUp()}>
          <p className="section-label">Who I am</p>
          <h2 className="section-title">About Me</h2>
          <div className="section-divider" />
        </motion.div>

        {/* Two-column layout */}
        <div className={styles.grid}>
          {/* Left: Avatar */}
          <motion.div {...fadeUp(0.1)} className={styles.avatarWrap}>
            <div className={styles.avatarOuter}>
              <div className={styles.outerRing} />
              <div className={styles.innerRing} />

              <div className={styles.avatarCircle}>
                <div className={styles.avatarInner}>
                  <span className={styles.avatarInitials}>VS</span>
                  <span className={styles.avatarMono}>&lt;frontend /&gt;</span>
                </div>
              </div>

              <div className={styles.avatarBadge}>Open to work ✦</div>
            </div>
          </motion.div>

          {/* Right: Bio + Chips */}
          <div>
            <motion.div {...fadeUp(0.15)}>
              <h3 className={styles.bioHeading}>
                Engineering Scalable UIs with Precision.
              </h3>
            </motion.div>

            <motion.div {...fadeUp(0.2)}>
              <p className={styles.bioPara}>
                Frontend-focused Software Engineer with 4.6+ years of experience
                building scalable, high-performance web applications using
                React.js, Next.js, and TypeScript. Expertise in
                component-driven architecture, advanced state management, and
                performance optimization.
              </p>
              <p className={`${styles.bioPara} ${styles.bioParaLast}`}>
                Proven track record of developing real-time applications and
                improving user experience at scale. Currently based in{" "}
                <span className={styles.locationAccent}>Gurugram, India 🇮🇳</span>.
              </p>
            </motion.div>

            {/* Tech Stack Chips */}
            <motion.div {...fadeUp(0.25)}>
              <p className={styles.techLabel}>Tech I work with</p>
              <div className={styles.chipsWrap}>
                {techStack.map((tech, i) => (
                  <motion.span
                    key={tech}
                    className="chip"
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.3, delay: 0.3 + i * 0.04 }}
                  >
                    {tech}
                  </motion.span>
                ))}
              </div>
            </motion.div>
          </div>
        </div>

        {/* Stat cards */}
        <motion.div {...fadeUp(0.3)} className={styles.statsGrid}>
          {stats.map(({ icon: Icon, value, label }, i) => (
            <motion.div
              key={label}
              className="stat-card"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.4 + i * 0.1 }}
            >
              <Icon size={24} className={styles.statIcon} />
              <div className={styles.statValue}>{value}</div>
              <div className={styles.statLabel}>{label}</div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
