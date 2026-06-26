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

    teamA.team.addWin();
    teamA.team.addBuy();
    teamA.team.addBullsEyes(teamA.bullsEye, buy.bullsEye);
    teamA.team.addHangJacks(teamA.hangJacks, buy.hangJacks);
  }
}
