import type { WeddingEvent } from "../data/events";
import { siteConfig } from "../data/config";

function escapeIcs(text: string): string {
  return text
    .replace(/\\/g, "\\\\")
    .replace(/;/g, "\\;")
    .replace(/,/g, "\\,")
    .replace(/\n/g, "\\n");
}

function toIcsDate(iso: string): string {
  // Floating local time (no trailing Z), matches how the itinerary is authored.
  return iso.replace(/[-:]/g, "").split(".")[0];
}

function stamp(): string {
  return new Date().toISOString().replace(/[-:]/g, "").split(".")[0] + "Z";
}

export function buildIcsFile(event: WeddingEvent): string {
  const location = siteConfig.venueAddress
    ? `${siteConfig.venueName}, ${siteConfig.venueAddress}`
    : siteConfig.venueName;

  const lines = [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//Manit Wedding Week//EN",
    "CALSCALE:GREGORIAN",
    "BEGIN:VEVENT",
    `UID:${event.id}@manit-wedding-week`,
    `DTSTAMP:${stamp()}`,
    `DTSTART:${toIcsDate(event.start)}`,
    `DTEND:${toIcsDate(event.end)}`,
    `SUMMARY:${escapeIcs(`${event.title} - ${siteConfig.weekTitle}`)}`,
    `DESCRIPTION:${escapeIcs(`Dress code: ${event.dress.label}.`)}`,
    `LOCATION:${escapeIcs(location)}`,
    "END:VEVENT",
    "END:VCALENDAR",
  ];
  return lines.join("\r\n");
}

export function downloadIcs(event: WeddingEvent): void {
  const blob = new Blob([buildIcsFile(event)], {
    type: "text/calendar;charset=utf-8",
  });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = `${event.id}.ics`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}
