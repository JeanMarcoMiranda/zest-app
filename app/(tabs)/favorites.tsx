import { RecipeCardItem } from "@/src/components/recipe";
import { useFavorites, useTheme } from "@/src/hooks";
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
import { useSafeAreaInsets } from "react-native-safe-area-context";

// Sync with tab bar layout
const TAB_BAR_HEIGHT = 48;

export default function FavoritesScreen() {
  const router = useRouter();
  const { favorites, loading, clearAllFavorites } = useFavorites();
  const theme = useTheme();
  const { colors, isDark } = theme;
  const insets = useSafeAreaInsets();

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
    return (
      <View
        style={{
          flex: 1,
          backgroundColor: colors.background,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Text
          style={[theme.typography.bodySm, { color: colors.textSecondary }]}
        >
          Cargando favoritos...
        </Text>
      </View>
    );
  }

  const tabBarTotalHeight =
    TAB_BAR_HEIGHT +
    Math.max(insets.bottom, theme.spacing.sm) +
    theme.spacing.sm;

  return (
    <View style={{ flex: 1, backgroundColor: colors.background }}>
      {/* Edge-to-edge StatusBar */}
      <StatusBar
        barStyle={isDark ? "light-content" : "dark-content"}
        backgroundColor="transparent"
        translucent={true}
      />

      {favorites.length === 0 ? (
        // Empty State — centered with insets
        <View
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            paddingHorizontal: theme.spacing.xl,
            paddingTop: insets.top,
            paddingBottom: tabBarTotalHeight,
          }}
        >
          <Animated.View style={animatedHeartStyle}>
            <Ionicons
              name="heart-outline"
              size={80}
              color={colors.primary}
              style={{ marginBottom: theme.spacing.lg }}
            />
          </Animated.View>

          <Text
            style={[
              theme.typography.h2,
              {
                color: colors.text,
                marginBottom: theme.spacing.sm,
                textAlign: "center",
              },
            ]}
          >
            No tienes favoritos
          </Text>

          <Text
            style={[
              theme.typography.bodySm,
              {
                color: colors.textSecondary,
                textAlign: "center",
                maxWidth: 280,
              },
            ]}
          >
            Explora recetas deliciosas y guarda tus favoritas tocando el corazón
          </Text>
        </View>
      ) : (
        <FlatList
          data={favorites}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <RecipeCardItem
              recipe={item}
              onPress={() => handleRecipePress(item.id)}
            />
          )}
          ListHeaderComponent={
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
                paddingTop: insets.top + theme.spacing.md,
                paddingBottom: theme.spacing.sm,
                paddingHorizontal: theme.spacing.sm + 4,
              }}
            >
              {/* Count */}
              <Text
                style={[
                  theme.typography.label,
                  { color: colors.textSecondary },
                ]}
              >
                {favorites.length}{" "}
                {favorites.length === 1
                  ? "receta guardada"
                  : "recetas guardadas"}
              </Text>

              {/* Delete All */}
              <Animated.View style={animatedDeleteButtonStyle}>
                <Pressable
                  onPress={handleClearAll}
                  onPressIn={handleDeletePressIn}
                  onPressOut={handleDeletePressOut}
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    gap: 4,
                    paddingVertical: theme.spacing.xs,
                    paddingHorizontal: theme.spacing.sm,
                    borderRadius: theme.borderRadius.full,
                    backgroundColor: isDark
                      ? "rgba(239,68,68,0.15)"
                      : "rgba(239,68,68,0.08)",
                  }}
                >
                  <Ionicons
                    name="trash-outline"
                    size={14}
                    color={colors.error}
                  />
                  <Text
                    style={[
                      theme.typography.caption,
                      {
                        color: colors.error,
                        textTransform: "none",
                        fontWeight: "500",
                      },
                    ]}
                  >
                    Eliminar todo
                  </Text>
                </Pressable>
              </Animated.View>
            </View>
          }
          contentContainerStyle={{
            paddingHorizontal: theme.spacing.sm + 4,
            paddingBottom: tabBarTotalHeight + theme.spacing.md,
          }}
          showsVerticalScrollIndicator={false}
        />
      )}
    </View>
  );
}
