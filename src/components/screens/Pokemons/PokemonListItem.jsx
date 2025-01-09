import PropTypes from "prop-types";
import { forwardRef } from "react";

const PokemonListItem = forwardRef(
  ({ pokemon, setSelectedPokemon, currnetHP }, ref) => (
    <div
      className="pokemon"
      onClick={() => setSelectedPokemon && setSelectedPokemon(pokemon)}
      ref={ref}
    >
      <img src={pokemon.image.hires} alt={pokemon.name.english} />
      <h3>{pokemon.name.english}</h3>
      <div className="stats">
        <span>
          <b>ATTACK:</b> {pokemon?.base?.Attack}
        </span>
        <span>
          <b>DEFENSE:</b> {pokemon?.base?.Defense}
        </span>
        <span>
          <b>SPEED:</b> {pokemon?.base?.Speed}
        </span>
      </div>
      {currnetHP && (
        <span
          className={`HP${currnetHP === pokemon?.base?.HP ? " HP--full" : ""}`}
        >
          {currnetHP}
        </span>
      )}
    </div>
  )
);

PokemonListItem.displayName = "Pokemon";

export { PokemonListItem };

PokemonListItem.propTypes = {
  pokemon: PropTypes.shape({
    id: PropTypes.number.isRequired,
    image: PropTypes.shape({
      hires: PropTypes.string.isRequired,
    }).isRequired,
    name: PropTypes.shape({
      english: PropTypes.string.isRequired,
    }).isRequired,
    base: PropTypes.shape({
      HP: PropTypes.number.isRequired,
      Attack: PropTypes.number.isRequired,
      Defense: PropTypes.number.isRequired,
      Speed: PropTypes.number.isRequired,
    }).isRequired,
  }).isRequired,
  setSelectedPokemon: PropTypes.func,
  currnetHP: PropTypes.number,
};
