import {
  Save,
  Calendar,
  Trophy,
  Target,
  LineSquiggle,
  CirclePlus,
  RotateCcw,
  MoveRight,
} from "lucide-react";
import { Team } from "../models/Team";
import { supabase } from "../Supbase-Client";
import { useState, useEffect } from "react";
import { GameRow } from "../types/GameRow";
import { useNavigate } from "react-router-dom";

type GameFormProps = {
  initialValues?: GameRow | null;
  formAction: (game: GameRow) => void;
};

export default function GameForm({ initialValues, formAction }: GameFormProps) {
  const [teams, setTeams] = useState<Team[]>([]);
  const [search1, setSearch1] = useState("");
  const [search2, setSearch2] = useState("");
  const [team1Open, setTeam1Open] = useState(false);
  const [team2Open, setTeam2Open] = useState(false);
  const navigate = useNavigate();
  const [gameData, setGameData] = useState({
    teamA: initialValues?.team_a_id || 0,
    teamABullseyes: initialValues?.team_a_bullseyes || 0,
    teamAHangJacks: initialValues?.team_a_hangjacks || 0,
    teamBBullseyes: initialValues?.team_b_bullseyes || 0,
    teamBHangJacks: initialValues?.team_b_hangjacks || 0,
    winner: initialValues?.winner_team_id || 0,
    teamB: initialValues?.team_b_id || 0,
    start: initialValues?.start_time || "",
    end: initialValues?.end_time || "",
  });

  async function getTeams() {
    const { data, error } = await supabase.from("Teams").select("*");

    setTeams(data ?? []);
  }

  function handleOnChange(e: any) {
    setGameData((prev) => ({
      ...prev,
      [e.target.name]: Number(e.target.value),
    }));
  }

  function checkRequiredInputs() {
    if (!gameData.teamA || !gameData.teamB) {
      alert("Please select both teams from list.");
      return;
    }

    if (gameData.teamA === gameData.teamB) {
      alert("Home team and away team cannot be the same.");
      return;
    }

    if (!gameData.start) {
      alert("Please enter a start time.");
      return;
    }

    if (
      gameData.teamABullseyes < 0 ||
      gameData.teamBBullseyes < 0 ||
      gameData.teamAHangJacks < 0 ||
      gameData.teamBHangJacks < 0
    ) {
      alert("Stats cannot be negative.");
      return;
    }
  }
  async function save() {
    const winner = checkForWinner();
    const game = {
      team_a_id: gameData.teamA,
      team_b_id: gameData.teamB,
      team_a_bullseyes: gameData.teamABullseyes,
      team_a_hangjacks: gameData.teamAHangJacks,
      team_b_bullseyes: gameData.teamBBullseyes,
      team_b_hangjacks: gameData.teamBHangJacks,
      start_time: gameData.start,
      end_time: gameData.end,
      winner_team_id: winner,
    };
    formAction(game);
  }

  function checkForWinner() {
    if (gameData.end !== "") {
      return gameData.teamABullseyes > gameData.teamBBullseyes
        ? gameData.teamA
        : gameData.teamB;
    }
    return 0;
  }
  async function handleSubmit(e: any) {
    e.preventDefault();
    checkRequiredInputs();
    await save();
    navigate("/");
  }

  useEffect(() => {
    getTeams();
  }, []);

  useEffect(() => {
    if (!initialValues || teams.length === 0) {
      return;
    }
    const teamA = teams.find((team) => team.id === initialValues.team_a_id);
    const teamB = teams.find((team) => team.id == initialValues.team_b_id);
    setSearch1(teamA?.name ?? "");
    setSearch2(teamB?.name ?? "");
  }, [teams]);
  return (
    <section className="grid grid-cols-1 p-3 md:grid-cols-2">
      <div className="flex flex-row justify-between pl-2 md:col-span-2">
        <CirclePlus
          size={36}
          className="rounded-full bg-blue-50  p-1 text-blue-700"
        />
        <div className="flex items-center justify-center rounded-lg border-2 border-gray-100 p-2 text-xs">
          <RotateCcw size={15} />
          <p className="ml-1">Reset</p>
        </div>
      </div>
      <div className="col-span-2 flex justify-between">
        <div className="flex-col pl-2 md:flex-row">
          <div className="col-span-2 mb-5 flex flex-col">
            <p className="text-xl font-bold"> Game Score Card</p>
            <div className="gap-1 md:flex ">
              <p>Enter the final score and details</p>
              <p>for the game</p>
            </div>
          </div>
        </div>
      </div>
      <form className="col-span-1 md:col-span-2" onSubmit={handleSubmit}>
        <div className="col-span-2 flex flex-grow flex-col gap-6 md:flex-row">
          <div className="flex flex-grow flex-col rounded-lg border-2 border-gray-100 p-2">
            <div className="mb-2 flex items-center text-green-700">
              <Trophy
                size={40}
                className="rounded-full bg-green-50 p-2 text-green-700"
              />
              <div className="pl-1 font-bold"> Home Team</div>
            </div>
            <div className="my-3 ">
              <div className="relative">
                <input
                  type="text"
                  required
                  onChange={(e) => {
                    setSearch1(e.target.value);
                    setTeam1Open(true);
                    setGameData((prev) => ({
                      ...prev,
                      teamA: 0,
                    }));
                  }}
                  value={search1}
                  name="teamA"
                  className="h-12 w-full rounded-lg border-2 border-gray-100 px-2"
                  placeholder=" Select Team"
                />
                {search1 && team1Open && (
                  <div className="absolute z-20 mt-2 max-h-60 w-full overflow-y-auto rounded-lg border border-slate-200 bg-white shadow-lg">
                    {teams
                      .filter((team: Team) =>
                        team.name.toLowerCase().includes(search1.toLowerCase()),
                      )
                      .map((team: Team) => (
                        <div
                          onClick={() => {
                            setSearch1(team.name);
                            setGameData((prev) => ({
                              ...prev,
                              teamA: team.id,
                            }));
                            setTeam1Open(false);
                          }}
                          key={team.id}
                        >
                          {team.name}
                        </div>
                      ))}
                  </div>
                )}
              </div>
            </div>
            <div className="flex">
              <Target
                size={40}
                className="mr-3 rounded-lg bg-green-50 p-2 text-green-700"
              />
              <div className="flex flex-col pl-1">
                <p className="font-bold">Bulls Eyes</p>
                <p> Enter the number of bulls eyes</p>
              </div>
            </div>
            <div className="flex flex-row justify-end">
              <div className="my-2 flex h-10 w-1/3 overflow-hidden rounded-lg border border-gray-200">
                <button
                  type="button"
                  onClick={() => {
                    setGameData((prev) => ({
                      ...prev,
                      teamABullseyes: prev.teamABullseyes - 1,
                    }));
                  }}
                  className="flex w-1/3 items-center justify-center bg-green-100 hover:bg-green-200"
                >
                  -
                </button>

                <input
                  className="flex w-1/3  items-center justify-center text-center font-semibold"
                  type="number"
                  min={0}
                  name="teamABullseyes"
                  value={gameData.teamABullseyes.toString()}
                  onChange={handleOnChange}
                />

                <button
                  type="button"
                  onClick={() => {
                    setGameData((prev) => ({
                      ...prev,
                      teamABullseyes: prev.teamABullseyes + 1,
                    }));
                  }}
                  className="flex w-1/3 items-center justify-center bg-green-100 hover:bg-green-200"
                >
                  +
                </button>
              </div>
            </div>
            <div className="flex">
              <LineSquiggle
                size={40}
                className="mr-3 rounded-lg bg-green-50 p-2 text-green-700"
              />
              <div className="flex flex-col pl-1">
                <p className="font-bold">Hang Jacks</p>
                <p> Enter the number of hang jacks</p>
              </div>
            </div>
            <div className="flex flex-row justify-end">
              <div className="my-2 flex h-10 w-1/3 overflow-hidden rounded-lg border border-gray-200">
                <button
                  type="button"
                  onClick={() => {
                    setGameData((prev) => ({
                      ...prev,
                      teamAHangJacks: prev.teamAHangJacks - 1,
                    }));
                  }}
                  className="flex w-1/3 items-center justify-center bg-green-100 hover:bg-green-200"
                >
                  -
                </button>

                <input
                  className="flex w-1/3  items-center justify-center text-center font-semibold"
                  type="number"
                  min={0}
                  name="teamAHangJacks"
                  value={gameData.teamAHangJacks.toString()}
                  onChange={handleOnChange}
                />

                <button
                  type="button"
                  onClick={() => {
                    setGameData((prev) => ({
                      ...prev,
                      teamAHangJacks: prev.teamAHangJacks + 1,
                    }));
                  }}
                  className="flex w-1/3 items-center justify-center bg-green-100 hover:bg-green-200"
                >
                  +
                </button>
              </div>
            </div>
          </div>
          <div className="flex flex-grow flex-col rounded-lg border-2 border-gray-100 p-2">
            <div className="mb-2 flex items-center text-green-700">
              <Trophy
                size={40}
                className="rounded-full bg-green-50 p-2 text-green-700"
              />
              <div className="pl-1 font-bold"> Away Team</div>
            </div>
            <div className="my-3 ">
              <div className="relative">
                <input
                  type="text"
                  required
                  onChange={(e) => {
                    setSearch2(e.target.value);
                    setTeam2Open(true);
                    setGameData((prev) => ({
                      ...prev,
                      teamB: 0,
                    }));
                  }}
                  value={search2}
                  name="teamB"
                  className="h-12 w-full rounded-lg border-2 border-gray-100 px-2"
                  placeholder=" Select Team"
                />
                {search2 && team2Open && (
                  <div className="absolute z-20 mt-2 max-h-60 w-full overflow-y-auto rounded-lg border border-slate-200 bg-white shadow-lg">
                    {teams
                      .filter((team: Team) =>
                        team.name.toLowerCase().includes(search2.toLowerCase()),
                      )
                      .map((team: Team) => (
                        <div
                          onClick={() => {
                            setSearch2(team.name);
                            setGameData((prev) => ({
                              ...prev,
                              teamB: team.id,
                            }));
                            setTeam2Open(false);
                          }}
                          key={team.id}
                        >
                          {team.name}
                        </div>
                      ))}
                  </div>
                )}
              </div>
            </div>
            <div className="flex">
              <Target
                size={40}
                className="mr-3 rounded-lg bg-green-50 p-2 text-green-700"
              />
              <div className="flex flex-col pl-1">
                <p className="font-bold">Bulls Eyes</p>
                <p> Enter the number of bulls eyes</p>
              </div>
            </div>
            <div className="flex flex-row justify-end">
              <div className="my-2 flex h-10 w-1/3 overflow-hidden rounded-lg border border-gray-200">
                <button
                  type="button"
                  onClick={() => {
                    setGameData((prev) => ({
                      ...prev,
                      teamBBullseyes: prev.teamBBullseyes - 1,
                    }));
                  }}
                  className="flex w-1/3 items-center justify-center bg-green-100 hover:bg-green-200"
                >
                  -
                </button>

                <input
                  className="flex w-1/3  items-center justify-center text-center font-semibold"
                  type="number"
                  min={0}
                  name="teamBBullseyes"
                  value={gameData.teamBBullseyes.toString()}
                  onChange={handleOnChange}
                />

                <button
                  type="button"
                  onClick={() => {
                    setGameData((prev) => ({
                      ...prev,
                      teamBBullseyes: prev.teamBBullseyes + 1,
                    }));
                  }}
                  className="flex w-1/3 items-center justify-center bg-green-100 hover:bg-green-200"
                >
                  +
                </button>
              </div>
            </div>
            <div className="flex">
              <LineSquiggle
                size={40}
                className="mr-3 rounded-lg bg-green-50 p-2 text-green-700"
              />
              <div className="flex flex-col pl-1">
                <p className="font-bold">Hang Jacks</p>
                <p> Enter the number of hang jacks</p>
              </div>
            </div>
            <div className="flex flex-row justify-end">
              <div className="my-2 flex h-10 w-1/3 overflow-hidden rounded-lg border border-gray-200">
                <button
                  type="button"
                  onClick={() => {
                    setGameData((prev) => ({
                      ...prev,
                      teamBHangJacks: prev.teamBHangJacks - 1,
                    }));
                  }}
                  className="flex w-1/3 items-center justify-center bg-green-100 hover:bg-green-200"
                >
                  -
                </button>

                <input
                  className="flex w-1/3  items-center justify-center text-center font-semibold"
                  type="number"
                  min={0}
                  name="teamBHangJacks"
                  value={gameData.teamBHangJacks.toString()}
                  onChange={handleOnChange}
                />

                <button
                  type="button"
                  onClick={() => {
                    setGameData((prev) => ({
                      ...prev,
                      teamBHangJacks: prev.teamBHangJacks + 1,
                    }));
                  }}
                  className="flex w-1/3 items-center justify-center bg-green-100 hover:bg-green-200"
                >
                  +
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="col-span-2 my-4 flex flex-grow flex-col items-center gap-4 md:flex-row md:gap-1 ">
          <div className="flex w-full flex-grow flex-col rounded-lg border-2 border-gray-100 p-2">
            <div className="flex">
              <Calendar className="rounded-full bg-blue-300 p-1 text-blue-700 " />
              <p className="pl-1 font-bold"> Start Time</p>
            </div>
            <div className="text center text-sm text-gray-500">
              When did game start
            </div>

            <input
              type="datetime-local"
              required
              name="start"
              value={gameData.start}
              onChange={(e) => {
                setGameData((prev) => ({ ...prev, start: e.target.value }));
              }}
              className="flex w-full justify-between rounded-xl border-2 border-gray-100 p-1 "
            />
          </div>
          <MoveRight className="mx-1 hidden md:block" />
          <div className="flex w-full flex-grow flex-col rounded-lg border-2 border-gray-100 p-2">
            <div className="flex">
              <Calendar className="rounded-full bg-blue-300 p-1 text-blue-700 " />
              <p className="pl-1 font-bold"> End Time</p>
            </div>
            <div className="text center text-sm text-gray-500">
              When did game end
            </div>
            <input
              type="datetime-local"
              name="end"
              value={gameData.end}
              onChange={(e) => {
                setGameData((prev) => ({ ...prev, end: e.target.value }));
              }}
              className="flex w-full justify-between rounded-xl border-2 border-gray-100 p-1 "
            />
          </div>
        </div>
        <button
          type="submit"
          className="col-span-2 flex h-12 w-full cursor-pointer items-center justify-center rounded-lg bg-blue-700 text-center text-white shadow-md"
        >
          <Save /> <div className="px-2 font-bold"> Save Score Card</div>
        </button>
      </form>
    </section>
  );
}
