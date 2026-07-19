import type { PlayoffMatch, PlayoffTeam } from "../types/Playoff";

import MatchCard from "./MatchCard";

interface RoundColumnProps {
  title: string;
  subtitle: string;
  matches: PlayoffMatch[];
  className?: string;
  onSelectWinner: (matchId: string, team: PlayoffTeam) => void;
}

export default function RoundColumn({
  title,
  subtitle,
  matches,
  className = "",
  onSelectWinner,
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
            onSelectWinner={onSelectWinner}
          />
        ))}
      </div>
    </section>
  );
}
