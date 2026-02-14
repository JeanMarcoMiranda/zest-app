import { EmptyState } from "@/src/components/common";
import { RecipeCard } from "@/src/components/recipe";
import { useFavorites, useTheme } from "@/src/hooks";
import { layout } from "@/src/theme";
import { Ionicons } from "@expo/vector-icons";
import { BlurView } from "expo-blur";
import { useRouter } from "expo-router";
import React, { useEffect } from "react";
import {
  Alert,
  Pressable,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from "react-native";
import Animated, {
  Extrapolation,
  interpolate,
  useAnimatedScrollHandler,
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withSequence,
  withSpring,
  withTiming,
} from "react-native-reanimated";
import { useSafeAreaInsets } from "react-native-safe-area-context";

// Sync with tab bar layout
const TAB_BAR_HEIGHT = layout.tabBarHeight;

export default function FavoritesScreen() {
  const router = useRouter();
  const { favorites, loading, clearAllFavorites } = useFavorites();
  const theme = useTheme();
  const { colors, isDark } = theme;
  const insets = useSafeAreaInsets();

  // Scroll value for header animation
  const scrollY = useSharedValue(0);
  const scrollHandler = useAnimatedScrollHandler({
    onScroll: (event) => {
      scrollY.value = event.contentOffset.y;
    },
  });

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

  // Header Animation Styles
  const headerContentStyle = useAnimatedStyle(() => {
    const opacity = interpolate(
      scrollY.value,
      [0, 40],
      [1, 0],
      Extrapolation.CLAMP,
    );
    const translateY = interpolate(
      scrollY.value,
      [0, 40],
      [0, -10],
      Extrapolation.CLAMP,
    );

    return {
      opacity,
      transform: [{ translateY }],
    };
  });

  const miniHeaderStyle = useAnimatedStyle(() => {
    const opacity = interpolate(
      scrollY.value,
      [30, 60],
      [0, 1],
      Extrapolation.CLAMP,
    );
    const translateY = interpolate(
      scrollY.value,
      [30, 60],
      [10, 0],
      Extrapolation.CLAMP,
    );

    return {
      opacity,
      transform: [{ translateY }],
    };
  });

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

  const headerTotalHeight = insets.top + 60; // Fixed header height for safe area + content

  return (
    <View style={{ flex: 1, backgroundColor: colors.background }}>
      <StatusBar
        barStyle={isDark ? "light-content" : "dark-content"}
        backgroundColor="transparent"
        translucent={true}
      />

      {/* Glass Header */}
      <View
        style={[StyleSheet.absoluteFill, { bottom: undefined, zIndex: 10 }]}
      >
        <BlurView
          intensity={layout.blur.regular}
          tint={isDark ? "dark" : "light"}
          style={{
            paddingTop: insets.top,
            paddingHorizontal: theme.spacing.md,
            paddingBottom: theme.spacing.sm,
            borderBottomWidth: 1,
            borderBottomColor: isDark
              ? "rgba(255,255,255,0.1)"
              : "rgba(0,0,0,0.05)",
          }}
        >
          <View
            style={{
              height: 50,
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <View style={{ flex: 1, justifyContent: "center" }}>
              {/* Expanded Title (fades out on scroll) */}
              <Animated.Text
                style={[
                  theme.typography.h2,
                  {
                    color: colors.text,
                    position: "absolute",
                    width: "100%",
                  },
                  headerContentStyle,
                ]}
              >
                Favoritos
              </Animated.Text>

              {/* Collapsed Title (fades in on scroll) */}
              <Animated.Text
                style={[
                  theme.typography.h3,
                  {
                    color: colors.text,
                    position: "absolute",
                    width: "100%",
                    textAlign: "center", // Center title when collapsed for typical iOS feel
                  },
                  miniHeaderStyle,
                ]}
              >
                Favoritos
              </Animated.Text>
            </View>

            {/* Actions - Always visible if favorites exist */}
            {favorites.length > 0 && (
              <Animated.View
                style={[{ zIndex: 20 }, animatedDeleteButtonStyle]}
              >
                <Pressable
                  onPress={handleClearAll}
                  onPressIn={handleDeletePressIn}
                  onPressOut={handleDeletePressOut}
                  style={({ pressed }) => ({
                    opacity: pressed ? 0.7 : 1,
                    padding: 8,
                    backgroundColor: isDark
                      ? "rgba(239,68,68,0.15)"
                      : "rgba(239,68,68,0.1)",
                    borderRadius: theme.borderRadius.full,
                  })}
                >
                  <Ionicons
                    name="trash-outline"
                    size={20}
                    color={colors.error}
                  />
                </Pressable>
              </Animated.View>
            )}
          </View>
        </BlurView>
      </View>

      {/* Main Content */}
      <Animated.FlatList
        data={favorites}
        keyExtractor={(item) => item.id}
        onScroll={scrollHandler}
        scrollEventThrottle={16}
        contentContainerStyle={{
          paddingTop: headerTotalHeight + theme.spacing.sm, // Push content down
          paddingBottom: tabBarTotalHeight + theme.spacing.md,
          paddingHorizontal: theme.spacing.sm + 4,
          flexGrow: 1, // Ensure empty state centering works
        }}
        renderItem={({ item }) => (
          <RecipeCard
            recipe={item}
            variant="list"
            onPress={() => handleRecipePress(item.id)}
          />
        )}
        ListEmptyComponent={
          <EmptyState
            centerInContainer
            customIcon={
              <Animated.View style={animatedHeartStyle}>
                <View
                  style={{
                    width: 120,
                    height: 120,
                    borderRadius: 60,
                    backgroundColor: isDark
                      ? "rgba(255,255,255,0.05)"
                      : "rgba(0,0,0,0.03)",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <Ionicons
                    name="heart"
                    size={64}
                    color={colors.primary}
                    style={{
                      shadowColor: colors.primary,
                      shadowOffset: { width: 0, height: 4 },
                      shadowOpacity: 0.3,
                      shadowRadius: 8,
                    }}
                  />
                </View>
              </Animated.View>
            }
            title="Tu recetario está vacío"
            message="Explora nuestra colección y guarda las recetas que más te gusten para tenerlas siempre a mano."
            style={{
              marginTop: theme.spacing.xl * 2,
            }}
          />
        }
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
}
