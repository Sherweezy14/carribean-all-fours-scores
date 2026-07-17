export type GameRow = {
  id?: number;
  team_a_id: number;
  team_b_id: number;
  team_a_bullseyes: number;
  team_a_hangjacks: number;
  team_b_bullseyes: number;
  team_b_hangjacks: number;
  winner_team_id: number;
  start_time: string;
  end_time: string | null;
};
