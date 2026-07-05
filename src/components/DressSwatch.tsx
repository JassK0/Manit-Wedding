import { useId, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import type { DressCode } from "../data/events";
import { useReducedMotion } from "../hooks/useReducedMotion";

/** A tiny woven-diamond tile, standing in for an actual phulkari print swatch. */
function PatternFill() {
  return (
    <svg className="swatch-fill" viewBox="0 0 32 32" aria-hidden="true" focusable="false">
      <rect width="32" height="32" fill="#f4e2d8" />
      <polygon points="8,1 15,8 8,15 1,8" fill="#e8a233" />
      <polygon points="24,1 31,8 24,15 17,8" fill="#4c6b3d" />
      <polygon points="8,17 15,24 8,31 1,24" fill="#1f7a78" />
      <polygon points="24,17 31,24 24,31 17,24" fill="#7c1f31" />
    </svg>
  );
}

function SwatchFill({ dress }: { dress: DressCode }) {
  if (dress.kind === "solid") {
    return <span className="swatch-fill" style={{ background: dress.hex }} />;
  }
  if (dress.kind === "multi") {
    const stops = dress.hexes
      .map((hex, i) => `${hex} ${(i / dress.hexes.length) * 100}%, ${hex} ${((i + 1) / dress.hexes.length) * 100}%`)
      .join(", ");
    return (
      <span
        className="swatch-fill"
        style={{ background: `linear-gradient(135deg, ${stops})` }}
      />
    );
  }
  if (dress.kind === "pattern") {
    return <PatternFill />;
  }
  return (
    <span className="swatch-fill swatch-fill--open" aria-hidden="true">
      ?
    </span>
  );
}

export function DressSwatch({ dress }: { dress: DressCode }) {
  const [open, setOpen] = useState(false);
  const reducedMotion = useReducedMotion();
  const panelId = useId();

  return (
    <div className="dress-swatch">
      <button
        type="button"
        className="dress-swatch__trigger"
        aria-expanded={open}
        aria-controls={panelId}
        onClick={() => setOpen((v) => !v)}
      >
        <motion.span
          className="dress-swatch__chip"
          whileTap={reducedMotion ? undefined : { scale: 0.88 }}
          animate={reducedMotion ? undefined : { rotate: open ? 8 : 0 }}
        >
          <SwatchFill dress={dress} />
        </motion.span>
        <span className="dress-swatch__label">
          {dress.label}
          <span className="dress-swatch__hint">{open ? "tap to close" : "tap for details"}</span>
        </span>
      </button>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            id={panelId}
            className="dress-swatch__panel"
            initial={reducedMotion ? false : { height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={reducedMotion ? undefined : { height: 0, opacity: 0 }}
            transition={{ duration: 0.28, ease: "easeOut" }}
            style={{ overflow: "hidden" }}
          >
            <p className="dress-swatch__note">
              {dress.note ?? "No specific note, just wear it well."}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
