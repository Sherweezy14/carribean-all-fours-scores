import MatchCard from "./MatchCard";

import type { DatabasePlayoffGame } from "../types/Playoff";

interface RoundColumnProps {
  title: string;
  subtitle: string;
  matches: DatabasePlayoffGame[];
  className?: string;

  savingGameId: number | null;

  onSaveResult: (
    match: DatabasePlayoffGame,
    winningTeamId: number,
    teamAScore: number,
    teamBScore: number,
  ) => Promise<void>;
}

export default function RoundColumn({
  title,
  subtitle,
  matches,
  className = "",
  savingGameId,
  onSaveResult,
}: RoundColumnProps) {
  return (
    <section className={className}>
      <header className="mb-4 rounded-lg bg-slate-900 px-4 py-3 text-center text-white">
        <h2 className="text-sm font-bold uppercase tracking-wide">{title}</h2>

        <p className="text-xs text-slate-300">{subtitle}</p>
      </header>

      <div className="space-y-4">
        {matches.map((match) => (
          <MatchCard
            key={match.id}
            match={match}
            saving={savingGameId === match.id}
            onSaveResult={(winningTeamId, teamAScore, teamBScore) =>
              onSaveResult(match, winningTeamId, teamAScore, teamBScore)
            }
          />
        ))}
      </div>
    </section>
  );
}
