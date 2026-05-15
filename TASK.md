# Task — Extend `NudgeBanner` with an install-command picker

Your team is adding a new variant to `NudgeBanner`: when given a list of install methods, it should render an OS-aware dropdown + a monospace command + a copy button. You can see the desired final shape in `MOCK.md` (collapsed / open / copied states).

| The experience today | The target experience |
| -- | -- |
| See [this](https://chiedo.github.io/interview-react-nudge-banner/) | See [this](./MOCK.md) |


## Requirements (in priority order)

1. Use the primer react library for the changes you make: https://primer.style/product/getting-started/react/
1. This new functionality should be activated via an optional `installMethods` prop
1. **Make the new behavior additive.** Passing no `installMethods` must render *exactly* as the component does today. The existing test must still pass.
1. **Copy uses `navigator.clipboard.writeText`.** Show a "Copied" success state for **2 seconds** via a `role="status"` live region, then revert back to prior state. 
1. **If `installMethods.length === 1`**, hide the dropdown trigger. Render the command + copy button directly.
1. **Add at least one new test** for the install-picker behavior — pick the one with the highest signal. Keep the existing dismiss test green.

## How to validate

- `npm test` — the existing test plus your new one(s) all pass.
- `npm run dev` and open the page in StackBlitz/your browser — try the dropdown, copy, dismiss.
- Skim your diff before declaring done. If something feels weird, mention it out loud.
