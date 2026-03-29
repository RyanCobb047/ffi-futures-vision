# Build Log — FFI Futures Vision

## 2026-03-29 — Builder round 1
- Rebuilt the project as a clean Vite + React static SPA in `src/` with a single-page finance-style experience.
- Implemented: summary/hero view, phase navigation, four detailed phase sections, dashboard summary cards, a revenue calculator, and a forecast-style interactive table.
- Added GitHub Pages readiness via `vite.config.js` (`base: './'`) and `predeploy` / `deploy` scripts using `gh-pages`.
- Mechanical gate:
  - `npm install` ✅
  - `npm run build` ✅
- Assumptions:
  - `[ASSUMPTION]` The original corrupted draft itself was not present in the project folder, so phase labels and detailed copy were conservatively reconstructed from the contract/spec.
  - `[ASSUMPTION]` Calculator formulas were not recoverable, so the implemented model uses transparent funding capacity, fee rate, approval rate, reserve rate, and timeline inputs.
  - `[ASSUMPTION]` GitHub Pages is the intended deployment path; the app is prepared for static publish but not deployed in this round.

## 2026-03-29 — Deployment
- Verified local production build again with `npm run build` ✅
- Created GitHub repo: https://github.com/RyanCobb047/ffi-futures-vision
- Published GitHub Pages site: https://ryancobb047.github.io/ffi-futures-vision/
- Note: Pages may take a short time to finish first build after publish.
