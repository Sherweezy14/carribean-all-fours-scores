import type { PlayoffMatch, PlayoffTeam } from "../types/Playoff";

function findSeed(teams: PlayoffTeam[], seed: number): PlayoffTeam | null {
  return teams.find((team) => team.seed === seed) ?? null;
}

export function createPlayoffBracket(
  rankedTeams: PlayoffTeam[],
): PlayoffMatch[] {
  if (rankedTeams.length < 8) {
    throw new Error(
      "At least eight ranked teams are required to generate the playoffs.",
    );
  }

  return [
    {
      id: "quarterfinal-1",
      round: "quarterfinal",
      bracketPosition: 1,
      teamA: findSeed(rankedTeams, 1),
      teamB: findSeed(rankedTeams, 8),
      teamAScore: null,
      teamBScore: null,
      winnerId: null,
      status: "upcoming",
      scheduledAt: "Today, 5:00 PM",
      nextMatchId: "semifinal-1",
      nextMatchSlot: "teamA",
    },
    {
      id: "quarterfinal-2",
      round: "quarterfinal",
      bracketPosition: 2,
      teamA: findSeed(rankedTeams, 4),
      teamB: findSeed(rankedTeams, 5),
      teamAScore: null,
      teamBScore: null,
      winnerId: null,
      status: "upcoming",
      scheduledAt: "Today, 5:30 PM",
      nextMatchId: "semifinal-1",
      nextMatchSlot: "teamB",
    },
    {
      id: "quarterfinal-3",
      round: "quarterfinal",
      bracketPosition: 3,
      teamA: findSeed(rankedTeams, 3),
      teamB: findSeed(rankedTeams, 6),
      teamAScore: null,
      teamBScore: null,
      winnerId: null,
      status: "upcoming",
      scheduledAt: "Today, 6:00 PM",
      nextMatchId: "semifinal-2",
      nextMatchSlot: "teamA",
    },
    {
      id: "quarterfinal-4",
      round: "quarterfinal",
      bracketPosition: 4,
      teamA: findSeed(rankedTeams, 2),
      teamB: findSeed(rankedTeams, 7),
      teamAScore: null,
      teamBScore: null,
      winnerId: null,
      status: "upcoming",
      scheduledAt: "Today, 6:30 PM",
      nextMatchId: "semifinal-2",
      nextMatchSlot: "teamB",
    },
    {
      id: "semifinal-1",
      round: "semifinal",
      bracketPosition: 1,
      teamA: null,
      teamB: null,
      teamAScore: null,
      teamBScore: null,
      winnerId: null,
      status: "upcoming",
      scheduledAt: "Today, 7:30 PM",
      nextMatchId: "championship-1",
      nextMatchSlot: "teamA",
    },
    {
      id: "semifinal-2",
      round: "semifinal",
      bracketPosition: 2,
      teamA: null,
      teamB: null,
      teamAScore: null,
      teamBScore: null,
      winnerId: null,
      status: "upcoming",
      scheduledAt: "Today, 8:30 PM",
      nextMatchId: "championship-1",
      nextMatchSlot: "teamB",
    },
    {
      id: "championship-1",
      round: "championship",
      bracketPosition: 1,
      teamA: null,
      teamB: null,
      teamAScore: null,
      teamBScore: null,
      winnerId: null,
      status: "upcoming",
      scheduledAt: "Tomorrow, 7:00 PM",
    },
  ];
}
