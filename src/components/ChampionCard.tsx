import { Trophy } from "lucide-react";

import type { PlayoffTeam } from "../types/Playoff";

interface ChampionCardProps {
  champion: PlayoffTeam | null;
}

export default function ChampionCard({ champion }: ChampionCardProps) {
  return (
    <section className="flex min-h-56 flex-col items-center justify-center rounded-2xl border border-amber-200 bg-amber-50 px-6 py-8 text-center">
      <div className="mb-4 flex size-20 items-center justify-center rounded-full bg-amber-100">
        <Trophy size={44} className="text-amber-600" />
      </div>

      <p className="text-sm font-semibold uppercase tracking-widest text-amber-700">
        Champion
      </p>

      <h2 className="mt-2 text-2xl font-black text-slate-900">
        {champion?.name ?? "TBD"}
      </h2>

      {champion && (
        <p className="mt-2 text-sm text-slate-600">Tournament winner</p>
      )}
    </section>
  );
}
