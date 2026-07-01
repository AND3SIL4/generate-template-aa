## Commands

- `bun run dev` — Vite dev server on port 1420
- `bun run tauri dev` — Full Tauri app (frontend hot-reloads; Rust requires restart)
- `bun run build` / `bun run tauri build` — Frontend only / desktop (NSIS, Windows only)
- `bun run preview` — Preview production build
- `bun run prettier` — Prettier format (no ESLint)
- `bun run shadcn` — Add shadcn/ui components
- `cargo fmt` / `cargo clippy` — Format/lint Rust
- `cargo test` — Rust tests (currently zero tests in codebase)

## Architecture

**Frontend (React 19 + TS):** `src/main.tsx` → `App.tsx` → `pages/home-page.tsx`. Three views: generator, docs, history. Components in `components/` (ui/, icons/, template-generator, template-history, documentation, top-navbar). Aliases: `@` → `src/` (Vite + tsconfig), `@images` → `src/assets/images` (Vite only, not in tsconfig, and `src/assets/` does not exist on disk).

**Backend (Rust/Tauri 2):** `src-tauri/src/commands/scaffold.rs` (single command `generate_template` → `Result<ScaffoldResponse, String>`), `services/` (generate_scaffold, github_releases, database), `infra/` (filesystem, zip, json, replacer). To add a command: create file in `commands/`, export in `commands/mod.rs`, register handler in `lib.rs`.

## Gotchas

- **Database:** `generate_template` calls `services::database::get_database_connection()` which reads `DATABASEPASS` env var and panics via `expect()` if missing or if Supabase Postgres is unreachable. The DB insert is optional for the core feature but will crash the command if it fails.
- **components.json** uses `@images/*` aliases (shadcn default) but they are **not** a working path — the actual source never imports from `@images/`. Only `@/` imports are used.
- **Bundle targets:** `["nsis"]` only (Windows); no macOS/Linux configured.
- **CSP:** `null` (wide open).
- **`generatedAt`** is a required field on `HistoryItem` interface but missing from the mock data in `history.ts`.
- **`src/assets/`** referenced in README and vite config does not exist on disk.
- **No CI/CD pipelines** in `.github/`, no pre-commit hooks, no husky.

## Conventions

- **Commits:** [better-commits](https://github.com/Everduin94/better-commits) with emoji (see `.better-commits.json`).
- **Toast calls need unique IDs** to prevent duplicates:

```javascript
const toastId = 'unique-id';
toast.loading('Processing...', { id: toastId });
try {
  const result = await invoke('command_name', { param: value });
  toast.success('Success', { id: toastId, description: result.details });
} catch (error) {
  toast.error(error, { id: toastId });
}
```

- **State updates** use functional form: `setData((prev) => ({ ...prev, key: newVal }))`.
