import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');

function readProjectFile(name) {
  const filePath = path.join(root, name);
  assert.ok(fs.existsSync(filePath), `${name} should exist`);
  return fs.readFileSync(filePath, 'utf8');
}

const html = readProjectFile('index.html');
const css = readProjectFile('style.css');
const javascript = readProjectFile('script.js');

for (const section of ['about', 'skills', 'projects', 'contact']) {
  assert.match(html, new RegExp(`id=["']${section}["']`), `HTML should include the ${section} section`);
}

assert.match(html, /href=["']\.\/style\.css["']/i, 'HTML should link the stylesheet');
assert.match(html, /src=["']\.\/script\.js["']/i, 'HTML should load the script');
assert.ok((html.match(/class=["'][^"']*project-card/g) ?? []).length >= 3, 'HTML should include three project cards');

assert.match(css, /@media\s*\([^)]*max-width/i, 'CSS should define a mobile breakpoint');
assert.match(css, /prefers-reduced-motion/i, 'CSS should respect reduced-motion preferences');

assert.match(javascript, /function\s+setMenuState/i, 'JavaScript should define menu state handling');
assert.match(javascript, /IntersectionObserver/i, 'JavaScript should support reveal observers');
assert.match(javascript, /backToTop/i, 'JavaScript should handle the back-to-top control');
assert.match(javascript, /navigator\.clipboard/i, 'JavaScript should use the Clipboard API when available');
assert.match(javascript, /copyEmail/i, 'JavaScript should include copy-email feedback handling');

console.log('Portfolio smoke checks passed: structure, responsive CSS, and interaction markers.');
