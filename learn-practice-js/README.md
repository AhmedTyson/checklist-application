# Synapse

**Knowledge Pathway & Learning Command Center**

Synapse is a standalone, personal learning management tool designed to help you organize curriculums, track progress, and master complex technical topics with precision. Unlike generic to-do lists, Synapse is built for the structured nature of learning—allowing you to break down subjects into modules, stages, and actionable items.

## Key Features

- **Structured Learning Paths**: Create custom roadmaps (e.g., "Advanced React", "System Design") or use built-in curriculums.
- **Granular Progress Tracking**: Track progress at the item, stage, and course level with visual visualizations.
- **Deep Dive Mode**: Each topic has a dedicated "Detail View" for notes, code snippets, and implementation references.
- **Study Streaks & Analytics**: Visual heatmaps and streak counters to keep you motivated and consistent.
- **Distraction-Free Interface**: A clean, modern dashboard focused entirely on your learning data.

## Installation

1. Clone the repository.

   ```bash
   git clone https://github.com/AhmedTyson/checklist-application.git
   cd checklist-application
   ```

2. Install dependencies.

   ```bash
   npm install
   ```

3. Start the application.
   ```bash
   npm start
   ```

## Building for Production

To create a standalone executable for your operating system:

```bash
# Windows
npm run package-win

# macOS
npm run package-mac

# Linux
npm run package-linux
```

_Build artifacts will be output to the `release-builds` directory._

## Usage

1. **Dashboard**: The central hub shows your active courses. Click on a course card to enter its specific dashboard.
2. **Detail View**: Inside a course, navigate through modules in the sidebar. Click any item to view its details, mark it as complete, or add notes.
3. **Course Management**: Use the "New Course" button on the main screen to define a new learning track. You can choose custom icons and colors to distinguish your subjects.

## License

MIT
