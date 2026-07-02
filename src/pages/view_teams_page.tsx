import { Link } from "react-router-dom";
import { ChevronRight, Users } from "lucide-react";
import { useState, useEffect } from "react";
import { TeamRow } from "../types/TeamRow";
import { supabase } from "../Supbase-Client";
import { DivisionRow } from "../types/DivisionRow";

export default function ViewTeams() {
  const [teams, setTeams] = useState<TeamRow[]>([]);
  const [divisions, setDivisions] = useState<DivisionRow[]>([]);
  const divisionsById = getDivisionsById(divisions);

  async function getTeams() {
    const { data, error } = await supabase.from("Teams").select("*");
    return error ? error : setTeams(data);
  }

  async function getDivisions() {
    const { data, error } = await supabase.from("Divisions").select("*");
    return error ? error : setDivisions(data);
  }

  function getDivisionsById(divisions: DivisionRow[]) {
    const divisionsById = divisions.reduce(
      (acc: Record<number, DivisionRow>, division) => {
        acc[division.id] = division;
        return acc;
      },
      {},
    );
    return divisionsById;
  }

  useEffect(() => {
    getTeams();
    const res = getDivisions();
  }, []);

  if (divisions.length === 0 || teams.length === 0) {
    return <>loading ...</>;
  }

  return (
    <main className="bg-slate-100 px-4 py-8">
      <section className="mx-auto max-w-5xl rounded-3xl bg-white shadow">
        {/* Header */}

        <div className="border-b p-8">
          <div className="mb-2 flex items-center gap-3">
            <Users size={34} className="text-red-700" />

            <h1 className="font-display text-5xl text-[#071b3a]">Teams</h1>
          </div>

          <p className="text-slate-500">
            View every team competing in the Unity Sports Club Round Robin
            Tournament.
          </p>
        </div>

        {/* Column Headers */}

        <div className="grid grid-cols-12 border-b bg-slate-50 px-6 py-3 text-sm font-semibold uppercase tracking-wide text-slate-500">
          <div className="col-span-7">Team</div>

          <div className="col-span-4">Division</div>

          <div className="col-span-1"></div>
        </div>

        {/* Teams */}

        {teams.map((team) => (
          <Link
            key={team.id}
            to={`/teams/${team.id}`}
            className="grid grid-cols-12 items-center border-b px-6 py-5 transition hover:bg-slate-50"
          >
            <div className="col-span-7 flex items-center gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-red-700 text-lg font-bold text-white">
                {team.name.charAt(0)}
              </div>

              <div>
                <h2 className="text-xl font-bold text-[#071b3a]">
                  {team.name}
                </h2>
              </div>
            </div>

            <div className="col-span-4">
              <span className="rounded-full bg-blue-100 px-3 py-1 text-sm font-semibold text-blue-700">
                {divisionsById[team.division_id].name}
              </span>
            </div>

            <div className="col-span-1 flex justify-end">
              <ChevronRight size={24} className="text-slate-400" />
            </div>
          </Link>
        ))}
      </section>
    </main>
  );
}
