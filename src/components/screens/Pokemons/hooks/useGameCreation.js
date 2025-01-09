import { notification } from "antd";
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router";

export const useGameCreation = () => {
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const createGame = async (pokemonId) => {
    try {
      setLoading(true);
      const response = await axios.post(`/game/create/${pokemonId}`);
      if (!response.data.error) {
        navigate(`/game/${response.data.id}`);
        notification.success({
          message: "Success",
          description: "Game created successfully",
        });
      } else {
        notification.error({
          message: "Error",
          description: response.data.error,
        });
      }
    } catch {
      notification.error({
        message: "Error",
        description: "Something went wrong creating a game",
      });
    } finally {
      setLoading(false);
    }
  };

  return { createGame, loading };
};
