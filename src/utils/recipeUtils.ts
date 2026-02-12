import { RecipeStep } from "@/src/types/recipe.types";

/**
 * Optimizes a list of recipe steps by merging short, related steps.
 *
 * Logic:
 * 1. Iterates through the steps.
 * 2. If the current step and the next step are both short enough (combined length < 180 chars),
 *    and the next step doesn't have a critical note that needs separation,
 *    they are merged into a single step.
 * 3. Ingredients and items are also merged.
 *
 * @param steps Raw list of steps
 * @returns Optimized list of steps
 */
export const optimizeSteps = (steps: RecipeStep[]): RecipeStep[] => {
  if (!steps || steps.length === 0) return [];

  const optimized: RecipeStep[] = [];
  let i = 0;

  while (i < steps.length) {
    const current = steps[i];
    const next = steps[i + 1];

    // Check if we can merge current with next
    if (next && canMerge(current, next)) {
      // Merge
      const mergedStep: RecipeStep = {
        number: optimized.length + 1, // Renumber
        instruction: `${current.instruction} ${next.instruction}`,
        // Merge notes if both exist, or take one
        note: current.note
          ? next.note
            ? `${current.note}. ${next.note}`
            : current.note
          : next.note,
        // Merge arrays efficiently
        ingredients: [
          ...(current.ingredients || []),
          ...(next.ingredients || []),
        ],
        equipment: [...(current.equipment || []), ...(next.equipment || [])],
      };

      // Dedup ingredients/equipment by name
      mergedStep.ingredients = dedupItems(mergedStep.ingredients);
      mergedStep.equipment = dedupItems(mergedStep.equipment);

      optimized.push(mergedStep);
      i += 2; // Skip next
    } else {
      // Just push current with renumbered index
      optimized.push({
        ...current,
        number: optimized.length + 1,
      });
      i++;
    }
  }

  // Renumbering pass just in case (though we did it above)
  return optimized.map((s, idx) => ({ ...s, number: idx + 1 }));
};

const canMerge = (current: RecipeStep, next: RecipeStep): boolean => {
  // 1. Length constraint
  const combinedLength =
    current.instruction.length + next.instruction.length + 1;
  const MAX_LENGTH = 180; // Visual limit for "Large Typography"

  if (combinedLength > MAX_LENGTH) return false;

  // 2. Note constraint: don't merge if next has a complex note
  // Simple notes line "Tip:..." might be mergeable, but let's be conservative
  if (next.note && next.note.length > 50) return false;

  return true;
};

// Helper to remove duplicates from ingredient/equipment arrays
const dedupItems = (items: { name: string; image: string }[] | undefined) => {
  if (!items) return [];
  const seen = new Set<string>();
  return items.filter((item) => {
    const duplicate = seen.has(item.name.toLowerCase());
    seen.add(item.name.toLowerCase());
    return !duplicate;
  });
};
