import { useTheme } from "@/src/hooks";
import React, { useEffect, useRef } from "react";
import { Animated, View } from "react-native";

interface SkeletonLoaderProps {
  width?: number | string;
  height?: number;
  borderRadius?: number;
  style?: any;
}

export const SkeletonLoader: React.FC<SkeletonLoaderProps> = ({
  width = "100%",
  height = 20,
  borderRadius = 4,
  style,
}) => {
  const theme = useTheme();
  const { colors } = theme;
  const shimmerAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(shimmerAnim, {
          toValue: 1,
          duration: theme.duration.slow,
          useNativeDriver: true,
        }),
        Animated.timing(shimmerAnim, {
          toValue: 0,
          duration: theme.duration.slow,
          useNativeDriver: true,
        }),
      ]),
    ).start();
  }, [shimmerAnim, theme.duration.slow]);

  const opacity = shimmerAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [0.3, 0.7],
  });

  return (
    <Animated.View
      style={[
        {
          width,
          height,
          borderRadius,
          opacity,
          backgroundColor: colors.divider,
        },
        style,
      ]}
    />
  );
};

export const RecipeCardSkeleton: React.FC = () => {
  const theme = useTheme();
  const { colors } = theme;

  return (
    <View
      style={{
        borderRadius: theme.borderRadius.md,
        marginBottom: theme.spacing.md,
        overflow: "hidden",
        backgroundColor: colors.surface,
      }}
    >
      <SkeletonLoader height={200} borderRadius={theme.borderRadius.md} />
      <View style={{ padding: theme.spacing.md }}>
        <SkeletonLoader
          height={24}
          width="80%"
          style={{ marginBottom: theme.spacing.sm }}
        />
        <View style={{ flexDirection: "row", marginBottom: theme.spacing.sm }}>
          <SkeletonLoader height={24} width={80} borderRadius={6} />
          <SkeletonLoader
            height={24}
            width={100}
            borderRadius={6}
            style={{ marginLeft: theme.spacing.xs }}
          />
        </View>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <SkeletonLoader height={16} width={60} borderRadius={4} />
          <SkeletonLoader
            height={16}
            width={80}
            borderRadius={4}
            style={{ marginLeft: theme.spacing.sm }}
          />
        </View>
      </View>
    </View>
  );
};

export const ListSkeleton: React.FC = () => {
  const theme = useTheme();
  const { colors } = theme;

  return (
    <View style={{ gap: theme.spacing.sm }}>
      {[1, 2, 3].map((i) => (
        <SkeletonLoader
          key={i}
          height={200}
          borderRadius={theme.borderRadius.md}
          style={{ backgroundColor: colors.surfaceVariant }}
        />
      ))}
    </View>
  );
};
