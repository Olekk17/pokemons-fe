import { useEffect, useState } from "react";
import { useServerSidePagination } from "../../../../helpers/hooks/useServerSidePagination";
import axios from "axios";
import { notification } from "antd";

const LIMIT = 6;

export const usePokemons = () => {
  const { handleNextPage, handlePrevPage, page } = useServerSidePagination();
  const [pokemons, setPokemons] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [hasNextPage, setHasNextPage] = useState(false);
  const hasPrevPage = page > 1;

  useEffect(() => {
    const fetch = async () => {
      try {
        setIsLoading(true);
        const data = await axios.get(`/pokemons?page=${page}&limit=${LIMIT}`);
        setPokemons(data.data.data);
        setHasNextPage(data.data.hasNextPage);
      } catch (e) {
        console.error("Error during fetching pokemons:", e);
        notification.error({
          message: "Error",
          description: "An error occurred during fetching pokemons",
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetch();
  }, [page]);

  return {
    pokemons,
    isLoading,
    handleNextPage,
    handlePrevPage,
    hasPrevPage,
    hasNextPage,
    page,
  };
};
