import { MaterialIcons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  FlatList,
  RefreshControl,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { ErrorView, RecipeCardSkeleton } from "../src/components/common";
import { RecipeCardItem } from "../src/components/recipe";
import { getRandomRecipes } from "../src/services/api";
import {
  borderRadius,
  colors,
  fontSize,
  gradients,
  shadows,
  spacing,
} from "../src/styles/theme";
import { RecipeCard } from "../src/types/recipe.types";

export default function HomeScreen() {
  const router = useRouter();
  const [recipes, setRecipes] = useState<RecipeCard[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  const loadRecipes = async () => {
    try {
      setError(false);
      const data = await getRandomRecipes(10);
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

  useEffect(() => {
    loadRecipes();
  }, []);

  const handleRecipePress = (recipeId: string) => {
    router.push(`/recipe/${recipeId}`);
  };

  if (error) {
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
              <MaterialIcons
                name="restaurant"
                size={32}
                color={colors.textInverse}
                style={styles.titleIcon}
              />
              <Text style={styles.title}>ChefHub</Text>
            </View>
            <Text style={styles.subtitle}>Descubre recetas increíbles</Text>
          </View>
          {!loading && recipes.length > 0 && (
            <View style={styles.recipeBadge}>
              <Text style={styles.recipeBadgeText}>{recipes.length}</Text>
              <Text style={styles.recipeBadgeLabel}>recetas</Text>
            </View>
          )}
        </View>
      </LinearGradient>

      {/* Lista de recetas con skeleton loaders */}
      {loading ? (
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
              <MaterialIcons
                name="restaurant"
                size={64}
                color={colors.textLight}
                style={styles.emptyIcon}
              />
              <Text style={styles.emptyTitle}>No hay recetas disponibles</Text>
              <Text style={styles.emptySubtitle}>
                Desliza hacia abajo para recargar
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
    marginBottom: spacing.xs,
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
    padding: spacing.xl,
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
