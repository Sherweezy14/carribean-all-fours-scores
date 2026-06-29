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

export default function GameForm() {
  const [teams, setTeams] = useState<Team[]>([]);
  const [search1, setSearch1] = useState("");
  const [search2, setSearch2] = useState("");
  const [team1Open, setTeam1Open] = useState(false);
  const [team2Open, setTeam2Open] = useState(false);

  async function getTeams() {
    const { data, error } = await supabase.from("Teams").select("*");
    setTeams(data ?? []);
  }

  function handleOnChange(e: any) {
    if (e.target.name === "team2") {
      setSearch2(e.target.value);
      setTeam2Open(true);
    } else {
      setSearch1(e.target.value);
      setTeam1Open(true);
    }
  }

  useEffect(() => {
    getTeams();
  }, []);
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
      <div className="col-span-2 flex flex-grow flex-col gap-6 md:flex-row">
        <div className="flex flex-grow flex-col rounded-lg border-2 border-gray-100 p-2">
          <div className="mb-2 flex items-center text-green-700">
            <Trophy
              size={40}
              className="rounded-full bg-green-50 p-2 text-green-700"
            />
            <div className="pl-1 font-bold"> Losing Team</div>
          </div>
          <div className="my-3 ">
            <div className="relative">
              <input
                type="text"
                onChange={handleOnChange}
                value={search1}
                name="team1"
                className="h-12 w-full rounded-lg border-2 border-gray-100"
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
              <button className="flex w-1/3 items-center justify-center bg-green-100 hover:bg-green-200">
                -
              </button>

              <span className="flex w-1/3 items-center justify-center font-semibold">
                0
              </span>

              <button className="flex w-1/3 items-center justify-center bg-green-100 hover:bg-green-200">
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
              <button className="flex w-1/3 items-center justify-center bg-green-100 hover:bg-green-200">
                -
              </button>

              <span className="flex w-1/3 items-center justify-center font-semibold">
                0
              </span>

              <button className="flex w-1/3 items-center justify-center bg-green-100 hover:bg-green-200">
                +
              </button>
            </div>
          </div>
        </div>
        <div className="flex flex-grow  flex-col border-2 border-gray-100 p-2 first-line:rounded-lg">
          <div className="mb-2 flex items-center text-green-700">
            <Trophy
              size={40}
              className="rounded-full bg-green-50 p-2 text-green-700"
            />
            <div className="pl-1 font-bold"> sherwyn Team</div>
          </div>
          <div className="my-3 ">
            <div className="relative">
              <input
                type="text"
                onChange={handleOnChange}
                value={search2}
                name="team2"
                className="h-12 w-full rounded-lg border-2 border-gray-100"
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
              <button className="flex w-1/3 items-center justify-center bg-green-100 hover:bg-green-200">
                -
              </button>

              <span className="flex w-1/3 items-center justify-center font-semibold">
                0
              </span>

              <button className="flex w-1/3 items-center justify-center bg-green-100 hover:bg-green-200">
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
              <button className="flex w-1/3 items-center justify-center bg-green-100 hover:bg-green-200">
                -
              </button>

              <span className="flex w-1/3 items-center justify-center font-semibold">
                0
              </span>

              <button className="flex w-1/3 items-center justify-center bg-green-100 hover:bg-green-200">
                +
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="col-span-2 my-4 flex flex-grow items-center ">
        <div className="flex flex-grow flex-col rounded-lg border-2 border-gray-100 p-2">
          <div className="flex">
            <Calendar className="rounded-full bg-blue-300 p-1 text-blue-700 " />
            <p className="pl-1 font-bold"> Start Time</p>
          </div>
          <div className="text center text-sm text-gray-500">
            When did game start
          </div>
          <div className="flex justify-between rounded-xl border-2 border-gray-100 p-1">
            <div className="flex flex-col">
              <p>5/20/25</p>
              <p>07:30 PM</p>
            </div>
            <div className="flex flex-col justify-center">
              <Calendar className="h-4 " />
            </div>
          </div>
        </div>
        <MoveRight className="mx-1" />
        <div className="flex flex-grow flex-col rounded-lg border-2 border-gray-100 p-2">
          <div className="flex">
            <Calendar className="rounded-full bg-blue-300 p-1 text-blue-700 " />
            <p className="pl-1 font-bold"> End Time</p>
          </div>
          <div className="text center text-sm text-gray-500">
            When did game start
          </div>
          <div className="flex justify-between rounded-xl border-2 border-gray-100 p-1">
            <div className="flex flex-col">
              <p>5/20/25</p>
              <p>07:30 PM</p>
            </div>
            <div className="flex flex-col justify-center">
              <Calendar className="h-4 " />
            </div>
          </div>
        </div>
      </div>
      <div className="col-span-2 flex h-12 items-center justify-center  rounded-lg bg-blue-700 text-center text-white shadow-md">
        <Save /> <div className="px-2 font-bold"> Save Score Card</div>
      </div>
    </section>
  );
}
