import { supabase } from "../Supbase-Client";
import { useEffect, useState } from "react";
import { RankingsRow } from "../types/RankingsRow";
import { Link } from "react-router-dom";

export default function Rankings() {
  const [rankings, setRankings] = useState<RankingsRow[]>([]);

  async function getRankings() {
    const { data } = await supabase
      .from("rankings")
      .select("*")
      .order("bullseyes_for", { ascending: false })
      .order("bullseyes_against", { ascending: true })
      .order("wins", { ascending: false });
    setRankings(data ?? []);
  }
  useEffect(() => {
    getRankings();
  }, []);

  return (
    <section>
      <div className="rounded-md border-2 border-gray-100 px-2 py-3">
        <div className="flex flex-col">
          <div className="flex items-center lg:flex-col lg:items-start">
            <span className="mr-2 font-display text-2xl text-blue-950">
              Top Rankings
            </span>
            <span className="text-red-500"> </span>
          </div>
          <div className="overflow-hidden rounded-lg border-2 border-gray-100 text-center text-sm shadow-md transition-all duration-200 hover:-translate-y-1 hover:shadow-xl lg:text-xl">
            <table className="w-full">
              <thead>
                <tr className=" bg-slate-100 font-display tracking-wide ">
                  <td className="px-2">#</td>
                  <td className="px-2">team</td>
                  <td className="px-2">W</td>
                  <td className="px-2">Bullseyes</td>
                  <td className="px-2">Hangjacks</td>
                </tr>
              </thead>
              <tbody>
                {rankings.map((team, index) => (
                  <tr key={team.id} className="md:text-sm">
                    <td>{index + 1}</td>
                    <td>{team.name}</td>
                    <td>{team.wins}</td>
                    <td>{team.bullseyes_for}</td>
                    <td>{team.hangjacks_for}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <Link to="/rankings">
            <div className="mt-2  cursor-pointer rounded-md bg-red-700 shadow-md shadow-md transition-all duration-200 hover:-translate-y-1 hover:shadow-xl">
              <p className="text-center font-display text-xl text-white">
                View full Rankings
              </p>
            </div>
          </Link>
        </div>
      </div>
    </section>
  );
}
