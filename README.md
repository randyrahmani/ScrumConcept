# ScrumConcept

ScrumConcept is a small, lightweight proof of concept for Scrum project
management. It provides a Jira-inspired sprint board, product backlog, sprint
metrics, issue creation, issue filtering, and workflow status updates.

The application currently uses Node.js, Express, EJS, Bootstrap, and in-memory
data. It is intended to evolve into a full MEAN-stack application.

## SETUP AND RUN

The project needs Git, Node.js, npm, and the project's npm packages before it
can run ScrumConcept. MongoDB and Angular are not required for the current proof
of concept.

### 1. Install Git


### 2. Install Node.js and npm

Open the [official Node.js download page](https://nodejs.org/en/download),
select the **LTS** release, and follow its instructions for the destination
operating system and processor architecture. ScrumConcept requires Node.js 18
or newer, but a brand-new machine should use the current supported LTS release.

The standard Node.js installation includes npm, so npm does not normally need a
separate installer. Restart the terminal after installation so the new commands
are available.

### 3. Verify the system dependencies

Open a new terminal and run:

```bash
git --version
node --version
npm --version
```

node version must be the latest or v18+. All three commands must print a version. If a command is not found, restart the
terminal and confirm that its installer added the program to the system `PATH`.

### 4. Clone the repository

Copy the HTTPS or SSH clone URL from the repository page, then run:

```bash
git clone <repository-url>
cd ScrumConcept
```

### 5. Install the project dependencies

Restore the
exact dependency versions recorded in `package-lock.json`:

```bash
npm ci
```

This installs Express, EJS, Bootstrap, and their required transitive packages
into a new local `node_modules` directory. Do not commit that directory.

### 6. Start the application

```bash
npm start
```

Once the server starts, open:

```text
http://localhost:3000
```

Stop the application by pressing `Ctrl+C` in the terminal where it is running.

## Features

- Active sprint overview with completion and story-point metrics
- Four-stage workflow: To do, In progress, In review, and Done
- Issue creation with type, priority, assignee, points, and initial status
- Status updates directly from the sprint board
- Product backlog containing future work
- Client-side filtering by issue key, title, or assignee
- Responsive Bootstrap interface
- Custom 404 page
- Local frontend assets with no CDN dependency

## Current technology stack

| Area | Technology | Purpose |
| --- | --- | --- |
| Runtime | Node.js | Runs the application and server-side JavaScript. |
| Web server | Express 5 | Handles routes, form submissions, views, and static assets. |
| Server-rendered UI | EJS | Produces HTML using the current project, sprint, and issue data. |
| Interface | Bootstrap 5 | Provides the responsive layout and UI components. |
| Browser behavior | Vanilla JavaScript | Filters visible board and backlog issues. |
| Data models | JavaScript classes | Define projects, sprints, tasks, and backlog items. |
| Data storage | In-memory arrays | Stores proof-of-concept data for the lifetime of the Node process. |

Bootstrap is installed as an npm dependency and served locally from
`node_modules/bootstrap/dist`. The application does not load Bootstrap, fonts,
scripts, or other assets from a CDN.

### Relationship to the MEAN stack

MEAN stands for MongoDB, Express, Angular, and Node.js.

| MEAN component | Current status |
| --- | --- |
| MongoDB | Not implemented. Data is currently held in memory. |
| Express | Implemented as the HTTP server and routing layer. |
| Angular | Not implemented. EJS currently renders the interface. |
| Node.js | Implemented as the application runtime. |

Moving to the full MEAN stack will involve adding MongoDB persistence and an
Angular frontend. Express can then provide a JSON API instead of rendering the
main interface with EJS.

## Development mode

Run the server with Node's watch mode during development:

```bash
npm run dev
```

The server restarts after a saved server-side file change. Refresh the browser
to see the updated page.

## Configuration

ScrumConcept uses port `3000` by default. Set the `PORT` environment variable to
use a different port.

macOS or Linux:

```bash
PORT=4000 npm start
```

Windows PowerShell:

```powershell
$env:PORT=4000
npm start
```

The application will then be available at `http://localhost:4000`.

## Offline operation

Cloning the repository and initially installing npm dependencies normally
requires an internet connection. After `npm ci` has completed, ScrumConcept can
run without an internet connection because:

- Bootstrap CSS and JavaScript are served from the local npm installation.
- The app contains no CDN references.
- EJS rendering and Express routing run locally.
- Placeholder data is stored locally in the application process.
- The current proof of concept does not call external APIs or databases.

To prepare a machine that cannot access the internet, transfer a complete copy
of the repository and provide the npm dependencies through an approved offline
npm cache or package mirror. Reinstalling dependencies on the destination
machine is safer than copying `node_modules` between different operating
systems or processor architectures.

## Available commands

| Command | Description |
| --- | --- |
| `npm start` | Starts the application normally. |
| `npm run dev` | Starts the application using Node's file watch mode. |
| `npm ci` | Reproduces the locked dependency installation on a clean machine. |

## Project structure

```text
ScrumConcept/
├── data/
│   └── placeholder-data.js       # Sample project, sprint, task, and backlog data
├── models/
│   ├── product-backlog-item.js   # Product backlog item class
│   ├── project.js                # Project class
│   ├── sprint.js                 # Sprint class
│   └── task.js                   # Task class and valid workflow statuses
├── public/
│   └── app.js                    # Client-side issue filtering
├── views/
│   ├── 404.ejs                   # Not-found page
│   └── index.ejs                 # Dashboard, board, backlog, and issue modal
├── package.json                  # Metadata, commands, and direct dependencies
├── package-lock.json             # Locked dependency tree
├── README.md                     # Project documentation
└── server.js                     # Express configuration, calculations, and routes
```

## Application flow

1. `server.js` creates the Express application and loads placeholder data.
2. `GET /` calculates the current sprint metrics and renders `views/index.ejs`.
3. `POST /issues` validates the title and adds an issue to the in-memory board.
4. `POST /issues/:id/status` moves an existing issue to a valid workflow state.
5. Express serves Bootstrap locally from `node_modules` and browser code from
   `public`.

## HTTP routes

| Method | Route | Description |
| --- | --- | --- |
| `GET` | `/` | Renders the Scrum dashboard, sprint board, and backlog. |
| `POST` | `/issues` | Creates an issue from the modal form. |
| `POST` | `/issues/:id/status` | Updates the workflow status of an issue. |
| Any | Unmatched route | Returns the custom 404 page. |

## Data and persistence

The placeholder records are defined in `data/placeholder-data.js`. They are
loaded into memory when the server starts. New issues and status changes are not
written to disk, so all changes are reset when the application stops or
restarts.

This behavior is intentional for the proof of concept. MongoDB persistence is a
future application layer and is not required to run the current version.

## Known limitations

- No MongoDB database or persistent storage
- No Angular frontend
- No user accounts, authentication, authorization, or sessions
- No multi-project management
- No server-side search, pagination, or reporting
- No automated test suite yet
- Form validation is intentionally minimal
- Concurrent users would share the same in-memory data

The current application should be treated as a local demonstration rather than
a production deployment.

## Troubleshooting

### `npm ci` fails

Confirm that Node.js 18 or newer is installed and that the machine can reach the
npm registry or the configured package mirror. Keep `package-lock.json` in the
repository.

### Port 3000 is already in use

Start the app on another port:

```bash
PORT=4000 npm start
```

### The page loads without Bootstrap styling

Run `npm ci` and restart the server. Bootstrap must exist under `node_modules`
because the app deliberately does not fall back to a CDN.

### Changes disappear after restarting

This is expected. The current version stores all changes in memory and reloads
the placeholder data at startup.

## Future direction

Likely milestones for the full MEAN implementation include:

1. Introduce MongoDB schemas and persistent repositories.
2. Expose projects, sprints, backlog items, and tasks through an Express API.
3. Build an Angular client that consumes the API.
4. Add authentication and role-based authorization.
5. Add validation, automated tests, reporting, and production configuration.
