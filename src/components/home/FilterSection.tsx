import { CategoryFilter, SearchBar } from "@/src/components/common";
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
  const { isDark } = theme;

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
      {/* SearchBar con fondo translúcido */}
      <View
        style={{
          marginHorizontal: theme.spacing.xs,
          borderRadius: theme.borderRadius.sm,
          overflow: "hidden",
          backgroundColor: isDark
            ? "rgba(41,37,36,0.7)"
            : "rgba(255,255,255,0.8)",
          borderWidth: 1,
          borderColor: isDark ? "rgba(68,64,60,0.4)" : "rgba(231,229,228,0.6)",
        }}
      >
        <SearchBar
          placeholder="Buscar recetas..."
          onSearch={onSearch}
          onClear={onClear}
        />
      </View>

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
