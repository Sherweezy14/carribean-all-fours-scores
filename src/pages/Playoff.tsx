import { useEffect, useMemo, useState } from "react";
import { Trophy } from "lucide-react";
import PlayoffSetup from "../components/PlayoffSetup";
import RoundColumn from "../components/RoundColumn";
import { completePlayoffGame, getPlayoffGames } from "../util/playoffServices";

import type {
  DatabasePlayoffGame,
  NextMatchSlot,
  PlayoffRound,
} from "../types/Playoff";

function getMatchesByRound(
  matches: DatabasePlayoffGame[],
  round: PlayoffRound,
) {
  return matches
    .filter((match) => match.playoff_round === round)
    .sort(
      (firstMatch, secondMatch) =>
        firstMatch.bracket_position - secondMatch.bracket_position,
    );
}

export default function Playoffs() {
  const [matches, setMatches] = useState<DatabasePlayoffGame[]>([]);

  const [loading, setLoading] = useState(true);

  const [savingGameId, setSavingGameId] = useState<number | null>(null);

  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    void loadPlayoffs();
  }, []);

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

  const championshipGame = championship[0];

  const championTeamId = championshipGame?.winner_team_id ?? null;

  async function loadPlayoffs(showFullLoader = true) {
    try {
      if (showFullLoader) {
        setLoading(true);
      }

      setErrorMessage("");

      const games = await getPlayoffGames();

      setMatches(games);
    } catch (error) {
      const message =
        error instanceof Error ? error.message : "Unable to load playoffs.";

      setErrorMessage(message);
    } finally {
      if (showFullLoader) {
        setLoading(false);
      }
    }
  }

  async function handleSelectWinner(
    match: DatabasePlayoffGame,
    winningTeamId: number,
    teamAScore: number,
    teamBScore: number,
  ) {
    try {
      setSavingGameId(match.id);
      setErrorMessage("");

      await completePlayoffGame({
        gameId: match.id,
        winnerTeamId: winningTeamId,
        teamAScore,
        teamBScore,
        nextGameId: match.next_game_id,
        nextGameSlot: match.next_game_slot as NextMatchSlot | null,
      });

      // Reload the bracket without replacing
      // the entire screen with the loading message.
      await loadPlayoffs(false);
    } catch (error) {
      const message =
        error instanceof Error ? error.message : "Unable to save the result.";

      setErrorMessage(message);
    } finally {
      setSavingGameId(null);
    }
  }

  if (loading) {
    return (
      <main className="flex min-h-80 items-center justify-center">
        <p className="text-sm font-medium text-slate-500">
          Loading playoffs...
        </p>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-slate-100 px-4 py-6 md:px-6 lg:px-8">
      <div className="mx-auto max-w-[1500px]">
        <header className="mb-6 flex items-center gap-3">
          <div className="flex size-12 items-center justify-center rounded-xl bg-red-700 text-white">
            <Trophy size={24} />
          </div>

          <div>
            <h1 className="text-2xl font-black text-slate-900 md:text-3xl">
              Playoffs
            </h1>

            <p className="text-sm text-slate-500">
              Eight-team single elimination tournament
            </p>
          </div>
        </header>

        {errorMessage && (
          <p className="mb-5 rounded-lg border border-red-200 bg-red-50 p-3 text-sm text-red-700">
            {errorMessage}
          </p>
        )}

        {matches.length === 0 ? (
          <PlayoffSetup
            onBracketCreated={async () => {
              await loadPlayoffs(false);
            }}
          />
        ) : (
          <>
            {/* Desktop and tablet layout */}
            <div className="hidden gap-6 md:grid md:grid-cols-3">
              <RoundColumn
                title="Quarterfinals"
                subtitle="Round of 8"
                matches={quarterfinals}
                savingGameId={savingGameId}
                onSaveResult={handleSelectWinner}
              />

              <RoundColumn
                title="Semifinals"
                subtitle="Final four"
                matches={semifinals}
                savingGameId={savingGameId}
                onSaveResult={handleSelectWinner}
                className="pt-24"
              />

              <RoundColumn
                title="Championship"
                subtitle="Tournament final"
                matches={championship}
                savingGameId={savingGameId}
                onSaveResult={handleSelectWinner}
                className="pt-40"
              />
            </div>

            {/* Mobile layout */}
            <div className="space-y-8 md:hidden">
              <RoundColumn
                title="Quarterfinals"
                subtitle="Round of 8"
                matches={quarterfinals}
                savingGameId={savingGameId}
                onSaveResult={handleSelectWinner}
              />

              <RoundColumn
                title="Semifinals"
                subtitle="Final four"
                matches={semifinals}
                savingGameId={savingGameId}
                onSaveResult={handleSelectWinner}
              />

              <RoundColumn
                title="Championship"
                subtitle="Tournament final"
                matches={championship}
                savingGameId={savingGameId}
                onSaveResult={handleSelectWinner}
              />
            </div>

            {championTeamId !== null && (
              <section className="mt-8 rounded-2xl border border-amber-200 bg-amber-50 p-6 text-center">
                <Trophy size={44} className="mx-auto text-amber-600" />

                <p className="mt-3 text-sm font-bold uppercase tracking-widest text-amber-700">
                  Tournament Champion
                </p>

                <p className="mt-2 text-xl font-black text-slate-900">
                  Team ID: {championTeamId}
                </p>
              </section>
            )}
          </>
        )}
      </div>
    </main>
  );
}
