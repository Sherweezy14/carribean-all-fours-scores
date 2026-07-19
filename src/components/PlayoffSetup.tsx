import { useEffect, useMemo, useState } from "react";
import { Trophy } from "lucide-react";

import { supabase } from "../Supbase-Client";
import {
  generatePlayoffBracket,
  type SeededTeam,
} from "../util/generatePlayoffBracket";

interface Team {
  id: number;
  name: string;
}

interface PlayoffSetupProps {
  onBracketCreated: () => Promise<void> | void;
}

const initialSeeds: Record<number, string> = {
  1: "",
  2: "",
  3: "",
  4: "",
  5: "",
  6: "",
  7: "",
  8: "",
};

export default function PlayoffSetup({ onBracketCreated }: PlayoffSetupProps) {
  const [teams, setTeams] = useState<Team[]>([]);
  const [selectedTeams, setSelectedTeams] =
    useState<Record<number, string>>(initialSeeds);

  const [loadingTeams, setLoadingTeams] = useState(true);
  const [generating, setGenerating] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    void loadTeams();
  }, []);

  const selectedTeamIds = useMemo(
    () => Object.values(selectedTeams).filter(Boolean).map(Number),
    [selectedTeams],
  );

  const allSeedsSelected = selectedTeamIds.length === 8;
  const hasDuplicateTeams =
    new Set(selectedTeamIds).size !== selectedTeamIds.length;

  async function loadTeams() {
    try {
      setLoadingTeams(true);
      setErrorMessage("");

      const { data, error } = await supabase
        .from("Teams")
        .select("id, name")
        .order("name", { ascending: true });

      if (error) {
        throw error;
      }

      setTeams(data ?? []);
    } catch (error) {
      setErrorMessage(
        error instanceof Error ? error.message : "Unable to load teams.",
      );
    } finally {
      setLoadingTeams(false);
    }
  }

  function handleTeamChange(seed: number, teamId: string) {
    setSelectedTeams((current) => ({
      ...current,
      [seed]: teamId,
    }));
  }

  function isTeamAlreadySelected(teamId: number, currentSeed: number) {
    return Object.entries(selectedTeams).some(
      ([seed, selectedId]) =>
        Number(seed) !== currentSeed && Number(selectedId) === teamId,
    );
  }

  async function handleGenerateBracket() {
    if (!allSeedsSelected) {
      setErrorMessage("Assign a team to all eight seeds.");
      return;
    }

    if (hasDuplicateTeams) {
      setErrorMessage("The same team cannot occupy more than one seed.");
      return;
    }

    const confirmed = window.confirm(
      "Generate the playoff bracket with these eight teams?",
    );

    if (!confirmed) {
      return;
    }

    try {
      setGenerating(true);
      setErrorMessage("");

      const seededTeams: SeededTeam[] = Object.entries(selectedTeams).map(
        ([seed, teamId]) => ({
          seed: Number(seed),
          teamId: Number(teamId),
        }),
      );

      await generatePlayoffBracket(seededTeams);
      await onBracketCreated();
    } catch (error) {
      setErrorMessage(
        error instanceof Error
          ? error.message
          : "Unable to generate the playoff bracket.",
      );
    } finally {
      setGenerating(false);
    }
  }

  if (loadingTeams) {
    return (
      <section className="rounded-xl border border-slate-200 bg-white p-8 text-center">
        <p className="text-sm text-slate-500">Loading teams...</p>
      </section>
    );
  }

  return (
    <section className="mx-auto max-w-3xl rounded-2xl border border-slate-200 bg-white p-5 shadow-sm md:p-8">
      <header className="mb-6 text-center">
        <div className="mx-auto mb-3 flex size-12 items-center justify-center rounded-full bg-red-700 text-white">
          <Trophy size={24} />
        </div>

        <h2 className="text-2xl font-black text-slate-900">
          Generate Playoff Bracket
        </h2>

        <p className="mt-1 text-sm text-slate-500">
          Manually assign one team to each seed.
        </p>
      </header>

      {errorMessage && (
        <p className="mb-5 rounded-lg border border-red-200 bg-red-50 p-3 text-sm text-red-700">
          {errorMessage}
        </p>
      )}

      <div className="grid gap-4 sm:grid-cols-2">
        {Array.from({ length: 8 }, (_, index) => {
          const seed = index + 1;

          return (
            <label
              key={seed}
              className="block rounded-xl border border-slate-200 bg-slate-50 p-4"
            >
              <span className="mb-2 block text-sm font-bold text-slate-700">
                Seed {seed}
              </span>

              <select
                value={selectedTeams[seed]}
                onChange={(event) => handleTeamChange(seed, event.target.value)}
                className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2.5 text-sm text-slate-900 outline-none focus:border-red-600 focus:ring-2 focus:ring-red-100"
              >
                <option value="">Select a team</option>

                {teams.map((team) => (
                  <option
                    key={team.id}
                    value={team.id}
                    disabled={isTeamAlreadySelected(team.id, seed)}
                  >
                    {team.name}
                  </option>
                ))}
              </select>
            </label>
          );
        })}
      </div>

      <div className="mt-6 rounded-xl bg-slate-100 p-4">
        <p className="mb-2 text-xs font-bold uppercase tracking-wide text-slate-500">
          First-round matchups
        </p>

        <div className="grid gap-2 text-sm font-semibold text-slate-700 sm:grid-cols-2">
          <p>Seed 1 vs Seed 8</p>
          <p>Seed 4 vs Seed 5</p>
          <p>Seed 3 vs Seed 6</p>
          <p>Seed 2 vs Seed 7</p>
        </div>
      </div>

      <button
        type="button"
        onClick={handleGenerateBracket}
        disabled={generating || !allSeedsSelected || hasDuplicateTeams}
        className="mt-6 w-full rounded-xl bg-red-700 px-5 py-3 font-bold text-white transition hover:bg-red-800 disabled:cursor-not-allowed disabled:opacity-50"
      >
        {generating ? "Generating Bracket..." : "Generate Playoff Bracket"}
      </button>
    </section>
  );
}
