/**
 * Lightweight project domain model used until MongoDB models are introduced.
 */
export default class Project {
  constructor({ id, key, name, description }) {
    this.id = id;
    this.key = key;
    this.name = name;
    this.description = description;
  }
}
