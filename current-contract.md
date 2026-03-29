# Current Contract — FFI Futures Vision

## Scope
Recover a corrupted React component draft for Futures Funding / FFI into a working, polished single-page React app. The delivered app must preserve the original draft’s intended content and experience as closely as practical, including a summary view, phase navigation, detailed phase sections, dashboard-style summaries, and calculator-style interactions where clearly implied.

## In Scope
- Recovery of broken JSX/content into a stable SPA
- Preservation of recoverable headings, labels, and flow
- Reconstruction of dashboard and calculator sections where draft intent is visible
- Responsive polish sufficient for desktop and mobile smoke use
- Production build and deployment to a GitHub-hosted live URL

## Out of Scope
- Backend systems or APIs unless clearly required by the damaged draft
- Major feature invention beyond what the draft implies
- Multi-page routing architecture
- Exact line-for-line restoration of corrupted source when that prevents a stable product

## Success Criteria
1. The React app runs and builds without fatal errors.
2. The page presents a coherent single-page experience with summary, phase navigation, and detailed phase sections.
3. Dashboard-style summary areas are reconstructed into usable UI.
4. Calculator interactions are implemented where clearly implied and function without crashing.
5. The final UI is polished enough for external review and reflects the original draft’s intent.
6. A public live URL hosted through Ryan’s GitHub path is reachable.

## Verification Plan
- Run local app successfully
- Run production build successfully
- Test phase navigation end-to-end
- Test each calculator interaction with sample inputs
- Review rendered content against recovered section map
- Smoke check responsive behavior at desktop and mobile widths
- Open the public deployment URL and confirm load success

## Grading Criteria
| Criterion | Weight | Threshold |
|---|---:|---:|
| Functionality | 35% | 7/10 |
| Completeness of Recovery | 25% | 7/10 |
| Design Quality | 15% | 7/10 |
| Usability / Navigation Clarity | 10% | 7/10 |
| Code Quality / Stability | 10% | 6/10 |
| Edge Cases / Assumption Handling | 5% | 6/10 |

## Execution Shape
- Max iterations: 3
- Round 1 should pursue full recovery scope
- If verification fails, later rounds should narrow to explicit defects and mis-recovered interactions

## Assumptions / Inputs
- `[ASSUMPTION]` The source draft contains enough structure to infer the major sections and at least one meaningful calculator interaction.
- `[ASSUMPTION]` Static hosting is sufficient for the intended experience.
- `[NEEDS INPUT]` If GitHub deployment target is not already established, the builder may need Ryan’s preferred repo/location before final publish.
