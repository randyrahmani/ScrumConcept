// This shared list drives validation, board columns, and status form options.
export const TASK_STATUSES = ["todo", "progress", "review", "done"];

/**
 * Represents work selected for the active sprint.
 */
export default class Task {
  constructor({ id, key, title, description = "", status = "todo", priority = "Medium", assignee = "Unassigned", points = 1, type = "Task" }) {
    this.id = id;
    this.key = key;
    this.title = title;
    this.description = description;
    // Unknown statuses fall back to "todo" so every task appears on the board.
    this.status = TASK_STATUSES.includes(status) ? status : "todo";
    this.priority = priority;
    this.assignee = assignee;
    // Form values arrive as strings; normalize points once at the model boundary.
    this.points = Number(points) || 0;
    this.type = type;
  }
}
