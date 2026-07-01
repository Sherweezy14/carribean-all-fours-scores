import {
  Trophy,
  Clock,
  Calendar,
  ArrowLeft,
  Flag,
  DivideIcon,
} from "lucide-react";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { supabase } from "../Supbase-Client";
import { Link } from "react-router-dom";
import { TeamRow } from "../types/TeamRow";
import { GameRow } from "../types/GameRow";
import { getTeamsById } from "../util/teamsById";
import { formatDateHM } from "../util/date";
import { useNavigate } from "react-router-dom";
export default function ViewGame() {
  const [game, setGame] = useState<GameRow | null>(null);
  const [teams, setTeams] = useState<TeamRow[]>([]);
  const { id } = useParams();
  const gameId = id;
  const teamsById = getTeamsById(teams);
  const navigate = useNavigate();

  async function getGame() {
    const { data, error } = await supabase
      .from("Games")
      .select("*")
      .eq("id", gameId)
      .single();
    return error ? error : setGame(data);
  }

  async function getTeams() {
    const { data, error } = await supabase.from("Teams").select("*");
    return error ? error : setTeams(data);
  }

  useEffect(() => {
    getGame();
    getTeams();
  }, []);
  if (!game || teams.length === 0) {
    return <> loading</>;
  }
  return (
    <main className="bg-slate-100 px-4 py-8">
      <section className="mx-auto max-w-5xl rounded-3xl bg-white shadow-lg">
        {/* Header */}

        <div className="border-b p-6">
          <div
            onClick={() => navigate(-1)}
            className="mb-6 flex cursor-pointer items-center gap-2 text-blue-700 hover:underline"
          >
            <ArrowLeft size={18} />
            Back
          </div>

          <p className="text-center text-red-700">ROUND</p>

          <h1 className="text-center font-display text-5xl text-[#071b3a]">
            Game Details
          </h1>
        </div>

        {/* Scoreboard */}

        <div className="grid grid-cols-3 items-center p-10">
          {/* Team A */}

          <div className="text-center">
            <h2 className="font-display text-5xl text-[#071b3a]">
              {teamsById[game?.team_a_id].name}
            </h2>

            <p className="mt-6 text-8xl font-black text-red-700">
              {game.team_a_bullseyes}
            </p>
          </div>

          {/* Middle */}

          <div className="text-center">
            <p className="text-xl tracking-[0.3em] text-slate-400">VS</p>

            <div className="my-8">
              <div className="mb-4 rounded-xl bg-slate-100 p-4">
                <p className="text-sm uppercase text-slate-500">Bullseyes</p>

                <p className="text-3xl font-bold">
                  {game.team_a_bullseyes} - {game.team_b_bullseyes}
                </p>
              </div>

              <div className="rounded-xl bg-slate-100 p-4">
                <p className="text-sm uppercase text-slate-500">Hang Jacks</p>

                <p className="text-3xl font-bold">
                  {game.team_a_hangjacks} - {game.team_b_hangjacks}
                </p>
              </div>
            </div>

            <div className="rounded-xl bg-yellow-100 p-4">
              <div className="flex justify-center gap-2">
                <Trophy className="text-yellow-600" />

                <span className="font-bold">Winner</span>
              </div>

              <p className="mt-2 text-2xl font-bold">
                {teamsById[game.winner_team_id].name}
              </p>
            </div>
          </div>

          {/* Team B */}

          <div className="text-center">
            <h2 className="font-display text-5xl text-[#071b3a]">team b</h2>

            <p className="mt-6 text-8xl font-black text-blue-700">
              {game.team_b_bullseyes}
            </p>
          </div>
        </div>

        {/* Bottom Information */}

        <div className="grid grid-cols-2 gap-5 border-t p-8 md:grid-cols-4">
          <div className="rounded-xl bg-slate-50 p-5">
            <Calendar className="mb-2 text-red-700" />

            <p className="text-sm text-slate-500">Started</p>

            <p className="font-semibold">{formatDateHM(game.start_time)}</p>
          </div>

          <div className="rounded-xl bg-slate-50 p-5">
            <Clock className="mb-2 text-blue-700" />

            <p className="text-sm text-slate-500">Ended</p>

            <p className="font-semibold">game end</p>
          </div>

          <div className="rounded-xl bg-slate-50 p-5">
            <Clock className="mb-2 text-green-700" />

            <p className="text-sm text-slate-500">Duration</p>

            <p className="font-semibold">durtion</p>
          </div>

          <div className="rounded-xl bg-slate-50 p-5">
            <Flag className="mb-2 text-yellow-500" />

            <p className="text-sm text-slate-500">Division</p>

            <p className="font-semibold">division</p>
          </div>
        </div>
      </section>
    </main>
  );
}
