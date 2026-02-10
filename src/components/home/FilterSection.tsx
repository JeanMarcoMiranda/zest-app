import { CategoryFilter, SearchBar } from "@/src/components/common";
import { useTheme } from "@/src/hooks";
import { createShadow } from "@/src/utils";
import React from "react";
import { Animated } from "react-native";

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
  const { colors } = theme;

  return (
    <Animated.View
      style={[
        {
          paddingTop: theme.spacing.lg,
          paddingBottom: theme.spacing.md,
          borderBottomLeftRadius: theme.borderRadius.xl,
          borderBottomRightRadius: theme.borderRadius.xl,
          zIndex: 999,
          backgroundColor: colors.background,
          opacity: filterOpacity,
          maxHeight: filterHeight.interpolate({
            inputRange: [0, 1],
            outputRange: [0, 320],
          }),
          transform: [
            {
              translateY: filterHeight.interpolate({
                inputRange: [0, 1],
                outputRange: [-20, 0],
              }),
            },
          ],
          ...createShadow(theme as any, theme.elevation.low),
        },
      ]}
      pointerEvents={showFilters ? "auto" : "none"}
    >
      <SearchBar
        placeholder="Buscar recetas..."
        onSearch={onSearch}
        onClear={onClear}
      />
      <CategoryFilter
        categories={categories}
        selectedCategory={selectedCategory}
        onSelectCategory={onSelectCategory}
      />
    </Animated.View>
  );
};
