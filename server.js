import express from "express";
import { fileURLToPath } from "node:url";
import path from "node:path";
import Task, { TASK_STATUSES } from "./models/task.js";
import { createPlaceholderData } from "./data/placeholder-data.js";

const app = express();
const port = Number(process.env.PORT) || 3000;
const root = path.dirname(fileURLToPath(import.meta.url));

app.set("view engine", "ejs");
app.set("views", path.join(root, "views"));
app.use(express.urlencoded({ extended: false }));
app.use("/assets", express.static(path.join(root, "public")));
app.use("/vendor/bootstrap", express.static(path.join(root, "node_modules/bootstrap/dist")));

const { project, sprint, tasks, backlog } = createPlaceholderData();
let nextIssueNumber = Math.max(
  ...tasks.map((item) => item.id),
  ...backlog.map((item) => item.id)
) + 1;

const statusLabels = { todo: "To do", progress: "In progress", review: "In review", done: "Done" };

function dashboardData(message = "") {
  const board = TASK_STATUSES.map((status) => ({
    status,
    label: statusLabels[status],
    tasks: tasks.filter((task) => task.status === status)
  }));
  const totalPoints = tasks.reduce((sum, task) => sum + task.points, 0);
  const donePoints = tasks.filter((task) => task.status === "done").reduce((sum, task) => sum + task.points, 0);

  return {
    project,
    sprint,
    board,
    backlog,
    message,
    stats: {
      completed: tasks.filter((task) => task.status === "done").length,
      total: tasks.length,
      progress: totalPoints ? Math.round((donePoints / totalPoints) * 100) : 0,
      pointsLeft: totalPoints - donePoints,
      daysLeft: 8
    }
  };
}

app.get("/", (request, response) => {
  response.render("index", dashboardData(request.query.message));
});

app.post("/issues", (request, response) => {
  const title = request.body.title?.trim();
  if (!title) return response.redirect("/?message=Issue+title+is+required");

  const id = nextIssueNumber++;
  tasks.unshift(new Task({
    id,
    key: `${project.key}-${id}`,
    title,
    description: request.body.description?.trim(),
    status: request.body.status,
    priority: request.body.priority,
    assignee: request.body.assignee?.trim() || "Unassigned",
    points: request.body.points,
    type: request.body.type
  }));
  response.redirect("/?message=Issue+created");
});

app.post("/issues/:id/status", (request, response) => {
  const task = tasks.find((item) => item.id === Number(request.params.id));
  if (!task) return response.status(404).render("404", { path: request.path });
  if (TASK_STATUSES.includes(request.body.status)) task.status = request.body.status;
  response.redirect("/");
});

app.use((request, response) => {
  response.status(404).render("404", { path: request.path });
});

if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  app.listen(port, () => {
    console.log(`ScrumConcept is running at http://localhost:${port}`);
  });
}

export default app;
