import { useEffect, useRef } from "react";
import { weddingDays } from "../data/events";
import { useReducedMotion } from "../hooks/useReducedMotion";

export function DayNav({ activeId }: { activeId: string | null }) {
  const railRef = useRef<HTMLDivElement>(null);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    if (!activeId || !railRef.current) return;
    const activeButton = railRef.current.querySelector<HTMLButtonElement>(
      `[data-day="${activeId}"]`,
    );
    activeButton?.scrollIntoView({
      behavior: reducedMotion ? "auto" : "smooth",
      block: "nearest",
      inline: "center",
    });
  }, [activeId, reducedMotion]);

  function goToDay(id: string) {
    document.getElementById(id)?.scrollIntoView({
      behavior: reducedMotion ? "auto" : "smooth",
      block: "start",
    });
  }

  return (
    <nav className="day-nav" aria-label="Jump to a day">
      <div className="day-nav__rail" ref={railRef}>
        {weddingDays.map((day) => (
          <button
            key={day.id}
            type="button"
            data-day={day.id}
            className={`day-nav__pill${activeId === day.id ? " day-nav__pill--active" : ""}`}
            aria-current={activeId === day.id ? "true" : undefined}
            onClick={() => goToDay(day.id)}
          >
            <span className="day-nav__pill-day">{day.pill}</span>
            <span className="day-nav__pill-date">{day.dateLabel}</span>
          </button>
        ))}
      </div>
    </nav>
  );
}
