import { colors, spacing, typography } from "@/src/theme";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import React, { useRef } from "react";
import {
  Animated,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useFavorites } from "../../hooks";
import { RecipeCard } from "../../types/recipe.types";

// Constantes locales para compatibilidad
const fontSize = {
  xs: typography.fontSize.xs,
  sm: typography.fontSize.sm,
  md: typography.fontSize.base,
  lg: typography.fontSize.lg,
  xl: typography.fontSize.xl,
};

const borderRadius = {
  sm: 4,
  md: 8,
  lg: 12,
  xl: 16,
  round: 9999,
};

const shadows = {
  sm: {
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  md: {
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 4,
  },
  lg: {
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 8,
  },
};

const animation = {
  scale: {
    pressed: 0.97,
  },
};

const gradients = {
  overlay: ["transparent", "rgba(0,0,0,0.7)"] as const,
};

interface RecipeCardItemProps {
  recipe: RecipeCard;
  onPress: () => void;
}

const RecipeCardItem: React.FC<RecipeCardItemProps> = ({ recipe, onPress }) => {
  const { isFavorite, toggleFavorite } = useFavorites();
  const scaleAnim = useRef(new Animated.Value(1)).current;

  const handlePressIn = () => {
    Animated.spring(scaleAnim, {
      toValue: animation.scale.pressed,
      useNativeDriver: true,
    }).start();
  };

  const handlePressOut = () => {
    Animated.spring(scaleAnim, {
      toValue: 1,
      friction: 3,
      tension: 40,
      useNativeDriver: true,
    }).start();
  };

  const handleFavoritePress = (e: any) => {
    e.stopPropagation();
    toggleFavorite(recipe);
  };

  return (
    <Animated.View style={{ transform: [{ scale: scaleAnim }] }}>
      <TouchableOpacity
        style={styles.card}
        onPress={onPress}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        activeOpacity={1}
      >
        {/* Imagen con gradient overlay */}
        <View style={styles.imageContainer}>
          <Image
            source={{ uri: recipe.thumbnail }}
            style={styles.image}
            resizeMode="cover"
          />
          <LinearGradient colors={gradients.overlay} style={styles.gradient} />

          {/* Botón de favorito */}
          <TouchableOpacity
            style={styles.favoriteButton}
            onPress={handleFavoritePress}
            activeOpacity={0.7}
          >
            <Ionicons
              name={isFavorite(recipe.id) ? "heart" : "heart-outline"}
              size={22}
              color={isFavorite(recipe.id) ? colors.error : colors.surface}
            />
          </TouchableOpacity>
        </View>

        {/* Contenido */}
        <View style={styles.content}>
          <Text style={styles.title} numberOfLines={2}>
            {recipe.title}
          </Text>

          {/* Tags de categoría y área */}
          <View style={styles.infoRow}>
            {recipe.category && (
              <View style={styles.tag}>
                <Ionicons
                  name="pricetag"
                  size={12}
                  color={colors.surface}
                  style={styles.tagIcon}
                />
                <Text style={styles.tagText}>{recipe.category}</Text>
              </View>
            )}
            {recipe.area && (
              <View style={[styles.tag, styles.tagArea]}>
                <Ionicons
                  name="globe-outline"
                  size={12}
                  color={colors.surface}
                  style={styles.tagIcon}
                />
                <Text style={styles.tagText}>{recipe.area}</Text>
              </View>
            )}
          </View>
        </View>
      </TouchableOpacity>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.surface,
    borderRadius: borderRadius.lg,
    marginBottom: spacing.md,
    overflow: "hidden",
    ...shadows.lg,
  },
  imageContainer: {
    position: "relative",
    width: "100%",
    height: 200,
  },
  image: {
    width: "100%",
    height: "100%",
    backgroundColor: colors.divider,
  },
  gradient: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    height: "40%",
  },
  favoriteButton: {
    position: "absolute",
    top: spacing.sm,
    right: spacing.sm,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    borderRadius: borderRadius.round,
    width: 40,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
    ...shadows.sm,
  },
  content: {
    padding: spacing.md,
  },
  title: {
    fontSize: fontSize.lg,
    fontWeight: "700",
    color: colors.text,
    marginBottom: spacing.sm,
    lineHeight: fontSize.lg * 1.3,
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
    borderRadius: borderRadius.md,
    flexDirection: "row",
    alignItems: "center",
  },
  tagArea: {
    backgroundColor: colors.secondaryLight,
  },
  tagIcon: {
    marginRight: 4,
  },
  tagText: {
    fontSize: fontSize.xs,
    color: colors.surface,
    fontWeight: "600",
  },
});

export default RecipeCardItem;
