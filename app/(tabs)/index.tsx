// app/(tabs)/index.tsx

import {
  CategoryFilter,
  ErrorView,
  RecipeCardSkeleton,
  SearchBar,
} from "@/src/components/common";
import { RecipeCardItem } from "@/src/components/recipe";
import { useFavorites } from "@/src/hooks";
import {
  getCategories,
  getRandomRecipes,
  getRecipesByCategory,
  searchRecipes,
} from "@/src/services";
import { colors, spacing, typography } from "@/src/theme";
import { RecipeCard } from "@/src/types/recipe.types";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import React, { useCallback, useEffect, useState } from "react";
import {
  FlatList,
  RefreshControl,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from "react-native";

// Extraer valores de typography para compatibilidad
const fontSize = {
  xs: typography.fontSize.xs,
  sm: typography.fontSize.sm,
  md: typography.fontSize.base,
  lg: typography.fontSize.lg,
  xl: typography.fontSize.xl,
  xxl: typography.fontSize["2xl"],
  xxxl: typography.fontSize["3xl"],
};

const borderRadius = {
  sm: 4,
  md: 8,
  lg: 12,
  xl: 16,
  round: 9999,
};

const shadows = {
  sm: {
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  md: {
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 4,
  },
  lg: {
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 8,
  },
};

const gradients = {
  header: [colors.primary[500], "#FF8E53"] as const,
  card: ["#FFFFFF", "#F8F9FA"] as const,
};

export default function HomeScreen() {
  const router = useRouter();
  const { favorites } = useFavorites();

  const [recipes, setRecipes] = useState<RecipeCard[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  const loadCategories = async () => {
    const cats = await getCategories();
    setCategories(cats);
  };

  const loadRecipes = async () => {
    try {
      setError(false);
      let data: RecipeCard[] = [];

      if (searchQuery.trim() !== "") {
        // Búsqueda por query
        data = await searchRecipes(searchQuery);
      } else if (selectedCategory) {
        // Filtrar por categoría
        data = await getRecipesByCategory(selectedCategory);
      } else {
        // Recetas aleatorias
        data = await getRandomRecipes(10);
      }

      setRecipes(data);
    } catch (err) {
      console.error("Error loading recipes:", err);
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  const handleRefresh = async () => {
    setRefreshing(true);
    await loadRecipes();
    setRefreshing(false);
  };

  const handleSearch = useCallback((query: string) => {
    setSearchQuery(query);
  }, []);

  const handleClearSearch = useCallback(() => {
    setSearchQuery("");
  }, []);

  const handleSelectCategory = useCallback((category: string | null) => {
    setSelectedCategory(category);
    setSearchQuery(""); // Limpiar búsqueda al seleccionar categoría
  }, []);

  useEffect(() => {
    loadCategories();
  }, []);

  useEffect(() => {
    // Delay para evitar muchas llamadas mientras se escribe
    const delayDebounce = setTimeout(() => {
      setLoading(true);
      loadRecipes();
    }, 500);

    return () => clearTimeout(delayDebounce);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchQuery, selectedCategory]);

  const handleRecipePress = (recipeId: string) => {
    router.push(`/recipe/${recipeId}` as any);
  };

  if (error && recipes.length === 0) {
    return (
      <ErrorView
        message="No pudimos cargar las recetas. Verifica tu conexión."
        onRetry={loadRecipes}
      />
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor={colors.primary} />

      {/* Header con gradiente */}
      <LinearGradient colors={gradients.header} style={styles.headerGradient}>
        <View style={styles.header}>
          <View style={styles.headerContent}>
            <View style={styles.titleRow}>
              <Ionicons
                name="restaurant"
                size={32}
                color={colors.textInverse}
                style={styles.titleIcon}
              />
              <Text style={styles.title}>ChefHub</Text>
            </View>
            <Text style={styles.subtitle}>
              {favorites.length > 0
                ? `${favorites.length} ${favorites.length === 1 ? "favorito" : "favoritos"}`
                : "Descubre recetas increíbles"}
            </Text>
          </View>
          {!loading && recipes.length > 0 && (
            <View style={styles.recipeBadge}>
              <Text style={styles.recipeBadgeText}>{recipes.length}</Text>
              <Text style={styles.recipeBadgeLabel}>recetas</Text>
            </View>
          )}
        </View>
      </LinearGradient>

      {/* Barra de búsqueda */}
      <SearchBar
        placeholder="Buscar recetas..."
        onSearch={handleSearch}
        onClear={handleClearSearch}
      />

      {/* Filtro de categorías */}
      <CategoryFilter
        categories={categories}
        selectedCategory={selectedCategory}
        onSelectCategory={handleSelectCategory}
      />

      {/* Lista de recetas con skeleton loaders */}
      {loading && recipes.length === 0 ? (
        <View style={styles.listContent}>
          <RecipeCardSkeleton />
          <RecipeCardSkeleton />
          <RecipeCardSkeleton />
        </View>
      ) : (
        <FlatList
          data={recipes}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <RecipeCardItem
              recipe={item}
              onPress={() => handleRecipePress(item.id)}
            />
          )}
          contentContainerStyle={styles.listContent}
          showsVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={handleRefresh}
              colors={[colors.primary]}
              tintColor={colors.primary}
            />
          }
          ListEmptyComponent={
            <View style={styles.emptyContainer}>
              <Ionicons
                name="search"
                size={64}
                color={colors.textLight}
                style={styles.emptyIcon}
              />
              <Text style={styles.emptyTitle}>No se encontraron recetas</Text>
              <Text style={styles.emptySubtitle}>
                {searchQuery
                  ? "Intenta con otro término de búsqueda"
                  : "Desliza hacia abajo para recargar"}
              </Text>
            </View>
          }
        />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  headerGradient: {
    ...shadows.lg,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: spacing.lg,
    paddingTop: spacing.md,
  },
  headerContent: {
    flex: 1,
  },
  titleRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: spacing.xs,
  },
  titleIcon: {
    marginRight: spacing.xs,
  },
  title: {
    fontSize: fontSize.xxxl,
    fontWeight: "700",
    color: colors.textInverse,
    textShadowColor: "rgba(0, 0, 0, 0.2)",
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 4,
  },
  subtitle: {
    fontSize: fontSize.md,
    color: colors.textInverse,
    opacity: 0.9,
    fontWeight: "500",
  },
  recipeBadge: {
    backgroundColor: "rgba(255, 255, 255, 0.25)",
    borderRadius: borderRadius.lg,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    alignItems: "center",
    minWidth: 60,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.3)",
  },
  recipeBadgeText: {
    fontSize: fontSize.xxl,
    fontWeight: "700",
    color: colors.textInverse,
  },
  recipeBadgeLabel: {
    fontSize: fontSize.xs,
    color: colors.textInverse,
    opacity: 0.9,
    fontWeight: "600",
  },
  listContent: {
    padding: spacing.md,
  },
  emptyContainer: {
    alignItems: "center",
    marginTop: spacing.xxl,
  },
  emptyIcon: {
    marginBottom: spacing.md,
  },
  emptyTitle: {
    fontSize: fontSize.xl,
    fontWeight: "700",
    color: colors.text,
    marginBottom: spacing.xs,
  },
  emptySubtitle: {
    fontSize: fontSize.md,
    color: colors.textSecondary,
    textAlign: "center",
  },
});
