import { useLocalSearchParams, useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  Image,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { ErrorView, LoadingSpinner } from "../../src/components/common";
import { getRecipeById } from "../../src/services/api";
import { colors, fontSize, shadows, spacing } from "../../src/styles/theme";
import { Recipe } from "../../src/types/recipe.types";

export default function RecipeDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const [recipe, setRecipe] = useState<Recipe | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const loadRecipe = async () => {
    try {
      setError(false);
      setLoading(true);
      const data = await getRecipeById(id);
      setRecipe(data);
    } catch (err) {
      console.error("Error loading recipe:", err);
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadRecipe();
  }, [id]);

  const handleStartCooking = () => {
    if (recipe) {
      router.push({
        pathname: "/cooking/[id]",
        params: {
          id: recipe.id,
          recipeData: JSON.stringify(recipe),
        },
      });
    }
  };

  if (loading) {
    return <LoadingSpinner message="Cargando receta..." />;
  }

  if (error || !recipe) {
    return (
      <ErrorView
        message="No pudimos cargar esta receta."
        onRetry={loadRecipe}
      />
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={colors.surface} />

      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
      >
        {/* Imagen principal */}
        <Image
          source={{ uri: recipe.thumbnail }}
          style={styles.image}
          resizeMode="cover"
        />

        <View style={styles.content}>
          {/* Título */}
          <Text style={styles.title}>{recipe.title}</Text>

          {/* Tags */}
          <View style={styles.tagsContainer}>
            <View style={styles.tag}>
              <Text style={styles.tagText}>📁 {recipe.category}</Text>
            </View>
            <View style={styles.tag}>
              <Text style={styles.tagText}>🌍 {recipe.area}</Text>
            </View>
          </View>

          {/* Ingredientes */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>🥘 Ingredientes</Text>
            <View style={styles.card}>
              {recipe.ingredients.map((ingredient, index) => (
                <View key={index} style={styles.ingredientRow}>
                  <Text style={styles.ingredientBullet}>•</Text>
                  <Text style={styles.ingredientText}>
                    <Text style={styles.ingredientMeasure}>
                      {ingredient.measure}
                    </Text>{" "}
                    {ingredient.name}
                  </Text>
                </View>
              ))}
            </View>
          </View>

          {/* Vista previa de instrucciones */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>📝 Instrucciones</Text>
            <View style={styles.card}>
              <Text style={styles.instructionsPreview} numberOfLines={3}>
                {recipe.instructions}
              </Text>
              <Text style={styles.instructionsNote}>
                Toca "Comenzar a Cocinar" para ver el paso a paso
              </Text>
            </View>
          </View>

          {/* Tags adicionales */}
          {recipe.tags.length > 0 && (
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>🏷️ Etiquetas</Text>
              <View style={styles.tagsRow}>
                {recipe.tags.map((tag, index) => (
                  <View key={index} style={styles.tagSmall}>
                    <Text style={styles.tagSmallText}>{tag}</Text>
                  </View>
                ))}
              </View>
            </View>
          )}

          {/* Botón de cocinar */}
          <TouchableOpacity style={styles.button} onPress={handleStartCooking}>
            <Text style={styles.buttonText}>🔥 Comenzar a Cocinar</Text>
          </TouchableOpacity>

          {/* Espacio inferior */}
          <View style={{ height: spacing.xl }} />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  scrollView: {
    flex: 1,
  },
  image: {
    width: "100%",
    height: 300,
    backgroundColor: colors.divider,
  },
  content: {
    padding: spacing.lg,
  },
  title: {
    fontSize: fontSize.xxl,
    fontWeight: "700",
    color: colors.text,
    marginBottom: spacing.md,
  },
  tagsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: spacing.sm,
    marginBottom: spacing.lg,
  },
  tag: {
    backgroundColor: colors.primaryLight,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    borderRadius: 8,
  },
  tagText: {
    fontSize: fontSize.sm,
    color: colors.surface,
    fontWeight: "600",
  },
  section: {
    marginBottom: spacing.lg,
  },
  sectionTitle: {
    fontSize: fontSize.lg,
    fontWeight: "600",
    color: colors.text,
    marginBottom: spacing.sm,
  },
  card: {
    backgroundColor: colors.surface,
    padding: spacing.md,
    borderRadius: 12,
    ...shadows.sm,
  },
  ingredientRow: {
    flexDirection: "row",
    marginBottom: spacing.sm,
  },
  ingredientBullet: {
    fontSize: fontSize.md,
    color: colors.primary,
    marginRight: spacing.sm,
    fontWeight: "700",
  },
  ingredientText: {
    flex: 1,
    fontSize: fontSize.md,
    color: colors.text,
  },
  ingredientMeasure: {
    fontWeight: "600",
    color: colors.primary,
  },
  instructionsPreview: {
    fontSize: fontSize.md,
    color: colors.text,
    lineHeight: 22,
    marginBottom: spacing.sm,
  },
  instructionsNote: {
    fontSize: fontSize.sm,
    color: colors.textSecondary,
    fontStyle: "italic",
  },
  tagsRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: spacing.sm,
  },
  tagSmall: {
    backgroundColor: colors.accent,
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs,
    borderRadius: 6,
  },
  tagSmallText: {
    fontSize: fontSize.xs,
    color: colors.surface,
    fontWeight: "600",
  },
  button: {
    backgroundColor: colors.primary,
    padding: spacing.md,
    borderRadius: 12,
    alignItems: "center",
    marginTop: spacing.md,
    ...shadows.md,
  },
  buttonText: {
    color: colors.textInverse,
    fontSize: fontSize.md,
    fontWeight: "600",
  },
});
