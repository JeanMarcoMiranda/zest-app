import { colors, spacing, typography } from "@/src/theme";
import React from "react";
import { ActivityIndicator, StyleSheet, Text, View } from "react-native";

const fontSize = {
  md: typography.fontSize.base,
  lg: typography.fontSize.lg,
};

interface LoadingSpinnerProps {
  message?: string;
  size?: "small" | "large";
}

const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({
  message = "Cargando...",
  size = "large",
}) => {
  return (
    <View style={styles.container}>
      <ActivityIndicator size={size} color={colors.primary} />
      {message && <Text style={styles.message}>{message}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: spacing.lg,
  },
  message: {
    marginTop: spacing.md,
    fontSize: fontSize.md,
    color: colors.textSecondary,
  },
});

export default LoadingSpinner;
