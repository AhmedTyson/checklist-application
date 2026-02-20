# Checklist Application

> An interactive, browser-based task checklist application — built as a structured JavaScript learning project with a full ES Module architecture and deployment pipeline.

![JavaScript](https://img.shields.io/badge/JavaScript-ES6_Modules-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)
![Node.js](https://img.shields.io/badge/Node.js-Dev_Tooling-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)
![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)

---

## 📋 Table of Contents

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

## ✨ Features

| Feature                     | Description                                                                       |
| --------------------------- | --------------------------------------------------------------------------------- |
| **Dynamic Task Management** | Add, complete, and remove tasks with live DOM updates                             |
| **Admin Panel**             | Separate admin interface (`admin.html`) for managing application state            |
| **Content Templates**       | `content.template.js` for reusable, dynamic content rendering                     |
| **ES Module Architecture**  | Fully modular codebase using native browser `import/export`                       |
| **Git Roadmap Guide**       | Bilingual (Arabic + English) interactive Git & GitHub reference in `git-roadmap/` |
| **Deployment Ready**        | `DEPLOY_GUIDE.md` and `netlify.toml`-compatible structure for hosting             |

---

## 💻 Tech Stack

| Layer               | Technology                                    |
| ------------------- | --------------------------------------------- |
| **Language**        | JavaScript (Vanilla ES6 Modules)              |
| **Runtime**         | Node.js (dev tooling & local server)          |
| **Frontend**        | HTML5, CSS3                                   |
| **Module System**   | Native browser ES Modules (no bundler needed) |
| **Package Manager** | npm                                           |

---

## 🏗️ Architecture

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

## 📁 Project Structure

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

## 🚀 Getting Started

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
