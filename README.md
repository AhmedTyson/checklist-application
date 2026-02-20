# <img src="https://api.iconify.design/lucide:check-circle.svg?color=%238A2BE2" width="32" height="32" align="center" /> Checklist Application

> **An interactive, browser-based task checklist application.**
> Structured around modern ES Module patterns, precision-built for scalability and rapid deployment.

<div align="center">

| Project Status | Core Technology                                                                                             | Developer Experience                                                                                          | Deployment                                                                                                      |
| :------------- | :---------------------------------------------------------------------------------------------------------- | :------------------------------------------------------------------------------------------------------------ | :-------------------------------------------------------------------------------------------------------------- |
| `PRODUCTION`   | ![JS](https://img.shields.io/badge/JavaScript-ESM-F7DF1E?style=flat-square&logo=javascript&logoColor=black) | ![Node.js](https://img.shields.io/badge/Node.js-Vite-339933?style=flat-square&logo=nodedotjs&logoColor=white) | ![Netlify](https://img.shields.io/badge/Netlify-Deployed-00C7B7?style=flat-square&logo=netlify&logoColor=white) |

</div>

---

## <img src="https://api.iconify.design/lucide:list.svg?color=%238A2BE2" width="20" height="20" align="center" /> Table of Contents

- [Overview](#overview)
- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Architecture](#-architecture)
- [Project Structure](#-project-structure)
- [Getting Started](#-getting-started)

---

## Overview

This repository is a purpose-built JavaScript learning project structured around a real, working checklist application. The goal was not just to build a to-do list — but to apply modern JavaScript architecture patterns: **ES Modules**, separation of concerns, component-based rendering, and a proper deployment pipeline.

The core app (`learn-practice-js/`) is deployed and includes a multi-page admin interface, a content template system, and a full `src/` directory organized into logical layers. A `git-roadmap/` directory also contains an interactive bilingual Git & GitHub guide.

---

---

## <img src="https://api.iconify.design/lucide:sparkles.svg?color=%238A2BE2" width="20" height="20" align="center" /> Features

| Feature                     | Description                                                                       |
| --------------------------- | --------------------------------------------------------------------------------- |
| **Dynamic Task Management** | Add, complete, and remove tasks with live DOM updates                             |
| **Admin Panel**             | Separate admin interface (`admin.html`) for managing application state            |
| **Content Templates**       | `content.template.js` for reusable, dynamic content rendering                     |
| **ES Module Architecture**  | Fully modular codebase using native browser `import/export`                       |
| **Git Roadmap Guide**       | Bilingual (Arabic + English) interactive Git & GitHub reference in `git-roadmap/` |
| **Deployment Ready**        | `DEPLOY_GUIDE.md` and `netlify.toml`-compatible structure for hosting             |

---

---

## <img src="https://api.iconify.design/lucide:cpu.svg?color=%238A2BE2" width="20" height="20" align="center" /> Tech Stack

| Layer               | Technology                                    |
| ------------------- | --------------------------------------------- |
| **Language**        | JavaScript (Vanilla ES6 Modules)              |
| **Runtime**         | Node.js (dev tooling & local server)          |
| **Frontend**        | HTML5, CSS3                                   |
| **Module System**   | Native browser ES Modules (no bundler needed) |
| **Package Manager** | npm                                           |

---

---

## <img src="https://api.iconify.design/lucide:git-pull-request.svg?color=%238A2BE2" width="20" height="20" align="center" /> Architecture

```
learn-practice-js/
│
├── index.html              # App entry point
├── courses.html            # Course listings
├── admin.html              # Admin interface
├── content.template.js     # Reusable content rendering template
│
└── src/
    ├── app/                # Core application logic (task state, event handlers)
    ├── admin/              # Admin-specific modules
    ├── shared/             # Shared utilities (DOM helpers, formatters)
    └── data/               # Data layer (mock data, constants)
```

### Design Principles

- **No Bundler** — relies on native ES Module support in modern browsers
- **Layer Separation** — `app`, `admin`, `shared`, and `data` are isolated modules
- **Progressive Enhancement** — app works without JavaScript for basic content

---

---

## <img src="https://api.iconify.design/lucide:folder-tree.svg?color=%238A2BE2" width="20" height="20" align="center" /> Project Structure

```
checklist-application/
├── package.json                # Node.js scripts and dev dependencies
├── package-lock.json
│
└── learn-practice-js/          # Main application
    ├── index.html
    ├── courses.html
    ├── admin.html
    ├── content.template.js
    ├── main.js                 # JavaScript entry point
    ├── DEPLOY_GUIDE.md         # Deployment instructions
    ├── README.md
    │
    ├── src/                    # Modular source code
    │   ├── app/
    │   ├── admin/
    │   ├── shared/
    │   └── data/
    │
    └── git-roadmap/            # Interactive Git/GitHub guide
        ├── index.html          # English version
        └── arabic.html         # Arabic version
```

---

---

## <img src="https://api.iconify.design/lucide:rocket.svg?color=%238A2BE2" width="20" height="20" align="center" /> Getting Started

```bash
# Clone the repository
git clone https://github.com/AhmedTyson/checklist-application.git

# Navigate to the app directory
cd checklist-application/learn-practice-js

# Option 1: Use Node.js live server
npm install
npm start

# Option 2: Use Python's built-in server (no install required)
python -m http.server 8000
```

Open your browser at `http://localhost:8000`.

> **Note:** The app uses native ES Modules, so it must be served via HTTP — not opened as a raw `file://` URL.
