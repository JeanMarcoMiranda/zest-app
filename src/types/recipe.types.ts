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

export interface SpoonacularIngredient {
  id: number;
  aisle: string;
  image: string;
  consistency: string;
  name: string;
  nameClean: string;
  original: string;
  originalName: string;
  amount: number;
  unit: string;
  meta: string[];
  measures: {
    us: { amount: number; unitShort: string; unitLong: string };
    metric: { amount: number; unitShort: string; unitLong: string };
  };
}

export interface SpoonacularInstructionStep {
  number: number;
  step: string;
  ingredients: {
    id: number;
    name: string;
    localizedName: string;
    image: string;
  }[];
  equipment: {
    id: number;
    name: string;
    localizedName: string;
    image: string;
  }[];
}

export interface SpoonacularInstruction {
  name: string;
  steps: SpoonacularInstructionStep[];
}

export interface SpoonacularRecipe {
  id: number;
  title: string;
  image: string;
  imageType: string;
  servings: number;
  readyInMinutes: number;
  license: string;
  sourceName: string;
  sourceUrl: string;
  spoonacularSourceUrl: string;
  healthScore: number;
  spoonacularScore: number;
  pricePerServing: number;
  analyzedInstructions: SpoonacularInstruction[];
  cheap: boolean;
  creditsText: string;
  cuisines: string[];
  dairyFree: boolean;
  diets: string[];
  gaps: string;
  glutenFree: boolean;
  instructions: string;
  ketogenic: boolean;
  lowFodmap: boolean;
  occasions: string[];
  sustainable: boolean;
  vegan: boolean;
  vegetarian: boolean;
  veryHealthy: boolean;
  veryPopular: boolean;
  whole30: boolean;
  weightWatcherSmartPoints: number;
  dishTypes: string[];
  extendedIngredients: SpoonacularIngredient[];
  summary: string;
  winePairing: any;
}

export interface SpoonacularSearchResponse {
  results: SpoonacularRecipe[];
  offset: number;
  number: number;
  totalResults: number;
}

export const convertSpoonacularToRecipe = (data: SpoonacularRecipe): Recipe => {
  return {
    id: data.id.toString(),
    title: data.title,
    category: data.dishTypes?.[0] || (data.cuisines?.[0] ?? "General"),
    area: data.cuisines?.[0] || "International",
    instructions:
      data.instructions || data.summary || "No instructions provided.",
    thumbnail: data.image,
    tags: [...(data.diets || []), ...(data.dishTypes || [])],
    youtube: "",
    ingredients:
      data.extendedIngredients?.map((ing) => ({
        name: ing.nameClean || ing.name,
        measure: `${ing.amount} ${ing.unit}`,
      })) || [],
    source: data.sourceUrl,
  };
};

export const convertSpoonacularToRecipeCard = (
  data: SpoonacularRecipe,
): RecipeCard => {
  return {
    id: data.id.toString(),
    title: data.title,
    thumbnail: data.image,
    category: data.dishTypes?.[0] || (data.cuisines?.[0] ?? "General"),
    area: data.cuisines?.[0] || "International",
  };
};
