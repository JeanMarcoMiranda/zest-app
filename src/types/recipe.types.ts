import { optimizeSteps } from "../utils/recipeUtils";
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

export interface RecipeStep {
  number: number;
  instruction: string;
  note?: string;
  ingredients?: { name: string; image: string }[];
  equipment?: { name: string; image: string }[];
}

export interface Recipe {
  id: string;
  title: string;
  category: string;
  area: string;
  instructions: string;
  steps: RecipeStep[]; // Pasos estructurados y enriquecidos
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
// SPOONACULAR TYPES
// ============================================

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

  const rawSteps = meal.strInstructions
    .split(/\r\n|\n|\r/)
    .filter((step) => step.trim().length > 0);

  const steps: RecipeStep[] = rawSteps.map((text, index) => ({
    number: index + 1,
    instruction: text.trim(),
  }));

  return {
    id: meal.idMeal,
    title: meal.strMeal,
    category: meal.strCategory,
    area: meal.strArea,
    instructions: meal.strInstructions,
    steps: steps,
    thumbnail: meal.strMealThumb,
    tags: meal.strTags ? meal.strTags.split(",").map((tag) => tag.trim()) : [],
    youtube: meal.strYoutube,
    ingredients,
    source: meal.strSource,
  };
};

export const convertSpoonacularToRecipe = (data: SpoonacularRecipe): Recipe => {
  let steps: RecipeStep[] = [];

  if (data.analyzedInstructions && data.analyzedInstructions.length > 0) {
    let stepCounter = 1;

    // Aplanar todas las secciones de instrucciones
    data.analyzedInstructions.forEach((instructionSection) => {
      instructionSection.steps.forEach((s) => {
        // Lógica para extraer notas (heurística básica)
        let text = s.step;
        let note: string | undefined = undefined;

        // Detectar notas al final entre paréntesis si son cortas?
        // O detectar "Note:" al principio
        const noteMatch = text.match(/^(?:Note|Tip|Nota|Consejo):\s*(.*)/i);
        if (noteMatch) {
          // Si el paso es SOLO una nota, lo tratamos como tal (instruction vacía o especial?)
          // O mejor, lo separamos. Pero aqui asumimos que una nota puede ser un "paso" en sí mismo
          // o un adjunto. El usuario quiere separarlo.
          // Si empieza con Note:, lo ponemos en el campo nota y dejamos instruction vacía?
          // StepItem tendrá que manejar esto.
          note = noteMatch[1];
          text = ""; // El texto principal se vacía porque todo es nota
        } else {
          // Buscar nota al final "Do this. (Note: be careful)"
          // Regex simple para capturar (Note: ...) al final
          const noteSuffixMatch = text.match(
            /(.*)\s*\((?:Note|Tip|Nota|Consejo):\s*(.*)\)$/i,
          );
          if (noteSuffixMatch) {
            text = noteSuffixMatch[1];
            note = noteSuffixMatch[2];
          }
        }

        // Dividir pasos muy largos si no son notas
        if (text.length > 250 && !note) {
          const subSteps = text
            .split(". ")
            .filter((sub) => sub.trim().length > 0);
          subSteps.forEach((subStepText, subIndex) => {
            steps.push({
              number: stepCounter++,
              instruction:
                subStepText +
                (subIndex < subSteps.length - 1 && !subStepText.endsWith(".")
                  ? "."
                  : ""),
              ingredients:
                subIndex === 0
                  ? s.ingredients.map((i) => ({
                      name: i.localizedName || i.name,
                      image: i.image,
                    }))
                  : [], // Solo en el primero
              equipment:
                subIndex === 0
                  ? s.equipment.map((e) => ({
                      name: e.localizedName || e.name,
                      image: e.image,
                    }))
                  : [],
            });
          });
        } else {
          // Caso normal
          if (text.length > 0 || note) {
            steps.push({
              number: stepCounter++,
              instruction: text,
              note: note,
              ingredients: s.ingredients?.map((i) => ({
                name: i.localizedName || i.name,
                image: i.image,
              })),
              equipment: s.equipment?.map((i) => ({
                name: i.localizedName || i.name,
                image: i.image,
              })),
            });
          }
        }
      });
    });
  } else if (data.instructions) {
    // Fallback HTML clean
    const rawText = data.instructions.replace(/<[^>]*>?/gm, "");
    const rawSteps = rawText
      .split(/\r\n|\n|\r/)
      .filter((s) => s.trim().length > 0);
    steps = rawSteps.map((text, index) => ({
      number: index + 1,
      instruction: text.trim(),
    }));
  }

  // Fallback summary
  if (steps.length === 0 && data.summary) {
    steps = [
      {
        number: 1,
        instruction: data.summary.replace(/<[^>]*>?/gm, ""),
      },
    ];
  }

  return {
    id: data.id.toString(),
    title: data.title,
    category: data.dishTypes?.[0] || (data.cuisines?.[0] ?? "General"),
    area: data.cuisines?.[0] || "International",
    instructions: (
      data.instructions ||
      data.summary ||
      "No instructions provided."
    ).replace(/<[^>]*>?/gm, ""),
    steps: optimizeSteps(steps),
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

export const convertMealDBToRecipeCard = (meal: MealDBRecipe): RecipeCard => {
  return {
    id: meal.idMeal,
    title: meal.strMeal,
    thumbnail: meal.strMealThumb,
    category: meal.strCategory,
    area: meal.strArea,
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
