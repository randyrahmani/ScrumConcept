/**
 * Represents proposed work that has not yet been selected for a sprint.
 */
export default class ProductBacklogItem {
  constructor({ id, key, title, priority = "Medium", points = 1, type = "Story" }) {
    this.id = id;
    this.key = key;
    this.title = title;
    this.priority = priority;
    // Keep point values numeric for future prioritization and reporting logic.
    this.points = Number(points) || 0;
    this.type = type;
  }
}
