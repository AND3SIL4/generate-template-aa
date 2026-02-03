# AGENTS.md

Guidelines for agentic coding agents working on this Tauri + React desktop application.

## Project Overview

Tauri 2.0 desktop app with React 19 frontend for generating Automation Anywhere scaffold templates.

**Stack:**
- **Frontend**: React 19.1.0 + Vite 7.0.4 + Tailwind CSS v4
- **Backend**: Rust with Tauri 2.0 framework
- **Package Manager**: Bun
- **Styling**: Tailwind CSS with `@tailwindcss/vite` plugin
- **Notifications**: Sonner for toast notifications

## Build Commands

### Development
```bash
bun run dev                    # Start Vite dev server (frontend only, port 1420)
bun run tauri dev             # Full Tauri development with hot reload
bun run tauri dev --debug     # Tauri dev with additional logging
```

### Production
```bash
bun run build                  # Build frontend for production
bun run tauri build           # Build complete desktop application
bun run preview               # Preview production build locally
```

### Testing
```bash
# Rust backend tests
cargo test                     # Run all Rust tests
cargo test test_name          # Run single test by name
cargo test module_name::      # Run tests in specific module

# Frontend tests (Vitest not configured yet - add if needed)
```

## Code Style Guidelines

### React/JavaScript Frontend

#### Component Structure
- **Functional components only** - no class components
- **PascalCase** for component names and files (e.g., `ScaffoldForm.jsx`)
- **camelCase** for functions and variables
- Group imports: React hooks → External libs → Tauri API → Local imports
- Keep components focused; extract logic to custom hooks when >100 lines

```jsx
import { useEffect, useState } from "react";
import { invoke } from "@tauri-apps/api/core";
import { toast } from "sonner";
import AddPhase from '../shared/addPhase';

function ComponentName() {
  const [state, setState] = useState("");

  async function handleAction() {
    const toastId = "unique-toast-id";
    try {
      toast.loading("Processing...", { id: toastId });
      const result = await invoke("command_name", { param: state });
      toast.success("Success", { id: toastId, description: result.details });
    } catch (error) {
      toast.error(error, { id: toastId });
    }
  }

  return (
    <main className="container">
      {/* JSX with Tailwind classes */}
    </main>
  );
}

export default ComponentName;
```

#### Import Order
1. React hooks: `import { useEffect, useState } from "react"`
2. External libraries (sonner, etc.)
3. Tauri API: `import { invoke } from "@tauri-apps/api/core"`
4. Local components: `import Component from "./path"`
5. Styles: `import "./Component.css"`

#### State Management
- Use `useState` for component state
- Use functional updates for derived state: `setState(prev => ({ ...prev, field: value }))`
- Invoke Tauri commands with try/catch + sonner toasts
- Always use toast IDs for loading states to prevent duplicates

### Rust Backend

#### File Organization (Modular Architecture)
```
src-tauri/src/
├── main.rs              # Application entry point only
├── lib.rs               # Plugin setup and command registration
├── commands/            # Tauri command handlers
│   ├── mod.rs
│   └── scaffold.rs
├── domain/              # Domain logic, types, constants
│   ├── mod.rs
│   ├── constants.rs
│   └── implementations.rs
├── infra/               # Infrastructure (filesystem, zip, etc.)
│   ├── mod.rs
│   ├── filesystem.rs
│   ├── zipper.rs
│   └── replacer.rs
└── services/            # Business logic services
    ├── mod.rs
    ├── generate_scaffold.rs
    └── github_releases.rs
```

#### Command Pattern
```rust
use crate::domain::implementations::{ScaffoldData, ScaffoldResponse};

#[tauri::command]
pub fn generate_template(scaffold_data: ScaffoldData) -> Result<ScaffoldResponse, String> {
    // Implementation with ? operator for error propagation
    let result = some_operation().map_err(|e| e.to_string())?;
    Ok(ScaffoldResponse::success(&result))
}
```

#### Error Handling
- Use `Result<T, String>` for Tauri command return types
- Use `?` operator with `.map_err(|e| e.to_string())` for conversions
- Provide meaningful error messages for user display
- Use `.ok_or("descriptive error message")?` for Option to Result

#### Code Style
- **snake_case**: functions, variables, modules
- **PascalCase**: structs, enums, types
- **SCREAMING_SNAKE_CASE**: constants
- Use `pub` for public exports
- Add doc comments `///` for public functions and structs
- Use `rustfmt` for formatting: `cargo fmt`

#### Domain Types Pattern
```rust
use serde::{Deserialize, Serialize};

#[derive(Serialize)]
pub struct ScaffoldResponse {
    pub msg: String,
    pub details: String,
}

impl ScaffoldResponse {
    pub fn success(path: &str, matches: &usize) -> Self {
        Self {
            msg: "Template generated successfully".into(),
            details: format!("Total matches: '{}', Final location: '{}'", matches, path),
        }
    }
}

#[derive(Deserialize)]
pub struct ScaffoldData {
    pub name: String,
    pub phases: Vec<String>,
    pub customer: String,
}
```

## Tauri Integration

### Frontend-Backend Communication
- Always use `invoke()` for Rust command calls
- Pass parameters as named objects: `invoke("generate_template", { scaffoldData: data })`
- Handle async operations with try/catch and proper toast notifications
- Use toast IDs to manage loading/error/success states

### Adding New Commands
1. Define command in `src-tauri/src/commands/<module>.rs`
2. Add `pub mod <module>;` in `commands/mod.rs`
3. Register in `lib.rs`: `tauri::generate_handler![commands::<module>::<function>]`
4. Call from frontend using `invoke()`

## Development Workflow

### File Watching
- Frontend: Vite handles hot reload automatically
- Backend: Restart `bun run tauri dev` after Rust changes (not auto-reloaded)
- Vite ignores `src-tauri/**` directory

### Configuration
- Development port: 1420 (fixed, required by Tauri)
- HMR port: 1421 (when using TAURI_DEV_HOST)
- Frontend dist: `../dist` (relative to src-tauri)
- Asset alias: `@images` → `src/assets/images`

## Package Management

### Frontend (Bun)
```bash
bun install                    # Install dependencies
bun add <package>             # Add dependency
bun add -d <package>          # Add dev dependency
```

### Backend (Cargo)
```bash
cargo build                    # Build Rust code
cargo check                    # Check without building
cargo fmt                      # Format code
cargo clippy                   # Run linter
```

## Common Patterns

### Toast Notifications with Sonner
```javascript
const toastId = "unique-id";
toast.loading("Loading...", { id: toastId });
try {
  const result = await operation();
  toast.success("Success", { id: toastId, description: result.msg });
} catch (error) {
  toast.error(error, { id: toastId });
}
```

### State Updates with Functional Updates
```javascript
setScaffoldData(prev => ({ 
  ...prev, 
  phases: [...prev.phases, newPhase] 
}));
```

### Filter Operations
```javascript
setScaffoldData(prev => ({
  ...prev,
  phases: prev.phases.filter((_, i) => i !== index),
}));
```

## Security Guidelines

- Never expose sensitive data in frontend code
- Validate all inputs in Rust commands before processing
- Use Tauri's capability system for permission management
- Keep CSP strict for production builds

## Debugging

- **Frontend**: Browser DevTools (F12), React DevTools extension
- **Backend**: `println!()` macros, check terminal output
- **Tauri**: `bun run tauri dev --debug` for verbose logging
- **Errors**: Use sonner toasts for user-facing errors
