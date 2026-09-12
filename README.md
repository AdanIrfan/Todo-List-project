# Todo List

A project-based Todo List web application built with JavaScript as part of [The Odin Project](https://www.theodinproject.com/).

The application lets users organize tasks into projects and manage each task's name, description, status, due date, and priority.

## Live Demo

[View the Todo List](https://adanirfan.github.io/Todo-List-project/)

The application is deployed using GitHub Pages.

## Features

### Project Management

- Create new projects
- View and select available projects
- Delete projects
- Use the default project provided at startup
- Keep a separate task collection for each project
- Highlight the currently selected project

### Task Management

- Create tasks inside the selected project
- View task details
- Edit existing tasks
- Delete tasks
- Mark tasks as complete or pending
- Set task priority to high, medium, or low
- Set a due date
- Add an optional description
- Display an empty-state message when a project has no tasks

### Validation and Persistence

- Require project and task names
- Require a task status, priority, and valid due date
- Reject duplicate project names
- Keep invalid submissions from changing the data model
- Save projects and tasks to the browser's `localStorage`
- Restore saved data when the application loads
- Reconstruct restored projects and tasks as JavaScript objects
- Ignore malformed saved data instead of breaking application startup

## Technologies Used

- **HTML5** - Application structure
- **CSS3** - Styling, layout, and task states
- **JavaScript (ES6+)** - Application logic and DOM interaction
- **Webpack** - Module bundling and development server
- **Local Storage API** - Persistent browser storage
- **Git** - Version control
- **GitHub Pages** - Deployment

## Getting Started

### Requirements

- Node.js and npm

### Installation

```bash
npm install
```

### Development

Start the Webpack development server:

```bash
npm run dev
```

The development server opens the application in a browser and reloads when source files change.

### Production Build

Create a production bundle in the `dist` directory:

```bash
npm run build
```

## Project Architecture

The application separates the data model, application logic, storage, and user interface into focused modules.

```text
Todo-List-project/
├── src/
│   ├── appController.js  Validation and create, update, and delete operations
│   ├── domController.js  Event handlers and UI rendering
│   ├── index.js           Application entry point
│   ├── storage.js         localStorage save and restore functions
│   ├── styles.css         Application styling
│   ├── task.js            Project, task, and project manager objects
│   └── template.html      HTML template
├── package.json
├── webpack.config.js
└── README.md
```

### Application Flow

```text
index.js
   │
   ├── restoreProjects() ──> storage.js ──> localStorage
   │
   └── initializeDom()
	   │
	   ├── domController.js ──> appController.js
	   │                              │
	   │                              └── task.js
	   │
	   └── User interface

Changes made through the application are saved through storage.js.
```

## Data Storage

Projects and tasks are stored in the browser under the `todoProjects` localStorage key. Storage is browser-specific, so data is not shared between browsers or devices. Clearing browser site data removes the saved Todo List data.

## License

This project was created for learning purposes as part of The Odin Project curriculum.