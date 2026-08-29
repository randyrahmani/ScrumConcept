export const TASK_STATUSES = ["todo", "progress", "review", "done"];

export default class Task {
  constructor({ id, key, title, description = "", status = "todo", priority = "Medium", assignee = "Unassigned", points = 1, type = "Task" }) {
    this.id = id;
    this.key = key;
    this.title = title;
    this.description = description;
    this.status = TASK_STATUSES.includes(status) ? status : "todo";
    this.priority = priority;
    this.assignee = assignee;
    this.points = Number(points) || 0;
    this.type = type;
  }
}
