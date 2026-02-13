import { CategoryFilter, GlassView, SearchBar } from "@/src/components/common";
import { useTheme } from "@/src/hooks";
import React from "react";
import { Animated, View } from "react-native";

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
      {/* SearchBar con fondo translúcido y blur */}
      <GlassView
        intensity={60}
        borderRadius={theme.borderRadius.md}
        style={{
          marginHorizontal: theme.spacing.md,
          borderWidth: 1,
          borderColor: colors.border,
        }}
      >
        <SearchBar
          placeholder="Buscar recetas..."
          onSearch={onSearch}
          onClear={onClear}
        />
      </GlassView>

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
