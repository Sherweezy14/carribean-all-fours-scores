export class Team {
  name: string;
  division_id: number;
  id: number;
  createdAt: string;

  constructor(name: string) {
    // Initialize properties here
    this.name = name;
    this.division_id = 0;
    this.id = 0;
    this.createdAt = "";
  }
}
