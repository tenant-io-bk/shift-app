const { chromium } = await import('/opt/node22/lib/node_modules/playwright/index.mjs');
import { mkdirSync } from 'fs';

mkdirSync('/home/claude/screenshots', { recursive: true });

const browser = await chromium.launch({ args: ['--no-sandbox', '--disable-setuid-sandbox'] });
const context = await browser.newContext({ viewport: { width: 1280, height: 900 } });
const page = await context.newPage();

console.log('Navigating to /gallery...');
await page.goto('http://localhost:3000/gallery', { waitUntil: 'networkidle', timeout: 30000 });
await page.waitForTimeout(1000);

console.log('Taking screenshot of /gallery...');
await page.screenshot({ path: '/home/claude/screenshots/gallery-screens.png', fullPage: false });
console.log('Saved gallery-screens.png');

// Look for the "colors" tab button
console.log('Looking for colors tab...');
const colorsBtn = page.locator('button, a, [role="tab"]').filter({ hasText: /colors/i }).first();
const count = await colorsBtn.count();
console.log(`Found ${count} colors button(s)`);

if (count > 0) {
  await colorsBtn.click();
  await page.waitForTimeout(800);
  console.log('Taking screenshot of colors tab...');
  await page.screenshot({ path: '/home/claude/screenshots/gallery-colors.png', fullPage: false });
  console.log('Saved gallery-colors.png');
} else {
  // Log all buttons for debugging
  const allTabs = await page.locator('button, [role="tab"], nav a, header button, header a').allTextContents();
  console.log('All tabs/buttons/links found:', JSON.stringify(allTabs));
  // Take a screenshot anyway to see page state
  await page.screenshot({ path: '/home/claude/screenshots/gallery-colors.png', fullPage: false });
  console.log('Saved gallery-colors.png (no colors tab found, saved current state)');
}

await browser.close();
console.log('Done.');
