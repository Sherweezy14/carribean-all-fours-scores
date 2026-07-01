import { TeamEntry } from "../types/TeamEntry";

export class Buy {
  teamA: TeamEntry;
  buy: { bullsEye: number; hangJacks: number };
  start: string;
  end: string;
  constructor(
    teamA: TeamEntry,
    buy: { bullsEye: number; hangJacks: number },
    start: string,
    end: string,
  ) {
    this.teamA = teamA;
    this.buy = buy;
    this.start = start;
    this.end = end;
  }
}
