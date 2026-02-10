import { FavoriteRecipe } from "@/src/types";
import AsyncStorage from "@react-native-async-storage/async-storage";

const FAVORITES_KEY = "@zest:favorites";

export const getFavorites = async (): Promise<FavoriteRecipe[]> => {
  try {
    const data = await AsyncStorage.getItem(FAVORITES_KEY);
    return data ? JSON.parse(data) : [];
  } catch (error) {
    console.error("Error loading favorites:", error);
    return [];
  }
};

export const saveFavorites = async (
  favorites: FavoriteRecipe[],
): Promise<void> => {
  try {
    await AsyncStorage.setItem(FAVORITES_KEY, JSON.stringify(favorites));
  } catch (error) {
    console.error("Error saving favorites:", error);
    throw error;
  }
};

export const clearFavorites = async (): Promise<void> => {
  try {
    await AsyncStorage.removeItem(FAVORITES_KEY);
  } catch (error) {
    console.error("Error clearing favorites:", error);
    throw error;
  }
};
