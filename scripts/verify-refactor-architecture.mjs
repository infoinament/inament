import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';

import { DEFAULT_LAYOUT_VARS } from '../src/constants/layout.js';

const load = (path) => readFile(new URL(path, import.meta.url), 'utf8');

const productsSource = await load('../src/data/products.js');
const desktopCss = await load('../src/styles/desktop.css');
const mobileCss = await load('../src/styles/mobile.css');
const baseCss = await load('../src/styles/base.css');
const styleIndexCss = await load('../src/styles/index.css');
const agentsOverride = await load('../AGENTS.override.md');

assert.equal(DEFAULT_LAYOUT_VARS['--desktop-side-width'], '321px', 'Desktop right column width must stay at 321px');
assert.match(
  DEFAULT_LAYOUT_VARS['--desktop-main-height'],
  /78vh/,
  'Desktop main height must preserve the 78vh layout intent',
);
assert.equal(DEFAULT_LAYOUT_VARS['--desktop-copy-height'], '185px', 'Desktop copy block height invariant must be preserved');

for (const productId of ['wall-shelf', 'kitchen-rack', 'pocket-tray', 'plain-shelf']) {
  assert.match(productsSource, new RegExp(`id:\\s*['\"]${productId}['\"]`), `Missing product id: ${productId}`);
}

const imageArrayMatches = [...productsSource.matchAll(/images:\s*\[([^\]]+)\]/g)];
assert.ok(imageArrayMatches.length >= 4, 'Expected at least 4 product image arrays');
for (const [index, match] of imageArrayMatches.entries()) {
  const imageCount = match
    .split(',')
    .map((part) => part.trim())
    .filter(Boolean).length;
  assert.equal(imageCount, 3, `Product image array #${index + 1} must keep 3-image stage`);
}

assert.match(desktopCss, /overflow-x:\s*scroll;/, 'Desktop view must preserve horizontal scroll behavior');
assert.match(
  desktopCss,
  /minmax\(var\(--desktop-side-width, 321px\), var\(--desktop-side-width, 321px\)\)/,
  'Desktop right column must remain fixed-width via minmax lock',
);
assert.match(baseCss, /--content-footer-gap:\s*99px;/, 'Frame-to-footer spacing must remain 99px');
assert.match(mobileCss, /@media \(max-width:\s*1159px\)/, 'Mobile breakpoint invariant must remain <=1159px');

for (const layer of ['./base.css', './transitions.css', './desktop.css', './mobile.css']) {
  assert.match(styleIndexCss, new RegExp(`@import ['\"]${layer.replace('.', '\\.')}['\"];`), `Missing style layer import: ${layer}`);
}

for (const requiredText of ['78vh', '321px', '99px', 'npm run build', 'npm run build:docs']) {
  assert.match(agentsOverride, new RegExp(requiredText.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')));
}

console.log('PASS: refactor architecture invariants verified.');
