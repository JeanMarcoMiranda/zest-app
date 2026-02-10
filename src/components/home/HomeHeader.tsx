import { useTheme } from "@/src/hooks";
import { spacing, typography } from "@/src/theme";
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

const fontSize = {
  sm: typography.fontSize.sm,
  md: typography.fontSize.base,
};

const borderRadius = {
  round: 9999,
  xl: 16,
};

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
  const { colors } = useTheme();
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

  const shadows = {
    md: {
      shadowColor: colors.primaryDark,
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.15,
      shadowRadius: 12,
      elevation: 4,
    },
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
          shadows.md,
          { backgroundColor: colors.primary },
        ]}
      >
        {/* Safe area top espaciado (handled by parent or here? Parent passes animated height adding insets, 
            but we need actual padding view inside if we want to push content down. 
            Actually index.tsx added insets.top to height. 
            We should probably handle the spacer here to match original structure) */}
        <View style={{ height: insets.top }} />

        <View style={styles.header}>
          <Animated.View
            style={[styles.headerTop, { transform: [{ scale: titleScale }] }]}
          >
            <View style={styles.titleContainer}>
              <View
                style={[
                  styles.logoContainer,
                  {
                    backgroundColor: "rgba(255, 255, 255, 0.2)",
                    borderColor: "rgba(255, 255, 255, 0.3)",
                  },
                ]}
              >
                <Ionicons
                  name="restaurant"
                  size={28}
                  color={colors.textInverse}
                />
              </View>
              <View style={styles.titleContent}>
                <Text style={[styles.title, { color: colors.textInverse }]}>
                  ChefHub
                </Text>
                <View style={styles.subtitleRow}>
                  <Ionicons
                    name={getHeaderIcon()}
                    size={14}
                    color={colors.textInverse}
                    style={{ opacity: 0.9 }}
                  />
                  <Text
                    style={[styles.subtitle, { color: colors.textInverse }]}
                  >
                    {getHeaderMessage()}
                  </Text>
                </View>
              </View>
            </View>

            <View style={styles.headerActions}>
              {!loading && recipesCount > 0 && (
                <View
                  style={[
                    styles.recipeBadge,
                    {
                      backgroundColor: "rgba(255, 255, 255, 0.25)",
                      borderColor: "rgba(255, 255, 255, 0.4)",
                    },
                  ]}
                >
                  <Text
                    style={[
                      styles.recipeBadgeText,
                      { color: colors.textInverse },
                    ]}
                  >
                    {recipesCount}
                  </Text>
                </View>
              )}
              <TouchableOpacity
                onPress={onToggleFilters}
                style={[
                  styles.filterToggle,
                  {
                    backgroundColor: "rgba(255, 255, 255, 0.15)",
                    borderColor: "rgba(255, 255, 255, 0.25)",
                  },
                ]}
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
  header: {
    flex: 1,
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
    justifyContent: "center",
  },
  headerTop: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  titleContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.md,
    flex: 1,
  },
  logoContainer: {
    width: 56,
    height: 56,
    borderRadius: borderRadius.xl,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1.5,
  },
  titleContent: {
    flex: 1,
    justifyContent: "center",
  },
  title: {
    fontSize: 28,
    fontWeight: "800",
    letterSpacing: -0.5,
    marginBottom: 2,
  },
  subtitleRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.xs,
  },
  subtitle: {
    fontSize: fontSize.sm,
    fontWeight: "600",
    opacity: 0.95,
  },
  headerActions: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.sm,
  },
  recipeBadge: {
    borderRadius: borderRadius.round,
    paddingHorizontal: spacing.md,
    paddingVertical: 6,
    minWidth: 44,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1.5,
  },
  recipeBadgeText: {
    fontSize: fontSize.md,
    fontWeight: "700",
  },
  filterToggle: {
    width: 48,
    height: 48,
    borderRadius: borderRadius.round,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1.5,
  },
});
