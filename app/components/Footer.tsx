"use client";

import { Terminal, ArrowUp } from "lucide-react";
import { FaGithub, FaLinkedinIn, FaXTwitter } from "react-icons/fa6";
import styles from "./Footer.module.css";

export default function Footer() {
  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });
  const year = new Date().getFullYear();

  return (
    <footer className={styles.footer}>
      <div className="section-container">
        <div className={styles.inner}>
          {/* Logo + copyright */}
          <div className={styles.logoGroup}>
            <div className={styles.logoIcon}>
              <Terminal size={15} />
            </div>
            <span className={styles.copyright}>
              © {year}{" "}
              <span className={styles.copyrightName}>Vineet Singh</span>{" "}
              · Crafted with{" "}
              <span className={styles.copyrightHeart}>♥</span> &amp; Next.js
            </span>
          </div>

          {/* Social icons */}
          <div className={styles.socialRow}>
            {[
              { href: "https://github.com/vineetsingh0809",   icon: FaGithub,     label: "GitHub" },
              { href: "https://www.linkedin.com/in/vineet-singh-2001/", icon: FaLinkedinIn,  label: "LinkedIn" },
              { href: "https://twitter.com/CypheR_0809",  icon: FaXTwitter,    label: "Twitter" },
            ].map(({ href, icon: Icon, label }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className={`icon-btn ${styles.socialBtn}`}
                aria-label={label}
              >
                <Icon size={15} />
              </a>
            ))}

            {/* Scroll to top FAB */}
            <button
              onClick={scrollToTop}
              className={`icon-btn ripple-container ${styles.scrollTopBtn}`}
              aria-label="Scroll to top"
            >
              <ArrowUp size={15} />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
