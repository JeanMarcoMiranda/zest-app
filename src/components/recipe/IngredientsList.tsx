import { useTheme } from "@/src/hooks";
import { Ingredient } from "@/src/types/recipe.types";
import React from "react";
import { Text, View } from "react-native";

interface IngredientsListProps {
  ingredients: Ingredient[];
}

export const IngredientsList: React.FC<IngredientsListProps> = ({
  ingredients,
}) => {
  const theme = useTheme();
  const { colors, isDark } = theme;

  if (!ingredients || ingredients.length === 0) return null;

  return (
    <View style={{ marginBottom: theme.spacing.xl }}>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          marginBottom: theme.spacing.md,
          paddingHorizontal: theme.spacing.xs,
        }}
      >
        <Text style={[theme.typography.h3, { color: colors.text }]}>
          Ingredientes
        </Text>
        <View
          style={{
            backgroundColor: isDark
              ? "rgba(255,255,255,0.1)"
              : "rgba(0,0,0,0.05)",
            paddingHorizontal: theme.spacing.sm,
            paddingVertical: 2,
            borderRadius: 12,
            marginLeft: theme.spacing.sm,
          }}
        >
          <Text
            style={[
              theme.typography.caption,
              {
                color: colors.textSecondary,
                fontWeight: "600",
              },
            ]}
          >
            {ingredients.length} items
          </Text>
        </View>
      </View>

      <View
        style={{
          backgroundColor: isDark
            ? "rgba(255,255,255,0.02)"
            : "rgba(0,0,0,0.02)",
          borderRadius: theme.borderRadius.lg,
          padding: theme.spacing.sm,
        }}
      >
        {ingredients.map((ingredient, index) => (
          <View
            key={index}
            style={{
              flexDirection: "row",
              alignItems: "center",
              paddingVertical: theme.spacing.sm,
              paddingHorizontal: theme.spacing.xs,
              borderBottomWidth: index < ingredients.length - 1 ? 1 : 0,
              borderBottomColor: isDark
                ? "rgba(255,255,255,0.05)"
                : "rgba(0,0,0,0.03)",
            }}
          >
            <View
              style={{
                width: 6,
                height: 6,
                borderRadius: 3,
                backgroundColor: colors.primary,
                marginRight: theme.spacing.md,
                opacity: 0.8,
              }}
            />
            <Text
              style={[
                theme.typography.bodyLg,
                {
                  color: colors.primary,
                  fontWeight: "700",
                  marginRight: theme.spacing.sm,
                },
              ]}
            >
              {ingredient.measure}
            </Text>
            <Text
              style={[
                theme.typography.bodyLg,
                {
                  flex: 1,
                  color: colors.text,
                },
              ]}
            >
              {ingredient.name}
            </Text>
          </View>
        ))}
      </View>
    </View>
  );
};
