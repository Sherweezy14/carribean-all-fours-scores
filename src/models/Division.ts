import { Team } from "./Team";

export class Division {
  name: string;
  teams: Team[];

  constructor(name: string) {
    this.name = name;
    this.teams = [];
  }

  public addTeam(team: Team) {
    this.teams.push(team);
  }
}
