import { chromium } from "playwright";
const browser = await chromium.launch();
const ctx = await browser.newContext({ viewport: { width: 390, height: 844 }, deviceScaleFactor: 2 });
const page = await ctx.newPage();
const errors = [];
page.on("pageerror", (e) => errors.push(String(e)));
page.on("console", (m) => { if (m.type() === "error") errors.push(m.text()); });
await page.goto("http://localhost:5173", { waitUntil: "networkidle" });
await page.evaluate(() => document.getElementById('wedding')?.scrollIntoView({block:'start'}));
await page.waitForTimeout(1200); // allow initial count fetch
await page.screenshot({ path: "/tmp/celebrate-before.png" });

await page.locator('.action-btn--celebrate').click();
await page.waitForTimeout(1200); // allow bump request + state update
await page.screenshot({ path: "/tmp/celebrate-after.png" });

console.log("errors:", errors);
await browser.close();
