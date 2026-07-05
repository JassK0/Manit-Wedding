import type { WeddingEvent } from "../data/events";

export function parseLocal(iso: string): Date {
  return new Date(iso);
}

export type EventStatus = "past" | "live" | "upcoming";

export function statusOf(event: WeddingEvent, now: Date): EventStatus {
  const start = parseLocal(event.start);
  const end = parseLocal(event.end);
  if (now < start) return "upcoming";
  if (now >= start && now <= end) return "live";
  return "past";
}

export interface NowState {
  live: WeddingEvent | null;
  next: WeddingEvent | null;
  allDone: boolean;
}

export function getNowState(events: WeddingEvent[], now: Date): NowState {
  const sorted = [...events].sort(
    (a, b) => parseLocal(a.start).getTime() - parseLocal(b.start).getTime(),
  );
  const live = sorted.find((e) => statusOf(e, now) === "live") ?? null;
  const next = sorted.find((e) => statusOf(e, now) === "upcoming") ?? null;
  const allDone = !live && !next;
  return { live, next, allDone };
}

/** "2d 4h 12m" style countdown, dropping leading zero units. */
export function formatCountdown(target: Date, now: Date): string {
  let ms = target.getTime() - now.getTime();
  if (ms < 0) ms = 0;
  const totalMinutes = Math.floor(ms / 60000);
  const days = Math.floor(totalMinutes / (60 * 24));
  const hours = Math.floor((totalMinutes % (60 * 24)) / 60);
  const minutes = totalMinutes % 60;

  const parts: string[] = [];
  if (days > 0) parts.push(`${days}d`);
  if (days > 0 || hours > 0) parts.push(`${hours}h`);
  parts.push(`${minutes}m`);
  return parts.join(" ");
}
