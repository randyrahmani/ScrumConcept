export default class Sprint {
  constructor({ id, name, goal, startsAt, endsAt, status = "active" }) {
    this.id = id;
    this.name = name;
    this.goal = goal;
    this.startsAt = startsAt;
    this.endsAt = endsAt;
    this.status = status;
  }
}
