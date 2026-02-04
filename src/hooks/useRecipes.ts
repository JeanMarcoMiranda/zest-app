import { useStore } from "@/src/store";

export const useRecipes = () => {
  const recipes = useStore((state) => state.recipes);
  const currentRecipe = useStore((state) => state.currentRecipe);
  const isLoading = useStore((state) => state.isLoading);
  const error = useStore((state) => state.error);

  const fetchRecipes = useStore((state) => state.fetchRecipes);
  const fetchRecipeById = useStore((state) => state.fetchRecipeById);
  const fetchRandomRecipes = useStore((state) => state.fetchRandomRecipes);
  const clearError = useStore((state) => state.clearError);

  return {
    recipes,
    currentRecipe,
    isLoading,
    error,
    fetchRecipes,
    fetchRecipeById,
    fetchRandomRecipes,
    clearError,
  };
};
