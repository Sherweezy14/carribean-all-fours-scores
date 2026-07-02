import { useEffect, useState } from "react";
import { supabase } from "../Supbase-Client";
import { TeamRow } from "../types/TeamRow";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { ArrowLeft, Trophy, ChevronRight } from "lucide-react";
import { GameRow } from "../types/GameRow";

export default function ViewTeam() {
  const [team, setTeam] = useState<TeamRow | null>(null);
  const [teamGames, setTeamGames] = useState<GameRow[]>([]);
  const { id } = useParams();
  const teamId = id;

  useEffect(() => {
    async function getTeamGames() {
      const { data, error } = await supabase
        .from("Games")
        .select("*")
        .or(`team_a_id.eq.${teamId},team_b_id.eq.${teamId}`)
        .order("start_time", { ascending: false });
      return error ? error : setTeamGames(data);
    }
    async function getTeam() {
      const { data, error } = await supabase
        .from("Teams")
        .select("*")
        .eq("id", teamId)
        .single();
      return error ? error : setTeam(data);
    }
    getTeam();
    getTeamGames();
  }, []);

  if (!team) {
    return <> loading ...</>;
  }

  return (
    <main className="bg-slate-100 px-4 py-8">
      <section className="mx-auto max-w-5xl rounded-3xl bg-white shadow">
        <div className="border-b p-6">
          <Link
            to="/teams"
            className="mb-6 flex items-center gap-2 text-blue-700 hover:underline"
          >
            <ArrowLeft size={18} />
            Back to Teams
          </Link>

          <div className="flex items-center gap-4">
            <div className="hidden h-16 w-16 items-center justify-center rounded-full bg-red-700 text-3xl font-bold text-white md:flex">
              {team.name.charAt(0)}
            </div>

            <div>
              <h1 className="font-display text-5xl tracking-wide text-[#071b3a]">
                {team.name}
              </h1>
              <p className="text-slate-500">Team game history</p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-4 border-b bg-slate-50 p-5 text-center">
          <div>
            <p className="text-sm text-slate-500">Games</p>
            <p className="text-2xl font-bold">{teamGames.length | 0}</p>
          </div>

          <div>
            <p className="text-sm text-slate-500">Wins</p>
            <p className="text-2xl font-bold">
              {teamGames.filter((game) => game.winner_team_id === team.id)
                .length | 0}
            </p>
          </div>

          <div>
            <p className="text-sm text-slate-500">Losses</p>
            <p className="text-2xl font-bold">
              {teamGames.filter(
                (game: GameRow) => game.winner_team_id !== team.id,
              ).length | 0}
            </p>
          </div>
        </div>

        <div className="divide-y divide-slate-100">
          {teamGames?.map((game: GameRow) => {
            const isTeamA = game.team_a_id === team.id;

            const teamBullseyes = isTeamA
              ? game.team_a_bullseyes
              : game.team_b_bullseyes;

            const opponentBullseyes = isTeamA
              ? game.team_b_bullseyes
              : game.team_a_bullseyes;

            const teamHangjacks = isTeamA
              ? game.team_a_hangjacks
              : game.team_b_hangjacks;

            const opponentHangjacks = isTeamA
              ? game.team_b_hangjacks
              : game.team_a_hangjacks;

            const result = game.winner_team_id === team.id ? "Win" : "Loss";

            return (
              <Link
                key={game.id}
                to={`/game/${game.id}`}
                className="grid grid-cols-12 items-center gap-3 px-5 py-4 text-sm transition hover:bg-slate-50"
              >
                <div className="col-span-2">
                  <span
                    className={`rounded-full px-1 py-1 text-xs font-bold md:px-3 md:py-1 ${
                      result === "Win"
                        ? "bg-green-100 text-green-700"
                        : "bg-red-100 text-red-700"
                    }`}
                  >
                    {result}
                  </span>
                </div>

                <div className="col-span-4 font-bold text-[#071b3a]">
                  Bullseyes: {teamBullseyes} - {opponentBullseyes}
                </div>

                <div className="col-span-4 text-slate-600">
                  HangJacks: {teamHangjacks} - {opponentHangjacks}
                </div>

                <div className="col-span-1 flex items-center gap-1 text-yellow-600">
                  {result === "Win" && <Trophy size={16} />}
                </div>

                <div className="col-span-1 hidden justify-end md:flex">
                  <ChevronRight size={20} className="text-slate-400" />
                </div>
              </Link>
            );
          })}
        </div>
      </section>
    </main>
  );
}
