import { useTheme } from "@/src/hooks";
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
  const theme = useTheme();
  const { colors } = theme;

  return (
    <View style={[styles.container, { borderBottomColor: colors.divider }]}>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{
          paddingHorizontal: theme.spacing.md,
          paddingVertical: theme.spacing.sm,
          gap: theme.spacing.sm,
        }}
      >
        {/* Botón "Todos" */}
        <TouchableOpacity
          style={[
            {
              paddingHorizontal: theme.spacing.sm + 4,
              paddingVertical: theme.spacing.xs + 1,
              borderRadius: theme.borderRadius.full,
              borderWidth: 0.5,
              backgroundColor: colors.background,
              borderColor: colors.divider,
            },
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
              theme.typography.caption,
              { color: colors.text, textTransform: "none" },
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
              {
                paddingHorizontal: theme.spacing.sm + 4,
                paddingVertical: theme.spacing.xs + 1,
                borderRadius: theme.borderRadius.full,
                borderWidth: 0.5,
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
                theme.typography.caption,
                { color: colors.text, textTransform: "none" },
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

const styles = StyleSheet.create({
  container: {
    borderBottomWidth: 0,
  },
});

export default CategoryFilter;
