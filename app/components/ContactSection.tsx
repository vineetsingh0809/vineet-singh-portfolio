"use client";

import { motion } from "framer-motion";
import {
  AlertCircle,
  CheckCircle2,
  MapPin,
  Send,
  LoaderCircle,
} from "lucide-react";
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

type FormState = {
  name: string;
  email: string;
  message: string;
};

type FormErrors = Partial<Record<keyof FormState, string>>;

function validateForm(form: FormState): FormErrors {
  const errors: FormErrors = {};
  const name = form.name.trim();
  const email = form.email.trim();
  const message = form.message.trim();

  if (!name) {
    errors.name = "Name is required.";
  } else if (name.length < 2) {
    errors.name = "Name should be at least 2 characters.";
  }

  if (!email) {
    errors.email = "Email is required.";
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    errors.email = "Please enter a valid email address.";
  }

  if (!message) {
    errors.message = "Message is required.";
  } else if (message.length < 10) {
    errors.message = "Message should be at least 10 characters.";
  }

  return errors;
}

export default function ContactSection() {
  const [form, setForm] = useState<FormState>({
    name: "",
    email: "",
    message: "",
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">(
    "idle",
  );
  const [submitError, setSubmitError] = useState("");

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    const nextErrors = validateForm(form);
    setErrors(nextErrors);

    if (Object.keys(nextErrors).length > 0) {
      setStatus("error");
      setSubmitError("Please fix the highlighted fields.");
      return;
    }

    setStatus("loading");
    setSubmitError("");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      const data = (await response.json()) as {
        success?: boolean;
        message?: string;
        errors?: FormErrors;
        error?: string;
      };

      if (!response.ok || !data.success) {
        if (data.errors) {
          setErrors(data.errors);
        }
        setStatus("error");
        setSubmitError(
          data.error ?? data.message ?? "Unable to send your message right now.",
        );
        return;
      }

      setStatus("success");
      setForm({ name: "", email: "", message: "" });
      setErrors({});
    } catch {
      setStatus("error");
      setSubmitError("Unable to send your message right now.");
    }
  };

  const handleChange = (field: keyof FormState, value: string) => {
    setForm((current) => ({ ...current, [field]: value }));
    if (errors[field]) {
      setErrors((current) => {
        const next = { ...current };
        delete next[field];
        return next;
      });
    }
    if (submitError) {
      setSubmitError("");
    }
    if (status === "error") {
      setStatus("idle");
    }
  };

  const resetForm = () => {
    setForm({ name: "", email: "", message: "" });
    setErrors({});
    setSubmitError("");
    setStatus("idle");
  };

  const isLoading = status === "loading";
  const isSuccess = status === "success";

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

            {isSuccess ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.85 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.35 }}
                className={styles.successBox}
              >
                <div className={styles.successEmoji}>
                  <CheckCircle2 size={54} />
                </div>
                <p className={styles.successTitle}>Message sent!</p>
                <p className={styles.successMsg}>
                  I&apos;ll get back to you within 24 hours.
                </p>
                <button
                  type="button"
                  className={`btn btn-filled ripple-container ${styles.successResetBtn}`}
                  onClick={resetForm}
                >
                  Send another message
                </button>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} noValidate aria-busy={isLoading}>
                <div className={styles.formFields}>
                  <div>
                    <label htmlFor="contact-name" className={styles.fieldLabel}>Name</label>
                    <input
                      id="contact-name"
                      type="text"
                      required
                      minLength={2}
                      placeholder="Your name"
                      className={`form-input ${errors.name ? styles.inputError : ""}`}
                      value={form.name}
                      onChange={(e) => handleChange("name", e.target.value)}
                      disabled={isLoading}
                      aria-invalid={Boolean(errors.name)}
                      aria-describedby={errors.name ? "contact-name-error" : undefined}
                    />
                    {errors.name && (
                      <p id="contact-name-error" className={styles.fieldError}>
                        <AlertCircle size={14} />
                        {errors.name}
                      </p>
                    )}
                  </div>
                  <div>
                    <label htmlFor="contact-email" className={styles.fieldLabel}>Email</label>
                    <input
                      id="contact-email"
                      type="email"
                      required
                      placeholder="you@example.com"
                      className={`form-input ${errors.email ? styles.inputError : ""}`}
                      value={form.email}
                      onChange={(e) => handleChange("email", e.target.value)}
                      disabled={isLoading}
                      aria-invalid={Boolean(errors.email)}
                      aria-describedby={errors.email ? "contact-email-error" : undefined}
                    />
                    {errors.email && (
                      <p id="contact-email-error" className={styles.fieldError}>
                        <AlertCircle size={14} />
                        {errors.email}
                      </p>
                    )}
                  </div>
                  <div>
                    <label htmlFor="contact-message" className={styles.fieldLabel}>Message</label>
                    <textarea
                      id="contact-message"
                      required
                      minLength={10}
                      placeholder="Tell me about your project..."
                      className={`form-input form-textarea ${errors.message ? styles.inputError : ""}`}
                      rows={5}
                      value={form.message}
                      onChange={(e) => handleChange("message", e.target.value)}
                      disabled={isLoading}
                      aria-invalid={Boolean(errors.message)}
                      aria-describedby={errors.message ? "contact-message-error" : undefined}
                    />
                    {errors.message && (
                      <p id="contact-message-error" className={styles.fieldError}>
                        <AlertCircle size={14} />
                        {errors.message}
                      </p>
                    )}
                  </div>
                  {submitError && (
                    <p className={styles.formError} role="alert">
                      <AlertCircle size={16} />
                      {submitError}
                    </p>
                  )}
                  <button
                    type="submit"
                    id="contact-send-btn"
                    className={`btn btn-filled ripple-container ${styles.sendBtn}`}
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <>
                        <LoaderCircle size={17} className={styles.spinnerIcon} />
                        Sending...
                      </>
                    ) : status === "error" ? (
                      <>
                        <Send size={17} />
                        Try Again
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
