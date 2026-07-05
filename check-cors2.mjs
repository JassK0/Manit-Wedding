import { chromium } from "playwright";
const browser = await chromium.launch();
const page = await (await browser.newContext()).newPage();
await page.goto("http://localhost:5173");
const urls = [
  "https://api.counterapi.dev/v1/manit-wedding-week-2026/celebrate/",
  "https://api.counterapi.dev/v1/manit-wedding-week-2026/celebrate",
  "https://api.counterapi.dev/v1/manit-wedding-week-2026/celebrate/up/",
];
for (const url of urls) {
  const result = await page.evaluate(async (u) => {
    try {
      const res = await fetch(u);
      return { url: u, ok: res.ok, status: res.status, body: (await res.text()).slice(0,80) };
    } catch (e) {
      return { url: u, error: String(e) };
    }
  }, url);
  console.log(JSON.stringify(result));
}
await browser.close();
