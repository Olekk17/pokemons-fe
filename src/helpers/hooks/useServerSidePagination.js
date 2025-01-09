import { useState } from "react";

export const useServerSidePagination = () => {
  const [page, setPage] = useState(1);

  const handleNextPage = () => {
    setPage((prev) => prev + 1);
  };

  const handlePrevPage = () => {
    setPage((prev) => prev - 1);
  };

  return { page, handleNextPage, handlePrevPage, setPage };
};
