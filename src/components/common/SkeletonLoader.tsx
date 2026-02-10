import { useTheme } from "@/src/hooks";
import { borderRadius, spacing } from "@/src/theme";
import React, { useEffect, useRef } from "react";
import { Animated, StyleSheet, View } from "react-native";

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
  const { colors } = useTheme();
  const shimmerAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(shimmerAnim, {
          toValue: 1,
          duration: 1000,
          useNativeDriver: true,
        }),
        Animated.timing(shimmerAnim, {
          toValue: 0,
          duration: 1000,
          useNativeDriver: true,
        }),
      ]),
    ).start();
  }, [shimmerAnim]);

  const opacity = shimmerAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [0.3, 0.7],
  });

  return (
    <Animated.View
      style={[
        styles.skeleton,
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
  const { colors } = useTheme();

  return (
    <View style={[styles.card, { backgroundColor: colors.surface }]}>
      <SkeletonLoader height={200} borderRadius={12} />
      <View style={styles.content}>
        <SkeletonLoader
          height={24}
          width="80%"
          style={{ marginBottom: spacing.sm }}
        />
        <View style={styles.tagRow}>
          <SkeletonLoader height={24} width={80} borderRadius={6} />
          <SkeletonLoader
            height={24}
            width={100}
            borderRadius={6}
            style={{ marginLeft: spacing.xs }}
          />
        </View>
        <View style={styles.infoRow}>
          <SkeletonLoader height={16} width={60} borderRadius={4} />
          <SkeletonLoader
            height={16}
            width={80}
            borderRadius={4}
            style={{ marginLeft: spacing.sm }}
          />
        </View>
      </View>
    </View>
  );
};

// Extraer valor del tema para usar en StyleSheet.create()
const cardBorderRadius = borderRadius.md;

const styles = StyleSheet.create({
  skeleton: {
    // Background color handled dynamically
  },
  card: {
    borderRadius: cardBorderRadius,
    marginBottom: spacing.md,
    overflow: "hidden",
  },
  content: {
    padding: spacing.md,
  },
  tagRow: {
    flexDirection: "row",
    marginBottom: spacing.sm,
  },
  infoRow: {
    flexDirection: "row",
    alignItems: "center",
  },
});
