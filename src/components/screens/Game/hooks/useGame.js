import { useCallback, useEffect, useState, useRef, useMemo } from "react";
import socketIOClient from "socket.io-client";
import { usePokemons } from "./usePokemons";
import { getToken } from "../../../../helpers/token";
import { notification } from "antd";

export const useGame = (id) => {
  const [game, setGame] = useState(null);

  const [attacker, setAttacker] = useState(null);

  const ids = useMemo(
    () => (game?.pokemonId ? [game.pokemonId, game.opponentId] : []),
    [game?.pokemonId, game?.opponentId]
  );
  const { pokemons } = usePokemons(ids);
  const socketRef = useRef(null);

  const isMyTurn = useMemo(
    () => game?.currentTurn === game?.pokemonId,
    [game?.currentTurn, game?.pokemonId]
  );

  const handleInitialGameData = useCallback((data) => setGame(data), []);

  const handleUpdateData = useCallback((data) => {
    setAttacker(data.currentTurn);

    setTimeout(() => {
      setGame((prev) => {
        if (!prev) {
          return prev;
        }

        return {
          ...prev,
          turns: [...prev.turns, data.lastEvent],
          hp: data.hp,
          currentTurn: data.currentTurn,
        };
      });
      setAttacker(null);
    }, 2000);
  }, []);

  const handleAttack = useCallback(() => {
    socketRef.current.emit("game_attack", { id });
  }, [id]);

  useEffect(() => {
    const token = getToken();
    if (!token) {
      notification.error({
        message: "Unauthorized",
        description: "You need to login to access this page",
      });
      return;
    }
    socketRef.current = socketIOClient(import.meta.env.VITE_API_URL);
    socketRef.current.on("initial_game_data", handleInitialGameData);
    socketRef.current.on("game_update", handleUpdateData);

    if (id) {
      socketRef.current.emit("game_join", { id, token });
      return () => {
        if (socketRef.current) {
          console.log("leaving the game", id);
          socketRef.current.off("initial_game_data", handleInitialGameData);
          socketRef.current.off("game_update", handleUpdateData);
          socketRef.current.emit("game_leave", { id });
        }
      };
    }

    return () => {
      socketRef.current.off("initial_game_data", handleInitialGameData);
    };
  }, [id, handleInitialGameData, handleUpdateData]);

  useEffect(() => {
    return () => {
      if (socketRef.current) {
        socketRef.current.disconnect();
      }
    };
  }, []);

  return { game, pokemons, handleAttack, isMyTurn, attacker };
};
