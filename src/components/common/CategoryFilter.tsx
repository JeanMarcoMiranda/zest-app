import { useTheme } from "@/src/hooks";
import { borderRadius, spacing } from "@/src/theme";
import React from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

interface CategoryFilterProps {
  categories: string[];
  selectedCategory: string | null;
  onSelectCategory: (category: string | null) => void;
}

const CategoryFilter: React.FC<CategoryFilterProps> = ({
  categories,
  selectedCategory,
  onSelectCategory,
}) => {
  const { colors } = useTheme();

  return (
    <View
      style={[
        styles.container,
        { backgroundColor: colors.surface, borderBottomColor: colors.divider },
      ]}
    >
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Botón "Todos" */}
        <TouchableOpacity
          style={[
            styles.categoryButton,
            { backgroundColor: colors.background, borderColor: colors.divider },
            selectedCategory === null && {
              backgroundColor: colors.primary,
              borderColor: colors.primary,
            },
          ]}
          onPress={() => onSelectCategory(null)}
          activeOpacity={0.7}
        >
          <Text
            style={[
              styles.categoryText,
              { color: colors.text },
              selectedCategory === null && {
                color: colors.textInverse,
                fontWeight: "700",
              },
            ]}
          >
            Todos
          </Text>
        </TouchableOpacity>

        {/* Botones de categorías */}
        {categories.map((category) => (
          <TouchableOpacity
            key={category}
            style={[
              styles.categoryButton,
              {
                backgroundColor: colors.background,
                borderColor: colors.divider,
              },
              selectedCategory === category && {
                backgroundColor: colors.primary,
                borderColor: colors.primary,
              },
            ]}
            onPress={() => onSelectCategory(category)}
            activeOpacity={0.7}
          >
            <Text
              style={[
                styles.categoryText,
                { color: colors.text },
                selectedCategory === category && {
                  color: colors.textInverse,
                  fontWeight: "700",
                },
              ]}
            >
              {category}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
};

// Extraer valores del tema para usar en StyleSheet.create()
const labelStyles = {
  fontFamily: "Inter-SemiBold",
  fontSize: 14,
  fontWeight: "600" as const,
  lineHeight: 1.5,
  letterSpacing: 0,
};

const styles = StyleSheet.create({
  container: {
    borderBottomWidth: 1,
  },
  scrollContent: {
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    gap: spacing.sm,
  },
  categoryButton: {
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    borderRadius: borderRadius.full,
    borderWidth: 1,
  },
  categoryText: {
    ...labelStyles,
  },
});

export default CategoryFilter;
