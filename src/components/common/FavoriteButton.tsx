import { useTheme } from "@/src/hooks";
import { createShadow } from "@/src/utils";
import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { Animated, TouchableOpacity } from "react-native";

interface FavoriteButtonProps {
  isFavorite: boolean;
  onPress: () => void;
  size?: number;
}

const FavoriteButton: React.FC<FavoriteButtonProps> = ({
  isFavorite,
  onPress,
  size = 24,
}) => {
  const theme = useTheme();
  const { colors } = theme;
  const scaleValue = React.useRef(new Animated.Value(1)).current;

  const handlePress = () => {
    // Animación de escala
    Animated.sequence([
      Animated.timing(scaleValue, {
        toValue: 1.3,
        duration: theme.duration.fast,
        useNativeDriver: true,
      }),
      Animated.timing(scaleValue, {
        toValue: 1,
        duration: theme.duration.fast,
        useNativeDriver: true,
      }),
    ]).start();

    onPress();
  };

  return (
    <TouchableOpacity
      style={{
        width: 44,
        height: 44,
        borderRadius: theme.borderRadius.full,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: colors.surface,
        ...createShadow(theme as any, theme.elevation.low),
      }}
      onPress={handlePress}
      activeOpacity={0.7}
    >
      <Animated.View style={{ transform: [{ scale: scaleValue }] }}>
        <Ionicons
          name={isFavorite ? "heart" : "heart-outline"}
          size={size}
          color={isFavorite ? colors.error : colors.textSecondary}
        />
      </Animated.View>
    </TouchableOpacity>
  );
};

export default FavoriteButton;
