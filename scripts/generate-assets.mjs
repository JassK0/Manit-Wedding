/**
 * One-off asset generator for favicon / app icons / OG preview image.
 * Not part of the app build. Regenerate after a palette or copy change:
 *
 *   npm install -D sharp
 *   node scripts/generate-assets.mjs
 *   npm uninstall sharp
 *
 * (sharp is a large native dependency, so it's not kept in package.json,
 * see README for details.)
 */
import { mkdir, writeFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import path from "node:path";
import sharp from "sharp";

const root = path.dirname(fileURLToPath(import.meta.url));
const publicDir = path.join(root, "..", "public");

const MAROON = "#7c1f31";
const MAROON_DARK = "#591622";
const MARIGOLD = "#e8a233";
const MEHNDI = "#4c6b3d";
const FEROZI = "#1f7a78";
const PAPER = "#fbf1e2";

/** A small original "bagh flower" motif: diamond core + four petals + dots. */
function flowerMotif(cx, cy, scale) {
  const s = scale;
  return `
    <g transform="translate(${cx} ${cy}) scale(${s})">
      <polygon points="0,-46 46,0 0,46 -46,0" fill="${PAPER}" opacity="0.14" />
      <polygon points="0,-30 14,0 0,30 -14,0" fill="${MARIGOLD}" />
      <polygon points="0,-30 0,-8 -20,-20" fill="${MEHNDI}" />
      <polygon points="0,-30 0,-8 20,-20" fill="${MEHNDI}" />
      <polygon points="0,30 0,8 -20,20" fill="${MEHNDI}" />
      <polygon points="0,30 0,8 20,20" fill="${MEHNDI}" />
      <circle cx="0" cy="-30" r="5" fill="${FEROZI}" />
      <circle cx="0" cy="30" r="5" fill="${FEROZI}" />
      <circle cx="-30" cy="0" r="5" fill="${FEROZI}" />
      <circle cx="30" cy="0" r="5" fill="${FEROZI}" />
    </g>`;
}

function appIconSvg(size) {
  return `
    <svg width="${size}" height="${size}" viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg">
      <rect width="512" height="512" fill="${MAROON}" />
      <rect width="512" height="512" fill="url(#lattice)" opacity="0.12" />
      <defs>
        <pattern id="lattice" width="64" height="64" patternUnits="userSpaceOnUse">
          <polygon points="32,6 58,32 32,58 6,32" fill="none" stroke="${PAPER}" stroke-width="2" />
        </pattern>
      </defs>
      ${flowerMotif(256, 256, 2.1)}
    </svg>`;
}

function faviconSvg() {
  return `
    <svg width="64" height="64" viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg">
      <rect width="64" height="64" rx="14" fill="${MAROON}" />
      ${flowerMotif(32, 32, 0.26)}
    </svg>`;
}

function ogSvg() {
  const width = 1200;
  const height = 630;
  return `
    <svg width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <pattern id="lattice" width="72" height="72" patternUnits="userSpaceOnUse">
          <polygon points="36,8 64,36 36,64 8,36" fill="none" stroke="${PAPER}" stroke-width="2" />
        </pattern>
        <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stop-color="${MAROON}" />
          <stop offset="1" stop-color="${MAROON_DARK}" />
        </linearGradient>
      </defs>
      <rect width="${width}" height="${height}" fill="url(#bg)" />
      <rect width="${width}" height="${height}" fill="url(#lattice)" opacity="0.14" />

      ${flowerMotif(120, 120, 1.1)}
      ${flowerMotif(width - 120, height - 120, 1.1)}

      <text x="${width / 2}" y="280" text-anchor="middle" font-family="Georgia, 'Times New Roman', serif" font-size="72" font-weight="700" fill="${PAPER}">
        Manit's Wedding Week
      </text>
      <text x="${width / 2}" y="350" text-anchor="middle" font-family="Georgia, serif" font-style="italic" font-size="36" fill="${MARIGOLD}">
        July 7 - 12, 2026
      </text>
      <text x="${width / 2}" y="410" text-anchor="middle" font-family="Helvetica, Arial, sans-serif" font-size="24" fill="${PAPER}" opacity="0.85">
        Six days, six celebrations
      </text>
    </svg>`;
}

async function main() {
  await mkdir(publicDir, { recursive: true });

  await writeFile(path.join(publicDir, "favicon.svg"), faviconSvg().trim());

  await sharp(Buffer.from(appIconSvg(192))).png().toFile(path.join(publicDir, "icon-192.png"));
  await sharp(Buffer.from(appIconSvg(512))).png().toFile(path.join(publicDir, "icon-512.png"));
  await sharp(Buffer.from(appIconSvg(180))).png().toFile(
    path.join(publicDir, "apple-touch-icon.png"),
  );
  await sharp(Buffer.from(ogSvg())).png().toFile(path.join(publicDir, "og-image.png"));

  console.log("Assets written to /public");
}

main();
