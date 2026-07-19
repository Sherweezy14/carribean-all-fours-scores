import { useEffect, useMemo, useState } from "react";
import { Trophy } from "lucide-react";

import { supabase } from "../Supbase-Client";

type PlayoffRound = "quarterfinal" | "semifinal" | "championship";

interface DatabasePlayoffGame {
  id: number;
  created_at: string;

  team_a_id: number | null;
  team_b_id: number | null;

  team_a_bullseyes: number | null;
  team_b_bullseyes: number | null;

  team_a_hangjacks: number | null;
  team_b_hangjacks: number | null;

  winner_team_id: number | null;

  start_time: string | null;
  end_time: string | null;

  round: string | null;
  playoff_round: PlayoffRound | null;

  bracket_position: number | null;

  next_game_id: number | null;
  next_game_slot: string | null;
}

interface Team {
  id: number;
  name: string;
}

type TeamLookup = Record<number, string>;

function getMatchesByRound(
  games: DatabasePlayoffGame[],
  playoffRound: PlayoffRound,
) {
  return games
    .filter((game) => game.playoff_round === playoffRound)
    .sort(
      (gameA, gameB) =>
        (gameA.bracket_position ?? 0) - (gameB.bracket_position ?? 0),
    );
}

function getTeamName(teamId: number | null, teamLookup: TeamLookup) {
  if (teamId === null) {
    return "TBD";
  }

  return teamLookup[teamId] ?? "Unknown Team";
}

interface MatchCardProps {
  match: DatabasePlayoffGame;
  teamLookup: TeamLookup;
}

function MatchCard({ match, teamLookup }: MatchCardProps) {
  const teamAName = getTeamName(match.team_a_id, teamLookup);

  const teamBName = getTeamName(match.team_b_id, teamLookup);

  const teamAWon =
    match.winner_team_id !== null && match.winner_team_id === match.team_a_id;

  const teamBWon =
    match.winner_team_id !== null && match.winner_team_id === match.team_b_id;

  const isComplete = match.winner_team_id !== null || Boolean(match.end_time);

  const waitingForTeams = match.team_a_id === null || match.team_b_id === null;

  return (
    <article className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
      <div
        className={`flex items-center justify-between gap-4 border-b border-slate-100 px-4 py-4 ${
          teamAWon ? "bg-green-50" : ""
        }`}
      >
        <div className="min-w-0">
          <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
            Team A
          </p>

          <p
            className={`truncate text-base font-bold ${
              teamAWon ? "text-green-800" : "text-slate-900"
            }`}
          >
            {teamAName}
          </p>

          {teamAWon && (
            <p className="mt-1 text-xs font-bold uppercase tracking-wide text-green-700">
              Winner
            </p>
          )}
        </div>

        <div className="shrink-0 text-center">
          <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
            Bullseyes
          </p>

          <p
            className={`text-2xl font-black ${
              teamAWon ? "text-green-700" : "text-slate-900"
            }`}
          >
            {match.team_a_bullseyes ?? "-"}
          </p>
        </div>
      </div>

      <div
        className={`flex items-center justify-between gap-4 px-4 py-4 ${
          teamBWon ? "bg-green-50" : ""
        }`}
      >
        <div className="min-w-0">
          <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
            Team B
          </p>

          <p
            className={`truncate text-base font-bold ${
              teamBWon ? "text-green-800" : "text-slate-900"
            }`}
          >
            {teamBName}
          </p>

          {teamBWon && (
            <p className="mt-1 text-xs font-bold uppercase tracking-wide text-green-700">
              Winner
            </p>
          )}
        </div>

        <div className="shrink-0 text-center">
          <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
            Bullseyes
          </p>

          <p
            className={`text-2xl font-black ${
              teamBWon ? "text-green-700" : "text-slate-900"
            }`}
          >
            {match.team_b_bullseyes ?? "-"}
          </p>
        </div>
      </div>

      <footer className="border-t border-slate-100 bg-slate-50 px-4 py-2.5 text-center">
        {isComplete ? (
          <p className="text-sm font-bold text-green-700">Final</p>
        ) : waitingForTeams ? (
          <p className="text-sm font-medium text-slate-400">
            Waiting for previous round
          </p>
        ) : (
          <p className="text-sm font-medium text-slate-500">Upcoming</p>
        )}
      </footer>
    </article>
  );
}

interface RoundColumnProps {
  title: string;
  subtitle: string;
  matches: DatabasePlayoffGame[];
  teamLookup: TeamLookup;
  className?: string;
}

function RoundColumn({
  title,
  subtitle,
  matches,
  teamLookup,
  className = "",
}: RoundColumnProps) {
  return (
    <section className={className}>
      <header className="mb-4 rounded-xl bg-slate-900 px-4 py-3 text-center text-white">
        <h2 className="font-black uppercase tracking-wide">{title}</h2>

        <p className="mt-0.5 text-xs text-slate-300">{subtitle}</p>
      </header>

      {matches.length > 0 ? (
        <div className="space-y-4">
          {matches.map((match) => (
            <MatchCard key={match.id} match={match} teamLookup={teamLookup} />
          ))}
        </div>
      ) : (
        <div className="rounded-xl border border-dashed border-slate-300 bg-white p-6 text-center">
          <p className="text-sm font-medium text-slate-400">
            No games available
          </p>
        </div>
      )}
    </section>
  );
}

export default function PlayoffView() {
  const [games, setGames] = useState<DatabasePlayoffGame[]>([]);

  const [teams, setTeams] = useState<Team[]>([]);

  const [loading, setLoading] = useState(true);

  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    void loadBracket();
  }, []);

  const teamLookup = useMemo<TeamLookup>(() => {
    return Object.fromEntries(teams.map((team) => [team.id, team.name]));
  }, [teams]);

  const quarterfinals = useMemo(() => {
    return getMatchesByRound(games, "quarterfinal");
  }, [games]);

  const semifinals = useMemo(() => {
    return getMatchesByRound(games, "semifinal");
  }, [games]);

  const championship = useMemo(() => {
    return getMatchesByRound(games, "championship");
  }, [games]);

  const championshipGame = championship[0];

  const championName =
    championshipGame?.winner_team_id !== null &&
    championshipGame?.winner_team_id !== undefined
      ? (teamLookup[championshipGame.winner_team_id] ?? "Unknown Team")
      : null;

  async function loadBracket() {
    try {
      setLoading(true);
      setErrorMessage("");

      const [gamesResponse, teamsResponse] = await Promise.all([
        supabase
          .from("Games")
          .select(
            `
              id,
              created_at,
              team_a_id,
              team_b_id,
              team_a_bullseyes,
              team_b_bullseyes,
              team_a_hangjacks,
              team_b_hangjacks,
              winner_team_id,
              start_time,
              end_time,
              round,
              playoff_round,
              bracket_position,
              next_game_id,
              next_game_slot
            `,
          )
          .not("playoff_round", "is", null)
          .order("bracket_position", {
            ascending: true,
          }),

        supabase.from("Teams").select("id, name"),
      ]);

      if (gamesResponse.error) {
        throw new Error(
          `Unable to load playoff games: ${gamesResponse.error.message}`,
        );
      }

      if (teamsResponse.error) {
        throw new Error(`Unable to load teams: ${teamsResponse.error.message}`);
      }

      setGames((gamesResponse.data ?? []) as DatabasePlayoffGame[]);

      setTeams((teamsResponse.data ?? []) as Team[]);
    } catch (error) {
      const message =
        error instanceof Error
          ? error.message
          : "Unable to load the playoff bracket.";

      setErrorMessage(message);
    } finally {
      setLoading(false);
    }
  }

  if (loading) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-slate-100 px-4">
        <div className="text-center">
          <Trophy
            size={42}
            className="mx-auto mb-3 animate-pulse text-slate-400"
          />

          <p className="font-semibold text-slate-600">
            Loading playoff bracket...
          </p>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-slate-100 px-4 py-6 md:px-6 lg:px-8">
      <div className="mx-auto max-w-[1500px]">
        <header className="mb-8 flex items-center gap-4">
          <div className="flex size-14 shrink-0 items-center justify-center rounded-2xl bg-red-700 text-white shadow-sm">
            <Trophy size={28} />
          </div>

          <div>
            <h1 className="text-2xl font-black text-slate-900 md:text-3xl">
              Playoff Bracket
            </h1>

            <p className="text-sm text-slate-500">
              Eight-team single elimination tournament
            </p>
          </div>
        </header>

        {errorMessage && (
          <section className="mb-6 rounded-xl border border-red-200 bg-red-50 p-4">
            <p className="font-semibold text-red-700">{errorMessage}</p>

            <button
              type="button"
              onClick={() => void loadBracket()}
              className="mt-3 rounded-lg bg-red-700 px-4 py-2 text-sm font-bold text-white transition hover:bg-red-800"
            >
              Try Again
            </button>
          </section>
        )}

        {!errorMessage && games.length === 0 ? (
          <section className="rounded-2xl border border-slate-200 bg-white px-6 py-12 text-center shadow-sm">
            <Trophy size={48} className="mx-auto text-slate-300" />

            <h2 className="mt-4 text-xl font-black text-slate-900">
              Bracket not available yet
            </h2>

            <p className="mt-2 text-sm text-slate-500">
              The playoff seedings have not been published.
            </p>
          </section>
        ) : (
          !errorMessage && (
            <>
              {/* Desktop and tablet layout */}
              <div className="hidden gap-6 md:grid md:grid-cols-3">
                <RoundColumn
                  title="Quarterfinals"
                  subtitle="Round of 8"
                  matches={quarterfinals}
                  teamLookup={teamLookup}
                />

                <RoundColumn
                  title="Semifinals"
                  subtitle="Final Four"
                  matches={semifinals}
                  teamLookup={teamLookup}
                  className="pt-24"
                />

                <RoundColumn
                  title="Championship"
                  subtitle="Tournament Final"
                  matches={championship}
                  teamLookup={teamLookup}
                  className="pt-44"
                />
              </div>

              {/* Mobile layout */}
              <div className="space-y-10 md:hidden">
                <RoundColumn
                  title="Quarterfinals"
                  subtitle="Round of 8"
                  matches={quarterfinals}
                  teamLookup={teamLookup}
                />

                <RoundColumn
                  title="Semifinals"
                  subtitle="Final Four"
                  matches={semifinals}
                  teamLookup={teamLookup}
                />

                <RoundColumn
                  title="Championship"
                  subtitle="Tournament Final"
                  matches={championship}
                  teamLookup={teamLookup}
                />
              </div>

              {championName && (
                <section className="mt-10 overflow-hidden rounded-2xl border border-amber-300 bg-white shadow-sm">
                  <div className="bg-amber-100 px-6 py-8 text-center">
                    <Trophy size={52} className="mx-auto text-amber-600" />

                    <p className="mt-4 text-sm font-black uppercase tracking-[0.2em] text-amber-700">
                      Tournament Champion
                    </p>

                    <h2 className="mt-2 text-2xl font-black text-slate-900 md:text-3xl">
                      {championName}
                    </h2>
                  </div>
                </section>
              )}
            </>
          )
        )}
      </div>
    </main>
  );
}
