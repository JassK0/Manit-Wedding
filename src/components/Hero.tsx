import { motion } from "framer-motion";
import { PhulkariBackdrop } from "./PhulkariMotifs";
import { siteConfig } from "../data/config";
import { useReducedMotion } from "../hooks/useReducedMotion";

export function Hero() {
  const reducedMotion = useReducedMotion();

  return (
    <header className="hero">
      <PhulkariBackdrop className="hero__backdrop" />
      <motion.p
        className="hero__eyebrow"
        initial={reducedMotion ? undefined : { opacity: 0, y: -8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        Six days, six celebrations
      </motion.p>
      <motion.h1
        className="hero__title"
        initial={reducedMotion ? undefined : { opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.1 }}
      >
        {siteConfig.weekTitle}
      </motion.h1>
      <motion.p
        className="hero__dates"
        initial={reducedMotion ? undefined : { opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        {siteConfig.weekDateRange}
      </motion.p>
      <motion.p
        className="hero__intro"
        initial={reducedMotion ? undefined : { opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.3 }}
      >
        Everything you need for the week is right here: what's happening, when, and
        what to wear.
      </motion.p>
      <div className="hero__scroll-cue" aria-hidden="true">
        <span />
      </div>
    </header>
  );
}
