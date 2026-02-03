import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { Animated, StyleSheet, TouchableOpacity } from "react-native";
import { colors, shadows } from "../../styles/theme";

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
  const scaleValue = React.useRef(new Animated.Value(1)).current;

  const handlePress = () => {
    // Animación de escala
    Animated.sequence([
      Animated.timing(scaleValue, {
        toValue: 1.3,
        duration: 100,
        useNativeDriver: true,
      }),
      Animated.timing(scaleValue, {
        toValue: 1,
        duration: 100,
        useNativeDriver: true,
      }),
    ]).start();

    onPress();
  };

  return (
    <TouchableOpacity
      style={styles.button}
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

const styles = StyleSheet.create({
  button: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: colors.surface,
    justifyContent: "center",
    alignItems: "center",
    ...shadows.md,
  },
});

export default FavoriteButton;
