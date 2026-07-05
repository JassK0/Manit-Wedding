/**
 * The itinerary. Everything on the page is generated from this file, so
 * editing a date, time, or dress code here is all it takes.
 *
 * `start` / `end` are placeholder call times (Morning/Afternoon/Evening
 * mapped to representative hours) used for the calendar download and the
 * "happening now" countdown. TODO: swap these for the real times once the
 * family confirms them.
 */

export type DressCode =
  | { kind: "solid"; label: string; hex: string; note?: string }
  | { kind: "multi"; label: string; hexes: string[]; note?: string }
  | { kind: "pattern"; label: string; note?: string }
  | { kind: "open"; label: string; note?: string };

export interface WeddingEvent {
  id: string;
  title: string;
  timeOfDay: "Morning" | "Afternoon" | "Evening";
  /** ISO local datetime, no timezone suffix (floating local time). */
  start: string;
  end: string;
  dress: DressCode;
}

export interface WeddingDay {
  id: string;
  /** Short label for nav pills, e.g. "Tue" */
  pill: string;
  /** e.g. "Jul 7" */
  dateLabel: string;
  /** ISO date, e.g. "2026-07-07" */
  date: string;
  /** Day theme, e.g. "Hall Jaggo" */
  title: string;
  events: WeddingEvent[];
}

export const weddingDays: WeddingDay[] = [
  {
    id: "jaggo",
    pill: "Tue",
    dateLabel: "Jul 7",
    date: "2026-07-07",
    title: "Hall Jaggo",
    events: [
      {
        id: "jaggo-hall",
        title: "Hall Jaggo",
        timeOfDay: "Evening",
        start: "2026-07-07T19:00:00",
        end: "2026-07-07T23:00:00",
        dress: {
          kind: "multi",
          label: "Multi-colour",
          hexes: ["#7c1f31", "#e8a233", "#4c6b3d", "#1f7a78"],
          note: "Bring the brightest thing in your closet.",
        },
      },
    ],
  },
  {
    id: "mehndi",
    pill: "Wed",
    dateLabel: "Jul 8",
    date: "2026-07-08",
    title: "Mehndi & Qawwali Night",
    events: [
      {
        id: "mehndi-afternoon",
        title: "Mehndi",
        timeOfDay: "Afternoon",
        start: "2026-07-08T14:00:00",
        end: "2026-07-08T17:30:00",
        dress: {
          kind: "solid",
          label: "Shades of green",
          hex: "#4c6b3d",
          note: "Any shade works, from sage to emerald.",
        },
      },
      {
        id: "qawwali-night",
        title: "Qawwali Night",
        timeOfDay: "Evening",
        start: "2026-07-08T19:30:00",
        end: "2026-07-08T23:00:00",
        dress: {
          kind: "open",
          label: "Wear anything",
          note: "No dress code, just show up.",
        },
      },
    ],
  },
  {
    id: "haldi",
    pill: "Thu",
    dateLabel: "Jul 9",
    date: "2026-07-09",
    title: "Haldi & Nanka Mel",
    events: [
      {
        id: "haldi-morning",
        title: "Haldi",
        timeOfDay: "Morning",
        start: "2026-07-09T10:00:00",
        end: "2026-07-09T12:30:00",
        dress: {
          kind: "solid",
          label: "Yellow",
          hex: "#f4c430",
          note: "Turmeric stains. Wear something you don't mind getting messy.",
        },
      },
      {
        id: "nanka-mel",
        title: "Nanka Mel + Home Jaggo",
        timeOfDay: "Evening",
        start: "2026-07-09T18:30:00",
        end: "2026-07-09T22:30:00",
        dress: {
          kind: "pattern",
          label: "Phulkari prints",
          note: "Florals, embroidery, anything phulkari-inspired.",
        },
      },
    ],
  },
  {
    id: "chooda",
    pill: "Fri",
    dateLabel: "Jul 10",
    date: "2026-07-10",
    title: "Chooda",
    events: [
      {
        id: "chooda-afternoon",
        title: "Chooda",
        timeOfDay: "Afternoon",
        start: "2026-07-10T14:00:00",
        end: "2026-07-10T16:30:00",
        dress: {
          kind: "open",
          label: "Any colour",
          note: "Your call today.",
        },
      },
    ],
  },
  {
    id: "wedding",
    pill: "Sat",
    dateLabel: "Jul 11",
    date: "2026-07-11",
    title: "The Wedding",
    events: [
      {
        id: "wedding-ceremony",
        title: "Wedding",
        timeOfDay: "Morning",
        start: "2026-07-11T10:00:00",
        end: "2026-07-11T13:30:00",
        dress: {
          kind: "solid",
          label: "Brown",
          hex: "#6b4226",
          note: "Any shade of brown, from camel to espresso.",
        },
      },
    ],
  },
  {
    id: "reception",
    pill: "Sun",
    dateLabel: "Jul 12",
    date: "2026-07-12",
    title: "Reception",
    events: [
      {
        id: "reception-evening",
        title: "Reception",
        timeOfDay: "Evening",
        start: "2026-07-12T19:00:00",
        end: "2026-07-12T23:30:00",
        dress: {
          kind: "open",
          label: "Any colour",
          note: "Dress up, this is the last night.",
        },
      },
    ],
  },
];

export const allEvents: WeddingEvent[] = weddingDays.flatMap((d) => d.events);
