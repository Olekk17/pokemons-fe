import { Modal } from "antd";
import PropTypes from "prop-types";
import "./PokemonDetailsModal.scss";
import { Button } from "../../../common/Button/Button";
import { useGameCreation } from "../hooks/useGameCreation";

export const PokemonDetailsModal = ({ pokemon, onClose }) => {
  const { createGame, loading } = useGameCreation();

  return (
    <Modal
      open={!!pokemon}
      onCancel={onClose}
      title={pokemon?.name?.english}
      footer={null}
      centered
      className="pokemon-details-modal"
    >
      <img src={pokemon?.image?.hires} alt={pokemon?.name?.english} />
      <div className="stats">
        <section>
          <span>STATS:</span>
          <span>HP: {pokemon?.base?.HP}</span>
          <span>Attack: {pokemon?.base?.Attack}</span>
          <span>Defense: {pokemon?.base?.Defense}</span>
          <span>Sp. Attack: {pokemon?.base?.["Sp. Attack"]}</span>
          <span>Sp. Defense: {pokemon?.base?.["Sp. Defense"]}</span>
          <span>Speed: {pokemon?.base?.Speed}</span>
        </section>
        <section>
          <span>Height: {pokemon?.profile?.height}</span>
          <span>Weight: {pokemon?.profile?.weight}</span>
          <span>Type: {pokemon?.type?.join(", ")}</span>
          <span>
            Abilities:{" "}
            {pokemon?.profile?.ability
              ?.filter(([, available]) => available === "true")
              .map(([ability]) => ability)
              .join(", ")}
          </span>
        </section>

        <section>
          <span>DESCRIPTION:</span>
          <span>{pokemon?.description}</span>
        </section>
      </div>
      <Button
        color="blue"
        text="PLAY!"
        onClick={() => createGame(pokemon?._id)}
        loading={loading}
      />
    </Modal>
  );
};

PokemonDetailsModal.propTypes = {
  pokemon: PropTypes.oneOfType([PropTypes.object, PropTypes.oneOf([null])]),
  onClose: PropTypes.func,
};
