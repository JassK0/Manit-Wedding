/**
 * Site-wide placeholders. Fill these in once the details are locked, then
 * every screen that needs them (footer, calendar files, share text) updates
 * automatically.
 */
export const siteConfig = {
  coupleNames: "Manit & TBD",
  weekTitle: "Manit's Wedding Week",
  weekDateRange: "July 7-12, 2026",

  // TODO: replace with the real venue name once confirmed.
  venueName: "Venue name coming soon",
  // TODO: replace with the full street address (used for calendar files and a maps link).
  venueAddress: "Address to be announced",
  // TODO: paste a Google Maps share link here once the venue is set.
  venueMapUrl: "",

  // TODO: paste an RSVP form link (Google Form, Zola, etc.) once one exists.
  rsvpUrl: "",
  // TODO: a phone number or email guests can reach out to with questions.
  contactLabel: "Questions? Reach out to the family.",
  contactHref: "",

  // Used for Open Graph tags and share text.
  siteUrl: "https://manit-wedding.vercel.app",
  ogDescription:
    "Six days, six celebrations. Everything you need for Manit's wedding week: dress codes, timings and a tap to add it all to your calendar.",
} as const;
