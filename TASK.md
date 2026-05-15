# Task — Extend `NudgeBanner` with an install-command picker

Your team is adding a new variant to `NudgeBanner`: when given a list of install methods, it should render an OS-aware dropdown + a monospace command + a copy button. You can see the desired final shape in `MOCK.md` (collapsed / open / copied states).

## Requirements (in priority order)

1. **Make the new behavior additive.** Passing no `installMethods` must render *exactly* as the component does today. The existing test must still pass.

2. **New optional props:**
   - `installMethods?: Array<{ key: string; label: string; command: string }>` — `label` is the short name (e.g. `"Homebrew"`, `"npm"`); the component renders `"Install with {label}"` in both the dropdown trigger and the menu items.
   - `defaultMethod?: string | 'auto'` — defaults to `'auto'`. With `'auto'`, pick based on `navigator.platform`:
     - macOS → `homebrew` (if present, else first method)
     - Windows → `winget` (if present, else first method)
     - Otherwise → first method
   - `footer?: ReactNode` — rendered as muted text below the command row.

3. **Analytics keys are per-method.**
   - On select from the dropdown: `action: 'select-{key}'` (e.g. `select-homebrew`).
   - On copy click: `action: 'copy-{key}'` (e.g. `copy-homebrew`).
   - Same `category` / `group` / `location` shape as the existing dismiss event. Emit via `data-analytics-event` on the relevant element (matching the existing pattern).

4. **Copy uses `navigator.clipboard.writeText`.** Show a "Copied" success state for **2 seconds** via a `role="status"` live region, then revert. Don't leak the timer if the component unmounts.

5. **If `installMethods.length === 1`**, hide the dropdown trigger. Render the command + copy button directly.

6. **Add at least one new test** for the install-picker behavior — pick the one with the highest signal. Keep the existing dismiss test green.

## Out of scope

- Building a new component or new package — *extend the existing `NudgeBanner.tsx`*.
- Real OS detection beyond `navigator.platform`.
- Dark mode, polished styling, animations.
- Narrow-viewport collapse (this is in the stretch goal).

## Stretch (only if you finish the requirements with time to spare)

- Narrow-viewport fallback (`@media (max-width: 480px)`) — stack vertically, hide the dropdown label, keep "Copy command".
- Per-method `data-testid` on the copy button so a test can target it without depending on render order.

## How to validate

- `npm test` — the existing test plus your new one(s) all pass.
- `npm run dev` and open the page in StackBlitz/your browser — try the dropdown, copy, dismiss.
- Skim your diff before declaring done. If something feels weird, mention it out loud.
