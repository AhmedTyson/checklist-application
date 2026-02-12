# 🚀 How to Deploy Your Own Roadmap App

This Roadmap App is designed to be a **Template**. You can give it to anyone, and they can build their own curriculum (e.g., "Python Roadmap", "DevOps Roadmap", "Onboarding Checklist").

## 1. How to "Reset" the Content

To make this app empty for a new user:

1. Go to `apps/roadmap/`.
2. Delete `content.js`.
3. Rename `content.template.js` to `content.js`.

Now the app is blank!

## 2. How to Add Content (The Easy Way)

You don't need to write code to add content. We have an **Admin Panel**.

1. Open `admin.html` in your browser.
2. Use the UI to:
    - Add Stages (Categories).
    - Add Items (Lessons).
    - Write explanations and code snippets.
3. Click **"Export Data"** (Floppy Disk Icon).
4. Open the **Console** (F12 -> Console tab).
5. Copy the text that appears (It starts with `[`).
6. Paste it into `content.js` inside the `export const contentData = ...` variable.

## 3. How to Share / Deploy

Since this app is **100% Static HTML/CSS/JS**, you can host it anywhere for free.

### Option A: Send the Folder

Just zip the `apps/roadmap` folder and send it to your friend. They can open `index.html` and start using it locally.

### Option B: GitHub Pages (Online)

1. Create a new Repository on GitHub.
2. Upload these files.
3. Go to **Settings > Pages**.
4. Select `main` branch and `/root` folder.
5. Your app will be online at `yourname.github.io/repo-name`.

## 4. Customizing the Brand

To change the name (e.g., from "JS Curriculum" to "My Course"):

1. Open `index.html`.
2. Change `<title>Curriculum</title>`.
3. Change `<div class="brand-name">Curriculum</div>`.
4. Open `style.css` to change the colors (look for `:root` variables at the top).

## 5. Features (V3.0)

- **🛡️ Auto-Save**: Your work is now saved automatically to your browser's local storage. If you refresh, your session is restored instantly.
- **🔍 Search**: I added a search bar to the sidebar. You can now filter lessons by name.
- **🎨 UX**: Replaced annoying alerts with smooth "Toast" notifications (e.g., "Item Saved", "Stage Deleted").
- **Modules**: The code is now modular and robust.
