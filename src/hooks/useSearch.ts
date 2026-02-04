import { useEffect, useState } from "react";
import { useDebounce } from "./useDebounce";
import { useRecipes } from "./useRecipes";

export const useSearch = (delay: number = 500) => {
  const [query, setQuery] = useState("");
  const debouncedQuery = useDebounce(query, delay);
  const { fetchRecipes, isLoading } = useRecipes();

  useEffect(() => {
    if (debouncedQuery) {
      fetchRecipes(debouncedQuery);
    }
  }, [debouncedQuery]);

  return {
    query,
    setQuery,
    isSearching: isLoading,
  };
};
