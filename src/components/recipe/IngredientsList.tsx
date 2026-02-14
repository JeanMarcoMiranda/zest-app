import { useTheme } from "@/src/hooks";
import { Ingredient } from "@/src/types/recipe.types";
import { Ionicons } from "@expo/vector-icons";
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
    <View style={{ marginBottom: theme.spacing.lg }}>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          gap: theme.spacing.xs,
          marginBottom: theme.spacing.sm,
        }}
      >
        <Ionicons name="restaurant-outline" size={18} color={colors.primary} />
        <Text style={[theme.typography.h3, { color: colors.text }]}>
          Ingredientes
        </Text>
        <Text
          style={[
            theme.typography.caption,
            {
              color: colors.textSecondary,
              textTransform: "none",
              marginLeft: 4,
            },
          ]}
        >
          ({ingredients.length})
        </Text>
      </View>

      <View
        style={{
          padding: theme.spacing.md,
          borderRadius: theme.borderRadius.md,
          backgroundColor: isDark
            ? "rgba(255,255,255,0.04)"
            : "rgba(0,0,0,0.02)",
          borderWidth: 0.5,
          borderColor: isDark ? "rgba(255,255,255,0.06)" : "rgba(0,0,0,0.05)",
        }}
      >
        {ingredients.map((ingredient, index) => (
          <View
            key={index}
            style={{
              flexDirection: "row",
              paddingVertical: theme.spacing.xs + 1,
              borderBottomWidth: index < ingredients.length - 1 ? 0.5 : 0,
              borderBottomColor: isDark
                ? "rgba(255,255,255,0.04)"
                : "rgba(0,0,0,0.04)",
            }}
          >
            <Text
              style={[
                theme.typography.bodySm,
                {
                  color: colors.primary,
                  fontWeight: "600",
                  minWidth: 80,
                },
              ]}
            >
              {ingredient.measure}
            </Text>
            <Text
              style={[
                theme.typography.bodySm,
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
