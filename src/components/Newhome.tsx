import { Radio } from "lucide-react";
import ScoresCard from "./Scorescard";
import Rankings from "./Rankings";
import TournamentStats from "./Tournamentstats";
import { supabase } from "../Supbase-Client";
import { useEffect, useState } from "react";
import { GameRow } from "../types/GameRow";
import { mapGameRowToGame } from "../mappers/GameMapper";
import { TeamRow } from "../types/TeamRow";
import { Team } from "../models/Team";
import { teamRowtoTeamMapper } from "../mappers/TeamMapper";
import { Link } from "react-router-dom";

export default function NewHome() {
  const [games, setGames] = useState<GameRow[]>([]);
  const [teams, setTeams] = useState<TeamRow[]>([]);
  const teamsById = teams.reduce<Record<number, Team>>((acc, team) => {
    acc[team.id] = teamRowtoTeamMapper(team);
    return acc;
  }, {});

  console.log(teamsById);

  async function getGames() {
    const { data, error } = await supabase.from("Games").select("*");
    setGames(data ?? []);
    return error ? error : data;
  }

  async function getTeams() {
    const { data, error } = await supabase.from("Teams").select("*");
    setTeams(data ?? []);
    return error ? error : data;
  }

  useEffect(() => {
    const gamesRes = getGames();
    const teamRes = getTeams();
  }, []);

  return (
    <section className="grid grid-flow-row-dense grid-cols-1 gap-2 px-5 py-5 lg:grid-cols-3 ">
      <div className=" col-span-1 flex flex-col gap-2 rounded-md bg-white px-2 pl-2 md:col-span-2 ">
        <div className="flex justify-between pb-5">
          <div className="flex md:flex-col">
            <div className="flex gap-2 pt-2">
              <Radio className="hidden text-red-500 md:block" />{" "}
              <p className=" font-display text-3xl">LIVE SCORES</p>
            </div>
            <p className="hidden md:block">Stay Up to Date With Live Scores</p>
          </div>

          <div className="pt-2">
            <p className="rounded-md  bg-red-900 px-3 py-1 font-display text-sm text-white">
              View All{" "}
            </p>
          </div>
        </div>

        {/* Card Component*/}
        {games.map((game, index) => (
          <Link to={`/game/${game.id}`}>
            <ScoresCard
              key={game.id}
              game={mapGameRowToGame(game)}
              teamsById={teamsById}
            />
          </Link>
        ))}
      </div>

      <div className="col-span-1 rounded-md bg-white p-2">
        <Rankings />
        <TournamentStats />
      </div>
    </section>
  );
}
