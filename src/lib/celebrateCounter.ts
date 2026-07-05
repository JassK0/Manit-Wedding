/**
 * A shared "how many people tapped Celebrate" counter, backed by CounterAPI
 * (counterapi.dev), a free, no-auth hit-counter service. This is the one
 * piece of the site that isn't purely static: it makes a network request to
 * a third party. If that service is unreachable, every function here
 * resolves to `null` rather than throwing, so the UI can just hide the
 * count instead of breaking.
 *
 * TODO: if counterapi.dev ever goes away, swap the two fetch calls below
 * for another hit-counter API, the WORKSPACE/COUNTER names, response shape
 * and this file are the only things that would need to change.
 */
const WORKSPACE = "manit-wedding-week-2026";
const COUNTER = "celebrate";
const BASE_URL = `https://api.counterapi.dev/v1/${WORKSPACE}/${COUNTER}`;

function extractCount(payload: unknown): number | null {
  if (!payload || typeof payload !== "object") return null;
  // counterapi.dev returns `{ count: N, ... }` at the top level; fall back
  // to a nested `data.count` in case that ever changes shape.
  const top = payload as { count?: unknown; data?: unknown };
  if (typeof top.count === "number") return top.count;
  if (top.data && typeof top.data === "object") {
    const count = (top.data as { count?: unknown }).count;
    if (typeof count === "number") return count;
  }
  return null;
}

/** Reads the current count without incrementing it. */
export async function getCelebrateCount(): Promise<number | null> {
  try {
    // The trailing slash matters: without it, this endpoint 301s to the
    // slashed URL and the redirect response doesn't carry a CORS header,
    // so the browser fetch fails with an opaque "Failed to fetch".
    const res = await fetch(`${BASE_URL}/`);
    if (!res.ok) return null;
    return extractCount(await res.json());
  } catch {
    return null;
  }
}

/** Increments the shared count by one and returns the new total. */
export async function bumpCelebrateCount(): Promise<number | null> {
  try {
    const res = await fetch(`${BASE_URL}/up`);
    if (!res.ok) return null;
    return extractCount(await res.json());
  } catch {
    return null;
  }
}
