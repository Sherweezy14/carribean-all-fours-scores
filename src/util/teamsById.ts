import { TeamRow } from "../types/TeamRow";

export function getTeamsById(teams: TeamRow[]) {
  const teamsById = teams.reduce<Record<number, TeamRow>>((acc, team) => {
    acc[team.id] = team;
    return acc;
  }, {});
  return teamsById;
}
