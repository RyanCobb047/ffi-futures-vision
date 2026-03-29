# Project Spec — FFI Futures Vision

## Objective
Reconstruct a corrupted Claude-generated React component draft into a working, polished single-page React app for Futures Funding / FFI. The app should preserve the intended narrative, navigation structure, dashboards, and calculator-style interactions implied by the damaged source while removing broken syntax and placeholder behavior.

## Product Shape
A single-page presentation app with:
- a clear top-level summary / hero section
- phase-based navigation across the FFI futures/funding journey
- detailed sections for each phase
- dashboard-style visual summaries where implied by the recovered content
- interactive calculator modules where the damaged draft clearly intended user inputs and computed outputs
- responsive layout suitable for desktop first, usable on mobile

## Recovery Strategy
1. Treat the corrupted paste as the source of truth for content, labels, section order, and intended interactions.
2. Recover missing JSX/logic conservatively: preserve meaning first, invent only where the draft is structurally broken.
3. Where exact behavior is unreadable, use the closest practical interpretation and mark assumptions in code comments or project notes.
4. Prefer a complete, coherent working experience over pixel-for-pixel fidelity to broken source.
5. Keep the app self-contained and deployable as a static React SPA.

## Preserved Content / Functionality Priorities
1. Core page copy, headings, and phase names from the corrupted draft
2. Overall flow from summary into deeper phase detail
3. Dashboard cards, stats, or visual summaries implied by the draft
4. Calculator interactions implied by visible inputs, outputs, or labels
5. Polished presentation and sane responsive behavior

## Design Direction
- Mood: credible, strategic, modern, finance-adjacent
- Visual direction: clean dark/light contrast or restrained premium palette; emphasis on legibility and information hierarchy
- Typography feel: sharp, contemporary sans-serif with strong section headings
- Avoid: generic startup gradients, toy-like widgets, cluttered dashboard chrome, obvious AI-placeholder styling

## Milestones

### Milestone 1 — Source Recovery and Scope Lock
Deliverables:
- Corrupted component content inspected and mapped into recoverable sections/interactions
- Explicit assumptions list for unreadable or ambiguous pieces
- Stable page outline covering summary, phase navigation, detail sections, and calculators

Acceptance criteria:
- Builder can identify every major section that will appear in the SPA
- Ambiguous behaviors are documented as `[ASSUMPTION]`
- No core user-facing section from the damaged draft is silently dropped

### Milestone 2 — Working SPA Reconstruction
Deliverables:
- Single-page React app rendering without syntax/runtime errors
- Summary view and phase navigation implemented
- Detailed phase sections populated with recovered content
- Dashboard summary blocks implemented
- Calculator sections implemented where clearly implied

Acceptance criteria:
- App loads locally with no fatal errors
- Navigation reaches each phase section predictably
- All major recovered content appears in a coherent layout
- Calculator interactions accept user input and update outputs without crashing

### Milestone 3 — Polish, QA, and Deployment
Deliverables:
- Visual cleanup and responsive adjustments
- Final verification against recovered intent
- Static production build
- Deployment to Ryan’s GitHub with live hosted URL

Acceptance criteria:
- Production build succeeds
- Page is usable at common desktop and mobile widths
- Live URL is reachable after deployment
- Final app reflects the original draft’s intent closely enough that missing syntax no longer blocks use

## Architecture Direction
- Static client-rendered React SPA
- No backend required unless the damaged source clearly references one; default assumption is frontend-only
- Section-based page composition with shared state only where calculators/navigation require it
- Deployment target should support static hosting from GitHub workflow or Pages-compatible output

## Success Definition
The final product is a live, working React single-page app that meaningfully reconstructs the corrupted draft, preserves its intended content and interaction model, and can be reviewed through a public URL.

## Verification Plan
- Mechanical gate: install, local dev run, production build
- Functional QA: verify summary view, phase navigation, phase detail sections, dashboards, and each calculator interaction
- Content QA: compare rendered headings/sections against recovered draft structure
- Responsive QA: desktop and mobile-width smoke checks
- Deployment QA: confirm public live link loads successfully

## Risks / Unknowns
- `[ASSUMPTION]` Some corrupted regions may be unreadable enough that exact original behavior cannot be restored.
- `[ASSUMPTION]` Calculator formulas may need reasonable reconstruction if the draft reveals UI intent but not complete logic.
- `[NEEDS INPUT]` Exact hosting preference on Ryan’s GitHub (GitHub Pages vs. another GitHub-linked static host) if repo/deployment setup is not already obvious.

## Out of Scope
- Rebuilding the original draft line-for-line if that conflicts with producing a stable app
- Adding backend services, auth, CMS, or analytics unless clearly present in the recovered source
- Expanding beyond the intended single-page experience into a multi-route product
- Net-new product features not suggested by the damaged draft
