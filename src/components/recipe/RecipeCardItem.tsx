import { useFavorites, useTheme } from "@/src/hooks";
import { borderRadius, spacing } from "@/src/theme";
import { Ionicons } from "@expo/vector-icons";
import { BlurView } from "expo-blur";
import { LinearGradient } from "expo-linear-gradient";
import React, { useRef, useState } from "react";
import {
  Animated,
  Image,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import { RecipeCard } from "../../types/recipe.types";

// Constantes de animación
const ANIMATION_SCALE_PRESSED = 0.96;
const ANIMATION_SCALE_FAVORITE = 1.4;

// Gradientes para overlays
const gradients = {
  overlay: ["transparent", "rgba(0,0,0,0.7)"] as const,
  overlayLight: ["transparent", "rgba(0,0,0,0.5)"] as const,
};

interface RecipeCardItemProps {
  recipe: RecipeCard;
  onPress: () => void;
}

const RecipeCardItem: React.FC<RecipeCardItemProps> = ({ recipe, onPress }) => {
  const { isFavorite, toggleFavorite } = useFavorites();
  const { colors, isDark } = useTheme();

  const scaleAnim = useRef(new Animated.Value(1)).current;
  const favoriteScaleAnim = useRef(new Animated.Value(1)).current;
  const [imageLoaded, setImageLoaded] = useState(false);

  const handlePressIn = () => {
    Animated.spring(scaleAnim, {
      toValue: ANIMATION_SCALE_PRESSED,
      useNativeDriver: true,
      tension: 100,
      friction: 7,
    }).start();
  };

  const handlePressOut = () => {
    Animated.spring(scaleAnim, {
      toValue: 1,
      useNativeDriver: true,
      tension: 40,
      friction: 5,
    }).start();
  };

  const handleFavoritePress = () => {
    const isFav = isFavorite(recipe.id);

    // Haptic feedback visual
    Animated.sequence([
      Animated.timing(favoriteScaleAnim, {
        toValue: 0.8,
        duration: 80,
        useNativeDriver: true,
      }),
      Animated.spring(favoriteScaleAnim, {
        toValue: isFav ? 1 : ANIMATION_SCALE_FAVORITE, // Pop si se activa
        friction: 3,
        tension: 100,
        useNativeDriver: true,
      }),
      Animated.spring(favoriteScaleAnim, {
        toValue: 1,
        friction: 4,
        tension: 50,
        useNativeDriver: true,
      }),
    ]).start();

    toggleFavorite(recipe);
  };

  const isFav = isFavorite(recipe.id);

  const shadows = {
    card: {
      shadowColor: colors.primaryDark,
      shadowOffset: { width: 0, height: 8 },
      shadowOpacity: 0.12,
      shadowRadius: 16,
      elevation: 8,
    },
    button: {
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.2,
      shadowRadius: 6,
      elevation: 4,
    },
  };

  return (
    <Animated.View
      style={[styles.cardWrapper, { transform: [{ scale: scaleAnim }] }]}
    >
      <TouchableOpacity
        style={[styles.card, { backgroundColor: colors.surface }, shadows.card]}
        onPress={onPress}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        activeOpacity={1}
      >
        {/* Imagen Wrapper */}
        <View style={styles.imageContainer}>
          {/* Placeholder */}
          {!imageLoaded && (
            <View
              style={[
                styles.placeholder,
                { backgroundColor: colors.surfaceVariant },
              ]}
            >
              <Ionicons
                name="restaurant"
                size={40}
                color={colors.textLight}
                opacity={0.5}
              />
            </View>
          )}

          <Image
            source={{ uri: recipe.thumbnail }}
            style={styles.image}
            resizeMode="cover"
            onLoad={() => setImageLoaded(true)}
          />

          {/* Gradiente sutil inferior */}
          <LinearGradient
            colors={isDark ? gradients.overlay : gradients.overlayLight}
            style={styles.gradient}
          />

          {/* Badge de Categoría (Glassmorphism sutil o Gradiente) */}
          <View style={styles.categoryBadgeContainer}>
            {/* Usamos un contenedor normal con gradiente sólido para mejor legibilidad sobre imagen */}
            <LinearGradient
              colors={[colors.primary, colors.primaryLight]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={styles.categoryBadge}
            >
              <Ionicons
                name="restaurant"
                size={12}
                color="#FFF"
                style={{ marginRight: 4 }}
              />
              <Text style={styles.categoryText}>{recipe.category}</Text>
            </LinearGradient>
          </View>

          {/* Botón Favorito (Glassmorphism Real) */}
          <Animated.View
            style={[
              styles.favoriteContainer,
              { transform: [{ scale: favoriteScaleAnim }] },
            ]}
          >
            <TouchableOpacity onPress={handleFavoritePress} activeOpacity={0.8}>
              <BlurView
                intensity={Platform.OS === "ios" ? 40 : 80} // Android necesita más intensidad o tinte distinto
                tint={isDark ? "dark" : "light"}
                style={styles.favoriteBlur}
              >
                <Ionicons
                  name={isFav ? "heart" : "heart-outline"}
                  size={22}
                  color={isFav ? "#FF4757" : isDark ? "#FFF" : "#333"}
                />
              </BlurView>
            </TouchableOpacity>
          </Animated.View>
        </View>

        {/* Contenido (Info) */}
        <View style={styles.content}>
          <View style={styles.titleRow}>
            <Text
              style={[styles.title, { color: colors.text }]}
              numberOfLines={2}
            >
              {recipe.title}
            </Text>
          </View>

          <View style={styles.detailsRow}>
            {/* Área */}
            <View style={styles.detailItem}>
              <Ionicons name="globe-outline" size={14} color={colors.primary} />
              <Text
                style={[styles.detailText, { color: colors.textSecondary }]}
              >
                {recipe.area}
              </Text>
            </View>

            {/* Separador */}
            <View
              style={[styles.separator, { backgroundColor: colors.divider }]}
            />

            {/* Indicador visual "Ver receta" */}
            <View style={styles.detailItem}>
              <Text
                style={[
                  styles.detailText,
                  { color: colors.primary, fontWeight: "600" },
                ]}
              >
                Ver receta
              </Text>
              <Ionicons name="arrow-forward" size={14} color={colors.primary} />
            </View>
          </View>
        </View>
      </TouchableOpacity>
    </Animated.View>
  );
};

// Extraer valores del tema para usar en StyleSheet.create()
const h2Styles = {
  fontFamily: "PlayfairDisplay-Bold",
  fontSize: 24,
  fontWeight: "700" as const,
  lineHeight: 1.2,
  letterSpacing: 0,
};

const bodySmStyles = {
  fontFamily: "Inter-Regular",
  fontSize: 14,
  fontWeight: "400" as const,
  lineHeight: 1.7,
  letterSpacing: 0,
};

const captionStyles = {
  fontFamily: "Inter-Bold",
  fontSize: 12,
  fontWeight: "700" as const,
  lineHeight: 1.5,
  letterSpacing: 0.1,
  textTransform: "uppercase" as const,
};

const styles = StyleSheet.create({
  cardWrapper: {
    marginBottom: spacing.lg,
    paddingHorizontal: spacing.xs, // Para dar espacio a la sombra lateral
  },
  card: {
    borderRadius: borderRadius.xl,
    overflow: Platform.OS === "android" ? "hidden" : "visible",
  },
  imageContainer: {
    height: 220,
    width: "100%",
    position: "relative",
    borderTopLeftRadius: borderRadius.xl,
    borderTopRightRadius: borderRadius.xl,
    overflow: "hidden",
  },
  placeholder: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: "center",
    alignItems: "center",
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
    height: "60%",
  },
  categoryBadgeContainer: {
    position: "absolute",
    top: spacing.md,
    left: spacing.md,
  },
  categoryBadge: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: spacing.sm + 2,
    paddingVertical: spacing.xs + 2,
    borderRadius: borderRadius.md,
  },
  categoryText: {
    color: "#FFFFFF",
    ...captionStyles,
    letterSpacing: 0.5,
  },
  favoriteContainer: {
    position: "absolute",
    top: spacing.md,
    right: spacing.md,
    borderRadius: borderRadius.full,
    overflow: "hidden",
    ...Platform.select({
      android: { elevation: 4 },
      ios: {
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
      },
    }),
  },
  favoriteBlur: {
    width: 44,
    height: 44,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor:
      Platform.OS === "android" ? "rgba(255,255,255,0.8)" : "transparent", // Fallback android
  },
  content: {
    padding: spacing.lg,
    paddingTop: spacing.md,
    borderBottomLeftRadius: borderRadius.xl,
    borderBottomRightRadius: borderRadius.xl,
  },
  titleRow: {
    marginBottom: spacing.sm,
  },
  title: {
    ...h2Styles,
    letterSpacing: -0.4,
    lineHeight: 24,
  },
  detailsRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  detailItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  detailText: {
    ...bodySmStyles,
    fontWeight: "500",
  },
  separator: {
    width: 1,
    height: 16,
    marginHorizontal: spacing.md,
  },
});

export default RecipeCardItem;
