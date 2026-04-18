"use client";

import { motion } from "framer-motion";
import { ExternalLink, Star } from "lucide-react";
import Image from "next/image";
import { FaGithub } from "react-icons/fa6";
import styles from "./ProjectsSection.module.css";

const projects = [
  {
    id: "ggbit",
    featured: true,
    title: "CSGO-Inspired Virtual Betting Web App",
    description:
      "A real-time full-stack betting platform with wallet system and game logic. Built with WebSockets for live interactions, scalable Next.js frontend with clean architecture.",
    image:
      "https://placehold.co/1200x400/18181B/6366F1?text=GGBit+App&font=montserrat",
    tags: ["Next.js", "TypeScript", "WebSockets", "Real-time"],
    github: "https://github.com/vineetsingh0809",
    demo: "https://csgoempire.com/",
    stars: 124,
  },
  {
    id: "netsentinel",
    featured: false,
    title: "NetSentinel AI",
    description:
      "An AI-based network monitoring system with real-time analytics and anomaly detection, improving system efficiency through data-driven insights.",
    image:
      "https://placehold.co/600x340/18181B/10B981?text=NetSentinel+AI&font=montserrat",
    tags: ["AI", "React.js", "Real-time Analytics", "Network Monitoring"],
    github: "https://github.com/vineetsingh0809",
    demo: "https://netainms.xyz",
    stars: 86,
  },
  {
    id: "hrwave",
    featured: false,
    title: "HRWave Codex — Advanced HRMS",
    description:
      "A comprehensive Human Resource Management System featuring employee onboarding, payroll management, and performance tracking with a clean, intuitive dashboard.",
    image:
      "https://placehold.co/600x340/18181B/6366F1?text=HRWave+Codex&font=montserrat",
    tags: ["React.js", "Node.js", "HRMS", "Dashboard"],
    github: "https://github.com/vineetsingh0809",
    demo: "https://hrwavecodex.in/",
    stars: 94,
  },
  {
    id: "aqualux",
    featured: false,
    title: "AquaLux Bathware — Premium E-commerce",
    description:
      "A premium e-commerce platform for high-end bathware and sanitaryware. Features a modern UI with categorized product catalogs and responsive design.",
    image:
      "https://placehold.co/600x340/18181B/10B981?text=AquaLux+Bathware&font=montserrat",
    tags: ["Next.js", "React.js", "Tailwind CSS", "Premium UI"],
    github: "https://github.com/vineetsingh0809",
    demo: "https://aqua-lux-bathware.vercel.app/",
    stars: 108,
  },
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

export default function ProjectsSection() {
  const featured = projects.find((p) => p.featured);
  const grid = projects.filter((p) => !p.featured);

  return (
    <section id="projects" className={styles.section}>
      <div className="section-container">
        {/* Header */}
        <motion.div {...fadeUp()}>
          <p className="section-label">What I&apos;ve built</p>
          <h2 className="section-title">Projects</h2>
          <div className="section-divider" />
        </motion.div>

        {/* Featured Project */}
        {featured && (
          <motion.div
            {...fadeUp(0.1)}
            className={`card ${styles.featuredCard}`}
          >
            <div className={styles.featuredImageWrap}>
              <Image
                src={featured.image}
                alt={featured.title}
                fill
                sizes="(max-width: 768px) 100vw, 1200px"
                style={{ objectFit: "cover" }}
              />
              <div className={styles.featuredBadge}>
                <Star size={12} fill="currentColor" />
                Featured Project
              </div>
            </div>

            <div className={styles.featuredContent}>
              <h3 className={styles.featuredTitle}>{featured.title}</h3>
              <p className={styles.featuredDesc}>{featured.description}</p>

              <div className={styles.featuredTags}>
                {featured.tags.map((tag) => (
                  <span key={tag} className={styles.featuredTag}>
                    {tag}
                  </span>
                ))}
              </div>

              <div className={styles.featuredActions}>
                <a
                  href={featured.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`icon-btn ${styles.codeBtn}`}
                  aria-label="View GitHub repository"
                >
                  <FaGithub size={16} />
                  <span>Code</span>
                </a>
                <a
                  href={featured.demo}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`btn btn-filled ${styles.demoBtn}`}
                  aria-label="View live demo"
                >
                  <ExternalLink size={15} />
                  Live Demo
                </a>
                <span className={styles.starCount}>
                  <Star size={14} />
                  {featured.stars}
                </span>
              </div>
            </div>
          </motion.div>
        )}

        {/* 3-column grid */}
        <div className={styles.grid}>
          {grid.map((project, i) => (
            <motion.div
              key={project.id}
              className={`card ${styles.projectCard}`}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.55, delay: 0.1 + i * 0.1 }}
            >
              <div className={styles.projectImageWrap}>
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  sizes="(max-width: 768px) 100vw, 400px"
                  style={{ objectFit: "cover" }}
                />
              </div>

              <div className={styles.projectContent}>
                <h3 className={styles.projectTitle}>{project.title}</h3>
                <p className={styles.projectDesc}>{project.description}</p>

                <div className={styles.projectTags}>
                  {project.tags.slice(0, 3).map((tag) => (
                    <span key={tag} className={styles.projectTag}>
                      {tag}
                    </span>
                  ))}
                  {project.tags.length > 3 && (
                    <span className={styles.projectTag}>
                      +{project.tags.length - 3}
                    </span>
                  )}
                </div>

                <div className={styles.projectActions}>
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="icon-btn"
                    aria-label={`GitHub repository for ${project.title}`}
                  >
                    <FaGithub size={16} />
                  </a>
                  <a
                    href={project.demo}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="icon-btn"
                    aria-label={`Live demo for ${project.title}`}
                  >
                    <ExternalLink size={16} />
                  </a>
                  <span className={styles.projectStarCount}>
                    <Star size={13} />
                    {project.stars}
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* View all */}
        <motion.div {...fadeUp(0.4)} className={styles.viewAllWrap}>
          <a
            href="https://github.com/vineetsingh0809"
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-outlined ripple-container"
          >
            <FaGithub size={18} />
            View All on GitHub
          </a>
        </motion.div>
      </div>
    </section>
  );
}
