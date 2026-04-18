"use client";

import { motion } from "framer-motion";
import { ArrowDown, ChevronRight, Download } from "lucide-react";
import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import styles from "./HeroSection.module.css";

const ParticleCanvas = dynamic(() => import("./ParticleCanvas"), {
  ssr: false,
});

const roles = [
  "Frontend Engineer",
  "React.js Specialist",
  "Next.js Developer",
  "Full-Stack Developer",
];

function TypewriterText() {
  const [roleIndex, setRoleIndex] = useState(0);
  const [displayed, setDisplayed] = useState("");
  const [deleting, setDeleting] = useState(false);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused) {
      const t = setTimeout(() => setPaused(false), 1500);
      return () => clearTimeout(t);
    }

    const current = roles[roleIndex];
    let t: ReturnType<typeof setTimeout>;

    if (!deleting && displayed.length < current.length) {
      t = setTimeout(
        () => setDisplayed(current.slice(0, displayed.length + 1)),
        70,
      );
    } else if (!deleting && displayed.length === current.length) {
      // Wrap in setTimeout so these aren't synchronous setState calls inside the effect
      t = setTimeout(() => {
        setPaused(true);
        setDeleting(true);
      }, 0);
    } else if (deleting && displayed.length > 0) {
      t = setTimeout(
        () => setDisplayed(current.slice(0, displayed.length - 1)),
        40,
      );
    } else if (deleting && displayed.length === 0) {
      // Same fix — wrap in setTimeout
      t = setTimeout(() => {
        setDeleting(false);
        setRoleIndex((i) => (i + 1) % roles.length);
      }, 0);
    }

    return () => clearTimeout(t);
  }, [displayed, deleting, roleIndex, paused]);

  return (
    <span>
      <span className={styles.typewriterText}>{displayed}</span>
      <span className={styles.typewriterCursor}>|</span>
    </span>
  );
}

export default function HeroSection() {
  const scrollToAbout = () => {
    document.getElementById("about")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section id="hero" className={styles.section}>
      {/* Particle canvas */}
      <ParticleCanvas />

      {/* Geometric decorative circles */}
      <div className={`geo-circle ${styles.geoCircle1}`} />
      <div className={`geo-circle ${styles.geoCircle2}`} />
      <div className={`geo-circle ${styles.geoCircle3}`} />

      {/* Glowing blob (mobile) */}
      <div className={styles.heroBlob} />

      {/* Corner brackets */}
      <div className={styles.cornerTL} />
      <div className={styles.cornerBR} />

      {/* Content */}
      <div className={`section-container ${styles.content}`}>
        <div className={styles.inner}>
          {/* Available badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className={styles.badgeWrap}
          >
            <span className={styles.badge}>
              <span className={styles.badgeDot} />
              Available for opportunities
            </span>
          </motion.div>

          {/* Name */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className={styles.heroName}
          >
            Hi, I&apos;m{" "}
            <span className={styles.nameHighlight}>Vineet Singh</span>
          </motion.h1>

          {/* Typewriter */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.35 }}
            className={styles.typewriterWrap}
          >
            <TypewriterText />
          </motion.div>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.45 }}
            className={styles.description}
          >
            Frontend-focused Software Engineer. I build scalable,
            high-performance web applications with React.js, Next.js, and
            TypeScript. From component-driven architecture to real-time systems
            — I turn complex problems into clean, fast, and beautiful UIs.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.55 }}
            className={styles.ctaRow}
          >
            <a
              href="#projects"
              className={`btn btn-filled ripple-container ${styles.ctaBtn}`}
              id="hero-view-work"
            >
              View Work
              <ChevronRight size={18} />
            </a>
            <a
              href="https://drive.google.com/file/d/1idKM7xtH-6n6T86-Psr5BWT0_A4F4zz0/view?usp=sharing"
              download
              className={`btn btn-outlined ripple-container ${styles.ctaBtn}`}
              id="hero-download-cv"
              target="_blank"
            >
              <Download size={18} />
              Download CV
            </a>
          </motion.div>

          {/* Stats row */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.7 }}
            className={styles.statsRow}
          >
            {[
              { number: "4.6+", label: "Years Experience" },
              { number: "30%", label: "Load Time Reduced" },
              { number: "40%", label: "API Calls Reduced" },
            ].map((stat) => (
              <div key={stat.label}>
                <div className={styles.statNumber}>{stat.number}</div>
                <div className={styles.statLabel}>{stat.label}</div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.button
        onClick={scrollToAbout}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, y: [0, 6, 0] }}
        transition={{
          opacity: { delay: 1.2 },
          y: { duration: 2, repeat: Infinity, ease: "easeInOut" },
        }}
        className={styles.scrollIndicator}
        aria-label="Scroll to about section"
      >
        scroll
        <ArrowDown size={16} />
      </motion.button>
    </section>
  );
}
