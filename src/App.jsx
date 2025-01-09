import { Home } from "./components/screens/Home/Home";
import { HashRouter, Route, Routes } from "react-router-dom";
import { Pokemons } from "./components/screens/Pokemons/Pokemons";
import { Game } from "./components/screens/Game/Game";

function App() {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/pokemons" element={<Pokemons />} />
        <Route path="/game/:id" element={<Game />} />
      </Routes>
    </HashRouter>
  );
}

export default App;
