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
          backgroundColor: colors.background,
          opacity: headerBgOpacity,
          borderBottomWidth: 1,
          borderBottomColor: colors.border,
        }}
      />

      {/* Contenido del header */}
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          paddingHorizontal: theme.spacing.lg,
          paddingVertical: theme.spacing.xs + 2,
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
              width: 30,
              height: 30,
              borderRadius: theme.borderRadius.sm,
              backgroundColor: colors.primary,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Ionicons name="restaurant" size={15} color={colors.onPrimary} />
          </View>
          <View>
            <Text
              style={[
                theme.typography.label,
                { color: colors.text, lineHeight: 18 },
              ]}
            >
              Zest
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
                size={9}
                color={colors.primary}
              />
              <Text
                style={[
                  theme.typography.caption,
                  { color: colors.textSecondary, fontSize: 9 },
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
            gap: 6,
          }}
        >
          {favoritesCount > 0 && (
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                gap: 3,
                paddingHorizontal: theme.spacing.sm - 2,
                paddingVertical: theme.spacing.xs - 1,
                borderRadius: theme.borderRadius.full,
                backgroundColor: isDark
                  ? colors.error + "25"
                  : colors.error + "15",
              }}
            >
              <Ionicons name="heart" size={10} color={colors.error} />{" "}
              {/* Smaller badge icon */}
              <Text
                style={[
                  theme.typography.caption,
                  { color: colors.error, fontWeight: "700", fontSize: 9 }, // Smaller badge font size
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
                  ? colors.primary + "25"
                  : colors.primary + "15",
              }}
            >
              <Text
                style={[
                  theme.typography.caption,
                  {
                    color: colors.primary,
                    fontWeight: "700",
                    fontSize: 10,
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
