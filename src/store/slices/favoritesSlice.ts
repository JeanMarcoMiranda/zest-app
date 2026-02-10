import { favoritesStorage } from "@/src/services/storage";
import { FavoriteRecipe, RecipeCard } from "@/src/types";
import { StateCreator } from "zustand";
export interface FavoritesSlice {
  favorites: FavoriteRecipe[];

  // Actions
  loadFavorites: () => Promise<void>;
  addFavorite: (recipe: RecipeCard) => Promise<void>;
  removeFavorite: (id: string) => Promise<void>;
  isFavorite: (id: string) => boolean;
  clearFavorites: () => Promise<void>;
}
export const createFavoritesSlice: StateCreator<FavoritesSlice> = (
  set,
  get,
) => ({
  favorites: [],

  loadFavorites: async () => {
    const favorites = await favoritesStorage.getFavorites();
    set({ favorites });
  },

  addFavorite: async (recipe: RecipeCard) => {
    const favorite: FavoriteRecipe = {
      ...recipe,
      savedAt: new Date().toISOString(),
    };

    const newFavorites = [...get().favorites, favorite];
    await favoritesStorage.saveFavorites(newFavorites);
    set({ favorites: newFavorites });
  },

  removeFavorite: async (id: string) => {
    const newFavorites = get().favorites.filter((f) => f.id !== id);
    await favoritesStorage.saveFavorites(newFavorites);
    set({ favorites: newFavorites });
  },

  isFavorite: (id: string) => {
    return get().favorites.some((f) => f.id === id);
  },

  clearFavorites: async () => {
    await favoritesStorage.clearFavorites();
    set({ favorites: [] });
  },
});
