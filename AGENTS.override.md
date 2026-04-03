# AGENTS Override — inament UI Refactor Guardrails

This file adds repo-local guidance and does not override higher-priority AGENTS instructions.

## Architecture Boundaries

- `src/data/`: product/static content only (no React hooks, no DOM logic).
- `src/constants/`: layout and behavior constants only.
- `src/hooks/`: viewport, preload, carousel/state-transition logic.
- `src/components/`: presentation and interaction wiring only.
- `src/styles/`: layered CSS (`base`, `desktop`, `mobile`, `transitions`).
- Keep `src/App.jsx` as composition/orchestration entry; avoid re-introducing monolith logic.

## Layout Invariants Checklist (Must hold)

1. Desktop image-area target keeps the `78vh` intent.
2. Desktop right column width never drops below `321px`.
3. Narrow desktop uses horizontal scrolling instead of per-image distortion.
4. Main/detail image-area heights stay synchronized.
5. Frame-to-footer spacing remains `99px`.

## Required Verification Commands

- Always run: `npm run build`
- If docs/static output is impacted: `npm run build:docs`

## Change-Size Policy

- Prefer small, reversible diffs.
- Preserve class names/selectors while refactoring structure.
- Avoid new dependencies for architecture-only refactors.
