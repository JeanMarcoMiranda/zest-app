import { MOCK_RECIPES } from "@/src/data/mockRecipes";
import {
  Recipe,
  RecipeCard,
  SpoonacularRecipe,
  SpoonacularSearchResponse,
  convertSpoonacularToRecipe,
  convertSpoonacularToRecipeCard,
} from "@/src/types";
import { apiClient } from "./client";

const getMockRecipeCards = (): RecipeCard[] => {
  return MOCK_RECIPES.map((recipe) => ({
    id: recipe.id,
    title: recipe.title,
    thumbnail: recipe.thumbnail,
    category: recipe.category,
    area: recipe.area,
  }));
};

export const searchRecipes = async (query: string): Promise<RecipeCard[]> => {
  try {
    const { data } = await apiClient.get<SpoonacularSearchResponse>(
      "/recipes/complexSearch",
      {
        params: {
          query: query,
          addRecipeInformation: true, // Para obtener imagen y otros detalles
          number: 10,
        },
      },
    );

    if (!data.results) return [];
    return data.results.map(convertSpoonacularToRecipeCard);
  } catch (error) {
    console.error("Error searching recipes (using mock data):", error);
    const lowerQuery = query.toLowerCase();
    return getMockRecipeCards().filter((recipe) =>
      recipe.title.toLowerCase().includes(lowerQuery),
    );
  }
};

export const getRecipeById = async (id: string): Promise<Recipe | null> => {
  try {
    const { data } = await apiClient.get<SpoonacularRecipe>(
      `/recipes/${id}/information`,
    );
    return convertSpoonacularToRecipe(data);
  } catch (error) {
    console.error("Error fetching recipe by ID (using mock data):", error);
    return MOCK_RECIPES.find((r) => r.id === id) || null;
  }
};

export const getRandomRecipes = async (
  count: number = 10,
): Promise<RecipeCard[]> => {
  try {
    const { data } = await apiClient.get<{ recipes: SpoonacularRecipe[] }>(
      "/recipes/random",
      {
        params: { number: count },
      },
    );

    if (!data.recipes) return [];
    return data.recipes.map(convertSpoonacularToRecipeCard);
  } catch (error) {
    console.error("Error fetching random recipes (using mock data):", error);
    return getMockRecipeCards();
  }
};

// Spoonacular no tiene un endpoint simple de "categorías" como MealDB.
// Devolvemos una lista estática de Cocinas/Tipos comunes para mantener la funcionalidad.
export const getCategories = async (): Promise<string[]> => {
  return [
    "Italian",
    "Mexican",
    "Chinese",
    "Japanese",
    "American",
    "French",
    "Indian",
    "Thai",
    "Mediterranean",
    "Greek",
    "Spanish",
    "Korean",
    "Vietnamese",
    "Middle Eastern",
    "Caribbean",
  ];
};

export const getRecipesByCategory = async (
  category: string,
): Promise<RecipeCard[]> => {
  try {
    const { data } = await apiClient.get<SpoonacularSearchResponse>(
      "/recipes/complexSearch",
      {
        params: {
          cuisine: category, // Asumimos que la categoría es una cocina
          addRecipeInformation: true,
          number: 10,
        },
      },
    );

    if (!data.results) return [];
    return data.results.map(convertSpoonacularToRecipeCard);
  } catch (error) {
    console.error(
      "Error fetching recipes by category (using mock data):",
      error,
    );
    return getMockRecipeCards().filter(
      (r) =>
        r.category.toLowerCase() === category.toLowerCase() ||
        r.area.toLowerCase() === category.toLowerCase(),
    );
  }
};
