import {
  ErrorView,
  FavoriteButton,
  LoadingSpinner,
} from "@/src/components/common";
import { useFavorites, useRecipes, useTheme } from "@/src/hooks";
import { Ionicons } from "@expo/vector-icons";
import { BlurView } from "expo-blur";
import { LinearGradient } from "expo-linear-gradient";
import { useLocalSearchParams, useRouter } from "expo-router";
import React, { useEffect } from "react";
import {
  Image,
  Platform,
  ScrollView,
  StatusBar,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const HERO_BASE_HEIGHT = 320;

export default function RecipeDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const { isFavorite, toggleFavorite } = useFavorites();
  const theme = useTheme();
  const { colors, isDark } = theme;
  const insets = useSafeAreaInsets();
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

  const heroHeight = HERO_BASE_HEIGHT + insets.top;

  return (
    <View style={{ flex: 1, backgroundColor: colors.background }}>
      {/* Translucent StatusBar for edge-to-edge */}
      <StatusBar
        barStyle="light-content"
        backgroundColor="transparent"
        translucent={true}
      />

      <ScrollView
        style={{ flex: 1 }}
        showsVerticalScrollIndicator={false}
        bounces={true}
        contentInsetAdjustmentBehavior="never"
        automaticallyAdjustContentInsets={false}
        contentContainerStyle={{
          paddingBottom: insets.bottom + theme.spacing.xl,
        }}
        scrollIndicatorInsets={{
          bottom: insets.bottom,
        }}
      >
        {/* Hero Image — extends behind status bar */}
        <View style={{ height: heroHeight, position: "relative" }}>
          <Image
            source={{ uri: recipe.thumbnail }}
            style={{
              width: "100%",
              height: "100%",
              backgroundColor: colors.surfaceVariant,
            }}
            resizeMode="cover"
          />

          {/* Gradient for legibility over image */}
          <LinearGradient
            colors={["rgba(0,0,0,0.4)", "transparent", "rgba(0,0,0,0.5)"]}
            locations={[0, 0.4, 1]}
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
            }}
          />

          {/* Back button — top left with safe area */}
          <View
            style={{
              position: "absolute",
              top: insets.top + theme.spacing.xs,
              left: theme.spacing.sm,
            }}
          >
            <TouchableOpacity
              onPress={() => router.back()}
              activeOpacity={0.8}
              style={{
                borderRadius: theme.borderRadius.full,
                overflow: "hidden",
              }}
            >
              <BlurView
                intensity={Platform.OS === "ios" ? 50 : 90}
                tint={isDark ? "dark" : "light"}
                style={{
                  width: 38,
                  height: 38,
                  justifyContent: "center",
                  alignItems: "center",
                  backgroundColor:
                    Platform.OS === "android"
                      ? "rgba(0,0,0,0.4)"
                      : "transparent",
                }}
              >
                <Ionicons name="chevron-back" size={20} color="#FFF" />
              </BlurView>
            </TouchableOpacity>
          </View>

          {/* Favorite button — top right with safe area */}
          <View
            style={{
              position: "absolute",
              top: insets.top + theme.spacing.xs,
              right: theme.spacing.sm,
            }}
          >
            <FavoriteButton
              isFavorite={isFavorite(recipe.id)}
              onPress={handleToggleFavorite}
            />
          </View>

          {/* Title overlay at bottom of hero */}
          <View
            style={{
              position: "absolute",
              bottom: 0,
              left: 0,
              right: 0,
              padding: theme.spacing.md,
              paddingBottom: theme.spacing.lg,
            }}
          >
            {/* Category + Area pills */}
            <View
              style={{
                flexDirection: "row",
                gap: theme.spacing.xs,
                marginBottom: theme.spacing.sm,
              }}
            >
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  paddingHorizontal: theme.spacing.xs,
                  paddingVertical: 3,
                  borderRadius: theme.borderRadius.full,
                  backgroundColor: "rgba(255,255,255,0.2)",
                }}
              >
                <Ionicons
                  name="pricetag"
                  size={10}
                  color="rgba(255,255,255,0.9)"
                  style={{ marginRight: theme.spacing.xs }}
                />
                <Text
                  style={[
                    theme.typography.micro,
                    {
                      color: "rgba(255,255,255,0.95)",
                      textTransform: "none",
                    },
                  ]}
                >
                  {recipe.category}
                </Text>
              </View>
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  paddingHorizontal: theme.spacing.xs,
                  paddingVertical: 3,
                  borderRadius: theme.borderRadius.full,
                  backgroundColor: "rgba(255,255,255,0.2)",
                }}
              >
                <Ionicons
                  name="globe-outline"
                  size={10}
                  color="rgba(255,255,255,0.9)"
                  style={{ marginRight: theme.spacing.xs }}
                />
                <Text
                  style={[
                    theme.typography.micro,
                    {
                      color: "rgba(255,255,255,0.95)",
                      textTransform: "none",
                    },
                  ]}
                >
                  {recipe.area}
                </Text>
              </View>
            </View>

            <Text
              style={[
                theme.typography.h1,
                {
                  color: "#FFF",
                  textShadowColor: "rgba(0,0,0,0.4)",
                  textShadowOffset: { width: 0, height: 1 },
                  textShadowRadius: 4,
                },
              ]}
              numberOfLines={3}
            >
              {recipe.title}
            </Text>
          </View>
        </View>

        {/* Content body */}
        <View
          style={{
            paddingHorizontal: theme.spacing.md,
            paddingTop: theme.spacing.lg,
            paddingBottom: theme.spacing.xl,
          }}
        >
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
                size={18}
                color={colors.primary}
              />
              <Text style={[theme.typography.h3, { color: colors.text }]}>
                Ingredientes
              </Text>
              <Text
                style={[
                  theme.typography.caption,
                  {
                    color: colors.textSecondary,
                    textTransform: "none",
                    marginLeft: 4,
                  },
                ]}
              >
                ({recipe.ingredients.length})
              </Text>
            </View>

            <View
              style={{
                padding: theme.spacing.md,
                borderRadius: theme.borderRadius.md,
                backgroundColor: isDark
                  ? "rgba(255,255,255,0.04)"
                  : "rgba(0,0,0,0.02)",
                borderWidth: 0.5,
                borderColor: isDark
                  ? "rgba(255,255,255,0.06)"
                  : "rgba(0,0,0,0.05)",
              }}
            >
              {recipe.ingredients.map((ingredient, index) => (
                <View
                  key={index}
                  style={{
                    flexDirection: "row",
                    paddingVertical: theme.spacing.xs + 1,
                    borderBottomWidth:
                      index < recipe.ingredients.length - 1 ? 0.5 : 0,
                    borderBottomColor: isDark
                      ? "rgba(255,255,255,0.04)"
                      : "rgba(0,0,0,0.04)",
                  }}
                >
                  <Text
                    style={[
                      theme.typography.bodySm,
                      {
                        color: colors.primary,
                        fontWeight: "600",
                        minWidth: 80,
                      },
                    ]}
                  >
                    {ingredient.measure}
                  </Text>
                  <Text
                    style={[
                      theme.typography.bodySm,
                      {
                        flex: 1,
                        color: colors.text,
                      },
                    ]}
                  >
                    {ingredient.name}
                  </Text>
                </View>
              ))}
            </View>
          </View>

          {/* Instrucciones preview */}
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
                size={18}
                color={colors.primary}
              />
              <Text style={[theme.typography.h3, { color: colors.text }]}>
                Instrucciones
              </Text>
            </View>

            <View
              style={{
                padding: theme.spacing.md,
                borderRadius: theme.borderRadius.md,
                backgroundColor: isDark
                  ? "rgba(255,255,255,0.04)"
                  : "rgba(0,0,0,0.02)",
                borderWidth: 0.5,
                borderColor: isDark
                  ? "rgba(255,255,255,0.06)"
                  : "rgba(0,0,0,0.05)",
              }}
            >
              <Text
                style={[
                  theme.typography.bodySm,
                  {
                    color: colors.text,
                    lineHeight: 20,
                  },
                ]}
                numberOfLines={4}
              >
                {recipe.instructions}
              </Text>
              <Text
                style={[
                  theme.typography.caption,
                  {
                    color: colors.textLight,
                    textTransform: "none",
                    marginTop: theme.spacing.sm,
                  },
                ]}
              >
                Toca &quot;Comenzar a Cocinar&quot; para ver el paso a paso
              </Text>
            </View>
          </View>

          {/* Tags */}
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
                <Ionicons name="pricetags" size={18} color={colors.primary} />
                <Text style={[theme.typography.h3, { color: colors.text }]}>
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
                      borderRadius: theme.borderRadius.full,
                      borderWidth: 0.5,
                      backgroundColor: isDark
                        ? "rgba(255,255,255,0.04)"
                        : "rgba(0,0,0,0.02)",
                      borderColor: isDark
                        ? "rgba(255,255,255,0.08)"
                        : "rgba(0,0,0,0.06)",
                    }}
                  >
                    <Text
                      style={[
                        theme.typography.caption,
                        {
                          color: colors.textSecondary,
                          textTransform: "none",
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

          {/* Cocinar button */}
          <TouchableOpacity
            style={{
              paddingVertical: theme.spacing.md,
              borderRadius: theme.borderRadius.md,
              alignItems: "center",
              marginTop: theme.spacing.sm,
              flexDirection: "row",
              justifyContent: "center",
              gap: theme.spacing.sm,
              backgroundColor: colors.primary,
            }}
            onPress={handleStartCooking}
            activeOpacity={0.85}
          >
            <Ionicons name="flame" size={20} color={colors.textInverse} />
            <Text
              style={[theme.typography.button, { color: colors.textInverse }]}
            >
              Comenzar a Cocinar
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
}
