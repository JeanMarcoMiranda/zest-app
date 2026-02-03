export interface MealDBRecipe {
  idMeal: string;
  strMeal: string;
  strDrinkAlternate: string | null;
  strCategory: string;
  strArea: string;
  strInstructions: string;
  strMealThumb: string;
  strTags: string | null;
  strYoutube: string;

  // Ingredientes (hasta 20)
  strIngredient1: string;
  strIngredient2: string;
  strIngredient3: string;
  strIngredient4: string;
  strIngredient5: string;
  strIngredient6: string;
  strIngredient7: string;
  strIngredient8: string;
  strIngredient9: string;
  strIngredient10: string;
  strIngredient11: string;
  strIngredient12: string;
  strIngredient13: string;
  strIngredient14: string;
  strIngredient15: string;
  strIngredient16: string;
  strIngredient17: string;
  strIngredient18: string;
  strIngredient19: string;
  strIngredient20: string;

  // Medidas (hasta 20)
  strMeasure1: string;
  strMeasure2: string;
  strMeasure3: string;
  strMeasure4: string;
  strMeasure5: string;
  strMeasure6: string;
  strMeasure7: string;
  strMeasure8: string;
  strMeasure9: string;
  strMeasure10: string;
  strMeasure11: string;
  strMeasure12: string;
  strMeasure13: string;
  strMeasure14: string;
  strMeasure15: string;
  strMeasure16: string;
  strMeasure17: string;
  strMeasure18: string;
  strMeasure19: string;
  strMeasure20: string;

  strSource: string;
  strImageSource: string | null;
  strCreativeCommonsConfirmed: string | null;
  dateModified: string | null;
}

export interface MealDBResponse {
  meals: MealDBRecipe[] | null;
}

export interface MealDBCategory {
  idCategory: string;
  strCategory: string;
  strCategoryThumb: string;
  strCategoryDescription: string;
}

export interface MealDBCategoriesResponse {
  categories: MealDBCategory[];
}

// ============================================
// TIPOS NORMALIZADOS PARA NUESTRA APP
// ============================================

export interface Ingredient {
  name: string;
  measure: string;
}

export interface Recipe {
  id: string;
  title: string;
  category: string;
  area: string;
  instructions: string;
  thumbnail: string;
  tags: string[];
  youtube: string;
  ingredients: Ingredient[];
  source?: string;
}

export interface RecipeCard {
  id: string;
  title: string;
  thumbnail: string;
  category: string;
  area: string;
}

export interface FavoriteRecipe extends RecipeCard {
  savedAt: string;
}

// ============================================
// FUNCIONES HELPER PARA CONVERTIR DATOS
// ============================================

export const convertMealDBToRecipe = (meal: MealDBRecipe): Recipe => {
  // Extraer ingredientes y medidas
  const ingredients: Ingredient[] = [];

  for (let i = 1; i <= 20; i++) {
    const ingredient = meal[`strIngredient${i}` as keyof MealDBRecipe];
    const measure = meal[`strMeasure${i}` as keyof MealDBRecipe];

    if (ingredient && ingredient.trim() !== "") {
      ingredients.push({
        name: ingredient.trim(),
        measure: measure?.trim() || "",
      });
    }
  }

  return {
    id: meal.idMeal,
    title: meal.strMeal,
    category: meal.strCategory,
    area: meal.strArea,
    instructions: meal.strInstructions,
    thumbnail: meal.strMealThumb,
    tags: meal.strTags ? meal.strTags.split(",").map((tag) => tag.trim()) : [],
    youtube: meal.strYoutube,
    ingredients,
    source: meal.strSource,
  };
};

export const convertMealDBToRecipeCard = (meal: MealDBRecipe): RecipeCard => {
  return {
    id: meal.idMeal,
    title: meal.strMeal,
    thumbnail: meal.strMealThumb,
    category: meal.strCategory,
    area: meal.strArea,
  };
};
