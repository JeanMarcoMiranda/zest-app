import { useTheme } from "@/src/hooks";
import { borderRadius, spacing } from "@/src/theme";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

interface ErrorViewProps {
  message?: string;
  onRetry?: () => void;
}

const ErrorView: React.FC<ErrorViewProps> = ({
  message = "Algo salió mal. Por favor intenta de nuevo.",
  onRetry,
}) => {
  const { colors } = useTheme();

  return (
    <View style={styles.container}>
      <Text style={styles.emoji}>😕</Text>
      <Text style={[styles.message, { color: colors.textSecondary }]}>
        {message}
      </Text>
      {onRetry && (
        <TouchableOpacity
          style={[styles.button, { backgroundColor: colors.primary }]}
          onPress={onRetry}
        >
          <Text style={[styles.buttonText, { color: colors.textInverse }]}>
            Reintentar
          </Text>
        </TouchableOpacity>
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

const buttonStyles = {
  fontFamily: "Inter-Bold",
  fontSize: 16,
  fontWeight: "700" as const,
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
  emoji: {
    fontSize: 64,
    marginBottom: spacing.md,
  },
  message: {
    ...bodyLgStyles,
    textAlign: "center",
    marginBottom: spacing.lg,
  },
  button: {
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
    borderRadius: borderRadius.md,
  },
  buttonText: {
    ...buttonStyles,
  },
});

export default ErrorView;
