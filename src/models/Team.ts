export class Team {
  name: string;
  bullsEyeWins: number;
  bullsEyeLosses: number;
  hangJackWins: number;
  hangJackLosses: number;
  wins: number;
  buys: number;
  division_id: number;
  id: number;

  constructor(name: string) {
    // Initialize properties here
    this.name = name;
    this.bullsEyeWins = 0;
    this.bullsEyeLosses = 0;
    this.hangJackWins = 0;
    this.hangJackLosses = 0;
    this.wins = 0;
    this.buys = 0;
    this.division_id = 0;
    this.id = 0;
  }

  public addBullsEyes(won: number, lost: number) {
    this.bullsEyeWins += won;
    this.bullsEyeLosses += lost;
  }

  public addHangJacks(won: number, lost: number) {
    this.hangJackWins += won;
    this.hangJackLosses += lost;
  }

  public addWin() {
    this.wins++;
  }

  public addBuy() {
    this.buys++;
  }
}
