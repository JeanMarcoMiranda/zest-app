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
  const recipes: RecipeCard[] = [];
  const maxRetries = 2;

  // Hacer peticiones secuenciales para evitar sobrecargar la red
  for (let i = 0; i < count; i++) {
    let retries = 0;
    let success = false;

    while (retries < maxRetries && !success) {
      try {
        const { data } = await apiClient.get<MealDBResponse>("/random.php");

        if (data.meals?.[0]) {
          const recipe = convertMealDBToRecipe(data.meals[0]);
          recipes.push({
            id: recipe.id,
            title: recipe.title,
            thumbnail: recipe.thumbnail,
            category: recipe.category,
            area: recipe.area,
          });
          success = true;
        }

        // Pequeño delay entre peticiones para no sobrecargar
        if (i < count - 1) {
          await new Promise((resolve) => setTimeout(resolve, 100));
        }
      } catch (error) {
        retries++;
        if (retries < maxRetries) {
          console.log(`Retry ${retries} for recipe ${i + 1}`);
          await new Promise((resolve) => setTimeout(resolve, 500));
        } else {
          console.error(
            `Failed to fetch recipe ${i + 1} after ${maxRetries} retries`,
          );
        }
      }
    }
  }

  return recipes;
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
