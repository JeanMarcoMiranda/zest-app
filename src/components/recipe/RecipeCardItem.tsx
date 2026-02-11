import { useFavorites, useTheme } from "@/src/hooks";
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
const ANIMATION_SCALE_PRESSED = 0.98;
const ANIMATION_SCALE_FAVORITE = 1.3;
const CARD_HEIGHT = 200;

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
        marginBottom: theme.spacing.sm,
        transform: [{ scale: scaleAnim }],
      }}
    >
      <TouchableOpacity
        style={{
          height: CARD_HEIGHT,
          borderRadius: theme.borderRadius.md,
          overflow: "hidden",
          backgroundColor: colors.surface,
        }}
        onPress={onPress}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        activeOpacity={1}
      >
        {/* Placeholder mientras carga la imagen */}
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
              size={32}
              color={colors.textLight}
              style={{ opacity: 0.5 }}
            />
          </View>
        )}

        {/* Imagen full-bleed */}
        <Image
          source={{ uri: recipe.thumbnail }}
          style={StyleSheet.absoluteFillObject}
          resizeMode="cover"
          onLoad={() => setImageLoaded(true)}
        />

        {/* Gradiente inferior para legibilidad */}
        <LinearGradient
          colors={["transparent", "rgba(0,0,0,0.6)"]}
          style={{
            position: "absolute",
            left: 0,
            right: 0,
            bottom: 0,
            height: "60%",
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
              paddingHorizontal: 6,
              paddingVertical: 3,
              borderRadius: theme.borderRadius.xs,
              overflow: "hidden",
              backgroundColor: isDark
                ? colors.surface + "90"
                : colors.surface + "70",
            }}
          >
            <Ionicons
              name="restaurant"
              size={9}
              color={colors.text}
              style={{ marginRight: 2 }}
            />
            <Text
              style={[
                theme.typography.caption,
                {
                  color: colors.text,
                  fontSize: 9,
                  textTransform: "none",
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
                width: 34,
                height: 34,
                justifyContent: "center",
                alignItems: "center",
                backgroundColor: isDark
                  ? colors.surfaceVariant + "90"
                  : "rgba(255,255,255,0.7)",
              }}
            >
              <Ionicons
                name={isFav ? "heart" : "heart-outline"}
                size={16}
                color={isFav ? colors.error : "#FFF"}
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
            padding: theme.spacing.sm + 4,
          }}
        >
          <Text
            style={[
              theme.typography.h3,
              {
                color: "#FFF",
                fontWeight: "600",
                textShadowColor: "rgba(0,0,0,0.3)",
                textShadowOffset: { width: 0, height: 1 },
                textShadowRadius: 3,
              },
            ]}
            numberOfLines={2}
          >
            {recipe.title}
          </Text>

          {/* Metadata row */}
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
                  {
                    color: "rgba(255,255,255,0.8)",
                    textTransform: "none",
                  },
                ]}
              >
                {recipe.area}
              </Text>
            </View>

            {/* "Ver receta" indicator */}
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
                    textTransform: "none",
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
          </View>
        </View>
      </TouchableOpacity>
    </Animated.View>
  );
};

export default RecipeCardItem;
