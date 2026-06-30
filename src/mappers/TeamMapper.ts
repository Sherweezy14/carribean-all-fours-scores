import { TeamRow } from "../types/TeamRow";
import { Team } from "../models/Team";

export function teamRowtoTeamMapper(teamRow: TeamRow): Team {
  return {
    name: teamRow.name,
    division_id: teamRow.division_id,
    id: teamRow.id,
    createdAt: teamRow.created_at,
  };
}
