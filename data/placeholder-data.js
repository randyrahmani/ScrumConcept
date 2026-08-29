import ProductBacklogItem from "../models/product-backlog-item.js";
import Project from "../models/project.js";
import Sprint from "../models/sprint.js";
import Task from "../models/task.js";

/**
 * Creates a fresh set of demonstration records for each server process.
 * These records will eventually be replaced by data loaded from MongoDB.
 */
export function createPlaceholderData() {
  // The proof of concept displays one project with one active sprint.
  const project = new Project({
    id: 1,
    key: "SC",
    name: "ScrumConcept",
    description: "A lightweight workspace for the product delivery team."
  });

  const sprint = new Sprint({
    id: 1,
    name: "Sprint 12",
    goal: "Ship a clear, dependable first-run experience",
    startsAt: "24 Aug",
    endsAt: "6 Sep"
  });

  // Tasks are work committed to the active sprint and appear on the board.
  const tasks = [
    new Task({ id: 101, key: "SC-101", title: "Draft the onboarding checklist", description: "Outline the essential steps for a new workspace owner.", status: "todo", priority: "High", assignee: "Product", points: 3, type: "Story" }),
    new Task({ id: 102, key: "SC-102", title: "Add empty state to backlog", status: "todo", priority: "Low", assignee: "Engineering", points: 2, type: "Task" }),
    new Task({ id: 103, key: "SC-103", title: "Create project settings form", status: "progress", priority: "High", assignee: "Product", points: 5, type: "Story" }),
    new Task({ id: 104, key: "SC-104", title: "Improve keyboard focus styles", status: "progress", priority: "Medium", assignee: "Design", points: 2, type: "Task" }),
    new Task({ id: 105, key: "SC-105", title: "Validate sprint date ranges", status: "review", priority: "Critical", assignee: "QA", points: 3, type: "Bug" }),
    new Task({ id: 106, key: "SC-106", title: "Write release notes", status: "review", priority: "Low", assignee: "Product", points: 1, type: "Task" }),
    new Task({ id: 107, key: "SC-107", title: "Set up the project shell", status: "done", priority: "High", assignee: "Engineering", points: 5, type: "Story" }),
    new Task({ id: 108, key: "SC-108", title: "Agree on definition of done", status: "done", priority: "Medium", assignee: "Team", points: 2, type: "Task" })
  ];

  // Backlog items are future work and do not contribute to sprint metrics.
  const backlog = [
    new ProductBacklogItem({ id: 109, key: "SC-109", title: "Invite collaborators by email", type: "Story", priority: "High", points: 5 }),
    new ProductBacklogItem({ id: 110, key: "SC-110", title: "Export sprint summary", type: "Task", priority: "Medium", points: 3 }),
    new ProductBacklogItem({ id: 111, key: "SC-111", title: "Add due-date reminders", type: "Story", priority: "Low", points: 5 })
  ];

  return { project, sprint, tasks, backlog };
}
