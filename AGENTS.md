# AGENTS.md

## Port Mismatch (Known Issue)

- `vite.config.ts` sets `port: 4321, strictPort: true`, but `tauri.conf.json` has `devUrl: http://localhost:1420`
- `bun run tauri dev` runs `beforeDevCommand: "bun run dev"` (serves on 4321) then connects to 1420
- Docs and comments claim port 1420; the actual Vite config disagrees

## Key Commands

- `bun run dev` — Vite dev server (port 4321 per config, despite docs claiming 1420)
- `bun run tauri dev` — Full Tauri dev (frontend hot-reloads; Rust requires restart)
- `bun run build` / `bun run tauri build` — Frontend only / desktop (NSIS, Windows only)
- `bun run preview` — Preview production build
- `bun run prettier` — Format frontend (no ESLint configured)
- `cargo fmt` / `cargo clippy` — Format/lint Rust
- `cargo test` — Runs all Rust tests (currently **zero tests in codebase**)
- `bun install` / `bun add <pkg>` / `bun add -d <pkg>` — Frontend deps

## Architecture

**Frontend (React 19 + TS):** `src/main.tsx` → `App.tsx` → `pages/home-page.tsx`. Components in `components/` (ui/, icons/, top-navbar, template-generator, template-history, etc.). Toast calls need unique IDs (see common patterns below).

**Backend (Rust/Tauri 2):** `src-tauri/src/commands/` (Tauri commands using `Result<T, String>`), `domain/` (types/constants), `infra/` (filesystem, zip, JSON manifest, regex replacer), `services/` (scaffold generation, GitHub template downloads). To add a command: create file in `commands/`, export in `commands/mod.rs`, register in `lib.rs`.

## Stubbed / Incomplete

- `commands/tursor.rs` and `repositories/turso_repo.rs` — declared in `mod.rs` but **do not exist on disk**
- `config/Config.toml` has empty Turso credentials; `config/config.rs` is empty
- `components.json` uses `@images/*` aliases but Vite only defines `@` → `./src`; `@images` is **not** a working alias
- No `src/assets/` directory exists despite README references

## Config Quirks

- `tauri.conf.json` has `"csp": null` (wide open; production should tighten)
- Bundle targets: `["nsis"]` only (Windows); no macOS/Linux configured
- Auto-updater configured via GitHub releases (see `tauri.conf.json` `plugins.updater`)
- Commit convention: [better-commits](https://github.com/Everduin94/better-commits) (see `.better-commits.json`)

## Common Patterns

```javascript
// Toast invocation (ID required to prevent duplicates)
const toastId = 'unique-id';
toast.loading('Processing...', { id: toastId });
try {
  const result = await invoke('command_name', { param: value });
  toast.success('Success', { id: toastId, description: result.details });
} catch (error) {
  toast.error(error, { id: toastId });
}

// State updates (functional form)
setScaffoldData((prev) => ({ ...prev, phases: [...prev.phases, newPhase] }));
setScaffoldData((prev) => ({ ...prev, phases: prev.phases.filter((_, i) => i !== index) }));
```
