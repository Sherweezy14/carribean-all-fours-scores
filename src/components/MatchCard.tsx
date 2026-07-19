import { useEffect, useState } from "react";

import type { DatabasePlayoffGame } from "../types/Playoff";

interface MatchCardProps {
  match: DatabasePlayoffGame;
  saving: boolean;

  onSaveResult: (
    winningTeamId: number,
    teamAScore: number,
    teamBScore: number,
  ) => Promise<void> | void;
}

export default function MatchCard({
  match,
  saving,
  onSaveResult,
}: MatchCardProps) {
  const [teamAScore, setTeamAScore] = useState(
    match.team_a_bullseyes?.toString() ?? "",
  );

  const [teamBScore, setTeamBScore] = useState(
    match.team_b_bullseyes?.toString() ?? "",
  );

  useEffect(() => {
    setTeamAScore(match.team_a_bullseyes?.toString() ?? "");

    setTeamBScore(match.team_b_bullseyes?.toString() ?? "");
  }, [match.id, match.team_a_bullseyes, match.team_b_bullseyes]);

  const isFinal = Boolean(match.end_time);

  async function handleSave() {
    if (match.team_a_id === null || match.team_b_id === null) {
      return;
    }

    const parsedTeamAScore = Number(teamAScore);
    const parsedTeamBScore = Number(teamBScore);

    if (
      !Number.isFinite(parsedTeamAScore) ||
      !Number.isFinite(parsedTeamBScore)
    ) {
      alert("Please enter a valid score for both teams.");
      return;
    }

    if (parsedTeamAScore === parsedTeamBScore) {
      alert("A playoff game cannot end in a tie.");
      return;
    }

    const winningTeamId =
      parsedTeamAScore > parsedTeamBScore ? match.team_a_id : match.team_b_id;

    await onSaveResult(winningTeamId, parsedTeamAScore, parsedTeamBScore);
  }

  return (
    <article className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
      <div className="flex items-center justify-between gap-4 border-b border-slate-100 px-4 py-3">
        <div>
          <p className="text-xs font-medium uppercase tracking-wide text-slate-400">
            Team A
          </p>

          <p className="font-semibold text-slate-900">
            {match.team_a_id !== null ? `Team ${match.team_a_id}` : "TBD"}
          </p>
        </div>

        <input
          type="number"
          min={0}
          value={teamAScore}
          disabled={saving || isFinal || match.team_a_id === null}
          onChange={(event) => setTeamAScore(event.target.value)}
          className="w-20 rounded-lg border border-slate-300 px-3 py-2 text-center font-bold disabled:bg-slate-100"
        />
      </div>

      <div className="flex items-center justify-between gap-4 px-4 py-3">
        <div>
          <p className="text-xs font-medium uppercase tracking-wide text-slate-400">
            Team B
          </p>

          <p className="font-semibold text-slate-900">
            {match.team_b_id !== null ? `Team ${match.team_b_id}` : "TBD"}
          </p>
        </div>

        <input
          type="number"
          min={0}
          value={teamBScore}
          disabled={saving || isFinal || match.team_b_id === null}
          onChange={(event) => setTeamBScore(event.target.value)}
          className="w-20 rounded-lg border border-slate-300 px-3 py-2 text-center font-bold disabled:bg-slate-100"
        />
      </div>

      <footer className="border-t border-slate-100 bg-slate-50 p-3">
        {isFinal ? (
          <p className="text-center text-sm font-semibold text-green-700">
            Final
            {match.winner_team_id !== null &&
              ` — Winner: Team ${match.winner_team_id}`}
          </p>
        ) : (
          <button
            type="button"
            onClick={handleSave}
            disabled={
              saving || match.team_a_id === null || match.team_b_id === null
            }
            className="w-full rounded-lg bg-red-700 px-4 py-2 text-sm font-bold text-white transition hover:bg-red-800 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {saving ? "Saving..." : "Save Final Score"}
          </button>
        )}
      </footer>
    </article>
  );
}
