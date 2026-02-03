import { LinearGradient } from "expo-linear-gradient";
import React, { useRef, useState } from "react";
import {
  Animated,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import {
  animation,
  borderRadius,
  colors,
  fontSize,
  gradients,
  shadows,
  spacing,
} from "../../styles/theme";
import { RecipeCard } from "../../types/recipe.types";

interface RecipeCardItemProps {
  recipe: RecipeCard;
  onPress: () => void;
}

const RecipeCardItem: React.FC<RecipeCardItemProps> = ({ recipe, onPress }) => {
  const scaleAnim = useRef(new Animated.Value(1)).current;
  const [isFavorite, setIsFavorite] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);

  // Mock data - en el futuro esto vendría de la API o cálculos
  const estimatedTime = Math.floor(Math.random() * 40) + 20; // 20-60 min
  const difficulty = ["Fácil", "Media", "Difícil"][
    Math.floor(Math.random() * 3)
  ];
  const difficultyDots =
    difficulty === "Fácil" ? 1 : difficulty === "Media" ? 2 : 3;

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

  const handleFavoritePress = () => {
    setIsFavorite(!isFavorite);
    // Aquí se implementaría la lógica de guardar en AsyncStorage
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
          {!imageLoaded && <View style={styles.imagePlaceholder} />}
          <Image
            source={{ uri: recipe.thumbnail }}
            style={styles.image}
            resizeMode="cover"
            onLoad={() => setImageLoaded(true)}
          />
          <LinearGradient colors={gradients.overlay} style={styles.gradient} />

          {/* Botón de favorito */}
          <TouchableOpacity
            style={styles.favoriteButton}
            onPress={handleFavoritePress}
            activeOpacity={0.7}
          >
            <Text style={styles.favoriteIcon}>{isFavorite ? "❤️" : "🤍"}</Text>
          </TouchableOpacity>
        </View>

        {/* Contenido con glassmorphism */}
        <View style={styles.content}>
          <Text style={styles.title} numberOfLines={2}>
            {recipe.title}
          </Text>

          {/* Tags de categoría y área */}
          <View style={styles.infoRow}>
            {recipe.category && (
              <View style={styles.tag}>
                <Text style={styles.tagText}>🏷️ {recipe.category}</Text>
              </View>
            )}
            {recipe.area && (
              <View style={[styles.tag, styles.tagArea]}>
                <Text style={styles.tagText}>🌍 {recipe.area}</Text>
              </View>
            )}
          </View>

          {/* Información adicional: tiempo y dificultad */}
          <View style={styles.metaRow}>
            <View style={styles.metaItem}>
              <Text style={styles.metaIcon}>⏱️</Text>
              <Text style={styles.metaText}>{estimatedTime} min</Text>
            </View>
            <View style={styles.metaItem}>
              <Text style={styles.metaIcon}>📊</Text>
              <View style={styles.difficultyContainer}>
                {[...Array(3)].map((_, index) => (
                  <View
                    key={index}
                    style={[
                      styles.difficultyDot,
                      index < difficultyDots && styles.difficultyDotActive,
                    ]}
                  />
                ))}
              </View>
              <Text style={styles.metaText}>{difficulty}</Text>
            </View>
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
    height: 220,
  },
  image: {
    width: "100%",
    height: "100%",
    backgroundColor: colors.divider,
  },
  imagePlaceholder: {
    position: "absolute",
    width: "100%",
    height: "100%",
    backgroundColor: colors.divider,
    zIndex: 1,
  },
  gradient: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    height: "50%",
  },
  favoriteButton: {
    position: "absolute",
    top: spacing.sm,
    right: spacing.sm,
    backgroundColor: colors.glass,
    borderRadius: borderRadius.round,
    width: 40,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
    ...shadows.md,
  },
  favoriteIcon: {
    fontSize: 20,
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
    marginBottom: spacing.sm,
  },
  tag: {
    backgroundColor: colors.primaryLight,
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs,
    borderRadius: borderRadius.md,
  },
  tagArea: {
    backgroundColor: colors.secondaryLight,
  },
  tagText: {
    fontSize: fontSize.xs,
    color: colors.surface,
    fontWeight: "600",
  },
  metaRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.md,
    paddingTop: spacing.xs,
    borderTopWidth: 1,
    borderTopColor: colors.divider,
  },
  metaItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.xs,
  },
  metaIcon: {
    fontSize: 14,
  },
  metaText: {
    fontSize: fontSize.sm,
    color: colors.textSecondary,
    fontWeight: "500",
  },
  difficultyContainer: {
    flexDirection: "row",
    gap: 3,
  },
  difficultyDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: colors.divider,
  },
  difficultyDotActive: {
    backgroundColor: colors.primary,
  },
});

export default RecipeCardItem;
