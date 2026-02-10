import { useFavorites, useTheme } from "@/src/hooks";
import { createShadow } from "@/src/utils";
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

interface RecipeCardItemProps {
  recipe: RecipeCard;
  onPress: () => void;
}

const RecipeCardItem: React.FC<RecipeCardItemProps> = ({ recipe, onPress }) => {
  const { isFavorite, toggleFavorite } = useFavorites();
  const theme = useTheme();
  const { colors, isDark } = theme;

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

  return (
    <Animated.View
      style={[
        {
          marginBottom: theme.spacing.lg,
          paddingHorizontal: theme.spacing.xs,
        },
        { transform: [{ scale: scaleAnim }] },
      ]}
    >
      <TouchableOpacity
        style={[
          {
            borderRadius: theme.borderRadius.xl,
            overflow: Platform.OS === "android" ? "hidden" : "visible",
            backgroundColor: colors.surface,
          },
          createShadow(theme as any, theme.elevation.high),
        ]}
        onPress={onPress}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        activeOpacity={1}
      >
        {/* Imagen Wrapper */}
        <View
          style={{
            height: 220,
            width: "100%",
            position: "relative",
            borderTopLeftRadius: theme.borderRadius.xl,
            borderTopRightRadius: theme.borderRadius.xl,
            overflow: "hidden",
          }}
        >
          {/* Placeholder */}
          {!imageLoaded && (
            <View
              style={[
                StyleSheet.absoluteFillObject,
                {
                  justifyContent: "center",
                  alignItems: "center",
                  backgroundColor: colors.surfaceVariant,
                },
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
            style={{ width: "100%", height: "100%" }}
            resizeMode="cover"
            onLoad={() => setImageLoaded(true)}
          />

          {/* Gradiente sutil inferior */}
          <LinearGradient
            colors={
              isDark ? theme.gradients.overlay : theme.gradients.overlayLight
            }
            style={{
              position: "absolute",
              left: 0,
              right: 0,
              bottom: 0,
              height: "60%",
            }}
          />

          {/* Badge de Categoría */}
          <View
            style={{
              position: "absolute",
              top: theme.spacing.md,
              left: theme.spacing.md,
            }}
          >
            <LinearGradient
              colors={[colors.primary, colors.primaryLight]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={{
                flexDirection: "row",
                alignItems: "center",
                paddingHorizontal: theme.spacing.sm + 2,
                paddingVertical: theme.spacing.xs + 2,
                borderRadius: theme.borderRadius.md,
              }}
            >
              <Ionicons
                name="restaurant"
                size={12}
                color="#FFF"
                style={{ marginRight: 4 }}
              />
              <Text
                style={[
                  theme.typography.caption,
                  {
                    color: "#FFFFFF",
                    letterSpacing: 0.5,
                  },
                ]}
              >
                {recipe.category}
              </Text>
            </LinearGradient>
          </View>

          {/* Botón Favorito (Glassmorphism) */}
          <Animated.View
            style={[
              {
                position: "absolute",
                top: theme.spacing.md,
                right: theme.spacing.md,
                borderRadius: theme.borderRadius.full,
                overflow: "hidden",
                ...createShadow(theme as any, theme.elevation.low),
              },
              { transform: [{ scale: favoriteScaleAnim }] },
            ]}
          >
            <TouchableOpacity onPress={handleFavoritePress} activeOpacity={0.8}>
              <BlurView
                intensity={Platform.OS === "ios" ? 40 : 80}
                tint={isDark ? "dark" : "light"}
                style={{
                  width: 44,
                  height: 44,
                  justifyContent: "center",
                  alignItems: "center",
                  backgroundColor:
                    Platform.OS === "android"
                      ? "rgba(255,255,255,0.8)"
                      : "transparent",
                }}
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
        <View
          style={{
            padding: theme.spacing.lg,
            paddingTop: theme.spacing.md,
            borderBottomLeftRadius: theme.borderRadius.xl,
            borderBottomRightRadius: theme.borderRadius.xl,
          }}
        >
          <View style={{ marginBottom: theme.spacing.sm }}>
            <Text
              style={[
                theme.typography.h2,
                {
                  color: colors.text,
                  letterSpacing: -0.4,
                  lineHeight: 24,
                },
              ]}
              numberOfLines={2}
            >
              {recipe.title}
            </Text>
          </View>

          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            {/* Área */}
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                gap: 6,
              }}
            >
              <Ionicons name="globe-outline" size={14} color={colors.primary} />
              <Text
                style={[
                  theme.typography.bodySm,
                  {
                    color: colors.textSecondary,
                    fontWeight: "500",
                  },
                ]}
              >
                {recipe.area}
              </Text>
            </View>

            {/* Separador */}
            <View
              style={{
                width: 1,
                height: 16,
                marginHorizontal: theme.spacing.md,
                backgroundColor: colors.divider,
              }}
            />

            {/* Indicador visual "Ver receta" */}
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                gap: 6,
              }}
            >
              <Text
                style={[
                  theme.typography.bodySm,
                  {
                    color: colors.primary,
                    fontWeight: "600",
                  },
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

export default RecipeCardItem;
