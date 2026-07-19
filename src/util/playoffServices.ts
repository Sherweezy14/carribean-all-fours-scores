import { supabase } from "../Supbase-Client";
import type { DatabasePlayoffGame, NextMatchSlot } from "../types/Playoff";

interface CompletePlayoffGameInput {
  gameId: number;
  winnerTeamId: number;
  teamAScore: number;
  teamBScore: number;
  nextGameId: number | null;
  nextGameSlot: NextMatchSlot | null;
}

export async function getPlayoffGames(): Promise<DatabasePlayoffGame[]> {
  const { data, error } = await supabase
    .from("Games")
    .select(
      `
      id,
      playoff_round,
      bracket_position,
      team_a_id,
      team_b_id,
      team_a_bullseyes,
      team_b_bullseyes,
      winner_team_id,
      next_game_id,
      next_game_slot,
      start_time,
      end_time
    `,
    )
    .not("playoff_round", "is", null)
    .order("playoff_round")
    .order("bracket_position");

  if (error) {
    throw new Error(error.message);
  }

  return (data ?? []) as DatabasePlayoffGame[];
}

export async function completePlayoffGame({
  gameId,
  winnerTeamId,
  teamAScore,
  teamBScore,
  nextGameId,
  nextGameSlot,
}: CompletePlayoffGameInput): Promise<DatabasePlayoffGame> {
  const { data: completedGame, error: gameError } = await supabase
    .from("Games")
    .update({
      team_a_bullseyes: teamAScore,
      team_b_bullseyes: teamBScore,
      winner_team_id: winnerTeamId,
      end_time: new Date().toISOString(),
    })
    .eq("id", gameId)
    .select()
    .single();

  if (gameError) {
    throw new Error(gameError.message);
  }

  if (nextGameId && nextGameSlot) {
    const nextGameUpdate =
      nextGameSlot === "team_a_id"
        ? { team_a_id: winnerTeamId }
        : { team_b_id: winnerTeamId };

    const { error: nextGameError } = await supabase
      .from("Games")
      .update(nextGameUpdate)
      .eq("id", nextGameId);

    if (nextGameError) {
      throw new Error(nextGameError.message);
    }
  }

  return completedGame as DatabasePlayoffGame;
}
