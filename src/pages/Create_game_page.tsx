import GameForm from "../components/GameForm";
import { GameRow } from "../types/GameRow";
import { supabase } from "../Supbase-Client";

export default function CreateGamePage() {
  async function CreateGame(game: GameRow) {
    const { data, error } = await supabase
      .from("Games")
      .insert([game])
      .select();
    error ? alert(error) : alert("Game Created");
  }

  return (
    <section>
      <GameForm formAction={CreateGame} />
    </section>
  );
}
