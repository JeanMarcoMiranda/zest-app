import { CategoryFilter, SearchBar } from "@/src/components/common";
import { useTheme } from "@/src/hooks";
import { BlurView } from "expo-blur";
import React from "react";
import { Animated, Platform, View } from "react-native";

interface FilterSectionProps {
  showFilters: boolean;
  filterOpacity: Animated.Value | Animated.AnimatedInterpolation<number>;
  filterHeight: Animated.Value | Animated.AnimatedInterpolation<number>;
  categories: string[];
  selectedCategory: string | null;
  onSearch: (query: string) => void;
  onClear: () => void;
  onSelectCategory: (category: string | null) => void;
}

export const FilterSection: React.FC<FilterSectionProps> = ({
  showFilters,
  filterOpacity,
  filterHeight,
  categories,
  selectedCategory,
  onSearch,
  onClear,
  onSelectCategory,
}) => {
  const theme = useTheme();
  const { colors, isDark } = theme;

  return (
    <Animated.View
      style={{
        paddingTop: theme.spacing.sm,
        paddingBottom: theme.spacing.sm,
        zIndex: 999,
        opacity: filterOpacity,
        maxHeight: filterHeight.interpolate({
          inputRange: [0, 1],
          outputRange: [0, 320],
        }),
        transform: [
          {
            translateY: filterHeight.interpolate({
              inputRange: [0, 1],
              outputRange: [-10, 0],
            }),
          },
        ],
        overflow: "hidden",
      }}
      pointerEvents={showFilters ? "auto" : "none"}
    >
      {/* SearchBar con fondo translúcido y blur */}
      {Platform.OS === "ios" ? (
        <View
          style={{
            marginHorizontal: theme.spacing.md,
            borderRadius: theme.borderRadius.md,
            overflow: "hidden",
            borderWidth: 1,
            borderColor: colors.border,
          }}
        >
          <BlurView
            intensity={60}
            tint={isDark ? "dark" : "light"}
            style={{ overflow: "hidden" }}
          >
            <SearchBar
              placeholder="Buscar recetas..."
              onSearch={onSearch}
              onClear={onClear}
            />
          </BlurView>
        </View>
      ) : (
        <View
          style={{
            marginHorizontal: theme.spacing.md,
            borderRadius: theme.borderRadius.md,
            overflow: "hidden",
            backgroundColor: isDark
              ? "rgba(42, 38, 34, 0.88)"
              : "rgba(255, 255, 255, 0.85)",
            borderWidth: 1,
            borderColor: colors.border,
          }}
        >
          <SearchBar
            placeholder="Buscar recetas..."
            onSearch={onSearch}
            onClear={onClear}
          />
        </View>
      )}

      {/* Category pills */}
      <View style={{ marginTop: theme.spacing.sm }}>
        <CategoryFilter
          categories={categories}
          selectedCategory={selectedCategory}
          onSelectCategory={onSelectCategory}
        />
      </View>
    </Animated.View>
  );
};
