import type { WeddingEvent } from "../data/events";
import { siteConfig } from "../data/config";

export interface ShareResult {
  method: "share" | "clipboard" | "none";
}

export async function shareEvent(event: WeddingEvent): Promise<ShareResult> {
  const text = `${event.title} - ${siteConfig.weekTitle}\n${event.timeOfDay}, dress code: ${event.dress.label}.`;

  if (navigator.share) {
    try {
      await navigator.share({ title: event.title, text, url: siteConfig.siteUrl });
      return { method: "share" };
    } catch {
      // User cancelled the share sheet, or share isn't actually supported here. Fall through to clipboard.
    }
  }

  if (navigator.clipboard?.writeText) {
    await navigator.clipboard.writeText(`${text}\n${siteConfig.siteUrl}`);
    return { method: "clipboard" };
  }

  return { method: "none" };
}
