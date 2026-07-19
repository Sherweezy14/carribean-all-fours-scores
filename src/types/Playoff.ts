export type PlayoffRound = "quarterfinal" | "semifinal" | "championship";

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
