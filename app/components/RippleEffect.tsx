"use client";

import { useEffect, useRef, useCallback } from "react";

export default function RippleEffect({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const containerRef = useRef<HTMLDivElement>(null);

  const createRipple = useCallback((e: MouseEvent) => {
    const container = containerRef.current;
    if (!container) return;

    const rect = container.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height) * 2;
    const x = e.clientX - rect.left - size / 2;
    const y = e.clientY - rect.top - size / 2;

    const ripple = document.createElement("span");
    ripple.className = "ripple";
    ripple.style.width = `${size}px`;
    ripple.style.height = `${size}px`;
    ripple.style.left = `${x}px`;
    ripple.style.top = `${y}px`;

    container.appendChild(ripple);
    ripple.addEventListener("animationend", () => ripple.remove());
  }, []);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    el.addEventListener("click", createRipple);
    return () => el.removeEventListener("click", createRipple);
  }, [createRipple]);

  return (
    <div ref={containerRef} className={`ripple-container ${className}`}>
      {children}
    </div>
  );
}
