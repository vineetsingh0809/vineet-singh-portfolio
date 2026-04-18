"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Menu, Moon, Sun, Terminal, X } from "lucide-react";
import Link from "next/link";
import { useTheme } from "next-themes";
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

function ThemeToggle({ className }: { className?: string }) {
  const { resolvedTheme, theme, setTheme } = useTheme();
  const activeTheme = resolvedTheme ?? theme ?? "dark";
  const isDark = activeTheme !== "light";

  return (
    <button
      type="button"
      className={`${styles.themeToggle} ${className ?? ""}`}
      onClick={() => setTheme(isDark ? "light" : "dark")}
      aria-label={isDark ? "Switch to light theme" : "Switch to dark theme"}
      aria-pressed={!isDark}
    >
      <AnimatePresence mode="wait" initial={false}>
        <motion.span
          key={isDark ? "dark" : "light"}
          className={styles.themeIconWrap}
          initial={{ rotate: 0, opacity: 0 }}
          animate={{ rotate: 180, opacity: 1 }}
          exit={{ rotate: -180, opacity: 0 }}
          transition={{ duration: 0.35, ease: "easeOut" }}
        >
          {isDark ? <Sun size={18} /> : <Moon size={18} />}
        </motion.span>
      </AnimatePresence>
    </button>
  );
}

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
              <ThemeToggle className={styles.desktopThemeToggle} />
              <a
                href="#contact"
                className={`btn btn-filled ripple-container ${styles.navAction}`}
              >
                Let&apos;s Talk
              </a>
            </div>

            {/* Mobile actions */}
            <div className={styles.mobileActions}>
              <ThemeToggle className={styles.mobileThemeToggle} />
              <button
                type="button"
                className={styles.mobileToggle}
                onClick={toggleMenu}
                aria-label="Toggle menu"
                aria-expanded={menuOpen}
              >
                {menuOpen ? <X size={20} /> : <Menu size={20} />}
              </button>
            </div>
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
