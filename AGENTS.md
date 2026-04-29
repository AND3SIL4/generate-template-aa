# AGENTS.md

Essential guidelines for working on the BYAAS Tauri + React desktop app.

## Key Commands

**Development:**

- `bun run tauri dev` - Full dev with hot reload (frontend only auto-reloads)
- `bun run dev` - Frontend only (port 1420)
- `bun run tauri dev --debug` - Verbose logging

**Production:**

- `bun run build` - Build frontend
- `bun run tauri build` - Build desktop app
- `bun run preview` - Preview locally

**Testing:**

- `cargo test` - Run Rust backend tests
- `cargo fmt` - Format Rust code
- `cargo clippy` - Lint Rust code

**Package Management:**

- `bun install` - Install dependencies
- `bun add <pkg>` - Add dependency
- `bun add -d <pkg>` - Add dev dependency

## Critical Details

**Ports & Networking:**

- Frontend dev server: **1420** (fixed, required by Tauri)
- HMR port: **1421** (when using TAURI_DEV_HOST)
- Vite ignores: `src-tauri/**` directory

**File Watching:**

- Frontend: Auto-reloads in `bun run tauri dev`
- Backend: **Requires restart** after Rust changes (not auto-reloaded)

**Asset Alias:**

- `@images` → `src/assets/images`

**Commit Convention:**

- Use [better-commits](https://github.com/Everduin94/better-commits) conventions
- See `.better-commits.json` for configuration

**Auto-Updater:**

- Configured via GitHub releases (see `src-tauri/tauri.conf.json`)
- Endpoint: `https://github.com/AND3SIL4/byaas/releases/latest/download/latest.json`

## Architecture Notes

**Frontend (React):**

- Functional components only
- Component structure follows `components/` categories (ui, layout, forms, etc.)
- State updates use functional form: `setState(prev => ({ ...prev, field: value }))`
- Toast notifications require IDs to prevent duplicates

**Backend (Rust/Tauri):**

- Modular structure: commands, domain, infra, services
- Commands use `Result<T, String>` with `?` operator for error handling
- Domain types follow Serde patterns with Deserialize/Serialize
- Add new commands: 1) Define in `commands/<module>.rs`, 2) Export in `commands/mod.rs`, 3) Register in `lib.rs`

## Common Patterns

**Tauri Command Invocation:**

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

**State Updates:**

```javascript
// Adding item
setScaffoldData((prev) => ({
  ...prev,
  phases: [...prev.phases, newPhase],
}));

// Removing item
setScaffoldData((prev) => ({
  ...prev,
  phases: prev.phases.filter((_, i) => i !== index),
}));
```

## Important Constraints

- Never expose secrets in frontend code
- Validate all inputs in Rust commands before processing
- Keep CSP strict for production builds
- Use Tauri's capability system for permission management
