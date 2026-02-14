import { useTheme } from "@/src/hooks";
import { Ionicons } from "@expo/vector-icons";
import { BlurView } from "expo-blur";
import React from "react";
import { Animated, Platform, TouchableOpacity } from "react-native";

interface FavoriteButtonProps {
  isFavorite: boolean;
  onPress: () => void;
  size?: number;
  style?: any;
  containerSize?: number;
}

const FavoriteButton: React.FC<FavoriteButtonProps> = ({
  isFavorite,
  onPress,
  size = 18,
  style,
  containerSize = 38,
}) => {
  const theme = useTheme();
  const { isDark, colors } = theme;
  const scaleValue = React.useRef(new Animated.Value(1)).current;

  const handlePress = () => {
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
      style={[
        {
          borderRadius: theme.borderRadius.full,
          overflow: "hidden",
        },
        style,
      ]}
      onPress={handlePress}
      activeOpacity={0.8}
    >
      <BlurView
        intensity={Platform.OS === "ios" ? 40 : 80}
        tint={isDark ? "dark" : "light"}
        style={{
          width: containerSize,
          height: containerSize,
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: isDark
            ? colors.surfaceVariant + "90"
            : colors.surface + "B3",
        }}
      >
        <Animated.View style={{ transform: [{ scale: scaleValue }] }}>
          <Ionicons
            name={isFavorite ? "heart" : "heart-outline"}
            size={size}
            color={isFavorite ? colors.error : colors.text}
          />
        </Animated.View>
      </BlurView>
    </TouchableOpacity>
  );
};

export default FavoriteButton;
