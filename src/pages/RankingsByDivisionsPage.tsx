import { Link } from "react-router-dom";
import { Trophy, ChevronRight } from "lucide-react";
import { supabase } from "../Supbase-Client";
import { useState, useEffect } from "react";
import { RankingByDivisionRow } from "../types/RankingsByDivisionRow";

export default function DivisionRankings() {
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

  const rankingsByDivision = rankings.reduce<
    Record<string, RankingByDivisionRow[]>
  >(
    (
      acc: Record<string, RankingByDivisionRow[]>,
      row: RankingByDivisionRow,
    ) => {
      if (!acc[row.division_name]) {
        acc[row.division_name] = [];
      }

      acc[row.division_name].push(row);
      return acc;
    },
    {},
  );

  return (
    <main className="bg-slate-100 px-4 py-8">
      <section className="mx-auto max-w-6xl">
        <div className="mb-8">
          <p className="font-display text-lg tracking-[0.2em] text-red-700">
            Round Robin
          </p>

          <h1 className="font-display text-5xl tracking-wide text-[#071b3a] md:text-7xl">
            Rankings
          </h1>

          <p className="text-slate-500">Team standings grouped by division.</p>
        </div>

        <div className="space-y-8">
          {Object.entries(rankingsByDivision).map(([divisionName, teams]) => (
            <div
              key={divisionName}
              className="overflow-hidden rounded-3xl bg-white shadow-sm"
            >
              <div className="flex items-center gap-3 bg-[#071b3a] px-6 py-4 text-white">
                <Trophy size={24} className="text-yellow-400" />

                <h2 className="font-display text-4xl tracking-wide">
                  {divisionName}
                </h2>
              </div>

              <div className="grid grid-cols-12 bg-slate-50 px-4 py-3 text-xs font-bold uppercase tracking-wide text-slate-500">
                <div className="col-span-1">#</div>
                <div className="col-span-4">Team</div>
                <div className="col-span-1 text-center">GP</div>
                <div className="col-span-1 text-center">W</div>
                <div className="col-span-1 text-center">L</div>
                <div className="col-span-2 text-center">Bulls</div>
                <div className="col-span-1 text-center">HJ</div>
                <div className="col-span-1"></div>
              </div>

              <div className="divide-y divide-slate-100">
                {teams.map((team, index) => (
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

                    <div className="col-span-1 text-center">
                      {team.games_played}
                    </div>

                    <div className="col-span-1 text-center font-bold text-green-700">
                      {team.wins}
                    </div>

                    <div className="col-span-1 text-center text-red-700">
                      {team.losses}
                    </div>

                    <div className="col-span-2 text-center">
                      {team.bullseyes_for}
                    </div>

                    <div className="col-span-1 text-center">
                      {team.hangjacks_for}
                    </div>

                    <div className="col-span-1 flex justify-end">
                      <ChevronRight size={18} className="text-slate-400" />
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
