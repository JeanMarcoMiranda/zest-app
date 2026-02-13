import { GlassView } from "@/src/components/common";
import { useFavorites, useTheme } from "@/src/hooks";
import { RecipeCard as RecipeCardType } from "@/src/types/recipe.types";
import { Ionicons } from "@expo/vector-icons";
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

// Constantes de animación
const ANIMATION_SCALE_PRESSED = 0.97;
const ANIMATION_SCALE_FAVORITE = 1.3;

export type RecipeCardVariant = "list" | "bento-small" | "bento-large";

interface RecipeCardProps {
  recipe: RecipeCardType;
  variant?: RecipeCardVariant;
  onPress: () => void;
  style?: any;
}

export const RecipeCard: React.FC<RecipeCardProps> = ({
  recipe,
  variant = "list",
  onPress,
  style,
}) => {
  const { isFavorite, toggleFavorite } = useFavorites();
  const theme = useTheme();
  const { colors } = theme;

  const scaleAnim = useRef(new Animated.Value(1)).current;
  const favoriteScaleAnim = useRef(new Animated.Value(1)).current;
  const [imageLoaded, setImageLoaded] = useState(false);

  // Configuraciones según variante
  const isLarge = variant === "bento-large";
  const isList = variant === "list";
  const cardHeight = isLarge ? 240 : isList ? 200 : 160;

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

    Animated.sequence([
      Animated.timing(favoriteScaleAnim, {
        toValue: 0.8,
        duration: 80,
        useNativeDriver: true,
      }),
      Animated.spring(favoriteScaleAnim, {
        toValue: isFav ? 1 : ANIMATION_SCALE_FAVORITE,
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
          flex: isList ? 0 : isLarge ? 2 : 1,
          width: isList ? "100%" : undefined,
          marginBottom: isList ? theme.spacing.sm : 0,
          transform: [{ scale: scaleAnim }],
        },
        style,
      ]}
    >
      <TouchableOpacity
        style={{
          height: cardHeight,
          borderRadius: theme.borderRadius.md,
          overflow: "hidden",
          backgroundColor: colors.surface,
        }}
        onPress={onPress}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        activeOpacity={1}
      >
        {/* Placeholder / Fondo de carga */}
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
              size={isLarge || isList ? 40 : 28}
              color={colors.textLight}
              style={{ opacity: 0.5 }}
            />
          </View>
        )}

        {/* Imagen */}
        <Image
          source={{ uri: recipe.thumbnail }}
          style={StyleSheet.absoluteFillObject}
          resizeMode="cover"
          onLoad={() => setImageLoaded(true)}
        />

        {/* Gradiente */}
        <LinearGradient
          colors={["transparent", "rgba(0,0,0,0.65)"]}
          style={{
            position: "absolute",
            left: 0,
            right: 0,
            bottom: 0,
            height: "55%",
          }}
        />

        {/* Badge de Categoría con GlassView */}
        <View
          style={{
            position: "absolute",
            top: theme.spacing.sm,
            left: theme.spacing.sm,
          }}
        >
          <GlassView
            intensity={60}
            borderRadius={theme.borderRadius.xs}
            style={{
              flexDirection: "row",
              alignItems: "center",
              paddingHorizontal: 6,
              paddingVertical: 3,
            }}
          >
            <Ionicons
              name="restaurant"
              size={9}
              color={theme.isDark ? "#FFF" : colors.text}
              style={{ marginRight: 2 }}
            />
            <Text
              style={[
                theme.typography.caption,
                {
                  color: theme.isDark ? "#FFF" : colors.text,
                  fontSize: 9,
                  fontWeight: "600",
                },
              ]}
              numberOfLines={1}
            >
              {recipe.category}
            </Text>
          </GlassView>
        </View>

        {/* Botón de Favorito */}
        <Animated.View
          style={{
            position: "absolute",
            top: theme.spacing.sm,
            right: theme.spacing.sm,
            transform: [{ scale: favoriteScaleAnim }],
          }}
        >
          <TouchableOpacity onPress={handleFavoritePress} activeOpacity={0.8}>
            <GlassView
              intensity={40}
              borderRadius={theme.borderRadius.full}
              style={{
                width: isLarge || isList ? 34 : 28,
                height: isLarge || isList ? 34 : 28,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Ionicons
                name={isFav ? "heart" : "heart-outline"}
                size={isLarge || isList ? 16 : 14}
                color={isFav ? "#FF4757" : "#FFF"}
              />
            </GlassView>
          </TouchableOpacity>
        </Animated.View>

        {/* Info Overlay */}
        <View
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            padding:
              isLarge || isList ? theme.spacing.sm + 4 : theme.spacing.sm,
          }}
        >
          <Text
            style={[
              isLarge || isList
                ? theme.typography.h3
                : theme.typography.caption,
              {
                color: "#FFF",
                fontWeight: "600",
                textTransform: "none",
                textShadowColor: "rgba(0,0,0,0.3)",
                textShadowOffset: { width: 0, height: 1 },
                textShadowRadius: 3,
              },
            ]}
            numberOfLines={isLarge || isList ? 2 : 1}
          >
            {recipe.title}
          </Text>

          {(isLarge || isList) && (
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
                marginTop: theme.spacing.xs,
              }}
            >
              {/* Área */}
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  gap: 4,
                }}
              >
                <Ionicons
                  name="globe-outline"
                  size={12}
                  color="rgba(255,255,255,0.8)"
                />
                <Text
                  style={[
                    theme.typography.caption,
                    { color: "rgba(255,255,255,0.8)" },
                  ]}
                >
                  {recipe.area}
                </Text>
              </View>

              {/* Indicador "Ver receta" (Solo en List por espacio) */}
              {isList && (
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    gap: 3,
                  }}
                >
                  <Text
                    style={[
                      theme.typography.caption,
                      {
                        color: "rgba(255,255,255,0.7)",
                        fontWeight: "500",
                      },
                    ]}
                  >
                    Ver receta
                  </Text>
                  <Ionicons
                    name="chevron-forward"
                    size={12}
                    color="rgba(255,255,255,0.6)"
                  />
                </View>
              )}
            </View>
          )}
        </View>
      </TouchableOpacity>
    </Animated.View>
  );
};
