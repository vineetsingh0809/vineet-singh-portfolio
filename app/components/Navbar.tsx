"use client";

import { Menu, Terminal, X } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import styles from "./Navbar.module.css";

const navItems = [
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Projects", href: "#projects" },
  { label: "Experience", href: "#experience" },
  { label: "Education", href: "#education" },
  { label: "Contact", href: "#contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
  }, [menuOpen]);

  const toggleMenu = () => setMenuOpen(!menuOpen);
  const closeMenu = () => setMenuOpen(false);

  return (
    <>
      <nav className={`${styles.navbar} ${scrolled ? styles.scrolled : ""}`}>
        <div className="section-container">
          <div className={styles.inner}>
            {/* Logo */}
            <Link href="#hero" className={styles.logo} onClick={closeMenu}>
              <div className={styles.logoIcon}>
                <Terminal size={18} />
              </div>
              <span className={styles.logoText}>
                vs<span className={styles.logoDot}>.</span>dev
              </span>
            </Link>

            {/* Desktop Nav */}
            <div className={styles.desktopNav}>
              {navItems.map((item) => (
                <a key={item.href} href={item.href} className="nav-link">
                  {item.label}
                </a>
              ))}
              <a
                href="#contact"
                className={`btn btn-filled ripple-container ${styles.navAction}`}
              >
                Let&apos;s Talk
              </a>
            </div>

            {/* Mobile Toggle */}
            <button
              className={styles.mobileToggle}
              onClick={toggleMenu}
              aria-label="Toggle menu"
            >
              {menuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </nav>

      {/* Full-screen overlay menu */}
      {menuOpen && (
        <div className={styles.mobileOverlay}>
          <nav className={styles.mobileNav}>
            {navItems.map((item, i) => (
              <a
                key={item.href}
                href={item.href}
                onClick={closeMenu}
                className={`${styles.mobileNavLink} ${i % 2 === 0 ? styles.mobileNavPrimary : styles.mobileNavSecondary}`}
                style={{ animationDelay: `${0.1 + i * 0.1}s` }}
              >
                {item.label}
              </a>
            ))}
            <div className={styles.mobileNavAccent}>
              <a
                href="#contact"
                onClick={closeMenu}
                className="btn btn-filled ripple-container"
              >
                Let&apos;s Talk
              </a>
            </div>
          </nav>
        </div>
      )}
    </>
  );
}
