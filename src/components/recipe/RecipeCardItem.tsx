import { useTheme } from "@/src/hooks";
import { spacing, typography } from "@/src/theme";
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

const borderRadius = {
  sm: 4,
  md: 8,
  lg: 12,
  xl: 16,
  round: 9999,
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
  const { colors } = useTheme();
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

  const shadows = {
    sm: {
      shadowColor: colors.primaryDark,
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: 0.05,
      shadowRadius: 2,
      elevation: 2,
    },
    lg: {
      shadowColor: colors.primaryDark,
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.15,
      shadowRadius: 8,
      elevation: 8,
    },
  };

  return (
    <Animated.View style={{ transform: [{ scale: scaleAnim }] }}>
      <TouchableOpacity
        style={[styles.card, { backgroundColor: colors.surface }, shadows.lg]}
        onPress={onPress}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        activeOpacity={1}
      >
        {/* Imagen con gradient overlay */}
        <View style={styles.imageContainer}>
          <Image
            source={{ uri: recipe.thumbnail }}
            style={[styles.image, { backgroundColor: colors.divider }]}
            resizeMode="cover"
          />
          <LinearGradient colors={gradients.overlay} style={styles.gradient} />

          {/* Botón de favorito */}
          <TouchableOpacity
            style={[styles.favoriteButton, shadows.sm]}
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
          <Text
            style={[styles.title, { color: colors.text }]}
            numberOfLines={2}
          >
            {recipe.title}
          </Text>

          {/* Tags de categoría y área */}
          <View style={styles.infoRow}>
            {recipe.category && (
              <View
                style={[styles.tag, { backgroundColor: colors.primaryLight }]}
              >
                <Ionicons
                  name="pricetag"
                  size={12}
                  color={colors.textInverse}
                  style={styles.tagIcon}
                />
                <Text style={[styles.tagText, { color: colors.textInverse }]}>
                  {recipe.category}
                </Text>
              </View>
            )}
            {recipe.area && (
              <View
                style={[
                  styles.tag,
                  styles.tagArea,
                  { backgroundColor: colors.secondaryLight },
                ]}
              >
                <Ionicons
                  name="globe-outline"
                  size={12}
                  color={colors.textSecondary}
                  style={styles.tagIcon}
                />
                <Text style={[styles.tagText, { color: colors.textSecondary }]}>
                  {recipe.area}
                </Text>
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
    borderRadius: borderRadius.lg,
    marginBottom: spacing.md,
    overflow: "hidden",
  },
  imageContainer: {
    position: "relative",
    width: "100%",
    height: 200,
  },
  image: {
    width: "100%",
    height: "100%",
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
  },
  content: {
    padding: spacing.md,
  },
  title: {
    fontSize: typography.fontSize.lg,
    fontWeight: "700",
    marginBottom: spacing.sm,
    lineHeight: typography.fontSize.lg * 1.3,
  },
  infoRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: spacing.xs,
  },
  tag: {
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs,
    borderRadius: borderRadius.md,
    flexDirection: "row",
    alignItems: "center",
  },
  tagArea: {
    // Override if needed
  },
  tagIcon: {
    marginRight: 4,
  },
  tagText: {
    fontSize: typography.fontSize.xs,
    fontWeight: "600",
  },
});

export default RecipeCardItem;
