import axios from "axios";
import { useState, useEffect } from "react";

export const useOngoingGame = () => {
  const [game, setGame] = useState(null);

  useEffect(() => {
    (async () => {
      try {
        const game = await axios.get("/game/ongoingGame");

        if (game) {
          console.log("game", game.data);
          setGame(game.data);
        }
      } catch {
        console.log("No ongoing game");
      }
    })();
  }, []);

  return { id: game?.id };
};
