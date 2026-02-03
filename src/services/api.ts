import axios, { AxiosError, AxiosInstance } from "axios";
import {
    MealDBCategoriesResponse,
    MealDBResponse,
    Recipe,
    RecipeCard,
    convertMealDBToRecipe,
    convertMealDBToRecipeCard,
} from "../types/recipe.types";

// Configuración base de Axios
const api: AxiosInstance = axios.create({
  baseURL: "https://www.themealdb.com/api/json/v1/1",
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

// ============================================
// FUNCIONES DE LA API
// ============================================

/**
 * Buscar recetas por nombre
 */
export const searchRecipes = async (query: string): Promise<RecipeCard[]> => {
  try {
    const response = await api.get<MealDBResponse>("/search.php", {
      params: { s: query },
    });

    if (!response.data.meals) {
      return [];
    }

    return response.data.meals.map(convertMealDBToRecipeCard);
  } catch (error) {
    handleApiError(error);
    return [];
  }
};

/**
 * Obtener receta por ID
 */
export const getRecipeById = async (id: string): Promise<Recipe | null> => {
  try {
    const response = await api.get<MealDBResponse>("/lookup.php", {
      params: { i: id },
    });

    if (!response.data.meals || response.data.meals.length === 0) {
      return null;
    }

    return convertMealDBToRecipe(response.data.meals[0]);
  } catch (error) {
    handleApiError(error);
    return null;
  }
};

/**
 * Obtener receta aleatoria
 */
export const getRandomRecipe = async (): Promise<Recipe | null> => {
  try {
    const response = await api.get<MealDBResponse>("/random.php");

    if (!response.data.meals || response.data.meals.length === 0) {
      return null;
    }

    return convertMealDBToRecipe(response.data.meals[0]);
  } catch (error) {
    handleApiError(error);
    return null;
  }
};

/**
 * Obtener múltiples recetas aleatorias
 */
export const getRandomRecipes = async (
  count: number = 10,
): Promise<RecipeCard[]> => {
  try {
    const promises = Array.from({ length: count }, () => getRandomRecipe());
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
  } catch (error) {
    handleApiError(error);
    return [];
  }
};

/**
 * Obtener todas las categorías
 */
export const getCategories = async (): Promise<string[]> => {
  try {
    const response = await api.get<MealDBCategoriesResponse>("/categories.php");
    return response.data.categories.map((cat) => cat.strCategory);
  } catch (error) {
    handleApiError(error);
    return [];
  }
};

/**
 * Filtrar recetas por categoría
 */
export const getRecipesByCategory = async (
  category: string,
): Promise<RecipeCard[]> => {
  try {
    const response = await api.get<MealDBResponse>("/filter.php", {
      params: { c: category },
    });

    if (!response.data.meals) {
      return [];
    }

    return response.data.meals.map((meal) => ({
      id: meal.idMeal,
      title: meal.strMeal,
      thumbnail: meal.strMealThumb,
      category: category,
      area: "",
    }));
  } catch (error) {
    handleApiError(error);
    return [];
  }
};

/**
 * Filtrar recetas por área/país
 */
export const getRecipesByArea = async (area: string): Promise<RecipeCard[]> => {
  try {
    const response = await api.get<MealDBResponse>("/filter.php", {
      params: { a: area },
    });

    if (!response.data.meals) {
      return [];
    }

    return response.data.meals.map((meal) => ({
      id: meal.idMeal,
      title: meal.strMeal,
      thumbnail: meal.strMealThumb,
      category: "",
      area: area,
    }));
  } catch (error) {
    handleApiError(error);
    return [];
  }
};

// ============================================
// MANEJO DE ERRORES
// ============================================

const handleApiError = (error: unknown): void => {
  if (axios.isAxiosError(error)) {
    const axiosError = error as AxiosError;

    if (axiosError.response) {
      // Error de respuesta del servidor
      console.error("API Error:", {
        status: axiosError.response.status,
        data: axiosError.response.data,
      });
    } else if (axiosError.request) {
      // No hubo respuesta
      console.error("Network Error: No response received");
    } else {
      // Error en la configuración
      console.error("Request Error:", axiosError.message);
    }
  } else {
    console.error("Unexpected Error:", error);
  }
};

// Exportar la instancia de axios por si se necesita
export default api;
