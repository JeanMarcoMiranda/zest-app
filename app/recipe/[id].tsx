import {
  ErrorView,
  FavoriteButton,
  LoadingSpinner,
} from "@/src/components/common";
import { useFavorites, useRecipes, useTheme } from "@/src/hooks";
import { spacing, typography } from "@/src/theme";
import { Ionicons } from "@expo/vector-icons";
import { useLocalSearchParams, useRouter } from "expo-router";
import React, { useEffect } from "react";
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

export default function RecipeDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const { isFavorite, toggleFavorite } = useFavorites();
  const { colors, isDark } = useTheme();
  const {
    currentRecipe: recipe,
    isLoading: loading,
    error,
    fetchRecipeById,
    clearError,
  } = useRecipes();

  useEffect(() => {
    fetchRecipeById(id);
    return () => clearError();
  }, [id, fetchRecipeById, clearError]);

  const handleStartCooking = () => {
    if (recipe) {
      router.push({
        pathname: "/cooking/[id]" as any,
        params: { id: recipe.id },
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
        onRetry={() => fetchRecipeById(id)}
      />
    );
  }

  const shadows = {
    sm: {
      shadowColor: colors.primaryDark,
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: 0.05,
      shadowRadius: 2,
      elevation: 2,
    },
    md: {
      shadowColor: colors.primaryDark,
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 4,
      elevation: 4,
    },
  };

  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: colors.background }]}
    >
      <StatusBar
        barStyle={isDark ? "light-content" : "dark-content"}
        backgroundColor={colors.background}
      />

      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
      >
        {/* Imagen principal con botón de favorito */}
        <View style={styles.imageContainer}>
          <Image
            source={{ uri: recipe.thumbnail }}
            style={[styles.image, { backgroundColor: colors.divider }]}
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
          <Text style={[styles.title, { color: colors.text }]}>
            {recipe.title}
          </Text>

          {/* Tags */}
          <View style={styles.tagsContainer}>
            <View
              style={[styles.tag, { backgroundColor: colors.primaryLight }]}
            >
              <Ionicons
                name="pricetag"
                size={14}
                color={colors.textInverse}
                style={styles.tagIcon}
              />
              <Text style={[styles.tagText, { color: colors.textInverse }]}>
                {recipe.category}
              </Text>
            </View>
            <View style={[styles.tag, { backgroundColor: colors.secondary }]}>
              <Ionicons
                name="globe-outline"
                size={14}
                color={colors.textSecondary}
                style={styles.tagIcon}
              />
              <Text style={[styles.tagText, { color: colors.textSecondary }]}>
                {recipe.area}
              </Text>
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
              <Text style={[styles.sectionTitle, { color: colors.text }]}>
                Ingredientes
              </Text>
            </View>
            <View
              style={[
                styles.card,
                { backgroundColor: colors.surface },
                shadows.sm,
              ]}
            >
              {recipe.ingredients.map((ingredient, index) => (
                <View key={index} style={styles.ingredientRow}>
                  <Text
                    style={[styles.ingredientBullet, { color: colors.primary }]}
                  >
                    •
                  </Text>
                  <Text style={[styles.ingredientText, { color: colors.text }]}>
                    <Text
                      style={[
                        styles.ingredientMeasure,
                        { color: colors.primary },
                      ]}
                    >
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
              <Text style={[styles.sectionTitle, { color: colors.text }]}>
                Instrucciones
              </Text>
            </View>
            <View
              style={[
                styles.card,
                { backgroundColor: colors.surface },
                shadows.sm,
              ]}
            >
              <Text
                style={[styles.instructionsPreview, { color: colors.text }]}
                numberOfLines={3}
              >
                {recipe.instructions}
              </Text>
              <Text
                style={[styles.instructionsHint, { color: colors.textLight }]}
              >
                Toca &quot;Comenzar a Cocinar&quot; para ver todas las
                instrucciones
              </Text>
            </View>
          </View>

          {/* Tags adicionales */}
          {recipe.tags.length > 0 && (
            <View style={styles.section}>
              <View style={styles.sectionTitleRow}>
                <Ionicons name="pricetags" size={20} color={colors.primary} />
                <Text style={[styles.sectionTitle, { color: colors.text }]}>
                  Etiquetas
                </Text>
              </View>
              <View style={styles.tagsRow}>
                {recipe.tags.map((tag, index) => (
                  <View
                    key={index}
                    style={[
                      styles.tagSmall,
                      {
                        backgroundColor: colors.background,
                        borderColor: colors.border,
                      },
                    ]}
                  >
                    <Text
                      style={[
                        styles.tagSmallText,
                        { color: colors.textSecondary },
                      ]}
                    >
                      {tag}
                    </Text>
                  </View>
                ))}
              </View>
            </View>
          )}

          {/* Botón de cocinar */}
          <TouchableOpacity
            style={[
              styles.button,
              { backgroundColor: colors.primary },
              shadows.md,
            ]}
            onPress={handleStartCooking}
          >
            <Ionicons name="flame" size={24} color={colors.textInverse} />
            <Text style={[styles.buttonText, { color: colors.textInverse }]}>
              Comenzar a Cocinar
            </Text>
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
    fontSize: typography.fontSize["2xl"],
    fontWeight: "700",
    marginBottom: spacing.md,
  },
  tagsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: spacing.sm,
    marginBottom: spacing.lg,
  },
  tag: {
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
    fontSize: typography.fontSize.sm,
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
    fontSize: typography.fontSize.lg,
    fontWeight: "600",
  },
  card: {
    padding: spacing.md,
    borderRadius: 12,
  },
  ingredientRow: {
    flexDirection: "row",
    marginBottom: spacing.sm,
  },
  ingredientBullet: {
    fontSize: typography.fontSize.base,
    marginRight: spacing.sm,
    fontWeight: "700",
  },
  ingredientText: {
    flex: 1,
    fontSize: typography.fontSize.base,
  },
  ingredientMeasure: {
    fontWeight: "600",
  },
  instructionsPreview: {
    fontSize: typography.fontSize.base,
    lineHeight: 22,
  },
  instructionsHint: {
    fontSize: typography.fontSize.sm,
    fontStyle: "italic",
    marginTop: spacing.sm,
  },
  tagsRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: spacing.xs,
  },
  tagSmall: {
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs,
    borderRadius: 6,
    borderWidth: 1,
  },
  tagSmallText: {
    fontSize: typography.fontSize.xs,
    fontWeight: "500",
  },
  button: {
    padding: spacing.md,
    borderRadius: 12,
    alignItems: "center",
    marginTop: spacing.md,
    flexDirection: "row",
    justifyContent: "center",
    gap: spacing.sm,
  },
  buttonText: {
    fontSize: typography.fontSize.base,
    fontWeight: "700",
  },
});
