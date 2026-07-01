import { Game } from "./Game";
import { Buy } from "./Buy";
import { Round } from "../types/Round";
import { averageFloor } from "../util/Averagefloor";
import { Division } from "./Division";
import { Team } from "./Team";

export class Tournament {
  roundOne: (Game | Buy)[];
  roundTwo: (Game | Buy)[];
  roundThree: (Game | Buy)[];
  divisions: Division[];

  constructor() {
    this.roundOne = [];
    this.roundTwo = [];
    this.roundThree = [];
    this.divisions = [];
  }

  public addDivision(division: Division) {
    this.divisions.push(division);
  }

  public getDivisions() {
    return this.divisions;
  }

  public getGames() {
    return [this.roundOne, this.roundTwo, this.roundThree];
  }

  public findTeam(teamName: string): Team {
    for (const division of this.divisions) {
      const team = division.teams.find((team) => team.name === teamName);
      if (team) {
        return team;
      }
    }
    throw new Error(`Team "${teamName}" not found in any division.`);
  }

  public addBuyRound(
    round: Round,
    teamAName: string,
    avgHJW: number[],
    avgBEL: number[],
    avgHJL: number[],
    start: string,
    end: string,
  ) {
    const teamA = this.findTeam(teamAName);

    if (teamA) {
      const buy = new Buy(
        { team: teamA, bullsEye: 18, hangJacks: averageFloor(...avgHJW) },
        {
          bullsEye: averageFloor(...avgBEL),
          hangJacks: averageFloor(...avgHJL),
        },
        start,
        end,
      );

      switch (round) {
        case 1:
          this.roundOne.push(buy);
          break;
        case 2:
          this.roundTwo.push(buy);
          break;
        case 3:
          this.roundThree.push(buy);
          break;
      }
    } else {
      console.error("One or both teams not found.");
    }
  }

  public addGameToRound(
    round: Round,
    teamAName: string,
    teamABullsEye: number,
    teamAHangJacks: number,
    teamBName: string,
    teamBBullsEye: number,
    teamBHangJacks: number,
    start: string,
    end: string,
  ) {
    const teamA = this.findTeam(teamAName);
    const teamB = this.findTeam(teamBName);
  }

  /**
   * Whoever has most amount of BE
   * if BE tie, least amount of BE lost
   * if another tie most wins
   * if another tie most HJ
   * if another tie least HJ lost
   *
   */
}
