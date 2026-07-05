import { useNow } from "../hooks/useNow";
import { allEvents } from "../data/events";
import { getNowState, formatCountdown, parseLocal } from "../lib/time";

function dayLabel(iso: string): string {
  return parseLocal(iso).toLocaleDateString(undefined, {
    weekday: "short",
    month: "short",
    day: "numeric",
  });
}

export function HappeningNowBar() {
  const now = useNow(30_000);
  const { live, next, allDone } = getNowState(allEvents, now);

  if (live) {
    return (
      <div className="happening-bar happening-bar--live">
        <span className="happening-bar__dot" aria-hidden="true" />
        <span>
          Happening now: <strong>{live.title}</strong>
        </span>
      </div>
    );
  }

  if (next) {
    return (
      <div className="happening-bar">
        <span>
          Up next: <strong>{next.title}</strong> &middot; {dayLabel(next.start)} &middot;{" "}
          <span className="happening-bar__countdown">in {formatCountdown(parseLocal(next.start), now)}</span>
        </span>
      </div>
    );
  }

  if (allDone) {
    return (
      <div className="happening-bar">
        <span>That's the week. Hope it was one for the books.</span>
      </div>
    );
  }

  return null;
}
