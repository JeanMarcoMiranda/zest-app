import { useFavorites, useTheme } from "@/src/hooks";
import { spacing, typography } from "@/src/theme";
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

const borderRadius = {
  md: 8,
  lg: 12,
  xl: 16,
  xxl: 24,
  round: 9999,
};

const animation = {
  scale: {
    pressed: 0.96,
    favorite: 1.4, // Más pop
  },
};

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
      toValue: animation.scale.pressed,
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
        toValue: isFav ? 1 : animation.scale.favorite, // Pop si se activa
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
              style={[
                styles.title,
                { color: colors.text, fontSize: typography.fontSize.lg },
              ]}
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

const styles = StyleSheet.create({
  cardWrapper: {
    marginBottom: spacing.lg,
    paddingHorizontal: spacing.xs, // Para dar espacio a la sombra lateral
  },
  card: {
    borderRadius: borderRadius.xxl,
    overflow: Platform.OS === "android" ? "hidden" : "visible", // En iOS shadows fuera, en Android dentro si overflow hidden (trick)
    // Pero si usamos overflow hidden para la imagen, perdemos sombra en Android en el mismo container.
    // Solución: Wrapper externo para layout, inner para radius. Simplificamos:
    // Mantenemos overflow hidden para que la imagen no se salga.
  },
  imageContainer: {
    height: 220,
    width: "100%",
    position: "relative",
    borderTopLeftRadius: borderRadius.xxl,
    borderTopRightRadius: borderRadius.xxl,
    overflow: "hidden", // Recorta la imagen
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
    borderRadius: borderRadius.lg,
  },
  categoryText: {
    color: "#FFFFFF",
    fontSize: typography.fontSize.xs,
    fontWeight: "700",
    letterSpacing: 0.5,
    textTransform: "uppercase",
  },
  favoriteContainer: {
    position: "absolute",
    top: spacing.md,
    right: spacing.md,
    borderRadius: borderRadius.round,
    overflow: "hidden", // Necesario para que BlurView respete el borde
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
    borderBottomLeftRadius: borderRadius.xxl,
    borderBottomRightRadius: borderRadius.xxl,
  },
  titleRow: {
    marginBottom: spacing.sm,
  },
  title: {
    fontWeight: "800",
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
    fontSize: typography.fontSize.sm,
    fontWeight: "500",
  },
  separator: {
    width: 1,
    height: 16,
    marginHorizontal: spacing.md,
  },
});

export default RecipeCardItem;
