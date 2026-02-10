import { useTheme } from "@/src/hooks";
import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { Animated, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

interface HomeHeaderProps {
  scrollY: Animated.Value;
  searchQuery: string;
  selectedCategory: string | null;
  favoritesCount: number;
  recipesCount: number;
  loading: boolean;
}

export const HomeHeader: React.FC<HomeHeaderProps> = ({
  scrollY,
  searchQuery,
  selectedCategory,
  favoritesCount,
  recipesCount,
  loading,
}) => {
  const theme = useTheme();
  const { colors, isDark } = theme;
  const insets = useSafeAreaInsets();

  // El fondo se vuelve más opaco al hacer scroll
  const headerBgOpacity = scrollY.interpolate({
    inputRange: [0, 80],
    outputRange: [0, isDark ? 0.9 : 0.85],
    extrapolate: "clamp",
  });

  const getContextLabel = () => {
    if (searchQuery) return `"${searchQuery}"`;
    if (selectedCategory) return selectedCategory;
    return "Descubre";
  };

  const getContextIcon = (): keyof typeof Ionicons.glyphMap => {
    if (searchQuery) return "search-outline";
    if (selectedCategory) return "restaurant";
    return "sparkles";
  };

  return (
    <View
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 1000,
        paddingTop: insets.top,
      }}
    >
      {/* Fondo animado que aparece al scroll */}
      <Animated.View
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: isDark ? "rgba(28,25,23,1)" : "rgba(253,252,240,1)",
          opacity: headerBgOpacity,
          borderBottomWidth: 1,
          borderBottomColor: isDark
            ? "rgba(68,64,60,0.3)"
            : "rgba(231,229,228,0.5)",
        }}
      />

      {/* Contenido del header */}
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          paddingHorizontal: theme.spacing.lg,
          paddingVertical: theme.spacing.sm + 2,
        }}
      >
        {/* Logo / Nombre */}
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            gap: theme.spacing.sm,
          }}
        >
          <View
            style={{
              width: 36,
              height: 36,
              borderRadius: theme.borderRadius.sm,
              backgroundColor: colors.primary,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Ionicons name="restaurant" size={18} color={colors.onPrimary} />
          </View>
          <View>
            <Text
              style={[
                theme.typography.h3,
                { color: colors.text, lineHeight: 20 },
              ]}
            >
              ChefHub
            </Text>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                gap: 3,
              }}
            >
              <Ionicons
                name={getContextIcon()}
                size={10}
                color={colors.primary}
              />
              <Text
                style={[
                  theme.typography.caption,
                  { color: colors.textSecondary, fontSize: 10 },
                ]}
              >
                {getContextLabel()}
              </Text>
            </View>
          </View>
        </View>

        {/* Badges derecha */}
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            gap: theme.spacing.sm,
          }}
        >
          {favoritesCount > 0 && (
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                gap: 3,
                paddingHorizontal: theme.spacing.sm,
                paddingVertical: theme.spacing.xs,
                borderRadius: theme.borderRadius.full,
                backgroundColor: isDark
                  ? "rgba(255,71,87,0.15)"
                  : "rgba(255,71,87,0.1)",
              }}
            >
              <Ionicons name="heart" size={12} color="#FF4757" />
              <Text
                style={[
                  theme.typography.caption,
                  { color: "#FF4757", fontWeight: "700", fontSize: 11 },
                ]}
              >
                {favoritesCount}
              </Text>
            </View>
          )}
          {!loading && recipesCount > 0 && (
            <View
              style={{
                paddingHorizontal: theme.spacing.sm + 2,
                paddingVertical: theme.spacing.xs,
                borderRadius: theme.borderRadius.full,
                backgroundColor: isDark
                  ? "rgba(217,119,6,0.15)"
                  : "rgba(146,64,14,0.1)",
              }}
            >
              <Text
                style={[
                  theme.typography.caption,
                  {
                    color: colors.primary,
                    fontWeight: "700",
                    fontSize: 11,
                  },
                ]}
              >
                {recipesCount}
              </Text>
            </View>
          )}
        </View>
      </View>
    </View>
  );
};
