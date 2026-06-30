import { GameRow } from "../types/GameRow";
import { Game } from "../models/Game";

export function mapGameRowToGame(row: GameRow): Game {
  return {
    id: row.id || 0,
    teamA: row.team_a_id,
    teamB: row.team_b_id,
    teamABullseyes: row.team_a_bullseyes,
    teamAHangJacks: row.team_a_hangjacks,
    teamBBullseyes: row.team_b_bullseyes,
    teamBHangJacks: row.team_b_hangjacks,
    winner: row.winner_team_id,
    start: row.start_time,
    end: row.end_time || "",
  };
}
