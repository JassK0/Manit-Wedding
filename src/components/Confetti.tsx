import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useReducedMotion } from "../hooks/useReducedMotion";

interface Particle {
  id: number;
  x: number;
  y: number;
  rotate: number;
  color: string;
}

const COLORS = ["#e8a233", "#7c1f31", "#4c6b3d", "#1f7a78", "#d9897d"];

/** A short burst of thread-colored confetti. Triggered by incrementing `trigger`. */
export function Confetti({ trigger }: { trigger: number }) {
  const reducedMotion = useReducedMotion();
  const [particles, setParticles] = useState<Particle[]>([]);

  useEffect(() => {
    if (trigger === 0) return;
    const next: Particle[] = Array.from({ length: 16 }, (_, i) => ({
      id: trigger * 100 + i,
      x: (Math.random() - 0.5) * 220,
      y: -(100 + Math.random() * 70),
      rotate: (Math.random() - 0.5) * 360,
      color: COLORS[i % COLORS.length],
    }));
    setParticles(next);
    const clear = setTimeout(() => setParticles([]), reducedMotion ? 700 : 1100);
    return () => clearTimeout(clear);
  }, [trigger, reducedMotion]);

  if (particles.length === 0) return null;

  return (
    <div className="confetti" aria-hidden="true">
      {particles.map((p) =>
        reducedMotion ? (
          <span
            key={p.id}
            className="confetti__static-dot"
            style={{ background: p.color, left: `calc(50% + ${p.x * 0.4}px)` }}
          />
        ) : (
          <motion.span
            key={p.id}
            className="confetti__dot"
            style={{ background: p.color, left: "50%" }}
            initial={{ opacity: 1, x: 0, y: 0, rotate: 0 }}
            animate={{ opacity: 0, x: p.x, y: p.y, rotate: p.rotate }}
            transition={{ duration: 1, ease: "easeOut" }}
          />
        ),
      )}
    </div>
  );
}
