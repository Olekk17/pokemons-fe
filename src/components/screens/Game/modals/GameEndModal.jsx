import { Modal } from "antd";
import PropTypes from "prop-types";
import { Button } from "../../../common/Button/Button";

export const GameEndModal = ({ open, onClose, winner }) => (
  <Modal open={open} title="Game Over" footer={null} centered>
    <h1>{winner} WON!</h1>
    <Button onClick={onClose} text="GO BACK TO THE POKEMONS LIST" />
  </Modal>
);

GameEndModal.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  winner: PropTypes.string.isRequired,
};
