import { CheckCircle2, Circle, Radio } from "lucide-react";

import type { PlayoffMatch, PlayoffTeam } from "../types/Playoff";

interface MatchCardProps {
  match: PlayoffMatch;
  onSelectWinner: (matchId: string, team: PlayoffTeam) => void;
}

interface TeamRowProps {
  team: PlayoffTeam | null;
  score: number | null;
  isWinner: boolean;
  isLoser: boolean;
  disabled: boolean;
  onClick: () => void;
}

function TeamRow({
  team,
  score,
  isWinner,
  isLoser,
  disabled,
  onClick,
}: TeamRowProps) {
  if (!team) {
    return (
      <div className="flex min-h-12 items-center justify-between gap-3 px-3 py-2 text-sm text-slate-400">
        <div className="flex items-center gap-3">
          <span className="flex size-6 items-center justify-center rounded bg-slate-200 text-xs font-bold text-slate-500">
            –
          </span>

          <span>TBD</span>
        </div>

        <span>–</span>
      </div>
    );
  }

  return (
    <button
      type="button"
      disabled={disabled}
      onClick={onClick}
      className={[
        "flex min-h-12 w-full items-center justify-between gap-3 px-3 py-2 text-left transition",
        "disabled:cursor-default",
        !disabled && "hover:bg-slate-50",
        isWinner && "bg-green-50",
        isLoser && "opacity-50",
      ]
        .filter(Boolean)
        .join(" ")}
    >
      <div className="flex min-w-0 items-center gap-3">
        <span
          className={[
            "flex size-6 shrink-0 items-center justify-center rounded text-xs font-bold",
            isWinner ? "bg-green-600 text-white" : "bg-red-700 text-white",
          ].join(" ")}
        >
          {team.seed}
        </span>

        {team.logoUrl ? (
          <img
            src={team.logoUrl}
            alt=""
            className="size-7 shrink-0 rounded-full object-cover"
          />
        ) : (
          <span className="flex size-7 shrink-0 items-center justify-center rounded-full bg-slate-100 text-xs font-bold text-slate-600">
            {team.name.charAt(0)}
          </span>
        )}

        <span className="truncate text-sm font-medium text-slate-800">
          {team.name}
        </span>
      </div>

      <div className="flex shrink-0 items-center gap-2">
        <span className="font-bold text-slate-900">{score ?? "–"}</span>

        {isWinner ? (
          <CheckCircle2 size={18} className="text-green-600" />
        ) : (
          <Circle size={16} className="text-slate-300" />
        )}
      </div>
    </button>
  );
}

export default function MatchCard({ match, onSelectWinner }: MatchCardProps) {
  const gameIsFinished = match.status === "final";

  function handleTeamClick(team: PlayoffTeam | null) {
    if (!team || gameIsFinished) {
      return;
    }

    onSelectWinner(match.id, team);
  }

  return (
    <article className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
      <TeamRow
        team={match.teamA}
        score={match.teamAScore}
        isWinner={match.teamA?.id === match.winnerId}
        isLoser={
          gameIsFinished &&
          match.teamA !== null &&
          match.teamA.id !== match.winnerId
        }
        disabled={!match.teamA || gameIsFinished}
        onClick={() => handleTeamClick(match.teamA)}
      />

      <div className="border-t border-slate-100" />

      <TeamRow
        team={match.teamB}
        score={match.teamBScore}
        isWinner={match.teamB?.id === match.winnerId}
        isLoser={
          gameIsFinished &&
          match.teamB !== null &&
          match.teamB.id !== match.winnerId
        }
        disabled={!match.teamB || gameIsFinished}
        onClick={() => handleTeamClick(match.teamB)}
      />

      <footer className="flex items-center justify-between border-t border-slate-100 bg-slate-50 px-3 py-2 text-xs">
        <span className="text-slate-500">
          {match.scheduledAt ?? "Time TBD"}
        </span>

        {match.status === "live" && (
          <span className="flex items-center gap-1 font-semibold text-red-600">
            <Radio size={13} />
            Live
          </span>
        )}

        {match.status === "final" && (
          <span className="font-semibold text-green-600">Final</span>
        )}

        {match.status === "upcoming" && (
          <span className="font-semibold text-slate-500">Upcoming</span>
        )}
      </footer>
    </article>
  );
}
