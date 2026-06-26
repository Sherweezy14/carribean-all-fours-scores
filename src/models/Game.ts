import { TeamEntry } from "../types/TeamEntry";

export class Game {
  teamA: TeamEntry;
  teamB: TeamEntry;
  start: string;
  end: string;
  constructor(teamA: TeamEntry, teamB: TeamEntry, start: string, end: string) {
    this.teamA = teamA;
    this.teamB = teamB;
    this.start = start;
    this.end = end;

    if (teamA.bullsEye > teamB.bullsEye) {
      teamA.team.addWin();
    } else if (teamB.bullsEye > teamA.bullsEye) {
      teamB.team.addWin();
    }

    teamA.team.addBullsEyes(teamA.bullsEye, teamB.bullsEye);
    teamA.team.addHangJacks(teamA.hangJacks, teamB.hangJacks);

    teamB.team.addBullsEyes(teamB.bullsEye, teamA.bullsEye);
    teamB.team.addHangJacks(teamB.hangJacks, teamA.hangJacks);
  }
}
