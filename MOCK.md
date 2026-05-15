# Mock — the install-picker variant of `NudgeBanner`

Structural mocks, not pixel-perfect designs. Match the **shape** and the **behavior**; don't worry about exact spacing or colors.

The full requirements live in [`TASK.md`](./TASK.md). This file is the visual + interaction reference.

## The states

### 1. Dropdown collapsed (default)

![NudgeBanner with installMethods, dropdown collapsed: icon, title, description, dropdown trigger labeled "Install with Homebrew", monospace command "brew install our-cli", Copy button, dismiss × in the top-right corner.](./docs/mocks/state-1-collapsed.svg)

### 2. Dropdown open

![NudgeBanner with the dropdown menu open below the trigger. The menu lists four methods: "Install with Homebrew" (selected, with a check mark on a highlighted row), "Install with npm", "Install with WinGet", "Install with script". The trigger has a blue focus ring.](./docs/mocks/state-2-open.svg)

### 3. "Copied" success (announced via `role="status"`, reverts after 2 s)

![NudgeBanner identical to state 1 except the Copy button is replaced by a green pill labeled "✓ Copied".](./docs/mocks/state-3-copied.svg)

### 4. Single method (`installMethods.length === 1`)

![NudgeBanner with only one install method: the dropdown trigger is hidden; the command and Copy button render directly.](./docs/mocks/state-4-single-method.svg)


## Schema reminder

`installMethods: Array<{ key: string; label: string; command: string }>`

- `key` — analytics suffix and stable identity (e.g. `homebrew`, `npm`, `winget`, `script`).
- `label` — the **short** name (e.g. `"Homebrew"`, `"npm"`). The component renders `"Install with {label}"` in both the trigger and the menu items.
- `command` — the exact string copied to the clipboard.
