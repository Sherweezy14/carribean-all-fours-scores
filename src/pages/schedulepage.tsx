import { Calendar, Clock, Users, MapPin } from "lucide-react";
import { supabase } from "../Supbase-Client";
import { useEffect, useState } from "react";
import { GameRow } from "../types/GameRow";
import { TeamRow } from "../types/TeamRow";
import { formatDateMDHM } from "../util/date";
import { Team } from "../models/Team";
import { getTeamsById } from "../util/teamsById";

export default function Schedule() {
  const [games, setGames] = useState<GameRow[]>([]);
  const [teams, setTeams] = useState<TeamRow[]>([]);
  const teamsById = getTeamsById(teams);

  async function getGames() {
    const { data, error } = await supabase.from("Games").select("*");
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

  return (
    <main className="bg-slate-50 px-4 py-8 md:px-8">
      <section className="mx-auto max-w-6xl">
        <div className="mb-8">
          <p className="font-display text-lg tracking-[0.2em] text-red-700">
            UNITY SPORTS CLUB
          </p>
          <h1 className="font-display text-5xl tracking-wide text-[#071b3a] md:text-7xl">
            GAME SCHEDULE
          </h1>
          <p className="mt-2 text-slate-600">
            View upcoming Round Robin All Fours tournament matches.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-5">
          {games.map((game) => (
            <div
              key={game.id}
              className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition-all hover:-translate-y-1 hover:shadow-md"
            >
              <div className="mb-4 flex items-center justify-between">
                <span className="rounded-full bg-blue-50 px-4 py-1 text-sm font-bold text-blue-700">
                  round 1
                </span>

                <span className="rounded-full bg-green-50 px-4 py-1 text-sm font-bold text-green-700">
                  Live
                </span>
              </div>

              <div className="grid grid-cols-1 items-center gap-6 md:grid-cols-3">
                <div className="text-center md:text-left">
                  <p className="text-sm text-slate-500">Home Team</p>
                  <p className="font-display text-4xl tracking-wide text-[#071b3a]">
                    {teamsById[game.team_a_id].name}
                  </p>
                </div>

                <div className="text-center">
                  <p className="font-display text-3xl text-red-700">VS</p>
                </div>

                <div className="text-center md:text-right">
                  <p className="text-sm text-slate-500">Away Team</p>
                  <p className="font-display text-4xl tracking-wide text-[#071b3a]">
                    {teamsById[game.team_b_id].name}
                  </p>
                </div>
              </div>

              <div className="mt-6 grid grid-cols-1 gap-3 border-t border-slate-100 pt-4 text-sm text-slate-600 md:grid-cols-3">
                <div className="flex items-center gap-2">
                  <Calendar size={18} className="text-red-700" />
                  <span>{formatDateMDHM(game.start_time)}</span>
                </div>

                <div className="flex items-center gap-2">
                  <Clock size={18} className="text-blue-700" />
                  <span>length of time</span>
                </div>

                <div className="flex items-center gap-2">
                  <MapPin size={18} className="text-yellow-500" />
                  <span>location</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
