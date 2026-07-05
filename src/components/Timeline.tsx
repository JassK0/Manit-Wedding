import { useRef } from "react";
import { weddingDays } from "../data/events";
import { DaySection } from "./DaySection";
import { ThreadSpine } from "./ThreadSpine";
import { DayDivider } from "./PhulkariMotifs";

export function Timeline() {
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <div className="timeline" ref={containerRef}>
      <div className="timeline__thread-lane">
        <ThreadSpine containerRef={containerRef} />
      </div>
      <div className="timeline__days">
        {weddingDays.map((day, i) => (
          <div key={day.id}>
            <DaySection day={day} />
            {i < weddingDays.length - 1 && <DayDivider className="timeline__divider" />}
          </div>
        ))}
      </div>
    </div>
  );
}
