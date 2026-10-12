// Concatenates src/styles (in index.css order) into wordpress/weckwert.css —
// paste it into Elementor → Site Settings → Custom CSS, or enqueue it from a child theme.
import { readFileSync, writeFileSync } from 'node:fs';

const order = ['tokens', 'base', 'layout', 'widgets', 'sections'];
const header = `/*!
 * Weckwert Commercial — site stylesheet for WordPress / Elementor.
 * Generated from src/styles by \`npm run build:wp-css\`. Do not edit by hand.
 * Fonts: enqueue Libre Baskerville (400, 700, 400 italic) + Manrope (400–700) from Google Fonts
 * (Elementor → Site Settings → Global Fonts loads them automatically when selected).
 */\n`;
const css = order.map((n) => `/* ── ${n}.css ── */\n` + readFileSync(`src/styles/${n}.css`, 'utf8')).join('\n');
writeFileSync('wordpress/weckwert.css', header + css);
console.log(`wordpress/weckwert.css written (${(css.length / 1024).toFixed(1)} KB)`);
