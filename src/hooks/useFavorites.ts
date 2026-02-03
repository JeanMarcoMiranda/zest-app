import AsyncStorage from "@react-native-async-storage/async-storage";
import { useCallback, useEffect, useState } from "react";
import { RecipeCard } from "../types/recipe.types";

const FAVORITES_KEY = "@chefhub_favorites";

export interface FavoriteRecipe extends RecipeCard {
  savedAt: string;
}

export const useFavorites = () => {
  const [favorites, setFavorites] = useState<FavoriteRecipe[]>([]);
  const [loading, setLoading] = useState(true);

  // Cargar favoritos al iniciar
  useEffect(() => {
    loadFavorites();
  }, []);

  const loadFavorites = async () => {
    try {
      const favoritesJson = await AsyncStorage.getItem(FAVORITES_KEY);
      if (favoritesJson) {
        const parsedFavorites = JSON.parse(favoritesJson);
        setFavorites(parsedFavorites);
      }
    } catch (error) {
      console.error("Error loading favorites:", error);
    } finally {
      setLoading(false);
    }
  };

  const saveFavorites = async (newFavorites: FavoriteRecipe[]) => {
    try {
      await AsyncStorage.setItem(FAVORITES_KEY, JSON.stringify(newFavorites));
      setFavorites(newFavorites);
    } catch (error) {
      console.error("Error saving favorites:", error);
    }
  };

  const isFavorite = useCallback(
    (recipeId: string): boolean => {
      return favorites.some((fav) => fav.id === recipeId);
    },
    [favorites],
  );

  const addFavorite = useCallback(
    async (recipe: RecipeCard) => {
      const newFavorite: FavoriteRecipe = {
        ...recipe,
        savedAt: new Date().toISOString(),
      };
      const newFavorites = [...favorites, newFavorite];
      await saveFavorites(newFavorites);
    },
    [favorites],
  );

  const removeFavorite = useCallback(
    async (recipeId: string) => {
      const newFavorites = favorites.filter((fav) => fav.id !== recipeId);
      await saveFavorites(newFavorites);
    },
    [favorites],
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

  const clearAllFavorites = useCallback(async () => {
    try {
      await AsyncStorage.removeItem(FAVORITES_KEY);
      setFavorites([]);
    } catch (error) {
      console.error("Error clearing favorites:", error);
    }
  }, []);

  return {
    favorites,
    loading,
    isFavorite,
    addFavorite,
    removeFavorite,
    toggleFavorite,
    clearAllFavorites,
  };
};
