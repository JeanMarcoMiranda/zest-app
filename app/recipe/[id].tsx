import {
  ErrorView,
  FavoriteButton,
  LoadingSpinner,
} from "@/src/components/common";
import { useFavorites, useRecipes, useTheme } from "@/src/hooks";
import { createShadow } from "@/src/utils";
import { Ionicons } from "@expo/vector-icons";
import { useLocalSearchParams, useRouter } from "expo-router";
import React, { useEffect } from "react";
import {
  Image,
  SafeAreaView,
  ScrollView,
  StatusBar,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

export default function RecipeDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const { isFavorite, toggleFavorite } = useFavorites();
  const theme = useTheme();
  const { colors, isDark } = theme;
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

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.background }}>
      <StatusBar
        barStyle={isDark ? "light-content" : "dark-content"}
        backgroundColor={colors.background}
      />

      <ScrollView style={{ flex: 1 }} showsVerticalScrollIndicator={false}>
        {/* Imagen principal con botón de favorito */}
        <View style={{ position: "relative" }}>
          <Image
            source={{ uri: recipe.thumbnail }}
            style={{
              width: "100%",
              height: 300,
              backgroundColor: colors.divider,
            }}
            resizeMode="cover"
          />
          <View
            style={{
              position: "absolute",
              top: theme.spacing.md,
              right: theme.spacing.md,
            }}
          >
            <FavoriteButton
              isFavorite={isFavorite(recipe.id)}
              onPress={handleToggleFavorite}
            />
          </View>
        </View>

        <View style={{ padding: theme.spacing.lg }}>
          {/* Título */}
          <Text
            style={[
              theme.typography.h1,
              {
                color: colors.text,
                marginBottom: theme.spacing.md,
              },
            ]}
          >
            {recipe.title}
          </Text>

          {/* Tags */}
          <View
            style={{
              flexDirection: "row",
              flexWrap: "wrap",
              gap: theme.spacing.sm,
              marginBottom: theme.spacing.lg,
            }}
          >
            <View
              style={{
                paddingHorizontal: theme.spacing.md,
                paddingVertical: theme.spacing.sm,
                borderRadius: theme.borderRadius.sm,
                flexDirection: "row",
                alignItems: "center",
                backgroundColor: colors.primaryLight,
              }}
            >
              <Ionicons
                name="pricetag"
                size={14}
                color={colors.textInverse}
                style={{ marginRight: theme.spacing.xs }}
              />
              <Text
                style={[
                  theme.typography.bodySm,
                  {
                    color: colors.textInverse,
                    fontWeight: "600",
                  },
                ]}
              >
                {recipe.category}
              </Text>
            </View>
            <View
              style={{
                paddingHorizontal: theme.spacing.md,
                paddingVertical: theme.spacing.sm,
                borderRadius: theme.borderRadius.sm,
                flexDirection: "row",
                alignItems: "center",
                backgroundColor: colors.secondary,
              }}
            >
              <Ionicons
                name="globe-outline"
                size={14}
                color={colors.textSecondary}
                style={{ marginRight: theme.spacing.xs }}
              />
              <Text
                style={[
                  theme.typography.bodySm,
                  {
                    color: colors.textSecondary,
                    fontWeight: "600",
                  },
                ]}
              >
                {recipe.area}
              </Text>
            </View>
          </View>

          {/* Ingredientes */}
          <View style={{ marginBottom: theme.spacing.lg }}>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                gap: theme.spacing.xs,
                marginBottom: theme.spacing.sm,
              }}
            >
              <Ionicons
                name="restaurant-outline"
                size={20}
                color={colors.primary}
              />
              <Text
                style={[
                  theme.typography.h3,
                  {
                    color: colors.text,
                  },
                ]}
              >
                Ingredientes
              </Text>
            </View>
            <View
              style={[
                {
                  padding: theme.spacing.md,
                  borderRadius: theme.borderRadius.md,
                  backgroundColor: colors.surface,
                },
                createShadow(theme as any, theme.elevation.low),
              ]}
            >
              {recipe.ingredients.map((ingredient, index) => (
                <View
                  key={index}
                  style={{
                    flexDirection: "row",
                    marginBottom: theme.spacing.sm,
                  }}
                >
                  <Text
                    style={[
                      theme.typography.bodyLg,
                      {
                        color: colors.primary,
                        marginRight: theme.spacing.sm,
                        fontWeight: "700",
                      },
                    ]}
                  >
                    •
                  </Text>
                  <Text
                    style={[
                      theme.typography.bodyLg,
                      {
                        flex: 1,
                        color: colors.text,
                      },
                    ]}
                  >
                    <Text
                      style={{
                        color: colors.primary,
                        fontWeight: "600",
                      }}
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
          <View style={{ marginBottom: theme.spacing.lg }}>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                gap: theme.spacing.xs,
                marginBottom: theme.spacing.sm,
              }}
            >
              <Ionicons
                name="document-text-outline"
                size={20}
                color={colors.primary}
              />
              <Text
                style={[
                  theme.typography.h3,
                  {
                    color: colors.text,
                  },
                ]}
              >
                Instrucciones
              </Text>
            </View>
            <View
              style={[
                {
                  padding: theme.spacing.md,
                  borderRadius: theme.borderRadius.md,
                  backgroundColor: colors.surface,
                },
                createShadow(theme as any, theme.elevation.low),
              ]}
            >
              <Text
                style={[
                  theme.typography.bodyLg,
                  {
                    color: colors.text,
                    lineHeight: 22,
                  },
                ]}
                numberOfLines={3}
              >
                {recipe.instructions}
              </Text>
              <Text
                style={[
                  theme.typography.bodySm,
                  {
                    color: colors.textLight,
                    fontStyle: "italic",
                    marginTop: theme.spacing.sm,
                  },
                ]}
              >
                Toca &quot;Comenzar a Cocinar&quot; para ver todas las
                instrucciones
              </Text>
            </View>
          </View>

          {/* Tags adicionales */}
          {recipe.tags.length > 0 && (
            <View style={{ marginBottom: theme.spacing.lg }}>
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  gap: theme.spacing.xs,
                  marginBottom: theme.spacing.sm,
                }}
              >
                <Ionicons name="pricetags" size={20} color={colors.primary} />
                <Text
                  style={[
                    theme.typography.h3,
                    {
                      color: colors.text,
                    },
                  ]}
                >
                  Etiquetas
                </Text>
              </View>
              <View
                style={{
                  flexDirection: "row",
                  flexWrap: "wrap",
                  gap: theme.spacing.xs,
                }}
              >
                {recipe.tags.map((tag, index) => (
                  <View
                    key={index}
                    style={{
                      paddingHorizontal: theme.spacing.sm,
                      paddingVertical: theme.spacing.xs,
                      borderRadius: theme.borderRadius.xs,
                      borderWidth: 1,
                      backgroundColor: colors.background,
                      borderColor: colors.border,
                    }}
                  >
                    <Text
                      style={[
                        theme.typography.caption,
                        {
                          color: colors.textSecondary,
                          fontWeight: "500",
                        },
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
              {
                padding: theme.spacing.md,
                borderRadius: theme.borderRadius.md,
                alignItems: "center",
                marginTop: theme.spacing.md,
                flexDirection: "row",
                justifyContent: "center",
                gap: theme.spacing.sm,
                backgroundColor: colors.primary,
              },
              createShadow(theme as any, theme.elevation.medium),
            ]}
            onPress={handleStartCooking}
          >
            <Ionicons name="flame" size={24} color={colors.textInverse} />
            <Text
              style={[
                theme.typography.button,
                {
                  color: colors.textInverse,
                },
              ]}
            >
              Comenzar a Cocinar
            </Text>
          </TouchableOpacity>

          {/* Espacio inferior */}
          <View style={{ height: theme.spacing.xl }} />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
