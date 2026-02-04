import { recipesApi } from "@/src/services";
import { Recipe, RecipeCard } from "@/src/types";
import { StateCreator } from "zustand";

export interface RecipesSlice {
  recipes: RecipeCard[];
  currentRecipe: Recipe | null;
  isLoading: boolean;
  error: string | null;

  // Actions
  fetchRecipes: (query?: string) => Promise<void>;
  fetchRecipeById: (id: string) => Promise<void>;
  fetchRandomRecipes: (count?: number) => Promise<void>;
  clearError: () => void;
}

export const createRecipesSlice: StateCreator<RecipesSlice> = (set) => ({
  recipes: [],
  currentRecipe: null,
  isLoading: false,
  error: null,

  fetchRecipes: async (query = "") => {
    set({ isLoading: true, error: null });
    try {
      const recipes = await recipesApi.searchRecipes(query);
      set({ recipes, isLoading: false });
    } catch (error) {
      set({
        error: error instanceof Error ? error.message : "Error desconocido",
        isLoading: false,
      });
    }
  },

  fetchRecipeById: async (id: string) => {
    set({ isLoading: true, error: null });
    try {
      const recipe = await recipesApi.getRecipeById(id);
      set({ currentRecipe: recipe, isLoading: false });
    } catch (error) {
      set({
        error: error instanceof Error ? error.message : "Error desconocido",
        isLoading: false,
      });
    }
  },

  fetchRandomRecipes: async (count = 10) => {
    set({ isLoading: true, error: null });
    try {
      const recipes = await recipesApi.getRandomRecipes(count);
      set({ recipes, isLoading: false });
    } catch (error) {
      set({
        error: error instanceof Error ? error.message : "Error desconocido",
        isLoading: false,
      });
    }
  },

  clearError: () => set({ error: null }),
});
