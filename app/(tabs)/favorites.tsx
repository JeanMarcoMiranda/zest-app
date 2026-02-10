import { LoadingSpinner } from "@/src/components/common";
import { RecipeCardItem } from "@/src/components/recipe";
import { useFavorites, useTheme } from "@/src/hooks";
import { createShadow } from "@/src/utils";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React, { useEffect } from "react";
import {
  Alert,
  FlatList,
  Pressable,
  StatusBar,
  Text,
  View,
} from "react-native";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withSequence,
  withSpring,
  withTiming,
} from "react-native-reanimated";
import { SafeAreaView } from "react-native-safe-area-context";

export default function FavoritesScreen() {
  const router = useRouter();
  const { favorites, loading, clearAllFavorites } = useFavorites();
  const theme = useTheme();
  const { colors, isDark } = theme;

  // Animation values
  const heartScale = useSharedValue(1);
  const heartOpacity = useSharedValue(1);
  const deleteButtonScale = useSharedValue(1);

  // Pulse animation for empty state heart
  useEffect(() => {
    if (favorites.length === 0) {
      heartScale.value = withRepeat(
        withSequence(
          withTiming(1.1, { duration: 1000 }),
          withTiming(1, { duration: 1000 }),
        ),
        -1,
        false,
      );
      heartOpacity.value = withRepeat(
        withSequence(
          withTiming(0.6, { duration: 1000 }),
          withTiming(1, { duration: 1000 }),
        ),
        -1,
        false,
      );
    }
  }, [favorites.length, heartScale, heartOpacity]);

  const animatedHeartStyle = useAnimatedStyle(() => ({
    transform: [{ scale: heartScale.value }],
    opacity: heartOpacity.value,
  }));

  const animatedDeleteButtonStyle = useAnimatedStyle(() => ({
    transform: [{ scale: deleteButtonScale.value }],
  }));

  const handleRecipePress = (recipeId: string) => {
    router.push(`/recipe/${recipeId}` as any);
  };

  const handleClearAll = () => {
    Alert.alert(
      "Eliminar todos los favoritos",
      "¿Estás seguro de que quieres eliminar todas tus recetas favoritas?",
      [
        {
          text: "Cancelar",
          style: "cancel",
        },
        {
          text: "Eliminar",
          style: "destructive",
          onPress: clearAllFavorites,
        },
      ],
    );
  };

  const handleDeletePressIn = () => {
    deleteButtonScale.value = withSpring(0.95, {
      damping: 15,
      stiffness: 300,
    });
  };

  const handleDeletePressOut = () => {
    deleteButtonScale.value = withSpring(1, {
      damping: 15,
      stiffness: 300,
    });
  };

  if (loading) {
    return <LoadingSpinner message="Cargando favoritos..." />;
  }

  return (
    <SafeAreaView
      style={{ flex: 1, backgroundColor: colors.background }}
      edges={["top", "bottom"]}
    >
      <StatusBar
        barStyle={isDark ? "light-content" : "dark-content"}
        backgroundColor={colors.background}
      />

      {favorites.length === 0 ? (
        // Enhanced Empty State
        <View
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            paddingHorizontal: theme.screenMargins.horizontal,
            paddingVertical: theme.spacing.xl,
          }}
        >
          {/* Animated Heart Icon */}
          <Animated.View style={animatedHeartStyle}>
            <Ionicons
              name="heart-outline"
              size={100}
              color={colors.primary}
              style={{ marginBottom: theme.spacing.xl }}
            />
          </Animated.View>

          {/* Main Message */}
          <Text
            style={[
              theme.typography.h1,
              {
                color: colors.textHigh,
                marginBottom: theme.spacing.md,
                textAlign: "center",
              },
            ]}
          >
            No tienes favoritos
          </Text>

          {/* Description */}
          <Text
            style={[
              theme.typography.bodyLg,
              {
                color: colors.textMed,
                textAlign: "center",
                lineHeight: Math.round(16 * 1.7),
                maxWidth: 320,
              },
            ]}
          >
            Explora recetas deliciosas y guarda tus favoritas tocando el corazón
          </Text>
        </View>
      ) : (
        <>
          {/* Enhanced Header */}
          <View
            style={[
              {
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
                paddingHorizontal: theme.screenMargins.horizontal,
                paddingVertical: theme.spacing.lg,
                backgroundColor: colors.surface,
                borderBottomWidth: 1,
                borderBottomColor: colors.border,
              },
              createShadow(theme as any, theme.elevation.low),
            ]}
          >
            {/* Recipe Count */}
            <Text
              style={[
                theme.typography.h3,
                {
                  color: colors.textHigh,
                },
              ]}
            >
              {favorites.length} {favorites.length === 1 ? "receta" : "recetas"}
            </Text>

            {/* Delete All Button */}
            <Animated.View style={animatedDeleteButtonStyle}>
              <Pressable
                onPress={handleClearAll}
                onPressIn={handleDeletePressIn}
                onPressOut={handleDeletePressOut}
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  gap: theme.spacing.xs,
                  paddingVertical: theme.spacing.sm,
                  paddingHorizontal: theme.spacing.md,
                  borderRadius: theme.borderRadius.md,
                  backgroundColor: `${colors.error}15`,
                  minHeight: 44,
                }}
              >
                <Ionicons
                  name="trash-outline"
                  size={theme.iconSizes.sm}
                  color={colors.error}
                />
                <Text
                  style={[
                    theme.typography.label,
                    {
                      color: colors.error,
                    },
                  ]}
                >
                  Eliminar
                </Text>
              </Pressable>
            </Animated.View>
          </View>

          {/* Favorites List */}
          <FlatList
            data={favorites}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <RecipeCardItem
                recipe={item}
                onPress={() => handleRecipePress(item.id)}
              />
            )}
            contentContainerStyle={{
              paddingHorizontal: theme.screenMargins.horizontal,
              paddingTop: theme.spacing.lg,
              paddingBottom: theme.spacing.xl,
            }}
            showsVerticalScrollIndicator={false}
          />
        </>
      )}
    </SafeAreaView>
  );
}
