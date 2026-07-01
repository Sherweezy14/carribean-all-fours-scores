import "./App.css";
import NewHome from "./components/Newhome";
import GameForm from "./components/GameForm";
import { Routes, Route } from "react-router-dom";
import Layout from "./components/layout";
import About from "./pages/AboutPage";
import Schedule from "./pages/schedulepage";
import ViewGame from "./pages/view_game_page";

function App() {
  return (
    <div className="flex min-h-screen flex-col">
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<NewHome />} />
          <Route path="/game/new" element={<GameForm />} />
          <Route path="/about" element={<About />} />
          <Route path="/schedule" element={<Schedule />} />
          <Route path="game/:id" element={<ViewGame />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
