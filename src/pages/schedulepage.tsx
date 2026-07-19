import { supabase } from "../Supbase-Client";
import { useEffect, useState } from "react";
import { GameRow } from "../types/GameRow";
import { TeamRow } from "../types/TeamRow";
import { formatDateHM, formatDateMDHM } from "../util/date";
import { Link } from "react-router-dom";
import { getTeamsById } from "../util/teamsById";

export default function Schedule() {
  const [games, setGames] = useState<GameRow[]>([]);
  const [teams, setTeams] = useState<TeamRow[]>([]);
  const teamsById = getTeamsById(teams);

  async function getGames() {
    const { data, error } = await supabase
      .from("Games")
      .select("*")
      .order("start_time");
    return error ? error : setGames(data);
  }

  async function getTeams() {
    const { data, error } = await supabase.from("Teams").select("*");
    return error ? error : setTeams(data);
  }

  useEffect(() => {
    getGames();
    getTeams();
  }, []);
  if (!games || teams.length === 0) {
    return <>loading ..</>;
  }
  return (
    <main className="bg-slate-50 px-4 py-6">
      <section className="mx-auto max-w-6xl rounded-2xl bg-white shadow-sm">
        <div className="border-b border-slate-200 p-5">
          <h1 className="font-display text-4xl tracking-wide text-[#071b3a]">
            Game Schedule
          </h1>
          <p className="text-sm text-slate-500">
            Click any game to view full details.
          </p>
        </div>

        <div className="justify-between divide-y divide-slate-100">
          {games.map((game) => (
            <Link
              key={game.id}
              to={`/game/${game.id}`}
              className="grid grid-cols-12 items-center gap-3 px-5 py-4 text-sm transition hover:bg-slate-50"
            >
              <div className="col-span-3 font-semibold text-red-700 lg:col-span-2">
                Round
              </div>

              <div className="col-span-3 flex flex-col items-center text-center font-bold text-[#071b3a] md:flex-row lg:col-span-4 ">
                {teamsById[game.team_a_id]?.name}
                <span className="mx-2 text-slate-400">vs</span>
                {teamsById[game.team_b_id]?.name}
              </div>

              <div className="col-span-3 text-center text-slate-600 lg:col-span-2">
                {formatDateMDHM(game.start_time)}
              </div>

              <div className=" col-span-2 hidden text-slate-600 lg:block">
                {formatDateHM(game.start_time)}
              </div>

              <div className="col-span-3 text-right lg:col-span-2">
                <span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-bold text-blue-700">
                  status
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}
