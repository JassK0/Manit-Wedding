import { useEffect, useRef, useState, type RefObject } from "react";
import { motion, useScroll, useSpring } from "framer-motion";
import { useReducedMotion } from "../hooks/useReducedMotion";

const WIDTH = 40;
const CENTER = WIDTH / 2;
const AMPLITUDE = 9;
const WAVELENGTH = 130;

/** A gently wandering vertical line, like a length of hand-stitched thread. */
function buildThreadPath(height: number): string {
  if (height <= 0) return `M ${CENTER} 0 L ${CENTER} 0`;
  let d = `M ${CENTER} 0`;
  let y = 0;
  let dir = 1;
  while (y < height) {
    const next = Math.min(y + WAVELENGTH, height);
    const midY = (y + next) / 2;
    const cpX = CENTER + AMPLITUDE * dir;
    d += ` Q ${cpX} ${midY} ${CENTER} ${next}`;
    y = next;
    dir *= -1;
  }
  return d;
}

export function ThreadSpine({
  containerRef,
}: {
  containerRef: RefObject<HTMLDivElement | null>;
}) {
  const [height, setHeight] = useState(0);
  const reducedMotion = useReducedMotion();
  const pathD = useRef("");
  pathD.current = buildThreadPath(height);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const observer = new ResizeObserver((entries) => {
      const entry = entries[0];
      if (entry) setHeight(entry.contentRect.height);
    });
    observer.observe(el);
    return () => observer.disconnect();
  }, [containerRef]);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    // "end end": progress reaches 1 as soon as the container's bottom edge
    // scrolls up to the bottom of the viewport. Anything that requires
    // scrolling further (e.g. "end start") is only reachable if the content
    // after the timeline (the footer) is at least a viewport tall, which it
    // isn't here, so the thread would visibly stall before finishing.
    offset: ["start end", "end end"],
  });
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 260,
    damping: 32,
    restDelta: 0.001,
  });

  const pathLength = reducedMotion ? 1 : smoothProgress;

  return (
    <svg
      className="thread-spine"
      width={WIDTH}
      height={height}
      viewBox={`0 0 ${WIDTH} ${height}`}
      preserveAspectRatio="none"
      aria-hidden="true"
      focusable="false"
    >
      {/* faint full-length guide, so the lane reads even before stitching in */}
      <path d={pathD.current} stroke="var(--border)" strokeWidth={3} fill="none" />
      <motion.path
        d={pathD.current}
        stroke="var(--maroon)"
        strokeWidth={5.5}
        strokeLinecap="round"
        fill="none"
        style={{ pathLength }}
      />
      <motion.path
        d={pathD.current}
        stroke="var(--mehndi)"
        strokeWidth={5.5}
        strokeDasharray="7 7"
        strokeLinecap="round"
        fill="none"
        style={{ pathLength }}
      />
      <motion.path
        d={pathD.current}
        stroke="var(--marigold)"
        strokeWidth={2}
        strokeDasharray="2 12"
        strokeLinecap="round"
        fill="none"
        style={{ pathLength }}
      />
    </svg>
  );
}
