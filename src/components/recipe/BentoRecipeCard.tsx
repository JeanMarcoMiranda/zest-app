import { useFavorites, useTheme } from "@/src/hooks";
import { Ionicons } from "@expo/vector-icons";
import { BlurView } from "expo-blur";
import { LinearGradient } from "expo-linear-gradient";
import React, { useRef, useState } from "react";
import {
  Animated,
  Image,
  Platform,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import { RecipeCard } from "../../types/recipe.types";

// Constantes de animación
const ANIMATION_SCALE_PRESSED = 0.97;
const ANIMATION_SCALE_FAVORITE = 1.3;

type BentoSize = "large" | "small";

interface BentoRecipeCardProps {
  recipe: RecipeCard;
  size: BentoSize;
  onPress: () => void;
}

const BentoRecipeCard: React.FC<BentoRecipeCardProps> = ({
  recipe,
  size,
  onPress,
}) => {
  const { isFavorite, toggleFavorite } = useFavorites();
  const theme = useTheme();
  const { colors, isDark } = theme;

  const scaleAnim = useRef(new Animated.Value(1)).current;
  const favoriteScaleAnim = useRef(new Animated.Value(1)).current;
  const [imageLoaded, setImageLoaded] = useState(false);

  const isLarge = size === "large";
  const cardHeight = isLarge ? 280 : 180;

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
      style={{
        flex: isLarge ? 2 : 1,
        transform: [{ scale: scaleAnim }],
      }}
    >
      <TouchableOpacity
        style={{
          height: cardHeight,
          borderRadius: theme.borderRadius.lg,
          overflow: "hidden",
          backgroundColor: colors.surface,
        }}
        onPress={onPress}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        activeOpacity={1}
      >
        {/* Imagen de fondo full-bleed */}
        {!imageLoaded && (
          <View
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              justifyContent: "center",
              alignItems: "center",
              backgroundColor: colors.surfaceVariant,
            }}
          >
            <Ionicons
              name="restaurant"
              size={isLarge ? 40 : 28}
              color={colors.textLight}
              style={{ opacity: 0.5 }}
            />
          </View>
        )}

        <Image
          source={{ uri: recipe.thumbnail }}
          style={{ width: "100%", height: "100%" }}
          resizeMode="cover"
          onLoad={() => setImageLoaded(true)}
        />

        {/* Gradiente inferior para legibilidad */}
        <LinearGradient
          colors={["transparent", "rgba(0,0,0,0.7)"]}
          style={{
            position: "absolute",
            left: 0,
            right: 0,
            bottom: 0,
            height: "65%",
          }}
        />

        {/* Badge de categoría */}
        <View
          style={{
            position: "absolute",
            top: theme.spacing.sm,
            left: theme.spacing.sm,
          }}
        >
          <BlurView
            intensity={Platform.OS === "ios" ? 60 : 90}
            tint={isDark ? "dark" : "light"}
            style={{
              flexDirection: "row",
              alignItems: "center",
              paddingHorizontal: theme.spacing.sm,
              paddingVertical: theme.spacing.xs,
              borderRadius: theme.borderRadius.sm,
              overflow: "hidden",
              backgroundColor:
                Platform.OS === "android"
                  ? isDark
                    ? "rgba(0,0,0,0.5)"
                    : "rgba(255,255,255,0.7)"
                  : "transparent",
            }}
          >
            <Ionicons
              name="restaurant"
              size={10}
              color={isDark ? "#FFF" : colors.text}
              style={{ marginRight: 3 }}
            />
            <Text
              style={[
                theme.typography.caption,
                {
                  color: isDark ? "#FFF" : colors.text,
                  fontSize: 10,
                },
              ]}
              numberOfLines={1}
            >
              {recipe.category}
            </Text>
          </BlurView>
        </View>

        {/* Botón de favorito */}
        <Animated.View
          style={{
            position: "absolute",
            top: theme.spacing.sm,
            right: theme.spacing.sm,
            borderRadius: theme.borderRadius.full,
            overflow: "hidden",
            transform: [{ scale: favoriteScaleAnim }],
          }}
        >
          <TouchableOpacity onPress={handleFavoritePress} activeOpacity={0.8}>
            <BlurView
              intensity={Platform.OS === "ios" ? 40 : 80}
              tint={isDark ? "dark" : "light"}
              style={{
                width: isLarge ? 40 : 32,
                height: isLarge ? 40 : 32,
                justifyContent: "center",
                alignItems: "center",
                backgroundColor:
                  Platform.OS === "android"
                    ? "rgba(255,255,255,0.7)"
                    : "transparent",
              }}
            >
              <Ionicons
                name={isFav ? "heart" : "heart-outline"}
                size={isLarge ? 20 : 16}
                color={isFav ? "#FF4757" : "#FFF"}
              />
            </BlurView>
          </TouchableOpacity>
        </Animated.View>

        {/* Info overlay inferior */}
        <View
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            padding: isLarge ? theme.spacing.md : theme.spacing.sm,
          }}
        >
          <Text
            style={[
              isLarge ? theme.typography.h3 : theme.typography.bodySm,
              {
                color: "#FFF",
                fontWeight: "700",
                textShadowColor: "rgba(0,0,0,0.3)",
                textShadowOffset: { width: 0, height: 1 },
                textShadowRadius: 3,
              },
            ]}
            numberOfLines={isLarge ? 2 : 1}
          >
            {recipe.title}
          </Text>
          {isLarge && (
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                marginTop: theme.spacing.xs,
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
          )}
        </View>
      </TouchableOpacity>
    </Animated.View>
  );
};

export default BentoRecipeCard;
