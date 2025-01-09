import { useNavigate, useParams } from "react-router";
import { Header } from "../../common/Header/Header";
import { useGame } from "./hooks/useGame";
import { PokemonListItem } from "../Pokemons/PokemonListItem";
import "./Game.scss";
import { Button } from "../../common/Button/Button";
import { GameEndModal } from "./modals/GameEndModal";
import getTime from "../../../helpers/getTime";
import { useRef, useEffect } from "react";
import { Link } from "react-router-dom";

export const Game = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const { game, pokemons, handleAttack, isMyTurn, attacker } = useGame(id);
  const isGameFinished = Object.values(game?.hp || {}).some((hp) => hp <= 0);

  const opponentRef = useRef(null);
  const pokemonRef = useRef(null);

  useEffect(() => {
    let timeout;

    if (String(attacker) === String(game?.opponentId) && pokemonRef.current) {
      pokemonRef.current.classList.add("attackingUp");
      timeout = setTimeout(() => {
        pokemonRef.current.classList.remove("attackingUp");
        if (opponentRef.current) {
          opponentRef.current.classList.add("hit");
          setTimeout(() => opponentRef.current.classList.remove("hit"), 500);
        }
      }, 1000);
    } else if (
      String(attacker) === String(game?.pokemonId) &&
      opponentRef.current
    ) {
      opponentRef.current.classList.add("attackingDown");
      timeout = setTimeout(() => {
        opponentRef.current.classList.remove("attackingDown");
        if (pokemonRef.current) {
          pokemonRef.current.classList.add("hit");
          setTimeout(() => pokemonRef.current.classList.remove("hit"), 500);
        }
      }, 1000);
    }

    return () => clearTimeout(timeout);
  }, [attacker, game?.pokemonId, game?.opponentId]);

  if (!game || !pokemons) {
    return null;
  }

  return (
    <>
      <div className="container">
        <Header title="Game" />
        <Link to="/pokemons">
          <Button text={"BACK TO POKEMONS LIST"} color="red" />
        </Link>
        <div className="game">
          <div className="game-logs">
            <h6>LOGS:</h6>
            {game.turns
              .slice()
              .reverse()
              .map((turn, index) => (
                <div key={index} className="game-logs__item">
                  <span>{getTime(new Date(turn.timestamp))}</span>
                  {pokemons?.[String(turn._id)]?.name?.english} dealt{" "}
                  {turn.damage > 0 ? `${turn.damage}` : "no"} damage
                </div>
              ))}
          </div>
          <div className="pokemons-container">
            <PokemonListItem
              pokemon={pokemons[game.opponentId]}
              currnetHP={game.hp[game.opponentId]}
              ref={opponentRef}
            />
            <h1>VS</h1>
            <PokemonListItem
              pokemon={pokemons[game.pokemonId]}
              currnetHP={game.hp[game.pokemonId]}
              ref={pokemonRef}
            />
          </div>
          <Button
            text={isMyTurn ? "ATTACK" : "OPPONENTS TURN"}
            disabled={!isMyTurn}
            onClick={handleAttack}
            className="attack-button"
          />
        </div>
      </div>
      <GameEndModal
        open={isGameFinished}
        onClose={() => navigate("/pokemons")}
        winner={
          (game?.hp?.[game?.pokemonId] || 0) > 0
            ? pokemons?.[game?.pokemonId]?.name?.english
            : pokemons?.[game?.opponentId]?.name?.english
        }
      />
    </>
  );
};
