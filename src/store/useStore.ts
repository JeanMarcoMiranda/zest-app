import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { createFavoritesSlice, FavoritesSlice } from "./slices/favoritesSlice";
import { createRecipesSlice, RecipesSlice } from "./slices/recipesSlice";
import { createThemeSlice, ThemeSlice } from "./slices/themeSlice";

type StoreState = RecipesSlice & FavoritesSlice & ThemeSlice;

export const useStore = create<StoreState>()(
  persist(
    (...a) => ({
      ...createRecipesSlice(...a),
      ...createFavoritesSlice(...a),
      ...createThemeSlice(...a),
    }),
    {
      name: "chefhub-storage",
      storage: createJSONStorage(() => AsyncStorage),
      partialize: (state) => ({
        // Solo persistimos el tema y favoritos por ahora
        themeMode: state.themeMode,
        favorites: state.favorites,
      }),
    },
  ),
);
