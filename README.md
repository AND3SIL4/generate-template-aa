# byaas-project

A modern desktop application built with [Tauri 2.0](https://tauri.app/) and [React 19](https://react.dev/), combining web technologies with native performance.

## 🚀 Overview

**byaas-project** is a cross-platform desktop application that leverages the power of React for the frontend and Rust for the backend through the Tauri framework. This architecture provides the best of both worlds: modern web development workflows with native performance and platform integration.

### Key Features

- **Cross-platform**: Windows, macOS, and Linux support
- **Modern Stack**: React 19 with Vite 7, Rust backend
- **Fast Development**: Hot reload for both frontend and backend
- **Native Integration**: File system, system APIs, and platform-specific features
- **Small Bundle Size**: Optimized builds with minimal overhead

## 📁 Project Structure

```
byaas-project/
├── src/                    # React frontend
│   ├── main.jsx           # React entry point
│   ├── App.jsx            # Main application component
│   ├── App.css            # Styling with dark mode support
│   └── assets/            # Static assets
├── src-tauri/             # Rust backend
│   ├── src/
│   │   ├── main.rs        # Application entry point
│   │   └── lib.rs         # Core logic and Tauri commands
│   ├── Cargo.toml         # Rust dependencies
│   ├── tauri.conf.json    # Tauri configuration
│   └── icons/             # Application icons
├── public/                # Static public assets
├── package.json           # Frontend dependencies
├── vite.config.js         # Vite configuration
└── AGENTS.md              # Development guidelines
```

## 🛠️ Technology Stack

### Frontend
- **React 19.1.0** - Modern UI framework
- **Vite 7.0.4** - Fast build tool and dev server
- **@tauri-apps/api 2.x** - Tauri frontend API
- **CSS3** - Styling with dark mode support

### Backend
- **Rust** - Systems programming language
- **Tauri 2.x** - Desktop app framework
- **Serde 1.x** - JSON serialization
- **tauri-plugin-opener** - URL opening functionality

### Development Tools
- **Bun** - Fast package manager
- **VS Code** - Recommended IDE with Tauri and Rust extensions

## 📋 Prerequisites

Before running this project, ensure you have the following installed:

1. **Bun** - Package manager
   ```bash
   curl -fsSL https://bun.sh/install | bash
   ```

2. **Rust** - Backend development
   ```bash
   curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh
   ```

3. **System Dependencies** - Platform-specific build tools
   - **Ubuntu/Debian**: `sudo apt install libwebkit2gtk-4.0-dev build-essential`
   - **macOS**: Xcode Command Line Tools
   - **Windows**: Microsoft Visual Studio C++ Build Tools

## 🚀 Quick Start

### 1. Clone and Install
```bash
git clone <repository-url>
cd byaas-project
bun install
```

### 2. Development Mode
```bash
bun run tauri dev
```

This starts the development server with hot reload for both frontend and backend changes.

### 3. Build for Production
```bash
bun run tauri build
```

Creates optimized desktop binaries for all platforms.

## 📖 Available Commands

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

### Package Management
```bash
bun install                   # Install all dependencies
bun add <package>             # Add new frontend dependency
bun add <package> -D          # Add dev dependency
```

## 🏗️ Architecture

### Frontend-Backend Communication

The application uses Tauri's command system for secure frontend-backend communication:

```javascript
// Frontend (React)
import { invoke } from "@tauri-apps/api/core";

const result = await invoke("greet", { name: "World" });
```

```rust
// Backend (Rust)
#[tauri::command]
fn greet(name: &str) -> String {
    format!("Hello, {}! You've been greeted from Rust!", name)
}
```

### Component Pattern

```jsx
import { useState } from "react";
import { invoke } from "@tauri-apps/api/core";

function Component() {
  const [state, setState] = useState("");

  async function handleAction() {
    const result = await invoke("command_name", { param: state });
    // Handle result
  }

  return <div>{/* JSX content */}</div>;
}
```

## ⚙️ Configuration

### Tauri Configuration (`src-tauri/tauri.conf.json`)

- **Window Size**: 800x600 pixels
- **Development Port**: 1420 (fixed)
- **Bundle Targets**: All platforms
- **Security**: CSP null (development mode only)

### Vite Configuration (`vite.config.js`)

- **Port**: 1420 (strict, required by Tauri)
- **HMR**: Enabled on port 1421
- **Ignored**: `src-tauri` directory

## 🎨 Features

### Current Functionality

- **Greeting System**: Interactive form demonstrating frontend-backend communication
- **Template Landing Page**: Educational links to Tauri, Vite, and React documentation
- **Cross-platform Support**: Native builds for Windows, macOS, and Linux
- **Dark Mode Ready**: CSS structure supports theme switching

### Extending the Application

1. **Add New Commands**: Define in `src-tauri/src/lib.rs`
2. **Create Components**: Add to `src/` directory
3. **Styling**: Use CSS modules or scoped classes
4. **State Management**: Implement with React hooks or external libraries

## 🔧 Development Workflow

### Making Changes

1. **Frontend Changes**: Auto-reload in `bun run tauri dev`
2. **Backend Changes**: Restart dev server after Rust modifications
3. **Testing**: Use browser dev tools for frontend, console for backend

### Debugging

- **Frontend**: Browser developer tools
- **Backend**: Console output and `println!` statements
- **Tauri**: `bun run tauri dev --debug` for additional logging

## 📚 Documentation

- **[Tauri Documentation](https://tauri.app/develop/)** - Framework guides and API reference
- **[React Documentation](https://react.dev/)** - React features and best practices
- **[Vite Documentation](https://vite.dev/)** - Build tool configuration
- **[AGENTS.md](./AGENTS.md)** - Development guidelines for coding agents

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙋‍♂️ Support

- **Issues**: Report bugs via GitHub Issues
- **Questions**: Use GitHub Discussions
- **Community**: Join the [Tauri Discord](https://discord.gg/tauri)

---

**Built with ❤️ using Tauri + React**