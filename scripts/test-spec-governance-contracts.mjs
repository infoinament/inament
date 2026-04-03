import assert from 'node:assert/strict';

import {
  parseNoSpecImpactYaml,
  validateExactPathCoverage,
  validateRequiredCiCheckContract,
  validateTraceabilityContractShape,
} from './lib/spec-governance-contracts.mjs';

let passed = 0;
let failed = 0;

const runCase = (name, fn) => {
  try {
    fn();
    passed += 1;
    console.log(`PASS: ${name}`);
  } catch (error) {
    failed += 1;
    console.error(`FAIL: ${name}`);
    console.error(error instanceof Error ? error.message : String(error));
  }
};

runCase('traceability contract accepts a valid payload', () => {
  const result = validateTraceabilityContractShape({
    schema_version: '1.0.0',
    generated_at: '2026-04-03T00:00:00Z',
    contracts: [
      {
        contract_id: 'LAYOUT-001',
        source_path: 'src/styles/desktop.css',
        source_range: '1-22',
        spec_path: 'spec/appendices/layout-invariants.md',
        verification_cmd: 'npm test',
        last_verified_sha: 'abc1234',
        inference_flag: false,
      },
    ],
  });

  assert.equal(result.ok, true, result.errors.join('\n'));
  assert.equal(result.errors.length, 0);
});

runCase('traceability contract rejects missing root keys and bad path prefixes', () => {
  const result = validateTraceabilityContractShape({
    schema_version: '1.0.0',
    generated_at: 'invalid-date',
    contracts: [
      {
        contract_id: 'BAD-001',
        source_path: 'styles/desktop.css',
        source_range: '',
        spec_path: 'appendices/layout.md',
        verification_cmd: '',
        last_verified_sha: '',
        inference_flag: 'no',
      },
    ],
  });

  assert.equal(result.ok, false);
  assert.ok(result.errors.some((error) => error.includes('generated_at')));
  assert.ok(result.errors.some((error) => error.includes('source_path')));
  assert.ok(result.errors.some((error) => error.includes('spec_path')));
  assert.ok(result.errors.some((error) => error.includes('inference_flag')));
});

runCase('no-spec-impact parser accepts valid strict YAML', () => {
  const yaml = `change_id: CHG-100
pr_ref: "#45"
touched_src_paths:
  - src/App.jsx
  - src/hooks/useObjectCarousel.js
rationale: No product behavior change
reviewer: qa-owner
date: 2026-04-03
`;

  const result = parseNoSpecImpactYaml(yaml);
  assert.equal(result.ok, true, result.errors.join('\n'));
  assert.deepEqual(result.data.touched_src_paths, ['src/App.jsx', 'src/hooks/useObjectCarousel.js']);
});

runCase('no-spec-impact parser rejects unknown keys', () => {
  const yaml = `change_id: CHG-101
pr_ref: #46
touched_src_paths:
  - src/App.jsx
rationale: no-op
reviewer: qa-owner
date: 2026-04-03
unknown_key: should-fail
`;

  const result = parseNoSpecImpactYaml(yaml);
  assert.equal(result.ok, false);
  assert.ok(result.errors.some((error) => error.includes('Unknown top-level key')));
});

runCase('no-spec-impact parser rejects non-src paths and malformed date', () => {
  const yaml = `change_id: CHG-102
pr_ref: #47
touched_src_paths:
  - docs/index.md
rationale: no-op
reviewer: qa-owner
date: 2026/04/03
`;

  const result = parseNoSpecImpactYaml(yaml);
  assert.equal(result.ok, false);
  assert.ok(result.errors.some((error) => error.includes('touched_src_paths[0]')));
  assert.ok(result.errors.some((error) => error.includes('YYYY-MM-DD')));
});

runCase('exact path coverage accepts exact set matches regardless of order', () => {
  const result = validateExactPathCoverage(
    ['src/a.js', 'src/b.js', 'src/a.js'],
    ['src/b.js', 'src/a.js'],
  );

  assert.equal(result.ok, true);
  assert.deepEqual(result.missing, []);
  assert.deepEqual(result.extra, []);
});

runCase('exact path coverage rejects missing and extra entries', () => {
  const result = validateExactPathCoverage(
    ['src/a.js', 'src/b.js'],
    ['src/b.js', 'src/c.js'],
  );

  assert.equal(result.ok, false);
  assert.deepEqual(result.missing, ['src/a.js']);
  assert.deepEqual(result.extra, ['src/c.js']);
});

runCase('CI required check contract validates canonical workflow wiring', () => {
  const workflow = `name: spec-governance-gate
on:
  pull_request:
    branches: [main]

jobs:
  verify-spec-governance:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - run: npm ci
      - run: npm run verify:spec-governance
`;

  const result = validateRequiredCiCheckContract(workflow);
  assert.equal(result.ok, true, result.errors.join('\n'));
});

runCase('CI required check contract rejects wrong workflow metadata', () => {
  const workflow = `name: wrong-name
jobs:
  wrong-job:
    steps:
      - run: npm test
`;

  const result = validateRequiredCiCheckContract(workflow);
  assert.equal(result.ok, false);
  assert.ok(result.errors.some((error) => error.includes('Workflow name')));
  assert.ok(result.errors.some((error) => error.includes('jobs.verify-spec-governance')));
  assert.ok(result.errors.some((error) => error.includes('npm run verify:spec-governance')));
});

if (failed > 0) {
  console.error(`FAIL: spec-governance contract tests (${passed} passed / ${failed} failed)`);
  process.exitCode = 1;
} else {
  console.log(`PASS: spec-governance contract tests (${passed} passed)`);
}
