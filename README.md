# inament

Inament demo page implemented in React + Vite.

## Run locally

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
```

## GitHub Pages 배포

Deploy from branch 방식으로 배포합니다.

```bash
npm run build:docs
git add docs
git commit -m "Update docs for GitHub Pages"
git push origin main
```

- `build:docs`는 `/inament/` base 경로로 빌드한 뒤 `docs/`를 갱신합니다.
- `dist/`는 로컬 빌드 확인용이며 커밋하지 않습니다.

최초 1회 GitHub 설정:
1. GitHub 저장소 → **Settings** → **Pages**
2. **Source**를 **Deploy from a branch**로 선택
3. Branch: `main`, Folder: `/docs`

배포 URL:
- `https://kurkim0661.github.io/inament/`

## Refactor Architecture Guide

### Module boundaries

- `src/data/`: object catalog and static copy only
- `src/constants/`: layout and transition constants
- `src/hooks/`: viewport, object carousel, and image preload logic
- `src/components/`: presentation/layout components
- `src/styles/`: layered CSS (`base`, `transitions`, `desktop`, `mobile`)

### Refactor verification

```bash
npm test
npm run build
npm run build:docs
```

- `npm test` runs `scripts/verify-refactor-architecture.mjs` and validates layout invariants from the PRD/test spec.
- This project currently has no dedicated `lint` script; add one before enforcing lint in CI.

