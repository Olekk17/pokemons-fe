import { LoadingOutlined } from "@ant-design/icons";
import { Header } from "../../common/Header/Header";
import { usePokemons } from "./hooks/usePokemons";
import { Pagination } from "../../common/Pagination/Pagination";
import { PokemonDetailsModal } from "./modals/PokemonDetailsModal";
import { useState } from "react";
import { PokemonListItem } from "./PokemonListItem";
import "./Pokemons.scss";

export const Pokemons = () => {
  const info = usePokemons();
  const [selectedPokemon, setSelectedPokemon] = useState(null); // for modal

  return (
    <>
      <div className="pokemons container">
        <Header title="Pokemons" />

        <div className="pagination-container">
          <Pagination {...info} />
        </div>
        <div className="pokemons-list">
          {!info.pokemons.length && info.loading && <LoadingOutlined />}
          {info.pokemons.map((pokemon) => (
            <PokemonListItem
              pokemon={pokemon}
              key={pokemon._id}
              setSelectedPokemon={setSelectedPokemon}
            />
          ))}
        </div>
      </div>
      <PokemonDetailsModal
        pokemon={selectedPokemon}
        onClose={() => setSelectedPokemon(null)}
      />
    </>
  );
};
