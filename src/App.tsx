import "./App.css";
import NewHome from "./components/Newhome";
import GameForm from "./components/GameForm";
import { Routes, Route } from "react-router-dom";
import Layout from "./components/layout";

function App() {
  return (
    <div className="flex min-h-screen flex-col">
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<NewHome />} />
          <Route path="/game/new" element={<GameForm />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
