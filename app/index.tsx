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
import { ErrorView, LoadingSpinner } from "../src/components/common";
import { RecipeCardItem } from "../src/components/recipe";
import { getRandomRecipes } from "../src/services/api";
import { colors, fontSize, spacing } from "../src/styles/theme";
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

  if (loading) {
    return <LoadingSpinner message="Cargando recetas deliciosas..." />;
  }

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
      <StatusBar barStyle="dark-content" backgroundColor={colors.background} />

      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>🍳 ChefHub</Text>
        <Text style={styles.subtitle}>Descubre recetas increíbles</Text>
      </View>

      {/* Lista de recetas */}
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
            <Text style={styles.emptyText}>No hay recetas disponibles</Text>
          </View>
        }
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  header: {
    padding: spacing.lg,
    backgroundColor: colors.surface,
    borderBottomWidth: 1,
    borderBottomColor: colors.divider,
  },
  title: {
    fontSize: fontSize.xxxl,
    fontWeight: "700",
    color: colors.primary,
    marginBottom: spacing.xs,
  },
  subtitle: {
    fontSize: fontSize.md,
    color: colors.textSecondary,
  },
  listContent: {
    padding: spacing.md,
  },
  emptyContainer: {
    padding: spacing.xl,
    alignItems: "center",
  },
  emptyText: {
    fontSize: fontSize.md,
    color: colors.textSecondary,
  },
});
