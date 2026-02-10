import { useTheme } from "@/src/hooks";
import { createShadow } from "@/src/utils";
import { Ionicons } from "@expo/vector-icons";
import React from "react";
import {
  Animated,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

interface HomeHeaderProps {
  headerHeight: Animated.Value | Animated.AnimatedAddition<number>;
  headerOpacity: Animated.AnimatedInterpolation<number>;
  titleScale: Animated.AnimatedInterpolation<number>;
  searchQuery: string;
  selectedCategory: string | null;
  favoritesCount: number;
  recipesCount: number;
  loading: boolean;
  showFilters: boolean;
  onToggleFilters: () => void;
}

export const HomeHeader: React.FC<HomeHeaderProps> = ({
  headerHeight,
  headerOpacity,
  titleScale,
  searchQuery,
  selectedCategory,
  favoritesCount,
  recipesCount,
  loading,
  showFilters,
  onToggleFilters,
}) => {
  const theme = useTheme();
  const { colors } = theme;
  const insets = useSafeAreaInsets();

  const getHeaderMessage = () => {
    if (searchQuery) return `"${searchQuery}"`;
    if (selectedCategory) return selectedCategory;
    if (favoritesCount > 0) {
      return `${favoritesCount} ${
        favoritesCount === 1 ? "favorito" : "favoritos"
      }`;
    }
    return "Explora nuevas recetas";
  };

  const getHeaderIcon = () => {
    if (searchQuery) return "search-outline";
    if (selectedCategory) return "restaurant";
    if (favoritesCount > 0) return "heart";
    return "sparkles";
  };

  return (
    <Animated.View
      style={[
        styles.headerContainer,
        {
          height: headerHeight,
          opacity: headerOpacity,
        },
      ]}
    >
      <View
        style={[
          styles.headerGradient,
          {
            backgroundColor: colors.primary,
            ...createShadow(theme as any, theme.elevation.medium),
          },
        ]}
      >
        <View style={{ height: insets.top }} />

        <View
          style={{
            flex: 1,
            paddingHorizontal: theme.spacing.lg,
            paddingVertical: theme.spacing.md,
            justifyContent: "center",
          }}
        >
          <Animated.View
            style={[
              {
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
                transform: [{ scale: titleScale }],
              },
            ]}
          >
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                gap: theme.spacing.md,
                flex: 1,
              }}
            >
              <View
                style={{
                  width: 56,
                  height: 56,
                  borderRadius: theme.borderRadius.md,
                  justifyContent: "center",
                  alignItems: "center",
                  borderWidth: 1.5,
                  backgroundColor: "rgba(255, 255, 255, 0.2)",
                  borderColor: "rgba(255, 255, 255, 0.3)",
                }}
              >
                <Ionicons
                  name="restaurant"
                  size={28}
                  color={colors.textInverse}
                />
              </View>
              <View style={{ flex: 1, justifyContent: "center" }}>
                <Text
                  style={[
                    theme.typography.h1,
                    { color: colors.textInverse, marginBottom: 2 },
                  ]}
                >
                  ChefHub
                </Text>
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    gap: theme.spacing.xs,
                  }}
                >
                  <Ionicons
                    name={getHeaderIcon()}
                    size={14}
                    color={colors.textInverse}
                    style={{ opacity: 0.9 }}
                  />
                  <Text
                    style={[
                      theme.typography.caption,
                      { color: colors.textInverse, opacity: 0.95 },
                    ]}
                  >
                    {getHeaderMessage()}
                  </Text>
                </View>
              </View>
            </View>

            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                gap: theme.spacing.sm,
              }}
            >
              {!loading && recipesCount > 0 && (
                <View
                  style={{
                    borderRadius: theme.borderRadius.full,
                    paddingHorizontal: theme.spacing.md,
                    paddingVertical: 6,
                    minWidth: 44,
                    alignItems: "center",
                    justifyContent: "center",
                    borderWidth: 1.5,
                    backgroundColor: "rgba(255, 255, 255, 0.25)",
                    borderColor: "rgba(255, 255, 255, 0.4)",
                  }}
                >
                  <Text
                    style={[
                      theme.typography.button,
                      { color: colors.textInverse },
                    ]}
                  >
                    {recipesCount}
                  </Text>
                </View>
              )}
              <TouchableOpacity
                onPress={onToggleFilters}
                style={{
                  width: 48,
                  height: 48,
                  borderRadius: theme.borderRadius.full,
                  justifyContent: "center",
                  alignItems: "center",
                  borderWidth: 1.5,
                  backgroundColor: "rgba(255, 255, 255, 0.15)",
                  borderColor: "rgba(255, 255, 255, 0.25)",
                }}
                activeOpacity={0.7}
              >
                <Ionicons
                  name={showFilters ? "chevron-up" : "funnel"}
                  size={22}
                  color={colors.textInverse}
                />
              </TouchableOpacity>
            </View>
          </Animated.View>
        </View>
      </View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    overflow: "hidden",
    zIndex: 1000,
  },
  headerGradient: {
    flex: 1,
  },
});
