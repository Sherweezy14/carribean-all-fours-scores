import GameForm from "../components/GameForm";
import { useEffect, useState } from "react";
import { supabase } from "../Supbase-Client";
import { GameRow } from "../types/GameRow";
import { useParams } from "react-router-dom";
export default function EditGamePage() {
  const [game, setGame] = useState<GameRow | null>(null);
  const { id } = useParams();

  async function getGame() {
    const { data, error } = await supabase
      .from("Games")
      .select("*")
      .eq("id", id)
      .single();
    return error ? error : setGame(data);
  }

  async function updateGame(game: GameRow) {
    const { error } = await supabase.from("Games").update(game).eq("id", id);
    error ? alert(error) : alert("Game Updated");
  }

  useEffect(() => {
    getGame();
  }, [id]);

  if (!game) {
    return <p>Loading...</p>;
  }

  return (
    <section>
      <GameForm initialValues={game} formAction={updateGame} />
    </section>
  );
}
