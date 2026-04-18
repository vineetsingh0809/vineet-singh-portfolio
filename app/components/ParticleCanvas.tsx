"use client";

import { useTheme } from "next-themes";
import { useEffect, useRef } from "react";

interface Dot {
  x: number;
  y: number;
  vx: number;
  vy: number;
  alpha: number;
  radius: number;
  color: "indigo" | "mint";
}

export default function ParticleCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animRef = useRef<number>(0);
  const dotsRef = useRef<Dot[]>([]);
  const mouseRef = useRef({ x: -9999, y: -9999 });
  const { resolvedTheme, theme } = useTheme();
  const activeTheme = resolvedTheme ?? theme ?? "dark";
  const isLight = activeTheme === "light";

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
      initDots();
    };

    const initDots = () => {
      const count = Math.floor((canvas.width * canvas.height) / 10000);
      dotsRef.current = Array.from({ length: Math.min(count, 80) }, (_, i) => ({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.3,
        vy: (Math.random() - 0.5) * 0.3,
        alpha: isLight ? Math.random() * 0.12 + 0.04 : Math.random() * 0.4 + 0.1,
        radius: Math.random() * 2 + 1,
        color: (i % 2 === 0 ? "indigo" : "mint") as "indigo" | "mint",
      }));
    };

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      dotsRef.current.forEach((dot) => {
        dot.x += dot.vx;
        dot.y += dot.vy;

        if (dot.x < 0 || dot.x > canvas.width) dot.vx *= -1;
        if (dot.y < 0 || dot.y > canvas.height) dot.vy *= -1;

        // Mouse interaction
        const dx = mouseRef.current.x - dot.x;
        const dy = mouseRef.current.y - dot.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 100) {
          dot.x -= dx * 0.03;
          dot.y -= dy * 0.03;
        }

        const rgb = isLight
          ? dot.color === "indigo"
            ? "224, 0, 94"
            : "0, 122, 204"
          : dot.color === "indigo"
            ? "255, 45, 120"
            : "0, 245, 255";
        ctx.beginPath();
        ctx.arc(dot.x, dot.y, dot.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${rgb}, ${dot.alpha})`;
        ctx.fill();
      });

      // Draw connections
      dotsRef.current.forEach((dot, i) => {
        dotsRef.current.slice(i + 1).forEach((other) => {
          const dx = dot.x - other.x;
          const dy = dot.y - other.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 120) {
            ctx.beginPath();
            ctx.moveTo(dot.x, dot.y);
            ctx.lineTo(other.x, other.y);
            const rgb = isLight
              ? dot.color === "indigo"
                ? "224, 0, 94"
                : "0, 122, 204"
              : dot.color === "indigo"
                ? "255, 45, 120"
                : "0, 245, 255";
            ctx.strokeStyle = `rgba(${rgb}, ${isLight ? 0.05 : 0.08 * (1 - dist / 120)})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        });
      });

      animRef.current = requestAnimationFrame(draw);
    };

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseRef.current = { x: e.clientX - rect.left, y: e.clientY - rect.top };
    };

    resize();
    draw();

    window.addEventListener("resize", resize);
    canvas.addEventListener("mousemove", handleMouseMove);

    return () => {
      cancelAnimationFrame(animRef.current);
      window.removeEventListener("resize", resize);
      canvas.removeEventListener("mousemove", handleMouseMove);
    };
  }, [isLight]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full"
      style={{ opacity: isLight ? 0.5 : 0.7 }}
      aria-hidden="true"
    />
  );
}
