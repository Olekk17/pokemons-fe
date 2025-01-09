import { notification } from "antd";
import axios from "axios";
import { useEffect, useState } from "react";

export const usePokemons = (ids) => {
  const [pokemons, setPokemons] = useState(null);

  useEffect(() => {
    if (!ids?.length) {
      return;
    }

    const fetchPokemons = async () => {
      try {
        const response = await axios.post("/pokemons/getPokemonsByIds", {
          ids,
        });

        setPokemons(
          Object.fromEntries(
            response.data.map((pokemon) => [pokemon._id, pokemon])
          )
        );
      } catch {
        notification.error({
          message: "Error",
          description: "An error occurred while fetching pokemons",
        });
      }
    };

    fetchPokemons();
  }, [ids]);

  return { pokemons };
};
