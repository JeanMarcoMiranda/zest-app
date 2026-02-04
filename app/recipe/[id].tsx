import {
  ErrorView,
  FavoriteButton,
  LoadingSpinner,
} from "@/src/components/common";
import { useFavorites } from "@/src/hooks";
import { getRecipeById } from "@/src/services";
import { colors, spacing, typography } from "@/src/theme";
import { Recipe } from "@/src/types/recipe.types";
import { Ionicons } from "@expo/vector-icons";
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

const fontSize = {
  xs: typography.fontSize.xs,
  sm: typography.fontSize.sm,
  md: typography.fontSize.base,
  lg: typography.fontSize.lg,
  xl: typography.fontSize.xl,
  xxl: typography.fontSize["2xl"],
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
};

export default function RecipeDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const { isFavorite, toggleFavorite } = useFavorites();

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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  const handleStartCooking = () => {
    if (recipe) {
      router.push({
        pathname: "/cooking/[id]" as any,
        params: {
          id: recipe.id,
          recipeData: JSON.stringify(recipe),
        },
      });
    }
  };

  const handleToggleFavorite = () => {
    if (recipe) {
      toggleFavorite({
        id: recipe.id,
        title: recipe.title,
        thumbnail: recipe.thumbnail,
        category: recipe.category,
        area: recipe.area,
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
      <StatusBar barStyle="dark-content" backgroundColor={colors.background} />

      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
      >
        {/* Imagen principal con botón de favorito */}
        <View style={styles.imageContainer}>
          <Image
            source={{ uri: recipe.thumbnail }}
            style={styles.image}
            resizeMode="cover"
          />
          <View style={styles.favoriteButtonContainer}>
            <FavoriteButton
              isFavorite={isFavorite(recipe.id)}
              onPress={handleToggleFavorite}
            />
          </View>
        </View>

        <View style={styles.content}>
          {/* Título */}
          <Text style={styles.title}>{recipe.title}</Text>

          {/* Tags */}
          <View style={styles.tagsContainer}>
            <View style={styles.tag}>
              <Ionicons
                name="pricetag"
                size={14}
                color={colors.surface}
                style={styles.tagIcon}
              />
              <Text style={styles.tagText}>{recipe.category}</Text>
            </View>
            <View style={styles.tag}>
              <Ionicons
                name="globe-outline"
                size={14}
                color={colors.surface}
                style={styles.tagIcon}
              />
              <Text style={styles.tagText}>{recipe.area}</Text>
            </View>
          </View>

          {/* Ingredientes */}
          <View style={styles.section}>
            <View style={styles.sectionTitleRow}>
              <Ionicons
                name="restaurant-outline"
                size={20}
                color={colors.primary}
              />
              <Text style={styles.sectionTitle}>Ingredientes</Text>
            </View>
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
            <View style={styles.sectionTitleRow}>
              <Ionicons
                name="document-text-outline"
                size={20}
                color={colors.primary}
              />
              <Text style={styles.sectionTitle}>Instrucciones</Text>
            </View>
            <View style={styles.card}>
              <Text style={styles.instructionsPreview} numberOfLines={3}>
                {recipe.instructions}
              </Text>
              <Text style={styles.instructionsHint}>
                Toca "Comenzar a Cocinar" para ver todas las instrucciones
              </Text>
            </View>
          </View>

          {/* Tags adicionales */}
          {recipe.tags.length > 0 && (
            <View style={styles.section}>
              <View style={styles.sectionTitleRow}>
                <Ionicons name="pricetags" size={20} color={colors.primary} />
                <Text style={styles.sectionTitle}>Etiquetas</Text>
              </View>
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
            <Ionicons name="flame" size={24} color={colors.textInverse} />
            <Text style={styles.buttonText}>Comenzar a Cocinar</Text>
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
  imageContainer: {
    position: "relative",
  },
  image: {
    width: "100%",
    height: 300,
    backgroundColor: colors.divider,
  },
  favoriteButtonContainer: {
    position: "absolute",
    top: spacing.md,
    right: spacing.md,
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
    flexDirection: "row",
    alignItems: "center",
  },
  tagIcon: {
    marginRight: spacing.xs,
  },
  tagText: {
    fontSize: fontSize.sm,
    color: colors.surface,
    fontWeight: "600",
  },
  section: {
    marginBottom: spacing.lg,
  },
  sectionTitleRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.xs,
    marginBottom: spacing.sm,
  },
  sectionTitle: {
    fontSize: fontSize.lg,
    fontWeight: "600",
    color: colors.text,
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
  },
  instructionsHint: {
    fontSize: fontSize.sm,
    color: colors.textLight,
    fontStyle: "italic",
    marginTop: spacing.sm,
  },
  tagsRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: spacing.xs,
  },
  tagSmall: {
    backgroundColor: colors.background,
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: colors.border,
  },
  tagSmallText: {
    fontSize: fontSize.xs,
    color: colors.textSecondary,
    fontWeight: "500",
  },
  button: {
    backgroundColor: colors.primary,
    padding: spacing.md,
    borderRadius: 12,
    alignItems: "center",
    marginTop: spacing.md,
    flexDirection: "row",
    justifyContent: "center",
    gap: spacing.sm,
    ...shadows.md,
  },
  buttonText: {
    color: colors.textInverse,
    fontSize: fontSize.md,
    fontWeight: "700",
  },
});
