import {
    MealDBCategoriesResponse,
    MealDBResponse,
    Recipe,
    RecipeCard,
    convertMealDBToRecipe,
    convertMealDBToRecipeCard,
} from "@/src/types";
import { apiClient } from "./client";

export const searchRecipes = async (query: string): Promise<RecipeCard[]> => {
  const { data } = await apiClient.get<MealDBResponse>("/search.php", {
    params: { s: query },
  });

  if (!data.meals) return [];
  return data.meals.map(convertMealDBToRecipeCard);
};

export const getRecipeById = async (id: string): Promise<Recipe | null> => {
  const { data } = await apiClient.get<MealDBResponse>("/lookup.php", {
    params: { i: id },
  });

  if (!data.meals || data.meals.length === 0) return null;
  return convertMealDBToRecipe(data.meals[0]);
};

export const getRandomRecipes = async (
  count: number = 10,
): Promise<RecipeCard[]> => {
  const promises = Array.from({ length: count }, async () => {
    const { data } = await apiClient.get<MealDBResponse>("/random.php");
    return data.meals?.[0] ? convertMealDBToRecipe(data.meals[0]) : null;
  });

  const results = await Promise.all(promises);

  return results
    .filter((recipe): recipe is Recipe => recipe !== null)
    .map((recipe) => ({
      id: recipe.id,
      title: recipe.title,
      thumbnail: recipe.thumbnail,
      category: recipe.category,
      area: recipe.area,
    }));
};

export const getCategories = async (): Promise<string[]> => {
  const { data } =
    await apiClient.get<MealDBCategoriesResponse>("/categories.php");
  return data.categories.map((cat) => cat.strCategory);
};

export const getRecipesByCategory = async (
  category: string,
): Promise<RecipeCard[]> => {
  const { data } = await apiClient.get<MealDBResponse>("/filter.php", {
    params: { c: category },
  });

  if (!data.meals) return [];

  return data.meals.map((meal) => ({
    id: meal.idMeal,
    title: meal.strMeal,
    thumbnail: meal.strMealThumb,
    category: category,
    area: "",
  }));
};
