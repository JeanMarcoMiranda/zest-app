export interface Ingredient {
  id: string | number;
  name: string;
  amount: number;
  unit: string;
  original?: string;
}

export interface NutritionInfo {
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  fiber?: number;
  sugar?: number;
}

export interface CookingStep {
  number: number;
  step: string;
  ingredients?: string[];
  equipment?: string[];
  length?: {
    number: number;
    unit: string;
  };
}

export interface Recipe {
  id: number;
  title: string;
  image: string;
  imageType?: string;
  servings: number;
  readyInMinutes: number;
  preparationMinutes?: number;
  cookingMinutes?: number;

  summary: string;
  instructions?: string;

  cuisines: string[];
  dishTypes: string[];
  diets: string[];
  occasions: string[];

  extendedIngredients: Ingredient[];
  analyzedInstructions: {
    name: string;
    steps: CookingStep[];
  }[];

  nutrition?: NutritionInfo;

  vegetarian: boolean;
  vegan: boolean;
  glutenFree: boolean;
  dairyFree: boolean;
  veryHealthy: boolean;
  cheap: boolean;
  veryPopular: boolean;
  sustainable: boolean;

  healthScore?: number;
  spoonacularScore?: number;
  pricePerServing?: number;

  creditsText?: string;
  sourceName?: string;
  sourceUrl?: string;
}

export interface RecipeCard {
  id: number;
  title: string;
  image: string;
  readyInMinutes: number;
  servings: number;
}

export interface FavoriteRecipe extends RecipeCard {
  savedAt: string;
}
