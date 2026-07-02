import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ChevronRight, Trophy } from "lucide-react";
import { supabase } from "../Supbase-Client";
import { RankingByDivisionRow } from "../types/RankingsByDivisionRow";

export default function Rankings() {
  const [rankings, setRankings] = useState<RankingByDivisionRow[]>([]);

  useEffect(() => {
    getRankings();
  }, []);

  async function getRankings() {
    const { data, error } = await supabase
      .from("team_standings_by_division")
      .select("*");

    return error ? error : setRankings(data);
  }

  return (
    <main className="bg-slate-100 px-4 py-8">
      <section className="mx-auto max-w-6xl overflow-hidden rounded-3xl bg-white shadow-sm">
        <div className="border-b p-6">
          <div className="flex items-center gap-3">
            <Trophy className="text-yellow-500" size={32} />
            <h1 className="font-display text-5xl tracking-wide text-[#071b3a]">
              Tournament Rankings
            </h1>
          </div>

          <p className="mt-2 text-slate-500">
            Overall team standings for the full tournament.
          </p>
        </div>

        <div className="grid grid-cols-12 bg-slate-50 px-4 py-3 text-xs font-bold uppercase tracking-wide text-slate-500">
          <div className="col-span-1">#</div>
          <div className="col-span-4">Team</div>
          <div className="col-span-2">Division</div>
          <div className="col-span-1 text-center">GP</div>
          <div className="col-span-1 text-center">W</div>
          <div className="col-span-1 text-center">L</div>
          <div className="col-span-1 text-center">Bulls</div>
          <div className="col-span-1 text-center">HJ</div>
        </div>

        <div className="divide-y divide-slate-100">
          {rankings.map((team, index) => (
            <Link
              key={team.team_id}
              to={`/teams/${team.team_id}`}
              className="grid grid-cols-12 items-center px-4 py-4 text-sm transition hover:bg-slate-50"
            >
              <div className="col-span-1 font-bold text-slate-500">
                {index + 1}
              </div>

              <div className="col-span-4 font-bold text-[#071b3a]">
                {team.team_name}
              </div>

              <div className="col-span-2">
                <span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-700">
                  {team.division_name}
                </span>
              </div>

              <div className="col-span-1 text-center">{team.games_played}</div>

              <div className="col-span-1 text-center font-bold text-green-700">
                {team.wins}
              </div>

              <div className="col-span-1 text-center text-red-700">
                {team.losses}
              </div>

              <div className="col-span-1 text-center">{team.bullseyes_for}</div>

              <div className="col-span-1 flex items-center justify-between text-center">
                <p></p>
                <span className="ml-3">{team.hangjacks_for}</span>
                <ChevronRight size={16} className="text-slate-400" />
              </div>
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}
