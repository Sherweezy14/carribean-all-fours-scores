import { useMemo, useState } from "react";
import { RotateCcw, Trophy } from "lucide-react";

import ChampionCard from "../components/ChampionCard";
import RoundColumn from "../components/RoundColumn";
import { rankedTeams } from "../data/playoffTeams";
import type { PlayoffMatch, PlayoffRound, PlayoffTeam } from "../types/Playoff";
import { createPlayoffBracket } from "../util/createPlayoffBracket";

function getMatchesByRound(matches: PlayoffMatch[], round: PlayoffRound) {
  return matches
    .filter((match) => match.round === round)
    .sort((a, b) => a.bracketPosition - b.bracketPosition);
}

export default function Playoffs() {
  const [matches, setMatches] = useState<PlayoffMatch[]>(() =>
    createPlayoffBracket(rankedTeams),
  );

  const quarterfinals = useMemo(
    () => getMatchesByRound(matches, "quarterfinal"),
    [matches],
  );

  const semifinals = useMemo(
    () => getMatchesByRound(matches, "semifinal"),
    [matches],
  );

  const championship = useMemo(
    () => getMatchesByRound(matches, "championship"),
    [matches],
  );

  const championshipMatch = championship[0];

  const champion =
    championshipMatch?.winnerId != null
      ? championshipMatch.teamA?.id === championshipMatch.winnerId
        ? championshipMatch.teamA
        : championshipMatch.teamB
      : null;

  function handleSelectWinner(matchId: string, winningTeam: PlayoffTeam) {
    setMatches((currentMatches) => {
      const selectedMatch = currentMatches.find(
        (match) => match.id === matchId,
      );

      if (!selectedMatch) {
        return currentMatches;
      }

      const updatedMatches = currentMatches.map((match) => {
        if (match.id !== matchId) {
          return match;
        }

        const teamAWon = match.teamA?.id === winningTeam.id;

        return {
          ...match,
          winnerId: winningTeam.id,
          status: "final" as const,
          teamAScore: teamAWon ? 21 : 14,
          teamBScore: teamAWon ? 14 : 21,
        };
      });

      if (!selectedMatch.nextMatchId || !selectedMatch.nextMatchSlot) {
        return updatedMatches;
      }
      const nextMatchId = selectedMatch.nextMatchId;
      const nextMatchSlot = selectedMatch.nextMatchSlot;
      return updatedMatches.map((match) => {
        if (match.id !== nextMatchId) {
          return match;
        }

        return {
          ...match,
          [nextMatchSlot]: winningTeam,
        };
      });
    });
  }

  function resetBracket() {
    setMatches(createPlayoffBracket(rankedTeams));
  }

  return (
    <main className="min-h-screen bg-slate-100 px-4 py-6 md:px-6 lg:px-8">
      <div className="mx-auto max-w-[1500px]">
        <header className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-start gap-3">
            <div className="flex size-12 shrink-0 items-center justify-center rounded-xl bg-red-700 text-white">
              <Trophy size={25} />
            </div>

            <div>
              <h1 className="text-2xl font-black text-slate-900 md:text-3xl">
                Playoffs
              </h1>

              <p className="mt-1 text-sm text-slate-500">
                8 teams · Single elimination
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={resetBracket}
            className="inline-flex min-h-11 items-center justify-center gap-2 rounded-lg bg-red-700 px-5 py-3 text-sm font-bold text-white transition hover:bg-red-800"
          >
            <RotateCcw size={17} />
            Reset Playoffs
          </button>
        </header>

        <div className="mb-6 rounded-xl border border-blue-200 bg-blue-50 px-4 py-3 text-sm text-blue-900">
          Select a team inside a matchup to declare it the winner. The team will
          automatically advance to the next round.
        </div>

        {/* Laptop and tablet */}
        <div className="hidden gap-6 md:grid md:grid-cols-3 xl:grid-cols-[1.1fr_1fr_0.9fr_0.7fr]">
          <RoundColumn
            title="Quarterfinals"
            subtitle="Best of 1"
            matches={quarterfinals}
            onSelectWinner={handleSelectWinner}
          />

          <RoundColumn
            title="Semifinals"
            subtitle="Best of 1"
            matches={semifinals}
            onSelectWinner={handleSelectWinner}
            className="md:pt-24 xl:pt-28"
          />

          <RoundColumn
            title="Championship"
            subtitle="Best of 1"
            matches={championship}
            onSelectWinner={handleSelectWinner}
            className="md:pt-40 xl:pt-48"
          />

          <div className="hidden pt-32 xl:block">
            <ChampionCard champion={champion} />
          </div>
        </div>

        {/* Mobile */}
        <div className="space-y-8 md:hidden">
          <RoundColumn
            title="Quarterfinals"
            subtitle="Best of 1"
            matches={quarterfinals}
            onSelectWinner={handleSelectWinner}
          />

          <RoundColumn
            title="Semifinals"
            subtitle="Best of 1"
            matches={semifinals}
            onSelectWinner={handleSelectWinner}
          />

          <RoundColumn
            title="Championship"
            subtitle="Best of 1"
            matches={championship}
            onSelectWinner={handleSelectWinner}
          />

          <ChampionCard champion={champion} />
        </div>

        {/* Tablet champion display */}
        <div className="mt-8 hidden md:block xl:hidden">
          <ChampionCard champion={champion} />
        </div>
      </div>
    </main>
  );
}
