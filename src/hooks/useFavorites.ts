import { useStore } from "@/src/store";
import { useCallback, useEffect, useState } from "react";
import { RecipeCard } from "../types/recipe.types";

export interface FavoriteRecipe extends RecipeCard {
  savedAt: string;
}

export const useFavorites = () => {
  const favorites = useStore((state) => state.favorites);
  const loadFavorites = useStore((state) => state.loadFavorites);
  const addFavorite = useStore((state) => state.addFavorite);
  const removeFavorite = useStore((state) => state.removeFavorite);
  const storeIsFavorite = useStore((state) => state.isFavorite);
  const clearFavoritesAction = useStore((state) => state.clearFavorites);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const init = async () => {
      await loadFavorites();
      setLoading(false);
    };
    init();
  }, [loadFavorites]);

  const isFavorite = useCallback(
    (recipeId: string): boolean => {
      return storeIsFavorite(recipeId);
    },
    [storeIsFavorite],
  );

  const toggleFavorite = useCallback(
    async (recipe: RecipeCard) => {
      if (isFavorite(recipe.id)) {
        await removeFavorite(recipe.id);
      } else {
        await addFavorite(recipe);
      }
    },
    [isFavorite, addFavorite, removeFavorite],
  );

  return {
    favorites,
    loading,
    isFavorite,
    addFavorite,
    removeFavorite,
    toggleFavorite,
    clearAllFavorites: clearFavoritesAction,
  };
};
