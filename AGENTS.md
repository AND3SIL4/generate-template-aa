# AGENTS.md

This file contains guidelines for agentic coding agents working on this Tauri + React desktop application.

## Project Overview

This is a Tauri 2.0 desktop application with a React 19 frontend. The project uses:
- **Frontend**: React 19.1.0 with Vite 7.0.4
- **Backend**: Rust with Tauri 2.0 framework
- **Package Manager**: Bun (use `bun` commands, not npm)
- **Architecture**: Hybrid desktop app with web frontend and native Rust backend

## Build Commands

### Development
```bash
bun run dev                    # Start Vite dev server (frontend only)
bun run tauri dev             # Full Tauri development with hot reload
```

### Production
```bash
bun run build                  # Build frontend for production
bun run tauri build           # Build complete desktop application
bun run preview               # Preview production build
```

### Testing
**Note**: No test framework is currently configured. When adding tests:
- Consider Vitest for React components
- Use Rust's built-in test framework for backend
- Add test scripts to package.json as needed

## Code Style Guidelines

### React/JavaScript Frontend

#### Component Structure
- Use functional components with hooks (no class components)
- Follow the existing pattern: imports first, then component, then export
- Use PascalCase for component names
- Keep components in separate files when they grow beyond 50 lines

```jsx
import { useState } from "react";
import { invoke } from "@tauri-apps/api/core";
import "./Component.css";

function ComponentName() {
  const [state, setState] = useState("");

  async function handleAction() {
    // Tauri command calls go here
    const result = await invoke("command_name", { param: state });
  }

  return (
    <main className="container">
      {/* JSX content */}
    </main>
  );
}

export default ComponentName;
```

#### Imports
- React hooks first: `import { useState, useEffect } from "react";`
- Tauri API second: `import { invoke } from "@tauri-apps/api/core";`
- Local imports third: `import "./App.css";`
- Asset imports last: `import logo from "./assets/logo.svg";`

#### State Management
- Use `useState` for local component state
- Use `invoke()` for all Tauri backend communication
- Async functions should handle errors appropriately

#### CSS
- Use CSS modules or scoped classes (see App.css pattern)
- Support dark mode with CSS custom properties
- Use flexbox for layouts (follow existing container pattern)

### Rust Backend

#### File Organization
- `main.rs`: Application entry point only
- `lib.rs`: Core logic and Tauri commands
- Keep commands focused and single-purpose

#### Command Pattern
```rust
#[tauri::command]
fn command_name(param: &str) -> Result<String, String> {
    // Process input
    Ok(format!("Result: {}", param))
}
```

#### Error Handling
- Use `Result<T, String>` for command return types
- Handle errors gracefully with meaningful messages
- Use `expect()` only for non-recoverable errors in main()

#### Code Style
- Use `rustfmt` for consistent formatting
- Snake_case for function and variable names
- PascalCase for types and structs
- Add doc comments for public functions

## Tauri Integration

### Frontend-Backend Communication
- Always use `invoke()` for Rust command calls
- Pass parameters as objects: `invoke("command", { param: value })`
- Handle async operations with try/catch or proper error states

### Configuration
- Development port: 1420 (fixed, required by Tauri)
- Frontend dist: `../dist`
- Window size: 800x600 (configurable in tauri.conf.json)

## Development Workflow

### Making Changes
1. Frontend changes: Use `bun run tauri dev` for hot reload
2. Backend changes: Restart `bun run tauri dev` after Rust changes
3. Test both frontend and backend integration

### File Structure
```
src/                    # React frontend
├── main.jsx           # React entry point
├── App.jsx            # Main component
└── assets/            # Static assets

src-tauri/src/         # Rust backend
├── main.rs           # Application entry
└── lib.rs            # Core logic and commands
```

## Security Considerations

- Never expose sensitive data in frontend
- Validate all inputs in Rust commands
- Use Tauri's capability system for permissions
- Keep CSP null only for development (configure for production)

## Common Patterns

### Adding New Commands
1. Define command in `src-tauri/src/lib.rs`
2. Add to `invoke_handler` in `run()` function
3. Call from frontend using `invoke()`

### Component Creation
1. Create new component file in `src/`
2. Import and use in `App.jsx` or parent component
3. Add corresponding CSS file if needed

### State Updates
- Use functional updates for derived state: `setCount(prev => prev + 1)`
- Batch state updates when possible
- Handle async state updates with loading states

## Package Management

- Use `bun` for all package operations
- Add frontend dependencies to `package.json`
- Add Rust dependencies to `src-tauri/Cargo.toml`
- Run `bun install` after package.json changes

## Performance Guidelines

- Use React.memo for expensive components
- Implement proper loading states for async operations
- Minimize re-renders by using appropriate dependencies
- Consider using useCallback for event handlers

## Debugging

- Frontend: Use browser dev tools (React DevTools recommended)
- Backend: Use `println!` for debugging, check console output
- Tauri: Use `bun run tauri dev --debug` for additional logging