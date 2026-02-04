import { create } from "zustand";
import { createFavoritesSlice, FavoritesSlice } from "./slices/favoritesSlice";
import { createRecipesSlice, RecipesSlice } from "./slices/recipesSlice";
type StoreState = RecipesSlice & FavoritesSlice;
export const useStore = create<StoreState>()((...a) => ({
  ...createRecipesSlice(...a),
  ...createFavoritesSlice(...a),
}));
