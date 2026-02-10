import { CategoryFilter, SearchBar } from "@/src/components/common";
import { useTheme } from "@/src/hooks";
import { spacing } from "@/src/theme";
import React from "react";
import { Animated, StyleSheet } from "react-native";

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

const borderRadius = {
  xl: 16,
};

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
  const { colors } = useTheme();

  const shadows = {
    sm: {
      shadowColor: colors.primaryDark,
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 4,
      elevation: 2,
    },
  };

  return (
    <Animated.View
      style={[
        styles.filtersContainer,
        shadows.sm,
        {
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

const styles = StyleSheet.create({
  filtersContainer: {
    paddingTop: spacing.lg,
    paddingBottom: spacing.md,
    borderBottomLeftRadius: borderRadius.xl,
    borderBottomRightRadius: borderRadius.xl,
    zIndex: 999,
  },
});
