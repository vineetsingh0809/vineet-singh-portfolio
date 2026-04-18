"use client";
import { motion } from "framer-motion";
import { GraduationCap, Calendar, MapPin, Award } from "lucide-react";
import styles from "./EducationSection.module.css";

function fadeUp(delay = 0) {
  return {
    initial: { opacity: 0, y: 40 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: "-80px" },
    transition: { duration: 0.6, delay, ease: [0.25, 0.1, 0.25, 1] as [number, number, number, number] },
  };
}

export default function EducationSection() {
  return (
    <section id="education" className={styles.section}>
      <div className="section-container">
        {/* Header */}
        <motion.div {...fadeUp()}>
          <p className="section-label">Academic Background</p>
          <h2 className="section-title">Education</h2>
          <div className="section-divider" />
        </motion.div>

        <div className={styles.inner}>
          <div className={styles.educationGrid}>
            <motion.div 
              {...fadeUp(0.1)}
              className={styles.eduCard}
            >
              <div className={styles.iconBox}>
                <GraduationCap size={32} />
              </div>
              
              <div className={styles.content}>
                <h3 className={styles.degree}>B.Tech in Computer Science</h3>
                <p className={styles.university}>Gujarat Technological University</p>
                
                <div className={styles.meta}>
                  <span className={styles.metaItem}>
                    <Calendar size={14} style={{ marginRight: '6px', verticalAlign: 'middle' }} />
                    July 2018 – July 2022
                  </span>
                  <span className={styles.sep} />
                  <span className={styles.metaItem}>
                    <MapPin size={14} style={{ marginRight: '6px', verticalAlign: 'middle' }} />
                    Gujarat, India
                  </span>
                </div>

                <div className={styles.cgpaWrap}>
                  <Award size={18} className={styles.cgpaIcon} />
                  <span className={styles.cgpaLabel}>CGPA:</span>
                  <span className={styles.cgpaValue}>8.2 / 10</span>
                </div>

                <div className={styles.subjectsWrap}>
                  <p className={styles.subjectsLabel}>Relevant Coursework:</p>
                  <div className={styles.subjectsGrid}>
                    {[
                      "Data Structures",
                      "Algorithms",
                      "Web Technologies",
                      "Database Management",
                      "Operating Systems",
                      "Computer Networks",
                    ].map((subject) => (
                      <span key={subject} className={styles.subjectTag}>
                        {subject}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
