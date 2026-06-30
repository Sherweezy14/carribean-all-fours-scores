import { TeamEntry } from "../types/TeamEntry";

export class Game {
  teamA: number;
  teamABullseyes: number;
  teamAHangJacks: number;
  teamBBullseyes: number;
  teamBHangJacks: number;
  teamB: number;
  start: string;
  end: string;
  winner: number;
  id: number;
  constructor(teamA: number, teamB: number, start: string, end: string) {
    this.teamA = teamA;
    this.teamB = teamB;
    this.start = start;
    this.end = end;
    this.teamABullseyes = 0;
    this.teamAHangJacks = 0;
    this.teamBBullseyes = 0;
    this.teamBHangJacks = 0;
    this.winner = -1;
    this.id = 0;
  }
}
