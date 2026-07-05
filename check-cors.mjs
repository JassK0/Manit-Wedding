import { chromium } from "playwright";
const browser = await chromium.launch();
const page = await (await browser.newContext()).newPage();
await page.goto("http://localhost:5173");
const result = await page.evaluate(async () => {
  try {
    const res = await fetch("https://api.counterapi.dev/v1/manit-wedding-week-2026/celebrate/up");
    return { ok: res.ok, status: res.status, body: await res.text() };
  } catch (e) {
    return { error: String(e) };
  }
});
console.log(JSON.stringify(result, null, 2));
await browser.close();
