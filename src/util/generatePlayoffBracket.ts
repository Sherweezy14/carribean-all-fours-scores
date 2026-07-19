import { supabase } from "../Supbase-Client";

export interface SeededTeam {
  seed: number;
  teamId: number;
}

interface InsertedGame {
  id: number;
  playoff_round: string;
  bracket_position: number;
}

export async function generatePlayoffBracket(
  seededTeams: SeededTeam[],
): Promise<void> {
  validateSeeds(seededTeams);

  const teamBySeed = new Map(
    seededTeams.map((team) => [team.seed, team.teamId]),
  );

  /*
   * First create the semifinal and championship placeholders.
   * We need their IDs before creating the quarterfinals.
   */

  const { data: championshipData, error: championshipError } = await supabase
    .from("Games")
    .insert({
      playoff_round: "championship",
      bracket_position: 1,
      team_a_id: null,
      team_b_id: null,
      winner_team_id: null,
      next_game_id: null,
      next_game_slot: null,
      team_a_bullseyes: null,
      team_b_bullseyes: null,
      start_time: "",
      end_time: "",
    })
    .select("id, playoff_round, bracket_position")
    .single<InsertedGame>();

  if (championshipError) {
    throw new Error(
      `Unable to create championship game: ${championshipError.message}`,
    );
  }

  const championshipId = championshipData.id;

  const { data: semifinalData, error: semifinalError } = await supabase
    .from("Games")
    .insert([
      {
        playoff_round: "semifinal",
        bracket_position: 1,
        team_a_id: null,
        team_b_id: null,
        winner_team_id: null,
        next_game_id: championshipId,
        next_game_slot: "team_a_id",
        team_a_bullseyes: null,
        team_b_bullseyes: null,
        start_time: "",
        end_time: "",
      },
      {
        playoff_round: "semifinal",
        bracket_position: 2,
        team_a_id: null,
        team_b_id: null,
        winner_team_id: null,
        next_game_id: championshipId,
        next_game_slot: "team_b_id",
        team_a_bullseyes: null,
        team_b_bullseyes: null,
        start_time: "",
        end_time: "",
      },
    ])
    .select("id, playoff_round, bracket_position")
    .returns<InsertedGame[]>();

  if (semifinalError) {
    throw new Error(
      `Unable to create semifinal games: ${semifinalError.message}`,
    );
  }

  const semifinalOne = semifinalData.find(
    (game) => game.bracket_position === 1,
  );

  const semifinalTwo = semifinalData.find(
    (game) => game.bracket_position === 2,
  );

  if (!semifinalOne || !semifinalTwo) {
    throw new Error("The semifinal games were not created correctly.");
  }

  const quarterfinalGames = [
    {
      playoff_round: "quarterfinal",
      bracket_position: 1,
      team_a_id: getTeamId(teamBySeed, 1),
      team_b_id: getTeamId(teamBySeed, 8),
      winner_team_id: null,
      next_game_id: semifinalOne.id,
      next_game_slot: "team_a_id",
      team_a_bullseyes: null,
      team_b_bullseyes: null,
      start_time: "",
      end_time: "",
    },
    {
      playoff_round: "quarterfinal",
      bracket_position: 2,
      team_a_id: getTeamId(teamBySeed, 4),
      team_b_id: getTeamId(teamBySeed, 5),
      winner_team_id: null,
      next_game_id: semifinalOne.id,
      next_game_slot: "team_b_id",
      team_a_bullseyes: null,
      team_b_bullseyes: null,
      start_time: "",
      end_time: "",
    },
    {
      playoff_round: "quarterfinal",
      bracket_position: 3,
      team_a_id: getTeamId(teamBySeed, 3),
      team_b_id: getTeamId(teamBySeed, 6),
      winner_team_id: null,
      next_game_id: semifinalTwo.id,
      next_game_slot: "team_a_id",
      team_a_bullseyes: null,
      team_b_bullseyes: null,
      start_time: "",
      end_time: "",
    },
    {
      playoff_round: "quarterfinal",
      bracket_position: 4,
      team_a_id: getTeamId(teamBySeed, 2),
      team_b_id: getTeamId(teamBySeed, 7),
      winner_team_id: null,
      next_game_id: semifinalTwo.id,
      next_game_slot: "team_b_id",
      team_a_bullseyes: null,
      team_b_bullseyes: null,
      start_time: "",
      end_time: "",
    },
  ];

  const { error: quarterfinalError } = await supabase
    .from("Games")
    .insert(quarterfinalGames);

  if (quarterfinalError) {
    throw new Error(
      `Unable to create quarterfinal games: ${quarterfinalError.message}`,
    );
  }
}

function validateSeeds(seededTeams: SeededTeam[]) {
  if (seededTeams.length !== 8) {
    throw new Error("Exactly eight teams must be selected.");
  }

  const seeds = seededTeams.map((team) => team.seed);
  const teamIds = seededTeams.map((team) => team.teamId);

  if (new Set(seeds).size !== 8) {
    throw new Error("Each seed must be assigned once.");
  }

  if (new Set(teamIds).size !== 8) {
    throw new Error("The same team cannot be selected more than once.");
  }

  for (let seed = 1; seed <= 8; seed += 1) {
    if (!seeds.includes(seed)) {
      throw new Error(`Seed ${seed} has not been assigned.`);
    }
  }
}

function getTeamId(teamBySeed: Map<number, number>, seed: number): number {
  const teamId = teamBySeed.get(seed);

  if (teamId === undefined) {
    throw new Error(`No team was assigned to seed ${seed}.`);
  }

  return teamId;
}
