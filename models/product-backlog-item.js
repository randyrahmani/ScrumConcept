export default class ProductBacklogItem {
  constructor({ id, key, title, priority = "Medium", points = 1, type = "Story" }) {
    this.id = id;
    this.key = key;
    this.title = title;
    this.priority = priority;
    this.points = Number(points) || 0;
    this.type = type;
  }
}
