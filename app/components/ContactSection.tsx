"use client";

import { motion } from "framer-motion";
import { Send, MapPin } from "lucide-react";
import { FaGithub, FaLinkedinIn, FaEnvelope } from "react-icons/fa6";
import { useState, FormEvent } from "react";
import styles from "./ContactSection.module.css";

const socialLinks = [
  { label: "GitHub",     href: "https://github.com/vineetsingh0809",      icon: FaGithub,     username: "@vineetsingh0809" },
  { label: "LinkedIn",   href: "https://www.linkedin.com/in/vineet-singh-2001/", icon: FaLinkedinIn, username: "vineet-singh-2001" },
  { label: "Email",      href: "mailto:vineetsingh.dev@gmail.com", icon: FaEnvelope,   username: "vineetsingh.dev@gmail.com" },
];

function fadeUp(delay = 0) {
  return {
    initial: { opacity: 0, y: 40 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: "-80px" },
    transition: { duration: 0.6, delay, ease: [0.25, 0.1, 0.25, 1] as [number, number, number, number] },
  };
}

export default function ContactSection() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [sent, setSent] = useState(false);
  const [sending, setSending] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setSending(true);
    await new Promise((r) => setTimeout(r, 1200));
    setSent(true);
    setSending(false);
  };

  return (
    <section id="contact" className={styles.section}>
      {/* Geometric rings */}
      <div className={styles.geoRing1} />
      <div className={styles.geoRing2} />

      <div className={`section-container ${styles.inner}`}>
        {/* Header */}
        <motion.div {...fadeUp()} className={styles.header}>
          <p className="section-label">Get in touch</p>
          <h2 className="section-title">Let&apos;s Work Together</h2>
          <p className={styles.headerDesc}>
            Have a project in mind or want to collaborate? I&apos;m always open to
            discussing new opportunities — reach out via the form or any of
            the channels below.
          </p>
          <span className={styles.locationChip}>
            <MapPin size={14} className={styles.locationIcon} />
            Gurugram, India — IST (UTC+5:30)
          </span>
        </motion.div>

        {/* Two-column */}
        <div className={styles.grid}>
          {/* Social links */}
          <motion.div {...fadeUp(0.15)}>
            <h3 className={styles.connectTitle}>Connect with me</h3>
            <div className={styles.socialLinks}>
              {socialLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.socialLink}
                >
                  <div className={styles.socialIconBox}>
                    <link.icon size={18} />
                  </div>
                  <div className={styles.socialInfo}>
                    <span className={styles.socialLabel}>{link.label}</span>
                    <span className={styles.socialUsername}>{link.username}</span>
                  </div>
                </a>
              ))}
            </div>
          </motion.div>

          {/* Contact form */}
          <motion.div {...fadeUp(0.25)}>
            <h3 className={styles.formTitle}>Send a message</h3>

            {sent ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className={styles.successBox}
              >
                <div className={styles.successEmoji}>✉️</div>
                <p className={styles.successTitle}>Message Sent!</p>
                <p className={styles.successMsg}>
                  Thanks for reaching out. I&apos;ll get back to you within 24 hours.
                </p>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} noValidate>
                <div className={styles.formFields}>
                  <div>
                    <label htmlFor="contact-name" className={styles.fieldLabel}>Name</label>
                    <input
                      id="contact-name"
                      type="text"
                      required
                      placeholder="Your name"
                      className="form-input"
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                    />
                  </div>
                  <div>
                    <label htmlFor="contact-email" className={styles.fieldLabel}>Email</label>
                    <input
                      id="contact-email"
                      type="email"
                      required
                      placeholder="you@example.com"
                      className="form-input"
                      value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                    />
                  </div>
                  <div>
                    <label htmlFor="contact-message" className={styles.fieldLabel}>Message</label>
                    <textarea
                      id="contact-message"
                      required
                      placeholder="Tell me about your project..."
                      className="form-input form-textarea"
                      rows={5}
                      value={form.message}
                      onChange={(e) => setForm({ ...form, message: e.target.value })}
                    />
                  </div>
                  <button
                    type="submit"
                    id="contact-send-btn"
                    className={`btn btn-filled ripple-container ${styles.sendBtn}`}
                    disabled={sending}
                  >
                    {sending ? (
                      <>
                        <span className={styles.spinner} />
                        Sending...
                      </>
                    ) : (
                      <>
                        <Send size={17} />
                        Send Message
                      </>
                    )}
                  </button>
                </div>
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
