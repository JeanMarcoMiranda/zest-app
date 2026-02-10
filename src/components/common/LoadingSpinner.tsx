import { useTheme } from "@/src/hooks";
import { spacing } from "@/src/theme";
import React from "react";
import { ActivityIndicator, StyleSheet, Text, View } from "react-native";

interface LoadingSpinnerProps {
  message?: string;
  size?: "small" | "large";
}

const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({
  message = "Cargando...",
  size = "large",
}) => {
  const { colors } = useTheme();

  return (
    <View style={styles.container}>
      <ActivityIndicator size={size} color={colors.primary} />
      {message && (
        <Text style={[styles.message, { color: colors.textSecondary }]}>
          {message}
        </Text>
      )}
    </View>
  );
};

// Extraer valores del tema para usar en StyleSheet.create()
const bodyLgStyles = {
  fontFamily: "Inter-Regular",
  fontSize: 16,
  fontWeight: "500" as const,
  lineHeight: 1.5,
  letterSpacing: 0,
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
    ...bodyLgStyles,
  },
});

export default LoadingSpinner;
