import type { WeddingDay } from "../data/events";
import { EventCard } from "./EventCard";
import { ThreadKnot } from "./PhulkariMotifs";
import { statusOf } from "../lib/time";
import { useNow } from "../hooks/useNow";

export function DaySection({ day }: { day: WeddingDay }) {
  const now = useNow();

  return (
    <section id={day.id} className="day-section" aria-labelledby={`${day.id}-heading`}>
      <div className="day-section__header">
        <ThreadKnot />
        <div>
          <p className="day-section__date">{day.pill}, {day.dateLabel}</p>
          <h2 id={`${day.id}-heading`}>{day.title}</h2>
        </div>
      </div>

      <div className="day-section__events">
        {day.events.map((event) => (
          <EventCard
            key={event.id}
            event={event}
            status={statusOf(event, now)}
            celebratory={day.id === "wedding"}
          />
        ))}
      </div>
    </section>
  );
}
