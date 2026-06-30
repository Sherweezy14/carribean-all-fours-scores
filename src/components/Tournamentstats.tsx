import { Target, Gamepad, Spade } from "lucide-react";
import { useEffect, useState } from "react";
import { TournamentStatsRow } from "../types/TournamentStatsRow";
import { supabase } from "../Supbase-Client";

export default function TournamentStats() {
  const [stats, setStats] = useState<TournamentStatsRow | null>(null);
  async function getStats() {
    const { data, error } = await supabase.from("tournament_stats").select("*");
    return error ? error : setStats(data?.[0] ?? {});
  }
  useEffect(() => {
    const res = getStats();
    console.log(res);
  }, []);

  return (
    <section className="mt-3 flex flex-col rounded-md border-2 border-gray-100 px-2 py-3 font-display">
      <div className="  text-2xl tracking-wide text-blue-950">
        Tournment STATS
      </div>
      <div className="flex justify-between">
        <div className="flex flex-col items-center">
          <Target size={48} className="text-red-700" />
          <p className="text-2xl">Bullseyes</p>
          <p className="text-6xl">{stats?.bull_seyes}</p>
        </div>
        <div className="flex flex-col items-center">
          <Spade size={48} className="text-yellow-400" />
          <p className="text-2xl">Hangjacks</p>
          <p className="text-6xl">{stats?.hang_jacks}</p>
        </div>
        <div className="flex flex-col items-center">
          <Gamepad size={48} className="text-blue-950" />
          <p className="text-2xl">Games played</p>
          <p className="text-6xl">{stats?.games_played}</p>
        </div>
      </div>
    </section>
  );
}
