import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';

import { DEFAULT_LAYOUT_VARS } from '../src/constants/layout.js';
import { PRODUCT_OBJECTS } from '../src/data/products.js';

const load = (path) => readFile(new URL(path, import.meta.url), 'utf8');

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

assert.ok(PRODUCT_OBJECTS.length >= 4, 'Expected full product catalog after extraction');
for (const objectData of PRODUCT_OBJECTS) {
  assert.ok(objectData.id, 'Product object must define id');
  assert.ok(objectData.name, 'Product object must define name');
  assert.ok(objectData.detailTitle, 'Product object must define detailTitle');
  assert.equal(objectData.images.length, 3, `Product ${objectData.id} must keep 3-image stage`);
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

for (const requiredText of [
  '78vh',
  '321px',
  '99px',
  'npm run build',
  'npm run build:docs',
]) {
  assert.match(agentsOverride, new RegExp(requiredText.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')));
}

console.log('PASS: refactor architecture invariants verified.');
