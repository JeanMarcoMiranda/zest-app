import React from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { colors, fontSize, shadows, spacing } from "../../styles/theme";
import { RecipeCard } from "../../types/recipe.types";

interface RecipeCardItemProps {
  recipe: RecipeCard;
  onPress: () => void;
}

const RecipeCardItem: React.FC<RecipeCardItemProps> = ({ recipe, onPress }) => {
  return (
    <TouchableOpacity style={styles.card} onPress={onPress} activeOpacity={0.7}>
      <Image
        source={{ uri: recipe.thumbnail }}
        style={styles.image}
        resizeMode="cover"
      />
      <View style={styles.content}>
        <Text style={styles.title} numberOfLines={2}>
          {recipe.title}
        </Text>
        <View style={styles.infoRow}>
          {recipe.category && (
            <View style={styles.tag}>
              <Text style={styles.tagText}>{recipe.category}</Text>
            </View>
          )}
          {recipe.area && (
            <View style={[styles.tag, styles.tagArea]}>
              <Text style={styles.tagText}>🌍 {recipe.area}</Text>
            </View>
          )}
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.surface,
    borderRadius: 12,
    marginBottom: spacing.md,
    overflow: "hidden",
    ...shadows.md,
  },
  image: {
    width: "100%",
    height: 200,
    backgroundColor: colors.divider,
  },
  content: {
    padding: spacing.md,
  },
  title: {
    fontSize: fontSize.lg,
    fontWeight: "600",
    color: colors.text,
    marginBottom: spacing.sm,
  },
  infoRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: spacing.xs,
  },
  tag: {
    backgroundColor: colors.primaryLight,
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs,
    borderRadius: 6,
  },
  tagArea: {
    backgroundColor: colors.secondaryLight,
  },
  tagText: {
    fontSize: fontSize.xs,
    color: colors.surface,
    fontWeight: "600",
  },
});

export default RecipeCardItem;
