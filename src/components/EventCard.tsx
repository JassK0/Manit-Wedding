import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import type { WeddingEvent } from "../data/events";
import { DressSwatch } from "./DressSwatch";
import { Confetti } from "./Confetti";
import { CardMotif } from "./PhulkariMotifs";
import { downloadIcs } from "../lib/ics";
import { shareEvent } from "../lib/share";
import { bumpCelebrateCount, getCelebrateCount } from "../lib/celebrateCounter";
import { useReducedMotion } from "../hooks/useReducedMotion";
import type { EventStatus } from "../lib/time";

const TIME_ICON: Record<WeddingEvent["timeOfDay"], string> = {
  Morning: "☀", // sun
  Afternoon: "⛅", // sun behind cloud
  Evening: "☽", // crescent moon
};

export function EventCard({
  event,
  status,
  celebratory = false,
}: {
  event: WeddingEvent;
  status: EventStatus;
  celebratory?: boolean;
}) {
  const [shareMessage, setShareMessage] = useState<string | null>(null);
  const [burst, setBurst] = useState(0);
  const [celebrateCount, setCelebrateCount] = useState<number | null>(null);
  const [isBumping, setIsBumping] = useState(false);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    if (!celebratory) return;
    let cancelled = false;
    getCelebrateCount().then((count) => {
      if (!cancelled) setCelebrateCount(count);
    });
    return () => {
      cancelled = true;
    };
  }, [celebratory]);

  async function handleShare() {
    const result = await shareEvent(event);
    if (result.method === "clipboard") {
      setShareMessage("Copied to clipboard");
      setTimeout(() => setShareMessage(null), 2000);
    }
  }

  async function handleCelebrate() {
    setBurst((n) => n + 1);
    if (isBumping) return;
    setIsBumping(true);
    const count = await bumpCelebrateCount();
    if (count !== null) setCelebrateCount(count);
    setIsBumping(false);
  }

  return (
    <motion.article
      className={`event-card event-card--${status}`}
      initial={reducedMotion ? undefined : { opacity: 0, y: 16 }}
      whileInView={reducedMotion ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.4, ease: "easeOut" }}
    >
      {status === "live" && <span className="event-card__badge">Happening now</span>}
      <CardMotif className="event-card__motif" />

      <div className="event-card__head">
        <span className="event-card__time-icon" aria-hidden="true">
          {TIME_ICON[event.timeOfDay]}
        </span>
        <div>
          <h3>{event.title}</h3>
          <p className="event-card__time">{event.timeOfDay}</p>
        </div>
      </div>

      <DressSwatch dress={event.dress} />

      <div className="event-card__actions">
        <motion.button
          type="button"
          className="action-btn"
          whileTap={reducedMotion ? undefined : { scale: 0.94 }}
          onClick={() => downloadIcs(event)}
        >
          <span aria-hidden="true">&#128197;</span> Add to calendar
        </motion.button>
        <motion.button
          type="button"
          className="action-btn"
          whileTap={reducedMotion ? undefined : { scale: 0.94 }}
          onClick={handleShare}
        >
          <span aria-hidden="true">&#128228;</span> Share
        </motion.button>
        {celebratory && (
          <motion.button
            type="button"
            className="action-btn action-btn--celebrate"
            whileTap={reducedMotion ? undefined : { scale: 0.9 }}
            onClick={handleCelebrate}
          >
            <span aria-hidden="true">&#127882;</span> Celebrate
          </motion.button>
        )}
      </div>

      {celebratory && celebrateCount !== null && (
        <p className="event-card__celebrate-count">
          &#127881; {celebrateCount.toLocaleString()}{" "}
          {celebrateCount === 1 ? "person has" : "people have"} celebrated this
        </p>
      )}

      {shareMessage && (
        <p role="status" className="event-card__toast">
          {shareMessage}
        </p>
      )}

      {celebratory && <Confetti trigger={burst} />}
    </motion.article>
  );
}
