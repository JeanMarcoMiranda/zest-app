import { useTheme } from "@/src/hooks";
import { layout } from "@/src/theme";
import { Ionicons } from "@expo/vector-icons";
import { BlurView } from "expo-blur";
import React from "react";
import { Animated, Platform, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

interface HomeHeaderProps {
  scrollY: Animated.Value;
  searchQuery: string;
  selectedCategory: string | null;
  favoritesCount: number;
  recipesCount: number;
  loading: boolean;
}

// Altura del header sin contar el status bar
const HEADER_CONTENT_HEIGHT = layout.headerHeight;

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

  // El fondo se vuelve más opaco al hacer scroll (70-90% según las normas)
  const headerBgOpacity = scrollY.interpolate({
    inputRange: [0, 60],
    outputRange: [0.7, 0.9],
    extrapolate: "clamp",
  });

  // Intensidad del blur disminuye al hacer scroll (cuando hay más opacidad)
  const blurIntensity = scrollY.interpolate({
    inputRange: [0, 60],
    outputRange: [layout.blur.regular, layout.blur.light],
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

  // Color de fondo RGBA para el header
  const headerBgColor = isDark
    ? "rgba(30, 27, 24, 1)" // Espresso con alpha variable
    : "rgba(252, 248, 242, 1)"; // Parchment con alpha variable

  return (
    <View
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 1000,
        height: insets.top + HEADER_CONTENT_HEIGHT,
      }}
    >
      {/* Fondo con blur y opacidad animada */}
      {Platform.OS === "ios" ? (
        <Animated.View
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            opacity: headerBgOpacity,
            overflow: "hidden",
          }}
        >
          <BlurView
            intensity={blurIntensity as any}
            tint={isDark ? "dark" : "light"}
            style={{
              flex: 1,
              borderBottomWidth: 1,
              borderBottomColor: colors.border,
            }}
          />
        </Animated.View>
      ) : (
        // Android: usar fondo semi-transparente animado
        <Animated.View
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: headerBgColor,
            opacity: headerBgOpacity,
            borderBottomWidth: 1,
            borderBottomColor: colors.border,
          }}
        />
      )}

      {/* Contenido del header */}
      <View
        style={{
          flex: 1,
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          paddingTop: insets.top,
          paddingHorizontal: theme.spacing.lg,
          paddingBottom: theme.spacing.xs + 2,
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
              <Ionicons name="heart" size={10} color={colors.error} />
              <Text
                style={[
                  theme.typography.caption,
                  { color: colors.error, fontWeight: "700", fontSize: 9 },
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
