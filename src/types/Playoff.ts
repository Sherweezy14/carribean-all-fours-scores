export type PlayoffRound = "quarterfinal" | "semifinal" | "championship";

export type NextMatchSlot = "team_a_id" | "team_b_id";

export interface DatabasePlayoffGame {
  id: number;
  playoff_round: PlayoffRound;
  bracket_position: number;

  team_a_id: number | null;
  team_b_id: number | null;

  team_a_bullseyes: number | null;
  team_b_bullseyes: number | null;

  winner_team_id: number | null;

  next_game_id: number | null;
  next_game_slot: NextMatchSlot | null;

  start_time: string | null;
  end_time: string | null;
}

export type MatchStatus = "upcoming" | "live" | "final";

export interface PlayoffTeam {
  id: number;
  name: string;
  seed: number;
  logoUrl?: string;
}

export interface PlayoffMatch {
  id: string;
  round: PlayoffRound;
  bracketPosition: number;

  teamA: PlayoffTeam | null;
  teamB: PlayoffTeam | null;

  teamAScore: number | null;
  teamBScore: number | null;

  winnerId: number | null;
  status: MatchStatus;
  scheduledAt?: string;

  nextMatchId?: string;
  nextMatchSlot?: "teamA" | "teamB";
}
